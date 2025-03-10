'use strict';

/*
    Project: Random Ball Movement
    Developed by: Udida Godswill, Alaska Blessing
    Date: 10-03-2025
    Description: This project animates a ball moving randomly within a canvas,
                 bouncing off the edges of the screen.
*/

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
document.body.style.overflow = "hidden";
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function changeBackgroundColor() {
    document.body.style.backgroundColor = `hsl(${Math.random() * 360}, 50%, 15%)`;
}

function displayNames() {
    const fontSize = Math.max(16, canvas.width * 0.018);
    const lineHeight = fontSize * 1.5;
    ctx.font = `bold ${fontSize}px Arial`;
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    ctx.textAlign = "center";
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowBlur = 4;
    
    const lines = [
        "Team Members: Udida Godswill, Alaska Blessing",
        "Course Lecturer: Mr Hopewell",
        "Oak Business School",
        "COM 113 Project Defense"
    ];
    
    const startY = canvas.height * 0.15;
    
    lines.forEach((text, index) => {
        ctx.fillText(text, canvas.width / 2, startY + index * lineHeight);
    });
}

class Ball {
    constructor() {
        this.radius = Math.max(15, canvas.width * 0.015);
        this.resetPosition();
    }

    resetPosition() {
        this.x = Math.random() * (canvas.width - this.radius * 2) + this.radius;
        this.y = Math.random() * (canvas.height - this.radius * 2) + this.radius;
        this.dx = (Math.random() - 0.5) * 8;
        this.dy = (Math.random() - 0.5) * 8;
        this.changeColor();
    }

    changeColor() {
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
            this.dx *= -1;
            this.changeColor();
            changeBackgroundColor();
            displayNames();
        }
        if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) {
            this.dy *= -1;
            this.changeColor();
            changeBackgroundColor();
            displayNames();
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

const ball = new Ball();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    displayNames(); 
    ball.update();
    ball.draw();
    requestAnimationFrame(animate);
}

animate();
