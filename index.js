const { Client, GatewayIntentBits, REST, Routes, Collection } = require("discord.js");
const fs = require("fs");
const express = require("express");

// ---------------------------
// Web server (Render keep alive)
// ---------------------------
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("mizuki bot is alive, making your designs!");
});

app.listen(PORT, () => {
  console.log(`Web server running on port ${PORT}`);
});

// ---------------------------
// Discord client
// ---------------------------
const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ] 
});

client.commands = new Collection();

// ---------------------------
// Load commands (safe)
// ---------------------------
const commands = [];

if (fs.existsSync("./commands")) {
  const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    if (command.data) {
      client.commands.set(command.data.name, command);
      commands.push(command.data.toJSON());
    }
  }
} else {
  console.log("⚠️ No /commands folder found");
}

// ---------------------------
// Register slash commands
// ---------------------------
const token = String(process.env.TOKEN || "").trim();

if (!token) {
  console.error("❌ TOKEN is missing in environment variables!");
  process.exit(1);
}

const rest = new REST({ version: "10" }).setToken(token);

// ---------------------------
// READY EVENT
// ---------------------------
client.once("ready", async () => {
  console.log(`mizuki bot is online as ${client.user.tag}`);

  const latency = Date.now() - client.readyTimestamp;
  console.log(`latency: ${latency}ms`);

  // ✅ Idle presence (no streaming)
  client.user.setPresence({
    activities: [{
      name: "Working for /nauraa`s shop ♡"
    }],
    status: "idle"
  });

  try {
    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: commands }
    );
    console.log("Slash commands registered.");
  } catch (error) {
    console.error("Slash command error:", error);
  }
});

// ---------------------------
// Handle interactions
// ---------------------------
client.on("interactionCreate", async (interaction) => {
  if (interaction.isChatInputCommand()) {
    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);

      if (!interaction.replied) {
        await interaction.reply({
          content: "there was an error executing that command.",
          ephemeral: true
        });
      }
    }
  } else {
    for (const command of client.commands.values()) {
      if (typeof command.handleInteraction === "function") {
        try {
          await command.handleInteraction(interaction);
        } catch (error) {
          console.error(error);
        }
      }
    }
  }
});

// ---------------------------
// Login
// ---------------------------
console.log("Token loaded:", token ? "YES" : "NO");

client.login(token)
  .then(() => {
    console.log("Discord login successful");
  })
  .catch((err) => {
    console.error("Discord login failed:", err);
  });
