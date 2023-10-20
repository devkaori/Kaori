const Schema = require("../../database/models/family");

module.exports = async (client, interaction, args) => {
    const target = interaction.options.getUser('user') || interaction.user;
    const data = await Schema.findOne({ Guild: interaction.guild.id, User: target.id });

    await interaction.editReply({ 
        embeds: [
            {
                title: `Famille de ${target.username}`,
                thumbnail: { url: target.avatarURL({ size: 1024 }) },
                image: "https://i.imgur.com/FkGNk5Y.jpg",
                fields: [
                    {
                        name: "Partenaire",
                        value: data && data.Partner ? `<@!${data.Partner}>` : "Cet utilisateur n'est pas marié(e)"
                    },
                    {
                        name: "Parent",
                        value: data && data.Parent.length > 0 ? `**${data.Parent.join(", ")}**` : "Cet utilisateur n'a pas de parents"
                    },
                    {
                        name: "Enfants",
                        value: data && data.Children.length > 0 ? `**${data.Children.join(", ")}**` : "Cet utilisateur n'a pas d'enfants"
                    }
                ]
            }
        ]
    });
}
