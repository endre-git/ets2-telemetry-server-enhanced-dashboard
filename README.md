# ets2-telemetry-server-enhanced-dashboard
This is a slightly enhanced default dashboard for ets2-telemetry-server.

You can find that project here: https://github.com/Funbit/ets2-telemetry-server

![image](https://github.com/kosaendre/ets2-telemetry-server-enhanced-dashboard/blob/main/server/Html/skins/default-enhanced/dashboard.jpg?raw=true)

I'm using ETS2 with a FOV setting that hides the in-game dashboard while trucking. I use an external 7" display, and I was in need of additional information that's not shown by the default dashboard.
These include:
- parking brake lights,
- engine brake lights,
- retarder information (on/off, current level),
- wiper (when you try to switch off the wipers rapidly it's easy to cycle through the off state, and I found this annoying, so I added this light too),
- warning lights for oil, water, fuel.

Additionally, I added a blinking red light to indicate speeding.

I also added some job-related information: time till next stop, remaining time and distance based on current navigation settings.
Finally, there's support for all the EU manual layouts, so the dashboard won't display D1-D10 if you're using manual.

# Installation
Simply download as a zip and copy into the folder of the ETS2/ATS Dashboard project.

# Selecting transmission type
Open up `dashboard.js` and look for the line
`const shifter_layout = 'auto';`
Replace this to a predefined layout (example provided in code), so if it's Volvo 12+2, use
`const shifter_layout = shifter_layout_volvo_14;`
Note that there are no quotation marks in this case.


