const Discord = require('discord.js');

const Schema = require("../../database/models/birthday");

module.exports = async (client, interaction, args) => {
    const months = {
        1: "janvier",
        2: "février",
        3: "mars",
        4: "avril",
        5: "mai",
        6: "juin",
        7: "juillet",
        8: "août",
        9: "septembre",
        10: "octobre",
        11: "novembre",
        12: "décembre"
    };

    const day = interaction.options.getNumber('jour');
    const month = interaction.options.getNumber('mois');

    if (!day || day > 31) return client.errNormal({ 
        error: "Format du jour incorrect !",
        type: 'editreply'
    }, interaction);

    if (!month || month > 12) return client.errNormal({
        error: "Format du mois incorrect !",
        type: 'editreply'
    }, interaction);

    const convertedDay = suffixes(day);
    const convertedMonth = months[month];
    const birthdayString = `${convertedDay} ${convertedMonth}`;

    Schema.findOne({ Guild: interaction.guild.id, User: interaction.user.id }, async (err, data) => {
        if (data) {
            data.Birthday = birthdayString;
            data.save();
        }
        else {
            new Schema({
                Guild: interaction.guild.id,
                User: interaction.user.id,
                Birthday: birthdayString
            }).save();
        }
    })

    client.succNormal({ 
        text: `Date d'anniversaire définie avec succès`,
        fields: [
            {
                name: `Anniversaire`,
                value: `${birthdayString}`
            }
        ],
        type: 'editreply'
    }, interaction);
}

function suffixes(number) {
    const converted = number.toString();

    const lastChar = converted.charAt(converted.length - 1);

    return lastChar == "1" ?
        `${converted}` : lastChar == "2" ?
            `${converted}` : lastChar == '3'
                ? `${converted}` : `${converted}`
}
