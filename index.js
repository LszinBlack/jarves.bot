const { Client, GatewayIntentBits, AttachmentBuilder } = require('discord.js');
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

// COMANDO!IMG GRÁTIS - MANDA A IMAGEM
if (msg.content.startsWith('!img ')) {
    const prompt = msg.content.slice(5);
    if (!prompt) return msg.reply('Manda o prompt, ex: `!img gato astronauta`');

    await msg.channel.sendTyping();

    try {
        const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1024&height=1024&nologo=true`;
        
        const response = await fetch(url);
        const buffer = await response.arrayBuffer();
        const attachment = new AttachmentBuilder(Buffer.from(buffer), { name: 'jarves.png' });

        await msg.reply({ files: [attachment] });

    } catch (error) {
        msg.reply('Deu ruim pra gerar a imagem 😢');
        console.log(error);
    }
}

// COMANDO!FIGURA - GERA STICKER/FIGURINHA
if (msg.content.startsWith('!figura ')) {
    const prompt = msg.content.slice(8);
    if (!prompt) return msg.reply('Descreve a figura: `!figura gato bravo meme`');

    // FILTRO NSFW
    const bloqueadas = ['nude', 'naked', 'sex', 'porn', 'hentai', 'nsfw'];
    if (bloqueadas.some(palavra => prompt.toLowerCase().includes(palavra))) {
        return msg.reply('Sem putaria nas figuras 😤');
    }

    await msg.channel.sendTyping();

    try {
        // PROMPT OTIMIZADO PRA STICKER: fundo transparente, estilo chibi/cartoon
        const promptSticker = `${prompt}, sticker, chibi style, cartoon, transparent background, white outline, vector art`;
        const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptSticker)}?width=512&height=512&nologo=true&model=flux`;

        const response = await fetch(url);

        if (!response.ok ||!response.headers.get('content-type')?.startsWith('image')) {
            return msg.reply('Figura bloqueada 😢 Tenta "cachorro feliz cartoon"');
        }

        const buffer = await response.arrayBuffer();
        const attachment = new AttachmentBuilder(Buffer.from(buffer), { name: 'figura-jarves.png' });

        await msg.reply({
            content: 'Tua figura tá pronta LS 👇 Salva e usa como sticker',
            files: [attachment]
        });

    } catch (error) {
        msg.reply('Deu ruim pra criar a figura 😢');
        console.log(error);
    }
}

}); // ← ESSE }); TEM QUE VIR AQUI, ANTES DO LOGIN

client.login(process.env.TOKEN); 
