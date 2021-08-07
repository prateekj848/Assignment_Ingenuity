// import {
//   Application, Container, Sprite, Texture, DEG_TO_RAD,
// } from 'pixi.js';

// import { gsap } from 'gsap';
// import { preLoader } from './PreLoader';
// import assets from './assets';
// import { getTexture } from './Textures';
// import { getText } from './Textures';

// export class Game {
//     private stage: Container;

//     private readonly app: Application;

//     private isInitialized = false;

//     private wheel: Sprite|undefined;


//     private prizes = ['Zero', '100', '200', '500', '1000', '2000', 'Jackpot'];

//     private segAngle = 360 / this.prizes.length;

//     constructor(app:Application) {
//       this.app = app;
//       this.stage = app.stage;
//       const centerX = app.view.width / 2;
//       const centerY = app.view.height / 2;
//       preLoader(assets, () => {
//         this.isInitialized = true;
//         const wheel = new Sprite(getTexture('wheel') as Texture);
//         wheel.anchor.set(0.5);
//         wheel.position.set(centerX, centerY+50);
         
        
//         const pin = new Sprite(getText('pin') as Texture);
//         pin.anchor.set(0.5);
//         pin.position.set(centerX, centerY-280);
//         this.stage.addChild(pin);


//         this.stage.addChild(wheel);
//         this.wheel = wheel;

//         wheel.interactive = true;
//         wheel.on('click', () => {
//           const prizeNum = Math.floor(Math.random() * this.prizes.length);
//           console.log(prizeNum);
//           const stopAngle = this.segAngle * prizeNum +100;
//           console.log(stopAngle);
//           gsap.to(wheel, { rotation: DEG_TO_RAD * (3600 + stopAngle), duration: 2, ease: 'Sine.easeOut' });
          
//         });
        
//       });
      
//       console.warn(this.app);
//     }

//     public update(delta:number):void {
//       // eslint-disable-next-line no-empty
//       if (this.isInitialized && this.wheel) {
//         // eslint-disable-next-line no-unused-expressions
//         this.wheel.rotation += delta * DEG_TO_RAD;
//       }
      
//       this.isInitialized=false;
     
//     }
// }


import {
  Application, Container, Sprite, Texture, Resource, ITextStyle, TextStyle, Text, DEG_TO_RAD
} from 'pixi.js';

import { gsap } from 'gsap';
import { preLoader } from './PreLoader';
import assets from './assets';
import { getTexture } from './Textures';
//import { Sound } from '@pixi/sound';


export class Game {
  private stage: Container;

  private readonly app: Application;

  private isInitialized = false;

  private wheel: any;
  private arrow: any;
  private back: any;
  //private sound: any;
  private game_container: Container;
  private prize_container: Container;
  private prize_display: Container;
  private prize_won: string = "None";

  private prizes: string[] = ['Zero', '1000', 'Mobile', 'TV', 'World Tour', 'Bike', '5000']

  private segAngle = 360 / this.prizes.length;

  private text_style: ITextStyle
  private stopAngle: number


