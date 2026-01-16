function normal_movement(tank) {
    const rad = tank.rotation * Math.PI / 180
    if (keys["KeyW"] || keys["ArrowUp"]) {
        tank.XSpeed += Math.sin(rad) * tank.stats.movementSpeed
        tank.YSpeed += Math.cos(rad) * tank.stats.movementSpeed
    }
    if (keys["KeyS"] || keys["ArrowDown"]) {
        tank.XSpeed -= Math.sin(rad) * tank.stats.movementSpeed
        tank.YSpeed -= Math.cos(rad) * tank.stats.movementSpeed
    }
    if (keys["KeyA"] || keys["ArrowLeft"]) {
        tank.rotationSpeed -= tank.stats.rotationSpeed
    }
    if (keys["KeyD"] || keys["ArrowRight"]) {
        tank.rotationSpeed += tank.stats.rotationSpeed
    }

    tank.XSpeed *= tank.XDrift
    tank.YSpeed *= tank.YDrift
    tank.rotationSpeed *= tank.rotationDrift

    tank.x += tank.XSpeed
    tank.y -= tank.YSpeed

    tank.rotation += tank.rotationSpeed
}

function move(tank) {
    tank.movement(tank)
}

function main() {
    const board = generate_board()
    const tank = {
        x: 0,
        y: 0,
        rotation: 0,
        XSpeed: 0,
        YSpeed: 0,
        XDrift: 0.9,
        YDrift: 0.9,
        rotationDrift: 0.9,
        rotationSpeed: 0,
        size: 1,
        strokeColor: "rgb(164, 255, 180)",
        fillColor: "rgb(82, 128, 91)",
        skin: normal_tank,
        movement: normal_movement,
        stats: {
            rotationSpeed: 1,
            movementSpeed: 2
        }
    }

    function update() {
        resizeCanvas()

        // Movement -----
            move(tank)
        // Camera -------
            instant_camera_movement(tank)
        // Drawing ------
            draw_board(board)
            draw_tank(tank)
        // --------------

        requestAnimationFrame(update)
    }

    update()
}

main()
