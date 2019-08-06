const readline = require("readline"); // readline is boilerplate code
const rl = readline.createInterface(process.stdin, process.stdout);
let questionText = "Can I guess your number?";

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();
async function start() {
  console.log(
    "\n" +
    "'Let's play a game where you (human) think of a number and I (the computer) try to guess it.'" +
    "\n"
  );
  let gameStartResponse = await ask("'Are you ready?'" + "\n");
  if (gameStartResponse.toLowerCase().includes("yes")) {
    console.log("\n" + "'Lets begin'")
    let min = 0;
    let max = 100;
    let computerNumber = Math.floor((min + max) / 2); // Calculate the minimum and maximum numbers for guessing. In this case, it is hard-coded into the application.
    return await gameStart(computerNumber, min, max)
  }
  if (gameStartResponse.toLowerCase().includes("no")) { // Sometimes you just aren't ready.  
    console.log("\n" + "'Fair enough..." + "\n" + "Goodbye!'" + "\n")
    process.exit();
  }
  else { // ...and for the sheer jibberish responses and/or typos.
    console.log("\n" + "'I don't understand the response" + "\n" + "Let's try that again...'" + "\n")
    start();
  }

  async function gameStart(computerNumber, min = 0, max = 100) {
    let answer = await ask(
      "'Is your number " +
      "" +
      computerNumber +
      "" +
      "?'" +
      "\n" +
      "\n" +
      "Enter 'Yes' or 'No' " +
      "\n"
    );

    while (answer.toLowerCase().includes("no")) {
      let wrongAnswer = await ask("'Is it higher or lower?' \n");
      if (wrongAnswer.toLowerCase().includes("higher")) {
        min = computerNumber;
        // --------- CHEAT BLOCKER --------- //
        if (min >= Math.floor(min + max) / 2) {
          console.log("'You cheated!" + "\n" + "Goodbye!'")
          process.exit()
        }
        computerNumber = Math.floor((min + max) / 2);
        answer = await ask("'Is your number " + computerNumber + "?' \n");
      }
      if (wrongAnswer.toLowerCase().includes("lower")) {
        max = computerNumber;
        // --------- CHEAT BLOCKER --------- //
        if (max <= Math.ceil((min + max) / 2)) {
          console.log("'You cheated!" + "\n" + "Goodbye!'")
          process.exit();
        }
        computerNumber = Math.floor((min + max) / 2);
        answer = await ask("Is your number " + computerNumber + "? \n");
      }
    }
    if (answer.toLowerCase().includes("yes")) {
      console.log(
        "\n" +
        "I have guessed your number." +
        "\n" +
        "Program ending..." +
        "\n" +
        "Goodbye." +
        "\n"
      );
    }
    else { // And for the gibberish responses...
      console.log("'I don't understand the response, try that again...'" + "\n")
      await gameStart(computerNumber, min = 0, max = 100)
    }
    process.exit();
  }
}
