import {
  text,
  a,
  a$0027,
  article,
  article$0027,
  aside,
  aside$0027,
  b,
  blockquote,
  blockquote$0027,
  body$0027,
  code,
  code$0027,
  dd,
  dd$0027,
  del,
  del$0027,
  div,
  dl,
  dl$0027,
  dt,
  dt$0027,
  em,
  em$0027,
  embed,
  footer,
  footer$0027,
  h1,
  h1$0027,
  h2,
  h2$0027,
  h3,
  h3$0027,
  h4,
  h4$0027,
  h5,
  h5$0027,
  h6,
  h6$0027,
  head,
  head$0027,
  header,
  header$0027,
  hr,
  hr$0027,
  html,
  html$0027,
  i,
  i$0027,
  img,
  ins,
  ins$0027,
  li,
  li$0027,
  linearGradient,
  link,
  mask,
  meta,
  nav,
  nav$0027,
  object,
  ol,
  ol$0027,
  p,
  p$0027,
  param,
  path,
  pre,
  pre$0027,
  rect,
  script,
  span,
  stop,
  strong,
  strong$0027,
  svg,
  time,
  title,
  title$0027,
  ul,
  ul$0027,
  var_,
  var$0027,
  video
} from '../elements.js';
import { code$002Dblock } from '../components.js';
import datetime from '../datetime.js';
const excerpt = [
  p([
    'Yesterday I used three things for the first time: ',
    a('http://sass-lang.com/')(['Sass']),
    ', ',
    a('http://compass-style.org/')(['Compass']),
    ', and Ruby.\n    To summarize:'
  ]),
  ul([
    li(['I \u2665 Sass']),
    li(['I \u2665 Compass']),
    li(['I \u2665 Ruby'])
  ]),
  p([
    'One\'s own site is a great place to play with new\n    (or in this case, not so new) web technologies.\n    I decided to get stuck in and manually convert the ',
    a('https://bitbucket.org/davidchambers/dcd-static/src/872e932b4941/styles/screen.css')(['1200 line style sheet']),
    ' from CSS to something a bit\n    more awesome. This post documents the most interesting\n    portion of that transformation, which involved this site\'s ',
    a('/archives/')(['archives']),
    ' styles.'
  ])
];
const body = [
  ...excerpt,
  h3(['Original CSS']),
  code$002Dblock('css')(`ol.archives {
  margin: 0 0 0 -21px;
  list-style: none;
}

ol.archives li h2 {
  margin: 1.75em 0 0 21px;
  padding: 0;
  font: bold 1em/1.75 "Lucida Grande", ..., sans-serif;
  color: #93a1a1;
}

ol.archives li ol {
  margin: 0;
  list-style: none;
}

ol.archives time {
  display: block;
  float: left;
  margin: 0.167em 0.5em 0 0;
  width: 16px;
  height: 16px;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUg
    AAALAAAACICAYAAABHnmGeAAADxUlEQVR42u3d0W3bQBCEYTFISS4hLThFOiU4rT
    itnF9iwBBM2yR3j3u87wcE6EXjIz1YDimOuLTWbsCo/LALwMAAAwMMDAYGGBhgYI
    CBwcAAAwMMDDAwGBhgYICBwcAAAwMMDDAwGHgSHh4e2pb39HL1dtFam+r18vTYnm
    +39ny7tdbapvcvT4+NXqze0dfUE/jvsmx6Ty9XT4TAdPyccaN/7fwtjH9/ftNL0D
    OBYQLjdlv+57WIXyta7rLfUc0MvTeN9++rrI+Bd16RWYJOOt7/AyM0o/Wy9l9vRA
    iIEPj6kFpNL3uNIsRFIkmGVsVIclbEESEgQiD/kFr1xO3s9TFw0mE/OgNmZsoI7b
    N+KF2EgAgxGtFfadI7Mbp4RgZGRoQAAwMMDFQzsI4YveE6cTpi9C7TidMRo6cTB3
    xCyhcZOmL0tuiZwDCBsxmhI1ZR776nF6G7phmpFbUfS03g92ePlbTuNSvpffT5o7
    r3n43Wit6PIgREiOgYUfEmohF6bNXpvc1dDbyWk6oQub4RavDZ+1GEAKpGiKsf/j
    K3daT9mD2Nuxl4tk5XVqU+q7MXdSWi97mNCAER4h4dMXrd4opOHEZGhAADAwwMVD
    Owjhg9nTh6OnE6cfRG0JOBMR06cfRO1zOBYQJnEd2Z+kjvyPPOeqyP3sAZOLoz1e
    OusSNrzNbL2H+V9EQIiBA9IkVlzegbsnUBL2TgGZ93pgsoQgDXjRCzRZzK67tkrT
    66M7WmEXEmHb0+2ytCAH0nsI4YvW7xRycOIyNCgIEBBgaqGVhHjJ5OHD2dOJ04ei
    PoycCYDp04eqfrmcAwgTNY60cd6U19pRmptXV9PfX29ACrb285A392c/Pem6jXNF
    troVpr666gl/n/OFNPhIAIkRkhqmmuae39G7309mp+V29vhDiqV87AWYvPeoBKxN
    9Yq5nvNd6IekcioggBESLrkB91UhJ5ePrO+vZe2YiYQj0q/hnr69WN63YVIioCfP
    bZrbo94kOG3l7t6tsrQkCEiEBHjF4vdOIwNCIEGBhgYKCagXXEauldEp04nbORXz
    pxE+mJEEAxdOIm0DOBgZkm8Bsjd84q6H1Hc/ZvUk/pxGV0xPbcGlhd76t9uEx+Ai
    dCwATecvjL1MvsiJ21vVmaDLzzEJipF3GIzow40TEMIgRM4G2HwMzHtkZU1492xK
    Ijialb6CpERMQYtcNWpQMoQgAzTGAdsVp6V0YnDiIEwMAAA4OBAQYGGBhgYDAwwM
    AAAwMMDAYGGBhgYDAwwMAAAwMMDAYGRuEVbcTUMFk81KcAAAAASUVORK5CYII=);
  background-repeat: no-repeat;
  line-height: 10;
  overflow: hidden;
}

ol.archives time[datetime*="01T"] { background-position:  -60px  -20px; }
ol.archives time[datetime*="02T"] { background-position:  -80px  -20px; }
ol.archives time[datetime*="03T"] { background-position: -100px  -20px; }
ol.archives time[datetime*="04T"] { background-position: -120px  -20px; }
ol.archives time[datetime*="05T"] { background-position: -140px  -20px; }

ol.archives time[datetime*="06T"] { background-position:  -20px  -40px; }
ol.archives time[datetime*="07T"] { background-position:  -40px  -40px; }
ol.archives time[datetime*="08T"] { background-position:  -60px  -40px; }
ol.archives time[datetime*="09T"] { background-position:  -80px  -40px; }
ol.archives time[datetime*="10T"] { background-position: -100px  -40px; }
ol.archives time[datetime*="11T"] { background-position: -120px  -40px; }
ol.archives time[datetime*="12T"] { background-position: -140px  -40px; }

ol.archives time[datetime*="13T"] { background-position:  -20px  -60px; }
ol.archives time[datetime*="14T"] { background-position:  -40px  -60px; }
ol.archives time[datetime*="15T"] { background-position:  -60px  -60px; }
ol.archives time[datetime*="16T"] { background-position:  -80px  -60px; }
ol.archives time[datetime*="17T"] { background-position: -100px  -60px; }
ol.archives time[datetime*="18T"] { background-position: -120px  -60px; }
ol.archives time[datetime*="19T"] { background-position: -140px  -60px; }

ol.archives time[datetime*="20T"] { background-position:  -20px  -80px; }
ol.archives time[datetime*="21T"] { background-position:  -40px  -80px; }
ol.archives time[datetime*="22T"] { background-position:  -60px  -80px; }
ol.archives time[datetime*="23T"] { background-position:  -80px  -80px; }
ol.archives time[datetime*="24T"] { background-position: -100px  -80px; }
ol.archives time[datetime*="25T"] { background-position: -120px  -80px; }
ol.archives time[datetime*="26T"] { background-position: -140px  -80px; }

ol.archives time[datetime*="27T"] { background-position:  -20px -100px; }
ol.archives time[datetime*="28T"] { background-position:  -40px -100px; }
ol.archives time[datetime*="29T"] { background-position:  -60px -100px; }
ol.archives time[datetime*="30T"] { background-position:  -80px -100px; }
ol.archives time[datetime*="31T"] { background-position: -100px -100px; }
`),
  p(['That\'s a lot of text, most of which relates to the calendar sprite.\n    To start, though...']),
  h3(['Significant whitespace and nesting']),
  p(['As in Python and CoffeeScript, whitespace is significant in Sass.\n    As a result, squiggly brackets are not required to delimit blocks,\n    and semicolons are not required to separate one rule from the next.']),
  p(['Sass allows selectors to be nested. The main advantage of this approach\n    is that selectors needn\'t include their "context" (ancestors). It also\n    means that a style sheet\'s structure resembles that of the corresponding\n    markup.']),
  code$002Dblock('sass')(`ol.archives
  margin: 0 0 0 -21px
  list-style: none
  li
    h2
      margin: 1.75em 0 0 21px
      padding: 0
      font: bold 1em/1.75 "Lucida Grande", ..., sans-serif
      color: #93a1a1
    ol
      margin: 0
      list-style: none
  time
    display: block
    float: left
    margin: 0.167em 0.5em 0 0
    width: 16px
    height: 16px
    background: url(data:image/png;base64,...) no-repeat
    line-height: 10
    overflow: hidden
`),
  h3([
    'Compass\'s ',
    code(['inline-image']),
    ' function'
  ]),
  p([
    'For an image that\'s ',
    em(['design']),
    ' rather than content, it\'s\n    better to link to it from a style sheet than to include it as an ',
    code(['img']),
    '. Better still, it can be Base64 encoded and embedded\n    in the style sheet as a data URI, saving an HTTP request.'
  ]),
  p(['Until yesterday, I\'d always done this by hand. It\'s a bit of a pain,\n    but I\'m pretty familiar with the routine:']),
  ol([
    li(['Export image file as PNG']),
    li([a('http://www.smushit.com/ysmush.it/')(['Smush.it'])]),
    li(['Save smushed image']),
    li([
      'Drop smushed image into Hashify\n      (e.g. ',
      a('http://bit.ly/pbovZI')(['calendar.png']),
      ')'
    ]),
    li(['Copy data URI from Hashify and paste it into style sheet'])
  ]),
  p([
    'Having to perform these steps each time the source\n    image is changed is a real nuisance. Compass offers\n    an extremely elegant solution: a Sass function named ',
    a('http://compass-style.org/reference/compass/helpers/inline-data/#inline-image')([code(['inline-image'])]),
    '. When compiled, ',
    code([`inline-image("calendar.png")`]),
    ' becomes a data\n    URI \u2013 the Base64-encoded representation of calendar.png.\n    If calendar.png is changed, ',
    code(['compass compile']),
    '\n    is all that\'s required to update the data URI.'
  ]),
  code$002Dblock('sass')(`ol.archives
  ...
  time
    ...
    background: inline-image("calendar.png") no-repeat
    ...
    &[datetime*="01T"]
      background-position: -60px -20px
    &[datetime*="02T"]
      background-position: -80px -20px
    &[datetime*="03T"]
      background-position: -100px -20px
    ...
    &[datetime*="31T"]
      background-position: -100px -100px
`),
  h3(['Generating repetitive CSS programmatically']),
  p([
    'Having a placeholder for the data URI is great; 31 ',
    code(['background-position']),
    ' declarations not so\n    much. Compass provides helpers for generating and\n    working with sprites, but in this case all that\'s\n    required is to generate background positions for an\n    existing sprite. The first step is to add a loop:'
  ]),
  code$002Dblock('sass')(`@for $date from 1 through 31
  // do stuff
`),
  p([
    'The loop variable, ',
    code(['$date']),
    ', can be\n    interpolated to generate the selectors:'
  ]),
  code$002Dblock('sass')(`@for $date from 1 through 31
  &[datetime*="#{$date}T"]
`),
  p([
    'Almost. This gives ',
    code([`datetime*="1T"`]),
    ', ',
    code([`datetime*="2T"`]),
    ', etc. rather than their\n    zero-padded equivalents. Adding a leading zero when\n    required is not difficult:'
  ]),
  code$002Dblock('sass')(`@for $date from 1 through 31
  @if $date < 10
    $date: "0#{$date}"
  &[datetime*="#{$date}T"]
`),
  p([
    'Finally, variables can be used to calculate the ',
    code(['background-position']),
    ' of each element:'
  ]),
  code$002Dblock('sass')(`$offset: -20px
$x: 3
$y: 1
  @for $date from 1 through 31
    @if $date < 10
      $date: "0#{$date}"
    &[datetime*="#{$date}T"]
      background-position: $x * $offset $y * $offset
    @if $x == 7
      $x: 1
      $y: $y + 1
    @else
      $x: $x + 1
`),
  p(['These 13 lines of relatively straightforward logic\n    produce the same output as the 62 lines they replace.']),
  h3(['The right level of abstraction']),
  p([
    'In ',
    a('http://5by5.tv/hypercritical/14')(['A Dark Age of Objective-C']),
    '\n    and in ',
    a('http://5by5.tv/hypercritical/15')(['The Bridges of Siracusa County']),
    ',\n    John Siracusa made the claim that software developers have an\n    insatiable desire for ever higher-level programming languages\n    and frameworks. In and of itself, though, abstraction is not\n    a virtue. Most abstractions fail for one reason or another:\n    they aren\'t sufficiently flexible, or they are so generic\n    that they provide very little utility, or they don\'t fit\n    well with people\'s mental models.'
  ]),
  p([
    em(['Good']),
    ' abstractions are wonderful. jQuery, for example,\n    makes it possible to act on collections of elements as one\n    would individual elements. Before jQuery, binding an event\n    handler to several elements required more than a superficial\n    understanding of JavaScript (advanced knowledge if it were\n    necessary to close over variables). Good abstractions allow\n    us to write succinct, self-documenting code.'
  ]),
  p(['I\'m hopeful that Sass and its kin will do for CSS what jQuery has\n    done for the DOM (and what CoffeeScript is doing for JavaScript).\n    My first taste of higher-level CSS tasted very good indeed.'])
];
export default {
  id: 91,
  slug: 'higher-level-style-sheets',
  title: ['Higher-level style sheets'],
  datetime: datetime('2011-10-02')('23:00:00')('America/Los_Angeles'),
  tags: [
    'best-practice',
    'compass',
    'css',
    'ruby',
    'sass'
  ],
  body: body
};
