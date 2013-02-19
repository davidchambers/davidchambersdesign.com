{l,r,u,d} = require '../../../../lib/lo-res/src/dsl'

module.exports =
'width': 16
'height': 16
'paths': [
  'fill': '#963'
  'd': [
    'M 2,8'
    (d 2)(r 1)(d 3)(r 1)(d 1)(r 1)(d 1)(r 1)(d 1)(r 4)(u 1)(r 1) \
    (u 1)(r 1)(u 1)(r 1)(u 3)(r 1)(u 2)(l 12)
  ]
,
  'fill': '#edb'
  'd': [
    'M 3,4'
    (d 6)(r 1)(d 3)(r 1)(d 1)(r 1)(d 1)(r 4)(u 1)(r 1)(u 1)(r 1) \
    (u 3)(r 1)(u 6)(l 10)
  ]
,
  'fill': '#963'
  'd': [
    'M 5,8'
    (r 2)(d 1)(l 2)(u 1)
    'm 4,0'
    (r 2)(d 1)(l 2)(u 1)
    'm -2,3'
    (r 2)(d 1)(l 2)(u 1)
  ]
,
  'fill': '#432'
  'd': [
    'M 6,0'
    (r 4)(d 1)(r 2)(d 1)(r 1)(d 3)(r 1)(d 4)(l 1)(u 2)(l 1)(u 1) \
    (l 2)(u 1)(l 4)(d 1)(l 2)(d 1)(l 1)(d 2)(l 1)(u 4)(r 1)(u 3) \
    (r 1)(u 1)(r 2)(u 1)
  ]
,
  'fill': '#ccc'
  'fill-rule': 'evenodd'
  'd': [
    'M 6,1'
    (r 4)(d 4)(r 4)(u 1)(l 12)(d 1)(r 4)(u 4)
    'm -2,1'
    (r 8)(d 4)(r 2)(d 1)(l 1)(u 4)(l 10)(d 4)(l 1)(u 1)(r 2)(u 4)
  ]
]
