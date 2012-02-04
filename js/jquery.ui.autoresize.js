/**
 *  textarea 自动调整高度
 *  textarea auto-resize
 *  @author cfddream
 *  jquery.ui.autoresize.js
 *  https://github.com/jackmoore/autosize
 *  https://github.com/padolsey/jQuery.fn.autoResize
 *  http://help.dottoro.com/
 *  notes: no animate
 */
!function ($) {
    var BODY = $(document.body),
        IE = $.browser.msie,
        TEXTAREA = 'textarea',
        UITEXT = 'data-ui-textarea="textarea"',
        CLONE = '<textarea ' + UITEXT + '></textarea>',
        CLONE_CSS = {
            position: 'absolute',
            overflow: 'hidden',
            height: 0,
            top: -9999,
            left: -9999,
            wordWrap: 'break-word'
        },
        COPY_CSS = [
            'lineHeight', 'textDecoration', 'letterSpacing',
            'fontSize', 'fontFamily', 'fontStyle', 'fontWeight',
            'textTransform', 'textAlign', 'direction', 'wordSpacing', 'fontSizeAdjust',
            'paddingTop', 'paddingLeft', 'paddingBottom', 'paddingRight', 'width' 
        ],
        $CLONE = null,
        settings = {
            minHeight: 'origin',
            maxHeight: '',
            minWidth: 'origin',
            maxWidth: ''
        };

    function AutoResize($ele, options) {
        this.$ele = $ele;
        this.options = options;
        this._init();
    }

    AutoResize.prototype = {
        _init: function () {
            this._render();
            this._bind();
        },
        _render: function () {
            var opts = this.options,
                value = this.$ele.val();

            this.lineHeight = this.$ele.css('line-height');
            this.$ele.val('');

            var height = this.$ele.height(),
                width = this.$ele.width(),
                scroll = this.$ele.prop('scrollHeight');

            if (opts.minHeight === 'origin') {
                opts.minHeight = height;
            }

            if (opts.minWidth === 'origin') {
                opts.minWidth = width;
            }

            this.$ele.data('scrollOfset', scroll > height ? (scroll - height) : 0);
            this.$ele.data('prevValue', '');
            this.$ele.data('prevScrollTop', 0);
            this.$ele.data('prevHeight', opts.minHeight);
            this.$ele.data('minHeight', opts.minHeight);
            this.$ele.data('maxHeight', opts.maxHeight);

            this.$ele.css({
                resize: 'none',
                overflowY: 'hidden'
            });

            this.$ele.val(value);
        },
        _bind: function() {
            var that = this;
            // paste/cut input keyup keyup
            this.$ele.bind('focus.autoresize', function (e) {
                that.copyCss();
                resize.call(this, e);
            });

            this.$ele.bind('keyup.autoresize', resize);
            this.$ele.bind('change.autoresize', resize);
            this.$ele.bind('paste.autoresize', resize);     // 粘贴
            this.$ele.bind('input.autoresize', resize);     // 输入
            this.$ele.bind('cut.autoresize', resize);       // 剪切

            // IE9 has oninput, support IE6~8
            if (IE && !('oninput' in this.$ele[0])) {
                if (this.lineHeight === 'normal') {
                    this.lineHeight = 14;
                }
                this.$ele.unbind('input.autoresize');
                this.$ele[0].onpropertyechange = resize;
                this.$ele.bind('keydown.autoresize', function (e) {
                    if ((!e.ctrlKey && e.keyCode === 13) 
                        || (!e.altKey && e.keyCode === 13)) {
                        var height = $(this).height();
                        $(this).height(height + that.lineHeight);
                    }
                });
            }

        },
        copyCss: function () {
            var i = 0, l = COPY_CSS.length, k;
            for (; i < l; i++) {
                k = COPY_CSS[i];
                $CLONE[0].style[k] = this.$ele.css(k);
            }
        },
        destory: function () {
            this.$ele.unbind('.autoresize');
            this.$ele.remove();
            this.$ele = null;
            $CLONE = null;
        }
    };

    function resize(e) {
        var $ele = $(this),
            value = $ele.val(),
            prevValue = $ele.data('prevValue');

        if (value === prevValue) return;
        $ele.data('prevValue', value);

        $CLONE.height(0).val(value).scrollTop(10000);

        var scrollTop = $CLONE[0].scrollTop,
            prevScrollTop = $ele.data('prevScrollTop');

        if (prevScrollTop === scrollTop) return;
        $ele.data('prevScrollTop', scrollTop);

        var minHeight = $ele.data('minHeight'),
            maxHeight = $ele.data('maxHeight');
        if (scrollTop <= minHeight) {
            scrollTop = minHeight;
        } else if (maxHeight && scrollTop >= maxHeight) {
            $ele.css('overflowY', '');
            scrollTop = maxHeight;
        } else {
            if ($ele.css('overflowY') === 'auto') {
                $ele.css('overflowY', 'hidden');
            }
            scrollTop = $CLONE[0].scrollHeight;
        }

        var scrollOfset = $ele.data('scrollOfset');
        $ele.height(scrollTop - scrollOfset);
    }

    $.fn.autoResize = function (options) {
        if (!$CLONE) {
            $CLONE = $(CLONE).css(CLONE_CSS).attr('tabIndex', '-1');
            BODY.append($CLONE);
        }
        options = $.extend({}, settings, options);
        return this.filter(TEXTAREA).each(function () {
            $(this).data('autoresize', new AutoResize($(this), options));
        });
    };

}(jQuery);
