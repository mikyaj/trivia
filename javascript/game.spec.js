const { Game, Player } = require('./game.js');

describe("The test environment", function () {
  it("should access player", function () {
    expect(Player).toBeDefined();
  });

  it("should access game", function () {
    expect(Game).toBeDefined();
  });
});

describe("The new player", function () {
  const player = new Player("mudasser");
  it("should be created with a name", function () {
    expect(player.name).toBe("mudasser");
  });
  it("should have 0 coins in his purse", function () {
    expect(player.purse).toBe(0);
  });
  it("should be out of penalty box by default", function () {
    expect(player.inPenaltyBox).toBe(false);
  });
  it("should be on place 0", function () {
    expect(player.place).toBe(0);
  });
});

describe("A player", function () {
  it("should go to new place, provided by roll", function () {
    let player = new Player("mudasser");
    player.place = 3;
    player.setPlace(3);
    expect(player.place).toBe(6);

  });
  it("should go back 12 places, if his new place is greater than 11", function () {
    let player = new Player("mudasser");
    player.place = 10;
    player.setPlace(5);
    expect(player.place).toBe(3);
  });
  it("should be able to go out of penalty box", function () {
    let player = new Player("mudasser");
    player.inPenaltyBox = true;
    player.moveOutOfPenaltyBox();
    expect(player.inPenaltyBox).toBe(false);
  });
  it("should be able to get a coin in his purse", function () {
    let player = new Player("mudasser");
    player.addCoinToWallet();
    expect(player.purse).toBe(1);
  });
});

describe("In Game", function () {
  it("adding a player should put 1 player in players list", function () {
    let game = new Game();
    game.addPlayer(new Player("mudasser"));
    expect(game.players.length).toBe(1);
  });

  describe("when roll is called", function () {
    describe("and current player is already in penality box", function () {
      it("and if roll value is an odd number then current player will move out of penality box and roll value will be added to his new location and question will be asked", function () {
        var game = new Game();
        var player = new Player("mudasser");
        player.inPenaltyBox = true;
        game.addPlayer(player);
        game.roll(1);
        expect(player.inPenaltyBox).toBe(false);
        expect(player.place).toBe(1);
        expect(game.scienceQuestions.length).toBe(49);
      });
      it("and if roll value is an even number then current player will not move out of penality box", function () {
        var game = new Game();
        var player = new Player("mudasser");
        player.inPenaltyBox = true;
        game.addPlayer(player);
        game.roll(2);
        expect(player.inPenaltyBox).toBe(true);
        expect(player.place).toBe(0);
        expect(game.sportsQuestions.length).toBe(50);
      });
    });
    describe("and current player is not in penality box", function () {
      it("then player will move to new place and question will be asked", function () {
        var game = new Game();
        var player = new Player("mudasser");
        player.inPenaltyBox = false;
        game.addPlayer(player);
        game.roll(3);
        expect(player.inPenaltyBox).toBe(false);
        expect(player.place).toBe(3);
        expect(game.rockQuestions.length).toBe(49);
      });
    })
  });
});
