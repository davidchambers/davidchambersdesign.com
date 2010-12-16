(function ($) {
    if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
        var $a = $('a').live('touchstart', function () { $(this).addClass('hover'); }).live('touchend', function () { $a.removeClass('hover'); });
    }
}(jQuery));


// accommodate fixed-position header
(function ($, id) {
    $.each($('h2[id],h3[id],h4[id]'), function () {
        (id = this.id) && $(this).attr('id', null).addClass(id+' unidentified').prepend('<span id='+id+'>').append('<a href=#'+id+'>\u00B6</a>');
    });
}(jQuery));


(function ($) {
    $('a[href^="#"]').click(function (event) {
        event.preventDefault();
        var delta, intervalId, n, offset,
            positions, round = Math.round,
            hash = $(this).attr('href'),
            $el = $(hash);

        if ($el.length != 1) return;

        offset = $el.offset().top;
        delta = offset - window.pageYOffset;
        n = round(Math.log(Math.abs(delta)) * 2) || 1;

        $.each(positions = new Array(n), function (index) {
            positions[index] = round(offset - index*(delta/n));
        });

        intervalId = window.setInterval(function () {
            var position = positions.pop();
            if (typeof position != 'undefined') {
                window.scrollTo(0, position);
            } else {
                window.location.hash = hash;
                window.clearInterval(intervalId);
            }
        }, 20);
    });
}(jQuery));


(function ($) {
    $('pre>code').addClass('prettyprint');
    prettyPrint();
}(jQuery));
