const { MessageEmbed, Discord } = require('discord.js')
const db = require('quick.db')
const ayar = require('../ayarlar.json')
exports.run = async (client, message, args) => {

let embed = new MessageEmbed().setFooter(ayar.footer).setTimestamp().setColor('0x2f3136')

if(!message.member.roles.cache.get(ayar.yetkili) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(embed.setDescription(`${ayar.no} ${message.author}, bu komutu kullanmak için yeterli yetkilere sahip değilsin.`)).then(m => m.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }))

let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]))


let shadoxninbotundataglialimacik = await db.fetch(`talim.${message.guild.id}`)
if(shadoxninbotundataglialimacik === true) {
    if(!member.user.username.includes(ayar.tag) && !member.roles.cache.has(ayar.vip) && !member.roles.cache.has(ayar.booster) && !member.roles.cache.has(ayar.sponsor)) return message.channel.send(embed.setDescription(`Sunucumuz **TAGLI ALIMDADIR** ve kullanıcıda tag bulunmuyor bu yüzden kullanıcıyı kayıt edemezsiniz.`)).then(x => x.delete({timeout: 5000}))}

const erkek = ayar.erkek
const erkek2 = ayar.erkek2
let nick = args[1] 
let yas = args[2] 


if(!member) return message.channel.send(embed.setDescription(`${ayar.dikkat} ${message.author}, kayıt edeceğin bir kullanıcıyı etiketlemelisin! \`.e @shadox/ID isim yaş\` `))
if(!nick || !yas) return message.channel.send(embed.setDescription(`${ayar.dikkat} ${message.author}, kullanıcıya isim/yaş vermedin! \`.e @shadox/ID isim yaş\` `))
if(yas < 13) return message.channel.send(embed.setDescription(`${ayar.no} ${message.author}, Discord ve sunucumuzun kurallarına göre 13 yaşından küçükler kaydolamaz. Lütfen kullanıcıyı kaydetmeyin.`))
if(member.id === message.author.id) return message.channel.send(embed.setDescription(`${ayar.no} ${message.author}, kendini sunucuda **KAYDEDEMEZSİN.**`))
if(member.id === client.user.id) return message.channel.send(embed.setDescription(`${ayar.no} ${message.author}, botları sunucuda **KAYDEDEMEZSİN.**`))
if (member.hasPermission(8)) return message.channel.send(embed.setDescription(`${ayar.no} ${message.author}, yönetici permi olanları sunucuda **KAYDEDEMEZSİN.**`))



db.add(`teyit.${message.author.id}`, 1) 
db.add(`ekayit.${message.author.id}`, 1) 
db.add(`epuan.${message.author.id}`, 3) 
db.push(`isim.${message.guild.id}`, { userID: member.id, isim: nick, yas: yas, role: erkek.id, role2: erkek2.id, tag: ayar.tag }) // kaydolunca isim geçmiş verisini çekiyor elleme



member.setNickname(`${ayar.tag} ${nick} | ${yas}`)
message.react(ayar.yes)
member.roles.add(ayar.erkek)
member.roles.add(ayar.erkek2)
member.roles.add(ayar.erkek3)
member.roles.remove(ayar.unregister)
member.roles.remove(ayar.unregister2)


message.channel.send(embed.setTitle(`Kayıt İşlemi Başarılı!`).setDescription(`${member} kullanıcısı <@&${ayar.erkek}> olarak kaydedildi. ${ayar.yes}`))


client.channels.cache.get(ayar.chat).send(`${member} sunucumuza hoşgeldin, seninle birlikte **${message.guild.memberCount}** kişiye ulaştık !`)}

exports.conf = {enabled: true, guildOnly: true, aliases: []}
exports.help = {name: 'e'}