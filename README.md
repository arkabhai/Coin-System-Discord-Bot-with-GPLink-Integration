Here’s an updated project description that includes the GPLink feature:

---

# 🪙 Coin System Discord Bot with GPLink Integration

A feature-rich Discord bot that manages a coin-based reward system, integrated with GPLink for URL shortening. Users can earn, send, and manage coins through various commands, offering an interactive and engaging experience for server members.

## Features
- **🤑 Daily Rewards**: Users can claim daily coins and accumulate wealth over time.
- **💸 Coin Transfers**: Users can send coins to each other, enabling peer-to-peer transactions.
- **🏆 Leaderboard**: A leaderboard showcasing the top coin holders in the server.
- **🔧 Admin Tools**: Commands for administrators to add or remove coins from any user’s balance.
- **📊 Coin Tracking**: Keeps track of each user’s coin balance with real-time updates.
- **🔗 GPLink Integration**: Automatically generates and shortens voucher URLs via GPLink.
- **🎉 Invite-based Rewards (Optional)**: Earn coins by inviting users to the server (can be toggled off).

## Commands
- `/daily` - Claim your daily coins.
- `/send-coin` - Send coins to other users.
- `/add-coin` - Admins can add coins to a user's balance.
- `/remove-coin` - Admins can remove coins from a user's balance.
- `/leaderboard` - Displays the top coin holders in the server.
- `/balance` - Check your own or another user’s coin balance.
- `/claim` - Generates a voucher for coins and shares a GPLink-shortened URL.
  
## Technologies
- **Node.js**: The core platform powering the bot.
- **Discord.js v14**: The library used for interacting with Discord’s API.
- **QuickDB**: A simple and efficient database solution for tracking user coins.
- **GPLink API**: Used to shorten URLs for voucher claims, creating a clean and user-friendly link.

## Setup
1. Clone the repository.
2. Install dependencies: `npm install`
3. Add your credentials to a `.env` file:
    ```
    DISCORD_TOKEN=your-bot-token
    GP_LINK_API_KEY=your-gplink-api-key
    ```
4. Deploy commands using: `node deploy.js`
5. Start the bot: `node index.js`

## License
This project is licensed under the MIT License.

---

This now includes the GPLink feature that shortens voucher URLs. Let me know if you'd like to adjust anything else!
