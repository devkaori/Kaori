const Schema = require('../../database/models/profile');

module.exports = async (client, interaction, args) => {

    const pet = interaction.options.getString('pet');

    Schema.findOne({ User: interaction.user.id }, async (err, data) => {
        if (data) {

            if (data && data.Pets) {
                if (data.Pets.includes(pet)) {
                    return client.errNormal({ error: `Cet animal de compagnie existe déjà dans votre base de données !`, type: 'editreply' }, interaction);
                }
                data.Pets.push(pet);
                data.save();
            }
            else {
                data.Pets = pet;
                data.save();
            }
            client.succNormal({
                text: "Animal de compagnie ajouté",
                fields: [{
                    name: "Animal de compagnie",
                    value: `\`\`\`${pet}\`\`\``,
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
