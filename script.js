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
        'Light & Funny': [
            "Have you ever lied to get out of trouble?",
            "What’s your most irrational fear?",
            "Have you ever stalked someone online?",
            "What’s something you hate but pretend to like?",
        ],
        'Embarrassing 😳': [
            "What’s one secret you’ve never told anyone?",
            "If you could be invisible, what would you do?",
            "Have you ever broken someone’s heart?",
            "Who was your first crush and why?",
            "What’s your biggest insecurity?",
            "What’s something illegal you’ve done?",
        ],
        'Bold 🔥': [
            "What’s one secret you’ve never told anyone?",
            "If you could be invisible, what would you do?",
            "Have you ever broken someone’s heart?",
            "Who was your first crush and why?",
            "What’s your biggest insecurity?",
        ],
        'Group Play 🎯': [
            "Have you ever lied to get out of trouble?",
            "What’s your most irrational fear?",
            "Have you ever stalked someone online?",
        ],
        'Relationship': [
            "Have you ever broken someone’s heart?",
            "Who was your first crush and why?",
            "What’s your biggest insecurity?",
        ]
    };

    const dares = {
        'Light & Funny': [
            "Speak without using the letter 'E' for 1 minute.",
            "Pretend you're a cat for 2 minutes.",
            "Dance like a chicken for 30 seconds.",
            "Try to lick your elbow.",
        ],
        'Embarrassing 😳': [
            "Share the most embarrassing photo in your gallery.",
            "Send a voice note saying 'I love cheese more than life.'",
            "Post 'I’m weird and proud' on your WhatsApp status for 1 hour.",
        ],
        'Bold 🔥': [
            "Change your profile name to 'Dare King/Queen' for 24 hours.",
            "Call your best friend and speak in song lyrics for 1 minute.",
            "Text your crush 'I dreamt about you last night.'",
        ],
        'Group Play 🎯': [
            "Speak without using the letter 'E' for 1 minute.",
            "Pretend you're a cat for 2 minutes.",
            "Dance like a chicken for 30 seconds.",
        ],
        'Relationship': [
            "Text your crush 'I dreamt about you last night.'",
        ]
    };

    const truths18plus = [];
    const dares18plus = [];

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
