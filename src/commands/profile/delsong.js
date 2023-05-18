const Schema = require('../../database/models/profile');

module.exports = async (client, interaction, args) => {

    const song = interaction.options.getString('song');
    const user = { User: interaction.user.id }

    Schema.findOne({ User: interaction.user.id }, async (err, data) => {
        if (data) {

            if (data && data.Songs) {
                if (!data.Songs.includes(song)) {
                    return client.errNormal({ error: `Cette chanson n'existe pas dans la base de données !`, type: 'editreply' }, interaction);
                }

                const filtered = data.Songs.filter((target) => target !== song);

                await Schema.findOneAndUpdate(user, {
                    Songs: filtered
                });
            }
            client.succNormal({
                text: "Votre chanson a été supprimée",
                fields: [{
                    name: "Chanson",
                    value: `\`\`\`${song}\`\`\``,
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
