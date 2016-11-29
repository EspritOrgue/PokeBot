var Discord = require("discord.js");
var bot = new Discord.Client();
var voiceChannel;
var fs = require('fs');
var ytdl = require('ytdl-core');
var pokemon = require('./db/pokemon');
var login = require('./login')
const streamOptions = { seek: 0, volume: 1 };

bot.on("message", msg => {
	let prefix = "!";
	if (!msg.content.startsWith(prefix)) return;

	if(msg.author.bot) return;

    if (msg.content == prefix+"ping") {
        msg.channel.sendMessage("!pong");
    }
    else if (msg.content == prefix+"<3"){
        msg.channel.sendMessage("I love you, Master!");
    }
		else if(msg.content.startsWith(prefix+"music ")){
			voiceChannel = bot.channels.find("name","Music");
			var text = msg.content.toString();
			text = text.substring(7);
		  console.log("The bot will join "+voiceChannel.name);
		  voiceChannel.join()
			.then(connection => {
				const stream = ytdl(text, {filter : 'audioonly'});
				const dispatcher = connection.playStream(stream, streamOptions);})
			.catch(console.error);
		}
		else if(msg.content == prefix+"stop"){
			voiceChannel = bot.channels.find("name","Music");
		  console.log("The bot will leave "+voiceChannel.name);
			voiceChannel.leave();
		}
		else if (msg.content == prefix+"pokemon") {
			var text = "__You selected:__\n";
			text += "English name: **"+pokemon[0]._engName+"** \n";
		 	text += "French name: **"+pokemon[0]._frName+"** \n";
			text += "Type: **"+pokemon[0]._type+" "+pokemon[0]._type2+"**";
			msg.reply(text);
		}
});

bot.on('ready', () => {
  console.log('I am ready!');
});

bot.login(login.pokemon);
