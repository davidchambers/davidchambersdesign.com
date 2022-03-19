(import* [:base "../elements" "../components"] {

  :id 57

  :title "Empty collections are valid cache data"

  :datetime (datetime "2010-07-06" "09:34:00" :Pacific/Auckland)

  :tags [:django]

  :body [

    (p
       ["When using Django's cache, ensure that empty collections
         (" (code "[]") ", " (code "()") ", " (code "{}") ") are
         treated as valid cache data."])

    (code-block :python

       "
       cached = cache.get(cache_key)
       if cached:
           return cached

       # perform expensive operation
       ")

    (p
       ["In the above snippet, if the call to " (code "get") "
         returns an empty collection the cached result is ignored
         and the value is recalculated unnecessarily."])

    (p
       ["Avoid this by explicitly comparing the return value to "
        (code "None") ":"])

    (code-block :python

       "
       cached = cache.get(cache_key)
       if cached is not None: # much better!
           return cached
       ")

    (p
       ["Django's documentation wisely advises against caching the
         literal value " (code "None") ", and the above snippet makes
         it clear why this is good advice – the " (code "get") " method
         returns " (code "None") " when the cache does not contain an
         entry for the supplied key."])

  ]

})
