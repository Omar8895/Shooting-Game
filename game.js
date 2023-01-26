window.addEventListener("load",function(){

//Getting name from Local storage

    document.querySelector(".userName").innerHTML=localStorage.getItem("Name");

    document.querySelector(".userName2").innerHTML=localStorage.getItem("Name");

    document.querySelector(".userName3").innerHTML=localStorage.getItem("Name");
    
  
//count and score initialization

    let count =1;

    let score =0;

//selectors

    let startGame = this.document.querySelector("input[type=submit]");

    let title = this.document.querySelector(".window");

    let image = this.document.querySelectorAll("img");

    let totalScore = document.querySelector(".total");

    let totalScore2 = document.querySelector(".total2");

    let totalCount = this.document.querySelector(".count");

    let final = this.document.querySelector(".final");

    let timerWindow = this.document.querySelector(".timer");

    let winMessage = this.document.querySelector(".win");

    let loseMessage = this.document.querySelector(".lose");

    let sadImage = this.document.querySelector(".sad");

    let happyImage = this.document.querySelector(".happy");

    let bulletSound = this.document.querySelector(".bullet");

    let bombSound = this.document.querySelector(".boom");

    let playAgain = this.document.querySelector(".again");

    let newButton = this.document.querySelector(".new");

    let container = this.document.querySelector(".container");


//start game event

    startGame.onclick=function()
    {

        title.style.display="none";
        
        document.body.style.backgroundImage = "url('images/2.jpg')";

//functions calling

        gameTimer();
       
        birdsCreationMove();

        bombCreationMove();

        bombFunctionality();

//count and score calculations

       window.addEventListener("click",function(events)
       {
        
            if (events.target.classList.contains("bird") ) 
            { 
                totalCount.innerHTML=count++;

 //bullet sound

                bulletSound.play();

                if (events.target.classList.contains("whiteBird")) 
                { 
                score+=5; 
                } 

                if(events.target.classList.contains("blackBird"))
                {
                    score+=10;
                }

                if(events.target.classList.contains("blueBird"))
                {
                    score-=10;
                }

                totalScore.innerHTML=score;

                events.target.remove();
            } 

//Win or Loss

            if ( score > 50) 
            {

                winMessage.style.display="block";

                loseMessage.style.display="none";

                happyImage.style.display = "block";

                sadImage.style.display = "none"
            }


            else
            {
                winMessage.style.display="none";

                loseMessage.style.display="block";

                happyImage.style.display = "none";

                sadImage.style.display = "block"
            }

            totalScore2.innerHTML=score;

            this.localStorage.setItem("Score",score);
      
        } //E O E onclick

    )}//E O E start game



//play again button

    playAgain.onclick = function()
    
    {

        window.location.href="http://127.0.0.1:5500/game.html";

        
    } //E O Play Again


//new game button

    newButton.onclick = function()
    {

        window.location.href="http://127.0.0.1:5500/index.html";

    } //E O New Game




    const bombCreationMove = function()
    
    {

//Bomb creation 

        let id= setInterval (function()
        
        {
            let bomb = document.createElement("img");

            bomb.src = "images/Animated-Bomb-PNG.png" ; 

            document.body.append(bomb);

            bomb.classList.add("bomb");

            let bombDestribution = Math.ceil(Math.random()*1115); 

            bomb.style.left = bombDestribution +"px";

//bomb movement

            let movingDown = 0 ; 

            let id2 = setInterval(function()
            
            {

                movingDown+=15; 

                if ( movingDown < window.innerHeight - bomb.height -100 )
                {
                    bomb.style.top = movingDown + "px";
                } 

                else 
                {
                    clearInterval(id2);

                    bomb.remove();
                }

            },100) //E O id


            let id3 =setTimeout (function()
            {

                clearInterval(id);

            },40000)

        },10000) // E O id2

    } // E O 

   

    const birdsCreationMove = function ()
    {

//Creating birds

        let id = setInterval(function(events)
        
        {
            let images = ["images/whiteBird.gif" , "images/blackBird.gif" , "images/blueBird.gif"];

            let birds = document.createElement("img");

            let random = Math.floor(Math.random()*3);

            birds.src = images[random];
            
            document.body.append(birds);

            birds.classList.add("bird") ;

            container.append(birds);

            if ( random == 0 )
            {
                birds.classList.add("whiteBird");   
            }

            if (random==1)
            {
                birds.classList.add("blackBird");
            }

            if (random==2)
            {

                birds.classList.add("blueBird");
            }

//Birds distribution 

            let birdDestribution = Math.ceil(Math.random()* 490); 

            birds.style.bottom = birdDestribution+"px";

//Birds movements

            let moving_Left = 0 ; 

            let id2 = setInterval(function()
            {

                if ( moving_Left < window.innerWidth - birds.width-7)
                {
                    moving_Left+=15;

                    birds.style.left = moving_Left + "px";
                } 

                else

                {
                    birds.remove();
                }

            },100) //E O id 1    


            let id3 = setTimeout(function()
            {

                this.clearInterval(id);

            },51800) // E O id3


            let id4 =setTimeout(function()
            {

                final.style.display="block";

            },60000)// E O id4

        },1000) //E O id2

    }//E O left birds 



// count down timer

        const gameTimer = function()
        {

            let startTime = 0.99;

            let time = startTime*60;

            let id = setInterval(function()
            {

                let minutes = Math.floor(time/60);

                let seconds = Math.floor(time % 60) ; 

                timerWindow.innerHTML = `${minutes} :  ${seconds } `

                time -- ;

                if(time < 0 )
                {
                    clearInterval(id);
                }

            },1000)

        }// E O F get_Time


//Bomb boundries with birds 

        const bombBoundaries = function(bomb , birds)
        {
            let inRange = false;

// bomb dimensions

            let bombLeft = parseInt( bomb.style.left ) ;
            let bombRight = bombLeft + bomb.width + 100 ;
            let bombTop = parseInt( bomb.style.top);
            let bombBottom = bombTop + bomb.height + 100; 
            
//birds dimensions

            let birdsLeft = parseInt(birds.style.left);
            let birdsRight = birdsLeft + birds.width ; 
            let birdsTop = parseInt(birds.offsetTop);
            let birdsBottom = birdsTop + birds.height ;

//Conditions

            if  (birdsTop > bombTop && birdsRight > bombLeft 
                
                && birdsLeft < bombRight && birdsTop < bombBottom)

            {
                inRange = true ;
            }

            return inRange ;

        }


//Bomb functionality

        const bombFunctionality = function()
        {
            window.addEventListener("click",function(event)
            {
            
                if(event.target.classList.contains("bomb"))  
                {
                    event.target.remove();

                    bombSound.play();

                    let insideBirds = document.querySelectorAll(".container img");
                    
                    for ( let i = 0 ; i < insideBirds.length ; i ++ )
                    {

                        if  (bombBoundaries(event.target , insideBirds[i])== true)
                        { 

                            if (insideBirds[i].classList.contains("bird"))
                            
                            {
                               
                                insideBirds[i].remove();

                                count++;
                                
                                if (insideBirds[i].src== "http://127.0.0.1:5500/images/whiteBird.gif")
                                {
                                    score+=5;  
                                } 

                                if(insideBirds[i].src == "http://127.0.0.1:5500/images/blackBird.gif")
                                {
                                    score+=10;
                                }

                                if (insideBirds[i].src ==  "http://127.0.0.1:5500/images/blueBird.gif")
                                {
                                    score-=10;
                                }


                            } //E O if
                        
                        }//E O if  
    
                        
                        
                    }//E O loop
                   

                    totalScore.innerHTML=score;
                    totalCount.innerHTML=count;

                } //E O if

               // totalCount.innerHTML=count;
           
            }) // E O click

        }//E O function

        

    })//E O load