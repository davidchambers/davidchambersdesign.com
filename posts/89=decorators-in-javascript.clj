(import* ["../src/elements.clj" "../src/components.clj"] {

  :title "Decorators in JavaScript"

  :datetime (datetime "2011-07-26" "22:00:00" :America/Los_Angeles)

  :tags [:coffeescript :javascript :programming]

  :body [

    (p
       ["A decorator is a function which takes a function and returns
         a function:"])

    (code-block :coffeescript

       "decorator = (fn) -> fn")

    (p
       ["Obviously, this doesn't do anything useful. It's the fact that a
         decorator can return a function which behaves " (em "similarly") "
         to the function passed to it that makes the pattern interesting.
         Commonly a decorator will simply wrap a function invocation in a
         check of some sort:"])

    (code-block :javascript

       "var loginRequired = function (fn) {
          return function () {
            if (!user.authenticated) {
              return window.location.replace('/login');
            }
            fn.apply(null, [].slice.apply(arguments));
          };
        };")

    (p
       ["The above decorator could be used to \"guard\" actions that only
         authenticated users are permitted to perform:"])

    (code-block :javascript

       "var changeUsername = loginRequired(function (username) {
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
          })});")

    (p
       ["The CoffeeScript equivalent is quite a bit clearer:"])

    (code-block :coffeescript

       "changeUsername = loginRequired (username) ->
          $.ajax
            type: 'PUT'
            url: \"/api/1.0/users/#{user.id}\"
            data: {username}

        changePassword = loginRequired (password) ->
          $.ajax
            type: 'PUT'
            url: \"/api/1.0/users/#{user.id}\"
            data: {password}

        deleteAccount = loginRequired ->
          $.ajax
            type: 'DELETE'
            url: \"/api/1.0/users/#{user.id}\"")

    (p
       ["Decorators are commonly used in Python -- which provides special
         syntax for \"decorating\" functions -- but are rarely seen in
         JavaScript code. This despite the fact that JavaScript's first-class
         functions are ideally suited to the task. Perhaps CoffeeScript's
         lighter-weight function syntax will result in decorators making
         more frequent appearances in JavaScript code."])

  ]

})
