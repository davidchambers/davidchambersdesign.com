import {p, blockquote, a, em, strong, img} from "../elements.js";
import datetime from "../datetime.js";
const body = [p([img({
  alt: "DigitalColor Meter",
  src: "/images/posts/windows/digitalcolor-meter.png"
})]), p(["I thought this recent ", a({
  href: "http://minimalmac.com/post/836796290/"
})(["post on the Minimal Mac blog"]), " well worth sharing:"]), blockquote([p(["When was the last time you checked out your Utilities folder?\n      Well, if your answer was “What’s that?” then let me explain.\n      Inside of your Applications folder is another folder called\n      Utilities that is filled with all sorts of wondrous things\n      that most people either don’t know or completely forget are\n      there. Even veteran Mac users are guilty of this. I know I am."]), p([strong(["DigitalColor Meter"]), " is one example of this. The other\n      day, I wanted to find out the ", strong(["web safe color"]), " of a\n      particular item on the screen of my Mac for a web design project\n      I was working on. My first step was to go searching the Internet\n      for such a tool (preferably free). Then, in the midst of said\n      search, I was reminded that this little tool was not only already\n      on my Mac, did exactly what I wanted, but also did it better than\n      any of the tools I was able to find."]), p(["The point is that, even the tools we think we know can ", strong(["always reveal a little something we don’t"]), ". The Mac is\n      an incredibly deep and rich OS and there are few that know it all.\n      I’m going to spend some time every day for the next little while\n      spending some time getting to know some more of these built-in\n      tools I largely have ignored and see if I have any practical\n      applications for using them. You will likely see more posts\n      like this in the coming days."])]), p([a({
  href: "http://tumblr.frijole.info/post/836825948/"
})(["Reblogged by ¡ɜɿoɾɪɹℲ"]), " with this extremely nifty addition:"]), blockquote([p(["To take your Digital Color Metering to the next level, you can drag the\n      color off of the well on the right (next to the R G B labels) into any\n      standard color picker to bring it over. Sometimes, you can even drop it\n      straight into an object in another app!"]), p(["Give it a try: sample a color, press cmd-shift-h to hold it, then drag\n      and drop from the swatch an object in Pages or Keynote."])]), p(["I'm going to find this incredibly useful. No more grabbing a portion of\n    the screen, switching to Photoshop, creating a new document, hitting ⌘V,\n    switching to the eyedropper tool, double-clicking the foreground colour\n    swatch to invoke the Color Picker, and ", em(["then"]), " clicking on the\n    appropriate pixel to find its colour value."]), p(["I don't think I'll miss this process, somehow, although my flatmate'll\n    miss the camera shutter sound that accompanies screen captures on OS X\n    (he really likes it, for some reason)."])];
export default {
  id: 65,
  slug: "digitalcolor-meter",
  title: ["DigitalColor Meter"],
  datetime: datetime("2010-07-23 01:45:00 (Pacific/Auckland)"),
  tags: ["mac-os-x", "photoshop"],
  body
};
