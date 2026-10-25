import type { TrackContent } from "./types";

/**
 * Original lesson content for the Graphic Designer roadmap (wave 3).
 * Research and sources: src/content/research/graphic-design.md.
 */
const content: TrackContent = {
  roadmap: "graphic-designer",
  nodes: {
    foundations: {
      explanation_md: `Look around any town in Ghana and you will see graphic design everywhere: the funeral poster on a wall in Tamale, the church harvest flyer shared on WhatsApp, the price list taped to a provisions shop window, the logo on a sachet water bag. Someone designed every one of them. Some were designed well and some badly, and the difference matters to the people paying for them.

Graphic design is the work of arranging words, pictures, shapes and colour so that a message is clear and people act on it. A good flyer gets people to the event. A good logo helps a shop look trustworthy. A good social media post makes someone stop scrolling and send a message to order.

## Why start here

Many beginners think design is about knowing one famous app. Employers and clients think differently. When they look at your work they ask simple questions. Is it easy to read? Does it look professional? Does it match our brand? Did you deliver the right file on time? Tools change every few years, but those questions do not.

This first section gives you the base that every later lesson builds on.

* **What graphic designers do.** Where designers work in Ghana, from print shops and agencies to churches, NGOs and freelance clients, and what kind of tasks they are given.
* **Free design tools.** Which free tools you can use on a phone today, which ones need a laptop, and the difference between pixel images and vector shapes.
* **Design principles.** A handful of ideas, such as hierarchy, contrast and alignment, that explain why one flyer is clear and another is a mess.

## You can start on a phone

You do not need an expensive computer to begin. Free design apps run on Android phones, and you can learn the principles by studying the posters and flyers around you. Later lessons, such as logo design and print preparation, are easier on a laptop. When that happens we will say so plainly and give you a phone alternative, and you can also use computers at a school lab, a library or a community centre.

## A small example

Napari is a student in Bolgatanga. Her aunt sells smock fabric and asks her to make a flyer. Napari's first attempt uses five fonts, a busy background photo and every colour she can find. Her aunt says it looks "colourful" but customers keep asking for the price, which is hidden in small text at the bottom.

After learning a few principles, Napari tries again: one bold heading, one clear photo of the fabric, the price large and easy to see, and the phone number at the bottom. It looks simpler, yet more people call. That is the heart of graphic design. It is not decoration. It is clear communication, and it is a skill you can practise every day with the phone in your pocket.`,
      practice_task_md: `**Goal:** Start training your designer's eye using real designs around you.

**Steps:**
1. Take photos of five designs near you: flyers, posters, shop signs, product labels or WhatsApp graphics. Saved images on your phone are fine too.
2. For each one, write two lines in a notes app: what is the main message, and could you find it in three seconds?
3. Pick the clearest design and the most confusing one. Write one sentence on what makes each work or fail.
4. Keep these photos in a folder called "Design eye". You will come back to them in later lessons.

**Done looks like:** A folder of five photos plus short notes, with one clear winner and one clear loser and a reason for each.`,
      quiz: {
        questions: [
          {
            prompt: "According to this lesson, what is graphic design?",
            options: [
              "Learning every feature of one famous design app",
              "Arranging words, pictures, shapes and colour so a message is clear and people act on it",
              "Adding as many colours and fonts as possible to make work look lively",
              "Taking professional photographs for businesses",
            ],
            answer_index: 1,
            explanation: "The lesson defines graphic design as arranging words, pictures, shapes and colour so a message is clear and people act on it.",
          },
          {
            prompt: "Which question does the lesson say clients and employers ask when they look at your work?",
            options: [
              "Which phone model did you design this on?",
              "How many apps do you have installed?",
              "Is it easy to read, and did you deliver the right file on time?",
              "How many fonts did you use?",
            ],
            answer_index: 2,
            explanation: "Clients ask whether work is easy to read, looks professional, matches the brand and arrives as the right file on time.",
          },
          {
            prompt: "What changed in Napari's second flyer that made more customers call?",
            options: [
              "She added more photos and colours",
              "She used five different fonts",
              "She hid the phone number so people would look harder",
              "She used one bold heading, one clear photo and made the price easy to see",
            ],
            answer_index: 3,
            explanation: "Her second flyer was simpler, with a clear heading, one photo and a large price, so the message was easy to find.",
          },
          {
            prompt: "What does the lesson say about learning graphic design without a laptop?",
            options: [
              "You can start on a phone, and some later tasks are easier on a laptop or a shared computer",
              "It is impossible to learn design without an expensive computer",
              "Phones are better than laptops for every design task",
              "You must buy paid software before you begin",
            ],
            answer_index: 0,
            explanation: "The lesson says free apps run on phones, while logo design and print preparation are easier on a laptop, school lab or library computer.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "what-designers-do": {
      explanation_md: `Before you spend months learning, it helps to know what the job really looks like. In Ghana, graphic designers work in several different places, and each one asks for slightly different strengths.

## Where designers work

* **Print shops and branding companies.** Many towns have shops that print flyers, banners, business cards, calendars, souvenirs and branded items such as mugs and T shirts. Designers here create artwork quickly for walk in customers and prepare files the printing machines can use. Speed and print knowledge matter most.
* **Advertising and creative agencies.** Mostly in Accra, agencies design campaigns for bigger brands. Work includes social media posts, billboards, adverts and sometimes simple animation. Agencies expect strong ideas, a good portfolio and the ability to follow a brief.
* **In house teams.** Companies such as real estate firms, car dealers, banks, schools and betting or media companies hire their own designers to make marketing materials. You follow the company's brand guidelines and work closely with the marketing team.
* **NGOs, churches and schools.** These organisations need reports, posters, certificates, programmes, handbooks and social media graphics. Some hire designers, and many hire freelancers for each project.
* **Freelance.** Many designers work for themselves, serving shops, events, churches and small businesses, and sometimes clients abroad through remote work.

## What the work involves

Across these places, the same tasks keep appearing in job adverts: social media graphics, flyers and posters, logos and branding, layouts for brochures and reports, preparing print files, editing photos and following brand guidelines. Adverts also mention soft skills again and again: understanding a client's brief, handling revisions, meeting deadlines and communicating clearly.

Adverts often name design software. Some ask for one tool, some accept several, and many say they care most about your portfolio. A portfolio is a collection of your best work, and for most design jobs it matters more than which app you learned on.

## Learning routes

Several training programmes in Ghana run graphic design courses, many of them in classroom cohorts in Accra and other big cities. This roadmap is free and works on a phone, so you can use it on its own or to prepare before joining a programme.

## A small example

Alhassan in Tamale wants to be a designer. He looks at five adverts and notices that a print shop wants someone fast with flyers and banners, an NGO wants reports and certificates, and an agency wants social media campaigns and a strong portfolio. All five mention brand consistency and deadlines.

He decides to start with what is closest: flyers and social media posts for his church and his uncle's shop. These become his first portfolio pieces. Knowing the different doors into design helped him choose a first step instead of trying to learn everything at once.`,
      practice_task_md: `**Goal:** Map the design work that already exists around you.

**Steps:**
1. Search a Ghanaian job site for "graphic designer" and read three adverts. Note only the tasks and skills they mention, not the whole text.
2. Walk around your area or think back to the last week. List five places that use design: a print shop, a church, a school, a shop, an event.
3. For each place, write what kind of design it needs, such as flyers, banners, logos or social media posts.
4. Circle the one place where you could offer to make a design first.

**Done looks like:** A short note with three advert summaries, five local places that use design and one circled first opportunity.`,
      quiz: {
        questions: [
          {
            prompt: "Which strengths matter most for a designer in a print shop, according to the lesson?",
            options: [
              "Writing computer code",
              "Speed and print knowledge",
              "Running large advertising campaigns",
              "Filming long videos",
            ],
            answer_index: 1,
            explanation: "The lesson says print shop designers work quickly for walk in customers, so speed and print knowledge matter most.",
          },
          {
            prompt: "What does an in house designer usually have to follow?",
            options: [
              "The company's brand guidelines",
              "Whatever style the designer prefers that week",
              "Only the rules of the printing machine",
              "The brand of a competitor",
            ],
            answer_index: 0,
            explanation: "In house designers make marketing materials that follow the company's brand guidelines.",
          },
          {
            prompt: "According to the lesson, what matters more than which app you learned on for most design jobs?",
            options: [
              "Your phone model",
              "The number of fonts you own",
              "Your portfolio of best work",
              "How fast you can type",
            ],
            answer_index: 2,
            explanation: "The lesson says a portfolio of your best work matters more than which app you learned on.",
          },
          {
            prompt: "Which soft skills does the lesson say appear again and again in design adverts?",
            options: [
              "Selling insurance and managing stock",
              "Driving and delivery",
              "Accounting and auditing",
              "Understanding briefs, handling revisions, meeting deadlines and communicating clearly",
            ],
            answer_index: 3,
            explanation: "Adverts repeatedly mention briefs, revisions, deadlines and clear communication.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "design-tools": {
      explanation_md: `Clients do not pay for the app you use; they pay for the result. Still, you need tools, and the good news is that free ones are enough to start and even to earn. This lesson explains the main kinds of tool so you can choose wisely and switch later without fear.

## Pixels and vectors

Every design file is one of two kinds.

* **Raster (pixel) images** are made of tiny coloured squares called pixels. Photos are raster images. If you stretch a small raster image to make it bigger, it goes blurry or blocky. Common raster files are JPG and PNG.
* **Vector graphics** are made of shapes described by points and curves. You can make a vector logo the size of a stamp or the size of a billboard and it stays sharp. Common vector files are SVG and PDF, and many print shops in Ghana also work with files from paid vector programs.

Simple rule: photos are raster, logos and illustrations should be vector.

## Three kinds of free tool

* **Template based design apps.** Apps such as Canva run on Android phones and in a browser. You start from a size or template and add text, shapes and photos. They are quick for social media posts and flyers. Their free plans change over time, so check what is included before promising a client a feature.
* **Photo editors.** Free editors such as Photopea (in a browser) and GIMP (on a laptop) let you crop, retouch, adjust colour and cut people out of backgrounds. Photopea works on a phone but is much easier on a bigger screen.
* **Vector editors.** Inkscape is a free, open source vector editor for Windows, Mac and Linux laptops. It is the right tool for logos and for print files that need sharp edges. It does not run on phones.

Job adverts often name paid programs. You will learn the same ideas, such as layers, alignment, colour modes and exporting, in free tools, and those ideas carry over if an employer gives you a paid one.

## File types to know

* **JPG:** photos and social media images where small file size matters.
* **PNG:** graphics with sharp text or a transparent background, such as a logo on top of a photo.
* **PDF:** documents and print files; most printers prefer it.
* **SVG:** vector logos and icons.

Always keep your editable working file as well as the exported image, so you can make changes later.

## A small example

Sumaila designs a logo for a barbering shop in Wa by placing text and a photo of scissors in a phone app, then exports a small PNG. When the owner asks for a big signboard, the printer says the file is too small and blurry. Sumaila goes to a community centre computer, redraws the logo as vector shapes in Inkscape and exports a PDF. Now it prints sharp at any size. He learned the difference between raster and vector the hard way, and now he chooses the right tool from the start.`,
      practice_task_md: `**Goal:** Set up a free toolkit and see the difference between raster and vector for yourself.

**Steps:**
1. Install one free design app on your phone, or open one in your browser. Create a square design with your name in large text.
2. Export it as a small JPG and as a PNG. Open each, zoom in hard and note what you see on the edges of the letters.
3. If you can reach a laptop at home, school or a library, open Inkscape, type your name, export a PDF and zoom in on it. Notice that it stays sharp.
4. Create a folder called "Design files" with two subfolders: "Working" for editable files and "Exports" for finished images.

**Done looks like:** Two exports of your name, a one line note on what happened when you zoomed in, and a tidy folder structure ready for future projects.`,
      quiz: {
        questions: [
          {
            prompt: "What happens when you stretch a small raster image to make it much bigger?",
            options: [
              "It becomes sharper",
              "It turns into a vector",
              "It goes blurry or blocky",
              "It changes colour mode",
            ],
            answer_index: 2,
            explanation: "Raster images are made of pixels, so stretching a small one makes it blurry or blocky.",
          },
          {
            prompt: "Which kind of graphic should a logo usually be, according to the lesson?",
            options: [
              "Vector, so it stays sharp at any size",
              "A low quality JPG",
              "A screenshot of a phone screen",
              "Raster, because logos are photos",
            ],
            answer_index: 0,
            explanation: "The lesson's rule is that photos are raster and logos and illustrations should be vector.",
          },
          {
            prompt: "Which file type is best for a logo placed on top of a photo with a transparent background?",
            options: ["JPG", "TXT", "DOC", "PNG"],
            answer_index: 3,
            explanation: "PNG supports transparent backgrounds and keeps text and edges sharp.",
          },
          {
            prompt: "Why did Sumaila redraw the barbering shop logo in Inkscape?",
            options: [
              "Inkscape runs only on phones",
              "The printer needed a vector file that would print sharp on a big signboard",
              "The owner wanted more colours",
              "Inkscape makes files smaller for WhatsApp",
            ],
            answer_index: 1,
            explanation: "His small PNG was blurry at signboard size, so he redrew it as vector shapes and exported a PDF.",
          },
          {
            prompt: "What does the lesson advise you to keep alongside every exported image?",
            options: [
              "A printed copy",
              "A screenshot of the app",
              "Your editable working file",
              "A list of every font on your phone",
            ],
            answer_index: 2,
            explanation: "Keeping the editable working file lets you make changes later.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "design-principles": {
      explanation_md: `When a client says "make it look nice", what they really want is a design that people understand quickly. A small set of principles explains how to get there. Employers rarely list these by name in adverts, but every portfolio review and design test checks them.

## Six principles

* **Hierarchy.** Decide what people should see first, second and third, then make the most important thing biggest or boldest. On an event flyer, the event name usually comes first, then date and place, then details.
* **Contrast.** Things that are different should look clearly different: big against small, dark against light, bold against thin. Contrast creates hierarchy and keeps text readable.
* **Alignment.** Every item should line up with something else. Text that lines up along a clear edge looks organised. Items scattered at random look careless.
* **Proximity.** Put related things close together and unrelated things apart. The date, time and venue belong in one group; the phone number and WhatsApp handle in another.
* **Repetition.** Repeat colours, fonts and shapes so a design, or a series of designs, feels like one family. This is the start of branding.
* **Space.** Empty space, often called white space even when it is not white, gives the eye room to rest. Crowded designs feel cheap and are hard to read on a small phone screen.

## The three second test

Show a design to someone for three seconds, then hide it. Ask what it was about. If they cannot tell you the main message, the hierarchy is not strong enough. This simple test works with family, friends or customers and costs nothing.

## A small example

Hawa runs a chop bar in Damongo and wants a menu poster. Her first version lists twelve dishes in the same size, centred, with prices scattered on the right in different colours.

Applying the principles, she makes three changes. She puts the shop name at the top in large bold letters (hierarchy and contrast). She lines up every dish on the left and every price on the right (alignment). She groups dishes into "Rice", "Soups" and "Drinks", with space between the groups (proximity and space). She uses one accent colour for the group headings throughout (repetition).

Nothing new was added; things were only rearranged. Yet customers can now find the price of jollof in a glance. Most design problems you meet as a beginner can be solved this way, before you ever touch a fancy effect.`,
      practice_task_md: `**Goal:** Use the six principles to fix a real design.

**Steps:**
1. Choose the most confusing design from your "Design eye" folder, or any crowded flyer you can find.
2. Write down which principles it breaks, such as no clear hierarchy, poor alignment or no space.
3. Recreate it in a free design app on your phone with the same words, applying the principles. Use no more than two fonts and three colours.
4. Do the three second test with two people on both versions. Note what they remember from each.

**Done looks like:** A before and after pair, a short list of principles you applied and the results of your three second test. This is a good first portfolio piece.`,
      quiz: {
        questions: [
          {
            prompt: "Which principle is about deciding what people should see first, second and third?",
            options: ["Repetition", "Hierarchy", "Proximity", "Alignment"],
            answer_index: 1,
            explanation: "Hierarchy means ordering importance and making the most important thing biggest or boldest.",
          },
          {
            prompt: "On a flyer, the date, time and venue are placed close together in one group. Which principle is this?",
            options: ["Contrast", "Space", "Proximity", "Repetition"],
            answer_index: 2,
            explanation: "Proximity means putting related things close together.",
          },
          {
            prompt: "How does the three second test work?",
            options: [
              "You design a flyer in three seconds",
              "You check that a file downloads in three seconds",
              "You use only three colours",
              "You show a design for three seconds, hide it and ask what it was about",
            ],
            answer_index: 3,
            explanation: "If people cannot say the main message after three seconds, the hierarchy is not strong enough.",
          },
          {
            prompt: "Hawa lined up every dish on the left and every price on the right. Which principle did she apply?",
            options: ["Alignment", "Hierarchy", "Repetition", "Contrast"],
            answer_index: 0,
            explanation: "Lining items up along clear edges is alignment.",
          },
        ],
        pass_threshold: 75,
      },
    },
  },
};

export default content;
