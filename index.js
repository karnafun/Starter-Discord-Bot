require("dotenv").config();
const Discord = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

client.commands = new Discord.Collection();

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) {
    console.log("invalid interaction: "+interaction.commandName)
    return;
  };

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});
client.on("ready", async () => {
  console.log("ready ");
});

client.login(process.env.TOKEN);
