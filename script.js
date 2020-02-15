const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'; // get API
const quoteDisplayElement = document.getElementById('quoteDisplay'); // get div element
const quoteInputElement = document.getElementById('quoteInput'); // get textarea element
const timerElement = document.getElementById('timer'); // get div element

quoteInputElement.addEventListener('input', () => { // addEventListener to input element. Gets called everytime something in the textarea changes - 'input'
    const arrayQuote = quoteDisplayElement.querySelectorAll('span'); // get all of our spans in our div element
    const arrayValue = quoteInputElement.value.split(''); // get string array of our input
    let correct = true; // correct is by default, set to true
    arrayQuote.forEach((characterSpan, index) => { // loop through the text quote. Access to the character of the span and the index of our input
        const character = arrayValue[index] // get character of our input based on index of text quote
        if(character == null){ // If there is no input
            characterSpan.classList.remove('correct'); // remove correct class
            characterSpan.classList.remove('incorrect'); // remove incorrect class
            correct = false; // set correct to false
        } else if(character === characterSpan.innerText){ // if the character we input is equal to the text of the span
            characterSpan.classList.add('correct'); // add correct class
            characterSpan.classList.remove('incorrect'); // remove incorrect class
        } else { // if what we inputted is wrong
            characterSpan.classList.remove('correct'); // remove correct class
            characterSpan.classList.add('incorrect'); // add incorrect class
            correct = false; // set correct to false
        }
    })
    if (correct) renderNewQuote(); // If everything inputed is correct, then call the renderNewQuote function
})


function getRandomQuote(){ 
    return fetch(RANDOM_QUOTE_API_URL) // fetch the API
        .then(response => response.json()) // convert data to json
        .then(data => data.content) // get data text content
}

async function renderNewQuote(){
    const quote = await getRandomQuote(); // get the random text quote
    quoteDisplayElement.innerHTML = ''; // clear div element
    quote.split('').forEach(character => { // loop. Convert String into array
        const characterSpan = document.createElement('span'); // create new span element
        characterSpan.innerText = character; // set text of span to individual text element
        quoteDisplayElement.appendChild(characterSpan); // add the span to the div element
    });
    quoteInputElement.value = null; // clear value in input textarea
    startTimer(); // call the startTimer function
}

let startTime; // our start time
function startTimer(){ 
    timer.innerText = 0; // get timer element and set text to zero
    startTime = new Date(); // get the current date
    setInterval(() => { // setInterval takes a function and second parameter of how many times you want to run the function 
        timer.innerText = getTimerTime(); // set our text to the returned value of time form the getTimerTime function
    }, 1000) // Every 1000 miliseconds we will run this function. It is not accurate
}

// Compare our start date to current date to get the actual/accurate time that elapsed

function getTimerTime(){
    return Math.floor((new Date() - startTime) / 1000); // Get current time and subtract from start time. Since this is in miliseonds we need to convert to miliseconds nad round down.
}

renderNewQuote();