///////////////////////////////////////////////////////
//////////////     GLOBAL VARIABLES      //////////////
///////////////////////////////////////////////////////

const board = document.querySelector(".board"); //The whole game space
const cross = document.querySelector(".cross"); //The viewfinder
const navbarNameField = document.querySelector('.yourname');

///////////////////////////////////////////////////////
//Preload shooting sounds and function to play sound //
///////////////////////////////////////////////////////
let shootSound = new Audio("sounds/380_gunshot_single-mike-koenig.mp3"); // License http://soundbible.com
shootSound.preload = 'auto';
shootSound.load();

function playShootingSound(volume) {
    var click = shootSound.cloneNode();
    click.volume = volume;
    click.play();
}

////////////////////////////////////////////////////////////
//Get the cursor position and assign it to the viewfinder//
///////////////////////////////////////////////////////////
board.addEventListener('mousemove', function (e) {
    cross.style.left = `${e.pageX}px`;
    cross.style.top = `${e.pageY}px`;
});


///////////////////////////////////////////////////////
////////////       The login box              /////////
///////////////////////////////////////////////////////
function login() {
    const loginBox = document.querySelector('.login-box');
    const playBtn = document.querySelector('.startButton');
    playBtn.addEventListener('click', function (e) {
        e.preventDefault();
        loginBox.style.display = "none"; // The login box will disappear during the game
        loginBox.style.pointerEvents = "none"; // The pointer Events also must be disabled


        /////  Check if the user is logged in. If the user is logged in, write the name in the header.
        function checkIfLoggedin() {
            const yourName = document.getElementById('name').value;
            localStorage.setItem('zombiegameSavedName', yourName);
            if (localStorage.getItem("zombiegameSavedName") != null) {
                navbarNameField.innerText = `Player 1: ${localStorage.zombiegameSavedName}`;


                ///// Play sound on shoot
                window.addEventListener('click', function () {
                    playShootingSound(0.5);
                });
            }
        }

        // Always run the function to check if the user is logged in.
        // If the user logged in once and then reloads the page, has to log in once again,
        // and the localStorage value will be overwritten.
        // There is no need for name retention or logout. I want the game to start after clicking "play"
        checkIfLoggedin();


        ////// Background music for level 1
        let zombieSound = new Audio("sounds/Zombie_Horde-Mike_Koenig-1926300541.mp3"); // License http://soundbible.com
        zombieSound.preload = 'auto';
        zombieSound.load();

        function playZombieSound(volumeValue) {
            var backgroundZombieSound = zombieSound.cloneNode();
            backgroundZombieSound.volume = volumeValue;
            backgroundZombieSound.play();
        }
        playZombieSound(1);

        ///// Start the game - Level 1
        zombieGame();
    })
}

//// Start the login function, which in turn will start the Level one in case the player clicks on "Play"
login();

///////////////////////////////////////////////////////
////////////       Import the game            /////////
///////////////////////////////////////////////////////
import {zombieGame} from "./zombiegame";

