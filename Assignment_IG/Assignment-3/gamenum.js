var count = Math.floor(Math.random() * 100 + 1);

var num = 1;

document.getElementById("submit").onclick = function () {

    // user input
    var a = document.getElementById("enter").value;

     if (a > count) {
        num++;
        document.getElementById("result").innerHTML += "Enter A SMALLER Number <br>"

    } else if(a<count) {
        num++;
        document.getElementById("result").innerHTML += "Enter A GREATER Number <br>"
    }
    else {
        // writing into HTML file using DOM
        document.getElementById("result").innerHTML += `Congratulation, your guessed it CORRECT 😃. Success after ${num} attempts <br>.`

    } 
    
    

}