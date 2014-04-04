(function() {

  var timer;
  var rate = 100;
  var mousePos;
  var output = [];
  var server = "http://127.0.0.1:4568";

  var action = {
    move: 'move',
    onclick: 'onclick',
    ondblclick: 'ondblclick',
    onmousedown: 'onmousedown',
    onmouseover: 'onmouseover',
    onmouseout: 'onmouseout',
    onmouseup: 'onmouseup'
  };

  var handler = {};

  handler.init = function (event) {
    event = event || window.event; // IE-ism
    mousePos = {
      x: event.clientX,
      y: event.clientY
    };
  };

  handler.action = function(name){
    console.log(name);
    if (mousePos) {
      output.push({a: name, x: mousePos.x, y: mousePos.y, t: Date.now()});
    }
  };

  var send = function(output){
    jQuery.ajax({
      type: "POST",
      url: server + '/keystrokes',
      data: JSON.stringify(output),
      contentType: 'application/json',
      success: function(data) {
        console.log('Ajax: Success');
      },
      error: function(data){
        console.log('Ajax: Failure');
      }
    });
  };

  window.onmousemove = handler.init;
  // document.onclick(function(){
  //   handler.action(action.onclick);
  // });
  // $(document).body.ondblclick = handler.action(action.ondblclick);
  // $(window).onmousedown = handler.action(action.onmousedown);
  // $(window).onmouseover = handler.action(action.onmouseover);
  // $(window).onmouseout = handler.action(action.onmouseout);
  // $(window).onmouseup = handler.action(action.onmouseup);

  $('.start').click(function(){
    timer = setInterval(function(){
      handler.action(action.move);
    }, rate);
  });

  $('.stop').click(function(){
    clearInterval(timer);
    console.log(output);
    send(output);
    output = [];
  });

})();