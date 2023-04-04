import {a, p, strong} from "../elements.js";
import {captioned$002Dimages, update} from "../components.js";
import datetime from "../datetime.js";
const body = [p(["I love ", a({
  href: "http://www.panic.com/coda/"
})(["Coda"]), ".\n    It's just so... sexy, somehow. I've just discovered ", a({
  href: "http://www.djangoproject.com/"
})(["Django"]), ", with which\n    I'm fast falling in love as well. Naturally, when I came to write\n    my first Django template I opened Coda.app and started coding."]), p(["It soon became apparent, however, that ", strong(["Coda does not apply\n    syntax highlighting to Django"]), ". The solution? Juan Pablo Claude's ", a({
  href: "http://weblog.bignerdranch.com/?p=49"
})(["Django and Django-template bundles for Coda"]), "."]), captioned$002Dimages([{
  alt: "Django syntax highlighting in Coda",
  src: "/images/posts/11/django-syntax-highlighting-in-coda.png",
  caption: ["Django syntax highlighting in Coda"]
}]), update(datetime("2010-11-14")("14:00:00")("Australia/Sydney"))([p(["I've since discovered an alternative mode which\n      is actively maintained over on GitHub. I now use ", a({
  href: "https://github.com/jbergantine/Django-Template"
})(["jbergantine's Django-Template"]), "."])])];
export default {
  id: 11,
  slug: "django-syntax-highlighting-for-coda",
  title: ["Django syntax highlighting for Coda"],
  datetime: datetime("2009-04-16")("22:15:00")("Pacific/Auckland"),
  tags: ["coda", "django", "mac-os-x"],
  body
};
