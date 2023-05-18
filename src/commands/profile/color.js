const Schema = require('../../database/models/profile');
const isHexcolor = require('is-hexcolor');

module.exports = async (client, interaction, args) => {

    const color = interaction.options.getString('color');

    Schema.findOne({ User: interaction.user.id }, async (err, data) => {
        if (data) {
            if (!isHexcolor(color)) return client.errNormal({ error: "Vous n'avez pas spécifié une couleur hexadécimale ! Exemple : #ff0000", type: 'editreply' }, interaction);

            data.Color = color;
            data.save();

            client.succNormal({
                text: "Votre couleur préférée est définie",
                fields: [{
                    name: "Couleur",
                    value: `\`\`\`${color}\`\`\``,
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
