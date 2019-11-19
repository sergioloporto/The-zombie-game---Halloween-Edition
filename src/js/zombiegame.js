///////////////////////////////////////////////////////
///  Once again import the needed global variables   //
///////////////////////////////////////////////////////
const board = document.querySelector(".board"); //The whole game space



//////////////////////////////////////////////////////////////////////////////////
//Export the function, so that it can be run by the login() function in app.js  //
//////////////////////////////////////////////////////////////////////////////////
export function zombieGame() {
    let shotsCounter = -1; //total number of shots (-1 because one will be used to login :) )
    let killed = 0; //total number of killed


    ///////////////////////////////////////////////////////
    ////////      Set the level number           //////////
    ///////////////////////////////////////////////////////
    const levelBox = document.querySelector('.level');
    levelBox.innerText = "Level 1";



    ////// Create a zombie on each interval
    setInterval(() => {

        ////// Create a div with a zombie
        const zombie = document.createElement("div");
        zombie.classList.add("zombie");


        ////// Increase the counter of Killed
        const shotsNumber = document.querySelector('.shots');
        zombie.addEventListener('click', function () {
            killed++;
            shotsNumber.innerText = `${killed}/${shotsCounter}`
        });


        ////// Define the position of the zombies.
        let pos = 0;
        {   // positions from the bottom
            const min = 20;
            const max = 230;
            pos = Math.floor(Math.random() * (max - min + 1) + min);
            zombie.style.bottom = `${pos}px`;
        }


        {   // Set the speed of the zombies
            const min = 6;
            const max = 20;
            const speed = Math.floor(Math.random() * (max - min + 1) + min);
            zombie.style.animationDuration = `1s, ${speed}s`
        }

        {   // Set the zombies position according to the perspective
            zombie.style.zIndex = 230 - pos;
        }

        // Delete the zombies as soon as the zombie goes out of the screen
        zombie.addEventListener("animationend", function () {
            this.remove();
        });

        // Remove the killed zombies for a better and happier world
        zombie.addEventListener("click", function () {
            this.remove();
        });

        // Add the newly created zombie to the game
        board.appendChild(zombie);

        // Force layout reflow: more on https://gist.github.com/paulirish/5d52fb081b3570c81e3a
        const divs = board.querySelectorAll("div.zombie");
        const positions = [...divs].map(el => el.offsetLeft);


    }, 800); // How often a new zombie is created

    ///////////////////////////////////////////////////////////
    // SHOTS Counter
    ////////////////////////////Count the shots////////////////
    const countTheShots = () => {
        const shotsNumber = document.querySelector('.shots');
        shotsNumber.innerText = `${killed}/${shotsCounter}`;
        window.addEventListener('click', function () {
            shotsCounter++;
            shotsNumber.innerText = `killed ${killed}/${shotsCounter} total`;
        });
    };
    countTheShots();
}
