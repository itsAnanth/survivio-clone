class Tree {
    constructor(x = 50, y = 100, ctx) {
        this.x = x;
        this.y = y;
        this.width = 256;
        this.height = 256;
        this.ctx = ctx
        this.image = new Image();
        this.init()
    }

    init() {
        this.image.src = 'tree.svg';
    }

    render(x, y) {
        this.ctx.drawImage(this.image, x, y);
    }
}

export default Tree;