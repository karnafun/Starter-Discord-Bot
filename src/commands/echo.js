const { SlashCommandBuilder } = require("@discordjs/builders");



async function echo(){
  return {
    data:new SlashCommandBuilder()
    .setName("echo")
    .setDescription("Echos back your input")
    .addStringOption((option) =>
      option
        .setName("input")
        .setDescription("The input to echo back")
        .setRequired(true)
    ),
  async execute(interaction) {
    const userInput = interaction.options.getString("input")
    await interaction.reply(userInput);
  }
  }
}

module.exports = {
  echo
};
