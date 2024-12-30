import {GameManager} from "./GameManager";


export function startLogger(){
    setInterval(()=>{
        console.log(GameManager.getInstance().logState());
    },4000)
}
