
document.addEventListener("DOMContentLoaded", () => {
	chatbot();
});

// user's text
const trigger = [

	["hi", "hey", "hello"],

	["how are you", "what is up"],

	["happy", "good", "well", "bad", "bored"],

	["tell me story"],

	["scary", "kind"],

	["thanks", "nice"],

	["bye", "good bye"]
];
//  bot's text
const reply = [

	["Hello!", "Hi!", "Hey!", "Hi there!"],

	[
		"Fine... how are you?",
		"Pretty well, how are you?",
	],

	["Glad to hear!", "Great!", "It's great!", "Cheer up buddy!", "Never give up!"],

	["Scary or kind?"],

	["“Wrong recipient”, he exclaimed, just seconds after the computer screen claimed — ‘Mail sent", "There was once a hare who was friends with a tortoise. One day, he challenged the tortoise to a race. Seeing how slow the tortoise was going, the hare thought he’ll win this easily. So he took a nap while the tortoise kept on going. When the hare woke up, he saw that the tortoise was already at the finish line. Much to his chagrin, the tortoise won the race while he was busy sleeping."],

	["You're welcome", "Yes, I agree with you :)"],

	["Goodbye", "See you later"],
];
// alternative text
const alternative = [
	"Sorry, but I dont' understand you :(",
	"Go on...",
	"I'm listening...",
	"Couldn't understand, repeat please..."
];
// alternative robot text
const robot = ["How do you do, fellow human", "I am not a bot"];

// delete all characters except word characters, space, digits
const replaceCharacters = () => {
	let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");

	text = text
		.replace(/ a /g, " ")
		.replace(/i feel /g, "")
		.replace(/whats/g, "what is")
		.replace(/please /g, "")
		.replace(/ please/g, "");
}

// compare user's and bot's messages
const compare = (triggerArray, replyArray, text) => {
	let item;
	for (let x = 0; x < triggerArray.length; x++) {
		for (let y = 0; y < replyArray.length - 1; y++) {
			if (triggerArray[x][y] === text) {
				item = replyArray[x][y];
			}
		}
	}

	return item;
}

const speak = (string) => {
	const u = new SpeechSynthesisUtterance();
	allVoices = speechSynthesis.getVoices();
	u.voice = allVoices.filter(voice => voice.name === "Alex")[0];
	u.text = string;
	u.lang = "en-US";
	u.volume = 1; //0-1 interval
	u.rate = 1;
	u.pitch = 1; //0-2 interval
	speechSynthesis.speak(u);
}

const addChat = (input, product) => {
	const messagesBox = document.querySelector(".chat__messages");
	let user = document.createElement("div");
	user.classList.add("user");
	user.innerHTML = `<img src="./images/user.svg"/><div class="bot-inner"> <span class="response">${input}</span></div>`;
	messagesBox.appendChild(user);

	let bot = document.createElement("div");
	let botText = document.createElement("div");
	let botImg = document.createElement("img");

	bot.classList.add("bot");

	botImg.src = './images/bot.svg';
	botText.innerHTML = `<div class="bot-inner"><span class="typing">Typing...</span></div>`;

	bot.appendChild(botImg);
	bot.appendChild(botText);
	setTimeout(() => {
		botText.innerHTML = `<div class="bot-inner"><span class="response">${product}</span></div>`
	}, 1000)
	messagesBox.appendChild(bot);
	setTimeout(() => {
		speak(product);
	}, 1000)
}

const output = (input) => {
	let product;
	let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");
	text = text
		.replace(/ a /g, " ")
		.replace(/i feel /g, "")
		.replace(/whats/g, "what is")
		.replace(/please /g, "")
		.replace(/ please/g, "");

	if (compare(trigger, reply, text)) {
		product = compare(trigger, reply, text);
	} else if (text.match(/robot/gi)) {
		product = robot[Math.floor(Math.random() * robot.length)];
	} else {
		product = alternative[Math.floor(Math.random() * alternative.length)];
	}
	addChat(input, product);
}

const showExamples = (examplesArr, index) => {
	let examplesItem = examplesArr[index];
	const chatField = document.querySelector('.chat__examples-wrapper');
	chatField.innerHTML = '<div class="chat__examples"></div>';

	if (examplesItem) {
		for (let i = 0; i < examplesItem.length; i++) {
			const examples = document.querySelector('.chat__examples');
			examples.innerHTML += `<div class="chat__example">${examplesItem[i]}</div>`;
		}
		index++;
	} else {
		spanElement = document.querySelector('.chat__input-wrapper > span');
		spanElement.parentElement.removeChild(spanElement)
	}
}

const selectExample = () => {
	let index = 0;

	const hadlerClickExample = (e) => {
		output(e.target.innerText);
		index++;

		showExamples(trigger, index);

		let examples = document.querySelectorAll('.chat__example');
		examples.forEach(example => {
			example.addEventListener('click', hadlerClickExample)
		})
	}

	let examples = document.querySelectorAll('.chat__examples');
	examples.forEach(example => {
		example.addEventListener('click', hadlerClickExample)
	})
}

// final function
const chatbot = () => {
	let index = 0;
	showExamples(trigger, index);
	selectExample();
	const input = document.querySelector(".chat__input");
	input.addEventListener("keydown", function (e) {
		if (e.code === "Enter") {
			let inputValue = input.value;
			output(inputValue);
			input.value = "";
		}
	})
}