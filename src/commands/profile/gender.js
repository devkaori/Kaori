const Schema = require('../../database/models/profile');
const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {

    Schema.findOne({ User: interaction.user.id }, async (err, data) => {
        if (data) {
            const menu = new Discord.StringSelectMenuBuilder()
                .setCustomId('gender-setup')
                .setPlaceholder('Rien sélectionné')
                .addOptions(
                    {
                        emoji: "👨",
                        label: `Homme`,
                        value: `Homme`,
                    },
                    {
                        emoji: "👩",
                        label: `Femme`,
                        value: `Femme`,
                    },
                    {
                        emoji: "👪",
                        label: `Autre`,
                        value: `Autre`,
                    }
                );

            const row = new Discord.ActionRowBuilder()
                .addComponents(menu)

            client.embed({
                desc: `Sélectionnez un genre`,
                type: 'editreply',
                components: [row],
            }, interaction).then(msg => {
                const filter = i => i.user.id === interaction.user.id;

                interaction.channel.awaitMessageComponent({ filter, max: 1, componentType: Discord.ComponentType.StringSelect }).then(i => {
                    if (i.customId == 'gender-setup') {
                        data.Gender = i.values[0];
                        data.save();

                        client.succNormal({
                            text: "Votre genre a été défini sur " + i.values[0],
                            type: 'editreply',
                            components: [],
                        }, interaction);
                    }
                })
            })
        }
        else {
            return client.errNormal({ error: "Aucun profil trouvé ! Ouvrez un profil avec la commande 'profilecreate'", type: 'editreply' }, interaction);
        }
    })
}
