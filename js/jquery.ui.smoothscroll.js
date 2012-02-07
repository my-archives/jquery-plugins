/**
 *  平滑滚动
 *  暂时是考虑垂直方向
 *  @author cfddream
 *  jquery.ui.smoothscroll.js
 *  https://github.com/terkel/jquery-smoothscroll
 */
!function ($) {
    var HD = $('html, body'),
        WIN = $(window),
        DOC = $(document),
        NAME = 'data-ui-smoothscroll',
        DC = '[' + NAME + ']',
        TARGETS = ['header', 'footer'],
        SCROLL_OPTIONS = 'smoothscroll-options',
        SCROLLING = 'ui-scrolling',
        EMPTY = function () {},
        settings = {
            duration: 400,
            easing: 'swing',
            paddingTop: 0,
            hash: 'header',
            complete: EMPTY
        };

    $.fn.smoothScroll = function (options) {
        options = $.extend({}, settings, options);
        return this.each(function () {
            var $ele = $(this);
            $ele.attr(NAME, options.hash);
            $ele.data(SCROLL_OPTIONS, options);
        });
    };

    // 防止调用2次
    function callback(options, hash, ele) {
        var isCalled = 0;
        return function () {
            if (!isCalled++) return;
            options.complete.call(ele);
            $(ele).removeClass(SCROLLING);
            if (hash) window.location.hash = options.hash;
            isCalled--;
        };
    }

    $(function () {
        DOC.delegate(DC, 'click.ui', function (e) {
            var $ele = $(this);

            if ($ele.hasClass(SCROLLING)) {
                return false;
            }

            var opts = $ele.data(SCROLL_OPTIONS),
                target, paddingTop,
                targetOffset,
                scrollTop = WIN.scrollTop(),
                T1, T2, hash;

            !opts && ($ele.data(SCROLL_OPTIONS, opts = $.extend({}, settings, {hash: $ele.data('ui-smoothscroll')})));
            target = $ele.data('ui-smoothscroll');
            paddingTop = opts.paddingTop;
            T1 = target === TARGETS[0];
            T2 = target === TARGETS[1];

            if (T1 || T2) {
                if (T1 && (scrollTop - paddingTop)) {
                    targetOffset = paddingTop;
                } else if (T2) {
                    targetOffset = (DOC.height() - WIN.height() - paddingTop) || -1;
                }
            } else {
                targetOffset = $(target).offset().top + paddingTop;
                hash = true; 
            }

            e.preventDefault();

            if (typeof(targetOffset) === 'number') {
                $ele.addClass(SCROLLING);
                HD.stop(1, 1)
                    .animate({scrollTop: targetOffset},
                            opts.duration,
                            opts.easing,
                            callback(opts, hash, this));
            }
        });
    });

}(jQuery);
