export default () => {
    HTMLCanvasElement.prototype.fitCanvas = function() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }

    HTMLCanvasElement.prototype.clear = function() {
        this.getContext('2d').clearRect(0, 0, this.width, this.height)
    }

    Number.prototype.percent = function(percent) {
        return (this * percent) / 100;
    }
}