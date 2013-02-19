{l,r,u,d} = require '../../../../lib/lo-res/src/dsl'

module.exports =
'width': 16
'height': 16
'paths': [
  'fill': '#27c'
  'd': [
    'M 0,0'
    (d 2)(r 1)(d 6)(r 1)(d 6)(r 1)(d 1)(r 2)(d 1)(r 6)(u 1)(r 2) \
    (u 1)(r 1)(u 6)(r 1)(u 6)(r 1)(u 2)(l 16)
  ]
,
  'fill': '#ee7'
  'd': [
    'M 4,1'
    (r 8)(d 7)(l 8)(u 7)
  ]
,
  'fill': '#a7a'
  'fill-rule': 'evenodd'
  'd': [
    'M 6,2'
    (r 1)(d 5)(r 2)(u 5)(r 1)(d 1)(l 4)(u 1)
    'm 0,2'
    (r 4)(d 2)(l 4)(u 2)
  ]
,
  'fill': '#fff'
  'opacity': 0.25
  'd': [
    'M 7,0'
    (r 2)(d 3)(l 2)(u 3)
  ]
]
