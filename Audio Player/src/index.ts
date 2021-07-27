 import "../css/main.css";
 let aPlayer:HTMLAudioElement;
const songs:any= [
    {
        index:1,
        image:"http://a10.gaanacdn.com/images/albums/98/4188998/crop_480x480_1622784272_4188998.jpg",
        title: "Paani Paani",
        href:"https://pagalworld.com.se/files/download/id/2564"
    },
    {
        index:2,
        image: "https://1.bp.blogspot.com/-fqMe_GXB24k/YNSbYo4e7xI/AAAAAAAAG5k/p9hvA39TXAcizdLSwOxNOglG_OjPv8lMQCNcBGAsYHQ/s711/Filhaal-2-Mohabbat-Lyrics.webp",
        title: "Filhaal",
        href:"https://pagalworld.com.se/files/download/id/2881"
    },
    {
        index:3,
        image:"https://a10.gaanacdn.com/gn_img/albums/a7LWBkzbzX/LWBkkJpRbz/size_xxl.jpg",
        title: "Lut Gaye",
        href:"https://pagalworld.com.se/files/download/id/1181"
    },
    {
        index:4,
        image:"https://a10.gaanacdn.com/gn_img/albums/w4MKPDOKoj/MKPggoBAbo/size_xxl.jpg",
        title: "Thoda Thoda Pyaar",
        href:"https://pagalworld.com.se/files/download/id/2784"
    },
    {
        index:5,
        image:"https://i.scdn.co/image/ab67616d0000b273174745ac9424fef09d54ee3a",
        title: "Is Quadar",
        href:"https://pagalworld.com.se/files/download/id/1814"
    }
]

const cover:HTMLImageElement= document.querySelector("#cover") as HTMLImageElement;

onload = ()=>{
    let playlist = document.querySelector('#playlist') as HTMLElement;
    aPlayer = document.querySelector("#audio") as HTMLAudioElement;
    const next:any= document.querySelector("#next");
    next.addEventListener('click',nextSong);

    const prev:any=document.querySelector("#prev");
    prev.addEventListener('click',prevSong);

    
    const shuf:any=document.querySelector("#shuf");
    shuf.addEventListener('click',shuffleSong);
    
    const play:any=document.querySelector("#play");
    play.addEventListener('click',playMyAudio);

    const pause:any=document.querySelector("#pause");
    pause.addEventListener('click',pauseMyAudio);
     

    songs.forEach((song:any, index:number) => {
       const li = document.createElement('li');
       const link = document.createElement('a');
        link.href = song.href;

        link.innerText = song.title;
        link.addEventListener('click', clickHandler, false);
       li.append(link);
       playlist.append(li);
    });
}


function clickHandler(event:any) {
    // stop the actual event
    event.preventDefault();
    aPlayer.src = event.target.href;
    cover.src=songs[songIndex].image;
    aPlayer.load();
    aPlayer.play();
}

// function playAudio(index:any){
//     aPlayer.src = songs[index].href;
//     aPlayer.load();
//     aPlayer.play();
// };

// function playMyAudio(){
//     let a: HTMLAudioElement= document.getElementById("audio") as HTMLAudioElement;
//     a.play();
//    document.getElementById("audioStatus").innerHTML="Audio is Playing";   
    
//   }
  function pauseMyAudio(){
    let b: HTMLAudioElement= document.getElementById("audio") as HTMLAudioElement;
    b.pause();
    const v= document.getElementById("audioStatus") as HTMLElement;
     v.innerHTML="Audio Paused";  
  }

  


 // a: HTMLAudioElement= document.getElementById("audio") as HTMLAudioElement;
  function playMyAudio(){
    
    aPlayer.play();
    const r=document.getElementById("audioStatus") as HTMLElement;
    r.innerHTML="Audio is Playing"; 
}




function loadTheSong(songIndex:number){
    console.log(songIndex);
      cover.src=songs[songIndex].image;
    aPlayer.src = songs[songIndex].href;
    aPlayer.play();
    
}
  
  var songIndex: number = 0;
function nextSong(){
    songIndex = (songIndex + 1) % songs.length;
    console.log(songIndex);
    loadTheSong(songIndex);
}

function prevSong(){
     songIndex = (songIndex - 1 + songs.length) % songs.length;
     console.log(songIndex);
     loadTheSong(songIndex);
 }


 function shuffleSong(){
    let randIndex = Math.floor((Math.random() * songs.length) + 1); 
      do{
        randIndex = Math.floor((Math.random() * songs.length) + 1);
      }while(songIndex == randIndex); 
      songIndex = randIndex; 
      loadTheSong(songIndex);
}
