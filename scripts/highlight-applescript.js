
jQuery('.codehilitetable').replaceWith(function() {
  return jQuery(this).find('.code').find('pre').attr('class', 'brush:applescript');
});

SyntaxHighlighter.all();
