const Discord = require('discord.js');
const fetch = require("node-fetch");

module.exports = async (client, interaction, args) => {

    const word = interaction.options.getString('word');

    fetch(`http://www.anagramica.com/all/${encodeURIComponent(word)}`).then((res) => res.json()).catch({})
        .then(async (json) => {
            let content = ``;
            if (!json.all[0]) return client.errNormal({ error: "Aucun mot trouvé !", type: 'editreply' }, interaction)

            json.all.forEach(i => {
                content += `${i}\n`;
            });

            client.embed({
                title: `Anagramme`,
                desc: `J'ai formé un mot avec les lettres données`,
                fields: [
                    {
                        name: `Mot(s)`,
                        value: content
                    }
                ],
                type: 'editreply'
            }, interaction)
        }).catch({})

}