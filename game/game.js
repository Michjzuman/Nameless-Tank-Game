const tank_types = {
    normal: {
        x: 0,
        y: 0,
        rotation: 0,
        XSpeed: 0,
        YSpeed: 0,
        rotationSpeed: 0,
        size: 1,
        strokeColor: "rgb(164, 255, 180)",
        fillColor: "rgb(82, 128, 91)",
        skin: normal_tank,
        movement: normal_movement,
        stats: {
            rotationSpeed: 1,
            movementSpeed: 1
        }
    },
    master_of_time: {
        x: 0,
        y: 0,
        rotation: 0,
        XSpeed: 0,
        YSpeed: 0,
        drift: {
            x: 0.95,
            y: 0.95,
            rotation: 0.9
        },
        rotationSpeed: 0,
        size: 1,
        strokeColor: "rgb(164, 255, 180)",
        fillColor: "rgb(82, 128, 91)",
        skin: normal_tank,
        movement: drift_movement,
        stats: {
            rotationSpeed: 0.5,
            movementSpeed: 0.5
        }
    }
}

function drift_movement(tank) {
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

    tank.XSpeed *= tank.drift.x
    tank.YSpeed *= tank.drift.y
    tank.rotationSpeed *= tank.drift.rotation

    tank.x += tank.XSpeed
    tank.y -= tank.YSpeed

    tank.rotation += tank.rotationSpeed
}

function normal_movement(tank) {
    const x = 5
    const rad = tank.rotation * Math.PI / 180

    tank.XSpeed = 0
    tank.YSpeed = 0
    tank.rotationSpeed = 0

    if (keys["KeyW"] || keys["ArrowUp"]) {
        tank.XSpeed = Math.sin(rad) * tank.stats.movementSpeed * x
        tank.YSpeed = Math.cos(rad) * tank.stats.movementSpeed * x
    }
    if (keys["KeyS"] || keys["ArrowDown"]) {
        tank.XSpeed = 0 - Math.sin(rad) * tank.stats.movementSpeed * x
        tank.YSpeed = 0 - Math.cos(rad) * tank.stats.movementSpeed * x
    }
    if (keys["KeyA"] || keys["ArrowLeft"]) {
        tank.rotationSpeed = 0 - tank.stats.rotationSpeed * x
    }
    if (keys["KeyD"] || keys["ArrowRight"]) {
        tank.rotationSpeed = tank.stats.rotationSpeed * x
    }

    tank.x += tank.XSpeed
    tank.y -= tank.YSpeed

    tank.rotation += tank.rotationSpeed
}
