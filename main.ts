// This is a mario type game clone made because I was bored and I just thought of somthing challanging to make
// The author of this game is Phea Viphou

// Maps
let level_one = images.createBigImage(`
    . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . # # # # . . . #
    . . . . . . # # . . . . . . . . . . . #
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
let xOffset = 0
let onGround = false
let player_yOffset = 2
let player_Speed = 250


// player speed is messured in ms
// Start of code
music.setVolume(200)
music.startMelody(notes, MelodyOptions.ForeverInBackground)


while (true) {
    // input for button A and B
    if (input.buttonIsPressed(Button.A)) {
        player_movementVerification("a")
    }
    
    if (input.buttonIsPressed(Button.B)) {
        player_movementVerification("b")
    }
    
}

function playerInfo() {
    // giving permission
        
    // this is the
    let player_LED_one = [2, player_yOffset]
    let player_LED_two = [2, player_yOffset + 1]
}
    
function playerGravity_yOffset() {
    // giving permission
    
    if (onGround == false) {
        player_yOffset -= 1
    }
        
}

function playerCollision() {
    // giving permission
        
    // player collision check forward
    let player_forwards_partone = led.pointBrightness(3, player_yOffset)
    let player_forwards_parttwo = led.pointBrightness(3, player_yOffset + 1)
    
    // player collision check backwards
    let player_backwards_partone = led.pointBrightness(1, player_yOffset)
    let player_backwards_parttwo = led.pointBrightness(1, player_yOffset + 1)
    
    // player collision check upwards
    let player_above = led.pointBrightness(2, player_yOffset - 1)
    
    // player collision check downwards
    let player_downwards = led.pointBrightness(2, player_yOffset + 2)
    
    // configuring the onGround Veriables
    if (player_downwards < 0) {
        onGround = false
    } else if (player_downwards > 0) {
        onGround = true
    }
        
}


function player_movementVerification(button: string) {
    // giving permission
    
    // resposible for changing the xOffset, this is important because it makes the
    // rendering function able to move the map according to the xOffset
    if (button == "a") {
        xOffset -= 1
    } else if (button == "b") {
        xOffset += 1
    }
    
    // limit where the player could move, so the player wont move off the map
    if (xOffset < -2) {
        xOffset = -2
    } else if (xOffset > 16) {
        xOffset = 16
    }
    
}

