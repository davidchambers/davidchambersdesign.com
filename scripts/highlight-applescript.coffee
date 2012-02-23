jQuery('.codehilitetable').replaceWith ->
  jQuery(this).find('.code').find('pre').attr('class', 'brush:applescript')

SyntaxHighlighter.all()
