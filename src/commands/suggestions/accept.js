const Discord = require('discord.js');
const Schema = require("../../database/models/suggestionChannels");

module.exports = async (client, interaction, args) => {
    const perms = await client.checkUserPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageMessages],
        perms: [Discord.PermissionsBitField.Flags.ManageMessages]
    }, interaction)

    if (perms == false) return;

    const messageID = interaction.options.getString('id');

    const data = await Schema.findOne({ Guild: interaction.guild.id });
    if (data) {
        const suggestionChannel = interaction.guild.channels.cache.get(data.Channel);
        const suggestEmbed = await suggestionChannel.messages.fetch(messageID);
        const embedData = suggestEmbed.embeds[0];

        client.embed({
            title: `Suggestion acceptée`,
            desc: `\`\`\`${embedData.description}\`\`\``,
            color: client.config.colors.success,
            author: {
                name: embedData.author.name,
                iconURL: embedData.author.iconURL
            },
            type: 'edit'
        }, suggestEmbed);

        try {
            const user = await client.users.cache.find((u) => u.tag === embedData.author.name);

            if (user) {
                client.embed({
                    title: `Suggestion acceptée`,
                    desc: `Votre suggestion dans ${interaction.guild.name} a été acceptée par un modérateur !`,
                    fields: [
                        {
                            name: `Suggestion`,
                            value: `${embedData.description}`
                        }
                    ],
                }, user).catch({});
            }
        }
        catch {}

        client.succNormal({
            text: "Suggestion acceptée avec succès",
            fields: [
                {
                    name: `Suggestion`,
                    value: `${embedData.description}`
                }
            ],
            type: 'editreply'
        }, interaction);
    }
    else {
        client.errNormal({
            error: `Aucun canal de suggestion n'est défini ! Veuillez effectuer la configuration`,
            type: 'editreply'
        }, interaction);
    }
}