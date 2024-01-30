const Discord = require('discord.js');
const chalk = require('chalk');

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
        .setColor(client.config.colors.normal);

    startLogs.send({
        username: 'Logs du Bot',
        embeds: [embed],
    });

    setInterval(async function () {
        const totalGuilds = await client.shard.fetchClientValues('guilds.cache.size');
        const totalMembers = await client.shard.fetchClientValues('guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)');
        const totalEmotes = await client.shard.fetchClientValues('guilds.cache.reduce((acc, guild) => acc + guild.emojis.cache.size, 0)');

        const statusText = `Sur ${totalGuilds.reduce((acc, guildCount) => acc + guildCount, 0)} serveurs`;

        client.user.setPresence({ activities: [{ name: statusText, type: 'Participating' }], status: 'online' });
    }, 50000)
}
