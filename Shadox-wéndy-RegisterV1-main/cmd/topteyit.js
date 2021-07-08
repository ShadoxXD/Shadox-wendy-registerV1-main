const Discord = require('discord.js')
const db = require('quick.db')
const ayar = require('../ayarlar.json')

exports.run = async (client, message, member) => {
    if(!message.member.roles.cache.get(ayar.yetkili) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(ayar.no)

        let uye = message.mentions.users.first() || message.author
  
let top = message.guild.members.cache.filter(uye => db.get(`yetkili.${uye.id}.toplam`)).array().sort((uye1, uye2) => Number(db.get(`yetkili.${uye2.id}.toplam`))-Number(db.get(`yetkili.${uye1.id}.toplam`))).slice(0, 10).map((uye, index) => (index+1)+" - <@"+ uye +"> toplamda \`" + db.get(`yetkili.${uye.id}.toplam`) +"\` kayıta sahip.").join('\n');
message.channel.send(new Discord.MessageEmbed().setColor("0x2f3136").setDescription(top).setTimestamp().setFooter(ayar.footer))}



exports.conf = {enabled: true, guildOnly: false, aliases: ['top', 'top-teyit'], permLevel: 0}
exports.help = {name: "topteyit"}