import {p} from "../elements.js";
import {code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const body = [p(["Those of us running Mac OS X are spoilt by Keychain Access.\n    It's no help, of course, to have a password stored in your Mac's\n    keychain if you're at an Internet café unable to access it.\n    Thus, memorable passwords are still useful."]), p(["Those of us who write code can create passwords riddled with\n    spaces and punctuation without resorting to the use of random\n    strings of characters. Here's a \"JavaScript\" password,\n    for example:"]), code$002Dblock("javascript")(`var favourites = { book: 'Collapse', game: 'Agricola', site: 'ted.com' };
`), p(["Carefully written passwords wrapping personal information\n    in programming syntax should be both strong and memorable.\n    I'm sure Perl programmers could write some concise, cryptic\n    passwords using this approach. ;)"])];
export default {
  id: 28,
  slug: "memorable-passwords-for-programmers",
  title: ["Memorable passwords for programmers"],
  datetime: datetime("2009-10-21 00:42:00 (Pacific/Auckland)"),
  tags: ["security"],
  body
};
