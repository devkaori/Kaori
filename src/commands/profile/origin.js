const Schema = require('../../database/models/profile');

module.exports = async (client, interaction, args) => {

    const country = interaction.options.getString('country');

    if (country.length > 50) return client.errNormal({ error: "Votre pays d'origine ne peut pas dépasser 50 caractères", type: 'editreply' }, interaction);

    Schema.findOne({ User: interaction.user.id }, async (err, data) => {
        if (data) {
            data.Origin = country;
            data.save();

            client.succNormal({
                text: "Votre pays d'origine est défini",
                fields: [{
                    name: "Pays",
                    value: `\`\`\`${country}\`\`\``,
                    inline: true,
                }],
                type: 'editreply'
            }, interaction);
        }
        else {
            return client.errNormal({ error: "Aucun profil trouvé ! Ouvrez un profil avec la commande 'createprofile'", type:'editreply' }, interaction);
        }
    })
}
