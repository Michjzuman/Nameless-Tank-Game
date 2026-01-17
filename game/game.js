const controlsOptions = {
    keyboard: (direction) => {
        if (direction == "Up" && (keys["KeyW"] || keys["ArrowUp"])) {
            return true
        }
        if (direction == "Down" && (keys["KeyS"] || keys["ArrowDown"])) {
            return true
        }
        if (direction == "Left" && (keys["KeyA"] || keys["ArrowLeft"])) {
            return true
        }
        if (direction == "Right" && (keys["KeyD"] || keys["ArrowRight"])) {
            return true
        }
        return false
    }
}

const settigs = {
    controls: controlsOptions.keyboard
}

const movementOptions = {
    normal: (tank) => {
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
    },
    drift: (tank) => {
        const rad = tank.rotation * Math.PI / 180
        if (settigs.controls("Up")) {
            tank.XSpeed += Math.sin(rad) * tank.stats.movementSpeed
            tank.YSpeed += Math.cos(rad) * tank.stats.movementSpeed
        }
        if (settigs.controls("Down")) {
            tank.XSpeed -= Math.sin(rad) * tank.stats.movementSpeed
            tank.YSpeed -= Math.cos(rad) * tank.stats.movementSpeed
        }
        if (settigs.controls("Left")) {
            tank.rotationSpeed -= tank.stats.rotationSpeed
        }
        if (settigs.controls("Right")) {
            tank.rotationSpeed += tank.stats.rotationSpeed
        }

        tank.XSpeed *= tank.drift.x
        tank.YSpeed *= tank.drift.y
        tank.rotationSpeed *= tank.drift.rotation

        tank.x += tank.XSpeed
        tank.y -= tank.YSpeed

        tank.rotation += tank.rotationSpeed
    }
}

function drift_movement(tank) {
    const rad = tank.rotation * Math.PI / 180
    if (settigs.controls("Up")) {
        tank.XSpeed += Math.sin(rad) * tank.stats.movementSpeed
        tank.YSpeed += Math.cos(rad) * tank.stats.movementSpeed
    }
    if (settigs.controls("Down")) {
        tank.XSpeed -= Math.sin(rad) * tank.stats.movementSpeed
        tank.YSpeed -= Math.cos(rad) * tank.stats.movementSpeed
    }
    if (settigs.controls("Left")) {
        tank.rotationSpeed -= tank.stats.rotationSpeed
    }
    if (settigs.controls("Right")) {
        tank.rotationSpeed += tank.stats.rotationSpeed
    }

    tank.XSpeed *= tank.drift.x
    tank.YSpeed *= tank.drift.y
    tank.rotationSpeed *= tank.drift.rotation

    tank.x += tank.XSpeed
    tank.y -= tank.YSpeed

    tank.rotation += tank.rotationSpeed
}

function mouse_lock_movement(tank) {
    function setup_mouse_lock() {
        if (mouseLockState.initialized) return

        const target = typeof canvas !== "undefined" ? canvas : document.body
        mouseLockState.target = target

        target.addEventListener("click", () => {
            if (document.pointerLockElement !== target) {
                target.requestPointerLock()
            }
        })

        document.addEventListener("pointerlockchange", () => {
            if (document.pointerLockElement !== target) {
                mouseLockState.rotationDelta = 0
            }
        })

        document.addEventListener("mousemove", (event) => {
            if (document.pointerLockElement === target) {
                mouseLockState.rotationDelta += event.movementX
            }
        })

        mouseLockState.initialized = true
    }
    setup_mouse_lock()

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

    tank.rotationSpeed = mouseLockState.rotationDelta * mouseLockState.sensitivity * tank.stats.rotationSpeed
    mouseLockState.rotationDelta = 0

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

const tankTypes = {
    normal: {
        x: 0,
        y: 0,
        rotation: 0,
        XSpeed: 0,
        YSpeed: 0,
        rotationSpeed: 0,
        size: 1,
        strokeColor: "rgb(139, 214, 154)",
        fillColor: "rgb(84, 134, 110)",
        skin: normal_tank,
        movement: movementOptions.normal,
        stats: {
            rotationSpeed: 1,
            movementSpeed: 3
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
        movement: movementOptions.drift,
        stats: {
            rotationSpeed: 0.5,
            movementSpeed: 0.5
        }
    }
}