module.exports = async (client, interaction, args) => {
    if (!interaction.member.voice.channel) {
        return client.errNormal({ error: "Vous n'êtes pas dans un salon vocal !", type: 'editreply' }, interaction);
    }

    if (interaction.guild.members.me.voice.channel && interaction.member.voice.channel.id !== interaction.guild.members.me.voice.channel.id) {
        return client.errNormal({ error: "Vous n'êtes pas dans le même salon vocal !", type: 'editreply' }, interaction);
    }

    client.soundboard(interaction.guild.id, interaction, "https://www.myinstants.com/media/sounds/y2mate-mp3cut_sRzY6rh.mp3");

    client.succNormal({ text: "Soundboard démarrée ! Lecture du **dance meme**", type: 'editreply' }, interaction);
};