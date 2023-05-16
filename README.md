# Melodroid 
<p align="center">
  <img src="https://github.com/AGiljanovic/MeloDroid/blob/master/public/imgs/logo1.png" width="250" height="250"> 
</p>
<p align="center">
Enjoy listening to music together with your friends with MeloDroid.
  </p>


## Commands

| Command | Description | Command | Description |
| --- | --- | --- | --- |
| :arrow_forward: `play [song/URL]` | Play a specific song or a YouTube URL | :arrow_backward: `back` | Play the previous song |
| :bar_chart: `dashboard` | Display bot's status and statistics | :question: `help` | List all available commands |
| :door: `leave` | Make the bot leave the voice channel | :repeat: `loop` | Loop the current song or the queue |
| :notes: `nowplaying` | Display the currently playing song | :pause_button: `pause` | Pause the currently playing song |
| :ping_pong: `ping` | Check the bot's latency | :hourglass: `progress` | Show the progress of the current song |
| :musical_score: `queue` | Display the current song queue | :x: `remove [number]` | Remove a specific song from the queue |
| :arrow_heading_down: `resume` | Resume the paused song | :floppy_disk: `save` | Save the current queue for future |
| :mag: `search [song]` | Search for a song on YouTube | :globe_with_meridians: `server` | Display info about the current server |
| :twisted_rightwards_arrows: `shuffle` | Shuffle the current song queue | :fast_forward: `skip` | Skip the currently playing song |
| :white_check_mark: `status` | Check the bot's status | :sound: `volume [1-100]` | Adjust the volume of the bot |
<br>

## Getting Started
Before you can use Melodroid, you'll need to create a Discord bot and add it to your server.

1. **Create a Discord bot:** Follow the instructions in this [guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot) to create your own Discord bot.

2. **Add the bot to your server:** Once your bot is created, you can invite it to your server by following the steps in this [tutorial](https://discordjs.guide/preparations/adding-your-bot-to-servers.html#bot-invite-links).


After you have set up your bot and invited it to your server, you can proceed with the installation of Melodroid:

```bash
Clone the Repository:
git clone https://github.com/AGiljanovic/MeloDroid

Install the dependencies
`npm install`

Adjust the environemnt
`TOKEN = "your_bot_token"
BOT_NAME = "MeloDroid"
PREFIX = "/"
PLAYING = "/help | music"
EMBEDS_COLOR = "#FFFFFF"
DEFAULT_VOLUME = 50
MAX_VOLUME = 100
AUTO_LEAVE = true
AUTO_LEAVE_COOLDOWN = 5000
DISPLAY_VOICE_STATE = true
PORT = 33333
TEST_CHANNEL_ID = "channel_id"
TEST_TEXT_CHANNEL_ID = "text_channel_id"
TEST_VOICE_CHANNEL_ID = "test_voice_channel"
TEST_USER_ID = "test_user_id"
TEST_YOUTUBE_URL = "test_yt_url"

TEXT_QUERY_TYPE = "youtubeSearch"
URL_QUERY_TYPE = "auto"
DP_FORCE_YTDL_MOD = "play-dl"`
```
<br>

## License
Melodroid is released under the MIT License.

