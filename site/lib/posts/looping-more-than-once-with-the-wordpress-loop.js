import {a, code, p} from "../elements.js";
import {code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
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
