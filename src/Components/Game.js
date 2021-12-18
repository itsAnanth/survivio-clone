import { Bush, Tree, Stone, Crate } from "./Particles/index.js";

const MAP_SIZE = 4000;

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.unit = 200;
        this.unitVelocity = 1;
        this.particles = [new Crate(50, 50, this.ctx)]
        this.river = {
            x_pos: canvas.width / 2,
            y_pos: MAP_SIZE,
            width: 600,
            height: MAP_SIZE
        }
        this.initParticles();
    }

    initParticles() {
        const Meta = [Bush, Tree, Stone];
        for (let i = 0; i < 20; i++) {
            const index = Math.floor(Math.random() * Meta.length);
            const particle = Meta[index];
            this.particles.push(
                new particle(this.getRandomPos(MAP_SIZE - MAP_SIZE.percent(10)), this.getRandomPos(MAP_SIZE - MAP_SIZE.percent(10)), this.ctx)
            );
        }
    }

    gameLoop(player, others = []) {
        this.render(player, others);
        requestAnimationFrame(this.gameLoop.bind(this, player, others))
    }


    render(player, others = []) {
        const context = this.ctx;
        const canvas = this.canvas;
        if (player.controls.up)
            player.velocity.y -= this.unitVelocity;
        if (player.controls.down)
            player.velocity.y += this.unitVelocity;
        if (player.controls.left)
            player.velocity.x -= this.unitVelocity;
        if (player.controls.right)
            player.velocity.x += this.unitVelocity;


        player.x += player.velocity.x;
        player.y += player.velocity.y;
        player.velocity.x *= 0.85;// friction
        player.velocity.y *= 0.85;// friction


        // boundary check
        this.checkCollision(player)

        canvas.clear();
        this.drawBoard(player, MAP_SIZE, MAP_SIZE)
        this.drawBoundary(player);
        this.drawRiver(player);
        player.render(player, player)
        this.renderParticles(player);
        // others.forEach(this.renderPlayer.bind(null, player));

    }

    isBound(player, particle, dir, _dir) {
        const dx = player[dir] + (['top', 'left'].includes(_dir) ? player.radius : -player.radius);
        return dx >= particle[dir] && dx <= particle[dir] + (dir == 'x' ? particle.width : particle.height);
    }

    isPhasing(player, particle) {
        if (
            player.x + player.radius >= particle.x &&
            player.x - player.radius <= particle.x + particle.width &&
            player.y + player.radius >= particle.y &&
            player.y - player.radius <= particle.y + particle.height
        ) return true
        else return false;
    }
    checkCollision(player) {
        if (player.x - player.radius <= 0) player.x = player.radius;
        if (player.y - player.radius <= 0) player.y = player.radius;
        if (player.y + player.radius >= MAP_SIZE) player.y = MAP_SIZE - player.radius;
        if (player.x + player.radius >= MAP_SIZE) player.x = MAP_SIZE - player.radius;
        this.unitVelocity = (player.x >= this.river.x_pos) && (player.x <= this.river.x_pos + this.river.width) ? 0.5 : 1;
        // this.particles.forEach(particle => {
        //     // console.log(player, particle);
        //     if (this.isPhasing(player, particle)) {
        //         // console.log(player.x - player.radius, particle.x + particle.width);
        //         if (this.isBound(player, particle, 'y', 'top') && player.velocity.y > 0) 
        //             console.log(1)//player.y = particle.y - player.radius
        //         else if (this.isBound(player, particle, 'y', 'down') && player.velocity.y < 0) 
        //             console.log(player.velocity.y)//player.y = particle.y + particle.height + player.radius;
        //         else if (this.isBound(player, particle, 'x', 'left') && player.velocity.x > 0) 
        //             console.log(3)//player.x = particle.x - player.radius;
        //         else if (this.isBound(player, particle, 'x', 'right') && player.velocity.x < 0) 
        //             console.log(4)//player.x = particle.x + particle.width + player.radius;
                
                
        //     }
        // })
    }

    drawBoundary(player) {
        const canvas = this.canvas;
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(canvas.width / 2 - player.x, canvas.height / 2 - player.y, MAP_SIZE, MAP_SIZE);
    }

    drawHands(player) {
        

        this.ctx.fillStyle = "#F8C574";
        this.ctx.beginPath();
        this.ctx.arc(0, 0 + player.radius - 5, player.radius.percent(50), 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.fill()
    }


    drawRiver({ x, y }) {
        this.ctx.fillStyle = '#ADD8E6'
        this.ctx.fillRect(this.canvas.width / 2 - x + this.river.x_pos, this.canvas.height / 2 - y, this.river.width, this.river.height);
    }

    drawBoard(p, bw, bh, color = '#80af49') {
        const [dx, dy] = [p.x, p.y]
        const canvas = this.canvas;
        const context = this.ctx;
        context.lineWidth = 2;
        context.fillStyle = color;
        context.strokeStyle = "#808080";
        for (let x = 0; x < bw; x += this.unit) {
            for (let y = 0; y < bh; y += this.unit) {
                context.strokeRect(canvas.width / 2 - dx + x, canvas.height / 2 - dy + y, this.unit, this.unit);
                context.fillRect(canvas.width / 2 - dx + x, canvas.height / 2 - dy + y, this.unit, this.unit);
            }
        }
    }

    renderParticles({ x, y }) {
        this.particles.forEach(_x => {
            _x.render(this.canvas.width / 2 - x + _x.x, this.canvas.height / 2 - y + _x.y);
        })
    }

    getRandomPos(max) {
        return Math.floor(Math.random() * max);
    }
}

export default Game;