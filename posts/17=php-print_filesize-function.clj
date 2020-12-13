(import* ["../src/elements.clj" "../src/components.clj"] {

  :title "PHP print_filesize function"

  :datetime (datetime "2009-06-10" "21:17:00" :Pacific/Auckland)

  :tags ["best practice" "PHP"]

  :body [

    (excerpt
       [(p
           ["Recently I've been on a drive to eliminate dependencies from my
             code and other areas, such as blog posts. For those who create
             content for the Web, a reasonably common task is to provide links
             to files that can be downloaded. It is considered good practice
             to include an indication of a file's size; for example: "
            (a "/favicon.ico" "favicon.ico") " (3 KB)."])

        (p
           ["As I was about to hard-code a file's size into a blog post
             recently, I thought to myself: " (strong "Will I remember to
             update this if the file's size changes?") " More importantly,
             should I be required to remember such things? The answer,
             of course, is no. I set about writing a function that would
             allow the file's size to be displayed dynamically."])])

    (code-block
       "<?php

        /**
         * echoes nicely formatted filesize
         * @param string $filename
         * @param string $before
         * @param string $after
         */
        function print_filesize($filename, $before = ' <span class=\"filesize\">(', $after = ')</span>')
        {
            if (file_exists($filename))
            {
                $size = filesize($filename);
                $unit = 'B';

                if (intval($size/(1024*1024*1024)))
                {
                    $size = number_format(($size/(1024*1024*1024)), 1);
                    $unit = 'GB';
                }
                elseif (intval($size/(1024*1024)))
                {
                    $size = number_format(($size/(1024*1024)), 1);
                    $unit = 'MB';
                }
                elseif (intval($size/1024))
                {
                    $size = number_format(($size/1024), 1);
                    $unit = 'KB';
                }

                $approx = $unit == 'B' ? '' : '≈' ;

                echo \"{$before}{$approx}{$size} {$unit}{$after}\";
            }
        }

        ?>")

    (p
       ["Example usage:"])

    (code-block
       "<a href=\"favicon.ico\">favicon.ico</a><?php print_filesize('favicon.ico'); ?>")

    (p
       ["This gives: " (a "/favicon.ico" "favicon.ico") " "
        (span {:class "filesize"} "(≈1.1 kB)") ". By default, the function
         wraps the file's size in a " (code "span") " element with "
        (code "class=\"filesize\"") ", to provide a hook for styling
         if required."])

  ]

})