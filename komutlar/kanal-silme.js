module.exports = {
    kod: "kanal-sil",
    async run(client, message, args) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('BU komutu kullanma iznin yok.');
        let kanal = message.mentions.channels.first()
        message.channel.delete()
    }
}