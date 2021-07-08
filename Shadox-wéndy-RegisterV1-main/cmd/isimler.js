const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const ayar = require('../ayarlar.json')
exports.run = async (client, message, args) => {
 
  let embed = new MessageEmbed().setFooter(ayar.footer).setTimestamp().setColor('0x2f3136')

  if(!message.member.roles.cache.get(ayar.yetkili) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(embed.setDescription(`${ayar.no} ${message.author}, bu komutu kullanmak için yeterli yetkilere sahip değilsin.`)).then(m => m.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }))
  const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if(!user) return message.channel.send(embed.setDescription(`${ayar.dikkat} ${message.author}, bir kullanıcı etiketlemedin! \`.isimler @shadox/ID\` `))
let isim = message.mentions.members.first() || message.guild.members.cache.get(args[0])
var sayi = 1
let data = db.get(`isim.${message.guild.id}`)
let rol = db.fetch(`rol.${message.guild.id}`)
if(!data) return message.channel.send(embed.setDescription(`${ayar.sag} Kullanıcı sunucumuzda daha önce hiç kaydolmamış!`))
let isimler = data.filter(x => x.userID === isim.id).map(x => `${ayar.sag} ${sayi++}- **Nick/Age :** \`${ayar.tag} ${x.isim} | ${x.yas}\ **E/K :** <@&${x.rol}>`).join("\n")
if(isimler === null) isimler = `${ayar.no} Kullanıcı sunucumuzda daha önce hiç kaydolmamış!`
if(isimler === undefined) isimler = `${ayar.no} Kullanıcı sunucumuzda daha önce hiç kaydolmamış!`

message.channel.send(embed.setDescription(`${ayar.yildiz} Kullanıcı sunucumuzda \`${sayi}\` kere kaydolmuş! Datasındaki isimleri:
${isimler}`))
}



exports.conf = {enabled: true, guildOnly: true, aliases: []}
exports.help = {name: 'isimler'}