const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addcoin')
        .setDescription('Adds coins to a user.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to add coins to')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('The amount of coins to add')
                .setRequired(true)),
    
    async execute(interaction, db) {
        // Check if the user has Administrator permission
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        const user = interaction.options.getUser('user');
        const amount = interaction.options.getInteger('amount');

        if (amount <= 0) {
            return interaction.reply({ content: 'Please provide a positive number of coins to add.', ephemeral: true });
        }

        const currentBalance = await db.get(`coins_${user.id}`) || 0;
        await db.set(`coins_${user.id}`, currentBalance + amount);

        await interaction.reply(`${user.username} has been given ${amount} coins! They now have ${currentBalance + amount} coins.`);
    }
};
