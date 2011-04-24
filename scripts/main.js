jQuery(function ($) {

  // simulate `:hover`
  if (/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) {
    $('a')
      .live(
        'touchstart',
        function () {
          $(this).addClass('hover');
        }
      )
      .live(
        'touchend',
        function () {
          $(this).removeClass('hover');
        }
      );
  }

  // accommodate fixed-position header
  $('h2[id],h3[id],h4[id]')
    .each(
      function () {
        var id = this.id;
        if (id) {
          $(this)
            .attr('id', null)
            .addClass(id+' unidentified')
            .prepend('<span id='+id+'>')
            .append('<a href=#'+id+'>¶</a>');
        }
      }
    );

  // scrolling
  (function (undef) {
    $('a[href^="#"]')
      .click(
        function (event) {
          var
            delta, intervalId, n, offset,
            positions, round = Math.round,
            hash = $(this).attr('href'),
            $el = $(hash);

          if ($el.length === 1) {
            offset = $el.offset().top;
            delta = offset - window.pageYOffset;
            n = round(Math.log(Math.abs(delta)) * 2) || 1;

            $.each(
              positions = new Array(n),
              function (index) {
                positions[index] = round(offset - index*(delta/n));
              }
            );

            intervalId =
              window.setInterval(
                function () {
                  var position = positions.pop();
                  if (position !== undef) {
                    window.scrollTo(0, position);
                  } else {
                    window.location.hash = hash;
                    window.clearInterval(intervalId);
                  }
                },
                20
              );
            event.preventDefault();
          }
        }
      );
  }());

  // syntax highlighting
  $('pre>code')
    .each(
      function () {
        var
          $this = $(this),
          text = $.trim($this.text());

        if (/^#!\/usr\/bin\/osascript\s/.test(text)) {
          $this
            .parent()
              .addClass('brush:applescript')
              .text(text);
        } else {
          $this
            .addClass('prettyprint');
        }
      }
    );
  prettyPrint();

  // date and time localization
  (function () {
    var $comments = $('time>span+span').parent();
    $('time').not($comments).localize();
    $comments.localize({
      escaped: true,
      format: '<span>%d %mmmm %yyyy</span> <span>%h.%MM\u2009%a</span>',
      periods: ['am', 'pm']
    });
  }());

  // reload link
  $('#nav')
    .find('a[href="/flushcache/"]')
      .click(
        function (event) {
          $.get(
            this.href,
            function () {
              window.location.reload(true);
            }
          );
          event.preventDefault();
        }
      );

  $('textarea')
    .each(
      function () {
        Hashify.editor(this);
      }
    );

});
