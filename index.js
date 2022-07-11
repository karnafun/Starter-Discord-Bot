const {keepAlive} = require('./server')
//main require
require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
//require deployment (auto vs manual for replit.com)
const {
  registerAllFunctions,
  deleteAllCommands,
} = require("./src/deploy-commands");
const {
  registerSlashCommandsManually,
} = require("./src/deploy-commands-manually");
//require functions
const { twitch_loop } = require("./src/twitch-api");

client.commands = new Discord.Collection();

client.on("ready", async () => {
  await registerSlashCommandsManually(client);
  //await registerAllFunctions(client);
  twitch_loop(client, 100000, 30, ['rocket','league','call of duty','cod','cs:go','csgo','counter','strike']);
  console.log("ready ");
});

client.on("interactionCreate", async (interaction) => {
  console.log("interaction received: ", interaction.commandName);
  const command = client.commands.get(interaction.commandName);
  if (!interaction.isCommand() || !command) {
    console.log("invalid interaction: " + interaction.commandName);
    return;
  }

  try {  
    console.log(client.to)
    await command.execute(interaction,client);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!" +error,
      ephemeral: true,
    });
  }
});

// keepAlive();
client.login(process.env.TOKEN);
