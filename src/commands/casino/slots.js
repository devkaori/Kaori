const slotItems = ["🍇", "🍉", "🍊", "🍎", "🍓", "🍒"];
const Discord = require('discord.js');
const ms = require("parse-ms");

const Schema = require("../../database/models/economy");

module.exports = async (client, interaction, args) => {
    let user = interaction.user;

    Schema.findOne({ Guild: interaction.guild.id, User: user.id }, async (err, data) => {
        if (data) {
            let argent = parseInt(interaction.options.getNumber('amount'));
            let gagné = false;

            if (!argent) return client.errUsage({ usage: "slots [montant]", type: 'editreply' }, interaction);
            if (argent > data.Money) return client.errNormal({ error: `Vous misez plus que vous n'avez !`, type: 'editreply' }, interaction);

            let nombres = []
            for (i = 0; i < 3; i++) { nombres[i] = Math.floor(Math.random() * slotItems.length); }

            if (nombres[0] == nombres[1] && nombres[1] == nombres[2]) {
                argent *= 9
                gagné = true;
            } else if (nombres[0] == nombres[1] || nombres[0] == nombres[2] || nombres[1] == nombres[2]) {
                argent *= 2
                gagné = true;
            }

            const row = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId('slots_1')
                        .setLabel(`${slotItems[nombres[0]]}`)
                        .setStyle(Discord.ButtonStyle.Primary),

                    new Discord.ButtonBuilder()
                        .setCustomId('slots_2')
                        .setLabel(`${slotItems[nombres[1]]}`)
                        .setStyle(Discord.ButtonStyle.Primary),

                    new Discord.ButtonBuilder()
                        .setCustomId('slots_3')
                        .setLabel(`${slotItems[nombres[2]]}`)
                        .setStyle(Discord.ButtonStyle.Primary),
                );
            if (gagné) {

                client.embed({
                    title: `Machines à sous`,
                    desc: `Vous avez gagné **${client.emotes.economy.coins} $${argent}**`,
                    color: client.config.colors.succes, 
                    components: [row], 
                    type: 'editreply'
                }, interaction)

                data.Money += argent;
                data.save();
            } else {

                client.embed({
                    title: `Machines à sous`,
                    desc: `Vous avez perdu **${client.emotes.economy.coins} $${argent}**`,
                    components: [row], 
                    color: client.config.colors.error, 
                    type: 'editreply'
                }, interaction)

                data.Money -= argent;
                data.save();
            }
        }
        else {
            client.errNormal({ error: `Vous n'avez pas de ${client.emotes.economy.coins} !`, type: 'editreply' }, interaction);
        }
    })
}
