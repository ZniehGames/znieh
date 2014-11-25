import Turn from '../model/Turn';
import Unit from '../model/Unit';

class TurnController {

    construct() {
        this.turn = new Turn(0);
        this.previousTurns = [];

    }

    nextTurn() {
      this.previousTurns.push(this.turn);
      this.turn = new Turn(this.turn.number++);
    }

}

export default TurnController;
