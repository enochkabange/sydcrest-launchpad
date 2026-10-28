import { RES } from "./resources";
import type { ResourceDraft, RoadmapDraft } from "./types";

/**
 * Mobile App Developer track (issue #96, wave 3). Original SydCrest outline;
 * research and coverage in src/content/research/mobile-app-developer.md.
 * Nothing here comes from roadmap.sh.
 *
 * Main path: Flutter and Dart, because Ghanaian adverts (including entry and
 * National Service roles) ask for cross platform skills most often and Flutter
 * can be practised in a phone browser with DartPad. Kotlin is an optional
 * next step; React Native is presented as the alternative for web developers.
 */
const r = (label: string, url: string, kind: ResourceDraft["kind"] = "article"): ResourceDraft => ({ label, url, kind });

const M = {
  dartpad: r("DartPad: run Dart and Flutter in a browser", "https://dartpad.dev/", "practice"),
  kotlinPlay: r("Kotlin Playground", "https://play.kotlinlang.org/", "practice"),
  snack: r("Expo Snack: React Native in the browser", "https://snack.expo.dev/", "practice"),
  flutterDocs: r("Flutter documentation", "https://docs.flutter.dev/"),
  flutterFundamentals: r("Flutter: Learn the fundamentals", "https://docs.flutter.dev/get-started/fundamentals", "practice"),
  dartLanguage: r("Dart language tour", "https://dart.dev/language"),
  dartCollections: r("Dart: Collections", "https://dart.dev/language/collections"),
  dartClasses: r("Dart: Classes", "https://dart.dev/language/classes"),
  dartNullSafety: r("Dart: Sound null safety", "https://dart.dev/language/null-safety"),
  dartAsync: r("Dart: Asynchronous programming", "https://dart.dev/libraries/async/async-await", "practice"),
  widgetsIntro: r("Flutter: Introduction to widgets", "https://docs.flutter.dev/ui/widgets-intro"),
  layout: r("Flutter: Layouts", "https://docs.flutter.dev/ui/layout"),
  forms: r("Flutter cookbook: Forms", "https://docs.flutter.dev/cookbook/forms", "practice"),
  navigation: r("Flutter: Navigation and routing", "https://docs.flutter.dev/ui/navigation"),
  accessibility: r("Flutter: Accessibility", "https://docs.flutter.dev/ui/accessibility-and-internationalization/accessibility"),
  m3Accessible: r("Material Design: Accessibility designing", "https://m3.material.io/foundations/designing/structure"),
  stateIntro: r("Flutter: State management", "https://docs.flutter.dev/data-and-backend/state-mgmt/intro"),
  fetchData: r("Flutter cookbook: Fetch data from the internet", "https://docs.flutter.dev/cookbook/networking/fetch-data", "practice"),
  json: r("Flutter: JSON and serialization", "https://docs.flutter.dev/data-and-backend/serialization/json"),
  persistence: r("Flutter cookbook: Persistence", "https://docs.flutter.dev/cookbook/persistence", "practice"),
  sqlite: r("Flutter cookbook: Persist data with SQLite", "https://docs.flutter.dev/cookbook/persistence/sqlite", "practice"),
  offlineFlutter: r("Flutter: Offline first support", "https://docs.flutter.dev/app-architecture/design-patterns/offline-first"),
  offlineAndroid: r("Android: Build an offline first app", "https://developer.android.com/topic/architecture/data-layer/offline-first"),
  firebaseSetup: r("Firebase: Add Firebase to a Flutter app", "https://firebase.google.com/docs/flutter/setup"),
  firebaseAuth: r("Firebase Authentication docs", "https://firebase.google.com/docs/auth"),
  fcm: r("Firebase Cloud Messaging docs", "https://firebase.google.com/docs/cloud-messaging"),
  notifPermission: r("Android: Notification runtime permission", "https://developer.android.com/develop/ui/views/notifications/notification-permission"),
  testing: r("Flutter: Testing overview", "https://docs.flutter.dev/testing/overview"),
  debugging: r("Flutter: Debugging", "https://docs.flutter.dev/testing/debugging"),
  devtools: r("Flutter DevTools", "https://docs.flutter.dev/tools/devtools"),
  appSize: r("Flutter: Measuring your app's size", "https://docs.flutter.dev/perf/app-size"),
  perf: r("Flutter: Performance", "https://docs.flutter.dev/perf"),
  deployAndroid: r("Flutter: Build and release an Android app", "https://docs.flutter.dev/deployment/android"),
  playTesting: r("Play Console Help: Testing requirements for new personal accounts", "https://support.google.com/googleplay/android-developer/answer/14151465"),
  dataSafety: r("Play Console Help: Data safety section", "https://support.google.com/googleplay/android-developer/answer/10787469"),
  androidBasics: r("Android Basics with Compose (free course)", "https://developer.android.com/courses/android-basics-compose/course", "practice"),
  compose: r("Jetpack Compose", "https://developer.android.com/jetpack/compose"),
  kotlinStart: r("Kotlin: Get started", "https://kotlinlang.org/docs/getting-started.html"),
  rnDocs: r("React Native: Get started", "https://reactnative.dev/docs/getting-started"),
  owaspMobile: r("OWASP Mobile Top 10", "https://owasp.org/www-project-mobile-top-10/"),
  androidSecurity: r("Android: Security tips", "https://developer.android.com/privacy-and-security/security-tips"),
  firebaseRules: r("Firebase Security Rules", "https://firebase.google.com/docs/rules"),
};

