const Discord = require('discord.js');

const model = require('../../database/models/badge');

const webhookClientLogs = new Discord.WebhookClient({
    id: "1209536160494518292",
    token: "LcOsxBj8vtDVazB5AkGqweigOywXV52GVF3jZssR8ImHwwQjgFVLKdIqmE3PoFNLItsa",
});

module.exports = async (client, interaction, args) => {
    const badgeFlags = {
        DEVELOPER: client.emotes.badges.developer,
        EVENT: client.emotes.badges.event,
        BOOSTER: client.emotes.badges.booster,
        BUGS: client.emotes.badges.bug,
        MANAGEMENT: client.emotes.badges.management,
        PREMIUM: client.emotes.badges.premium,
        SUPPORTER: client.emotes.badges.supporter,
        TEAM: client.emotes.badges.team,
        BOOSTER: client.emotes.badges.booster,
        PARTNER: client.emotes.badges.partner,
        VOTER: client.emotes.badges.voter,
        SUPPORT: client.emotes.badges.support,
        MODERATOR: client.emotes.badges.moderator,
        DESIGNER: client.emotes.badges.designer,
        MARKETING: client.emotes.badges.marketing,
        ACTIVE: client.emotes.badges.active,
        VIP: client.emotes.badges.vip
    }

    const boolean = interaction.options.getBoolean('new');
    const member = interaction.options.getUser('user');
    const badge = interaction.options.getString('badge');

    let Badges = await model.findOne({ User: member.id });

    if (!badgeFlags[badge.toUpperCase()]) return client.errNormal({
        error: `Je ne peux pas trouver ce badge`,
        type: `editreply`
    }, interaction);

    if (boolean == true) {
        if (Badges) {
            if (Badges.FLAGS.includes(badge.toUpperCase())) return client.errNormal({
                error: `Cet utilisateur a déjà ce badge !`,
                type: `editreply`
            }, interaction);

            let FLAG = badge.toUpperCase();
            let array = Badges.FLAGS;

            array.push(FLAG);

            model.findOne({ User: member.id }, async (err, data) => {
                if (err) console.log(err);
                data.FLAGS = array
                data.save();
            });

            client.succNormal({
                text: `Ajouté le badge ${badgeFlags[badge.toUpperCase()]} **${badge.toUpperCase()}** !`,
                type: `editreply`
            }, interaction);
        } else {
            const newSettings = new model({ User: member.id, FLAGS: [badge.toUpperCase()] });
            await newSettings.save().catch(() => { });

            client.succNormal({
                text: `Ajouté le badge ${badgeFlags[badge.toUpperCase()]} **${badge.toUpperCase()}** !`,
                type: `editreply`
            }, interaction)
        }

        let embedLogs = new Discord.EmbedBuilder()
            .setTitle(`📛・Badge ajouté`)
            .setDescription(`Ajouté un nouveau badge à ${member} (${member.id})`)
            .addFields(
                { name: "👤┆Ajouté par", value: `${interaction.user} (${interaction.user.tag})`, inline: true },
                { name: `📛┆Badge`, value: `${badgeFlags[badge.toUpperCase()]} **${badge.toUpperCase()}**`, inline: true },
            )
            .setColor(client.config.colors.normal)
            .setTimestamp();
        webhookClientLogs.send({
            username: 'Bot Badges',
            embeds: [embedLogs],
        });
    }
    else if (boolean == false) {
        if (!Badges.FLAGS.includes(badge.toUpperCase())) return client.errNormal({
            error: `L'utilisateur n'a pas ce badge`,
            type: `editreply`
        }, interaction);

        let FLAG = badge.toUpperCase();
        let array = Badges.FLAGS;

        for (var i = 0; i < array.length; i++) {

            if (array[i] === FLAG) {
                array.splice(i, 1);
                i--;
            }
        }

        if (!array[0]) {
            let deleted = await model.deleteMany({ User: member.id });
            client.succNormal({
                text: `Supprimé le badge ${badgeFlags[badge.toUpperCase()]} **${badge.toUpperCase()}**, l'utilisateur a été supprimé du système de badges, il n'a plus aucun badge !`,
                type: 'editreply'
            }, interaction);

        } else {
            model.findOne(
                { User: member.id },
                async (err, data) => {
                    if (err) console.log(err);
                    data.FLAGS = array
                    data.save();
                }
            );
            client.succNormal({
                text: `Supprimé le badge ${badgeFlags[badge.toUpperCase()]} **${badge.toUpperCase()}** !`,
                type: 'editreply'
            }, interaction);
        }

        let embedLogs = new Discord.EmbedBuilder()
            .setTitle(`📛・Badge supprimé`)
            .setDescription(`Badge supprimé de ${member} (${member.id})`)
            .addFields(
                { name: "👤┆Supprimé par", value: `${interaction.user} (${interaction.user.tag})`, inline: true },
                { name: `📛┆Badge`, value: `${badgeFlags[badge.toUpperCase()]} **${badge.toUpperCase()}**`, inline: true },
            )
            .setColor(client.config.colors.normal)
            .setTimestamp();
        webhookClientLogs.send({
            username: 'Bot Badges',
            embeds: [embedLogs],
        });
    }
}