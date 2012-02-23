
jQuery('.codehilitetable').each(function() {
  var $el, $pre;
  $el = jQuery(this);
  $pre = $el.find('.code').find('pre');
  if (/\s*#!\/usr\/bin\/osascript/.test($pre.text())) {
    return $el.replaceWith($pre.attr('class', 'brush:applescript'));
  }
});

SyntaxHighlighter.all();
