// This is a mario type game clone made because I was bored and I just thought of somthing challanging to make
// The author of this game is Phea Viphou

// In Game Assets
// Main menu
let mainMenu = images.createImage(`
    # # # # #
    # . . . #
    # # . # #
    . # # # .
    . . . . .
`)

// Death screen
let deathScreen_face = images.createImage(`
    # # # # #
    # . . . #
    # # . # #
    . # # # .
    . . . . .
`)

let deathScreen_eye = images.createImage(`
    . . . . .
    . # . # .
    . . . . . 
    . . . . .
    . . . . .
`)

// Maps
let level_one = images.createBigImage(`
    . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . .
    . . . . . . # # # . . . . . . . . . . .
    . # # # # # . . . . . . # # # . . # # #
    # . . . . . . . . . . . . . . . . . . .
    . . . . . . # # . . . . . . . . . . . .
    . . # # # # . . # . . . # # # . . # # #
    # # . . . . . . . # # # . . . . . . . .
`)

let level_two = images.createBigImage(`
    . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . .
    . . . . . # . . . . . . . . . # . . . .
    . # # # # . . . . # # # # # . . . # # #
    # . . . . . . . . . . . . . . . . . . .
`)

// Music array
let notes = ["c4:1", "e", "g", "c5", "e5", "g4", "c5", "e5", "c4", "e", "g", "c5", "e5", "g4", "c5", "e5", "c4",
    "d", "a", "d5", "f5", "a4", "d5", "f5", "c4", "d", "a", "d5", "f5", "a4", "d5", "f5", "b3", "d4", "g  ",
    "d5", "f5", "g4", "d5", "f5", "b3", "d4", "g", "d5", "f5", "g4", "d5", "f5", "c4", "e", "g", "c5", "e5",
    "g4", "c5", "e5", "c4", "e", "g", "c5", "e5", "g4", "c5", "e5", "c4", "e", "a", "e5", "a5", "a4", "e5",
    "a5", "c4", "e", "a", "e5", "a5", "a4", "e5", "a5", "c4", "d", "f#", "a", "d5", "f#4", "a", "d5", "c4",
    "d", "f#", "a", "d5", "f#4", "a", "d5", "b3", "d4", "g", "d5", "g5", "g4", "d5", "g5", "b3", "d4", "g",
    "d5", "g5", "g4", "d5", "g5", "b3", "c4", "e", "g", "c5", "e4", "g", "c5", "b3", "c4", "e", "g", "c5",
    "e4", "g", "c5", "a3", "c4", "e", "g", "c5", "e4", "g", "c5", "a3", "c4", "e", "g", "c5", "e4", "g",
    "c5", "d3", "a", "d4", "f#", "c5", "d4", "f#", "c5", "d3", "a", "d4", "f#", "c5", "d4", "f#", "c5", "g3",
    "b", "d4", "g", "b", "d", "g", "b", "g3", "b3", "d4", "g", "b", "d", "g", "b"]



// In Game Veriables
let xOffset = -2
let gameState = "go"

// Start Game Veriables
// player info 
let onGround = false
let player_yOffset = 2
let player_speed = 250 // player speed is messured in ms
let player_downwards = 0
let player_above = 0

// player collision check forward
let player_forwards_partone = 0
let player_forwards_parttwo = 0

// player collision check backwards
let player_backwards_partone = 0
let player_backwards_parttwo = 0

// jumping 
let player_jump_trajectory = 0
let jumpStateObjectCheck = false

// End Game Veriables 
let time = 0


// Start of code
//music.setVolume(200)
//music.startMelody(notes, MelodyOptions.ForeverInBackground)

// start of game
led.setDisplayMode(DisplayMode.Greyscale)

// Start the level

// renders the level and player
renderAll("Level 1")

