class Player {
    constructor(x = 50, y = 50, canvas, ctx) {
        this.x = x;
        this.y = y;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.degree = 0;
        this.punch = {
            punching: false,
            current: null,
            maxRange: 15,
            speed: 2
        }
        this.fists = {
            left: 0,
            right: 0,
        }
        this.velocity = {
            x: 0,
            y: 0
        };
        this.radius = 25;
        this.controls = {
            up: false,
            down: false,
            right: false,
            left: false
        }
    }

    render(me, player) {
        const canvas = this.canvas;
        const context = this.ctx;
        const canvasX = canvas.width / 2 + player.x - me.x;
        const canvasY = canvas.height / 2 + player.y - me.y;

        context.save();
        context.translate(canvasX, canvasY);
        context.rotate(player.degree)

        context.fillStyle = "#F8C574"; // skin
        context.beginPath();
        context.arc(0, 0, player.radius, 0, Math.PI * 2);
        context.closePath();
        context.fill();
        this.renderHands();

        context.restore();
    }

    _punch() {
        if (this.fists.left == 0 && this.fists.right == 0 && !this.punch.punching) {
            this.punch.current = null;
            return;
        }
        if (this.fists.left >= this.punch.maxRange || this.fists.right >= this.punch.maxRange)
            this.punch.punching = false;

        if (this.punch.punching)
            this.fists[this.punch.current] += this.punch.speed;
        else 
            this.fists[this.punch.current] -= this.punch.speed;

    }

    renderHands(dy = 0) {
        this._punch();
        const ctx = this.ctx;
        const player = this;

        ctx.fillStyle = '#000000'
        ctx.beginPath();
        ctx.arc(0 + player.radius.percent(70), 0 - player.radius.percent(82) - this.fists.left, player.radius.percent(40), 0, Math.PI * 2);
        ctx.arc(0 - player.radius.percent(70), 0 - player.radius.percent(82) - this.fists.right, player.radius.percent(40), 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#F8C574'
        ctx.beginPath();
        ctx.arc(0 + player.radius.percent(70), 0 - player.radius.percent(82) - this.fists.left, player.radius.percent(33), 0, Math.PI * 2);
        ctx.arc(0 - player.radius.percent(70), 0 - player.radius.percent(82) - this.fists.right, player.radius.percent(33), 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

}

export default Player;