const model = require('../../database/models/badge');
const Schema = require('../../database/models/profile');
const CreditsSchema = require("../../database/models/votecredits");

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
    };

    const flags = {
        ActiveDeveloper: "Développeur actif",
        BugHunterLevel1: "Chasseur de bugs Discord",
        BugHunterLevel2: "Chasseur de bugs Discord",
        CertifiedModerator: "Modérateur certifié",
        HypeSquadOnlineHouse1: "Membre de la Maison Bravoure",
        HypeSquadOnlineHouse2: "Membre de la Maison Brilliance",
        HypeSquadOnlineHouse3: "Membre de la Maison Équilibre",
        HypeSquadEvents: "Événements HypeSquad",
        PremiumEarlySupporter: "Supporter précoce",
        Partner: "Partenaire",
        Quarantined: "Mis en quarantaine", // Pas sûr si cela est encore d'actualité
        Spammer: "Spammeur", // Pas sûr si cela fonctionne
        Staff: "Membre du personnel Discord",
        TeamPseudoUser: "Équipe Discord",
        VerifiedBot: "Bot vérifié",
        VerifiedDeveloper: "(précoce)Développeur de bot vérifié",
    };

    const user = interaction.options.getUser('user') || interaction.user;

    Schema.findOne({ User: user.id }, async (err, data) => {
        if (data) {
            let Badges = await model.findOne({ User: user.id });

            let credits = 0;
            const creditData = await CreditsSchema.findOne({ User: user.id });

            if (Badges && Badges.FLAGS.includes("DEVELOPER")) {
                credits = "∞";
            }
            else if (creditData) {
                credits = creditData.Credits;
            }

            if (!Badges) Badges = { User: user.id };

            const userFlags = user.flags ? user.flags.toArray() : [];

            client.embed({
                title: `Profil de ${client.user.username}`,
                desc: '_____',
                thumbnail: user.avatarURL({ dynamic: true }),
                fields: [{
                    name: "Utilisateur",
                    value: user.username,
                    inline: true
                },
                {
                    name: "Discriminateur",
                    value: user.discriminator,
                    inline: true
                },
                {
                    name: "ID",
                    value: user.id,
                    inline: true
                },
                {
                    name: "Genre",
                    value: `${data.Gender || 'Non défini'}`,
                    inline: true
                },
                {
                    name: "Âge",
                    value: `${data.Age || 'Non défini'}`,
                    inline: true
                },
                {
                    name: "Date de naissance",
                    value: `${data.Birthday || 'Non défini'}`,
                    inline: true
                },
                {
                    name: "Couleur préférée",
                    value: `${data.Color || 'Non défini'}`,
                    inline: true
                },
                {
                    name: "Animaux de compagnie préférés",
                    value: `${data.Pets.join(', ') || 'Non défini'}`,
                    inline: true
                },
                {
                    name: "Nourriture préférée",
                    value: `${data.Food.join(', ') || 'Non défini'}`,
                    inline: true
                },
                {
                    name: "Chansons préférées",
                    value: `${data.Songs.join(', ') || 'Non défini'}`,
                    inline: true
                },
                {
                    name: "Artistes préférés",
                    value: `${data.Artists.join(', ') || 'Non défini'}`,
                    inline: true
                },
                {
                    name: "Films préférés",
                    value: `${data.Movies.join(', ') || 'Non défini'}`,
                    inline: true
                },
                {
                    name: "Acteurs préférés",
                    value: `${data.Actors.join(', ') || 'Non défini'}`,
                    inline: true
                },
                {
                    name: "Origine",
                    value: `${data.Orgin || 'Non défini'}`,
                    inline: true
                },
                {
                    name: "Loisirs",
                    value: `${data.Hobbys.join(', ') || 'Non défini'}`,
                    inline: true
                },
                {
                    name: "Statut",
                    value: `${data.Status || 'Non défini'}`,
                    inline: true
                },
                {
                    name: "Badges du bot",
                    value: `${Badges.FLAGS ? Badges.FLAGS.map(flag => badgeFlags[flag]).join(' ') : 'Aucun'}`,
                    inline: true
                },
                {
                    name: "Badges Discord",
                    value: `${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'Aucun' || 'Aucun'}`,
                    inline: true
                },
                {
                    name: "Dcrédits",
                    value: `${credits || 'Aucun'}`,
                    inline: true
                },
                {
                    name: "À propos de moi",
                    value: `${data.Aboutme || 'Non défini'}`,
                    inline: false
                }], type: 'editreply'
            }, interaction);
        }
        else {
            return client.errNormal({ error: "Aucun profil trouvé ! Ouvrez un profil avec la commande /profile create", type: 'editreply' }, interaction);
        }
    });
};