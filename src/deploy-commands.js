require("dotenv").config();
const fs = require('node:fs');
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");


const token = process.env.TOKEN;
const clientId = process.env.APPLICATION_ID;
const guildId = process.env.KARNAFUN_GUILD_ID;



module.exports = {

  async registerAllFunctions(client) {
    console.log("register functions started")
    const commands = [];
    const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
      const command = require(`./commands/${file}`);
      commands.push(command.data.toJSON());
      client.commands.set(command.data.name, command)
    }
    console.log("client commands:", client.commands)
    const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);


    rest
      .put(
        Routes.applicationGuildCommands(
          clientId,
          guildId
        ),
        { body: commands }
      )
      .then((data) => {
        console.log("Successfully registered application commands.");
      })
      .catch(console.error);


  },
  async deleteAllCommands() {
    const rest = new REST({ version: '9' }).setToken(token);
    rest.get(Routes.applicationGuildCommands(clientId, guildId))
      .then(data => {
        const promises = [];
        for (const command of data) {
          console.log(`Deleting slash command: ${command.name} id: ${command.id}`)
          const deleteUrl = `${Routes.applicationGuildCommands(clientId, guildId)}/${command.id}`;
          promises.push(rest.delete(deleteUrl));
        }
        return Promise.all(promises);
      });


  }
}



