import {$2014} from "../components.js";
import {a, code, em, p, video} from "../elements.js";
import datetime from "../datetime.js";
const body = [p(["Comment forms that don't provide previews", $2014, "or at least an\n    indication of how comments are processed", $2014, "really annoy me.\n    If I decide to leave a comment I take care to avoid spelling\n    mistakes and grammatical errors. It's quite upsetting, then,\n    to see my code snippet completely mangled and my carefully\n    typed links displayed in plain text (<a href=\"...)."]), p(["Despite my appreciation of the preview, not one of my sites\n    provided this service until a few hours ago. Now that I've\n    migrated from WordPress to ", a({
  href: "http://mango.io/"
})(["Mango"]), "\n    I'm able to spend some time working on front-end code. My first\n    two challenges were localizing dates and times, and integrating ", a({
  href: "http://wmd-editor.com/"
})(["wmd"]), "."]), p(["Getting wmd working turned out to be extremely easy, but I was\n    not content with a live preview of the ", em(["comment"]), " only.\n    No, I wanted the preview to resemble as closely as possible\n    the published result, which meant updating the preview area in\n    response to changes to \"name\", \"e-mail\", and \"website\"\n    as well as to changes to the comment itself."]), video({
  src: "/images/posts/53/wmd.mp4",
  controls: "controls"
})([p(["Get with the programme; this video's in an HTML5 ", code(["video"]), " tag!"]), p(["It should be possible to access ", a({
  href: "/images/posts/53/wmd.mp4"
})(["wmd.mp4"]), " directly."])]), p(["This was a great deal of fun to implement!"])];
export default {
  id: 53,
  slug: "wmd-ftw",
  title: ["wmd ftw!"],
  datetime: datetime("2010-06-13")("11:25:00")("Pacific/Auckland"),
  tags: ["javascript", "markdown", "ux", "wmd"],
  body
};
