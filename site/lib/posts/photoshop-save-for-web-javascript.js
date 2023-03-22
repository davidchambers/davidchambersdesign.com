import {
  text,
  a,
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
const Prelude = { map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor['fantasy-land/map'](f) };
const {map} = Prelude;
const body = [
  p([
    'This is a JavaScript function for Photoshop which saves\n    the active document as a 24-bit PNG file. It is equivalent to\n    manually selecting ',
    strong(['File > Save for Web & Devices...']),
    '\n    which means that the file size of the resulting PNG will be smaller\n    than would be the case using ',
    code(['PNGSaveOptions()']),
    '.'
  ]),
  code$002Dblock('javascript')(`function saveForWebPNG(outputFolderStr, filename)
{
    var opts, file;
    opts = new ExportOptionsSaveForWeb();
    opts.format = SaveDocumentType.PNG;
    opts.PNG8 = false;
    opts.quality = 100;
    if (filename.length > 27) {
        file = new File(outputFolderStr + "/temp.png");
        activeDocument.exportDocument(file, ExportType.SAVEFORWEB, opts);
        file.rename(filename + ".png");
    }
    else {
        file = new File(outputFolderStr + "/" + filename + ".png");
        activeDocument.exportDocument(file, ExportType.SAVEFORWEB, opts);
    }
}
`),
  p([
    'Photoshop on Mac limits the length of a ',
    code(['File']),
    '\n    object\'s file name to 31 characters. Credit for the rename\n    workaround should go to Mark Walsh who posted the solution\n    on the Adobe forums in a thread titled ',
    a({ href: 'http://forums.adobe.com/thread/290409' })(['Save for web filename problems']),
    '.'
  ])
];
export default {
  id: 20,
  slug: 'photoshop-save-for-web-javascript',
  title: ['Photoshop "save for web" JavaScript'],
  datetime: datetime('2009-07-28')('03:27:00')('Pacific/Auckland'),
  tags: [
    'javascript',
    'mac-os-x',
    'photoshop'
  ],
  body
};
