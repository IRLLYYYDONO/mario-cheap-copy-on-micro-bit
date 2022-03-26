let level_one = images.createBigImage(`
    . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . # # # # . . . #
    . . . . . . # # . . . . . . . . . . . #
    . . # # # # . . # . . . # # # # . . # #
    # # . . . . . . . # # # . . . . . . . .
`)
let notes = ["c4:1", "e", "g", "c5", "e5", "g4", "c5", "e5", "c4", "e", "g", "c5", "e5", "g4", "c5", "e5", "c4", "d", "a", "d5", "f5", "a4", "d5", "f5", "c4", "d", "a", "d5", "f5", "a4", "d5", "f5", "b3", "d4", "g", "d5", "f5", "g4", "d5", "f5", "b3", "d4", "g", "d5", "f5", "g4", "d5", "f5", "c4", "e", "g", "c5", "e5", "g4", "c5", "e5", "c4", "e", "g", "c5", "e5", "g4", "c5", "e5", "c4", "e", "a", "e5", "a5", "a4", "e5", "a5", "c4", "e", "a", "e5", "a5", "a4", "e5", "a5", "c4", "d", "f#", "a", "d5", "f#4", "a", "d5", "c4", "d", "f#", "a", "d5", "f#4", "a", "d5", "b3", "d4", "g", "d5", "g5", "g4", "d5", "g5", "b3", "d4", "g", "d5", "g5", "g4", "d5", "g5", "b3", "c4", "e", "g", "c5", "e4", "g", "c5", "b3", "c4", "e", "g", "c5", "e4", "g", "c5", "a3", "c4", "e", "g", "c5", "e4", "g", "c5", "a3", "c4", "e", "g", "c5", "e4", "g", "c5", "d3", "a", "d4", "f#", "c5", "d4", "f#", "c5", "d3", "a", "d4", "f#", "c5", "d4", "f#", "c5", "g3", "b", "d4", "g", "b", "d", "g", "b", "g3", "b3", "d4", "g", "b", "d", "g", "b"]
music.startMelody(notes, MelodyOptions.ForeverInBackground)
let x = 0
movement()
function movement() {
    
    if (x < -2) {
        x = -2
        level_one.showImage(x)
    } else if (x > 16) {
        x = 16
        level_one.showImage(x)
    } else {
        level_one.showImage(x)
    }
    
}

