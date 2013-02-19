module Sass::Script::Functions
  def log2(number)
    assert_type number, :Number
    Sass::Script::Number.new Math.log2(number.value)
  end
  declare :log2, :args => [:number]
end
