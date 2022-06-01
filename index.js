require("dotenv").config();
const Discord = require("discord.js");

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

async function start() {
  await getCocktail("mojito");
}

client.on("ready", async () => {
  console.log("ready ");
});

client.login(process.env.TOKEN);
