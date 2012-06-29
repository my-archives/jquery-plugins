!function ( $ ) {
  // Firefox does not implement offsetX, offsetY

  // In Firefox, you can use e.layerX / e.layerY and css must set position property
  if (! $.browser.mozilla) return false;

  var originalFilter = $.event.mouseHooks.filter;

  $.event.mouseHooks.filter = function (event, original) {
    event = originalFilter(event, original);

    if (event.offsetX === undefined) {
      var offset = $(event.target).offset();
      event.offsetY = event.pageY - offset.top;
      event.offsetX = event.pageX - offset.left;
    }

    return event;
  };

}( jQuery );
