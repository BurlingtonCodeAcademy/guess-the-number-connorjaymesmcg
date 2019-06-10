const readline = require("readline"); // readline is boilerplate code
const rl = readline.createInterface(process.stdin, process.stdout);
let questionText = "Can I guess your number?";

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();
//begin function
async function start() {
  console.log(
    "\n" +
      "Sup, fam? Let's play a game where you (dumb human) think of a number and I (the wicked smaht computer) try to guess it." +
      "\n" +
      "Ready?" +
      "\n" +
      "Go!"
  );
  let min = 0;
  let max = 100;
  let computerNumber = Math.floor((min + max) / 2);
  let answer = await ask(
    "Is your number " +
      computerNumber +
      "? " +
      "\n" +
      "\n" +
      "Enter 'Yes' or 'No' "
  );
  //answer = answer.toLowerCase();

  while (answer.toLowerCase() != "yes") {
    //while answer is NOT yes run the following while loop \/ \/ \/ \/ \/ \/
    // `await` means "wait for the following thing to happen"
    //when you use `await` inside a function, you must use `async` to define that function

    //if (answer.toLowerCase().includes("yes")) {
    // ".includes" looks at ASCII instead of string
    //console.log("I win!");
    //process.exit();
    //console.log('You entered: ');
    //}

    if (answer.toLowerCase().includes("no")) {
      let wrongAnswer = await ask("Is it higher or lower? ");
      if (wrongAnswer.toLowerCase().includes("higher")) {
        min = computerNumber;
        computerNumber = Math.floor((min + max) / 2);
        answer = await ask("Is your number " + computerNumber + "? ");
      }
      if (answer.toLowerCase().includes("no")) {
        if (wrongAnswer.toLowerCase().includes("lower")) {
          max = computerNumber;
          computerNumber = Math.floor((min + max) / 2);
          answer = await ask("Is your number " + computerNumber + "? ");
        }
      }

      //if (answer.toLowerCase().includes !== ("yes" || "no" || "higher" || "lower")) {
      //console.log("I do not recognize the response.")
      //answer = await ask("Is your number " + computerNumber + "? ")
      //}
    }

    //computerNumber = randomInteger(min, max);
    //answer = await ask("Is your number " + computerNumber + "? ");
  } // END OF WHILE (answer is NOT yes) LOOP

  //console.log('You entered: ');

  // If statements -- always evaluating top to bottom
  // will always hit the first one -- only moves to second if false.

  // Now try and complete the program.
  console.log(
    "\n" +
      "I have guessed your number." +
      "\n" +
      "I am all powerful." +
      "\n" +
      "Program ending..." +
      "\n" +
      "Goodbye." +
      "\n"
  );
  process.exit();
}

