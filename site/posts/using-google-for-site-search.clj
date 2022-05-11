(import ["../elements"]

(let [
  code-block          (require "../components/code-block")
  datetime            (require "../datetime")
] {

  :id 45

  :slug "using-google-for-site-search"

  :title "Using Google for site search"

  :datetime (datetime "2010-03-25" "22:06:00" :Pacific/Auckland)

  :tags [:google :search]

  :body [

    (excerpt

       [(p
           ["WordPress is a great piece of software, although I've never been
             satisfied with its search functionality. Last night I decided to
             switch to a very simple solution:"])

        (code-block :html

           "
           <form action=\"http://www.google.com/search\" method=\"get\">
               <div>
                   <label for=\"q\">Search davidchambersdesign.com</label>
                   <input type=\"search\" name=\"q\" id=\"q\" maxlength=\"256\" placeholder=\"search...\" />
                   <input type=\"hidden\" name=\"ie\" value=\"UTF-8\" />
                   <input type=\"hidden\" name=\"hl\" value=\"en\" />
                   <input type=\"hidden\" name=\"as_sitesearch\" value=\"davidchambersdesign.com\" />
                   <input type=\"submit\" value=\"Search\" />
               </div>
           </form>
           ")])

    (p
       ["Search queries on this site are now submitted to Google with the
         specification that only results from this domain are to be returned.
         Here's a breakdown of the various query parameters I included:"])

    (dl
       [(dt' {:class "textual"} "q")
        (dd "Search query as entered by the user.")

        (dt "ie")
        (dd "Sets the character encoding that is used to interpret the query string.")

        (dt "hl")
        (dd "Specifies the interface language (host language) of your user interface.")

        (dt "as_sitesearch")
        (dd "Limits search results to documents in the specified domain.")])

    (p
       ["If you decide to implement this yourself you may find the documentation on "
        (a "http://www.google.com/cse/docs/resultsxml.html#wsRequestParameters"
           "Google custom search request parameters") " useful."])

  ]

}))
