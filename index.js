const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const { readdirSync } = require("fs");
const moment = require("moment");

const { prefix, owner, token } = require("./berlin.json");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.GuildPresences
    ],
    partials: [
        Partials.Message, 
        Partials.Channel, 
        Partials.GuildMember, 
        Partials.Reaction, 
        Partials.User
    ]
});

client.commands = new Collection();
client.prefix = prefix; 
client.owner = owner;

const log = l => { 
    console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${l}`) 
};

const commandFiles = readdirSync('./src/commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./src/commands/${file}`);
    if (command.name) {
        client.commands.set(command.name, command);
    } else {
        log(`[UYARI] ${file} dosyasında 'name' özelliği eksik. Komut yüklenemedi.`);
    }
}
log(`Toplam ${client.commands.size} adet komut yüklendi.`);


client.on("ready", () => {
    log(`${client.user.username} Bot Aktif!`);
});

const eventFiles = readdirSync('./src/events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./src/events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}
log(`Toplam ${eventFiles.length} adet event yüklendi.`);


client.login(token);