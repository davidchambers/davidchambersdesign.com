import {p, em} from "../elements.js";
import {code$002Dblock, $2014} from "../components.js";
import datetime from "../datetime.js";
const body = [p(["A decorator is a function which takes a function and returns a function:"]), code$002Dblock("coffeescript")(`decorator = (fn) -> fn
`), p(["Obviously, this doesn't do anything useful. It's the fact that a\n    decorator can return a function which behaves ", em(["similarly"]), "\n    to the function passed to it that makes the pattern interesting.\n    Commonly a decorator will simply wrap a function invocation in a\n    check of some sort:"]), code$002Dblock("javascript")(`var loginRequired = function (fn) {
  return function () {
    if (!user.authenticated) {
      return window.location.replace('/login');
    }
    fn.apply(null, [].slice.apply(arguments));
  };
};
`), p(["The above decorator could be used to \"guard\" actions that only\n    authenticated users are permitted to perform:"]), code$002Dblock("javascript")(`var changeUsername = loginRequired(function (username) {
  $.ajax({
    type: 'PUT',
    url: '/api/1.0/users/' + user.id,
    data: {username: username}
  })});

var changePassword = loginRequired(function (password) {
  $.ajax({
    type: 'PUT',
    url: '/api/1.0/users/' + user.id,
    data: {password: password}
  })});

var deleteAccount = loginRequired(function () {
  $.ajax({
    type: 'DELETE',
    url: '/api/1.0/users/' + user.id
  })});
`), p(["The CoffeeScript equivalent is quite a bit clearer:"]), code$002Dblock("coffeescript")(`changeUsername = loginRequired (username) ->
  $.ajax
    type: 'PUT'
    url: "/api/1.0/users/#{user.id}"
    data: {username}

changePassword = loginRequired (password) ->
  $.ajax
    type: 'PUT'
    url: "/api/1.0/users/#{user.id}"
    data: {password}

deleteAccount = loginRequired ->
  $.ajax
    type: 'DELETE'
    url: "/api/1.0/users/#{user.id}"
`), p(["Decorators are commonly used in Python", $2014, "which provides special syntax\n    for \"decorating\" functions", $2014, "but are rarely seen in JavaScript code.\n    This despite the fact that JavaScript's first-class functions are ideally\n    suited to the task. Perhaps CoffeeScript's lighter-weight function syntax\n    will result in decorators making more frequent appearances in JavaScript\n    code."])];
export default {
  id: 89,
  slug: "decorators-in-javascript",
  title: ["Decorators in JavaScript"],
  datetime: datetime("2011-07-26 22:00:00 (America/Los_Angeles)"),
  tags: ["coffeescript", "javascript", "programming"],
  body
};
