const Schema = require('../../database/models/profile');

module.exports = async (client, interaction, args) => {

    const actor = interaction.options.getString('actor');

    Schema.findOne({ User: interaction.user.id }, async (err, data) => {
        if (data) {

            if (data && data.Actors) {
                if (data.Actors.includes(actor)) {
                    return client.errNormal({ error: `Cet acteur existe déjà dans votre base de données !`, type: 'editreply' }, interaction);
                }
                data.Actors.push(actor);
                data.save();
            }
            else {
                data.Actors = actor;
                data.save();
            }
            client.succNormal({
                text: "Acteur ajouté",
                fields: [{
                    name: "Acteur",
                    value: `\`\`\`${actor}\`\`\``,
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
