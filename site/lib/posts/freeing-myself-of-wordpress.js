import {text, a, article, article$0027, aside, aside$0027, b, blockquote, blockquote$0027, body$0027, code, code$0027, dd, dd$0027, del, del$0027, div, dl, dl$0027, dt, dt$0027, em, em$0027, embed, footer, footer$0027, h1, h1$0027, h2, h2$0027, h3, h3$0027, h4, h4$0027, h5, h5$0027, h6, h6$0027, head, head$0027, header, header$0027, hr, hr$0027, html, html$0027, i, i$0027, img, ins, ins$0027, li, li$0027, linearGradient, link, mask, meta, nav, nav$0027, object, ol, ol$0027, p, p$0027, param, path, pre, pre$0027, rect, script, span, stop, strong, strong$0027, svg, time, title, title$0027, ul, ul$0027, var$, var$0027, video} from "../elements.js";
import {code$002Dblock, $2014} from "../components.js";
import datetime from "../datetime.js";
const Prelude = {
  _apply: name => args => target => target[name].apply(target, args),
  apply: args => target => target.apply(target, args),
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f),
  concat: this$ => that => Array.isArray(this$) || typeof this$ === "string" ? this$.concat(that) : this$["fantasy-land/concat"](that),
  const_: x => y => x,
  flip: f => y => x => f(x)(y),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f),
  not: b => !b
};
const {_apply, apply, chain, concat, const_, flip, map, not} = Prelude;
const excerpt = [p([strong(["I wanted to simplify everything."]), "\n    I wanted to write posts in ", a({
  href: "http://daringfireball.net/projects/markdown/syntax"
})(["Markdown"]), ", not HTML. I wanted to save posts as files,\n    not database entries. I wanted to free myself of my dependence\n    on WordPress, PHP, and MySQL in one fell swoop."]), p(["So, ", a({
  href: "http://bitbucket.org/davidchambers/mango"
})(["Mango"]), "\n    was born. Mango is file-based blogging software built on ", a({
  href: "http://www.djangoproject.com/"
})(["Django"]), ",\n    the excellent Python web framework. I conceived Mango to scratch\n    an itch, and I'll bet that others out there are itchy, too."])];
const body = [h3(["WordPress"]), p([a({
  href: "http://wordpress.org/"
})(["WordPress"]), " is powerful\n    software, which I've recommended frequently since I came across it\n    two years ago. I've used it on several sites (including this one),\n    and it has served me well."]), p(["Over time, though, a few things started to get me down. More and\n    more, I found myself fighting WordPress rather than working with it.\n    In one case I was forced to hack core WordPress files to prevent\n    session data from being cleared between requests. WordPress is\n    great blogging software, but I've been guilty of trying to do\n    too much with it."]), p(["Having decided to use WordPress for my blogs and better suited\n    tools for more complex projects, my frustrations abated, but did\n    not disappear. I was still writing posts in HTML", $2014, "I'm a control\n    freak and can't live without definition lists", $2014, "and generating\n    50 or more database records for each post by frequently previewing\n    while writing."]), ...excerpt, h3(["Going without"]), p(["I kept my dependence on WordPress plug-ins to a minimum, but there\n    were a few which I found very useful."]), ul([li([p([a({
  href: "http://akismet.com/"
})(["Akismet"]), ". Commenting\n        is handled by ", a({
  href: "http://disqus.com/"
})(["Disqus"]), ",\n        which offers Akismet in addition to its own spam filtering."])]), li([p([a({
  href: "http://wordpress.org/extend/plugins/wp-super-cache/"
})(["WP Super Cache"]), ".\n        Mango supports caching \"out of the box\", courtesy of Django.\n        Caching currently occurs at the post level, which means that\n        extra content such as comments are still generated dynamically.\n        In the future Mango will include a second layer of caching,\n        at the page level."])]), li([p([a({
  href: "http://wordpress.org/extend/plugins/subscribe-to-comments/"
})(["Subscribe to Comments"]), ".\n        Mango does not currently support this feature, but soon will.\n        Hang tight."])]), li([p([a({
  href: "http://wordpress.org/extend/plugins/wp-db-backup/"
})(["WP-DB-Backup"]), ".\n        With Mango there's no database to back up. My posts are safe\n        because I write and save them locally, and my hard drive is\n        automatically backed up via Time Machine. (This is a recurring\n        theme: Mango takes advantage of existing solutions to common\n        problems.)"])])]), p(["The plug-ins that I am thrilled to be without are those that\n    prevent WordPress from carrying out an action, or attempt to undo\n    an action after the fact. The existance of plug-ins such as ", a({
  href: "http://wordpress.org/extend/plugins/no-curly-quotes/"
})(["No Curly Quotes"]), " is evidence of the fact that I am not\n    the only one who refuses to let WordPress dictate terms."]), h3(["Customization"]), p(["WordPress has themes. The problem with the WordPress approach\n    to themes is that a theme's template files and style sheet are\n    tightly coupled. Themes should control the ", em(["presentation"]), "\n    of content – theme authors should not determine ", em(["what"]), "\n    appears on an \"archives\" page, for example, yet with WordPress\n    this is exactly what they are expected to do."]), p([`As a result, WordPress themes often require customization,
    where by "customization" I mean hacking to pieces.`]), p(["Django", $2014, "and by extension Mango", $2014, "has a different approach,\n    which is incredibly simple. One provides Django with an ordered list\n    of places to look for templates."]), code$002Dblock("python")(`TEMPLATE_DIRS = (
    '/webapps/dcd/blog/templates',
    '/webapps/dcd/blog/mango/templates',
)
`), p(["If Mango needs ", code(["archives.dhtml"]), " it'll first look in\n    the custom templates directory. If it finds that file there,\n    it'll use it. If not, it'll use Mango's \"archives\" template.\n    Whereas with WordPress it's all or nothing, with Mango you can\n    create one or more of your own templates and have Mango fall\n    back to the defaults for the rest."]), p(["Not that writing templates is an unpleasant task – ", a({
  href: "http://docs.djangoproject.com/en/dev/topics/templates/"
})(["Django's template language"]), " is extremely elegant."]), h3(["Extensibility"]), p(["There are no plug-ins for Mango. I like that. Many options are\n    configurable, but Mango has no ambitions of being anything more\n    than great blogging software. Mango is a Django app, and Django\n    apps play nicely together. New components can be added to a site\n    in the form of additional Django applications. In my opinion\n    Python+Django is a more elegant, more feature-rich, more secure\n    platform than PHP+WordPress."]), h3(["Final thoughts"]), p(["Undoubtedly, Mango is not for everyone. In fact, I would recommend\n    Mango to only a tiny portion of bloggers. For most, the fact that\n    WordPress serves content ", em(["and"]), " provides a web interface\n    for inputting and managing that content is a great thing, and\n    I'll continute to recommend it on this basis. The success of ", a({
  href: "http://www.red-sweater.com/marsedit/"
})(["MarsEdit"]), ",\n    however, indicates that I'm not the only one who prefers to write\n    posts in a desktop application than in a glorified web form."]), p(["Mango does not provide an all-in-one solution. This frees\n    me to use the tools I know and love. I can compose a post in ", a({
  href: "http://www.hogbaysoftware.com/products/writeroom"
})(["WriteRoom"]), "\n    and publish it with ", a({
  href: "http://panic.com/transmit/"
})(["Transmit"]), "\n    (DockSend is fantastic!) or I can write in ", a({
  href: "http://panic.com/coda/"
})(["Coda"]), " as I'm doing now,\n    preview locally, and hit the upload arrow when I'm ready to share\n    my thoughts with the world."]), p([img({
  alt: "Publish a post from Coda",
  src: "/images/posts/50/publish.png"
})])];
export default {
  id: 50,
  slug: "freeing-myself-of-wordpress",
  title: ["Freeing myself of WordPress"],
  datetime: datetime("2010-06-03")("02:56:00")("Pacific/Auckland"),
  tags: ["django", "mango", "wordpress"],
  body
};
