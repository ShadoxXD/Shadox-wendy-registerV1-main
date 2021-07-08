const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const ayar = require('../ayarlar.json')

exports.run = async(client, message, args) => {

    let embed = new MessageEmbed().setFooter(ayar.footer).setColor('RANDOM').setTimestamp()

if(!message.member.roles.cache.get(ayar.yetkili) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(embed.setDescription(`${ayar.no} ${message.author}, bu komutu kullanmak için yeterli yetkilere sahip değilsin.`)).then(m => m.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }))

let user = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]))
if(!user) return message.channel.send(embed.setDescription(`${ayar.dikkat} ${message.author}, statına bakacağın bir kişi etiketlemelisin! \`.bilgi @shadox/ID\` `))



let teyit = db.fetch(`teyit.${message.author.id}`)
let ekayit = db.fetch(`ekayit.${message.author.id}`)
let epuan = db.fetch(`epuan.${message.author.id}`)
let kkayit = db.fetch(`kkayit.${message.author.id}`)
let kpuan = db.fetch(`kpuan.${message.author.id}`)
let puan = epuan + kpuan



if(teyit == null) teyit = "0"
if(teyit == undefined) teyit = "0"
if(ekayit == null) ekayit = "0"
if(ekayit == undefined) ekayit = "0"
if(kkayit == null) kkayit = "0"
if(kkayit == undefined) kkayit = "0"
if(epuan == null) epuan = "0"
if(epuan == undefined) epuan = "0"
if(kpuan == null) kpuan = "0"
if(kpuan == undefined) kpuan = "0"

   message.channel.send(embed.setDescription(`${ayar.kitap} ${user} kullanıcısının yetkili sicilini buldum! Bu listeden yetkilisinin kayıt/puan listesini aşağıdan görebilirsiniz.
   
   \`>\` Yetkilinin toplam **${teyit}** adet teyiti bulunuyor!
   \`\`\`css
    - Toplam ${teyit} teyitin ${ekayit} tanesi erkek,
    - ${kkayit} tanesi ise kız teyit!\`\`\` 
   
   \`>\` Yetkilinin gerçekleştirdiği teyitlerden kazandığı puan sayısı **${puan}**!
   \`\`\`css
   - Kaydettiği erkeklerden toplam ${epuan} puan kazanmış!
   - Kaydettiği kızlardan toplam ${kpuan} puan kazanmış!\`\`\` 
    
   \`>\` Yetkilinin yapacağı her kayıt için kazanacağı puan sayısı: **3**!
`))
}

exports.conf = {enabled: true, guildOnly: true, aliases: ['me', 'stat']}
exports.help = {name: 'bilgi'}
