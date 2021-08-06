import './css/main.scss';
import { Application, Ticker} from "pixi.js";
import {Game} from './ts/Game';

onload = () => {

    
   
    // let stage : Container;
    const app = new Application({
        width: 800,
        height: 600,
        // backgroundColor: 0x143B95,
        backgroundColor: 0xFFA07A,
        sharedTicker: true,
        sharedLoader: true
        
    });

    
    document.body.appendChild(app.view); 

    const game = new Game(app);
    const ticker = Ticker.shared;
    ticker.add(game.snakeMoveUpdate.bind(game));
    console.log(game);
};

    



    
    
        
    

    

