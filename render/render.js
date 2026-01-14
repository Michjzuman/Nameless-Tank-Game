const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const camera = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    zoom: 1
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

function rotation(x, y, r) {
    const offsetX = (camera.x + x) * camera.zoom
    const offsetY = (camera.y + y) * camera.zoom

    context.translate(
        offsetX - (offsetX / Math.cos(r)),
        offsetY - (offsetY / Math.sin(r))
    );

    context.rotate(r * Math.PI / 180);
}

function shape(points, position, closed = true) {
    context.beginPath();

    points.forEach((point, i) => {
        const x = camera.x + (
            position.x + point[0] * position.size
        ) * camera.zoom
        const y = camera.y + (
            position.y + point[1] * position.size
        ) * camera.zoom

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

    rotation(tank.x, tank.y, tank.rotation)

    // ----------- ----------- -----------
        context.fillStyle = "rgb(63, 66, 63)";
        context.fillRect(0, 0, window.innerWidth, window.innerHeight)
    // ----------- ----------- -----------

    context.fillStyle = "rgb(82, 128, 91)";
    context.strokeStyle = "rgb(164, 255, 180)";
    context.lineWidth = 4;

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
        tank.x + camera.x,
        tank.y + camera.y,
        r * tank.size * camera.zoom,
        0, Math.PI * 2
    )

    context.fill();
    context.stroke();

    context.restore();
}

function draw(tank) {
    tank.skin(tank)
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();