
//Note: We assumed here that the Ace is worth 11 and there is no card that is worth 1.

//Game_Instrctions

alert("Hello Welcome to this game the rules are simple. You have to generate cards randomly but without exceeding 24 otherwise you lose. Your score has to be greater than the one of the computer and again pay attention to not exceed 21. Enjoy!!!:)")
alert("Note!!!!    We assumed here that the Ace is worth 11 and there is no card that is worth 1.")
//array to store the Urls of images of the cards and Scores of each Card

var arr={
    "scores":{"0":2,"1":3,"2":4,"3":5,"4":6,"5":7,"6":8,"7":9,"8":10,"9":11,"10":12,"11":13,"12":14},
    "images":{0:"images/2.png",1:"images/3.png",2:"images/4.png",3:"images/5.png",4:"images/6.png",5:"images/7.png",6:"images/8.png",7:"images/9.png",8:"images/10.png",9:"images/A.png",10:"images/J.png",11:"images/K.png",12:"images/Q.png"},
}

// Important variables

let score_You=0;

let score_Computer=0;

let pushed_stand=0;

let flag=0;

//Sounds used when User wins or chose a card or lose

let swich=new  Audio('sounds/swish.m4a');// Hit sound
let cash= new Audio('sounds/cash.mp3');// Wining Sound
let awww= new Audio('sounds/aww.mp3');// losing Sound

//Function used for generating random cards

function random_number_selector(){
    return Math.floor(Math.random()*13)
}

//funtion that is executed when user clicks on Hit button

function HIT(){
    let randomnumber;
    if(flag==0){ // the flag is 0, when the user has to play
        randomnumber=random_number_selector();
        score_You=score_You + arr["scores"][randomnumber];
        if(score_You<=21){
            adding_image_You(randomnumber);
            document.querySelector(".you").querySelector("span").textContent=score_You;
            pushed_stand=1;
        }else{
            document.querySelector(".you").querySelector("span").textContent="You lost";
            document.querySelector(".you").querySelector("span").style.color="red";
            awww.play();
            flag=2;
        }
    }
}

//functions Used to add images to the screen

function adding_image_You(randomnumber){
    var im=document.createElement("img");
    im.src=arr["images"][randomnumber];
    document.querySelector(".imagyou").appendChild(im);
    swich.play();
}

function adding_image_Computer(randomnumber){
    var im=document.createElement("img");
    im.src=arr["images"][randomnumber];
    document.querySelector(".imagcomputer").appendChild(im);
    swich.play();
}

// function used to create a delay when generating cards

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}

//funtion that is executed when user clicks on Stand button

async function stand(){
    if(pushed_stand==1 && flag!=2 ){// the flag and pushed-stand variables shows that the user pressed the hit button before pressing the stand button
        flag=1;//the flag is 1 when the user played and the computer is playing
        while(score_Computer<15){
            randomnumber=random_number_selector();
            score_Computer= score_Computer + arr["scores"][randomnumber];
            adding_image_Computer(randomnumber);
            document.querySelector(".computer").querySelector("span").textContent=score_Computer;
            await sleep(1000);
        }
        computeWinner(score_Computer, score_You);
        flag=2;// the flag is 2 when both the user and computer played
    }
}

//funtion that is executed when user clicks on Stand button

function deal(){
    if(flag==2){ 
        let you=document.querySelector(".imagyou").querySelectorAll('img');
        let computer=document.querySelector(".imagcomputer").querySelectorAll('img');
        for(let i=0;i<you.length;i++){
            you[i].remove();
        }

        for(i=0;i<computer.length;i++){
            computer[i].remove();
        }
        // Initializing Scores
        score_You=0;
        score_Computer=0;

    flag=0;// initializing the flag so that the game can be played again
    pushed_stand=0
    resetElements();
    }
}

var text_for_user=document.createElement("h1");

//function that compares scores of user and computer and decides who wins.

function computeWinner(B, Y){  
    if(Y>B || B>21){
        document.querySelector(".you").querySelector("span").textContent="You Win";
        document.querySelector(".you").querySelector("span").style.color="blue";
        document.querySelector(".computer").querySelector("span").textContent="Looser";
        document.querySelector(".computer").querySelector("span").style.color="red";
        text_for_user.textContent="Win!";
        text_for_user.style.color="blue";
        cash.play();
    } else if(B>Y){
        document.querySelector(".you").querySelector("span").textContent="You lost";
        document.querySelector(".you").querySelector("span").style.color="red";
        document.querySelector(".computer").querySelector("span").textContent="Winner";
        document.querySelector(".computer").querySelector("span").style.color="blue";
        text_for_user.textContent="Lost!";
        text_for_user.style.color="orange";
        awww.play();

    }else if(Y==B){
        document.querySelector(".you").querySelector("span").textContent="Equality";
        document.querySelector(".you").querySelector("span").style.color="white";
        document.querySelector(".computer").querySelector("span").textContent="Equality";
        document.querySelector(".computer").querySelector("span").style.color="white";
        text_for_user.textContent="Not that good";
        text_for_user.style.color="black";
    }
    document.querySelector("#texts").appendChild(text_for_user);
}

// function that initialize HTML Elements

function resetElements(){
    text_for_user.remove();
    document.querySelector(".you").querySelector("span").textContent="0";
    document.querySelector(".computer").querySelector("span").textContent="0";
    document.querySelector(".you").querySelector("span").style.color="white";
    document.querySelector(".computer").querySelector("span").style.color="white";

}