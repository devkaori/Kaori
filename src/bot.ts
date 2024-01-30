import Discord, { Client, ShardEvents } from 'discord.js';
import fs from 'fs';

// Discord client
const client: Client = new Discord.Client({
    allowedMentions: {
        parse: [
            'users',
            'roles'
        ],
        repliedUser: true
    },
    autoReconnect: true,
    disabledEvents: [
        "TYPING_START"
    ],
    partials: [
        Discord.Constants.PartialTypes.CHANNEL,
        Discord.Constants.PartialTypes.GUILD_MEMBER,
        Discord.Constants.PartialTypes.MESSAGE,
        Discord.Constants.PartialTypes.REACTION,
        Discord.Constants.PartialTypes.USER,
        Discord.Constants.PartialTypes.GUILD_SCHEDULED_EVENT
    ],
    intents: [
        Discord.Intents.FLAGS.Guilds,
        Discord.Intents.FLAGS.GuildMembers,
        Discord.Intents.FLAGS.GuildBans,
        Discord.Intents.FLAGS.GuildEmojisAndStickers,
        Discord.Intents.FLAGS.GuildIntegrations,
        Discord.Intents.FLAGS.GuildWebhooks,
        Discord.Intents.FLAGS.GuildInvites,
        Discord.Intents.FLAGS.GuildVoiceStates,
        Discord.Intents.FLAGS.GuildMessages,
        Discord.Intents.FLAGS.GuildMessageReactions,
        Discord.Intents.FLAGS.GuildMessageTyping,
        Discord.Intents.FLAGS.DirectMessages,
        Discord.Intents.FLAGS.DirectMessageReactions,
        Discord.Intents.FLAGS.DirectMessageTyping,
        Discord.Intents.FLAGS.GuildScheduledEvents,
        Discord.Intents.FLAGS.MessageContent
    ],
    restTimeOffset: 0
});

// Connect to database
require("./database/connect")();

// Client settings
client.config = require('./config/bot');
client.changelogs = require('./config/changelogs');
client.emotes = require("./config/emojis.json");
client.webhooks = require("./config/webhooks.json");
const webHooksArray = ['startLogs', 'shardLogs', 'errorLogs', 'dmLogs', 'voiceLogs', 'serverLogs', 'serverLogs2', 'commandLogs', 'consoleLogs', 'warnLogs', 'voiceErrorLogs', 'creditLogs', 'evalLogs', 'interactionLogs'];
// Check if .env webhook_id and webhook_token are set
if (process.env.WEBHOOK_ID && process.env.WEBHOOK_TOKEN) {
    for (const webhookName of webHooksArray) {
        client.webhooks[webhookName].id = process.env.WEBHOOK_ID;
        client.webhooks[webhookName].token = process.env.WEBHOOK_TOKEN;
    }
}

client.commands = new Discord.Collection();
client.playerManager = new Map();
client.triviaManager = new Map();
client.queue = new Map();

// Webhooks
const consoleLogs = new Discord.WebhookClient({
    id: client.webhooks.consoleLogs.id,
    token: client.webhooks.consoleLogs.token,
});

const warnLogs = new Discord.WebhookClient({
    id: client.webhooks.warnLogs.id,
    token: client.webhooks.warnLogs.token,
});

// Load handlers
fs.readdirSync('./src/handlers').forEach((dir) => {
    fs.readdirSync(`./src/handlers/${dir}`).forEach((handler) => {
        require(`./handlers/${dir}/${handler}`)(client);
    });
});

client.login(process.env.DISCORD_TOKEN);

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
    if (error) if (error.length > 950) error = error.slice(0, 950) + '... view console for details';
    if (error.stack) if (error.stack.length > 950) error.stack = error.stack.slice(0, 950) + '... view console for details';
    if (!error.stack) return
    const embed = new Discord.MessageEmbed()
        .setTitle(`Unhandled promise rejection`)
        .addFields([
            {
                name: "Error",
                value: error ? Discord.Util.codeBlock(error) : "No error",
            },
            {
                name: "Stack error",
                value: error.stack ? Discord.Util.codeBlock(error.stack) : "No stack error",
            }
        ])
        .setColor(client.config.colors.normal)
    consoleLogs.send({
        username: 'Bot Logs',
        embeds: [embed],
    }).catch(() => {
        console.log('Error sending unhandledRejection to webhook')
        console.log(error)
    })
});

process.on('warning', warn => {
    console.warn("Warning:", warn);
    const embed = new Discord.MessageEmbed()
        .setTitle(`New warning found`)
        .addFields([
            {
                name: `Warn`,
                value: `\`\`\`${warn}\`\`\``,
            },
        ])
        .setColor(client.config.colors.normal)
    warnLogs.send({
        username: 'Bot Logs',
        embeds: [embed],
    }).catch(() => {
        console.log('Error sending warning to webhook')
        console.log(warn)
    })
});

client.on(ShardEvents.Error, error => {
    console.log(error)
    if (error) if (error.length > 950) error = error.slice(0, 950) + '... view console for details';
    if (error.stack) if (error.stack.length > 950) error.stack = error.stack.slice(0, 950) + '... view console for details';
    if (!error.stack) return
    const embed = new Discord.MessageEmbed()
        .setTitle(`A websocket connection encountered an error`)
        .addFields([
            {
                name: `Error`,
                value: `\`\`\`${error}\`\`\``,
            },
            {
                name: `Stack error`,
                value: `\`\`\`${error.stack}\`\`\``,
            }
        ])
        .setColor(client.config.colors.normal)
    consoleLogs.send({
        username: 'Bot Logs',
        embeds: [embed],
    });
});
