import {h3, h4, p, a, code, em} from "../elements.js";
import {code$002Dblock, $2014} from "../components.js";
import datetime from "../datetime.js";
const excerpt = [p([a({
  href: "http://en.wikipedia.org/wiki/Closure_(computer_science)"
})(["Closure"]), " is truly wonderful. JavaScript", $2014, "despite its\n    plethora of quirks", $2014, "is now widely appreciated, thanks in large\n    part to its lexical scoping. Python 3 is lexically-scoped, too, as\n    the following code demonstrates."]), code$002Dblock("python")(`def cache(saved=None):
    def _(thing=None):
        nonlocal saved
        if thing is not None:
            saved = thing
        return saved
    return _
cache = cache()
`), p(["If (the rebound) ", code(["cache"]), " is passed no arguments\n    (or ", code(["None"]), "), ", code(["saved"]), " is returned.\n    Otherwise, ", code(["thing"]), " is assigned to ", code(["saved"]), "\n    and returned."]), code$002Dblock("TK")(`>>> cache(2**3)
8
>>> cache()
8
`), p(["This works thanks to the ", code(["nonlocal"]), " keyword\n    introduced in Python 3, which enables variables in outer\n    scopes to be rebound. So how would one achieve the same\n    result in earlier versions of Python?"])];
const body = [...excerpt, h3(["Bringing lexical scoping to Python 2.x"]), code$002Dblock("python")(`def cache(saved=None):
    def _(thing=None):
        # nonlocal saved
        if thing is not None:
            saved = thing
        return saved
    return _
cache = cache()
`), p(["The ", code(["nonlocal"]), " line is commented out as it's a syntax\n    error in Python 2.x."]), code$002Dblock("TK")(`>>> cache(2**3)
8
>>> cache()
...
UnboundLocalError: local variable 'saved' referenced before assignment
`), p(["When ", code(["cache"]), " is passed a (non-", code(["None"]), ") ", code(["thing"]), ", a ", em(["new"]), " ", code(["saved"]), " is\n    created within the local scope. When ", code(["cache"]), " is\n    passed no arguments (or ", code(["None"]), "), execution skips\n    to ", code(["return saved"]), ". At this point, ", code(["saved"]), "\n    is expected to exist within the local scope – it does not,\n    which explains the ", code(["UnboundLocalError"]), "."]), p(["It is possible to simulate lexical scoping in Python 2.x.\n    The approaches I find most palatable utilize a dictionary\n    or a function object as a namespace accessible to both the\n    inner and outer functions."]), h4(["Dictionary"]), code$002Dblock("python")(`def cache():
    ns = {'saved': None}
    def _(thing=None):
        if thing is not None:
            ns['saved'] = thing
        return ns['saved']
    return _
cache = cache()
`), h4(["Function object"]), code$002Dblock("python")(`def cache():
    def ns(): pass
    ns.saved = None
    def _(thing=None):
        if thing is not None:
            ns.saved = thing
        return ns.saved
    return _
cache = cache()
`), p(["The dictionary approach is arguably more correct, but subscript\n    notation hurts my eyes so I prefer to stick things on a function\n    object. It's useful that ", code(["def ns(): pass"]), " looks odd, as\n    it alerts the reader to the fact that something ", em(["is"]), " odd."])];
export default {
  id: 78,
  slug: "simulating-nonlocal-in-python-2.x",
  title: ["Simulating ", code(["nonlocal"]), " in Python 2.x"],
  datetime: datetime("2011-02-05 19:30:00 (America/Los_Angeles)"),
  tags: ["hacks", "programming", "python"],
  body
};
