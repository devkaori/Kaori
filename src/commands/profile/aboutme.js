const Schema = require('../../database/models/profile');

module.exports = async (client, interaction, args) => {

    const aboutme = interaction.options.getString('text');

    // Vérification que la longueur de "aboutme" ne dépasse pas 1024 caractères
    if (aboutme.length > 1024) return client.errNormal({ error: "Votre description ne peut pas dépasser 1024 caractères", type: 'editreply' }, interaction);

    // Recherche du profil de l'utilisateur dans la base de données
    Schema.findOne({ User: interaction.user.id }, async (err, data) => {
        if (data) {
            // Mise à jour de la description "Aboutme" dans la base de données
            data.Aboutme = aboutme;
            data.save();

            // Réponse de succès à l'interaction avec la nouvelle description affichée
            client.succNormal({
                text: "Votre description a été définie",
                fields: [{
                    name: "À propos de moi",
                    value: `\`\`\`${aboutme}\`\`\``,
                    inline: true,
                }],
                type: 'editreply'
            }, interaction);
        }
        else {
            // Réponse d'erreur si aucun profil n'a été trouvé pour l'utilisateur
            return client.errNormal({ error: "Aucun profil trouvé ! Ouvrez un profil avec la commande 'createprofile'", type:'editreply' }, interaction);
        }
    })
}
