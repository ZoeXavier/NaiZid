const { create, Client } = require('@open-wa/wa-automate')
const welcome = require('./lib/welcome')
const left = require('./lib/left')
const cron = require('node-cron')
const color = require('./lib/color')
const fs = require('fs')
// const msgHndlr = require ('./zfa')
const figlet = require('figlet')
const lolcatjs = require('lolcatjs')
const options = require('./options')

// AUTO UPDATE BY NURUTOMO
// THX FOR NURUTOMO
// Cache handler and check for file change
require('./zfa.js')
nocache('./zfa.js', module => console.log(`'${module}' Updated!`))
require('./lib/help.js')
nocache('./lib/help.js', module => console.log(`'${module}' Updated!`))
require('./lib/database/setting.json')
nocache('./lib/database/setting.json', module => console.log(`'${module}' Updated!`))

const adminNumber = JSON.parse(fs.readFileSync('./lib/database/admin.json'))
const setting = JSON.parse(fs.readFileSync('./lib/database/setting.json'))
const isWhite = (chatId) => adminNumber.includes(chatId) ? true : false

let { 
    limitCount,
    memberLimit, 
    groupLimit,
    mtc: mtcState,
    banChats,
    restartState: isRestart
    } = setting

function restartAwal(zfa){
    setting.restartState = false
    isRestart = false
    zfa.sendText(setting.restartId, 'Restart Succesfull!')
    setting.restartId = 'undefined'
    //fs.writeFileSync('./lib/setting.json', JSON.stringify(setting, null,2));
}

lolcatjs.options.seed = Math.round(Math.random() * 1000);
lolcatjs.options.colors = true;

const start = async (zfa = new Client()) => {
        console.log('------------------------------------------------')
        lolcatjs.fromString(color(figlet.textSync('RAISA BOT', { horizontalLayout: 'full' })))
        console.log('------------------------------------------------')
        lolcatjs.fromString('[DEV] ZIDANGANZ')
        lolcatjs.fromString('[SERVER] Server Started!')
        zfa.onAnyMessage((fn) => messageLog(fn.fromMe, fn.type))
        // Force it to keep the current session
        zfa.onStateChanged((state) => {
            console.log('[Raisa State]', state)
            if (state === 'CONFLICT' || state === 'UNLAUNCHED') zfa.forceRefocus()
        })
        // listening on message
        zfa.onMessage((async (message) => {

        zfa.getAmountOfLoadedMessages() // Cut message Cache if cache more than 3K
            .then((msg) => {
                if (msg >= 1000) {
                    console.log('[RAISA]', color(`Loaded Message Reach ${msg}, cuting message cache...`, 'yellow'))
                    zfa.cutMsgCache()
                }
            })
        // msgHndlr(zfa, message)
        // Message Handler (Loaded from recent cache)
        require('./zfa.js')(zfa, message)
    }))
           

        zfa.onGlobalParticipantsChanged((async (heuh) => {
            await welcome(zfa, heuh) 
            left(zfa, heuh)
            }))
        
        zfa.onAddedToGroup(async (chat) => {
            if(isWhite(chat.id)) return zfa.sendText(chat.id, 'Halo aku Raisa, Ketik #help Untuk Melihat List Command Ku...')
            if(mtcState === false){
                const groups = await zfa.getAllGroups()
                // BOT group count less than
                if(groups.length > groupLimit){
                    await zfa.sendText(chat.id, 'Maaf, Batas group yang dapat Raisa tampung sudah penuh').then(async () =>{
                        zfa.deleteChat(chat.id)
                        zfa.leaveGroup(chat.id)
                    })
                }else{
                    if(chat.groupMetadata.participants.length < memberLimit){
                        await zfa.sendText(chat.id, `Maaf, Raisa keluar jika member group tidak melebihi ${memberLimit} orang`).then(async () =>{
                            zfa.deleteChat(chat.id)
                            zfa.leaveGroup(chat.id)
                        })
                    }else{
                        if(!chat.isReadOnly) zfa.sendText(chat.id, 'Halo aku Raisa, Ketik .help Untuk Melihat List Command Ku...')
                    }
                }
            }else{
                await zfa.sendText(chat.id, 'Raisa sedang maintenance, coba lain hari').then(async () => {
                    zfa.deleteChat(chat.id)
                    zfa.leaveGroup(chat.id)
                })
            }
        })

        /*zfa.onAck((x => {
            const { from, to, ack } = x
            if (x !== 3) zfa.sendSeen(to)
        }))*/

        // listening on Incoming Call
        zfa.onIncomingCall(( async (call) => {
            await zfa.sendText(call.peerJid, 'Maaf, saya tidak bisa menerima panggilan. nelfon = block!.\nJika ingin membuka block harap chat Owner!')
            .then(() => zfa.contactBlock(call.peerJid))
        }))
    }

/**
 * Uncache if there is file change
 * @param {string} module Module name or path
 * @param {function} cb <optional> 
 */
function nocache(module, cb = () => { }) {
    console.log('Module', `'${module}'`, 'is now being watched for changes')
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}

/**
 * Uncache a module
 * @param {string} module Module name or path
 */
function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

create(options(true, start))
    .then(zfa => start(zfa))
    .catch((error) => console.log(error))
