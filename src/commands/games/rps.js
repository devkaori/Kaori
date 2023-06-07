const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const option = interaction.options.getString("option");

    let options = ["pierre", "feuille", "ciseaux"];
    const result = options[Math.floor(Math.random() * options.length)];

    switch (option) {
        case "pierre":
            if (result == "feuille") return client.embed({
                title: `Pierre Feuille Ciseaux`,
                desc: `J'ai choisi ${result}, je gagne !`,
                type: 'editreply'
            }, interaction);

            if (result == "ciseaux") return client.embed({
                title: `Pierre Feuille Ciseaux`,
                desc: `J'ai choisi ${result}, tu gagnes !`,
                type: 'editreply'
            }, interaction);

            if (result == "pierre") return client.embed({
                title: `Pierre Feuille Ciseaux`,
                desc: `J'ai choisi ${result}, c'est une égalité !`,
                type: 'editreply'
            }, interaction);
            break;

        case "feuille":
            if (result == "feuille") return client.embed({
                title: `Pierre Feuille Ciseaux`,
                desc: `J'ai choisi ${result}, c'est une égalité !`,
                type: 'editreply'
            }, interaction);

            if (result == "ciseaux") return client.embed({
                title: `Pierre Feuille Ciseaux`,
                desc: `J'ai choisi ${result}, je gagne !`,
                type: 'editreply'
            }, interaction);

            if (result == "pierre") return client.embed({
                title: `Pierre Feuille Ciseaux`,
                desc: `J'ai choisi ${result}, tu gagnes !`,
                type: 'editreply'
            }, interaction);
            break;

        case "ciseaux":
            if (result == "feuille") return client.embed({
                title: `Pierre Feuille Ciseaux`,
                desc: `J'ai choisi ${result}, tu gagnes !`,
                type: 'editreply'
            }, interaction);

            if (result == "ciseaux") return client.embed({
                title: `Pierre Feuille Ciseaux`,
                desc: `J'ai choisi ${result}, c'est une égalité !`,
                type: 'editreply'
            }, interaction);

            if (result == "pierre") return client.embed({
                title: `Pierre Feuille Ciseaux`,
                desc: `J'ai choisi ${result}, je gagne !`,
                type: 'editreply'
            }, interaction);
            break;
    }
}
