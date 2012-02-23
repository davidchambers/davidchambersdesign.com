jQuery('.codehilitetable').replaceWith ->
  $pre = jQuery(this).find('.code').find('pre')
  if ///\s*#!/usr/bin/osascript///.test $pre.text()
    $pre.attr('class', 'brush:applescript')
  $pre

SyntaxHighlighter.all()
