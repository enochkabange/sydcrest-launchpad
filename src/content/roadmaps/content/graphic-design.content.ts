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
    "visual-basics": {
      explanation_md: `Read a few Ghanaian adverts for designers and the same words keep coming back: typography, colour, layout, images. These are the four building blocks of visual design. Every flyer, post, logo and report is made from them, and a weakness in any one of them shows immediately.

## The four building blocks

* **Typography** is how text looks: which fonts you choose, how big they are, and how much space sits between letters and lines. Most of what clients want to say is words, so typography often carries the whole design.
* **Colour** sets the mood, ties a design to a brand and decides whether text is easy or hard to read. It also behaves differently on a phone screen and on paper, which matters when work goes to a printer.
* **Layout** is where things sit on the page and how the eye moves from one item to the next. Good layout uses margins, columns and alignment so even a busy programme feels calm.
* **Images** include photos, illustrations and icons. Designers crop, straighten and adjust photos, make sure they are sharp enough for the job and check that they are allowed to use them.

## How they work together

These building blocks are not separate tricks. A strong heading needs good typography, enough contrast in colour and the right place in the layout. A product photo only works if it is sharp, well cropped and given enough space. As you work through this section, keep applying the principles from the previous one: hierarchy, contrast, alignment, proximity, repetition and space.

## Learn by copying layouts, not designs

A good way to practise is to study a design you admire and ask why it works. What size is the heading compared with the body text? How many colours are there? Where are the margins? Then make your own design using those lessons with your own words and pictures. Studying a layout is learning. Taking someone's finished design and changing the name is copying, and clients and employers can tell.

## A small example

Issahaku designs a poster for a football gala in Nalerigu. He uses a bold sans serif font for the title and a plain font for details (typography). He chooses the two team colours plus white (colour). He places the title at the top, a large photo of a player in the middle and the date and venue together at the bottom, all aligned to the same left edge (layout). He crops the photo so the player fills the frame and checks it is sharp at poster size (images).

None of these choices is advanced, but together they make the poster look professional. In the next four lessons you will learn each building block in more depth, with small tasks you can do on your phone.`,
      practice_task_md: `**Goal:** Break a good design down into its four building blocks.

**Steps:**
1. Choose one design you think looks professional, such as a poster, a product label or a brand's social media post.
2. Write four short notes: what fonts it uses and how many, what colours it uses, how the layout is arranged and how images are used.
3. Sketch the layout on paper as boxes: one box for the heading, one for the image, one for the details.
4. Use your sketch to make your own design on a different topic, such as a poster for a school event, with your own words and pictures.

**Done looks like:** Four notes, a box sketch and a new design that uses the same structure without copying the original's content.`,
      quiz: {
        questions: [
          {
            prompt: "Which four building blocks does this lesson describe?",
            options: [
              "Speed, price, deadlines and printing",
              "Typography, colour, layout and images",
              "Logos, banners, flyers and calendars",
              "Phones, laptops, printers and scanners",
            ],
            answer_index: 1,
            explanation: "The lesson names typography, colour, layout and images as the building blocks of visual design.",
          },
          {
            prompt: "What does layout describe?",
            options: [
              "Where things sit on the page and how the eye moves between them",
              "Which font family you choose",
              "The colour of the paper",
              "Whether you are allowed to use a photo",
            ],
            answer_index: 0,
            explanation: "Layout is where things sit and how the eye moves, using margins, columns and alignment.",
          },
          {
            prompt: "According to the lesson, what is the difference between learning from a design and copying it?",
            options: [
              "There is no difference",
              "Learning means using the same words and photos",
              "Copying is fine if you change the colours",
              "Learning means studying why a layout works and making your own design; copying means changing the name on someone's finished design",
            ],
            answer_index: 3,
            explanation: "Studying a layout and making your own work is learning; taking a finished design and changing the name is copying.",
          },
          {
            prompt: "What did Issahaku check about the player photo for his gala poster?",
            options: [
              "That it was in black and white",
              "That it used the smallest possible file size",
              "That it was cropped well and sharp at poster size",
              "That it came from a competitor's poster",
            ],
            answer_index: 2,
            explanation: "He cropped the photo so the player filled the frame and checked it was sharp at poster size.",
          },
        ],
        pass_threshold: 75,
      },
    },
    typography: {
      explanation_md: `Most designs are mostly words. A church programme, a price list, a funeral poster and a bank's social media post all depend on text being easy to read. That is why good typography is one of the clearest signs of a skilled designer, and poor typography is the first thing an experienced reviewer notices.

## Kinds of font

* **Serif** fonts have small strokes at the ends of letters. They can feel traditional and formal, and work well for longer printed text.
* **Sans serif** fonts have no strokes at the ends. They feel clean and modern and are easy to read on phone screens.
* **Display** fonts are decorative and bold, made for big headings only.
* **Script** fonts look like handwriting. They suit a wedding name or a single word, but long text in script is very hard to read.

## Simple rules that work

* **Two fonts are usually enough.** One for headings and one for body text. A bold display or serif heading with a plain sans serif body is a safe pairing. You can also use one font family in different weights, such as bold and regular.
* **Size creates hierarchy.** Make the heading clearly bigger than the details, often two or three times bigger, not just a little.
* **Give lines room.** Line spacing that is slightly larger than the text size makes paragraphs easier to read.
* **Avoid long text in capitals.** All capitals work for a short heading but slow people down in sentences.
* **Check readability where it will be seen.** A WhatsApp flyer is seen on a small phone, so the smallest text must still be readable there. A banner is read from across the road, so text must be large and simple.
* **Left align body text.** Centred text is fine for a short heading or an invitation, but long centred paragraphs are hard to follow.

## Where to get fonts

Use fonts that come with your design tool or free libraries such as Google Fonts, whose fonts are released under open licences that allow commercial use. Fonts from random download sites are often marked "personal use only", which means you should not use them for paying clients. You will learn more about licences later in this roadmap.

## A small example

Mariama designs a thanksgiving service flyer for a church in Tamale. Her first draft uses four fonts, including a curly script for the whole paragraph about the programme. Older members say they cannot read it.

She changes to one strong serif for the heading "Annual Thanksgiving Service" and one simple sans serif for everything else. She makes the heading much larger, keeps the date and time bold and sets the rest in regular weight with comfortable line spacing. She saves the script font for just two words, "You are invited". Now the flyer looks elegant and every member can read it on their phone.`,
      practice_task_md: `**Goal:** Practise choosing, pairing and sizing fonts.

**Steps:**
1. In a free design app, create a portrait poster for a made up event, such as a community clean up in Wa.
2. Write a heading, a date and venue line, three lines of details and a contact line.
3. Make three versions: one with a serif heading and sans serif body, one with a single font family in two weights, and one with a script heading.
4. View each at actual size on your phone screen. Choose the most readable and write two sentences explaining why.

**Done looks like:** Three versions of the same poster and a short note on which pairing reads best on a phone and why.`,
      quiz: {
        questions: [
          {
            prompt: "Which kind of font does the lesson say is very hard to read in long text?",
            options: ["Sans serif", "Serif", "Script", "A single font family in bold and regular"],
            answer_index: 2,
            explanation: "Script fonts look like handwriting and suit a word or name, but long text in script is very hard to read.",
          },
          {
            prompt: "How many fonts does the lesson say are usually enough for one design?",
            options: ["Two", "Five", "One for every line", "As many as the app offers"],
            answer_index: 0,
            explanation: "One font for headings and one for body text is usually enough.",
          },
          {
            prompt: "Why should you check a WhatsApp flyer on a phone before sending it?",
            options: [
              "Phones change the fonts automatically",
              "WhatsApp only accepts script fonts",
              "To make the file size larger",
              "Because it will be seen on a small screen, so the smallest text must still be readable there",
            ],
            answer_index: 3,
            explanation: "A WhatsApp flyer is seen on a small phone, so its smallest text must be readable at that size.",
          },
          {
            prompt: "What does \"personal use only\" on a downloaded font mean for a designer?",
            options: [
              "You may use it for any client",
              "You should not use it for paying clients",
              "It only works on phones",
              "It can only be used in capitals",
            ],
            answer_index: 1,
            explanation: "Personal use only fonts should not be used for paying clients' work.",
          },
        ],
        pass_threshold: 75,
      },
    },
    colour: {
      explanation_md: `Colour is often the first thing a client talks about: "use our blue", "make it bright", "it should feel calm". Choosing colour well makes a design feel professional and on brand. Choosing badly makes text unreadable or makes a printed job look nothing like what the client approved on screen.

## A few words to know

* **Hue** is the colour itself: red, yellow, green.
* **Value** is how light or dark it is.
* **Saturation** is how strong or dull it is.

Digital tools describe colours with codes. A hex code such as #1A7F3C names one exact green, so you can repeat it perfectly across every design for a brand.

## Build a small palette

Most good designs use a small palette:

* **One main colour** that carries the brand or the mood.
* **One accent colour** for buttons, prices or anything you want to stand out.
* **Neutrals** such as white, black, cream or grey for backgrounds and body text.

A common guide is to let the main or neutral colour cover most of the space, a second colour some of it and the accent only a little. A colour wheel tool helps you find colours that sit well together, either neighbours on the wheel for a calm feel or opposites for a strong contrast.

## Colour carries meaning

Colours suggest feelings, but meanings depend on culture and context. In many Ghanaian communities, red and black are worn for mourning, while white is linked with celebration and thanksgiving. A bright red flyer may feel exciting for a sale but wrong for a naming ceremony. Ask the client, and look at what similar events and businesses in the area use.

## Contrast keeps text readable

Light grey text on a white background, or red text on a green background, is hard to read, especially in bright sunlight on a cheap phone screen. Free contrast checkers compare two colours and tell you if text will be readable. Web accessibility guidelines suggest a contrast ratio of at least 4.5 to 1 for normal text. When in doubt, dark text on a light background is safest.

## Screen colour and print colour

Screens make colour by mixing red, green and blue light, called RGB. Printers make colour by mixing cyan, magenta, yellow and black ink, called CMYK. Some very bright screen colours, such as neon greens and electric blues, cannot be printed exactly and come out duller. That is why you should ask the printer for a printed proof before a large job.

## A small example

Fuseini designs a poster for a shea butter cooperative. He picks a warm brown from the shea nuts as the main colour, cream as the background and a deep green accent for the price and phone number. He checks the green on cream with a contrast checker, and asks the printer for one test print. The colours look natural, match the product and read clearly in the market.`,
      practice_task_md: `**Goal:** Build and test a small colour palette for a real business.

**Steps:**
1. Choose a local business, such as a pharmacy, tailor or chop bar.
2. Use a free colour wheel tool in your browser to build a palette of one main colour, one accent and two neutrals. Write down each hex code.
3. Make a simple price list or poster for the business using only those four colours.
4. Check your text and background pair in a free contrast checker. Fix any pair that fails.
5. View the design outdoors on your phone to see how it looks in sunlight.

**Done looks like:** A palette card with four hex codes, a design using only those colours and a note on what you changed after the contrast check.`,
      quiz: {
        questions: [
          {
            prompt: "What is a hex code such as #1A7F3C used for?",
            options: [
              "Naming one exact colour so it can be repeated perfectly",
              "Measuring the size of a file",
              "Choosing a font",
              "Setting the bleed for a printer",
            ],
            answer_index: 0,
            explanation: "A hex code names one exact colour so you can use it consistently across a brand.",
          },
          {
            prompt: "Which palette structure does the lesson recommend for most designs?",
            options: [
              "As many bright colours as possible",
              "Only black and white, always",
              "One main colour, one accent colour and some neutrals",
              "A different colour for every word",
            ],
            answer_index: 2,
            explanation: "The lesson recommends one main colour, one accent and neutrals for backgrounds and body text.",
          },
          {
            prompt: "Why might bright neon colours look duller when printed?",
            options: [
              "Printers only use black ink",
              "Paper absorbs all colour",
              "Phones hide colours when sending files",
              "Screens mix light in RGB while printers mix ink in CMYK, which cannot match some bright colours",
            ],
            answer_index: 3,
            explanation: "RGB screen colours such as neon greens cannot always be matched by CMYK ink.",
          },
          {
            prompt: "What contrast ratio do web accessibility guidelines suggest at least for normal text?",
            options: ["1 to 1", "4.5 to 1", "2 to 1", "100 to 1"],
            answer_index: 1,
            explanation: "The lesson says web accessibility guidelines suggest at least 4.5 to 1 for normal text.",
          },
          {
            prompt: "According to the lesson, why should you ask a client about colour meaning?",
            options: [
              "Meanings depend on culture and context, for example colours linked with mourning or celebration",
              "All colours mean the same thing everywhere",
              "Clients always want red",
              "Colour has no effect on how people feel",
            ],
            answer_index: 0,
            explanation: "Colour meanings vary; in many Ghanaian communities red and black are linked with mourning and white with celebration.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "layout-and-grids": {
      explanation_md: `Clients often hand you far too much information: a full programme, ten sponsors' logos, three phone numbers and a Bible verse, all for one A5 flyer. Layout is how you fit it in without chaos. Agencies and in house teams also design many items in a series, and a consistent layout is what makes them look like they belong together.

## Margins first

Start every design by setting margins: an empty border around the edge that nothing important crosses. Margins make a design feel calm, and for print they protect text from being cut off when the paper is trimmed. On a phone graphic, margins stop text from touching the edge of the screen.

## Use a grid

A grid is a set of invisible columns and rows that you line things up with. Most design apps can show guides or a grid. A simple flyer might use two columns: the photo in one, the text in the other. A brochure page might use three columns. You do not need to fill every column; the grid just gives you edges to align to.

When text boxes, photos and logos all start and stop on the same lines, the design looks organised even if it holds a lot of information.

## Guide the eye

People scan designs in predictable ways. In English, eyes usually start top left and move across and down. Put the most important item where the eye lands first, often at the top or in a large focal image, then lead to details and finally to the call to action, such as a phone number or "Order on WhatsApp".

## Group and space

Decide which pieces of information belong together and make clear groups. Use equal space inside each group and more space between groups. Keep your spacing consistent: if the gap between two sections is a certain size, use the same gap between all sections.

## When there is too much

If it still feels crowded, ask the client what can move elsewhere. Sponsors' logos can go in one tidy strip at the bottom. Full details can go in a WhatsApp message under the flyer. A flyer's job is to make people interested, not to hold every fact.

## A small example

Amina is asked to design a flyer for a school's speech and prize giving day in Walewale. The headmaster sends a long list: programme, guest of honour, chairman, venue, time, dress code and five sponsors.

Amina sets margins and a two column grid. She puts the event name and date large across the top, the guest of honour's photo in the left column and the key details in the right, all aligned to the grid. The five sponsors go in a neat row at the bottom, all the same height. The full programme goes in a separate image for the school's WhatsApp group. The headmaster is happy because nothing was lost, and parents can read the flyer at a glance.`,
      practice_task_md: `**Goal:** Turn a crowded design into a calm, organised layout.

**Steps:**
1. Write out the content for a busy flyer: a church crusade or a school event with a title, date, time, venue, three speakers, a contact and three sponsor names.
2. In a free design app, turn on guides or a grid. Set margins on all four sides.
3. Choose a two column layout. Place the title across the top, then align every other item to your columns.
4. Group related details and use bigger gaps between groups. Put sponsors in one strip at the bottom.
5. Compare it with a version made without a grid.

**Done looks like:** Two versions of the flyer, one with a grid and margins, and one sentence on the difference you notice.`,
      quiz: {
        questions: [
          {
            prompt: "Why are margins important in a design for print?",
            options: [
              "They make the file smaller",
              "They protect text from being cut off when the paper is trimmed",
              "They change the colour mode",
              "They make the paper thicker",
            ],
            answer_index: 1,
            explanation: "Margins keep important content away from the edge, so it is not cut off during trimming.",
          },
          {
            prompt: "What is a grid in layout design?",
            options: [
              "A background pattern of squares that must be printed",
              "A list of fonts",
              "A set of invisible columns and rows you line things up with",
              "A type of photo filter",
            ],
            answer_index: 2,
            explanation: "A grid gives you invisible columns and rows to align items to.",
          },
          {
            prompt: "Where do readers of English usually start scanning a design?",
            options: ["Bottom right", "In the exact centre always", "Bottom left", "Top left"],
            answer_index: 3,
            explanation: "Eyes usually start top left and move across and down.",
          },
          {
            prompt: "What did Amina do with the full school programme that would not fit?",
            options: [
              "Put it in a separate image for the school's WhatsApp group",
              "Printed it in tiny text across the flyer",
              "Deleted it without telling anyone",
              "Moved it into the margins",
            ],
            answer_index: 0,
            explanation: "She kept the flyer clear and shared the full programme separately.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "images-and-photos": {
      explanation_md: `Many design jobs depend on photos: a product for an online shop, a pastor for a crusade poster, a deceased elder for a funeral poster, a smiling student for a school advert. Adverts for designers in Ghana often ask for photo editing alongside layout, and print shops expect you to fix a client's phone photo so it prints well.

## Basic edits

Free editors such as Photopea in a browser, GIMP on a laptop and the editing tools inside design apps all offer the same basic edits.

* **Crop** to remove distractions and focus on the subject.
* **Straighten** so walls, tables and horizons are level.
* **Brightness and contrast** to rescue dark or dull photos.
* **White balance** to remove yellow or blue tints from indoor lighting.
* **Remove background** to cut a person or product out so it can sit on a clean colour.

Edit gently. Skin smoothed until it looks plastic, or colours pushed too far, makes work look cheap. The goal is a natural, clear photo.

## Resolution: will it be sharp?

A raster photo has a fixed number of pixels. That number decides how large it can be used before it looks blurry.

* **For screens**, an image around 1080 pixels wide is enough for most social media posts.
* **For print**, aim for about 300 pixels per inch at the printed size. An A5 flyer is about 5.8 by 8.3 inches, so a photo filling it should be roughly 1750 by 2480 pixels.

Photos forwarded on WhatsApp are often compressed and lose detail. When a client sends a photo for print, ask them to send it as a document, or by email, so it keeps its original size.

## Can you use this image?

Finding a photo on the internet does not mean you may use it. Most images online are protected by copyright. Safer options are:

* photos you take yourself;
* photos the client owns and gives you;
* images from free stock libraries that state their licence clearly;
* images under Creative Commons licences, following their conditions, such as giving credit.

Also ask permission before using a recognisable person's photo in an advert.

## A small example

Zuweira runs a small business selling shea soap in Tamale and sends Wumpini a dim photo taken at night for her flyer. Wumpini asks her to retake it near a window in daylight, on a plain cloth, and send it as a document. He crops it, straightens it, brightens it slightly and removes the background so the soap sits on a soft cream colour. The new photo is sharp at A5 size and looks like it belongs in a shop.`,
      practice_task_md: `**Goal:** Edit a product photo so it is ready for a flyer.

**Steps:**
1. Take a photo of any product at home, such as a soap, a drink or a bag, near a window in daylight on a plain background.
2. Open it in a free photo editor or your design app's editing tools.
3. Crop, straighten and adjust brightness and contrast. Remove the background if your tool allows it.
4. Check the photo's size in pixels. Note whether it is big enough for a social media post and for an A5 print.
5. Place the edited photo in a simple design with the product name and a price.

**Done looks like:** A before and after pair of the photo, its size in pixels with a note on where it can be used, and a simple product design.`,
      quiz: {
        questions: [
          {
            prompt: "Which edit removes yellow or blue tints caused by indoor lighting?",
            options: ["Crop", "Straighten", "White balance", "Remove background"],
            answer_index: 2,
            explanation: "White balance corrects colour tints from lighting.",
          },
          {
            prompt: "What resolution should you aim for when a photo will be printed?",
            options: [
              "About 300 pixels per inch at the printed size",
              "About 30 pixels per inch",
              "Whatever WhatsApp sends",
              "Resolution does not matter for print",
            ],
            answer_index: 0,
            explanation: "The lesson says to aim for about 300 pixels per inch at the printed size.",
          },
          {
            prompt: "Why should a client send a photo for print as a document or by email instead of a normal WhatsApp image?",
            options: [
              "Documents are always in colour",
              "WhatsApp images are always vector",
              "Email makes photos brighter",
              "Normal WhatsApp images are often compressed and lose detail",
            ],
            answer_index: 3,
            explanation: "Compression reduces detail, so sending as a document or by email keeps the original size.",
          },
          {
            prompt: "Which of these images is safe to use in a client's advert, according to the lesson?",
            options: [
              "Any photo that appears in a web search",
              "A photo the client owns and gives you",
              "A photo from another company's flyer",
              "A screenshot of a celebrity's post",
            ],
            answer_index: 1,
            explanation: "Photos the client owns, your own photos and clearly licensed images are safer options.",
          },
        ],
        pass_threshold: 75,
      },
    },
  },
};

export default content;
