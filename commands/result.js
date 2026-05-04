const { SlashCommandBuilder } = require("discord.js");

const ALLOWED_CHANNEL_ID = "1446441803372036116";

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
_ _   ıllı﹒﹒<a:00_trinketbox:1444269203212337152> order #${orderNumber} ﹕done *!*
_ _         ┆︎   ordered  :  ${product} \`  🎀  \`
_ _    ➔﹒﹒<a:00_vanity:1444269205888307423> thank u for buying ♡
`;

    await interaction.reply({
      content: message
    });
  }
};
