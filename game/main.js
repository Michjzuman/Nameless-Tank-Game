function main() {
    const board = generate_board()
    const tanks = [
        tankTypes.master_of_time
    ]

    function update() {
        resizeCanvas()

        // Movement -----
            move(tanks[0])
        // Camera -------
            camera.movement.centered(tanks[0], 50, 30)
        // Drawing ------
            draw_board(board)
            tanks.forEach(t => {
                draw_tank(t)
            })
        // --------------

        requestAnimationFrame(update)
    }

    update()
}

main()
