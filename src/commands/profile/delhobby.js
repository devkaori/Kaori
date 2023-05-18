const Schema = require('../../database/models/profile');

module.exports = async (client, interaction, args) => {

    const hobby = interaction.options.getString('hobby');
    const user = { User: interaction.user.id }

    Schema.findOne({ User: interaction.user.id }, async (err, data) => {
        if (data) {

            if (data && data.Hobbys) {
                if (!data.Hobbys.includes(hobby)) {
                    return client.errNormal({ error: `Ce passe-temps n'existe pas dans la base de données !`, type: 'editreply' }, interaction);
                }

                const filtered = data.Hobbys.filter((target) => target !== hobby);

                await Schema.findOneAndUpdate(user, {
                    Hobbys: filtered
                });
            }
            client.succNormal({
                text: "Votre passe-temps a été supprimé",
                fields: [{
                    name: "Passe-temps",
                    value: `\`\`\`${hobby}\`\`\``,
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
