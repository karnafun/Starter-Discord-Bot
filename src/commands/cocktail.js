const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const axios = require("axios");
function GetCocktailObject(data) {
  let cocktails = [];

  data.forEach((ct) => {
    let ingList = [];
    for (i = 1; i <= 15; i++) {
      let ing = ct["strIngredient" + i];
      let amount = ct["strMeasure" + i];
      if (ing && amount) {
        ingList.push(`${amount}of ${ing}`);
      } else if (ing) {
        ingList.push(`add some ${ing}`);
      }
    }
    cocktails.push({
      name: ct.strDrink,
      glass: ct.strGlass,
      ingredients: ingList,
      image: ct.strDrinkThumb,
      instructions: ct.strInstructions,
      print: function () {
        let res = this.name + "\r\n";
        res += `Served in: ${this.glass}` + "\r\n";
        res += "How to make:" + "\r\n";
        res += this.ingredients + "\r\n";
        res += "online instructions:" + "\r\n";
        res += this.instructions + "\r\n";
        return res;
      },
    });
  });

  return cocktails;
}
async function getCocktail(name) {
  let url = `http://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  const response = await axios(url);
  const data = response.data;
  return GetCocktailObject(data.drinks);
}

async function cocktail() {
  return {
    data: new SlashCommandBuilder()
      .setName("cocktail")
      .setDescription("Will teach you to make a cocktail")
      .addStringOption((option) =>
        option
          .setName("cocktail_name")
          .setDescription("The name of the cocktail")
          .setRequired(true)
      ),
    async execute(interaction) {
      console.log("starting cocktail");
      const name = interaction.options.getString("cocktail_name");
      console.log("The name is :", name);
      let res = await getCocktail(name);
      const embed = new MessageEmbed()
        .setImage(res[0].image)
        .setTitle(res[0].name)
        .setDescription(res[0].print())
        .setColor("#0099ff");
      await interaction.reply({ embeds: [embed] });
      console.log("i have finished sending the interaction reply blat")
    },
  };
}

module.exports = {
  cocktail
};
