jQuery('.codehilitetable').each ->
  $el = jQuery this
  $pre = $el.find('.code').find('pre')
  if ///\s*#!/usr/bin/osascript///.test $pre.text()
    $el.replaceWith $pre.attr('class', 'brush:applescript')

SyntaxHighlighter.all()
