const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token } = require('./config.json');
const keep_alive = require("./keep_alive.js");
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Bot is online for some reason, im not questioning it');
});

client.on('message', message => {
	console.log(message.content);
if (!message.content.startsWith(prefix) || message.author.bot) return;

const args = message.content.slice(prefix.length).split(' ');
const command = args.shift().toLowerCase();

// [GENERAL COMMAND]
if (command === 'test') {
    client.commands.get('test').execute(message, args);
} if (command === 'hi') {
	message.channel.send('stop talking to me');
}if (command === 'why?') {
	message.channel.send('Because i am a bot');
}if (command === 'mention') {
	if (!message.mentions.users.size) {
    //already getting into seemingly but not actually dangerous territory here
    const embed = new Discord.RichEmbed()
    .setAuthor(`${message.author.username}`, message.author.avatarURL)
    .setDescription(`:x: Too few arguments given.`)
    .addField(`Usage:`, "`p!mention <@user>`")
    .setColor("RED")
    
	 return message.reply(embed);
    
  }
	const taggedUser = message.mentions.users.first();

	message.channel.send(`You mention: ${taggedUser.username}`);

}
if (command === 'avatar') {
	if (!message.mentions.users.size) {
		return message.channel.send(`Your avatar: ${message.author.avatarURL}`);
	}

	const avatarList = message.mentions.users.map(user => {
		return `${user.username}'s avatar: ${user.displayAvatarURL}`;
	});
	message.channel.send(avatarList);
} if (command === 'class') {
    client.commands.get('class').execute(message, args);
 }
});
client.login(token);
