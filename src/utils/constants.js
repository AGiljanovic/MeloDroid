const { QueryType } = require('discord-player');


/**
 * Constants variables
 */
const cst = {
    // Dashboard button config
    button: {
        play        : '<:w_play:1106270709644271656>',
        pause       : '<:w_pause:1106270708243386428>',
        skip        : '<:w_skip:1106270714664849448>',
        back        : '<:w_back:1106270704049061928>',
        stop        : '<:w_stop:1106272001909346386>',
        loop        : '<:w_loop:1106270705575792681>',
        shuffle     : '<:w_shuffle:1106270712542531624>',
    },
    // Default config
    config: {
        name                : 'MeloDroid',
        prefix              : '+',
        playing             : '+help | music',
        defaultVolume       : 50,
        maxVolume           : 100,
        autoLeave           : true,
        autoLeaveCooldown   : 5000,
        displayVoiceState   : true,
        port                : 33333,
        urlQuery            : QueryType.AUTO,
        textQuery           : QueryType.AUTO
    },
    ytdlOptions: {
        filter          : 'audioonly',
        quality         : 'highestaudio',
        highWaterMark   : 1 << 27
    },
    color: {
        white   : '\x1B[0m',
        grey    : '\x1B[2m',
        green   : '\x1B[32m',
        cyan    : '\x1B[36m'
    },
    // discord-player@6.3.0 requires manually setting the ffmpeg path
    ffmpegPath: require('@ffmpeg-installer/ffmpeg')
};

module.exports = cst;