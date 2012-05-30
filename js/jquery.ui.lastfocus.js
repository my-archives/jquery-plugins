!function ( $ ) {
  // fixed Mozilla focus

  $.fn.lastfocus = $.browser.mozilla ?
    function () {
      if (!this[0]) return;
      var target = this[0]
        , l = target.value.length;
      target.focus();
      target.setSelectionRange(l, l);
    } :
    function () {
      if (!this[0]) return;
      this[0].focus();
    };

}( jQuery );
