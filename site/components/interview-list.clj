(import ["../elements"]

(let [s (require "../sanctuary")]

   (interviewer interviewee exchange ->
      (ol (s/snd (s/reduce (s/pair (name items quotation ->
                                      (if (s/equals interviewer name)
                                          (s/Pair interviewee
                                                  (s/append (li' {:class "interviewer"}
                                                               (s/concat [(strong (s/concat interviewer ":")) " "] quotation))
                                                            items))
                                          (s/Pair interviewer
                                                  (s/append (li' {}
                                                               (s/concat [(strong (s/concat interviewee ":")) " "] quotation))
                                                            items)))))
                           (s/Pair interviewer [])
                           (s/map canonicalize-children exchange)))))))