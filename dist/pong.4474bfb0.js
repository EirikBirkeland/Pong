// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"lib/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var CANVAS_WIDTH = exports.CANVAS_WIDTH = 800;
var CANVAS_HEIGHT = exports.CANVAS_HEIGHT = 500;
var CANVAS_PADDING = exports.CANVAS_PADDING = 20;

var BOARD_OUTLINE_THICKNESS = exports.BOARD_OUTLINE_THICKNESS = 20;
var BOARD_START_X = exports.BOARD_START_X = BOARD_OUTLINE_THICKNESS;
var BOARD_START_Y = exports.BOARD_START_Y = BOARD_OUTLINE_THICKNESS;

var PADDLE_SPEED = exports.PADDLE_SPEED = 5;
var PADDLE_HEIGHT = exports.PADDLE_HEIGHT = 80;
var PADDLE_WIDTH = exports.PADDLE_WIDTH = 20;

var BALL_RADIUS = exports.BALL_RADIUS = 5;
var BALL_DIAMETER = exports.BALL_DIAMETER = BALL_RADIUS * 2;
var LEVEL_PADDING = exports.LEVEL_PADDING = 3;
},{}],"lib/Paddle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require("./constants");

var CONSTANTS = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CANVAS_WIDTH = CONSTANTS.CANVAS_WIDTH,
    CANVAS_HEIGHT = CONSTANTS.CANVAS_HEIGHT,
    PADDLE_HEIGHT = CONSTANTS.PADDLE_HEIGHT,
    PADDLE_SPEED = CONSTANTS.PADDLE_SPEED;

var Paddle = function () {
    function Paddle(ctx, side) {
        _classCallCheck(this, Paddle);

        this.ctx = ctx;
        this.side = side;
        this.X = this.side === "left" ? 20 : CANVAS_WIDTH - 20;
        this.Y = CANVAS_HEIGHT / 2;
        this.previousY = null;
        this.direction = Boolean(Math.round(Math.random())) ? "up" : "down";
    }

    _createClass(Paddle, [{
        key: "moveUp",
        value: function moveUp() {
            this.previousY = this.Y;w;
            this.Y -= PADDLE_SPEED;
        }
    }, {
        key: "moveDown",
        value: function moveDown() {
            this.previousY = this.Y;
            this.Y += PADDLE_SPEED;
        }
    }, {
        key: "clean",
        value: function clean() {
            this.ctx.clearRect(this.X, this.previousY, 20, PADDLE_HEIGHT);
        }
    }, {
        key: "render",
        value: function render() {
            if (this.Y >= CANVAS_HEIGHT) {
                this.direction = "up";
            } else if (this.Y <= 0) {
                this.direction = "down";
            }

            this.ctx.fillStyle = "rgb(0,200,0)";
            this.ctx.fillRect(this.X, this.Y, 20, PADDLE_HEIGHT);
            this.ctx.restore();
        }
    }]);

    return Paddle;
}();

exports.default = Paddle;
},{"./constants":"lib/constants.js"}],"lib/Ball.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require("./constants");

var CONSTANTS = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CANVAS_WIDTH = CONSTANTS.CANVAS_WIDTH,
    CANVAS_HEIGHT = CONSTANTS.CANVAS_HEIGHT,
    BOARD_START_Y = CONSTANTS.BOARD_START_Y,
    BALL_RADIUS = CONSTANTS.BALL_RADIUS,
    BALL_DIAMETER = CONSTANTS.BALL_DIAMETER;

var Ball = function () {
    function Ball(ctx, _ref) {
        var color = _ref.color;

        _classCallCheck(this, Ball);

        this.ctx = ctx;
        this.X = CANVAS_WIDTH / 2;
        this.Y = CANVAS_HEIGHT / 2;
        this.previousX = null;
        this.increment = 2;
        this.color = color;
        this.directionX = "left";
        this.directionY = "up";
    }

    _createClass(Ball, [{
        key: "prepareNextMovement",
        value: function prepareNextMovement(directionX) {
            if (directionX) this.directionX = directionX;

            if (this.Y <= BOARD_START_Y + BALL_RADIUS) {
                this.directionY = "down";
            } else if (this.Y >= CANVAS_HEIGHT - BOARD_START_Y - BALL_RADIUS) {
                this.directionY = "up";
            }

            this.previousX = this.X;
            if (this.directionX === "left") {
                this.X -= this.increment;
            } else if (this.directionX === "right") {
                this.X += this.increment;
            }

            this.previousY = this.Y;
            if (this.directionY === "up") {
                this.Y -= this.increment;
            } else if (this.directionY === "down") {
                this.Y += this.increment;
            }
        }
    }, {
        key: "render",
        value: function render() {
            this.ctx.beginPath();
            this.ctx.fillStyle = this.color;
            this.ctx.arc(this.X, this.Y, BALL_DIAMETER, 0, 2 * Math.PI, false);
            this.ctx.closePath();
            this.ctx.fill();
        }
    }]);

    return Ball;
}();

