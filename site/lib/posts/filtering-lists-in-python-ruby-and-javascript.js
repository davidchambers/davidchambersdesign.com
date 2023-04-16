import {p, a, code} from "../elements.js";
import {code$002Dblock, $2014} from "../components.js";
import datetime from "../datetime.js";
const body = [p(["Recently I listened to ", a({
  href: "http://blog.extracheese.org/2010/02/python-vs-ruby-a-battle-to-the-death.html"
})(["Gary Bernhardt comparing Python and Ruby"]), ". In the talk Gary ", "states that he finds Ruby code ugly and Python code beautiful. ", "He then goes on to say that the things which reduce Ruby's ", "aesthetic appeal are the very things which allow Ruby to do ", "beautiful things impossible in Python."]), p(["Gary provides several examples of equivalent code in Python and ", "Ruby to highlight situations in which one language reads better ", "than the other, such as the following."]), p(["Python:"]), code$002Dblock("python")("'\\n'.join(obj.name\n    for obj in (\n        repository.retrieve(id)\n        for id in ids)\n    if obj)\n  "), p(["Ruby:"]), code$002Dblock("ruby")("ids.map do |id|\n  repository.retrieve(id)\nend.compact.map do |obj|\n  obj.name\nend.join('\\n')\n  "), p(["The Ruby code (the one beginning with ", code(["ids.map"]), ") reads top ", "to bottom and is easy to follow. The Python code is equally succinct but ", "takes a bit of effort to decipher."]), p(["I've been greatly enjoying the act of writing JavaScript lately, ", "so simply for pleasure I worked out the JavaScript equivalent."]), p(["My first attempt used the ", code(["filter"]), " array method."]), code$002Dblock("javascript")("ids.filter(function (id) {\n    var obj = repository.retrieve(id);\n    return obj && obj.name;\n}).join('\\n');\n  "), p([a({
  href: "https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/Filter"
})([code(["filter"])]), ", though, just removes from an array the ", "items which fail the provided \"test\". So the code above is ", "on the right track, but fails to produce a list of names."]), p([a({
  href: "https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/Reduce"
})([code(["reduce"])]), " is the correct method for the job. ", code(["reduce"]), " \"reduces\" an array to a single value, which ", "could be a string, an object, another array", $2014, "whatever!"]), p(["Note the empty array (", code(["[]"]), ") on line 5 – that's our ", "\"accumulator\"."]), code$002Dblock("javascript")("ids.reduce(function (ids, id) {\n    var obj = repository.retrieve(id);\n    if (obj && obj.name) ids.push(obj.name);\n    return ids;\n}, []).join('\\n');\n  "), p(["Not bad. It's not as elegant as the Ruby code, but it's not ", "\"inside out\" the way the Python code is."])];
export default {
  id: 69,
  slug: "filtering-lists-in-python-ruby-and-javascript",
  title: ["Filtering lists in Python, Ruby, and JavaScript"],
  datetime: datetime("2010-09-09 04:21:00 (Pacific/Auckland)"),
  tags: ["javascript", "programming", "python", "ruby"],
  body
};
