require("dotenv").config();
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

//require slash commands for manual deployment
const { cocktail } = require("./commands/cocktail");
const { twitch_streams } = require("./commands/twitch");
const { ping } = require("./commands/ping");
const { echo } = require("./commands/echo");

const token = process.env.TOKEN;
const clientId = process.env.APPLICATION_ID;
const guildId = process.env.KARNAFUN_GUILD_ID;

async function registerSlashCommandsManually(client) {
  const rest = new REST({ version: "9" }).setToken(token);
  let _ping = await ping();
  let _cocktail = await cocktail();
  let _twitch_streams = await twitch_streams(client);
  let _echo = await echo();
  let commands = [_ping.data.toJSON(), _echo.data.toJSON(), _cocktail.data.toJSON(), _twitch_streams.data.toJSON()];

  client.commands.set(_ping.data.name, _ping);
  client.commands.set(_echo.data.name, _echo);
  client.commands.set(_cocktail.data.name, _cocktail);
  client.commands.set(_twitch_streams.data.name, _twitch_streams);

  rest
    .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then((data) => {
      console.log("Successfully registered application commands.");
    })
    .catch(console.error);
}

module.exports = {
  registerSlashCommandsManually,
};
