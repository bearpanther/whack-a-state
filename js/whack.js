require([
  "dojo/_base/array", 
  "dojo/_base/fx", 
  "dojo/dom", 
  "dojo/dom-attr", 
  "dojo/dom-class", 
  "dojo/dom-style", 
  "dojo/number", 
  "dojo/on", 
  "dojo/query", 
  "dojo/domReady!"
], function(
  array, fx, dom, domAttr, domClass, domStyle, number, on, query
) {
  var currentState; // used to store the states two letter abbreviation
  var state; // the element representing the state
  var stateChecker;
  var states = query("ul li");
  var indexes= array.map(states, function(state, idx) { return idx; });
  var hint;
  var meta = query(".meta")[0];

  // keep track of the score and the timer
  var right = 0;
  var tried = 0;
  var score = query(".score")[0];
  var timer = query(".timer")[0];
  var seconds = 0;
  var timerUpdate; // handle to setInterval used to make the timer run
  var timing = false;

  // colors for current, right and wrong
  var currentColor = "#5DADDD";
  var rightColor = "#66CA66";
  var wrongColor = "#CC4A4A";

  // make it easy to start typing
  var box = query(".wrapper input")[0];
  box.focus();

  // highligh a state
  animateState();

  stateChecker = on(box, "keyup", function(e) {
    if ( (e.keyCode || e.charCode) === 13 ) {
      if ( !timing ) {
        startTimer();
        timing = true;
      }
      tried = tried + 1;
      // check answer
      var state = query("li." + currentState)[0];
      if ( this.value.toLowerCase() === currentState ) {
        right = right + 1;
        // correct answer, make the state green
        domStyle.set(state, "color", rightColor);
        meta.innerHTML = "Yep.";
        this.value = "";
      } else {
        // wrong answer
        domStyle.set(state, "color", wrongColor);
        meta.innerHTML = "Nope.";
        this.value =="";
      }
      // reset the value
      this.value = "";
      // highlight a new state, if there are states left
      if ( indexes.length === 0 ) {
        // remove the event listener after going through all states
        stateChecker.remove();
        // console.log("removed evt listener");
        // stop the timer
        quit("Finished.");
      } else {
        // highlight another state
        animateState();
      }
      score.innerHTML = right + " / " + tried;
    }
  });

  // set up the timer
  // rudimentary...but good enough!
  function startTimer() {
    timerUpdate = setInterval(function() {
      seconds = seconds + 1;
      var minutes = parseInt(seconds / 60);
      timer.innerHTML = "" + minutes + ":" +
        number.format(seconds % 60, { pattern: "00" });
      
      // 5 minute max...
      if ( minutes === 5 ) {
        quit("Out of time. Try again.");
      }
    }, 1000);
  }

  function quit(message) {
    clearInterval(timerUpdate);
    domAttr.set(box, "disabled", true);
    meta.innerHTML = message;
  }

  function animateState() {
    // new random number
    var index = parseInt(Math.random() * indexes.length);
    // pull the index for a state out of the indexes array
    var stateIndex = indexes.splice(index, 1)[0];
    // get the state element
    state = states[stateIndex];
    // keep track of the current state
    currentState = state.dataset.state;
    // animate the state
    // fx.anim args:  node, properties, duration, easing, onEnd, delay
    fx.anim(state, { color: currentColor }, 100); // blue
  }

});
