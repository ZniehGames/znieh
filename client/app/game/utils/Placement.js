'use strict';

import Debugger from '../utils/Debugger';
import PositionChecker from '../utils/PositionChecker';
import CreationSprite from '../utils/CreationSprite';
import Map from '../utils/Map';

class Placement {

  constructor(stateGame, debug) {
    this.debugUtils = new Debugger({'debug' : debug});
    this.positionUtils = new PositionChecker(debug);
    this.mapUtils = new Map(stateGame, debug);
    this.spriteUtils = new CreationSprite(stateGame, debug);
        

    this.finish = false;
    this.restToPlace = null;
    this.nbToPlace = null;
    this.isPlaced = null;
  }

  init(side, map, game, layer, spriteGroup, selectedSprite, spriteLists){

    // we get the side from options in Game.App
    this.side = side;
    // this correspond to the limit of real side
    if(this.side === 'left'){
    	this.mapLimit = map.width/3;
    }
    else{
    	this.mapLimit = map.width - map.width/3;	
    }
    //we get the team from API
  	this.myTeamUnits = game.cache.getJSON('team')[0].units;

  	// init for placement
  	this.restToPlace = this.myTeamUnits.length;
  	this.debugUtils.print(this.myTeamUnits);
  	
  	this.isPlaced = new Array(this.myTeamUnits.length);
  	for(var cpt = 0; cpt < this.isPlaced.length; cpt++) {
  		this.isPlaced[cpt] = false;
  	}

  	// we put the first of my unit for placement
  	this.nbToPlace = 0;

    this.randomizePlacement(game,layer, spriteGroup, selectedSprite, spriteLists);
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

  goOnPlacement(game, layer, spriteGroup, selectedSprite, spriteLists){
  	//we decrease the number of units to place
  	this.restToPlace -= 1;
  	if(this.restToPlace === 0)
  	{
      this.finish = true;
      this.mapUtils.removeEventListenerToMapPlacement(game);
      this.spriteUtils.setListenerSelectToAllUnits(game, layer, spriteGroup, selectedSprite, spriteLists);
      this.isPlaced[this.nbToPlace] = true;	
  	    
  	    this.debugUtils.print('le placement est fini !');
  	}
  	else{
  		// we check every unit of the team
      this.isPlaced[this.nbToPlace] = true;

      this.debugUtils.print(this.isPlaced);

      for(var cpt = 0; cpt < this.isPlaced.length; cpt++) {
      	this.debugUtils.print(this.isPlaced[cpt]);
      	if(this.isPlaced[cpt] === false){
      		this.nbToPlace = cpt;
      		this.debugUtils.print(this.nbToPlace);
      		break;
      	}
      }
  	}
  }

  randomizePlacement(game, layer, spriteGroup, selectedSprite, spriteLists){

    while(this.finish === false){

      var x = game.rnd.integerInRange(0, 780);
      var y = game.rnd.integerInRange(0, 440);
      var pointer = {'x' : x, 'y' : y};  

      // We check if a sprite is not under the pointer
      // Seems to not works the same way..
      if(this.positionUtils.isUnitUnder(game, layer, spriteGroup, pointer).unitUnder) {
          this.debugUtils.print('there is a unit under this point...');
      }
      else {
      // We take the tile selected for ckeck collision and get his position  
          var tile = this.positionUtils.getTileUnderPosition(layer, pointer.x, pointer.y);           
          if(this.canPlace(tile.x, tile.collides)) {
              this.spriteUtils.addSpriteWorld(game, tile.x, tile.y, tile.worldX, tile.worldY, this.getUnitToPlace());
              
              this.debugUtils.print(tile.x + ' x and y ' + tile.y);  

              //we decrease the number of units to place
              this.goOnPlacement(game, layer, spriteGroup, selectedSprite, spriteLists);
          }
      }
    }
  }


}

export default Placement;