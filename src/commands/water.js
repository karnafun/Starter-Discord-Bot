const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");

let handlers = [];
let instances = [];
async function init(client, interaction, interval) {
  let userId = interaction.user.id;
  let user = await client.users.fetch(userId);
  let startTime = Date.now();

  user.send(
    `Starting water reminder on: ${timeForHumans(startTime)}`
  );
  instances.push({
    tag: user.tag,
    startTime: startTime,
    user: user,
    interval: interval,
  });
  let handler = setInterval(async () => await reminder(user.tag), 3000);
  handlers.push({ tag: user.tag, handler: handler });
}

async function reminder(usertag) {
  let instance = instances.find((f) => f.tag === usertag);
  console.log(instance)
  let currentTime = Date.now();
  let timePassed = (currentTime - instance.startTime) / 1000;
  console.log(`
  *****************************************************
  Current time: ${timeForHumans(currentTime)},
  Start time: ${timeForHumans(instance.startTime)}
  Time Passed in seconds: ${timePassed}
  Shoud notify? ${timePassed / 60 >= instance.interval}
  `)
  if (timePassed / 60 >= instance.interval) {
    instance.startTime = currentTime;
    instance.user.send(
      `chug chug chug ! its ${timeForHumans(currentTime)}`
    );
  }
}

async function waterReminder() {
  return {
    data: new SlashCommandBuilder()
      .setName("water_reminder")
      .setDescription("Will remind you to chug your water")
      .addStringOption((option) =>
        option
          .setName("interval")
          .setDescription("Reminder every X minutes")
          .setRequired(false)
      ),
    async execute(interaction, client) {
      console.log("starting water reminder");
      let interval = interaction.options.getString("interval");
      if (!interval) {
        interval = 20;
      }
      await init(client, interaction, interval);
      await interaction.reply(
        `Starting water reminder every ${interval} minutes`
      );
    },
  };
}

function timeForHumans(time) {
    return new Date(time).toLocaleString("en-US", { minute: "numeric", hour: "numeric", hour12: false })
}
module.exports = {
  waterReminder,
};
