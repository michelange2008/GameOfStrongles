/*!
 * Notify - A light-weight yet customizable toast plugin for jQuery
 *
 * Copyright 2018, Mehdi Dehghani
 *
 * @author   Mehdi Dehghani (http://www.github.com/dehghani-mehdi)
 * @license  Licensed under MIT (https://github.com/digitalify/notify/blob/master/LICENSE)
 *
 */
;

// import '../scss/jquery.notify.scss';

(function ($, window, document, undefined) {
    const PLUGIN_NAME = 'notify',
        transitionEndEvent = 'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd',
        animationEndEvent = 'animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd',
        p = {};

    p[PLUGIN_NAME] = class {
        constructor(config) {
            this.config = $.extend(true, {}, $.fn.defaults, config);
            this.init();
        }

        init() {
            let $box = this.createHTML();

            this.show($box);
        }

        createHTML() {
            let $appended = $(this.config.wrapper).find('.notify');

            let $div = $appended.is('div') ? $appended : $('<div />', { class: `notify ${this.getPositionCssClass()} notify__${this.config.dir}` }),
                html = $('<textarea />').html(this.config.message).text(),
                width = this.getWidth(html),
                $innerDiv = $('<div />', { html: `<div style="width:${width > 230 ? 230 : width}px">${html}</div>` }),
                $inner = $('<div />', { class: `notify__box notify__${this.config.type}` }),
                $close = $('<i />', { class: 'notify__close', html: '&#10005;' });

            // append close button
            $innerDiv.prepend($close);

            if (this.config.autoClose) {
                $('<span />', {
                    class: 'notify__progress-bar',
                    css: {
                        '-webkit-animation-duration': Math.round(this.config.duration / 1000) + 's',
                        'animation-duration': Math.round(this.config.duration / 1000) + 's'
                    }
                }).appendTo($innerDiv);
            }

            $inner.append($innerDiv);

            // append box
            $div.append($inner);

            // bind click event on close button
            $close.on('click', (e) => this.dismiss($(e.currentTarget).parent().parent()));

            // append notify to the page (first time only)
            if (!$appended.is('div')) $div.appendTo($(this.config.wrapper));

            return $inner;
        }

        getWidth(s) {
            let $el = $('<span />', { css: { visibility: 'hidden' } }).html(s).appendTo($('body')),
                w = $el.width();
            $el.remove();

            return w + 5;
        }

        dismiss($box) {
            $box.removeClass('notify__show');
            $box.addClass('notify__hide');

            // after animation ends remove $notify from the DOM
            $box.on(animationEndEvent, (e) => {
                if (e.target !== $box[0]) return false;
                $box.off(e);
                $box.remove();

                if (typeof this.config.onClose === 'function') this.config.onClose.call($box);
            });
        }

        show($box) {
            $box.addClass('notify__show');

            if (this.config.autoClose) {
                setTimeout(() => this.dismiss($box), this.config.duration);
            }

            if (typeof this.config.onOpen === 'function') this.config.onOpen.call($box);
        }

        getPositionCssClass() {
            switch (this.config.position) {
                case 1:
                    return 'notify__top-left';
                case 2:
                    return 'notify__top-center';
                case 3:
                    return 'notify__top-right';
                case 4:
                    return 'notify__mid-left';
                case 5:
                    return 'notify__mid-right';
                case 6:
                    return 'notify__bottom-left';
                case 7:
                    return 'notify__bottom-center';
                case 8:
                    return 'notify__bottom-right';
                default:
                    return '';
            }
        }
    }

    $[PLUGIN_NAME] = function (options) {
        new p[PLUGIN_NAME](options);
    };

    $.fn.defaults = {
        wrapper: 'body',
        message: 'Your request submitted successfuly!',
        // success, info, error, warn
        type: 'success',
        // 1: top-left, 2: top-center, 3: top-right
        // 4: mid-left, 5: mid-right
        // 6: bottom-left, 7: bottom-center, 8: bottom-right
        position: 1,
        dir: 'ltr',
        autoClose: true,
        duration: 4000,
        onOpen: null,
        onClose: null
    };
})(jQuery, window, document);
