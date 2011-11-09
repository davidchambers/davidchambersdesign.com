
jQuery(function($) {
  var $comments, $time, clearInterval, get, location, setInterval, trim;
  location = window.location, setInterval = window.setInterval, clearInterval = window.clearInterval;
  get = $.get, trim = $.trim;
  if (/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) {
    $(document.body).delegate('a', {
      touchstart: function() {
        return $(this).addClass('hover');
      },
      touchend: function() {
        return $(this).removeClass('hover');
      }
    });
  }
  $('h2[id],h3[id],h4[id]').each(function() {
    var id;
    id = this.id;
    if (id) {
      return $(this).addClass("" + id + " unidentified").prepend("<span id='" + id + "'>").append("<a href='#" + id + "'>¶</a>").attr('id', null);
    }
  });
  $('a[href^="#"]').click(function(event) {
    var abs, delta, hash, idx, intervalId, log, offset, positions, round, steps;
    hash = $(this).attr('href');
    if ($(hash).length === 1) {
      abs = Math.abs, log = Math.log, round = Math.round;
      offset = $(hash).offset().top;
      delta = offset - window.pageYOffset;
      steps = round(2 * log(abs(delta))) || 1;
      positions = (function() {
        var _results;
        _results = [];
        for (idx = 0; 0 <= steps ? idx <= steps : idx >= steps; 0 <= steps ? idx++ : idx--) {
          _results.push(round(offset - idx * (delta / steps)));
        }
        return _results;
      })();
      intervalId = setInterval(function() {
        var position;
        position = positions.pop();
        if (position != null) {
          return window.scrollTo(0, position);
        } else {
          location.hash = hash;
          return clearInterval(intervalId);
        }
      }, 20);
      return event.preventDefault();
    }
  });
  $('pre').children('code').each(function() {
    var $code, text;
    $code = $(this);
    text = trim($code.text());
    if (/^#!\/usr\/bin\/osascript\s/.test(text)) {
      return $code.parent().addClass('brush:applescript').text(text);
    } else if (!/^(\$|>{1,3}) /.test(text)) {
      return $code.addClass('prettyprint');
    }
  });
  prettyPrint();
  $time = $('time');
  $comments = $time.filter(':has(span)');
  $time.not($comments).localize();
  $comments.localize({
    escaped: true,
    format: '<span>%d %mmmm %yyyy</span> <span>%h.%MM\u2009%a</span>',
    periods: ['am', 'pm']
  });
  $('#nav').find('a[href="/flushcache/"]').click(function(event) {
    get(this.href, function() {
      return location.reload(true);
    });
    return event.preventDefault();
  });
  return $('textarea').each(function() {
    return Hashify.editor(this);
  });
});
