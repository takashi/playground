var csp = require("js-csp");
var el = document.getElementById("display");
function show(text) {
  el.textContent = text;
  console.log(text);
}
function noOp() {};
function firehose(element, eventName) {
  var ch = csp.chan(csp.buffers.dropping(1));
  element.addEventListener(eventName, function(event) {
    csp.putAsync(ch, event, noOp);
  });
  return ch;
}
var moves = firehose(document.body, "mousemove");
csp.go(function*() {
  for (;;) {
    var event = yield csp.take(moves);
    show(event.x + ":" + event.y);
    for (;;) {
      var result = yield csp.alts([moves, csp.timeout(50)]);
      var value = result.value;
      if (value === csp.CLOSED) {
        show("STOP");
        break;
      }
      event = value;
      show(event.x + ":" + event.y);
    }
  }
});
