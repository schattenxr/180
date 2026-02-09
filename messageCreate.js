const { Events } = require("discord.js");
const { owner, prefix } = require('../../berlin.json');

module.exports = {
    name: Events.MessageCreate,
    async execute(message, client) {
        if (message.author.bot) return;
        if (message.channel.type === 1) return;

        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName);
        if (!command) return;

        if (command.onlyowner && message.author.id !== owner) {
            return message.reply("Bu komutu kullanmaya yetkiniz yok. Sadece bot sahibi kullanabilir.");
        }

        try {
            if (typeof command.execute === 'function') {
                await command.execute(client, message, args);
            } else if (typeof command.run === 'function') {
                await command.run(client, message, args);
            } else {
                console.error(`Komut ${commandName} ne execute ne run içeriyor!`);
            }
        } catch (error) {
            console.error(`Komut hatası: ${commandName}`, error);
            message.reply('Komut çalışırken hata oldu!');
        }
    },
};