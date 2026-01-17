const camera = {
    x: 0,
    y: 0,
    rotation: 20,
    zoom: 1,
    movement: {
        instant: instant_camera_movement,
        slow: slow_camera_movement,
        fixed: fixed_camera_movement
    }
}

function instant_camera_movement(tank, a = 0) {
    camera.x = tank.x
    camera.y = tank.y
    camera.rotation = -tank.rotation
}

function slow_camera_movement(tank, a = 50, b = 20) {
    camera.x += ((tank.x + tank.XSpeed * a) - camera.x) / b
    camera.y += ((tank.y - tank.YSpeed * a) - camera.y) / b
    camera.rotation += ((
        -tank.rotation
    ) - camera.rotation) / b
}

function fixed_camera_movement(tank, a = 0) {
    camera.x = 0
    camera.y = 0
}