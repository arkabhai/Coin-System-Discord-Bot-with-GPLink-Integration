const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('claim')
        .setDescription('Create a new paste with a voucher code and provide a shortened link'),

    async execute(interaction, db) {
        const { nanoid } = await import('nanoid');
        const fetch = (await import('node-fetch')).default;

        const code = nanoid(8);
        const voucherAmount = 1; // Set the amount to 1 coin

        // Defer reply to give time for the process to complete
        await interaction.deferReply({ ephemeral: true });

        await db.set(`voucher_${code}`, { amount: voucherAmount });

        const apiKeyPastebin = process.env.PATEBIN_API; // Pastebin API key
        const apiKeyGPLinks = process.env.GPLINKS_API; // Your GP Links API key
        const pasteData = `Voucher Code: ${code}\nAmount: ${voucherAmount} coin`;

        try {
            // Step 1: Create Pastebin Paste
            const pastebinResponse = await fetch('https://pastebin.com/api/api_post.php', {
                method: 'POST',
                body: new URLSearchParams({
                    api_dev_key: apiKeyPastebin,
                    api_option: 'paste',
                    api_paste_code: pasteData,
                    api_paste_private: '1',
                    api_paste_name: `Voucher Code - ${code}`,
                    api_paste_expire_date: '1H', // Set expiry to 1 hour
                }),
            });

            const pasteUrl = await pastebinResponse.text();

            // Step 2: Shorten the Pastebin link using GP Links API
            const gpLinksResponse = await fetch(`https://gplinks.in/api?api=${apiKeyGPLinks}&url=${encodeURIComponent(pasteUrl)}`, {
                method: 'GET',
            });

            const gpLinksData = await gpLinksResponse.json();

            if (!gpLinksData.shortenedUrl) {
                throw new Error('Could not shorten the Pastebin URL.');
            }

            const shortenedUrl = gpLinksData.shortenedUrl;

            // Step 3: Send the shortened link in the response
            const embed = new EmbedBuilder()
                .setColor('Purple')
                .setTitle('Voucher Claim Process Started')
                .setDescription(`A claim process has been started. Follow the link below to get your voucher:\n\n[Click here to get your voucher](${shortenedUrl})`);

            await interaction.editReply({ embeds: [embed] });

        } catch (error) {
            console.error(error);
            await interaction.editReply({ content: 'There was an error while processing your request.', ephemeral: true });
        }
    },
};
