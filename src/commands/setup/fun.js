const Discord = require('discord.js');

const Birthdays = require("../../database/models/birthdaychannels");
const Review = require("../../database/models/reviewChannels");
const Suggestion = require("../../database/models/suggestionChannels");

module.exports = async (client, interaction, args) => {
    const choice = interaction.options.getString('setup');
    const channel = interaction.options.getChannel('channel');

    if (choice == "birthdays") {
        client.createChannelSetup(Birthdays, channel, interaction)
    }

    if (choice == "reviews") {
        client.createChannelSetup(Review, channel, interaction)
    }

    if (choice == "suggestions") {
        client.createChannelSetup(Suggestion, channel, interaction)
    }
}

 