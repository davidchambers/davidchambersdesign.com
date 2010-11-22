(function () {
    function removeClassName(element, className) {
        var classNames = element.className.split(' '), i = classNames.length;
        while (i--) if (!classNames[i] || classNames[i] == 'hover') classNames.splice(i, 1);
        return classNames.join(' ');
    }
    if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
        if (!Sizzle) return;
        var i, len, node, nodes = Sizzle('a');
        for (i = 0, len = nodes.length; i < len; i++) {
            node = nodes[i];
            node.addEventListener('touchstart', function () {
                this.className = removeClassName(this, 'hover') + ' hover';
            }, false);
            node.addEventListener('touchend', function () {
                this.className = removeClassName(this, 'hover');
            }, false);
        }
    }
}());


// accommodate fixed-position header
(function () {
    if (!Sizzle) return;
    var a, i, id, len, node, nodes = [], span;
    Sizzle('h2[id]', document.body, nodes);
    Sizzle('h3[id]', document.body, nodes);
    Sizzle('h4[id]', document.body, nodes);

    for (i = 0, len = nodes.length; i < len; i++) {
        node = nodes[i];
        id = node.id;
        node.id = null;
        node.className += node.className ? ' ' + id + ' unidentified' : id + ' unidentified';

        span = document.createElement('span');
        span.id = id;
        node.insertBefore(span, node.firstChild);

        a = document.createElement('a');
        a.href = '#' + id;
        a.appendChild(document.createTextNode('\u00B6')); // pilcrow
        node.appendChild(a);
    }
}());


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
