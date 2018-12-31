# Resident Advisor - Resell Ticket Checker
This script will monitor a RA event for you and send a text message to your phone once event tickets become available.

It relies on Clockwork's SMS API: https://www.clockworksms.com/

# Quick Start
```bash
#install dependencies
npm i

#rename your config and edit it with your phone number, event url and clockwork api key
mv config.example.js config.js

#launch the script
npm start
```
