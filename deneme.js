
const Discord = require('discord.js')
const client = new Discord.Client()
const ayarlar = require("./ayarlar.json");
const play = require('discordjs-ytdl')
const { readdirSync } = require('fs');
const db = require('db');
const fs = require('fs');
const { join } = require('path');

const prefix = "-"

client.commands= new Discord.Collection();
client.aliases= new Discord.Collection();

const commandFiles = readdirSync(join(__dirname, "komutlar")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(join(__dirname, "komutlar", `${file}`));
    if (typeof command.kod === 'object'){
        command.kod.forEach(x => {
            client.commands.set(x, command)

        })
    } else {
        client.commands.set(command.kod, command)
        } 
    } 

client.on("error", console.error);





client.on('message', async message => {
    if(message.author.bot) return;
    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const command = args.shift().toLowerCase();

        if (!client.commands.has(command))  return message.channel.send(`Komut dosyamda **${command}** adlı bir komut bulamadım.`);

          try{
              client.commands.get(command).run(client, message, args);

          }catch (error) {
               console.error(error);
          }

    }
});



client.login(process.env.token)

////////////////////////////////
client.on('ready', () => {
   console.log('bot aktif!', `${client.user.tag}`)
    const durumlar = [
        "Bu bot krafenly tarafından yapılmıtır!",
        "Bu bot krafenly tarafından yapılmıtır!",
        `${client.guilds.cache.size} Sunucudayım!!!`
    ]
    setInterval(function () {
        let durum = durumlar[Math.floor(Math.random()*durumlar.length)]
        client.user.setActivity(durum)
       }, 2500);
        client.user.setStatus('online')
    });

