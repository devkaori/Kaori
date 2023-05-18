const Schema = require("../../database/models/birthday");
const Devs = require("../../database/models/developers");
const birthdayChannel = require("../../database/models/birthdaychannels");

module.exports = (client) => {
    const checkBirthdays = async () => {
        const now = new Date();
        const getLastDate = await Devs.findOne({ Action: "Birthday" }).exec();

        let month = now.getMonth() + 1;
        let day = now.getDate();

        let dateNow = `${day} - ${month}`;

        if (getLastDate) {
            const lastDate = getLastDate.Date;

            if (lastDate == dateNow) return;

            getLastDate.Date = dateNow;
            getLastDate.save();
        }
        else {
            new Devs({
                Action: "Birthday",
                Date: dateNow,
            }).save();
        }

        const months = {
            1: "Janvier",
            2: "Février",
            3: "Mars",
            4: "Avril",
            5: "Mai",
            6: "Juin",
            7: "Juillet",
            8: "Août",
            9: "Septembre",
            10: "Octobre",
            11: "Novembre",
            12: "Décembre"
        };

        const convertedDay = suffixes(day);
        const convertedMonth = months[month];
        const birthdayString = `${convertedDay} de ${convertedMonth}`;

        const results = await Schema.find({ Birthday: birthdayString })

        if (results) {
            for (const result of results) {
                const { Guild, User } = result;

                const finalGuild = client.guilds.cache.get(Guild)
                if (finalGuild) {
                    birthdayChannel.findOne({ Guild: finalGuild.id }, async (err, data) => {
                        if (data) {
                            const channel = finalGuild.channels.cache.get(data.Channel);
                            
                            client.embed({ 
                                title: `${client.emotes.normal.birthday}・Anniversaire`,
                                desc: `Joyeux anniversaire à <@!${User}> !`
                            }, channel)
                        }
                    })
                }
            }
        }

        setTimeout(checkBirthdays, 1000 * 10)
    }

    checkBirthdays()
}

function suffixes(number) {
    const converted = number.toString();

    const lastChar = converted.charAt(converted.length - 1);

    return lastChar == "1" ?
        `${converted}` : lastChar == "2" ?
            `${converted}` : lastChar == '3'
                ? `${converted}` : `${converted}`
}