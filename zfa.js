// Thanks To Tobz [Pembuat Sc INi] Izin Copas Ya Bang Tobz hehe
// Sc Ini Di Remake Oleh ZidanGanz
// Dilarang hapus credits, Atau Raisa Akan Marah
//
//
require('dotenv').config()
const { decryptMedia } = require('@open-wa/wa-decrypt')
const fs = require('fs-extra')
const ffmpeg = require('fluent-ffmpeg')
const axios = require('axios')
const moment = require('moment-timezone')
const getYouTubeID = require('get-youtube-id')
const os = require('os')
const get = require('got')
const speed = require('performance-now')
const fetch = require('node-fetch')
const { spawn, exec } = require('child_process')
const nhentai = require('nhentai-js')
const { API } = require('nhentai-api')
const google = require('google-it')
const translatte = require('translatte')
const { stdout } = require('process')
const translate = require('translatte')
const Math_js = require('mathjs');
const imageToBase64 = require('image-to-base64')
const bent = require('bent')
const request = require('request')
//const { misc } = require('../lib')
const { getStickerMaker } = require('./lib/ttp')
const quotedd = require('./lib/quote')
const color = require('./lib/color')
const urlShortener = require('./lib/shortener')
const { addFilter, isFiltered } = require('./lib/msgFilter')
const cariKasar = require('./lib/kataKotor')

const { 
    downloader,
    liriklagu,
    quotemaker,
    randomNimek,
    sleep,
    jadwalTv,
    processTime
    } = require('./lib/functions')

const { 
    help,
    admincmd,
    ownercmd,
    nsfwcmd,
    kerangcmd,
    mediacmd,
    animecmd,
    othercmd,
    downloadcmd,
    praycmd,
    groupcmd,
    funcmd,
    bahasalist,
    sewa,
    snk, 
    info, 
    sumbang, 
    readme, 
    listChannel,
    commandArray
    } = require('./lib/help')

const {
    instagram,
    tiktok,
    facebook,
    smule,
    starmaker,
    twitter,
    joox
    } = require('./lib/downloader')

const {
    stickerburn,
    stickerlight
    } = require('./lib/sticker')

const { 
    uploadImages, 
    custom,
    picturemis
    } = require('./lib/fetcher')

// LOAD FILE
let banned = JSON.parse(fs.readFileSync('./lib/database/banned.json'))
let nsfw_ = JSON.parse(fs.readFileSync('./lib/database/nsfwz.json'))
let simi_ = JSON.parse(fs.readFileSync('./lib/database/Simsimi.json'))
let limit = JSON.parse(fs.readFileSync('./lib/database/limit.json'))
let welkom = JSON.parse(fs.readFileSync('./lib/database/welcome.json'))
let left = JSON.parse(fs.readFileSync('./lib/database/left.json'))
let muted = JSON.parse(fs.readFileSync('./lib/database/muted.json'))
let setting = JSON.parse(fs.readFileSync('./lib/database/setting.json'))
let msgLimit = JSON.parse(fs.readFileSync('./lib/database/msgLimit.json'))
let adminNumber = JSON.parse(fs.readFileSync('./lib/database/admin.json'))
//let _afk = JSON.parse(fs.readFileSync('./lib/afk.json'))

// PROTECT
let antilink = JSON.parse(fs.readFileSync('./lib/database/antilink.json'))
let antibadword = JSON.parse(fs.readFileSync('./lib/database/antibadword.json'))
let antisticker = JSON.parse(fs.readFileSync('./lib/database/antisticker.json'))
let msgBadword = JSON.parse(fs.readFileSync('./lib/database/msgBadword.json'))
let dbbadword = JSON.parse(fs.readFileSync('./lib/database/katakasar.json'))
let badword = JSON.parse(fs.readFileSync('./lib/database/badword.json'))
let pendaftar = JSON.parse(fs.readFileSync('./lib/database/user.json'))
let stickerspam = JSON.parse(fs.readFileSync('./lib/database/stickerspam.json'))

let { 
    limitCount,
    memberLimit, 
    groupLimit,
    banChats,
    melodickey,
    vhtearkey,
    tobzkey,
    restartState: isRestart,
    mtc: mtcState
    } = setting

let state = {
    status: () => {
        if(banChats){
            return 'Nonaktif'
        }else if(mtcState){
            return 'Nonaktif'
        }else if(!mtcState){
            return 'Aktif'
        }else{
            return 'Aktif'
        }
    }
}

prefix = '#'
var timeStart = Date.now() / 1000
moment.tz.setDefault('Asia/Jakarta').locale('id')

