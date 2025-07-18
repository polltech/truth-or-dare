document.addEventListener('DOMContentLoaded', () => {
    const menuScreen = document.getElementById('menu-screen');
    const gameScreen = document.getElementById('game-screen');
    const startGameMenuBtn = document.getElementById('start-game-menu');
    const truthBtn = document.getElementById('truth-btn');
    const dareBtn = document.getElementById('dare-btn');
    const randomBtn = document.getElementById('random-btn');
    const shareBtn = document.getElementById('share-btn');
    const themeToggle = document.getElementById('theme-toggle');
    const questionCard = document.getElementById('question-card');
    const questionCategory = document.getElementById('question-category');
    const questionText = document.getElementById('question-text');

    let lastPrompt = {};

    const allPrompts = {
        truth: truths,
        dare: dares
    };

    startGameMenuBtn.addEventListener('click', () => {
        menuScreen.style.display = 'none';
        gameScreen.style.display = 'flex';
    });

    truthBtn.addEventListener('click', () => getQuestion('truth'));
    dareBtn.addEventListener('click', () => getQuestion('dare'));
    randomBtn.addEventListener('click', () => {
        const randomType = Math.random() < 0.5 ? 'truth' : 'dare';
        getQuestion(randomType);
    });

    shareBtn.addEventListener('click', () => {
        if (lastPrompt.question) {
            const shareText = `"${lastPrompt.question}" - Can you handle this ${lastPrompt.type}?`;
            const shareUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
            window.open(shareUrl, '_blank');
        }
    });

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
    });

    function getQuestion(type) {
        const categories = Object.keys(allPrompts[type]);
        const randomCategoryName = categories[Math.floor(Math.random() * categories.length)];
        const questionsInCategory = allPrompts[type][randomCategoryName];
        const randomQuestion = questionsInCategory[Math.floor(Math.random() * questionsInCategory.length)];

        lastPrompt = {
            type: type.charAt(0).toUpperCase() + type.slice(1),
            category: randomCategoryName,
            question: randomQuestion
        };

        displayQuestion();
    }

    function displayQuestion() {
        questionCard.classList.remove('slide-in');
        questionCard.classList.add('slide-out');

        setTimeout(() => {
            questionCategory.textContent = `${lastPrompt.type} - ${lastPrompt.category}`;
            questionText.textContent = lastPrompt.question;
            questionCard.classList.remove('slide-out');
            questionCard.classList.add('slide-in');
        }, 500);
    }
});
