document.getElementById('current-year').textContent = new Date().getFullYear();

(function () {
    const DURATION = 1800; // ms — mesmo tempo dos rects
    const CHARS    = '0123456789';
    const Y_MIN    = 15;
    const Y_MAX    = 46;
    const SPEED    = 38; // px/s por coluna

    const svgEl  = document.querySelector('.logo-large');
    const digit7 = document.getElementById('slot-7');
    const digit9 = document.getElementById('slot-9');
    if (!svgEl || !digit7 || !digit9) return;

    function makeColumn(x, colDelay) {
        const el = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        el.setAttribute('x', x);
        el.setAttribute('font-size', '7.5');
        el.setAttribute('font-family', 'monospace');
        el.setAttribute('text-anchor', 'middle');
        el.setAttribute('fill', '#00E5E5');
        el.setAttribute('opacity', '0');
        el.textContent = CHARS[Math.floor(Math.random() * CHARS.length)];
        svgEl.appendChild(el);

        let y         = Y_MIN - Math.random() * 20;
        let charTimer = 0;
        let running   = true;
        let prev      = null;

        function step(ts) {
            if (!running) return;
            if (prev === null) prev = ts;
            const dt = Math.min(ts - prev, 50) / 1000;
            prev = ts;

            y += SPEED * dt;
            if (y > Y_MAX + 8) y = Y_MIN - 8;

            charTimer += dt * 1000;
            if (charTimer > 75) {
                el.textContent = CHARS[Math.floor(Math.random() * CHARS.length)];
                charTimer = 0;
            }

            const inBounds = y > Y_MIN && y < Y_MAX;
            const alpha    = inBounds
                ? Math.min(1, (y - Y_MIN) / 5) * Math.min(1, (Y_MAX - y) / 5)
                : 0;
            el.setAttribute('y', y.toFixed(1));
            el.setAttribute('opacity', (alpha * 0.9).toFixed(2));

            requestAnimationFrame(step);
        }

        setTimeout(() => {
            requestAnimationFrame(step);
            setTimeout(() => { running = false; el.remove(); }, DURATION);
        }, colDelay);
    }

    function rain(digitEl, xStart, xEnd, numCols) {
        digitEl.setAttribute('opacity', '0');
        const colW = (xEnd - xStart) / numCols;
        for (let i = 0; i < numCols; i++) {
            makeColumn(xStart + colW * i + colW / 2, i * 55);
        }
        setTimeout(() => digitEl.setAttribute('opacity', '1'), DURATION + 60);
    }

    rain(digit7, 26, 68, 4);
    rain(digit9, 93, 135, 4);
})();
