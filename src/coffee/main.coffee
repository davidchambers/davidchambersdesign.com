jQuery ($) ->

  {location, setInterval, clearInterval} = window
  {get, trim} = $

  # simulate `:hover`
  if /(iPhone|iPod|iPad)/i.test navigator.userAgent
    $(document.body).on 'touchstart touchend', 'a', (event) ->
      $(this).toggleClass('hover', event.type is 'touchstart')

  # accommodate fixed-position header
  $('h2[id],h3[id],h4[id]').each ->
    return unless @id
    $(this)
      .addClass("#{@id} unidentified")
      .prepend("<span id='#{@id}'>")
      .append("<a href='##{@id}'>¶</a>")
      .attr('id', null)

  # scrolling
  $('a[href^="#"]').click (event) ->
    hash = $(this).attr 'href'
    if $(hash).length is 1
      {abs, log, round} = Math
      offset = $(hash).offset().top
      delta = offset - window.pageYOffset
      steps = round(2 * log abs delta) or 1
      positions = (round offset - idx * (delta / steps) for idx in [0..steps])
      intervalId = setInterval ->
        position = positions.pop()
        if position?
          window.scrollTo 0, position
        else
          location.hash = hash
          clearInterval intervalId
      , 20
      event.preventDefault()

  # syntax highlighting
  $('pre').children('code').each ->
    $code = $ this
    text = trim $code.text()
    if /^#!\/usr\/bin\/osascript\s/.test text
      $code.parent().addClass('brush:applescript').text text

  # date and time localization
  $time = $ 'time'
  $comments = $time.filter ':has(span)'
  $time.not($comments).localize()
  $comments.localize
    escaped: yes
    format: '<span>%d %mmmm %yyyy</span> <span>%h.%MM\u2009%a</span>'
    periods: ['am', 'pm']

  # reload link
  $('#nav').find('a[href="/flushcache/"]').click (event) ->
    get @href, -> location.reload yes
    event.preventDefault()

  $('textarea').each -> Hashify.editor this
