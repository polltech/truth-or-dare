document.addEventListener('DOMContentLoaded', () => {
    const introScreen = document.getElementById('intro-screen');
    const gameScreen = document.getElementById('game-screen');
    const startGameBtn = document.getElementById('start-game');
    const playerNameInput = document.getElementById('player-name');
    const truthBtn = document.getElementById('truth-btn');
    const dareBtn = document.getElementById('dare-btn');
    const nextBtn = document.getElementById('next-btn');
    const shareBtn = document.getElementById('share-btn');
    const romanticLockBtn = document.getElementById('romantic-lock');
    const questionCategory = document.getElementById('question-category');
    const questionText = document.getElementById('question-text');

    let playerName = '';
    let romanticUnlocked = false;
    let dareCount = 0;
    let longPressTimer;

    const truths = {
        fun: Array.from({ length: 200 }, (_, i) => `Fun Truth ${i + 1}`),
        embarrassing: Array.from({ length: 200 }, (_, i) => `Embarrassing Truth ${i + 1}`),
        daring: Array.from({ length: 200 }, (_, i) => `Daring Truth ${i + 1}`),
        deep: Array.from({ length: 200 }, (_, i) => `Deep Truth ${i + 1}`),
        group: Array.from({ length: 200 }, (_, i) => `Group Truth ${i + 1}`),
    };

    const dares = {
        fun: Array.from({ length: 200 }, (_, i) => `Fun Dare ${i + 1}`),
        embarrassing: Array.from({ length: 200 }, (_, i) => `Embarrassing Dare ${i + 1}`),
        daring: Array.from({ length: 200 }, (_, i) => `Daring Dare ${i + 1}`),
        deep: Array.from({ length: 200 }, (_, i) => `Deep Dare ${i + 1}`),
        group: Array.from({ length: 200 }, (_, i) => `Group Dare ${i + 1}`),
    };

    const romanticTruths = Array.from({ length: 100 }, (_, i) => `Romantic Truth ${i + 1}`);
    const romanticDares = Array.from({ length: 100 }, (_, i) => `Romantic Dare ${i + 1}`);

    let usedTruths = [];
    let usedDares = [];

    startGameBtn.addEventListener('click', () => {
        playerName = playerNameInput.value.trim();
        introScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        if (playerName) {
            questionText.textContent = `Welcome, ${playerName}! Choose Truth or Dare.`;
        } else {
            questionText.textContent = 'Welcome! Choose Truth or Dare.';
        }
    });

    truthBtn.addEventListener('click', () => getQuestion('truth'));
    dareBtn.addEventListener('click', () => getQuestion('dare'));
    nextBtn.addEventListener('click', () => {
        questionCategory.textContent = '';
        questionText.textContent = 'Choose Truth or Dare.';
    });

    function getQuestion(type) {
        let category, question;
        const availableCategories = romanticUnlocked ? {...truths, romantic: romanticTruths} : truths;
        const categories = Object.keys(availableCategories);

        if (type === 'truth') {
            do {
                category = categories[Math.floor(Math.random() * categories.length)];
                const questions = availableCategories[category];
                question = questions[Math.floor(Math.random() * questions.length)];
            } while (usedTruths.includes(question));
            usedTruths.push(question);
            if (usedTruths.length === 1000) usedTruths = [];
        } else {
            const availableDareCategories = romanticUnlocked ? {...dares, romantic: romanticDares} : dares;
            const dareCategories = Object.keys(availableDareCategories);
            do {
                category = dareCategories[Math.floor(Math.random() * dareCategories.length)];
                const questions = availableDareCategories[category];
                question = questions[Math.floor(Math.random() * questions.length)];
            } while (usedDares.includes(question));
            usedDares.push(question);
            if (usedDares.length === 1000) usedDares = [];
            dareCount++;
            if (dareCount % 5 === 0) {
                confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
            }
        }

        questionCategory.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        questionText.textContent = question;
    }

    shareBtn.addEventListener('click', () => {
        const text = `Truth or Dare: ${questionText.textContent}`;
        const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    });

    romanticLockBtn.addEventListener('mousedown', startLongPress);
    romanticLockBtn.addEventListener('touchstart', startLongPress);
    romanticLockBtn.addEventListener('mouseup', cancelLongPress);
    romanticLockBtn.addEventListener('mouseleave', cancelLongPress);
    romanticLockBtn.addEventListener('touchend', cancelLongPress);

    function startLongPress(e) {
        e.preventDefault();
        longPressTimer = setTimeout(() => {
            romanticUnlocked = true;
            romanticLockBtn.textContent = 'Romantic 🔞 Unlocked!';
            romanticLockBtn.classList.add('bg-green-500');
            romanticLockBtn.disabled = true;
            alert('Romantic category unlocked!');
        }, 3000);
    }

    function cancelLongPress() {
        clearTimeout(longPressTimer);
    }
});
