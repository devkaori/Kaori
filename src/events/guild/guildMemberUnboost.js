const Discord = require('discord.js');

const Schema = require("../../database/models/boostChannels");
const Schema2 = require("../../database/models/boostMessage");

module.exports = async (client, member) => {
    try {
        const channelData = await Schema.findOne({ Guild: member.guild.id });
        const messageData = await Schema2.findOne({ Guild: member.guild.id });

        if (messageData) {
            let tier = {
                "TIER_1": `1 `,
                "TIER_2": `2`,
                "TIER_3": `3`,
                "NONE": `0`,
            }

            var boostMessage = messageData.unboostMessage;
            boostMessage = boostMessage.replace(`{user:username}`, member.user.username)
            boostMessage = boostMessage.replace(`{user:discriminator}`, member.user.discriminator)
            boostMessage = boostMessage.replace(`{user:tag}`, member.user.tag)
            boostMessage = boostMessage.replace(`{user:mention}`, member)

            boostMessage = boostMessage.replace(`{guild:name}`, member.guild.name)
            boostMessage = boostMessage.replace(`{guild:members}`, member.guild.memberCount)
            boostMessage = boostMessage.replace(`{guild:boosts}`, member.guild.premiumSubscriptionCount)
            boostMessage = boostMessage.replace(`{guild:booststier}`, tier[member.guild.premiumTier])

            if (channelData) {
 
                try {

                    var channel = client.channels.cache.get(channelData.Channel)

                    await client.embed({
                        title: `Nouveau déboost`,
                        desc: boostMessage
                    }, channel)
                }
                catch { }
            }
        }
        else {
            if (channelData) {

                try {

                    var channel = client.channels.cache.get(channelData.Channel)

                    await client.embed({
                        title: `Un supporter en moins...`,
                        image: `https://i.imgur.com/U9Fih4D.png`,
                        desc: `${member} a décidé de prendre un petit repos du boost pour le serveur`
                    }, channel)
                }
                catch { }
            }
        }
    }
    catch { }

};
