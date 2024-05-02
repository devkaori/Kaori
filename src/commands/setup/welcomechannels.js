const Discord = require('discord.js');

const welcomeChannel = require("../../database/models/welcomeChannels");
const leaveChannel = require("../../database/models/leaveChannels");

module.exports = async (client, interaction, args) => {
    const choice = interaction.options.getString('setup');
    const channel = interaction.options.getChannel('salon');

    if (choice == "salonbienvenue") {
        client.createChannelSetup(welcomeChannel, channel, interaction)
    }

    if (choice == "salondepart") {
        client.createChannelSetup(leaveChannel, channel, interaction)
    }
}

 