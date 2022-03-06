(import* [:base "../elements" "../components"] {

  :title "Multisession CD burning in Snow Leopard"

  :datetime (datetime "2009-10-27" "08:58:00" :Pacific/Auckland)

  :tags [:mac-os-x :snow-leopard]

  :body [

    (decorative-image "/images/posts/decorative/right/disk-utility-icon.png")

    (p
       ["The days of the compact disc are surely numbered. The "
        (a "http://www.apple.com/macbookair/" "MacBook Air") "
         is the first computer from Apple to jettison the optical
         drive; others will undoubtedly follow, eventually."])

    (p
       ["Since the vast majority of Mac OS X users currently possess the
         means to read and burn CDs, however, I thought this information --
         lifted straight from Disk Utility Help -- worth sharing. These
         instructions apply to Snow Leopard, although I would guess that
         the process is identical for older versions of OS X (the more
         recent ones, at any rate)."])

    (h3 "Recording on a recordable CD more than once")

    (p
       ["Normally, you can burn items to a recordable CD, such
         as a CD-R or CD-RW disc, only one time. However, if you
         use Disk Utility to burn the disc, you can burn items to a
         disk in more than one session as long as space is available.
         This is also called \"multisession burning.\""])

    (p
       ["To burn a disc, you need an optical drive in your computer
         or connected directly to your computer. You can’t burn a disc
         using a remote optical drive."])

    (h3 "To burn to a recordable CD so you can burn to it again:")

    (ol
       [(li
           [(p
               ["In Disk Utility, create a disk image that contains
                 the files you want to burn to the disc."])
            (p
               ["The files must be from a partition with a Mac OS
                 Extended disk format. To check a partition’s format,
                 select the disk in Disk Utility, and look at the
                 information at the bottom of the Disk Utility window."])])
        (li
           [(p
               ["Select the disk image in the list at the left,
                 and then choose Images > Burn."])])
        (li
           [(p
               ["Select the \"Leave disc appendable\" checkbox.
                 If you don’t see this option, click the triangle
                 in the upper-right corner."])])
        (li
           [(p
               ["Insert a blank recordable CD in the optical drive
                 and click Burn."])])])

    (p
       ["To add more files to the disc later, follow the steps above.
         You can continue this process until all available space on the
         disc is used."])

  ]

})
