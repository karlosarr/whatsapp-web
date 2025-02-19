const { Client, LocalAuth, MessageMedia, RemoteAuth} = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const { MongoStore } = require('wwebjs-mongo');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: "./.auth",
  }),
});

client.on("qr", (qr) => {
  // Generate and scan this code with your phone
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", async (msg) => {
  if (msg.body == "!ping") {
    msg.reply("pong");
  }
  if (msg.body === "!send-media") {
    const media = await MessageMedia.fromUrl(
      "https://static.wikia.nocookie.net/zelda/images/5/54/Link_Artwork_1_%28Ocarina_of_Time%29.png"
    );
    await client.sendMessage(msg.from, media);
  }
});

client.on("remote_session_saved", () => {
  console.log("Session saved!");
});

client.on('disconnected', (reason) => {
  console.log('Client was logged out', reason);
});

client.on('authenticated', () => {
  console.log('Client authenticated');
});

client.initialize();
