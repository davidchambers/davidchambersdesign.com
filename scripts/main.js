jQuery(function ($) {

  // simulate `:hover`
  (function () {
    if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
      var $a = $('a').live('touchstart', function () { $(this).addClass('hover'); }).live('touchend', function () { $a.removeClass('hover'); });
    }
  }());

  // accommodate fixed-position header
  (function (id) {
    $.each($('h2[id],h3[id],h4[id]'), function () {
      (id = this.id) && $(this).attr('id', null).addClass(id+' unidentified').prepend('<span id='+id+'>').append('<a href=#'+id+'>\u00B6</a>');
    });
  }());

  // scrolling
  (function () {
    $('a[href^="#"]').click(function (event) {
      event.preventDefault();
      var
        delta, intervalId, n, offset,
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
  }());

  // syntax highlighting
  $('pre>code').addClass('prettyprint');
  prettyPrint();

  // reload link
  $('#nav').find('a[href="/flushcache/"]').click(function (event) {
    event.preventDefault();
    $.get(this.href, function () {
      window.location.reload(true);
    });
  });

});
