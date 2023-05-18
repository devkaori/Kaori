const Schema = require('../../database/models/profile');

module.exports = async (client, interaction, args) => {

    const pet = interaction.options.getString('pet');
    const user = { User: interaction.user.id }

    Schema.findOne({ User: interaction.user.id }, async (err, data) => {
        if (data) {

            if (data && data.Pets) {
                if (!data.Pets.includes(pet)) {
                    return client.errNormal({ error: `Cet animal de compagnie n'existe pas dans la base de données !`, type: 'editreply' }, interaction);
                }

                const filtered = data.Pets.filter((target) => target !== pet);

                await Schema.findOneAndUpdate(user, {
                    Pets: filtered
                });
            }
            client.succNormal({
                text: "Votre animal de compagnie a été supprimé",
                fields: [{
                    name: "Animal de compagnie",
                    value: `\`\`\`${pet}\`\`\``,
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
