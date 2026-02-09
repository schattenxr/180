const discord = require("discord.js")

module.exports = {
    name: "durum",
    description: "24 saatlik geri sayım başlatır ve bitince haber verir.",
    usage: "!durum",
    onlyowner: false,

    run: async (client, message, args) => {
        const now = Math.floor(Date.now() / 1000);

        const duration = 86400;
        const finishTime = now + duration;

        await message.reply(
            `# AÇILIYORUZ !\n\n` +
            `## ⏳ **Açılış için Geri Sayım Başladı!**\n` +
            `## <a:arrow:1457356128026362078> Kalan Süre: <t:${finishTime}:R> ||@everyone||`
        );

        setTimeout(async () => {
            message.channel.send(
                `## 🎉 **Midgard Network açıldı!**\n` +
                `## İyi oyunlar dileriz ❤️ ||@everyone||`
            );
        }, duration * 1000); 
    }
};
