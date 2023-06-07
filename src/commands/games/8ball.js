const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {

    const question = interaction.options.getString('question');

    var answers = [
        "Oui !",
        "Malheureusement non",
        "Tu as tout à fait raison !",
        "Non, désolé.",
        "Je suis d'accord",
        "Aucune idée !",
        "Je ne suis pas si intelligent...",
        "Mes sources disent non !",
        "C'est certain",
        "Tu peux compter dessus",
        "Probablement pas",
        "Tout indique que non",
        "Aucun doute",
        "Absolument",
        "Je ne sais pas"
    ];
    var result = Math.floor((Math.random() * answers.length));

    client.embed({
        title: `8ball`,
        desc: `Voici la réponse à ta question !`,
        fields: [
            {
                name: `Ta question`,
                value: `\`\`\`${question}\`\`\``,
                inline: false
            },
            {
                name: `Réponse du bot`,
                value: `\`\`\`${answers[result]}\`\`\``,
                inline: false
            }
        ],
        type: 'editreply'
    }, interaction);
}
