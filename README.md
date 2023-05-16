# Melodroid 

Enjoy listening to music together with your friends with MeloDroid. ~Now equipped with automated software testing!

## Commands

- `play [song/URL]`: Play a specific song or a YouTube URL. If a song is already playing, the requested song will be added to the queue.
- `back`: Play the previous song in the queue.
- `dashboard`: Display the bot's status and statistics.
- `help`: List all available commands or get detailed information about a specific command.
- `leave`: Make the bot leave the voice channel.
- `loop`: Loop the current song or the entire queue.
- `nowplaying`: Display information about the currently playing song.
- `pause`: Pause the currently playing song.
- `ping`: Check the bot's latency.
- `progress`: Show the progress of the currently playing song.
- `queue`: Display the current song queue.
- `remove [number]`: Remove a specific song from the queue.
- `resume`: Resume the paused song.
- `save`: Save the current queue for future listening.
- `search [song]`: Search for a song on YouTube.
- `server`: Display information about the current server.
- `shuffle`: Shuffle the current song queue.
- `skip`: Skip the currently playing song.
- `status`: Check the bot's status.
- `volume [1-100]`: Adjust the volume of the bot.

## Getting Started
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

## License
Melodroid is released under the MIT License.

