export default {
    api: $PROCESS_ENV_SYMFONY__BASE__URL || 'http://api.znieh.dev',
    gameserver: $PROCESS_ENV_GS_URL || 'http://gs.znieh.dev'
}
