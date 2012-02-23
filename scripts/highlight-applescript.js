
jQuery('.codehilitetable').replaceWith(function() {
  var $pre;
  $pre = jQuery(this).find('.code').find('pre');
  if (/\s*#!\/usr\/bin\/osascript/.test($pre.text())) {
    $pre.attr('class', 'brush:applescript');
  }
  return $pre;
});

SyntaxHighlighter.all();
