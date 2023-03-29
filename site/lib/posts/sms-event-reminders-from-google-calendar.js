import {text, a, article, article$0027, aside, aside$0027, b, blockquote, blockquote$0027, body$0027, code, code$0027, dd, dd$0027, del, del$0027, div, dl, dl$0027, dt, dt$0027, em, em$0027, embed, footer, footer$0027, h1, h1$0027, h2, h2$0027, h3, h3$0027, h4, h4$0027, h5, h5$0027, h6, h6$0027, head, head$0027, header, header$0027, hr, hr$0027, html, html$0027, i, i$0027, img, ins, ins$0027, li, li$0027, linearGradient, link, mask, meta, nav, nav$0027, object, ol, ol$0027, p, p$0027, param, path, pre, pre$0027, rect, script, span, stop, strong, strong$0027, svg, time, title, title$0027, ul, ul$0027, var$, var$0027, video} from "../elements.js";
import {captioned$002Dimages} from "../components.js";
import datetime from "../datetime.js";
const Prelude = {
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
  _apply: name => args => target => target[name].apply(target, args),
  apply: args => target => target.apply(target, args),
  construct: constructor => args => Reflect.construct(constructor, args),
  typeof: x => x === null ? "null" : typeof x,
  match: type => Prelude["match'"](type)(x => CasesNotExhaustive),
  ["match'"]: type => type[Symbol.for("match")],
  id: x => x,
  const: x => y => x,
  not: x => !x,
  equals: this$ => that => Array.isArray(this$) ? Array.isArray(that) && (this$.length === that.length && this$.every((x, idx) => Prelude.equals(x)(that[idx]))) : this$ === that,
  concat: this$ => that => Array.isArray(this$) || typeof this$ === "string" ? this$.concat(that) : this$["fantasy-land/concat"](that),
  reduce: f => y => x => x[Array.isArray(x) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y),
  reduceRight: f => y => x => x.reduceRight((y, x) => f(y)(x), y),
  filter: f => x => Array.isArray(x) ? x.filter(x => f(x)) : x["fantasy-land/filter"](f),
  reject: f => Prelude.filter(x => Prelude.not(f(x))),
  map: f => x => Array.isArray(x) ? x.map(x => f(x)) : x["fantasy-land/map"](f),
  flip: f => y => x => f(x)(y),
  chain: f => x => Array.isArray(x) ? x.flatMap(x => f(x)) : x["fantasy-land/chain"](f)
};
const {operators, _apply, apply, construct, typeof: typeof$, match, ["match'"]: match$0027, id, const: const$, not, equals, concat, reduce, reduceRight, filter, reject, map, flip, chain} = Prelude;
const excerpt$002Dtext = [p(["I tend to forget things. Until recently, I had no system to\n    keep track of appointments. I began using Google Calendar,\n    but soon realised that I did not want ", em(["another"]), "\n    thing to check each day."]), p([strong(["Enter event reminders."]), " With Google Calendar sending\n    event reminders to my inbox, I no longer had to check my calendar\n    each day. Google Calendar can now send event reminders via text\n    message. ", strong(["Below is a walk through of the steps involved\n    in setting up SMS event reminders in Google Calendar."])])];
const excerpt$002Dimage = [captioned$002Dimages([{
  alt: "Mobile Setup tab in Google Calendar",
  src: "/images/posts/13/mobile-setup-tab-in-google-calendar.png",
  caption: [strong(["Mobile Setup"]), " tab in Google Calendar"]
}])];
const body = [...excerpt$002Dtext, p(["The first step is to open ", a({
  href: "http://calendar.google.com/"
})(["Google Calendar"]), ".\n    Once you have signed in, you will see several links at the\n    top right of the page. Click on ", strong(["Settings"]), "."]), captioned$002Dimages([{
  alt: "Settings link in Google Calendar",
  src: "/images/posts/13/settings-link-in-google-calendar.png",
  caption: [strong(["Settings"]), " link in Google Calendar"]
}]), p(["Next, click on the ", strong(["Mobile Setup"]), " tab."]), ...excerpt$002Dimage, p(["Enter your cell phone number and click ", strong(["Send Verification Code"]), ". In a matter of seconds you should\n    receive a text message from Google containing the verification code.\n    Enter the code and click ", strong(["Finish setup"]), "."]), captioned$002Dimages([{
  alt: "Phone number successfully validated",
  src: "/images/posts/13/phone-number-successfully-validated.png",
  caption: ["Confirmation of phone number validation"]
}]), p(["Once your phone number has been validated you should be taken to the ", strong(["Notifications"]), " pane. If not, go there by clicking on ", strong(["Settings"]), ", then the ", strong(["Calendars"]), " tab, then ", strong(["Notifications"]), "."]), captioned$002Dimages([{
  alt: "Event reminders in Google Calendar",
  src: "/images/posts/13/event-reminders-in-google-calendar.png",
  caption: ["Google Calendar's ", strong(["Notifications"]), " pane,\n      where default event reminders are set"]
}]), p(["You're then able to set default event reminders, which may include\n    one or more text messages. You'll also be able to add SMS reminders\n    against individual calendar events."])];
export default {
  id: 13,
  slug: "sms-event-reminders-from-google-calendar",
  title: ["SMS event reminders from Google Calendar"],
  datetime: datetime("2009-04-18")("21:44:00")("Pacific/Auckland"),
  tags: ["gmail", "google-calendar", "sms"],
  body
};
