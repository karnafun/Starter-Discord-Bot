const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const axios = require("axios");
const { topStreams } = require("../twitch-api");

async function twitch_streams() {
  return {
    data: new SlashCommandBuilder()
      .setName("twitch_streams")
      .setDescription("Getting twitch top streams")
      .addStringOption((option) =>
        option
          .setName("number_of_streams")
          .setDescription("default is 3, max is 6")
          .setRequired(false)
      ),
    async execute(interaction) {
      let numOfStreams = interaction.options.getString("number_of_streams");
      if (!numOfStreams) {
        numOfStreams = 5;
      } else if (numOfStreams > 6) {
        numOfStreams = 6;
      }
      let streams = await topStreams(numOfStreams);
      let fields = [];
      streams.forEach((stream) => {
        fields.push(
          {
            name: "Viewers",
            value: stream.viewers.toString(),
            inline: true,
          },
          {
            name: "Url",
            value: `[Watch Stream](${stream.url})`,
            inline: true,
          },
          {
            name: "Game",
            value: stream.game,
            inline: true,
          },
          { name: "\u200B", value: "\u200B" }
        );
      });
      const embed = new MessageEmbed()
        .setAuthor({
          name: "Karnafun",
          iconURL: "https://pbs.twimg.com/media/EXu4kkYUMAE5klg.png",
          url: "https://github.com/karnafun/Starter-Discord-Bot",
        })
        //.setThumbnail('https://pbs.twimg.com/media/EXu4kkYUMAE5klg.png')
        //.setImage(res[0].image)
        .setTitle("top twitch streams:")
        .addFields(fields)
        .setColor("#3355aa")
        .setTimestamp()
        .setFooter({
          text: "Want to ask new bot features? contact me at: danaidor@gmail.com",
          iconURL: "https://pbs.twimg.com/media/EXu4kkYUMAE5klg.png",
        });

      await interaction.reply({ embeds: [embed] });
    },
  };
}

module.exports = {
  twitch_streams
};
