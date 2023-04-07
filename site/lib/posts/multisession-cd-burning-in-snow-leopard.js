import {a, h3, img, li, ol, p} from "../elements.js";
import {$2014} from "../components.js";
import datetime from "../datetime.js";
const body = [p([img({
  alt: "",
  src: "/images/posts/decorative/right/disk-utility-icon.png"
})]), p(["The days of the compact disc are surely numbered. The ", a({
  href: "http://www.apple.com/macbookair/"
})(["MacBook Air"]), "\n    is the first computer from Apple to jettison the optical\n    drive; others will undoubtedly follow, eventually."]), p(["Since the vast majority of Mac OS X users currently possess the\n    means to read and burn CDs, however, I thought this information", $2014, "lifted straight from Disk Utility Help", $2014, "worth sharing.\n    These instructions apply to Snow Leopard, although I would guess\n    that the process is identical for older versions of OS X (the more\n    recent ones, at any rate)."]), h3(["Recording on a recordable CD more than once"]), p(["Normally, you can burn items to a recordable CD, such\n    as a CD-R or CD-RW disc, only one time. However, if you\n    use Disk Utility to burn the disc, you can burn items to a\n    disk in more than one session as long as space is available.\n    This is also called \"multisession burning.\""]), p(["To burn a disc, you need an optical drive in your computer\n    or connected directly to your computer. You can’t burn a disc\n    using a remote optical drive."]), h3(["To burn to a recordable CD so you can burn to it again:"]), ol([li([p(["In Disk Utility, create a disk image that contains\n        the files you want to burn to the disc."]), p(["The files must be from a partition with a Mac OS\n        Extended disk format. To check a partition’s format,\n        select the disk in Disk Utility, and look at the\n        information at the bottom of the Disk Utility window."])]), li([p(["Select the disk image in the list at the left,\n        and then choose Images > Burn."])]), li([p([`Select the "Leave disc appendable" checkbox.
        If you don’t see this option, click the triangle
        in the upper-right corner.`])]), li([p(["Insert a blank recordable CD in the optical drive\n         and click Burn."])])]), p(["To add more files to the disc later, follow the steps above.\n    You can continue this process until all available space on the\n    disc is used."])];
export default {
  id: 29,
  slug: "multisession-cd-burning-in-snow-leopard",
  title: ["Multisession CD burning in Snow Leopard"],
  datetime: datetime("2009-10-27 08:58:00 (Pacific/Auckland)"),
  tags: ["mac-os-x", "snow-leopard"],
  body
};
