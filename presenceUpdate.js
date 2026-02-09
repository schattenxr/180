const { Events } = require("discord.js");
const { durum } = require("../../berlin.json");

module.exports = {
    name: Events.PresenceUpdate,
    execute: async (oldPresence, newPresence, client) => { 
        
        const member = newPresence?.member;
        if (!member) return;

        const rolID = "1451989486077743242";
        const customStatus = newPresence.activities.find(a => a.type === 4);

        if (customStatus && customStatus.state === durum) {
            if (!member.roles.cache.has(rolID)) {
                await member.roles.add(rolID).catch(() => {});
                console.log(`${member.user.tag} durumuna "${durum}" yazdı, rol verildi.`);
            }
        } else {
            if (member.roles.cache.has(rolID)) {
                await member.roles.remove(rolID).catch(() => {});
                console.log(`${member.user.tag} durumunu değiştirdi, rol geri alındı.`);
            }
        }
    }
};