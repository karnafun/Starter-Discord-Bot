require('dotenv').config()
const axios = require('axios');
const { isatty } = require('tty');
const { data } = require('./commands/echo');


const client_id = process.env.TWTICH_APPLICATION_CLIENT_ID;
const appication_token = process.env.TWITCH_APPLICATION_TOKEN
let config = {
    headers: {
        'Authorization': `Bearer ${appication_token}`
        , 'Client-Id': client_id
    }
};
module.exports = {

    async topStreams(numOfStreams) {

        let url = 'https://api.twitch.tv/helix/streams?first='+numOfStreams;
        let res = await axios.get(url, config);
        let data = res.data.data;
        let results = []
        data.forEach(stream => {
            results.push({
                game: stream.game_name,
                streamer: stream.user_name,
                viewers: stream.viewer_count,
                title: stream.title,
                isLive: stream.type === 'live',
                url: `http://twitch.tv/${stream.user_login}`
            })

        });
        return results;
    }
}
