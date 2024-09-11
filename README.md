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
1. Clone the repository or choose a release from .
2. Install dependencies: `npm install`
3. Rename the `example.env` to `.env`
4. Add your credentials to a `.env` file:
    ```
    DISCORD_BOT_TOKEN=  
    CLIENT_ID=   
    GUILD_ID= 
    PATEBIN_API=   
    GPLINKS_API=   
    ```
5. Deploy commands using: `node deploy.js`
6. Start the bot: `node index.js`

---
