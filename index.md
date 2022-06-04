# LearningsToday

Learnings Today is a simple learnings tracker app that enables you to note down your everyday learnings and helps you to manage them. It also provides a personalised learning timeline for you where you can revisit your learnings and recall them.


  - One place to store and revist your learnings
  - Simple and lighter UI
  - Supports both Authenticated and Anonymous modes
  - Ad Free service
  - Works in all devices (ios and android)

### New Features

  - Supports Left Drawer for Easy Navigation
  - Added Settings and About page
  - Support to filter learnings by Labels
  - Allow linking of existing anonymous accounts with email accounts
  - Added support for password change (Email users)
  - Added support for logout and switch accounts
  - Improved timeline UI
  - Fixed minor bugs

### Tech

Learnings Today uses few other services to work properly:

* [React Native] - Super fast native app framework, using JS
* [Firebase] - For authentication
* [Firestore] - To store and retrieve data
* [Bitrise] - To build and release apps


### Development

Want to contribute? Great!

Open your favorite Terminal and run these commands.

```
git clone https://github.com/Jefreesujit/learnings-tracker.git
```
```
npm install
```
```
npm start
```
For android:
```
npm run android
```

For ios:
```
cd ios
pod install
cd ..
```
```
npm run ios
```


Verify the debugger running by navigating to your server address in your preferred browser.

```sh
http://localhost:8081/debugger-ui
```

##### Todos

 - Dark Theme!
 - Support Social Logins
 - Improved UI for timeline
 - Sort learnings by date
 - Integrate with Analytics

### License
----
MIT
