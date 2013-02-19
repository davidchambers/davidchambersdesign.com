jQuery ($) ->

  $mask = $('<div>').css backgroundColor: '#000'
  $transparent = $('<div>').click -> $divs.css(opacity: 0).hide().empty()
  $divs = $mask.add($transparent).css
    display   : 'none'
    position  : 'fixed'
    width     : '100%'
    height    : '100%'
    opacity   : 0
    zIndex    : 1000

  $(document.body)
    .prepend($divs)
    .on 'keydown', (event) ->
      if event.keyCode in [9, 13, 27] # tab, return, esc
        event.preventDefault()
        $transparent.click()
    .on 'click', 'a[href*="/lightbox/large/"]', (event) ->
      event.preventDefault()
      $mask.show().animate opacity: 0.66, =>
        $img = $('<img>').attr(src: @href).css
          margin    : '0 auto'
          maxWidth  : '90%'
          maxHeight : '90%'
          border    : '1px solid #ccc'
        $transparent.show().append($img).animate opacity: 1
        $img.css marginTop: ($(window).height() - $img.outerHeight()) / 2

  $('img[src*="/lightbox/"]').each ->
    src = @src.replace '/lightbox/', '/lightbox/large/'
    $('<img>').load(=> $(this).wrap $('<a>').attr href: src).attr src: src
