const Discord = require('discord.js');
const fetch = require('node-fetch');
require('dotenv').config();
const client = new Discord.Client();

client.on('ready', readyDiscord);

function readyDiscord() {
  console.log("Logged In");
}

const replies = [
  'Pong',
  'Yes',
  'Pong!'
]
client.on('message', gotMessage);

async function gotMessage(msg) {
  console.log(msg.content);

  let tokens = msg.content.split(' ');

  if (tokens[0] === '^ping') {
    const pongs = Math.floor(Math.random() * replies.length);
    msg.channel.send(replies[pongs])
  } else if (tokens[0] == '^gif') {

    let keywords = 'space'
    if (tokens.length > 1) {
      keywords = tokens.slice(1, tokens.length).join(" ");
    }

    let url = `https://api.tenor.com/v1/search?q=${keywords}&key=${process.env.TENOR_KEY}&contentfilter=high`
    let response = await fetch(url);
    let json = await response.json();
    console.log(json);
    let index = Math.floor(Math.random() * json.results.length);
    msg.channel.send(json.results[index].url);
  }
}

client.login(process.env.BOT_TOKEN);
