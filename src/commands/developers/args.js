const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const message = interaction.options.getString('message');

    client.succNormal({
        text: `Message envoyé avec succès !`,
        type: 'ephemeraledit'
    }, interaction);

    if (message == "information") {
        client.simpleEmbed({
            image: `https://i.imgur.com/aMqGr67.jpeg`,
            color: `#2C2D31`
        }, interaction.channel).then(() => {
            client.embed({
                title: `Information`,
                image: `https://i.imgur.com/U9Fih4D.png`,
                color: `#2C2D31`,
                thumbnail: client.user.avatarURL({ size: 1024 }),
                fields: [
                    {
                        name: `Bienvenue sur ${interaction.guild.name} !`,
                        value: `Bienvenue dans notre espace de détente ! Rencontrez de nouvelles personnes ici, jouez à des jeux et participez à des événements saisonniers ! Nous sommes un serveur où nous rassemblons tout le monde et nous essayons de le rendre confortable pour tous ! Soyez les bienvenus et amusez-vous bien !`,
                    },
                    {
                        name: `Que puis-je faire ici ?`,
                        value: `- Rencontrer de nouvelles personnes ! \n- Jouer à de nombreux jeux amusants ! \n- Découvrir les saisons ! \n- Participer à des événements ! \nEt... Enfin, mais non le moindre, choisissez vos propres rôles sur <#945909799609065503> !`,
                    },
                    {
                        name: `Comment puis-je obtenir de l'aide en cas de besoin ?`,
                        value: `Vous pouvez créer un ticket dans <#945908859552292934> ! Nous sommes heureux de vous aider avec vos questions ici et d'offrir un soutien dans votre serveur !`,
                    },
                    {
                        name: `Je veux aider Kaori Café à s'améliorer !`,
                        value: `- Rendez-vous dans les candidatures et voyez quels types d'emplois sont disponibles ! \n- Ou créez un ticket et demandez si vous pouvez aider avec certaines choses ! \n\n**Nous vous souhaitons un très bon et joyeux moment ici !**`,
                    }
                ]
            }, interaction.channel)
        })
    }

    if (message == "rules") {
        client.simpleEmbed({
            image: `https://i.imgur.com/JNWmh8P.jpeg`,
            color: `#2C2D31`,
        }, interaction.channel).then(async () => {
            await client.embed({
                title: `Règles`,
                thumbnail: client.user.avatarURL({ size: 1024 }),
                image: `https://i.imgur.com/U9Fih4D.png`,
                color: `#2C2D31`,
                desc: `Voici nos règles de serveur. Veuillez vous y conformer pour que tout le monde s'amuse. Les administrateurs et les modérateurs prendront des mesures de modération selon leur discrétion.`,
            }, interaction.channel)

            await client.embed({
                title: `1. Soyez respectueux`,
                image: `https://i.imgur.com/U9Fih4D.png`,
                color: `#2C2D31`,
                desc: `Vous devez respecter tous les utilisateurs, quel que soit votre avis sur eux. Traitez les autres comme vous aimeriez être traité.`,
            }, interaction.channel)

            await client.embed({
                title: `2. Pas de langage inapproprié`,
                image: `https://i.imgur.com/U9Fih4D.png`,
                color: `#2C2D31`,
                desc: `L'utilisation de gros mots doit être limitée. Cependant, tout langage péjoratif envers un utilisateur est interdit.`,
            }, interaction.channel)

            await client.embed({
                title: `3. Pas de spam`,
                image: `https://i.imgur.com/U9Fih4D.png`,
                color: `#2C2D31`,
                desc: `Ne pas envoyer beaucoup de petits messages les uns après les autres. Ne perturbez pas la discussion en envoyant du spam.`,
            }, interaction.channel)

            await client.embed({
                title: `4. Pas de contenu pornographique/adulte/NSFW`,
                image: `https://i.imgur.com/U9Fih4D.png`,
                color: `#2C2D31`,
                desc: `Ceci est un serveur communautaire et n'est pas destiné à partager ce type de contenu.`,
            }, interaction.channel)

            await client.embed({
                title: `5. Pas de publicité`,
                image: `https://i.imgur.com/U9Fih4D.png`,
                color: `#2C2D31`,
                desc: `Nous ne tolérons aucune forme de publicité, que ce soit pour d'autres communautés ou des streams. Vous pouvez publier votre contenu dans le canal média s'il est pertinent et apporte une réelle valeur (vidéo/art)`,
            }, interaction.channel)

            await client.embed({
                title: `6. Pas de noms et de photos de profil offensants`,
                image: `https://i.imgur.com/U9Fih4D.png`,
                color: `#2C2D31`,
                desc: `Vous serez invité à changer votre nom ou votre photo si le personnel les juge inappropriés.`,
            }, interaction.channel)

            await client.embed({
                title: `7. Raid de serveur`,
                image: `https://i.imgur.com/U9Fih4D.png`,
                color: `#2C2D31`,
                desc: `Le raid de serveur ou les mentions de raid de serveur ne sont pas autorisés.`,
            }, interaction.channel)

            await client.embed({
                title: `8. Menaces directes et indirectes`,
                image: `https://i.imgur.com/U9Fih4D.png`,
                color: `#2C2D31`,
                desc: `Les menaces envers d'autres utilisateurs de DDoS, de mort, de DoX, d'abus et autres menaces malveillantes sont absolument interdites et proscrites.`,
            }, interaction.channel)

            await client.embed({
                title: `9. Suivez les directives de la communauté Discord`,
                image: `https://i.imgur.com/U9Fih4D.png`,
                color: `#2C2D31`,
                desc: `Vous pouvez les trouver ici : https://discordapp.com/guidelines`,
            }, interaction.channel)

            await client.embed({
                title: `10. Ne rejoignez pas les canaux vocaux sans la permission des personnes déjà présentes`,
                image: `https://i.imgur.com/U9Fih4D.png`,
                color: `#2C2D31`,
                desc: `Si vous voyez qu'ils ont une place libre, il est acceptable de rejoindre et de demander s'ils ont une place libre, mais partez si votre présence n'est pas souhaitée par ceux qui étaient là en premier.`,
            }, interaction.channel)
        })
    }

    if (message == "applications") {
        client.simpleEmbed({
            image: `https://i.imgur.com/U9Fih4D.png`
        }, interaction.channel).then(() => {
            client.embed({
                title: `Candidatures`,
                thumbnail: client.user.avatarURL({ size: 1024 }),
                desc: `_____ \n\nQu'y a-t-il de plus amusant que de travailler au meilleur bot/serveur ? Nous avons régulièrement des places pour de nouveaux postes auxquels vous pouvez postuler. Mais... à quoi pouvez-vous vous attendre ?`,
                fields: [
                    {
                        name: `Une équipe très sympa`,
                        value: `Dans l'équipe du Bot, il y a toujours une ambiance agréable et tout le monde est traité de manière égale !`,
                    },
                    {
                        name: `Accès au programme bêta`,
                        value: `Obtenez l'accès aux fonctionnalités du Bot non publiées avec votre propre serveur ! Vous êtes un véritable testeur de Bot !`,
                    },
                    {
                        name: `Un grade et un badge sympas`,
                        value: `Vous obtiendrez un joli grade dans le serveur et un badge d'équipe dans notre commande userinfo. Tout le monde peut voir que vous contribuez à l'équipe.`,
                    },
                    {
                        name: `Apprenez et grandissez`,
                        value: `Nous comprenons que vous ne compreniez pas toujours tout tout de suite ! Chez Bot, nous vous donnons l'opportunité d'apprendre de nouvelles choses et de vous améliorer dans le poste. Vous pouvez également évoluer vers l'équipe de gestion à l'avenir !`,
                    },
                    {
                        name: `Que signifie tout cela ?`,
                        value: `**Modérateur** \nVous vous occupez du serveur pour que tout le monde s'amuse ! Discutez avec nous et gardez une vue d'ensemble. \n\n**Marketing** \nNous voulons également grandir et nous le faisons avec une super équipe de marketing ! Vous savez mieux que quiconque comment faire grandir un serveur de manière optimale. \n\n**Organisation** \nVous assurerez une atmosphère encore plus agréable dans le serveur ! Avec une équipe, vous travaillez sur de nouveaux événements amusants pour rendre le serveur encore plus divertissant !`,
                    },
                    {
                        name: `Postuler ?`,
                        value: `Créez un ticket pour recevoir votre candidature !`,
                    }
                ]
            }, interaction.channel)
        })
    }

    if (message == "boosterperks") {
        client.simpleEmbed({
            image: `https://i.imgur.com/pSxxPWW.jpeg`,
            color: `#2C2D31`
        }, interaction.channel).then(() => {
            client.embed({
                title: `Avantages du Booster`,
                thumbnail: client.user.avatarURL({ size: 1024 }),
                color: `#2C2D31`,
                image: `https://i.imgur.com/U9Fih4D.png`,
                desc: `Plus d'options dans le serveur ? Devenez un véritable Booster de Bot et obtenez de beaux avantages pour une expérience agréable. Mais qu'obtenez-vous réellement ?`,
                fields: [
                    {
                        name: `Utiliser des stickers externes`,
                        value: `Utilisez des stickers d'autres serveurs dans notre serveur`,
                    },
                    {
                        name: `Envoyer des messages TTS`,
                        value: `Envoyez des messages avec un son attaché`,
                    },
                    {
                        name: `Accès au salon caché`,
                        value: `Accédez à un salon privé et discutez avec d'autres boosters !`,
                    },
                    {
                        name: `Changer votre surnom`,
                        value: `Changez votre nom dans le serveur. Ainsi, vous vous démarquez dans le serveur`,
                    },
                    {
                        name: `Créer des threads publics/privés`,
                        value: `Créez un thread dans nos canaux de texte`,
                    },
                    {
                        name: `Giveaways privés`,
                        value: `Accédez à des giveaways exclusifs et amusants`,
                    },
                    {
                        name: `Envoyer des fichiers dans n'importe quel canal`,
                        value: `Envoyez des fichiers dans tous les canaux où vous pouvez parler`,
                    },
                    {
                        name: `Accéder à un canal promotionnel spécial`,
                        value: `Obtenez l'opportunité de promouvoir votre propre serveur dans un canal spécial`,
                    },
                    {
                        name: `Rôle personnalisé de votre choix`,
                        value: `Créez votre propre rôle que vous pouvez définir vous-même`,
                    },
                    {
                        name: `Obtenez le rôle et le badge du Booster`,
                        value: `Démarquez-vous avec un joli rôle de booster et un badge de booster !`,
                    },
                    {
                        name: `Accès aux nouvelles mises à jour bêta de Bot`,
                        value: `Nous donnerons à votre serveur accès à des mises à jour qui ne sont pas encore disponibles ! C'est pas génial ça ?`,
                    }
                ]
            }, interaction.channel)
        })
    }

    if (message == "links") {
        client.simpleEmbed({
            image: `https://media.discordapp.net/attachments/843487478881976381/881396544195149874/Bot_banner_boosters.jpg`
        }, interaction.channel).then(() => {
            client.embed({
                title: `🔗・Liens`,
                thumbnail: client.user.avatarURL({ size: 1024 }),
                desc: `_____ \n\nConsultez tous les liens du réseau Bot !`,
                fields: [
                    {
                        name: `▬▬│Serveurs│▬▬`,
                        value: ``,
                    }
                ]
            }, interaction.channel)
        })
    }

    if (message == "rewards") {
        client.embed({
            title: `😜・Récompenses de rôle`,
            thumbnail: client.user.avatarURL({ size: 1024 }),
            desc: `_____ \n\nVous voulez des extras dans le serveur ? Ou voulez-vous vous démarquer davantage dans le serveur ? Regardez ci-dessous pour les récompenses`,
            fields: [
                {
                    name: `🏆┆Niveaux`,
                    value: `- Niveau 5   | <@&833307296699908097>\n- Niveau 10  | <@&833307450437664838>\n- Niveau 15  | <@&833307452279226379>\n- Niveau 30 | <@&915290300757458964>\n- Niveau 40 | <@&915290324480430080>`,
                },
                {
                    name: `🥳┆Spécial`,
                    value: `- 1 vote de serveur | <@&833959913742794772>\n- 1 boost | <@&744208324022501447>\n- 1 don | <@&849554599371210793>`,
                },
                {
                    name: `💰┆Économie`,
                    value: `- $10,000 | <@&890720270086733854>\n- $15,000 | <@&833936202725720084>\n- $20,000 | <@&833936185167839232> \n- $25,000 | <@&928236333309255711> \n- $30,000 | <@&928235747100733450>`,
                }
            ]
        }, interaction.channel)
    }

    if (message == "ourbots") {
        client.simpleEmbed({
            image: `https://cdn.discordapp.com/attachments/843487478881976381/874742741224022016/Bot_banner_bot_info.jpg`
        }, interaction.channel).then(() => {
            client.embed({
                title: `🤖・Nos bots`,
                thumbnail: client.user.avatarURL({ size: 1024 }),
                desc: `_____ \n\nEn dehors d'une communauté, nous maintenons également 2 bots publics. Ces bots sont tous conçus pour rendre votre serveur meilleur !`,
                fields: [
                    {
                        name: `📘┆Qu'est-ce que Bot ?`,
                        value: `Bot est un bot avec lequel vous pouvez gérer tout votre serveur ! Avec pas moins de 400+ commandes, nous avons un grand bot avec de nombreuses options pour améliorer votre serveur ! Vous savez ce qui est encore plus beau ? Tout cela est **GRATUIT** à utiliser !`,
                    },
                    {
                        name: `🎶┆Qu'est-ce que Bot 2 ?`,
                        value: `Bot 2 a été créé pour une musique supplémentaire. Ainsi, vous ne vous gênez jamais lorsque quelqu'un écoute déjà de la musique. De plus, ce bot contient un tableau de sons et un système de radio.`,
                    },
                    {
                        name: `📨┆Comment puis-je inviter les bots ?`,
                        value: `Vous pouvez inviter les bots en faisant \`/invite\` ou en cliquant sur les liens ci-dessous \n\n**Bot** - [Invitez ici](${client.config.discord.botInvite})`,
                    },
                    {
                        name: `🎫┆Comment puis-je obtenir de l'aide en cas de besoin ?`,
                        value: `Vous pouvez créer un ticket dans <#820308164322656327> ! Nous sommes heureux de vous aider avec vos questions ici et d'offrir un soutien dans votre serveur !`,
                    }
                ]
            }, interaction.channel)
        })
    }
}