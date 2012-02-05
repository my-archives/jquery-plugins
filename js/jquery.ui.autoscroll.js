/**
 *  window 滚动
 *  auto scroll
 *  @author cfddream
 *  jquery.ui.autoscroll.js
 */
!function ($) {
    var WIN = $(window),
        settings = {},
        list = [],
        SCROLL_OPTIONS = 'scroll-options',
        EVENT_TYPE = 'autoscroll.ui';

    $.fn.autoScroll = function (options) {
        options = $.extend({}, settings, options);
        return this.each(function () {
            var $ele = $(this);
            $ele.data(SCROLL_OPTIONS, options);
            options.onScroll && $ele.on(EVENT_TYPE, options.onScroll);
            list.push($ele);
        });
    };

    WIN.on('scroll.ui', function (e) {
        var scrollTop = WIN.scrollTop(),
            scrollLeft = WIN.scrollLeft(),
            i = 0, l = list.length,
            $ele, onScroll;

        for (; i < l; i++) {
            $ele = list[i];
            onScroll = $ele.data(SCROLL_OPTIONS).onScroll;
            onScroll && $ele.triggerHandler(EVENT_TYPE, [
                {
                    top: scrollTop,
                    left: scrollLeft
                },
                e
            ]);
        }
    });

}(jQuery);
