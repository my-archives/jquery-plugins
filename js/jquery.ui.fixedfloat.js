/**
 *  fixed floating for IE 6
 *  @author cfddream
 *  jquery.ui.fixedfloat.js
 *  requires: [jquery.ui.autoscroll.js]
 */
!function ($) {
    var settings = {},
        // 判断文档模型
        IE6 = $.browser.msie && $.browser.version === '6.0';

    if (IE6) {
        var WIN = $(window),
            ABS = 'absolute',
            boxModel = jQuery.support.boxModel,
            doc = boxModel ? document.documentElement : document.body;
    }

    // http://www.gunlaug.no/contents/wd_additions_15.html
    // http://msdn.microsoft.com/en-us/library/ms537634(VS.85).aspx
    // http://w3help.org/zh-cn/causes/BT9010
    // IE6 fixed floating
    function floating(ele, padding) {
        padding = padding || {};
        WIN.on('resize.ui load.ui', function () {
            ele.style.position = ABS;
            ele.style.setExpression('top', 'documentElement.scrollTop+' +
                (doc.clientHeight - ele.offsetHeight + padding.top) +
                '+"px"');
        });
    }

    $.fn.fixedFloat = function (options) {
        options = $.extend({}, settings, options);
        return this.each(function () {
            IE6 && floating(this, options.ie6Padding);
            $(this).autoScroll({
                onScroll: function (e, scroll, we) {
                    options.onFloat.call(this, e, scroll, we);
                }
            });
        });
    };

}(jQuery);
