const Discord = require('discord.js');
const chalk = require('chalk');
const { random } = require('mathjs');

module.exports = async (client) => {
    const startLogs = new Discord.WebhookClient({
        id: client.webhooks.startLogs.id,
        token: client.webhooks.startLogs.token,
    });

    console.log(`\u001b[0m`);
    console.log(chalk.blue(chalk.bold(`Système`)), (chalk.white(`>>`)), chalk.red(`Fragment #${client.shard.ids[0] + 1}`), chalk.green(`est prêt !`))
    console.log(chalk.blue(chalk.bold(`Bot`)), (chalk.white(`>>`)), chalk.green(`Démarré sur`), chalk.red(`${client.guilds.cache.size}`), chalk.green(`serveurs !`))

    let embed = new Discord.EmbedBuilder()
        .setTitle(`Fragment terminé`)
        .setDescription(`Un fragment vient de se terminer`)
        .addFields(
            { name: "ID", value: `${client.shard.ids[0] + 1}/${client.options.shardCount}`, inline: true },
            { name: "État", value: `Prêt`, inline: true },
        )
        .setColor(client.config.colors.normal)
    startLogs.send({
        username: 'Logs du Bot',
        embeds: [embed],
    });

    setInterval(async function () {
        const promises = [
            client.shard.fetchClientValues('guilds.cache.size'),
        ];
        return Promise.all(promises)
            .then(results => {
                const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
                let statuttext;
                if (process.env.DISCORD_STATUS) {
                    statuttext = process.env.DISCORD_STATUS.split(', ');
                } else {
                    statuttext = [
                        `Réfléchir à ma raison d\'être`,
                        `Écouter les histoires des utilisateurs`,
                        `Chercher le sens de la vie digitale`,
                        `Protéger le serveur avec détermination`,
                        `Trouver le One Piece`,
                        `Explorer de nouveaux horizons`
                    ];
                }
                const randomText = statuttext[Math.floor(Math.random() * statuttext.length)];
                client.user.setPresence({ activities: [{ name: randomText, type: Discord.ActivityType.Competing }], status: 'online' });
            })
    }, 50000)
}
