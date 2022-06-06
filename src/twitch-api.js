require("dotenv").config();
const { time } = require("@discordjs/builders");
const axios = require("axios");
const { client } = require("discord.js");

const client_id = process.env.TWTICH_APPLICATION_CLIENT_ID;
const appication_token = process.env.TWITCH_APPLICATION_TOKEN;
let config = {
  headers: {
    Authorization: `Bearer ${appication_token}`,
    "Client-Id": client_id,
  },
};

async function topStreams(numOfStreams) {
  let url = "https://api.twitch.tv/helix/streams?first=" + numOfStreams;
  let res = await axios.get(url, config);
  let data = res.data.data;
  let results = [];
  data.forEach((stream) => {
    results.push({
      game: stream.game_name,
      streamer: stream.user_name,
      viewers: stream.viewer_count,
      title: stream.title,
      isLive: stream.type === "live",
      url: `http://twitch.tv/${stream.user_login}`,
    });
  });
  return results;
}

async function twitch_inner_loop(client, wantedViewCount, snoozeTimeInMinutes) {
  let channel = client.channels.cache.get("930932295093874689");
  let streams = await topStreams(5);
  streams.forEach((_stream) => {
    if (
      client.liveStreams.filter((s) => s.streamer === _stream.streamer)
        .length === 0 &&
      _stream.viewers > wantedViewCount &&
      _stream.isLive
    ) {
      client.liveStreams.push(_stream);
    }
  });
  client.liveStreams.forEach((_liveStream) => {
    if (_liveStream.isLive && _liveStream.viewers > wantedViewCount) {
      let timePassed = Math.floor((Date.now() - _liveStream.time) / 1000);
      if (!_liveStream.notified || timePassed > snoozeTimeInMinutes * 60) {
        console.log("Updating channel on stream:", _liveStream.streamer);
        let message = `Live Stream With ${_liveStream.viewers} Viewers
                        Playing:${_liveStream.game}
                        Link:${_liveStream.url}`;
        channel.send(message);
        _liveStream.time = Date.now();
        _liveStream.notified = true;
      }
    }
  });
}
async function twitch_loop(client, wantedViewCount, snoozeTimeInMinutes) {
  console.log("starting twitch loop");
  client.liveStreams = [];

  setInterval(async () => {
    await twitch_inner_loop(client, wantedViewCount, snoozeTimeInMinutes);
  }, 1000);
}
module.exports = {
  topStreams,
  twitch_loop,
};
