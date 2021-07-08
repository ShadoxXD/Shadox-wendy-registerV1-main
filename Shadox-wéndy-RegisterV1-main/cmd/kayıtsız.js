const { MessageEmbed } = require("discord.js")
const ayar = require("../ayarlar.json")

exports.run = async(client, message, args) => {
    if (!message.member.roles.cache.has(ayar.yetkili) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayar.no)
    let embed = new MessageEmbed().setColor('RANDOM')

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let user = message.guild.member(member)
    if (!user) return message.channel.send(embed.setDescription(`${message.author} kimi kayıtsıza atacağını yazmadın! \`.kayıtsız @shadox/ID\``).setTimestamp().setFooter(ayar.footer)).then(m => m.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }))

    if (user.id === message.author.id) return message.react(ayar.no)
    if (user.id === client.user.id) return message.react(ayar.no)
    if (user.roles.highest.position >= message.member.roles.highest.position) return message.react(ayar.no)
    if (user.hasPermission(8)) return message.react(ayar.no)

    user.roles.set([ayar.unregister])
    message.react(ayar.yes)
    message.channel.send(embed.setDescription(`${user} kullanıcısı ${message.author} tarafından kayıtsıza postalandı.`).setTimestamp().setFooter(ayar.footer)).then(m => m.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }))
}


exports.conf = {enabled: true, guildOnly: true, aliases: ['unregister', 'u'], permLevel: 0}
exports.help = {name: 'kayıtsız'}