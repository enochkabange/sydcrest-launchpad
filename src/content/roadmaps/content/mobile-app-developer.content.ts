import type { TrackContent } from "./types";

/**
 * Original lesson content for the Mobile App Developer track (issue #96).
 * Written from scratch for SydCrest; sources and coverage are in
 * src/content/research/mobile-app-developer.md. Nothing here comes from roadmap.sh.
 */
const content: TrackContent = {
  roadmap: "mobile-app-developer",
  nodes: {
    "start-here": {
      "explanation_md": "Almost everyone in Ghana who uses the internet does it on a phone. Banks, fintechs, agritech firms, schools, hospitals and NGOs all want apps that work on those phones, so people who can build and maintain mobile apps are useful in Accra, in Kumasi, in Tamale and on remote teams abroad.\n\n## What a mobile developer actually does\n\nA mobile developer turns an idea into an app that people install and use every day. On a normal week that can mean:\n\n* building a new screen from a design, such as a checkout page for a pharmacy app\n* connecting the app to a server so it can load prices or save orders\n* making sure the app still works when the network drops in a village outside Damongo\n* fixing a bug a customer reported, then testing the fix\n* preparing a new version for the Google Play Store\n\nYou rarely work alone. You will talk with designers, backend developers, testers and the people who run the business.\n\n## What employers ask for\n\nWe read Ghanaian adverts (including National Service and entry level posts) and remote adverts open to people in Ghana. The same skills kept coming back:\n\n* a cross platform framework, most often Flutter or React Native, and sometimes native Android with Kotlin\n* calling REST APIs and handling JSON\n* Git for tracking code\n* Firebase or a similar hosted backend\n* testing, and publishing to the Play Store\n\nThis roadmap follows that list, in an order that builds one skill on top of the last. Fewer adverts named offline storage, but for users on patchy networks and prepaid data it matters a lot, so it gets a full lesson too.\n\n## The honest part about equipment\n\nYou can learn the basics of programming on a phone, and this roadmap shows you how. But building and testing full apps needs a laptop. The tools that turn code into an installable app are heavy, and they do not run on a phone. Plan for this early. Many learners use a school or university computer lab, a public library or a community centre while they save for their own machine. The next lesson explains what to look for.\n\n## A worked example\n\nFuseini in Tamale wants to build an app for his uncle's provisions shop. He starts on his phone, learning Dart in a free browser tool during his lunch break. After a month he can write small programs that add up a day's sales. He then books two afternoons a week at a computer lab, installs the free tools and builds his first real screen: a list of items with prices in cedis. Six months later the app saves sales offline and syncs them when the shop has data. That app becomes the first project in his portfolio.\n\n## How to use this roadmap\n\nWork through the sections in order. This first section sets up your tools, helps you choose an approach and gets your code safely onto GitHub from day one. Each lesson has a short practice task you can show a mentor. If you are aiming for a cohort programme or a bootcamp, this roadmap is a free way to prepare, so you arrive already comfortable with the basics.",
      "practice_task_md": "**Goal:** write down your own starting point and a realistic plan.\n\n1. In a notes app or notebook, list the devices you can use: your phone, a family laptop, a school lab, a library computer. Note when each one is available.\n2. Search a job board for \"mobile developer Ghana\" or \"Flutter developer\". Pick three adverts and write down only the skills they name (do not copy their text).\n3. Compare those skills with the section titles of this roadmap. Tick each skill you find.\n4. Write one sentence about an app you would like to build for someone you know, such as a shop, a church or a farmer group.\n\n**Done looks like:** a one page plan with your devices, three lists of skills and one app idea. Share it with a mentor or study partner.",
      "quiz": {
        "questions": [
          {
            "prompt": "Why does this roadmap say you will eventually need a laptop?",
            "options": [
              "Employers in Ghana only accept code that was written and tested on a laptop",
              "The tools that build and test full apps are too heavy to run on a phone",
              "Phones cannot open documentation pages",
              "Mobile apps can only be designed on a laptop screen"
            ],
            "answer_index": 1,
            "explanation": "Learning basics works on a phone, but the build and test tools for full apps do not run on one."
          },
          {
            "prompt": "Which group of skills appeared again and again in the adverts described in the lesson?",
            "options": [
              "Video editing, social media and copywriting",
              "Spreadsheet formulas, pivot tables and dashboards",
              "A cross platform framework, REST APIs, Git, Firebase, testing and Play Store publishing",
              "Network cabling, printer repair, help desk support and setting up Windows servers for offices"
            ],
            "answer_index": 2,
            "explanation": "The lesson lists a framework such as Flutter or React Native, APIs, Git, Firebase, testing and publishing as the repeated signals."
          },
          {
            "prompt": "In the worked example, what did Fuseini do before he had regular laptop access?",
            "options": [
              "He waited until he could buy a laptop before starting",
              "He copied an existing shop app from the Play Store",
              "He paid for a bootcamp in Accra",
              "He learned Dart on his phone in a free browser tool"
            ],
            "answer_index": 3,
            "explanation": "Fuseini started learning Dart on his phone, then moved to a computer lab for full app work."
          },
          {
            "prompt": "Which of these is a normal part of a mobile developer's week, according to the lesson?",
            "options": [
              "Selling data bundles to app users",
              "Repairing broken phone screens for customers who use the app",
              "Making sure the app still works when the network drops",
              "Installing internet cables in offices"
            ],
            "answer_index": 2,
            "explanation": "Handling poor connections is listed as everyday mobile developer work."
          }
        ],
        "pass_threshold": 75
      }
    },
    "your-setup": {
      "explanation_md": "Before you can build apps for other people, you need a way to write and run code yourself. Many young developers in Ghana start with only a phone and borrow time on a computer later. That is a perfectly good path, as long as you know which steps need which device.\n\n## Stage one: learning in a browser\n\nThese free tools run in any browser, even on a phone, with no install:\n\n* **DartPad** (dartpad.dev) runs Dart code, and can even run small Flutter screens. It does not support most extra packages, but it is perfect for learning the language.\n* **Kotlin Playground** (play.kotlinlang.org) does the same for Kotlin, if you later explore native Android.\n* **Expo Snack** (snack.expo.dev) runs React Native code in the browser, if you come from JavaScript.\n\nOn a phone, typing code on a small keyboard is slow, so keep programs short. A cheap Bluetooth or USB OTG keyboard helps a lot. Load the page once on WiFi and keep the tab open to save data.\n\n## Stage two: a laptop\n\nTo build real Flutter apps you install the Flutter SDK, the Android SDK and a code editor. These need disk space, memory and a large first download, so do it on WiFi at a lab, library, hub or community centre.\n\nWhat to look for in a laptop you buy or borrow:\n\n* **Memory (RAM) matters most.** Check the official Android Studio system requirements page before you buy, and choose the most memory you can afford. Machines with little memory struggle badly with the Android emulator.\n* **An SSD** rather than an old spinning hard drive makes everything faster.\n* **Free disk space** for the SDKs and your projects.\n\nA second hand business laptop with enough memory is often better value than a new low cost one.\n\n## Test on your own phone, not an emulator\n\nThe emulator is a virtual phone that runs on your laptop. It is useful, but heavy. A lighter option is to plug your own Android phone into the laptop with a USB cable:\n\n1. On the phone, open Settings, then About phone, and tap Build number several times until developer options unlock.\n2. In developer options, turn on USB debugging.\n3. Connect the cable and accept the prompt on the phone.\n\nYour app now runs on a real device, which also shows you how it feels on the kind of phone your users have. You can use a free editor such as VS Code with the Flutter extension instead of the larger Android Studio for daily coding.\n\n## A worked example\n\nHawa in Wa has a phone and two hours a week at a school lab. On her phone she writes Dart in DartPad every evening. At the lab she installed Flutter on a shared machine with the teacher's permission, keeps her projects on GitHub, and pulls them down at the start of each session. She runs every app on her own phone through USB. When she later buys a used laptop, she simply clones her projects and keeps going.",
      "practice_task_md": "**Goal:** run your first Dart program in a browser, and plan your laptop access.\n\n1. Open dartpad.dev in a browser on your phone or computer.\n2. Replace the sample code with a program that prints your name and your town, for example `print('Hawa from Wa');`.\n3. Press Run and check the output.\n4. Change it to print three lines: your name, the app you want to build, and who it is for.\n5. Write down one place near you with computers you could use (a school lab, library or community centre), and the days it is open.\n\n**Done looks like:** a screenshot of your DartPad output and a note of where and when you can use a laptop.",
      "quiz": {
        "questions": [
          {
            "prompt": "What does DartPad let you do?",
            "options": [
              "Publish apps to the Play Store from a phone",
              "Run Dart code and small Flutter screens in a browser",
              "Install the Android emulator on a phone",
              "Download any package from pub.dev and run it in the browser"
            ],
            "answer_index": 1,
            "explanation": "DartPad runs Dart and simple Flutter code in the browser, though most extra packages are not supported."
          },
          {
            "prompt": "According to the lesson, which laptop feature matters most for mobile development?",
            "options": [
              "Enough memory (RAM)",
              "A touch screen for testing apps by hand",
              "A backlit keyboard",
              "A large display"
            ],
            "answer_index": 0,
            "explanation": "Memory matters most because the Android tools, especially the emulator, struggle on machines with little of it."
          },
          {
            "prompt": "What is a lighter alternative to running the Android emulator on a laptop?",
            "options": [
              "Connecting your own Android phone with USB debugging turned on",
              "Emailing the app file to a friend",
              "Running the app in a spreadsheet",
              "Running the full app inside DartPad, which supports every Flutter package"
            ],
            "answer_index": 0,
            "explanation": "Running the app on a real phone through USB avoids the heavy emulator and shows how the app feels on a real device."
          },
          {
            "prompt": "How do you unlock developer options on most Android phones?",
            "options": [
              "Restart the phone while holding the volume key",
              "Install a special app from the Play Store",
              "Ask your network provider to enable it",
              "Tap Build number several times in About phone"
            ],
            "answer_index": 3,
            "explanation": "Tapping Build number repeatedly in About phone unlocks developer options, where USB debugging lives."
          }
        ],
        "pass_threshold": 75
      }
    },
    "choosing-an-approach": {
      "explanation_md": "One of the first questions every new mobile developer asks is \"which language should I learn?\" There is no single right answer, but there is a sensible answer for a beginner in Ghana today. Picking one approach and sticking with it is far more important than picking the perfect one.\n\n## The three main approaches\n\n**Native Android with Kotlin.** You write the app in Kotlin, Google's preferred language for Android, usually with Jetpack Compose for screens. The app only runs on Android. You get full access to every phone feature and the best performance, but if the business also wants an iPhone app, someone must build it again in Swift.\n\n**Flutter with Dart.** You write the app once in Dart and Flutter draws the screens itself. The same code can produce an Android app and an iPhone app, and even a web version. Flutter is made by Google and its documentation is free and openly licensed.\n\n**React Native with JavaScript or TypeScript.** You write the app once in JavaScript or TypeScript using React ideas, and it runs on Android and iPhone. If you already know web development, this can feel familiar.\n\n## Why this roadmap starts with Flutter\n\nWe compared Ghanaian and remote adverts open to people in Ghana. Most of them asked for a cross platform framework, Flutter or React Native, rather than native Android only. Small companies like both because one developer can serve Android and iPhone users. React Native actually came up a little more often than Flutter in the adverts we read, so it is a strong choice too.\n\nWe still start with Flutter for two reasons. Flutter appeared in an entry level National Service post in Accra. And it suits learners without a laptop yet: DartPad lets you practise Dart and simple Flutter screens in any browser, even on a phone, so you can make real progress before you have one.\n\n## When another choice makes sense\n\n* **You finished the SydCrest frontend track, or the jobs near you ask for React Native.** React Native is a full route to a mobile job, not a lesser option, and it reuses JavaScript and React skills. Expo Snack lets you try it in a browser. Most ideas in this roadmap, such as state, APIs, offline storage and publishing, carry over directly.\n* **A specific employer uses Kotlin.** Some agritech and fintech teams build native Android apps. The optional Kotlin lesson at the end gives you a start, and your Flutter experience will make it much easier.\n\n## A worked example\n\nAbdul-Rahman and Mariama are study partners in Bolgatanga. Abdul-Rahman has never coded, so he chooses Flutter and starts with Dart in DartPad. Mariama has built websites with React, so she follows the same roadmap but writes her practice apps in React Native using Expo Snack. They still review each other's work, because the problems are the same: a list of products, a form, data that must survive a dropped connection. A year later, Abdul-Rahman picks up Kotlin for a job that needs it, and finds he already understands most of the ideas.\n\n## The key lesson\n\nConcepts transfer between frameworks. Employers care that you can ship a working app, explain your decisions and learn new tools. Choose one approach now and go deep.",
      "practice_task_md": "**Goal:** make and justify your own choice of approach.\n\n1. Find five mobile adverts on any job board that accepts applicants in Ghana.\n2. For each, note which approach it asks for: Flutter, React Native, Kotlin, Swift or \"any\".\n3. Count the results in a small table in your notes app.\n4. Write three sentences: which approach you will learn first, why, and one situation that would make you change.\n\n**Done looks like:** a five row table and a short written decision you can explain to a mentor in under a minute.",
      "quiz": {
        "questions": [
          {
            "prompt": "What is the main advantage of a cross platform framework such as Flutter?",
            "options": [
              "It lets you skip learning a programming language",
              "It removes the need to test the app",
              "It runs faster than native Kotlin and reaches every phone feature",
              "One codebase can produce both Android and iPhone apps"
            ],
            "answer_index": 3,
            "explanation": "Cross platform tools let you write the app once and run it on Android and iPhone."
          },
          {
            "prompt": "Which language is used to write Flutter apps?",
            "options": [
              "Dart",
              "Python",
              "Kotlin",
              "Swift"
            ],
            "answer_index": 0,
            "explanation": "Flutter apps are written in Dart."
          },
          {
            "prompt": "According to the lesson, who might reasonably choose React Native instead of Flutter?",
            "options": [
              "Someone who wants to avoid testing",
              "Someone who wants the best performance and full access to every phone feature",
              "Someone who wants an app that only runs on Android",
              "Someone who already knows JavaScript and React from web work"
            ],
            "answer_index": 3,
            "explanation": "React Native reuses JavaScript and React skills, so it suits learners coming from web development."
          },
          {
            "prompt": "What is a trade off of building a native Android app with Kotlin?",
            "options": [
              "It cannot be published on the Play Store",
              "It only runs inside a web browser",
              "It cannot use the phone's camera, location or other hardware features",
              "An iPhone version would need to be built separately"
            ],
            "answer_index": 3,
            "explanation": "Native Android apps run only on Android, so an iPhone version must be built again, usually in Swift."
          },
          {
            "prompt": "What does the lesson say matters more than choosing the perfect framework?",
            "options": [
              "Only applying to jobs that use the exact framework you already know",
              "Learning every framework at the same time",
              "Choosing one approach and going deep, because concepts transfer",
              "Waiting until you can afford a paid course"
            ],
            "answer_index": 2,
            "explanation": "The lesson stresses that ideas carry over between frameworks, so going deep on one is what counts."
          }
        ],
        "pass_threshold": 80
      }
    },
    "git-and-github": {
      "explanation_md": "Git was named in many of the mobile developer adverts we read, in Ghana and remote, and teams that do not name it still expect it. Teams use it to work on the same app without overwriting each other's work, and employers look at your GitHub profile to see what you have really built. Learning Git early also protects you: if a shared lab computer is wiped, your code is safe online.\n\n## What Git does\n\n**Git** is a version control tool. It keeps a history of your project, so you can see what changed, when and why, and go back if something breaks. Each saved snapshot is called a **commit**, with a short message describing the change.\n\n**GitHub** is a website that stores Git projects online, called **repositories** or repos. It is free for public and private repos, and it is where you will show your portfolio.\n\n## The everyday commands\n\nThe simplest start is to create an empty repo on the GitHub website, then copy it to your laptop and work inside that folder:\n\n```bash\ngit clone https://github.com/your-name/shop-app.git\ncd shop-app\ngit add .                # choose the changes to save\ngit commit -m \"Add product list screen\"\ngit push                 # send commits to GitHub\n```\n\nOn another computer, such as a lab machine, clone the repo once, then run `git pull` at the start of each session to get your latest changes.\n\nFlutter projects include a file called `.gitignore` that tells Git to skip large generated folders such as `build`. Keep it, so your pushes stay small and cheap on data.\n\n## Branches and pull requests\n\nA **branch** is a separate line of work. You might create a branch called `add-search`, build the feature there, and keep the main branch working. On GitHub you then open a **pull request**, which asks for your branch to be merged and lets a teammate review your code first. Many teams will expect you to work this way from your first week.\n\n## Good commit habits\n\n* Commit small, complete steps, not a whole day's work at once.\n* Write clear messages in plain English: \"Fix total when cart is empty\" is better than \"changes\".\n* Never commit passwords, API keys or other secrets. Once pushed, assume they are public.\n\n## On a phone\n\nYou cannot run Git commands in a normal phone browser, but you can use the GitHub website or app to read code, edit a README, review pull requests and keep notes. Do your commits when you have laptop time.\n\n## A worked example\n\nFuseini uses a computer lab in Tamale on Tuesdays and Thursdays. At the start of each session he runs `git clone` or `git pull` to get his shop app. He works on a branch, commits after each small change, and pushes before he leaves. At home he reviews his own pull request on his phone and writes notes for the next session. When he applies for an NSS role, he sends a link to his GitHub, where the history shows months of steady, real progress.",
      "practice_task_md": "**Goal:** create a GitHub presence you can build on.\n\n1. Create a free GitHub account if you do not have one. Use a professional username.\n2. Create a public repository called `dart-practice` with a README.\n3. On a laptop, clone it, add your DartPad programs as `.dart` files (start with your first program from the setup lesson, and add each new exercise as you go) and commit each one with a clear message, then push. If you only have a phone today, use the GitHub website's \"Add file\" button to upload or create the files.\n4. Edit the README to explain what the repo is for, and add one line per file as it grows.\n\n**Done looks like:** a public repo with your first Dart file and a clear README, then a new commit with a meaningful message for each exercise you add in the next section.",
      "quiz": {
        "questions": [
          {
            "prompt": "What is a commit in Git?",
            "options": [
              "A request for a job",
              "A copy of a GitHub repository downloaded to your laptop",
              "A saved snapshot of your project with a message",
              "A file that stores passwords"
            ],
            "answer_index": 2,
            "explanation": "A commit records the state of your project at a point in time, with a message."
          },
          {
            "prompt": "Which command gets a copy of an existing GitHub project onto a new computer?",
            "options": [
              "git clone",
              "git commit",
              "git push",
              "git init"
            ],
            "answer_index": 0,
            "explanation": "Git clone downloads a repository from GitHub to the computer you are using."
          },
          {
            "prompt": "What is a pull request used for?",
            "options": [
              "Asking for a branch to be merged after a teammate reviews it",
              "Sending an SMS to a teammate",
              "Downloading the latest commits from GitHub onto a lab computer",
              "Deleting old commits"
            ],
            "answer_index": 0,
            "explanation": "A pull request proposes merging a branch and gives teammates a place to review it."
          },
          {
            "prompt": "Which of these should you never commit to a repository?",
            "options": [
              "API keys and passwords",
              "The .gitignore file",
              "A README file",
              "Your Dart source files"
            ],
            "answer_index": 0,
            "explanation": "Secrets should never be committed, because pushed code should be treated as public."
          }
        ],
        "pass_threshold": 75
      }
    },
    "programming-fundamentals": {
      "explanation_md": "Every app you will ever build, from a church attendance tracker to a banking app, is made of the same small building blocks: values, decisions, repetition, functions and data structures. Employers notice quickly whether a junior developer understands these basics or has only copied code from tutorials. This section makes sure you really understand them.\n\n## Why Dart\n\nThis roadmap uses Dart because it is the language of Flutter, the framework you will build apps with. Dart is a good first language too:\n\n* Its syntax looks like many other popular languages, so later moving to Kotlin, Java, JavaScript or Swift is easier.\n* It is **typed**, which means it checks many mistakes before your program runs.\n* It has **null safety**, which protects you from a very common type of crash.\n* You can practise it free in DartPad, in any browser, with no install.\n\n## What this section covers\n\n* **Variables, types, decisions and loops.** Storing values such as a price in cedis, choosing what to do with `if`, and repeating work with loops.\n* **Functions, lists and maps.** Packaging work you do often, and holding many values, such as every item in a shop's stock list.\n* **Classes, objects and null safety.** Describing real things like a customer or a product, and handling values that might be missing.\n* **Futures, async and await.** Waiting for slow work, like a network request, without freezing the app.\n\n## How to study this section\n\nProgramming is learned by typing, not by reading. For every lesson:\n\n1. Read the explanation once.\n2. Type the small example yourself in DartPad. Do not paste it.\n3. Change one thing and predict what will happen before you press Run.\n4. Do the practice task, then save your code in a notes app or on GitHub.\n\nErrors are normal. When DartPad shows a red message, read it slowly. It usually tells you the line number and what it expected. Learning to read error messages calmly is one of the most valuable habits a developer can have.\n\n## A worked example\n\nHere is a tiny Dart program that uses several ideas from this section at once:\n\n```dart\nvoid main() {\n  var items = ['rice', 'oil', 'sugar'];\n  for (var item in items) {\n    print('In stock: $item');\n  }\n}\n```\n\nIt stores a list of items, loops over them and prints each one. By the end of this section you will be able to read every word of this program and write much bigger ones.\n\nAmina, a secondary school leaver in Nalerigu, spent three weeks on this section using only her phone and DartPad, about thirty minutes each evening. She kept a notebook of every error she met and what fixed it. By the end, she could write a program that totals a day's sales, and she understood it line by line.",
      "practice_task_md": "**Goal:** get comfortable with the edit, run, fix loop in DartPad.\n\n1. Open dartpad.dev and type the stock list example from this lesson by hand.\n2. Run it and check that three lines print.\n3. Add two more items to the list and run it again.\n4. Deliberately remove one semicolon, run it, and write down what the error message says.\n5. Fix the error and run it once more.\n\n**Done looks like:** a working program with five items and a note in your own words explaining the error you caused and how you fixed it.",
      "quiz": {
        "questions": [
          {
            "prompt": "Why does this roadmap teach Dart first?",
            "options": [
              "It is the only language that runs on Android phones",
              "It is used only for websites",
              "It is the language Flutter apps are written in",
              "It does not need any practice to learn"
            ],
            "answer_index": 2,
            "explanation": "Dart is the language of Flutter, the framework this roadmap uses to build apps."
          },
          {
            "prompt": "What does it mean that Dart is a typed language?",
            "options": [
              "You must type every program twice",
              "It only works when you type on a physical keyboard",
              "It checks many mistakes before the program runs",
              "It can only store text"
            ],
            "answer_index": 2,
            "explanation": "Being typed means Dart checks types and catches many mistakes before the program runs."
          },
          {
            "prompt": "What study habit does the lesson recommend for each example?",
            "options": [
              "Paste the example and move on quickly",
              "Read it three times without running it, then copy it into your notes",
              "Skip examples and go straight to the quiz",
              "Type it yourself, change one thing and predict the result"
            ],
            "answer_index": 3,
            "explanation": "Typing, changing and predicting builds real understanding."
          },
          {
            "prompt": "What should you do when DartPad shows a red error message?",
            "options": [
              "Delete the whole program and start again in a fresh DartPad tab",
              "Read it slowly, as it usually shows the line and the problem",
              "Assume the tool is broken",
              "Ignore it and run the code again"
            ],
            "answer_index": 1,
            "explanation": "Error messages usually point to the line and the problem, so reading them calmly is a key habit."
          }
        ],
        "pass_threshold": 75
      }
    },
    "dart-basics": {
      "explanation_md": "Every app stores values and makes decisions. A shop app stores prices and decides whether an item is out of stock. A school app stores marks and decides who passed. In this lesson you learn the Dart tools for exactly that, and you will use them in every app you build.\n\n## Variables and types\n\nA **variable** is a named box that holds a value. Dart has a few basic types you will use constantly:\n\n* `int` for whole numbers, such as a quantity\n* `double` for numbers with decimals, such as a price in cedis\n* `String` for text, such as a name\n* `bool` for true or false, such as whether an order is paid\n\n```dart\nString customer = 'Sumaila';\nint plates = 2;\ndouble pricePerPlate = 25.0;\nbool paid = false;\n```\n\nYou can also write `var`, and Dart works out the type from the value. Use `final` for a value that will not change after it is set, and `const` for a value fixed before the program runs.\n\n## Doing sums and joining text\n\nDart uses `+`, `*`, `/` and other familiar operators. To put a value inside text, use `$name`, or `${...}` for a calculation:\n\n```dart\ndouble total = plates * pricePerPlate;\nprint('$customer owes GHS ${plates * pricePerPlate}');\n```\n\n## Making decisions with if\n\nAn `if` statement runs code only when a condition is true:\n\n```dart\nif (paid) {\n  print('Thank you!');\n} else if (total > 100) {\n  print('Please pay at the counter.');\n} else {\n  print('Pay with mobile money or cash.');\n}\n```\n\nConditions use comparison operators such as `==` (equal), `!=` (not equal), `>` and `<=`, and you can combine them with `&&` (and) and `||` (or).\n\n## Repeating work with loops\n\nA `for` loop repeats a block a set number of times:\n\n```dart\nfor (var day = 1; day <= 7; day++) {\n  print('Day $day');\n}\n```\n\nA `while` loop repeats as long as a condition stays true. Be careful: if the condition never becomes false, the loop never ends.\n\n## A worked example\n\nIssahaku runs a chop bar in Tamale. Waakye costs GHS 15 a plate and he gives one free drink for orders of four plates or more. In DartPad he writes:\n\n```dart\nvoid main() {\n  int plates = 5;\n  double price = 15;\n  double total = plates * price;\n  print('Total: GHS $total');\n  if (plates >= 4) {\n    print('Free drink included');\n  }\n}\n```\n\nHe changes `plates` to 3 and runs it again to check that the free drink message disappears. Testing both sides of every decision like this is a habit professional developers rely on.",
      "practice_task_md": "**Goal:** write a small bill calculator in DartPad.\n\n1. Create variables for a customer name, a number of plates, a price per plate and whether they paid.\n2. Calculate the total and print a line such as `Mariama owes GHS 45.0`.\n3. Add an `if` that prints a discount message when the total is above GHS 100, and a different message otherwise.\n4. Add a `for` loop that prints a receipt line for each plate, such as `Plate 1`, `Plate 2`.\n5. Test it with at least two different numbers of plates.\n\n**Done looks like:** a program that gives correct output for a small and a large order, with a screenshot of each run.",
      "quiz": {
        "questions": [
          {
            "prompt": "Which Dart type is best for a price in cedis such as 25.50?",
            "options": [
              "int",
              "bool",
              "String",
              "double"
            ],
            "answer_index": 3,
            "explanation": "A double holds numbers with decimals, which suits prices."
          },
          {
            "prompt": "What does the keyword final mean for a variable?",
            "options": [
              "The variable can only hold text",
              "It must be the last line of the program",
              "The variable is deleted after it is printed",
              "Its value cannot change after it is set"
            ],
            "answer_index": 3,
            "explanation": "A final variable is set once and cannot be changed afterwards."
          },
          {
            "prompt": "In Dart, how do you put a calculation result inside a piece of text?",
            "options": [
              "Using square brackets around the calculation, like a list index",
              "Using a dollar sign with curly braces around the calculation",
              "Using a hash sign before the calculation",
              "Calculations cannot be put inside text"
            ],
            "answer_index": 1,
            "explanation": "Dart uses a dollar sign with curly braces for calculations inside strings, and a plain dollar sign for a simple variable name."
          },
          {
            "prompt": "What danger does the lesson mention for while loops?",
            "options": [
              "They make the program skip any if statements inside the loop",
              "If the condition never becomes false, the loop never ends",
              "They cannot use numbers",
              "They can only run once"
            ],
            "answer_index": 1,
            "explanation": "A while loop repeats as long as its condition is true, so a condition that never turns false loops forever."
          }
        ],
        "pass_threshold": 75
      }
    },
    "functions-and-collections": {
      "explanation_md": "Real apps handle many items at once: every product in a shop, every member of a WhatsApp group, every message in a chat. They also repeat the same work, such as formatting a price, in many places. Functions and collections are how programmers handle both without writing the same code again and again.\n\n## Functions\n\nA **function** is a named piece of code that does one job. You give it inputs, called **parameters**, and it can give back a result with `return`.\n\n```dart\ndouble addTax(double amount, double rate) {\n  return amount + amount * rate;\n}\n```\n\nNow you can call `addTax(100, 0.05)` anywhere and get the answer. If the rule changes, you fix it in one place. Good functions are short, do one thing and have a clear name, such as `formatCedis` or `isOutOfStock`.\n\nFor very short functions, Dart has an arrow form:\n\n```dart\nString formatCedis(double v) => 'GHS ${v.toStringAsFixed(2)}';\n```\n\nDart also supports **named parameters** in curly braces, which make calls easier to read. You will see these everywhere in Flutter: `Text('Hello', maxLines: 1)`.\n\n## Lists\n\nA **list** holds values in order. Positions start at 0, not 1.\n\n```dart\nvar items = ['rice', 'oil', 'sugar'];\nprint(items[0]);      // rice\nitems.add('salt');\nprint(items.length);  // 4\n```\n\nLists have helpful methods. `where` keeps only matching items, and `map` changes every item:\n\n```dart\nvar prices = [12.0, 45.0, 8.5];\nvar cheap = prices.where((p) => p < 20).toList();\n```\n\n## Maps\n\nA **map** stores pairs of keys and values, like a small dictionary. It is perfect when you look things up by name.\n\n```dart\nvar stock = {'rice': 20, 'oil': 0, 'sugar': 7};\nprint(stock['rice']);   // 20\nstock['oil'] = 12;\n```\n\nData from the internet usually arrives as maps and lists, so you will use them constantly when you connect your app to a server.\n\n## A worked example\n\nHawa keeps the stock for her mother's provisions shop in Bolgatanga. She writes a function that lists items that need restocking:\n\n```dart\nList<String> needRestock(Map<String, int> stock) {\n  var low = <String>[];\n  stock.forEach((item, qty) {\n    if (qty < 5) low.add(item);\n  });\n  return low;\n}\n\nvoid main() {\n  var stock = {'rice': 20, 'oil': 2, 'sugar': 4};\n  print(needRestock(stock));\n}\n```\n\nThe program prints `[oil, sugar]`. When her mother adds new items, Hawa does not change the function at all. She only changes the map. That separation between the data and the code that works on it is something you will see in every well built app.",
      "practice_task_md": "**Goal:** build a small stock checker in DartPad.\n\n1. Create a map of at least five shop items and their quantities.\n2. Write a function `needRestock` that returns a list of items with fewer than five in stock.\n3. Write a function `formatCedis` that turns a number into text such as `GHS 12.50`.\n4. Create a list of prices and use `where` to print only prices under GHS 20, each one formatted with your function.\n5. Change the quantities and confirm the output changes correctly.\n\n**Done looks like:** a program with two functions, a map and a list, that prints the low stock items and the cheap prices correctly.",
      "quiz": {
        "questions": [
          {
            "prompt": "What is the main benefit of putting repeated work into a function?",
            "options": [
              "It makes the program run much faster on low cost phones",
              "It stops the program from printing anything",
              "You write the logic once and fix it in one place",
              "It turns numbers into text automatically"
            ],
            "answer_index": 2,
            "explanation": "A function packages work so you can reuse it and change it in one place."
          },
          {
            "prompt": "Given the list ['rice', 'oil', 'sugar'], what does items[0] return?",
            "options": [
              "oil",
              "sugar",
              "rice",
              "An error, because lists start at 1"
            ],
            "answer_index": 2,
            "explanation": "List positions start at 0, so index 0 is the first item, rice."
          },
          {
            "prompt": "When is a map the right choice instead of a list?",
            "options": [
              "When you only need to store one value",
              "When the order of items is the only thing that matters",
              "When you want to repeat code many times",
              "When you look values up by a key such as a name"
            ],
            "answer_index": 3,
            "explanation": "Maps store key and value pairs, which makes lookups by name easy."
          },
          {
            "prompt": "In the worked example, what did Hawa change when new items arrived in the shop?",
            "options": [
              "She only changed the map of stock",
              "She rewrote the needRestock function",
              "She removed the loop",
              "She created a new program for each item"
            ],
            "answer_index": 0,
            "explanation": "Because the data was separate from the function, only the map needed to change."
          }
        ],
        "pass_threshold": 75
      }
    },
    "classes-and-null-safety": {
      "explanation_md": "Apps are full of things: products, customers, orders, farmers, students. Keeping each thing's details together, with the actions that belong to it, makes code easier to read and much harder to break. Dart does this with classes. Dart also protects you from missing values with null safety, which prevents one of the most common causes of app crashes.\n\n## Classes and objects\n\nA **class** is a template. An **object** is one thing made from that template.\n\n```dart\nclass Product {\n  final String name;\n  final double price;\n  int quantity;\n\n  Product(this.name, this.price, this.quantity);\n\n  bool get inStock => quantity > 0;\n\n  double totalValue() => price * quantity;\n}\n```\n\nThis class has **fields** (name, price, quantity), a **constructor** that fills them in, a **getter** (`inStock`) and a **method** (`totalValue`). Now you can create objects:\n\n```dart\nvar rice = Product('Rice 5kg', 120, 8);\nprint(rice.inStock);       // true\nprint(rice.totalValue());  // 960.0\n```\n\nIn Flutter, every screen and widget is a class, so this idea is everywhere. You will also often use **named parameters** in constructors, written with curly braces and the word `required`, so calls read clearly: `Product(name: 'Oil', price: 45, quantity: 3)`.\n\n## What null means\n\n**Null** means \"no value\". A customer might not have an email address. A server might not send a phone number. In many older languages, using a null value by accident crashes the app.\n\n## Null safety in Dart\n\nDart makes you say up front whether a variable can be null:\n\n```dart\nString name = 'Fuseini';   // can never be null\nString? email;             // may be null\n```\n\nThe `?` after the type means \"this might be missing\". Dart will not let you use `email` as if it were definitely there. You must handle the missing case:\n\n```dart\nprint(email ?? 'No email given');\nif (email != null) {\n  print(email.length);\n}\n```\n\nThe `??` operator gives a fallback value when the left side is null. There is also `!`, which tells Dart \"trust me, this is not null\". If you are wrong, the app crashes, so use `!` rarely and only when you are certain.\n\n## A worked example\n\nMariama is building a member list for a church youth group in Tamale. Some members have phone numbers and some do not:\n\n```dart\nclass Member {\n  final String name;\n  final String? phone;\n  Member(this.name, [this.phone]);\n\n  String contact() => phone ?? 'Ask at Sunday service';\n}\n\nvoid main() {\n  var a = Member('Wumpini', '0240000000');\n  var b = Member('Sumaila');\n  print(a.contact());\n  print(b.contact());\n}\n```\n\nBecause `phone` is marked with `?`, Dart forced her to decide what happens when it is missing. Her app never crashes on a member without a number.",
      "practice_task_md": "**Goal:** model a real thing with a class and handle missing data safely.\n\n1. In DartPad, write a `Student` class with a name, a class level such as `JHS 2`, and an optional guardian phone number (`String?`).\n2. Add a method that returns the guardian phone, or the text `No guardian number` if it is missing.\n3. Add a getter `isJunior` that returns true for JHS students.\n4. Create a list of at least four students, some with and some without phone numbers.\n5. Loop through the list and print each student's name and contact.\n\n**Done looks like:** the program runs without errors, never uses `!`, and prints a sensible line for every student.",
      "quiz": {
        "questions": [
          {
            "prompt": "What is the difference between a class and an object?",
            "options": [
              "An object is a template and a class is one thing made from it",
              "They mean exactly the same thing",
              "A class is a number and an object is text",
              "A class is a template and an object is one thing made from it"
            ],
            "answer_index": 3,
            "explanation": "A class describes the shape, and each object is one instance built from that class."
          },
          {
            "prompt": "What does the question mark in String? email mean?",
            "options": [
              "The value may be null",
              "The variable is private",
              "The variable must be checked by a tester",
              "The value must be a question"
            ],
            "answer_index": 0,
            "explanation": "A question mark after a type marks the value as nullable, meaning it might be missing."
          },
          {
            "prompt": "What does email ?? 'No email given' do?",
            "options": [
              "Always prints 'No email given', whether or not email has a value",
              "Crashes if email is null",
              "Uses email if it has a value, otherwise the fallback text",
              "Deletes the email value"
            ],
            "answer_index": 2,
            "explanation": "The double question mark operator returns the right side only when the left side is null."
          },
          {
            "prompt": "Why should you use the ! operator rarely?",
            "options": [
              "It only works on phones",
              "It turns the value into a number",
              "If the value is actually null, the app crashes",
              "It slows the app down a lot, especially on low cost phones"
            ],
            "answer_index": 2,
            "explanation": "The exclamation mark tells Dart a value is not null, and if that is wrong the app crashes."
          }
        ],
        "pass_threshold": 75
      }
    },
    "async-dart": {
      "explanation_md": "On a slow connection in Damongo, loading a list of prices from a server might take several seconds. If your app simply stopped and waited, the screen would freeze, buttons would stop responding and users would think it had crashed. Asynchronous programming lets your app start slow work and keep the screen responsive while it waits. Every app that talks to a server or a database depends on it.\n\n## What a Future is\n\nA **Future** is a promise of a value that will arrive later. When you ask for data from the internet, you get back a `Future` immediately, and the real data arrives when the request finishes.\n\n```dart\nFuture<String> fetchGreeting() {\n  return Future.delayed(\n    Duration(seconds: 2),\n    () => 'Good morning, Amina',\n  );\n}\n```\n\n`Future.delayed` pretends to be slow work. In a real app this would be a network request or a database read.\n\n## async and await\n\nThe keywords `async` and `await` let you write code that waits for a Future but still reads from top to bottom:\n\n```dart\nFuture<void> main() async {\n  print('Loading...');\n  var message = await fetchGreeting();\n  print(message);\n  print('Done');\n}\n```\n\n* `async` marks a function that can wait.\n* `await` pauses that function, and only that function, until the Future finishes. The rest of the app, including the screen, keeps running.\n\nRun this in DartPad and you will see `Loading...` first, then a pause, then the greeting.\n\n## When things go wrong\n\nNetwork requests fail all the time: data runs out, the signal drops, the server is down. Wrap awaited work in `try` and `catch` so your app can show a friendly message instead of crashing:\n\n```dart\ntry {\n  var data = await fetchPrices();\n  print(data);\n} catch (e) {\n  print('Could not load prices. Check your connection.');\n}\n```\n\nYou can also add a timeout, so users are not left waiting forever: `await fetchPrices().timeout(Duration(seconds: 10))`.\n\n## Streams, briefly\n\nA **Stream** is like a Future that can deliver many values over time, such as new chat messages or a location that keeps changing. You will meet streams later when reading live data. For now, focus on Futures.\n\n## A worked example\n\nAbdul-Rahman is building an app that shows today's maize price for farmers in the Northern Region. He writes a function `loadPrice()` that waits two seconds and then returns a price. His screen shows \"Loading today's price...\" straight away. When the Future completes, it shows the price. When he tests with a function that throws an error, his `catch` block shows \"Price not available. Try again when you have network.\" The farmer always knows what is happening, which is exactly what good mobile apps do.",
      "practice_task_md": "**Goal:** simulate slow network work and handle failure.\n\n1. In DartPad, write `Future<double> loadPrice()` that waits two seconds with `Future.delayed` and returns a price.\n2. In an `async` `main`, print `Loading...`, await the price and print it.\n3. Write a second function `loadPriceBroken()` that waits one second and then throws an error with `throw Exception('No network');`.\n4. Call it inside `try` and `catch` and print a friendly message when it fails.\n5. Add a `.timeout` of one second to a function that waits three seconds, and catch the timeout.\n\n**Done looks like:** your output shows a loading message, a price, and two friendly error messages, with no crash.",
      "quiz": {
        "questions": [
          {
            "prompt": "What is a Future in Dart?",
            "options": [
              "A variable that can never change once it is set",
              "A type of loop",
              "A promise of a value that will arrive later",
              "A list of dates"
            ],
            "answer_index": 2,
            "explanation": "A Future represents a value that will be available once slow work finishes."
          },
          {
            "prompt": "What does await do inside an async function?",
            "options": [
              "Pauses only that function until the Future finishes",
              "Freezes the whole app, screen included, until the data arrives",
              "Turns the Future into a list",
              "Cancels the network request"
            ],
            "answer_index": 0,
            "explanation": "Await pauses only the current function, so the screen stays responsive."
          },
          {
            "prompt": "Why should network calls be wrapped in try and catch?",
            "options": [
              "It makes the request faster",
              "So the app shows a friendly message instead of crashing",
              "It stores the data on the phone so it loads faster next time",
              "It is required before using a for loop"
            ],
            "answer_index": 1,
            "explanation": "Requests fail often on real networks, and catching errors lets the app respond gracefully."
          },
          {
            "prompt": "What is a Stream, as described in the lesson?",
            "options": [
              "Like a Future, but delivering many values over time",
              "A Future that always fails, used for testing error messages",
              "A video file",
              "A kind of map"
            ],
            "answer_index": 0,
            "explanation": "Streams deliver a series of values, such as new messages, rather than a single value."
          }
        ],
        "pass_threshold": 75
      }
    },
    "ui-for-small-screens": {
      "explanation_md": "The screen is the part of your app that users actually touch. A trader in Tamale market does not see your clever code; she sees whether the button is easy to tap, whether the text is readable in sunlight and whether the screen loads quickly on her phone. Employers know this, which is why adverts ask for developers who can turn designs into clean, responsive screens.\n\n## How Flutter draws screens\n\nIn Flutter, everything you see is a **widget**: a piece of text, a button, an image, the padding around them, even the whole screen. You build screens by putting widgets inside other widgets, like boxes inside boxes. This is called the **widget tree**.\n\nFlutter has a feature called **hot reload**. When your app is running on a phone or emulator and you save a change, the screen updates in about a second without restarting the app. This makes trying out layouts fast and fun.\n\n## Design for the phones people really have\n\nMany apps are designed on large, expensive phones and then fail on the phones most people in northern Ghana use. Before you build, picture your real user:\n\n* a small screen, perhaps 5 or 6 inches\n* a phone with limited memory and storage, often shared with family\n* bright sunlight, so contrast matters\n* large text turned on because the user prefers it\n* a slow or expensive data connection\n\nDesign for that phone first. If your app works well there, it will work well on bigger phones too.\n\n## What this section covers\n\n* **Widgets and layout.** Rows, columns, padding and the basic building blocks of every screen.\n* **Lists, forms and navigation.** Long scrolling lists, input forms with checks, and moving between screens.\n* **Designing for low cost phones and every user.** Touch targets, contrast, large text, screen readers and simple, light screens.\n\n## Working from designs\n\nOn a team, a designer often gives you screens drawn in a design tool such as Figma. Your job is to rebuild them faithfully in code, then raise problems early, for example if a design will not fit when the user's text is large. If there is no designer, sketch screens on paper first. A paper sketch costs nothing and saves hours of rebuilding.\n\n## A worked example\n\nWumpini is building an app for a women's shea butter cooperative near Savelugu. She sketches three screens on paper: a list of members, a form to record how many kilos each member brought, and a summary. She shows the sketches to the cooperative leader, who says the text must be bigger and the main button must be at the bottom where her thumb reaches. Wumpini changes the sketches before writing any code. When she builds the screens in Flutter, she tests them on an old phone she borrowed from her brother, with the largest text setting turned on. The leader can use the app on the first try.",
      "practice_task_md": "**Goal:** plan screens for a real user before you code.\n\n1. Choose a real person who could use a simple app: a shop owner, a teacher, a farmer group leader.\n2. On paper, sketch three screens for their app: a list, a form and a detail or summary screen.\n3. Under each sketch, write who will use it, on what kind of phone, and in what conditions (light, data, text size).\n4. Show the sketches to that person or a friend and write down one change they suggest.\n5. Take clear photos of the sketches for your portfolio.\n\n**Done looks like:** three labelled sketches, notes about the user and their phone, and one recorded piece of feedback.",
      "quiz": {
        "questions": [
          {
            "prompt": "In Flutter, what is a widget?",
            "options": [
              "Only a button",
              "A type of database",
              "A design file stored on the server that tells the app how to look",
              "Any piece of the screen, from text and padding to whole pages"
            ],
            "answer_index": 3,
            "explanation": "Everything visible in a Flutter app is built from widgets."
          },
          {
            "prompt": "What does hot reload let you do?",
            "options": [
              "Install a new version on many phones at once over WiFi",
              "Translate the app into other languages",
              "See code changes on a running app in about a second",
              "Reduce the size of the app"
            ],
            "answer_index": 2,
            "explanation": "Hot reload updates the running app quickly when you save, which speeds up layout work."
          },
          {
            "prompt": "Why does the lesson recommend designing for a small, low cost phone first?",
            "options": [
              "An app that works well there will work on bigger phones too",
              "Because designers only use small phones",
              "Because small phones have faster processors and need less testing",
              "Because large phones cannot run Flutter apps"
            ],
            "answer_index": 0,
            "explanation": "Designing for the hardest case first makes the app work for everyone."
          },
          {
            "prompt": "What did Wumpini do before writing any code?",
            "options": [
              "Bought a new phone for testing",
              "Published a test version to the Play Store for members to try",
              "Wrote the database first",
              "Sketched screens on paper and got the leader's feedback"
            ],
            "answer_index": 3,
            "explanation": "She sketched screens and changed them based on the leader's feedback, which saved rebuilding later."
          }
        ],
        "pass_threshold": 75
      }
    },
    "widgets-and-layout": {
      "explanation_md": "Turning a design into a working screen is the first thing most junior mobile developers are asked to do. If you can look at a sketch and quickly build it with the right widgets, you are already useful to a team.\n\n## Stateless and stateful widgets\n\nFlutter has two main kinds of widget you will write yourself:\n\n* A **StatelessWidget** shows something that does not change by itself, such as a product card built from data you pass in.\n* A **StatefulWidget** holds information that can change while the screen is open, such as a counter or a checkbox. You will learn more about this in the state lesson.\n\nEvery widget has a `build` method that returns the widgets it is made of.\n\n## The layout building blocks\n\nMost screens are built from a small set of widgets:\n\n* `Column` places children from top to bottom.\n* `Row` places children from left to right.\n* `Padding` adds space around a widget.\n* `SizedBox` adds a fixed gap or size.\n* `Container` adds colour, borders or rounded corners.\n* `Expanded` makes a child take up the remaining space in a row or column.\n* `Text`, `Icon`, `Image` and buttons such as `ElevatedButton` show content.\n\nRows and columns line children up using `mainAxisAlignment` (along the direction they run) and `crossAxisAlignment` (across it).\n\n## A worked example\n\nSumaila is building a product card for a provisions shop in Tamale. This runs in DartPad:\n\n```dart\nimport 'package:flutter/material.dart';\n\nvoid main() => runApp(const MaterialApp(\n  home: Scaffold(body: Center(child: ProductCard())),\n));\n\nclass ProductCard extends StatelessWidget {\n  const ProductCard({super.key});\n\n  @override\n  Widget build(BuildContext context) {\n    return Card(\n      child: Padding(\n        padding: const EdgeInsets.all(16),\n        child: Row(\n          children: [\n            const Icon(Icons.shopping_bag, size: 40),\n            const SizedBox(width: 12),\n            Expanded(\n              child: Column(\n                crossAxisAlignment: CrossAxisAlignment.start,\n                children: const [\n                  Text('Rice 5kg', style: TextStyle(fontSize: 18)),\n                  Text('GHS 120'),\n                ],\n              ),\n            ),\n            ElevatedButton(onPressed: () {}, child: const Text('Add')),\n          ],\n        ),\n      ),\n    );\n  }\n}\n```\n\nRead it from the outside in: a `Card`, with padding, holding a `Row` of an icon, a gap, an expanded column of text, and a button. Because the text column is wrapped in `Expanded`, long product names wrap instead of pushing the button off the screen.\n\n## Avoiding overflow\n\nThe most common layout error is a yellow and black striped bar with the word \"overflowed\". It means a widget is wider or taller than the space available. Fixes include wrapping a child in `Expanded` or `Flexible`, letting text wrap, or making a long screen scroll with `SingleChildScrollView`. Always test with long text, because a real product name or a Dagbani greeting may be longer than your sample.\n\n## Using const\n\nWriting `const` before widgets that never change, such as `const SizedBox(width: 12)`, lets Flutter reuse them instead of rebuilding them. It is a small habit that helps performance on modest phones.",
      "practice_task_md": "**Goal:** build a product card from a sketch.\n\n1. Open dartpad.dev and create a new Flutter snippet.\n2. Type the `ProductCard` example by hand and run it.\n3. Change the product to something from a shop near you, with its price in cedis.\n4. Add a second line of text showing how many are in stock, in a smaller grey font.\n5. Change the name to something very long and check that nothing overflows.\n6. Put three cards in a `Column` to make a small shop page.\n\n**Done looks like:** a screenshot showing three product cards with long and short names, no overflow stripes.",
      "quiz": {
        "questions": [
          {
            "prompt": "Which widget places its children from top to bottom?",
            "options": [
              "Padding",
              "Row",
              "Column",
              "Icon"
            ],
            "answer_index": 2,
            "explanation": "A Column lays out children vertically, from top to bottom."
          },
          {
            "prompt": "When should you use a StatelessWidget?",
            "options": [
              "Only for the very first screen of the app",
              "When the widget shows something that does not change by itself",
              "When the widget must hold a counter that changes while the screen is open",
              "When the widget needs to talk to a server"
            ],
            "answer_index": 1,
            "explanation": "Stateless widgets display data passed in and do not change on their own."
          },
          {
            "prompt": "What does a yellow and black striped overflow bar mean?",
            "options": [
              "The app has lost its internet connection and cannot load",
              "The phone's battery is low",
              "The app has been published successfully",
              "A widget is bigger than the space available"
            ],
            "answer_index": 3,
            "explanation": "The overflow warning appears when content does not fit the available space."
          },
          {
            "prompt": "In the worked example, why is the text column wrapped in Expanded?",
            "options": [
              "So long names wrap instead of pushing the button off the screen",
              "To add a border and rounded corners around the product name and price",
              "To hide the button",
              "To make the text bold"
            ],
            "answer_index": 0,
            "explanation": "Expanded lets the column take only the remaining space, so long text wraps."
          },
          {
            "prompt": "Why does the lesson suggest writing const before widgets that never change?",
            "options": [
              "It makes them change colour automatically when dark mode is on",
              "It is required for every widget",
              "Flutter can reuse them instead of rebuilding them",
              "It translates the text into other languages"
            ],
            "answer_index": 2,
            "explanation": "Const widgets are created once and reused, saving work on modest phones."
          }
        ],
        "pass_threshold": 80
      }
    },
    "lists-forms-navigation": {
      "explanation_md": "Look at almost any business app in Ghana, from a pharmacy stock app to an NGO survey tool, and you will find the same three things: a list of items, a form to add or edit them, and a way to move between screens. Master these and you can build the core of most real apps.\n\n## Long lists with ListView.builder\n\nA shop might have five hundred products. Building five hundred widgets at once would waste memory on a modest phone. `ListView.builder` only builds the rows that are visible on screen, and builds more as the user scrolls:\n\n```dart\nListView.builder(\n  itemCount: products.length,\n  itemBuilder: (context, i) {\n    final p = products[i];\n    return ListTile(\n      title: Text(p.name),\n      subtitle: Text('GHS ${p.price}'),\n      onTap: () => openDetail(p),\n    );\n  },\n)\n```\n\n`ListTile` is a ready made row with a title, subtitle and optional icons. Use it often; it already follows good spacing and touch target sizes.\n\n## Forms that check their input\n\nA `Form` groups input fields so you can check them all at once. Each `TextFormField` can have a `validator` function that returns an error message, or `null` if the value is fine:\n\n```dart\nTextFormField(\n  decoration: const InputDecoration(labelText: 'Phone number'),\n  keyboardType: TextInputType.phone,\n  validator: (v) {\n    if (v == null || v.length != 10) {\n      return 'Enter a 10 digit phone number';\n    }\n    return null;\n  },\n)\n```\n\nGive the form a `GlobalKey<FormState>` and call `formKey.currentState!.validate()` when the user taps Save. Choosing the right `keyboardType` matters on a phone: a number pad for amounts and phone numbers saves users time and mistakes.\n\nGood form habits:\n\n* Label every field clearly.\n* Show errors next to the field, in plain words.\n* Never clear what the user typed when something goes wrong.\n\n## Moving between screens\n\nFlutter keeps screens in a stack, like plates. `Navigator.push` puts a new screen on top, and `Navigator.pop` removes it to go back:\n\n```dart\nNavigator.push(\n  context,\n  MaterialPageRoute(builder: (_) => ProductDetail(product: p)),\n);\n```\n\nYou can pass data to the new screen through its constructor, as above, and return a value with `Navigator.pop(context, result)`. Larger apps often use named routes or a routing package, but the idea of a stack stays the same. The Android back button also pops the top screen, so make sure going back always makes sense.\n\n## A worked example\n\nMariama builds a members app for a savings group (susu) in Wa. The home screen is a `ListView.builder` of members. Tapping a member pushes a detail screen showing their contributions. A floating button opens a form to add a contribution, with a validator that rejects empty or negative amounts and a number keyboard. When the form is saved, it pops back and the list shows the new total.",
      "practice_task_md": "**Goal:** build a list, a form and navigation in one small app.\n\n1. In DartPad (Flutter) or on a laptop, make a list of at least ten shop items with `ListView.builder` and `ListTile`.\n2. Tapping an item should push a detail screen showing its name and price.\n3. Add a button that opens a form with two fields: item name and price.\n4. Add validators: the name must not be empty and the price must be a number above zero. Use a number keyboard for price.\n5. When saved, pop back and add the new item to the list.\n\n**Done looks like:** you can add an item, see it in the list, tap it to see details and go back, and the form refuses bad input with clear messages.",
      "quiz": {
        "questions": [
          {
            "prompt": "Why use ListView.builder for a long list?",
            "options": [
              "It only builds the rows that are visible, saving memory",
              "It downloads every item from the internet before showing the list",
              "It sorts the items automatically",
              "It makes every row a button"
            ],
            "answer_index": 0,
            "explanation": "ListView.builder creates rows on demand as the user scrolls, which saves memory."
          },
          {
            "prompt": "What should a TextFormField validator return when the value is fine?",
            "options": [
              "Null",
              "The number zero",
              "An empty error message in red",
              "True"
            ],
            "answer_index": 0,
            "explanation": "A validator returns an error message for bad input and null when the input is valid."
          },
          {
            "prompt": "What does Navigator.push do?",
            "options": [
              "Saves the form to a database",
              "Puts a new screen on top of the stack",
              "Closes the app",
              "Sends a push notification to the user's phone"
            ],
            "answer_index": 1,
            "explanation": "Navigator.push adds a new screen on top of the navigation stack."
          },
          {
            "prompt": "Why does the lesson stress choosing the right keyboardType?",
            "options": [
              "It makes the app smaller",
              "It changes the app's colour",
              "The right keyboard saves users time and mistakes",
              "It is needed for the Android back button to work on forms"
            ],
            "answer_index": 2,
            "explanation": "Showing the right keyboard makes typing faster and reduces errors on a phone."
          }
        ],
        "pass_threshold": 75
      }
    },
    "low-end-android-and-accessibility": {
      "explanation_md": "An app that only works well on an expensive phone shuts out many of the people who need it most. In Ghana, many users have entry level Android phones with small screens, limited memory and little free storage. Some have poor eyesight, some use large text, and some use a screen reader. Building for all of them is good engineering, and it is something employers and clients increasingly expect.\n\n## Designing for modest phones\n\n* **Keep screens simple.** One clear main action per screen. Fewer widgets also means less work for a slow processor.\n* **Use lists that build lazily**, like `ListView.builder`, instead of building everything at once.\n* **Be careful with images.** Large photos use memory and data. Use small, compressed images and show a placeholder while they load.\n* **Avoid heavy animations** that stutter on older phones. A simple fade is fine; a constant animated background is not.\n* **Respect storage.** Users often delete apps to free space. A small, light app is more likely to stay installed.\n* **Test on a real low cost phone.** Borrow one from a family member if you need to. The emulator on a laptop hides slowness.\n\n## Touch targets and thumbs\n\nFingers are less precise than mouse pointers. Android and Material Design guidance recommend touch targets of at least 48 by 48 density independent pixels (dp). Flutter's standard buttons and `ListTile` already meet this, but custom icons and small text links often do not. Leave space between tappable items, and put the main action where a thumb reaches easily, usually near the bottom of the screen.\n\n## Text and contrast\n\n* Let text grow. Many users set a larger font size in Android settings. Do not fix heights that cut text off; test your screens with the largest text setting.\n* Use strong contrast, such as dark text on a light background. Pale grey on white is hard to read in sunlight.\n* Never use colour alone to show meaning. A red price that means \"out of stock\" should also say \"Out of stock\".\n\n## Screen readers\n\nAndroid includes a screen reader called TalkBack, which reads the screen aloud. Flutter widgets such as `Text` and buttons are read automatically, but an icon button with no label is just \"button\". Add labels:\n\n```dart\nIconButton(\n  icon: const Icon(Icons.delete),\n  tooltip: 'Delete item',\n  onPressed: removeItem,\n)\n```\n\nFor custom widgets, wrap them in `Semantics(label: '...')`. Turn on TalkBack yourself and try to use your app with your eyes closed. It is the fastest way to find problems.\n\n## A worked example\n\nIssahaku tests his market price app on his grandmother's old phone in Yendi. He finds the price list stutters, the delete icon is tiny and her large text setting cuts off product names. He switches to `ListView.builder`, replaces the icon with a full width button labelled \"Remove\", and removes fixed heights so text wraps. With TalkBack on, every button now reads its purpose. His grandmother can use the app without asking him for help.",
      "practice_task_md": "**Goal:** audit one of your own screens for real users.\n\n1. Take a screen you built earlier, such as your product list or form.\n2. On an Android phone, set the font size to the largest option and open the screen. Note anything cut off or overlapping.\n3. Turn on TalkBack (Settings, Accessibility) and try to use the screen. Note any control that is read as only \"button\".\n4. Check every tappable item is comfortably large and spaced apart.\n5. Fix at least three problems, then write a short before and after note.\n\nIf you do not have a laptop today, do the audit on any app you use often and write down what you would change.\n\n**Done looks like:** a list of problems found, the fixes you made, and before and after screenshots.",
      "quiz": {
        "questions": [
          {
            "prompt": "What minimum touch target size does Material Design guidance recommend?",
            "options": [
              "100 by 100 dp",
              "24 by 24 dp",
              "12 by 12 dp",
              "48 by 48 dp"
            ],
            "answer_index": 3,
            "explanation": "The lesson cites Material Design guidance of at least 48 by 48 dp for touch targets."
          },
          {
            "prompt": "Why should you avoid fixed heights around text?",
            "options": [
              "Text cannot be shown without a fixed height",
              "Fixed heights make the app download slower and use more storage",
              "Fixed heights stop the back button working",
              "Users with large text settings may have their text cut off"
            ],
            "answer_index": 3,
            "explanation": "When users enlarge text, fixed heights can clip it, so text should be allowed to grow."
          },
          {
            "prompt": "What is TalkBack?",
            "options": [
              "A tool for recording app videos",
              "A way to send SMS from an app",
              "A Flutter chat feature that lets users talk back to support staff",
              "Android's screen reader, which reads the screen aloud"
            ],
            "answer_index": 3,
            "explanation": "TalkBack is the Android screen reader used by people with low or no vision."
          },
          {
            "prompt": "How can you make an icon button understandable to a screen reader?",
            "options": [
              "Remove the icon completely",
              "Give it a label, for example with a tooltip or Semantics",
              "Make it smaller",
              "Make the icon red so the screen reader knows it is important"
            ],
            "answer_index": 1,
            "explanation": "A tooltip or Semantics label gives the screen reader words to read for the button."
          }
        ],
        "pass_threshold": 75
      }
    },
    "state-and-data": {
      "explanation_md": "A screen that looks good is only the start. Real apps must remember what the user did, fetch fresh data from servers, save records on the phone and keep working when the network disappears. In Ghana, where data bundles run out and signal comes and goes, this last point is not an extra. It decides whether people keep using your app.\n\nMany adverts we read asked for exactly these skills: REST APIs, JSON, state management approaches such as Provider, Riverpod or Bloc, Firebase, and offline storage. This section covers them in order.\n\n## The four ideas in this section\n\n* **State management.** State is the data that decides what the screen shows right now: the items in a cart, whether a user is signed in, whether something is loading. You will learn how to change it safely and share it between screens.\n* **Networking and APIs.** Most apps get data from a server through an API, usually as JSON. You will learn to send requests, turn JSON into Dart objects and handle slow or failed connections.\n* **Local storage.** Some data should live on the phone: settings, a cached list of prices, records waiting to be uploaded. You will learn the main options and when to use each.\n* **Offline first.** You will put it all together into apps that read and write locally first, then sync with the server when they can.\n\n## How the pieces fit\n\nA useful way to picture a well built app is in layers:\n\n1. **The UI layer** shows widgets and reacts to user taps.\n2. **The state layer** holds what the screen needs and decides what changes.\n3. **The data layer** fetches from the network and reads and writes local storage. A class here is often called a **repository**.\n\nWidgets never call the server directly. They ask the state layer, which asks the repository. This separation makes the app easier to test and change. If you switch from one server to another, only the repository changes.\n\n## A worked example\n\nPicture an app for an NGO running a health survey in villages around Bawku. Field officers fill in forms on cheap phones, often with no signal.\n\n* The **UI** shows the list of households and the survey form.\n* The **state** tracks which household is selected and whether a form is being saved.\n* The **repository** saves each completed form into a database on the phone straight away, then uploads waiting forms when the phone gets a connection.\n\nFuseini, a field officer, completes twelve surveys in a day with no network at all. That evening, when he reaches Bawku town and his phone connects, the app uploads everything in the background and marks each form as synced. Nothing was lost, and he never had to think about it.\n\nBy the end of this section you will be able to build a small version of exactly this kind of app.\n\n## Study tip\n\nThese topics build on each other quickly. If something feels confusing, go back and rebuild the small examples in earlier lessons. Most difficulties here come from a shaky understanding of async and await, or of classes, so a quick review often clears things up.",
      "practice_task_md": "**Goal:** map the layers of an app before you build it.\n\n1. Choose an app idea that needs data, such as a stock list for a shop or attendance for a school club.\n2. On paper, draw three boxes labelled UI, State and Data.\n3. In the UI box, list the screens. In the State box, list what each screen needs to know (for example \"list of items\", \"is loading\"). In the Data box, list what comes from the server and what is saved on the phone.\n4. Mark which data must still be available with no internet.\n5. Photograph the diagram for your portfolio.\n\n**Done looks like:** a labelled three layer diagram with offline needs clearly marked, which you can explain to a mentor in two minutes.",
      "quiz": {
        "questions": [
          {
            "prompt": "What is state in a mobile app?",
            "options": [
              "The name and icon the app shows on the Play Store listing",
              "The data that decides what the screen shows right now",
              "The region of Ghana where the app is used",
              "The colour scheme of the app"
            ],
            "answer_index": 1,
            "explanation": "State is the current data, such as cart items or a loading flag, that controls what the screen displays."
          },
          {
            "prompt": "In the layered picture of an app, what does a repository do?",
            "options": [
              "Chooses the app's font",
              "Sends the app to the Play Store",
              "Draws widgets on the screen and reacts when the user taps them",
              "Fetches from the network and reads and writes local storage"
            ],
            "answer_index": 3,
            "explanation": "The repository sits in the data layer and handles network and local storage."
          },
          {
            "prompt": "Why should widgets not call the server directly?",
            "options": [
              "Widgets are not allowed to use the internet on Android phones",
              "It makes the app download faster",
              "Servers only accept requests from databases",
              "Separate layers make the app easier to test and change"
            ],
            "answer_index": 3,
            "explanation": "Separating UI, state and data means changes in one layer do not break the others."
          },
          {
            "prompt": "In the survey example, what happened to forms completed with no network?",
            "options": [
              "They were sent by SMS immediately",
              "They were lost and had to be filled in again the next morning",
              "The app refused to save them",
              "They were saved on the phone and uploaded later"
            ],
            "answer_index": 3,
            "explanation": "The repository saved forms locally first and uploaded them later, so nothing was lost."
          }
        ],
        "pass_threshold": 75
      }
    },
    "state-management": {
      "explanation_md": "Employers in Accra and remote teams often name a state management approach in their adverts: Provider, Riverpod and Bloc came up in several of the ones we read. You do not need to master all of them. You need to understand what state is, how Flutter rebuilds screens when it changes, and why apps grow out of the simplest approach.\n\n## State causes rebuilds\n\nIn Flutter, the screen is a picture of your state. When the state changes, Flutter calls `build` again and redraws what changed. Your job is to change state in the right way so Flutter knows to redraw.\n\n## Local state with setState\n\nFor state that only one widget cares about, use a `StatefulWidget` and `setState`:\n\n```dart\nclass Counter extends StatefulWidget {\n  const Counter({super.key});\n  @override\n  State<Counter> createState() => _CounterState();\n}\n\nclass _CounterState extends State<Counter> {\n  int plates = 0;\n\n  @override\n  Widget build(BuildContext context) {\n    return ElevatedButton(\n      onPressed: () => setState(() => plates++),\n      child: Text('Plates: $plates'),\n    );\n  }\n}\n```\n\nCalling `setState` tells Flutter \"this changed, please rebuild\". If you change `plates` without `setState`, the number changes in memory but the screen does not update. This is a very common beginner bug.\n\n## When setState is not enough\n\nImagine a shop app where the cart total appears on the product list, the cart screen and a badge in the top bar. If the cart lives inside one widget, other screens cannot see it. Passing it down through many constructors quickly becomes messy. This is called **app state**: data that many parts of the app share.\n\n## Shared state approaches\n\nAll popular approaches solve the same problem: keep shared state in one place outside the widgets, let widgets read it, and rebuild only the widgets that depend on it.\n\n* **Provider** wraps your app with an object holding state. A common pattern uses a class that extends `ChangeNotifier` and calls `notifyListeners()` after a change. Widgets that `watch` it rebuild automatically.\n* **Riverpod** is from the same author as Provider. It defines state in providers that do not depend on the widget tree, which makes testing easier.\n* **Bloc** separates events (things that happened, like \"item added\") from states (what the screen should show). It is more structured and popular in larger teams.\n\nLearn one well, ideally Provider or Riverpod first because they are lighter, then read about Bloc so you recognise it in a job.\n\n## A worked example\n\nAmina's chop bar ordering app in Tamale starts with `setState` on one screen. When she adds a cart screen, she moves the cart into a `CartModel` class that extends `ChangeNotifier`, with `add`, `remove` and a `total` getter. She provides it at the top of the app. The menu, the cart screen and the badge all read from the same `CartModel`. When a customer taps \"Add waakye\", `add` calls `notifyListeners()` and all three update together, with no data passed by hand between screens.",
      "practice_task_md": "**Goal:** feel the difference between local and shared state.\n\n1. In DartPad (Flutter), build the `Counter` example and confirm it updates.\n2. Remove `setState` from the button and observe that the screen stops updating. Put it back.\n3. On a laptop, create a Flutter app with two screens: a menu and a cart.\n4. Add the `provider` package and create a `CartModel` that extends `ChangeNotifier`, with `add` and `total`.\n5. Show the total on both screens and confirm both update when you add an item.\n\nIf you only have a phone today, do steps 1 and 2 and write in your notes how you would structure the `CartModel`.\n\n**Done looks like:** a working two screen app where the cart total stays in step everywhere, with the code on GitHub.",
      "quiz": {
        "questions": [
          {
            "prompt": "What happens when you call setState in a StatefulWidget?",
            "options": [
              "The data is saved to the server so other phones see it",
              "Flutter rebuilds the widget to show the new state",
              "The app restarts",
              "The widget is deleted"
            ],
            "answer_index": 1,
            "explanation": "setState tells Flutter the state changed so it calls build again."
          },
          {
            "prompt": "What is a common beginner bug described in the lesson?",
            "options": [
              "Writing const before a widget",
              "Changing a value without setState, so the screen does not update",
              "Calling setState too many times in a row, which makes the app crash",
              "Using a Column instead of a Row"
            ],
            "answer_index": 1,
            "explanation": "Without setState, the value changes in memory but Flutter is not told to redraw."
          },
          {
            "prompt": "What is app state?",
            "options": [
              "The list of permissions the app requests",
              "Data that many parts of the app share, such as a cart total",
              "State that only one button needs, kept inside its own widget",
              "The app's version number"
            ],
            "answer_index": 1,
            "explanation": "App state is shared across screens, unlike local state that only one widget uses."
          },
          {
            "prompt": "In the Provider pattern described, what does notifyListeners() do?",
            "options": [
              "Clears the cart",
              "Tells widgets that depend on the model to rebuild",
              "Sends a push notification to the user about the change",
              "Writes data to the phone's storage"
            ],
            "answer_index": 1,
            "explanation": "Calling notifyListeners after a change makes watching widgets rebuild with the new data."
          }
        ],
        "pass_threshold": 75
      }
    },
    "networking-and-apis": {
      "explanation_md": "Working with REST APIs was named in nearly every mobile advert we read, junior or senior, Ghanaian or remote. Prices, orders, user profiles and messages all come from servers. Your app must ask for them, understand the answer and cope gracefully when the network is slow or gone.\n\n## What an API is\n\nAn **API** is a set of addresses (URLs) on a server that your app can call. A **REST** API uses standard HTTP methods:\n\n* `GET` to read data, such as a list of products\n* `POST` to create something, such as a new order\n* `PUT` or `PATCH` to update\n* `DELETE` to remove\n\nThe server replies with a **status code** (200 means OK, 404 means not found, 500 means a server error) and usually a body in **JSON**, a text format made of objects and lists:\n\n```json\n{ \"name\": \"Rice 5kg\", \"price\": 120, \"inStock\": true }\n```\n\n## Making a request in Flutter\n\nThe `http` package is the simplest way to start:\n\n```dart\nimport 'dart:convert';\nimport 'package:http/http.dart' as http;\n\nFuture<List<Product>> fetchProducts() async {\n  final res = await http\n      .get(Uri.parse('https://api.example.com/products'))\n      .timeout(const Duration(seconds: 15));\n  if (res.statusCode != 200) {\n    throw Exception('Server error ${res.statusCode}');\n  }\n  final List data = jsonDecode(res.body);\n  return data.map((j) => Product.fromJson(j)).toList();\n}\n```\n\n## Turning JSON into Dart objects\n\n`jsonDecode` gives you maps and lists. Convert them into your own classes with a `fromJson` constructor, so the rest of your code uses safe, typed objects:\n\n```dart\nfactory Product.fromJson(Map<String, dynamic> j) => Product(\n  name: j['name'] as String,\n  price: (j['price'] as num).toDouble(),\n);\n```\n\nFor bigger apps, code generation packages can write these for you, but write a few by hand first so you understand them.\n\n## Showing loading, data and errors\n\nEvery network screen has three states: loading, success and error. Flutter's `FutureBuilder` helps, or you can track them in your state class. Always:\n\n* show a progress indicator while loading\n* show a clear message and a \"Try again\" button on error\n* set a timeout so users are not left waiting forever\n\n## Being kind to data bundles\n\n* Ask only for what you need. Use pages (for example 20 items at a time) instead of downloading everything.\n* Do not refetch the same data every time a screen opens; keep it in state or local storage.\n* Never put secret API keys in your app. Anyone can unpack an app file and read them. Secrets belong on a server.\n\n## A worked example\n\nWumpini builds an app showing bus departure times from Tamale. She calls `GET /departures?city=tamale`, decodes the JSON into `Departure` objects and shows them in a list. On a slow connection she sees the spinner for a while, then her timeout triggers and the app says \"Could not load departures. Check your data and try again\", with a retry button. When it works, she saves the result so the next opening is instant.",
      "practice_task_md": "**Goal:** fetch real JSON and show it safely.\n\n1. In a browser, open `https://jsonplaceholder.typicode.com/todos?_limit=5`, a free practice API, and look at the JSON.\n2. On a laptop, create a Flutter app, add the `http` package and write a `Todo` class with `fromJson`.\n3. Fetch the five todos and show them in a `ListView`.\n4. Show a spinner while loading, and an error message with a retry button if the request fails. Test the error by turning off WiFi and data.\n5. Add a 10 second timeout.\n\n**Done looks like:** the list loads, the error state appears when offline, and retry works when you reconnect.",
      "quiz": {
        "questions": [
          {
            "prompt": "Which HTTP method is normally used to read data from a REST API?",
            "options": [
              "PATCH",
              "GET",
              "POST",
              "DELETE"
            ],
            "answer_index": 1,
            "explanation": "GET requests read data without changing it."
          },
          {
            "prompt": "What does a 404 status code mean?",
            "options": [
              "The thing you asked for was not found",
              "The server crashed",
              "The user must update the app before it can connect",
              "The request succeeded"
            ],
            "answer_index": 0,
            "explanation": "404 means not found, 200 means OK and 500 means a server error."
          },
          {
            "prompt": "Why convert JSON maps into your own Dart classes with fromJson?",
            "options": [
              "It makes the server respond faster and use less of the data bundle",
              "The rest of your code can then use safe, typed objects",
              "JSON cannot be read by Dart at all",
              "It is the only way to show a list"
            ],
            "answer_index": 1,
            "explanation": "Typed objects let Dart check your code and make the data easier to use."
          },
          {
            "prompt": "Why should you never put secret API keys inside your app?",
            "options": [
              "Keys make the app too large for the Play Store",
              "Keys stop working on slow networks",
              "Anyone can unpack the app file and read them",
              "Flutter refuses to compile apps with keys"
            ],
            "answer_index": 2,
            "explanation": "App files can be unpacked, so secrets must stay on a server."
          },
          {
            "prompt": "Which habit helps save users' data bundles?",
            "options": [
              "Downloading the full list every time a screen opens",
              "Using larger images so they look sharp and clear on small screens",
              "Requesting data in pages and reusing data you already have",
              "Removing timeouts so requests always finish"
            ],
            "answer_index": 2,
            "explanation": "Paging and reusing data avoid repeated, unnecessary downloads."
          }
        ],
        "pass_threshold": 80
      }
    },
    "local-storage": {
      "explanation_md": "A user in Wa opens your app with no data left on her bundle. If everything comes from the server, she sees an empty screen. If your app stored what it needs on the phone, she sees her records straight away. Storing data on the device is what makes apps feel fast and reliable on Ghanaian networks, and an agritech advert we read named offline storage explicitly.\n\n## Three kinds of data, three tools\n\n**1. Small settings: key value storage.** For simple things like \"dark mode on\", \"language is English\" or \"last selected branch\", use the `shared_preferences` package. You save a value under a key and read it back later.\n\n```dart\nfinal prefs = await SharedPreferences.getInstance();\nawait prefs.setString('language', 'en');\nfinal lang = prefs.getString('language') ?? 'en';\n```\n\nIt is easy, but it is not a database. Do not store long lists or important records in it.\n\n**2. Structured records: a database.** For lists of products, sales, survey answers or messages, use a real database on the phone. **SQLite** is a small, reliable database built into Android. In Flutter the `sqflite` package gives you access to it, and packages such as Drift add type safety on top. Records live in **tables** with **columns**, and you query them with SQL:\n\n```dart\nawait db.insert('sales', {'item': 'Rice 5kg', 'amount': 120.0});\nfinal rows = await db.query('sales', where: 'synced = ?', whereArgs: [0]);\n```\n\nUsing `?` with `whereArgs`, instead of building SQL by joining strings, protects you from a class of bugs and attacks called SQL injection.\n\n**3. Files: images and documents.** Photos, PDFs and downloaded files go in the app's own folder. The `path_provider` package tells you where that folder is. Store the file there and keep its path in your database.\n\n## Keep secrets secret\n\nNormal storage is not encrypted. Do not store passwords or payment PINs at all. For sign in tokens, use a secure storage package that uses Android's Keystore, such as `flutter_secure_storage`.\n\n## Plan for change\n\nYour database structure will change as your app grows, for example when you add a `phone` column to customers. Databases handle this with a **version number** and **migrations**: code that upgrades old data to the new shape. Plan for this early, because users will update from old versions with data already saved.\n\n## Mind the storage space\n\nMany users have phones that are almost full. Clean up old cached data, keep images small, and give users a way to clear downloads.\n\n## A worked example\n\nHawa builds a sales book app for traders in Bolgatanga market. The trader's name and preferred language are saved with `shared_preferences`. Every sale is a row in a SQLite `sales` table with item, amount, date and a `synced` flag. Receipt photos are saved as small compressed files, with their paths stored in the table. The app opens instantly with the day's sales even with no network, and a later lesson adds syncing to a server.",
      "practice_task_md": "**Goal:** save data that survives closing the app.\n\n1. On a laptop, create a Flutter app with a simple form to record a sale: item and amount.\n2. Use `sqflite` to create a `sales` table and insert each sale.\n3. Show all sales in a list, newest first, with a total at the bottom.\n4. Save the trader's name with `shared_preferences` and show it in the app bar.\n5. Close the app completely, turn off data, reopen it and confirm everything is still there.\n\nPhone only today? Design the table on paper: list its columns, their types and one example row.\n\n**Done looks like:** sales and the trader's name survive a full restart with no network, and the code is on GitHub.",
      "quiz": {
        "questions": [
          {
            "prompt": "Which tool suits a small setting such as the user's preferred language?",
            "options": [
              "A file in the downloads folder",
              "Key value storage such as shared_preferences",
              "A large SQLite table with a column for every setting",
              "A push notification"
            ],
            "answer_index": 1,
            "explanation": "Simple settings fit key value storage, which is easy to read and write."
          },
          {
            "prompt": "Why use whereArgs with question marks instead of joining strings to build SQL?",
            "options": [
              "It sends the query to the server",
              "It is required to show a list",
              "It protects against SQL injection and related bugs",
              "It makes the database smaller and the queries run faster"
            ],
            "answer_index": 2,
            "explanation": "Parameters keep user input separate from the SQL command, preventing injection."
          },
          {
            "prompt": "Where should you store a user's sign in token?",
            "options": [
              "Inside the app's source code",
              "In plain shared_preferences, next to the language setting",
              "In a public file on the phone",
              "In secure storage that uses Android's Keystore"
            ],
            "answer_index": 3,
            "explanation": "Tokens should go in secure, encrypted storage, and PINs and passwords should not be stored at all."
          },
          {
            "prompt": "What are database migrations for?",
            "options": [
              "Translating the app",
              "Uploading the latest database file to the Play Store with each release",
              "Moving the app to a new phone",
              "Upgrading saved data when the database structure changes"
            ],
            "answer_index": 3,
            "explanation": "Migrations change existing data to fit a new database version when the app updates."
          }
        ],
        "pass_threshold": 75
      }
    },
    "offline-first": {
      "explanation_md": "Agritech, health and fintech teams in Ghana build for users who are often offline: farmers in the field, community health workers in villages, traders whose data has run out. An app that simply shows \"No internet\" fails these users. An **offline first** app works with the data on the phone and treats the network as a bonus. This skill sets you apart, because many developers only test on fast office WiFi.\n\n## The core idea: the phone is the source of truth\n\nIn an offline first app, the screen always reads from **local storage**, not straight from the server. The server is used to fill and update that local copy.\n\n* **Reading:** the screen shows what is in the local database immediately. In the background, the app fetches fresh data when it can, saves it locally, and the screen updates.\n* **Writing:** when the user saves something, it goes into the local database first, marked as \"not yet synced\". The user sees it straight away.\n* **Syncing:** when a connection is available, the app sends unsynced records to the server and marks them as synced.\n\n## Choosing a write strategy\n\nNot all data is the same:\n\n* **Write locally, sync later** suits records like survey answers, sales and notes. Losing them would be bad, and a short delay does not matter.\n* **Online only** suits actions that must be confirmed right now, such as a payment or a money transfer. Here, the app should clearly say it needs a connection and never pretend the action succeeded.\n\n## Syncing safely\n\n* **Use unique IDs created on the phone** for each record, so the server can tell if it receives the same record twice, for example after a dropped connection.\n* **Retry with backoff.** If a sync fails, wait a little longer before each new attempt instead of hammering the network and draining the battery.\n* **Sync in the background.** On Android, background work can be scheduled so it runs when the phone has a network connection, even if the user has closed the app. In Flutter, packages such as `workmanager` wrap this Android feature.\n* **Handle conflicts.** If the same record changed on two phones, you need a rule. A simple and common rule is **last write wins**, using a timestamp, but be aware it can silently overwrite someone's edit. For important data, keep both versions and ask a person.\n\n## Tell the user what is happening\n\nShow a small, honest status: \"Saved on this phone\", \"Syncing\", \"All synced\". Users trust apps that are clear about where their data is.\n\n## A worked example\n\nAbdul-Rahman builds a farm visit app for an agritech extension team in the Upper West. Each visit is saved in SQLite with an ID created on the phone and `synced = 0`. A list screen shows all visits instantly, with a small cloud icon on those still waiting. A background job runs when the phone has a network connection, sends waiting visits to the server, and sets `synced = 1` when the server confirms. If the server sees an ID it already has, it ignores the duplicate. Extension officers can work all week in areas with no signal, and the office in Wa sees every visit within minutes of them reaching town.",
      "practice_task_md": "**Goal:** add offline first syncing to your sales app.\n\n1. Start from your sales app in the local storage lesson. Add an `id` (text, created on the phone) and a `synced` column to the `sales` table.\n2. Show a small icon or label for unsynced sales.\n3. Write a `syncSales()` function that sends unsynced rows to a practice API, such as a POST to `https://jsonplaceholder.typicode.com/posts`, and marks them synced on success.\n4. Run `syncSales()` when the app opens and from a \"Sync now\" button. Catch errors and leave rows unsynced on failure.\n5. Test with data off: add sales, then turn data on and sync.\n\nPhone only today? Write the steps of the sync on paper as a numbered list, including what happens if the connection drops halfway.\n\n**Done looks like:** sales save offline, show as waiting, and switch to synced after you reconnect, with no duplicates.",
      "quiz": {
        "questions": [
          {
            "prompt": "In an offline first app, where does the screen read its data from?",
            "options": [
              "From SMS messages",
              "From the Play Store",
              "Directly from the server every time",
              "From local storage on the phone"
            ],
            "answer_index": 3,
            "explanation": "Offline first apps treat the local database as the source of truth for the screen."
          },
          {
            "prompt": "Which kind of action should usually stay online only?",
            "options": [
              "Writing a note",
              "Recording a farm visit with notes and a photo",
              "Confirming a payment or money transfer",
              "Saving a survey answer"
            ],
            "answer_index": 2,
            "explanation": "Payments must be confirmed in real time, so the app should not pretend they succeeded offline."
          },
          {
            "prompt": "Why create a unique ID for each record on the phone?",
            "options": [
              "So the app does not need a database",
              "So the user can see the new record faster on a slow phone",
              "So the record takes less space",
              "So the server can spot the same record arriving twice"
            ],
            "answer_index": 3,
            "explanation": "Phone created IDs let the server ignore duplicates after retries."
          },
          {
            "prompt": "What is a risk of the last write wins rule?",
            "options": [
              "It only works on iPhones",
              "It never saves any data",
              "It uses too much storage by keeping every old version",
              "It can silently overwrite someone else's edit"
            ],
            "answer_index": 3,
            "explanation": "Last write wins keeps the latest change and may drop an earlier edit without warning."
          }
        ],
        "pass_threshold": 75
      }
    },
    "services-and-integrations": {
      "explanation_md": "An app becomes truly useful when it connects to the services people rely on. In Ghana that means letting users sign in, keeping their data safe in the cloud, taking payments by mobile money, and reaching them with notifications or SMS. Adverts we read asked for Firebase, third party integrations and push notifications, and some listed fintech experience or in app payments as a plus, so this section covers each one.\n\n## The golden rule: your app is not trusted\n\nEverything you put inside an app can be unpacked and read by a determined person. Anyone can also change how their copy of the app behaves. So:\n\n* **Secrets** such as payment provider keys and SMS provider keys must live on a **server**, never in the app.\n* **Important decisions**, such as \"this order is paid\", must be made on the server, never by the app alone.\n\nYour app talks to your own server or to a hosted backend with strict security rules. That server then talks to payment, SMS and other providers. Once you understand this rule, every integration in this section makes sense.\n\n## What this section covers\n\n* **Ready made backends and sign in.** Using a hosted backend such as Firebase for user accounts, cloud data and server functions, without managing your own machines.\n* **Mobile money payments.** How a payment travels between your app, your server, a payment provider and the customer's phone, and why the server must confirm every payment. This lesson stays provider neutral: the same pattern applies whichever provider a business chooses.\n* **Push notifications and SMS.** Reaching users with notifications when they have data, and with SMS when they do not, plus the permissions and costs involved.\n\n## Thinking about cost\n\nMany of these services have free tiers for learning and small projects, but real use can cost money: each SMS has a price, and cloud services charge when usage grows. As a developer you will often be asked to estimate costs, so read each provider's pricing page before you build, and design features to avoid waste, for example by not sending an SMS when a free push notification would do.\n\n## Privacy and trust\n\nThese features handle personal data: phone numbers, names, payment records. Ghana has a Data Protection Act, and app stores require you to explain what data you collect. Collect only what you need, protect it, and be honest with users about how you use it. Users in small communities talk to each other, and trust lost is hard to win back.\n\n## A worked example\n\nMariama is building an ordering app for a bakery in Tamale. Customers sign in with their phone number through a hosted backend. Orders are saved to the cloud with rules so each customer can only see their own orders. When a customer pays, the app asks the bakery's small server to start a mobile money payment; the server talks to the payment provider and only marks the order paid when the provider confirms. When the bread is ready, the server sends a push notification, and falls back to an SMS for customers who have not opened the app recently. No secret key is ever inside the app.",
      "practice_task_md": "**Goal:** design the integrations for an app before you build them.\n\n1. Choose an app idea that needs payments or messages, such as ordering from a shop or booking a hair appointment.\n2. Draw four boxes: App, Your server or backend, Payment provider, SMS or push service.\n3. Draw arrows for: signing in, placing an order, paying, and getting a \"ready\" message. Label each arrow with what is sent.\n4. Circle every place a secret key is used, and check that none of them is inside the App box.\n5. Write one sentence about what personal data the app collects and why it needs it.\n\n**Done looks like:** a clear diagram with secrets only on the server side, and a short data note you could show a mentor.",
      "quiz": {
        "questions": [
          {
            "prompt": "What is the golden rule described in this lesson?",
            "options": [
              "Payments should be confirmed by the app itself",
              "Secrets and important decisions belong on a server, not in the app",
              "Every app must use SMS instead of push notifications",
              "Apps should store all keys inside the app so they keep working offline"
            ],
            "answer_index": 1,
            "explanation": "Because apps can be unpacked and altered, secrets and decisions like payment status must live on a server."
          },
          {
            "prompt": "Why should important decisions such as \"this order is paid\" be made on the server?",
            "options": [
              "A user could change how their copy of the app behaves",
              "Phones cannot store order data",
              "The Play Store requires all decisions to be made online",
              "Servers are faster than phones"
            ],
            "answer_index": 0,
            "explanation": "A modified app could falsely claim success, so the server must decide."
          },
          {
            "prompt": "What does the lesson suggest to avoid unnecessary costs?",
            "options": [
              "Send an SMS for every update",
              "Store everything inside the app so you never have to pay for a server",
              "Use a free push notification instead of an SMS where it will do",
              "Avoid reading pricing pages"
            ],
            "answer_index": 2,
            "explanation": "The lesson recommends designing features to avoid waste, such as preferring push over paid SMS when suitable."
          },
          {
            "prompt": "How does the lesson say you should treat personal data?",
            "options": [
              "Collect only what you need, protect it and be honest about its use",
              "Share it with other apps to improve features",
              "Collect as much as possible in case it becomes useful for a later feature",
              "Keep it secret from users"
            ],
            "answer_index": 0,
            "explanation": "Minimising, protecting and being open about personal data builds trust and meets legal and store requirements."
          }
        ],
        "pass_threshold": 75
      }
    },
    "backends-and-auth": {
      "explanation_md": "Firebase appeared in several of the mobile adverts we read in Ghana, including a National Service Flutter role. Small teams like hosted backends because one developer can add user accounts, cloud data and notifications without running a server. Knowing how to use one safely makes you productive from day one.\n\n## What a hosted backend gives you\n\nA **backend as a service** is a set of ready made server features you use through a package in your app. Firebase, from Google, is a common example; Supabase is another. Typical features:\n\n* **Authentication:** sign in with email, phone number or a Google account.\n* **A cloud database:** for example Cloud Firestore, which stores documents in collections and can sync data in real time. It also caches data on the phone, which helps when the network drops.\n* **Cloud functions:** small pieces of server code that run when something happens, such as a new order. This is where secrets and trusted decisions can live. On Firebase, cloud functions need a pay as you go billing plan, so many learners start without them.\n* **File storage** for images and documents, and **messaging** for push notifications.\n\nMost offer a free plan with limits, which is enough for learning and portfolio apps. Check the current pricing page before launching anything real.\n\n## Setting up Firebase in Flutter\n\nThe official guide uses two command line tools: the Firebase CLI and FlutterFire CLI. In short:\n\n1. Create a project in the Firebase console.\n2. Run `flutterfire configure` in your app folder. It creates a configuration file for your app.\n3. Add packages such as `firebase_core` and `firebase_auth`, and call `Firebase.initializeApp()` before your app starts.\n\n## Sign in\n\nPhone number sign in suits Ghana, where many people do not use email. The user enters their number, receives a one time code by SMS, and enters it in the app. Remember that every SMS code costs the provider money, so services limit or charge for these messages. Check the current pricing page before you rely on phone sign in.\n\nAfter sign in, you get a **user ID**. Use it to link data to the person, for example by saving orders under `users/{uid}/orders`.\n\n## Security rules are not optional\n\nThe Firebase configuration file inside your app is not secret, and that is by design: it only identifies your project. What protects your data is **security rules** on the server, which decide who can read and write what. A rule might say \"a user may only read orders where the user ID matches their own\". Without good rules, anyone could read or change your whole database. Test your rules before launch.\n\nNever put truly secret keys, such as a payment provider key, in the app. Those belong in cloud functions or your own server.\n\n## A worked example\n\nSumaila builds a booking app for a barber in Damongo. Customers sign in with their Google account, which most Android users already have. Each booking is a Firestore document with the customer's user ID, time and service. His security rules let customers create and read only their own bookings, and let the barber's account read all of them. The barber's own screen listens to the bookings collection in real time, so new bookings appear instantly without any server code. He launched it on the free plan, and plans to add a cloud function for reminders once the barber is ready to pay for usage.",
      "practice_task_md": "**Goal:** add sign in and protected cloud data to a small app.\n\n1. On a laptop, create a free Firebase project and connect a Flutter app with `flutterfire configure`.\n2. Turn on email sign in and build a simple sign in screen.\n3. Save a note to Cloud Firestore under the signed in user's ID.\n4. Write a security rule so users can only read and write their own notes. Use the rules playground in the console to test that another user is refused.\n5. Sign out and confirm the notes are no longer visible.\n\nPhone only today? Open the Firebase Security Rules docs and write, in plain English, three rules your app would need.\n\n**Done looks like:** two test accounts each see only their own notes, and your rules are saved in your repo.",
      "quiz": {
        "questions": [
          {
            "prompt": "What is a backend as a service?",
            "options": [
              "Ready made server features you use through a package in your app",
              "A paid course on backend development",
              "A tool for designing app icons",
              "A cheap server you rent and manage yourself, installing everything by hand"
            ],
            "answer_index": 0,
            "explanation": "Services such as Firebase provide hosted backend features so you do not have to run your own servers."
          },
          {
            "prompt": "Why does phone number sign in suit many users in Ghana?",
            "options": [
              "It is the only method Firebase supports",
              "It does not need any network",
              "Many people use a phone number rather than email",
              "It never costs the provider anything to send the code"
            ],
            "answer_index": 2,
            "explanation": "The lesson notes that many people do not use email, so phone sign in fits."
          },
          {
            "prompt": "What actually protects data in a Firebase database?",
            "options": [
              "Making the app icon hard to find",
              "Using a long app name",
              "Security rules on the server that decide who can read and write",
              "Keeping the configuration file secret so nobody can find your project"
            ],
            "answer_index": 2,
            "explanation": "The config file only identifies the project, so server side security rules are what protect data."
          },
          {
            "prompt": "Where should a payment provider's secret key go?",
            "options": [
              "In shared_preferences",
              "In the Firebase configuration file inside the app",
              "In the app's source code",
              "In cloud functions or your own server"
            ],
            "answer_index": 3,
            "explanation": "Truly secret keys must stay on the server side, never in the app."
          }
        ],
        "pass_threshold": 75
      }
    },
    "mobile-money-payments": {
      "explanation_md": "Mobile money is part of daily life in Ghana, so many business apps need to accept it: ordering food, paying school fees, buying airtime, paying a supplier. Some adverts we read listed fintech experience or in app payments as an advantage. This lesson teaches the pattern that applies whichever payment provider a business chooses, so you can read any provider's documentation with confidence.\n\n## The players\n\n* **The customer**, with a mobile money wallet on their phone.\n* **Your app**, where they choose what to buy.\n* **Your server** (or cloud functions), which holds the secret keys and records orders.\n* **A payment provider**, a licensed company that connects businesses to mobile money networks through an API. Businesses usually sign up with one provider that supports several networks.\n\n## How a typical payment flows\n\n1. The customer taps \"Pay GHS 50\" in your app and enters or confirms their mobile money number.\n2. Your app asks **your server** to start a payment. It sends the order ID, not the price the app thinks is right; your server looks up the real price.\n3. Your server calls the **provider's API** with its secret key, the amount, the phone number and a unique **reference** for this attempt.\n4. The provider sends a **prompt to the customer's phone**. The customer approves it by entering their mobile money PIN **on their own phone**, in the network's secure prompt. Some flows send a one time code instead.\n5. The payment is now **pending**. It can succeed, fail, or time out if the customer ignores the prompt.\n6. The provider tells your server the result, usually by calling a **webhook** (a URL on your server). Your server checks that the message really came from the provider, as their documentation explains, and may also ask the provider's API for the status directly.\n7. Only then does your server mark the order **paid**, and your app shows success.\n\n## Rules you must never break\n\n* **Never ask for, show or store a mobile money PIN** in your app. The PIN is only ever entered in the network's own prompt.\n* **Never put the provider's secret key in the app.** It lives on your server.\n* **Never trust the app to say a payment succeeded.** Only your server, after confirming with the provider, decides.\n* **Use a unique reference for every payment attempt**, so a retry after a dropped connection does not charge the customer twice.\n\n## Designing the screen\n\nWaiting for a prompt can take time, and customers get anxious. Show clear steps: \"Check your phone and approve the payment\", a waiting indicator, and what to do if no prompt appears. Handle every outcome: success, failure, timeout and \"still pending\". Never show success until your server confirms it. Use the provider's test or sandbox mode while you build, so no real money moves.\n\n## A worked example\n\nFuseini builds checkout for a school uniform shop in Tamale. The app sends the order ID to a cloud function, which calls the provider's sandbox API. The app shows \"Approve the payment on your phone\" and polls the server for the order status. The provider's webhook arrives, the function verifies it and marks the order paid, and the app shows the receipt. When Fuseini tests by ignoring the prompt, the app shows \"Payment not completed. You have not been charged. Try again.\"",
      "practice_task_md": "**Goal:** design a safe mobile money checkout without moving real money.\n\n1. Draw the payment flow from this lesson as a numbered diagram with four columns: Customer, App, Your server, Provider.\n2. Design four app screens on paper or in a free design tool: confirm order, waiting for approval, success, and failed or timed out.\n3. Write the exact friendly message for each outcome, using cedis.\n4. Choose any payment provider that serves Ghana, open its public developer docs, and find: the sandbox or test mode, how webhooks are verified, and how to check a payment's status. Write each in one sentence in your own words.\n\n**Done looks like:** a flow diagram, four screens with messages, and three short notes from real provider docs.",
      "quiz": {
        "questions": [
          {
            "prompt": "Where does the customer enter their mobile money PIN?",
            "options": [
              "In an email from your server",
              "In a text field in your app",
              "On their own phone, in the network's secure prompt",
              "On the payment provider's website"
            ],
            "answer_index": 2,
            "explanation": "The PIN is entered only in the network's prompt on the customer's phone, never in your app."
          },
          {
            "prompt": "Why should the app send the order ID to the server instead of the price?",
            "options": [
              "Because prices cannot be sent over the internet",
              "To make the request smaller",
              "Because the provider only accepts order IDs, never amounts in cedis",
              "So the server uses the real price, even if the app was changed"
            ],
            "answer_index": 3,
            "explanation": "The server looks up the real price, so a tampered app cannot change what is charged."
          },
          {
            "prompt": "What is a webhook in a payment flow?",
            "options": [
              "A type of mobile money wallet",
              "The customer's PIN",
              "A URL on your server that the provider calls with the result",
              "A button in the app that confirms payment once the customer taps it"
            ],
            "answer_index": 2,
            "explanation": "Providers call your webhook to tell your server whether a payment succeeded or failed."
          },
          {
            "prompt": "Why use a unique reference for every payment attempt?",
            "options": [
              "It hides the amount from the customer",
              "It is needed to show the app icon",
              "So a retry does not charge the customer twice",
              "It makes the payment faster"
            ],
            "answer_index": 2,
            "explanation": "Unique references let the provider and your server recognise repeated attempts."
          },
          {
            "prompt": "When should the app show \"Payment successful\"?",
            "options": [
              "Only after your server has confirmed the payment with the provider",
              "When the prompt appears on the customer's phone",
              "After a fixed wait of one minute",
              "As soon as the customer taps Pay"
            ],
            "answer_index": 0,
            "explanation": "Success must only be shown after server side confirmation, because a payment can still fail or time out."
          }
        ],
        "pass_threshold": 80
      }
    },
    "push-notifications-and-sms": {
      "explanation_md": "Apps need to reach people: \"Your order is ready\", \"Your appointment is tomorrow\", \"Your payment was received\". Push notifications appeared in several adverts we read, Ghanaian and remote. In Ghana you also need a plan for users without data, which is where SMS comes in. Choosing the right channel, and using it politely, is part of a mobile developer's job.\n\n## Push notifications\n\nA **push notification** is a message that appears on the phone even when your app is closed. On Android, apps commonly use **Firebase Cloud Messaging (FCM)**:\n\n1. When your app starts, it gets a **device token** from FCM, a long ID for this app on this phone.\n2. Your app sends that token to your server and saves it against the user.\n3. When something happens, your server asks FCM to deliver a message to that token.\n4. The phone shows the notification. Tapping it can open a specific screen in your app.\n\nPush messages are free to send through FCM, but they need the phone to have a data connection to arrive.\n\n## Asking permission\n\nSince Android 13, apps must ask the user for permission before showing notifications. Ask at a sensible moment, when the user understands why, for example right after they place an order: \"Turn on notifications so we can tell you when your food is ready?\" Asking the moment the app first opens, with no reason given, leads many people to refuse.\n\n## Good notification manners\n\n* Send only messages the user will value. Too many and they will turn notifications off or uninstall.\n* Make each message clear on its own: \"Your waakye order is ready for pickup\" beats \"Update available\".\n* Use **notification channels** on Android, such as \"Orders\" and \"Promotions\", so users can turn off one type and keep the other.\n\n## SMS\n\n**SMS** reaches almost every phone, including basic phones, and needs no data. That makes it valuable for important messages in Ghana: payment receipts, appointment reminders, one time codes. But:\n\n* Each SMS **costs money**, paid to an SMS provider.\n* Messages are short. Characters outside the basic set, such as the cedi sign ₵, can switch the message to a different encoding that fits fewer characters, which can raise the cost. Writing \"GHS\" avoids this.\n* SMS is sent from **your server** through a provider's API, never directly from the app with a secret key inside it.\n* Users can usually opt out, and you must respect that.\n\n## USSD, briefly\n\nSome services in Ghana use **USSD** codes, such as dialling a short code, so people on basic phones can use menus with no data. USSD is built on the server side with a telecom network or an aggregator, not inside an Android app, but it is useful to know that it exists as a companion channel.\n\n## A worked example\n\nHawa builds reminders for a maternal health clinic near Bolgatanga. Mothers who use the app get a free push notification the day before an appointment. The server checks who has not opened the app for a week, or has no device token, and sends those mothers a short SMS instead: \"Reminder: clinic visit tomorrow 9am. Reply STOP to opt out.\" Important reminders reach everyone, and the clinic only pays for SMS where push would not work.",
      "practice_task_md": "**Goal:** plan and try notifications for a real use case.\n\n1. Pick an app idea, such as a clinic, a school or a shop, and list three messages it should send.\n2. For each message, decide push, SMS or both, and write one sentence explaining why.\n3. Write each message in under 160 characters using \"GHS\" rather than the cedi sign.\n4. On a laptop, follow the Firebase Cloud Messaging Flutter guide to receive a test notification sent from the Firebase console on your own phone.\n5. Add a permission request that appears after a meaningful action, with a one line explanation.\n\nPhone only today? Complete steps 1 to 3 and sketch the permission prompt screen.\n\n**Done looks like:** a message plan with channel choices, and either a screenshot of a test notification or your sketch.",
      "quiz": {
        "questions": [
          {
            "prompt": "What does an app send to its server so the server can target push notifications?",
            "options": [
              "The device token from Firebase Cloud Messaging",
              "The phone's serial number",
              "The user's mobile money PIN",
              "The app's source code"
            ],
            "answer_index": 0,
            "explanation": "The server stores each device token and uses it to ask FCM to deliver a message to that phone."
          },
          {
            "prompt": "From which Android version must apps ask permission before showing notifications?",
            "options": [
              "Android 13",
              "Notifications never need permission",
              "Android 9",
              "Android 5"
            ],
            "answer_index": 0,
            "explanation": "The lesson states that since Android 13 apps must request notification permission."
          },
          {
            "prompt": "Why is SMS still valuable in Ghana despite its cost?",
            "options": [
              "It reaches basic phones and needs no data",
              "It can be sent from the app with a key inside",
              "It is always free",
              "It can carry long videos"
            ],
            "answer_index": 0,
            "explanation": "SMS works on almost every phone without a data connection."
          },
          {
            "prompt": "Why does the lesson suggest writing GHS instead of the cedi sign in SMS?",
            "options": [
              "The cedi sign is not allowed in SMS messages sent within Ghana",
              "GHS is shorter to type",
              "Special characters can change the encoding and raise the cost",
              "SMS cannot contain numbers"
            ],
            "answer_index": 2,
            "explanation": "Characters outside the basic set can change the encoding, which reduces the characters per message."
          },
          {
            "prompt": "Where is a USSD service built?",
            "options": [
              "In the phone's notification settings",
              "Inside the Android app using Flutter widgets",
              "On the server side with a telecom network or aggregator",
              "In shared_preferences"
            ],
            "answer_index": 2,
            "explanation": "USSD menus run on the server side with network partners, not inside an app."
          }
        ],
        "pass_threshold": 80
      }
    },
    "quality-and-release": {
      "explanation_md": "Writing an app that works on your phone is one thing. Shipping an app that works for hundreds of strangers, on many kinds of phones and networks, is another. The difference is quality work: testing, careful debugging, attention to size and speed, and a proper release process. Ghanaian and remote adverts we read asked for testing, performance optimisation and Play Store release experience, including a junior role. This section covers all three.\n\n## Why quality matters so much on mobile\n\nOn the web, you can fix a bug and every user gets the fix the next time they load the page. Mobile is different:\n\n* Users must **download an update** to get your fix, and many update rarely, especially on limited data.\n* A crash or a slow first screen often leads straight to an **uninstall**, and you may never know why.\n* **Store reviews** are public. A few angry one star reviews can put off new users.\n* Phones vary widely: screen sizes, Android versions, memory and storage.\n\nSo it pays to catch problems before release, not after.\n\n## What this section covers\n\n* **Testing and debugging.** Unit tests for logic, widget tests for screens, and using the debugger and Flutter DevTools instead of guessing.\n* **App size and speed on slow networks.** Measuring release builds, shrinking downloads, smooth scrolling on modest phones and careful use of data.\n* **Publishing to the Google Play Store.** Signing your app, building an app bundle, the store listing and privacy requirements, and the closed testing step new personal developer accounts must complete.\n\n## Debug and release builds\n\nWhen you run your app from your editor, Flutter builds it in **debug mode**. Debug builds include tools such as hot reload, so they are larger and slower than the real thing. Before you judge speed or size, build in **release mode** (`flutter run --release` or `flutter build appbundle`). Many beginners worry their app is slow, when it is only the debug build.\n\n## Real devices, real conditions\n\nTest the way your users live:\n\n* on a low cost Android phone, not only the emulator\n* on a slow connection, and with no connection at all\n* with large text and TalkBack turned on\n* after leaving the app in the background for a while, then returning\n\nKeep a short **test checklist** for your app and run it before every release. It takes minutes and catches the same embarrassing bugs each time.\n\n## A worked example\n\nIssahaku is about to release version 2 of his market price app. He runs his unit and widget tests, which all pass. He then builds a release version and installs it on two phones: his own, and an old phone from his cousin. On the old phone with data off, the app crashes when opening the prices screen. His tests never covered the \"no cached data and no network\" case. He adds a test for it, fixes the bug, checks the app size has not grown, and only then uploads to a closed testing track for a few traders in Yendi to try before everyone gets it.",
      "practice_task_md": "**Goal:** write a release checklist for one of your apps.\n\n1. Choose an app you have built in this roadmap.\n2. Write a checklist of at least eight checks, covering: first launch, no network, slow network, large text, back button behaviour, a form with bad input, returning from background, and the main happy path.\n3. Run the checklist on a real phone using a release build if you have a laptop, or on the debug build if not.\n4. Record each result as pass or fail, with a note for each failure.\n\n**Done looks like:** a checklist in your repo's README or a notes file, with one completed run and any bugs written up clearly.",
      "quiz": {
        "questions": [
          {
            "prompt": "Why does quality matter more on mobile than on the web, according to the lesson?",
            "options": [
              "Phones are all exactly the same",
              "Mobile apps cannot be updated at all",
              "Mobile apps are never reviewed",
              "Users must download updates, and many update rarely"
            ],
            "answer_index": 3,
            "explanation": "Fixes only reach users who download updates, so bugs that ship can stay around for a long time."
          },
          {
            "prompt": "Why should you judge an app's speed using a release build?",
            "options": [
              "Debug builds cannot run on real phones",
              "Release builds skip all the code",
              "Release builds include hot reload",
              "Debug builds include extra tools that make them larger and slower"
            ],
            "answer_index": 3,
            "explanation": "Debug builds carry development tools, so only release builds show true speed and size."
          },
          {
            "prompt": "Which testing condition does the lesson recommend?",
            "options": [
              "Testing only in the emulator",
              "Testing on a low cost phone, with slow and no network",
              "Only testing with perfect WiFi",
              "Only testing on the newest, fastest phone"
            ],
            "answer_index": 1,
            "explanation": "Testing in realistic conditions reveals problems that fast phones and WiFi hide."
          },
          {
            "prompt": "In the worked example, what bug did Issahaku find before release?",
            "options": [
              "Prices showed in the wrong currency",
              "The app crashed with no cached data and no network on an old phone",
              "The app icon was blurry",
              "The app was too large for the Play Store"
            ],
            "answer_index": 1,
            "explanation": "Testing on an old phone with data off revealed a crash his tests had not covered."
          }
        ],
        "pass_threshold": 75
      }
    },
    "testing-and-debugging": {
      "explanation_md": "Testing came up in many of the mobile adverts we read, including a junior role: unit tests, widget or UI tests, and sometimes test driven development. Teams want developers who can prove their code works and find bugs calmly. Flutter makes both easier than you might expect.\n\n## Three levels of tests\n\n* **Unit tests** check a single function or class, with no screen. For example: does `cartTotal` add prices correctly, and does it return 0 for an empty cart? They run in seconds.\n* **Widget tests** build one widget or screen in a fake environment and check what appears. For example: when I tap \"Add\", does the count go from 0 to 1?\n* **Integration tests** run the whole app on a real phone or emulator, tapping through a full journey. They are slower, so you write fewer of them.\n\nMost of your tests should be unit and widget tests.\n\n## A unit test\n\nPut tests in the `test` folder. Flutter projects include the `flutter_test` package for this:\n\n```dart\nimport 'package:flutter_test/flutter_test.dart';\nimport 'package:shop/cart.dart';\n\nvoid main() {\n  test('total adds item prices', () {\n    final cart = Cart()..add(15)..add(20);\n    expect(cart.total, 35);\n  });\n\n  test('empty cart total is zero', () {\n    expect(Cart().total, 0);\n  });\n}\n```\n\nRun `flutter test` and you get a pass or fail for each one. Always test the edge cases: empty lists, zero, missing values, very long text.\n\n## A widget test\n\n```dart\ntestWidgets('tapping Add increases count', (tester) async {\n  await tester.pumpWidget(const MaterialApp(home: Counter()));\n  expect(find.text('Plates: 0'), findsOneWidget);\n  await tester.tap(find.byType(ElevatedButton));\n  await tester.pump();\n  expect(find.text('Plates: 1'), findsOneWidget);\n});\n```\n\n`pumpWidget` builds the screen, `find` locates widgets, `tap` simulates a finger and `pump` lets Flutter rebuild.\n\n## Debugging without guessing\n\nWhen something breaks:\n\n1. **Read the error and stack trace.** The top lines that mention your own files usually point to the problem.\n2. **Reproduce it reliably.** Write down the exact steps. If you can, turn them into a failing test.\n3. **Inspect, do not guess.** Set a **breakpoint** in your editor to pause the app on a line and look at the values of variables. Use `debugPrint` for quick checks, and remove noisy prints afterwards.\n4. **Use Flutter DevTools.** The widget inspector shows your widget tree and layout problems, and other tabs show network calls, memory and performance.\n5. **Fix, then add a test** so the bug cannot quietly return.\n\n## Writing a good bug report\n\nWhen you find a bug in a teammate's code or a library, write: what you did, what you expected, what happened instead, the phone and Android version, and a screenshot. Clear bug reports make you valuable on any team.\n\n## A worked example\n\nAmina's chop bar app shows the wrong total when a customer removes an item. She writes a unit test that adds two items, removes one and checks the total. It fails, confirming the bug. A breakpoint in `remove` shows she was subtracting the price twice. She fixes the line, the test passes, and it now runs every time she changes the cart code.",
      "practice_task_md": "**Goal:** write your first tests and fix a bug with them.\n\n1. On a laptop, in one of your Flutter apps, create a small `Cart` class with `add`, `remove` and `total` if you do not have one.\n2. Write at least four unit tests, including an empty cart and removing an item.\n3. Write one widget test for a screen with a button that changes some text.\n4. Introduce a deliberate bug, run `flutter test`, and watch a test fail. Fix it.\n5. Set a breakpoint in your editor, run the app in debug mode and inspect a variable.\n\nPhone only today? In DartPad, write a `Cart` class and check it with simple `assert` statements, such as `assert(Cart().total == 0);`.\n\n**Done looks like:** at least five passing tests in your repo and a note describing the bug you caught.",
      "quiz": {
        "questions": [
          {
            "prompt": "What does a unit test check?",
            "options": [
              "The speed of the internet connection",
              "How the app looks in the Play Store",
              "A single function or class, without a screen",
              "The whole app running on a real phone"
            ],
            "answer_index": 2,
            "explanation": "Unit tests check small pieces of logic in isolation and run quickly."
          },
          {
            "prompt": "In a widget test, what does tester.pump() do?",
            "options": [
              "Lets Flutter rebuild after an action such as a tap",
              "Sends a notification",
              "Deletes the widget",
              "Installs the app on a phone"
            ],
            "answer_index": 0,
            "explanation": "After simulating a tap, pump lets Flutter process the change and redraw."
          },
          {
            "prompt": "Which kind of test should you write the fewest of, because they are slower?",
            "options": [
              "Integration tests",
              "Unit tests",
              "Widget tests",
              "Edge case tests"
            ],
            "answer_index": 0,
            "explanation": "Integration tests run the whole app on a device, so they are slower and used more sparingly."
          },
          {
            "prompt": "What is a breakpoint used for?",
            "options": [
              "Pausing the app on a line so you can inspect variable values",
              "Stopping the app from being published",
              "Limiting how much data the app uses",
              "Splitting a long screen into two"
            ],
            "answer_index": 0,
            "explanation": "A breakpoint pauses execution so you can see what the code is really doing."
          },
          {
            "prompt": "What should you do after fixing a bug, according to the lesson?",
            "options": [
              "Add more print statements everywhere",
              "Publish immediately without checking",
              "Delete all existing tests",
              "Add a test so the bug cannot quietly return"
            ],
            "answer_index": 3,
            "explanation": "A test that covers the bug protects against it coming back later."
          }
        ],
        "pass_threshold": 80
      }
    },
    "performance-and-app-size": {
      "explanation_md": "For many users in Ghana, every megabyte costs money and phone storage is nearly full. A large download may never start, and an app that stutters on a modest phone gets uninstalled. Performance was named in some of the adverts we read, and caring about them shows an employer you understand real users.\n\n## Measure first, and measure the right build\n\nNever judge size or speed from a debug build; it carries development tools and is much bigger and slower. To see what users really get:\n\n* Build an **Android App Bundle** with `flutter build appbundle`. When you upload a bundle, Google Play creates smaller downloads tailored to each phone, instead of one large file for every device.\n* Add `--analyze-size` to a build command to see a breakdown of what takes up space: your Dart code, packages, assets and native code. Flutter DevTools can open the analysis file as a visual map.\n* After uploading to Play Console, check its app size information for the real download size.\n\n## Shrinking the download\n\n* **Images are usually the biggest win.** Compress PNG and JPEG files, use the size you actually display, and consider WebP. Remove unused assets.\n* **Be choosy with packages.** Each package adds code. Before adding one, ask whether a few lines of your own would do.\n* **Split debug information** out of release builds with the `--split-debug-info` option (often used with `--obfuscate`). This shrinks the code in the app; keep the split files safe so you can still read crash reports.\n* **Download large content later.** Ship the core app small, and fetch extra content only when a user needs it.\n\n## Smooth screens on modest phones\n\n* Use lazy lists such as `ListView.builder` for long content.\n* Mark unchanging widgets `const` so Flutter can reuse them.\n* Keep `build` methods light; do not do heavy calculations or file reads inside them.\n* Move heavy work, such as parsing a very large JSON response, off the main thread. Flutter's `compute` function runs work in a separate isolate so the screen does not freeze.\n* Use the **performance view in DevTools**, in profile mode, to find frames that take too long.\n\n## Kind to slow and costly networks\n\n* **Cache** what you download and reuse it, so reopening a screen does not cost data again.\n* **Load in pages**, for example twenty items at a time.\n* **Request smaller images** from your server for list thumbnails.\n* **Set timeouts** and show clear retry options.\n* **Respect the user's choice.** Consider a setting such as \"Download images on WiFi only\".\n\n## A worked example\n\nWumpini's shea cooperative app had grown large because she had added every package that looked useful and full size photos of every product. She runs `flutter build appbundle --analyze-size` and sees that images and two unused packages take most of the space. She compresses the images to the size the screen actually shows, removes the unused packages and switches to app bundles. The download shrinks clearly, and on the old test phone the product list now scrolls smoothly because thumbnails are small. Members who were waiting for WiFi to install it can now download it on their bundles.",
      "practice_task_md": "**Goal:** measure and reduce the size of one of your apps.\n\n1. On a laptop, run `flutter build apk --analyze-size` (or `appbundle`) on an app you built, and write down the total and the three biggest items.\n2. Find and compress any large images, and resize them to the size they are displayed.\n3. Remove at least one package you do not really need, or explain why each one is needed.\n4. Build again and record the new size.\n5. Run the app in profile mode on a real phone, open DevTools and scroll your longest list. Note any slow frames.\n\nPhone only today? Open the storage settings on your phone, list your five largest apps, and write down which ones you would uninstall first and why.\n\n**Done looks like:** a before and after size note in your README, with what you changed.",
      "quiz": {
        "questions": [
          {
            "prompt": "Why should you upload an Android App Bundle rather than a single universal file?",
            "options": [
              "Google Play creates smaller downloads tailored to each phone",
              "Bundles skip the Play Store review",
              "Bundles do not need to be signed",
              "Bundles can only be installed on new phones"
            ],
            "answer_index": 0,
            "explanation": "From an app bundle, Play generates device specific downloads that are smaller than a universal file."
          },
          {
            "prompt": "What does adding --analyze-size to a Flutter build do?",
            "options": [
              "Uploads the app to the store",
              "Removes all images from the app",
              "Makes the app run faster",
              "Shows a breakdown of what takes up space in the app"
            ],
            "answer_index": 3,
            "explanation": "The analysis lists the size of code, packages, assets and native code so you can see what to cut."
          },
          {
            "prompt": "According to the lesson, what is usually the biggest win for shrinking an app?",
            "options": [
              "Adding more packages",
              "Compressing and resizing images",
              "Renaming variables",
              "Using a darker colour scheme"
            ],
            "answer_index": 1,
            "explanation": "Images are often the largest part of an app, so compressing and resizing them saves the most."
          },
          {
            "prompt": "What does Flutter's compute function help with?",
            "options": [
              "Measuring the app's download size and which packages are largest",
              "Sending push notifications",
              "Signing the release build",
              "Running heavy work in an isolate so the screen does not freeze"
            ],
            "answer_index": 3,
            "explanation": "Compute moves heavy work such as large JSON parsing off the main thread."
          }
        ],
        "pass_threshold": 75
      }
    },
    "publishing-to-play-store": {
      "explanation_md": "An app on the Google Play Store is the strongest proof you can offer an employer or client: they can install it on their own phone in seconds. Play Store release experience appeared in several Ghanaian and remote adverts we read. Publishing also teaches you things tutorials skip: signing, privacy and working through a review.\n\n## Before you start: the developer account\n\nYou need a Google Play developer account, which has a one time registration fee and identity verification. Check the current fee and requirements on the Play Console help pages. If you do not have a card for online payment, ask a mentor or a trusted adult to help.\n\n**Important for new personal accounts:** Google requires personal developer accounts created after 13 November 2023 to run a **closed test** with at least 12 testers who stay opted in for at least 14 days in a row, before the app can be released to everyone. Plan for this early. Friends, classmates, a church youth group or a study group can be your testers, but they must keep the test installed for the whole period. Organisation accounts have different requirements.\n\n## Preparing the release build\n\n1. **Set the app name, icon and a unique application ID**, such as `com.yourname.shopbook`. The ID cannot change after you publish.\n2. **Create an upload key** and configure signing as the Flutter Android release guide explains. The upload key proves to Google that a new version really comes from you, so anyone who gets it could sign uploads as you. Keep the key file and its passwords backed up and private. Never commit them to Git.\n3. **Use Play App Signing**, so Google holds the final signing key and you can recover if you lose your upload key.\n4. **Set the version** in `pubspec.yaml`. Every upload needs a higher version code than the last.\n5. **Build an app bundle** with `flutter build appbundle`. Play requires the bundle format for new apps.\n\n## The store listing and policies\n\n* **Listing:** a short and full description in plain language, screenshots from a real phone, an icon and a feature graphic.\n* **Privacy policy:** a public web page explaining what data you collect and why. A free page on GitHub Pages works.\n* **Data safety form:** declare what data your app collects, shares and how it is protected. It must match what your app really does, including data collected by packages such as analytics.\n* **Content rating and target audience** questionnaires.\n* **Target API level:** Google requires apps to target a recent Android version. Keeping Flutter up to date usually handles this.\n\n## Testing tracks\n\nPlay Console has tracks: **internal testing** for a small trusted group, **closed testing** for invited testers, **open testing** for anyone who opts in, and **production** for everyone. Move through them in order and fix what testers report. Use **Android vitals** in Play Console after release to see crashes and slow starts.\n\n## A worked example\n\nMariama prepares her savings group app in Wa. She creates an upload key and backs it up to two places, writes a privacy policy on GitHub Pages and fills in the Data safety form honestly, including the phone numbers her app stores. She invites 15 group members to a closed test, more than the minimum in case some drop out, and reminds them weekly to keep it installed. After 14 days she applies for production access, fixes two issues testers found, and releases. The Play Store link is now the first line of her CV.",
      "practice_task_md": "**Goal:** get an app ready for release, even before you pay for an account.\n\n1. Choose your best app. Set a proper app name, icon and application ID.\n2. Write a privacy policy page in plain English and publish it free, for example with GitHub Pages.\n3. Draft the store listing: a short description, a full description and four screenshots from a real phone.\n4. Read the Play Console help page on Data safety and draft your answers in a notes file.\n5. Make a list of at least 14 people who would join a 14 day closed test, and plan how you will remind them.\n6. If you have a laptop, create an upload key, configure signing and build a release app bundle.\n\n**Done looks like:** a release checklist with a live privacy policy link, draft listing text, screenshots, Data safety answers and a tester list.",
      "quiz": {
        "questions": [
          {
            "prompt": "What must new personal Play developer accounts complete before releasing to everyone?",
            "options": [
              "A closed test with at least 12 testers opted in for 14 days in a row",
              "A paid advertising campaign",
              "A public open test with 1000 users",
              "An exam about Flutter"
            ],
            "answer_index": 0,
            "explanation": "Personal accounts created after 13 November 2023 must run this closed test before applying for production."
          },
          {
            "prompt": "Why should you keep your upload key backed up and out of Git?",
            "options": [
              "It is needed for hot reload",
              "It makes the app download faster",
              "Git cannot store small binary files, so pushing the key would fail",
              "It proves uploads come from you, so anyone with it could sign as you"
            ],
            "answer_index": 3,
            "explanation": "The key is private proof of authorship, so it must be safe, backed up and never public."
          },
          {
            "prompt": "What file format does Play require for new apps?",
            "options": [
              "A DartPad link",
              "An Android App Bundle",
              "A PDF of the screenshots",
              "A ZIP file of the source code"
            ],
            "answer_index": 1,
            "explanation": "New apps are uploaded as Android App Bundles, built with flutter build appbundle."
          },
          {
            "prompt": "What must the Data safety form match?",
            "options": [
              "The number of screenshots",
              "The app's colour scheme",
              "What data the app and its packages really collect and share",
              "Your CV"
            ],
            "answer_index": 2,
            "explanation": "The form must honestly describe data collection, including data collected by packages you use."
          },
          {
            "prompt": "Which Play Console track is for a small trusted group before wider testing?",
            "options": [
              "Internal testing",
              "Production",
              "Open testing",
              "Android vitals"
            ],
            "answer_index": 0,
            "explanation": "Internal testing is the first, smallest track for a trusted group."
          }
        ],
        "pass_threshold": 80
      }
    },
    "getting-hired": {
      "explanation_md": "You now have the skills that mobile adverts in Ghana and on remote boards ask for. The final step is showing them. Employers hiring junior mobile developers want evidence: an app they can install, code they can read, and a person who can explain their decisions. Certificates help a little; a working app helps a lot.\n\n## What employers look for in a junior\n\nFrom the adverts we read, a strong junior application shows:\n\n* **Working apps**, ideally at least one installable from the Play Store or as a test build.\n* **Clean code on GitHub**, with clear commits and a README.\n* **The core skills**: a framework such as Flutter, REST APIs, local storage, state management, Git and some testing.\n* **Real world thinking**: handling poor networks, small phones and errors.\n* **Communication**: clear written English, explaining trade offs, working with designers and backend developers.\n\nSome remote adverts also ask for good spoken English and comfort working across time zones.\n\n## Where the jobs appear\n\n* **Ghanaian job boards** such as Jobberman, and tech specific boards, list mobile and full stack roles, mostly in Accra and some in Kumasi.\n* **National Service (NSS) postings.** Some tech companies take NSS personnel for Flutter and full stack roles, and some accept self taught candidates with shipped projects.\n* **Company career pages** of fintech, agritech, health tech and software firms.\n* **Remote job boards** that accept applicants from anywhere. Read each advert to check whether people in Ghana are eligible.\n* **Freelance work** for local businesses, churches, schools and NGOs, which also builds your portfolio.\n\nMany adverts, even junior ones, list years of experience. Treat that as a guide, not a wall. A portfolio of real apps can stand in for some experience, especially in smaller companies.\n\n## Cohort programmes\n\nSeveral programmes in Ghana run mobile and software training in cohorts, often in Accra. This roadmap is a free way to prepare, so you arrive already confident with Dart, Flutter and Git and can get far more out of the programme.\n\n## What this section covers\n\n* **A portfolio that proves you can ship.** Choosing and presenting two or three strong apps, and applying well.\n* **Next step: native Android with Kotlin** (optional). Widening the jobs you can apply for.\n\n## A worked example\n\nAbdul-Rahman from Tamale finished this roadmap with three apps: a sales book with offline sync, a clinic reminder app with notifications, and a bus timetable app on the Play Store. Each had a README with screenshots and a short \"what I learned\" section. He applied to an NSS Flutter role in Accra and two remote roles. In his interview he was asked how his sales app handled a dropped connection, and he walked through his sync code on his phone. He also took on a paid job building a simple app for a pharmacy in Tamale while he waited for replies.",
      "practice_task_md": "**Goal:** check yourself against real adverts and plan your portfolio.\n\n1. Find three current mobile developer adverts that accept applicants in Ghana.\n2. For each, list the skills they name (in your own words) and mark each one: \"can show\", \"learning\" or \"not yet\".\n3. Pick the two skills that appear most often in your \"not yet\" column and write how you will close each gap in the next month.\n4. List the apps you have built so far and choose the two or three strongest for your portfolio.\n\n**Done looks like:** a one page skills check against three adverts, a one month plan and your chosen portfolio apps.",
      "quiz": {
        "questions": [
          {
            "prompt": "What does the lesson say helps most when applying for junior mobile roles?",
            "options": [
              "A very long CV",
              "A long list of certificates",
              "A working app employers can install, plus readable code",
              "Applying only to senior roles"
            ],
            "answer_index": 2,
            "explanation": "Employers want evidence, and an installable app with readable code is the strongest kind."
          },
          {
            "prompt": "How should you treat years of experience listed in junior adverts?",
            "options": [
              "Never apply unless you match the years listed in the advert exactly",
              "As a guide, since real apps can stand in for some experience",
              "As a reason to lie on your CV",
              "As a sign the advert is fake"
            ],
            "answer_index": 1,
            "explanation": "The lesson advises treating experience requirements as a guide, especially with a strong portfolio."
          },
          {
            "prompt": "What should you check before applying to a remote job?",
            "options": [
              "Whether the advert mentions SMS",
              "Whether people in Ghana are eligible to apply",
              "Whether it uses dark mode",
              "Whether the company has an office in Tamale"
            ],
            "answer_index": 1,
            "explanation": "Remote adverts vary, so read each one to confirm applicants in Ghana are accepted."
          },
          {
            "prompt": "How does the lesson describe this roadmap in relation to cohort programmes?",
            "options": [
              "As something only for people who failed a cohort",
              "As a replacement that makes cohorts unnecessary",
              "As a free way to prepare so you get more out of the programme",
              "As unrelated to any programme"
            ],
            "answer_index": 2,
            "explanation": "The roadmap helps you arrive prepared for cohort based programmes."
          }
        ],
        "pass_threshold": 75
      }
    },
    "portfolio-and-job-search": {
      "explanation_md": "A hiring manager in Accra or a remote team lead might spend only a few minutes on your application. In that time, they want to install your app, glance at your code and understand what you can do. A focused portfolio makes that easy. Three well finished apps beat ten half built tutorials.\n\n## Choosing portfolio apps\n\nPick apps that solve real problems and show the skills adverts ask for. Good Ghanaian examples:\n\n* **A trader's sales book** with offline storage and syncing. Shows local storage, offline first design and APIs.\n* **An appointment or reminder app** for a clinic, salon or school, with notifications. Shows backends, sign in and push.\n* **A shop catalogue with a mock mobile money checkout** in sandbox mode. Shows state management, forms, error handling and safe payment design.\n\nDo not copy a tutorial app and change the colours. Employers recognise them. Build something for a real person if you can, even for free, and ask for honest feedback.\n\n## Make each project easy to judge\n\nEvery portfolio repo needs a strong **README**:\n\n* one sentence on what the app does and who it is for\n* three or four screenshots or a short screen recording\n* a Play Store link or a downloadable test build, if possible\n* the main technologies: Flutter, state approach, storage, backend\n* how to run it\n* a short **\"Decisions and trade offs\"** section, for example why you chose SQLite, or how the app handles a dropped connection\n* what you would improve next\n\nKeep secrets out of the repo. Use example configuration files instead.\n\n## Your profile and CV\n\n* Pin your best repos on your GitHub profile and write a short profile README.\n* Keep your CV to one or two pages. Put projects near the top, each with a link and one line on the impact or the hard problem you solved.\n* Use the same name and photo across GitHub, your CV and any professional profiles.\n\n## Applying well\n\n* Read each advert carefully and mention the specific skills it asks for that you can show, with links.\n* Write a short, polite message in your own words. Generic messages are easy to spot.\n* Track applications in a simple spreadsheet: company, role, date, link, status.\n* Follow up once, politely, after a week or two if you hear nothing.\n\n## Preparing for interviews\n\nExpect questions about your own projects, so know your code well. Practise explaining one bug you fixed and one trade off you made. Some companies give a small take home task, such as building a screen that loads data from an API. Treat it like a portfolio project: clean code, a README, and handling loading and errors.\n\n## A worked example\n\nHawa from Bolgatanga has three apps. Her sales book README shows screenshots, a test build link and a section explaining her sync rules. Her CV lists the apps first. When a fintech in Accra asks her to build a take home screen listing transactions from an API, she adds a loading state, an error state with retry and two widget tests, even though they were not required. The reviewer mentions those details when inviting her to the next round.",
      "practice_task_md": "**Goal:** turn one app into a portfolio quality project.\n\n1. Choose your strongest app from this roadmap.\n2. Write a README with all the parts listed in the lesson, including a \"Decisions and trade offs\" section.\n3. Add at least three screenshots taken on a real phone.\n4. Check the repo for secrets, unused files and unclear commit messages; clean up what you can.\n5. Pin the repo on your GitHub profile.\n6. Ask a mentor or study partner to spend five minutes on it and tell you the first thing that confused them. Fix it.\n\n**Done looks like:** a public repo a stranger can understand in five minutes, with feedback recorded and addressed.",
      "quiz": {
        "questions": [
          {
            "prompt": "According to the lesson, which portfolio is stronger?",
            "options": [
              "One app copied from a tutorial with new colours",
              "A list of courses with no apps",
              "Ten half built tutorial apps",
              "Three well finished apps that solve real problems"
            ],
            "answer_index": 3,
            "explanation": "A few finished, real apps show far more than many unfinished or copied ones."
          },
          {
            "prompt": "What should a \"Decisions and trade offs\" section in a README explain?",
            "options": [
              "Your favourite programming language",
              "How much the app cost to build",
              "Why you made choices such as using SQLite",
              "The names and exact versions of every package the app uses"
            ],
            "answer_index": 2,
            "explanation": "This section shows employers how you think, by explaining real choices."
          },
          {
            "prompt": "What is a good way to handle a take home task from an employer?",
            "options": [
              "Copy a solution from the internet",
              "Ignore it and wait for an interview",
              "Do only the minimum asked and skip loading and error states to save time",
              "Treat it like a portfolio project, with a README and error handling"
            ],
            "answer_index": 3,
            "explanation": "Careful, complete take home work shows the same qualities as a strong portfolio project."
          },
          {
            "prompt": "Which habit does the lesson recommend when applying for jobs?",
            "options": [
              "Never follow up",
              "Track applications in a simple spreadsheet and follow up once politely",
              "Send the same generic message to every company",
              "Apply without reading the advert"
            ],
            "answer_index": 1,
            "explanation": "Tracking applications and a single polite follow up keep your search organised and professional."
          }
        ],
        "pass_threshold": 75
      }
    },
    "kotlin-and-native-android": {
      "explanation_md": "Some teams in Ghana and abroad build native Android apps, and several adverts we read, from an agritech company and remote employers, asked for Kotlin, sometimes alongside Flutter. Cross platform roles often list Kotlin or Swift as a bonus, because developers who understand the native side can fix platform specific problems. Learning Kotlin after Flutter is much easier than starting from zero, because you already understand the big ideas.\n\n## Kotlin in a few lines\n\nKotlin is Google's preferred language for Android. If you know Dart, much of it will feel familiar:\n\n```kotlin\ndata class Product(val name: String, val price: Double, val qty: Int)\n\nfun needRestock(items: List<Product>): List<String> =\n    items.filter { it.qty < 5 }.map { it.name }\n\nfun main() {\n    val stock = listOf(Product(\"Rice\", 120.0, 8), Product(\"Oil\", 45.0, 2))\n    println(needRestock(stock))\n}\n```\n\nNotice the similarities and differences:\n\n* `val` is like Dart's `final`; `var` can change.\n* Types come after names: `name: String`.\n* A **data class** gives you a class with equality and copying built in.\n* Kotlin also has null safety: `String?` means the value may be null, and `?:` provides a fallback, like Dart's `??`.\n\nYou can try this in Kotlin Playground in any browser, even on a phone.\n\n## Jetpack Compose\n\nModern Android screens are built with **Jetpack Compose**. Like Flutter, it describes the screen as a function of state, and redraws when state changes:\n\n```kotlin\n@Composable\nfun Counter() {\n    var plates by remember { mutableIntStateOf(0) }\n    Button(onClick = { plates++ }) {\n        Text(\"Plates: $plates\")\n    }\n}\n```\n\nCompare this with Flutter's `setState` example: different words, same idea.\n\n## How your Flutter knowledge maps across\n\n* Widgets become **composables**; `Column` and `Row` even keep their names.\n* Provider or Riverpod style shared state becomes a **ViewModel** holding state that screens observe.\n* `http` becomes libraries such as Retrofit or Ktor for networking.\n* SQLite through `sqflite` becomes **Room**, Android's database library.\n* Background sync uses **WorkManager** directly.\n* Coroutines play the role of Dart's async and await.\n\n## The honest part\n\nNative Android development needs **Android Studio**, which is heavier than a simple code editor, so a laptop with plenty of memory matters even more here. Kotlin Playground lets you practise the language on a phone, but not build full apps.\n\n## How to start\n\nGoogle's free course, Android Basics with Compose, is designed for beginners and covers Kotlin, Compose layouts, state, navigation, internet data, Room and WorkManager. Since you have done this roadmap, you can move quickly through the early units.\n\n## A worked example\n\nSumaila worked as a Flutter developer for a year. An agritech company in Accra advertised for someone with Flutter and Kotlin to maintain a native module that reads data from a Bluetooth soil sensor. He spent a month on Android Basics with Compose in the evenings, rebuilt his sales book app in Kotlin, and put both versions on GitHub. In his interview he explained how each part of his Flutter app mapped to its Kotlin version, and got the job.",
      "practice_task_md": "**Goal:** write your first Kotlin and compare it with Dart.\n\n1. Open play.kotlinlang.org in a browser on your phone or computer.\n2. Type the `Product` and `needRestock` example and run it.\n3. Add a nullable `supplier: String?` field and print each product's supplier, or \"Unknown supplier\" using `?:`.\n4. Write a short table in your notes comparing five things in Dart and Kotlin: a variable that cannot change, a nullable type, a fallback for null, a list filter and a class.\n5. If you have a laptop with Android Studio, complete the first unit of Android Basics with Compose.\n\n**Done looks like:** a working Kotlin program and a five row Dart versus Kotlin comparison table you could explain in an interview.",
      "quiz": {
        "questions": [
          {
            "prompt": "Why might a Flutter developer learn Kotlin?",
            "options": [
              "Kotlin only runs on iPhones",
              "Kotlin replaces the need for Git",
              "Some employers ask for it, and it helps with platform specific problems",
              "Flutter apps cannot be published on the Play Store without a Kotlin module"
            ],
            "answer_index": 2,
            "explanation": "Some adverts ask for Kotlin as well as Flutter, and native knowledge helps fix platform issues."
          },
          {
            "prompt": "In Kotlin, what is val most similar to in Dart?",
            "options": [
              "dynamic",
              "var",
              "final",
              "async"
            ],
            "answer_index": 2,
            "explanation": "A val cannot be reassigned, like a final variable in Dart."
          },
          {
            "prompt": "What is Jetpack Compose?",
            "options": [
              "A payment provider",
              "The modern toolkit for building Android screens",
              "A database library for storing Android app data offline",
              "A tool for compressing images"
            ],
            "answer_index": 1,
            "explanation": "Compose builds Android UI declaratively, much like Flutter widgets."
          },
          {
            "prompt": "Which Android library is described as the equivalent of using SQLite through sqflite in Flutter?",
            "options": [
              "Room",
              "Compose",
              "WorkManager",
              "Retrofit"
            ],
            "answer_index": 0,
            "explanation": "Room is Android's database library, built on SQLite."
          }
        ],
        "pass_threshold": 75
      }
    },
  },
};

export default content;
