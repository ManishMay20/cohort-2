"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startLogger = startLogger;
const GameManager_1 = require("./GameManager");
function startLogger() {
    setInterval(() => {
        console.log(GameManager_1.GameManager.getInstance().logState());
    }, 4000);
}
