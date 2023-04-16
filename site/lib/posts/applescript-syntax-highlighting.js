import {h3$0027, p$0027, p, ol, li, a, code, em, strong} from "../elements.js";
import {captioned$002Dimages, code$002Dblock, update, $2014} from "../components.js";
import datetime from "../datetime.js";
const excerpt = [p(["I've been using Alex Gorbatchev's ", a({
  href: "http://alexgorbatchev.com/wiki/SyntaxHighlighter"
})(["SyntaxHighlighter"]), " ", "to syntactically display code of various languages for several ", "months now. When I decided to post an AppleScript snippet, however, ", "I realised that I was out of luck. SyntaxHighlighter does not ", "include an AppleScript \"brush\", and a quick flick through the ", a({
  href: "http://alexgorbatchev.com/forums/"
})(["SyntaxHighlighter forums"]), " did not bring me any joy."]), p([strong(["How hard could it be to write a brush for AppleScript?"]), ", ", "I wondered. The handy guide to ", a({
  href: "http://alexgorbatchev.com/wiki/SyntaxHighlighter:Brushes:Custom"
})(["developing a custom brush"]), " got me started, and I was soon ", "busy trying to encapsulate AppleScript's syntax", $2014, "along with its ", "keywords and countless words and phrases with special meanings", $2014, "into a handful of regular expressions."])];
const body = [p([a({
  href: "#setup"
})(["Skip to setup instructions"])]), ...excerpt, p(["Having created the brush (that's SyntaxHighlighter lingo for ", "the JavaScript file containing the language-specific regular ", "expressions), I proceeded to create a style sheet that would ", "display AppleScript snippets on the Web as they appear on OS X. ", "You can judge my success by comparing the three snippets below: ", "the first is a screenshot of Script Editor's rendering; the ", "second is a screenshot of the same snippet as it appears in my ", "browser; and the final snippet is text rendered by ", em(["your"]), " ", "browser."]), captioned$002Dimages([{
  alt: "",
  src: "/images/posts/15/script-editor-syntax-highlighting.png",
  caption: ["Screenshot of Script Editor's rendering of an AppleScript snippet"]
}, {
  alt: "",
  src: "/images/posts/15/syntaxhighlighter-applescript-theme.png",
  caption: ["Screenshot of snippet styled by AppleScript theme for SyntaxHighlighter"]
}]), code$002Dblock("applescript")("#!/usr/bin/osascript\n\n(*\n    This handler determines whether someone is happy.\n    It's actually just a good way to showcase AppleScript syntax highlighting using Alex Gorbatchev's SyntaxHighlighter.\n    (* Hey, nested comments. Woot! *)\n*)\n\non user_is_happy()\n    -- determine which application is currently frontmost\n    tell application \"System Events\" to set app_list to the name of application processes whose frontmost is true\n    set front_app to the first item of app_list\n    tell application \"Finder\"\n        activate\n        display dialog ¬\n            \"Enter your name\" default answer \"\" buttons {\"Cancel\", \"OK\"} ¬\n            default button 2 with icon note\n        set user_name to the text returned of the result\n        (* The word \"return\" in the line below should not be in bold. The regex does its best to determine whether the word is being used in a return statement or as a line return. *)\n        display dialog \"Hello, \" & user_name & \"!\" & return & return & ¬\n            \"Are you happy?\" buttons {\"Yes\", \"No\"} with icon note\n        set is_happy to the button returned of the result\n    end tell\n    -- activate the application that was frontmost initially\n    tell application front_app to activate\n    return is_happy = \"Yes\" -- this time the word \"return\" should be in bold\nend user_is_happy\n\nif user_is_happy() then\n    say \"Woohoo!\" using \"Alex\"\nelse\n    repeat 3 times\n        beep\n        delay 0.5\n    end repeat\nend if\n  "), p$0027({
  class: "caption"
})(["Live rendering of AppleScript snippet"]), h3$0027({
  id: "setup"
})(["Setup"]), p(["To add AppleScript syntax highlighting to your own site or blog, ", "do the following:"]), ol([li([p(["Download ", a({
  href: "http://alexgorbatchev.com/wiki/SyntaxHighlighter"
})(["SyntaxHighlighter"]), ", and follow the setup instructions."])]), li([p(["Download ", a({
  href: "https://bitbucket.org/davidchambers/applescript-theme/raw/default/shBrushAppleScript.js"
})(["AppleScript brush"]), ", ", "and upload it to your SyntaxHighlighter ", strong(["scripts"]), " ", "directory."])]), li([p(["Download ", a({
  href: "https://bitbucket.org/davidchambers/applescript-theme/raw/default/shThemeAppleScript.css"
})(["AppleScript theme"]), ", ", "and upload it to your SyntaxHighlighter ", strong(["styles"]), " ", "directory."])]), li([p(["Include the brush like so:"]), code$002Dblock("html")("<script src=\"/path/to/scripts/shCore.js\"></script>\n<script src=\"/path/to/scripts/shBrushAppleScript.js\"></script>\n<script>SyntaxHighlighter.all()</script>\n      ")])]), h3$0027({
  id: "usage"
})(["Usage"]), p(["To have SyntaxHighlighter parse a block of AppleScript, ", "wrap the code in ", code(["pre"]), " tags like so:"]), code$002Dblock("html")("<pre class=\"brush: applescript; class-name: applescript;\"></pre>\n  "), p([code(["brush: applescript;"]), " tells SyntaxHighlighter to ", "use the AppleScript brush for the text within the pre tag. ", code(["class-name: applescript;"]), " tells SyntaxHighlighter ", "to add the class name \"applescript\" to the container div ", "that is inserted into the page. (Hopefully I'm able to ", "convince Alex that the brush name should be added as a ", "class name automatically, which would remove the need to ", "include ", code(["class-name: applescript;"]), " each time.)"]), update(datetime("2012-02-22 23:11:00 (America/Los_Angeles)"))([p(["Providing a ", code(["class-name"]), " in the, ahem, class name ", "is no longer necessary (apparently I made a convincing argument). ", "This is now sufficient:"]), code$002Dblock("html")("<pre class=\"brush:applescript\"></pre>\n    ")]), p(["Note that including ", code(["ruler: true;"]), " will have no effect. ", "Since AppleScript is displayed in a variable-width font, the ruler ", "serves no purpose. The ruler is still inserted into the page ", "(unless ", code(["ruler: false;"]), " is included), but is hidden ", "by the style sheet."])];
export default {
  id: 15,
  slug: "applescript-syntax-highlighting",
  title: ["AppleScript syntax highlighting"],
  datetime: datetime("2009-06-04 03:12:00 (Pacific/Auckland)"),
  tags: ["applescript", "javascript", "mac-os-x", "syntaxhighlighter"],
  body
};
