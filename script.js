const MPS_TO_MPH = 2.236936;

// Inisialisasi Element DOM
const elSpeed = document.getElementById('speed-display');
const elGear = document.getElementById('gear');
const elOdo = document.getElementById('odometer');
const hSegs = document.querySelectorAll('.h-seg');
const fSegs = document.querySelectorAll('.f-seg');
const rpmSegs = document.querySelectorAll('.rpm-segment');

// Helper Parser: Mendeteksi nilai TRUE/LOCKED dari JGRP (menerima 1, "1", true, "true", atau 2)
function isLockedState(val) {
    return val === true || val === 1 || val === "1" || val === "true" || val === 2 || val === "2";
}

function isTrueValue(val) {
    return val === true || val === 1 || val === "1" || val === "true";
}

// 1. Kecepatan (3 Digit)
window.setSpeed = function(speed) {
    if (!elSpeed) return;
    const mph = Math.round(Number(speed || 0) * MPS_TO_MPH);
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
    const val = Number(rpm || 0);
    const totalSegs = rpmSegs.length;
    const activeSegs = Math.round(val * totalSegs);
    rpmSegs.forEach((seg, i) => {
        if (i < activeSegs) seg.classList.add('active');
        else seg.classList.remove('active');
    });
};

// 3. Bensin (Fuel)
window.setFuel = function(fuel) {
    const val = Number(fuel || 0);
    const totalSegs = fSegs.length;
    // Mendukung nilai 0.0-1.0 maupun 0-100%
    const percent = (val > 1) ? (val / 100) : val;
    const activeSegs = Math.round(percent * totalSegs);
    fSegs.forEach((seg, i) => {
        if (i < activeSegs) seg.classList.add('active');
        else seg.classList.remove('active');
    });
};

// 4. Engine Health
window.setHealth = function(health) {
    let val = Number(health || 0);
    let percent = (val > 1) ? (val / 1000) : val;
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
    elGear.innerText = (gear == 0 || gear === "0") ? 'R' : String(gear);
};

// 6. Lock / Unlock Vehicle (Mendukung semua alternatif panggilan JGRP)
window.updateLockStatus = function(state) {
    const el = document.getElementById('door-lock');
    if (!el) return;
    
    if (isLockedState(state)) {
        el.className = 'icon-item locked'; // Nyala kuning/hijau (Terkunci)
    } else {
        el.className = 'icon-item';        // Mati (Membuka)
    }
};

// Pemetaan fungsi lock/unlock ke berbagai nama alias CEF
window.setDoors = window.updateLockStatus;
window.setDoorLock = window.updateLockStatus;
window.setVehicleLocked = window.updateLockStatus;
window.setLocked = window.updateLockStatus;
window.setLock = window.updateLockStatus;
window.toggleLock = window.updateLockStatus;

// 7. Lampu
window.setHeadlights = function(state) {
    const low = document.getElementById('headlight-low');
    const high = document.getElementById('headlight-high');
    const val = Number(state || 0);
    if (low) low.className = (val === 1) ? 'icon-item active' : 'icon-item';
    if (high) high.className = (val === 2) ? 'icon-item high-beam' : 'icon-item';
};

// 8. Lampu Sein (Turn Signals)
window.setLeftIndicator = function(state) {
    const el = document.getElementById('indicator-left');
    if (el) el.className = isTrueValue(state) ? 'icon-item active' : 'icon-item';
};

window.setRightIndicator = function(state) {
    const el = document.getElementById('indicator-right');
    if (el) el.className = isTrueValue(state) ? 'icon-item active' : 'icon-item';
};

// 9. Seatbelt
window.setSeatbelts = function(state) {
    const el = document.getElementById('seatbelts');
    if (el) el.className = isTrueValue(state) ? 'icon-item active' : 'icon-item warn';
};

// 10. Odometer
window.setOdometer = function(distance) {
    if (elOdo) elOdo.innerText = `${Number(distance || 0).toFixed(1)} mi`;
};

// Handler untuk komunikasi via Event Message
window.addEventListener('message', function(event) {
    if (!event.data) return;
    const data = event.data;
    
    if (data.type === 'setDoors' || data.action === 'setDoors' || data.type === 'lock') {
        window.updateLockStatus(data.status !== undefined ? data.status : data.state);
    }
});
