'use strict';

class Placement {

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
    // this correspond to the limit of real side
    if(this.side === 'left'){
    	this.mapLimit = this.stateGame.map.width/3;
    }
    else{
    	this.mapLimit = this.stateGame.map.width - this.stateGame.map.width/3;	
    }
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

    this.randomizePlacement();
  }

  canPlace(x, collides){
  	if(this.side === 'left' && x < this.mapLimit && collides === false) {
  		return true;
  	}
  	else if(this.side === 'right' && x > this.mapLimit && collides === false) {
  		return true;
  	}
  	else {
  		return false;
  	}
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

  randomizePlacement(){

    while(this.finish === false){

      var x = this.stateGame.game.rnd.integerInRange(0, 780);
      var y = this.stateGame.game.rnd.integerInRange(0, 440);
      var pointer = {'x' : x, 'y' : y};  

      // We check if a sprite is not under the pointer
      // Seems to not works the same way..
      if(this.stateGame.positionUtils.isUnitUnder(pointer).unitUnder) {
          this.stateGame.debugUtils.print('there is a unit under this point...');
      }
      else {
      // We take the tile selected for ckeck collision and get his position  
          var tile = this.stateGame.positionUtils.getTileUnderPosition(pointer.x, pointer.y);           
          if(this.stateGame.placementUtils.canPlace(tile.x, tile.collides)) {
              var optionsPlacement = {'placement' : { 'x' : tile.x, 'y' : tile.y, 'worldX' : tile.worldX, 'worldY' : tile.worldY, 'unit' : this.stateGame.placementUtils.getUnitToPlace()}};
              this.stateGame.spriteUtils.addSpriteWorld(optionsPlacement);
              
              this.stateGame.debugUtils.print(tile.x + ' x and y ' + tile.y);  

              //we decrease the number of units to place
              this.stateGame.placementUtils.goOnPlacement();
          }
      }
    }
  }


}

export default Placement;