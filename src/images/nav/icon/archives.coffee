{l,r,u,d} = require '../../../../lib/lo-res/src/dsl'

module.exports =
'width': 16
'height': 16
'paths': [
  'fill': '#da5'
  'd': [
    'M 0,1'
    (r 16)(d 15)(l 16)(u 15)
  ]
,
  'fill': '#fff'
  'd': [
    'M 1,1'
    (r 14)(d 14)(l 14)(u 14)
  ]
,
  'fill': '#b00'
  'd': [
    'M 1,1'
    (r 2)(d 1)(r 1)(u 1)(r 2)(d 1)(r 1)(u 1)(r 2)(d 1)(r 1)(u 1) \
    (r 2)(d 1)(r 1)(u 1)(r 2)(d 3)(l 14)(u 3)
  ]
,
  'fill': '#333'
  'd': [
    'M 3,0'
    (r 1)(d 1)(l 1)(u 1)
    'm 3,0'
    (r 1)(d 1)(l 1)(u 1)
    'm 3,0'
    (r 1)(d 1)(l 1)(u 1)
    'm 3,0'
    (r 1)(d 1)(l 1)(u 1)
  ]
,
  'fill': '#000'
  'd': [
    'M 4,6'
    (r 4)(d 7)(l 4)(u 1)(r 3)(u 2)(l 3)(u 1)(r 3)(u 2)(l 3)(u 1)
    'm 6,0'
    (r 2)(d 7)(l 1)(u 6)(l 1)(u 1)
  ]
]
