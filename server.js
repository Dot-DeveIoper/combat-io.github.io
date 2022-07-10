//
const express = require("express");
const bodyParser = require("body-parser");
const ws = require("ws");
const app = express();
const msgpack = require("msgpack-lite");
const fs = require("fs");
const fetch = require("node-fetch");
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

app.use(express.static("public"));

var users = [];
/*

      DATABASE
      
*/

const dbFile = "./.data/sqlite.db";
const exists = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(dbFile);

db.on("error", function(error) {
  console.log("Getting an error: ", error);
});

db.serialize(() => {
  if (!exists) {
    db.run(
      "CREATE TABLE Users (username TEXT PRIMARY KEY, email TEXT, password TEXT)"
    );
    db.run(
      "CREATE TABLE Ruby (username TEXT PRIMARY KEY, ruby INTEGER)"
    );
  } else {
    console.log("Databases ready!");
    db.each("SELECT * from Users", (err, row) => {
      if (row) {
        console.log(row)
        users.push(row);
      }
    });
  }
});



app.post("/login", (request, response) => {
  var body = request.body;
  var username = body.username.toLowerCase();
  var password = body.password;

  db.all(
    `SELECT * from Users WHERE username="${body.username.toLowerCase()}" AND password="${
      body.password
    }"`,
    async (err, rows) => {
      if (rows.length > 0) {
        response.json({
          status: 200
        })
      } else {
        response.json({
          status: 403,
          error: "Invalid username or password"
        });
      }
    }
  );
});




app.post("/register", (request, response) => {
  var body = request.body;
  const emailRegExp = new RegExp(
    /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i
  );
  var email = body.email.toLowerCase();
  var username = body.username.toLowerCase();
  var password = body.password;
  body.email = body.email.toLowerCase();
  if (emailRegExp.test(email)) {
    if (new RegExp(/^[a-zA-Z0-9_]*$/).test(username)) {
      if (username.length < 4 || username.length > 15) {
        response.json({
          status: 401,
          error: "Username must be long 4-15 characters"
        });
        return;
      }
      if (password.length < 6 || password.length > 50) {
        response.json({
          status: 401,
          error: "Password must be long 6-50 characters"
        });
        return;
      }
    } else {
      response.json({
        status: 401,
        error: "Invalid characters are not allowed"
      });
      return;
    }
  } else {
    response.json({
      status: 401,
      error: "Invalid email"
    });
    return;
  }

  db.all(
    `SELECT * from Users WHERE username="${body.username.toLowerCase()}"`,
    async (err, rows) => {
      if (rows.length > 0) {
        response.json({
          status: 402,
          error: "This username is already in use."
        });
      } else {
        db.all(
          `SELECT * from Users WHERE email="${body.email.toLowerCase()}"`,
          async (err, rows) => {
            if (rows.length > 0) {
              response.json({
                status: 402,
                error: "This email was already used."
              });
            } else {
              db.serialize(() => {
                db.run(
                  'INSERT INTO Users (username, email, password) VALUES ("' +
                    body.username.toLowerCase() +
                    '", "' +
                    body.email.toLowerCase() +
                    '", "' +
                    body.password +
                    '")'
                );
                users.push({
                  username: username.toLowerCase(),
                  email: email.toLowerCase(),
                  pasword: password,
                });
              });
              response.json({ status: 200 });
            }
          }
        );
      }
    }
  );
});
/*

      DATABASE
      
      
*/


function radToDeg(radians){
    var pi = Math.PI;
    return radians * (180/pi);
}
var leaderboard = [];

var mapSize = 10000;
var moltenHeight = 1000;
var snowHeight = 6000;
var moltenRiverHeight = 1000;
var beachHeight = 500;
var playerSpeed = 1;

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

Array.prototype.removeItem = function(value) {
  var index = this.indexOf(value);
  if (index > -1) {
    this.splice(index, 1);
  }
  return this;
};

var animals = [
  {
    id: 0,
    count: 100,
    aggresive: false,
    name: "Cow",
    speed: 3,
    health: 100,
    maxHealth: 100,
  }
]

var animalsCache = [];
var treesCache = [];
var objCache = [];

