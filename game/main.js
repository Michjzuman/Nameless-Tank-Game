function main() {
    const board = generate_board()
    const tank = tank_types.master_of_time

    function update() {
        resizeCanvas()

        // Movement -----
            move(tank)
        // Camera -------
            camera.movement.slow(tank, 30, 30)
        // Drawing ------
            draw_board(board)
            draw_tank(tank)
        // --------------

        requestAnimationFrame(update)
    }

    update()
}

main()