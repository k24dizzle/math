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
  var secondsLeft = 40;

  var hardestQuestion = null; // question that took the most amount of time
  var easiestQuestion = null; // question that took the least amount of time
  var questionTime = Date.now();;
  var questionTimes = [];

  $('#answer').on('input', function() { 
      var val = parseInt($(this).val()); // get the current value of the input field.
      console.log(val + " vs. " + answer);
      if (val === answer) {
        // question correct
        var elapsedTime = (Date.now() - questionTime) / 1000.0;
        elapsedTime = Math.round(elapsedTime * 100) / 100;
        elapsedTime = elapsedTime.toFixed(2);
        questionTime = Date.now(); // reset the time

        var questionDuration = {
          "question": [$("#question").html(), answer],
          "time": elapsedTime
        };
        questionTimes.push(questionDuration);

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

        // post info in database
        $.ajax({
          type: "POST",
          url: "/result",
          data: {
            "score": score,
            // "time_finished": Date.now(),
          },
          success: function(data) {
            $("#percentile").html("Percentile: " + data + "%")
          }
        });

        // TODO: gather past results and store them?
        // For now the user has an option to refresh
        drawChart(questionTimes);
      } else {
        timer();
      }
    }, 1000);
  }

  function drawChart(data) {
    // inspired by: https://bl.ocks.org/zanarmstrong/dc73d339a0f921d638ac
    var margin = {top: 20, right: 20, bottom: 30, left: 20},
        width = 960 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;

    var svg = d3.select("#chart").append("svg")
        .attr("id", "#timeChart")
        // .attr("width", width + margin.left + margin.right)
        // .attr("height", height + margin.top + margin.bottom)
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 960 200")
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .05);

    var y = d3.scale.linear().range([height, 0]);

    // var data = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];
    x.domain(d3.range(data.length));
    y.domain([0, d3.max(data, function(d) { return d.time; })]);
    
    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
        return d.question[0] + " " + d.question[1] + "<br>" + d.time + "s";
      })

    svg.call(tip);

    svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d, i) { return x(i); })
        .attr("width", x.rangeBand())
        .attr("y", function(d, i) { return y(d.time); })
        .attr("height", function(d) { return height - y(d.time); })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
  }

  timer();
});
