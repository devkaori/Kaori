const Discord = require('discord.js');
const Schema = require('../../database/models/afk');

module.exports = async (client, interaction, args) => {
    const reason = interaction.options.getString('reason') || `Non spécifié`;

    Schema.findOne({ Guild: interaction.guild.id, User: interaction.user.id }, async (err, data) => {
        if (data) {
            return client.errNormal({ 
                error: `Vous êtes déjà AFK !`,
                type: 'editreply' 
            }, interaction);
        } else {
            new Schema({
                Guild: interaction.guild.id,
                User: interaction.user.id,
                Message: reason
            }).save();

            if (!interaction.member.displayName.includes(`AFKㆍ `)) {
                interaction.member.setNickname(`AFKㆍ ` + interaction.member.displayName).catch(e => { });
            }

            client.succNormal({ 
                text: `Votre statut AFK a été configuré avec succès`,
                type: 'ephemeraledit'
            }, interaction);

            client.embed({ 
                desc: `${interaction.user} est maintenant AFK ! **Raison:** ${reason}` 
            }, interaction.channel);
        }
    });
};