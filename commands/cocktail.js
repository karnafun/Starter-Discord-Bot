const { SlashCommandBuilder } = require("@discordjs/builders");
const { getCocktail } = require('../get-cocktails')
const { MessageEmbed, MessageAttachment } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("cocktail")
        .setDescription("Will teach you to make a cocktail")
        .addStringOption((option) =>
            option
                .setName("cocktail_name")
                .setDescription("The cocktail you want to make")
                .setRequired(true)
        ),
    async execute(interaction) {
        console.log("starting cocktail")
        const name = interaction.options.getString("cocktail_name")
        console.log("The name is :", name)
        let res = await getCocktail(name)
        const embed = new MessageEmbed()
        .setImage(res[0].image)
        .setTitle(res[0].name)
        .setDescription(res[0].print())
        .setColor('#0099ff')                
        await interaction.reply({ embeds: [embed]})        
    },
};
