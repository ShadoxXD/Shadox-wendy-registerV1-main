const { MessageEmbed } = require('discord.js')
const ayar = require('../ayarlar.json')

exports.run =  async (client, message, args) => {

  if(!message.member.roles.cache.get(ayar.yetkili) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(embed.setDescription(`${ayar.no} ${message.author}, bu komutu kullanmak için yeterli yetkilere sahip değilsin.`)).then(m => m.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }))
  
let embed = new MessageEmbed().setFooter(ayar.footer).setTimestamp().setColor('BLACK')
const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));

if(!member) return message.channel.send(embed.setDescription(`${ayar.dikkat} ${message.author}, bir kullanıcı etiketlemelisin! \`.isim @shadox/ID isim yaş\` `))
if(member.id === message.author.id) return message.channel.send(embed.setDescription(`${ayar.no} ${message.author}, kendi ismini **DEĞİŞTİREMEZSİN.** `))
if(member.id === client.user.id) return message.channel.send(embed.setDescription(`${ayar.no} ${message.author}, botların ismini **DEĞİŞTİREMEZSİN.** `))
if(member.id === message.guild.OwnerID) return message.channel.send(embed.setDescription(`${ayar.no} ${message.author}, taç sahibinin ismini **DEĞİŞTİREMEZSİN.** `))
if(member.hasPermission(8)) return message.channel.send(embed.setDescription(`${ayar.no} ${message.author}, yönetici permi olanların ismini **DEĞİŞTİREMEZSİN.** `))
if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(embed.setDescription(`${ayar.no} ${message.author}, senden üst pozisyonda olan birinin ismini **DEĞİŞTİREMEZSİN.**`))

let isim = args[1] 
let yas = Number(args[2])

if(!isim) return message.channel.send(embed.setDescription(`${ayar.dikkat} ${message.author}, bir **İSİM** yazmalısın! \`.isim @shadox/ID isim yaş\` `))
if(!yas) return message.channel.send(embed.setDescription(`${ayar.dikkat} ${message.author}, bir **YAŞ** yazmalısın! \`.isim @shadox/ID isim yaş\` `))


member.setNickname(`${ayar.tag} ${isim} | ${yas}`)
message.react(ayar.yes)


message.channel.send(embed.setDescription(`${ayar.yes} ${message.author}, ${member} üyesinin ismini \`${ayar.tag} ${isim} | ${yas}\` olarak başarıyla **DEĞİŞTİRDİM.**`))
}

exports.conf = {enabled: true, guildOnly: true, aliases: ['i', 'nick', 'n'], permLevel: 0}
exports.help = {name: 'isim'}