const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');  // Assurez-vous d'installer le package

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hug')
        .setDescription('Faire un câlin à quelqu\'un')
        .addUserOption(option => 
            option.setName('target')
                  .setDescription('La personne à qui vous voulez faire un câlin')
                  .setRequired(true)),

    run: async (client, interaction, args) => {
        await interaction.deferReply({ fetchReply: true });

        const target = interaction.options.getUser('target');

        // Récupérer une image de câlin depuis nekos.fun
        const response = await fetch('https://api.nekos.fun:8080/api/hug');
        const data = await response.json();
        const hugImageUrl = data.image; // ou le chemin approprié dans la réponse

        await interaction.editReply({
            content: `<@${interaction.user.id}> fait un câlin à <@${target.id}> ! 🤗`,
            embeds: [{
                title: 'Un câlin chaleureux !',
                image: {
                    url: hugImageUrl
                }
            }],
            components: [
                {
                    type: 'ACTION_ROW',
                    components: [
                        {
                            type: 'BUTTON',
                            customId: 'hug_back',
                            label: 'Rendre le câlin',
                            style: 'PRIMARY'
                        }
                    ]
                }
            ]
        });

        const filter = i => {
            i.deferUpdate();
            return i.customId === 'hug_back' && i.user.id === target.id;
        };

        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async i => {
            if (i.customId === 'hug_back') {
                await interaction.followUp({
                    content: `<@${target.id}> a rendu le câlin à <@${interaction.user.id}> ! 🤗`,
                });
            }
        });
    },
};
