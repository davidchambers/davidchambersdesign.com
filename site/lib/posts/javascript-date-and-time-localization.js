import {h3, p, a, code, del, i, ins, strong} from "../elements.js";
import {captioned$002Dimages, code$002Dblock, $2014} from "../components.js";
import datetime from "../datetime.js";
const excerpt = [p([strong(["This post has been a long time coming."])]), captioned$002Dimages([{
  alt: "Reminder message",
  src: "/images/posts/74/email-message-screenshot.png",
  caption: ["Reminder message, dated 18 January 2010"]
}]), p([strong(["It's unacceptable for any website or web application\n    to output dates and times using an arbitrary time zone."]), "\n    Displaying dates and times in UTC/GMT is only slightly better:\n    dates cannot be relied upon, and users must perform mental\n    gymnastics in order to localize date–time combos."])];
const body = [...excerpt, captioned$002Dimages([{
  alt: "Bitbucket status message",
  src: "/images/posts/74/gmt-ftl.png",
  caption: ["The link to a time zone converter highlights the need for localization"]
}]), p(["Implementing client-side localization of dates and times is not\n    terribly difficult", $2014, "I first managed it with only a superficial\n    understanding of JavaScript", $2014, "but it's a challenge to do so in\n    a simple, reusable manner."]), h3(["HTML5"]), p(["For localization to be possible date, time, and time zone\n    information must be stored somewhere. In the past we'd\n    have been forced to misappropriate ", code(["title"]), " or ", code(["rel"]), ", or use an unsupported attribute and accept\n    invalid markup. We can now have our cake and eat it too:\n    HTML5 sanctions arbitrary attribute names, prefixed with ", code(["data-"]), "."]), p(["As it turns out, though, HTML5 provides the perfect hook for\n    date and time localization: the ", code(["time"]), " element,\n    whose ", code(["datetime"]), " attribute provides the canonical\n    representation of a point in time."]), code$002Dblock("html")(`<time datetime="1984-04-26">26 April 1984</time>
`), p(["Simply by using the ", code(["time"]), " element correctly our\n    scripts gain access to date, time, and even time zone information."]), h3(["jQuery"]), p(["I was not quick to embrace ", a({
  href: "http://jquery.com/"
})(["jQuery"]), ".\n    Soon after I discovered DOM scripting and the incompatible DOM APIs\n    provided by the various browsers, I understood the need for a JavaScript\n    library. Soon after that I ", del(["decided"]), " ", ins(["stumbled"]), "\n    upon ", a({
  href: "http://prototypejs.org/"
})(["Prototype"]), ". More recently\n    I became an advocate of ", a({
  href: "http://mootools.net/"
})(["MooTools"]), "\n    which", $2014, "like Prototype", $2014, "fixes deficiencies in the JavaScript\n    language itself, in addition to fixing the DOM."]), p(["While reading John Resig's ", i(["Secrets of the JavaScript Ninja"]), "\n    I began at last to appreciate the beauty of jQuery's design. Having\n    embraced jQuery I set out to encapsulate the site-specific localization\n    code I'd been writing again and again in an elagant, reusable package."]), h3(["jQuery.localize"]), p(["At ", a({
  href: "http://www.atlassian.com/"
})(["Atlassian"]), " we're lucky enough\n    to have \"20 percent time\". A couple of weeks ago I spent the day working on ", a({
  href: "http://bitbucket.org/davidchambers/jquery.localize"
})(["jQuery.localize"]), ",\n    my first jQuery plugin. I've spent much of the last two weekends making the plugin\n    more flexible and documenting its relatively simple API."]), p(["Assume that a page contains the following ", code(["time"]), " element."]), code$002Dblock("html")(`<time datetime="2010-11-27T13:30-00:00">27 November 2010</time>
`), p(["We could localize this element (along with any other ", code(["time"]), "\n    elements on the page) with a simple call to ", code(["localize"]), "."]), code$002Dblock("html")(`$('time').localize();
`), p(["This updates both the visible text and the value of the ", code(["datetime"]), " attribute."]), code$002Dblock("html")(`<time datetime="2010-11-28T00:30+11:00">28 November 2010</time>
`), p(["Date and time formats are fully customizable via ", a({
  href: "http://bitbucket.org/davidchambers/jquery.localize/src#directives"
})(["directives"]), ", and there is support for ", a({
  href: "http://bitbucket.org/davidchambers/jquery.localize/src#i18n"
})(["internationalization"]), ". I won't go into the details here; there's extensive ", a({
  href: "http://bitbucket.org/davidchambers/jquery.localize/src#wiki"
})(["documentation"]), " at the project's home on Bitbucket."])];
export default {
  id: 74,
  slug: "javascript-date-and-time-localization",
  title: ["JavaScript date and time localization"],
  datetime: datetime("2010-11-28 01:45:00 (Australia/Sydney)"),
  tags: ["html5", "i18n", "javascript", "jquery", "localization", "meaningful-markup"],
  body
};
