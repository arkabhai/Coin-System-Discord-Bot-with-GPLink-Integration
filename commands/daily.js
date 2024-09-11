const { SlashCommandBuilder } = require('@discordjs/builders');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('daily')
        .setDescription('Claim your daily reward of coins!'),
    
    async execute(interaction) {
        const userId = interaction.user.id;
        const now = Date.now();

        // Check if the user has already claimed their daily reward
        const lastClaimed = await db.get(`daily_${userId}`);
        const cooldown = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

        if (lastClaimed && now - lastClaimed < cooldown) {
            const remainingTime = cooldown - (now - lastClaimed);
            const hours = Math.floor(remainingTime / (1000 * 60 * 60));
            const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));

            return interaction.reply({
                content: `⏳ You have already claimed your daily reward! Come back in ${hours}h ${minutes}m.`,
                ephemeral: false, // Make this response public
            });
        }

        // Set the reward amount
        const dailyReward = 10; // You can adjust this amount

        // Add coins to the user's balance
        let currentCoins = await db.get(`coins_${userId}`);
        if (!currentCoins) currentCoins = 0;
        await db.set(`coins_${userId}`, currentCoins + dailyReward);

        // Update the last claimed time
        await db.set(`daily_${userId}`, now);

        // Send success message
        return interaction.reply({
            content: `🎉 **${interaction.user.username}** has claimed their daily reward of ${dailyReward} coins!`,
            ephemeral: false, // Make this response public
        });
    }
};
