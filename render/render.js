const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

function realX(x) {
    return window.innerWidth / 2 + (
        x
    ) * camera.zoom - ( 
        camera.x
    ) * camera.zoom
}

function realY(y) {
    return window.innerHeight / 2 + (
        y
    ) * camera.zoom - ( 
        camera.y
    ) * camera.zoom
}

function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);

    context.setTransform(1, 0, 0, 1, 0, 0);
    context.scale(dpr, dpr);
    context.clearRect(0, 0, width, height);
}

function rotate(x, y, r) {
    const rx = window.innerWidth / 2
    const ry = window.innerHeight / 2
    context.translate(rx, ry)
    context.rotate(camera.rotation * Math.PI / 180)
    context.translate(-rx, -ry)

    const cx = realX(x)
    const cy = realY(y)
    context.translate(cx, cy)
    context.rotate(r * Math.PI / 180)
    context.translate(-cx, -cy)
}

function shape(points, position, closed = true) {
    context.beginPath();

    points.forEach((point, i) => {
        const x = realX(
            position.x + point[0] * position.size
        )
        const y = realY(
            position.y + point[1] * position.size
        )

        if (i == 0) {
            context.moveTo(x, y)
        } else {
            context.lineTo(x, y)
        }
    });

    if (closed) context.closePath()
}

function normal_tank(tank) {
    context.save();

    rotate(tank.x, tank.y, tank.rotation)

    context.fillStyle = tank.fillColor;
    context.strokeStyle = tank.strokeColor;
    context.lineWidth = 4 * camera.zoom;

    const w = 30
    const h = 45
    const d = 7
    const l = 60
    const r = 20

    shape([
        [-w, -h],
        [-w, h],
        [w, h],
        [w, -h]
    ], tank, true)

    context.fill();
    context.stroke();

    shape([
        [-d, 0],
        [-d, -l],
        [d, -l],
        [d, 0]
    ], tank, true)

    context.fill();
    context.stroke();

    context.beginPath();

    context.arc(
        realX(tank.x),
        realY(tank.y),
        r * tank.size * camera.zoom,
        0, Math.PI * 2
    )

    context.fill();
    context.stroke();

    context.restore();
}

function generate_board(w = 5, h = 5) {
    return Array.from({ length: 2 }, () =>
        Array.from({ length: h - 1 }, () =>
            Array.from({ length: w - 1 }, () =>
                Math.round(Math.random())
            )
        )
    )
}

function draw_board(board) {
    context.save();

    rotate(realX(0), realY(0), 0)

    context.fillStyle = "rgb(121, 111, 93)"
    context.strokeStyle = "rgb(233, 246, 240)"
    context.lineWidth = 4 * camera.zoom

    const l = 150

    for (let y = 0; y <= board[0].length; y++) {
        for (let x = 0; x <= board[0][0].length; x++) {
            context.fillRect(
                realX(0) + x * l * camera.zoom,
                realY(0) + y * l * camera.zoom,
                l * camera.zoom - 1,
                l * camera.zoom - 1
            )
        }
    }

    context.restore();
}
