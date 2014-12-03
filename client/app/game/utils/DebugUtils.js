'use strict';

class DebugUtils {

	constructor(options){
		this.debug = options.debug;
	}

	print(message)
	{
		if(this.debug) {
			console.log(message);
		}
	}

	isDebug()
	{
		if(this.debug) {
			return true;
		}
		return false;
	}

}

export default DebugUtils;