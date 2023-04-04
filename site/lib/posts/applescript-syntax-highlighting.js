import {a, code, em, h3$0027, li, ol, p, p$0027, strong} from "../elements.js";
import {captioned$002Dimages, code$002Dblock, update, $2014} from "../components.js";
import datetime from "../datetime.js";
const {XOR, OR, subtract, apply, construct, instanceof: instanceof$, typeof: typeof$, match, ["match'"]: match$0027, id, const: const$, not, quot, rem, div, mod, equals, concat, empty, reduce, reduceRight, filter, reject, map, flip, of, chain, contains} = {
  XOR: rhs => lhs => (() => {
    switch (globalThis.Reflect.apply(globalThis.Object.prototype.toString, rhs, [])) {
      case "[object Set]":
        return globalThis.Reflect.construct(globalThis.Set, [[...lhs].filter(x => rhs.has(x))]);
      default:
        return lhs ^ rhs;
    }
  })(),
  OR: rhs => lhs => (() => {
    switch (globalThis.Reflect.apply(globalThis.Object.prototype.toString, rhs, [])) {
      case "[object Set]":
        return globalThis.Reflect.construct(globalThis.Set, [[...lhs, ...rhs]]);
      default:
        return lhs | rhs;
    }
  })(),
  subtract: rhs => lhs => (() => {
    switch (globalThis.Reflect.apply(globalThis.Object.prototype.toString, rhs, [])) {
      case "[object Set]":
        return globalThis.Reflect.construct(globalThis.Set, [[...lhs].filter(x => !rhs.has(x))]);
      default:
        return lhs - rhs;
    }
  })(),
  apply: f => args => f.apply(null, args),
  construct: constructor => args => globalThis.Reflect.construct(constructor, args),
  instanceof: constructor => x => x instanceof constructor,
  typeof: x => x === null ? "null" : typeof x,
  match: type => match$0027(type)(x => CasesNotExhaustive),
  ["match'"]: type => type[globalThis.Symbol.for("match")],
  id: x => x,
  const: x => y => x,
  not: x => !x,
  quot: lhs => rhs => rhs === 0 ? DivisionByZero : lhs / rhs | 0,
  rem: lhs => rhs => rhs === 0 ? DivisionByZero : lhs % rhs,
  div: lhs => rhs => rhs === 0 ? DivisionByZero : globalThis.Math.floor(lhs / rhs),
  mod: lhs => rhs => rhs === 0 ? DivisionByZero : (lhs % rhs + rhs) % rhs,
  equals: this$ => that => globalThis.Array.isArray(this$) ? globalThis.Array.isArray(that) && (this$.length === that.length && this$.every((x, idx) => equals(x)(that[idx]))) : this$ === that,
  concat: this$ => that => globalThis.Array.isArray(this$) || typeof this$ === "string" ? this$.concat(that) : this$["fantasy-land/concat"](that),
  empty: typeRep => (() => {
    switch (typeRep.name) {
      case "Array":
        return [];
      case "Object":
        return {};
      case "String":
        return "";
      case "Set":
      case "Map":
        return globalThis.Reflect.construct(typeRep, [[]]);
      default:
        return typeRep["fantasy-land/empty"]();
    }
  })(),
  reduce: f => y => x => x[globalThis.Array.isArray(x) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y),
  reduceRight: f => y => x => x.reduceRight((y, x) => f(y)(x), y),
  filter: f => x => globalThis.Array.isArray(x) ? x.filter(x => f(x)) : x["fantasy-land/filter"](f),
  reject: f => filter(x => !f(x)),
  map: f => x => globalThis.Array.isArray(x) ? x.map(x => f(x)) : x["fantasy-land/map"](f),
  flip: f => y => x => f(x)(y),
  of: typeRep => (() => {
    switch (typeRep.name) {
      case "Array":
        return globalThis.Array.of;
      case "Function":
        return x => y => x;
      case "Set":
        return x => globalThis.Reflect.construct(typeRep, [[x]]);
      default:
        return typeRep["fantasy-land/of"];
    }
  })(),
  chain: f => x => globalThis.Array.isArray(x) ? x.flatMap(x => f(x)) : x["fantasy-land/chain"](f),
  contains: this$ => these => reduce(x => that => x || equals(this$)(that))(false)(these)
};
const excerpt = [p(["I've been using Alex Gorbatchev's ", a({
  href: "http://alexgorbatchev.com/wiki/SyntaxHighlighter"
})(["SyntaxHighlighter"]), "\n    to syntactically display code of various languages for several\n    months now. When I decided to post an AppleScript snippet, however,\n    I realised that I was out of luck. SyntaxHighlighter does not\n    include an AppleScript \"brush\", and a quick flick through the ", a({
  href: "http://alexgorbatchev.com/forums/"
})(["SyntaxHighlighter forums"]), " did not bring me any joy."]), p([strong(["How hard could it be to write a brush for AppleScript?"]), ",\n    I wondered. The handy guide to ", a({
  href: "http://alexgorbatchev.com/wiki/SyntaxHighlighter:Brushes:Custom"
})(["developing a custom brush"]), " got me started, and I was soon\n    busy trying to encapsulate AppleScript's syntax", $2014, "along with its\n    keywords and countless words and phrases with special meanings", $2014, "into a handful of regular expressions."])];
const body = [p([a({
  href: "#setup"
})(["Skip to setup instructions"])]), ...excerpt, p(["Having created the brush (that's SyntaxHighlighter lingo for\n    the JavaScript file containing the language-specific regular\n    expressions), I proceeded to create a style sheet that would\n    display AppleScript snippets on the Web as they appear on OS X.\n    You can judge my success by comparing the three snippets below:\n    the first is a screenshot of Script Editor's rendering; the\n    second is a screenshot of the same snippet as it appears in my\n    browser; and the final snippet is text rendered by ", em(["your"]), "\n    browser."]), captioned$002Dimages([{
  alt: "",
  src: "/images/posts/15/script-editor-syntax-highlighting.png",
  caption: ["Screenshot of Script Editor's rendering of an AppleScript snippet"]
}, {
  alt: "",
  src: "/images/posts/15/syntaxhighlighter-applescript-theme.png",
  caption: ["Screenshot of snippet styled by AppleScript theme for SyntaxHighlighter"]
}]), code$002Dblock("applescript")(`#!/usr/bin/osascript

(*
    This handler determines whether someone is happy.
    It's actually just a good way to showcase AppleScript syntax highlighting using Alex Gorbatchev's SyntaxHighlighter.
    (* Hey, nested comments. Woot! *)
*)

on user_is_happy()
    -- determine which application is currently frontmost
    tell application "System Events" to set app_list to the name of application processes whose frontmost is true
    set front_app to the first item of app_list
    tell application "Finder"
        activate
        display dialog ¬
            "Enter your name" default answer "" buttons {"Cancel", "OK"} ¬
            default button 2 with icon note
        set user_name to the text returned of the result
        (* The word "return" in the line below should not be in bold. The regex does its best to determine whether the word is being used in a return statement or as a line return. *)
        display dialog "Hello, " & user_name & "!" & return & return & ¬
            "Are you happy?" buttons {"Yes", "No"} with icon note
        set is_happy to the button returned of the result
    end tell
    -- activate the application that was frontmost initially
    tell application front_app to activate
    return is_happy = "Yes" -- this time the word "return" should be in bold
end user_is_happy

if user_is_happy() then
    say "Woohoo!" using "Alex"
else
    repeat 3 times
        beep
        delay 0.5
    end repeat
end if
`), p$0027({
  class: "caption"
})(["Live rendering of AppleScript snippet"]), h3$0027({
  id: "setup"
})(["Setup"]), p(["To add AppleScript syntax highlighting to your own site or blog,\n    do the following:"]), ol([li([p(["Download ", a({
  href: "http://alexgorbatchev.com/wiki/SyntaxHighlighter"
})(["SyntaxHighlighter"]), ", and follow the setup instructions."])]), li([p(["Download ", a({
  href: "https://bitbucket.org/davidchambers/applescript-theme/raw/default/shBrushAppleScript.js"
})(["AppleScript brush"]), ",\n        and upload it to your SyntaxHighlighter ", strong(["scripts"]), "\n        directory."])]), li([p(["Download ", a({
  href: "https://bitbucket.org/davidchambers/applescript-theme/raw/default/shThemeAppleScript.css"
})(["AppleScript theme"]), ",\n        and upload it to your SyntaxHighlighter ", strong(["styles"]), "\n        directory."])]), li([p(["Include the brush like so:"]), code$002Dblock("html")(`<script src="/path/to/scripts/shCore.js"></script>
<script src="/path/to/scripts/shBrushAppleScript.js"></script>
<script>SyntaxHighlighter.all()</script>
`)])]), h3$0027({
  id: "usage"
})(["Usage"]), p(["To have SyntaxHighlighter parse a block of AppleScript,\n    wrap the code in ", code(["pre"]), " tags like so:"]), code$002Dblock("html")(`<pre class="brush: applescript; class-name: applescript;"></pre>
`), p([code(["brush: applescript;"]), " tells SyntaxHighlighter to\n    use the AppleScript brush for the text within the pre tag. ", code(["class-name: applescript;"]), " tells SyntaxHighlighter\n    to add the class name \"applescript\" to the container div\n    that is inserted into the page. (Hopefully I'm able to\n    convince Alex that the brush name should be added as a\n    class name automatically, which would remove the need to\n    include ", code(["class-name: applescript;"]), " each time.)"]), update(datetime("2012-02-22")("23:11:00")("America/Los_Angeles"))([p(["Providing a ", code(["class-name"]), " in the, ahem, class name\n      is no longer necessary (apparently I made a convincing argument).\n      This is now sufficient:"]), code$002Dblock("html")(`<pre class="brush:applescript"></pre>
`)]), p(["Note that including ", code(["ruler: true;"]), " will have no effect.\n    Since AppleScript is displayed in a variable-width font, the ruler\n    serves no purpose. The ruler is still inserted into the page\n    (unless ", code(["ruler: false;"]), " is included), but is hidden\n    by the style sheet."])];
export default {
  id: 15,
  slug: "applescript-syntax-highlighting",
  title: ["AppleScript syntax highlighting"],
  datetime: datetime("2009-06-04")("03:12:00")("Pacific/Auckland"),
  tags: ["applescript", "javascript", "mac-os-x", "syntaxhighlighter"],
  body
};
