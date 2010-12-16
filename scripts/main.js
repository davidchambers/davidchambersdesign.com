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


(function () {
    if (!Sizzle) return;
    function slide(event) {
        event = event || window.event;
        var delta, i, intervalId, n, positions,
            hash = this.getAttribute('href'),
            destination = document.getElementById(hash.substr(1)),
            pageYOffset = window.pageYOffset,
            y = parseInt(window.getComputedStyle(document.body, null).getPropertyValue('margin-top'), 10) || 0,
            e = destination;

        while (e) {
            y += e.offsetTop;
            e = e.offsetParent;
        }

        delta = y - pageYOffset;
        n = Math.round(Math.log(Math.abs(delta)) * 2) || 1;

        for (i = 0, positions = new Array(n); i < n;) {
            positions[i] = Math.round(pageYOffset + (delta / n) * ++i);
        }

        i = 0;
        intervalId = window.setInterval(function () {
            if (i < n) {
                window.scrollTo(0, positions[i++]);
            } else {
                window.location.hash = hash;
                window.clearInterval(intervalId);
            }
        }, 20);
        event.preventDefault();
    }
    var i, internalLinks = Sizzle('a[href^="#"]'), len, link;
    for (i = 0, len = internalLinks.length; i < len; i++) {
        link = internalLinks[i];
        if (link.addEventListener) link.addEventListener('click', slide, false);
        else if (link.attachEvent) link.attachEvent('onclick', slide);
    }
}());


(function () {
    if (typeof Sizzle != 'function') return;
    if (typeof prettyPrint != 'function') return;
    var blocks = Sizzle('pre>code', document.body), i, len;
    for (i = 0, len = blocks.length; i < len; i++) {
        blocks[i].className = 'prettyprint';
    }
    prettyPrint();
}());