for (let j = 0; j < 4; j++){
  for (let i = 0; i < mapSize/100; i++) {
    var randomx = randomInt(0, mapSize);
    var randomy = randomInt(0, mapSize);
    if(randomy > mapSize - snowHeight - 100){
      if(j == 0 || j == 1)continue;
    }
    if(randomy > mapSize - moltenHeight - moltenRiverHeight - 100 && randomy < mapSize - moltenHeight + 100){
      if(j == 0 || j == 1 || j == 3)continue;
    }
    if(randomy > mapSize - moltenHeight - 100){
      if(j == 0 || j == 1)continue;
    }
    if(randomy > mapSize - moltenHeight - moltenRiverHeight - beachHeight - 100 && randomy < mapSize - moltenHeight - moltenRiverHeight + 100){
      if(j == 0 || j == 3)continue;
    }
    var object = { x: randomx, y: randomy, dir: Math.random(), id: j, xWiggle: 0, yWiggle: 0 };
    if(treesCache.filter(x => x && dist(object, x) < 200).length > 0)continue;
    treesCache.push(object);
  }
}

animals.forEach((a) => {
  for(let i = 0; i < a.count; i++){
    var animal = {
      id: a.id,
      speed: a.speed,
      x: randomInt(0, mapSize),
      y: randomInt(0, mapSize),
      dir: 0,
      health: 100,
      xVel: 0,
      yVel: 0,
    }
    animalsCache.push(animal);
    console.log(a.count+' animal has spawned'+animal)
  }
})
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
    fov: 150,
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
    name: "Spike",
    cost: {
      wood: 20,
      stone: 5,
    },
    damage: 20,
    velocity: 20,
    health: 300,
    maxHealth: 300,
  },
  {
    id: 3,
    isWeapon: false,
    placeable: true,
    name: "Wall",
    cost: {
      wood: 20,
    },
    damage: 0,
    velocity: 0,
    health: 250,
    maxHealth: 250,
  }
];

app.get("/", (req, res) => {
  console.log('New User Appeared!')
  //console.log("New user! IP: " +req.headers["x-forwarded-for"].split(",").shift() +"\nUser-Agent: " +req.headers["user-agent"]);
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/players", (req, res) => {
  res.json({
    players: players.length,
  })
})

function dist(p1, p2) {
  return Math.sqrt(Math.pow(p1.y - p2.y, 2) + Math.pow(p1.x - p2.x, 2));
}

const wsServer = new ws.Server({ noServer: true });

var players = [];
var ids = 0;

