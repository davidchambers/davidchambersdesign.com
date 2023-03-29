import {text, a, article, article$0027, aside, aside$0027, b, blockquote, blockquote$0027, body$0027, code, code$0027, dd, dd$0027, del, del$0027, div, dl, dl$0027, dt, dt$0027, em, em$0027, embed, footer, footer$0027, h1, h1$0027, h2, h2$0027, h3, h3$0027, h4, h4$0027, h5, h5$0027, h6, h6$0027, head, head$0027, header, header$0027, hr, hr$0027, html, html$0027, i, i$0027, img, ins, ins$0027, li, li$0027, linearGradient, link, mask, meta, nav, nav$0027, object, ol, ol$0027, p, p$0027, param, path, pre, pre$0027, rect, script, span, stop, strong, strong$0027, svg, time, title, title$0027, ul, ul$0027, var$, var$0027, video} from "../elements.js";
import {code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const Prelude = {
  _apply: name => args => target => target[name].apply(target, args),
  apply: args => target => target.apply(target, args),
  construct: constructor => args => Reflect.construct(constructor, args),
  match: type => Prelude["match'"](type)(_ => CasesNotExhaustive),
  ["match'"]: type => type[Symbol.for("match")],
  id: x => x,
  const: x => y => x,
  not: b => !b,
  equals: this$ => that => Array.isArray(this$) ? Array.isArray(that) && (this$.length === that.length && this$.every((x, idx) => Prelude.equals(x)(that[idx]))) : this$ === that,
  concat: this$ => that => Array.isArray(this$) || typeof this$ === "string" ? this$.concat(that) : this$["fantasy-land/concat"](that),
  reduce: f => y => foldable => foldable[Array.isArray(foldable) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y),
  reduceRight: f => y => foldable => foldable.reduceRight((y, x) => f(y)(x), y),
  filter: predicate => filterable => Array.isArray(filterable) ? filterable.filter(x => predicate(x)) : filterable["fantasy-land/filter"](predicate),
  reject: predicate => Prelude.filter(x => Prelude.not(predicate(x))),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f),
  flip: f => y => x => f(x)(y),
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f)
};
const {_apply, apply, construct, match, ["match'"]: match$0027, id, const: const$, not, equals, concat, reduce, reduceRight, filter, reject, map, flip, chain} = Prelude;
const excerpt = [p(["Recently I've been on a drive to eliminate dependencies from my\n    code and other areas, such as blog posts. For those who create\n    content for the Web, a reasonably common task is to provide links\n    to files that can be downloaded. It is considered good practice\n    to include an indication of a file's size; for example: ", a({
  href: "/favicon.ico"
})(["favicon.ico"]), " (3 KB)."]), p(["As I was about to hard-code a file's size into a blog post\n    recently, I thought to myself: ", strong(["Will I remember to\n    update this if the file's size changes?"]), " More importantly,\n    should I be required to remember such things? The answer,\n    of course, is no. I set about writing a function that would\n    allow the file's size to be displayed dynamically."])];
const body = [...excerpt, code$002Dblock("php")(`<?php

/**
 * echoes nicely formatted filesize
 * @param string $filename
 * @param string $before
 * @param string $after
 */
function print_filesize($filename, $before = ' <span class="filesize">(', $after = ')</span>')
{
    if (file_exists($filename))
    {
        $size = filesize($filename);
        $unit = 'B';

        if (intval($size/(1024*1024*1024)))
        {
            $size = number_format(($size/(1024*1024*1024)), 1);
            $unit = 'GB';
        }
        elseif (intval($size/(1024*1024)))
        {
            $size = number_format(($size/(1024*1024)), 1);
            $unit = 'MB';
        }
        elseif (intval($size/1024))
        {
            $size = number_format(($size/1024), 1);
            $unit = 'KB';
        }

        $approx = $unit == 'B' ? '' : '≈' ;

        echo "{$before}{$approx}{$size} {$unit}{$after}";
    }
}

?>
`), p(["Example usage:"]), code$002Dblock("php")(`<a href="favicon.ico">favicon.ico</a><?php print_filesize('favicon.ico'); ?>
`), p(["This gives: ", a({
  href: "/favicon.ico"
})(["favicon.ico"]), " ", span({
  class: "filesize"
})(["(≈1.1 kB)"]), ". By default,\n    the function wraps the file's size in a ", code(["span"]), "\n    element with ", code([`class="filesize"`]), ", to provide\n    a hook for styling if required."])];
export default {
  id: 17,
  slug: "php-print_filesize-function",
  title: ["PHP print_filesize function"],
  datetime: datetime("2009-06-10")("21:17:00")("Pacific/Auckland"),
  tags: ["best-practice", "php"],
  body
};
