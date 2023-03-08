import {
  _canonicalize$002Dchildren,
  text,
  excerpt,
  a,
  _a$0027,
  article,
  _article$0027,
  aside,
  _aside$0027,
  b,
  blockquote,
  _blockquote$0027,
  _body$0027,
  code,
  _code$0027,
  dd,
  _dd$0027,
  del,
  _del$0027,
  div,
  dl,
  _dl$0027,
  dt,
  _dt$0027,
  em,
  _em$0027,
  embed,
  footer,
  _footer$0027,
  h1,
  _h1$0027,
  h2,
  _h2$0027,
  h3,
  _h3$0027,
  h4,
  _h4$0027,
  h5,
  _h5$0027,
  h6,
  _h6$0027,
  head,
  _head$0027,
  header,
  _header$0027,
  hr,
  _hr$0027,
  html,
  _html$0027,
  i,
  _i$0027,
  img,
  ins,
  _ins$0027,
  li,
  _li$0027,
  linearGradient,
  link,
  mask,
  meta,
  nav,
  _nav$0027,
  object,
  ol,
  _ol$0027,
  p,
  _p$0027,
  param,
  path,
  pre,
  _pre$0027,
  rect,
  script,
  span,
  stop,
  strong,
  _strong$0027,
  svg,
  time,
  title,
  _title$0027,
  ul,
  _ul$0027,
  _var,
  _var$0027,
  video
} from '../elements.js';
import {
  _captioned$002Dimage,
  _code$002Dblock,
  _decorative$002Dimage,
  _uncaptioned$002Dimage
} from '../components.js';
import datetime from '../datetime.js';
const body = [
  excerpt([
    p(['Customizing the appearance of files and folders in OS X is\n             a cinch. \u2318C, \u2318I, \u2318V, punctuated by a few mouse clicks.']),
    p([strong('Actually, that\'s total bullshit.')]),
    p(['Sure, in the simplest of cases the copy and paste approach\n             gets the job done, assuming one knows to copy from Preview.app\n             if copying from the original source fails. As soon as one decides\n             to do something a bit more advanced, such as providing versions\n             for display at different sizes, one\'s shit outta luck.'])
  ]),
  h3('Creating .icns and applying them to files, folders, or bundles'),
  ol([
    li([
      _decorative$002Dimage('/images/posts/decorative/right/photoshop-icon.png'),
      p(['Create icon versions at one or more of the following sizes:\n                  16, 32, 128, 256, and 512. (I\'ve created two very different\n                  images for this tutorial.)']),
      _uncaptioned$002Dimage('/images/posts/72/16x16-icon.png')('16x16 icon'),
      _uncaptioned$002Dimage('/images/posts/72/32x32-icon.png')('32x32 icon'),
      p([
        'Save the images in a lossless format such as PNG.\n                  (If saving from Photoshop, make sure to use ',
        strong('Save for Web & Devices'),
        '. Icon Composer\n                  doesn\'t like PNG files generated via Photoshop\'s ',
        strong('Save'),
        ' / ',
        strong('Save As'),
        '.)'
      ]),
      _uncaptioned$002Dimage('/images/posts/72/save-for-web-and-devices.png')('Save for Web & Devices')
    ]),
    li([
      _decorative$002Dimage('/images/posts/decorative/right/icon-composer-icon.png'),
      p([
        'Open ',
        a('http://en.wikipedia.org/wiki/Apple_Developer_Tools#Icon_Composer')('Icon Composer'),
        ', located in ',
        strong('/Developer/Applications/Utilities'),
        '.\n                  This is part of the ',
        a('http://developer.apple.com/technologies/tools/')('Apple Developer Tools'),
        ', which are free to ',
        a('http://developer.apple.com/technologies/xcode.html')('download from Apple'),
        '. If you\'re bandwidth-conscious\n                  you can dig out your Mac OS X installation DVD to save\n                  yourself a few GBs.'
      ]),
      _captioned$002Dimage('/images/posts/72/icon-composer-interface.png')('Icon Composer interface')('Icon Composer interface'),
      p(['Copy and paste the various versions into their respective\n                  slots. (The foolproof way to copy an icon is to open it in\n                  Preview, \u2318A to select, then \u2318C to copy.)']),
      p([
        'Save the Icon Composer file. This\'ll create a single ',
        strong('.icns'),
        ' file containing all the different\n                  versions you included.'
      ])
    ]),
    li([
      _decorative$002Dimage('/images/posts/decorative/right/terminal-icon.png'),
      p(['The final step is to apply attach the .icns file as\n                  metadata to the file, folder, or bundle of interest.\n                  There are a plethora of apps which provide this\n                  functionality via attractive GUIs, but one shouldn\'t\n                  need third-party software to change the appearance\n                  of a folder!']),
      p([
        'I scoured the Web for a way to edit this metadata\n                  directly. I failed to find one, but came across ',
        a('http://www.cocoabuilder.com/archive/xcode/250445-custom-icon-for-bundle.html#250519')('the next best thing'),
        ': a shell script written and\n                  kindly shared by Damien Bobillot. ',
        a('http://maxao.free.fr/telechargements/setfileicon.gz')('Download setfileicon.gz'),
        ' then crack open Terminal.app,\n                  located in ',
        strong('/Applications/Utilities'),
        '.'
      ]),
      p([
        'In Terminal, navigate to your ',
        strong('Downloads'),
        '\n                  folder (or wherever you saved the script).'
      ]),
      _code$002Dblock(Symbol.for('console'))('\n               $ cd ~/Downloads\n               $ ls\n               '),
      p([
        'Run the ',
        code('ls'),
        ' command to inspect the contents of\n                  the directory. If you used Safari to download the script, you\n                  should see a file named ',
        code('setfileicon'),
        '. If you used\n                  another browser you\'ll likely see ',
        code('setfileicon.gz'),
        ';\n                  unzip it by double-clicking the file in Finder.'
      ]),
      p([
        'Make the script executable and move it to your ',
        strong('/bin'),
        ' directory so that it can be run from\n                  any directory (you\'ll be asked to enter your password).'
      ]),
      _code$002Dblock(Symbol.for('console'))('\n               $ chmod 555 setfileicon\n               $ sudo mv setfileicon /bin/setfileicon\n               '),
      p(['Finally, run the script passing in two arguments: the\n                  path to the .icns file; and the path to the file, folder,\n                  or bundle to which you\'d like to attach the icons.']),
      _code$002Dblock(Symbol.for('console'))('\n               $ setfileicon ~/icons.icns ~/example\n               ')
    ])
  ]),
  h3('TL;DR'),
  p(['I agree. It shouldn\'t be this difficult. At least I\'ve now\n        documented the convoluted process. :s']),
  _captioned$002Dimage('/images/posts/72/icons-in-situ.png')('Icons in situ')('Icons in situ (note the 16x16 icon in the sidebar)')
];
export default {
  [Symbol.for('id')]: 72,
  [Symbol.for('slug')]: 'customizing-file-and-folder-icons-in-mac-os-x',
  [Symbol.for('title')]: 'Customizing file and folder icons in Mac OS X',
  [Symbol.for('datetime')]: datetime('2010-09-29')('00:00:00')(Symbol.for('Pacific/Auckland')),
  [Symbol.for('tags')]: [
    'icons',
    'mac-os-x',
    'terminal.app'
  ],
  [Symbol.for('body')]: body
};
