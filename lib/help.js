const fs = require('fs-extra')

const help = (prefix, cts, pendaftar) => {
    return `
💝 *RAISA FARIZA* 💝

 CREATOR : ZidanGanz
 wa.me/6281310253704
 ${pendaftar.length} Orang Dikenal
 https://zidanzfa.com [Tempat beli follower dll terpercaya]

Bot Ini Tidak Online 24 Jam.
Dan masih tahap pengembangan.
💝 *LIST FITUR* 💝

➵ *${prefix}join*
➵ *${prefix}brainly*
➵ *${prefix}thunder*
➵ *${prefix}glitch*
➵ *${prefix}playstore*
➵ *${prefix}indohot* Disable Because Ramadhan
➵ *${prefix}cerpen* New
➵ *${prefix}joker* New
➵ *${prefix}codmw* New
➵ *${prefix}sunset* New
➵ *${prefix}avanger* New
➵ *${prefix}phub* New
➵ *${prefix}glow* New
➵ *${prefix}minion* New
➵ *${prefix}space* New
➵ *${prefix}sticker*
➵ *${prefix}take*
➵ *${prefix}lirik*
➵ *${prefix}tts*
➵ *${prefix}ttp*
➵ *${prefix}cuaca*  New
➵ *${prefix}listdaerah* New
➵ *${prefix}randomnsfwneko* New
➵ *${prefix}randomanime* New
➵ *${prefix}nhder* New
➵ *${prefix}nhview* New
➵ *${prefix}nhinfo* New
➵ *${prefix}kpop* New
➵ *${prefix}waifu* New
➵ *${prefix}komiku* New
➵ *${prefix}downloadmanga* New
➵ *${prefix}downloadanime* New
➵ *${prefix}wiki* New
➵ *${prefix}renungan* New
➵ *${prefix}slap* New
➵ *${prefix}hug* New
➵ *${prefix}nye* New
➵ *${prefix}pat* New
➵ *${prefix}pastebin*
➵ *${prefix}textmaker*
➵ *${prefix}quotemaker*
➵ *${prefix}hitung*
➵ *${prefix}cekip*
➵ *${prefix}waktu*
➵ *${prefix}cantik*
➵ *${prefix}ganteng*
➵ *${prefix}sticker* Error :(
➵ *${prefix}stickergif*
➵ *${prefix}stickerlightning*
➵ *${prefix}stickerfire*
➵ *${prefix}toimg*
➵ *${prefix}shota*
➵ *${prefix}wallanime*
➵ *${prefix}quoteanime*
➵ *${prefix}malanime*
➵ *${prefix}maluser*
➵ *${prefix}malcharacter*
➵ *${prefix}meme*
➵ *${prefix}jelek*
➵ *${prefix}mypic*
➵ *${prefix}yourpic*
➵ *${prefix}ytsearch* Error :(
➵ *${prefix}google*
➵ *${prefix}translate*
➵ *${prefix}apakah*
➵ *${prefix}kapankah*
➵ *${prefix}nilai*
➵ *${prefix}bisakah*
➵ *${prefix}gdrive*
➵ *${prefix}neko*
➵ *${prefix}cewe*
➵ *${prefix}maps*
➵ *${prefix}ig* Error :(
➵ *${prefix}tt* Error :(
➵ *${prefix}mark*
➵ *${prefix}smule* Error :(
➵ *${prefix}antibadword*
➵ *${prefix}antisticker*
➵ *${prefix}lock*
➵ *${prefix}unlock*
➵ *${prefix}add*
➵ *${prefix}kick*
➵ *${prefix}tagall*
➵ *${prefix}promote*
➵ *${prefix}demote*
➵ *${prefix}setgcname*
➵ *${prefix}setgcpp*
➵ *${prefix}ping*

_JIKA ADA YANG ERROR SILAHKAN KETIK *#bugreport* Keluh Kesahmu Sayang_
 RAISA TELAH AKTIF SELAMA :
 ${cts}

💝 *RAISA FARIZA* 💝
`
}
exports.help = help
const ownercmd = (prefix) => {
    return `
╔══✪〘 OWNER 〙✪══
║
╠➥ *${prefix}block 62858xxxxx*
╠➥ *${prefix}unblock 62858xxxxx*
╠➥ *${prefix}addadmin @tagmember*
╠➥ *${prefix}deladmin @tagmember*
╠➥ *${prefix}restart*
╠➥ *${prefix}ekickall*
╠➥ *${prefix}banchat*
╠➥ *${prefix}unbanchat*
╠➥ *${prefix}setname [teks]*
╠➥ *${prefix}setstatus [teks]*
╠➥ *${prefix}setprofilepic*
╠➥ *${prefix}eval [kode JavaScript]*
║
╚═〘 ELAINA BOT 〙`
}
exports.ownercmd = ownercmd
const admincmd = (prefix) => {
    return `
*-=[GRUBMENU]=-*

 *${prefix}kick*
 *${prefix}promote*
 *${prefix}lock*
 *${prefix}unlock*
 *${prefix}simi*
 *${prefix}antibadword*
 *${prefix}antilink*
 *${prefix}setgcname*
 *${prefix}setgcpp*
 *${prefix}tagall*

`
}
exports.admincmd = admincmd
const nsfwcmd = (prefix) => {
    return `
╔══✪〘 NSFW 〙✪══
║
╠➥ *${prefix}randombokep
╠➥ *${prefix}randomhentai*
╠➥ *${prefix}randomnsfwneko*
╠➥ *${prefix}randomtrapnime*
╠➥ *${prefix}nhentai [kode]*
╠➥ *${prefix}nhder [kode]*
╠➥ *${prefix}xnxx [linkXnxx]*
║
╚═〘 ELAINA BOT 〙`
}
exports.nsfwcmd = nsfwcmd
const praycmd = (prefix) => {
    return `
╔══✪〘 PRAY 〙✪══
║
╠➥ *${prefix}quran [urutan surah]*
╠➥ *${prefix}infosurah [nama surah]*
╠➥ *${prefix}tafsir [nama surah] [ayat]*
╠➥ *${prefix}jadwalsholat [daerah]*
╠➥ *${prefix}listsurah*
╠➥ *${prefix}listdaerah*
║
╚═〘 ELAINA BOT 〙`
}
exports.praycmd = praycmd
const kerangcmd = (prefix) => {
    return `
*-=[MAKER]=-*

 *${prefix}blackpink* Text
 *${prefix}sticker*
 *${prefix}stickergif*
 *${prefix}stickerlightning*
 *${prefix}stickerfire*
 *${prefix}toimg*
 *${prefix}quotemaker*
 *${prefix}textmaker*
 *${prefix}take* |Text1|Text2
 *${prefix}pornhub* |Text1|Text2
 *${prefix}trash*
 *${prefix}nobg*
 *${prefix}thuglife*
 *${prefix}tobecontinue*
 *${prefix}pencil*
 *${prefix}thunder* Text
 *${prefix}glitch* |Text1|Text2
 *${prefix}ttp*
 *${prefix}tts*

`
}
exports.kerangcmd = kerangcmd
const funcmd = (prefix) => {
    return `
*-=[FUN]=-*

 *${prefix}jelek*
 *${prefix}cantik*
 *${prefix}ganteng*
 *${prefix}apakah*
 *${prefix}kapankah*
 *${prefix}bisakah*
 *${prefix}nilai*
 *${prefix}nye*
 *${prefix}slap*
 *${prefix}hug*
 *${prefix}pat*

`
}
exports.funcmd = funcmd
const mediacmd = (prefix) => {
    return `
*-=[MEDIA]=-*

 *${prefix}ig*
 *${prefix}ytmp3*
 *${prefix}ytmp4*
 *${prefix}play*
 *${prefix}ytsearch*
 *${prefix}ytstalk*
 *${prefix}video* Query
 *${prefix}getvideo*
 *${prefix}musik* Query
 *${prefix}getmusik*
 *${prefix}mark* link epbi
 *${prefix}drakor* Query
 *${prefix}lk21* Query
 *${prefix}nhder* Kode Nuclear

`
}
exports.mediacmd = mediacmd
const animecmd = (prefix) => {
    return `
*-=[TOOLS]=-*

*${prefix}translate*
*${prefix}bahasa*
*${prefix}google*
*${prefix}gdrive*
*${prefix}join* linkgrub
*${prefix}yourpic*
*${prefix}mypic*
*${prefix}imgtopdf*
*${prefix}waktu*
*${prefix}cekip*
*${prefix}lirik*
*${prefix}jadwalsholat* Kota
*${prefix}playstore*
*${prefix}maps*

`
}
exports.animecmd = animecmd
const othercmd = (prefix) => {
    return `
*-=[PENDIDIKAN]=-*

*${prefix}brainly*
*${prefix}hitung*
*${prefix}wiki*

`
}
exports.othercmd = othercmd
const downloadcmd = (prefix) => {
    return `
*-=[RANDOM]=-*

*${prefix}cewe*
*${prefix}cowo*
*${prefix}shota*
*${prefix}wallanime*
*${prefix}quoteanime*
*${prefix}malanime*
*${prefix}maluser*
*${prefix}malcharacter*
*${prefix}neko*
*${prefix}bts*
*${prefix}loli*
*${prefix}jdawalbola*
*${prefix}berita*
*${prefix}infogempa*

`
}
exports.downloadcmd = downloadcmd
const groupcmd = (prefix) => {
    return `
Cenglog`
}
exports.groupcmd = groupcmd
const readme = (prefix) => {
    return `
            *「 STALK 」*

*[@username]* Diisi dengan Username yang valid tanpa tanda “[” dan “]”
Contoh : *${prefix}tiktokstalk @tobz2k19*

*[@username]* Diisi dengan Username yang valid tanpa tanda “[” dan “]”
Contoh : *${prefix}igstalk @tobz2k19*

*[@username]* Diisi dengan Username yang valid tanpa tanda “[” dan “]”
Contoh : *${prefix}smulestalk @tobz2k19*

            *「 YT SEARCH 」*

*[video]* Diisi dengan Judul Video yang valid tanpa tanda “[” dan “]”
Contoh : *${prefix}video Erpan1140*
Jika ingin mendownload video harap ketik #getvideo [IdDownload] atau #getvideo [urutan]

*[lagu]* Diisi dengan Judul Lagu yang valid tanpa tanda “[” dan “]”
Contoh : *${prefix}music Alan Walker Alone*
Jika ingin mendownload lagu harap ketik #getmusic [IdDownload] atau #getmusic [urutan]

*[IdDownload] atau [urutan]* Diisi dengan IdDownload yang valid tanpa tanda “[” dan “]”
Contoh : *Jika tidak reply pesan : ${prefix}getmusic Iv32bS1*
Contoh : *Jika reply pesan : ${prefix}getmusic 1*
Contoh : *Jika tidak reply pesan : ${prefix}getvideo Iv32bS1*
Contoh : *Jika reply pesan : ${prefix}getvideo 1*

            *「 DOWNLOADER 」*

*[linkStarmaker]* Diisi dengan link Starmaker yang valid tanpa tanda “[” dan “]”
Contoh : *${prefix}starmaker https://m.starmakerstudios.com/d/playrecording?app=sm&from_user_id=3096224747920316&is_convert=true&recordingId=10696049124506354&share_type=copyLink*

*[linkTwitter]* Diisi dengan link YouTube yang valid tanpa tanda “[” dan “]”
Contoh : *${prefix}twitter https://twitter.com/PassengersMovie/status/821025484150423557*

*[linkXnxx]* Diisi dengan link Xnxx yang valid tanpa tanda “[” dan “]”
Contoh : *${prefix}xnxx http://www.xnxx.com/loli/stev-gay*

*[linkNekopoi]* Diisi dengan link Nekopoi yang valid tanpa tanda “[” dan “]”
Contoh : *${prefix}nekopoi https://nekopoi.care/tsunpuri-episode-1-subtitle-indonesia/*

*[linkYt]* Diisi dengan link YouTube yang valid tanpa tanda “[” dan “]”
Contoh : *${prefix}ytmp3 https://youtu.be/Bskehapzke8*

*[linkYt]* Diisi dengan link YouTube yang valid tanpa tanda “[” dan “]”
Contoh : *${prefix}ytmp4 https://youtu.be/Bskehapzke8*

*[linkTiktok]* Diisi dengan link Tiktok yang valid tanpa tanda “[” dan “]”
Contoh : *${prefix}tiktok https://vt.tiktok.com/yqyjPX/*

*[linkSmule]* Diisi dengan link Smule yang valid tanpa tanda “[” dan “]”
Contoh : *${prefix}smule https://www.smule.com/p/767512225_3062360163*

*[linkIg]* Diisi dengan link Instagram yang valid tanpa tanda “[” dan “]”
Contoh : *${prefix}ig https://www.instagram.com/p/CFqRZTlluAi/?igshid=1gtxkbdqhnbbe*

*[linkFb]* Diisi dengan link Facebook yang valid tanpa tanda “[” dan “]”
Contoh : *${prefix}fb https://www.facebook.com/EpochTimesTrending/videos/310155606660409*

*[linkTiktok]* Diisi dengan link facebookt Tiktok yang valid tanpa tanda “[” dan “]”
Contoh : *${prefix}tiktok https://vt.tiktok.com/yqyjPX/*

            *「 OTHER 」*

*[daerah]* Diisi dengan daerah yang valid, tanpa tanda “[” dan “]”
Contoh : *${prefix}jadwalShalat Tangerang*

*[channel]* Diisi dengan channel televisi yang valid, tanpa tanda “[” dan “]”
Contoh : *${prefix}jadwalTv Indosiar*

*[query]* Diisi dengan query/pencarian yang valid, tanpa tanda “[” dan “]“
Contoh : *${prefix}googlesearch siapa itu elaina*

*[tempat]* Diisi dengan tempat/lokasi yang valid, tanpa tanda “[” dan “]“
Contoh : *${prefix}cuaca tangerang*

*[kode bhs]* Diisi dengan kode bahasa, contoh *id*, *en*, dll. Dan *[teks]* Diisi dengan teks yang ingin di jadikan voice, Masih sama seperti di atas tanpa tanda “[” dan “]”
Contoh : *${prefix}tts id Test*
Note : Max 250 huruf

*[|teks|author|theme]* Diisi dengan teks, author, dan theme, tanpa tanda “[” dan “]”
Contoh : *${prefix}quotemaker |Odading|Mang Oleh|Shark*

*[optional]* Diisi dengan teks|title lirik lagu, tanpa tanda “[” dan “]”.
Contoh : *${prefix}lirik aku bukan boneka*

*[ipaddress]* Diisi dengan Ip Address yang valid, tanpa tanda “[” dan “]”.
Contoh : *${prefix}checkip 182.0.144.145*`
}
exports.readme = readme
const info = () => {
    return `
💝 *INFORMASI* 💝

➵ *BOT USING : OPENWA*
➵ *NAME : RAISA FARIZA*
➵ *VERSION : 4.0*
➵ *GITHUB : https://github.com/ZIdanSinaga/NaiZid*

💝 *RAISA FARIZA* 💝
`
}

