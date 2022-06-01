const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("echo")
    .setDescription("Echos back your input")
    .addStringOption((option) =>
      option
        .setName("input")
        .setDescription("The input to echo back")
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.reply("Pong!");
  },
};
