const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

const ALLOWED_CHANNEL_ID = "1446441803372036116 ";
const ALLOWED_ROLE_ID = "1444309222975082537";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wlist")
    .setDescription("new wlist order")
    .addStringOption(option =>
      option.setName("orderid")
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

    if (interaction.channelId !== ALLOWED_CHANNEL_ID) {
      return interaction.reply({
        content: "this command can only be used in the waitlist channel.",
        ephemeral: true
      });
    }

    const orderNumber = interaction.options.getString("orderid");
    const buyer = interaction.options.getString("buyer");
    const product = interaction.options.getString("product");

    const message = `
_ _       \`🎀\`    ᨵׁׅׅrder  **#${orderNumber}**  !*!*

_ _      <a:00_brush:1444269201094344734>    frᨵׁׅׅm  ;  __${buyer}__ 

_ _       \`🎀\`    ᨵׁׅׅrdered  ;  **${product}**
`;

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`wlist_noted_${orderNumber}`)
        .setLabel("noted")
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId(`wlist_wip_${orderNumber}`)
        .setLabel("wip")
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId(`wlist_completed_${orderNumber}`)
        .setLabel("completed")
        .setStyle(ButtonStyle.Secondary)
    );

    await interaction.reply({
      content: message,
      components: [row]
    });
  }
};
