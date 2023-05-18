const Schema = require('../../database/models/profile');

module.exports = async (client, interaction, args) => {

    const joined = interaction.options.getString('bday');
    const split = joined.trim().split("/");

    let [day, month] = split;

    if (!day || !month) return client.errUsage({ usage: "setbday [jour]/[mois]", type: 'editreply' }, interaction);

    if (isNaN(day) || isNaN(month)) {
        return client.errNormal({ error: "La date que vous avez donnée n'est pas un nombre valide", type: 'editreply' }, interaction);
    }

    day = parseInt(day);
    month = parseInt(month);

    if (!day || day > 31) return client.errNormal({ error: "Format de jour incorrect !", type: 'editreply' }, interaction);
    if (!month || month > 12) return client.errNormal({ error: "Format de mois incorrect !", type: 'editreply' }, interaction);

    const bday = `${day}/${month}`;

    Schema.findOne({ User: interaction.user.id }, async (err, data) => {
        if (data) {
            data.Birthday = bday;
            data.save();

            client.succNormal({
                text: "Votre date de naissance est définie",
                fields: [{
                    name: "Date de naissance",
                    value: `\`\`\`${bday}\`\`\``,
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
