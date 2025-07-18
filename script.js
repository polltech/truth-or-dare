document.addEventListener('DOMContentLoaded', () => {
    const menuScreen = document.getElementById('menu-screen');
    const gameScreen = document.getElementById('game-screen');
    const startGameMenuBtn = document.getElementById('start-game-menu');
    const truthBtn = document.getElementById('truth-btn');
    const dareBtn = document.getElementById('dare-btn');
    const nextBtn = document.getElementById('next-btn');
    const backToMenuBtn = document.getElementById('back-to-menu');
    const unlock18PlusBtn = document.getElementById('unlock-18-plus');
    const questionCategory = document.getElementById('question-category');
    const questionText = document.getElementById('question-text');
    const themeToggle = document.getElementById('theme-toggle');

    let eighteenPlusUnlocked = false;
    let dareCount = 0;
    let longPressTimer;

    const truths = {
        'Light & Funny': Array.from({ length: 2000 }, (_, i) => `Light & Funny Truth ${i + 1}`),
        'Embarrassing 😳': Array.from({ length: 2000 }, (_, i) => `Embarrassing Truth ${i + 1}`),
        'Bold 🔥': Array.from({ length: 2000 }, (_, i) => `Bold Truth ${i + 1}`),
        'Group Play 🎯': Array.from({ length: 2000 }, (_, i) => `Group Play Truth ${i + 1}`),
        'Relationship': Array.from({ length: 2000 }, (_, i) => `Relationship Truth ${i + 1}`),
    };

    const dares = {
        'Light & Funny': Array.from({ length: 2000 }, (_, i) => `Light & Funny Dare ${i + 1}`),
        'Embarrassing 😳': Array.from({ length: 2000 }, (_, i) => `Embarrassing Dare ${i + 1}`),
        'Bold 🔥': Array.from({ length: 2000 }, (_, i) => `Bold Dare ${i + 1}`),
        'Group Play 🎯': Array.from({ length: 2000 }, (_, i) => `Group Play Dare ${i + 1}`),
        'Relationship': Array.from({ length: 2000 }, (_, i) => `Relationship Dare ${i + 1}`),
    };

    const truths18plus = Array.from({ length: 1000 }, (_, i) => `18+ Truth ${i + 1}`);
    const dares18plus = Array.from({ length: 1000 }, (_, i) => `18+ Dare ${i + 1}`);

    let usedTruths = [];
    let usedDares = [];

    startGameMenuBtn.addEventListener('click', () => {
        menuScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        questionText.textContent = 'Choose Truth or Dare.';
    });

    backToMenuBtn.addEventListener('click', () => {
        gameScreen.classList.add('hidden');
        menuScreen.classList.remove('hidden');
    });

    truthBtn.addEventListener('click', () => getQuestion('truth'));
    dareBtn.addEventListener('click', () => getQuestion('dare'));
    nextBtn.addEventListener('click', () => {
        questionCategory.innerHTML = '';
        questionText.textContent = 'Choose Truth or Dare.';
    });

    function getQuestion(type) {
        let category, question;
        let availableCategories, available18Plus;

        if (type === 'truth') {
            availableCategories = truths;
            available18Plus = truths18plus;
        } else {
            availableCategories = dares;
            available18Plus = dares18plus;
        }

        let allCategories = { ...availableCategories };
        if (eighteenPlusUnlocked) {
            allCategories['18+ 🔞'] = available18Plus;
        }

        const categories = Object.keys(allCategories);

        let questionBank;
        if (type === 'truth') {
            do {
                category = categories[Math.floor(Math.random() * categories.length)];
                questionBank = allCategories[category];
                question = questionBank[Math.floor(Math.random() * questionBank.length)];
            } while (usedTruths.includes(question));
            usedTruths.push(question);
            if (usedTruths.length === 1000) usedTruths = [];
        } else {
            do {
                category = categories[Math.floor(Math.random() * categories.length)];
                questionBank = allCategories[category];
                question = questionBank[Math.floor(Math.random() * questionBank.length)];
            } while (usedDares.includes(question));
            usedDares.push(question);
            if (usedDares.length === 1000) usedDares = [];
            dareCount++;
            if (dareCount % 5 === 0) {
                confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
            }
        }

        questionCategory.innerHTML = `<span class="category-title">${category}</span>`;
        questionText.textContent = question;
        document.getElementById('question-card').classList.add('animate-fade-in');
        setTimeout(() => {
            document.getElementById('question-card').classList.remove('animate-fade-in');
        }, 500);
    }

    const shareBtn = document.getElementById('share-btn');
    const audio = new Audio('https://www.soundjay.com/buttons/sounds/button-16.mp3');

    shareBtn.addEventListener('click', () => {
        const text = `Truth or Dare: ${questionText.textContent}`;
        const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    });

    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            audio.play();
        });
    });

    unlock18PlusBtn.addEventListener('mousedown', startLongPress);
    unlock18PlusBtn.addEventListener('touchstart', startLongPress);
    unlock18PlusBtn.addEventListener('mouseup', cancelLongPress);
    unlock18PlusBtn.addEventListener('mouseleave', cancelLongPress);
    unlock18PlusBtn.addEventListener('touchend', cancelLongPress);

    function startLongPress(e) {
        e.preventDefault();
        longPressTimer = setTimeout(() => {
            eighteenPlusUnlocked = true;
            unlock18PlusBtn.textContent = '18+ Unlocked!';
            unlock18PlusBtn.classList.add('bg-green-500');
            unlock18PlusBtn.disabled = true;
            alert('18+ category unlocked!');
        }, 3000);
    }

    function cancelLongPress() {
        clearTimeout(longPressTimer);
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
    });
});
