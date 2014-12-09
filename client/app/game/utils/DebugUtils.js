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

	sleep(milliseconds) {
		var start = new Date().getTime();
		while(true) {
			if ((new Date().getTime() - start) > milliseconds){
			  break;
			}
		}
	}

}

export default DebugUtils;