import {p, ol, li$0027, li, strong, img} from "../elements.js";
import {captioned$002Dimages} from "../components.js";
import datetime from "../datetime.js";
const excerpt = [p([img({
  alt: "",
  src: "/images/posts/decorative/left/adobe-illustrator-cs3-icon.png"
})]), p(["Not so long ago I was talking to my brother online as he ", "worked on a poster for a presentation. He is an engineer; ", "using Illustrator was a new experience for him. He generally ", "picks up new things easily, but as you may appreciate, ", "Illustrator is often far from logical. We reached a point ", "where he asked me about scaling rounded rectangles – this ", "is where things started to get hairy."]), ol([li$0027({
  class: "interviewer"
})([strong(["him:"]), " ", "if I have a rounded rectangle and resize it, it there a ", "way to stop it from changing the rounding of the corners ", "(which I want constant for all my rectangles)?"]), li([strong(["me:"]), " " + "you can work out how large you want it to be and then ", "double-click with the rectangle tool and you'll be able ", "to enter all the correct values"]), li$0027({
  class: "interviewer"
})([strong(["him:"]), " " + "is there a way to change how curved they are after placing them?"]), li([strong(["me:"]), " ", "InDesign has a much better was of dealing with this issue than ", "does Illustrator... in InDesign, the rectangle is treated as an ", "object, and its corner radius is treated as a property in just ", "the same way as its width, height, and position... this means ", "that you can change the corner radius at any time..."]), li$0027({
  class: "interviewer"
})([strong(["him:"]), " ", "that's how it should be"])])];
const body = [...excerpt, p(["Hmm. Since InDesign deals with rounded rectangles effortlessly, ", "why does Illustrator make them such a pain? I did a quick Google ", "search and found out how to create a rounded rectangle which can ", "be scaled without affecting the corners. As with many simple tasks, ", "Illustrator requires the user to carry out several steps:"]), ol([li(["draw a rectangle of any size"]), li(["select it and go to ", strong(["Effect"]), " > ", strong(["Convert to Shape"]), " > ", strong(["Rounded Rectangle..."])]), li(["in the ", strong(["Shape Options"]), " dialogue, check the ", strong(["Relative"]), " radio button, and set ", strong(["Extra Width"]), " and ", strong(["Extra Height"]), " to 0"]), li(["enter your desired corner radius, and off you go!"])]), captioned$002Dimages([{
  alt: "Illustrator's Shape Options dialog",
  src: "/images/posts/windows/illustrator-shape-options-dialog.png",
  caption: ["Illustrator's ", strong(["Shape Options"]), " dialog, " + "set up to enable rounded rectangles which scale correctly"]
}]), p(["Now that the shape has been converted to a rounded rectangle, ", "the ", strong(["Shape Options"]), " dialog can be accessed by ", "double-clicking on ", strong(["Rounded Rectangle"]), " in the ", strong(["Appearance"]), " palette."])];
export default {
  id: 3,
  slug: "rounded-rectangles-in-adobe-illustrator-cs3",
  title: ["Rounded rectangles in Adobe Illustrator CS3"],
  datetime: datetime("2008-12-03 12:49:00 (Pacific/Auckland)"),
  tags: ["adobe", "cs3", "illustrator"],
  body
};
