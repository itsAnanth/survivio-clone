class Bush {
    constructor(x = 50, y = 50, ctx) {
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;
        this.ctx = ctx
        this.image = new Image();
        this.init()
    }

    init() {
        this.image.src = 'bush.svg';
    }

    render(x, y) {
        this.ctx.drawImage(this.image, x, y);
    }
}

export default Bush;