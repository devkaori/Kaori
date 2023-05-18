const Discord = require('discord.js');

module.exports = (client, giveaway, member, reaction) => {
    client.errNormal({
        error: `Le concours a malheureusement pris fin ! Vous ne pouvez plus y participer.`
    }, member).catch(() => { });
};