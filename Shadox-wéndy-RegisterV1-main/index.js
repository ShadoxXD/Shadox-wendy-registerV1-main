const Discord = require('discord.js')
const { Client, Collection, Util, MessageEmbed } = require('discord.js')
const client = (global.client = new Client())
const ayarlar = require('./ayarlar.json')
const nodefetch = require('node-fetch')
const chalk = require('chalk')
const moment = require('moment')
const fs = require('fs')
const db = require('quick.db')
require('./util/eventLoader.js')(client)

client.on('ready', () => { console.log(``)
client.user.setPresence({ activity: { name: `${ayarlar.ready}` }, status: "idle" }) })
const log = message => { console.log(`${message}`) }


client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
fs.readdir('./cmd/', (err, files) => {if (err) console.error(err)
  log(`${files.length} adet komut yükleniyor.`)
 files.forEach(f => {let props = require(`./cmd/${f}`)
      log(`${props.help.name} adlı komut yüklendi.`)
      client.commands.set(props.help.name, props)
      props.conf.aliases.forEach(alias => { client.aliases.set(alias, props.help.name)})})})


client.reload = command => {return new Promise((resolve, reject) => { try { delete require.cache[require.resolve(`./cmd/${command}`)]
          let cmd = require(`./cmd/${command}`)
          client.commands.delete(command)
          client.aliases.forEach((cmd, alias) => { if (cmd === command) client.aliases.delete(alias)})
          client.commands.set(command, cmd)
          cmd.conf.aliases.forEach(alias => { client.aliases.set(alias, cmd.help.name)}); resolve()} catch (e) {reject(e)}})}


client.load = command => { return new Promise((resolve, reject) => { try { let cmd = require(`./cmd/${command}`)
          client.commands.set(command, cmd)
          cmd.conf.aliases.forEach(alias => {client.aliases.set(alias, cmd.help.name)}); resolve()} catch (e) { reject(e) }})}


client.unload = command => {return new Promise((resolve, reject) => { try { delete require.cache[require.resolve(`./cmd/${command}`)]
          let cmd = require(`./cmd/${command}`)
          client.commands.delete(command)
          client.aliases.forEach((cmd, alias) => { if (cmd === command) client.aliases.delete(alias)})
          resolve()} catch (e) { reject(e) }})}


client.elevation = message => {if (!message.guild) {return}
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3
    if (message.author.id === ayarlar.sahip) permlvl = 4
    return permlvl }


var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
client.on('warn', e => {console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')))})
client.on('error', e => {console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')))})


client.login(ayarlar.token)


client.on('message', msg => {if (msg.content === 'tag') {msg.channel.send(`\`${ayarlar.tag}\` `)}})
client.on('message', msg => {if (msg.content === '.tag') {msg.channel.send(`\`${ayarlar.tag}\` `)}})
client.on('message', msg => {if (msg.content === 'Tag') {msg.channel.send(`\`${ayarlar.tag}\` `)}})
client.on('message', msg => {if (msg.content === '!tag') {msg.channel.send(`\`${ayarlar.tag}\` `)}})
client.on('message', msg => {if (msg.content === '.TAG') {msg.channel.send(`\`${ayarlar.tag}\` `)}})
client.on('message', msg => {if (msg.content === '.Tag') {msg.channel.send(`\`${ayarlar.tag}\` `)}})


  client.on("ready", async () => {console.log("Bot belirttiğiniz ses kanalına başarıyla bağlandı !")
    let ses = client.channels.cache.get(ayarlar.ses)
    if (ses) ses.join().catch(err => console.error("Bot ses kanalına giremedi. Lütfen tüm hataları göz önünde bulundurarak düzelt !"))})



    client.on("guildMemberAdd", member => {
      require("moment-duration-format")
        var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
        var üs = üyesayısı.match(/([0-999])/g)
        üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "Bilinemiyor.").toLowerCase()
        if(üs) {
          üyesayısı = üyesayısı.replace(/([0-9999])/g, d => {
            return {
              "0": "", 
              "1": "", 
              "2": "", 
              "3": "", 
              "4": "",          
              "5": "", 
              "6": "", 
              "7": "", 
              "8": "", 
              "9": ""}[d];})} 
      let user = client.users.cache.get(member.id);
      require("moment-duration-format");

       const tasaklibotcushadox = new Date().getTime() - user.createdAt.getTime()
        const shadoxdoguyor = moment.duration(tasaklibotcushadox).format(`\`YY [Yıl,] DD [Gün,] HH [Saat,] mm [Dakika,] ss [Saniye]\` `)

      moment.locale("tr");
      member.setNickname(`∘ İsim | Yaş`)
     member.roles.add(ayarlar.unregister)
     member.roles.add(ayarlar.unregister2)
      client.channels.cache.get(ayarlar.welcome).send(`
     <@`+ member +`> sunucumuza hoşgeldin! Hesabın `+shadoxdoguyor+` önce oluşturulmuş :tada:
    
    <@&${ayarlar.yetkili}> rolündeki yetkililerimiz seninle ilgilenecektir. Sunucu kurallarımız <#${ayarlar.rules}> kanalında belirtilmiştir. Unutma sunucu içerisindeki kuralları okuduğunu varsayarak ceza-i işlem uygulanacak.
    
    Herhangi bir kanala \`.tag\` yazarak taga ulaşabilirsin :tada:
    
    Seninle beraber `+üyesayısı+` kişiye ulaştık! Sol tarafta bulunan \`V.Confirmation\` odalarından birine girerek kayıt işlemlerini gerçekleştirebilirsin.
    `)})