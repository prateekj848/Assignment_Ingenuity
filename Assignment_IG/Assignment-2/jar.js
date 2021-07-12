    var count = parseInt(Math.random() * 100);
    
    var s = prompt("Enter the number between 1 to 100");
    console.log(s);
    
    while (s != count) {
    
        if (s > count) {
            console.log("your number is: ", s)
            console.log(`your number was higher`);
            var s = prompt("Try a lowr number");
        }
        else {
            console.log("your number is: ", s)
            console.log(`your number was lower`);
            var s = prompt("Try a higher number");
        }
    }
    if (s == count) {
        console.log(`Your number is correct 😃. the number is ${s}.`);
    } 
