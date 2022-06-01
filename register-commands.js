const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require("dotenv").config();
const fs = require('node:fs');

module.exports = {
	async getCommands() {

		const commands = [];
		const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

		// Place your client and guild ids here
		const clientId = process.env.APPLICATION_ID;
		const guildId = process.env.KARNAFUN_GUILD_ID;

		for (const file of processcommandFiles) {
			const command = require(`./commands/${file}`);
			commands.push(command.data.toJSON());
		}

		const rest = new REST({ version: '9' }).setToken(process.env.TOKEN); try {
			console.log('Started refreshing application (/) commands.');

			await rest.put(
				Routes.applicationGuildCommands(clientId, guildId),
				{ body: commands },
			);
			return
			console.log('Successfully reloaded application (/) commands.');
		} catch (error) {
			console.error(error);
		}

	}

}
