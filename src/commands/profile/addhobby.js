const Schema = require('../../database/models/profile');

module.exports = async (client, interaction, args) => {

    const hobby = interaction.options.getString('hobby');

    Schema.findOne({ User: interaction.user.id }, async (err, data) => {
        if (data) {

            if (data && data.Hobbys) {
                if (data.Hobbys.includes(hobby)) {
                    return client.errNormal({ error: `Ce passe-temps existe déjà dans votre base de données !`, type: 'editreply' }, interaction);
                }
                data.Hobbys.push(hobby);
                data.save();
            }
            else {
                data.Hobbys = hobby;
                data.save();
            }
            client.succNormal({
                text: "Passe-temps ajouté",
                fields: [{
                    name: "Passe-temps",
                    value: `\`\`\`${hobby}\`\`\``,
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
