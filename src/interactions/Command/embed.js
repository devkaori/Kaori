const { CommandInteraction, Client } = require("discord.js");
const { SlashCommandBuilder } = require("discord.js");
const { ChannelType } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Créé un embed")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Le canal où l'embed doit être envoyé")
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText)
    ),
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */

  run: async (client, interaction, args) => {
    await interaction.deferReply({ fetchReply: true });
    const perms = await client.checkPerms(
      {
        flags: [Discord.PermissionsBitField.Flags.ManageMessages],
        perms: [Discord.PermissionsBitField.Flags.ManageMessages],
      },
      interaction
    );

    if (perms == false) return;

    let row = new Discord.ActionRowBuilder().addComponents(
      new Discord.StringSelectMenuBuilder()
        .setCustomId("embedSelect")
        .setPlaceholder("Rien sélectionné")
        .addOptions([
          {
            emoji: "1229052854166093845",
            label: "Titre",
            description: "Crée un titre d'embed",
            value: "title_embed",
          },
          {
            emoji: "1229052858658455592",
            label: "Description",
            description: "Crée une description d'embed",
            value: "description_embed",
          },
          {
            emoji: "1229052874944811098",
            label: "Auteur",
            description: "Crée un auteur d'embed",
            value: "author_embed",
          },
          {
            emoji: "1229052806154162266",
            label: "Footer",
            description: "Crée un footer d'embed",
            value: "footer_embed",
          },
          {
            emoji: "1229133001405759560",
            label: "Vignette",
            description: "Crée une vignette d'embed",
            value: "thumbnail_embed",
          },
          {
            emoji: "1229052788932350086",
            label: "Horodatage",
            description: "Crée un horodatage d'embed",
            value: "timestamp_embed",
          },
          {
            emoji: "1229133001405759560",
            label: "Image",
            description: "Crée une image d'embed",
            value: "image_embed",
          },
          {
            emoji: "1229052827431735367",
            label: "URL",
            description: "Crée une URL d'embed",
            value: "url_embed",
          },
          {
            emoji: "1229052846574665819",
            label: "Couleur",
            description: "Crée une couleur d'embed",
            value: "color_embed",
          },
        ])
    );

    let row2 = new Discord.ActionRowBuilder().addComponents(
      new Discord.ButtonBuilder()
        .setCustomId("send_embed")
        .setEmoji("1229052806154162266")
        .setLabel("Envoyer l'embed")
        .setStyle(Discord.ButtonStyle.Success)
    );

    let embed = new Discord.EmbedBuilder().setDescription(
      `Veuillez sélectionner des options`
    );

    interaction.editReply({ embeds: [embed], components: [row, row2] });

    const filter = (i) => i.user.id === interaction.user.id;
    const collector = interaction.channel.createMessageComponentCollector({
      filter,
    });

    collector.on("collect", async (i) => {
      if (i.customId === "embedSelect") {
        i.deferUpdate();

        if (i.values == "title_embed") {
          interaction.channel
            .send({ content: "Veuillez entrer un titre" })
            .then((message) => {
              const filterMessage = (m) =>
                m.author.id === interaction.user.id && !m.author.bot;
              interaction.channel
                .awaitMessages({
                  filterMessage,
                  max: 1,
                  time: 300000,
                  errors: ["time"],
                })
                .then(async (collected) => {
                  message.delete({ timeout: 1000 });
                  collected.delete({ timeout: 1000 });

                  embed.setTitle(`${collected.first().content}`);
                  await interaction.editReply({ embeds: [embed] });
                });
            });
        }

        if (i.values == "description_embed") {
          interaction.channel
            .send({ content: "Veuillez entrer une description" })
            .then((message) => {
              const filterMessage = (m) =>
                m.author.id === interaction.user.id && !m.author.bot;
              interaction.channel
                .awaitMessages({
                  filterMessage,
                  max: 1,
                  time: 300000,
                  errors: ["time"],
                })
                .then(async (collected) => {
                  message.delete({ timeout: 1000 });
                  collected.delete({ timeout: 1000 });

                  embed.setDescription(`${collected.first().content}`);
                  await interaction.editReply({ embeds: [embed] });
                });
            });
        }

        if (i.values == "author_embed") {
          interaction.channel
            .send({ content: "Veuillez entrer un auteur" })
            .then((message) => {
              const filterMessage = (m) =>
                m.author.id === interaction.user.id && !m.author.bot;
              interaction.channel
                .awaitMessages({
                  filterMessage,
                  max: 1,
                  time: 300000,
                  errors: ["time"],
                })
                .then(async (collected) => {
                  message.delete({ timeout: 1000 });
                  collected.delete({ timeout: 1000 });

                  embed.setAuthor({
                    name: `${collected.first().content}`,
                    iconURL: interaction.guild.iconURL({ size: 1024 }),
                  });
                  await interaction.editReply({ embeds: [embed] });
                });
            });
        }

        if (i.values == "footer_embed") {
          interaction.channel
            .send({ content: "Veuillez entrer un footer" })
            .then((message) => {
              const filterMessage = (m) =>
                m.author.id === interaction.user.id && !m.author.bot;
              interaction.channel
                .awaitMessages({
                  filterMessage,
                  max: 1,
                  time: 300000,
                  errors: ["time"],
                })
                .then(async (collected) => {
                  message.delete({ timeout: 1000 });
                  collected.delete({ timeout: 1000 });

                  embed.setFooter({
                    text: `${collected.first().content}`,
                  });
                  await interaction.editReply({ embeds: [embed] });
                });
            });
        }

        if (i.values == "thumbnail_embed") {
          interaction.channel
            .send({ content: "Veuillez entrer une vignette" })
            .then((message) => {
              const filterMessage = (m) =>
                m.author.id === interaction.user.id && !m.author.bot;
              interaction.channel
                .awaitMessages({
                  filterMessage,
                  max: 1,
                  time: 300000,
                  errors: ["time"],
                })
                .then(async (collected) => {
                  message.delete({ timeout: 1000 });
                  collected.delete({ timeout: 1000 });

                  if (
                    !collected.first().content.includes("http://") &&
                    !collected.first().content.includes("https://")
                  )
                    return interaction.channel.send({
                      content: "Lien de vignette incorrect !",
                    });
                  embed.setThumbnail(`${collected.first().content}`);
                  await interaction.editReply({ embeds: [embed] });
                });
            });
        }

        if (i.values == "thumbnail_embed") {
          embed.setTimestamp();
          interaction.editReply({ embeds: [embed] });
        }

        if (i.values == "image_embed") {
          interaction.channel
            .send({ content: "Veuillez entrer une image" })
            .then((message) => {
              const filterMessage = (m) =>
                m.author.id === interaction.user.id && !m.author.bot;
              interaction.channel
                .awaitMessages({
                  filterMessage,
                  max: 1,
                  time: 300000,
                  errors: ["time"],
                })
                .then(async (collected) => {
                  message.delete({ timeout: 1000 });
                  collected.delete({ timeout: 1000 });

                  if (
                    !collected.first().content.includes("http://") &&
                    !collected.first().content.includes("https://")
                  )
                    return interaction.channel.send({
                      content: "Lien d'image incorrect !",
                    });
                  embed.setImage(`${collected.first().content}`);
                  await interaction.editReply({ embeds: [embed] });
                });
            });
        }

        if (i.values == "url_embed") {
          interaction.channel
            .send({ content: "Veuillez entrer une URL" })
            .then((message) => {
              const filterMessage = (m) =>
                m.author.id === interaction.user.id && !m.author.bot;
              interaction.channel
                .awaitMessages({
                  filterMessage,
                  max: 1,
                  time: 300000,
                  errors: ["time"],
                })
                .then(async (collected) => {
                  message.delete({ timeout: 1000 });
                  collected.delete({ timeout: 1000 });

                  if (
                    !collected.first().content.includes("http://") &&
                    !collected.first().content.includes("https://")
                  )
                    return interaction.channel.send({
                      content: "URL incorrecte !",
                    });
                  embed.setURL(`${collected.first().content}`);
                  await interaction.editReply({ embeds: [embed] });
                });
            });
        }

        if (i.values == "color_embed") {
          interaction.channel
            .send({ content: "Veuillez entrer une couleur" })
            .then((message) => {
              const filterMessage = (m) =>
                m.author.id === interaction.user.id && !m.author.bot;
              interaction.channel
                .awaitMessages({
                  filterMessage,
                  max: 1,
                  time: 300000,
                  errors: ["time"],
                })
                .then(async (collected) => {
                  message.delete({ timeout: 1000 });
                  collected.delete({ timeout: 1000 });

                  embed.setColor(`${collected.first().content}`);
                  await interaction.editReply({ embeds: [embed] });
                });
            });
        }
      }
      if (i.customId == "send_embed") {
        const channel = interaction.options.getChannel("channel");
        if (!channel)
          return client.errNormal(
            { error: `Channel introuvable` },
            collected.first().channel
          );
        channel.send({ embeds: [embed] });
        interaction.editReply({
          content: `Embed envoyé dans ${channel}`,
          components: [],
        });
      }
    });
  },
};
