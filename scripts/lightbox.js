
jQuery(function($) {
  var $divs, $mask, $transparent;
  $mask = $('<div>').css({
    backgroundColor: '#000'
  });
  $transparent = $('<div>').click(function() {
    return $divs.css({
      opacity: 0
    }).hide().empty();
  });
  $divs = $mask.add($transparent).css({
    display: 'none',
    position: 'fixed',
    width: '100%',
    height: '100%',
    opacity: 0,
    zIndex: 1000
  });
  $(document.body).prepend($divs).on('keydown', function(event) {
    var _ref;
    if ((_ref = event.keyCode) === 9 || _ref === 13 || _ref === 27) {
      event.preventDefault();
      return $transparent.click();
    }
  }).on('click', 'a[href*="/lightbox/large/"]', function(event) {
    var _this = this;
    event.preventDefault();
    return $mask.show().animate({
      opacity: 0.66
    }, function() {
      var $img;
      $img = $('<img>').attr({
        src: _this.href
      }).css({
        margin: '0 auto',
        maxWidth: '90%',
        maxHeight: '90%',
        border: '1px solid #ccc'
      });
      $transparent.show().append($img).animate({
        opacity: 1
      });
      return $img.css({
        marginTop: ($(window).height() - $img.outerHeight()) / 2
      });
    });
  });
  return $('img[src*="/lightbox/"]').each(function() {
    var src,
      _this = this;
    src = this.src.replace('/lightbox/', '/lightbox/large/');
    return $('<img>').load(function() {
      return $(_this).wrap($('<a>').attr({
        href: src
      }));
    }).attr({
      src: src
    });
  });
});
