//?
// SAVE OF "bundle.js" EDIT THIS THEN USE "https://obfuscator.io/", THEN MOVE TO MAIN "bundle.js"
// USE "Domain Lock" AND SET TO "https://combat-io.glitch.me" SAVE "Identifier Names Generator" AS "Mangled-shuffled".
//?

/*
  rotator patch notes 14:27 EST on 7/10/2022
- change e.keyCode to e.code (Done I think)
*/

var skinLimit = 8; /* Change this after adding new skins */

function setSkin(num) {
  for (let i = 1; i <= skinLimit; i++) {
    if (i == num) {
      document.getElementById("skin" + i).style.borderRadius = "25%";
    } else {
      document.getElementById("skin" + i).style.borderRadius = "50%";
    }
  }
}

// const targetDiv = document.querySelector(".show");
const targetDiv = document.getElementById("rightCardHolder");
const btn = document.getElementById("toggleSettings");

let x = document.querySelector(".changeText");

/* targetDiv.style.display = "none"; */

btn.onclick = function () {
  if (targetDiv.style.display === "none" && x.innerHTML === "Open Settings") {
    targetDiv.style.display = "block";
    // btn.innerHTML = "Open Settings";
    x.innerHTML = "Close Settings";
    // this.innerHTML = "Open Settings";
  } else {
    targetDiv.style.display = "none";
    // targetDiv.style.zIndex = "-1";
    // btn.innerHTML = "Close Settings";
    btn.style.zIndex = "1";
    x.innerHTML = "Open Settings";
    // this.innerHTML = "Close Settings";
  }
};

