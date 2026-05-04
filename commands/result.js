const { SlashCommandBuilder } = require("discord.js");

const ALLOWED_CHANNEL_ID = "1432718535876022372";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("results")
    .setDescription("order results")
    .addStringOption(option =>
      option.setName("orderid")
        .setDescription("e.g. 001, 002")
        .setRequired(true)
                     
    )
    .addStringOption(option =>
      option.setName("product")
        .setDescription("product(s)")
        .setRequired(true)
    ),

  async execute(interaction) {

    // 🔒 channel lock
    if (interaction.channelId !== ALLOWED_CHANNEL_ID) {
      return interaction.reply({
        content: "this command can only be used in the waitlist channel.",
        ephemeral: true
      });
    }

    const orderNumber = interaction.options.getString("orderid");
    const product = interaction.options.getString("product");

const message = `
_ _   ıllı﹒﹒(mizuki emote) order (#${orderNumber}) ﹕done *!*
_ _         ┆︎   ordered  :  (${product}) \`  🎀  \`
_ _    ➔﹒﹒(mizuki emote) thank u for buying ♡
`;

    await interaction.reply({
      content: message
    });
  }
};
