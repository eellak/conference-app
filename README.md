# Ionic Conference Application for FossComm 2017 with Angular and Firebase

Download for Android : https://play.google.com/store/apps/details?id=gr.huafosscomm.hua


# Table of Contents
 - [Getting Started](#getting-started)
 - [Contributing](#contributing)
 - [Use Cases](#use-cases)
 - [App Preview](#app-preview)




# Getting Started

The project was creating based on https://github.com/ionic-team/ionic-conference-app. The ionic team uses static data ,in this example ,from json files.

In FossComm 2017 App we selected to use data from a Web Service .That's when Firebase takes part.
### Firebase Provides:
 - Realtime Database
 - Cloud Storage
 - Cloud functions
See more : https://firebase.google.com/

### Ionic Installation:
* [Download the installer](https://nodejs.org/) for Node.js 6 or greater.
* Install the ionic CLI globally: `npm install -g ionic`
* Clone this repository: `git clone https://github.com/ionic-team/ionic-conference-app.git`.
* Run `npm install` from the project root.
* Run `ionic serve` in a terminal from the project root.
* Profit. :tada:

* Install the firebase and angularfire2 : `npm install -g firebase angularfire2`

_Note: You may need to add “sudo” in front of any global commands to install the utilities._

### Change Credentials
 - In https://github.com/LeoLoupos/FossComm-2017-HUA/blob/master/src/app/firebase.credentials.ts you must set up your own credentials.

 - In https://github.com/LeoLoupos/FossComm-2017-HUA/blob/master/src/app/app.module.ts you have to set your own API KEY for agm-maps (Angular Google Maps).
 - example: 
 AgmCoreModule.forRoot({
      apiKey: 'Your Key'
    })

# Contributing
See [CONTRIBUTING.md](https://github.com/ionic-team/ionic-conference-app/blob/master/.github/CONTRIBUTING.md) :tada::+1:


## Use Cases

* Action Sheet - [ [template](https://github.com/ionic-team/ionic-conference-app/blob/master/src/pages/speaker-list/speaker-list.html) | [code](https://github.com/ionic-team/ionic-conference-app/blob/master/src/pages/speaker-list/speaker-list.ts) ]
* Alert - [ [code](https://github.com/ionic-team/ionic-conference-app/blob/master/src/pages/schedule/schedule.ts) ]
* Cards - [ [template](https://github.com/ionic-team/ionic-conference-app/blob/master/src/pages/speaker-list/speaker-list.html) ]
* Datetime - [ [template](https://github.com/ionic-team/ionic-conference-app/blob/master/src/pages/about/about.html) ]
* Grid - [ [template](https://github.com/ionic-team/ionic-conference-app/blob/master/src/pages/login/login.html) ]
* Inputs - [ [template](https://github.com/ionic-team/ionic-conference-app/blob/master/src/pages/login/login.html) ]
* Items (Sliding) - [ [template](https://github.com/ionic-team/ionic-conference-app/blob/master/src/pages/schedule/schedule.html) | [code](https://github.com/ionic-team/ionic-conference-app/blob/master/src/pages/schedule/schedule.ts) ]
* Menu - [ [template](https://github.com/ionic-team/ionic-conference-app/blob/master/src/app/app.template.html) |
[code](https://github.com/ionic-team/ionic-conference-app/blob/master/src/app/app.component.ts) ]
* Modal - [ [template](https://github.com/ionic-team/ionic-conference-app/blob/master/src/pages/schedule-filter/schedule-filter.html) | [code](https://github.com/ionic-team/ionic-conference-app/blob/master/src/pages/schedule/schedule.ts) ]
* Searchbar - [ [template](https://github.com/ionic-team/ionic-conference-app/blob/master/src/pages/schedule/schedule.html) | [code](https://github.com/ionic-team/ionic-conference-app/blob/master/src/pages/schedule/schedule.ts) ]
* Segment - [ [template](https://github.com/ionic-team/ionic-conference-app/blob/master/src/pages/schedule/schedule.html) | [code](https://github.com/ionic-team/ionic-conference-app/blob/master/src/pages/schedule/schedule.ts) ]
* Slides - [ [template](https://github.com/ionic-team/ionic-conference-app/blob/master/src/pages/tutorial/tutorial.html) |
* Sticky headers - [ [template](https://github.com/ionic-team/ionic-conference-app/blob/master/src/pages/schedule/schedule.html) ]
* Tabs - [ [template](https://github.com/ionic-team/ionic-conference-app/blob/master/src/pages/tabs/tabs.html) | [code](https://github.com/ionic-team/ionic-conference-app/blob/master/src/pages/tabs/tabs.ts) ]
* Toggle - [ [template](https://github.com/ionic-team/ionic-conference-app/blob/master/src/pages/schedule-filter/schedule-filter.html) ]
[code](https://github.com/ionic-team/ionic-conference-app/blob/master/src/pages/tutorial/tutorial.ts) ]
* Using Angular HTTP for JSON - [ [code](https://github.com/ionic-team/ionic-conference-app/blob/master/src/providers/conference-data.ts) | [usage](https://github.com/ionic-team/ionic-conference-app/blob/master/src/pages/schedule/schedule.ts) ]


# App Preview - Ionic's App

### important this application is not FossComm's, but Ionic's Conference App.

[Try it live](https://ionic-team.github.io/ionic-conference-app/www)

All app preview screenshots were taken by running `ionic serve --lab` on a retina display.

- [Schedule Page](https://github.com/ionic-team/ionic-conference-app/blob/master/src/pages/schedule/schedule.html)

  <img src="resources/screenshots/SchedulePage.png" alt="Schedule">


- [About Page](https://github.com/ionic-team/ionic-conference-app/blob/master/src/pages/about/about.html)

  <img src="resources/screenshots/AboutPage.png" alt="Schedule">


- To see more images of the app, check out the [screenshots directory](https://github.com/ionic-team/ionic-conference-app/tree/master/resources/screenshots)!


# Deploying

* PWA - Un-comment [this](https://github.com/ionic-team/ionic2-app-base/blob/master/src/index.html#L17), run `npm run ionic:build --prod` and then push the `www` folder to your favorite hosting service
* Android - Run `ionic cordova run android --prod`
  - If you are deploying to Android 4.4 or below we recommend adding crosswalk: `cordova plugin add cordova-plugin-crosswalk-webview`
* iOS - Run `ionic cordova run ios --prod`

