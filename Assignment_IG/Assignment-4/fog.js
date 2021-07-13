const inputBox= document.querySelector(".input input")
const addBtn= document.querySelector(".input button")
const todo=document.querySelector(".todolist")

const foot=document.querySelector(".footer button")
show();
   
 foot.onclick=()=>{
     Arr=[];
     localStorage.setItem("list",JSON.stringify(Arr));
     show();
 }
//   console.log(inputBox);
//   console.log(addBtn);
//   console.log(todo);
//  inputBox.onkeyup=() =>{

//     let userdata=inputBox.value;
//        if(userdata.trim()!=0)
//        {addBtn.classList.add("active");
//       }else{
//           addBtn.classList.remove("active");
//       }
//  }
    
    //console.log(userdata);


    addBtn.onclick =() =>{
        let userdata=inputBox.value;
    
        let LS=localStorage.getItem("list");

        if(LS==null)
        {
            Arr=[];
        }
        else{
            Arr=JSON.parse(LS); //transfroming the json string into js object 
           // console.log(Arr);
        }
             Arr.push(userdata);
             localStorage.setItem("list",JSON.stringify(Arr)); ///ye krna h read
             show();
    } 


    function show(){
        let LS=localStorage.getItem("list");
         if(LS==null)
         {
             Arr=[];
          }
          else{
             Arr=JSON.parse(LS); //transfroming the json string into js object 
           }

            let pending=document.querySelector(".pending");
            pending.textContent=Arr.length;

           let newli='';
           Arr.forEach((element,index) => {
               newli +=`<li> ${element} <span onclick="Delete(${index})";>Del</span></li>`;
           });
           todo.innerHTML =newli;
           inputBox.value="";
    }



    function Delete(index){
        let LS=localStorage.getItem("list");
        Arr=JSON.parse(LS);
        Arr.splice(index,1);

        localStorage.setItem("list",JSON.stringify(Arr));
        show();
    }