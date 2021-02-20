const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const { log } = console;
let theta = 0;
let speed = 0.05;
const inputs = document.querySelectorAll(".inputs input");
inputs[0].setAttribute('max', canvas.width);
inputs[1].setAttribute('max', canvas.height*1.5);

let amplitude = 100;
let waveLength = 100;

inputs[0].addEventListener("input", e => waveLength = e.target.value);
inputs[1].addEventListener("input", e => amplitude = e.target.value);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.style.margin = 0;

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.lineWidth = 3;
    for (let i = 0; i < canvas.width; i += 1) {
        ctx.lineTo(i, canvas.height/2+amplitude*Math.sin(theta+i/(waveLength/2)));
    }
    ctx.stroke();
    ctx.closePath();

    if (inputs[2].checked) {
        const point = document.querySelector(".oscillatorPoint");

        point.style.top = canvas.height/2+amplitude*Math.sin(theta+(waveLength/2)) + 'px';
        point.style.left = 'calc(50% - 40px)';

        inputs[3].style.display = "block";
        document.querySelector(".inputs").style.height = "220px";
        document.querySelector(".speeddd").style.display = "block";

        inputs[3].addEventListener("input", e => speed = (e.target.value/100));

        theta += speed;
    } else {
        inputs[3].style.display = "none";
        document.querySelector(".inputs").style.height = "180px";
        document.querySelector(".speeddd").style.display = "none";
    }

    requestAnimationFrame(loop);

}

loop();
