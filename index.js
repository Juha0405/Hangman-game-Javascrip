window.onload = function () {

  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z', "å", "ä", "ö"];

  var word ;              // Selected word
  var guess ;             // Guess
  var guesses = [ ];      // Stored guesses
  var lives ;             // Lives
  var counter ;           // Count correct guesses
  var space;              // Number of spaces in word '-'

  // Get elements
  var showLives = document.getElementById("mylives");

  // create alphabet ul
  var buttons = function () {
    myButtons = document.getElementById('buttons');
    letters = document.createElement('ul');

    for (var i = 0; i < alphabet.length; i++) {
      letters.id = 'alphabet';
      list = document.createElement('li');
      list.id = 'letter';
      list.innerHTML = alphabet[i];
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list);
    }
  }

  // Create guesses ul
   result = function () {
    wordHolder = document.getElementById('hold');
    correct = document.createElement('ul');

    for (var i = 0; i < word.length; i++) {
      correct.setAttribute('id', 'my-word');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
      if (word[i] === "-") {
        guess.innerHTML = "-";
        space = 1;
      } else {
        guess.innerHTML = "_";
      }

      guesses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  }

  // Show lives, note game UI in Finnish!
  comments = function () {
    showLives.innerHTML = "Sinulla on " + lives + " elämää";
    if (lives < 1) {
      showLives.innerHTML = "Hävisit, peli loppui!";
    }
    for (var i = 0; i < guesses.length; i++) {
      if (counter + space === guesses.length) {
        showLives.innerHTML = "Voitit, pelastit hepun!";
      }
    }
  }

  // Animate man
  var animate = function () {
    var drawMe = lives ;
    drawArray[drawMe]();
  }


  // Hangman
  canvas =  function(){

    myStickman = document.getElementById("stickman");
    context = myStickman.getContext('2d');
    context.beginPath();
    context.strokeStyle = "#fff";
    context.lineWidth = 3;
  };
  
  // location of "hangman head" and the size of circle
  head = function(){
    myStickman = document.getElementById("stickman");
    context = myStickman.getContext('2d');
    context.beginPath();
    context.arc(100, 25, 10, 0, Math.PI*2, true);
    context.stroke();
  }

  draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {
    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke();
  }

/* paremeters with index 0,1 define the x,y start position and values with 
index 2,3 define the  x,y end position*/

  frame1 = function() {
    draw (0, 150, 300, 150);
  };

  /*frame2 = function(){
    draw (10,100, 50, 150)
  };*/

  frame2 = function() {
    draw (10, 0, 10, 600);
  };

  frame3 = function() {
    draw (0, 5, 150, 5);
  };

  frame4 = function() {
    draw (100, 5, 100, 15);
  };

  torso = function() {
    draw (100, 36, 100, 70);
  };

  rightArm = function() {
    draw (100, 41, 130, 50);
  };

  leftArm = function() {
    draw (100, 41, 70, 50);
  };

  rightLeg = function() {
    draw (100, 70, 130, 100);
  };

  leftLeg = function() {
    draw (100, 70, 70, 100);
  };

  drawArray = [rightLeg, leftLeg, rightArm, leftArm,  torso,  head, frame4, frame3, frame2, frame1];

  // OnClick Function
  check = function () {
    list.onclick = function () {
      guess = (this.innerHTML);
      this.setAttribute("class", "active");
      this.onclick = null;
      for (var i = 0; i < word.length; i++) {
        if (word[i] === guess) {
          guesses[i].innerHTML = guess;
          counter += 1;
        }
      }
      var j = (word.indexOf(guess));
      if (j === -1) {
        lives -= 1;
        comments();
        animate();
      } else {
        comments();
      }
    }
  }

  /* Define the words. Note, Finnish words! Define math object properties 
  to select random words. Words also sent to console */
  play = function () {
    words = ['tyyny', 'jääkaappi', 'pöytä', 'sauna', 'olohuone', 'peitto', 'kynä', 'tehdas',
    'lentokone', 'paloauto', 'poliisi']
    word = words[Math.floor(Math.random() * words.length)];
    word = word.replace(/\s/g, "-");
    console.log(word);
    buttons();

    guesses = [ ];
    lives = 10; 
    counter = 0;
    space = 0;
    result();
    comments();
    canvas();
  }

  play();

  // Reset
  document.getElementById('reset').onclick = function() {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    context.clearRect(0, 0, 400, 400);
    play();
  }
}