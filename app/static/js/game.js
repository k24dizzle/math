$(document).ready(function() {

  function randomInt(lower, higher) {
    return Math.floor(Math.random() * (higher - lower)) + lower;
  }

  function generateProblem() {
    // Return an array containing...
    // A string representing the question: "13 + 2"
    // An integer representing the answer: 15
    var q_type = randomInt(0, 4);

    var operator = "";
    var first = 0;
    var second = 0;
    var answer = 0;

    // 2-100 + 2-100
    var addition_range = [2, 101, 2, 101];
    // 2-12 * 2-100
    var mult_range = [2, 13, 2, 101];

    switch (q_type) {
      case 0: // addition
        operator = "+";
        first = randomInt(addition_range[0], addition_range[1]);
        second = randomInt(addition_range[2], addition_range[3]);
        answer = first + second;
        break;
      case 1: // subtraction
        operator = "-";
        answer = randomInt(addition_range[2], addition_range[3]);
        second = randomInt(addition_range[0], addition_range[1]);
        first = second + answer; // first number should be the biggest number
        break;
      case 2: // multiplication
        operator = "x";
        first = randomInt(mult_range[0], mult_range[1]);
        second = randomInt(mult_range[2], mult_range[3]);
        answer = first * second;
        break;
      case 3: // division
        operator = "÷";
        second = randomInt(mult_range[0], mult_range[1]);
        answer = randomInt(mult_range[2], mult_range[3]);
        first = second * answer;
        break;
      default: // wtf
        break;
    }
    var operator_str = first + " " + operator + " " + second + " =";
    return [operator_str, answer];
  }

  firstProblem = generateProblem();
  $("#question").html(firstProblem[0]);
  var answer = firstProblem[1];
  var score = 0;
  var secondsLeft = 3;

  $('#answer').on('input', function() { 
      var val = parseInt($(this).val()); // get the current value of the input field.
      console.log(val + " vs. " + answer);
      if (val === answer) {
        // question correct
        score++;
        $("#score").html("Score: " + score);
        $('#answer').val('');
        nextProblem = generateProblem();
        $("#question").html(nextProblem[0]);
        answer = nextProblem[1];
      }
  });

  function timer() {
    setTimeout(function() {
      secondsLeft--;
      $("#timer").html("Seconds Left: " + secondsLeft);
      if (secondsLeft === 0) {
        $("#math").css('display', 'none');
        $("#results").css('display', '');
        $("#final_score").html("Score: " + score);
      } else {
        timer();
      }
    }, 1000);
  }

  timer();
});
