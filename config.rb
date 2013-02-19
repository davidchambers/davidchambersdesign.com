require './src/sass-extensions/logarithms'

images_dir = 'src/images'

if ENV['env'] == 'dev'
  output_style = :expanded
  line_comments = true
else
  output_style = :compressed
  line_comments = false
end
preferred_syntax = :sass

Sass::Script::Number.precision = 3
