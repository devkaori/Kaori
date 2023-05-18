const Schema = require('../../database/models/profile');

module.exports = async (client, interaction, args) => {
    Schema.findOne({ User: interaction.user.id }, async (err, data) => {
        if (data) {
            return client.errNormal({ error: "Vous avez déjà un profil de Bot", type: "editreply" }, interaction);
        }
        else {
            new Schema({
                User: interaction.user.id
            }).save();

            client.succNormal({ text: "Profil créé ! Affichez votre profil en exécutant la commande \`profile\`", type: "editreply" }, interaction);
        }
    })
}
