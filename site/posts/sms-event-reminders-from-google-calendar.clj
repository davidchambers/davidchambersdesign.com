(import ["../elements"]

(let [
  captioned-image     (require "../components/captioned-image")
  datetime            (require "../datetime")
] {

  :id 13

  :slug "sms-event-reminders-from-google-calendar"

  :title "SMS event reminders from Google Calendar"

  :datetime (datetime "2009-04-18" "21:44:00" :Pacific/Auckland)

  :tags [:gmail :google-calendar :sms]

  :body [

    (excerpt

       [(p
           ["I tend to forget things. Until recently, I had no system to
             keep track of appointments. I began using Google Calendar,
             but soon realised that I did not want " (em "another") "
             thing to check each day."])

        (p
           [(strong "Enter event reminders.") " With Google Calendar sending
             event reminders to my inbox, I no longer had to check my calendar
             each day. Google Calendar can now send event reminders via text
             message. " (strong "Below is a walk through of the steps involved
             in setting up SMS event reminders in Google Calendar.")])])

    (p
       ["The first step is to open "
        (a "http://calendar.google.com/" "Google Calendar") ".
         Once you have signed in, you will see several links at the
         top right of the page. Click on " (strong "Settings") "."])

    (captioned-image
       "/images/posts/13/settings-link-in-google-calendar.png"
       "Settings link in Google Calendar"
       [(strong "Settings") " link in Google Calendar"])

    (p
       ["Next, click on the " (strong "Mobile Setup") " tab."])

    (excerpt

       [(captioned-image
           "/images/posts/13/mobile-setup-tab-in-google-calendar.png"
           "Mobile Setup tab in Google Calendar"
           [(strong "Mobile Setup") " tab in Google Calendar"])])

    (p
       ["Enter your cell phone number and click "
        (strong "Send Verification Code") ". In a matter of seconds you should
         receive a text message from Google containing the verification code.
         Enter the code and click " (strong "Finish setup") "."])

    (captioned-image
       "/images/posts/13/phone-number-successfully-validated.png"
       "Phone number successfully validated"
       "Confirmation of phone number validation")

    (p
       ["Once your phone number has been validated you should be taken to the "
        (strong "Notifications") " pane. If not, go there by clicking on "
        (strong "Settings") ", then the " (strong "Calendars") " tab, then "
        (strong "Notifications") "."])

    (captioned-image
       "/images/posts/13/event-reminders-in-google-calendar.png"
       "Event reminders in Google Calendar"
       ["Google Calendar's " (strong "Notifications") " pane,
         where default event reminders are set"])

    (p
       ["You're then able to set default event reminders, which may include
         one or more text messages. You'll also be able to add SMS reminders
         against individual calendar events."])

  ]

}))
