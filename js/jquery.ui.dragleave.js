!function ( $ ) {

  /**
   * Refer:
   *    http://dev.w3.org/html5/spec/dnd.html
   *    http://stackoverflow.com/questions/10253663/how-to-detect-the-dragleave-event-in-firefox-when-dragging-outside-the-window
   *    http://jsfiddle.net/robertc/HU6Mk/3/ chrome 失效
   * 
   *    可以结合 mouseenter/mouseleave; 也可以设置一层遮罩，避免子元素的触发
   */

  $.event.special.dragleave = {

    delegateType: 'dragleave',

    bindType: 'dragleave',

    handle: function (e) {

      var target = this,
          related = e.relatedTarget,
          handleObj = e.handleObj,
          inside = false,
          ret;

      if (related !== target) {

        if (related) {
          inside = $.contains(target, related);
        }

        if (!inside) {
          ret = handleObj.handler.apply(target, arguments);
          e.type = 'dragleave';
        }
      }

      return ret;
    }
  };

}( jQuery );
