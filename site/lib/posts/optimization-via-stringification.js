import {h4, p} from "../elements.js";
import {code$002Dblock} from "../components.js";
import datetime from "../datetime.js";
const excerpt = [p(["One way to reduce the number of HTTP requests a page requires ", "is to group (non-content) images into sprites. An even better ", "way is to remove these images from the server altogether; ", "instead include them as encoded strings in your style sheet."])];
const body = [...excerpt, p(["Instead of..."]), code$002Dblock("css")("a[href=\"/contact/\"] {\n    background: url(/images/sprite.png) no-repeat 0 -30px;\n}\n  "), p(["use something like..."]), code$002Dblock("css")("a[href=\"/contact/\"] {\n    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAALJJREFUeNrs1eEJgzAQBWATHKkjZAZHiCtkhKxgRnAGR+gMWSVypflRQfOeSgvlDgTxjvuSC0RTSul+EUZhhRX+bziNj0ur8tPT7OV6qEGMFJhCaNZYBA3DAKNSiyzUIs3iPEO41EgtEhbdSQtnUAo+wlmUhiWccx+4vMs3NnqmeEmpc96/norXndbc7fC28Xa0kmNwewbdPYY3fgvMjhDFm6POOUM3kf6dFFZY4a/FKsAADsZ+Lb8VFH4AAAAASUVORK5CYII=) no-repeat;\n}\n  "), p(["I threw together a Python script which converts images to encoded ", "strings."]), code$002Dblock("python")("#stringify.py\nimport base64\nimport sys\n\nf = open(sys.argv[1], 'rb')\ns = f.read()\nf.close()\n\ntry:\n    altchars = sys.argv[2]\nexcept IndexError:\n    altchars = None\n\nprint base64.b64encode(s, altchars)\n  "), h4(["Usage"]), code$002Dblock("console")("$ python stringify.py /path/to/image.png\n  ")];
export default {
  id: 51,
  slug: "optimization-via-stringification",
  title: ["Optimization via stringification"],
  datetime: datetime("2010-06-03 14:28:00 (Pacific/Auckland)"),
  tags: ["css", "optimization", "python"],
  body
};
