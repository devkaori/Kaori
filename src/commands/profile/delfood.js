const Schema = require('../../database/models/profile');

module.exports = async (client, interaction, args) => {

    const food = interaction.options.getString('food');
    const user = { User: interaction.user.id }

    Schema.findOne({ User: interaction.user.id }, async (err, data) => {
        if (data) {

            if (data && data.Food) {
                if (!data.Food.includes(food)) {
                    return client.errNormal({ error: `Ce plat n'existe pas dans la base de données !`, type: 'editreply' }, interaction);
                }

                const filtered = data.Food.filter((target) => target !== food);

                await Schema.findOneAndUpdate(user, {
                    Food: filtered
                });
            }
            client.succNormal({
                text: "Votre plat a été supprimé",
                fields: [{
                    name: "Plat",
                    value: `\`\`\`${food}\`\`\``,
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
