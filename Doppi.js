// Elementlarni olish
const coinsEl = document.getElementById('coins');
const levelEl = document.getElementById('level');
const clicksLeftEl = document.getElementById('clicks-left');
const coinEl = document.getElementById('coin');
const coinContainer = document.getElementById('coin-container');
const tapIncrementEl = document.getElementById('tap-increment');

// Boshlang'ich qiymatlar
let coins = parseInt(localStorage.getItem('coins')) || 0;
let level = parseInt(localStorage.getItem('level')) || 1;
let clicksLeft = parseInt(localStorage.getItem('clicksLeft')) || 5000;

// Darajalar bo'yicha ko'paytirgichlar
const levelMultipliers = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
};

// Darajalar uchun kerakli tanga miqdori
const levelThresholds = {
    1: 0,
    2: 10000,
    3: 100000,
    4: 1000000,
    5: 1000000000
};

// UI-ni yangilash funksiyasi
function updateUI() {
    coinsEl.textContent = coins;
    levelEl.textContent = level;
    clicksLeftEl.textContent = clicksLeft;
}

// Ma'lumotlarni saqlash funksiyasi
function saveData() {
    localStorage.setItem('coins', coins);
    localStorage.setItem('level', level);
    localStorage.setItem('clicksLeft', clicksLeft);
}

// Tangaga bosilganda ishlaydigan funksiyani yaratish
function handleCoinClick() {
    if (clicksLeft <= 0) {
        alert('Sizning bosish limitingiz tugadi!');
        return;
    }

    const increment = levelMultipliers[level];
    coins += increment;
    clicksLeft--;

    createAnimation(`+${increment}`);
    tapIncrementEl.textContent = `+${increment}`;

    checkLevelUp();
    updateUI();
    saveData();
}

// Animatsiya yaratish funksiyasi
function createAnimation(text) {
    const animEl = document.createElement('div');
    animEl.classList.add('coin-animation');
    animEl.textContent = text;
    coinContainer.appendChild(animEl);

    // Animatsiya tugagandan so'ng elementni o'chirish
    animEl.addEventListener('animationend', () => {
        animEl.remove();
    });
}

// Darajani oshirishni tekshirish funksiyasi
function checkLevelUp() {
    const nextLevel = level + 1;
    if (levelThresholds[nextLevel] && coins >= levelThresholds[nextLevel]) {
        level = nextLevel;
        clicksLeft = 5000;
        alert(`Tabriklaymiz! Siz ${level}-darajaga o'tdingiz!`);
    }
}

// Hodisani tinglash
coinEl.addEventListener('click', handleCoinClick);

// Sahifa yuklanganda UI-ni yangilash
updateUI();
