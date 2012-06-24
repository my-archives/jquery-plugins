!function ( $ ) {
  // Firefox does not implement offsetX, OffsetY

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
