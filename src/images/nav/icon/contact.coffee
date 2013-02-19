{l,r,u,d} = require '../../../../lib/lo-res/src/dsl'

module.exports =
'width': 16
'height': 16
'paths': [
  'fill': '#963'
  'd': [
    'M 0,2'
    (r 16)(d 12)(l 16)(u 12)
  ]
,
  'fill': '#feb'
  'd': [
    'M 2,3'
    (r 12)(d 1)(r 1)(d 9)(l 14)(u 9)(r 1)(u 1)
  ]
,
  'fill': '#741'
  'd': [
    'M 2,4'
    (r 1)(d 2)(r 2)(d 2)(r 2)(d 2)(r 2)(u 2)(r 2)(u 2)(r 2)(u 2) \
    (r 1)(d 1)(l 2)(d 2)(l 2)(d 2)(l 4)(u 2)(l 2)(u 2)(l 2)(u 1)
  ]
,
  'fill': '#b85'
  'd': [
    'M 6,8'
    (l 1)(d 2)(l 2)(d 2)(l 2)(d 1)(r 1)(u 2)(r 2)(u 2)(r 2)(u 1)
    'm 4,0'
    (r 1)(d 2)(r 2)(d 2)(r 2)(d 1)(l 1)(u 2)(l 2)(u 2)(l 2)(u 1)
  ]
]
