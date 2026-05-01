const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Jarves tá online!'));
app.listen(3000, () => console.log('Servidor rodando'));

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on('clientReady', () => {
  console.log(`Jarves logado como ${client.user.tag}`);
});

client.on('messageCreate', async msg => { 
if (msg.author.bot) return;
  
  if (msg.content === '!ping') {
    msg.reply('Pong! Jarves online 🎤');
  }

  // !jarves - Apresentação
  if (msg.content === '!jarves') {
    msg.reply('**Jarves Online** 🎤\nCriado pelo Lszin. Bot de utilidades, zoeira e finalizações. Digita `!comandos` pra ver meu arsenal.');
  }

  // !comandos - Lista atualizada
  if (msg.content === '!comandos') {
    msg.reply('**Arsenal do Jarves:**\n`!ping` - Teste de conexão\n`!jarves` - Quem sou eu\n`!sukuna` - Invoca o Rei das Maldições\n`!james` - Chama o brabo\n`!dado` - Rola D20\n`!ls` - Homenagem pro meu criador');
  }

  // !sukuna - Finalização
  if (msg.content === '!sukuna') {
    msg.reply('**開 - Fuga** 👑\nRyomen Sukuna presente. Quem vai ser finalizado?');
  }

  // !james - Menção honrosa
  if (msg.content === '!james') {
    msg.reply('James? O homem tá online e pronto pro rush 💪');
  }

  // !ls - Teu comando
  if (msg.content === '!ls') {
    msg.reply('Lszin? O cara que me deu vida. Brabo demais, meteu um bot no ar sozinho 👑⚡');
  }

  // !dado - D20
  if (msg.content === '!dado') {
    const num = Math.floor(Math.random() * 20) + 1;
    msg.reply(`🎲 **${num}**\n${num === 20 ? 'CRÍTICO! SUKUNA FINALIZA' : num === 1 ? 'FALHA CRÍTICA KKK' : ''}`);
  }
//!img - Gerar imagem com IA Grátis
if (msg.content.startsWith('!img ')) {
  const prompt = msg.content.slice(5).trim();

  if (!prompt) {
    return msg.reply('Manda o prompt né LS 😤\nEx: `!img sukuna rei das maldições anime style`');
  }

  const loadingMsg = await msg.channel.send('Calma aí LS... Jarves tá invocando a arte no Reino das Maldições 🎨👑');

  try {
    const axios = require('axios');
    const response = await axios.post('https://api.craiyon.com/draw', {
      prompt: prompt
    }, {
      timeout: 60000
    });

    const imageBase64 = response.data.images[0];
    const buffer = Buffer.from(imageBase64, 'base64');

    await loadingMsg.delete();
    await msg.reply({
      content: `**Prompt:** ${prompt}`,
      files: [{ attachment: buffer, name: 'jarves_art.png' }]
    });

  } catch (error) {
    await loadingMsg.delete();
    console.log('Erro!img:', error);
    msg.reply('Deu ruim pra gerar a imagem LS 😭\nAPI tá lenta ou prompt foi bloqueado. Tenta outro mais simples.');
  }
}

}); // ← ESSE }); TEM QUE VIR AQUI, ANTES DO LOGIN

client.login(process.env.TOKEN); 
