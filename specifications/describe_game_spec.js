var game = require('../lib/game.js');

describe('jumping', function() {
  beforeEach(function() { game.reset(); });

  it("adds player if he doesn't exist", function() {
    game.up("player1");
    expect(game.players().length).toBe(1);
  });

  it("addition of player is ignored if they are already there", function() {
    game.up("player1");
    game.up("player1");
    expect(game.players().length).toBe(1);
  });

  it("velocity is set", function() {
    game.addPlayer("player1");
    game.getPlayer("player1").state = "standing";
    game.up("player1");
    expect(game.getPlayer("player1").velocity).toBe(game.jumpPower);
  });

  it("player's y position changes after jump", function() {
    game.up("player1");
    game.tick();
    expect(game.getPlayer("player1").y).toBeLessThan(0);
  });

  it("player's initial state is jumping", function() {
    game.up("player1");
    game.tick();
    expect(game.getPlayer("player1").state).toBe("jumping");
  });
});


describe('stage boundaries', function() {
  beforeEach(function() { game.reset(); });

  it("player is set to dying if the stage's left boundary is hit", function() {
    var player = game.addPlayer("player1");
    player.state = "kicking";
    player.direction = -1;
    player.y = -1000;
    player.x = 200;
    var ticksTillBorder = (player.x - game.stageBoundary.left) / game.kickDelta;
    
    for(var i = 0; i < ticksTillBorder; i++) {
      game.tick();
    }

    expect(player.state).toBe("dying");
  });

  it("player is set to dying if the stage's right boundary is hit", function() {
    var player = game.addPlayer("player1");
    player.state = "kicking";
    player.direction = 1;
    player.y = -1000;
    player.x = 1000;
    var ticksTillBorder = (game.stageBoundary.right - player.x) / game.kickDelta;
    
    for(var i = 0; i < ticksTillBorder; i++) {
      game.tick();
    }

    expect(player.state).toBe("dying");
    expect(game.players().length).toBe(0);
  });
});
