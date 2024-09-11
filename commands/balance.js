const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('Check your coin balance'),

    async execute(interaction, db) {
        const userCoins = await db.get(`coins_${interaction.user.id}`) || 0;

        const embed = new EmbedBuilder()
            .setColor('Yellow')
            .setTitle('Coin Balance')
            .setDescription(`You have **${userCoins} coins**.`);

        await interaction.reply({ embeds: [embed] });
    },
};
