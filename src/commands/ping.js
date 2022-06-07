const { SlashCommandBuilder } = require("@discordjs/builders");
async function ping() {
  return {
    data: new SlashCommandBuilder()
      .setName("ping")
      .setDescription("Replies with Pong!"),
    async execute(interaction) {
      await interaction.reply("Pong!");
    },
  };
}
module.exports = {
  ping,
};
