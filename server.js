(() => {
  const express = require("express");
  const bodyParser = require("body-parser");
  const ws = require("ws");
  const app = express();
  const fs = require("fs");
  const fetch = require("node-fetch");
  const { encode, decode } = require("@msgpack/msgpack");

  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json());

  app.use(express.static("public"));

  var users = [];

  function radToDeg(radians) {
    var pi = Math.PI;
    return radians * (180 / pi);
  }
  var leaderboard = [];

  var mapSize = 10000;
  var desertHeight = 1000;
  var snowHeight = 6000;
  var riverHeight = 1000;
  var beachHeight = 1000;
  var playerSpeed = 1;
  var chatMessages = {};
  var inRiver = false;
  let ip = "Error...";

  function isfacing(p1, p2, angle, addition = 25) {
    let exact = Math.atan2(p2.y - p1.y, p2.x - p1.x);
    exact = radToDeg(exact);
    let add = addition / 2;
    let maxplus = exact + add;
    let maxminus = exact - add;
    if (angle > maxminus && angle < maxplus) {
      return true;
    } else {
      return false;
    }
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  Array.prototype.removeItem = function (value) {
    var index = this.indexOf(value);
    if (index > -1) {
      this.splice(index, 1);
    }
    return this;
  };

  var animalsCache = [];
  var treesCache = [];
  var objCache = [
    {
      id: 6,
      x: 5000,
      y: 5000,
      dir: 0,
      oid: 100,
      health: 500,
      maxHealth: 500,
      xWiggle: 0,
      yWiggle: 0,
    },
  ];
  for (let k = 0; k < 18; k++) {
    var object = {
      x: h(k),
      y: m(k),
      dir: Math.random(),
      id: 4,
      xWiggle: 0,
      yWiggle: 0,
    };
    treesCache.push(object);

    function h(num) {
      if (num === 0) {
        return 5300;
      }
      if (num === 1) {
        return 4500;
      }
      if (num === 2) {
        return 4593;
      }
      if (num === 3) {
        return 5243;
      }
      if (num === 4) {
        return 4523;
      }
      if (num === 5) {
        return 4609;
      }
      if (num === 6) {
        return 4700;
      }
      if (num === 7) {
        return 4735;
      }
      if (num === 8) {
        return 4842;
      }
      if (num === 9) {
        return 4894;
      }
      if (num === 10) {
        return 4991;
      }
      if (num === 11) {
        return 5146;
      }
      if (num === 11) {
        return 5060;
      }
      if (num === 12) {
        return 5059;
      }
      if (num === 13) {
        return 5187;
      }
      if (num === 14) {
        return 5275;
      }
    }

    function m(num) {
      if (num === 0) {
        return 9520;
      }
      if (num === 1) {
        return 9500;
      }
      if (num === 2) {
        return 9345;
      }
      if (num === 3) {
        return 9369;
      }
      if (num === 4) {
        return 9648;
      }
      if (num === 5) {
        return 9789;
      }
      if (num === 6) {
        return 9239;
      }
      if (num === 7) {
        return 9887;
      }
      if (num === 8) {
        return 9189;
      }
      if (num === 9) {
        return 9940;
      }
      if (num === 10) {
        return 9171;
      }
      if (num === 11) {
        return 9219;
      }
      if (num === 12) {
        return 9924;
      }
      if (num === 12) {
        return 9996;
      }
      if (num === 13) {
        return 9839;
      }
      if (num === 14) {
        return 9684;
      }
    }
  }
  //Make moofie cage lol
  treesCache.push(object);

  for (let j = 0; j < 8; j++) {
    for (let i = 0; i < mapSize / 50; i++) {
      var randomx = randomInt(0, mapSize);
      var randomy = randomInt(0, mapSize);
      //map is 6:1 ratio
      if (randomy <= 0 || randomy >= 0) {
        // remove from whole map
        if (j == 6) continue;
      }
      if (randomy < 1000) {
        // remove from snow biome
        if (j == 0 || j == 2 || j == 5 || j == 7) continue;
      }
      if (randomy < 7000) {
        // remove from snow biome grass and snow
        if (j == 7) continue;
      }
      if (randomy > 1000) {
        // remove from snow biome down
        if (j == 3 || j == 1) continue;
      }
      //remove for river
      if (
        randomy > mapSize - desertHeight - riverHeight - 100 &&
        randomy < mapSize - desertHeight + 100
      ) {
        if (j == 2 || j == 0 || j == 3 || j == 1 || j == 5 || j == 7) continue;
      }
      //remove form above river
      if (randomy > mapSize - desertHeight - 100) {
        if (j == 2 || j == 0 || j == 3 || j == 1) continue;
      }
      //remove from dessert
      if (
        randomy > mapSize - desertHeight - riverHeight - beachHeight - 100 &&
        randomy < mapSize - desertHeight - riverHeight + 100
      ) {
        if (j == 2 || j == 0 || j == 3 || j == 1) continue;
      }
      var object = {
        x: randomx,
        y: randomy,
        dir: Math.random(),
        id: j,
        xWiggle: 0,
        yWiggle: 0,
      };
      if (treesCache.filter((x) => x && dist(object, x) < 200).length > 0)
        continue;
      treesCache.push(object);
    }
  }

  treesCache.push({
    x: 4884,
    y: 9556,
    dir: Math.random(),
    id: 3,
    xWiggle: 0,
    yWiggle: 0,
  });

  animalsCache.push({
    id: 0,
    speed: 3,
    x: 5000,
    y: 5000,
    dir: 0,
    health: 100,
    xVel: 0,
    yVel: 0,
  });

  var animals = [
    {
      id: 0,
      count: 10,
      aggresive: false,
      name: "Cow",
      speed: 5,
      health: 100,
      maxHealth: 100,
    },
  ];
  animals.forEach((a) => {
    for (let i = 0; i < a.count; i++) {
      var animal = {
        id: a.id,
        speed: a.speed,
        x: randomInt(0, mapSize),
        y: randomInt(0, mapSize),
        dir: 0,
        health: 100,
        xVel: 0,
        yVel: 0,
      };
      animalsCache.push(animal);
    }
  });
  console.log(animalsCache);

  var defaultReload = 500;
  var weapons = [
    {
      id: 0,
      isWeapon: true,
      name: "Tool Hammer",
      reload: 450,
      damage: 25,
      range: 95,
      fov: 160,
      gather: 1,
    },
    {
      id: 1,
      isWeapon: false,
      name: "Orange",
      cost: {
        food: 10,
      },
      heal: 20,
    },
    {
      id: 2,
      isWeapon: false,
      placeable: true,
      placeInRiver: false,
      name: "Spike",
      cost: {
        wood: 10,
        stone: 5,
      },
      damage: 20,
      velocity: 20,
      health: 300,
      oid: 0,
      maxHealth: 300,
    },
    {
      id: 3,
      isWeapon: false,
      placeable: true,
      placeInRiver: false,
      name: "Wall",
      cost: {
        wood: 20,
      },
      damage: 0,
      velocity: 2,
      health: 250,
      maxHealth: 250,
    },
    {
      id: 4,
      isWeapon: false,
      placeable: true,
      placeInRiver: false,
      name: "Booster",
      cost: {
        wood: 10,
        stone: 20,
      },
      damage: 0,
      velocity: 0,
      health: 200,
      maxHealth: 200,
    },
    {
      id: 5,
      isWeapon: false,
      placeable: true,
      placeInRiver: false,
      name: "Trap",
      cost: {
        wood: 20,
        stone: 5,
      },
      damage: 0,
      velocity: -2,
      health: 200,
      maxHealth: 200,
    },
    {
      id: 6,
      isWeapon: false,
      placeable: true,
      placeInRiver: false,
      teleport: true,
      name: "TeleportPad",
      cost: {
        wood: 50,
        stone: 50,
      },
      damage: 0,
      velocity: -2,
      health: 50,
      maxHealth: 200,
    },
    {
      id: 7,
      isWeapon: true,
      name: "Short Sword",
      reload: 400,
      damage: 35,
      range: 110,
      fov: 160,
      gather: 1,
    },
  ];

  app.get("/", (req, res) => {
    console.log("New User Appeared!");
    ip = req.headers["x-forwarded-for"].split(",").shift();
    res.sendFile(__dirname + "/views/index.html");
  });

  app.get("/api/players", (req, res) => {
    res.json({
      players: players.length,
    });
  });

  function dist(p1, p2) {
    return Math.sqrt(Math.pow(p1.y - p2.y, 2) + Math.pow(p1.x - p2.x, 2));
  }

  const wsServer = new ws.Server({
    noServer: true,
    maxPayload: 512,
  });

  var players = [];
  var ids = 0;
  
 function test(x, y, x2, y2) {
    x = Math.round(x);
    y = Math.round(y);
    x2 = Math.round(x2);
    y2 = Math.round(y2);
    
    let xTouching;
    let yTouching;
    for (let i = x; i <= 50 + x; i++) {
      if (i === x2) {
        xTouching = true;
      }
    }
    for (let i = x; i >= -50 - x; i--) {
      if (i === x2) {
        xTouching = true;
      }
    }
    for (let i = y; i <= 50 + y; i++) {
      if (i === y2) {
        yTouching = true;
      }
    }
    for (let i = y; i >= -50 - y; i--) {
      if (i === y2) {
        yTouching = true;
      }
    }
    if (yTouching || xTouching) {
      return false;
    } else {
      return true;
    }
  }

  function sendHatData(player, hat) {
    if (
      player.resources.gold >= player.hats[hat].gold &&
      player.resources.ruby >= player.hats[hat].ruby &&
      !player.hats[hat].owned
    ) {
      player.resources.gold -= player.hats[hat].gold;
      player.resources.ruby -= player.hats[hat].ruby;
      player.hats[hat].owned = true;
      player.hat = hat || 0;
    } else if (player.hats[hat].owned) {
      player.hat = hat || 0;
    }
  }

  function sendWepData(player, wep) {
    if (player.age <= 2) {
      player.wep = wep || 0;
      player.upgrade = true;
    }
  }

  function sendAccData(player, acc) {
    if (
      player.resources.gold >= player.accs[acc].gold &&
      player.resources.ruby >= player.accs[acc].ruby &&
      !player.accs[acc].owned
    ) {
      player.resources.gold -= player.accs[acc].gold;
      player.resources.ruby -= player.accs[acc].ruby;
      player.accs[acc].owned = true;
      player.acc = acc || 0;
    } else if (player.accs[acc].owned) {
      player.acc = acc || 0;
    }
  }

  function respawn(player, name, skin) {
    player.PlayerOldX = player.x;
    player.PlayerOldY = player.y;
    player.noHurtTime = 200;
    player.skin = skin || 0;
    player.name = name;
    player.ip = ip;
    player.sid = player.sid || ++ids;
    player.spawned = true;
    player.age = 1;
    player.x = randomInt(0, mapSize);
    player.y = randomInt(0, mapSize);
    player.health = 100;
    player.weapons = [0, 1, 2, 3, 4, 5, 6, 7];
    player.hats = [
      {
        name: "No Hat",
        owned: true,
        gold: 0,
        ruby: 0,
      },
      {
        name: "Barbarian Hat",
        owned: false,
        gold: 0,
        ruby: 0,
      },
      {
        name: "Booster Hat",
        owned: false,
        gold: 1000,
        ruby: 0,
      },
      {
        name: "Soldier Hat",
        owned: false,
        gold: 4000,
        ruby: 0,
      },
      {
        name: "Fish Hat",
        owned: false,
        gold: 2500,
        ruby: 0,
      },
      {
        name: "Tank Gear",
        owned: false,
        gold: 15000,
        ruby: 0,
      },
      {
        name: "Spike Gear",
        owned: false,
        gold: 15000,
        ruby: 0,
      },
      {
        name: "X-jorgepet cap",
        owned: false,
        gold: 0,
        ruby: 0,
      },
    ];

    player.accs = [
      {
        name: "No Acc",
        owned: true,
        gold: 0,
        ruby: 0,
      },
      {
        name: "Shadow Wings",
        owned: false,
        gold: 0,
        ruby: 0,
      },
      {
        name: "God Wings",
        owned: false,
        gold: 20000,
        ruby: 0,
      },
    ];
    if (player.admin) {
      player.resources = {
        food: 1000000,
        wood: 1000000,
        stone: 1000000,
        gold: 1000000,
        ruby: 1000000,
        food2: 0,
        wood2: 0,
        cacti: 0,
      };
    } else {
      player.resources = {
        food: 100,
        wood: 100,
        stone: 100,
        gold: 100,
        ruby: 0,
        food2: 0,
        wood2: 0,
        cacti: 0,
      };
    }
  }

  var renderDistance = 1300;

  function reaching(player, enemy, max) {
    return (
      Math.sqrt(
        Math.pow(enemy.y - player.y - player.yVel * 5, 2) +
          Math.pow(enemy.x - player.x - player.xVel * 5, 2)
      ) < max
    );
  }

  function collides(p1, p2, hitbox = 60) {
    return dist(p1, p2) < hitbox + 1;
  }

  function broadcast(data, origin) {
    wsServer.clients.forEach((client) => {
      let player = client.player;
      if (player) {
        if (dist(player, origin) < renderDistance) {
          client.send(encode(data));
        }
      }
    });
  }

  setInterval(() => {
    wsServer.clients.forEach((client) => {
      let player = client.player;
      if (player) {
        var formattedLeaderboard = [];
        leaderboard.forEach((player) => {
          formattedLeaderboard.push({
            name: player.name,
            sid: player.sid,
            gold: player.resources.gold,
          });
        });
        client.send(encode(["b", [formattedLeaderboard]]));
      }
    });
  }, 1000);

  setInterval(() => {
    wsServer.clients.forEach((client) => {
      let player = client.player;
      if (player) {
        var playersNear = players.filter(
          (x) => x && x.spawned && dist(player, x) < renderDistance
        );
        client.send(encode(["33", [playersNear]]));

        var treesNear = treesCache.filter(
          (x) => x && dist(player, x) < renderDistance
        );
        client.send(encode(["o", [treesNear]]));

        var objNear = objCache.filter(
          (x) => x && dist(player, x) < renderDistance
        );
        client.send(encode(["x", [objNear]]));

        var animalNear = animalsCache.filter(
          (x) => x && dist(player, x) < renderDistance
        );
        client.send(encode(["a", [animalNear]]));
      }
    });
  }, 20);

  setInterval(() => {
    wsServer.clients.forEach((client) => {
      let player = client.player;
      if (player) {
        player.noHurtTime = Math.max(0, player.noHurtTime - 1);
      }
    });
  }, 50);

  function toRad(angle) {
    return angle * 0.01745329251;
  }
  setInterval(() => {
    animalsCache.forEach((animal) => {
      // animal velocity
      animal.x += (animal.xVel * animal.speed) / 10;
      animal.y += (animal.yVel * animal.speed) / 10;

      animal.xVel *= 0.93;
      animal.yVel *= 0.93;

      animal.xVel += Math.cos(animal.dir);
      animal.yVel += Math.sin(animal.dir);

      animal.dir += toRad(
        randomInt(radToDeg(animal.dir) - 3, radToDeg(animal.dir + 3))
      );
    }, 100);

    wsServer.clients.forEach((client) => {
      let player = client.player;
      if (player && player.spawned) {
        var playerSpeed = 0.8;

        if (player.hat == 2) {
          playerSpeed += 0.2;
        }

        if (player.hat == 3) {
          playerSpeed -= 0.2;
        }

        if (player.hat == 5) {
          playerSpeed -= 0.5;
        }

        if (player.acc == 1) {
          playerSpeed += 0.2;
        }

        if (player.acc == 2) {
          playerSpeed += 0.4;
        }
        // player velocity

        if (
          player.y > mapSize - desertHeight - riverHeight &&
          player.y < mapSize - desertHeight &&
          player.acc !== 2
        ) {
          player.xVel += player.hat == 4 ? 0.2 : 0.5;
          playerSpeed *= player.hat == 4 ? 0.6 : 0.3;
        }
        if (
          mapSize - player.y - snowHeight &&
          player.y < snowHeight - 2000 - 3000 &&
          player.acc !== 2
        ) {
          playerSpeed *= 0.5;
        }
        if (!weapons.find((x) => x.id == player.weapon).isWeapon) {
          playerSpeed *= 0.4;
        }

        if (player.movedir != null) {
          let xv = Math.cos(player.movedir);
          let yv = Math.sin(player.movedir);
          player.xVel += xv * playerSpeed;
          player.yVel += yv * playerSpeed * -1;
        }
        player.x += player.xVel * 0.3;
        player.y += player.yVel * 0.3;
        player.xVel *= 0.93;
        player.yVel *= 0.93;
        if (Math.abs(player.xVel) < 0.005) {
          player.xVel = 0;
        }
        if (Math.abs(player.yVel) < 0.005) {
          player.yVel = 0;
        }

        // trees, stones etc. wiggle
        treesCache.forEach((tree) => {
          tree.xWiggle *= 0.9;
          tree.yWiggle *= 0.9;
          if (Math.abs(tree.xWiggle) < 0.005) {
            tree.xWiggle = 0;
          }
          if (Math.abs(tree.yWiggle) < 0.005) {
            tree.yWiggle = 0;
          }
        });

        // traps and stuff wiggle
        objCache.forEach((obj) => {
          obj.xWiggle *= 0.9;
          obj.yWiggle *= 0.9;
          if (Math.abs(obj.xWiggle) < 0.005) {
            obj.xWiggle = 0;
          }
          if (Math.abs(obj.yWiggle) < 0.005) {
            obj.yWiggle = 0;
          }
        });

        // player collision
        var playersNear = players.filter(
          (x) => x && dist(player, x) < renderDistance
        );
        if (playersNear) {
          playersNear.forEach((player2) => {
            if (
              player2.spawned &&
              collides(player, player2) &&
              player.sid != player2.sid &&
              ((player2.acc === 2 && player.acc === 2) ||
                (player2.acc != 2 && player.acc != 2))
            ) {
              var pushDir = Math.atan2(
                player.y - player2.y,
                player.x - player2.x
              );
              var pushVelX = Math.cos(pushDir);
              var pushVelY = Math.sin(pushDir);
              player.xVel += pushVelX;
              player.yVel += pushVelY;
            }
          });
        }

        // tree, stones etc. collision
        var treesNear = treesCache.filter(
          (x) => x && dist(player, x) < renderDistance
        );
        if (treesNear) {
          treesNear.forEach((tree) => {
            if (
              dist(player, {
                x: tree.x,
                y: tree.y,
              }) <
              (tree.id == 0
                ? 80
                : tree.id == 1
                ? 80
                : tree.id == 2
                ? 60
                : tree.id == 3
                ? 60
                : tree.id == 4
                ? 90
                : tree.id == 5
                ? 85
                : tree.id == 7
                ? 52
                : 0) //obj hit boxes
            ) {
              var pushDir = Math.atan2(player.y - tree.y, player.x - tree.x);
              var pushVelX = Math.cos(pushDir) * 2;
              var pushVelY = Math.sin(pushDir) * 2;
              if (player.acc !== 2 && tree.id != 7) {
                player.xVel += pushVelX;
                player.yVel += pushVelY;
              }
              if (tree.id === 7 && player.acc !== 2) {
                player.health -= player.hat === 3 ? 18 - 5 : 18;
                player.xVel = Math.cos(pushDir) * 20 || 1;
                player.yVel = Math.sin(pushDir) * 20 || 1;
              }
            }
          });
        }

        //traps and stuff collision
        var objNear = objCache.filter(
          (x) => x && dist(player, x) < renderDistance
        );
        if (objNear) {
          objNear.forEach((obj) => {
            if (obj.health <= 0) {
              for (let resource in weapons.find((x) => x.id == obj.id).cost) {
                player.resources[resource] += weapons.find(
                  (x) => x.id == obj.id
                ).cost[resource];
              }
              objCache.removeItem(obj);
            }
            if (
              dist(player, {
                x: obj.x,
                y: obj.y,
              }) <
              (obj.id == 2
                ? 60
                : obj.id == 3
                ? 60
                : obj.id == 4
                ? 60
                : obj.id == 5
                ? 50
                : obj.id == 6
                ? 50
                : 0) //obj hit boxes
            ) {
              var pushDir = Math.atan2(player.y - obj.y, player.x - obj.x);
              var aObj = weapons.find((x) => x.id == obj.id);
              var pushVelX = Math.cos(pushDir) * aObj.velocity || 1;
              var pushVelY = Math.sin(pushDir) * aObj.velocity || 1;
              if (aObj.id === 4) {
                var pushVelX = Math.cos(pushDir) + 0;
                var pushVelY = Math.sin(pushDir) + -5;
              }
              if (aObj.id === 5 && obj.oid != player.sid) {
                var pushVelX = Math.cos(pushDir) * -2;
                var pushVelY = Math.sin(pushDir) * -2;
              } else if (aObj.id === 5) {
                var pushVelX = 0;
                var pushVelY = 0;
              }
              if (aObj.id === 2 && obj.oid === player.sid) {
                var pushVelX = Math.cos(pushDir) * 1;
                var pushVelY = Math.sin(pushDir) * 1;
              }
              if (aObj.teleport && player.acc != 2) {
                player.x = randomInt(0, mapSize);
                player.y = randomInt(0, mapSize);
              }
              if (
                aObj.damage &&
                player.noHurtTime == 0 &&
                obj.oid !== player.sid &&
                player.acc !== 2
              ) {
                player.health -=
                  player.hat === 3 ? aObj.damage - 5 : aObj.damage;
                //player.noHurtTime += .2;
              }
              if (player.acc !== 2) {
                player.xVel += pushVelX;
                player.yVel += pushVelY;
              }
            }
          });
        }

        if (player.attacking) {
          var weapon = weapons.find((x) => x.id == player.weapon);
          if (weapon) {
            if (weapon.isWeapon && player.reloaded) {
              player.reloaded = false;

              // check for players hit
              var playersNear = players.filter(
                (x) => x && dist(player, x) < renderDistance
              );
              playersNear.forEach((enemy) => {
                if (
                  enemy.sid != player.sid &&
                  reaching(player, enemy, weapon.range) &&
                  isfacing(
                    player,
                    enemy,
                    radToDeg(player.aimdir),
                    weapon.fov
                  ) &&
                  ((enemy.acc === 2 && player.acc === 2) ||
                    (enemy.acc != 2 && player.acc != 2))
                ) {
                  var knockDir = Math.atan2(
                    enemy.y - player.y,
                    enemy.x - player.x
                  );
                  enemy.xVel += Math.cos(knockDir) * 10;
                  enemy.yVel += Math.sin(knockDir) * 10;
                  if (enemy.health > 0) {
                    enemy.health -=
                      enemy.hat === 3 ? weapon.damage - 8 : weapon.damage;
                    player.health -=
                      enemy.hat === 6
                        ? player.hat === 4
                          ? weapon.damage - 10
                          : weapon.damage - 15
                        : 0;
                  }
                  client.send(
                    encode([
                      "t",
                      [
                        enemy.x + randomInt(-20, 20),
                        enemy.y + randomInt(-20, 20),
                        true,
                        weapon.damage,
                      ],
                    ])
                  );
                }
              });

              function Gem() {
                if (Math.floor(Math.random() * 100) == 3) {
                  return true;
                } else {
                  return false;
                }
              }
              var treesNear = treesCache.filter(
                (x) => x && dist(player, x) < renderDistance
              );
              treesNear.forEach((tree) => {
                if (
                  reaching(
                    player,
                    tree,
                    weapon.range + (tree.id == 2 ? 40 : 65)
                  ) &&
                  isfacing(player, tree, radToDeg(player.aimdir), weapon.fov) &&
                  player.acc !== 2
                ) {
                  player.resources[
                    tree.id == 0
                      ? "wood"
                      : tree.id == 1
                      ? "wood"
                      : tree.id == 2
                      ? "food"
                      : tree.id == 3
                      ? "food"
                      : tree.id == 4
                      ? "stone"
                      : tree.id == 5
                      ? Gem()
                        ? "ruby"
                        : "gold"
                      : tree.id == 6
                      ? "ruby"
                      : tree.id == 7
                      ? "food"
                      : 0
                  ] += weapon.gather;
                  if (player.xp >= 100) {
                    player.xp = 0;
                    player.age = player.age + 1;
                  } else {
                    player.xp += weapon.gather;
                  }
                  var wiggleDir = Math.atan2(
                    tree.y - player.y,
                    tree.x - player.x
                  );
                  tree.xWiggle += Math.cos(wiggleDir) * 14;
                  tree.yWiggle += Math.sin(wiggleDir) * 14;
                }
              });
              // check for traps and stuff hit
              var objNear = objCache.filter(
                (x) => x && dist(player, x) < renderDistance
              );
              objNear.forEach((obj) => {
                if (
                  reaching(player, obj, weapon.range + 10) &&
                  isfacing(player, obj, radToDeg(player.aimdir), weapon.fov) &&
                  player.acc !== 2
                ) {
                  obj.health -=
                    player.hat == 5 ? weapon.damage + 25 : weapon.damage; // for tankgear
                  var wiggleDir = Math.atan2(
                    obj.y - player.y,
                    obj.x - player.x
                  );
                  obj.xWiggle += Math.cos(wiggleDir) * 10;
                  obj.yWiggle += Math.sin(wiggleDir) * 10;
                }
              });

              broadcast(["7", [player.sid]], player);
              setTimeout(() => {
                player.reloaded = true;
              }, weapon.reload);
            }
          }
        }
        if (player.x > mapSize - 30) {
          player.xVel += mapSize - 30 - player.x;
        }
        if (player.y > mapSize - 30) {
          player.yVel += mapSize - 30 - player.y;
        }
        if (player.x < 30) {
          player.xVel += 30 - player.x;
        }
        if (player.y < 30) {
          player.yVel += 30 - player.y;
        }
        //player.x = Math.max(30, player.x);
        //player.x = Math.min(mapSize - 30, player.x);
        //player.y = Math.max(30, player.y);
        //player.y = Math.min(mapSize - 30, player.y);

        if (player.health <= 0) {
          client.send(encode(["d", []]));
          player.spawned = false;
          player.xp = 0;
        }
      }
    });
    leaderboard = players
      .sort((a, b) => b.resources.gold - a.resources.gold)
      .filter((x) => x.spawned)
      .slice(0, 10);
  }, 10);

  wsServer.on("connection", (socket, request) => {
    socket.send(encode(["init", []]));
    socket.player = {
      socketLimit: 0,
      noHurtTime: 0,
      skin: 0,
      hat: 0,
      acc: 0,
      wep: 0,
      sid: null,
      xVel: 0,
      yVel: 0,
      movedir: null,
      attacking: false,
      chat: null,
      reloaded: true,
      weapon: 0,
      health: 100,
      weapons: [0, 1, 2, 3, 4, 5, 6],
      xp: 0,
      age: 0,
      resources: {
        food: 100,
        wood: 100,
        stone: 100,
        gold: 100,
        ruby: 100,
        food2: 0,
        wood2: 0,
        cacti: 0,
      },
    };

    socket.player.spawned = false;
    socket.on("message", (message) => {
      socket.player.socketLimit++;
      setTimeout(() => {
        socket.player.socketLimit--;
      }, 1000);
      /*
            may need to change back
            if(socket.player.socketLimit > 100){
              socket.close(1012, "Buffer large");
              return;
            }*/
      var msg;
      try {
        msg = decode(new Uint8Array(message));
      } catch (err) {
        socket.close(1012, "Buffer missing");
        return;
      }
      if (!msg || !msg[0]) {
        socket.close(1012, "Buffer missing");
        return;
      }
      switch (msg[0]) {
        case "j":
          if (!msg[1][0]) {
            socket.close(1012, "Buffer missing");
          }
          var name;
          var skin;
          try {
            name =
              msg[1][0].name.replace(/[^a-z0-9]/gi, "").slice(0, 15) ||
              "Combat.io";
            skin = msg[1][0].skin || 0;
          } catch (err) {
            socket.close(1012, "Buffer missing");
          }
          fetch("https://combat-io.glitch.me/bannedIPs.txt")
            .then((res) => res.text())
            .then((data) => {
              const Banned = data
                .replaceAll("\n", "")
                .split(",")
                .filter(function (e) {
                  return e;
                });
              for (let i = 0; i < Banned.length; i++) {
                if (socket.player.ip === Banned[i]) {
                  socket.close(1012, "You are banned.");
                }
              }
            });
          respawn(socket.player, name, skin);
          if (!players.find((x) => x.sid == socket.player.sid))
            players.push(socket.player);
          socket.send(encode(["1", [socket.player.sid]]));
          socket.send(encode(["w", [socket.player.weapons]]));
          break;
        case "Hd":
          if (!msg[1][0]) {
            socket.close(1012, "Buffer missing");
          }
          var hat;
          try {
            hat = msg[1][0].hat || 0;
          } catch (err) {
            socket.close(1012, "Buffer missing");
          }
          sendHatData(socket.player, hat);
          break;
        case "Ac":
          if (!msg[1][0]) {
            socket.close(1012, "Buffer missing");
          }
          var acc;
          try {
            acc = msg[1][0].acc || 0;
          } catch (err) {
            socket.close(1012, "Buffer missing");
          }
          sendAccData(socket.player, acc);
          break;
        case "Ug":
          if (!msg[1][0]) {
            socket.close(1012, "Buffer missing");
          }
          var wep;
          if (socket.player.age >= 2) {
            try {
              socket.player.weapon = msg[1][0].wep || 0;
              socket.player.upgradeWep = msg[1][0].wep || 0;
            } catch (err) {
              socket.close(1012, "Buffer missing");
            }
            sendWepData(socket.player, wep);
          }
          break;
        case "33":
          if (typeof msg[1][0] !== "number" && msg[1][0] !== null) break;
          socket.player.movedir = msg[1][0];
          break;
        case "p":
          socket.send(encode(["p", []]));
          break;
        case "ud":
          if (socket.player.admin) {
            socket.player.health = 100;
          }
          break;
        case "2":
          if (typeof msg[1][0] !== "number") break;
          socket.player.aimdir = msg[1][0];
          break;
        case "ch":
          if (msg[1][0] == "/" + process.env.ADMINPASS) {
            socket.player.admin = true;
            socket.player.health = 100;
            socket.player.resources.food = 1000000;
            socket.player.resources.wood = 1000000;
            socket.player.resources.stone = 1000000;
            socket.player.resources.ruby = 1000000;
            socket.player.resources.gold = 1000000;
            return false;
          }
          if (msg[1][0] == "/" + process.env.MODPASS) {
            socket.player.mod = true;
            return false;
          }
          if (msg[1][0] == "/" + process.env.ARTISTPASS) {
            socket.player.artist = true;
            return false;
          }
          if (msg[1][0] == "/kill" && socket.player.admin) {
            socket.player.health = 0;
            return false;
          }
          if (msg[1][0] == "/end" && socket.player.admin) {
            ws.close();
            return false;
          }
          if (
            msg[1][0].includes("/ban") &&
            (socket.player.admin || socket.player.mod)
          ) {
            try {
              let siid = msg[1][0]
                .replace("/ban sid: ", "")
                .replaceAll(/\s/g, "");
              if (!isNaN(siid)) {
                var playerInfo = [];
                leaderboard.forEach((player) => {
                  playerInfo.push({
                    sid: player.sid,
                    ip: player.ip,
                    name: player.name,
                  });
                });
                let players = playerInfo.find(({ sid }) => sid === ~~siid);
                fetch("https://combat-io.glitch.me/bannedIPs.txt")
                  .then((res) => res.text())
                  .then((data) => {
                    var datax = data + "\n" + players.ip + ",";
                    fs.writeFile("./public/bannedIPs.txt", datax, (err) => {
                      if (err) throw err;
                    });
                  });
              } else {
                throw new Error("");
              }
            } catch (error) {
              socket.player.chat = "SID not valid.".slice(0, 30);
              socket.player.lastChatTimestamp = Date.now();
              setTimeout(() => {
                socket.player.chat = null;
              }, 3000);
              return false;
            }
            return false;
          }
          if (
            msg[1][0].includes("/unban") &&
            (socket.player.admin || socket.player.mod)
          ) {
            try {
              let IP = msg[1][0].replace("/unban ", "").replaceAll(/\s/g, "");
              fetch("https://combat-io.glitch.me/bannedIPs.txt")
                .then((res) => res.text())
                .then((data) => {
                  var datax = data.replace("\n" + IP + ",", "");
                  fs.writeFile("./public/bannedIPs.txt", datax, (err) => {
                    if (err) throw err;
                  });
                });
              return false;
            } catch (error) {
              socket.player.chat = "IP not valid.".slice(0, 30);
              socket.player.lastChatTimestamp = Date.now();
              setTimeout(() => {
                socket.player.chat = null;
              }, 3000);
              return false;
            }
          }
          if (
            msg[1][0].includes("/tp") &&
            (socket.player.admin || socket.player.mod)
          ) {
            if (msg[1][0].includes("sid:")) {
              let siid = msg[1][0]
                .replace("/tp sid:", "")
                .replaceAll(/\s/g, "");
              var playerInfo = [];
              leaderboard.forEach((player) => {
                playerInfo.push({
                  sid: player.sid,
                  x: player.x,
                  y: player.y,
                });
              });
              try {
                let players = playerInfo.find(({ sid }) => sid === ~~siid);
                socket.player.y = players.y + 2;
                socket.player.x = players.x;
              } catch (error) {
                socket.player.chat = "SID not valid.".slice(0, 30);
                socket.player.lastChatTimestamp = Date.now();
                setTimeout(() => {
                  socket.player.chat = null;
                }, 3000);
                return false;
              }
              return false;
            } else {
              if (
                ~~msg[1][0].substr(4).replace(/\s/g, "").split(",")[0] <
                  10001 &&
                ~~msg[1][0].substr(4).replace(/\s/g, "").split(",")[0] > -1 &&
                ~~msg[1][0].substr(4).replace(/\s/g, "").split(",")[1] <
                  10001 &&
                ~~msg[1][0].substr(4).replace(/\s/g, "").split(",")[1] > -1
              ) {
                socket.player.x = ~~msg[1][0]
                  .substr(4)
                  .replace(/\s/g, "")
                  .split(",")[0];
                socket.player.y = ~~msg[1][0]
                  .substr(4)
                  .replace(/\s/g, "")
                  .split(",")[1];
                return false;
              } else {
                socket.player.chat = "x or y value too high or low".slice(
                  0,
                  30
                );
                socket.player.lastChatTimestamp = Date.now();
                setTimeout(() => {
                  socket.player.chat = null;
                }, 3000);
                return false;
              }
            }
          }
          socket.player.chat = msg[1][0].slice(0, 30);
          clearTimeout(chatMessages[socket.player.sid]);
          chatMessages[socket.player.sid] = setTimeout(() => {
            socket.player.chat = null;
          }, 3000);
          break;
        case "vx":
          var msg = msg[1][0];
          socket.close(1012, msg);
          break;
        case "c":
          var twp = weapons.find((x) => x.id == socket.player.weapon);
          if (twp && twp.isWeapon) {
            socket.player.attacking = msg[1][0] == true ? true : false;
          } else if ((msg[1][0] == true ? true : false) == true) {
            var obj = weapons.find((x) => x.id == socket.player.weapon);
            if (!obj) return;
            if (
              socket.player.y > mapSize - desertHeight - riverHeight &&
              socket.player.y < mapSize - desertHeight &&
              !obj.placeInRiver
            )
              return;

            var reqFood = obj.cost.food || 0;
            var reqWood = obj.cost.wood || 0;
            var reqStone = obj.cost.stone || 0;
            var reqRuby = obj.cost.Ruby || 0;
            var reqGold = obj.cost.gold || 0;
            var reqFood2 = obj.cost.food || 0;
            var reqWood2 = obj.cost.wood || 0;
            var reqCacti = obj.cost.cacti || 0;

            var haveFood = socket.player.resources.food >= reqFood;
            var haveWood = socket.player.resources.wood >= reqWood;
            var haveStone = socket.player.resources.stone >= reqStone;
            var haveRuby = socket.player.resources.ruby >= reqRuby;
            var haveGold = socket.player.resources.gold >= reqGold;

            if (haveFood && haveWood && haveStone && haveGold && haveRuby) {
              if (obj.heal && socket.player.health < 100) {
                socket.player.resources.food -= reqFood;
                socket.player.resources.wood -= reqWood;
                socket.player.resources.stone -= reqStone;
                socket.player.resources.ruby -= reqStone;
                socket.player.resources.gold -= reqGold;

                socket.player.health = Math.min(
                  100,
                  socket.player.health + obj.heal
                );
                if (socket.player.upgrade) {
                  socket.player.weapon = socket.player.upgradeWep;
                } else {
                  socket.player.weapon = 0;
                }
              }
              if (obj.placeable && socket.player.acc != 2) {
                if (
                  test(
                    objCache[0].x,
                    objCache[0].y,
                    socket.player.x + Math.cos(socket.player.aimdir) * 65,
                    socket.player.y + Math.cos(socket.player.aimdir) * 65
                  ) 
                ) {
                  socket.player.resources.food -= reqFood;
                  socket.player.resources.wood -= reqWood;
                  socket.player.resources.stone -= reqStone;
                  socket.player.resources.ruby -= reqRuby;
                  socket.player.resources.gold -= reqGold;
                  objCache.push({
                    id: socket.player.weapon,
                    x: socket.player.x + Math.cos(socket.player.aimdir) * 65,
                    y: socket.player.y + Math.sin(socket.player.aimdir) * 65,
                    dir: 0,
                    oid: socket.player.sid,
                    health: obj.health,
                    maxHealth: obj.maxHealth,
                    xWiggle: 0,
                    yWiggle: 0,
                  });
                }
                if (socket.player.upgrade) {
                  socket.player.weapon = socket.player.upgradeWep;
                } else {
                  socket.player.weapon = 0;
                }
              }
            }
          }
          break;
        case "s":
          var id = msg[1][0] - 1;
          if (socket.player.weapons.indexOf(id) != -1) {
            if (socket.player.weapon === id) {
              if (socket.player.upgrade && id === 0) {
                socket.player.weapon = socket.player.upgradeWep;
              } else {
                socket.player.weapon = id;
              }
            } else {
              if (socket.player.upgrade && id === 0) {
                socket.player.weapon = socket.player.upgradeWep;
              } else {
                socket.player.weapon = id;
              }
            }
          }
          break;
        default:
          socket.close(1012, "Buffer missing");
      }
    });
    setInterval(() => {
      fetch("https://combat-io.glitch.me/bannedIPs.txt")
        .then((res) => res.text())
        .then((data) => {
          const Banned = data
            .replaceAll("\n", "")
            .split(",")
            .filter(function (e) {
              return e;
            });
          for (let i = 0; i < Banned.length; i++) {
            if (socket.player.ip === Banned[i]) {
              socket.close(1012, "You are banned.");
            }
          }
        });
    }, 10000);
    socket.on("close", () => {
      players.removeItem(players.find((x) => x.sid == socket.player.sid));
    });
  });

  var server = app.listen(8000, () => {
    console.clear();
    console.log("server started");
  });

  server.on("upgrade", (request, socket, head) => {
    if (request.url == "/websocket") {
      wsServer.handleUpgrade(request, socket, head, (socket) => {
        wsServer.emit("connection", socket, request);
      });
    }
  });
  console.clear();
})();
