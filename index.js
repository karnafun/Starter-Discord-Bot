require("dotenv").config();
const Discord = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");
const { registerAllFunctions } = require('./deploy-commands')
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });


client.commands = new Discord.Collection();


client.on("ready", async () => {
  await registerAllFunctions(client)
  console.log("ready ");
  

});

client.on("interactionCreate", async (interaction) => {
  console.log("interaction received: ", interaction.commandName)
  if (!interaction.isCommand()) {
    console.log("invalid interaction: " + interaction.commandName)
    return;
  };
  console.log("all commands:",client.commands)
  
  let test = client.commands.get('ping')
  console.log("ping function:",test)
  const command = client.commands.get(interaction.commandName);

  if (!command) {
    console.log("not a command ");
    return;
  };

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


client.login(process.env.TOKEN);
