const MPS_TO_MPH = 2.236936;

// Inisialisasi DOM Elements
const elSpeed = document.getElementById('speed-display');
const elGear = document.getElementById('gear');
const elOdo = document.getElementById('odometer');
const hSegs = document.querySelectorAll('.h-seg');
const fSegs = document.querySelectorAll('.f-seg');
const rpmSegs = document.querySelectorAll('.rpm-segment');

// 1. Kecepatan (3 Digit)
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

// 2. RPM Bar
window.setRPM = function(rpm) {
    const totalSegs = rpmSegs.length;
    const activeSegs = Math.round(rpm * totalSegs);
    rpmSegs.forEach((seg, i) => {
        if (i < activeSegs) seg.classList.add('active');
        else seg.classList.remove('active');
    });
};

// 3. Fuel Segmen (Putih)
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
    const engineIcon = document.getElementById('engine-icon');
    
    hSegs.forEach((seg, i) => {
        if (i < activeSegs) seg.classList.add('active');
        else seg.classList.remove('active');
    });

    if (engineIcon) {
        engineIcon.className = 'stat-icon';
        if (percent <= 0.25) {
            engineIcon.classList.add('active-danger');
        } else if (percent <= 0.50) {
            engineIcon.classList.add('active-warn');
        }
    }
};

// 5. Gear
window.setGear = function(gear) {
    if (!elGear) return;
    elGear.innerText = (gear === 0) ? 'R' : String(gear);
};

// 6. Engine
window.setEngine = function(state) {};

// 7. Headlights
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

// 11. Door Lock / Vehicle Lock (Ditambah Alias Kompatibilitas)
window.setDoors = function(state) {
    const el = document.getElementById('door-lock');
    if (el) el.className = (state == 1 || state === true) ? 'icon-item locked' : 'icon-item';
};

// Alias pendukung jika mod panggilan gamenya menggunakan nama fungsi berbeda
window.setVehicleLocked = window.setDoors;
window.setLocked = window.setDoors;
window.setLock = window.setDoors;

// 12. Odometer
window.setOdometer = function(distance) {
    if (elOdo) elOdo.innerText = `${distance.toFixed(1)} mi`;
};

window.setSpeedMode = function(mode) {};
