/*!
 * jQuery AutoColumnList Plugin
 * http://neolot.com/narabotki/autocolumnlist-jquery-plugin-dlya-razdeleniya-spiskov-na-kolonki
 * Copyright (c) 2011 Yury Pokhylko aka Neolot
 * Version: 1.0 (01/05/2011)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Requires: jQuery v1.3.2 or later
 */
(function($) {
    var defaults = {
        columns: 4,
        classname: 'column'
    };

    $.fn.autocolumnlist = function(params){
        var options = $.extend({}, defaults, options, params);
        var els = $(this).find('li');

        if (els.size() > 0) {
            var elCol = Math.ceil(els.size()/options.columns);
            var start = 0;
            var end = elCol;
            for (i=0; i<options.columns; i++) {
                els.slice(start, end).wrapAll('<div class="'+options.classname+'"/>');
                start = start+elCol;
                end = end+elCol;
            }
        }

        return this;
    };
})(jQuery);
