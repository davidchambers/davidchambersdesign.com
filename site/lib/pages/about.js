import {a, b, p} from "../elements.js";
import {captioned$002Dimages} from "../components.js";
export default {
  slug: "about",
  title: ["About"],
  body: [p([b(["Greetings! My name is David Chambers and I'm a software developer\n      based in San Francisco."])]), p(["I work at ", a({
    href: "http://www.atlassian.com/"
  })(["Atlassian"]), "\n      with a great group of people dedicated to making ", a({
    href: "https://bitbucket.org/"
  })(["Bitbucket"]), " awesome.\n      Our efforts benefit tens of thousands of software developers,\n      which makes the job incredibly rewarding."]), p(["I've created several dozen ", a({
    href: "https://bitbucket.org/davidchambers"
  })(["open source projects"]), ",\n      many of which are small, self-contained JavaScript utilities\n      written in CoffeeScript. In 2011 I created and released ", a({
    href: "http://hashify.me/"
  })(["Hashify"]), ",\n      a little gift to the Internet. :)"]), captioned$002Dimages([{
    alt: "Me with friends Jo and Shaun at the Luge in Rotorua",
    src: "/images/about/david-jo-shaun.jpg",
    caption: ["Me with friends at the Luge in Rotorua"]
  }]), p(["Feel free to ", a({
    href: "http://twitter.com/davidchambers"
  })(["follow me on Twitter"]), ".\n      I tweet sporadically and infrequently."])]
};
