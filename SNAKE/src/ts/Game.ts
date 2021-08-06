import { Loader, Sprite, Container, Application, Text } from "pixi.js";

export class Game {

    public dir: string = "";
    public score: number = 0;
    private stage: Container;
    private app: Application;
    private snake: Sprite | undefined;
    private food: Sprite | undefined;

    private up: Boolean = true;
    private down: Boolean = true;
    private right: Boolean = true;
    private left: Boolean = true;


    constructor(app: Application) {
        this.app = app;
        this.stage = app.stage;
        console.log(app);

        const loader = Loader.shared;
        loader.baseUrl = './assets/img';
        loader.add('food.png');
        loader.add('snake.png');
        loader.onComplete.add(() => {
            this.food = this.createSprite('./assets/img/food.png', 0.1, [500, 300]);
            this.snake = this.createSprite('./assets/img/snake.png', 0.1, [100, 200]);
            this.snakeMove();

            console.log(this.food);
        });
        loader.load();

        
        
    }

    private createSprite(url: string, scaleSet: number, sPosition: number[]): Sprite {
        const obj = Sprite.from(url);
        console.log(this.app);
        obj.anchor.set(0.5);
        obj.position.set(sPosition[0], sPosition[1]);
        obj.scale.set(scaleSet);
        this.stage.addChild(obj);
        return obj;
    }

    private collision(object1: Sprite, object2: Sprite) {
        const bounds1 = object1.getBounds();
        const bounds2 = object2.getBounds();

        return bounds1.x < bounds2.x + bounds2.width
            && bounds1.x + bounds1.width > bounds2.x
            && bounds1.y < bounds2.y + bounds2.height
            && bounds1.y + bounds1.height > bounds2.y;
    }


    private snakeMove(): void {
        window.onkeydown = (e: KeyboardEvent) => {
            if (this.snake) {
                switch (e.code) {
                    case 'ArrowRight':
                        if (this.right) {
                            this.dir = "right";
                            this.snake.x += 1;
                            this.left = false;
                            this.up = true;
                            this.down = true;
                        }
                        break;
                    case "ArrowLeft":
                        if (this.left) {
                            this.dir = "left";
                            this.snake.x -= 1;
                            this.right = false;
                            this.up = true;
                            this.down = true;
                        }
                        break;
                    case "ArrowDown":
                        if (this.down) {
                            this.dir = "down";
                            this.snake.y += 1;
                            this.up = false;
                            this.right = true;
                            this.left = true;
                        }
                        break;
                    case "ArrowUp":
                        if (this.up) {
                            this.dir = "up";
                            this.snake.y -= 1;
                            this.down = false;
                            this.right = true;
                            this.left = true;
                        }
                        break;
                }
            }
        }
    }

    public snakeMoveUpdate(): void {
        console.log("hello");
        console.log(this.dir);

        if (this.snake) {
            if (this.dir == 'right') {
                this.snake.x += 3;
            }
            else if (this.dir == 'left') {
                this.snake.x -= 3;
            }
            else if (this.dir == 'down') {
                this.snake.y += 3;
            }
            else {
                this.snake.y -= 3;
            }

            if (this.snake.x > this.app.view.width) {
                this.stage.removeChild(this.snake);
                if (this.food) {
                    this.stage.removeChild(this.food);
                }
                let text = new Text(`Game Over \n Score : ${this.score} `, {
                    fontFamily: 'Arial',
                    fontSize: 36,
                    fontStyle: 'italic',
                    fontWeight: 'bold',
                    fill: ['#ffffff', '#00ff99'],
                    stroke: '#4a1850',
                    strokeThickness: 5,
                    dropShadow: true,
                    dropShadowColor: '#000000',
                    dropShadowBlur: 4,
                    dropShadowAngle: Math.PI / 6,
                    dropShadowDistance: 6,
                    wordWrap: true,
                    wordWrapWidth: 440,
                    lineJoin: 'round',
                });

                text.position.set(310, 250);
                this.stage.addChild(text);
            }

            if (this.snake.x <= 0) {
                this.stage.removeChild(this.snake);
                if (this.food) {
                    this.stage.removeChild(this.food);
                }
                let text = new Text(`Game Over \n Score : ${this.score} `, {
                    fontFamily: 'Arial',
                    fontSize: 36,
                    fontStyle: 'italic',
                    fontWeight: 'bold',
                    fill: ['#ffffff', '#00ff99'],
                    stroke: '#4a1850',
                    strokeThickness: 5,
                    dropShadow: true,
                    dropShadowColor: '#000000',
                    dropShadowBlur: 4,
                    dropShadowAngle: Math.PI / 6,
                    dropShadowDistance: 6,
                    wordWrap: true,
                    wordWrapWidth: 440,
                    lineJoin: 'round',
                });
                text.position.set(310, 250);
                this.stage.addChild(text);
            }

            if (this.snake.y > this.app.view.height) {
                this.stage.removeChild(this.snake);
                if (this.food) {
                    this.stage.removeChild(this.food);
                }
                let text = new Text(`Game Over \n Score : ${this.score} `, {
                    fontFamily: 'Arial',
                    fontSize: 36,
                    fontStyle: 'italic',
                    fontWeight: 'bold',
                    fill: ['#ffffff', '#00ff99'], 
                    stroke: '#4a1850',
                    strokeThickness: 5,
                    dropShadow: true,
                    dropShadowColor: '#000000',
                    dropShadowBlur: 4,
                    dropShadowAngle: Math.PI / 6,
                    dropShadowDistance: 6,
                    wordWrap: true,
                    wordWrapWidth: 440,
                    lineJoin: 'round',
                });
                text.position.set(310, 250);
                this.stage.addChild(text);
            }

            if (this.snake.y <= 0) {
                this.stage.removeChild(this.snake);
                if (this.food) {
                    this.stage.removeChild(this.food);
                }
                let text = new Text(`Game Over \n Score : ${this.score} `, {
                    fontFamily: 'Arial',
                    fontSize: 36,
                    fontStyle: 'italic',
                    fontWeight: 'bold',
                    fill: ['#ffffff', '#00ff99'], 
                    stroke: '#4a1850',
                    strokeThickness: 5,
                    dropShadow: true,
                    dropShadowColor: '#000000',
                    dropShadowBlur: 4,
                    dropShadowAngle: Math.PI / 6,
                    dropShadowDistance: 6,
                    wordWrap: true,
                    wordWrapWidth: 440,
                    lineJoin: 'round',
                });
                text.position.set(310, 250);
                this.stage.addChild(text);
            }

            if (this.food) {
                if (this.collision(this.snake, this.food)) {
                    this.score += 1;
                    this.stage.removeChild(this.food);

                    let x1 = Math.floor(Math.random() * (800 - 2 + 1) + 2);
                    let y1 = Math.floor(Math.random() * (600 - 2 + 1) + 2);

                    this.food = this.createSprite('./assets/img/food.png', 0.1, [x1, y1]);

                }
            }
        }

    }
                    
}
                    
                    