export const mobileAppDeveloper: RoadmapDraft = {
  slug: "mobile-app-developer",
  title: "Mobile App Developer",
  description:
    "Build Android apps that work on the low cost phones and patchy networks people in Ghana really use, starting with Flutter and Dart. Go from your first lines of code, even on a phone, to a published app and a portfolio that Ghanaian and remote employers can test.",
  track: "mobile-app-developer",
  field_category: "software",
  level: "beginner",
  leads_to: ["software-testing"],
  locale: "en-GH",
  status: "draft",
  nodes: [
    {
      slug: "start-here",
      title: "Start here: the mobile developer job and your kit",
      summary:
        "See what mobile developers in Ghana and on remote teams actually do, and what employers ask for. Be honest with yourself about equipment: you can start on a phone, but you will need a laptop to go far.",
      parent: null,
      optional: false,
      resources: [M.flutterDocs, M.dartpad],
    },
    {
      slug: "your-setup",
      title: "Your setup: start in a browser, build on a laptop",
      summary:
        "Start writing real code in a browser with free tools, even on a phone, then move to a laptop when you can reach one. Learn what a laptop needs for mobile work and how to test on your own Android phone instead of a heavy emulator.",
      parent: "start-here",
      optional: false,
      resources: [M.dartpad, M.kotlinPlay, M.deployAndroid],
    },
    {
      slug: "choosing-an-approach",
      title: "Native or cross platform: why this roadmap uses Flutter",
      summary:
        "Compare native Android with Kotlin against cross platform tools such as Flutter and React Native. See why this roadmap starts with Flutter and when another choice makes more sense for you.",
      parent: "start-here",
      optional: false,
      resources: [M.flutterFundamentals, M.androidBasics, M.rnDocs],
    },
    {
      slug: "git-and-github",
      title: "Git and GitHub",
      summary:
        "Track every change to your code with Git and share it on GitHub. Many mobile adverts we read named Git, and your GitHub is where employers will look first.",
      parent: "start-here",
      optional: false,
      resources: [RES.githubDocs, RES.gitBook],
    },
    {
      slug: "programming-fundamentals",
      title: "Programming fundamentals with Dart",
      summary:
        "Learn to think like a programmer using Dart, the language behind Flutter. Every later topic depends on these basics, so take your time here.",
      parent: null,
      optional: false,
      resources: [M.dartLanguage, M.dartpad],
    },
    {
      slug: "dart-basics",
      title: "Variables, types, decisions and loops",
      summary:
        "Store values in variables, choose the right type and make decisions with if statements and loops. You will practise by working out a chop bar bill in DartPad.",
      parent: "programming-fundamentals",
      optional: false,
      resources: [M.dartLanguage, M.dartpad],
    },
    {
      slug: "functions-and-collections",
      title: "Functions, lists and maps",
      summary:
        "Package repeated work into functions and hold many values in lists and maps. These are the tools you will use to handle a shop's stock list or a list of messages.",
      parent: "programming-fundamentals",
      optional: false,
      resources: [M.dartCollections, M.dartpad],
    },
    {
      slug: "classes-and-null-safety",
      title: "Classes, objects and null safety",
      summary:
        "Model real things such as a product or a customer with classes. Learn how Dart's null safety stops a whole family of crashes before your app ever runs.",
      parent: "programming-fundamentals",
      optional: false,
      resources: [M.dartClasses, M.dartNullSafety],
    },
    {
      slug: "async-dart",
      title: "Futures, async and await",
      summary:
        "Learn how an app waits for slow work, such as a network request, without freezing the screen. This is the foundation for talking to servers and databases.",
      parent: "programming-fundamentals",
      optional: false,
      resources: [M.dartAsync],
    },
    {
      slug: "ui-for-small-screens",
      title: "Building screens for small phones",
      summary:
        "Turn your Dart skills into real screens with Flutter widgets. Design for small, low cost Android phones first, because that is what most of your users hold.",
      parent: null,
      optional: false,
      resources: [M.widgetsIntro, M.flutterFundamentals],
    },
    {
      slug: "widgets-and-layout",
      title: "Widgets and layout",
      summary:
        "Build screens from small widgets arranged in rows, columns and stacks. Practise by laying out a product card for a Tamale shop.",
      parent: "ui-for-small-screens",
      optional: false,
      resources: [M.widgetsIntro, M.layout, M.dartpad],
    },
    {
      slug: "lists-forms-navigation",
      title: "Lists, forms and moving between screens",
      summary:
        "Show long lists efficiently, collect input with validated forms and move between screens. Together these make up most of the screens in real business apps.",
      parent: "ui-for-small-screens",
      optional: false,
      resources: [M.forms, M.navigation],
    },
    {
      slug: "low-end-android-and-accessibility",
      title: "Designing for low cost phones and every user",
      summary:
        "Make apps that stay usable on small screens, slow processors and large text settings. Good touch targets, contrast and screen reader labels help everyone, not only users with disabilities.",
      parent: "ui-for-small-screens",
      optional: false,
      resources: [M.accessibility, M.m3Accessible],
    },
    {
      slug: "state-and-data",
      title: "State, networking and offline data",
      summary:
        "Learn how an app remembers things, fetches data from servers and keeps working when the network drops. This is where most real world mobile bugs live.",
      parent: null,
      optional: false,
      resources: [M.stateIntro, M.offlineFlutter],
    },
    {
      slug: "state-management",
      title: "Managing state",
      summary:
        "Understand state, the data that decides what a screen shows right now. Start with setState and learn when a shared approach such as Provider, Riverpod or Bloc is worth it.",
      parent: "state-and-data",
      optional: false,
      resources: [M.stateIntro],
    },
    {
      slug: "networking-and-apis",
      title: "Talking to APIs with JSON",
      summary:
        "Fetch and send data over HTTP and turn JSON into Dart objects. Handle slow networks, timeouts and errors so users always know what is happening.",
      parent: "state-and-data",
      optional: false,
      resources: [M.fetchData, M.json],
    },
    {
      slug: "local-storage",
      title: "Storing data on the phone",
      summary:
        "Save settings, records and cached data on the device with simple key value storage or a SQLite database. Choose the right tool for each kind of data.",
      parent: "state-and-data",
      optional: false,
      resources: [M.persistence, M.sqlite],
    },
    {
      slug: "offline-first",
      title: "Offline first apps and syncing",
      summary:
        "Design apps that read and write locally first, then sync with the server when a connection returns. This matters for field workers, traders and anyone on prepaid data.",
      parent: "state-and-data",
      optional: false,
      resources: [M.offlineFlutter, M.offlineAndroid],
    },
    {
      slug: "services-and-integrations",
      title: "Backends, payments, notifications and SMS",
      summary:
        "Connect your app to the services that make it useful in Ghana: sign in, cloud data, mobile money, notifications and SMS. Learn the safe patterns that employers expect.",
      parent: null,
      optional: false,
      resources: [M.firebaseSetup],
    },
    {
      slug: "backends-and-auth",
      title: "Ready made backends and sign in",
      summary:
        "Use a hosted backend such as Firebase to add sign in and cloud data without running your own server. Learn which secrets must never live inside an app.",
      parent: "services-and-integrations",
      optional: false,
      resources: [M.firebaseSetup, M.firebaseAuth, M.firebaseRules],
    },
    {
      slug: "mobile-money-payments",
      title: "Mobile money payments in an app",
      summary:
        "Understand how a mobile money payment flows between your app, your server, a payment provider and the customer's phone. Learn why the server, not the app, must confirm every payment.",
      parent: "services-and-integrations",
      optional: false,
      resources: [M.owaspMobile, M.androidSecurity],
    },
    {
      slug: "push-notifications-and-sms",
      title: "Push notifications and SMS",
      summary:
        "Reach users with push notifications when they have data and with SMS when they do not. Learn the permissions, costs and good manners of each channel.",
      parent: "services-and-integrations",
      optional: false,
      resources: [M.fcm, M.notifPermission],
    },
    {
      slug: "quality-and-release",
      title: "Testing, performance and release",
      summary:
        "Make your app reliable, small and fast, then put it in front of real users. This section takes you from code on your laptop to an app on the Play Store.",
      parent: null,
      optional: false,
      resources: [M.testing, M.deployAndroid],
    },
    {
      slug: "testing-and-debugging",
      title: "Testing and debugging",
      summary:
        "Write unit and widget tests that catch mistakes before users do, and use the debugger instead of guessing. Employers ask for testing even in junior roles.",
      parent: "quality-and-release",
      optional: false,
      resources: [M.testing, M.debugging, M.devtools],
    },
    {
      slug: "performance-and-app-size",
      title: "App size and speed on slow networks",
      summary:
        "Keep downloads small and screens smooth on modest phones and slow connections. Measure release builds, shrink images and load data in small pages.",
      parent: "quality-and-release",
      optional: false,
      resources: [M.appSize, M.perf],
    },
    {
      slug: "publishing-to-play-store",
      title: "Publishing to the Google Play Store",
      summary:
        "Prepare a signed release, a store listing, a privacy policy and the Data safety form. Plan for the closed testing that new personal developer accounts must complete first.",
      parent: "quality-and-release",
      optional: false,
      resources: [M.deployAndroid, M.playTesting, M.dataSafety],
    },
    {
      slug: "getting-hired",
      title: "Portfolio and next steps",
      summary:
        "Show employers apps they can install and code they can read. Then decide how to grow, whether into native Android or a cohort programme.",
      parent: null,
      optional: false,
      resources: [RES.githubDocs],
    },
    {
      slug: "portfolio-and-job-search",
      title: "A portfolio that proves you can ship",
      summary:
        "Build two or three focused apps that solve Ghanaian problems and present them well on GitHub. Learn where mobile roles appear, from National Service posts to remote teams.",
      parent: "getting-hired",
      optional: false,
      resources: [RES.githubDocs, M.deployAndroid],
    },
    {
      slug: "kotlin-and-native-android",
      title: "Next step: native Android with Kotlin",
      summary:
        "Learn the basics of Kotlin and Jetpack Compose, the native way to build Android apps. Some employers ask for Kotlin alongside Flutter, so this widens the jobs you can apply for.",
      parent: "getting-hired",
      optional: true,
      resources: [M.kotlinStart, M.androidBasics, M.kotlinPlay],
    },
  ],
};
