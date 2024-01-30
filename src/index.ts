const Discord = require('discord.js');
const chalk = require('chalk');
const dotenv = require('dotenv');
const http = require('http');
const express = require('express');

dotenv.config();

const app = express();

app.get('/', (req, res) => {
  res.send('This bot is running CorwinDev\'s <a href="https://github.com/CorwinDev/Discord-Bot">Discord-Bot</a>');
});

const server = http.createServer(app);

server.listen(8080, () => {
  console.log('Server is running on port 8080');
});

const axios = require('axios');

const { version } = require('.././package.json');

axios.get('https://api.github.com/repos/CorwinDev/Discord-Bot/releases/latest').then(res => {
  if (res.data.tag_name !== version) {
    console.log(chalk.red.bgYellow(`Votre bot n'est pas à jour ! Veuillez mettre à jour vers la dernière version !`, version + ' -> ' + res.data.tag_name));
  }
}).catch(err => {
  console.log(chalk.red.bgYellow(`Échec de la vérification de la mise à jour du bot !`));
});

const webhook = require("./config/webhooks.json");
const config = require("./config/bot.ts");
const webHooksArray = ['startLogs', 'shardLogs', 'errorLogs', 'dmLogs', 'voiceLogs', 'serverLogs', 'serverLogs2', 'commandLogs', 'consoleLogs', 'warnLogs', 'voiceErrorLogs', 'creditLogs', 'evalLogs', 'interactionLogs'] as const;

if (process.env.WEBHOOK_ID && process.env.WEBHOOK_TOKEN) {
  for (const webhookName of webHooksArray) {
    webhook[webhookName].id = process.env.WEBHOOK_ID;
    webhook[webhookName].token = process.env.WEBHOOK_TOKEN;
  }
}

const startLogs = new Discord.WebhookClient({
  id: webhook.startLogs.id,
  token: webhook.startLogs.token,
});

const shardLogs = new Discord.WebhookClient({
  id: webhook.shardLogs.id,
  token: webhook.shardLogs.token,
});

const manager = new Discord.ShardingManager('./src/bot.ts', {
  totalShards: 'auto',
  token: process.env.DISCORD_TOKEN,
  respawn: true
});

if (process.env.TOPGG_TOKEN) {
  const { AutoPoster } = require('topgg-autoposter');
  AutoPoster(process.env.TOPGG_TOKEN, manager);
}

console.clear();
console.log(chalk.blue(chalk.bold(`Système`)), (chalk.white(`>>`)), (chalk.green(`Démarrage`)), (chalk.white(`...`)))
console.log(`\u001b[0m`)
console.log(chalk.red(`${new Date().getFullYear()}`))
console.log(`\u001b[0m`)
console.log(`\u001b[0m`)
console.log(chalk.blue(chalk.bold(`Système`)), (chalk.white(`>>`)), chalk.red(`Version ${require(`${process.cwd()}/package.json`).version}`), (chalk.green(`chargée`)))
console.log(`\u001b[0m`);

manager.on('shardCreate', (shard: Discord.Shard) => {
  let embed = new Discord.EmbedBuilder()
    .setTitle(`Lancement de la shard`)
    .setDescription(`Une shard vient d'être lancée`)
    .addFields([
      {
        name: "ID",
        value: `${shard.id + 1}/${manager.totalShards}`,
        inline: true
      },
      {
        name: `État`,
        value: `Démarrage...`,
        inline: true
      }
    ])
    .setColor(config.colors.normal);

  startLogs.send({
    username: 'Logs du bot',
    embeds: [embed],
  });

  console.log(chalk.blue(chalk.bold(`Système`)), (chalk.white(`>>`)), (chalk.green(`Démarrage`)), chalk.red(`Shard n°${shard.id + 1}`), (chalk.white(`...`)))
  console.log(`\u001b[0m`);

  shard.on("death", (process: any) => {
    const embed = new Discord.EmbedBuilder()
      .setTitle(`Fermeture inattendue de la shard ${shard.id + 1}/${manager.totalShards}`)
      .addFields([
        {
          name: "ID",
          value: `${shard.id + 1}/${manager.totalShards}`,
        },
      ])
      .setColor(config.colors.normal);

    shardLogs.send({
      username: 'Logs du bot',
      embeds: [embed]
    });

    if (process.exitCode === null) {
      const embed = new Discord.EmbedBuilder()
        .setTitle(`La shard ${shard.id + 1}/${manager.totalShards} s'est terminée avec un code d'erreur NULL !`)
        .addFields([
          {
            name: "PID",
            value: `\`${process.pid}\``,
          },
          {
            name: "Code de sortie",
            value: `\`${process.exitCode}\``,
          }
        ])
        .setColor(config.colors.normal);

      shardLogs.send({
        username: 'Logs du bot',
        embeds: [embed]
      });
    }
  });

  shard.on("shardDisconnect", (event: any) => {
    const embed = new Discord.EmbedBuilder()
      .setTitle(`La shard ${shard.id + 1}/${manager.totalShards} s'est déconnectée`)
      .setDescription("Dump de l'événement de fermeture de socket...")
      .setColor(config.colors.normal);

    shardLogs.send({
      username: 'Logs du bot',
      embeds: [embed],
    });
  });

  shard.on("shardReconnecting", () => {
    const embed = new Discord.EmbedBuilder()
      .setTitle(`Reconnexion de la shard ${shard.id + 1}/${manager.totalShards}`)
      .setColor(config.colors.normal);

    shardLogs.send({
      username: 'Logs du bot',
      embeds: [embed],
    });
  });
});

manager.spawn();

// Webhooks
const consoleLogs = new Discord.WebhookClient({
  id: webhook.consoleLogs.id,
  token: webhook.consoleLogs.token,
});

const warnLogs = new Discord.WebhookClient({
  id: webhook.warnLogs.id,
  token: webhook.warnLogs.token,
});

process.on('unhandledRejection', (error: Error) => {
  console.error('Rejet de promesse non gérée :', error);

  if (error.message && error.message.length > 950) {
    error.message = error.message.slice(0, 950) + '... voir la console pour plus de détails';
  }

  if (error.stack && error.stack.length > 950) {
    error.stack = error.stack.slice(0, 950) + '... voir la console pour plus de détails';
  }

  if (!error.stack) return;

  const embed = new Discord.EmbedBuilder()
    .setTitle(`Rejet de promesse non gérée`)
    .addFields([
      {
        name: "Erreur",
        value: error.message ? Discord.codeBlock(error.message) : "Aucune erreur",
      },
      {
        name: "Erreur de la pile",
        value: error.stack ? Discord.codeBlock(error.stack) : "Aucune erreur de pile",
      }
    ]);

  consoleLogs.send({
    username: 'Logs du bot',
    embeds: [embed],
  }).catch(() => {
    console.log("Erreur lors de l'envoi du rejet de promesse non gérée au webhook");
    console.log(error);
  });
});

process.on('warning', (warn: string) => {
  console.warn("Avertissement :", warn);

  const embed = new Discord.EmbedBuilder()
    .setTitle(`Nouvel avertissement détecté`)
    .addFields([
      {
        name: `Avertissement`,
        value: `\`\`\`${warn}\`\`\``,
      },
    ]);

  warnLogs.send({
    username: 'Logs du bot',
    embeds: [embed],
  }).catch(() => {
    console.log("Erreur lors de l'envoi de l'avertissement au webhook");
    console.log(warn);
  });
});
