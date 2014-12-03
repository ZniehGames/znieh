'use strict';

class PlacementUtils {

  constructor(stateGame) {
    this.stateGame = stateGame;

    this.finish = false;
    this.restToPlace = null;
    this.nbToPlace = null;
    this.isPlaced = null;
  }

  init(options){

    // we get the side from options in Game.App
    this.side = options.side;
    // this correspond to the middle of the map
    this.mapLimit = this.stateGame.map.width/2;
    //we get the team from API
	this.myTeamUnits = this.stateGame.game.cache.getJSON('team')[0].units;

	// init for placement
	this.restToPlace = this.myTeamUnits.length;
	this.stateGame.debugUtils.print(this.myTeamUnits);
	
	this.isPlaced = new Array(this.myTeamUnits.length);
	for(var cpt = 0; cpt < this.isPlaced.length; cpt++) {
		this.isPlaced[cpt] = false;
	}

	// we put the first of my unit for placement
	this.nbToPlace = 0;
  }

  setNbToPlace(num){
  	this.nbToPlace = num;
  }

  getUnitToPlace(){
  	return this.myTeamUnits[this.nbToPlace];
  }

  goOnPlacement(){
  	//we decrease the number of units to place
	this.restToPlace -= 1;
	if(this.restToPlace === 0)
	{
	    this.finish = true;
	    this.stateGame.mapUtils.removeEventListenerToMapPlacement();
	    this.stateGame.spriteUtils.setListenerSelectToAllUnits();
		this.isPlaced[this.nbToPlace] = true;	
	    
	    this.stateGame.debugUtils.print('le placement est fini !');
	}
	else{
		// we check every unit of the team
	    this.isPlaced[this.nbToPlace] = true;
	    
	    this.stateGame.debugUtils.print(this.isPlaced);
	    
	    for(var cpt = 0; cpt < this.isPlaced.length; cpt++) {
	    	this.stateGame.debugUtils.print(this.isPlaced[cpt]);
    		if(this.isPlaced[cpt] === false){
	    		this.nbToPlace = cpt;
	    		this.stateGame.debugUtils.print(this.nbToPlace);
	    		break;
	    	}
	    }
	}
  }




}

export default PlacementUtils;