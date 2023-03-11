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
import { _code$002Dblock } from '../components.js';
import datetime from '../datetime.js';
const body = [
  p(['One might expect the following code to serialize a Django model\n        instance:']),
  _code$002Dblock(Symbol.for('python'))('\n     import simplejson\n     simplejson.dumps(instance)\n     '),
  p([
    'Unforunately, this raises a TypeError, as the instance is not JSON\n        serializable. I don\'t understand ',
    em('why'),
    ' model instances are\n        not serializable, but I do have a solution: define a serialization\n        method on the instance\'s model.'
  ]),
  _code$002Dblock(Symbol.for('python'))('\n     def toJSON(self):\n         import simplejson\n         return simplejson.dumps(dict([(attr, getattr(self, attr)) for attr in [f.name for f in self._meta.fields]]))\n     '),
  p(['Here\'s the verbose equivalent for those averse to one-liners:']),
  _code$002Dblock(Symbol.for('python'))('\n     def toJSON(self):\n         fields = []\n         for field in self._meta.fields:\n             fields.append(field.name)\n\n         d = {}\n         for attr in fields:\n             d[attr] = getattr(self, attr)\n\n         import simplejson\n         return simplejson.dumps(d)\n     '),
  p([
    code('_meta.fields'),
    ' is an ordered list of model fields\n        which can be accessed from instances and from the model itself. ',
    a('http://www.djangofoo.com/tag/meta-fields')('_meta.fields'),
    '\n        is one of the few features not covered in Django\'s excellent\n        documentation.'
  ])
];
export default {
  [Symbol.for('id')]: 49,
  [Symbol.for('slug')]: 'serializing-django-model-instances',
  [Symbol.for('title')]: 'Serializing Django model instances',
  [Symbol.for('datetime')]: datetime('2010-04-13')('08:16:00')(Symbol.for('Pacific/Auckland')),
  [Symbol.for('tags')]: [
    'django',
    'python'
  ],
  [Symbol.for('body')]: body
};