exports.default = Ball;
},{"./constants":"lib/constants.js"}],"lib/Score.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require("./constants");

var CONSTANTS = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CANVAS_WIDTH = CONSTANTS.CANVAS_WIDTH,
    CANVAS_PADDING = CONSTANTS.CANVAS_PADDING;

var Score = function () {
    function Score(ctx) {
        _classCallCheck(this, Score);

        this.ctx = ctx;
        this.scoreLeft = 0;
        this.scoreRight = 0;
    }

    _createClass(Score, [{
        key: "incrementLeft",
        value: function incrementLeft() {
            this.scoreLeft += 1;
        }
    }, {
        key: "incrementRight",
        value: function incrementRight() {
            this.scoreRight += 1;
        }
    }, {
        key: "clean",
        value: function clean() {
            this.ctx.clearRect(textX - 100, CANVAS_PADDING, str.length * 40, 30);
        }
    }, {
        key: "render",
        value: function render() {
            var str = this.scoreLeft + " - " + this.scoreRight;
            var textX = CANVAS_WIDTH / 2 - str.length / 2 * 15;
            this.ctx.font = "30px Arial";
            this.ctx.fillStyle = "white";
            this.ctx.fillText(str, textX, CANVAS_PADDING + 25);
        }
    }, {
        key: "highestScore",
        get: function get() {
            return this.scoreLeft > this.scoreRight ? this.scoreLeft : this.scoreRight;
        }
    }]);

    return Score;
}();

exports.default = Score;
},{"./constants":"lib/constants.js"}],"lib/Border.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require("./constants");

var CONSTANTS = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CANVAS_WIDTH = CONSTANTS.CANVAS_WIDTH,
    CANVAS_HEIGHT = CONSTANTS.CANVAS_HEIGHT,
    BOARD_OUTLINE_THICKNESS = CONSTANTS.BOARD_OUTLINE_THICKNESS;

var Border = function () {
    function Border(ctx) {
        _classCallCheck(this, Border);

        this.ctx = ctx;
    }

    _createClass(Border, [{
        key: "clean",
        value: function clean() {
            this.ctx.clearRect(this.X, this.previousY, 20, PADDLE_HEIGHT);
        }
    }, {
        key: "render",
        value: function render() {
            this.ctx.fillStyle = "rgb(255,255,255)";
            this.ctx.fillRect(0, 0, CANVAS_WIDTH, BOARD_OUTLINE_THICKNESS);
            this.ctx.fillRect(0, CANVAS_HEIGHT - BOARD_OUTLINE_THICKNESS, CANVAS_WIDTH, BOARD_OUTLINE_THICKNESS);
            this.ctx.restore();
        }
    }]);

    return Border;
}();

exports.default = Border;
},{"./constants":"lib/constants.js"}],"lib/Board.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require('./constants');

var CONSTANTS = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CANVAS_WIDTH = CONSTANTS.CANVAS_WIDTH,
    CANVAS_HEIGHT = CONSTANTS.CANVAS_HEIGHT;

var Board = function () {
    function Board() {
        _classCallCheck(this, Board);
    }

    _createClass(Board, null, [{
        key: 'clear',
        value: function clear(ctx) {
            ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        }
    }]);

    return Board;
}();

