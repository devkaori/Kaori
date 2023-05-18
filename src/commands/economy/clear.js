const Discord = require('discord.js');

const Schema = require("../../database/models/economy");
const Schema2 = require("../../database/models/economyTimeout");
const store = require("../../database/models/economyStore");

module.exports = async (client, interaction, args) => {

    client.checkPerms({
        flags: [Discord.PermissionsBitField.Flags.Administrator],
        perms: [Discord.PermissionsBitField.Flags.Administrator]
    }, interaction)


    const row = new Discord.ActionRowBuilder() 
        .addComponents(
            new Discord.ButtonBuilder()
                .setCustomId('eco_go')
                .setEmoji('✅')
                .setStyle(Discord.ButtonStyle.Success),

            new Discord.ButtonBuilder()
                .setCustomId('eco_stop')
                .setEmoji('❌')
                .setStyle(Discord.ButtonStyle.Danger),
        );

    client.embed({
        title: `Réinitialisation de l'économie`,
        desc: `Êtes-vous sûr de vouloir réinitialiser l'économie ?`,
        components: [row],
        type: 'editreply',
    }, interaction)

    const filter = i => i.user.id === interaction.user.id;

    interaction.channel.awaitMessageComponent({ filter, componentType: Discord.ComponentType.Button, time: 60000 }).then(async i => {
        if (i.customId == "eco_go") {
            var remove = await Schema.deleteMany({ Guild: interaction.guild.id });
            var remove2 = await Schema2.deleteMany({ Guild: interaction.guild.id });
            var remove3 = await store.deleteMany({ Guild: interaction.guild.id });

            client.succNormal({
                text: `L'économie a été réinitialisée avec succès dans ce serveur !`,
                components: [],
                type: 'editreply'
            }, interaction);
        }

        if (i.customId == "eco_stop") {
            client.errNormal({
                error: `La réinitialisation de l'économie a été annulée !`,
                components: [],
                type: 'editreply'
            }, interaction);
        }
    })
        .catch(() => {
            client.errNormal({
                error: "Le temps est écoulé ! La réinitialisation de l'économie a été annulée !",
                type: 'editreply'
            }, interaction);
        });
}
