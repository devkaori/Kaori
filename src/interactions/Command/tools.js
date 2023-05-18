const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tools')
        .setDescription('Utiliser des outils intéressants')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription("Obtenir des informations sur les commandes de la catégorie des outils")
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('anagram')
                .setDescription("Former un mot avec certaines lettres")
                .addStringOption(option => option.setName('word').setDescription("Le mot que vous souhaitez former").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('button')
                .setDescription("Créer un bouton")
                .addStringOption(option => option.setName('url').setDescription("L'URL du bouton").setRequired(true))
                .addStringOption(option => option.setName('text').setDescription("Le texte du bouton").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('calculator')
                .setDescription("Calculer une somme")
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('decode')
                .setDescription("Décoder un code binaire en texte")
                .addStringOption(option => option.setName('code').setDescription("Le code binaire que vous souhaitez décoder").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('emojify')
                .setDescription("Convertir du texte en emojis")
                .addStringOption(option => option.setName('text').setDescription("Le texte que vous souhaitez convertir").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('encode')
                .setDescription("Encoder du texte en code binaire")
                .addStringOption(option => option.setName('text').setDescription("Le texte que vous souhaitez encoder").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('enlarge')
                .setDescription("Agrandir un emoji")
                .addStringOption(option => option.setName('emoji').setDescription("L'emoji que vous souhaitez agrandir").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('mcskin')
                .setDescription("Voir la peau d'un joueur Minecraft")
                .addStringOption(option => option.setName('name').setDescription("Le nom d'utilisateur du joueur").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('mcstatus')
                .setDescription("Voir l'état d'un serveur Minecraft")
                .addStringOption(option => option.setName('ip').setDescription("L'IP du serveur Minecraft").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('pwdgen')
                .setDescription("Générer un mot de passe")
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('qrcode')
                .setDescription("Envoyer une photo QR Code du texte que vous avez fourni")
                .addStringOption(option => option.setName('text').setDescription("Le texte que vous souhaitez convertir").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('remind')
                .setDescription("Définir un rappel")
                .addStringOption(option => option.setName('time').setDescription("L'heure de votre rappel").setRequired(true))
                .addStringOption(option => option.setName('message').setDescription("Le message de votre rappel").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('sourcebin')
                .setDescription("Uploader du code sur Source Bin")
                .addStringOption(option => option.setName('language').setDescription("Le langage de votre code").setRequired(true))
                .addStringOption(option => option.setName('code').setDescription("Votre code").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('url')
                .setDescription("Créer une URL raccourcie")
                .addStringOption(option => option.setName('site').setDescription("Le lien vers le site web").setRequired(true))
                .addStringOption(option => option.setName('code').setDescription("Le code pour l'URL").setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('review')
                .setDescription("Écrire une critique")
                .addNumberOption(option => option.setName('stars').setDescription("Le nombre d'étoiles (max 5)").setRequired(true))
                .addStringOption(option => option.setName('message').setDescription("Une petite description avec la critique"))
        ),
    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        await interaction.deferReply({ fetchReply: true });
        client.loadSubcommands(client, interaction, args);
    },
};