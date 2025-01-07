const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function randomColor() {
    return `hsl(${Math.random() * 360}, 100%, 50%)`;
}

function Firework(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 10 + 5;
    this.speed = Math.random() * 3 + 1;
    this.color = randomColor();
    this.angle = Math.random() * Math.PI * 2;
}

Firework.prototype.update = function() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.size *= 0.98; // Gradually shrink the firework
};

Firework.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
};

let fireworks = [];

function createFirework(event) {
    for (let i = 0; i < 100; i++) {
        fireworks.push(new Firework(event.clientX, event.clientY));
    }
}

window.addEventListener('click', createFirework);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireworks.forEach((firework, index) => {
        firework.update();
        firework.draw();
        if (firework.size <= 0.1) {
            fireworks.splice(index, 1);
        }
    });
    requestAnimationFrame(animate);
}

animate();
