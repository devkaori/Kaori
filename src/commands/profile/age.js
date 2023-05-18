const Schema = require('../../database/models/profile');

module.exports = async (client, interaction, args) => {

    const age = interaction.options.getNumber('number');

    Schema.findOne({ User: interaction.user.id }, async (err, data) => {
        if (data) {
            if (isNaN(age)) return client.errNormal({ error: "Aucun nombre valide fourni", type: 'editreply' }, interaction)

            data.Age = age;
            data.save();

            client.succNormal({
                text: "Votre âge est défini",
                fields: [{
                    name: "Âge",
                    value: `\`\`\`${age}\`\`\``,
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