module.exports = zfa = async (zfa, message) => {
    try {
        const { type, id, from, t, sender, isGroupMsg, chat, chatId, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, author, mentionedJidList } = message
        let { body } = message
        const { name, formattedTitle } = chat
        let { pushname, verifiedName } = sender
        pushname = pushname || verifiedName
        const commands = caption || body || ''
        const chats = (type === 'chat') ? body : (type === 'image' || type === 'video') ? caption : ''
        const argx = commands.toLowerCase()
        const args =  commands.split(' ')
        const command = commands.toLowerCase().split(' ')[0] || ''

        global.prefix
        
        const time = moment(t * 1000).format('DD/MM HH:mm:ss')
        const botNumber = await zfa.getHostNumber()
        const blockNumber = await zfa.getBlockedIds()
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await zfa.getGroupAdmins(groupId) : ''
        const isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false
        const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber + '@c.us') : false
        const SN = GenerateSerialNumber("000000000000000000000000")

        const isBanned = banned.includes(sender.id)
        const isBlocked = blockNumber.includes(sender.id)
        const isNsfw = isGroupMsg ? nsfw_.includes(chat.id) : false
        const isSimi = isGroupMsg ? simi_.includes(chat.id) : false
        const uaOverride = 'WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
        const isUrl = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi)
        const url = args.length !== 0 ? args[0] : ''

        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
        const isQuotedVideo = quotedMsg && quotedMsg.type === 'video'
        const isQuotedAudio = quotedMsg && (quotedMsg.type === 'audio' || quotedMsg.type === 'ptt' || quotedMsg.type === 'ppt')
        const isQuotedFile = quotedMsg && quotedMsg.type === 'document'

        const isBadword = badword.includes(chatId)
        body = (type === 'chat' && body.startsWith(prefix)) ? body : (((type === 'image' || type === 'video') && caption) && caption.startsWith(prefix)) ? caption : ''
        const arg = body.substring(body.indexOf(' ') + 1)
        const isKasar = await cariKasar(chats)
        const GroupLinkDetector = antilink.includes(chatId)
        const AntiStickerSpam = antisticker.includes(chatId)
        const isPrivate = sender.id === chat.contact.id
        const stickermsg = message.type === 'sticker'
        const isCmd = command.startsWith(prefix)
        
        const tms = (Date.now() / 1000) - (timeStart);
        const cts = waktu(tms)

        const serial = sender.id
        const isAdmin = adminNumber.includes(sender.id)
        const ownerNumber = '6281310253704@c.us'
        const isOwner = ownerNumber.includes(sender.id)
        //const isAfkOn = afk.checkAfkUser(sender.id, _afk)
        if (isGroupMsg && GroupLinkDetector && !isGroupAdmins && !isAdmin && !isOwner){
            if (chats.match(/(https:\/\/chat.whatsapp.com)/gi)) {
                const check = await zfa.inviteInfo(chats);
                if (!check) {
                    return
                } else {
                    zfa.reply(from, `*「 GROUP LINK DETECTOR 」*\nKakak mengirimkan link grup chat, maaf kakak aku kick dari grup :(`, id).then(() => {
                        zfa.removeParticipant(groupId, sender.id)
                    })
                }
            }
        }
        
		// AFK by Slavyan
        /*if (isGroupMsg) {
            for (let ment of mentionedJidList) {
                if (afk.checkAfkUser(ment, _afk)) {
                    const getId = afk.getAfkId(ment, _afk)
                    const getReason = afk.getAfkReason(getId, _afk)
                    const getTime = afk.getAfkTime(getId, _afk)
                    await zfa.reply(from, ind.afkMentioned(getReason, getTime), id)
                }
            }
          /*  if (afk.checkAfkUser(sender.id, _afk) && !isCmd) {
                _afk.splice(afk.getAfkPosition(sender.id, _afk), 1)
                fs.writeFileSync('./lib/afk.json', JSON.stringify(_afk))
                await zfa.sendText(from, ind.afkDone(pushname))
            }
        }*/
		
        // [BETA] Avoid Spam Message
        if (isCmd && isFiltered(from) && !isGroupMsg) { return console.log(color('[SPAM]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname)) }
        if (isCmd && isFiltered(from) && isGroupMsg) { return console.log(color('[SPAM]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle)) }
        // AKTIFKAN APABILA TIDAK INGIN TERKENA SPAM!!
        //addFilter(from)
        if (isCmd && !isGroupMsg) {console.log(color('[EXEC]'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))}
        if (isCmd && isGroupMsg) {console.log(color('[EXEC]'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle))}

        // FUNCTION
        function waktu(seconds) { // TOBZ
            seconds = Number(seconds);
            var d = Math.floor(seconds / (3600 * 24));
            var h = Math.floor(seconds % (3600 * 24) / 3600);
            var m = Math.floor(seconds % 3600 / 60);
            var s = Math.floor(seconds % 60);
            var dDisplay = d > 0 ? d + (d == 1 ? " Hari,":" Hari,") : "";
            var hDisplay = h > 0 ? h + (h == 1 ? " Jam,":" Jam,") : "";
            var mDisplay = m > 0 ? m + (m == 1 ? " Menit,":" Menit,") : "";
            var sDisplay = s > 0 ? s + (s == 1 ? " Detik,":" Detik") : "";
            return dDisplay + hDisplay + mDisplay + sDisplay;
        }
        // Serial Number Generator
        function GenerateRandomNumber(min,max){
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        // Generates a random alphanumberic character
        function GenerateRandomChar() {
            var chars = "1234567890ABCDEFGIJKLMNOPQRSTUVWXYZ";
            var randomNumber = GenerateRandomNumber(0,chars.length - 1);
            return chars[randomNumber];
        }
		// Biar Dek Raisa Baca Chatt Secara Otomatis
         zfa.sendSeen(chatId)
        // Generates a Serial Number, based on a certain mask
        function GenerateSerialNumber(mask){
            var serialNumber = "";
            if(mask != null){
                for(var i=0; i < mask.length; i++){
                    var maskChar = mask[i];
                    serialNumber += maskChar == "0" ? GenerateRandomChar() : maskChar;
                }
            }
            return serialNumber;
        }
        
        var nmr = sender.id
        var obj = pendaftar.some((val) => {
            return val.id === nmr
        })
        var cekage = pendaftar.some((val) => {
            return val.id === nmr && val.umur >= 7
        })

        function monospace(string) {
            return '```' + string + '```'
        }


        function isReg(obj){
            if (obj === true){
                return false
            } else {     
                return zfa.reply(from, `Kakak Belum Aku Kenal, Yuk Kenalan Dulu\nuntuk Kenalan kirim ${prefix}kenalan |nama|umur\n\ncontoh format: ${prefix}kenalan |ZidanGanz|15\n\ncukup gunakan nama depan/panggilan saja ya kak`, id) //if user is not registered
            }
        }

        function cekumur(obj){
            if (obj === true){
                return false
            } else {
                return zfa.reply(from, `Kamu belum cukup umur untuk menggunakan Raisa, min 7 tahun\n\nKamu bisa kenalan ulang dengan cara donasi terlebih dahulu, bales ${prefix}donasi\nHubungi Owner : wa.me/6281310253704`, id) //if user is not registered
            }
        }

        const apakah = [
            'Ya',
            'Tidak',
            'Coba Ulangi'
            ]

        const bisakah = [
            'Bisa',
            'Tidak Bisa',
            'Coba Ulangi'
            ]

        const kapankah = [
            '1 Minggu lagi',
            '1 Bulan lagi',
            '1 Tahun lagi'
            ]

 const jwb = [
            'iya, kak?',
            'siap!',
            'gimana kak?',
            'apa?',
            'iyaa',
            'halo kak, raisa disini',
            'kenapa kak',
			'kenapa manggil-manggil? kangen ya... ketik #menu aja kak',
			'ada apa manggil raisa? kangen ya... ketik #menu aja',
			'Apa sayang?',
			'Ada apa sayang?'
        ]
		
        const rate = [
            '100%',
            '95%',
            '90%',
            '85%',
            '80%',
            '75%',
            '70%',
            '65%',
            '60%',
            '55%',
            '50%',
            '45%',
            '40%',
            '35%',
            '30%',
            '25%',
            '20%',
            '15%',
            '10%',
            '5%'
            ]
	
	const sotoy = [
		'🍊 : 🍒 : 🍐',
		'🍒 : 🔔 : 🍊',
		'🍇 : 🍒 : 🍐',
		'🍊 : 🍋 : 🔔',//by Fadhlur Owner of NotBot
		'🔔 : 🍒 : 🍐',
		'🔔 : 🍒 : 🍊',
                '🍊 : 🍋 : 🔔',		
		'🍐 : 🍒 : 🍋',
		'🍐 : 🍐 : 🍐',
		'🍊 : 🍒 : 🍒',
		'🔔 : 🔔 : 🍇',
		'🍌 : 🍒 : 🔔',
		'🍐 : 🔔 : 🔔',
		'🍊 : 🍋 : 🍒',
		'🍋 : 🍋 : 🍌',
		'🔔 : 🔔 : 🍇',
		'🔔 : 🍐 : 🍇',
		'🔔 : 🔔 : 🔔',
		'🍒 : 🍒 : 🍒',
		'🍌 : 🍌 : 🍌'
		]

        const mess = {
            wait: 'Bentar ya kak lagi Raisa proses nih. Mohon tunggu sebentar...',
            magernulissatu: 'Harap Tunggu, BOT Sedang Menulis Di Buku 1!',
            error: {
                St: '[❗] Kirim gambar dengan caption *#sticker* atau tag gambar yang sudah dikirim',
                Ti: '[❗] Replay sticker dengan caption *#stickertoimg* atau tag sticker yang sudah dikirim',
                Qm: '[❗] Terjadi kesalahan, mungkin themenya tidak tersedia!',
                Yt3: '[❗] Terjadi kesalahan, tidak dapat meng konversi ke mp3!',
                Yt4: '[❗] Terjadi kesalahan, mungkin error di sebabkan oleh sistem.',
                Ig: '[❗] Terjadi kesalahan, mungkin karena akunnya private',
                Ki: '[❗] Bot tidak bisa mengeluarkan Admin group!',
                Sp: '[❗] Bot tidak bisa mengeluarkan Admin',
                Ow: '[❗] Bot tidak bisa mengeluarkan Owner',
                Bk: '[❗] Bot tidak bisa memblockir Owner',
                Ad: '[❗] Tidak dapat menambahkan target, mungkin karena di private',
                Iv: '[❗] Link yang anda kirim tidak valid!'
            }
        }

        const tutor = 'https://i.ibb.co/Hp1XGbL/a4dec92b8922.jpg'
        const errorurl = 'https://steamuserimages-a.akamaihd.net/ugc/954087817129084207/5B7E46EE484181A676C02DFCAD48ECB1C74BC423/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
        const errorurl2 = 'https://steamuserimages-a.akamaihd.net/ugc/954087817129084207/5B7E46EE484181A676C02DFCAD48ECB1C74BC423/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
       
        const isMuted = (chatId) => {
          if(muted.includes(chatId)){
            return false
        }else{
            return true
            }
        }

        function banChat () {
            if(banChats == true) {
            return false
        }else{
            return true
            }
        }
        
        // FUNCTION
	// https://github.com/Gimenz/Mg-v2-WhatsApp-BOT/blob/803c5a0dc89e2a9e7bb118d1a8872fecd97d397e/msg/index.js#L76
        function isStickerMsg(id){
            if (isOwner, isAdmin) {return false;}
            let found = false;
            for (let i of stickerspam){
                if(i.id === id){
                    if (i.msg >= 12) {
                        found === true 
                        zfa.reply(from, '*「 𝗔𝗡𝗧𝗜 𝗦𝗣𝗔𝗠 𝗦𝗧𝗜𝗖𝗞𝗘𝗥 」*\nKamu telah SPAM STICKER di grup, kamu akan di kick otomatis oleh Raisa', message.id).then(() => {
                            zfa.removeParticipant(groupId, id)
                        }).then(() => {
                            const cus = id
                            var found = false
                            Object.keys(stickerspam).forEach((i) => {
                                if(stickerspam[i].id == cus){
                                    found = i
                                }
                            })
                            if (found !== false) {
                                stickerspam[found].msg = 1;
                                const resultx = 'Database telah direset!'
                                console.log(stickerspam[found])
                                fs.writeFileSync('./lib/database/stickerspam.json',JSON.stringify(stickerspam));
                                client.sendText(from, resultx)
                            } else {
                                    zfa.reply(from, `Nomor itu tidak terdaftar didalam database!`, id)
                            }
                        })
                        return true;
                    }else{
                        found === true
                        return false;
                    }   
                }
            }
            if (found === false){
                let obj = {id: `${id}`, msg:1};
                stickerspam.push(obj);
                fs.writeFileSync('./lib/database/stickerspam.json',JSON.stringify(stickerspam));
                return false;
            }  
        }
        function addStickerCount(id){
            if (isOwner, isAdmin) {return;}
            var found = false
            Object.keys(stickerspam).forEach((i) => {
                if(stickerspam[i].id == id){
                    found = i
                }
            })
            if (found !== false) {
                stickerspam[found].msg += 1;
                fs.writeFileSync('./lib/database/stickerspam.json',JSON.stringify(stickerspam));
            }
        }

        function isBadwordMsg(id){
            if (isOwner, isAdmin) {return false;}
            let kasar = false;
            for (let i of msgBadword){
                if(i.id === id){
                    let msg = i.msg
                    if (msg >= 12) { // 12x
                        kasar === true 
                        zfa.reply(from, '*「 𝗔𝗡𝗧𝗜 𝗕𝗔𝗗𝗪𝗢𝗥𝗗 」*\nKamu telah berkata kasar di grup ini, kamu akan di kick otomatis oleh Raisa!', message.id).then(() => {
                            zfa.removeParticipant(groupId, id)
                        }).then(() => {
                            const cus = id
                            var found = false
                            Object.keys(msgBadword).forEach((i) => {
                                if(msgBadword[i].id == cus){
                                    found = i
                                }
                            })
                            if (found !== false) {
                                msgBadword[found].msg = 1;
                                const resultv = 'Database telah direset'
                                console.log(msgBadword[found])
                                fs.writeFileSync('./lib/database/msgBadword.json',JSON.stringify(msgBadword));
                                zfa.sendText(from, resultv)
                            } else {
                                    zfa.reply(from, `Nomor itu tidak terdaftar didalam database!`, id)
                            }
                        })
                        return true;
                    }else{
                        kasar === true
                        return false;
                    }   
                }
            }
            if (kasar === false){
                let obj = {id: `${id}`, msg:1};
                msgBadword.push(obj);
                fs.writeFileSync('./lib/database/msgBadword.json',JSON.stringify(msgBadword));
                return false;
            }  
        }
        function addBadCount(id){
            if (isOwner, isAdmin) {return;}
            var kasar = false
            Object.keys(msgBadword).forEach((i) => {
                if(msgBadword[i].id == id){
                    kasar = i
                }
            })
            if (kasar !== false) {
                msgBadword[kasar].msg += 1;
                fs.writeFileSync('./lib/database/msgBadword.json',JSON.stringify(msgBadword));
            }
        }
	// https://github.com/ItzNgga/wa-bot.js/blob/d58ddcf4e27b93535dd806e4a07a6ef2fb52463d/index.js#L204
        function isMsgLimit(id){
                    if (isAdmin) {return false;}
                    let found = false;
                    for (let i of msgLimit){
                        if(i.id === id){
                            if (i.msg >= 8) {
                                found === true 
                                zfa.reply(from, `*「 𝗔𝗡𝗧𝗜 𝗦𝗣𝗔𝗠 」*\nMaaf, akun anda kami blok karena SPAM, dan tidak bisa di UNBLOK!`, id)
                                zfa.contactBlock(id)
                                banned.push(id)
                                fs.writeFileSync('./lib/database/banned.json', JSON.stringify(banned))
                                return true;
                            }else if(i.msg >= 8){
                                found === true
                                zfa.reply(from, `*「 𝗔𝗡𝗧𝗜 𝗦𝗣𝗔𝗠 」*\nNomor anda terdeteksi spam!\nMohon tidak spam 5 pesan lagi atau nomor anda AUTO BLOK!`, id)
                                return true
                            }else{
                                found === true
                                return false;
                            }   
                        }
                    }
                    if (found === false){
                        let obj = {id: `${id}`, msg:1};
                        msgLimit.push(obj);
                        fs.writeFileSync('./lib/database/msgLimit.json',JSON.stringify(msgLimit));
                        return false;
                    }  
                }
        function addMsgLimit(id){
                    if (isAdmin) {return;}
                    var found = false
                    Object.keys(msgLimit).forEach((i) => {
                        if(msgLimit[i].id == id){
                            found = i
                        }
                    })
                    if (found !== false) {
                        msgLimit[found].msg += 1;
                        fs.writeFileSync('./lib/database/msgLimit.json',JSON.stringify(msgLimit));
                    }
                }
        function isLimit(id){
                    if (isAdmin) {return false;}
                    let found = false;
                    for (let i of limit){
                        if(i.id === id){
                            let limits = i.limit;
                            if (limits >= limitCount) {
                                found = true;
                                zfa.reply(from, `Perintah BOT anda sudah mencapai batas, coba esok hari :)`, id)
                                return true;
                            }else{
                                limit
                                found = true;
                                return false;
                            }
                        }
                    }
                    if (found === false){
                        let obj = {id: `${id}`, limit:1};
                        limit.push(obj);
                        fs.writeFileSync('./lib/database/limit.json',JSON.stringify(limit));
                        return false;
                    }  
                }
        function limitAdd (id) {
                    if (isAdmin) {return;}
                    var found = false;
                    Object.keys(limit).forEach((i) => {
                        if(limit[i].id == id){
                            found = i
                        }
                    })
                    if (found !== false) {
                        limit[found].limit += 1;
                        fs.writeFileSync('./lib/database/limit.json',JSON.stringify(limit));
                    }
                }
        
                // END HELPER FUNCTION
        // FUNCTION DAFTAR! NEXT UPDATE
        function monospace(string) {
            return '```' + string + '```'
        }

        // Serial Number Generator
        function GenerateRandomNumber(min,max){
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        // Generates a random alphanumberic character
        function GenerateRandomChar() {
            var chars = "1234567890ABCDEFGIJKLMNOPQRSTUVWXYZ";
            var randomNumber = GenerateRandomNumber(0,chars.length - 1);
            return chars[randomNumber];
        }
        // Generates a Serial Number, based on a certain mask
        function GenerateSerialNumber(mask){
            var serialNumber = "";
            if(mask != null){
                for(var i=0; i < mask.length; i++){
                    var maskChar = mask[i];
                    serialNumber += maskChar == "0" ? GenerateRandomChar() : maskChar;
                }
            }
            return serialNumber;
        }
	    
	if (isGroupMsg && AntiStickerSpam && !isGroupAdmins && !isAdmin && !isOwner){
            if(stickermsg === true){
                if(isStickerMsg(serial)) return
                addStickerCount(serial)
            }
        }

        if(!isCmd && isKasar && isGroupMsg && isBadword && !isGroupAdmins) { 
            console.log(color('[BADWORD]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${argx}`), 'from', color(pushname), 'in', color(name || formattedTitle)) 
            if(isBadwordMsg(serial)) return
                addBadCount(serial)
        }
        if (args.includes('@447537102515')) { //replace with your bot number
            zfa.reply(from, 'Iya ada apa?', id)
        }
		if (args.includes('ngab')) { //Edit ae ngab
            zfa.reply(from, '🆖🆎', id)
        }
		if (args.includes('zidan')){
            if (!isGroupMsg){
			const txt = body.slice(0)
             zfa.reply(from, 'HAYO LAGI NGOMONGIN OWNER YAA!! RAISA CEPUIN AH:D', id)
             zfa.sendText(ownerNumber, `*Hallo owner ada yang ngomongin owner nih*\n*WAKTU* : ${time}\nNO PENGIRIM : wa.me/${sender.id.match(/\d+/g)}\nGroup : ${formattedTitle} isi pesannya : ${txt}`, id)
             } else {
             zfa.reply(from, 'HAYO LAGI NGOMONGIN OWNER YAA!! RAISA CEPUIN AH:D', id)
             zfa.sendText(ownerNumber, `*Hallo owner ada yang ngomongin owner nih*\n*WAKTU* : ${time}\nNO PENGIRIM : wa.me/${sender.id.match(/\d+/g)}\nGroup : ${formattedTitle} isi pesannya : ${txt}`, id)
                    }
            }
		if (args.includes('ngopi')) { //Edit sesuka hati kamu sayang
            zfa.reply(from, '🆖🅾️🅿️ℹ️', id)
        }
		if (args.includes('cok')) { //Edit sesuka hati kamu sayang
            zfa.reply(from, '©️🆗', id)
        }
		if (args.includes('terima kasih') || args.includes('makasih') || args.includes('terimakasih') || args.includes('thank you') || args.includes('thanks')) {
            zfa.reply(from, `sama-sama ${pushname}💖`, id)
        }
                if(body === '#mute' && isMuted(chatId) == true){
                    if(isGroupMsg) {
                        if (!isAdmin) return zfa.reply(from, 'Maaf, perintah ini hanya dapat dilakukan oleh admin Raisa!', id)
                        if(isMsgLimit(serial)){
                            return
                        }else{
                            addMsgLimit(serial)
                        }
                        muted.push(chatId)
                        fs.writeFileSync('./lib/database/muted.json', JSON.stringify(muted, null, 2))
                        zfa.reply(from, 'Bot telah di mute pada chat ini! #unmute untuk unmute!', id)
                    }else{
                        if(isMsgLimit(serial)){
                            return
                        }else{
                            addMsgLimit(serial)
                        }
                        muted.push(chatId)
                        fs.writeFileSync('./lib/database/muted.json', JSON.stringify(muted, null, 2))
                        reply(from, 'Bot telah di mute pada chat ini! #unmute untuk unmute!', id)
                    }
                }
                if(body === '#unmute' && isMuted(chatId) == false){
                    if(isGroupMsg) {
                        if (!isAdmin) return zfa.reply(from, 'Maaf, perintah ini hanya dapat dilakukan oleh admin Raisa!', id)
                        if(isMsgLimit(serial)){
                            return
                        }else{
                            addMsgLimit(serial)
                        }
                        let index = muted.indexOf(chatId);
                        muted.splice(index,1)
                        fs.writeFileSync('./lib/database/muted.json', JSON.stringify(muted, null, 2))
                        zfa.reply(from, 'Bot telah di unmute!', id)         
                    }else{
                        if(isMsgLimit(serial)){
                            return
                        }else{
                            addMsgLimit(serial)
                        }
                        let index = muted.indexOf(chatId);
                        muted.splice(index,1)
                        fs.writeFileSync('./lib/database/muted.json', JSON.stringify(muted, null, 2))
                        zfa.reply(from, 'Bot telah di unmute!', id)                   
                    }
                }
				if(body === 'zidan') { //replace with your bot number
                    zfa.reply(from, 'Hayoooo kakak lagi ngomongin owner yaaaa', id)
                if (body === '#unbanchat') {
                    if (!isOwner) return zfa.reply(from, 'Maaf, perintah ini hanya dapat dilakukan oleh Owner Raisa!', id)
                    if(setting.banChats === false) return
                    setting.banChats = false
                    banChats = false
                    fs.writeFileSync('./lib/database/setting.json', JSON.stringify(setting, null, 2))
                    zfa.reply('Global chat has been disable!')
                }
				if (body === 'zidan') {
                    zfa.reply(from, 'Hayoooo kakak lagi ngomongin owner yaaaa', id)
                }
        }
        if (isMuted(chatId) && banChat() && !isBlocked && !isBanned || isOwner ) {
        switch(command) {
        case prefix+'banchat':
            if (setting.banChats === true) return
            if (!isOwner) return zfa.reply(from, 'Perintah ini hanya bisa di gunakan oleh Owner Raisa!', id)
            setting.banChats = true
            banChats = true
            fs.writeFileSync('./lib/database/setting.json', JSON.stringify(setting, null, 2))
            zfa.reply('Global chat has been enable!')
            break

        case prefix+'unmute':
            console.log(`Unmuted ${name}!`)
            await zfa.sendSeen(from)
            break
        case prefix+'unbanchat':
            console.log(`Banchat ${name}!`)
            await zfa.sendSeen(from)
            break
		case prefix+'add':
            const orgh = body.slice(5)
            if (!isGroupMsg) return zfa.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (args.length === 1) return zfa.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *#add* 628xnxx', id)
            if (!isGroupAdmins) return zfa.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return zfa.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            try {
                await zfa.addParticipant(from,`${orgh}@c.us`)
            } catch {
                zfa.reply(from, mess.error.Ad, id)
            }
            break
		case prefix+'hitung':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return zfa.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return zfa.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return zfa.reply(from, '[❗] Kirim perintah *#hitung [ Angka ]*\nContoh : #hitung 12*12\n*NOTE* :\n- Untuk Perkalian Menggunakan *\n- Untuk Pertambahan Menggunakan +\n- Untuk Pengurangan Mennggunakan -\n- Untuk Pembagian Menggunakan /')
            const mtk = body.slice(6)
            if (typeof Math_js.evaluate(mtk) !== "number") {
            zfa.reply(from, `"${mtk}", bukan angka!\n[❗] Kirim perintah *#hitung [ Angka ]*\nContoh : #hitung 12*12\n*NOTE* :\n- Untuk Perkalian Menggunakan *\n- Untuk Pertambahan Menggunakan +\n- Untuk Pengurangan Mennggunakan -\n- Untuk Pembagian Menggunakan /`, id)
            limitAdd(serial)
        } else {
            zfa.reply(from, `*「 MENGHITUNG 」*\n\n*Kalkulator*\n${mtk} = ${Math_js.evaluate(mtk)}`, id)
        }
        break
		/*case prefix+'afk': // by Slavyan
                 if(isReg(obj)) return
                 if(cekumur(cekage)) return
                if (!isGroupMsg) return await zfa.reply(from, 'Fitur ini hanya untuk di grub', id)
                if (isAfkOn) return await zfa.reply(from, ind.afkOnAlready(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                const reason = q ? q : 'Nothing.'
                afk.addAfkUser(sender.id, time, reason, _afk)
                await zfa.reply(from, ind.afkOn(pushname, reason), id)
            break*/
        case prefix+'sticker':
        case prefix+'stiker':
		case prefix+'s':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
             if (isMedia && type === 'image') {
                const mediaData = await decryptMedia(message, uaOverride)
                const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                await zfa.sendImageAsSticker(from, imageBase64)
            } else if (quotedMsg && quotedMsg.type == 'image') {
                const mediaData = await decryptMedia(quotedMsg, uaOverride)
                const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                await zfa.sendImageAsSticker(from, imageBase64)
            } else if (args.length === 2) {
                const url = args[1]
                if (url.match(isUrl)) {
                    await zfa.sendStickerfromUrl(from, url, { method: 'get' })
                        .catch(err => console.log('Caught exception: ', err))
                } else {
                    zfa.reply(from, mess.error.Iv, id)
                }
            } else {
                    zfa.reply(from, mess.error.St, id)
            }
            break
            case prefix+'stickerp':
            case prefix+'stikerp':
			case prefix+'srp':
                    if(isReg(obj)) return
            if(cekumur(cekage)) return
             if (isMedia && type === 'image') {
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    webp.buffer2webpbuffer(mediaData, 'jpg', '-q 100')
                        .then((res) => {
                            sharp(res)
                                .resize({
                                    width: 512,
                                    height: 512,
                                    fit: 'contain',
                                    background: {
                                        r: 255,
                                        g: 255,
                                        b: 255,
                                        alpha: 0
                                    }
                                })
                                .toFile(`./temp/stage_${sender.id}.webp`, async (err) => {
                                    if (err) return console.error(err)
                                    await exec(`webpmux -set exif ./temp/data.exif ./temp/stage_${sender.id}.webp -o ./temp/${sender.id}.webp`, { log: true })
                                    if (fs.existsSync(`./temp/${sender.id}.webp`)) {
                                        const data = fs.readFileSync(`./temp/${sender.id}.webp`)
                                        const base64 = `data:image/webp;base64,${data.toString('base64')}`
                                        await zfa.sendRawWebpAsSticker(from, base64)
                                        console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                        fs.unlinkSync(`./temp/${sender.id}.webp`)
                                        fs.unlinkSync(`./temp/stage_${sender.id}.webp`)
                                    }
                                })
                        })
                } else {
                    await zfa.reply(from, 'format salah!', id)
                }
            break
		case prefix+'google':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return zfa.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return zfa.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            zfa.reply(from, mess.wait, id)
            const googleQuery = body.slice(8)
            if(googleQuery == undefined || googleQuery == ' ') return zfa.reply(from, `*Hasil Pencarian : ${googleQuery}* tidak ditemukan`, id)
            google({ 'query': googleQuery }).then(results => {
            let vars = `_*Hasil Pencarian : ${googleQuery}*_\n`
            for (let i = 0; i < results.length; i++) {
                vars +=  `\n═════════════════\n\n*Judul* : ${results[i].title}\n\n*Deskripsi* : ${results[i].snippet}\n\n*Link* : ${results[i].link}\n\n`
            }
                zfa.reply(from, vars, id);
                limitAdd(serial)
            }).catch(e => {
                console.log(e)
                zfa.sendText(ownerNumber, 'Google Error : ' + e);
            })
            break
		case prefix+'bass':
                if(isReg(obj)) return
                if(cekumur(cekage)) return
                if (isMedia && isAudio || isQuotedAudio || isVoice || isQuotedVoice) {
                    if (args.length !== 1) return await zfa.reply(from, 'Reply Audio Nya Kakak', id)
                    await zfa.reply(from, 'Bentar kak', id)
                    const encryptMedia = isQuotedAudio || isQuotedVoice ? quotedMsg : message
                    console.log(color('[WAPI]', 'green'), 'Downloading and decrypting media...')
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const temp = './temp'
                    const name = new Date() * 1
                    const fileInputPath = path.join(temp, `${name}.mp3`)
                    const fileOutputPath = path.join(temp, 'audio', `${name}.mp3`)
                    fs.writeFile(fileInputPath, mediaData, (err) => {
                        if (err) return console.error(err)
                        ffmpeg(fileInputPath)
                            .audioFilter(`equalizer=f=40:width_type=h:width=50:g=${args[0]}`)
                            .format('mp3')
                            .on('start', (commandLine) => console.log(color('[FFmpeg]', 'green'), commandLine))
                            .on('progress', (progress) => console.log(color('[FFmpeg]', 'green'), progress))
                            .on('end', async () => {
                                console.log(color('[FFmpeg]', 'green'), 'Processing finished!')
                                await zfa.sendPtt(from, fileOutputPath, id)
                                console.log(color('[WAPI]', 'green'), 'Success sending audio!')
                                setTimeout(() => {
                                    fs.unlinkSync(fileInputPath)
                                    fs.unlinkSync(fileOutputPath)
                                }, 30000)
                            })
                            .save(fileOutputPath)
                    })
                } else {
                    await zfa.reply(from, ind.wrongFormat(), id)
                }
            break
		/*case prefix+'ss': //jika error silahkan buka file di folder settings/api.json dan ubah apiSS 'API-KEY' yang kalian dapat dari website https://apiflash.com/
            if (args.length == 0) return zfa.reply(from, `Membuat bot men-screenshot sebuah web\n\nPemakaian: ${prefix}ss [url]\n\ncontoh: ${prefix}ss http://zidanzfa`, id)
            const scrinshit = await meme.ss(args[0])
            await zfa.sendFile(from, scrinshit, 'ss.jpg', 'cekrek', id)
            .catch(() => {
                zfa.reply(from, 'Ada yang Error!', id)
            })
            break*/
		case prefix+'pastebin': //BY VINZ
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (args.length == 1) return zfa.reply(from, `Ketik command ${prefix}pastebin [text]|[nama]\nContoh ${prefix}pastebin ini contohnya|tolll`, id)
            await zfa.reply(from, mess.wait, id)
            var bdtrm = body.slice(10).trim().split('|')
            const pstbn = await axios.get(`https://zeksapi.herokuapp.com/api/pastebin?apikey=benbenz&text=${bdtrm[0]}&name=${bdtrm[1]}`) 
	    console.log(bdtrm[0])
	    if (pstbn.data.status == false) return zfa.reply(from, pstbn.data.message ,id)
            await zfa.reply(from, pstbn.data.result, id) 
            break
		case prefix+'ttp':
                if(isReg(obj)) return
                if(cekumur(cekage)) return
                if (!isGroupMsg) return zfa.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', message.id)
                try
                {
                    const string = body.toLowerCase().includes('#ttp') ? body.slice(5) : body.slice(5)
                    if(args)
                    {
                        if(quotedMsgObj == null)
                        {
                            const gasMake = await getStickerMaker(string)
                            if(gasMake.status == true)
                            {
                                try{
                                    await zfa.sendImageAsSticker(from, gasMake.base64)
                                }catch(err) {
                                    await zfa.reply(from, 'Gagal membuat.', id)
                                } 
                            }else{
                                await zfa.reply(from, gasMake.reason, id)
                            }
                        }else if(quotedMsgObj != null){
                            const gasMake = await getStickerMaker(quotedMsgObj.body)
                            if(gasMake.status == true)
                            {
                                try{
                                    await zfa.sendImageAsSticker(from, gasMake.base64)
                                }catch(err) {
                                    await zfa.reply(from, 'Gagal membuat.', id)
                                } 
                            }else{
                                await zfa.reply(from, gasMake.reason, id)
                            }
                        }
                       
                    }else{
                        await zfa.reply(from, 'Tidak boleh kosong.', id)
                    }
                }catch(error)
                {
                    console.log(error)
                }
            break
		case prefix+'nightcore':
                if(isReg(obj)) return
                if(cekumur(cekage)) return
                if (isMedia && isAudio || isQuotedAudio || isVoice || isQuotedVoice) {
                    await zfa.reply(from, 'Bentar ya kak lagi Raisa proses nih, mohon tunggu sebentar....', id)
                    const encryptMedia = isQuotedAudio || isQuotedVoice ? quotedMsg : message
                    console.log(color('[WAPI]', 'green'), 'Downloading and decrypting media...')
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const temp = './temp'
                    const name = new Date() * 1
                    const fileInputPath = path.join(temp, `${name}.mp3`)
                    const fileOutputPath = path.join(temp, 'audio', `${name}.mp3`)
                    fs.writeFile(fileInputPath, mediaData, (err) => {
                        if (err) return console.error(err)
                        ffmpeg(fileInputPath)
                            .audioFilter('asetrate=44100*1.25')
                            .format('mp3')
                            .on('start', (commandLine) => console.log(color('[FFmpeg]', 'green'), commandLine))
                            .on('progress', (progress) => console.log(color('[FFmpeg]', 'green'), progress))
                            .on('end', async () => {
                                console.log(color('[FFmpeg]', 'green'), 'Processing finished!')
                                await zfa.sendPtt(from, fileOutputPath, id)
                                console.log(color('[WAPI]', 'green'), 'Success sending audio!')
                                setTimeout(() => {
                                    fs.unlinkSync(fileInputPath)
                                    fs.unlinkSync(fileOutputPath)
                                }, 30000)
                            })
                            .save(fileOutputPath)
                    })
                } else {
                    await zfa.reply(from, ind.wrongFormat(), id)
                }
            break
        case prefix+'translate':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return zfa.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return zfa.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if(args[1] == undefined || args[2] == undefined) return
            if(args.length >= 2){
                var codelang = args[1]
                var textai = body.slice(11+codelang.length);
                translatte(textai, {to: codelang}).then(res => {
                    zfa.sendText(from,res.text);
                    limitAdd(serial)
                }).catch(err => {
                     zfa.sendText(from,`[ERROR] Teks tidak ada, atau kode bahasa ${codelang} tidak support\n~> *${prefix}bahasa* untuk melihat list kode bahasa`);
                });
            }
            break
		case prefix+'left':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return zfa.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isGroupAdmins) return zfa.reply(from, 'Perintah ini hanya bisa di gunakan oleh Admin group!', id)
            if (args.length === 1) return zfa.reply(from, 'Pilih enable atau disable!', id)
            if (args[1].toLowerCase() === 'enable') {
                left.push(chat.id)
                fs.writeFileSync('./lib/database/left.json', JSON.stringify(left))
                zfa.reply(from, 'Fitur left berhasil di aktifkan di group ini!', id)
            } else if (args[1].toLowerCase() === 'disable') {
                left.splice(chat.id, 1)
                fs.writeFileSync('./lib/database/left.json', JSON.stringify(left))
                zfa.reply(from, 'Fitur left berhasil di nonaktifkan di group ini!', id)
            } else {
                zfa.reply(from, 'Pilih enable atau disable kak', id)
            }
            break
        case prefix+'welcome':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return zfa.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isGroupAdmins) return zfa.reply(from, 'Perintah ini hanya bisa di gunakan oleh Admin group!', id)
            if (args.length === 1) return zfa.reply(from, 'Pilih enable atau disable!', id)
            if (args[1].toLowerCase() === 'enable') {
                welkom.push(chat.id)
                fs.writeFileSync('./lib/database/welcome.json', JSON.stringify(welkom))
                zfa.reply(from, 'Fitur welcome berhasil di aktifkan di group ini!', id)
            } else if (args[1].toLowerCase() === 'disable') {
                welkom.splice(chat.id, 1)
                fs.writeFileSync('./lib/database/welcome.json', JSON.stringify(welkom))
                zfa.reply(from, 'Fitur welcome berhasil di nonaktifkan di group ini!', id)
            } else {
                zfa.reply(from, 'Pilih enable atau disable udin!', id)
            }
            break
		case '#lock':
			if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return zfa.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (!isGroupAdmins) return zfa.reply(from, `Perintah ini hanya bisa di gunakan oleh Admin group!`, id)
            if (!isBotGroupAdmins) return zfa.reply(from, `Perintah ini hanya bisa di gunakan jika Bot menjadi Admin!`, id)
			if (args.length !== 1) return zfa.reply(from, `Untuk mengubah settingan group chat agar hanya admin saja yang bisa chat\n\nPenggunaan:\n#tutupgrub on --aktifkan\n#tutupgrub off --nonaktifkan`, id)
           // if (args[0] == 'on') {
				zfa.setGroupToAdminsOnly(groupId, true).then(() => zfa.sendText(from, 'Berhasil mengubah agar hanya admin yang dapat chat!'))
			//} else if (args[0] == 'off') {
				
		//	} else {
			//	zfa.reply(from, `Untuk mengubah settingan group chat agar hanya admin saja yang bisa chat\n\nPenggunaan:\n#tutupgrub on --aktifkan\n#tutupgrub off --nonaktifkan`, id)
			//}
			break
		/*case prefix+'fflogo': // By: VideFrelan
                if(isReg(obj)) return
                if(cekumur(cekage)) return
                if (!q.includes('|')) return zfa.reply(from, 'Contoh: #fflogo Seivabel|Zidan', id)
                console.log('Creating FF logo...')
                const karakter = q.substring(0, q.indexOf('|') - 1)
                const teksff = q.substring(q.lastIndexOf('|') + 2)
                await zfa.sendFileFromUrl(from, `https://api.vhtear.com/logoff?hero=${karakter}&text=${teksff}&apikey=${config.vhtear}`, id)
                console.log('Success!')
            break*/
		case prefix+'say':
		case prefix+'bct':
		case prefix+'bacot':
		       if(isReg(obj)) return
                if(cekumur(cekage)) return
		            const doto = fs.readFileSync('./lib/say.json')
                    const dotoJson = JSON.parse(doto)
                    const rondIndox = Math.floor(Math.random() * dotoJson.length)
                    const rondKoy = dotoJson[rondIndox]
                    zfa.reply(from, rondKoy, id)
                    break
		case prefix+'addbacot':
		case prefix+'addbct':
		case prefix+'addsay':
		            const says = body.slice(8)
                 //   say.push(says)
                    fs.writeFileSync('./lib/say.json', JSON.stringify(say))
                    zfa.reply(from, `Add ${says} sukses!`, id)
                    break
	    case prefix+'delsay':
		            if (args.length == 1) return zfa.reply(from, `Kirim perintah *!addsay [teks]*, contoh *!addsay anjay*`, id)
                    const sayso = body.slice(8)
                    let delsayso = say.indexOf(sayso)
                    say.splice(delsayso, 1)
                    fs.writeFileSync('./lib/say.json', JSON.stringify(say))
                    zfa.reply(from, `Delete ${sayso} sukses!`, id)
                    break
        case prefix+'saylist':
                    let saylisto = `Random say list\nTotal : ${say.length}\n`
                    for (let i of say) {
                        saylisto += `☛ ${i}\n`
                    }
                    await zfa.reply(from, saylisto, id)
                    break
		case prefix+'triggered':
                if (isMedia && isImage || isQuotedImage) {
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    console.log(color('[WAPI]', 'green'), 'Downloading and decrypting media...')
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const temp = './temp'
                    const name = new Date() * 1
                    const fileInputPath = path.join(temp, `${name}.gif`)
                    const fileOutputPath = path.join(temp, 'video', `${name}.mp4`)
                    canvas.Canvas.trigger(mediaData)
                        .then((buffer) => {
                            canvas.write(buffer, fileInputPath)
                            ffmpeg(fileInputPath)
                                .outputOptions([
                                    '-movflags faststart',
                                    '-pix_fmt yuv420p',
                                    '-vf scale=trunc(iw/2)*2:trunc(ih/2)*2'
                                ])
                                .inputFormat('gif')
                                .on('start', (commandLine) => console.log(color('[FFmpeg]', 'green'), commandLine))
                                .on('progress', (progress) => console.log(color('[FFmpeg]', 'green'), progress))
                                .on('end', async () => {
                                    console.log(color('[FFmpeg]', 'green'), 'Processing finished!')
                                    await zfa.sendMp4AsSticker(from, fileOutputPath, { fps: 30, startTime: '00:00:00.0', endTime : '00:00:05.0', loop: 0 })
                                    console.log(color('[WAPI]', 'green'), 'Success sending GIF!')
                                    setTimeout(() => {
                                        fs.unlinkSync(fileInputPath)
                                        fs.unlinkSync(fileOutputPath)
                                    }, 30000)
                                })
                                .save(fileOutputPath)
                        })
                } else {
                    await zfa.reply(from, 'Format Salah!', id)
                }
            break
		case 'iri?':
        case 'iri':
                    zfa.sendPtt(from, './posnot/iri.mp3', id)
                    break
        case 'abgjago':
        case 'abangjago':
                    zfa.sendPtt(from, './posnot/bgjg.mp3', id)
                    break
        case 'tarekses':
        case 'tariksis':
        case 'tareksis':
        case 'tareeksis':
        case 'tareekses':
                    zfa.sendPtt(from, './posnot/tarekses.mp3', id)
                    break
        case 'welotka':
        case 'welutka':
        case 'kangcopet':
                    zfa.sendPtt(from, './posnot/welot.mp3', id)
                    break
		case prefix+'cuaca':
		    if(isReg(obj)) return
            if(cekumur(cekage)) return
		    if (args.length === 1) return zfa.reply(from, 'Kirim perintah *#cuaca [tempat]*\nContoh : *#cuaca jakarta utara', id)
                    const tempat = body.slice(7)
                    const weather = await get.get(`https://mhankbarbars.herokuapp.com/api/cuaca?q=${tempat}&apiKey=${apiKey}`).json()
                    if (weather.error) {
                        zfa.reply(from, weather.error, id)
                    } else {
                        zfa.reply(from, `➸ Tempat : ${weather.result.tempat}\n\n➸ Angin : ${weather.result.angin}\n➸ Cuaca : ${weather.result.cuaca}\n➸ Deskripsi : ${weather.result.desk}\n➸ Kelembapan : ${weather.result.kelembapan}\n➸ Suhu : ${weather.result.suhu}\n➸ Udara : ${weather.result.udara}`, id)
                    }
                    break
		case prefix+'listdaerah':
		    const listDaerah = await get('https://mhankbarbars.herokuapp.com/daerah').json()
                    zfa.reply(from, listDaerah.result, id)
                    break
	    case prefix+'randomnsfwneko':
		     const nsfwneko = await axios.get('https://aksa-api.herokuapp.com/api/nsfwneko')
                    const nsfwn = nsfwneko.data
                    if (nsfwn.result.endsWith('.png')) {
                        var ext = '.png'
                    } else {
                        var ext = '.jpg'
                    }
                    zfa.sendImage(from, nsfwn.result, `NsfwNeko${ext}`, 'NsfwNeko!', id)
                    break
		case prefix+'randomanime':
		    const ranime = await axios.get('https://api.computerfreaker.cf/v1/anime')
                    const ranimen = ranime.data
                    if (ranimen.url.endsWith('.png')) {
                        var ext = '.png'
                    } else {
                        var ext = '.jpg'
                    }
                    zfa.sendFileFromUrl(from, ranime.url, `RandomAnime${ext}`, 'Random Anime!', id)
                    break
		case prefix+'nhder':
		     if (args.length >= 2) {
                        const code = args[1]
                        const url = 'https://nhder.herokuapp.com/download/nhentai/' + code + '/zip'
                        const short = []
                        const shortener = await urlShortener(url)
                        url['short'] = shortener
                        short.push(url)
                        const caption = `*NEKOPOI DOWNLOADER*\n\nLink: ${shortener}`
                        zfa.sendText(from, caption)
                    } else {
                        zfa.sendText(from, 'Maaf tolong masukan code nuclear')
                    }
                    break
		case prefix+'nhview':
		     if (args.length === 1) return zfa.reply(from, 'Kirim perintah *@nhview [212121]*\nContoh : *@nhview 321421*', id)
                    const nhsh = body.slice(11)
                    const nhsh2 = await axios.get('https://mnazria.herokuapp.com/api/nhentai?code=' + nhsh)
                    for (let i = 0; i < nhsh2.length; i++) {
                        await zfa.sendImage(from, nhsh2[i].data, 'thumbserc.jpg', '', id)
                    }
                    break
		case prefix+'nhinfo':
		     if (!args[1] || args.length >= 3) return
                    nhentai(args[1]).then(nhinfo => {
                        zfa.reply(nhinfo)
                    }).catch(err => {
                        zfa.reply('Kode nuclear tidak valid!')
                    })
                    break
		case prefix+'randomhentai':
		     const hentai = await axios.get(`https://aksa-api.herokuapp.com/api/hentai`)
                    const henta = hentai.data
                    if (henta.result.endsWith('.png')) {
                        var ext = '.png'
                    } else {
                        var ext = '.jpg'
                    }
                    zfa.sendImage(from, henta.result, `RandomHentai${ext}`, 'Random Hentai!', id)
                    break
		case prefix+'waifu':
		     const waifu = await axios.get('https://mhankbarbars.herokuapp.com/api/waifu' + '?apiKey=' + apiKey)
                    zfa.sendFileFromUrl(from, waifu.data.image, 'Waifu.jpg', `➸ Name : ${waifu.data.name}\n➸ Description : ${waifu.data.desc}\n\n➸ Source : ${waifu.data.source}`, id)
                    break
		case prefix+'komiku':
		     if (args.length === 1) return zfa.reply(from, 'Kirim perintah *@komiku [query]*\nContoh : *@komiku darling in the franxx*', id)
                    const animepo = await axios.get('https://mhankbarbars.herokuapp.com/api/komiku?q=' + body.slice(7) + '&apiKey=' + apiKey)
                    if (animepo.data.error) return zfa.reply(from, animepo.data.error, id)
                    const res_animepo = `${animepo.data.info}\n\n${animepo.data.sinopsis}\n\n${animepo.data.link_dl}`
                    zfa.sendFileFromUrl(from, animepo.data.thumb, 'komiku.jpg', res_animepo, id)
                    break
		case prefix+'kpop':
		     if (args.length === 1) return zfa.reply(from, `Untuk menggunakan !kpop\nSilahkan ketik: !kpop [query]\nContoh: !kpop bts\n\nquery yang tersedia:\nblackpink, exo, bts`, id)
                    if (args[1] === 'blackpink' || args[1] === 'exo' || args[1] === 'bts') {
                        fetch('https://raw.githubusercontent.com/aksaZ/grabbed-results/main/random/kpop/' + args[1] + '.txt')
                            .then(res => res.text())
                            .then(body => {
                                let randomkpop = body.split('\n')
                                let randomkpopx = randomkpop[Math.floor(Math.random() * randomkpop.length)]
                                zfa.sendFileFromUrl(from, randomkpopx, '', 'nih..', id)
                            })
                            .catch(() => {
                                zfa.reply(from, 'Ada yang eror!', id)
                            })
                    } else {
                        zfa.reply(from, `Maaf query tidak tersedia. Silahkan ketik !kpop untuk melihat list query`)
                    }
                    break
		case prefix+'downloadmanga':
		     if (args.length === 1) return zfa.reply(from, `Kirim perintah *#downloadmanga [query]*\nContoh : *#downloadmanga darling in the franxx*`, id)
                    const animep = await axios.get('https://mhankbarbars.herokuapp.com/api/komiku?q=' + body.slice(15) + '&apiKey=' + apiKey)
                    if (animep.data.error) return zfa.reply(from, animep.data.error, id)
                    const res_animep = `${animep.data.info}\n\n${animep.data.sinopsis}\n\n${animep.data.link_dl}`
                    zfa.sendFileFromUrl(from, animep.data.thumb, 'komiku.jpg', res_animep, id)
                    break
	    case prefix+'downloadanime':
		     if (args.length === 1) return zfa.reply(from, `Kirim perintah *#downloadanime [query]*\nContoh : *#downloadanime darling in the franxx*`, id)
                    const animeqq = await axios.get('https://mhankbarbars.herokuapp.com/api/kuso?q=' + body.slice(15) + '&apiKey=' + apiKey)
                    if (animeqq.data.error) return zfa.reply(from, animeqq.data.error, id)
                    const res_animeqq = `${animeqq.data.title}\n\n${animeqq.data.info}\n\n${animeqq.data.sinopsis}\n\n${animeqq.data.link_dl}`
                    zfa.sendFileFromUrl(from, animeqq.data.thumb, 'kusonime.jpg', res_animeqq, id)
                    break
		case prefix+'wiki':
		     if (args.length === 1) return zfa.reply(from, 'Kirim perintah *!wiki <query>*\nContoh : *!wiki Indonesia*', id)
                    const query_ = body.slice(6)
                    const wiki = await get.get(`https://mhankbarbars.herokuapp.com/api/wiki?q=${query_}&lang=id&apiKey=${apiKey}`).json()
                    if (wiki.error) {
                        zfa.reply(from, wiki.error, id)
                    } else {
                        zfa.reply(from, `➸ *Query* : ${query_}\n\n➸ *Result* : ${wiki.result}`, id)
                    }
                    break
		case prefix+'slap':
		            arg = body.trim().split(' ')
                    const jejiik = author.replace('@c.us', '')
                    await zfa.sendGiphyAsSticker(from, 'https://media.giphy.com/media/S8507sBJm1598XnsgD/source.gif')
                    zfa.sendTextWithMentions(from, `${prefix}` + jejiik + ' *slapped* ' + arg[1])
                    break
		case prefix+'hug':
		            arg = body.trim().split(' ')
                    const janjing = author.replace('@c.us', '')
                    await zfa.sendGiphyAsSticker(from, 'https://media.giphy.com/media/od5H3PmEG5EVq/giphy.gif')
                    zfa.sendTextWithMentions(from, `${prefix}` + janjing + ' *peyuuuk* ' + arg[1])
                    break
		case prefix+'nye':
		            arg = body.trim().split('')
                    const jancuk7 = author.replace('@c.us', '')
                    await zfa.sendGiphyAsSticker(from, 'https://media.giphy.com/media/cute-baka-13LunYkkBppSBa/giphy.gif')
                    zfa.sendTextWithMentions(from, `${prefix}` + jancuk7 + ' *nye nye ' + arg[1])
                    break
		case prefix+'pat':
		            arg = body.trim().split(' ')
                    const jartod = author.replace('@c.us', '')
                    await zfa.sendGiphyAsSticker(from, 'https://media.giphy.com/media/Z7x24IHBcmV7W/giphy.gif')
                    zfa.sendTextWithMentions(from, `${prefix}` + jartod + ' *👈 Si Mengelu-elus si👉* ' + arg[1])
                    break
		case prefix+'renungan':
		     const agggg = await get.get(`https://api-jojo.herokuapp.com/api/renungan`).json()
                    try {
                        const {
                            Isi,
                            judul,
                            pesan
                        } = agggg
                        const rn = `➸ *Judul* : ${judul}\n➸ *Pesan* : ${pesan}\n➸ *Isi* : ${Isi}`
                        zfa.reply(from, rn, id)
                    } catch (err) {
                        zfa.reply(from, 'Error!', id)
                    }
                    break
		case prefix+'indohot':
		              const dsa = await get.get(`https://arugaz.herokuapp.com/api/indohot`).json()
                        const {
                            country,
                            durasi,
                            genre,
                            judul,
                            url
                        } = await dsa.result
                        await zfa.sendText(from, `*Judul* : ${judul}\n*Durasi* : ${durasi}\n*Genre* : ${genre}\n*Negara* : ${country}\n*Link* : ${url}`, id)
                    break
					
		case prefix+'cerpen':
		     const skyaaa = await get.get('https://arugaz.herokuapp.com/api/cerpen').json()
                    zfa.reply(from, skyaaa.result, id)
                    break
					
		case prefix+'minion':
		     const jokqass = body.slice(8)
                    const jokiqass = await get.get('http://nzcha-api.herokuapp.com/styletext/minion?text1=' + jokqass).json()
                    zfa.sendFileFromUrl(from, jokiqass.result, id)
                    break
					
		case prefix+'space':
		     arg = body.trim().split('|')
                    const sp = arg[1]
                    const ace = arg[2]
                    if (args === 1) return zfa.reply(from, 'Silakan gunakan #space |<teks>|<teks2>', id)
                    const prona = await get.get(`http://nzcha-api.herokuapp.com/styletext/space?text1=${sp}&text2=${ace}`).json()
                    zfa.sendFileFromUrl(from, prona.result, id)
                    break
					
		case prefix+'sunset':
		     const jokqas = body.slice(8)
                    const jokiqas = await get.get('http://nzcha-api.herokuapp.com/styletext/senja?text1=' + jokqas).json()
                    zfa.sendFileFromUrl(from, jokiqas.result, id)
                    break
					
		case prefix+'avenger':
		case prefix+'avengers':
		     arg = body.trim().split('|')
                    const spa = arg[1]
                    const acea = arg[2]
                    if (args === 1) return zfa.reply(from, 'Silakan gunakan !avengers |<teks>|<teks2>', id)
                    const pronaa = await get.get(`http://nzcha-api.herokuapp.com/styletext/avenger?text1=${spa}&text2=${acea}`).json()
                    zfa.sendFileFromUrl(from, pronaa.result, id)
                    break
					
	    case prefix+'codmw':
		     const joka = body.slice(7)
                    const jokia = await get.get('http://nzcha-api.herokuapp.com/styletext/codmw?text1=' + joka).json()
                    zfa.sendFileFromUrl(from, jokia.result, id)
                    break
					
		case prefix+'joker':
		      const jok = body.slice(7)
                    const joki = await get.get('http://nzcha-api.herokuapp.com/styletext/jokerlogo?text1=' + jok).json()
                    zfa.sendFileFromUrl(from, joki.result, id)
                    break
					
		case prefix+'glow':
		    const graffity = body.slice(6)
                    const graffitystrz = await get.get('http://nzcha-api.herokuapp.com/styletext/advglow?text1=' + graffity).json()
                    zfa.sendFileFromUrl(from, graffitystrz.result, id)
                    break
					
		case prefix+'phub':
		 arg = body.trim().split('|')
                    const porn = arg[1]
                    const hub = arg[2]
                    if (args === 1) return zfa.reply(from, 'Silakan gunakan !phub |<teks>|<teks2>', id)
                    const pron = await get.get(`http://nzcha-api.herokuapp.com/styletext/phub?text1=${porn}&text2=${hub}`).json()
                    zfa.sendFileFromUrl(from, pron.result, id)
                    break
					
		case prefix+'ytsearch':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return zfa.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return zfa.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return zfa.reply(from, `Kirim perintah *${prefix}ytsearch [ Query ]*, Contoh : #ytsearch alan walker alone`)
            const ytsher = body.slice(10)
            zfa.reply(from, mess.wait, id)
            try {
                const response2 = await fetch(`https://api.vhtear.com/youtube?query=${encodeURIComponent(ytsher)}&apikey=${vhtearkey}`)
                if (!response2.ok) throw new Error(`unexpected response ${response2.statusText}`)
                const jsonserc = await response2.json()
                const { result } = await jsonserc
                let xixixi = `*「 YOUTUBE SEARCH 」*\n\n*Hasil Pencarian : ${ytsher}*\n`
                for (let i = 0; i < result.length; i++) {
                    xixixi += `\n─────────────────\n\n• *Judul* : ${result[i].title}\n• *Ditonton* : ${result[i].views}\n• *Durasi* : ${result[i].duration}\n• *Channel* : ${result[i].channel}\n• *URL* : ${result[i].urlyt}\n`
                }
                await zfa.sendFileFromUrl(from, result[0].image, 'thumbserc.jpg', xixixi, id)
                await limitAdd(serial)
            } catch (err) {
                    console.log(err)
                    await zfa.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Video tidak ditemukan')
                    zfa.sendText(ownerNumber, 'YT Search Error : ' + err)
            }
            break
		case prefix+'igstalk':
		case prefix+'stalkig':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            //if (!isGroupMsg) return zfa.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return zfa.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1)  return zfa.reply(from, 'Kirim perintah #tiktokstalk @username\nContoh #tiktokstalk @duar_amjay', id)
            argz = body.trim().split(' ')
            console.log(...argz[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const igstalk = await slicedArgs.join(' ')
            console.log(igstalk)
            try {                                   // 'http://api.lolhuman.xyz/api/stalkig/username?=' + igstalk + 'apikey=7ae631348bca4b16425b40a0'
            const igstalk2 = await axios.get('http://api.lolhuman.xyz/api/stalkig/username?=' + igstalk + 'apikey=7ae631348bca4b16425b40a0')
            const { Name, Username, Jumlah_Followers, Jumlah_Following,  Jumlah_Post,  Biodata, Profile_pic } = igstalk2.data.result
            const igeh = `User Ditemukan!
➸ Nama : ${Name}
➸ Username : ${Username}
➸ Jumlah Followers : ${Jumlah_Followers}
➸ Jumlah Following : ${Jumlah_Following}
➸ Jumlah Postingan : ${Jumlah_Post}
➸ Biodata : ${Biodata}`

            const pictk = await bent("buffer")(Profile_pic)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            zfa.sendImage(from, base64, title, igeh)
            await limitAdd(serial)
            } catch (err) {
             console.error(err.message)
             await zfa.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
             zfa.sendText(ownerNumber, 'Error IGstalk : '+ err)
           }
          break
		  case prefix+'shopee':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return zfa.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return zfa.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return zfa.reply(from, `Kirim perintah *${prefix}shopee [ Query ]*, Contoh : *${prefix}shopee HP Samsul a20*`)
            const shopek = body.slice(8)
            zfa.reply(from, mess.wait, id)
            try {                             
                const dataplai = await axios.get(`http://api.lolhuman.xyz/api/shopee?apikey=7ae631348bca4b16425b40a0&query=${shopek}`)
                const dataplay = dataplai.data.result
                 let shopeq = `*「 SHOPEE 」*\n\n*Hasil Pencarian : ${shopek}*\n`
                for (let i = 0; i < dataplay.items.length; i++) {
                    shopeq += `\n─────────────────\n\n• *Nama* : ${dataplay.items[i].nama}\n• Harga* : ${dataplay.items[i].harga}\n• *Terjual* : ${dataplay.items[i].terjual}\n• *Lokasi Toko* : ${dataplay.items[i].shop_location}\n• *Deskripsi* : ${dataplay.items[i].description}\n• *Link Product : ${dataplay.items[i].link_product}*\n`
                }
                await zfa.sendFileFromUrl(from, dataplay.items[0].image_cover, `shopee.jpg`, shopeq, id)
                await limitAdd(serial)
            } catch (err){
                console.log(err)
            }
            break
		 case prefix+'playapik':
            if (args.length == 0) return zfa.reply(from, `Untuk mencari detail film dan link download film gunakan ${prefix}playapik id movie\nContoh : ${prefix}playapik 142455`, id)
            axios.get(`https://olabdev-api.herokuapp.com/api/filmapik/play?id=142455&apikey=OgggyBot ${body.slice(10)}`)
            .then(async (res) => {
				const linkapik = res.data.link
				await zfa.sendLinkWithAutoPreview(from, linkapik)
				.catch(() => {
					zfa.reply(from, 'Error', id)
			})
			})
			.catch((err) => {
				console.log(err)
			})
            break
		case prefix+'textmaker':
                if(isReg(obj)) return
                if(cekumur(cekage)) return
                if (!isGroupMsg) return zfa.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (isLimit(serial)) return zfa.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
                argz = body.trim().split('|')
                zfa.reply(from, '[WAIT] Sedang di proses⏳ silahkan tunggu ± 1 min!', id)
                if ((isMedia || isQuotedImage) && argz.length >= 2) {
                const top = argz[1]
                const bott = argz[2]
                const encryptMedia = isQuotedImage ? quotedMsg : message
                const mediaData = await decryptMedia(encryptMedia, uaOverride)
                const getUrl = await uploadImages(mediaData, false)
                const ImageBase64 = await custom(getUrl, top, bott)
                await zfa.sendFile(from, ImageBase64, 'image.png','neh...')
                await limitAdd(serial)
                } else {
                await zfa.reply(from, 'Wrong Format!', id)
                }
                break
        case prefix+'quotemaker':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return zfa.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return zfa.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            argz = body.trim().split('|')
            if (argz.length >= 4) {
                zfa.reply(from, mess.wait, id)
                const quotes = argz[1]
                const author = argz[2]
                const theme = argz[3]
                await quotemaker(quotes, author, theme).then(amsu => {
                    limitAdd(serial)
                    zfa.sendFile(from, amsu, 'quotesmaker.jpg','neh...').catch(() => {
                       zfa.reply(from, mess.error.Qm, id)
                    })
                })
            } else {
                zfa.reply(from, 'Usage: \n#quotemaker |teks|watermark|theme\n\nEx :\n#quotemaker |ini contoh|bicit|random', id)
            }
            break
		case prefix+'filmapik':
                        if (args.length == 0) return zfa.reply(from, `Mencari sebuah film dari Website Film Apik!\nContoh : ${prefix}filmapik Revolutionary Love`, id)
                        await zfa.reply(from, mess.wait, id)
                        const pilem = body.slice(10)
						axios.get(`https://olabdev-api.herokuapp.com/api/filmapik/search?film=avenger&apikey=OggyBot`)
						.then(async(res) => {
                            await zfa.sendFileFromUrl(from, res.data.result[0].detail.thumbnailLandscape, 'thumb.jpg', `• *Judul :* ${res.data.result[0].title}\n• *Rating :* ${res.data.result[0].rating}\n• *Quality :* ${res.data.result[0].quality}\n• *Id Movie :* ${res.data.result[0].movieId}\n• *Views :* ${res.data.result[0].detail.views}\n• *Genre :* ${res.data.result[0].detail.genre}\n• *Director :* ${res.data.result[0].detail.director}\n• *Actors :* ${res.data.result[0].detail.actors}\n• *Country :* ${res.data.result[0].detail.country}\n• *Duration :* ${res.data.result[0].detail.duration}\n• *Release Year :* ${res.data.result[0].detail.release}\n\n• *Description :* ${res.data.result[0].detail.description}`, id)
                            console.log('Success sending Movie From Query')
                        })
						.catch((err) => {
							console.log(err)
						})
                        break
	     case 'prefix':
            zfa.reply(from, `PREFIX YANG SAAT INI DIGUNAKAN *「* ${prefix} *」*`)
            break
        case prefix+'setprefix':
            if(!isOwner) return zfa.reply(from, `Fitur ini hanya untuk Zidan tersayang :*`, id)
            if (args.length === 1) return zfa.reply(from, `Kirim perintah *${prefix}prefix [ NEW PREFIX ]*`, id)
            prefix = args[1]
            zfa.sendText(from, `Berhasil Mengganti Prefix Ke *「* ${prefix} *」*`)
            break
        case prefix+'addbadword':
            if (!isAdmin) return zfa.reply(from, `Perintah ini hanya bisa di gunakan oleh Admin Raisa!`, id)
            if (!args.length >= 1) return zfa.reply(from, `Masukkan kata kasar yang akan di blacklist `, id) 
            const word = body.slice(12)
            var cek = dbbadword.includes(word);
            if(cek){
                return zfa.reply(from, `Badword Sudah Ada Di Database`, id)
            } else { 
                dbbadword.push(word)
                fs.writeFileSync('./lib/database/katakasar.json', JSON.stringify(dbbadword))
                zfa.reply(from, `Success Menambahkan Blacklist Badword\nTotal Data Badword Sekarang : *${dbbadword.length - 1}*`, id)
            }
            break
        case prefix+'delbadword':
            if (!isOwner) return zfa.reply(from, `Fitur ini hanya untuk Zidan tersayang :*`, id)
                const delbd = dbbadword.indexOf(body.slice(12))
                dbbadword.splice(delbd, 1)
                fs.writeFileSync('./lib/database/katakasar.json', JSON.stringify(dbbadword))
                zfa.reply(from, `Success Menghapus Badword!`, id)
            break
        case prefix+'listbadword':
            if (!isAdmin) return zfa.reply(from, `Perintah ini hanya bisa di gunakan oleh Admin Raisa!`, id)
                const bad = fs.readFileSync('./lib/database/katakasar.json')
                const liste = JSON.parse(bad)
                let listz = '*「 LIST BADWORD 」*\n'
                listz += `*Total : ${liste.length}*\n`
                let nomre = 1
                     for (let i = 0; i < liste.length; i++){
                        listz += `\n*${nomre}.* ${liste[i]}`
                        nomre++
                    }
                    zfa.sendText(from, listz) 
                    break
		case prefix+'getses':
            if (!isOwner) return zfa.reply(from, 'Perintah ini hanya untuk Owner Raisa', id)            
            const sesPic = await zfa.getSnapshot()
            zfa.sendFile(from, sesPic, 'session.png', 'Nih boss', id)
            break
        case prefix+'raisaadmin':
            let admn = `This is list of Raisa Admin\nTotal : ${adminNumber.length}\n`
            for (let i of adminNumber) {
                admn += `➸ ${i.replace(/@c.us/g,'')}\n`
            }
            await zfa.reply(from, admn, id)
            break
		case prefix+'ban':
           if (!isOwner) return zfa.reply(from, 'FItur ini hanya untuk Zidan Tersayang :*', id)
            for (let i = 0; i < mentionedJidList.length; i++) {
                if ((adminNumber).includes(mentionedJidList[i])) return zfa.reply(from,`Maaf ${pushname}, Kamu tidak bisa banned Admin Raisa!`, id)
                banned.push(mentionedJidList[i])
                fs.writeFileSync('./lib/banned.json', JSON.stringify(banned))
                zfa.reply(from, `Succes ban target!`,id)
            }
            break
        case prefix+'unban':
            if (!isOwner) return zfa.reply(from, 'FItur ini hanya untuk Zidan Tersayang :*', id)
                let inz = banned.indexOf(mentionedJidList[0])
                banned.splice(inz, 1)
                fs.writeFileSync('./lib/database/banned.json', JSON.stringify(banned))
                zfa.reply(from, 'Unbanned User!', id)
            break
		case prefix+'ping':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            const loadedMsg = await zfa.getAmountOfLoadedMessages()
            const botadmins = await zfa.iAmAdmin()
            const blockedd = await zfa.getBlockedIds()
            const chatIds = await zfa.getAllChatIds()
            const groups = await zfa.getAllGroups()
            const me = await zfa.getMe()
            const battery = await zfa.getBatteryLevel()
            const isCharging = await zfa.getIsPlugged()
            const timestamp = speed();
            const latensi = speed() - timestamp
            await zfa.reply(from, `*「 𝗦𝗧𝗔𝗧𝗨𝗦 𝗣𝗖 」*\nPenggunaan RAM: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB\nCPU: ${os.cpus()[0].model}\n\n*「 𝗦𝗧𝗔𝗧𝗨𝗦 𝗠𝗘𝗦𝗦𝗔𝗚𝗘 」* :\n- *${loadedMsg}* Loaded Messages\n- *${chatIds.length - groups.length}* Total Chats\n  ├ *${groups.length}* Group Chats\n  └ *${chatIds.length}* Personal Chats\n- *${groups.length}* Groups Joined\n\n*「 𝗦𝗧𝗔𝗧𝗨𝗦 𝗨𝗦𝗘𝗥 」*\n- *${pendaftar.length}* Registered User\n  ├ *${banned.length}* Banned User\n  ├ *${blockedd.length}* Blocked User\n  └ *${adminNumber.length}* Admin User\n\n*「 𝗦𝗧𝗔𝗧𝗨𝗦 𝗗𝗘𝗩𝗜𝗖𝗘 」*\n${(`\n*Battery* : ${battery}% ${isCharging ? 'Lagi Di Cas...' : 'Ga Di Cas!'}\n${Object.keys(me.phone).map(key => `${key} : ${me.phone[key]}`).join('\n')}`.slice(1, -1))}\n\n\n*Speed:* ${latensi.toFixed(4)} _Second_`, id)
            break
        case prefix+'listgroup':
                zfa.getAllGroups().then((res) => {
                let berhitung1 = 1
                let gc = `*This is list of group* :\n`
                for (let i = 0; i < res.length; i++) {
                    gc += `\n═════════════════\n\n*No : ${i+1}*\n*Nama* : ${res[i].name}\n*Pesan Belum Dibaca* : ${res[i].unreadCount} chat\n*Tidak Spam* : ${res[i].notSpam}\n`
                }
                zfa.reply(from, gc, id)
            })
            break
		 case prefix+'setgcname':
            if (!isGroupMsg) return zfa.reply(from, `Fitur ini hanya bisa di gunakan dalam group`, id)
            if (!isGroupAdmins) return zfa.reply(from, `Fitur ini hanya bisa di gunakan oleh admin group`, id)
            if (!isBotGroupAdmins) return zfa.reply(from, `Fitur ini hanya bisa di gunakan ketika bot menjadi admin`, id)
            const namagrup = body.slice(14)
            let sebelum = chat.groupMetadata.formattedName
            let halaman = global.page ? global.page : await zfa.getPage()
            await halaman.evaluate((chatId, subject) =>
            Store.WapQuery.changeSubject(chatId, subject),groupId, `${namagrup}`)
            zfa.sendTextWithMentions(from, `Nama group telah diubah oleh admin @${sender.id.replace('@c.us','')}\n\n• Before: ${sebelum}\n• After: ${namagrup}`)
            break
        case prefix+'setgcpp':
            if (!isGroupMsg) return zfa.reply(from, `Fitur ini hanya bisa di gunakan dalam group`, id)
            if (!isGroupAdmins) return zfa.reply(from, `Fitur ini hanya bisa di gunakan oleh admin group`, id)
            if (!isBotGroupAdmins) return zfa.reply(from, `Fitur ini hanya bisa di gunakan ketika bot menjadi admin`, id)
            if (isMedia) {
                const mediaData = await decryptMedia(message)
                const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                await zfa.setGroupIcon(from, imageBase64)
                zfa.sendTextWithMentions(from, `Profile group telah diubah oleh admin @${sender.id.replace('@c.us','')}`)
            } else if (quotedMsg && quotedMsg.type == 'image') {
                const mediaData = await decryptMedia(quotedMsg)
                const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                await zfa.setGroupIcon(from, imageBase64)
                zfa.sendTextWithMentions(from, `Profile group telah diubah oleh admin @${sender.id.replace('@c.us','')}`)
            } else {
                zfa.reply(from, `Wrong Format!\n⚠️ Harap Kirim Gambar Dengan #setgroupicon`, id)
            }
            break
        case prefix+'listbanned':
            let bened = `This is list of banned number\nTotal : ${banned.length}\n`
            for (let i of banned) {
                bened += `➸ ${i.replace(/@c.us/g,'')}\n`
            }
            await zfa.reply(from, bened, id)
            break
        case prefix+'listblock':
            let hih = `This is list of blocked number\nTotal : ${blockNumber.length}\n`
            for (let i of blockNumber) {
                hih += `➸ ${i.replace(/@c.us/g,'')}\n`
            }
            await zfa.reply(from, hih, id)
            break
		case prefix+'gift': // Hanya Admin & Owner Raisa yang bisa gift Limit
            if (!isAdmin, !isOwner) return zfa.reply(from, `Maaf, perintah ini hanya dapat dilakukan oleh Admin Raisa!`, id)
                    const nomerr = arg.split(' ')[0]
                    const jmla = arg.split(' ')[1]
                    if(!nomerr) return zfa.reply(from, `Masukkan nomor yang akan di gift, ${prefix}gift [ @tagmember Jumlah ]\n=> Contoh : ${prefix}gift @6281310253704 9999999999999999999`, id)
                    let texta = nomerr.replace(/[-\s+@c.us]/g,'')
                    const cusz = texta + '@c.us'
                    if(!jmla) return zfa.reply(from, `Masukkan Jumlah gift quota, ${prefix}gift [ @tagmember Jumlah ]\n=> Contoh : ${prefix}gift @6281310253704 9999999999999999999`, id)
                    if(jmla > 9999999999999999999) return await zfa.reply(from, `Maximal  9999999999999999999!`, id)
                        var found = false
                        Object.keys(limit).forEach((i) => {
                            if(limit[i].id == cusz){
                                found = i
                            }
                        })
                        if (found !== false) {
                            limit[found].limit = Math.max(0, limit[found].limit);
                            if(limit[found].limit <= 20) return zfa.reply(from, `Kuota Limit pada nomor tersebut masih penuh\nUntuk gift pastikan kuota limit target sudah habis`, id)
                            if(limit[found].limit <= 0) { // JIKA LIMIT 0 MAKA BISA GIFT
                                return zfa.reply(from, `Kuota limit pada nomor tersebut sudah penuh!`, id)
                            }else{
                            limit[found].limit -= jmla
                            const updated = limit[found]
                            const result = `Gift kuota limit sukses dengan SN: ${SN} pada ${moment().format('DD/MM/YY HH:mm:ss')}
*「 GIFT KUOTA LIMIT 」*

• User : @${updated.id.replace('@c.us','')}
• Limit: ${limitCount-updated.limit}`
                            console.log(limit[found])
                            fs.writeFileSync('./lib/database/limit.json',JSON.stringify(limit));
                            zfa.sendTextWithMentions(from, result)
                            }
                        } else {
                                zfa.reply(from, `Maaf, nomor itu tidak terdaftar di database!`, id)
                        }
                break
		case prefix+'addadmin':
            if (!isOwner) return zfa.reply(from, 'FItur ini hanya untuk Zidan Tersayang :*', id)
                for (let i = 0; i < mentionedJidList.length; i++) {
                adminNumber.push(mentionedJidList[i])
                fs.writeFileSync('./lib/database/admin.json', JSON.stringify(adminNumber))
                zfa.reply(from, 'Success Menambahkan Admin Raisa!', id)
                }
            break
        case prefix+'deladmin':
            if (!isOwner) return zfa.reply(from, 'FItur ini hanya untuk Zidan Tersayang :*', id)
                let inq = adminNumber.indexOf(mentionedJidList[0])
                adminNumber.splice(inq, 1)
                fs.writeFileSync('./lib/database/admin.json', JSON.stringify(adminNumber))
                zfa.reply(from, 'Success Menghapus Admin Raisa!', id)
            break
        case prefix+'block':
            if (!isOwner) return zfa.reply(from, 'FItur ini hanya untuk Zidan Tersayang :*', id)
            for (let i = 0; i < mentionedJidList.length; i++) {
                let unblock = `${mentionedJidList[i]}`
                await zfa.contactBlock(unblock).then((a)=>{
                    console.log(a)
                    zfa.reply(from, `Success block ${args[1]}!`, id)
                })
            }
            break
		case prefix+'take':
                    if (quotedMsg && quotedMsg.type == 'sticker' || quotedMsg && quotedMsg.type == 'image') {
                        argz = body.trim().split('|') //zfa.reply(from, 'Contoh #take |Raisa Punya|ZidanGanzz', id)
                        await zfa.reply(from, mess.wait, id)
                        const packnames = argz[1]
                        const authors = argz[2]
                        const mediaData = await decryptMedia(quotedMsg)
                        const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                        await zfa.sendImageAsSticker(from, imageBase64, { author: `${authors}`, pack: `${packnames}` })
                        .catch(async (err) => {
                            console.error(err)
                            await zfa.reply(from, 'Error!', id)
                        })
                    } else if(isMedia && type === 'image' || isMedia && type === 'sticker') {
						await zfa.reply(from, mess.wait, id)
                        const packnames = argz[1]
                        const authors = argz[2]
                        const mediaData = await decryptMedia(message, uaOverride)
						const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                        await zfa.sendImageAsSticker(from, imageBase64, { author: `${authors}`, pack: `${packnames}` })
					} else {
						zfa.reply(from, 'format pesan salah kak', id)
					}
        break
		case prefix+'stickertoimg':
		case prefix+'toimg':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (quotedMsg && quotedMsg.type == 'sticker') {
                const mediaData = await decryptMedia(quotedMsg)
                zfa.reply(from, `Bentar ya kak lagi Raisa proses nih mohon tunggu sebentar....`, id)
                const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                await zfa.sendFile(from, imageBase64, 'imagesticker.jpg', 'Yeay! Berhasil.... Kak raisa minta tolong subscribe channel youtube owner aku: https://youtube.com/zidanfadilaharsazfaa', id)
            } else if (!quotedMsg) return zfa.reply(from, `Mohon tag sticker yang ingin dijadikan gambar!`, id)
            break
	    case prefix+'stickergif': // INSTALL FFMPEG, IF YOU WANT THIS COMMAND WORK!
        case prefix+'stikergif': // TUTORIAL IN README, PLEASE READ!
        case prefix+'sgif': // MRHRTZ
            zfa.reply(from, `Bentar ya kak lagi Raisa proses nih mohon tunggu sebentar....`, id)
            if (isMedia && type === 'video' || mimetype === 'image/gif') {
                try {
                    const mediaData = await decryptMedia(message, uaOverride)
                    await zfa.sendMp4AsSticker(from, mediaData, {fps: 10, startTime: `00:00:00.0`, endTime : `00:00:05.0`,loop: 0})
                } catch (e) {
                    zfa.reply(from, `Size media terlalu besar! mohon kurangi durasi video.`)
                }
            } else if (quotedMsg && quotedMsg.type == 'video' || quotedMsg && quotedMsg.mimetype == 'image/gif') {
                const mediaData = await decryptMedia(quotedMsg, uaOverride)
                await zfa.sendMp4AsSticker(from, mediaData, {fps: 10, startTime: `00:00:00.0`, endTime : `00:00:05.0`,loop: 0})
            } else {
                zfa.reply(from, `Kesalahan ⚠️ Hanya bisa video/gif apabila file media berbentuk gambar ketik #stickergif`, id)
            } 
            break
		case prefix+'stickerlightning':
        case prefix+'slightning':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            zfa.reply(from, `Bentar ya kak lagi Raisa proses nih mohon tunggu sebentar....`, id)
            if (isMedia && type === 'image') {
                const mediaData = await decryptMedia(message, uaOverride)
                const getUrle = await uploadImages(mediaData, false)
                const imgnye = await stickerlight(getUrle)
                const Slight = imgnye.result.imgUrl
                await zfa.sendStickerfromUrl(from, Slight)
            } else if (quotedMsg && quotedMsg.type == 'image') {
                const mediaData = await decryptMedia(quotedMsg, uaOverride)
                const getUrle = await uploadImages(mediaData, false)
                const imgnye = await stickerlight(getUrle)
                const Slight = imgnye.result.imgUrl
                await zfa.sendStickerfromUrl(from, Slight)
            } else {
                await zfa.reply(from, `Wrong Format!\n⚠️ Harap Kirim Gambar Dengan #stickerlightning`, id)
            }
            break
        case prefix+'stickerfire':
        case prefix+'sfire':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            zfa.reply(from, `Bentar ya kak lagi Raisa proses nih mohon tunggu sebentar....`, id)
            if (isMedia && type === 'image') {
                const mediaData = await decryptMedia(message, uaOverride)
                const getUrli = await uploadImages(mediaData, false)
                const imgnya = await stickerburn(getUrli)
                const Sfire = imgnya.result.imgUrl
                await zfa.sendStickerfromUrl(from, Sfire)
            } else if (quotedMsg && quotedMsg.type == 'image') {
                const mediaData = await decryptMedia(quotedMsg, uaOverride)
                const getUrli = await uploadImages(mediaData, false)
                const imgnya = await stickerburn(getUrli)
                const Sfire = imgnya.result.imgUrl
                await zfa.sendStickerfromUrl(from, Sfire)
            } else {
                await zfa.reply(from, `Wrong Format!\n⚠️ Harap Kirim Gambar Dengan #stickerfire`, id)
            }
            break
		case prefix+'emojisticker':
        case prefix+'emojistiker':
                if (args.length === 1) return zfa.reply(from, 'Wrong format', id)
                const emoji = emojiUnicode(args[0])
                console.log('Creating emoji code for =>', emoji)
                await zfa.sendStickerfromUrl(from, `https://api.vhtear.com/emojitopng?code=${emoji}&apikey=${config.vhtear}`)
                    .then(async () => {
                        await zfa.reply(from, ind.ok(), id)
                        console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await zfa.reply(from, 'Emoji not supported!', id)
                    })
            break
		case prefix+'resetbadword':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
                    if(isLimit(serial)) return
                    if (!isGroupAdmins) return zfa.reply(from, 'Command ini hanya dapat digunakan oleh admin grup')  
                    if (!args.length === 1) return zfa.reply(from, 'Masukkan nomornya, *GUNAKAN AWALAN 62*\ncontoh: #resetbadword 6285112554122 / #resetbadword @member') 
                    const nomer = args[1]
                    let text = nomer.replace(/[-\s+@c.us]/g,'')
                    const cus = text + '@c.us'
                        var found = false
                        Object.keys(msgBadword).forEach((i) => {
                            if(msgBadword[i].id == cus){
                                found = i
                            }
                        })
                        if (found !== false) {
                            msgBadword[found].msg = 1;
                            const result = 'DB Badword Spam has been reset'
                            console.log(msgBadword[found])
                            fs.writeFileSync('./lib/database/msgBadword.json',JSON.stringify(msgBadword));
                            zfa.reply(from, result, from)
                            limitAdd(serial)
                        } else {
                                zfa.reply(from, `${monospace(`Di database ngga ada nomer itu dik`)}`, id)
                        }
                break
		case prefix+'setname':
            if (!isOwner) return zfa.reply(from, `FItur ini hanya untuk Zidan Tersayang :*`, id)
                const setnem = body.slice(9)
                await zfa.setMyName(setnem)
                zfa.sendTextWithMentions(from, `Makasih Nama Barunya @${sender.id.replace('@c.us','')} 😘`)
            break
        case prefix+'setstatus':
            if (!isOwner) return zfa.reply(from, `FItur ini hanya untuk Zidan Tersayang :*`, id)
                const setstat = body.slice(11)
                await zfa.setMyStatus(setstat)
                zfa.sendTextWithMentions(from, `Makasih Status Barunya @${sender.id.replace('@c.us','')} 😘`)
            break
        case prefix+'setppraisa':
            if (!isOwner) return zfa.reply(from, `FItur ini hanya untuk Zidan Tersayang :*`, id)
            if (isMedia) {
                const mediaData = await decryptMedia(message)
                const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                await zfa.setProfilePic(imageBase64)
                zfa.sendTextWithMentions(`Makasih @${sender.id.replace('@c.us','')} Foto Profilenya 😘`)
            } else if (quotedMsg && quotedMsg.type == 'image') {
                const mediaData = await decryptMedia(quotedMsg)
                const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                await zfa.setProfilePic(imageBase64)
                zfa.sendTextWithMentions(from, `Makasih @${sender.id.replace('@c.us','')} Foto Profilenya 😘`)
            } else {
                zfa.reply(from, `Wrong Format!\n⚠️ Harap Kirim Gambar Dengan #setprofilepic`, id)
            }
            break
        case prefix+'unblock':
            if (!isOwner) return zfa.reply(from, 'Perintah ini hanya bisa di gunakan oleh Owner Raisa!', id)
            for (let i = 0; i < mentionedJidList.length; i++) {
                let unblock = `${mentionedJidList[i]}`
                await zfa.contactUnblock(unblock).then((a)=>{
                    console.log(a)
                    zfa.reply(from, `Success unblok ${args[1]}!`, id)
                })
            } 
            break
        case prefix+'limit':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return zfa.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            var found = false
            const limidat = JSON.parse(fs.readFileSync('./lib/database/limit.json'))
            for(let lmt of limidat){
                if(lmt.id === serial){
                    let limitCounts = limitCount-lmt.limit
                    if(limitCounts <= 0) return zfa.reply(from, `Limit request anda sudah habis\n\n_Note : Limit akan direset setiap jam 21:00!_`, id)
                    zfa.reply(from, `Sisa limit request anda tersisa : *${limitCounts}*\n\n_Note : Limit akan direset setiap jam 21:00!_`, id)
                    found = true
                }
            }
            console.log(limit)
            console.log(limidat)
            if (found === false){
                let obj = {id: `${serial}`, limit:1};
                limit.push(obj);
                fs.writeFileSync('./lib/database/limit.json',JSON.stringify(limit, 1));
                zfa.reply(from, `Sisa limit request anda tersisa : *${limitCount}*\n\n_Note : Limit akan direset setiap jam 21:00!_`, id)
            }
            break
		 case prefix+'delete':
            if (!isGroupMsg) return zfa.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return zfa.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            if (!quotedMsg) return zfa.reply(from, 'Salah!!, kirim perintah *#delete [tagpesanbot]*', id)
            if (!quotedMsgObj.fromMe) return zfa.reply(from, 'Salah!!, Bot tidak bisa mengahpus chat user lain!', id)
            zfa.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
            break
        case prefix+'sider':
            if (!isGroupMsg) return zfa.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)                
            if (!quotedMsg) return zfa.reply(from, `Tolong Reply Pesan Raisa`, id)
            if (!quotedMsgObj.fromMe) return zfa.reply(from, `Tolong Reply Pesan Raisa`, id)
            try {
                const reader = await zfa.getMessageReaders(quotedMsgObj.id)
                let list = ''
                for (let pembaca of reader) {
                list += `- @${pembaca.id.replace(/@c.us/g, '')}\n` 
            }
                zfa.sendTextWithMentions(from, `Ciee, Ngeread... Suka Sama Raisa Yah....\n${list}`)
            } catch(err) {
                console.log(err)
                zfa.reply(from, `Maaf, Belum Ada Yang Membaca Pesan Raisa atau Mereka Menonaktifkan Read Receipts`, id)    
            }
            break
        case prefix+'linkgroup':
		case prefix+'gclink':
		case prefix+'linkgc':
		case prefix+'link':
            if (!isGroupMsg) return zfa.reply(from, `Fitur ini hanya bisa di gunakan dalam group`, id)
            if (!isGroupAdmins) return zfa.reply(from, `Fitur ini hanya bisa di gunakan oleh admin group`, id)
            if (!isBotGroupAdmins) return zfa.reply(from, `Fitur ini hanya bisa di gunakan ketika bot menjadi admin`, id)
            const namagcnye = chat.formattedTitle
            var gclink = await zfa.getGroupInviteLink(groupId)
            var linkgc  = `Link group : *${namagcnye}*\n\n ${gclink}`
            zfa.reply(from, linkgc, id)
            break
        case prefix+'resetlinkgroup':
		case prefix+'resetlinkgc':
		case prefix+'resetlink':
            if (!isGroupMsg) return zfa.reply(from, `Fitur ini hanya bisa di gunakan dalam group`, id)
            if (!isGroupAdmins) return zfa.reply(from, `Fitur ini hanya bisa di gunakan oleh admin group`, id)
            if (!isBotGroupAdmins) return zfa.reply(from, `Fitur ini hanya bisa di gunakan ketika bot menjadi admin`, id)
            if (isGroupMsg) {
                await zfa.revokeGroupInviteLink(groupId);
                zfa.sendTextWithMentions(from, `Link group telah direset oleh admin @${sender.id.replace('@c.us', '')}`)
            }
            break
		case prefix+'magernulis1': // BY MFARELS
		case prefix+'nulis':
		case prefix+'raisanulis':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (args.length === 1) return await zfa.reply(from, 'Kirim perintah *prefix+magernulis1 [teks]*', id)  // BY MFARELS
            const farel = body.slice(13)  // YOUTUBE : MFARELS CH
            await zfa.reply(from, mess.magernulissatu, id)  // INSTAGRAM : @mfarelsyahtiawan
            const zahra = farel.replace(/(\S+\s*){1,10}/g, '$&\n')  // INSTALL IMAGEMAGICK KALO WAU WORK
            const farelzahra = zahra.split('\n').slice(0, 33).join('\n')  // WAKTU INSTALL IMAGEMAGICK CENTANG KOLOM 1,2,3,5,6
            var months = ['- 1 -', '- 2 -', '- 3 -', '- 4 -', '- 5 -', '- 6 -', '- 7 -', '- 8 -', '- 9 -', '- 10 -', '- 11 -', '- 12 -'];
            var myDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
            var date = new Date();
            var day = date.getDate();
            var month = date.getMonth();
            var thisDay = date.getDay(),
                thisDay = myDays[thisDay];
            var yy = date.getYear();
            var year = (yy < 1000) ? yy + 1900 : yy;
            const zahrafarel = (day + ' ' + months[month] + ' ' + year)
            const farelllzahraaa = (thisDay)
            spawn('convert', [
                './mager/magernulis/magernulis1.jpg',
                '-font',
                './font/Zahraaa.ttf',
                '-size',
                '700x960',
                '-pointsize',
                '100',
                '-interline-spacing',
                '1',
                '-annotate',
                '+4100+460',
                farelllzahraaa,
                '-font',
                './font/Zahraaa.ttf',
                '-size',
                '700x960',
                '-pointsize',
                '100',
                '-interline-spacing',
                '1',
                '-annotate',
                '+4100+640',
                zahrafarel,
                '-font',
                './font/Zahraaa.ttf',
                '-size',
                '6000x8000',
                '-pointsize',
                '130',
                '-interline-spacing',
                '1',
                '-annotate',
                '+1010+1010',
                farelzahra,
                './mager/magernulis√/magernulis1√.jpg'
            ])
            .on('error', () => zfa.reply(from, 'Error Bjeer', id))
            .on('exit', () => {
                zfa.sendImage(from, './mager/magernulis√/magernulis1√.jpg', 'magernulis.jpg', '*Sukses Nulis DiBuku✓*\n\n*YouTube : MFarelS CH*\n*Instagram : @mfarelsyahtiawan*\n\n*© Powered By MFarelS | RajinNulis-BOT*', id)
            })
            break  // BY MFARELS
		case prefix+'join':
           // if (args.length === 1) return zfa.reply(from, 'Hanya Owner yang bisa memasukan Bot ke dalam Grup!', id)
           // if (!isOwner) return zfa.reply(from, 'Fitur Ini Hanya Untuk Zidan Tersayang :*', id)
            const link = body.slice(6)
            const tGr = await zfa.getAllGroups()
            const minMem = 5
            const isLink = link.match(/(https:\/\/chat.whatsapp.com)/gi)
            const check = await zfa.inviteInfo(link)
            if (!isLink) return zfa.reply(from, 'Ini link? 👊🤬', id)
            if (tGr.length > 256) return zfa.reply(from, 'Maaf jumlah group sudah maksimal!', id)
            if (check.size < minMem) return zfa.reply(from, 'Member group tidak melebihi 5, bot tidak bisa masuk', id)
            if (check.status === 200) {
                await zfa.joinGroupViaLink(link).then(() => zfa.reply(from, 'Raisa Akan Masuk Kak. Terimakasih telah mengundang Raisa'))
            } else {
                zfa.reply(from, 'Link group tidak valid!', id)
            }
            break
		case prefix+'demote':
            if (!isGroupMsg) return zfa.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return zfa.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return zfa.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return zfa.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *#demote* @tagadmin', id)
            if (mentionedJidList.length >= 2) return zfa.reply(from, 'Maaf, perintah ini hanya dapat digunakan kepada 1 orang.', id)
            if (!groupAdmins.includes(mentionedJidList[0])) return zfa.reply(from, 'Maaf, user tersebut tidak menjadi admin.', id)
            await zfa.demoteParticipant(groupId, mentionedJidList[0])
            await zfa.sendTextWithMentions(from, `Perintah diterima, menghapus jabatan @${mentionedJidList[0]}.`)
            break
		case prefix+'promote':
            if (!isGroupMsg) return zfa.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return zfa.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return zfa.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return zfa.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *#promote* @tagmember', id)
            if (mentionedJidList.length >= 2) return zfa.reply(from, 'Maaf, perintah ini hanya dapat digunakan kepada 1 user.', id)
            if (groupAdmins.includes(mentionedJidList[0])) return zfa.reply(from, 'Maaf, user tersebut sudah menjadi admin.', id)
            await zfa.promoteParticipant(groupId, mentionedJidList[0])
            await zfa.sendTextWithMentions(from, `Perintah diterima, menambahkan @${mentionedJidList[0]} sebagai admin.`)
            break
		case prefix+'kick':
            if (!isGroupMsg) return zfa.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return zfa.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return zfa.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return zfa.reply(from, 'Untuk menggunakan Perintah ini, kirim perintah *#kick* @tagmember', id)
            await zfa.sendText(from, `Perintah diterima, mengeluarkan:\n${mentionedJidList.join('\n')}`)
            for (let i = 0; i < mentionedJidList.length; i++) {
                if ((adminNumber, groupAdmins).includes(mentionedJidList[i])) return zfa.reply(from, mess.error.Sp, id)
                await zfa.removeParticipant(groupId, mentionedJidList[i])
            }
            break
		 case prefix+'leave':
            if (!isGroupMsg) return zfa.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return zfa.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            await zfa.sendText(from,'Sayonara').then(() => zfa.leaveGroup(groupId))
            break
		case prefix+'tagall': // FOR GROUP ADMINS
        case prefix+'mentionall':
            if (!isGroupMsg) return zfa.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isGroupAdmins) return zfa.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            const groupMem = await zfa.getGroupMembers(groupId)
            let hehe = '╔══✪〘 Mention All 〙✪══\n'
            for (let i = 0; i < groupMem.length; i++) {
                hehe += '╠➥'
                hehe += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
            }
            hehe += '╚═〘 RAISACANZ BOT 〙'
            await sleep(2000)
            await zfa.sendTextWithMentions(from, hehe)
            break
    case '#unlock':
	if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return zfa.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (!isGroupAdmins) return zfa.reply(from, `Perintah ini hanya bisa di gunakan oleh Admin group!`, id)
            if (!isBotGroupAdmins) return zfa.reply(from, `Perintah ini hanya bisa di gunakan jika Bot menjadi Admin!`, id)
			zfa.setGroupToAdminsOnly(groupId, false).then(() => zfa.sendText(from, 'Berhasil mengubah agar semua anggota dapat chat!'))
			break
		// ON OFF
        case prefix+'antilink':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return zfa.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (!isGroupAdmins) return zfa.reply(from, `Perintah ini hanya bisa di gunakan oleh Admin group!`, id)
            if (!isBotGroupAdmins) return zfa.reply(from, `Perintah ini hanya bisa di gunakan jika Bot menjadi Admin!`, id)
            if (args[1] == 'enable') {
                var cek = antilink.includes(chatId);
                if(cek){
                    return zfa.reply(from, `*「 ANTI GROUP LINK 」*\nStatus : Sudah Aktif`, id) //if number already exists on database
                } else {
                    antilink.push(chatId)
                    fs.writeFileSync('./lib/database/antilink.json', JSON.stringify(antilink))
                    zfa.reply(from, `*「 ANTI GROUP LINK 」*\nStatus : Aktif`, id)
                }
            } else if (args[1] == 'disable') {
                var cek = antilink.includes(chatId);
                if(!cek){
                    return zfa.reply(from, `*「 ANTI GROUP LINK 」*\nStatus : Sudah DiNonaktif`, id) //if number already exists on database
                } else {
                    let nixx = antilink.indexOf(chatId)
                    antilink.splice(nixx, 1)
                    fs.writeFileSync('./lib/database/antilink.json', JSON.stringify(antilink))
                    zfa.reply(from, `*「 ANTI GROUP LINK 」*\nStatus : Nonaktif`, id)
                }
            } else {
                zfa.reply(from, `Pilih enable atau disable kak`, id)
            }
            break
          case prefix+'bc': // TOBZ
            if (!isOwner) return zfa.reply(from, `Fitur ini hanya untuk Zidan Tersayang :*`, id)
                bctxt = body.slice(4)
                txtbc = `*「 BROADCAST 」*\n\n${bctxt}`
                const semuagrup = await zfa.getAllChatIds();
                if(quotedMsg && quotedMsg.type == 'image'){
                    const mediaData = await decryptMedia(quotedMsg)
                    const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                    for(let grupnya of semuagrup){
                        var cekgrup = await zfa.getChatById(grupnya)
                        if(!cekgrup.isReadOnly) zfa.sendImage(grupnya, imageBase64, 'gambar.jpeg', txtbc)
                    }
                    zfa.reply('Broadcast Sukses Zidan Sayang')
                }else{
                    for(let grupnya of semuagrup){
                        var cekgrup = await zfa.getChatById(grupnya)
                        if(!cekgrup.isReadOnly && isMuted(grupnya)) zfa.sendText(grupnya, txtbc)
                    }
                            zfa.reply('Broadcast Success!')
                }
                break
	    case '.menu':
		case '!menu':
		case 'xmenu':
		case '.help':
		case '!help':
		case 'xhelp':
		case '=menu':
		zfa.reply('Mungkin yang kakak maksud #menu')
		        break
        case prefix+'adminlist':
            if (!isGroupMsg) return zfa.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            let mimin = ''
            for (let admon of groupAdmins) {
                mimin += `➸ @${admon.replace(/@c.us/g, '')}\n` 
            }
            await sleep(20000)
            await zfa.sendTextWithMentions(from, mimin)
            break
        case prefix+'ownergroup':
            if (!isGroupMsg) return zfa.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const Owner_ = chat.groupMetadata.owner
            await zfa.sendTextWithMentions(from, `Owner Group : @${Owner_}`)
            break			
        case prefix+'antisticker':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return zfa.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (!isGroupAdmins) return zfa.reply(from, `Perintah ini hanya bisa di gunakan oleh Admin group!`, id)
            if (!isBotGroupAdmins) return zfa.reply(from, `Perintah ini hanya bisa di gunakan jika Bot menjadi Admin!`, id)
            if (args[1] == 'enable') {
                var cek = antisticker.includes(chatId);
                if(cek){
                    return zfa.reply(from, `*「 ANTI SPAM STICKER 」*\nStatus : Sudah Aktif`, id)
                 } else {
                    antisticker.push(chatId)
                    fs.writeFileSync('./lib/database/antisticker.json', JSON.stringify(antisticker))
                    zfa.reply(from, `*「 ANTI SPAM STICKER 」*\nStatus : Aktif`, id)
                }
            } else if (args[1] == 'disable') {
                var cek = antisticker.includes(chatId);
                if(cek){
                    return zfa.reply(from, `*「 ANTI SPAM STICKER 」*\nStatus : Sudak DiNonaktif`, id) //if number already exists on database
                } else {
                    let nixx = antisticker.indexOf(chatId)
                    antisticker.splice(nixx, 1)
                    fs.writeFileSync('./lib/database/antisticker.json', JSON.stringify(antisticker))
                    zfa.reply(from, `*「 ANTI SPAM STICKER 」*\nStatus : Nonaktif`, id)
                    limitAdd(serial)
                }
            } else {
                zfa.reply(from, `Pilih enable atau disable kak`, id)
            }
            break
		case prefix+'malanime':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return zfa.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return zfa.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const keyword = message.body.replace('#malanime', '')
            try {
            const data = await fetch(
           `https://api.jikan.moe/v3/search/anime?q=${keyword}`
            )
            const parsed = await data.json()
            if (!parsed) {
              await zfa.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Anime tidak ditemukan', id)
              return null
              }
            const { title, synopsis, episodes, url, rated, score, image_url } = parsed.results[0]
            const content = `*Anime Ditemukan!*
✨️ *Title:* ${title}
🎆️ *Episodes:* ${episodes}
💌️ *Rating:* ${rated}
❤️ *Score:* ${score}
💚️ *Synopsis:* ${synopsis}
🌐️ *URL*: ${url}`

            const image = await bent("buffer")(image_url)
            const base64 = `data:image/jpg;base64,${image.toString("base64")}`
            zfa.sendImage(from, base64, title, content)
             await limitAdd(serial)
           } catch (err) {
             console.error(err.message)
             await zfa.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Anime tidak ditemukan')
           }
          break
		case prefix+'malcharacter':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return zfa.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return zfa.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const keywords = message.body.replace('#malcharacter', '')
            try {
            const data = await fetch(
           `https://api.jikan.moe/v3/search/character?q=${keywords}`
            )
            const parsed = await data.json()
            if (!parsed) {
              await zfa.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Anime tidak ditemukan', id)
              return null
              }
            const { name, alternative_names, url, image_url } = parsed.results[0]
            const contentt = `*Anime Ditemukan!*

✨️ *Name:* ${name}
💌️ *Alternative Names:* ${alternative_names}
🌐️ *URL*: ${url}`

            const image = await bent("buffer")(image_url)
            const base64 = `data:image/jpg;base64,${image.toString("base64")}`
            zfa.sendImage(from, base64, name, contentt)
            await limitAdd(serial)
           } catch (err) {
             console.error(err.message)
             await zfa.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Anime tidak ditemukan')
           }
          break
		case prefix+'lirik':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return zfa.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return zfa.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length == 1) return zfa.reply(from, 'Kirim perintah *#lirik [optional]*, contoh *#lirik sesuatu di jogja*', id)
            const lagu = body.slice(7)
            const lirik = await liriklagu(lagu)
            zfa.reply(from, lirik, id)
            await limitAdd(serial)
            break
		case prefix+'tts':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return zfa.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return zfa.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            try {
                if (args.length === 1) return zfa.reply(from, 'Kirim perintah *#tts [ Bahasa ] [ Teks ]*, contoh *#tts id halo semua*')
                var dataBhs = args[1]      
                const ttsHZ = require('node-gtts')(dataBhs)
                var dataText = body.slice(8)
                if (dataText === '') return zfa.reply(from, 'Masukkan teksnya', id)
                if (dataText.length > 500) return zfa.reply(from, 'Teks terlalu panjang!', id)
                var dataBhs = body.slice(5, 7)
                ttsHZ.save('./media/tts.mp3', dataText, function () {
                zfa.sendPtt(from, './media/tts.mp3', id)
                limitAdd(serial)
                })
            } catch (err){
                console.log(err)
                zfa.reply(from, bahasa_list, id)
            }
            break
		case prefix+'maluser':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return zfa.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return zfa.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const username = body.slice(18)
            zfa.reply(from, mess.wait, id)
            try {
                const result = await axios.get(`https://api.jikan.moe/v3/user/${username}`)
                const jikan =  result.data
                const Data = `*「 USER - MYANIMELIST 」*

• Username: ${jikan.username}
• User ID: ${jikan.user_id}
• Gender: ${jikan.gender}
• Location: ${jikan.location}
• Joined: ${jikan.joined}
⭐️ Anime Stats ⭐️
• Days Watched: ${jikan.anime_stats.days_watched}
• Mean Score: ${jikan.anime_stats.mean_score}
• Currently Watching: ${jikan.anime_stats.watching}
• Completed: ${jikan.anime_stats.completed}
• On Hold: ${jikan.anime_stats.on_hold}
• Dropped: ${jikan.anime_stats.dropped}
• Plan to Watch: ${jikan.anime_stats.plan_to_watch}
🎯️ Manga Stats 🎯️
• Days Read: ${jikan.manga_stats.days_read}
• Mean Score: ${jikan.manga_stats.mean_score}
• Currently Reading: ${jikan.manga_stats.reading}
• Completed: ${jikan.manga_stats.completed}
• On Hold: ${jikan.manga_stats.on_hold}
• Dropped: ${jikan.manga_stats.dropped}
• Plan to Read: ${jikan.manga_stats.plan_to_read}`

                await zfa.sendFileFromUrl(from, `${jikan.image_url}`,`user.png`, Data)
                limitAdd(serial)
            } catch (err) {
                console.log(err)
                await zfa.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
            }    
            break
		case prefix+'quoteanime':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return zfa.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return zfa.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
                        if(args[1]){
                            if(args[1] === 'anime'){
                                const anime = body.slice(13)
                                axios.get('https://animechanapi.xyz/api/quotes?anime='+anime).then(({ data }) => {
                                    let quote = data.data[0].quote 
                                    let char = data.data[0].character
                                    let anime = data.data[0].anime
                                    zfa.sendText(from, `"${quote}"\n\nCharacter : ${char}\nAnime : ${anime}`)
                                    limitAdd(serial)
                                }).catch(err => {
                                    zfa.sendText('Quote Char/Anime tidak ditemukan!')
                                })
                            }else{
                                const char = body.slice(12)
                                axios.get('https://animechanapi.xyz/api/quotes?char='+char).then(({ data }) => {
                                    let quote = data.data[0].quote 
                                    let char = data.data[0].character
                                    let anime = data.data[0].anime
                                    zfa.sendText(from, `"${quote}"\n\nCharacter : ${char}\nAnime : ${anime}`)
                                    limitAdd(serial)
                                }).catch(err => {
                                    zfa.sendText('Quote Char/Anime tidak ditemukan!')
                                })
                            }
                        }else{
                            axios.get('https://animechanapi.xyz/api/quotes/random').then(({ data }) => {
                                let penyanyi = data.result[0].penyanyi 
                                let judul = data.result[0].judul
                                let linkimg = data.result[0].linkImg
                                let lagu = data.result[0].linkMp3 
                                let size = data.result[0].filesize
                                let durasi = data.result[0].duration
                                zfa.sendText(from, `"${quote}"\n\nCharacter : ${char}\nAnime : ${anime}`) 
                                limitAdd(serial)
                            }).catch(err => {
                                console.log(err)
                            })
                        }
            break
		case prefix+'wallanime' :
            if (!isGroupMsg) return zfa.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const walnime = ['https://wallpaperaccess.com/full/395986.jpg','https://wallpaperaccess.com/full/21628.jpg','https://wallpaperaccess.com/full/21622.jpg','https://wallpaperaccess.com/full/21612.jpg','https://wallpaperaccess.com/full/21611.png','https://wallpaperaccess.com/full/21597.jpg','https://cdn.nekos.life/wallpaper/QwGLg4oFkfY.png','https://wallpaperaccess.com/full/21591.jpg','https://cdn.nekos.life/wallpaper/bUzSjcYxZxQ.jpg','https://cdn.nekos.life/wallpaper/j49zxzaUcjQ.jpg','https://cdn.nekos.life/wallpaper/YLTH5KuvGX8.png','https://cdn.nekos.life/wallpaper/Xi6Edg133m8.jpg','https://cdn.nekos.life/wallpaper/qvahUaFIgUY.png','https://cdn.nekos.life/wallpaper/leC8q3u8BSk.jpg','https://cdn.nekos.life/wallpaper/tSUw8s04Zy0.jpg','https://cdn.nekos.life/wallpaper/sqsj3sS6EJE.png','https://cdn.nekos.life/wallpaper/HmjdX_s4PU4.png','https://cdn.nekos.life/wallpaper/Oe2lKgLqEXY.jpg','https://cdn.nekos.life/wallpaper/GTwbUYI-xTc.jpg','https://cdn.nekos.life/wallpaper/nn_nA8wTeP0.png','https://cdn.nekos.life/wallpaper/Q63o6v-UUa8.png','https://cdn.nekos.life/wallpaper/ZXLFm05K16Q.jpg','https://cdn.nekos.life/wallpaper/cwl_1tuUPuQ.png','https://cdn.nekos.life/wallpaper/wWhtfdbfAgM.jpg','https://cdn.nekos.life/wallpaper/3pj0Xy84cPg.jpg','https://cdn.nekos.life/wallpaper/sBoo8_j3fkI.jpg','https://cdn.nekos.life/wallpaper/gCUl_TVizsY.png','https://cdn.nekos.life/wallpaper/LmTi1k9REW8.jpg','https://cdn.nekos.life/wallpaper/sbq_4WW2PUM.jpg','https://cdn.nekos.life/wallpaper/QOSUXEbzDQA.png','https://cdn.nekos.life/wallpaper/khaqGIHsiqk.jpg','https://cdn.nekos.life/wallpaper/iFtEXugqQgA.png','https://cdn.nekos.life/wallpaper/deFKIDdRe1I.jpg','https://cdn.nekos.life/wallpaper/OHZVtvDm0gk.jpg','https://cdn.nekos.life/wallpaper/YZYa00Hp2mk.jpg','https://cdn.nekos.life/wallpaper/R8nPIKQKo9g.png','https://cdn.nekos.life/wallpaper/_brn3qpRBEE.jpg','https://cdn.nekos.life/wallpaper/ADTEQdaHhFI.png','https://cdn.nekos.life/wallpaper/MGvWl6om-Fw.jpg','https://cdn.nekos.life/wallpaper/YGmpjZW3AoQ.jpg','https://cdn.nekos.life/wallpaper/hNCgoY-mQPI.jpg','https://cdn.nekos.life/wallpaper/3db40hylKs8.png','https://cdn.nekos.life/wallpaper/iQ2FSo5nCF8.jpg','https://cdn.nekos.life/wallpaper/meaSEfeq9QM.png','https://cdn.nekos.life/wallpaper/CmEmn79xnZU.jpg','https://cdn.nekos.life/wallpaper/MAL18nB-yBI.jpg','https://cdn.nekos.life/wallpaper/FUuBi2xODuI.jpg','https://cdn.nekos.life/wallpaper/ez-vNNuk6Ck.jpg','https://cdn.nekos.life/wallpaper/K4-z0Bc0Vpc.jpg','https://cdn.nekos.life/wallpaper/Y4JMbswrNg8.jpg','https://cdn.nekos.life/wallpaper/ffbPXIxt4-0.png','https://cdn.nekos.life/wallpaper/x63h_W8KFL8.jpg','https://cdn.nekos.life/wallpaper/lktzjDRhWyg.jpg','https://cdn.nekos.life/wallpaper/j7oQtvRZBOI.jpg','https://cdn.nekos.life/wallpaper/MQQEAD7TUpQ.png','https://cdn.nekos.life/wallpaper/lEG1-Eeva6Y.png','https://cdn.nekos.life/wallpaper/Loh5wf0O5Aw.png','https://cdn.nekos.life/wallpaper/yO6ioREenLA.png','https://cdn.nekos.life/wallpaper/4vKWTVgMNDc.jpg','https://cdn.nekos.life/wallpaper/Yk22OErU8eg.png','https://cdn.nekos.life/wallpaper/Y5uf1hsnufE.png','https://cdn.nekos.life/wallpaper/xAmBpMUd2Zw.jpg','https://cdn.nekos.life/wallpaper/f_RWFoWciRE.jpg','https://cdn.nekos.life/wallpaper/Y9qjP2Y__PA.jpg','https://cdn.nekos.life/wallpaper/eqEzgohpPwc.jpg','https://cdn.nekos.life/wallpaper/s1MBos_ZGWo.jpg','https://cdn.nekos.life/wallpaper/PtW0or_Pa9c.png','https://cdn.nekos.life/wallpaper/32EAswpy3M8.png','https://cdn.nekos.life/wallpaper/Z6eJZf5xhcE.png','https://cdn.nekos.life/wallpaper/xdiSF731IFY.jpg','https://cdn.nekos.life/wallpaper/Y9r9trNYadY.png','https://cdn.nekos.life/wallpaper/8bH8CXn-sOg.jpg','https://cdn.nekos.life/wallpaper/a02DmIFzRBE.png','https://cdn.nekos.life/wallpaper/MnrbXcPa7Oo.png','https://cdn.nekos.life/wallpaper/s1Tc9xnugDk.jpg','https://cdn.nekos.life/wallpaper/zRqEx2gnfmg.jpg','https://cdn.nekos.life/wallpaper/PtW0or_Pa9c.png','https://cdn.nekos.life/wallpaper/0ECCRW9soHM.jpg','https://cdn.nekos.life/wallpaper/kAw8QHl_wbM.jpg','https://cdn.nekos.life/wallpaper/ZXcaFmpOlLk.jpg','https://cdn.nekos.life/wallpaper/WVEdi9Ng8UE.png','https://cdn.nekos.life/wallpaper/IRu29rNgcYU.png','https://cdn.nekos.life/wallpaper/LgIJ_1AL3rM.jpg','https://cdn.nekos.life/wallpaper/DVD5_fLJEZA.jpg','https://cdn.nekos.life/wallpaper/siqOQ7k8qqk.jpg','https://cdn.nekos.life/wallpaper/CXNX_15eGEQ.png','https://cdn.nekos.life/wallpaper/s62tGjOTHnk.jpg','https://cdn.nekos.life/wallpaper/tmQ5ce6EfJE.png','https://cdn.nekos.life/wallpaper/Zju7qlBMcQ4.jpg','https://cdn.nekos.life/wallpaper/CPOc_bMAh2Q.png','https://cdn.nekos.life/wallpaper/Ew57S1KtqsY.jpg','https://cdn.nekos.life/wallpaper/hVpFbYJmZZc.jpg','https://cdn.nekos.life/wallpaper/sb9_J28pftY.jpg','https://cdn.nekos.life/wallpaper/JDoIi_IOB04.jpg','https://cdn.nekos.life/wallpaper/rG76AaUZXzk.jpg','https://cdn.nekos.life/wallpaper/9ru2luBo360.png','https://cdn.nekos.life/wallpaper/ghCgiWFxGwY.png','https://cdn.nekos.life/wallpaper/OSR-i-Rh7ZY.png','https://cdn.nekos.life/wallpaper/65VgtPyweCc.jpg','https://cdn.nekos.life/wallpaper/3vn-0FkNSbM.jpg','https://cdn.nekos.life/wallpaper/u02Y0-AJPL0.jpg','https://cdn.nekos.life/wallpaper/_-Z-0fGflRc.jpg','https://cdn.nekos.life/wallpaper/3VjNKqEPp58.jpg','https://cdn.nekos.life/wallpaper/NoG4lKnk6Sc.jpg','https://cdn.nekos.life/wallpaper/xiTxgRMA_IA.jpg','https://cdn.nekos.life/wallpaper/yq1ZswdOGpg.png','https://cdn.nekos.life/wallpaper/4SUxw4M3UMA.png','https://cdn.nekos.life/wallpaper/cUPnQOHNLg0.jpg','https://cdn.nekos.life/wallpaper/zczjuLWRisA.jpg','https://cdn.nekos.life/wallpaper/TcxvU_diaC0.png','https://cdn.nekos.life/wallpaper/7qqWhEF_uoY.jpg','https://cdn.nekos.life/wallpaper/J4t_7DvoUZw.jpg','https://cdn.nekos.life/wallpaper/xQ1Pg5D6J4U.jpg','https://cdn.nekos.life/wallpaper/aIMK5Ir4xho.jpg','https://cdn.nekos.life/wallpaper/6gneEXrNAWU.jpg','https://cdn.nekos.life/wallpaper/PSvNdoISWF8.jpg','https://cdn.nekos.life/wallpaper/SjgF2-iOmV8.jpg','https://cdn.nekos.life/wallpaper/vU54ikOVY98.jpg','https://cdn.nekos.life/wallpaper/QjnfRwkRU-Q.jpg','https://cdn.nekos.life/wallpaper/uSKqzz6ZdXc.png','https://cdn.nekos.life/wallpaper/AMrcxZOnVBE.jpg','https://cdn.nekos.life/wallpaper/N1l8SCMxamE.jpg','https://cdn.nekos.life/wallpaper/n2cBaTo-J50.png','https://cdn.nekos.life/wallpaper/ZXcaFmpOlLk.jpg','https://cdn.nekos.life/wallpaper/7bwxy3elI7o.png','https://cdn.nekos.life/wallpaper/7VW4HwF6LcM.jpg','https://cdn.nekos.life/wallpaper/YtrPAWul1Ug.png','https://cdn.nekos.life/wallpaper/1p4_Mmq95Ro.jpg','https://cdn.nekos.life/wallpaper/EY5qz5iebJw.png','https://cdn.nekos.life/wallpaper/aVDS6iEAIfw.jpg','https://cdn.nekos.life/wallpaper/veg_xpHQfjE.jpg','https://cdn.nekos.life/wallpaper/meaSEfeq9QM.png','https://cdn.nekos.life/wallpaper/Xa_GtsKsy-s.png','https://cdn.nekos.life/wallpaper/6Bx8R6D75eM.png','https://cdn.nekos.life/wallpaper/zXOGXH_b8VY.png','https://cdn.nekos.life/wallpaper/VQcviMxoQ00.png','https://cdn.nekos.life/wallpaper/CJnRl-PKWe8.png','https://cdn.nekos.life/wallpaper/zEWYfFL_Ero.png','https://cdn.nekos.life/wallpaper/_C9Uc5MPaz4.png','https://cdn.nekos.life/wallpaper/zskxNqNXyG0.jpg','https://cdn.nekos.life/wallpaper/g7w14PjzzcQ.jpg','https://cdn.nekos.life/wallpaper/KavYXR_GRB4.jpg','https://cdn.nekos.life/wallpaper/Z_r9WItzJBc.jpg','https://cdn.nekos.life/wallpaper/Qps-0JD6834.jpg','https://cdn.nekos.life/wallpaper/Ri3CiJIJ6M8.png','https://cdn.nekos.life/wallpaper/ArGYIpJwehY.jpg','https://cdn.nekos.life/wallpaper/uqYKeYM5h8w.jpg','https://cdn.nekos.life/wallpaper/h9cahfuKsRg.jpg','https://cdn.nekos.life/wallpaper/iNPWKO8d2a4.jpg','https://cdn.nekos.life/wallpaper/j2KoFVhsNig.jpg','https://cdn.nekos.life/wallpaper/z5Nc-aS6QJ4.jpg','https://cdn.nekos.life/wallpaper/VUFoK8l1qs0.png','https://cdn.nekos.life/wallpaper/rQ8eYh5mXN8.png','https://cdn.nekos.life/wallpaper/D3NxNISDavQ.png','https://cdn.nekos.life/wallpaper/Z_CiozIenrU.jpg','https://cdn.nekos.life/wallpaper/np8rpfZflWE.jpg','https://cdn.nekos.life/wallpaper/ED-fgS09gik.jpg','https://cdn.nekos.life/wallpaper/AB0Cwfs1X2w.jpg','https://cdn.nekos.life/wallpaper/DZBcYfHouiI.jpg','https://cdn.nekos.life/wallpaper/lC7pB-GRAcQ.png','https://cdn.nekos.life/wallpaper/zrI-sBSt2zE.png','https://cdn.nekos.life/wallpaper/_RJhylwaCLk.jpg','https://cdn.nekos.life/wallpaper/6km5m_GGIuw.png','https://cdn.nekos.life/wallpaper/3db40hylKs8.png','https://cdn.nekos.life/wallpaper/oggceF06ONQ.jpg','https://cdn.nekos.life/wallpaper/ELdH2W5pQGo.jpg','https://cdn.nekos.life/wallpaper/Zun_n5pTMRE.png','https://cdn.nekos.life/wallpaper/VqhFKG5U15c.png','https://cdn.nekos.life/wallpaper/NsMoiW8JZ60.jpg','https://cdn.nekos.life/wallpaper/XE4iXbw__Us.png','https://cdn.nekos.life/wallpaper/a9yXhS2zbhU.jpg','https://cdn.nekos.life/wallpaper/jjnd31_3Ic8.jpg','https://cdn.nekos.life/wallpaper/Nxanxa-xO3s.png','https://cdn.nekos.life/wallpaper/dBHlPcbuDc4.jpg','https://cdn.nekos.life/wallpaper/6wUZIavGVQU.jpg','https://cdn.nekos.life/wallpaper/_-Z-0fGflRc.jpg','https://cdn.nekos.life/wallpaper/H9OUpIrF4gU.jpg','https://cdn.nekos.life/wallpaper/xlRdH3fBMz4.jpg','https://cdn.nekos.life/wallpaper/7IzUIeaae9o.jpg','https://cdn.nekos.life/wallpaper/FZCVL6PyWq0.jpg','https://cdn.nekos.life/wallpaper/5dG-HH6d0yw.png','https://cdn.nekos.life/wallpaper/ddxyA37HiwE.png','https://cdn.nekos.life/wallpaper/I0oj_jdCD4k.jpg','https://cdn.nekos.life/wallpaper/ABchTV97_Ts.png','https://cdn.nekos.life/wallpaper/58C37kkq39Y.png','https://cdn.nekos.life/wallpaper/HMS5mK7WSGA.jpg','https://cdn.nekos.life/wallpaper/1O3Yul9ojS8.jpg','https://cdn.nekos.life/wallpaper/hdZI1XsYWYY.jpg','https://cdn.nekos.life/wallpaper/h8pAJJnBXZo.png','https://cdn.nekos.life/wallpaper/apO9K9JIUp8.jpg','https://cdn.nekos.life/wallpaper/p8f8IY_2mwg.jpg','https://cdn.nekos.life/wallpaper/HY1WIB2r_cE.jpg','https://cdn.nekos.life/wallpaper/u02Y0-AJPL0.jpg','https://cdn.nekos.life/wallpaper/jzN74LcnwE8.png','https://cdn.nekos.life/wallpaper/IeAXo5nJhjw.jpg','https://cdn.nekos.life/wallpaper/7lgPyU5fuLY.jpg','https://cdn.nekos.life/wallpaper/f8SkRWzXVxk.png','https://cdn.nekos.life/wallpaper/ZmDTpGGeMR8.jpg','https://cdn.nekos.life/wallpaper/AMrcxZOnVBE.jpg','https://cdn.nekos.life/wallpaper/ZhP-f8Icmjs.jpg','https://cdn.nekos.life/wallpaper/7FyUHX3fE2o.jpg','https://cdn.nekos.life/wallpaper/CZoSLK-5ng8.png','https://cdn.nekos.life/wallpaper/pSNDyxP8l3c.png','https://cdn.nekos.life/wallpaper/AhYGHF6Fpck.jpg','https://cdn.nekos.life/wallpaper/ic6xRRptRes.jpg','https://cdn.nekos.life/wallpaper/89MQq6KaggI.png','https://cdn.nekos.life/wallpaper/y1DlFeHHTEE.png']
            let walnimek = walnime[Math.floor(Math.random() * walnime.length)]
            zfa.sendFileFromUrl(from, walnimek, 'Nimek.jpg', '', id)
            break
		case prefix+'meme':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return zfa.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return zfa.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const response = await axios.get('https://meme-api.herokuapp.com/gimme/wholesomeanimemes')
            const { postlink, title, subreddit, urll, nsfw, spoiler } = response.data
            zfa.sendFileFromUrl(from, `${urll}`, 'meme.jpg', `${title}`)
            break
		case prefix+'shota':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return zfa.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return zfa.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const imageToBase64 = require('image-to-base64')
            var shouta = ['shota anime','anime shota'];
            var shotaa = shouta[Math.floor(Math.random() * shouta.length)];
            var urlshot = "https://api.fdci.se/rep.php?gambar=" + shotaa;
            axios.get(urlshot)
            .then((result) => {
            var sht = JSON.parse(JSON.stringify(result.data));
            var shotaak =  sht[Math.floor(Math.random() * sht.length)];
            imageToBase64(shotaak)
            .then(
                (response) => {
            let img = 'data:image/jpeg;base64,'+response
            zfa.sendFile(from, img, "shota.jpg", `*SHOTA*`, id)
            limitAdd(serial)
                    }) 
                .catch(
                    (error) => {
                        console.log(error);
                    })
            })
            break
        case prefix+'antibadword':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return zfa.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (!isGroupAdmins) return zfa.reply(from, `Perintah ini hanya bisa di gunakan oleh Admin group!`, id)
            if (!isBotGroupAdmins) return zfa.reply(from, `Perintah ini hanya bisa di gunakan jika Bot menjadi Admin!`, id)
            if (args[1] == 'enable') {
                var cek = antibadword.includes(chatId);
                if(cek){
                    return zfa.reply(from, `*「 ANTI BADWORD 」*\nSudah diaktifkan di grup ini`, id)
                } else {
                    antibadword.push(chatId)
                    fs.writeFileSync('./lib/database/antibadword.json', JSON.stringify(antibadword))
                    zfa.reply(from, `*「 ANTI BADWORD 」*\nPerhatian Untuk Member Grup ${name} Tercinta\nHarap Jangan Toxic Di Sini Atau raisa Akan Kick!`, id)
                }
            } else if (args[1] == 'disable') {
                var cek = antibadword.includes(chatId);
                if(!cek){
                    return zfa.reply(from, `*「 ANTI BADWORD 」*\nSudah dinonaktifkan di grup ini`, id)
                } else {
                    let nixx = antibadword.indexOf(chatId)
                    antibadword.splice(nixx, 1)
                    fs.writeFileSync('./lib/database/antibadword.json', JSON.stringify(antibadword))
                    zfa.reply(from, `*「 ANTI BADWORD 」*\nPerhatian Untuk Member Grup ${name} Tercinta\nHarap Jangan Toxic Di Sini Atau Raisa Akan Kick!`, id)
                }
            } else {
                zfa.reply(from, `Pilih enable atau disable kak`, id)
            } 
            break   
        case prefix+'nsfw':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return zfa.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isGroupAdmins) return zfa.reply(from, 'Perintah ini hanya bisa di gunakan oleh Admin group!', id)
            if (args.length === 1) return zfa.reply(from, 'Pilih enable atau disable!', id)
            if (args[1].toLowerCase() === 'enable') {
                var cek = nsfw_.includes(chatId);
                if(cek){
                    return zfa.reply(from, `NSFW Sudah diaktifkan di grup ini`, id)
                } else {
                nsfw_.push(chat.id)
                fs.writeFileSync('./lib/database/nsfwz.json', JSON.stringify(nsfw_))
                zfa.reply(from, 'NSFW berhasil di aktifkan di group ini! kirim perintah *#nsfwMenu* untuk mengetahui menu', id)
                }
            } else if (args[1].toLowerCase() === 'disable') {
                var cek = nsfw_.includes(chatId);
                if(cek){
                    return zfa.reply(from, `NSFW Sudah dinonaktifkan di grup ini`, id)
                } else {
                nsfw_.splice(chat.id, 1)
                fs.writeFileSync('./lib/database/nsfwz.json', JSON.stringify(nsfw_))
                zfa.reply(from, 'NSFW berhasil di nonaktifkan di group ini!', id)
                }
            } else {
                zfa.reply(from, 'Pilih enable atau disable kak', id)
            }
            break
		case '#asupan':
		 if(isReg(obj)) return
         if(cekumur(cekage)) return
		  zfa.reply(from, `Bentar ya kak, Lagi Raisa proses nih mohon tunggu sebentar`, id)
		  const asupa = JSON.parse(fs.readFileSync('./lib/asupan.json')) 
		  let asupan = asupa[Math.floor(Math.random() * asupa.length)]
		  zfa.sendFileFromUrl(from, asupan, 'asupan.mp4', '', id)
		  break
		case prefix+'bugreport':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (args.length === 1) return zfa.reply(from, '[❗] Kirim perintah *#bugreport [teks]*\ncontoh : *#bugreport Permisi Owner, Ada bug pada command #otakudesu, Tolong diperbaiki*')
            const bug = body.slice(11)
            if(!bug) return
            if(isGroupMsg){
                zfa.sendText(ownerNumber, `*[BUG REPORT]*\n*WAKTU* : ${time}\nNO PENGIRIM : wa.me/${sender.id.match(/\d+/g)}\nGroup : ${formattedTitle}\n\n${bug}`)
                zfa.reply(from, 'Masalah telah di laporkan ke owner BOT, laporan palsu/main2 tidak akan ditanggapi.' ,id)
            }else{
                zfa.sendText(ownerNumber, `*[BUG REPORT]*\n*WAKTU* : ${time}\nNO PENGIRIM : wa.me/${sender.id.match(/\d+/g)}\n\n${bug}`)
                zfa.reply(from, 'Masalah telah di laporkan ke owner BOT, laporan palsu/main2 tidak akan ditanggapi.', id)
            }
            break
        case prefix+'simi':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return tzfa.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isAdmin) return zfa.reply(from, 'Perintah ini hanya bisa di gunakan oleh Admin Raisa!', id) // Hanya Admin yang bisa mengaktifkan
            if (args.length === 1) return zfa.reply(from, 'Pilih enable atau disable!', id)
            if (args[1].toLowerCase() === 'enable') {
                var cek = simi_.includes(chatId);
                if(cek){
                    return zfa.reply(from, `Simsimi Sudah diaktifkan di grup ini`, id)
                } else {
                simi_.push(chat.id)
                fs.writeFileSync('./lib/database/Simsimi.json', JSON.stringify(simi_))
                zfa.reply(from, 'Simsimi berhasil di aktifkan di group ini! Kirim perintah *# [teks]*\nContoh : *# halo*', id)
                }
            } else if (args[1].toLowerCase() === 'disable') {
                var cek = simi_.includes(chatId);
                if(cek){
                    return zfa.reply(from, `Simsimi Sudah diaktifkan di grup ini`, id)
                } else {
                simi_.splice(chat.id, 1)
                fs.writeFileSync('./lib/database/Simsimi.json', JSON.stringify(simi_))
                zfa.reply(from, 'Simsimi berhasil di nonaktifkan di group ini!', id)
                }
            } else {
                zfa.reply(from, 'Pilih enable atau disable udin!', id)
            }
            break
		case prefix+'kapankah':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return zfa.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const when = args.join(' ')
            const ans = kapankah[Math.floor(Math.random() * (kapankah.length))]
            if (!when) zfa.reply(from, '⚠️ Format salah! Ketik *#menu* untuk penggunaan.')
            await zfa.sendText(from, `Pertanyaan: *${when}* \n\nJawaban: ${ans}`)
            break
        case prefix+'nilai':
        case prefix+'rate':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return zfa.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const rating = args.join(' ')
            const awr = rate[Math.floor(Math.random() * (rate.length))]
            if (!rating) zfa.reply(from, '⚠️ Format salah! Ketik *#menu* untuk penggunaan.')
            await zfa.sendText(from, `Pertanyaan: *${rating}* \n\nJawaban: ${awr}`)
            break
        case prefix+'apakah':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return zfa.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const nanya = args.join(' ')
            const jawab = apakah[Math.floor(Math.random() * (apakah.length))]
            if (!nanya) zfa.reply(from, '⚠️ Format salah! Ketik *#menu* untuk penggunaan.')
            await zfa.sendText(from, `Pertanyaan: *${nanya}* \n\nJawaban: ${jawab}`)
            break
         case prefix+'bisakah':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return zfa.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const bsk = args.join(' ')
            const jbsk = bisakah[Math.floor(Math.random() * (bisakah.length))]
            if (!bsk) zfa.reply(from, '⚠️ Format salah! Ketik *#menu* untuk penggunaan.')
            await zfa.sendText(from, `Pertanyaan: *${bsk}* \n\nJawaban: ${jbsk}`)
            break
		case prefix+'owner':
        case prefix+'creator':
            zfa.sendContact(chatId, `17866912852@c.us`)
            zfa.reply(from, 'Itu nomor Pacar ku, eh maksudnya Owner ku', id)
            break
		case prefix+'kenalan':  // NAMBAHIN NOMOR DI DATABASE
                argz = body.trim().split('|')
                if (argz.length >= 2) {
                const nonye = sender.id
                const namanye = argz[1]
                const umurnye = argz[2]
                    if(isNaN(umurnye)) return await zfa.reply(from, 'Umur harus berupa angka!!', id)
                    if(umurnye >= 80) return await zfa.reply(from, 'Kamu terlalu tua, kembali lagi ke masa muda untuk menggunakan Raisa', id)
                    const jenenge = namanye.replace(' ','')
                    var ceknya = nonye
                        var obj = pendaftar.some((val) => {
                            return val.id === ceknya
                        })
                        if (obj === true){
                            return zfa.reply(from, 'kamu sudah aku kenal sayang :*', id) // BAKAL RESPON JIKA NO UDAH ADA
                        } else {
                            const mentah = await zfa.checkNumberStatus(nonye) // PENDAFTARAN
                            const msg = monospace(`Pendaftaran berhasil dengan SN: ${SN} pada ${moment().format('DD/MM/YY HH:mm:ss')}
₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋
[Nama]: ${jenenge} [@${nonye.replace(/[@c.us]/g, '')}]
[Nomor]: wa.me/${nonye.replace('@c.us', '')}
[Umur]: ${umurnye}
⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻
Untuk menggunakan bot silahkan kirim ${prefix}menu
Total Pengguna yang telah terdaftar ${pendaftar.length}`)
                            const hasil = mentah.canReceiveMessage ? msg : false
                            if (!hasil) return zfa.reply(from, 'Nomor WhatsApp tidak valid [ Tidak terdaftar di WhatsApp ]', id) 
                            {
                            const register = ({
                                id: mentah.id._serialized,
                                nama: jenenge,
                                umur: umurnye
                            })
                            pendaftar.push(register)
                            fs.writeFileSync('./lib/database/user.json', JSON.stringify(pendaftar)) // DATABASE
                                zfa.sendTextWithMentions(from, hasil)
                            }
                        }
                    } else {
                        await zfa.reply(from, `Format yang kamu masukkan salah, kirim ${prefix}kenalan |nama|umur\n\ncontoh format: ${prefix}kenalan |VabelCanzz|19\n\ncukup gunakan nama depan/panggilan saja`, id) //if user is not registered
                    }
                break
            case prefix+'kenalulang':
                    if (!isAdmin) return zfa.reply(from, 'Command ini hanya dapat digunakan oleh admin Raisa', id)  
                    const nomernya = args[1]
                    let textnya = nomernya.replace(/[-\s+@c.us]/g,'')
                    const cusnya = textnya + '@c.us'
                    const umurnya = args[2]
                    if(umurnya >= 80) return await zfa.reply(from, 'Umur terlalu tua kak, max 80 yaa :D', id)
                        var found = false
                        Object.keys(pendaftar).forEach((i) => {
                            if(pendaftar[i].id == cusnya){
                                found = i
                            }
                        })
                        if (found !== false) {
                            pendaftar[found].umur = umurnya;
                            const updated = pendaftar[found]
                            const result = monospace(`Update data berhasil dengan SN: ${SN} pada ${moment().format('DD/MM/YY HH:mm:ss')}
₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋
[Nama]: ${updated.nama} | @${updated.id.replace(/[@c.us]/g, '')}
[Nomor]: wa.me/${updated.id.replace('@c.us', '')}
[Umur]: ${updated.umur}
⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻
Total Pengguna yang telah terdaftar ${pendaftar.length}`)
                            console.log(pendaftar[found])
                            fs.writeFileSync('./lib/database/user.json',JSON.stringify(pendaftar));
                            zfa.sendTextWithMentions(from, result, id)
                        } else {
                                zfa.reply(from, `${monospace(`Di database ngga ada nomer itu kak`)}`, id)
                        }
                break
		case prefix+'brainly':
		if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (args.length >= 2){
                const BrainlySearch = require('./lib/brainly')
                let tanya = body.slice(9)
                let jum = Number(tanya.split('.')[1]) || 2
                if (jum > 10) return zfa.reply(from, 'Max 10!', id)
                if (Number(tanya[tanya.length-1])){
                    tanya
                }
                zfa.reply(from, `➸ *Pertanyaan* : ${tanya.split('.')[0]}\n\n➸ *Jumlah jawaban* : ${Number(jum)}`, id)
                await BrainlySearch(tanya.split('.')[0],Number(jum), function(res){
                    res.forEach(x=>{
                        if (x.jawaban.fotoJawaban.length == 0) {
                            zfa.reply(from, `➸ *Pertanyaan* : ${x.pertanyaan}\n\n➸ *Jawaban* : ${x.jawaban.judulJawaban}\n`, id)
                        } else {
                            zfa.reply(from, `➸ *Pertanyaan* : ${x.pertanyaan}\n\n➸ *Jawaban* : ${x.jawaban.judulJawaban}\n\n➸ *Link foto jawaban* : ${x.jawaban.fotoJawaban.join('\n')}`, id)
                        }
                    })
                })
            } else {
                zfa.reply(from, 'Usage :\n!brainly [pertanyaan] [.jumlah]\n\nEx : \n!brainly NKRI .2', id)
            }
            break
		case prefix+'':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return zfa.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isSimi) return zfa.reply(from, 'command/Perintah Simi belum di aktifkan di group ini!', id)
            if (args.length === 1) return zfa.reply(from, 'Kirim perintah *# [teks]*\nContoh : *# halo*')
            const que = body.slice(2)
            const sigo = await axios.get(`http://simsumi.herokuapp.com/api?text=${que}&lang=id`)
            const sigot = sigo.data
            zfa.reply(from, sigot.success, id)
            console.log(sigot)
            break
		case prefix+'puisi': // ARUGAZ
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return zfa.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return zfa.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (!isGroupMsg) return zfa.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            const puisi = await get.get('https://arugaz.herokuapp.com/api/puisi1').json()
            zfa.reply(from, `• *Puisi*: ${puisi.result}`, id)
            break
        case prefix+'puisi2': // ARUGAZ
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return zfa.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return zfa.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const puisi2 = await get.get('https://arugaz.herokuapp.com/api/puisi2').json()
            zfa.reply(from, `• *Puisi*: ${puisi2.result}`, id)
            break
        case prefix+'puisi3': // ARUGAZ
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return zfa.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return zfa.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const puisi3 = await get.get('https://arugaz.herokuapp.com/api/puisi3').json()
            zfa.reply(from, `• *Puisi*: ${puisi3.result}`, id)
            break
		case prefix+'waktu':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (isLimit(serial)) return zfa.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            await zfa.sendText(from, `Waktu Indonesia Barat: *${moment().utcOffset('+0700').format('HH:mm')}* WIB \nWaktu Indonesia Tengah: *${moment().utcOffset('+0800').format('HH:mm')}* WITA \nWaktu Indonesia Timur: *${moment().utcOffset('+0900').format('HH:mm')}* WIT`)
            await limitAdd(serial)
            break
		/*case prefix+'tiktok':
		case prefix+'tik':
		case prefix+'tt':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return zfa.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return zfa.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return zfa.reply(from, 'Kirim perintah *#tiktok [linkTiktok]*\nContoh : *#tiktok https://vt.tiktok.com/yqyjPX/*', id)
            zfa.reply(from, mess.wait, id)
            tiktok(args[1]).then(async(res) => {
                let { video, title, image, desk, dibuat, duration } = await res
                let ttiktok = `*「 TIKTOK DOWNLOADER 」*\n\n➸ *Judul* : ${title}\n➸ Deskripsi : ${desk}\n➸ Durasi : ${duration}\n➸ Dibuat : ${dibuat}\n\n_Silahkan tunggu sebentar proses pengiriman file membutuhkan waktu beberapa menit._`
                zfa.sendFileFromUrl(from, image, 'thumb.jpg', ttiktok, id)
                await zfa.sendFileFromUrl(from, video, `${title}.mp4`, '', id).catch(() => zfa.reply(from, mess.error.Yt4, id))
                await limitAdd(serial)
            }).catch((err) => {
                console.log(err);
                zfa.reply(from, `Maaf, Terjadi Kesalahan`, id)
            })
            break */
        case prefix+'smule':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return zfa.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return zfa.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return zfa.reply(from, 'Kirim perintah *#smule [linkSmule]*\nContoh : *#smule https://www.smule.com/p/767512225_3062360163*', id)
            zfa.reply(from, mess.wait, id)
            smule(args[1]).then(async(res) => {
                let { Type, title, url, image } = await res
                let tsmule = `*「 SMULE DOWNLOADER 」*\n\n➸ *Judul* : ${title}\n➸ *Type:* ${Type}\n\n_Silahkan tunggu sebentar proses pengiriman file membutuhkan waktu beberapa menit._`
                zfa.sendFileFromUrl(from, image, 'thumb.jpg', tsmule, id)
                await zfa.sendFileFromUrl(from, url, `${title}.mp3`, '', id).catch(() => zfa.reply(from, mess.error.Yt4, id))
                await limitAdd(serial)
            }).catch((err) => {
                console.log(err);
                zfa.reply(from, `Maaf, Terjadi Kesalahan`, id)
            })
            break
		case prefix+'twitter':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return zfa.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return zfa.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return zfa.reply(from, `Kirim perintah *#twitter [ Link Twitter ]* untuk contoh silahkan kirim perintah *#readme*`)
            zfa.reply(from, mess.wait, id)
            twitter(args[1]).then(async(res) => {
                let { desk, urlVideo } = await res
                let ttwitter = `*「 TWITTER DOWNLOADER 」*\n\n➸ *Aplikasi:* Twitter\n➸ *Deskripsi:* ${desk}\n\n_Silahkan tunggu sebentar proses pengiriman file membutuhkan waktu beberapa menit._`
                await zfa.sendFileFromUrl(from, urlVideo, `twit.mp3`, ttwitter, id).catch(() => zfa.reply(from, mess.error.Yt4, id))
                await limitAdd(serial)
            }).catch((err) => {
                console.log(err);
                zfa.reply(from, `Maaf, Terjadi Kesalahan`, id)
            })
            break
        case prefix+'maps':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return zfa.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return zfa.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return zfa.reply(from, 'Kirim perintah *#maps [optional]*, Contoh : *#maps Jakarta*')
            argz = body.trim().split(' ')
            console.log(...argz[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const mapz = await slicedArgs.join(' ')
            console.log(mapz)
            try {
            const mapz2 = await axios.get('https://mnazria.herokuapp.com/api/maps?search=' + mapz)
            const { gambar } = mapz2.data
            const pictk = await bent("buffer")(gambar)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            zfa.sendImage(from, base64, 'maps.jpg', `*Hasil Maps : ${mapz}*`)
            limitAdd(serial)
            } catch (err) {
             console.error(err.message)
             await zfa.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
             zfa.sendText(ownerNumber, 'Error Maps : '+ err)
           }
          break
		case prefix+'checkip':
		case prefix+'cekip':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return zfa.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return zfa.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return zfa.reply(from, 'Kirim perintah *#checkip [ipaddress]*\nContoh : *#checkip 182.0.144.145*', id)
            zfa.reply(from, mess.wait, id)
            argz = body.trim().split(' ')
            console.log(...argz[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const cekip = await slicedArgs.join(' ')
            console.log(cekip)
            try {
            const cekip2 = await axios.get('https://mnazria.herokuapp.com/api/check?ip=' + cekip)
            const { city, continent_name, country_name, ip, latitude, location, longitude, region_name } = cekip2.data
            const cekip3 = `*User Ditemukan!*

➸ *Kota:* ${city}
➸ *Benua:* ${continent_name}
➸ *Negara:* ${country_name}
➸ *Ip Address:* ${ip}
➸ *Garis Lintang:* ${latitude}
➸ *Kode Telepon:* +${location.calling_code}
➸ *Ibu Kota:* +${location.capital}
➸ *Bahasa:* +${location.languages[0].name}
➸ *Garis Bujur:* ${longitude}
➸ *Wilayah:* +${region_name}`

            const pictk = await bent("buffer")(location.country_flag)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            zfa.sendImage(from, base64, city, cekip3)
            await limitAdd(serial)
            } catch (err) {
             console.error(err.message)
             await zfa.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
             zfa.sendText(ownerNumber, 'Error Check IP : '+ err)
           }
          break
        /*case prefix+'joox':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return zfa.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return zfa.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            zfa.reply(from, mess.wait, id)
            if (args.length === 1) return zfa.reply(from, `Kirim perintah *#joox [ Optional ]*\nContoh : *#joox Alan Walker*`, id)
            zfa.reply(from, mess.wait, id)
            joox(args[1]).then(async(res) => {
                let { penyanyi, judul, album, linkImg, linkMp3, filesize, ext, duration } = await res
                let tjoox = `*「 JOOX DOWNLOADER 」*\n\n➸ *Penyanyi:* ${penyanyi}\n➸ *Judul:* ${judul}\n➸ *Album:* ${album}\n➸ *Ext:* ${ext}\n➸ *Size:* ${filesize}\n➸ *Durasi:* ${duration}\n\n_Silahkan tunggu sebentar proses pengiriman file membutuhkan waktu beberapa menit._`
                zfa.sendImage(from, linkImg, judul, tjoox)
                zfa.sendFileFromUrl(from, linkMp3, `${judul}.${ext}`, '', id).catch(() => zfa.reply(from, mess.error.Yt4, id))
                await limitAdd(serial)
            }).catch((err) => {
                console.log(err);
                zfa.reply(from, `Maaf, Terjadi Kesalahan`, id)
            })
            break*/
		case prefix+'cantik':
                    const gmek = await zfa.getGroupMembersId(groupId)
                    let gmik = gmek[Math.floor(Math.random() * gmek.length)]
                    const mmkk = `YANG PALING CANTIK DISINI ADALAH @${gmik.replace(/@c.us/g, '')}`
                    zfa.sendTextWithMentions(from, mmkk, id)
                    break
        case prefix+'ganteng':
                    const gmekk = await zfa.getGroupMembersId(groupId)
                    let gmikk = gmekk[Math.floor(Math.random() * gmekk.length)]
                    const mmkkkk = `YANG PALING GANTENG DISINI ADALAH @${gmikk.replace(/@c.us/g, '')}`
                    zfa.sendTextWithMentions(from, mmkkkk, id)
                    break
		case prefix+'jelek':
                    const gmekkk = await zfa.getGroupMembersId(groupId)
                    let gmikkk = gmekkk[Math.floor(Math.random() * gmekkk.length)]
                    const mmkkkkk = `YANG PALING JELEK DISINI ADALAH @${gmikkk.replace(/@c.us/g, '')}`
                    zfa.sendTextWithMentions(from, mmkkkkk, id)
                    break
		case prefix+'ptl':
		case prefix+'cewe':
		case prefix+'cewecantik':
		case prefix+'cewek':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return zfa.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return zfa.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const pptl = ["https://i.pinimg.com/564x/b2/84/55/b2845599d303a4f8fc4f7d2a576799fa.jpg","https://i.pinimg.com/236x/98/08/1c/98081c4dffde1c89c444db4dc1912d2d.jpg","https://i.pinimg.com/236x/a7/e2/fe/a7e2fee8b0abef9d9ecc8885557a4e91.jpg","https://i.pinimg.com/236x/ee/ae/76/eeae769648dfaa18cac66f1d0be8c160.jpg","https://i.pinimg.com/236x/b2/84/55/b2845599d303a4f8fc4f7d2a576799fa.jpg","https://i.pinimg.com/564x/78/7c/49/787c4924083a9424a900e8f1f4fdf05f.jpg","https://i.pinimg.com/236x/eb/05/dc/eb05dc1c306f69dd43b7cae7cbe03d27.jpg","https://i.pinimg.com/236x/d0/1b/40/d01b40691c68b84489f938b939a13871.jpg","https://i.pinimg.com/236x/31/f3/06/31f3065fa218856d7650e84b000d98ab.jpg","https://i.pinimg.com/236x/4a/e5/06/4ae5061a5c594d3fdf193544697ba081.jpg","https://i.pinimg.com/236x/56/45/dc/5645dc4a4a60ac5b2320ce63c8233d6a.jpg","https://i.pinimg.com/236x/7f/ad/82/7fad82eec0fa64a41728c9868a608e73.jpg","https://i.pinimg.com/236x/ce/f8/aa/cef8aa0c963170540a96406b6e54991c.jpg","https://i.pinimg.com/236x/77/02/34/77023447b040aef001b971e0defc73e3.jpg","https://i.pinimg.com/236x/4a/5c/38/4a5c38d39687f76004a097011ae44c7d.jpg","https://i.pinimg.com/236x/41/72/af/4172af2053e54ec6de5e221e884ab91b.jpg","https://i.pinimg.com/236x/26/63/ef/2663ef4d4ecfc935a6a2b51364f80c2b.jpg","https://i.pinimg.com/236x/2b/cb/48/2bcb487b6d398e8030814c7a6c5a641d.jpg","https://i.pinimg.com/236x/62/da/23/62da234d941080696428e6d4deec6d73.jpg","https://i.pinimg.com/236x/d4/f3/40/d4f340e614cc4f69bf9a31036e3d03c5.jpg","https://i.pinimg.com/236x/d4/97/dd/d497dd29ca202be46111f1d9e62ffa65.jpg","https://i.pinimg.com/564x/52/35/66/523566d43058e26bf23150ac064cfdaa.jpg","https://i.pinimg.com/236x/36/e5/27/36e52782f8d10e4f97ec4dbbc97b7e67.jpg","https://i.pinimg.com/236x/02/a0/33/02a033625cb51e0c878e6df2d8d00643.jpg","https://i.pinimg.com/236x/30/9b/04/309b04d4a498addc6e4dd9d9cdfa57a9.jpg","https://i.pinimg.com/236x/9e/1d/ef/9e1def3b7ce4084b7c64693f15b8bea9.jpg","https://i.pinimg.com/236x/e1/8f/a2/e18fa21af74c28e439f1eb4c60e5858a.jpg","https://i.pinimg.com/236x/22/d9/22/22d9220de8619001fe1b27a2211d477e.jpg","https://i.pinimg.com/236x/af/ac/4d/afac4d11679184f557d9294c2270552d.jpg","https://i.pinimg.com/564x/52/be/c9/52bec924b5bdc0d761cfb1160865b5a1.jpg","https://i.pinimg.com/236x/1a/5a/3c/1a5a3cffd0d936cd4969028668530a15.jpg"]
            let pep = pptl[Math.floor(Math.random() * pptl.length)]
            zfa.sendFileFromUrl(from, pep, 'pptl.jpg', 'Suppor Raisa Dengan Cara Follow IG: https://instagram.com/_zidanfadilaharsa Dan Subscribe YT: https://youtube.com/zidanfadilaharsazfaa', message.id)
            await limitAdd(serial)
            break
        case prefix+'neko':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return zfa.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return zfa.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            q2 = Math.floor(Math.random() * 900) + 300;
            q3 = Math.floor(Math.random() * 900) + 300;
            zfa.sendFileFromUrl(from, 'http://placekitten.com/'+q3+'/'+q2, 'neko.png','Neko ')
            await limitAdd(serial)
            break
		case prefix+'fb':
		case prefix+'mark':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return zfa.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return zfa.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return zfa.reply(from, `Kirim perintah *#fb [ Link Fb ]*\nContoh : *#fb https://www.facebook.com/24609282673/posts/10158628585367674/*`, id)
            zfa.reply(from, mess.wait, id)
            facebook(args[1]).then(async(res) => {
                let { VideoUrl } = await res
                const epbe2 = `*「 FACEBOOK DOWNLOADER 」*\n➸ *Aplikasi*: Facebook\n\n_Silahkan tunggu sebentar proses pengiriman file membutuhkan waktu beberapa menit._`
                zfa.sendFileFromUrl(from, VideoUrl, `Facebook.mp4`, epbe2, id)
                await limitAdd(serial)
            }).catch((err) => {
                console.log(err);
                zfa.reply(from, `Maaf, Terjadi Kesalahan`, id)
            })
            break
		case prefix+'ig': 
        case prefix+'instagram':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (isLimit(serial)) return zfa.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
		if (args.length == 0) return zfa.reply(from, `Kirim perintah *${prefix}ig [linkIg]*`, id)
                            const igUrl = body.slice(4)
			    axios.get(`https://api.zeks.xyz/api/ig?url=${igUrl}&apikey=apivinz`)
			    .then(async(res) => {
				await zfa.sendFileFromUrl(from, res.data.result[0].url, '', `*From: ${res.data.owner}*`, id)
				.catch(err => {
					zfa.reply(from, 'Error', id)
				})
				})
				.catch(err => {
					zfa.reply(from, 'Error', id)
				})
                                break
		case prefix+'gdrive':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return zfa.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return zfa.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const regex = new RegExp("\/d\/(.+)\/", 'gi')
            if (!args[1].match(regex)) { await zfa.reply(from, `Url Google Drive Yang Kamu Masukkan Salah!\nContoh : #gdrive https://drive.google.com/file/d/1Cd8KjB9-cUU_Jy8Q/view`, id) }
                const urla = args[1]
                const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
                function niceBytes(x){
                    let l = 0, n = parseInt(x, 10) || 0;
                    while(n >= 1024 && ++l){
                        n = n/1024;
                    }
                    return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
                }
                const m = urla.match(regex)
                const fileid = m.toString().trimStart('/', 'd').trim('/');
                const linke = 'https://drive.google.com/file' + fileid + 'view?usp=sharing'
                fetch('https://gdbypass.host/api/?link='+linke)
                    .then((res) => {
                        status = res.status
                        return res.json()
                    })
                    .then(async(body) => {
                        const fileName = body.data.Filename
                        const size = body.data.Filesize
                        const newLink = body.data.NewUnlimitedURL
                        const ling = await urlShortener(newLink)
                            zfa.reply(from, `*「 GOOGLE DRIVE 」*\n\n• *Nama File :* ${fileName}\n*• File Size :* ${niceBytes(size)}\n*• Short Link :* ${ling}`, id)
                            limitAdd(serial)
                    })
                    .catch((err) => {
                        zfa.reply(from, `Maaf, Sepertinya Link Tidak Berhasil Di Bypass\n` + err, id)
                    })
            break
		case prefix+'restart': // WORK IF YOU RUN USING PM2
            if(isOwner){
                zfa.sendText(from, '*[WARN]* Restarting ...')
                setting.restartState = true
                setting.restartId = chatId
                var obj = []
                //fs.writeFileSync('./lib/setting.json', JSON.stringify(obj, null,2));
                fs.writeFileSync('./lib/database/limit.json', JSON.stringify(obj));
                fs.writeFileSync('./lib/database/muted.json', JSON.stringify(obj));
                fs.writeFileSync('./lib/database/msgLimit.json', JSON.stringify(obj));
                fs.writeFileSync('./lib/database/banned.json', JSON.stringify(obj));
                fs.writeFileSync('./lib/database/welcome.json', JSON.stringify(obj));
                fs.writeFileSync('./lib/database/left.json', JSON.stringify(obj));
                fs.writeFileSync('./lib/database/Simsimi.json', JSON.stringify(obj));
                fs.writeFileSync('./lib/database/nsfwz.json', JSON.stringify(obj));
                const spawn = require('child_process').exec;
                function os_func() {
                    this.execCommand = function (command) {
                        return new Promise((resolve, reject)=> {
                        spawn(command, (error, stdout, stderr) => {
                            if (error) {
                                reject(error);
                                return;
                            }
                            resolve(stdout)
                        });
                    })
                }}
                var oz = new os_func();
                oz.execCommand('pm2 restart index').then(res=> {
                }).catch(err=> {
                    console.log("os >>>", err);
                })
            }
            break
		case 'raisa':
		case 'sasa':
		case 'sa':
                    let blsn = jwb[Math.floor(Math.random() * jwb.length)]
                    zfa.reply(from, blsn, id)
                    break
	    case prefix+'linkraisa':
		   if(isReg(obj)) return
            if(cekumur(cekage)) return
			zfa.sendText(from, 'Ini link nomor Raisa Kak https://wa.me/447537102515 share ke teman kakak juga yah....', id)
		case prefix+'menu':
        case prefix+'help':
		case prefix+'raisamenu':
		    if(isReg(obj)) return
            if(cekumur(cekage)) return
                        const dpd = await zfa.getProfilePicFromServer(author)
                    if (dpd == undefined) {
                        var pfp = errorurl
                        } else {
                            var pfp = dpd
                        } 
            zfa.sendText(from, help(prefix, cts, pendaftar))
            break
		case '.menu':
		case '!menu':
            zfa.reply(from, ` Yang kak *${pushname}* maksud mungkin *#menu*`, id)
            break
		case prefix+'changelog':
		    zfa.reply(from, groupcmd(prefix))
			break
		case prefix+'runtime':
            zfa.reply(from, `Raisa telah aktif selama :\n${cts}`, id)
            break
		case prefix+'donate':
		case prefix+'donasi':
		case prefix+'banturaisa':
            zfa.sendText(from, sumbang())
            break
		case prefix+'readme':
            zfa.sendText(from, readme())
            break
        case prefix+'info':
            zfa.sendText(from, info())
            break
        case prefix+'bahasa':
            zfa.sendText(from, bahasalist())
            break
		case prefix+'raisaagroup':
		case prefix+'raisagc':
            zfa.reply(from, `Link Group Raisa Fariza Cans : https://chat.whatsapp.com/D4L2QeBc9B0IXx2vGQI02p\nJangan Lupa Join Ya Kak ${pushname}`, id)
            break
	    case prefix+'yourpic':
		case prefix+'pplu':
                    if(isReg(obj)) return
            if(cekumur(cekage)) return
                    for (let i = 0; i < mentionedJidList.length; i++) {
                        var ypic = await zfa.getProfilePicFromServer(mentionedJidList[i])
                        if (ypic === undefined) {
                            var ypfp = errorurl
                        } else {
                            var ypfp = ypic
                        }
                    }
                    zfa.sendFileFromUrl(from, ypfp, 'pfpy.jpg', `Support Raisa Dengan Cara Follow Ig: https://instagram.com/_zidanfadilaharsa Dan Subscribe Channel Yt https://youtube.com/zidanfadilaharsazfaa`)
                    break
		case prefix+'play':
                misc.ytPlay(q)
                    .then(async ({ result }) => {
                        if (Number(result.size.split(' MB')[0]) >= 10.0) return zfa.sendFileFromUrl(from, result.image, `${result.title}.jpg`, `Judul: ${result.title}\nSize: *${result.size}*\n\nGagal, Maksimal video size adalah *10MB*!`, id)
                        await zfa.sendFileFromUrl(from, result.image, `${result.title}.jpg`, ind.ytPlay(result), id)
                        const responses = await fetch(result.mp3)
                        const buffer = await responses.buffer()
                        await fs.writeFile(`./temp/ytplay_${sender.id}.mp3`, buffer)
                        await zfa.sendFile(from, `./temp/ytplay_${sender.id}.mp3`, `ytplay_${sender.id}`, id)
                        console.log('Success sending Play MP3!')
                        fs.unlinkSync(`./temp/ytplay_${sender.id}.mp3`)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await zfa.reply(from, 'Error!', id)
                    })
            break
        case prefix+'stickermeme':
        case prefix+'stcmeme':
                if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (isMedia && type === 'image') {
                    const top = argz[1]
                    const bottom = argz[2]
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const getUrl = await uploadImages(mediaData, `meme.${sender.id}`)
                    const create = `https://api.memegen.link/images/custom/${top}/${bottom}.png?background=${getUrl}`
                    const meme = await bent('buffer')(create)
                    webp.buffer2webpbuffer(meme, 'png', '-q 100')
                        .then((res) => {
                            sharp(res)
                                .resize(512, 512)
                                .toFile(`./temp/stage_${sender.id}.webp`, async (err) => {
                                    if (err) return console.error(err)
                                    await exec(`webpmux -set exif ./temp/data.exif ./temp/stage_${sender.id}.webp -o ./temp/${sender.id}.webp`, { log: true })
                                    if (fs.existsSync(`./temp/${sender.id}.webp`)) {
                                        const data = fs.readFileSync(`./temp/${sender.id}.webp`)
                                        const base64 = `data:image/webp;base64,${data.toString('base64')}`
                                        await zfa.sendRawWebpAsSticker(from, base64)
                                        console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                        fs.unlinkSync(`./temp/${sender.id}.webp`)
                                        fs.unlinkSync(`./temp/stage_${sender.id}.webp`)
                                    }
                                })
                        })
                } else {
                    await zfa.reply(from, 'Format salah kak', id)
                }
            break
        case prefix+'mypic':
		case prefix+'ppgua':  
		    if(isReg(obj)) return
            if(cekumur(cekage)) return
                    const mpic = await zfa.getProfilePicFromServer(author)
                    if (mpic === undefined) {
                        var mpfp = errorurl
                    } else {
                        var mpfp = mpic
                    }
                    zfa.sendFileFromUrl(from, mpfp, 'pfpm.jpg', `Support Raisa Dengan Cara Follow Ig: https://instagram.com/_zidanfadilaharsa Dan Subscribe Channel Yt https://youtube.com/zidanfadilaharsazfaa`)
                    break
		case prefix+'profile':
		case prefix+'aku':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (isGroupMsg) {
                if (!quotedMsg) {
                    var block = blockNumber.includes(author)
                    var bend = banned.includes(author)
                    var sts = await zfa.getStatus(author)
                    var adm = isGroupAdmins
                    var donate = isAdmin
                    var ctt = await zfa.getContact(author)
                    const { status } = sts
                    var found = false
                    Object.keys(pendaftar).forEach((i) => {
                        if(pendaftar[i].id == author){
                            found = i
                        }
                    })
                    if (found !== false) {
                        pendaftar[found].id = author;
                        var registe = '✔'
                    } else {
                        var registe = '❌'
                    }
                    if (ctt == null) {
                    return await zfa.reply(from, `Nomor WhatsApp tidak valid [ Tidak terdaftar di WhatsApp ]`, id) 
                    } else {
                        const contact = ctt.pushname
                        const dpd = await zfa.getProfilePicFromServer(author)
                    if (dpd == undefined) {
                        var pfp = errorurl
                        } else {
                            var pfp = dpd
                        } 
                    if (contact == undefined) {
                        var namae = '*Tidak Ada Nama*' 
                    } else {
                        var namae = contact
                    } 
                        await zfa.sendContact(chatId, author)
                        zfa.sendFileFromUrl(from, pfp, 'pfp.jpg', `*「 PROFILE 」*\n\n• *Username: ${namae}*\n• *User Info: ${status}*\n*• Block : ${block}*\n*• Banned : ${bend}*\n• *Admin Group: ${adm}*\n• *Admin Elaina: ${donate}*\n• *Registered User :* ${registe}`)
                    }
                } else if (quotedMsg) {
                    var qmid = quotedMsgObj.sender.id
                    var block = blockNumber.includes(qmid)
                    var bend = banned.includes(qmid)
                    var gpic = await zfa.getProfilePicFromServer(qmid)
                    var namae = quotedMsgObj.sender.name
                    var sts = await zfa.getStatus(qmid)
                    var ctt = await zfa.getContact(qmid)
                    var adm = isGroupAdmins
                    var donate = isAdmin
                    const { status } = sts
                    Object.keys(pendaftar).forEach((i) => {
                        if(pendaftar[i].id == qmid){
                            found = i
                        }
                    })
                    if (found !== false) {
                        pendaftar[found].id = qmid;
                        var registe = '✔'
                    } else {
                        var registe = '❌'
                    }
                    if (ctt == null) {
                    return await zfa.reply(from, `Nomor WhatsApp tidak valid [ Tidak terdaftar di WhatsApp ]`, id) 
                    } else {
                        const contact = ctt.pushname
                        const dpd = await zfa.getProfilePicFromServer(qmid)
                    if (dpd == undefined) {
                        var pfp = errorurl
                        } else {
                            var pfp = dpd
                        } 
                    if (contact == undefined) {
                        var namae = '*Tidak Ada Nama*' 
                    } else {
                        var namae = contact
                    } 
                    await zfa.sendContact(chatId, qmid)
                    zfa.sendFileFromUrl(from, pfp, 'pfp.jpg', `*「 PROFILE 」*\n\n• *Username: ${namae}*\n• *User Info: ${status}*\n*• Block : ${block}*\n*• Banned : ${bend}*\n• *Admin Group: ${adm}*\n• *Admin Elaina: ${donate}*\n• *Registered User :* ${registe}`)
                    }
                }
            }
            break
		case prefix+'request':
		case prefix+'req':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (args.length === 1) return zfa.reply(from, '[❗] Kirim perintah *#request [teks]*\ncontoh : *#request Hallo ZidanGanz Aku Mau Request Fitur takesticker kak tolong dibuatkan yah kakak*')
            const req = body.slice(11)
            if(!bug) return
            if(isGroupMsg){
                zfa.sendText(ownerNumber, `*[REQUEST]*\n*WAKTU* : ${time}\nNO PENGIRIM : wa.me/${sender.id.match(/\d+/g)}\nGroup : ${formattedTitle}\n\n${bug}`)
                zfa.reply(from, 'Masalah telah di laporkan ke owner BOT, laporan palsu/main2 tidak akan ditanggapi.' ,id)
            }else{
                zfa.sendText(ownerNumber, `*[REQUEST]*\n*WAKTU* : ${time}\nNO PENGIRIM : wa.me/${sender.id.match(/\d+/g)}\n\n${bug}`)
                zfa.reply(from, 'Masalah telah di laporkan ke owner BOT, laporan palsu/main2 tidak akan ditanggapi.', id)
            }
            break
		// By Gimenz
        case prefix+'wa.me':
        case prefix+'wame':
		    if(isReg(obj)) return
            if(cekumur(cekage)) return
            await zfa.reply(from, `*Neh Mhank Link Nomor Wa Lu ${pushname}*\n\n*wa.me/${sender.id.replace(/[@c.us]/g, '')}*\n\n*Atau*\n\n*api.whatsapp.com/send?phone=${sender.id.replace(/[@c.us]/g, '')}*`)
            break
			        default:
            //if (!isGroupMsg) return zfa.reply(from, 'Jika Ingin Menggunakan Bot Harap Masuk Ke Dalam Grup Raisa, Link Ada Di Bio atau Bisa Mengetik #raisagroup!\nJika Ingin Sewa Bot atau Bikin Bot Harap Ketik *#iklan*', id)
            if (command.startsWith('#')) {
                zfa.reply(from, `Maaf kak ${pushname}, Command *${args[0]}* Tidak Terdaftar Di Dalam *#menu*!`, id)
            }
			/*if (command.startsWith('!')) {
                zfa.reply(from, `Maaf kak ${pushname} Sayang, Raisa pake prefix # bukan *!* coba deh kakak ketik *#menu*`, id)
            }
			if (command.startsWith('.')) {
                zfa.reply(from, `Maaf kak ${pushname} Sayang, Raisa pake prefix # bukan *.* coba deh kakak ketik *#menu*`, id)
            }
			if (command.startsWith('=')) {
                zfa.reply(from, `Maaf kak ${pushname} Sayang, Raisa pake prefix # bukan *=* coba deh kakak ketik *#menu*`, id)
            }
			if (command.startsWith('x')) {
                zfa.reply(from, `Maaf kak ${pushname} Sayang, Raisa pake prefix # bukan *x* coba deh kakak ketik *#menu*`, id)
            }*/
            await zfa.sendSeen(from) 
            }
        }
    } catch (err) {
        console.log(color('[ERROR]', 'red'), err)
        //zfa.kill().then(a => console.log(a))
    }
}

