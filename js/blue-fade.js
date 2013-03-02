require([
  "dojo/_base/array", 
  "dojo/_base/fx", 
  "dojo/dom", 
  "dojo/on", 
  "dojo/query", 
  "dojo/domReady!"
], function(
  array, fx, dom, on, query
) {
  var stateTimer;
  var states = query("ul li");
  var indexes= array.map(states, function(state, idx) { return idx; });

  function animateState() {
    // new random number
    var index = parseInt(Math.random() * indexes.length);
    // pull the index for a state out of the indexes array
    var stateIndex = indexes.splice(index, 1)[0];
    // get the state element
    var state = states[stateIndex];
    // animate the state
    // fx.anim args:  node, properties, duration, easing, onEnd, delay
    fx.anim(state, { color: "#2ba6cb" }, 100);
    // once all indexes are used, clear the timer
    if ( indexes.length === 0 ) {
      clearInterval(stateTimer);
      // console.log("\nanimated all states!\n")
    }
  }

  // animate a state every x number of milliseconds
  stateTimer = setInterval(animateState, 100);
});
