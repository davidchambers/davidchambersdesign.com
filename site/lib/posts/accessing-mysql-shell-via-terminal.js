import {a, code, p} from "../elements.js";
import {code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const body = [p(["Certain things are extremely well documented on the Web; certain\n    other things, however, seem to appear only deep in the comments\n    of obscure blog entries."]), p(["The problem I encountered a few minutes ago fell squarely in the\n    latter category. I simply wanted to know how to access the MySQL\n    shell from the OS X Terminal. I expected my Google search for ", code(["MySQL console Terminal \"OS X\""]), " to return several\n    useful results, but this was not the case."]), p(["I managed to find the solution in a thread with subject ", a({
  href: "http://www.oreillynet.com/cs/user/view/cs_msg/7078#id_7118"
})(["error 1044 and 1045"]), ":"]), code$002Dblock("console")(`mysql -u root -p mysql
`)];
export default {
  id: 34,
  slug: "accessing-mysql-shell-via-terminal",
  title: ["Accessing MySQL shell via Terminal"],
  datetime: datetime("2010-01-08 13:49:00 (Pacific/Auckland)"),
  tags: ["mac-os-x", "mysql", "terminal.app"],
  body
};
