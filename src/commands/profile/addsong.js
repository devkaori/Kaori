const Schema = require('../../database/models/profile');

module.exports = async (client, interaction, args) => {

    const song = interaction.options.getString('song');

    Schema.findOne({ User: interaction.user.id }, async (err, data) => {
        if (data) {

            if (data && data.Songs) {
                if (data.Songs.includes(song)) {
                    return client.errNormal({ error: `Cette chanson existe déjà dans votre base de données !`, type: 'editreply' }, interaction);
                }
                data.Songs.push(song);
                data.save();
            }
            else {
                data.Songs = song;
                data.save();
            }
            client.succNormal({
                text: "Chanson ajoutée",
                fields: [{
                    name: "Chanson",
                    value: `\`\`\`${song}\`\`\``,
                    inline: true,
                }],
                type: 'editreply'
            }, interaction);
        }
        else {
            return client.errNormal({ error: "Aucun profil trouvé ! Ouvrez un profil avec createprofile", type:'editreply' }, interaction);
        }
    })

}
