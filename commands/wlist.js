const { SlashCommandBuilder } = require("discord.js");

const ALLOWED_CHANNEL_ID = "1432718535876022372";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wlist")
    .setDescription("new wlist order")
    .addStringOption(option =>
      option.setName("order_number")
        .setDescription("e.g. 001, 002")
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName("buyer")
        .setDescription("mention buyer")
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName("product")
        .setDescription("product(s)")
        .setRequired(true)
    ),

  async execute(interaction) {

    // 🔒 channel lock (FIXED)
    if (interaction.channelId !== ALLOWED_CHANNEL_ID) {
      return interaction.reply({
        content: "this command can only be used in the waitlist channel.",
        ephemeral: true
      });
    }

    const orderNumber = interaction.options.getString("order_number");
    const buyer = interaction.options.getString("buyer");
    const product = interaction.options.getString("product");

    const message = `
_ _       \`🎀\`    ᨵׁׅׅrder  **(#${orderNumber})**  !*!*

_ _      ♡    frᨵׁׅׅm  ;  __${buyer}__ 

_ _       \`🎀\`    ᨵׁׅׅrdered  ;  **(${product})**
`;

    await interaction.reply({ content: message });
  }
};
