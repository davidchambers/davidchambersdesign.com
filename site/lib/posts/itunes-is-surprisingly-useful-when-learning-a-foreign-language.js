import {h3, img, li, ol, p, strong} from "../elements.js";
import datetime from "../datetime.js";
const {operators, apply, construct, instanceof: instanceof$, typeof: typeof$, match, ["match'"]: match$0027, id, const: const$, not, quot, rem, div, mod, equals, concat, reduce, reduceRight, filter, reject, map, flip, chain} = {
  operators: {
    unary: {
      ["~"]: operand => ~operand
    },
    binary: {
      ["<<"]: rhs => lhs => lhs << rhs,
      [">>"]: rhs => lhs => lhs >> rhs,
      [">>>"]: rhs => lhs => lhs >>> rhs,
      ["&"]: rhs => lhs => lhs & rhs,
      ["^"]: rhs => lhs => lhs ^ rhs,
      ["|"]: rhs => lhs => lhs | rhs
    }
  },
  apply: f => args => f.apply(null, args),
  construct: constructor => args => Reflect.construct(constructor, args),
  instanceof: constructor => x => x instanceof constructor,
  typeof: x => x === null ? "null" : typeof x,
  match: type => match$0027(type)(x => CasesNotExhaustive),
  ["match'"]: type => type[Symbol.for("match")],
  id: x => x,
  const: x => y => x,
  not: x => !x,
  quot: lhs => rhs => rhs === 0 ? DivisionByZero : lhs / rhs | 0,
  rem: lhs => rhs => rhs === 0 ? DivisionByZero : lhs % rhs,
  div: lhs => rhs => rhs === 0 ? DivisionByZero : Math.floor(lhs / rhs),
  mod: lhs => rhs => rhs === 0 ? DivisionByZero : (lhs % rhs + rhs) % rhs,
  equals: this$ => that => Array.isArray(this$) ? Array.isArray(that) && (this$.length === that.length && this$.every((x, idx) => equals(x)(that[idx]))) : this$ === that,
  concat: this$ => that => Array.isArray(this$) || typeof this$ === "string" ? this$.concat(that) : this$["fantasy-land/concat"](that),
  reduce: f => y => x => x[Array.isArray(x) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y),
  reduceRight: f => y => x => x.reduceRight((y, x) => f(y)(x), y),
  filter: f => x => Array.isArray(x) ? x.filter(x => f(x)) : x["fantasy-land/filter"](f),
  reject: f => filter($ => not(f($))),
  map: f => x => Array.isArray(x) ? x.map(x => f(x)) : x["fantasy-land/map"](f),
  flip: f => y => x => f(x)(y),
  chain: f => x => Array.isArray(x) ? x.flatMap(x => f(x)) : x["fantasy-land/chain"](f)
};
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
