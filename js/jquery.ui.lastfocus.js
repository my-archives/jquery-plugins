!function ( $ ) {
  // fixed Mozilla focus

  $.fn.lastfocus = $.browser.mozilla ?
    function () {
      var target = this[0]
        , l = target.value.length;
      target.focus();
      target.setSelectionRange(l, l);
    } :
    function () {
      this[0].focus();
    };

}( jQuery );
