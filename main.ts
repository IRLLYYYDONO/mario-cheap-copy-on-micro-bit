// This is a mario type game clone made because I was bored and I just thought of somthing challanging to make
// The author of this game is Phea Viphou

// Maps
let level_one = images.createBigImage(`
    . . . . . . . . . . . . # # . . . . . .
    . . . . . . . . . . . . . . . . . . . .
    . . . . . . # # . . . . . . . . . . . .
    . . # # # # . . # . . . # # # # . . # #
    # # . . . . . . . # # # . . . . . . . .
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

// Veriables
let xOffset = -2
let onGround = false
let n = 1

//player info 
let player_yOffset = 2
let player_Speed = 250 // player speed is messured in ms

// player collision check forward
let player_forwards_partone = 0
let player_forwards_parttwo = 0

// player collision check backwards
let player_backwards_partone = 0
let player_backwards_parttwo = 0

//jumping
let isJumping = false
let hieght = 0
let player_downwards = 0
let player_above = 0
let jumpStateObjectCheck = 0


// Start of code
music.setVolume(200)
music.startMelody(notes, MelodyOptions.ForeverInBackground)

level_one.showImage(-2)

while (true) {

    //configure the collision
    playerCollision()

    // input for button A for going forward
    if (input.buttonIsPressed(Button.A)) {
        player_movement("b")
        playerGravity_yOffset()
        renderAll()
    }

    // input for button B for jumping
    if (input.buttonIsPressed(Button.B)) {
        goingToJump()
        playerGravity_yOffset()
        renderAll()
    }

}

// this function is resposible for all the player movement in the game
// this is used as a organization tool, for all the important veriables
function player_movement(button: string) {

    // resposible for changing the xOffset, this is important because it makes the
    // rendering function able to move the map according to the xOffset
    if (button == "a" && player_backwards_partone <= 0 && player_backwards_parttwo <= 0) {
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

    // this here is important because one this if statment fix all the problems
    // that is connected to the jumping machanic and gravity mechanic, you see
    // without this checking 
    if (onGround == false && isJumping == false && jumpStateObjectCheck < 1) {
        player_yOffset += 1
    } else {
        return
    }

}

// this is resposible for all the collision dectection befor the movement
// function 
function playerCollision() {
    // giving permission

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

    // check object in the way of the jumping trajectory 
    jumpStateObjectCheck = led.pointBrightness(3, player_yOffset + 2)

    // configuring the onGround Veriables
    if (player_downwards < 1) {
        onGround = false
    } else if (player_downwards > 1) {
        onGround = true
    }

}

// responsible for rendering the player and the map
function renderAll() {

    level_one.showImage(xOffset, player_Speed)

    led.plot(2, player_yOffset)
    led.plot(2, player_yOffset + 1)
}

// responsible for jumping 
function goingToJump() {
    isJumping = true
    if (onGround == true && player_above < 1 && isJumping == true) {
        player_yOffset -= 1
        isJumping = false
    }
}
