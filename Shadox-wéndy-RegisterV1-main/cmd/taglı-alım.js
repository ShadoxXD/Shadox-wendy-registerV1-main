const { MessageEmbed, Message } = require('discord.js')
const data = require('quick.db')
const ayar = require('../ayarlar.json')

exports.run = async (client, message, args) => {

  if(!message.member.hasPermission('ADMINISTRATOR')) return message.react(ayar.no)

    if(!args[0]) {
    message.channel.send(new MessageEmbed().setDescription(`Hey dostum, taglı alım sistemi değiştirilsin mi? O zaman **AÇ/KAPAT** yazmalısınız.`).setColor('RED').setFooter(ayar.footer)); return }
  
    if (args[0] == 'aç') {
  let shadoxninbotundataglialimacikmiacaba =  data.fetch(`talim.${message.guild.id}`)
    if(shadoxninbotundataglialimacikmiacaba === true) return message.channel.send(new MessageEmbed().setDescription(`Taglı alım şu an zaten **AÇIK** durumda. Yanlış bir şey olduğunu düşünüyorsan botun developeri olan \`shadox.#1970\` kişisine ulaş.`).setColor('BLACK').setFooter(ayar.footer))}

    await data.set(`talim.${message.guild.id}`, true)
    message.channel.send(new MessageEmbed().setDescription(`Taglı alım **AÇILDI.** Artık tagı olmayan üyelerimiz sunucuda kayıt olamayacaktır.`).setColor('BLACK').setFooter(ayar.footer))

   
if (args[0] == 'kapat') {
     let shadoxninbotundataglialimkapalimiacaba = data.fetch(`talim.${message.guild.id}`)
    if(shadoxninbotundataglialimkapalimiacaba === false) return message.channel.send(new MessageEmbed().setDescription(`Taglı alım şu an zaten **KAPALI** durumda. Yanlış bir şey olduğunu düşünüyorsan botun developeri olan \`shadox.#1970\` kişisine ulaş.`).setColor('BLACK').setFooter(ayar.footer))

    await data.set(`talim.${message.guild.id}`, false)
    message.channel.send(new MessageEmbed().setDescription(`Taglı alım **KAPATILDI.** Artık tagı olmayan üyelerimiz de sunucumuzda kayıt olabileceklerdir.`).setColor('BLACK').setFooter(ayar.footer))}}



exports.conf = {enabled: true, guildOnly: false, aliases: ['talım', 'taglıalım'], permLevel: 0}
exports.help = {name: "taglı-alım"}