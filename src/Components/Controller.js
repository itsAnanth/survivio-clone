class Controller {
    static handleKeys(e, player) {
        const controls = player.controls;
        let state = e.type == 'keydown' ? true : false;
        switch (e.key) {
            case 'ArrowUp': case 'w':
                controls.up = state;
                break; case 'a':
            case 'ArrowLeft':
                controls.left = state;
                break; case 'd':
            case 'ArrowRight':
                controls.right = state;
                break;
            case 'ArrowDown': case 's':
                controls.down = state;
                break;
        }
    }

    static handleMouse(e, player) {
        const radians = Math.atan2(e.clientX - window.innerWidth / 2, window.innerHeight / 2 - e.clientY);
        player.degree = radians;
    }

    static handleClick(e, player) {
        if (!player.punch.current) {
            player.punch.punching = true;
            player.punch.current = ['left', 'right'][Math.floor(Math.random() * 2)]
        }
    }
}

export default Controller;