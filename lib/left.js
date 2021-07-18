const fs = require('fs-extra')

module.exports = left = async (zfa, event) => {
    //console.log(event.action)
    const left = JSON.parse(fs.readFileSync('./lib/database/left.json'))
    const isLeft = left.includes(event.chat)
    try {
        if (event.action == 'remove' && left) {
            const gChat = await zfa.getChatById(event.chat)
            const pChat = await zfa.getContact(event.who)
            const { contact, groupMetadata, name } = gChat
            const pepe = await zfa.getProfilePicFromServer(event.who)
            const capt = `@${event.who.replace('@c.us', '')} Telah keluar dari grub. Yeay! Beban grub berkurang 1 `
           // if (pepe == '' || pepe == undefined) {
             //   await zfa.sendFileFromUrl(event.chat, 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQcODjk7AcA4wb_9OLzoeAdpGwmkJqOYxEBA&usqp=CAU', 'profile.jpg')
           // } else {
               //await zfa.sendFileFromUrl(event.chat, pepe, 'profile.jpg')
                zfa.sendTextWithMentions(event.chat, capt)
            }
        
    } catch (err) {
        console.log(err)
    }
}
