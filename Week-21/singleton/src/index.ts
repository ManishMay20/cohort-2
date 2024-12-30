import {GameManager} from "./GameManager";
import {startLogger} from "./logger";

startLogger();


setInterval(()=>{
    GameManager.getInstance().addGame({
        id:Math.random().toString(),
        "whitePlayer": "Manish",
        "blackPlayer" : "harsh",
        moves: []
    })
},5000);
