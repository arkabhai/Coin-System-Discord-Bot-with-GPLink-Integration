const { SlashCommandBuilder } = require('@discordjs/builders');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('send-coin')
        .setDescription('Send coins to another user.')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user to send coins to')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('The amount of coins to send')
                .setRequired(true)),

    async execute(interaction) {
        const senderId = interaction.user.id;
        const targetUser = interaction.options.getUser('target');
        const amount = interaction.options.getInteger('amount');
        const targetId = targetUser.id;

        // Check if the sender and target are the same
        if (senderId === targetId) {
            return interaction.reply({
                content: "❌ You cannot send coins to yourself!",
                ephemeral: true
            });
        }

        // Get the sender's balance
        let senderBalance = await db.get(`coins_${senderId}`);
        if (!senderBalance) senderBalance = 0;

        // Check if the sender has enough coins
        if (senderBalance < amount) {
            return interaction.reply({
                content: `❌ You don't have enough coins! You currently have ${senderBalance} coins.`,
                ephemeral: true
            });
        }

        // Get the recipient's balance
        let targetBalance = await db.get(`coins_${targetId}`);
        if (!targetBalance) targetBalance = 0;

        // Update the balances
        await db.set(`coins_${senderId}`, senderBalance - amount);
        await db.set(`coins_${targetId}`, targetBalance + amount);

        // Send success message
        return interaction.reply({
            content: `💸 **${interaction.user.username}** has sent **${amount} coins** to **${targetUser.username}**!`,
            ephemeral: false // Make this response public
        });
    }
};
