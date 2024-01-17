const Discord = require('discord.js');
const Schema = require("../../database/models/birthday");

module.exports = async (client, interaction, args) => {
    const rawBirthdayboard = await Schema.find({ Guild: interaction.guild.id })

    if (rawBirthdayboard.length < 1) return client.errNormal({ 
        error: "Aucune date d'anniversaire trouvée !",
        type: 'editreply' 
    }, interaction);

    const lb = rawBirthdayboard.map(e => {
        const user = client.users.cache.get(e.User);
        if (user) {
            return `- **${user.username}** - ${e.Birthday} `;
        } else {
            return `- *User not found* - ${e.Birthday} `;
        }
    });

    await client.createLeaderboard(`Anniversaires - ${interaction.guild.name}`, lb, interaction);
}
