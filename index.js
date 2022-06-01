require("dotenv").config();
const Discord = require("discord.js");

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
	}
});
client.on("ready", async () => {
  console.log("ready ");
});

client.login(process.env.TOKEN);