function respawn(player, name) {
  player.PlayerOldX = player.x;
  player.PlayerOldY = player.y
  player.noHurtTime = 200;
  player.skin = 0;
  player.name = name;
  player.sid = player.sid || ++ids;
  player.spawned = true;
  player.x = randomInt(0, mapSize);
  player.y = randomInt(0, mapSize);
  player.health = 100;
  player.weapons = [0, 1, 2, 3]
  player.resources = {
      food: 0,
      wood: 0,
      stone: 0,
      gold: 0,
      spyllis: 0,
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
  wsServer.clients.forEach(client => {
    let player = client.player;
    if (player) {
      if (dist(player, origin) < renderDistance) {
        client.send(msgpack.encode(data));
      }
    }
  });
}

setInterval(() => {
  wsServer.clients.forEach((client) => {
    let player = client.player;
    if(player){
      var formattedLeaderboard = [];
      leaderboard.forEach((player) => {
        formattedLeaderboard.push({name: player.name, gold: player.resources.spyllis});
      })
      client.send(msgpack.encode(["b", [formattedLeaderboard]]))
    }
  })
}, 500)

setInterval(() => {
  wsServer.clients.forEach(client => {
    let player = client.player;
    if (player) {
      var playersNear = players.filter(
        x => x && x.spawned && dist(player, x) < renderDistance
      );
      client.send(msgpack.encode(["33", [playersNear]]));

      var treesNear = treesCache.filter(
        x => x && dist(player, x) < renderDistance
      );
      client.send(msgpack.encode(["o", [treesNear]]));
      
      var objNear = objCache.filter(
        x => x && dist(player, x) < renderDistance
      );
      client.send(msgpack.encode(["x", [objNear]]));
      
      var animalNear = animalsCache.filter(
        x => x && dist(player, x) < renderDistance*3
      );
      client.send(msgpack.encode(["a", [animalNear]]));
    }
  });
}, 20);

setInterval(() => {
  wsServer.clients.forEach(client => {
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
    animal.x += animal.xVel * animal.speed / 10;
    animal.y += animal.yVel * animal.speed / 10;
    
    
    animal.xVel *= .93;
    animal.yVel *= .93;
    
    animal.xVel += Math.cos(animal.dir);
    animal.yVel += Math.sin(animal.dir);
    
    animal.dir += toRad(randomInt(radToDeg(animal.dir) - 3, radToDeg(animal.dir + 3)));
    
    
  }, 100);
  
  wsServer.clients.forEach(client => {
    let player = client.player;
    if (player && player.spawned) {
      
      var playerSpeed = 1
      // player velocity
      
      if (player.y > mapSize - moltenHeight - moltenRiverHeight && player.y < mapSize - moltenHeight){
        player.xVel += .5;
        playerSpeed *= 0.3;
      }
      if(!weapons.find(x => x.id == player.weapon).isWeapon){
        playerSpeed *= 0.4;
      }
      
      if (player.movedir != null) {
        let xv = Math.cos(player.movedir);
        let yv = Math.sin(player.movedir);
        player.xVel += (xv) * playerSpeed;
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
        tree.xWiggle *= .9;
        tree.yWiggle *= .9;
        if(Math.abs(tree.xWiggle) < 0.005){
          tree.xWiggle = 0;
        }
        if(Math.abs(tree.yWiggle) < 0.005){
          tree.yWiggle = 0;
        }
      })
      
      // traps and stuff wiggle
      objCache.forEach((obj) => {
        obj.xWiggle *= .9;
        obj.yWiggle *= .9;
        if(Math.abs(obj.xWiggle) < 0.005){
          obj.xWiggle = 0;
        }
        if(Math.abs(obj.yWiggle) < 0.005){
          obj.yWiggle = 0;
        }
      })
      
      
      // player collision
      var playersNear = players.filter(
        x => x && dist(player, x) < renderDistance
      );
      if (playersNear) {
        playersNear.forEach(player2 => {
          if (
            player2.spawned &&
            collides(player, player2) &&
            player.sid != player2.sid
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
        x => x && dist(player, x) < renderDistance
      );
      if (treesNear) {
        treesNear.forEach(tree => {
          if (dist(player, {x: tree.x, y: tree.y}) < (tree.id == 0 ? 70 : tree.id == 3 ? 50 : 100)
          ) {
            var pushDir = Math.atan2(
              player.y - tree.y,
              player.x - tree.x
            );
            var pushVelX = Math.cos(pushDir);
            var pushVelY = Math.sin(pushDir);
            player.xVel += pushVelX;
            player.yVel += pushVelY;
          }
        });
      }
      
      
      //traps and stuff collision
      var objNear = objCache.filter(
        x => x && dist(player, x) < renderDistance
      );
      if (objNear) {
        objNear.forEach(obj => {
          if(obj.health <= 0){
            for(let resource in weapons.find(x => x.id == obj.id).cost){
              player.resources[resource] += weapons.find(x => x.id == obj.id).cost[resource];
            }
            objCache.removeItem(obj);
          }
          if (dist(player, {x: obj.x, y: obj.y}) < 60
          ) {
            var pushDir = Math.atan2(
              player.y - obj.y,
              player.x - obj.x
            );
            var aObj = weapons.find(x => x.id == obj.id);
            var pushVelX = Math.cos(pushDir)*aObj.velocity||1;
            var pushVelY = Math.sin(pushDir)*aObj.velocity||1;
            if(aObj.damage && player.noHurtTime == 0 && obj.id != player.sid){
              player.health -= aObj.damage;
              player.noHurtTime += 2;
            }
            player.xVel += pushVelX;
            player.yVel += pushVelY;
          }
        });
      }

      if (player.attacking) {
        var weapon = weapons.find(x => x.id == player.weapon);
        if (weapon) {
          if (weapon.isWeapon && player.reloaded) {
            player.reloaded = false;
            
            
            // check for players hit
            var playersNear = players.filter(
              x => x && dist(player, x) < renderDistance
            );
            playersNear.forEach(enemy => {
              if (
                enemy.sid != player.sid &&
                reaching(player, enemy, weapon.range) &&
                isfacing(player, enemy, radToDeg(player.aimdir), weapon.fov)
              ) {
                var knockDir = Math.atan2(
                  enemy.y - player.y,
                  enemy.x - player.x
                );
                enemy.xVel += Math.cos(knockDir) * 10;
                enemy.yVel += Math.sin(knockDir) * 10;
                enemy.health -= weapon.damage;
                client.send(
                  msgpack.encode([
                    "t",
                    [
                      enemy.x + randomInt(-20, 20),
                      enemy.y + randomInt(-20, 20),
                      true,
                      weapon.damage
                    ]
                  ])
                );
              }
            });
            
            
            // check for trees, stones etc. hit
            var treesNear = treesCache.filter(
              x => x && dist(player, x) < renderDistance
            );
            treesNear.forEach(tree => {
              if (
                reaching(player, tree, weapon.range + (tree.id == 3 ? 40 : 65)) &&
                isfacing(player, tree, radToDeg(player.aimdir), weapon.fov)
              ) {
                player.resources[tree.id == 0 ? "food" : tree.id == 1 ? "wood" : tree.id == 2 ? "stone" : tree.id == 3 ? "spyllis" : test] += weapon.gather;
                player.xp += weapon.gather;
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
              x => x && dist(player, x) < renderDistance
            );
            objNear.forEach(obj => {
              if (
                reaching(player, obj, weapon.range + 10) &&
                isfacing(player, obj, radToDeg(player.aimdir), weapon.fov)
              ) {
                obj.health -= weapon.damage;
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
        player.xVel += (mapSize - 30 - player.x) * 0.05;
      }
      if (player.y > mapSize - 30) {
        player.yVel += (mapSize - 30 - player.y) * 0.05;
      }
      if (player.x < 30) {
        player.xVel += (30 - player.x) * 0.05;
      }
      if (player.y < 30) {
        player.yVel += (30 - player.y) * 0.05;
      }
      //player.x = Math.max(30, player.x);
      //player.x = Math.min(mapSize - 30, player.x);
      //player.y = Math.max(30, player.y);
      //player.y = Math.min(mapSize - 30, player.y);

      if (player.health <= 0) {
        client.send(msgpack.encode(["d", []]));
        player.spawned = false;
      }
    }
  });
  leaderboard = players.sort((a, b) => b.resources.gold - a.resources.gold).filter(x => x.spawned).slice(0, 10);
}, 10);

wsServer.on("connection", (socket, request) => {
  socket.send(msgpack.encode(["init", []]));
  socket.player = {
    socketLimit: 0,
    noHurtTime: 0,
    skin: 0,
    sid: null,
    xVel: 0,
    yVel: 0,
    movedir: null,
    attacking: false,
    chat: null,
    reloaded: true,
    weapon: 0,
    health: 100,
    weapons: [0, 1, 2, 3, 4],
    xp: 0,
    age: 0,
    resources: {
      food: 100,
      wood: 100,
      stone: 100,
      gold: 100,
      spyllis: 100,
    }
  };
  socket.player.spawned = false;
  socket.on("message", message => {
    socket.player.socketLimit++;
    setTimeout(() => {
      socket.player.socketLimit--;
    }, 1000)
    /*
    may need to change back
    if(socket.player.socketLimit > 100){
      socket.close(1012, "Buffer large");
      return;
    }*/
    var msg;
    try{msg = msgpack.decode(new Uint8Array(message));}catch(err){socket.close(1012, "Buffer missing");return;}
    if(!msg || !msg[0]){
      socket.close(1012, "Buffer missing");
      return;
    }
    switch (msg[0]) {
      case "j":
        if(!msg[1][0]){
          socket.close(1012, "Buffer missing");
        }
        var name;
        try{
        name = msg[1][0].name.replace(/[^a-z0-9]/gi, "").slice(0, 15) || "ComBat.io";
        }catch(err){
          socket.close(1012, "Buffer missing");
        }
        respawn(
          socket.player,
          name
        );
        if (!players.find(x => x.sid == socket.player.sid))
          players.push(socket.player);
        socket.send(msgpack.encode(["1", [socket.player.sid]]));
        socket.send(msgpack.encode(["w", [socket.player.weapons]]));
        break;
      case "33":
        socket.player.movedir = msg[1][0];
        break;
      case "p":
        socket.send(msgpack.encode(["p", []]));
        break;
      case "2":
        socket.player.aimdir = msg[1][0];
        break;
      case "ch":
        if(msg[1][0] == "/"+process.env.ADMINPASS){ // quick admin command
          socket.player.admin = true;
          socket.player.health = Number.MAX_VALUE;
          socket.player.resources.food = 99999;
          socket.player.resources.wood = 99999;
          socket.player.resources.stone = 99999;
          socket.player.resources.spyllis = 99999;
        }
        if ((socket.player.lastChatTimestamp == undefined) || (Date.now() - socket.player.lastChatTimestamp > 500)) { // you can only chat every 0.5 seconds
          socket.player.chat = msg[1][0].slice(0, 30);
          socket.player.lastChatTimestamp = Date.now();
        }
        setTimeout(() => {
          socket.player.chat = null;
        }, 3000);
        break;
      case "c":
        var twp = weapons.find(x => x.id == socket.player.weapon);
        if(twp && twp.isWeapon){
          socket.player.attacking = msg[1][0] == true ? true : false;
        }else if((msg[1][0] == true ? true : false) == true){
          var obj = weapons.find(x => x.id == socket.player.weapon);
          if(!obj)return;
          
          var reqFood = obj.cost.food || 0;
          var reqWood = obj.cost.wood || 0;
          var reqStone = obj.cost.stone || 0;
          var reqSpyllis = obj.cost.spyllis || 0;
          
          var haveFood = socket.player.resources.food >= reqFood;
          var haveWood = socket.player.resources.wood >= reqWood;
          var haveStone = socket.player.resources.stone >= reqStone;
          var haveSpyllis = socket.player.resources.spyllis >= reqSpyllis;
          
          if(haveFood && haveWood && haveStone && haveSpyllis){
            if(obj.heal && socket.player.health < 100){
              
              socket.player.resources.food -= reqFood;
              socket.player.resources.wood -= reqWood;
              socket.player.resources.stone -= reqStone;
              socket.player.resources.spyllis -= reqSpyllis;
              
              socket.player.health = Math.min(100, socket.player.health + obj.heal);
              var playerWeaponObjects = [];
              socket.player.weapons.forEach((w) => {
                playerWeaponObjects.push(weapons.find(x => x.id == w));
              })
              socket.player.weapon = playerWeaponObjects.filter(x => x && x.isWeapon)[0].id;
            }
            if(obj.placeable){

              socket.player.resources.food -= reqFood;
              socket.player.resources.wood -= reqWood;
              socket.player.resources.stone -= reqStone;
              socket.player.resources.spyllis -= reqSpyllis;
              
              objCache.push({
                id: 2,
                x: socket.player.x + Math.cos(socket.player.aimdir) * 65,
                y: socket.player.y + Math.sin(socket.player.aimdir) * 65,
                health: obj.health,
                maxHealth: obj.maxHealth,
                xWiggle: 0,
                yWiggle: 0,
              });
              var playerWeaponObjects = [];
              socket.player.weapons.forEach((w) => {
                playerWeaponObjects.push(weapons.find(x => x.id == w));
              })
              socket.player.weapon = playerWeaponObjects.filter(x => x && x.isWeapon)[0].id;
            }
          }
        }
        break;
      case "s":
        var id = msg[1][0]-1;
        if(socket.player.weapons.indexOf(id) != -1){
          socket.player.weapon = id;
        }
        break;
      default:
        socket.close(1012, "Buffer missing");
    }
  });

  socket.on("close", () => {
    players.removeItem(players.find(x => x.sid == socket.player.sid));
  });
});

var server = app.listen(3000, () => {
  console.clear();
  console.log("server started");
});

server.on("upgrade", (request, socket, head) => {
  if (request.url == "/websocket") {
    wsServer.handleUpgrade(request, socket, head, socket => {
      wsServer.emit("connection", socket, request);
   });
  }
});

//

console.clear();
