"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Game = /** @class */ (function () {
    function Game(maxX, maxY) {
        this.maxX = maxX;
        this.maxY = maxY;
        this.cells = new Array(maxX);
        this.cells[0] = new Array();
        for (var index = 0; index < this.cells.length; index++) {
            this.cells[index] = new Array(maxY).fill(new Cell('off'));
        }
        this.key = 'up';
    }
    Game.prototype.flip = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.cells[0][0].getType() == 'on') {
                    this.cells[0][0] = new Cell('off');
                }
                else {
                    this.cells[0][0] = new Cell('on');
                }
                return [2 /*return*/];
            });
        });
    };
    Game.prototype.sleep = function (ms) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (r) { return setTimeout(r, ms); })];
            });
        });
    };
    Game.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!true) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.sleep(100)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.flip()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.print()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 0];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.print = function () {
        return __awaiter(this, void 0, void 0, function () {
            var game, html, key;
            return __generator(this, function (_a) {
                game = document.getElementById('game');
                html = '';
                this.cells.forEach(function (x) {
                    x.forEach(function (y) {
                        html += y.toString();
                    });
                    html += '<br>';
                });
                game.innerHTML = html;
                key = document.getElementById('key');
                key.innerHTML = this.key;
                return [2 /*return*/];
            });
        });
    };
    Game.prototype.setDirection = function (key) {
        switch (key) {
            case 'ArrowUp':
                this.key = 'up';
                break;
            case 'ArrowDown':
                this.key = 'down';
                break;
            case 'ArrowLeft':
                this.key = 'left';
                break;
            case 'ArrowRight':
                this.key = 'right';
                break;
            default:
                break;
        }
    };
    return Game;
}());
var Cell = /** @class */ (function () {
    function Cell(type) {
        this.type = type;
    }
    Cell.prototype.getType = function () {
        return this.type;
    };
    Cell.prototype.toString = function () {
        switch (this.type) {
            case 'on':
                return '■';
            case 'off':
                return '□';
            default:
                return '□';
        }
    };
    return Cell;
}());
var g = new Game(25, 25);
g.start();
document.addEventListener('keydown', function (e) {
    g.setDirection(e.key);
});
