import {text, a, article, article$0027, aside, aside$0027, b, blockquote, blockquote$0027, body$0027, code, code$0027, dd, dd$0027, del, del$0027, div, dl, dl$0027, dt, dt$0027, em, em$0027, embed, footer, footer$0027, h1, h1$0027, h2, h2$0027, h3, h3$0027, h4, h4$0027, h5, h5$0027, h6, h6$0027, head, head$0027, header, header$0027, hr, hr$0027, html, html$0027, i, i$0027, img, ins, ins$0027, li, li$0027, linearGradient, link, mask, meta, nav, nav$0027, object, ol, ol$0027, p, p$0027, param, path, pre, pre$0027, rect, script, span, stop, strong, strong$0027, svg, time, title, title$0027, ul, ul$0027, var$, var$0027, video} from "../elements.js";
import datetime from "../datetime.js";
const Prelude = {
  operators: {
    unary: {
      ["~"]: operand => ~operand
    },
    binary: {
      ["&"]: rhs => lhs => lhs & rhs,
      ["^"]: rhs => lhs => lhs ^ rhs,
      ["|"]: rhs => lhs => lhs | rhs
    }
  },
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
const {operators, _apply, apply, construct, match, ["match'"]: match$0027, id, const: const$, not, equals, concat, reduce, reduceRight, filter, reject, map, flip, chain} = Prelude;
const excerpt = [p(["I recently began learning Danish. I'm taking a weekly class, and\n    the first week's homework involved listening to the conversations\n    we covered during the lesson. I began by playing the audio files,\n    following along in the Danish transcripts. I found myself wanting\n    to listen to the difficult parts over and over, but scrubbing\n    through a timeline is rather awkward."]), p(["It occurred to me that I could use iTunes to solve this problem.\n    Normally, iTunes will play a track from beginning to end. It's\n    possible, though, to specify a certain portion of the track to be\n    played instead. By adding an audio file to a playlist many times\n    and specifying consecutive portions (e.g. 0:00–0:02, 0:02–0:04.8,\n    ...), a track can be broken into manageable clips for more\n    convenient navigation."]), p(["Here's the end result:"]), p([img({
  alt: "iTunes playlist for Danish dialogue",
  src: "/images/posts/93/windows/lion/itunes-playlist-for-danish-dialogue.png"
})])];
const body = [...excerpt, h3(["Creating an iTunes playlist from a single audio file"]), ol([li([p(["Open iTunes and create a playlist. I named mine \"danske\"."])]), li([p(["Locate the audio file in Finder."])]), li([p(["Drag the file from the Finder window, and drop it\n        onto the iTunes icon in the dock. This will make a\n        copy of the file in your \"iTunes Music\" folder."])]), li([p(["Drag the file from the Finder window, and drop it onto\n        the newly created playlist in the iTunes sidebar."])]), li([p(["Select the track in iTunes, then hit ", strong(["⌘I"]), " (or select ", strong(["Get Info"]), " from the ", strong(["File"]), " menu)."])]), li([p(["Click the ", strong(["Options"]), " tab and enter a ", strong(["Stop Time"]), ". Click ", strong(["OK"]), "."]), p([img({
  alt: "Setting the clip's stop time",
  src: "/images/posts/93/windows/lion/setting-the-stop-time.png"
})])]), li([p(["Play the clip, and adjust the stop time until the clip\n        contains just the desired portion of the dialogue."])]), li([p(["Hit ", strong(["⌘I"]), " again, and this time click the ", strong(["Info"]), " tab. Type the clip's transcription\n        into the ", strong(["Name"]), " field."]), p([img({
  alt: "Setting the clip's name",
  src: "/images/posts/93/windows/lion/setting-the-name.png"
})])]), li([p(["Repeat steps 4 through 8 as necessary. Ensure that\n        each clip's start time is the same as the previous\n        clip's stop time."])]), li([p(["Select all of the newly added clips. Hit ", strong(["⌘I"]), ".\n        In the ", strong(["Album"]), " field, type the name of the\n        audio file. Click ", strong(["OK"]), "."])])]), p([`Having a dialog comprised of many short clips is very useful.
    It enables one to listen to a clip repeatedly to practise a
    difficult word or phrase, or to say each sentence aloud before
    listening to the "answer". And since the clips are contiguous
    one can still listen to the dialog from beginning to end.`])];
export default {
  id: 93,
  slug: "itunes-is-surprisingly-useful-when-learning-a-foreign-language",
  title: ["iTunes: Surprisingly useful when learning a foreign language"],
  datetime: datetime("2012-01-29")("19:20:00")("America/Los_Angeles"),
  tags: ["itunes", "language", "mac-os-x"],
  body
};
