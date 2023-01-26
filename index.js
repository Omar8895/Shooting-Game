window.addEventListener("load",function(){

//selectors

    let goButton = this.document.querySelector("input[type=submit]");

    let textBox = this.document.querySelector("input[type=text]");

    let listBox = this.document.querySelector(".list")

    let emptyBox = this.document.querySelector("span");
    

//Events


    goButton.onclick =function()
         
    {

        if (textBox.value == "" || textBox.value == null)
        
        {
            emptyBox.style.display="block";

            return ;
        }

        else
        {
            emptyBox.style.display="none";

            let date = new Date() ; 

            let lastScore = localStorage.getItem("Score");

            let playerData = 
            {
                playerName : textBox.value,

                gameDate : date.toLocaleString(),

                playerScore : lastScore

            }

            localStorage.setItem("Name",playerData.playerName);

            localStorage.setItem('playerData',JSON.stringify(playerData));

            window.location.href="http://127.0.0.1:5500/game.html";
 
        }
            
    }//E O event

}) // E O load