require([
  "dojo/_base/array", 
  "dojo/_base/fx", 
  "dojo/dom", 
  "dojo/dom-style", 
  "dojo/on", 
  "dojo/query", 
  "dojo/domReady!"
], function(
  array, fx, dom, domStyle, on, query
) {
  var currentState; // used to store the states two letter abbreviation
  var state; // the element representing the state
  var stateChecker;
  var states = query("ul li");
  var indexes= array.map(states, function(state, idx) { return idx; });
  var hint;
  var meta = query(".meta")[0];
  var box = query(".wrapper input")[0];
  // make it easy to start typing
  box.focus();

  // highligh a state
  animateState();

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
    fx.anim(state, { color: "#5DADDD" }, 100); // blue
  }

  stateChecker = on(box, "keyup", function(e) {
    clearTimeout(hint);
    // console.log("box key up: ", e, e.value, this.value);
    // check the answer
    if ( this.value.toLowerCase() === currentState ) {
      meta.innerHTML = "YEP.";
      // correct answer, make the state green
      domStyle.set(state, "color", "#66CA66");
      this.value = "";
      // remove the event listener after going through all states
      if ( indexes.length === 0 ) {
        stateChecker.remove();
        meta.innerHTML = "Finished. Well done.";
        console.log("removed evt listener");
      } else {
        // highlight another state
        animateState();
      }
      return;
    }
    if ( this.value.length === 1 ) {
      meta.innerHTML = "";
      return;
    }
    if ( this.value.length >= 2 ) {
      meta.innerHTML = "Nope.";
      return;
    }
  });

  hint = setTimeout(function() {
    meta.innerHTML = "Hey! Let's go! Type \"" + currentState.toUpperCase() + "\" in the box.<br><br>" + meta.innerHTML;
  }, 5000)
});
