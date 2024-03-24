kaboom();

loadSpriteAtlas("assets/Pet Cats Pack/Cat-3/Cat-3-Run.png", {
    cat: {
        x: 10,
        y: 7,
        width: 400,
        height: 50,
        sliceX: 8,
        sliceY: 1,
        anims: {
            walk: { from: 0, to: 7, loop: true},
        },
    },
});

loadSpriteAtlas("assets/Pet Cats Pack/Cat-5/Cat-5-Sitting.png", {
    'standing cat': {
        x: 20,
        y: -18,
        width: 50,
        height: 50,
    },
});

loadSpriteAtlas("assets/Pet Cats Pack/Cat-1/Cat-1-Sleeping1.png", {
    'sitting cat': {
        x: 20,
        y: -18,
        width: 50,
        height: 50,
    }
})

loadSprite("losing cat", "assets/Pet Cats Pack/Cat-3/Cat-3-Sitting.png");

loadSprite("background", "assets/kitchen-background.png");

loadSprite("paw 1", "assets/CatPawCursors-2.0/.CUR/White-Grey-Cat-Paw")

scene("start", () => {

    // load background
    add ([
        sprite("background", {width: width(), 
            height: height()})
    ]);

    const startMenu = add([
        rect(400, 100),
        area(),
        body(),
        pos(width() / 2 - 175, height() / 2 - 150),
        color(255, 255, 255),
        outline(4),
    ])

    add([
        text( "start", {
            size: 70,
            width: 400,
            align: 'center',
        }),
        pos(width() / 2 - 170, height() / 2 - 130),
        color(0, 0, 0),
    ])

    add([
        rect(400, 137),
        pos(width() / 2 - 175, height() / 2),
        color(255, 255, 255),
        outline(4),
    ])

    add([
        text( "controls: press space to jump, and use the A and D keys to move. Avoid the oncoming kitties!", {
            size: 25,
            width: 400,
            align: 'center',
        }),
        pos(width() / 2 - 175, height() / 2 +  20),
        color(0, 0, 0),
    ])

    startMenu.onClick(() => go("game"));

})

scene("game", () => {

        setGravity(1400);

        // load background
        add ([
            sprite("background", {width: width(), 
                height: height()})
        ]);

        // player cat
        const cat = add([
            sprite("cat"),
            pos(80, 40),
            scale(3.5),
            area({scale: 0.5}),
            body(),
        ])

        // spawn walking movement
        cat.play('walk');


        // floor
        add([
            rect(width(), 48),
            outline(4),
            pos(0, height() ),
            anchor("botleft"),
            area(),
            body({ isStatic: true }),
            color(190, 74, 47),
        ]);

        function spawnTree() {
            const object = choose(["sitting cat", "standing cat"])

                add([
                    sprite(object),
                    scale(4),
                    area({scale: 0.21}),
                    pos(width(), height() - 48),
                    anchor("botleft"),
                    move(LEFT, 250),
                    "tree",
            ]);

            wait(rand(0.75, 1.5), () => {
                spawnTree();
            })
        }
        
        spawnTree();
        
        cat.onCollide("tree", () => {
            go("lose", score);
            burp();
            addKaboom(cat.pos);
        });
        
        onKeyPress("space", () => {
            if (cat.isGrounded()){
                cat.jump();
            }
        });

        onKeyDown("d", () => {
            cat.move(250, 0)
        })

        onKeyDown("a", () => {
            cat.move(-250, 0)
        })

    let score = 0;
    const scoreLabel = add([
        text(score),
        pos(24,24)
    ])

    onUpdate(() => {
        score++;
        scoreLabel.text = score;
        })
    })

    scene("lose", (score) => {

        // load background
        add ([
            sprite("background", {width: width(), 
                height: height()})
        ]);

        add([
            sprite("losing cat"),
            pos(width() / 2 + 20, height() / 2 - 80),
            scale(10),
            anchor("center"),
        ]);
    
        // display score
        add([
            text(score),
            pos(width() / 2 + 20, height() / 2 + 80),
            scale(2),
            anchor("center"),
            color(0, 0, 0)
        ]);

        add([
            rect(400, 75),
            pos(width() / 2 - 175, height() / 2 + 120),
            color(255, 255, 255),
            outline(4),
        ])
    
        add([
            text("press space to play again!", {
                size: 25,
                width: 400,
                align: 'center',
            }),
            pos(width() / 2 - 175, height() / 2 + 140),
            color(0, 0, 0),
        ])
        // go back to game with space is pressed
        onKeyPress("space", () => go("game"));
        onClick(() => go("game"));
    
    });

go("start");