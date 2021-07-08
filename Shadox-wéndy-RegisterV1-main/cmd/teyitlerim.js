const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const ayar = require('../ayarlar.json')

exports.run = async(client, message, args) => {

    let embed = new MessageEmbed().setFooter(ayar.footer).setColor('RANDOM').setTimestamp()

if(!message.member.roles.cache.get(ayar.yetkili) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(embed.setDescription(`${ayar.no} ${message.author}, bu komutu kullanmak için yeterli yetkilere sahip değilsin.`)).then(m => m.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }))

let user = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]))
if(!user) return message.channel.send(embed.setDescription(`${ayar.dikkat} ${message.author}, teyit sayısına bakacağın bir kişi etiketlemelisin! \`.teyitler @shadox/ID\` `))


let teyit = db.fetch(`teyit.${message.author.id}`)
let ekayit = db.fetch(`ekayit.${message.author.id}`)
let kkayit = db.fetch(`kkayit.${message.author.id}`)


if(teyit == null) teyit = "0"
if(teyit == undefined) teyit = "0"
if(ekayit == null) ekayit = "0"
if(ekayit == undefined) ekayit = "0"
if(kkayit == null) kkayit = "0"
if(kkayit == undefined) kkayit = "0"

   message.channel.send(embed.setDescription(`
\`>\` Toplam **${teyit}** teyitin bulunuyor!
\`>\` **${ekayit}** adet __erkek__ teyite sahipsin!
\`>\` **${kkayit}** adet __bayan__ teyite sahipsin!

[DİPNOT]: En fazla 10 teyiti olan kişileri listelemek için \`.topteyit\` komutunu kullanın.
`))
}

exports.conf = {enabled: true, guildOnly: true, aliases: ['teyit', 'teyitim', 'my', 'teyitler']}
exports.help = {name: 'teyitlerim'}