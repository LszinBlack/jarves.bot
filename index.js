const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const app = express();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

app.get('/', (req, res) => res.send('Jarves tá online!'));
app.listen(3000, () => console.log('Servidor rodando'));

client.on('ready', () => {
  console.log(`Jarves logado como ${client.user.tag}`);
});

client.on('messageCreate', msg => {
  if (msg.author.bot) return;
  if (msg.content === '!ping') msg.reply('Pong! Jarves online 🏓');
});

client.login(process.env.TOKEN);
