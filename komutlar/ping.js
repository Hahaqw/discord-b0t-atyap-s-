module.exports = {
    kod: "ping",
    async run (client, message, args) { 
        const { MessageEmbed } = require('discord.js')
        const embed = new MessageEmbed()
        .setTitle('Ping Ölçülüyor.')
        .addField('Bot Pingi:', client.ws.ping + ' ms')
        .setColor("RANDOM")
           .addField('Mesaj Gecikme SÜRESİ:', `${Date.now() - message.createdTimestamp} ms`)
           message.channel.send(embed)
    }
}