#This is a mario type game clone made because I was bored and I just thought of somthing challanging to make
#The author of this game is Phea Viphou

#Maps
level_one = images.create_big_image("""
    . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . # # # # . . . #
    . . . . . . # # . . . . . . . . . . . #
    . . # # # # . . # . . . # # # # . . # #
    # # . . . . . . . # # # . . . . . . . .
""")

#Music array
notes = [
    'c4:1', 'e', 'g', 'c5', 'e5', 'g4', 'c5', 'e5', 'c4', 'e', 'g', 'c5', 'e5', 'g4', 'c5', 'e5',
    'c4', 'd', 'a', 'd5', 'f5', 'a4', 'd5', 'f5', 'c4', 'd', 'a', 'd5', 'f5', 'a4', 'd5', 'f5',
    'b3', 'd4', 'g', 'd5', 'f5', 'g4', 'd5', 'f5', 'b3', 'd4', 'g', 'd5', 'f5', 'g4', 'd5', 'f5',
    'c4', 'e', 'g', 'c5', 'e5', 'g4', 'c5', 'e5', 'c4', 'e', 'g', 'c5', 'e5', 'g4', 'c5', 'e5',
    'c4', 'e', 'a', 'e5', 'a5', 'a4', 'e5', 'a5', 'c4', 'e', 'a', 'e5', 'a5', 'a4', 'e5', 'a5',
    'c4', 'd', 'f#', 'a', 'd5', 'f#4', 'a', 'd5', 'c4', 'd', 'f#', 'a', 'd5', 'f#4', 'a', 'd5',
    'b3', 'd4', 'g', 'd5', 'g5', 'g4', 'd5', 'g5', 'b3', 'd4', 'g', 'd5', 'g5', 'g4', 'd5', 'g5',
    'b3', 'c4', 'e', 'g', 'c5', 'e4', 'g', 'c5', 'b3', 'c4', 'e', 'g', 'c5', 'e4', 'g', 'c5',
    'a3', 'c4', 'e', 'g', 'c5', 'e4', 'g', 'c5', 'a3', 'c4', 'e', 'g', 'c5', 'e4', 'g', 'c5',
    'd3', 'a', 'd4', 'f#', 'c5', 'd4', 'f#', 'c5', 'd3', 'a', 'd4', 'f#', 'c5', 'd4', 'f#', 'c5',
    'g3', 'b', 'd4', 'g', 'b', 'd', 'g', 'b', 'g3', 'b3', 'd4', 'g', 'b', 'd', 'g', 'b'
]

#Veriables
xOffset = 0
onGround = False
player_yOffset = 2
player_Speed = 250 #player speed is messured in ms


#Start of code
music.start_melody(notes, MelodyOptions.FOREVER_IN_BACKGROUND)

while True:
    if(input.button_is_pressed(Button.A)):
        player_movementVerification("a")
    if (input.button_is_pressed(Button.B)):
        player_movementVerification("b")
    

def player_movementVerification(button):
    
    #giving permission
    global xOffset

    #resposible for changing the xOffset, this is important because it makes the
    #rendering function able to move the map according to the xOffset
    if (button == "a"):
        xOffset -= 1
    elif(button == "b"):
        xOffset += 1
    
    #limit where the player could move, so the player wont move off the map
    if (xOffset < -2):
        xOffset = -2
    elif (xOffset > 16):
        xOffset = 16

def playerInfo():
    
    #giving permission
    global player_yOffset

    #this is the 
    player_LED_one = (2, player_yOffset)
    player_LED_two = (2, player_yOffset + 1)

def playerGravity_yOffset():
    
    #giving permission
    global player_yOffset
    if (onGround == False):
        player_yOffset -= 1
    
def playerCollision():
    
    #giving permission
    global onGround

    #player collision check forward
    player_forwards_partone = led.point_brightness(3, player_yOffset)
    player_forwards_parttwo = led.point_brightness(3, player_yOffset + 1)

    #player collision check backwards
    player_backwards_partone = led.point_brightness(1, player_yOffset)
    player_backwards_parttwo = led.point_brightness(1, player_yOffset + 1)




        