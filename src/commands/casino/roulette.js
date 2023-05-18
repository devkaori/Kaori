const Discord = require('discord.js');

const Schema = require("../../database/models/economy");

module.exports = async (client, interaction, args) => {
    let user = interaction.user;

    Schema.findOne({ Guild: interaction.guild.id, User: user.id }, async (err, data) => {
        if (data) {
            function isOdd(num) {
                if ((num % 2) == 0) return false;
                else if ((num % 2) == 1) return true;
            }

            let couleur = interaction.options.getString('color');
            let argent = parseInt(interaction.options.getNumber('amount'));

            let aléatoire = Math.floor(Math.random() * 37);

            if (!couleur || !argent) return client.errUsage({ usage: "roulette [couleur] [montant]", type: 'editreply' }, interaction);
            couleur = couleur.toLowerCase()
            if (argent > data.Money) return client.errNormal({ error: `Vous misez plus que vous n'avez !`, type: 'editreply' }, interaction);

            if (couleur == "b" || couleur.includes("noir")) couleur = 0;
            else if (couleur == "r" || couleur.includes("rouge")) couleur = 1;
            else if (couleur == "g" || couleur.includes("vert")) couleur = 2;
            else return client.errNormal({ error: `Couleur incorrecte spécifiée !`, type: 'editreply' }, interaction);

            if (aléatoire == 0 && couleur == 2) { // Vert
                argent *= 15

                data.Money += argent;
                data.save();

                client.embed({ title: `Multiplicateur: 15x`, desc: `Vous avez gagné **${client.emotes.economy.coins} $${argent}**`, type: 'editreply' }, interaction);
            }

            else if (isOdd(aléatoire) && couleur == 1) { // Rouge
                argent = parseInt(argent * 1.5)
                data.Money += argent;
                data.save();

                client.embed({ title: `Multiplicateur: 1.5x`, desc: `Vous avez gagné **${client.emotes.economy.coins} $${argent}**`, type: 'editreply' }, interaction);
            }

            else if (!isOdd(aléatoire) && couleur == 0) { // Noir
                argent = parseInt(argent * 2)
                data.Money += argent;
                data.save();

                client.embed({ title: `Multiplicateur: 2x`, desc: `Vous avez gagné **${client.emotes.economy.coins} $${argent}**`, type: 'editreply' }, interaction);
            }

            else { // Erreur
                data.Money -= argent;
                data.save();

                client.embed({ title: `Multiplicateur: 0x`, desc: `Vous avez perdu **${client.emotes.economy.coins} $${argent}**`, type: 'editreply' }, interaction);
            }

        }
        else {
            client.errNormal({ error: `Vous n'avez pas de ${client.emotes.economy.coins} !`, type: 'editreply' }, interaction);
        }
    })
}
