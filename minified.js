! function(e) {
    var t = 87,
        i = 83,
        a = 65,
        n = 68,
        l = 13,
        s = 81,
        r = 49,
        d = 50,
        o = 51,
        c = 52,
        f = 53,
        h = 54,
        y = 55,
        g = 56,
        m = 57,
        u = {},
        w = [],
        p = 0,
        v = 0,
        x = 0,
        b = 0;

    function k(e) {
        document.getElementById("menuCardHolder").style.display = "none", document.getElementById("mainMenu").style.display = "block", document.getElementById("loadingText").style.display = "block", document.getElementById("loadingText").innerHTML = e + "<a href='javascript:window.location.href=window.location.href' class='ytLink'>reload</a>"
    }

    function E(e) {
        return .01745329251 * e
    }

    function I(e, t) {
        return Math.floor(Math.random() * (t - e + 1)) + e
    }
    setInterval(() => {
        window.console = {
                log: function(e) {
                    k("unfair advantage")
                },
                info: function(e) {
                    k("unfair advantage")
                },
                warn: function(e) {
                    k("unfair advantage")
                },
                error: function(e) {
                    k("unfair advantage")
                }
            },
            function(e) {
                return !!e && "function" == (typeof e).toLowerCase() && (e === Function.prototype || /^\s*function\s*(\b[a-z$_][a-z0-9$_]*\b)*\s*\((|([a-z$_][a-z0-9$_]*)(\s*,[a-z$_][a-z0-9$_]*)*)\)\s*{\s*\[native code\]\s*}\s*$/i.test(String(e)))
            }(WebSocket.prototype.send) || O && (k("unfair advantage"), O.close(), O = null)
    }, 1e3);
    var S = !1;
    let O, T = document.getElementById("gameCanvas");
    var A = document.getElementById("chatbox");
    A.style.display = "none";
    let B = T.getContext("2d"),
        R = document.getElementById("mainMenu"),
        L = document.getElementById("enterGame");
    for (let e = 0; e < 11; e++) document.getElementById("h-item-" + e).style.display = "none";
    var M = [];
    let z = [],
        C = {};
    var _ = 0,
        W = null,
        $ = null,
        F = 30,
        H = 0,
        P = 999,
        q = 0,
        D = 0,
        G = [],
        Y = [],
        j = [],
        J = 1e4,
        U = 2e3,
        X = 500,
        Z = 1e3,
        Q = 1920,
        K = 1080,
        N = [{
            id: 0,
            src: "https://sploop.io/img/entity/player_body.png",
            img: new Image,
            xOffset: -30,
            yOffset: -30,
            scale: 60
        }];
    N.forEach(e => {
        e.img.src = e.src
    });
    var V = [{
            name: "food",
            id: 0,
            src: "https://media.discordapp.net/attachments/812730676326563850/820704195816587304/image0.png?width=675&height=675",
            img: new Image,
            xOffset: -75,
            yOffset: -75,
            scale: 150
        }, {
            name: "wood",
            id: 1,
            src: "https://media.discordapp.net/attachments/812730676326563850/819254435581657138/unknown.png",
            src2: "https://media.discordapp.net/attachments/796483767560437820/839052641212301332/unknowntree.png",
            img: new Image,
            img2: new Image,
            xOffset: -155,
            yOffset: -157,
            scale: 300
        }, {
            name: "stone",
            id: 2,
            src: "https://i.imgur.com/kqAdvEZ.png",
            img: new Image,
            xOffset: -100,
            yOffset: -100,
            scale: 200
        }, {
            name: "spyllis",
            id: 3,
            src: "https://media.discordapp.net/attachments/796483767560437820/838805911123656755/spyllis.png?width=673&height=675",
            img: new Image,
            xOffset: -68,
            yOffset: -70,
            scale: 150
        }],
        ee = [{
            id: 0,
            name: "Axe",
            src: "https://images-ext-1.discordapp.net/external/IJcPsty8TLGP4HRbZCu4PyTy8zFD1T_64_I4bLMlYkA/https/i.imgur.com/mQMJm7l.png",
            scale: 100,
            img: new Image,
            xOffset: -25,
            yOffset: -30
        }, {
            id: 1,
            name: "Apple",
            food: !0,
            src: "http://moomoo.io/img/resources/food_ico.png",
            scale: 50,
            img: new Image,
            xOffset: 5,
            yOffset: 5,
            angleOffset: -E(40)
        }, {
            id: 2,
            name: "Spike",
            src: "https://cdn.glitch.global/6b51efe1-7fd7-48e4-a089-a9576ece05ca/Small Spike?v=1653441690396",
            scale: 50,
            img: new Image,
            xOffset: 5,
            yOffset: 5
        }],
        te = [{
            id: 2,
            name: "Spike",
            src: "https://cdn.glitch.global/6b51efe1-7fd7-48e4-a089-a9576ece05ca/Small Spike?v=1653441690396",
            scale: 100,
            img: new Image,
            xOffset: -50,
            yOffset: -50
        }];

    function ie(e) {
        return {
            x: T.width / 2 + e.x - C.x,
            y: T.height / 2 + e.y - C.y
        }
    }

    function ae(e) {
        O.send(new Uint8Array(Array.from(window.msgpack.encode(e))))
    }

    function ne(e, t, i, a, n = "rgba(0, 0, 0, 0.3)") {
        var l = B.fillStyle;
        B.fillStyle = n, B.fillRect(e - i / 2, t, i, a), B.fillStyle = l
    }

    function le(e, t, i, a, n = "#000") {
        var l = B.fillStyle;
        B.font = "20px Georgia", B.fillStyle = n, B.fillText(a, e, t), B.filStyle = l
    }

    function se(e, t, i) {
        le(e - F / 4 + 10, t - F - 30, 0, i.name), i.sid != C.sid ? re(i, e, t, i.aimdir, ee[0], i.sid) : re(i, e, t, Math.atan2(D - T.height / 2, q - T.width / 2), ee[0], i.sid), i.chat && (ne(e, t - 100, 12 * i.chat.length + 10, 30), B.textAlign = "center", le(e, t - 78, 0, i.chat, "#ffffff"));
        var a = N.find(e => e.id == i.skin);
        B.save(), B.translate(e, t), B.drawImage(a.img, a.xOffset, a.yOffset, a.scale, a.scale), B.restore(), ne(e, t + 60, 100, 10, "#000");
        var n = B.fillStyle;
        B.fillStyle = i.sid == C.sid ? "#11da07" : "#da4607", B.fillRect(e - 48, t + 61, i.health / 100 * 96, 8), B.fillStyle = n
    }

    function re(e, t, i, a, n, l) {
        n = ee.find(t => t.id == e.weapon), B.save(), B.translate(t, i), B.rotate(a - E(u[l]) + (n.angleOffset || 0)), B.drawImage(n.img, n.xOffset, n.yOffset, n.scale, n.scale), B.restore()
    }

    function de() {
        var e = 0,
            t = 0;
        if (t += p, t -= v, e -= x, e += b, $ = Math.atan2(t, e), 0 == e && 0 == t && ($ = null), $ != W && (document.activeElement == A || ae(["33", [$]])), S ? B.globalAlpha = .4 : (B.clearRect(0, 0, T.width, T.height), B.globalAlpha = 1), !S) {
            var i = B.fillStyle;
            B.fillStyle = "#789b50", B.fillRect(0, 0, T.width, T.height), B.fillStyle = i
        }
        var a = B.fillStyle;
        B.fillStyle = "#c34d32", B.fillRect(0, J - C.y + T.height / 2 - U, T.width, U), B.fillStyle = a;
        var n = B.fillStyle;
        B.fillStyle = "#276496", B.fillRect(0, J - C.y + T.height / 2 - U - X, T.width, X), B.fillStyle = n;
        var l = J - U - X;
        M.forEach(e => {
            var t = ie({
                x: 0 + e.x,
                y: l + e.y
            });
            B.beginPath();
            var i = B.globalAlpha;
            B.globalAlpha = e.opacity, B.arc(t.x, t.y, e.size + e.grow, 0, 2 * Math.PI), B.fill(), B.globalAlpha = i
        });
        var s = B.fillStyle;
        B.fillStyle = "#c3ab32", B.fillRect(0, J - C.y + T.height / 2 - U - X - Z, T.width, Z), B.fillStyle = s;
        var r = B.fillStyle;
        B.strokeRect(T.width / 2 - C.x, T.height / 2 - C.y, J, J), B.fillStyle = "#424242", B.fillRect(0, 0, T.width, T.height / 2 - C.y), B.fillRect(0, 0, T.width / 2 - C.x, T.height), B.fillRect(J - C.x + T.width / 2, 0, T.width, T.height), B.fillRect(0, J - C.y + T.height / 2, T.width, T.height), B.fillStyle = r, le(200, 100, 0, `${P}ms`), window.players = z, z.forEach(e => {
            if (e.sid != C.sid) {
                var t = ie({
                    x: e.x,
                    y: e.y
                });
                se(t.x, t.y, e)
            } else se(T.width / 2, T.height / 2, e)
        }), W = $, Y.forEach(e => {
            var t = ie({
                x: e.x,
                y: e.y
            });
            ! function(e, t, i, a) {
                var n = te.find(e => e.id == a),
                    l = n.img;
                l && (B.save(), B.translate(e, t), B.rotate(0), B.drawImage(l, n.xOffset, n.yOffset, n.scale, n.scale), B.restore())
            }(t.x + e.xWiggle, t.y + e.yWiggle, e.dir, e.id)
        }), G.forEach(e => {
            var t = ie({
                x: e.x,
                y: e.y
            });
            ! function(e, t, i, a) {
                var n = V.find(e => e.id == a),
                    l = n.img;
                1 == a && t > J - C.y + T.height / 2 - U - X - Z && t < J - C.y + T.height / 2 - U - X && (l = n.img2), n && (B.save(), B.translate(e, t), B.rotate(0), B.drawImage(l, n.xOffset, n.yOffset, n.scale, n.scale), B.restore())
            }(t.x + e.xWiggle, t.y + e.yWiggle, e.dir, e.id)
        });
        var d = B.fillStyle;
        B.fillStyle = "rgba(0, 0, 0, 0.3)", B.fillRect(T.width - 320, 20, 300, 80 + 30 * j.length), B.fillStyle = d;
        var o = B.font;
        B.fillStyle;
        B.fillStyle = "#fff", B.font = "italic bold 17pt Courier", B.textAlign = "center", B.fillText("Leaderboard", T.width - 20 - 150, 60), B.font = o, j.forEach(e => {
            B.textAlign = "left", B.fillText(e.name, T.width + 20 - 300 - 15, 30 * j.indexOf(e) + 100), B.textAlign = "right";
            var t = e.gold > 1e3 ? Math.ceil(e.gold / 1e3) + "k" : e.gold;
            B.fillText(t, T.width - 40, 30 * j.indexOf(e) + 100)
        });
        var c = B.fillStyle;
        B.fillStyle = "rgba(0, 0, 0, 0.3)", B.fillRect(20, T.height - 20 - 200, 200, 200), B.fillStyle = c;
        var f = C.x * (200 / J),
            h = C.y * (200 / J);
        B.beginPath(), B.arc(20 + f, +T.height - 20 - 200 + h, 3, 0, 2 * Math.PI), B.fill();
        if (C.resources)
            for (let e = 0; e < V.length; e++) {
                var y = V[e],
                    g = B.fillStyle;
                B.fillStyle = "rgba(0, 0, 0, 0.3)", B.fillRect(20, T.height - (270 + 45 * e), 100, 40), B.fillStyle = g, B.save(), B.translate(90, T.height - (270 + 45 * e) + 10), B.textAlign = "left", B.fillText(C.resources[y.name], -50, 15), B.drawImage(y.img, -8, -7, 35, 35), B.restore()
            }
    }
    ee.forEach(e => {
        e.img.src = e.src
    }), te.forEach(e => {
        e.img.src = e.src
    }), V.forEach(e => {
        e.img.src = e.src, e.img2 && e.src2 && (e.img2.src = e.src2)
    }), document.getElementById("menuCardHolder").style.display = "none", document.getElementById("loadingText").style.display = "block", T.width = window.innerWidth, T.height = window.innerHeight, Array.prototype.removeItem = function(e) {
        var t = this.indexOf(e);
        return t > -1 && this.splice(t, 1), this
    }, window.requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(e) {
        window.setTimeout(e, 1e3 / 60)
    }, T.addEventListener("mousedown", function(e) {
        e.isTrusted && (!0, ae(["c", [1]]))
    }), T.addEventListener("mouseup", function(e) {
        e.isTrusted && (!1, ae(["c", [0]]))
    }), document.addEventListener("keydown", function(e) {
        if (e.isTrusted) switch (e.keyCode) {
            case s:
                var u;
                w.forEach(e => {
                    var t = ee.find(t => t.id == e);
                    if (t && t.food) return u = t.id, void(C.weapon == u ? ae(["s", [w[1]]]) : ae(["s", [u + 1]]))
                });
                break;
            case r:
                ae(["s", [w[1]]]);
                break;
            case d:
                ae(["s", [w[2]]]);
                break;
            case o:
                ae(["s", [w[3]]]);
                break;
            case c:
                ae(["s", [w[4]]]);
                break;
            case f:
                ae(["s", [w[5]]]);
                break;
            case h:
                ae(["s", [w[6]]]);
                break;
            case y:
                ae(["s", [w[7]]]);
                break;
            case g:
                ae(["s", [w[8]]]);
                break;
            case m:
                ae(["s", [w[9]]]);
                break;
            case 82:
                break;
            case t:
                p = 1;
                break;
            case i:
                v = 1;
                break;
            case a:
                x = 1;
                break;
            case n:
                b = 1;
                break;
            case l:
                "none" == A.style.display ? (A.style.display = "block", A.focus()) : (A.style.display = "none", A.value && (ae(["ch", [A.value]]), A.value = ""))
        }
    }), document.addEventListener("keyup", function(e) {
        if (e.isTrusted) switch (e.keyCode) {
            case t:
                p = 0;
                break;
            case i:
                v = 0;
                break;
            case a:
                x = 0;
                break;
            case n:
                b = 0
        }
    }), window.addEventListener("resize", function(e) {
        e.isTrusted && (T.width = window.innerWidth, T.height = window.innerHeight, T.width > Q && (T.width = Q), T.height > K && (T.height = K))
    }), T.addEventListener("mousemove", function(e) {
        e.isTrusted && (q = e.clientX, D = e.clientY, _ = Math.atan2(e.clientY - T.height / 2, e.clientX - T.width / 2))
    }), T.addEventListener("contextmenu", function(e) {
        e.isTrusted && e.preventDefault()
    }), L.addEventListener("click", function(e) {
        if (e.isTrusted && O && 1 == O.readyState) {
            R.style.display = "none", ae(["j", [{
                name: document.getElementById("nameInput").value
            }]]), setInterval(() => {
                window.requestAnimFrame(de)
            }, 1), M = [];
            for (let e = 0; e < 30; e++) setTimeout(() => {
                M.push({
                    x: I(0, T.width),
                    y: I(50, X - 50),
                    size: I(5, 10),
                    grow: 0,
                    opacity: 1
                })
            }, e * I(200, 1500));
            setInterval(() => {
                M.forEach(e => {
                    e.grow += I(.8, 1.5), e.x += .5, e.opacity -= .02, e.opacity < .03 && (e.opacity = 1, e.grow = 0, e.x = I(0, J), e.y = I(50, X - 50))
                })
            }, 50)
        }
    }), (O = new WebSocket("wss://chux-io.glitch.me/websocket")).addEventListener("open", function() {
        document.getElementById("menuCardHolder").style.display = "block", document.getElementById("loadingText").style.display = "none", setInterval(() => {
            ae(["p", []]), H = Date.now()
        }, 500), setInterval(() => {
            ae(["2", [_]])
        }, 50), O.addEventListener("message", async function(e) {
            let t = await e.data.arrayBuffer(),
                i = window.msgpack.decode(new Uint8Array(t));
            switch (i[0]) {
                case "1":
                    for (let e = 0; e < 11; e++) document.getElementById("h-item-" + e).style.display = "none";
                    C.sid = i[1][0];
                    break;
                case "w":
                    w = i[1][0], i[1][0].forEach(e => {
                        document.getElementById("h-item-" + e).style.display = "inline-block"
                    });
                case "33":
                    (z = i[1][0]).forEach(e => {
                        u[e.sid] || (u[e.sid] = 0), e.sid == C.sid && (C = e, window.me = C)
                    });
                    break;
                case "p":
                    P = Date.now() - H;
                    break;
                case "7":
                    var a = i[1][0];
                    for (let e = 0; e < 120; e++) setTimeout(() => {
                        u[a] += 1
                    }, 1 * e);
                    setTimeout(() => {
                        for (let e = 0; e < 120; e++) setTimeout(() => {
                            u[a] -= 1
                        }, 1 * e)
                    }, 160);
                    break;
                case "d":
                    R.style.display = "block";
                    for (let e = 0; e < 11; e++) document.getElementById("h-item-" + e).style.display = "none";
                    break;
                case "o":
                    G = i[1][0];
                    break;
                case "b":
                    j = i[1][0];
                    break;
                case "x":
                    Y = i[1][0];
                    break;
                case "kc":
                    k(i[1][0])
            }
        })
    }), O.addEventListener("close", function() {})
}();