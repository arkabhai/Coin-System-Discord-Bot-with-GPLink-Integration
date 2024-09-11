const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('topcoin')
        .setDescription('Displays the top 10 users with the most coins.'),

    async execute(interaction, db) {
        // Fetch all keys from the database
        const allUsers = await db.all(); // Retrieves all entries

        if (allUsers.length === 0) {
            return interaction.reply('No users found with any coins.');
        }

        // Filter out non-coin data and sort users by their coin balance in descending order
        const leaderboard = allUsers
            .filter(user => user.id.startsWith('coins_')) // Only get coin-related keys
            .sort((a, b) => b.value - a.value) // Sort in descending order by coin value
            .slice(0, 10); // Get top 10 users

        // Format the leaderboard into a readable string
        const leaderboardString = leaderboard.map((entry, index) => {
            const userId = entry.id.replace('coins_', '');
            const coins = entry.value;
            const user = interaction.guild.members.cache.get(userId);
            const username = user ? user.user.username : `User ID: ${userId}`;
            return `**#${index + 1}** - ${username}: ${coins} coins`;
        }).join('\n');

        // Create an embed message to display the leaderboard
        const leaderboardEmbed = new EmbedBuilder()
            .setTitle('🏆 Coin Leaderboard')
            .setDescription(leaderboardString)
            .setColor(0xff0000) // Red color
            .setTimestamp();

        await interaction.reply({ embeds: [leaderboardEmbed] });
    }
};
