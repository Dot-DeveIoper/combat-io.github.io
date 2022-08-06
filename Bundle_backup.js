
function joystick(data) {
  var front = front || {
    radius: 25,
    color: "#51515199"
  };
  var back = back || {
    radius: 50,
    color: "#70707047"
  };
  var r = front.radius,
  R = back.radius;
  var c = front.color,
  C = back.color;

  var touch = {
    on: false
  };

  var start = function(e) {
    if (touch && !touch.on) {
      touch = {
        x: e.clientX || e.touches[0].clientX,
        y: e.clientY || e.touches[0].clientY,
        on: true
      };

      this.back = document.createElement("div");
      this.back.style.position = "absolute";
      this.back.style.width = 2 * R +"px";
      this.back.style.height = 2 * R +"px";
      // this.back.style.border = "solid #515151";
      // this.back.style.borderWidth = "0.5px";
      this.back.style.borderRadius = "50%";
      this.back.style.background = C;

      this.front = document.createElement("div");
      this.front.style.position = "absolute";
      this.front.style.width = 2 * r +"px";
      this.front.style.height = 2 * r +"px";
      // this.front.style.border = "solid #707070";
      // this.front.style.borderWidth = "0.5px";
      this.front.style.borderRadius = "50%";
      this.front.style.background = c;

      this.front.style.left = touch.x - r +"px";
      this.front.style.top = touch.y - r +"px";
      this.back.style.left = touch.x - R +"px";
      this.back.style.top = touch.y - R +"px";

      document.body.appendChild(this.back);
      document.body.appendChild(this.front);
    }
  };

  var move = function(e) {
    var x = e.clientX || e.touches[0].clientX;
    var y = e.clientY || e.touches[0].clientY;
    if (touch && touch.on) {
      var dx = x - touch.x;
      var dy = y - touch.y;
      var l = Math.hypot(dx, dy);
      var max = 4 * R/5;
      if (l > max) {
        dx *= max/l; dy *= max/l;
      }
      this.front.style.left = parseFloat(this.back.style.left) + dx + r/2 + 12+"px";
      this.front.style.top = parseFloat(this.back.style.top)+ dy + r/2 + 12+"px";
      data({
        dx: dx, dy: dy
      }); // Move
    }
  };

  var stop = function(e) {
    if (touch && touch.on) {
      document.body.removeChild(this.back);
      document.body.removeChild(this.front);
      touch.on = false;
      data({
        dx: 0, dy: 0
      }); // Prevent player from moving
    }
  };

  // Listeners
  document.addEventListener("touchstart", start);
  document.addEventListener("touchmove", move);
  document.addEventListener("touchend", stop);
  document.addEventListener("touchcancel", stop);

  // document.addEventListener("click", start);
  document.addEventListener("mousedown", start);
  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", stop);
}

function joystick2(data) {
  var front = front || {
    radius: 25,
    color: "#51515199"
  };
  var back = back || {
    radius: 50,
    color: "#70707047"
  };
  var r = front.radius,
  R = back.radius;
  var c = front.color,
  C = back.color;

  var touch = {
    on: false
  };

  var start = function(e) {
    if (touch && !touch.on) {
      touch = {
        x: e.clientX || e.touches[0].clientX,
        y: e.clientY || e.touches[0].clientY,
        on: true
      };

      this.back = document.createElement("div");
      this.back.style.position = "absolute";
      this.back.style.width = 2 * R +"px";
      this.back.style.height = 2 * R +"px";
      // this.back.style.border = "solid #515151";
      // this.back.style.borderWidth = "0.5px";
      this.back.style.borderRadius = "50%";
      this.back.style.background = C;

      this.front = document.createElement("div");
      this.front.style.position = "absolute";
      this.front.style.width = 2 * r +"px";
      this.front.style.height = 2 * r +"px";
      // this.front.style.border = "solid #707070";
      // this.front.style.borderWidth = "0.5px";
      this.front.style.borderRadius = "50%";
      this.front.style.background = c;

      this.front.style.left = touch.x - r +"px";
      this.front.style.top = touch.y - r +"px";
      this.back.style.left = touch.x - R +"px";
      this.back.style.top = touch.y - R +"px";

      document.body.appendChild(this.back);
      document.body.appendChild(this.front);
    }
  };

  var move = function(e) {
    var x = e.clientX || e.touches[0].clientX;
    var y = e.clientY || e.touches[0].clientY;
    if (touch && touch.on) {
      var dx = x - touch.x;
      var dy = y - touch.y;
      var l = Math.hypot(dx, dy);
      var max = 4 * R/5;
      if (l > max) {
        dx *= max/l; dy *= max/l;
      }
      this.front.style.left = parseFloat(this.back.style.left) + dx + r/2 + 12+"px";
      this.front.style.top = parseFloat(this.back.style.top)+ dy + r/2 + 12+"px";
      data({
        dx: dx, dy: dy
      }); // Move
    }
  };

  var stop = function(e) {
    if (touch && touch.on) {
      document.body.removeChild(this.back);
      document.body.removeChild(this.front);
      touch.on = false;
      data({
        dx: 0, dy: 0
      }); // Prevent player from moving
    }
  };

  // Listeners
  document.addEventListener("touchstart", start);
  document.addEventListener("touchmove", move);
  document.addEventListener("touchend", stop);
  document.addEventListener("touchcancel", stop);

  // document.addEventListener("click", start);
  document.addEventListener("mousedown", start);
  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", stop);
}



joystick(function(data) {

});


joystick2(function(data) {

});