# Welcome to codedamn #hackfest 2022!

This playground is what you'll use to develop your project for hackathon. This is a starter template for Next.js (frontend) + Node.js (backend)

You may also choose to omit Node.js completely and use Next.js if you'd like. But you may use Node.js if you'd want to build an app, say, that needs websockets.

## How to work with this playground?

Please read this detailed blog on codedamn playgrounds: https://codedamn.com/news/how-to-use-codedamn-playgrounds

In a nutshell, the `.cdmrc` file consists of how your playground boots.

-   Open `.cdmrc` file on the left and look for `tabs` option. Make this an empty array and no default file would open when you refresh the playground.
-   `terminal-one` and `terminal-two` contains commands that should run when you boot the playground for the first time. Any subsequent team members that join your playground would not run these commands again and can directly jump into your playground.

Apart from this, codedamn playgrounds exposes two ports: `1337` and `1338`. Any server listening on port 1337 would be accessible with your public URL on the top right (with port 1337), and same for port 1338. Currently we're running Next.js build on port 1337, and Node.js server on port 1338.

Your work would be saved automatically, but you can also optionally download your playground by clicking on three dots on top left, and clicking on "Download Playground"

All the best!
