const Schema = require('../../database/models/profile');

module.exports = async (client, interaction, args) => {

    const food = interaction.options.getString('food');

    Schema.findOne({ User: interaction.user.id }, async (err, data) => {
        if (data) {

            if (data && data.Food) {
                if (data.Food.includes(food)) {
                    return client.errNormal({ error: `Ce plat existe déjà dans votre base de données !`, type: 'editreply' }, interaction);
                }
                data.Food.push(food);
                data.save();
            }
            else {
                data.Food = food;
                data.save();
            }
            client.succNormal({
                text: "Plat ajouté",
                fields: [{
                    name: "Plat",
                    value: `\`\`\`${food}\`\`\``,
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
