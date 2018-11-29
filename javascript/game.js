exports = typeof window !== "undefined" && window !== null ? window : global;

class Player {
  constructor(name) {
    this.name = name;
    this.purse = 0;
    this.inPenaltyBox = false;
    this.place = 0;
  }

  getName() {
    return this.name;
  }

  addCoinToWallet() {
    console.log('Answer was correct!!!!');
    this.purse += 1;
    console.log(this.name + " now has " +
      this.purse + " Gold Coins.");
  }

  setPlace(steps) {
    this.place += steps;
    if (this.place > 11) {
      this.place = this.place - 12;
    }
    console.log(this.name + "'s new location is " + this.place);
  }

  moveToPenaltyBox() {
    this.inPenaltyBox = true;
  }

  moveOutOfPenaltyBox() {
    this.inPenaltyBox = false;
  }

  hasNotWon() {
    return !(this.purse == 6)
  }


}


class Game {
  constructor() {
    this.players = new Array();
    this.popQuestions = new Array();
    this.scienceQuestions = new Array();
    this.sportsQuestions = new Array();
    this.rockQuestions = new Array();
    this.currentPlayer = 0;
    this.isGettingOutOfPenaltyBox = false;
    this.populateQuestions();
  }

  populateQuestions() {
    for (var i = 0; i < 50; i++) {
      this.popQuestions.push(this.createQuestion("Pop", i));
      this.scienceQuestions.push(this.createQuestion("Science", i));
      this.sportsQuestions.push(this.createQuestion("Sports", i));
      this.rockQuestions.push(this.createQuestion('Rock', i));
    };
  }

  get currentCategory() {
    let player = this.players[this.currentPlayer];
    if (/^0$|^4$|^8$/g.test(player.place)) {
      return 'Pop';
    } else if (/^1$|^5$|^9$/g.test(player.place)) {
        return 'Science';
    } else if (/^2$|^6$|^10$/g.test(player.place)) {
        return 'Sports';
    } else {
        return 'Rock';
    }
  };

  moveToNextPlayer() {
    this.currentPlayer += 1;
    if (this.currentPlayer == this.players.length)
      this.currentPlayer = 0;
  }

  createQuestion(qType, index) {
    return `${qType} Question ${index}`;
  };

  isPlayable(howManyPlayers) {
    return howManyPlayers >= 2;
  };

  addPlayer(player) {
    this.players.push(player);
    console.log(player.getName() + " was added");
    console.log("They are player number " + this.players.length);
  };

  howManyPlayers() {
    return this.players.length;
  };


  askQuestion() {
    switch (this.currentCategory) {
      case 'Pop': {
        console.log(this.popQuestions.shift());
        break;
      }
      case 'Science': {
        console.log(this.scienceQuestions.shift());
        break;
      }
      case 'Sports': {
        console.log(this.sportsQuestions.shift());
        break;
      }
      case 'Rock': {
        console.log(this.rockQuestions.shift());
        break;
      }
    }
  };

  roll(roll) {
    let player = this.players[this.currentPlayer];
    console.log(player.name + " is the current player");
    console.log("They have rolled a " + roll);

    if (player.inPenaltyBox) {
      if (roll % 2 !== 0) {
        this.isGettingOutOfPenaltyBox = true;
        console.log(player.name + " is getting out of the penalty box");
        player.moveOutOfPenaltyBox();
        player.setPlace(roll);
        console.log("The category is " + this.currentCategory);
        this.askQuestion();
      } else {
        console.log(player.name + " is not getting out of the penalty box");
        this.isGettingOutOfPenaltyBox = false;
      }
    } else {
      player.setPlace(roll)
      console.log("The category is " + this.currentCategory);
      this.askQuestion();
    }
  };

  wasCorrectlyAnswered() {
    let player = this.players[this.currentPlayer];
    if (player.inPenaltyBox && !this.isGettingOutOfPenaltyBox) {
      return true;
    } else {
      player.addCoinToWallet();
      return player.hasNotWon();
    }
  };

  wrongAnswer() {
    let player = this.players[this.currentPlayer];
    console.log('Question was incorrectly answered');
    console.log(player.name + " was sent to the penalty box");
    player.moveToPenaltyBox();
    return true;
  };
};

module.exports = {
  Player,
  Game
}

var notAWinner = false;

var game = new Game();
game.addPlayer(new Player('Chet'));
game.addPlayer(new Player('Pat'));
game.addPlayer(new Player('Sue'));

do {
  game.roll(Math.floor(Math.random() * 6) + 1);
  if (Math.floor(Math.random() * 10) == 7) {
    notAWinner = game.wrongAnswer();
  } else {
    notAWinner = game.wasCorrectlyAnswered();
  }
  if (notAWinner) {
    game.moveToNextPlayer();
  }
} while (notAWinner);
