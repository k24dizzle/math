$(document).ready(function() {
	// 2-100 + 2-100
	var addition_range = [2, 101, 2, 101];
	// 2-12 * 2-100
	var mult_range = [2, 13, 2, 101];

	function randomInt(lower, higher) {
		return Math.floor(Math.random() * (higher - lower)) + lower;
	}

	function generateProblem() {
		// Return an array containing...
		// A string representing the question: "13 + 2"
		// An integer representing the answer: 15
		var q_type = randomInt(3, 4);

		var operator = "";
		var first = 0;
		var second = 0;
		var answer = 0;

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
				operator = "*";
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
		var operator_str = first + " " + operator + " " + second;
		return [operator_str, answer];
	}

	console.log(generateProblem());

	function test() {
		console.log("test");
	}

	test();
});
