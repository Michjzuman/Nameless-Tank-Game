const camera = {
    x: 0,
    y: 0,
    rotation: 20,
    zoom: 1,
    movement: {
        instant: (tank, a = 0, b = 0) => {
            camera.x = tank.x
            camera.y = tank.y
            camera.rotation = -tank.rotation
        },
        centered: (tank, a = 0, b = 0) => {
            camera.x = tank.x
            camera.y = tank.y
            camera.rotation = 0
        },
        slow: (tank, a = 50, b = 20) => {
            camera.x += (
                (tank.x + tank.XSpeed * a) - camera.x
            ) / b
            camera.y += (
                (tank.y - tank.YSpeed * a) - camera.y
            ) / b
            camera.rotation += (
                (-tank.rotation - tank.rotationSpeed * a) - camera.rotation
            ) / b
        },
        fixed: (tank, a = 0, b = 0) => {
            camera.x = 0
            camera.y = 0
        }
    }
}