  constructor(app: Application) {
      this.app = app;
      this.stage = app.stage;
      this.arrow = this.arrow
      this.game_container = new Container
      this.prize_container = new Container
      this.prize_display = new Container
      this.back = this.back
      this.stopAngle = (60 + Math.random() * 300)
     // this.sound = Sound.from('./src/ts/beat.mp3');

      this.stage.addChild(this.game_container, this.prize_container, this.prize_display);
      this.prize_display.visible = false;

      this.text_style = new TextStyle({
          fontFamily: 'Cursive',
          fill: 'black',
          fontSize: '25px',
          align: 'center'
      });

      preLoader(assets, () => {
          this.isInitialized = true;
          this.back = this.createBackImage();
          this.arrow = this.createArrowImage();
          this.wheel = new Sprite(getTexture('wheel') as Texture<Resource>);
          this.wheel.anchor.set(0.5);
          this.wheel.position.set(this.app.view.width / 2, this.app.view.height / 2);
          this.game_container.addChild(this.wheel)

          // texts 
          const text1 = new Text("Zero", this.text_style)
          text1.position.set(this.app.view.width / 2 - 10, 200);
          this.prize_container.addChild(text1);
          const text2 = new Text("1000", this.text_style)
          text2.position.set(this.app.view.width / 2 + 100, 270);
          this.prize_container.addChild(text2);
          const text3 = new Text("Mobile", this.text_style)
          text3.position.set(this.app.view.width / 2 + 100, 400);
          this.prize_container.addChild(text3);
          const text4 = new Text("TV", this.text_style)
          text4.position.set(this.app.view.width / 2 + 50, 500);
          this.prize_container.addChild(text4);
          const text5 = new Text("World Tour", this.text_style)
          text5.position.set(this.app.view.width / 2 - 125, 500);
          this.prize_container.addChild(text5);
          const text6 = new Text("5000", this.text_style)
          text6.position.set(this.app.view.width / 2 - 150, 270);
          this.prize_container.addChild(text6);
          const text7 = new Text("Bike", this.text_style)
          text7.position.set(this.app.view.width / 2 - 160, 400);
          this.prize_container.addChild(text7);


          this.prize_container.pivot.x = this.app.view.width / 2;
          this.prize_container.pivot.y = this.app.view.height / 2;
          this.prize_container.x = this.app.view.width / 2;
          this.prize_container.y = this.app.view.height / 2;
          this.game_container.addChild(this.prize_container)



          this.wheel.interactive = true;
          this.wheel.buttonMode = true;
          this.wheel.on('click', () => {
              const stopAngle = Math.floor(Math.random() * 360)
              this.stopAngle = stopAngle

              const total_angle_rotation = DEG_TO_RAD * (3600 + stopAngle)
              console.log(`${this.stopAngle}`)
              gsap.to(this.wheel, {
                  x: this.app.view.width / 2, y: this.app.view.height / 2, rotation: -total_angle_rotation, duration: 2
              })
              gsap.to(this.prize_container, {
                  duration: 2,
                  rotation: -total_angle_rotation,
              })
              // check for prize win when the rotation is done.
              this.prizeWin();

          });
      });

  }
  private createBackImage(): any {
      const img = new Sprite(getTexture('back') as Texture<Resource>);

      img.scale.set(1.4, 1.6)
      img.position.set(-100, -100)
      return this.game_container.addChild(img)
  }

  private createArrowImage(): any {
      const img = new Sprite(getTexture('arrow') as Texture<Resource>);
      img.scale.set(0.3)
      img.rotation = DEG_TO_RAD * 180;
      img.position.set(this.app.view.width / 2 + 20, 100)
      return this.game_container.addChild(img)
  }

  private prizeWin() {
      console.log("prizewin fun")
      if (this.stopAngle > 360 - this.segAngle / 2 || this.stopAngle <= 25.7) {
          this.prize_won = this.prizes[0]
          console.log(`${this.prize_won}`)
      } else if (this.stopAngle <= 77.1) {
          this.prize_won = this.prizes[1]
          console.log(`${this.prize_won}`)
      } else if (this.stopAngle <= 128.5) {
          this.prize_won = this.prizes[2]
          console.log(`${this.prize_won}`)
      } else if (this.stopAngle <= 180) {
          this.prize_won = this.prizes[3]
          console.log(`${this.prize_won}`)
      } else if (this.stopAngle > 180 && this.stopAngle <= 231.4) {
          this.prize_won = this.prizes[4]
          console.log(`${this.prize_won}`)
      } else if (this.stopAngle > 231.4 && this.stopAngle <= 282.8) {
          this.prize_won = this.prizes[5]
          console.log(`${this.prize_won}`)
      } else if (this.stopAngle > 282.2 && this.stopAngle <= 334.2) {
          this.prize_won = this.prizes[6]
          console.log(`${this.prize_won}`)
      }



      setTimeout(() => {
          if (this.prize_display) {
              this.game_container.addChild(this.winnigMsg())
          }

          this.game_container.interactive = true
          this.game_container.on('click', () => {
              location.reload()
              // this.wheel.interactive = true;
              // this.wheel.buttonMode = true;
          })


      }, 4000);

  }

  private winnigMsg(): Text {
      const winMsg = new Text(`You Won ${this.prize_won}`, {
          fontFamily: 'Cursive',
          fill: 'black',
          fontSize: '75px',
          align: 'center'
      })
      winMsg.position.set(this.app.view.width / 2, this.app.view.height / 2);
      winMsg.anchor.set(0.5)
      // winMsg.position.set(100, 100);
      console.log(`${winMsg}`)
      return winMsg
  }


  public update(): void {
      if (this.isInitialized) {
          //setInterval(this.sound.play(), 20000)
      }
  }
}
exports.Game = Game;