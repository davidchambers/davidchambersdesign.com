(import* ["../src/elements.clj" "../src/components.clj"] {

  :title "Accessing MySQL shell via Terminal"

  :datetime (datetime "2010-01-08" "13:49:00" :Pacific/Auckland)

  :tags ["Mac OS X" "MySQL" "Terminal.app"]

  :body [

    (p
       ["Certain things are extremely well documented on the Web; certain
         other things, however, seem to appear only deep in the comments
         of obscure blog entries."])

    (p
       ["The problem I encountered a few minutes ago fell squarely in the
         latter category. I simply wanted to know how to access the MySQL
         shell from the OS X Terminal. I expected my Google search for "
        (code "MySQL console Terminal \"OS X\"") " to return several
         useful results, but this was not the case."])

    (p
       ["I managed to find the solution in a thread with subject "
        (a "http://www.oreillynet.com/cs/user/view/cs_msg/7078#id_7118"
           "error 1044 and 1045") ":"])

    (code-block
       "mysql -u root -p mysql")

  ]

})