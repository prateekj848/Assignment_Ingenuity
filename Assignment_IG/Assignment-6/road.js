onload =()=> {
  
    const canvas=document.querySelector("#game");
    const d=canvas.getContext("2d"); 
   const car=new Image();
   const back=new Image();
   let x=40;
   let y=50;
   
   const carW=84;
   const carH=136;
   let speed=5;
   let dir=0;
   let mod=0;
   car.addEventListener('load',()=>{
     draw();
     window.addEventListener('keydown',keyHandler,false);
     window.addEventListener('keyup',keyHandler,false);
   });
    car.src="data:image/jpeg;base64,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";
    back.src="https://www.tynker.com/projects/images/5b539ad21c36d1c2128b4599/road-top-view---road-top-view.png";
  //  function onImageLoad(){

  //   d.drawImage(back,x,y,852,480);
  //  }


    function draw(){
           
       
      if( 100<x+carW && x+carW<canvas.width-30)
      {
       x+=speed * mod;
      }
      else{
        alert("game over");
      }

       if(y>0 && y+carH< canvas.height){
         y+=speed * dir;
        console.log(y);
        
        }
        else{
          if(y<=0){
            // console.log(y);
            y++;
            //alert("hit the top");
             
            }
            console.log(y);
            if(y>canvas.width){
           y--;}
          
        }
        
      //  if(y+carH==canvas.height)
        
      
       
       d.clearRect(0, 0, canvas.width,canvas.height);
       d.drawImage(back,0,0,400,600);
     d.drawImage(car,x,y,carW,carH);
     requestAnimationFrame(draw);

      
   }

   function keyHandler(e){
      // console.log(e);
       switch(e.type)
       {
           case 'keydown':
                        switch(e.code)
                        {
                          case 'ArrowUp':
                          case 'KeyW':
                                 dir=-1;
                                  break;
                           case 'ArrowDown':
                           case 'KeyS':
                                   dir=1;
                                   break;
                            case 'ArrowLeft':
                            case 'KeyA':
                                    mod=-1;
                                    break;
                              case 'ArrowRight':
                              case 'KeyD':
                                      mod=1;
                                      break;                     
                        }
                       break;
           case 'keyup':
                        switch(e.code)
                        {
                             case 'ArrowUp':
                             case 'KeyW':
                             case 'ArrowDown':
                             case 'KeyS':
                                        dir=0;
                                        break;
                            case 'ArrowLeft':
                            case 'KeyA':
                            case 'ArrowRight':
                            case 'KeyD':
                                    mod=0;
                                    break;
                        }
                       break;
       }

   }

};