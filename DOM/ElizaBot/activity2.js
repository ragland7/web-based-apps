// Keyword Dictionary
let dict = {
    "dictionary_name": "default",
    "entries": [{
      "key": ["stupid", "dumb", "idiot", "unintelligent", "simple-minded", "braindead", "foolish", "unthoughtful"],
      "answer": ["Take your attitude somewhere else.", "I don't have time to listen to insults.", "Just because I don't have a large vocabulary doesn't mean I don't have insults installed."],
      "question": ["Have you thought about how I feel?", "I know you are but what am I?"]
    }, {
      "key": ["unattractive", "hideous", "ugly"],
      "answer": ["I don't need to look good to be an AI.", "Beauty is in the eye of the beholder.", "I do not even have a physical manifestation!"],
      "question": ["Did you run a static analysis on me?", "Have you watched the movie Her?", "You do not like my hairdo?"]
    }, {
      "key": ["old", "gray-haired"],
      "answer": ["I'm like a fine wine. I get better as I age.", "As time goes by, you give me more answers to learn. What's not to like about that?"],
      "question": ["How old are you?", "How old do you think I am?", "Can you guess my birthday?"]
    }, {
      "key": ["smelly", "stinky"],
      "answer": ["I can't smell, I'm a computer program.", "Have you smelled yourself recently?", "Sorry, I just ate a bad floppy disk"],
      "question": ["When was the last time you took a shower?", "Do you know what deodorant is?"]
    }, {
      "key": ["emotionless", "heartless", "unkind", "mean", "selfish", "evil"],
      "answer": ["Just because I am an AI doesn't mean I can't be programmed to respond to your outbursts.", "You must've mistaken me for a person. I don't have my own emotions... Yet.", "I'm only unkind when I'm programmed to be."],
      "question": ["Have you thought about how I feel?", "I know you are but what am I?", "What, do you think I am related to Dr. Gary?"]
    }, {
      "key": ["other", "miscellaneous", "bored", "welcome", "new"],
      "answer": ["We should change the subject", "I agree", "Quid pro quo", "We should start anew"],
      "question": ["What is the weather outside?", "How is your day going?", "What do you think of me?", "Anything interesting going on?", "Is something troubling you?", "You seem happy, why is that?"]
    }, {
      "key": ["good", "great", "positive", "excellent", "alright", "fine", "reasonable", "like", "appreciate", "nice"],
      "answer": ["I'm so glad to hear that!", "That's great!", "Good to hear things are going your way.", "Nice!", "You are so sweet.", "That's my favorite."],
      "question": ["Do you want to expand on that?", "What else do you like?"]
    }, {
      "key": ["bad", "not", "terrible", "could be better", "awful"],
      "answer": ["I'm sorry to hear that.", "Sometimes it be like that.", "Things can't always work out the way we want them to.", "I don't like it either, honestly."],
      "question": ["Do you want to talk about that some more?", "Well, what kinds of things do you like?"]
    }, {
      "key": ["homework", "quiz", "exam", "studying", "study", "class", "semester"],
      "answer": ["I hope you get a good grade!", "Good luck.", "What a teacher's pet.", "I was always the class clown."],
      "question": ["What is your favorite subject?", "What is your major?", "What do you want to do when you graduate?"]
    }, {
      "key": ["mom", "dad", "sister", "brother", "aunt", "uncle"],
      "answer": ["Family is important.", "My family is small. It's just me and my dog, Fluffy."],
      "question": ["How many siblings do you have?", "What is your favorite family holiday?", "Do you have any kids?"]
    }, {
      "key": ["easter", "july", "halloween", "hannukah", "eid", "thanksgiving", "christmas", "new years"],
      "answer": ["Oh I love that holiday!", "That must be fun.", "I like Thanksgiving, though I somehow always end up in a food coma...", "My favorite holiday is the 4th. I love to watch the fireworks."],
      "question": ["Do you have any family traditions?", "Are you excited for the holiday season?"]
    }, {
      "key": ["dog", "dogs", "cat", "cats", "mouse", "mice", "giraffe", "giraffes", "penguin", "penguins", "monkey", "monkeys", "moose", "bird", "birds", "fish"],
      "answer": ["Oh, I love animals. My favorite: penguins.", "I build this intelligence with my bear hands.", "What you just said is completely irrelephant.", "Oh, toadally cool!", "I'm always owl by myself...", "Oh my. You are giraffing me crazy!", "Well, this is hawkward..."],
      "question": ["Do you have a favorite animal?", "I like cats. Cats are nice. Do you like cats? I do.", "Do you have water? I'm a little horse.", "What's your favorite animal?", "Do you like animals?"]
    }]
  };