// super while loop for the entire game
while (true){
    
    // while loop to start the game functions and end it if loose
    while (gameState == "go") {

        if (player_yOffset > 4) {
            gameState = "stop"
            break
        }

        // input for button A for going forward
        if (input.buttonIsPressed(Button.A)) {
            player_movement("b")
            playerGravity_yOffset()
            renderAll("Level 1")
        }

        // input for button B for jumping
        if (input.buttonIsPressed(Button.B)) {
            goingToJump()
            renderAll("Level 1")
        }

    }

    while (gameState == "stop") {
        
        // 
        time += 1

        // clear the screen
        basic.clearScreen()

        // renderes the death screen
        renderAll("Death")

        // reset all the player states than bring the player back to 
        // menu
        if (time > 1) {
            basic.clearScreen()
            basic.showString("YOU LOSE!", 100)
            gameState = "go"
            player_yOffset = 2
            xOffset = -2
            renderAll("Level 1")
            break
        }
        
    }
}   



// this function is resposible for all the player movement in the game
// this is used as a organization tool, for all the important veriables
function player_movement(button: string) {

    // first to check the players collision to ditermine if any obsticles
    // is infront
    playerCollision()

    // resposible for changing the xOffset, this is important because it makes the
    // rendering function able to move the map according to the xOffset, it is also 
    // responsible for chaning the player xoffset which is used to see if there are
    // ground infront of the player when moving forward
    if (button == "a" && player_forwards_partone < 1 && player_forwards_parttwo < 1) {
        xOffset -= 1
    } else if (button == "b" && player_forwards_partone <= 0 && player_forwards_parttwo <= 0) {
        xOffset += 1
    }

    // limit where the player could move, so the player wont move off the map
    if (xOffset < -2) {
        xOffset = -2
    } else if (xOffset > 17) {
        xOffset = 17
    }
}

// this is responsible for deciding wether the gravity should be apllied or not    
// dependding on wether we are on the ground or not, this is also intigrated with
// the jumping function
function playerGravity_yOffset() {

    // this checks if the player is on the ground or not and it also checks it the
    // player is jumping or not
    if (onGround == false && jumpStateObjectCheck == false) {
        player_yOffset += 1
    } else {
        return
    }

}

// this is resposible for all the collision dectection befor the movement
// function 
function playerCollision() {

    // player collision check forward
    player_forwards_partone = led.pointBrightness(3, player_yOffset)
    player_forwards_parttwo = led.pointBrightness(3, player_yOffset + 1)

    // player collision check backwards
    player_backwards_partone = led.pointBrightness(1, player_yOffset)
    player_backwards_parttwo = led.pointBrightness(1, player_yOffset + 1)

    // player collision check upwards
    player_above = led.pointBrightness(2, player_yOffset - 1)

    // player collision check downwards
    player_downwards = led.pointBrightness(2, player_yOffset + 2)

    // player jump trajectory check, it checks if there would be ground whent the player
    // lands down in the future
    player_jump_trajectory = led.pointBrightness(3, player_yOffset + 2)

    // configuring the onGround veriables
    if (player_downwards < 1) {
        onGround = false
    } else if (player_downwards > 1) {
        onGround = true
    }

    // configuring the jumpStateObjectCheck veriables
    if (player_jump_trajectory < 1) {
        jumpStateObjectCheck = false
    } else if (player_jump_trajectory > 1) {
        jumpStateObjectCheck = true
    }

}

// responsible for jumping 
function goingToJump() {

    // fix bug that I forgot :( but it just fix so why not?
    playerCollision()

    // checking the obsticles above the player and if we are grounded
    // or not
    if (onGround == true && player_above < 1) {
        player_yOffset -= 2
    }
}


// responsible for rendering the player and the map
function renderAll(renderState: string) {

    // redering the moved level
    if (renderState == "Death"){
        
        // gives the eyes an effect by changing the brightness using Math
        // random and chaning it back to a normal 255, it makes the eyes
        // looks like it is glowing
        led.setBrightness(Math.randomRange(150, 255))
        deathScreen_eye.showImage(0)
        led.setBrightness(255)

        basic.clearScreen()
        
        deathScreen_face.showImage(0)
    }else if (renderState == "Level 2") { 
        
        // renderes the level assigned by the render state
        level_two.showImage(xOffset, player_speed)

    }else if (renderState == "Level 1") {

        // renders the level assigned by the render state
        level_one.showImage(xOffset, player_speed)
    }

    // redering the players body
    led.plot(2, player_yOffset)
    led.plot(2, player_yOffset + 1)
}