exports.info = info
const snk = () => {
    return `Syarat dan Ketentuan Bot *RAISA*
1. Teks dan nama pengguna WhatsApp anda akan kami simpan di dalam server selama bot aktif
2. Data anda akan di hapus ketika bot Offline
3. Kami tidak menyimpan gambar, video, file, audio, dan dokumen yang anda kirim
4. Kami tidak akan pernah meminta anda untuk memberikan informasi pribadi
5. Jika menemukan Bug/Error silahkan langsung lapor ke Owner bot
6. Apapun yang anda perintah pada bot ini, KAMI TIDAK AKAN BERTANGGUNG JAWAB!

Thanks !`
}
exports.snk = snk
const sewa = () => {
    return `
╔══✪〘 IKLAN 〙✪══
║
╠═══════════════════════════
╠➥ *DAFTAR SEWA & BUAT BOT :*
╠➥ *SEWA : 25K/GRUP (BULAN)*
╠➥ *BUAT : 100K (BISA JADI OWNER)*
╠➥ *PEMBAYARAN BISA MELALUI :*
╠➥ *OVO, PAYPAL, DANA, PULSA +5K*
╠═══════════════════════════
╠➥ *KEUNTUNGAN SEWA BOT :*
╠➥ *1. BISA MENJADI ADMIN ELAINA*
╠➥ *2. BISA MENDAPATKAN COMMAND ADMIN*
╠➥ *KEUNTUNGAN BUAT BOT :*
╠➥ *1. BISA MENJADI OWNER BOT SENDIRI*
╠➥ *2. BISA MENGGANTI NAMA BOT SENDIRI*
╠➥ *3. BISA MEMBAWA BOT KE GROUP*
╠➥ *4. BISA MENGGUNAKAN COMMAND OWNER*
╠➥ *5. BISA MENYEWAKAN BOT KEMBALI*
╠═══════════════════════════
╠➥ *JIKA MINAT IKLAN DIATAS*
╠➥ *HARAP HUBUNGI NOMOR DIBAWAH :*
╠➥ *wa.me/6281311850715*
║
╚═〘 ELAINA BOT 〙
`
}
exports.sewa = sewa
const sumbang = () => {
    return `
Mau donasi kak? ih kakak baik banget... 
Raisa jadi sayang :*
Kakak bisa donasi melalui:
➵ Pulsa	:081310253704
➵ Dana	:081310253704

Terimakasih kakak. Donasi dari kakak akan Raisa gunakan untuk keperluan bot ini
dan untuk membeli Kopi Buat Zidan Tersayang :*
`
}
exports.sumbang = sumbang
const listChannel = () => {
    return `Daftar channel: 
1. ANTV
2. GTV
3. Indosiar
4. iNewsTV
5. KompasTV
6. MNCTV
7. METROTV
8. NETTV
9. RCTI
10. SCTV
11. RTV
12. Trans7
13. TransTV`
}
exports.listChannel = listChannel
const bahasalist = () => {
    return `*List kode Bahasa*\n
  *Code       Bahasa*
    sq        Albanian
    ar        Arabic
    hy        Armenian
    ca        Catalan
    zh        Chinese
    zh-cn     Chinese (China)
    zh-tw     Chinese (Taiwan)
    zh-yue    Chinese (Cantonese)
    hr        Croatian
    cs        Czech
    da        Danish
    nl        Dutch
    en        English
    en-au     English (Australia)
    en-uk     English (United Kingdom)
    en-us     English (United States)
    eo        Esperanto
    fi        Finnish
    fr        French
    de        German
    el        Greek
    ht        Haitian Creole
    hi        Hindi
    hu        Hungarian
    is        Icelandic
    id        Indonesian
    it        Italian
    ja        Japanese
    ko        Korean
    la        Latin
    lv        Latvian
    mk        Macedonian
    no        Norwegian
    pl        Polish
    pt        Portuguese
    pt-br     Portuguese (Brazil)
    ro        Romanian
    ru        Russian
    sr        Serbian
    sk        Slovak
    es        Spanish
    es-es     Spanish (Spain)
    es-us     Spanish (United States)
    sw        Swahili
    sv        Swedish
    ta        Tamil
    th        Thai
    tr        Turkish
    vi        Vietnamese
    cy        Welsh
      `
}
exports.bahasalist = bahasalist