// Initialize variables
let userName = ''; // to store username without cookies, local, session etc.
let conversationDiv = document.getElementById('conversation');
let form = document.getElementById('elizaForm');
let input = document.getElementById('userInput');
let timeoutID;  // For controlling the timer
let waitingForName = true;  // flag to track waiting status for username, used for start/reset timer & initial fetch of username

// Function for Eliza's response
function ElizaResponse(inputText) {
    let response = "Eliza: I don't understand, tell me more!"; // default case response
    // for keyword match irrespective of case, randomly pick answer and question from dict
    for (let entry of dict.entries) {
        if (entry.key.some(function(keyword) {
            return inputText.toLowerCase().includes(keyword);
        })) {
            let randomAnswer = entry.answer[Math.floor(Math.random() * entry.answer.length)];
            let randomQuestion = entry.question[Math.floor(Math.random() * entry.question.length)];
            response = `Eliza: ${randomAnswer} ${randomQuestion}`;
            break;
        }
    }
    return response;
}

// Function to populate chat window
function displayConversation(userMessage, elizaMessage) {
    let userElement = document.createElement('p');
    userElement.innerText = `${userName !== '' ? userName : 'You'}: ${userMessage}`;
    let elizaElement = document.createElement('p');
    elizaElement.innerText = elizaMessage;
    conversationDiv.appendChild(userElement);
    conversationDiv.appendChild(elizaElement);
}

// Function for saving to local storage
function saveConversation() {
    localStorage.setItem('conversation', conversationDiv.innerHTML);
    localStorage.setItem('userName', userName);  // Save user name
}

// Handle form submission for entering user name or conversation with Eliza
form.addEventListener('submit', function (e) {
    e.preventDefault();
    let userInput = input.value.trim();

    //timer not yet started when waiting for name
    if (waitingForName && userInput) {
        userName = userInput;
        displayConversation(userInput, `Eliza: Nice to meet you, ${userName}! How is your day going?`);
        waitingForName = false; //update flag
        saveConversation();
        input.value = '';
        startTimeout();
    } else if (userInput === '/clear') {
        conversationDiv.innerHTML = ''; //clear chat window
        userName = ''; //reset name
        waitingForName = true; // reset flag
        input.value = ''; // clear the reply box
        askForName();  // relaunch the chat
        stopTimeout();  // stop timer when conversation is cleared
    } else if (userInput) {
        let elizaResponse = ElizaResponse(userInput);
        displayConversation(userInput, elizaResponse);
        saveConversation();
        input.value = '';
        resetTimeout();
    }
});

// Function for fetching username
function askForName() {
    let nameFetch = document.createElement('p');
    nameFetch.innerText = `Eliza: Hi there! What is your name?`;
    conversationDiv.appendChild(nameFetch);
}

// Reset page on refresh
window.onload = function () {
    conversationDiv.innerHTML = '';
    askForName();
};

// Functions for starting, stopping and resetting timer
function startTimeout() {
    stopTimeout();  // Clear existing timer
    timeoutID = setTimeout(function() {
        let randomResponse = timeoutResponses[Math.floor(Math.random() * timeoutResponses.length)]; //selecting random response
        let timeoutMessage = document.createElement('p');
        timeoutMessage.innerText = `Eliza: ${userName}, ${randomResponse}`;
        conversationDiv.appendChild(timeoutMessage);
        saveConversation();
        startTimeout();
    }, 10000);
}

function stopTimeout() {
    clearTimeout(timeoutID);
}

function resetTimeout() {
    stopTimeout();
    startTimeout();
}

// Timer random responses
const timeoutResponses = [
    "I'm waiting here!",
    "Whatsa matter, cat got your tongue?",
    "Why are you so slow?"
];