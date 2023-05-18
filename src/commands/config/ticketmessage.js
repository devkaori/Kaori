const Discord = require('discord.js');

const Schema = require("../../database/models/ticketMessage");

module.exports = async (client, interaction, args) => {
    const perms = await client.checkUserPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageMessages],
        perms: [Discord.PermissionsBitField.Flags.ManageMessages]
    }, interaction)

    if (perms == false) return;

    const type = interaction.options.getString('type');
    const message = interaction.options.getString('message');

    if (type == "open") {
        if (message.toUpperCase() == "DEFAULT") {
            const data = await Schema.findOne({ Guild: interaction.guild.id })

            if (data) {
                data.openTicket = "Merci de créer un ticket ! \nUn membre du support sera avec vous bientôt \n\n🔒 - Fermer le ticket \n✋ - Réclamer le ticket \n📝 - Enregistrer la transcription \n🔔 - Envoyer une notification";
                data.save();

                client.succNormal({
                    text: `Le message de ticket a été configuré avec succès`,
                    fields: [
                        {
                            name: `Type de message`,
                            value: `${type}`,
                            inline: true
                        },
                        {
                            name: `Message`,
                            value: `${data.openTicket}`,
                            inline: true
                        },
                    ],
                    type: 'editreply'
                }, interaction)
            }
            else {
                client.errNormal({
                    error: `Aucune donnée de message de ticket trouvée !`,
                    type: 'editreply'
                }, interaction)
            }

            return;
        }

        Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) {
                data.openTicket = message;
                data.save();
            }
            else {
                new Schema({
                    Guild: interaction.guild.id,
                    openTicket: message
                }).save();
            }
        })

        client.succNormal({
            text: `Le message de ticket a été configuré avec succès`,
            fields: [
                {
                    name: `Type de message`,
                    value: `${type}`,
                    inline: true
                },
                {
                    name: `Message`,
                    value: `${message}`,
                    inline: true
                },
            ],
            type: 'editreply'
        }, interaction)
    }
    else if (type == "close") {
        if (message.toUpperCase() == "DEFAULT") {
            const data = await Schema.findOne({ Guild: interaction.guild.id })

            if (data) {
                data.dmMessage = "Voici la transcription de votre ticket, gardez-la si vous voulez vous y référer ultérieurement !";
                data.save();

                client.succNormal({
                    text: `Le message de ticket a été configuré avec succès`,
                    fields: [
                        {
                            name: `Type de message`,
                            value: `${type}`,
                            inline: true
                        },
                        {
                            name: `Message`,
                            value: `${data.dmMessage}`,
                            inline: true
                        },
                    ],
                    type: 'editreply'
                }, interaction)
            }
            else {
                client.errNormal({
                    error: `Aucune donnée de message de ticket trouvée !`,
                    type: 'editreply'
                }, interaction)
            }

            return;
        }

        Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) {
                data.dmMessage = message;
                data.save();
            }
            else {
                new Schema({
                    Guild: interaction.guild.id,
                    dmMessage: message
                }).save();
            }
        })

        client.succNormal({
            text: `Le message de ticket a été configuré avec succès`,
            fields: [
                {
                    name: `Type de message`,
                    value: `${type}`,
                    inline: true
                },
                {
                    name: `Message`,
                    value: `${message}`,
                    inline: true
                },
            ],
            type: 'editreply'
        }, interaction)
    }
}
