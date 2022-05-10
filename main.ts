// This is a mario type game clone made because I was bored and I just thought of somthing challanging to make
// The author of this game is Phea Viphou, Hengleap Him, and David Jeremiah Garcia

// In Game Assets
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
    . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . # # . . . . . . . . . . . # . 
    . . # # # # . . # . . . # # # . . # # # . 
    # # . . . . . . . # # # . . . . . . . . . 
`)

let level_two = images.createBigImage(`
    . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . 
    . . . . . # . . . . . . . . . # . . . # . 
    . # # # # . . . . # # # # # . . . # # # . 
    # . . . . . . . . . . . . . . . . . . . . 
`)

// Music array (not in use)
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
let gameState = "start"

// Input Devices
let x_controls = pins.analogReadPin(AnalogPin.P0)
let buttton_controles = pins.digitalReadPin(DigitalPin.P2)

// Start Game Veriables
let levels = 1
let string_levels = "1"

// player info 
let onGround = false
let xOffset = -2
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
let player_jump_trajectory_front = 0
let player_jump_trajectory_back = 0
let jumpStateObjectCheck = false

// End Game Veriables 
let time = 0


// Start of code
music.setVolume(200)
music.startMelody(notes, MelodyOptions.ForeverInBackground)

// Start the level

// renders the level and player
// renderAll("Level 1")

// super while loop for the entire game
while (true){
    
    // assencially the main menu of the game 
    while (gameState == "start"){

        // reconfiguring each pin value
        x_controls = pins.analogReadPin(AnalogPin.P0)
        buttton_controles = pins.digitalReadPin(DigitalPin.P2)

        // tells the user information
        //lcd1602.putString("Displayed Map " + string_levels + " Presse Button B To Select", 0, 0)

        // checking whether the user wants to preveiw another level or they want to play the current
        // preveiwed levels
        if (x_controls < 400){

            // pause it for a bit
            basic.pause(250)
            
            // plus on level every time we click the A button, this is used to change the level
            // preveiws
            levels += 1

            // limiting the levels so than it does not go over the the amount of levels that we 
            // have
            if (levels > 2){
                levels = 1
            }
            
            // change the string_levels, important later when we want to render different levels 
            if (levels == 1){
                string_levels = "1"
            } else if (levels == 2) {
                string_levels = "2"
            }

            // changing the level preveiws
            renderAll("Level " + string_levels)
            
            // breaking out of the while loop
            break

        } else if (buttton_controles < 1){
            
            // changing the game state so it would start to activate the in game logic
            gameState = "go"
            
            // break out fo the while loop
            break

        }

    }
    
    // in game functions and logic
    while (gameState == "go") {

        // reconfiguring the pin values
        x_controls = pins.analogReadPin(AnalogPin.P0)
        buttton_controles = pins.digitalReadPin(DigitalPin.P2)

        // see if the player died or win
        if (player_yOffset > 4) {
            gameState = "stop"
            break
        } else if (xOffset >= 17) {
            gameState = "win"
            break
        }

        // input for the player to move right 
        if (x_controls < 400) {
            player_movement("b")
            playerGravity_yOffset()
            renderAll("Level " + string_levels)
        }

        // input for the player to move left
        if (x_controls > 500){
            player_movement("a")
            playerGravity_yOffset()
            renderAll("Level " + string_levels)
        }

        // input for jumping 
        if (buttton_controles < 1) {
            goingToJump()
            renderAll("Level " + string_levels)
        }

    }
    
    while (gameState == "win") {

        // clears the LED screen
        basic.clearScreen()

        // tells the user that they win
        basic.showString("YOU WIN!", 75)

        // change the game state so than the user or player would return to the mainMenu
        gameState = "start"

        // reseting all the important player veriables
        player_yOffset = 2
        xOffset = -2

        // renderes the main menu map
        renderAll("Level " + string_levels)

        // breaking out of the while loop
        break

    }

    // death screen
    while (gameState == "stop") {
        
        // this is use to time the amount of death screen will pop and disapear
        time += 1

        // clear the screen
        basic.clearScreen()

        // renderes the death screen
        renderAll("Death")

        // reset all the player states than bring the player back to 
        // menu
        if (time > 1) {
            
            // clears the LED array
            basic.clearScreen()
            
            // tells the user that they lost
            basic.showString("YOU LOSE!", 75)
            
            // change the game state so than the user or player would return to the mainMenu
            gameState = "start"
            
            // reseting all the important player veriables
            player_yOffset = 2
            xOffset = -2
            
            // renderes the main menu map
            renderAll("Level " + string_levels)

            // breaking out of the while loop
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
    player_jump_trajectory_front = led.pointBrightness(3, player_yOffset + 2)
    player_jump_trajectory_back = led.pointBrightness(1, player_yOffset + 2)

    // configuring the onGround veriables
    if (player_downwards < 1) {
        onGround = false
    } else if (player_downwards > 1) {
        onGround = true
    }

    // configuring the jumpStateObjectCheck veriables
    if (player_jump_trajectory_front < 1 && player_jump_trajectory_back < 1) {
        jumpStateObjectCheck = false
    } else if (player_jump_trajectory_front > 1 && player_jump_trajectory_back > 1) {
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