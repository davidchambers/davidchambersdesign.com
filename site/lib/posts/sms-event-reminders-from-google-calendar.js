import {
  _canonicalize$002Dchildren,
  text,
  excerpt,
  a,
  _a$0027,
  article,
  _article$0027,
  aside,
  _aside$0027,
  b,
  blockquote,
  _blockquote$0027,
  _body$0027,
  code,
  _code$0027,
  dd,
  _dd$0027,
  del,
  _del$0027,
  div,
  dl,
  _dl$0027,
  dt,
  _dt$0027,
  em,
  _em$0027,
  embed,
  footer,
  _footer$0027,
  h1,
  _h1$0027,
  h2,
  _h2$0027,
  h3,
  _h3$0027,
  h4,
  _h4$0027,
  h5,
  _h5$0027,
  h6,
  _h6$0027,
  head,
  _head$0027,
  header,
  _header$0027,
  hr,
  _hr$0027,
  html,
  _html$0027,
  i,
  _i$0027,
  img,
  ins,
  _ins$0027,
  li,
  _li$0027,
  linearGradient,
  link,
  mask,
  meta,
  nav,
  _nav$0027,
  object,
  ol,
  _ol$0027,
  p,
  _p$0027,
  param,
  path,
  pre,
  _pre$0027,
  rect,
  script,
  span,
  stop,
  strong,
  _strong$0027,
  svg,
  time,
  title,
  _title$0027,
  ul,
  _ul$0027,
  _var,
  _var$0027,
  video
} from '../elements.js';
import { _captioned$002Dimage } from '../components.js';
import datetime from '../datetime.js';
const body = [
  excerpt([
    p([
      'I tend to forget things. Until recently, I had no system to\n             keep track of appointments. I began using Google Calendar,\n             but soon realised that I did not want ',
      em('another'),
      '\n             thing to check each day.'
    ]),
    p([
      strong('Enter event reminders.'),
      ' With Google Calendar sending\n             event reminders to my inbox, I no longer had to check my calendar\n             each day. Google Calendar can now send event reminders via text\n             message. ',
      strong('Below is a walk through of the steps involved\n             in setting up SMS event reminders in Google Calendar.')
    ])
  ]),
  p([
    'The first step is to open ',
    a('http://calendar.google.com/')('Google Calendar'),
    '.\n        Once you have signed in, you will see several links at the\n        top right of the page. Click on ',
    strong('Settings'),
    '.'
  ]),
  _captioned$002Dimage('/images/posts/13/settings-link-in-google-calendar.png')('Settings link in Google Calendar')([
    strong('Settings'),
    ' link in Google Calendar'
  ]),
  p([
    'Next, click on the ',
    strong('Mobile Setup'),
    ' tab.'
  ]),
  excerpt([_captioned$002Dimage('/images/posts/13/mobile-setup-tab-in-google-calendar.png')('Mobile Setup tab in Google Calendar')([
      strong('Mobile Setup'),
      ' tab in Google Calendar'
    ])]),
  p([
    'Enter your cell phone number and click ',
    strong('Send Verification Code'),
    '. In a matter of seconds you should\n        receive a text message from Google containing the verification code.\n        Enter the code and click ',
    strong('Finish setup'),
    '.'
  ]),
  _captioned$002Dimage('/images/posts/13/phone-number-successfully-validated.png')('Phone number successfully validated')('Confirmation of phone number validation'),
  p([
    'Once your phone number has been validated you should be taken to the ',
    strong('Notifications'),
    ' pane. If not, go there by clicking on ',
    strong('Settings'),
    ', then the ',
    strong('Calendars'),
    ' tab, then ',
    strong('Notifications'),
    '.'
  ]),
  _captioned$002Dimage('/images/posts/13/event-reminders-in-google-calendar.png')('Event reminders in Google Calendar')([
    'Google Calendar\'s ',
    strong('Notifications'),
    ' pane,\n        where default event reminders are set'
  ]),
  p(['You\'re then able to set default event reminders, which may include\n        one or more text messages. You\'ll also be able to add SMS reminders\n        against individual calendar events.'])
];
export default {
  [Symbol.for('id')]: 13,
  [Symbol.for('slug')]: 'sms-event-reminders-from-google-calendar',
  [Symbol.for('title')]: 'SMS event reminders from Google Calendar',
  [Symbol.for('datetime')]: datetime('2009-04-18')('21:44:00')(Symbol.for('Pacific/Auckland')),
  [Symbol.for('tags')]: [
    'gmail',
    'google-calendar',
    'sms'
  ],
  [Symbol.for('body')]: body
};
