import {
    Application, Container,BitmapText,
  } from 'pixi.js';
  
  import { preLoader } from './PreLoader';
  import assets from './assets';
  import { Card, cardFrames, CARD_WIDTH, CARD_HEIGHT } from "./Card";
  import { shuffleArray } from './utils';
  import { gsap } from 'gsap';
  
  export class Game {
      private stage: Container;
  
      private readonly app: Application;
  
      private readonly game: Container;

      private readonly start: Container;

      private readonly end:Container;
  
      private firstSelection: Card | undefined;
  
      private secondSelection: Card|undefined;
  
      private isInitialized = false;
  
      constructor(app:Application) {
        this.app = app;
        this.stage = app.stage;
        this.start=new Container();
        this.game = new Container();
        this.end= new Container();
        this.stage.addChild(this.game,this.start,this.end);
        this.game.visible=false;
        preLoader(assets, () => {
          this.isInitialized = true;
          this.createStartText();
          this.createCards();
          this.placeCards();
        // this.createEndText();
        });
        console.warn(this.app);
      }

      private createStartText(): void {
        const title = new BitmapText('Memory Game', {
          fontName: 'Desyrel',
          fontSize: 120,
          align: 'center',
        });
        title.anchor.set(0.5);
        title.x = this.app.view.width / 2;
        title.y = title.height;
  
        const start = new BitmapText('Start Game', {
          fontName: 'Desyrel',
          fontSize: 50,
          align: 'center',
        });
        start.anchor.set(0.5);
        start.position.set(this.app.view.width / 2, this.app.view.height / 2);
        start.buttonMode = true;
        start.interactive = true;
        start.on('pointerup', () => {
          this.start.visible = false;
          this.game.visible = true;
          this.stage.removeChild(this.start);
        });
        this.start.addChild(title, start);
      }

     

      private createEndText(): void {
          const tle = new BitmapText('Congratulations', {
            fontName: 'Desyrel',
            fontSize: 120,
            align: 'center',
          });
          console.log("whhbbd");
          tle.anchor.set(0.5);
          tle.x = this.app.view.width / 2;
          tle.y = tle.height;

          const hur = new BitmapText('HUURRRRAAAYYYYYY', {
            fontName: 'Desyrel',
            fontSize: 50,
            align: 'center',
          });

          hur.position.set(this.app.view.width / 4, this.app.view.height / 2);

          this.start.visible = false;
          this.game.visible = false;
          this.end.visible=true;
          //this.stage.removeChild(this.game);

          this.end.addChild(tle,hur);
    
        }

        
      count=0;

      private next(): void {
        this.firstSelection = undefined;
        this.secondSelection = undefined;
        this.cardEnabled(true);
      }
      private checkResult(): void {
        if( this.firstSelection && this.secondSelection) {
          if (this.firstSelection.name === this.secondSelection.name) {
            gsap.to([this.firstSelection, this.secondSelection],
              {width:160, height:160, alpha:0, duration:0.75, onComplete:()=>{
              this.game.removeChild(this.firstSelection as Card);
              this.game.removeChild(this.secondSelection as Card);
              this.count++;
              console.log(this.count);
              if(this.count==12)
              {
                 this.createEndText();

              }
              this.next();
            }});
          } else {
            gsap.fromTo([this.firstSelection, this.secondSelection],
              {rotation:0.5},
              {
                rotation:0,
                ease: 'elastic',
                duration:0.5,
                onComplete:()=>{
                  (this.firstSelection as Card).back.visible = true;
                  (this.secondSelection as Card).back.visible = true;
                  this.next();
                }
              });
          }
        }
      }
  
        

      private createCards(): void {
          shuffleArray(cardFrames).forEach((cardFrame) => {
            const card = new Card('back', {id: 'front', frame: cardFrame});
            card.on('pointerup', ()=>{
              card.interactive = false;
              gsap.to(card.back, {alpha:0, duration:0.5, onComplete:()=>{
                  card.back.visible = false;
                  card.back.alpha = 1;
                }});
              if(this.firstSelection) {
                this.secondSelection = card;
                this.cardEnabled(false);
                setTimeout(this.checkResult.bind(this), 1000);
              } else {
                this.firstSelection = card;
              }
            })
            this.game.addChild(card);
          });
      }
  
      private cardEnabled(value:boolean) {
        this.game.children.forEach((child) => child.interactive = value);
      }
  
      private placeCards(): void {
        let count = 0;
        const PADDING = 27;
        const OFFSET = 100;
        for (let r = 0; r < 4; r++) {
          for (let c = 0; c < 6; c++) {
            let card = this.game.getChildAt(count);
            card.x = c * (CARD_WIDTH + PADDING) + OFFSET;
            card.y = r * (CARD_HEIGHT + PADDING) + OFFSET;
            count++;
          }
        }
      }
  
      public update(delta:number):void {
        if (this.isInitialized) {
          // console.warn(delta);
          delta;
        }
      }
  }