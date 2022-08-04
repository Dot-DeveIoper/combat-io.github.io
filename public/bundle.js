// IMPORTANT --- IMPORTANT
// BUNDLE BACKUP AS OF 07/26/2022 19:14 EST

//?
// SAVE OF "bundle.js" EDIT THIS THEN USE "https://obfuscator.io/", THEN MOVE TO MAIN "bundle.js"
// USE "Domain Lock" AND SET TO "https://combat-io.glitch.me" SAVE "Identifier Names Generator" AS "Mangled-shuffled".
//?

var SkinID = 0;
function setSkin(num) {
  for (let i = 1; i <= 8; i++) {
    if (i == num) {
      document.getElementById("skin" + i).style.borderRadius = "25%";
    } else {
      document.getElementById("skin" + i).style.borderRadius = "50%";
    }
  }
  SkinID = num - 1;
}

(function (e) {
  let settingsDiv = document.getElementById("rightCardHolder");
  let settingsToggle = document.getElementById("toggleSettings");
  let settingsText = document.querySelector("#toggleSettings");

  settingsToggle.onclick = function (e) {
    if (e.isTrusted) {
      if (settingsText.innerHTML === "Open Settings") {
        settingsDiv.style.display = "inline-block";
        settingsText.innerHTML = "Close Settings";
      } else {
        settingsDiv.style.display = "none";
        settingsToggle.style.zIndex = "1";
        settingsText.innerHTML = "Open Settings";
      }
    }
  };

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
    BASE: "KeyV",

    HOTBAR_1: "Digit1",
    HOTBAR_2: "Digit2",
    HOTBAR_3: "Digit3",
    HOTBAR_4: "Digit4",
    HOTBAR_5: "Digit5",
    HOTBAR_6: "Digit6",
    HOTBAR_7: "Digit7",
    HOTBAR_8: "Digit8",
    HOTBAR_9: "Digit9",
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
  var deathLocX = -40;
  var deathLocY = 0;
  var baseLocX = -40;
  var baseLocY = 0;
  var soundOn = true;
  var sound = document.getElementById("sound");
  var killstreak = 0;
  let age = 1;
  let ageChange = false;
  var Base = 0;

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
    localStorage.setItem("AudioOn", "true");
    AudioOn = localStorage.getItem("AudioOn");
  }
  var audio1 = new Audio(
    "https://cdn.glitch.global/069d62dd-5ac4-4928-9200-7250f0cc75c3/audio1.mp3?v=1657579007818"
  );
  if (AudioOn === "true") {
    audio1.play();
    sound.checked = false;
  } else {
    sound.checked = true;
  }
  audio1.addEventListener("ended", (event) => {
    if (AudioOn === "true") {
      audio1.play();
    }
  });

  function kick(msg) {
    document.getElementById("menuCardHolder").style.display = "none";
    document.getElementById("mainMenu").style.display = "block";
    if (soundOn) {
      if (AudioOn === "true") {
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
  let ageBar = document.getElementById("ageBar");
  let ageLevelBar = document.getElementById("ageLevelBar");
  let ageCounter = document.getElementById("ageCounter");
  let enterGame = document.getElementById("enterGame");
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
      src: "https://cdn.glitch.global/069d62dd-5ac4-4928-9200-7250f0cc75c3/Skin2.png?v=99999999999999",
      src1: "https://cdn.glitch.global/069d62dd-5ac4-4928-9200-7250f0cc75c3/Skin1.png?v=99999999999999",
      src2: "https://cdn.glitch.global/069d62dd-5ac4-4928-9200-7250f0cc75c3/Skin4.png?v=99999999999999",
      src3: "https://cdn.glitch.global/069d62dd-5ac4-4928-9200-7250f0cc75c3/Skin3.png?v=99999999999999",
      src4: "https://cdn.glitch.global/069d62dd-5ac4-4928-9200-7250f0cc75c3/Skin5.png?v=99999999999999",
      src5: "https://cdn.glitch.global/069d62dd-5ac4-4928-9200-7250f0cc75c3/Skin6.png?v=99999999999999",
      src6: "https://cdn.glitch.global/069d62dd-5ac4-4928-9200-7250f0cc75c3/Skin7.png?v=99999999999999",
      src7: "https://cdn.glitch.global/069d62dd-5ac4-4928-9200-7250f0cc75c3/Skin8.png?v=99999999999999",
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
      name: "wood",
      id: 0,
      src: "https://cdn.glitch.global/069d62dd-5ac4-4928-9200-7250f0cc75c3/Tree.png?v=1657488613978", //tree
      img: new Image(),
      xOffset: -158,
      yOffset: -160,
      scale: 350,
    },
        {
      name: "wood2",
      id: 1,
      src: "https://cdn.glitch.global/069d62dd-5ac4-4928-9200-7250f0cc75c3/SnowTree.png?v=1657490800792", //Snow tree
      img: new Image(),
      xOffset: -158,
      yOffset: -160,
      scale: 350,
    },
    {
      name: "food",
      id: 2,
      src: "https://cdn.glitch.global/069d62dd-5ac4-4928-9200-7250f0cc75c3/Bush.png?v=1657678351614", //bush
      img: new Image(),
      xOffset: -60,
      yOffset: -63,
      scale: 120,
    },
        {
      name: "food2",
      id: 3,
      src: "https://cdn.glitch.global/069d62dd-5ac4-4928-9200-7250f0cc75c3/SnowBush.png?v=1657732632884", //snow Bush
      img: new Image(),
      xOffset: -60,
      yOffset: -63,
      scale: 120,
    },
    {
      name: "stone",
      id: 4,
      src: "https://cdn.glitch.global/069d62dd-5ac4-4928-9200-7250f0cc75c3/Stone.png?v=1658803298574", //stone
      img: new Image(),
      xOffset: -100,
      yOffset: -100,
      scale: 190,
    },
    {
      name: "gold",
      id: 5,
      src: "https://cdn.glitch.global/069d62dd-5ac4-4928-9200-7250f0cc75c3/Gold.png?v=1658847400405", //gold
      img: new Image(),
      xOffset: -68,
      yOffset: -70,
      scale: 150,
    },
    {
      name: "ruby",
      id: 6,
      src: "https://cdn.glitch.global/069d62dd-5ac4-4928-9200-7250f0cc75c3/RUBY.png?v=1658978333539", //ruby
      img: new Image(),
      xOffset: -158,
      yOffset: -160,
      scale: 350,
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
      src: "https://cdn.glitch.global/069d62dd-5ac4-4928-9200-7250f0cc75c3/WoodWallV%5B2%5D.webp?v=1659183780096",
      scale: 80,
      img: new Image(),
      xOffset: 0,
      yOffset: -50,
    },
  ];
  
    var WallTop = new Image();
    WallTop.src = 'https://cdn.glitch.global/069d62dd-5ac4-4928-9200-7250f0cc75c3/imgonline-com-ua-tile-dL6QNdG65VSS3U.png?v=1659628448349';
  
    var WallRight = new Image();
    WallRight.src = 'https://cdn.glitch.global/069d62dd-5ac4-4928-9200-7250f0cc75c3/Wall_Horizontal.png?v=1659568444068';


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
      src: "https://cdn.glitch.global/069d62dd-5ac4-4928-9200-7250f0cc75c3/WoodWallV%5B2%5D.webp?v=1659183780096",
      scale: 80,
      img: new Image(),
      xOffset: -50,
      yOffset: -50,
    },
  ];

  var animals = [
    {
      id: 0,
      name: "Cow",
      src: "", //"https://cdn.glitch.global/069d62dd-5ac4-4928-9200-7250f0cc75c3/Cow.png?v=1658781233539",
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
  });

  document.getElementById("menuCardHolder").style.display = "none";
  ageBar.style.display = "none";
  document.getElementById("loadingText").style.display = "block";

  // update the nameInput
  setTimeout(() => {
    if (!["ComBat.io", undefined].includes(localStorage.name))
      document.querySelector("#nameInput").value = localStorage.name;
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
    return {
      x: canvasX,
      y: canvasY,
    };
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
    ctx.textAlign = "center";
    ctx.font = "24px Hammersmith One";
    ctx.lineJoin = "round";
    ctx.lineWidth = 10;
    ctx.fillStyle = player.admin ? "#30d1a1" : "#fff";
    ctx.strokeStyle = "#000";
    ctx.strokeText(
      `${player.admin ? "[DEV]" : ""} ${player.name}`,
      x - 7,
      y - 50
    );
    ctx.fillText(
      `${player.admin ? "[DEV]" : ""} ${player.name}`,
      x - 7,
      y - 50
    ); // og 50 ids: {${player.sid}}
    ctx.filStyle = lastColor;
    if (player.sid != myPlayer.sid) {
      drawWeapon(player, x, y, player.aimdir, weapons[0], player.sid);
    } else {
      drawWeapon(
        player,
        x,
        y,
        Math.atan2(mouseY - canvas.height / 2, mouseX - canvas.width / 2),
        weapons[0],
        player.sid
      );
    }
    if (player.chat) {
      fillRectCentered(x, y - 110, player.chat.length * 12 + 10, 30);
      ctx.textAlign = "center";
      drawText(x, y - 88, 70, player.chat, "#ffffff");
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
    var skin = skins.find((x) => x.id == player.skin);
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot - toRad(swingAngle[sid]) + 0);
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
    if (SkinID === 4) {
      ctx.drawImage(
        skin.img4,
        skin.xOffset,
        skin.yOffset,
        skin.scale,
        skin.scale
      );
    }
    if (SkinID === 5) {
      ctx.drawImage(
        skin.img5,
        skin.xOffset,
        skin.yOffset,
        skin.scale,
        skin.scale
      );
    }
    if (SkinID === 6) {
      ctx.drawImage(
        skin.img6,
        skin.xOffset,
        skin.yOffset,
        skin.scale,
        skin.scale
      );
    }
    if (SkinID === 7) {
      ctx.drawImage(
        skin.img7,
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
  ///mapSize - myPlayer.y + canvas.height / 2 - snowHeight - 3000 - 1500,
  function drawTree(x, y, rot, id) {
    var tree = trees.find((x) => x.id == id);
    if (tree) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(0);
      ctx.drawImage(
        tree.img,
        tree.xOffset,
        tree.yOffset,
        tree.scale,
        tree.scale
      );
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
    if (myPlayer.health < 100) {
      send(["ud"]);
    }
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
      moltenHeight + 550
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
    ctx.fillStyle = "#f5f5f5";
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

    ctx.strokeStyle = "rgb(105,105,105, 0.2)";
    for (var x = canvas.width / 2 - myPlayer.x - 1000; x < mapSize; x += 55) {
      ctx.moveTo(x, 0);
      ctx.lineWidth = "5";
      ctx.lineTo(x, mapSize);
    }
    for (var y = canvas.height / 2 - myPlayer.y - 1000; y < mapSize; y += 55) {
      ctx.moveTo(0, y);
      ctx.lineWidth = "5";
      ctx.lineTo(mapSize, y);
    }
    ctx.stroke();
//     ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
//     // top border
//     ctx.fillRect(0, 0, canvas.width, canvas.height / 2 - myPlayer.y);
//     // left border
//     ctx.fillRect(0, 0, canvas.width / 2 - myPlayer.x, canvas.height);
//     // right border
//     ctx.fillRect(
//       mapSize - myPlayer.x + canvas.width / 2,
//       0,
//       canvas.width,
//       canvas.height
//     );
//     // bottom border
//     ctx.fillRect(
//       0,
//       mapSize - myPlayer.y + canvas.height / 2,
//       canvas.width,
//       40
//     );
    ctx.fillStyle = "#000";

    window.players = players;
    players.forEach((player) => {
      if (player.sid != myPlayer.sid) {
        var rel = relative({
          x: player.x,
          y: player.y,
        });
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
      var rel = relative({
        x: object.x,
        y: object.y,
      });
      drawObject(
        rel.x + object.xWiggle,
        rel.y + object.yWiggle,
        object.dir,
        object.id
      );
    });

    // trees, stones etc
    treesCache.forEach((object) => {
      var rel = relative({
        x: object.x,
        y: object.y,
      });
      drawTree(
        rel.x + object.xWiggle,
        rel.y + object.yWiggle,
        object.dir,
        object.id
      );
    });

    // animals
    animalsCache.forEach((animal) => {
      var rel = relative({
        x: animal.x,
        y: animal.y,
      });
      drawAnimal(rel.x, rel.y, animal.dir, animal.id);
    });

    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
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
 
//     //Bottom border wall
//     ctx.drawImage(WallTop,
//       canvas.width / 2 - myPlayer.x,
//       mapSize - myPlayer.y + canvas.height / 2,
//       mapSize,
//       200
//       );
    
//     //top border wall
//     ctx.drawImage(WallTop,
//       canvas.width / 2 - myPlayer.x,
//       canvas.height / 2 - myPlayer.y - 178,
//       mapSize,
//       200
//       );
    
//     //left border wall
//       ctx.drawImage(WallRight,
//       canvas.width / 2 - myPlayer.x - 200,
//       canvas.height / 2 - myPlayer.y,
//       200,
//       mapSize
//       );
    
//     //right border wall
//     ctx.drawImage(WallRight,
//       canvas.width / 2 - myPlayer.x + mapSize - 20,
//       canvas.height / 2 - myPlayer.y,
//       200,
//       mapSize
//       );
    
    info = `${ping}ms`;
    drawText(100, 50, 30, info);
    
    // leaderboard
    // leaderboard
    var lastStyle = ctx.fillStyle;
    var lastFillStyle = ctx.fillStyle;
    ctx.fillStyle = "#fff";
    
    function gold(num) {
      return leaderboard[num].gold > 1000 ? Math.ceil(leaderboard[num].gold / 1000) + "k" : leaderboard[num].gold
    }
    
    if (leaderboard[0]) {document.getElementById("players").innerHTML = "<div style='float:left;'>" + leaderboard[0].name + "</div><div style='float: right;color:gold;'>" + gold(0) + "</div>" + "<br>";}
    if (leaderboard[1]) {document.getElementById("players").innerHTML +="<div style='float:left;'>" + leaderboard[1].name + "</div><div style='float: right;color:gold;'>" + gold(1) + "</div>" + "<br>";}
    if (leaderboard[2]) {document.getElementById("players").innerHTML +="<div style='float:left;'>" + leaderboard[2].name + "</div><div style='float: right;color:gold;'>" + gold(2) + "</div>" + "<br>";}
    if (leaderboard[3]) {document.getElementById("players").innerHTML +="<div style='float:left;'>" + leaderboard[3].name + "</div><div style='float: right;color:gold;'>" + gold(3) + "</div>" + "<br>";}
    if (leaderboard[4]) {document.getElementById("players").innerHTML +="<div style='float:left;'>" + leaderboard[4].name + "</div><div style='float: right;color:gold;'>" + gold(4) + "</div>" + "<br>";}
    if (leaderboard[5]) {document.getElementById("players").innerHTML +="<div style='float:left;'>" + "And " + leaderboard.length - 5 + "more...";}

    // minimap
    // minimap
    var minimapOffset = 20;
    var minimapSize = 200;

    var last2Style = ctx.fillStyle;
    
    ctx.fillStyle = "#000";
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
      ctx.fillStyle = "#ff0000";
      ctx.beginPath();
      ctx.arc(
        minimapOffset + deathLocX,
        +canvas.height - minimapOffset - minimapSize + deathLocY,
        3,
        0,
        2 * Math.PI
      );
      ctx.fill();
      ctx.fillStyle = last2Style;
    }
    if (Base == 1) {
      ctx.fillStyle = "#00ffff";
      ctx.beginPath();
      ctx.arc(
        minimapOffset + baseLocX,
        +canvas.height - minimapOffset - minimapSize + baseLocY,
        3,
        0,
        2 * Math.PI
      );
      ctx.fill();
      ctx.fillStyle = last2Style;
    }
    // resources display
    var resourcesMinimapOffset = 30;
    var resourcesOffset = 45;
    var resourcesWidth = 100;
    var resourcesHeight = 40;
    if (myPlayer.resources) {
      document.getElementById("Ruby").innerHTML = myPlayer.resources[trees[6].name];
      document.getElementById("Gold").innerHTML = myPlayer.resources[trees[5].name];
      document.getElementById("Stone").innerHTML = myPlayer.resources[trees[4].name];
      document.getElementById("Bush").innerHTML = myPlayer.resources[trees[2].name];
      document.getElementById("Tree").innerHTML = myPlayer.resources[trees[0].name];
    }
    if (age < 999 && age != "MAX") {
      if (ageLevelBar.style.width === "100%" && !ageChange) {
        ageLevelBar.style.width = "0%";
        age += 1;
        myPlayer.xp = 0;
        ageChange = true;
        setTimeout(() => {
          ageChange = false;
        }, 45000);
      } else {
        ageLevelBar.style.width = myPlayer.xp + "%";
      }
    } else {
      age = "MAX";
      ageLevelBar.style.width = "100%";
    }
    ageCounter.innerHTML = age;
  }
  function connect() {
    if (window.location.href.includes("https://anarchy-combat-io.glitch.me")) {
      ws = new WebSocket("wss://anarchy-combat-io.glitch.me/websocket");
    } else {
      ws = new WebSocket("wss://combat-io.glitch.me/websocket");
    }
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
            if (
              window.location.href.includes(
                "https://anarchy-combat-io.glitch.me"
              )
            ) {
              send(["dv"]);
            }
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
              if (AudioOn === "true") {
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
          // nausea = !nausea;
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
        case keycodes.BASE:
          baseLocX = myPlayer.x * (200 / mapSize);
          baseLocY = myPlayer.y * (200 / mapSize);
          Base = 1;
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
      localStorage.setItem("AudioOn", "false");
      AudioOn = localStorage.getItem("AudioOn");
      audio1.pause();
    } else {
      soundOn = true;
      localStorage.setItem("AudioOn", "true");
      AudioOn = localStorage.getItem("AudioOn");
      audio1.play();
    }
  });

  enterGame.addEventListener("click", function (e) {
    if (SpawnedOnce == 1) {
      if (soundOn) {
        if (AudioOn === "true") {
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
      deathLocX = myPlayer.x * (minimapSize / mapSize);
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
      age = 1;
      ageBar.style.display = "inline-block";
      SpawnedOnce = 1;
      send([
        "j",
        [
          {
            name: document.getElementById("nameInput").value,
          },
        ],
      ]);
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
