const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('redeem')
        .setDescription('Redeem a voucher for coins')
        .addStringOption(option => 
            option.setName('code')
                .setDescription('Voucher code to redeem')
                .setRequired(true)),

    async execute(interaction, db) {
        const code = interaction.options.getString('code');
        const voucher = await db.get(`voucher_${code}`);

        if (!voucher) {
            return interaction.reply({ content: 'Invalid voucher code!', ephemeral: true });
        }

        const userCoins = await db.get(`coins_${interaction.user.id}`) || 0;
        const newBalance = userCoins + voucher.amount;

        await db.set(`coins_${interaction.user.id}`, newBalance);
        await db.delete(`voucher_${code}`);

        const embed = new EmbedBuilder()
            .setColor('Blue')
            .setTitle('Voucher Redeemed')
            .setDescription(`You redeemed a voucher for **${voucher.amount} coins**! Your new balance is **${newBalance} coins**.`);

        await interaction.reply({ embeds: [embed] });
    },
};
