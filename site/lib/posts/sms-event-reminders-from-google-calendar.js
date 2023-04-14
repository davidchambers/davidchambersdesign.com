import {p, a, em, strong} from "../elements.js";
import {captioned$002Dimages} from "../components.js";
import datetime from "../datetime.js";
const excerpt$002Dtext = [p(["I tend to forget things. Until recently, I had no system to\n    keep track of appointments. I began using Google Calendar,\n    but soon realised that I did not want ", em(["another"]), "\n    thing to check each day."]), p([strong(["Enter event reminders."]), " With Google Calendar sending\n    event reminders to my inbox, I no longer had to check my calendar\n    each day. Google Calendar can now send event reminders via text\n    message. ", strong(["Below is a walk through of the steps involved\n    in setting up SMS event reminders in Google Calendar."])])];
const excerpt$002Dimage = [captioned$002Dimages([{
  alt: "Mobile Setup tab in Google Calendar",
  src: "/images/posts/13/mobile-setup-tab-in-google-calendar.png",
  caption: [strong(["Mobile Setup"]), " tab in Google Calendar"]
}])];
const body = [...excerpt$002Dtext, p(["The first step is to open ", a({
  href: "http://calendar.google.com/"
})(["Google Calendar"]), ".\n    Once you have signed in, you will see several links at the\n    top right of the page. Click on ", strong(["Settings"]), "."]), captioned$002Dimages([{
  alt: "Settings link in Google Calendar",
  src: "/images/posts/13/settings-link-in-google-calendar.png",
  caption: [strong(["Settings"]), " link in Google Calendar"]
}]), p(["Next, click on the ", strong(["Mobile Setup"]), " tab."]), ...excerpt$002Dimage, p(["Enter your cell phone number and click ", strong(["Send Verification Code"]), ". In a matter of seconds you should\n    receive a text message from Google containing the verification code.\n    Enter the code and click ", strong(["Finish setup"]), "."]), captioned$002Dimages([{
  alt: "Phone number successfully validated",
  src: "/images/posts/13/phone-number-successfully-validated.png",
  caption: ["Confirmation of phone number validation"]
}]), p(["Once your phone number has been validated you should be taken to the ", strong(["Notifications"]), " pane. If not, go there by clicking on ", strong(["Settings"]), ", then the ", strong(["Calendars"]), " tab, then ", strong(["Notifications"]), "."]), captioned$002Dimages([{
  alt: "Event reminders in Google Calendar",
  src: "/images/posts/13/event-reminders-in-google-calendar.png",
  caption: ["Google Calendar's ", strong(["Notifications"]), " pane,\n      where default event reminders are set"]
}]), p(["You're then able to set default event reminders, which may include\n    one or more text messages. You'll also be able to add SMS reminders\n    against individual calendar events."])];
export default {
  id: 13,
  slug: "sms-event-reminders-from-google-calendar",
  title: ["SMS event reminders from Google Calendar"],
  datetime: datetime("2009-04-18 21:44:00 (Pacific/Auckland)"),
  tags: ["gmail", "google-calendar", "sms"],
  body
};
