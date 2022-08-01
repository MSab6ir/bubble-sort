var pl0,pl1,pl2,pl3,pl4,pl5,pl6,pl7,pl8,pl9;
var arr = [0,0,0,0,0,0,0,0,0,0];
var btn1,bnt2;
var selectPl;
var plLeft;
var setInv;
var plBottom=13;
var select=1;
var rightPos=0;

window.onload = function(){
    pl1 = document.getElementById("pl1");
    pl2 = document.getElementById("pl2");
    pl3 = document.getElementById("pl3");
    pl4 = document.getElementById("pl4");
    pl5 = document.getElementById("pl5");
    pl6 = document.getElementById("pl6");
    pl7 = document.getElementById("pl7");
    pl8 = document.getElementById("pl8");
    pl9 = document.getElementById("pl9"); 
    btn1 = document.getElementById("btn1");
    bnt2 = document.getElementById("btn2");
}
var isStart= 0,isRandom=0;
function start(){
    if(isRandom==1 && isStart==0){
        btn2.style.backgroundColor = "gray";
        btn1.style.backgroundColor = "gray";
        isStart = 1; isRandom=0;
        setInv = setInterval(check,500);
    }
}
function rndom(){
    if(isStart==0){
        unsorting();
        isRandom = 1;
        btn1.style.backgroundColor = "black";
        clearInterval(setInv);
        selectPl=0; select=1; rightPos=0;
        for(let i=1; i<=9; i++){
            eval("pl"+i).style.backgroundColor = "red";
        }

    }
}
function unsorting(){
    let i=9;
    while(i){
        let a = Math.floor(Math.random()*40);
        if(a<5) a=5; arr[i] = a; i--;
    }
    display();
}
function display(){
    let i=9; while(i){
        let a = arr[i];
        eval("pl"+i).style.height=a+"%";
        eval("pl"+i).innerHTML =  ""+arr[i];
        i--;
    }
}

function check(x){
   // let j = Math.floor(select);
    let i = Math.round(select);
    if(i-1!=0) eval("pl"+(i-1)).style.backgroundColor = "red";
    eval("pl"+i).style.backgroundColor= "blue";
    if(arr[i]>arr[i+1] && i === select){
        eval("pl"+(i+1)).style.backgroundColor= "purple";
        let k = arr[i];
        arr[i] = arr[i+1];
        arr[i+1] = k;
        clearInterval(setInv);
        swaped(i);
    }
    if(select>= (9-rightPos)){
        eval("pl"+i).style.backgroundColor= "green";
        rightPos++;
        select=0;
    }
    if(rightPos>=9){
        clearInterval(setInv);
        isStart=0; 
        btn2.style.backgroundColor="black";
    }
    select += 0.5;
}

// swape area *********************************
function swaped(x){
    selectPl = x;
    plLeft = (x+1)*10-5;
    setInv = setInterval(up,30);
}
function up(){
    plBottom++;
    eval("pl"+selectPl).style.bottom = plBottom+"%";
    if(plBottom>=50){
        clearInterval(setInv);
        setInv = setInterval(moveLeft,30);
    }
}
function moveLeft(){
    plLeft--;
    let y = selectPl*10-5;
    eval("pl"+(selectPl+1)).style.left = plLeft+"%";
    if(y>=plLeft){
        clearInterval(setInv);
        setInv = setInterval(moveRight,30);
    } 
}
function moveRight(){
    plLeft++;
    let y = (selectPl+1)*10-5;
    eval("pl"+selectPl).style.left = plLeft+"%";
    if(y<=plLeft){
        clearInterval(setInv);
        setInv = setInterval(down,30);
    } 
}
function down(){
    plBottom--;
    eval("pl"+selectPl).style.bottom = plBottom+"%";
    if(plBottom<=13){
        clearInterval(setInv);
        eval("pl"+selectPl).style.left = (plLeft-10)+"%";
        eval("pl"+(selectPl+1)).style.left = plLeft+"%";
        eval("pl"+(Math.round(select))).style.backgroundColor= "blue";
        eval("pl"+(Math.round(select)-1)).style.backgroundColor= "red";
        display();
        
        setInv = setInterval(check,500);
    }
}
// swape area end *****************************

