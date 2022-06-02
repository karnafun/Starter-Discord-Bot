const axios = require("axios");
function getRelevantInfoOnly(data) {
  
  let cocktails = []

  data.forEach(ct => {
    let ingList = [];
    for (i = 1; i <= 15; i++) {
      let ing = ct["strIngredient" + i];
      let amount = ct["strMeasure" + i];
      if (ing&&amount ){
        ingList.push(`${amount}of ${ing}`)
      }else if (ing){
        ingList.push(`add some ${ing}`)
      }
    }
    cocktails.push({
      name:ct.strDrink,
      glass:ct.strGlass,
      ingredients: ingList,
      image: ct.strDrinkThumb,
      instructions:ct.strInstructions,
      print:function(){
        let res = this.name +'\r\n'
        res += `Served in: ${this.glass}`+'\r\n'
        res+= "How to make:"+'\r\n'
        res+= this.ingredients+'\r\n'
        res+= "online instructions:"+'\r\n'
        res+= this.instructions+'\r\n'
        return res;
        console.log(this.name)
        console.log(`Served in: ${this.glass}`)
        console.log("How to make:")
        console.log(this.ingredients)
        console.log("online instructions:")
        console.log(this.instructions)
      }
    })
  });

  return cocktails;
} 

module.exports = {
  async getCocktail(name) {
    let url = `http://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
    const response = await axios(url);
    const data = response.data;
    return getRelevantInfoOnly(data.drinks);       
  },
};
