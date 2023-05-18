const Schema = require('../../database/models/profile');

module.exports = async (client, interaction, args) => {

    const movie = interaction.options.getString('movie');

    Schema.findOne({ User: interaction.user.id }, async (err, data) => {
        if (data) {

            if (data && data.Movies) {
                if (data.Movies.includes(movie)) {
                    return client.errNormal({ error: `Ce film existe déjà dans votre base de données !`, type: 'editreply' }, interaction);
                }
                data.Movies.push(movie);
                data.save();
            }
            else {
                data.Movies = movie;
                data.save();
            }
            client.succNormal({
                text: "Film ajouté",
                fields: [{
                    name: "Films",
                    value: `\`\`\`${movie}\`\`\``,
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
