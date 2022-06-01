const { SlashCommandBuilder } = require("@discordjs/builders");
const { getCocktail } = require('../get-cocktails')

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
        let res = getCocktail(name)
        console.log(res)
        await interaction.reply(res);
    },
};
