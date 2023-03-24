import {text, a, article, article$0027, aside, aside$0027, b, blockquote, blockquote$0027, body$0027, code, code$0027, dd, dd$0027, del, del$0027, div, dl, dl$0027, dt, dt$0027, em, em$0027, embed, footer, footer$0027, h1, h1$0027, h2, h2$0027, h3, h3$0027, h4, h4$0027, h5, h5$0027, h6, h6$0027, head, head$0027, header, header$0027, hr, hr$0027, html, html$0027, i, i$0027, img, ins, ins$0027, li, li$0027, linearGradient, link, mask, meta, nav, nav$0027, object, ol, ol$0027, p, p$0027, param, path, pre, pre$0027, rect, script, span, stop, strong, strong$0027, svg, time, title, title$0027, ul, ul$0027, var$, var$0027, video} from "../elements.js";
import {code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const Prelude = {
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f)
};
const {chain, map} = Prelude;
const body = [p(["When I decided to write my own WordPress theme, I thought a\n    good approach would be to duplicate the default theme and go\n    from there. Since that day I have rewritten much of the code.\n    The loop in the index.php file, however, remains unchanged.\n    The loop looks like this:"]), code$002Dblock("php")(`if (have_posts()) :
    while (have_posts()) : the_post();
        // code
    endwhile;
endif;
`), p(["As well as displaying the three most recent posts on the\n    home page, I wanted to display links to slightly older\n    posts on the sidebar. I discovered a WpRecipes post on ", a({
  href: "http://www.wprecipes.com/avinash-asked-how-to-use-two-different-wordpress-loops"
})(["using two different WordPress loops"]), " which suggests\n    adding the following line of code just before the loop:"]), code$002Dblock("php")(`query_posts('showposts=5&offset=3');
`), p(["The ", code(["offset"]), " ensures that posts do not appear\n    in both places."])];
export default {
  id: 12,
  slug: "looping-more-than-once-with-the-wordpress-loop",
  title: ["Looping more than once with the WordPress loop"],
  datetime: datetime("2009-04-17")("00:34:00")("Pacific/Auckland"),
  tags: ["php", "wordpress"],
  body
};
