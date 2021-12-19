class Stone {
    constructor(x = 50, y = 100, ctx) {
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;
        this.ctx = ctx
        this.image = new Image();
        this.init()
    }

    init() {
        this.image.src = 'stone.svg';
    }

    render(x, y) {
        this.ctx.drawImage(this.image, x, y);
    }

    // checkCollision({ x, y }) {
    //     const cx = x + 
    // }
}

export default Stone;