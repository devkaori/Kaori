const Schema = require('../../database/models/profile');

module.exports = async (client, interaction, args) => {

    const artist = interaction.options.getString('artist');

    Schema.findOne({ User: interaction.user.id }, async (err, data) => {
        if (data) {

            if (data && data.Artists) {
                if (data.Artists.includes(artist)) {
                    return client.errNormal({ error: `Cet artiste existe déjà dans votre base de données !`, type: 'editreply' }, interaction);
                }
                data.Artists.push(artist);
                data.save();
            }
            else {
                data.Artists = artist;
                data.save();
            }
            client.succNormal({
                text: "Artiste ajouté",
                fields: [{
                    name: "Artiste",
                    value: `\`\`\`${artist}\`\`\``,
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