(function (e) {
  window.onbeforeunload = (e) => {
    return "Are you sure?";
  };

  var keycodes = {
    MOVE_UP: "KeyW",
    MOVE_DOWN: "KeyS",
    MOVE_LEFT: "KeyA",
    MOVE_RIGHT: "KeyD",
    MOVE_UP2: "ArrowUp",
    MOVE_DOWN2: "ArrowDown",
    MOVE_LEFT2: "ArrowLeft",
    MOVE_RIGHT2: "ArrowRight",
    CHAT: "Enter",
    QUICK_FOOD: "KeyQ",

    HOTBAR_1: "Digit1",
    HOTBAR_2: "Digit2",
    HOTBAR_3: "Digit3",
    HOTBAR_4: "Digit4",
    HOTBAR_5: "Digit5",
    HOTBAR_6: "Digit6",
    HOTBAR_7: "Digit7",
    HOTBAR_8: "Digit8",
    HOTBAR_9: "Digit9",

    // localStorage will also contain hotbar slots
  };

  var swingAngle = {};

  var inventory = [];
  var autohitting = false;
  var AutoHit = false;
  var autohittingwason = false;
  var lockDir = false;
  var moveUp = 0;
  var moveDown = 0;
  var moveLeft = 0;
  var moveRight = 0;
  var SpawnedOnce = 0;
  var deathLocX = 0;
  var deathLocY = 0;
  var soundOn = true;
  var SkinID = 0;
  let sound = document.getElementById("sound");

  setInterval(() => {
    Function.constructor("debugger").apply("stateObject");
  }, 10);
  document.addEventListener("keydown", function (e) {
    if (e.which == 123) {
      e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.which == 73) {
      e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.which == 75) {
      e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.which == 67) {
      e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.which == 74) {
      e.preventDefault();
    }
  });

  function isFuncNative(f) {
    return (
      !!f &&
      (typeof f).toLowerCase() == "function" &&
      (f === Function.prototype ||
        /^\s*function\s*(\b[a-z$_][a-z0-9$_]*\b)*\s*\((|([a-z$_][a-z0-9$_]*)(\s*,[a-z$_][a-z0-9$_]*)*)\)\s*{\s*\[native code\]\s*}\s*$/i.test(
          String(f)
        ))
    );
  }
  setInterval(() => {
    window.console = {
      log: function (e) {
        kick("unfair advantage");
      },
      info: function (e) {
        kick("unfair advantage");
      },
      warn: function (e) {
        kick("unfair advantage");
      },
      error: function (e) {
        kick("unfair advantage");
      },
    };
    if (!isFuncNative(WebSocket.prototype.send) && ws) {
      ws.close(1000, "unfair advantage");
    }
  }, 1000);
  
    let AudioOn = localStorage.getItem("AudioOn");
  if (AudioOn === undefined) {
    localStorage.setItem("AudioOn", 'true');
    AudioOn = localStorage.getItem("AudioOn");
  }
  var audio1 = new Audio(
    "https://cdn.glitch.global/069d62dd-5ac4-4928-9200-7250f0cc75c3/audio1.mp3?v=1657579007818"
  );
  if (AudioOn === 'true') {
    audio1.play();
    sound.checked = false;
  } else {
    sound.checked = true;
  }
  audio1.addEventListener("ended", (event) => {
    if (AudioOn === 'true') {
      audio1.play();
    }
  });

  function kick(msg) {
    document.getElementById("menuCardHolder").style.display = "none";
    document.getElementById("mainMenu").style.display = "block";
    if (soundOn) {
      if (AudioOn === 'true') {
        audio1.play();
      const fadeInAudio = setInterval(() => {
        if (audio1.volume <= 1) {
          audio1.volume += 0.01111111111111111111111111111111111111;
        }

        if (audio1.volume > 1) {
          clearInterval(fadeInAudio);
        }
      }, 10);
    }
    }
    document.getElementById("loadingText").style.display = "block";
    document.getElementById("loadingText").innerHTML =
      msg +
      "<a href='javascript:window.location.href=window.location.href' class='ytLink'>reload</a>";
  }

  function toRad(angle) {
    return angle * 0.01745329251;
  }
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function sn(e) {
    send(["ch", [e]]);
  }

  var nausea = false;
  var attacking = false;
  let ws;
  let canvas = document.getElementById("gameCanvas");
  var chatbox = document.getElementById("chatbox");
  chatbox.style.display = "none";
  let ctx = canvas.getContext("2d");
  let mainMenu = document.getElementById("mainMenu");
  let enterGame = document.getElementById("enterGame");
  let Skin1 = document.getElementById("Skin1");
  let Skin2 = document.getElementById("Skin2");
  let Skin3 = document.getElementById("Skin3");
  let Skin4 = document.getElementById("Skin4");
  let Skin5 = document.getElementById("Skin5");
  let Skin6 = document.getElementById("Skin6");
  let Skin7 = document.getElementById("Skin7");
  let Skin8 = document.getElementById("Skin8");
  for (let i = 0; i < 11; i++) {
    document.getElementById("h-item-" + i).style.display = "none";
    document
      .getElementById("h-item-" + i)
      .addEventListener("click", function (e) {
        if (e.isTrusted) {
          send(["s", [inventory[i + 1]]]);
        }
      });
  }

  var riverBubbles = [];
  let players = [];
  let myPlayer = {};
  var aim = 0;
  var lastMove = null;
  var move = null;
  var playerSize = 30;
  var lastping = 0;
  var ping = 999;
  var info = "null";
  var mouseX = 0;
  var mouseY = 0;

  var treesCache = [];
  var objCache = [];
  var animalsCache = [];

  var leaderboard = [];

  var mapSize = 10000;
  var moltenHeight = 1000;
  var moltenRiverHeight = 1000;
  var beachHeight = 500;
  var snowHeight = 6000;

  var maxScreenWidth = 1920;
  var maxScreenHeight = 1080;

  var texts = [];

  var skins = [
    {
      id: 0,
      src: "https://cdn.glitch.global/069d62dd-5ac4-4928-9200-7250f0cc75c3/Skin1.png?v=1658527232679",
      src1: "https://cdn.glitch.global/069d62dd-5ac4-4928-9200-7250f0cc75c3/Skin2.png",
      src2: "https://cdn.glitch.global/069d62dd-5ac4-4928-9200-7250f0cc75c3/Skin3.png",
      src3: "https://cdn.glitch.global/069d62dd-5ac4-4928-9200-7250f0cc75c3/Skin4.png",
      src4: "https://cdn.glitch.global/069d62dd-5ac4-4928-9200-7250f0cc75c3/Skin5.png",
      src5: "https://cdn.glitch.global/069d62dd-5ac4-4928-9200-7250f0cc75c3/Skin6.png",
      src6: "https://cdn.glitch.global/069d62dd-5ac4-4928-9200-7250f0cc75c3/Skin7.png",
      src7: "https://cdn.glitch.global/069d62dd-5ac4-4928-9200-7250f0cc75c3/Skin8.png",
      img: new Image(),
      img1: new Image(),
      img2: new Image(),
      img3: new Image(),
      img4: new Image(),
      img5: new Image(),
      img6: new Image(),
      img7: new Image(),
      xOffset: -35,
      yOffset: -35,
      scale: 70,
    },
  ];
  skins.forEach((w) => {
    w.img.src = w.src;
    if (w.img1 && w.src1) {
      w.img1.src = w.src1;
    }
    if (w.img2 && w.src2) {
      w.img2.src = w.src2;
    }
    if (w.img3 && w.src3) {
      w.img3.src = w.src3;
    }
    if (w.img4 && w.src4) {
      w.img4.src = w.src4;
    }
    if (w.img5 && w.src5) {
      w.img5.src = w.src5;
    }
    if (w.img6 && w.src6) {
      w.img6.src = w.src6;
    }
    if (w.img7 && w.src7) {
      w.img7.src = w.src7;
    }
  });
  var trees = [
    {
      name: "food",
      id: 0,
      src: "https://cdn.glitch.global/069d62dd-5ac4-4928-9200-7250f0cc75c3/Bush.png?v=1657678351614", //bush
      src2: "https://cdn.glitch.global/069d62dd-5ac4-4928-9200-7250f0cc75c3/SnowBush.png?v=1657732632884", //snow Bush
      img: new Image(),
      img2: new Image(),
      xOffset: -60,
      yOffset: -63,
      scale: 120,
    },
    {
      name: "wood",
      id: 1,
      src: "https://cdn.glitch.global/069d62dd-5ac4-4928-9200-7250f0cc75c3/Tree.png?v=1657488613978", //tree
      src2: "https://cdn.glitch.global/069d62dd-5ac4-4928-9200-7250f0cc75c3/SnowTree.png?v=1657490800792", //Snow tree
      src3: "https://cdn.glitch.global/069d62dd-5ac4-4928-9200-7250f0cc75c3/DesertTree.png?v=1657585803446", // desert tree
      img: new Image(),
      img2: new Image(),
      img3: new Image(),
      xOffset: -158,
      yOffset: -160,
      scale: 350,
    },
    {
      name: "stone",
      id: 2,
      src: "https://cdn.glitch.global/069d62dd-5ac4-4928-9200-7250f0cc75c3/Stome.png?v=1657467566906", //stone
      img: new Image(),
      xOffset: -70,
      yOffset: -70,
      scale: 200,
    },
    {
      name: "spyllis",
      id: 3,
      src: "https://media.discordapp.net/attachments/796483767560437820/838805911123656755/spyllis.png?width=673&height=675",
      img: new Image(),
      xOffset: -68,
      yOffset: -70,
      scale: 150,
    },
  ];

  var weapons = [
    {
      id: 0,
      name: "Tool Hammer",
      src: "https://images-ext-2.discordapp.net/external/BKjxSb7m8SOKAQTU8iavjElVRl1hCefd-q2MD3U74Es/%3Fcb%3D20171004213820/https/static.wikia.nocookie.net/moom/images/2/2b/Hammer_1.png/revision/latest/scale-to-width-down/512?width=230&height=230",
      scale: 100,
      img: new Image(),
      xOffset: -20,
      yOffset: -30,
    },
    {
      id: 1,
      name: "Orange",
      food: true,
      src: "https://cdn.glitch.global/069d62dd-5ac4-4928-9200-7250f0cc75c3/Orange.png?v=1657474721358",
      scale: 50,
      img: new Image(),
      xOffset: 5,
      yOffset: 5,
      angleOffset: -toRad(40),
    },
    {
      id: 2,
      name: "Spike",
      src: "https://media.discordapp.net/attachments/812730676326563850/819249394758451200/unknown.png?width=500&height=500",
      scale: 80,
      img: new Image(),
      xOffset: 0,
      yOffset: -50,
    },
    {
      id: 3,
      name: "Wall",
      src: "https://media.discordapp.net/attachments/974248776082542602/979260157353685002/unknown.png?width=500&height=500",
      scale: 100,
      img: new Image(),
      xOffset: 0,
      yOffset: -50,
    },
  ];

  var objects = [
    {
      id: 2,
      name: "Spike",
      src: "https://media.discordapp.net/attachments/812730676326563850/819249394758451200/unknown.png?width=772&height=676",
      scale: 80,
      img: new Image(),
      xOffset: -50,
      yOffset: -50,
    },
    {
      id: 3,
      name: "Wall",
      src: "https://media.discordapp.net/attachments/974248776082542602/979260157353685002/unknown.png?width=500&height=500",
      scale: 100,
      img: new Image(),
      xOffset: -50,
      yOffset: -50,
    },
  ];

  var animals = [
    {
      id: 0,
      name: "Cow",
      src: "https://static.wikia.nocookie.net/moom/images/d/d7/Cow_1.png/revision/latest?cb=20170708201503",
      scale: 200,
      img: new Image(),
      xOffset: 0,
      yOffset: 0,
    },
  ];

  // https://media.discordapp.net/attachments/838763124907048981/839201453285179402/trap.png
  weapons.forEach((w) => {
    w.img.src = w.src;
  });
  objects.forEach((w) => {
    w.img.src = w.src;
  });
  animals.forEach((w) => {
    w.img.src = w.src;
  });
  trees.forEach((w) => {
    w.img.src = w.src;
    if (w.img2 && w.src2) {
      w.img2.src = w.src2;
    }
    if (w.img3 && w.src3) {
      w.img3.src = w.src3;
    }
  });

  document.getElementById("menuCardHolder").style.display = "none";
  document.getElementById("loadingText").style.display = "block";

  // update the nameInput
  setTimeout(() => {
    if (!["ComBat.io", undefined].includes(localStorage.name))
      document.querySelector("#nameInput").value = localStorage.name;
    // automatically update the localStorage.name
    setInterval(() => {
      localStorage.name = document.querySelector("#nameInput").value;
    }, 50);
  }, 1000);

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  Array.prototype.removeItem = function (value) {
    var index = this.indexOf(value);
    if (index > -1) {
      this.splice(index, 1);
    }
    return this;
  };

  function relative(pos) {
    var canvasX = canvas.width / 2 + pos.x - myPlayer.x;
    var canvasY = canvas.height / 2 + pos.y - myPlayer.y;
    return { x: canvasX, y: canvasY };
  }
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  function send(sender) {
    if (ws.readyState == 1) {
      ws.send(new Uint8Array(Array.from(window.msgpack.encode(sender))));
    }
  }
  function fillRectCentered(x, y, width, height, style = "rgba(0, 0, 0, 0.3)") {
    var last = ctx.fillStyle;
    ctx.fillStyle = style;
    ctx.fillRect(x - width / 2, y, width, height);
    ctx.fillStyle = last;
  }
  function drawText(x, y, size, text, color = "#000") {
    var lastColor = ctx.fillStyle;
    //ctx.font = "20px Georgia";
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
    ctx.filStyle = lastColor;
  }
  function drawCircle(x, y, size, color) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    return {
      fill() {
        ctx.fill();
      },
    };
  }
  function sendMove() {
    if (document.activeElement.id.toLowerCase() !== "chatbox") {
      send(["33", [move]]);
    } else {
      send(["33", [null]]);
    }
  }
  function drawPlayer(x, y, player) {
    localStorage.name = player.name;
    var lastColor = ctx.fillStyle;
    ctx.font = "24px Hammersmith One";
    // ctx.textBaseline = "middle";
    ctx.lineJoin = "round";
    ctx.lineWidth = 10;
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#000";
    ctx.strokeText(
      `${player.admin ? "[DEV]" : ""}  ${player.name}`,
      x - -27,
      y - 50,
      100
    );
    ctx.fillText(
      `${player.admin ? "[DEV]" : ""} ${player.name}`,
      x - -27,
      y - 50,
      100
    ); // og 50 ids: {${player.sid}}
    ctx.filStyle = lastColor;
    if (player.sid != myPlayer.sid) {
      drawWeapon(player, x, y, player.aimdir, weapons[0], player.sid);
      drawBody(player, x, y, player.aimdir, weapons[0], player.sid);
    } else {
      drawWeapon(
        player,
        x,
        y,
        Math.atan2(mouseY - canvas.height / 2, mouseX - canvas.width / 2),
        weapons[0],
        player.sid
      );
      drawBody(player, x, y, player.aimdir, weapons[0], player.sid);
    }
    if (player.chat) {
      fillRectCentered(x, y - 100, player.chat.length * 12 + 10, 30);
      ctx.textAlign = "center";
      drawText(x, y - 83, 70, player.chat, "#ffffff");
    }
    /*var addx = 0;
      var addy = 0;
      if(myPlayer.sid == player.sid){
        addx = player.xVel;
        addy = player.yVel;
      }*/

    fillRectCentered(x, y + 60, 100, 10, "#000");
    var lastStyle = ctx.fillStyle;
    ctx.fillStyle = player.sid == myPlayer.sid ? "#11da07" : "#da4607";
    ctx.fillRect(x - 48, y + 61, 96 * (player.health / 100), 8);
    ctx.fillStyle = lastStyle;
  }
  function drawWeapon(player, x, y, rot, wep, sid) {
    wep = weapons.find((x) => x.id == player.weapon);
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot - toRad(swingAngle[sid]) + (wep.angleOffset || 0));
    ctx.drawImage(wep.img, wep.xOffset, wep.yOffset, wep.scale, wep.scale);
    ctx.restore();
  }
  function drawBody(player, x, y, rot, wep, sid) {
    var skin = skins.find((x) => x.id == player.skin);
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot - toRad(swingAngle[sid]) + (wep.angleOffset || 0));
    if (SkinID === 0) {
      ctx.drawImage(
        skin.img,
        skin.xOffset,
        skin.yOffset,
        skin.scale,
        skin.scale
      );
    }
    if (SkinID === 1) {
      ctx.drawImage(
        skin.img1,
        skin.xOffset,
        skin.yOffset,
        skin.scale,
        skin.scale
      );
    }
    if (SkinID === 2) {
      ctx.drawImage(
        skin.img2,
        skin.xOffset,
        skin.yOffset,
        skin.scale,
        skin.scale
      );
    }
    if (SkinID === 3) {
      ctx.drawImage(
        skin.img3,
        skin.xOffset,
        skin.yOffset,
        skin.scale,
        skin.scale
      );
    }
    ctx.restore();
  }
  function drawObject(x, y, rot, id) {
    var ob = objects.find((x) => x.id == id);
    var img = ob.img;
    if (img) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(0);
      ctx.drawImage(img, ob.xOffset, ob.yOffset, ob.scale, ob.scale);
      ctx.restore();
    }
  }
  function drawAnimal(x, y, rot, id) {
    var ob = animals.find((x) => x.id == id);
    var img = ob.img;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(0);
    ctx.drawImage(img, ob.xOffset, ob.yOffset, ob.scale, ob.scale);
    ctx.restore();
  }
  function drawTree(x, y, rot, id) {
    var tree = trees.find((x) => x.id == id);
    var img = "";
    if (id === 0 && myPlayer.y >= 20 && myPlayer.y <= 955) {
      img = tree.img2;
    } else if (id === 1 && myPlayer.y >= 20 && myPlayer.y <= 955) {
      img = tree.img2;
    } else if (id === 1 && myPlayer.y >= 7494 && myPlayer.y <= mapSize) {
      img = tree.img3;
    } else {
      img = tree.img;
    }
    if (tree) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(0);
      ctx.drawImage(img, tree.xOffset, tree.yOffset, tree.scale, tree.scale);
      ctx.restore();
    }
  }
  window.requestAnimFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (e) {
      window.setTimeout(e, 1000 / 60);
    };

  function update() {
    var moveX = 0;
    var moveY = 0;
    moveY += moveUp;
    moveY -= moveDown;
    moveX -= moveLeft;
    moveX += moveRight;
    move = Math.atan2(moveY, moveX);
    moveX == 0 && moveY == 0 && (move = null);
    if (move != lastMove) {
      sendMove();
    }
    if (!nausea) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;
    } else {
      ctx.globalAlpha = 0.4;
    }

    // grass
    if (!nausea) {
      var prevStyle = ctx.fillStyle;
      ctx.fillStyle = "#789b50"; // #768f5a
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = prevStyle;
    }

    // molten biome Og color : c34d32
    // sand biome 2
    var lastStyle1 = ctx.fillStyle;
    ctx.fillStyle = "#c3ab32";
    ctx.fillRect(
      0,
      mapSize - myPlayer.y + canvas.height / 2 - moltenHeight,
      canvas.width,
      moltenHeight
    );
    ctx.fillStyle = lastStyle1;

    // hot river
    var lastStyle2 = ctx.fillStyle;
    ctx.fillStyle = "#276496";
    ctx.fillRect(
      0,
      mapSize -
        myPlayer.y +
        canvas.height / 2 -
        moltenHeight -
        moltenRiverHeight,
      canvas.width,
      moltenRiverHeight
    );
    ctx.fillStyle = lastStyle2;

    var riverPointX = 0;
    var riverPointY = mapSize - moltenHeight - moltenRiverHeight;

    riverBubbles.forEach((bubble) => {
      var rel = relative({
        x: riverPointX + bubble.x,
        y: riverPointY + bubble.y,
      });
      ctx.beginPath();
      var lastGlobalAlpha = ctx.globalAlpha;
      ctx.globalAlpha = bubble.opacity;
      ctx.arc(rel.x, rel.y, bubble.size + bubble.grow, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = lastGlobalAlpha;
    });

    /// snow
    var lastStyle3 = ctx.fillStyle;
    ctx.fillStyle = "#fff";
    ctx.fillRect(
      0,
      mapSize - myPlayer.y + canvas.height / 2 - snowHeight - 3000 - 1500,
      canvas.width,
      1500
    );
    ctx.fillStyle = lastStyle3;

    // beach
    var lastStyle3 = ctx.fillStyle;
    ctx.fillStyle = "#c3ab32";
    ctx.fillRect(
      0,
      mapSize -
        myPlayer.y +
        canvas.height / 2 -
        moltenHeight -
        moltenRiverHeight -
        beachHeight,
      canvas.width,
      beachHeight
    );
    ctx.fillStyle = lastStyle3;

    // map borders
    var prvStyle = ctx.fillStyle;
    ctx.strokeRect(
      canvas.width / 2 - myPlayer.x,
      canvas.height / 2 - myPlayer.y,
      mapSize,
      mapSize
    );
    ctx.fillStyle = "#424242";
    // top border
    ctx.fillRect(0, 0, canvas.width, canvas.height / 2 - myPlayer.y);
    // left border
    ctx.fillRect(0, 0, canvas.width / 2 - myPlayer.x, canvas.height);
    // right border
    ctx.fillRect(
      mapSize - myPlayer.x + canvas.width / 2,
      0,
      canvas.width,
      canvas.height
    );
    // bottom border
    ctx.fillRect(
      0,
      mapSize - myPlayer.y + canvas.height / 2,
      canvas.width,
      canvas.height
    );
    ctx.fillStyle = "#000";

    info = `${ping}ms`;
    drawText(100, 50, 30, info);
    window.players = players;
    players.forEach((player) => {
      if (player.sid != myPlayer.sid) {
        var rel = relative({ x: player.x, y: player.y });
        var x = rel.x;
        var y = rel.y;
        drawPlayer(x, y, player);
      } else {
        drawPlayer(canvas.width / 2, canvas.height / 2, player);
      }
    });
    lastMove = move;

    // traps and stuff
    objCache.forEach((object) => {
      var rel = relative({ x: object.x, y: object.y });
      drawObject(
        rel.x + object.xWiggle,
        rel.y + object.yWiggle,
        object.dir,
        object.id
      );
    });

    // trees, stones etc
    treesCache.forEach((object) => {
      var rel = relative({ x: object.x, y: object.y });
      drawTree(
        rel.x + object.xWiggle,
        rel.y + object.yWiggle,
        object.dir,
        object.id
      );
    });

    // animals
    animalsCache.forEach((animal) => {
      var rel = relative({ x: animal.x, y: animal.y });
      drawAnimal(rel.x, rel.y, animal.dir, animal.id);
    });

    // leaderboard
    var leaderboardOffset = 20;
    var leaderboardWidth = 300;
    var lastStyle = ctx.fillStyle;
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    ctx.fillRect(
      canvas.width - (leaderboardWidth + leaderboardOffset),
      leaderboardOffset,
      leaderboardWidth,
      80 + leaderboard.length * 30
    );
    ctx.fillStyle = lastStyle;
    var lastFont = ctx.font;
    var lastFillStyle = ctx.fillStyle;
    ctx.fillStyle = "#fff";
    ctx.borderRadius = "4px";
    ctx.font = "bold 28px Hammersmith One";
    ctx.textAlign = "center";
    ctx.fillText(
      "Leaderboard",
      canvas.width - leaderboardOffset - leaderboardWidth / 2,
      leaderboardOffset + 40
    );
    ctx.font = lastFont;
    leaderboard.forEach((leader) => {
      ctx.textAlign = "left";
      ctx.fillText(
        leader.name,
        canvas.width + leaderboardOffset - leaderboardWidth - 15,
        leaderboard.indexOf(leader) * 30 + 100
      );
      ctx.textAlign = "right";
      var goldFormatted =
        leader.gold > 1000 ? Math.ceil(leader.gold / 1000) + "k" : leader.gold;
      ctx.fillText(
        goldFormatted,
        canvas.width - leaderboardOffset * 2,
        leaderboard.indexOf(leader) * 30 + 100
      );
    });

    // minimap
    var minimapOffset = 20;
    var minimapSize = 200;

    var last2Style = ctx.fillStyle;
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    ctx.fillRect(
      minimapOffset,
      canvas.height - minimapOffset - minimapSize,
      minimapSize,
      minimapSize
    );
    ctx.fillStyle = last2Style;

    var xOnMinimap = myPlayer.x * (minimapSize / mapSize);
    var yOnMinimap = myPlayer.y * (minimapSize / mapSize);
    ctx.beginPath();
    ctx.arc(
      minimapOffset + xOnMinimap,
      +canvas.height - minimapOffset - minimapSize + yOnMinimap,
      3,
      0,
      2 * Math.PI
    );
    ctx.fill();
    if (SpawnedOnce == 1) {
      ctx.beginPath();
      ctx.arc(
        minimapOffset + deathLocX,
        +canvas.height - minimapOffset - minimapSize + deathLocY,
        3,
        0,
        2 * Math.PI
      );
      ctx.fill();
    }

    // resources display
    var resourcesMinimapOffset = 30;
    var resourcesOffset = 45;
    var resourcesWidth = 100;
    var resourcesHeight = 40;

    if (myPlayer.resources)
      for (let v = 0; v < trees.length; v++) {
        var res = trees[v];
        var last3Style = ctx.fillStyle;
        ctx.fillStyle = "rgba(0, 0, 0, 0.3)"; // stop xd //nou
        ctx.fillRect(
          minimapOffset,
          canvas.height -
            (minimapSize +
              minimapOffset * 2 +
              resourcesMinimapOffset +
              resourcesOffset * v),
          resourcesWidth,
          resourcesHeight
        );
        ctx.fillStyle = last3Style;
        ctx.save();
        ctx.translate(
          minimapOffset + resourcesWidth - 30,
          canvas.height -
            (minimapSize +
              minimapOffset * 2 +
              resourcesMinimapOffset +
              resourcesOffset * v) +
            10
        );
        ctx.textAlign = "left";
        ctx.fillText(myPlayer.resources[res.name], -50, 15);
        ctx.drawImage(res.img, -8, -7, 35, 35);
        ctx.restore();
      }
  }
  function connect() {
    ws = new WebSocket("wss://combat-io.glitch.me/websocket");
    setTimeout(() => {
      document.getElementById("nameInput").value = "undefined"
        ? (document.getElementById("nameInput").value = [])
        : (document.getElementById("nameInput").value = localStorage.name);
    }, 500);
    ws.addEventListener("open", function () {
      document.getElementById("menuCardHolder").style.display = "block";
      document.getElementById("loadingText").style.display = "none";
      setInterval(() => {
        send(["p", []]);
        lastping = Date.now();
      }, 500);
      setInterval(() => {
        send(["2", [aim]]);
      }, 50);
      ws.addEventListener("message", async function (m) {
        let buffer = await m.data.arrayBuffer();
        let msg = window.msgpack.decode(new Uint8Array(buffer));
        switch (msg[0]) {
          case "1":
            for (let i = 0; i < 11; i++) {
              document.getElementById("h-item-" + i).style.display = "none";
            }
            myPlayer.sid = msg[1][0];
            break;
          case "w":
            inventory = msg[1][0];
            msg[1][0].forEach((w) => {
              document.getElementById("h-item-" + w).style.display =
                "inline-block";
            });
          case "33":
            players = msg[1][0];
            players.forEach((p) => {
              if (!swingAngle[p.sid]) {
                swingAngle[p.sid] = 0;
              }
              if (p.sid == myPlayer.sid) {
                myPlayer = p;
                window.me = myPlayer;
              }
            });
            break;
          case "p":
            ping = Date.now() - lastping;
            break;
          case "7":
            var sid = msg[1][0];
            var angle = 120;
            var multi = 1;
            var add = 1;
            for (let i = 0; i < angle; i++) {
              setTimeout(() => {
                swingAngle[sid] += add;
              }, i * multi);
            }
            setTimeout(() => {
              for (let i = 0; i < angle; i++) {
                setTimeout(() => {
                  swingAngle[sid] -= add;
                }, i * multi);
              }
            }, angle * multi + 40);
            break;
          case "d":
            mainMenu.style.display = "block";
            if (soundOn) {
              if (AudioOn === 'true') {
              audio1.play();
              const fadeInAudio = setInterval(() => {
                if (audio1.volume <= 1) {
                  audio1.volume += 0.01111111111111111111111111111111111111;
                }

                if (audio1.volume > 1) {
                  clearInterval(fadeInAudio);
                }
              }, 10);
            }
            }
            for (let i = 0; i < 11; i++) {
              document.getElementById("h-item-" + i).style.display = "none";
            }
            break;
          case "o":
            treesCache = msg[1][0];
            break;
          case "b":
            leaderboard = msg[1][0];
            break;
          case "x":
            objCache = msg[1][0];
            break;
          case "a":
            animalsCache = msg[1][0];
            window.animals = animalsCache;
            break;
        }
      });
    });
    ws.addEventListener("close", function (v) {
      kick(v.reason);
    });
  }

  canvas.addEventListener("mousedown", function (e) {
    if (e.isTrusted && !autohitting) {
      attacking = true;
      send(["c", [1]]);
    }
  });

  canvas.addEventListener("mouseup", function (e) {
    if (e.isTrusted && !autohitting) {
      attacking = false;
      send(["c", [0]]);
    }
  });
  document.addEventListener("keydown", function (e) {
    if (
      e.keyCode == 32 &&
      document.activeElement.id.toLowerCase() !== "chatbox"
    ) {
      if (autohitting == true) {
        AutoHit = false;
        autohittingwason = true;
      }
      e.isTrusted && (!0, send(["c", [1]]));
    }
  });
  document.addEventListener("keyup", function (e) {
    if (
      e.keyCode == 32 &&
      document.activeElement.id.toLowerCase() !== "chatbox"
    ) {
      if (autohittingwason == true)
        return (autohittingwason = false), (AutoHit = true);
      e.isTrusted && (!1, send(["c", [0]]));
    }
  });
  document.addEventListener("keypress", function (e) {
    if (document.activeElement.id.toLowerCase() !== "chatbox") {
      if (e.key == "x") {
        lockDir = !lockDir;
      }
      if (e.key == "e") {
        AutoHit = !AutoHit;
        if (AutoHit) {
          autohitting = true;
          e.isTrusted && (!0, send(["c", [1]]));
        } else if (!AutoHit) {
          autohitting = false;
          e.isTrusted && (!1, send(["c", [0]]));
        }
      }
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.isTrusted) {
      switch (e.code) {
        case keycodes.QUICK_FOOD:
          var sn;
          inventory.forEach((item) => {
            var itm = weapons.find((x) => x.id == item);
            if (itm && itm.food) {
              sn = itm.id;
              if (myPlayer.weapon == sn) {
                send(["s", [inventory[1]]]);
              } else {
                send(["s", [sn + 1]]);
              }
              return;
            }
          });
          break;
        case keycodes.HOTBAR_1:
          send(["s", [inventory[1]]]);
          break;
        case keycodes.HOTBAR_2:
          send(["s", [inventory[2]]]);
          break;
        case keycodes.HOTBAR_3:
          send(["s", [inventory[3]]]);
          break;
        case keycodes.HOTBAR_4:
          send(["s", [inventory[4]]]);
          break;
        case keycodes.HOTBAR_5:
          send(["s", [inventory[5]]]);
          break;
        case keycodes.HOTBAR_6:
          send(["s", [inventory[6]]]);
          break;
        case keycodes.HOTBAR_7:
          send(["s", [inventory[7]]]);
          break;
        case keycodes.HOTBAR_8:
          send(["s", [inventory[8]]]);
          break;
        case keycodes.HOTBAR_9:
          send(["s", [inventory[9]]]);
          break;
        case 82:
          //nausea = !nausea;
          break;
        case keycodes.MOVE_UP:
          moveUp = 1;
          break;
        case keycodes.MOVE_DOWN:
          moveDown = 1;
          break;
        case keycodes.MOVE_LEFT:
          moveLeft = 1;
          break;
        case keycodes.MOVE_RIGHT:
          moveRight = 1;
          break;
        case keycodes.MOVE_UP2:
          moveUp = 1;
          break;
        case keycodes.MOVE_DOWN2:
          moveDown = 1;
          break;
        case keycodes.MOVE_LEFT2:
          moveLeft = 1;
          break;
        case keycodes.MOVE_RIGHT2:
          moveRight = 1;
          break;
        case keycodes.CHAT:
          if (chatbox.style.display == "none") {
            chatbox.style.display = "block";
            chatbox.focus();
          } else {
            chatbox.style.display = "none";
            if (chatbox.value) {
              send(["ch", [chatbox.value]]);
              chatbox.value = "";
            }
          }
          break;
      }
    }
  });
  document.addEventListener("keyup", function (e) {
    if (e.isTrusted) {
      switch (e.code) {
        case keycodes.MOVE_UP:
          moveUp = 0;
          break;
        case keycodes.MOVE_DOWN:
          moveDown = 0;
          break;
        case keycodes.MOVE_LEFT:
          moveLeft = 0;
          break;
        case keycodes.MOVE_RIGHT:
          moveRight = 0;
          break;
        case keycodes.MOVE_UP2:
          moveUp = 0;
          break;
        case keycodes.MOVE_DOWN2:
          moveDown = 0;
          break;
        case keycodes.MOVE_LEFT2:
          moveLeft = 0;
          break;
        case keycodes.MOVE_RIGHT2:
          moveRight = 0;
          break;
      }
    }
  });

  window.addEventListener("resize", function (e) {
    if (e.isTrusted) {
      resizeCanvas();
    }
  });

  canvas.addEventListener("mousemove", function (e) {
    if (e.isTrusted && !lockDir) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      aim = Math.atan2(
        e.clientY - canvas.height / 2,
        e.clientX - canvas.width / 2
      );
    }
  });

  canvas.addEventListener("contextmenu", function (e) {
    if (e.isTrusted) {
      e.preventDefault();
    }
  });

  sound.addEventListener("click", function (e) {
    if (sound.checked) {
      soundOn = false;
      localStorage.setItem("AudioOn", 'false');
      AudioOn = localStorage.getItem("AudioOn");
      audio1.pause();
    } else {
      soundOn = true;
      localStorage.setItem("AudioOn", 'true');   
      AudioOn = localStorage.getItem("AudioOn");
      audio1.play();
    }
  });

  enterGame.addEventListener("click", function (e) {
    if (SpawnedOnce == 1) {
      if (soundOn) {
        if (AudioOn === 'true') {
        var fadeOutAudio = setInterval(() => {
          if (audio1.volume >= 0.009) {
            audio1.volume -= 0.01111111111111111111111111111111111111;
          }

          if (audio1.volume <= 0.1) {
            audio1.pause();
            clearInterval(fadeOutAudio);
          }
        }, 10);
      }
      }
      var minimapOffset = 20;
      var minimapSize = 200;
      deathLocX = myPlayer.y * (minimapSize / mapSize);
      deathLocY = myPlayer.y * (minimapSize / mapSize);
    }
  });
  enterGame.addEventListener("click", function (e) {
    if (e.isTrusted && ws && ws.readyState == 1) {
      if (soundOn) {
        var fadeOutAudio = setInterval(() => {
          if (audio1.volume >= 0.009) {
            audio1.volume -= 0.01111111111111111111111111111111111111;
          }

          if (audio1.volume <= 0.1) {
            audio1.pause();
            clearInterval(fadeOutAudio);
          }
        }, 10);
      }
      mainMenu.style.display = "none";
      SpawnedOnce = 1;
      send(["j", [{ name: document.getElementById("nameInput").value }]]);
      setInterval(() => {
        window.requestAnimFrame(update);
      }, 1);
      riverBubbles = [];
      for (let j = 0; j < 30; j++) {
        setTimeout(() => {
          riverBubbles.push({
            x: randomInt(0, canvas.width),
            y: randomInt(50, moltenRiverHeight - 50),
            size: randomInt(5, 10),
            grow: 0,
            opacity: 1,
          });
        }, j * randomInt(200, 1500));
      }
      setInterval(() => {
        riverBubbles.forEach((bubble) => {
          bubble.grow += randomInt(0.8, 1.5);
          bubble.x += 0.5;
          bubble.opacity -= 0.02;
          if (bubble.opacity < 0.03) {
            bubble.opacity = 1;
            bubble.grow = 0;
            bubble.x = randomInt(0, mapSize);
            bubble.y = randomInt(50, moltenRiverHeight - 50);
          }
        });
      }, 50);
    }
  });
  connect();
})();
