const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removecoin')
        .setDescription('Removes coins from a user.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to remove coins from')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('The amount of coins to remove')
                .setRequired(true)),
    
    async execute(interaction, db) {
        // Check if the user has Administrator permission
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        const user = interaction.options.getUser('user');
        const amount = interaction.options.getInteger('amount');

        if (amount <= 0) {
            return interaction.reply({ content: 'Please provide a positive number of coins to remove.', ephemeral: true });
        }

        const currentBalance = await db.get(`coins_${user.id}`) || 0;
        if (currentBalance < amount) {
            return interaction.reply({ content: `${user.username} does not have enough coins to remove that amount.`, ephemeral: true });
        }

        await db.set(`coins_${user.id}`, currentBalance - amount);

        await interaction.reply(`${amount} coins have been removed from ${user.username}. They now have ${currentBalance - amount} coins.`);
    }
};
