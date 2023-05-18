const Schema = require('../../database/models/profile');

module.exports = async (client, interaction, args) => {

    const status = interaction.options.getString('text');

    if (status.length > 30) return client.errNormal({ error: "Votre statut ne peut pas dépasser 30 caractères", type: 'editreply' }, interaction);

    Schema.findOne({ User: interaction.user.id }, async (err, data) => {
        if (data) {
            data.Status = status;
            data.save();

            client.succNormal({
                text: "Votre statut est défini",
                fields: [{
                    name: "Statut",
                    value: `\`\`\`${status}\`\`\``,
                    inline: true,
                }],
                type: 'editreply'
            }, interaction);
        }
        else {
            return client.errNormal({ error: "Aucun profil trouvé ! Ouvrez un profil avec la commande createprofile", type: 'editreply' }, interaction);
        }
    })
};