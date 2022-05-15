(import ["../elements"]

(let [
  code-block          (require "../components/code-block")
  datetime            (require "../datetime")
] {

  :id 54

  :slug "first-matching-item"

  :title "First matching item"

  :datetime (datetime "2010-06-17" "23:17:00" :Pacific/Auckland)

  :tags [:programming]

  :body [

    (p
       ["When writing code one often needs to grab the first item in
         a collection that has certain characteristics. For example,
         one may have a list of " (code "Student") " objects and need
         to fetch the one with a certain id."])

    (p
       ["The task is trivial: loop through the list and compare each
         student's id until a match is found or all the students in
         the list have been inspected, whichever comes first."])

    (p
       ["In the past, I've tended to take advantage of return statements
         to exit the loop as soon as a match is found. The examples here
         are in Python, but the same patterns apply to other languages."])

    (code-block :python

       "
       def student_by_id(students, id):
           for student in students:
               if student.id == id:
                   return student
           return None
       ")

    (p
       ["This appoach strikes me as inelegant when the function is called
         in one place only. Today a different approached occurred to me."])

    (code-block :python

       "
       student = None
       for student in students:
           if student.id == id:
               break
           student = None
       ")

    (p
       ["Here, we break out of the loop as soon as a match
         is found, preserving the student of interest in the
         variable " (code "student") ". Each time through the
         loop " (code "student") " is cleared to ensure that "
        (code "student") " is empty once we've finished looping
         if there are no matches."])

    (p
       ["The first line is required to handle empty lists."])

    (p
       ["I think I'll use this approach from time to time.
         Let me know if you're aware of another option."])

  ]

}))