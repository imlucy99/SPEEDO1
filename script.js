const MPS_TO_MPH = 2.236936;

// Inisialisasi DOM Elements
const elSpeed = document.getElementById('speed-display');
const elGear = document.getElementById('gear');
const elOdo = document.getElementById('odometer');
const hSegs = document.querySelectorAll('.h-seg');
const fSegs = document.querySelectorAll('.f-seg');
const rpmSegs = document.querySelectorAll('.rpm-segment');

// 1. Kecepatan (3 Digit dengan Angka Redup di Depan)
window.setSpeed = function(speed) {
    if (!elSpeed) return;
    const mph = Math.round(speed * MPS_TO_MPH);
    const padded = String(mph).padStart(3, '0');
    
    if (mph < 10) {
        elSpeed.innerHTML = `<span class="dim">${padded.slice(0, 2)}</span><span class="bright">${padded.slice(2)}</span>`;
    } else if (mph < 100) {
        elSpeed.innerHTML = `<span class="dim">${padded.slice(0, 1)}</span><span class="bright">${padded.slice(1)}</span>`;
    } else {
        elSpeed.innerHTML = `<span class="bright">${padded}</span>`;
    }
};

// 2. RPM Bar Segmen
window.setRPM = function(rpm) {
    const totalSegs = rpmSegs.length;
    const activeSegs = Math.round(rpm * totalSegs);
    rpmSegs.forEach((seg, i) => {
        if (i < activeSegs) seg.classList.add('active');
        else seg.classList.remove('active');
    });
};

// 3. Fuel Segmen
window.setFuel = function(fuel) {
    const totalSegs = fSegs.length;
    const activeSegs = Math.round(fuel * totalSegs);
    fSegs.forEach((seg, i) => {
        if (i < activeSegs) seg.classList.add('active');
        else seg.classList.remove('active');
    });
};

// 4. Health Segmen
window.setHealth = function(health) {
    let percent = (health > 1) ? (health / 1000) : health;
    percent = Math.max(0, Math.min(1, percent));
    const totalSegs = hSegs.length;
    const activeSegs = Math.round(percent * totalSegs);
    
    hSegs.forEach((seg, i) => {
        seg.className = 'h-seg';
        if (i < activeSegs) {
            if (percent <= 0.25) seg.classList.add('danger');
            else if (percent <= 0.5) seg.classList.add('warn');
            else seg.classList.add('active');
        }
    });
};

// 5. Gear
window.setGear = function(gear) {
    if (!elGear) return;
    elGear.innerText = (gear === 0) ? 'R' : String(gear);
};

// 6. Engine
window.setEngine = function(state) {};

// 7. Headlights (0: Off, 1: Low, 2: High)
window.setHeadlights = function(state) {
    const low = document.getElementById('headlight-low');
    const high = document.getElementById('headlight-high');
    if (low) low.className = (state === 1) ? 'icon-item active' : 'icon-item';
    if (high) high.className = (state === 2) ? 'icon-item high-beam' : 'icon-item';
};

// 8 & 9. Lampu Sein
window.setLeftIndicator = function(state) {
    const el = document.getElementById('indicator-left');
    if (el) el.className = state ? 'icon-item active' : 'icon-item';
};

window.setRightIndicator = function(state) {
    const el = document.getElementById('indicator-right');
    if (el) el.className = state ? 'icon-item active' : 'icon-item';
};

// 10. Seatbelt
window.setSeatbelts = function(state) {
    const el = document.getElementById('seatbelts');
    if (el) el.className = state ? 'icon-item active' : 'icon-item warn';
};

// 11. Odometer
window.setOdometer = function(distance) {
    if (elOdo) elOdo.innerText = `${distance.toFixed(1)} mi`;
};

window.setSpeedMode = function(mode) {};
