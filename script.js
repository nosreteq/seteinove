document.getElementById('current-year').textContent = new Date().getFullYear();

function slotMachine(elementId, target, delay) {
    const el = document.getElementById(elementId);
    if (!el) return;

    const digits  = '0123456789';
    const palette = ['#00E5E5', '#FFFFFF', '#00E5E5', '#aaf5f5'];
    const total   = 20;
    let frame = 0;

    setTimeout(function tick() {
        if (frame < total) {
            let d;
            // Keep target away until the last 2 frames for dramatic landing
            if (frame < total - 2) {
                do { d = digits[Math.floor(Math.random() * 10)]; }
                while (d === target);
            } else {
                d = digits[Math.floor(Math.random() * 10)];
            }
            el.textContent = d;
            el.setAttribute('fill', palette[frame % palette.length]);
            frame++;

            // Quadratic ease-out: 50ms → ~280ms
            const t = frame / total;
            setTimeout(tick, 50 + t * t * 230);
        } else {
            el.textContent = target;
            el.setAttribute('fill', '#00E5E5');
        }
    }, delay);
}

slotMachine('slot-7', '7', 0);
slotMachine('slot-9', '9', 350);
