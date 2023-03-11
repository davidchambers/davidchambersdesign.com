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
  _code$002Dblock,
  _uncaptioned$002Dimage
} from '../components.js';
import datetime from '../datetime.js';
const body = [
  h3('WordPress'),
  p([
    a('http://wordpress.org/')('WordPress'),
    ' is powerful software,\n        which I\'ve recommended frequently since I came across it two\n        years ago. I\'ve used it on several sites (including this one),\n        and it has served me well.'
  ]),
  p(['Over time, though, a few things started to get me down. More and\n        more, I found myself fighting WordPress rather than working with it.\n        In one case I was forced to hack core WordPress files to prevent\n        session data from being cleared between requests. WordPress is\n        great blogging software, but I\'ve been guilty of trying to do\n        too much with it.']),
  p(['Having decided to use WordPress for my blogs and better suited\n        tools for more complex projects, my frustrations abated, but did\n        not disappear. I was still writing posts in HTML -- I\'m a control\n        freak and can\'t live without definition lists -- and generating\n        50 or more database records for each post by frequently previewing\n        while writing.']),
  excerpt([
    p([
      strong('I wanted to simplify everything.'),
      '\n             I wanted to write posts in ',
      a('http://daringfireball.net/projects/markdown/syntax')('Markdown'),
      ', not HTML. I wanted to save posts as files,\n             not database entries. I wanted to free myself of my dependence\n             on WordPress, PHP, and MySQL in one fell swoop.'
    ]),
    p([
      'So, ',
      a('http://bitbucket.org/davidchambers/mango')('Mango'),
      '\n             was born. Mango is file-based blogging software built on ',
      a('http://www.djangoproject.com/')('Django'),
      ', the excellent\n             Python web framework. I conceived Mango to scratch an itch,\n             and I\'ll bet that others out there are itchy, too.'
    ])
  ]),
  h3('Going without'),
  p(['I kept my dependence on WordPress plug-ins to a minimum, but there\n        were a few which I found very useful.']),
  ul([
    li([p([
        a('http://akismet.com/')('Akismet'),
        '.\n                  Commenting is handled by ',
        a('http://disqus.com/')('Disqus'),
        ',\n                  which offers Akismet in addition to its own spam filtering.'
      ])]),
    li([p([
        a('http://wordpress.org/extend/plugins/wp-super-cache/')('WP Super Cache'),
        '.\n                  Mango supports caching "out of the box", courtesy of Django.\n                  Caching currently occurs at the post level, which means that\n                  extra content such as comments are still generated dynamically.\n                  In the future Mango will include a second layer of caching,\n                  at the page level.'
      ])]),
    li([p([
        a('http://wordpress.org/extend/plugins/subscribe-to-comments/')('Subscribe to Comments'),
        '.\n                  Mango does not currently support this feature, but soon will.\n                  Hang tight.'
      ])]),
    li([p([
        a('http://wordpress.org/extend/plugins/wp-db-backup/')('WP-DB-Backup'),
        '.\n                  With Mango there\'s no database to back up. My posts are safe\n                  because I write and save them locally, and my hard drive is\n                  automatically backed up via Time Machine. (This is a recurring\n                  theme: Mango takes advantage of existing solutions to common\n                  problems.)'
      ])])
  ]),
  p([
    'The plug-ins that I am thrilled to be without are those that\n        prevent WordPress from carrying out an action, or attempt to undo\n        an action after the fact. The existance of plug-ins such as ',
    a('http://wordpress.org/extend/plugins/no-curly-quotes/')('No Curly Quotes'),
    ' is evidence of the fact that I am not\n        the only one who refuses to let WordPress dictate terms.'
  ]),
  h3('Customization'),
  p([
    'WordPress has themes. The problem with the WordPress approach\n        to themes is that a theme\'s template files and style sheet are\n        tightly coupled. Themes should control the ',
    em('presentation'),
    '\n        of content \u2013 theme authors should not determine ',
    em('what'),
    '\n        appears on an "archives" page, for example, yet with WordPress\n        this is exactly what they are expected to do.'
  ]),
  p(['As a result, WordPress themes often require customization,\n        where by "customization" I mean hacking to pieces.']),
  p(['Django -- and by extension Mango -- has a different approach,\n        which is incredibly simple. One provides Django with an ordered\n        list of places to look for templates.']),
  _code$002Dblock(Symbol.for('python'))('\n     TEMPLATE_DIRS = (\n         \'/webapps/dcd/blog/templates\',\n         \'/webapps/dcd/blog/mango/templates\',\n     )\n     '),
  p([
    'If Mango needs ',
    code('archives.dhtml'),
    ' it\'ll first look in\n        the custom templates directory. If it finds that file there,\n        it\'ll use it. If not, it\'ll use Mango\'s "archives" template.\n        Whereas with WordPress it\'s all or nothing, with Mango you can\n        create one or more of your own templates and have Mango fall\n        back to the defaults for the rest.'
  ]),
  p([
    'Not that writing templates is an unpleasant task \u2013 ',
    a('http://docs.djangoproject.com/en/dev/topics/templates/')('Django\'s template language'),
    ' is extremely elegant.'
  ]),
  h3('Extensibility'),
  p(['There are no plug-ins for Mango. I like that. Many options are\n        configurable, but Mango has no ambitions of being anything more\n        than great blogging software. Mango is a Django app, and Django\n        apps play nicely together. New components can be added to a site\n        in the form of additional Django applications. In my opinion\n        Python+Django is a more elegant, more feature-rich, more secure\n        platform than PHP+WordPress.']),
  h3('Final thoughts'),
  p([
    'Undoubtedly, Mango is not for everyone. In fact, I would recommend\n        Mango to only a tiny portion of bloggers. For most, the fact that\n        WordPress serves content ',
    em('and'),
    ' provides a web interface\n        for inputting and managing that content is a great thing, and\n        I\'ll continute to recommend it on this basis. The success of ',
    a('http://www.red-sweater.com/marsedit/')('MarsEdit'),
    ', however,\n        indicates that I\'m not the only one who prefers to write posts\n        in a desktop application than in a glorified web form.'
  ]),
  p([
    'Mango does not provide an all-in-one solution. This frees\n        me to use the tools I know and love. I can compose a post in ',
    a('http://www.hogbaysoftware.com/products/writeroom')('WriteRoom'),
    '\n        and publish it with ',
    a('http://panic.com/transmit/')('Transmit'),
    '\n        (DockSend is fantastic!) or I can write in ',
    a('http://panic.com/coda/')('Coda'),
    ' as I\'m doing now,\n        preview locally, and hit the upload arrow when I\'m ready\n        to share my thoughts with the world.'
  ]),
  _uncaptioned$002Dimage('/images/posts/50/publish.png')('Publish a post from Coda')
];
export default {
  [Symbol.for('id')]: 50,
  [Symbol.for('slug')]: 'freeing-myself-of-wordpress',
  [Symbol.for('title')]: 'Freeing myself of WordPress',
  [Symbol.for('datetime')]: datetime('2010-06-03')('02:56:00')(Symbol.for('Pacific/Auckland')),
  [Symbol.for('tags')]: [
    'django',
    'mango',
    'wordpress'
  ],
  [Symbol.for('body')]: body
};