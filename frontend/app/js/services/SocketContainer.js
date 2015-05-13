import config from '../config'

var _io = io.connect(config.gameserver);

export default {
  get: () => _io
}
