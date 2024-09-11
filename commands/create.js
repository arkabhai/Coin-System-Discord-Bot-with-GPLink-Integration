const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create')
        .setDescription('Generate a new voucher for coins')
        .addIntegerOption(option => 
            option.setName('amount')
                .setDescription('Amount of coins in the voucher')
                .setRequired(true)),

    async execute(interaction, db) {
        // Check if the user has Administrator permission
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return interaction.reply({ content: 'You do not have permission to create vouchers!', ephemeral: true });
        }

        // Dynamically import nanoid within the async function
        const { nanoid } = await import('nanoid');
        const amount = interaction.options.getInteger('amount');
        const code = nanoid(8);

        await db.set(`voucher_${code}`, { amount });

        const embed = new EmbedBuilder()
            .setColor('Green')
            .setTitle('Voucher Created')
            .setDescription(`Voucher code: \`${code}\` has been created with **${amount} coins**!`);

        await interaction.reply({ embeds: [embed] });
    },
};