exports.default = Board;
},{"./constants":"lib/constants.js"}],"index.js":[function(require,module,exports) {
'use strict';

var _constants = require('./lib/constants');

var CONSTANTS = _interopRequireWildcard(_constants);

var _Paddle = require('./lib/Paddle');

var _Paddle2 = _interopRequireDefault(_Paddle);

var _Ball = require('./lib/Ball');

var _Ball2 = _interopRequireDefault(_Ball);

var _Score = require('./lib/Score');

var _Score2 = _interopRequireDefault(_Score);

var _Border = require('./lib/Border');

var _Border2 = _interopRequireDefault(_Border);

var _Board = require('./lib/Board');

var _Board2 = _interopRequireDefault(_Board);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var PADDLE_SPEED = CONSTANTS.PADDLE_SPEED,
    CANVAS_WIDTH = CONSTANTS.CANVAS_WIDTH,
    CANVAS_HEIGHT = CONSTANTS.CANVAS_HEIGHT,
    LEVEL_PADDING = CONSTANTS.LEVEL_PADDING,
    BALL_RADIUS = CONSTANTS.BALL_RADIUS;


var canvas = document.createElement('canvas');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
canvas.id = "myCanvas";
document.getElementById('root').appendChild(canvas);
var ctx = canvas.getContext("2d");

var downArrowKeyIsDepressed = void 0;
var upArrowKeyIsDepressed = void 0;
var wKeyIsDepressed = void 0;
var sKeyIsDepressed = void 0;

window.addEventListener("keydown", function (e) {
    e.preventDefault();
    downArrowKeyIsDepressed = e.which === 40;
    upArrowKeyIsDepressed = e.which === 38;
});

window.addEventListener("keyup", function (e) {
    e.preventDefault();
    downArrowKeyIsDepressed = !e.which === 40;
    upArrowKeyIsDepressed = !e.which === 38;
});

window.addEventListener("keydown", function (e) {
    e.preventDefault();
    wKeyIsDepressed = e.which === 87;
    sKeyIsDepressed = e.which === 83;
});

window.addEventListener("keyup", function (e) {
    e.preventDefault();
    wKeyIsDepressed = !e.which === 87;
    sKeyIsDepressed = !e.which === 83;
});

var paddleLeft = void 0;
var paddleRight = void 0;
var ball = void 0;
var score = void 0;
var border = void 0;

function init() {
    paddleLeft = new _Paddle2.default(ctx, "left", true);
    paddleRight = new _Paddle2.default(ctx, "right", false);
    ball = new _Ball2.default(ctx, { color: "white" });
    score = new _Score2.default(ctx);
    border = new _Border2.default(ctx);
}

function restart() {
    ball = null;
    ball = new _Ball2.default(ctx, { color: "white" });
    setTimeout(function () {
        return requestAnimationFrame(gameLoop);
    });
}

function gameLoop() {
    _Board2.default.clear(ctx);

    if (score.highestScore >= 10) {
        return;
    }

    if (ball.X <= LEVEL_PADDING + BALL_RADIUS) {
        score.incrementRight();
        score.render();
        return restart();
    } else if (ball.X >= CANVAS_WIDTH - LEVEL_PADDING - BALL_RADIUS) {
        score.incrementLeft();
        score.render();
        return restart();
    }

    if (wKeyIsDepressed && paddleLeft.Y > 0) {
        paddleLeft.moveUp();
    } else if (sKeyIsDepressed && paddleLeft.Y < CANVAS_HEIGHT - 80) {
        paddleLeft.moveDown();
    } else if (upArrowKeyIsDepressed && paddleRight.Y > 0) {
        paddleRight.moveUp();
    } else if (downArrowKeyIsDepressed && paddleRight.Y < CANVAS_HEIGHT - 80) {
        paddleRight.moveDown();
    }

    paddleLeft.render();
    paddleRight.render();
    border.render();

    if (ball.X <= paddleLeft.X + 30 && ball.Y >= paddleLeft.Y - 60 && ball.Y <= paddleLeft.Y + 60 || ball.X >= paddleRight.X - 15 && ball.Y <= paddleRight.Y + 60 && ball.Y >= paddleRight.Y - 60) {
        console.warn("smack!");
        ball.prepareNextMovement(ball.directionX === "left" ? "right" : "left");
    } else {
        ball.prepareNextMovement();
    }
    score.render();
    ball.render();

    requestAnimationFrame(gameLoop);
}

init();
gameLoop();
},{"./lib/constants":"lib/constants.js","./lib/Paddle":"lib/Paddle.js","./lib/Ball":"lib/Ball.js","./lib/Score":"lib/Score.js","./lib/Border":"lib/Border.js","./lib/Board":"lib/Board.js"}],"../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '33577' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/pong.4474bfb0.map