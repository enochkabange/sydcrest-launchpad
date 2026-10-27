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
* **In house teams.** Companies such as real estate firms, car dealers, banks, schools and media companies hire their own designers to make marketing materials. You follow the company's brand guidelines and work closely with the marketing team.
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
* **Vector graphics** are made of shapes described by points and curves. You can make a vector logo the size of a stamp or the size of a billboard and it stays sharp. Common vector files are SVG and PDF. Many print shops in Ghana design in a paid vector program such as CorelDRAW, and most will also accept a PDF with the text converted to outlines.

Simple rule: photos are raster, logos and illustrations should be vector.

## Three kinds of free tool

* **Template based design apps.** Apps such as Canva run on Android phones and in a browser. You start from a size or template and add text, shapes and photos. They are quick for social media posts and flyers. Their free plans change over time, so check what is included before promising a client a feature.
* **Photo editors.** Free editors such as Photopea (in a browser) and GIMP (on a laptop) let you crop, retouch, adjust colour and cut people out of backgrounds. Photopea works on a phone but is much easier on a bigger screen.
* **Vector editors.** Inkscape is a free, open source vector editor for Windows, Mac and Linux laptops. It suits logos and print files that need sharp edges. It does not run on phones.

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
* **Proximity.** Put related things close together and unrelated things apart. The date, time and venue belong in one group; the phone number and WhatsApp number in another.
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

Colours suggest feelings, but meanings depend on culture and context. In some Ghanaian communities, especially Akan communities in the south, red and black are worn for mourning, while white is linked with celebration and can even mark the funeral of someone who lived a long life. Customs differ between regions, ethnic groups and religions, including across the north, so never assume. A bright red flyer may feel exciting for a sale but wrong for a naming ceremony. Ask the client, and look at what similar events and businesses in the area use.

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
            explanation: "Colour meanings vary between communities, regions and religions, so ask the client rather than assume.",
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
    branding: {
      explanation_md: `"I need a logo" is one of the most common requests a designer in Ghana hears. It comes from a new pharmacy in Bolgatanga, a youth fellowship, a rice farmers' association, a fashion designer starting on Instagram. Branding work is valuable because businesses keep using it for years, and adverts for designers regularly mention logos, brand materials and brand guidelines.

## A brand is more than a logo

A brand is the impression people have of a business: what they remember, what they expect and whether they trust it. Design supports that impression through a visual identity, which usually includes:

* **A logo** that people can recognise quickly.
* **Colours** used the same way every time.
* **Fonts** for headings and body text.
* **A photo and graphic style**, such as bright and playful or calm and formal.
* **A tone of voice**, meaning how the business sounds in its words.

When these are used consistently across a signboard, a WhatsApp Status, a receipt and a delivery bag, customers recognise the business instantly. When every flyer looks different, the business feels unreliable, even if its products are good.

## What this section covers

* **Logo design.** How to go from questions and sketches to a simple vector logo that works at any size, in colour and in black and white. This is where a laptop helps most, and we will show you a phone route too.
* **Brand identity and guidelines.** How to collect the logo, colours, fonts and style into a short guide, so that you, the client or any future designer can keep the brand consistent.

## Branding is a conversation

A logo designed without understanding the business is decoration. Good branding starts with questions. Who are the customers? What should they feel? Who are the competitors, and how should this business look different? What will the logo appear on: a signboard, a stamp, a sachet, an app icon? The answers shape every design decision, and they also help you explain your choices to the client, which builds trust.

## A small example

Yakubu helps his cousin, who is opening a provisions shop in Savelugu called "Alheri Mart". His cousin first asks for "something with many colours and a shopping trolley". Yakubu asks questions instead. The customers are families nearby. The shop wants to feel friendly, clean and affordable. The name will appear on a signboard, receipts, plastic bags and a WhatsApp profile picture.

Yakubu designs a simple wordmark in a rounded bold font with one warm orange and dark green. He then uses those colours and that font on the price list, the WhatsApp Status template and the bags. Within weeks, neighbours recognise "the orange shop" before they read the name. That is branding working, and it all started with questions.`,
      practice_task_md: `**Goal:** Study how a real brand stays consistent.

**Steps:**
1. Choose a well known Ghanaian brand you see often, such as a bank, telecom company, drinks maker or supermarket.
2. Find three places its brand appears, such as a signboard, a social media post and packaging. Take photos or screenshots.
3. For each, note the logo version, the colours and the fonts used.
4. Write down what stays the same in all three and anything that changes.
5. Now choose a small local business and write the five questions from this lesson you would ask before designing its logo.

**Done looks like:** Three photos with notes on consistency, plus a list of five questions ready for a real client.`,
      quiz: {
        questions: [
          {
            prompt: "According to the lesson, what is a brand?",
            options: [
              "Only the logo of a business",
              "The impression people have of a business: what they remember, expect and trust",
              "The most expensive product a business sells",
              "The signboard outside a shop",
            ],
            answer_index: 1,
            explanation: "The lesson defines a brand as the impression people have of a business, supported by its visual identity.",
          },
          {
            prompt: "Which of these is part of a visual identity, as listed in the lesson?",
            options: [
              "The owner's home address",
              "The shop's opening hours",
              "Colours used the same way every time",
              "The number of staff",
            ],
            answer_index: 2,
            explanation: "A visual identity includes a logo, colours, fonts, photo style and tone of voice.",
          },
          {
            prompt: "Why does a business feel unreliable when every flyer looks different?",
            options: [
              "Because customers cannot recognise it consistently",
              "Because flyers must always be black and white",
              "Because printing becomes free",
              "Because logos are not allowed on flyers",
            ],
            answer_index: 0,
            explanation: "Consistency helps customers recognise a business; inconsistency makes it feel unreliable.",
          },
          {
            prompt: "What did Yakubu do before designing the Alheri Mart logo?",
            options: [
              "He copied a supermarket logo from the internet",
              "He used every colour his cousin suggested",
              "He designed a shopping trolley straight away",
              "He asked about customers, feelings and where the logo would appear",
            ],
            answer_index: 3,
            explanation: "He asked questions first, and the answers shaped a simple, consistent identity.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "logo-design": {
      explanation_md: `A logo is often a designer's most visible work. It may sit on a signboard for ten years, on every receipt and on every social media post. Clients care about logos, and adverts for print shops, agencies and in house teams regularly list logo design among the core tasks.

## Kinds of logo

* **Wordmark:** the name in a carefully chosen font, often adjusted by hand.
* **Lettermark:** initials, useful for long names.
* **Symbol:** a simple picture or shape with no words.
* **Combination:** a symbol with the name beside or below it. This is the most common choice for small businesses.
* **Emblem:** the name inside a shape, like a badge or seal, common for schools and associations.

## A simple process

1. **Ask questions.** Use the branding questions: customers, feelings, competitors and where the logo will appear.
2. **Research.** Look at competitors so your design looks different, not similar.
3. **Sketch on paper.** Draw twenty quick, rough ideas in pencil. Quantity first; most will be bad, and that is normal.
4. **Choose two or three.** Pick the clearest ideas and refine them.
5. **Build them as vectors.** Recreate the chosen ideas with shapes and type in a vector editor, so they stay sharp at any size.
6. **Test.** Shrink the logo to the size of a stamp or a profile picture. Print it in black only. Put it on a dark background. A good logo survives all three.
7. **Deliver properly.** Give the client a full colour version, a one colour version and a white version, in vector (SVG or PDF) and in PNG with a transparent background.

## Keep it simple

The best small business logos are simple. Thin lines and tiny details disappear on a stamp or a small embroidered shirt. Avoid copying popular symbols, and avoid trendy effects such as heavy shadows and glows that look dated quickly and print badly.

## Phone or laptop?

Building a clean vector logo is much easier on a laptop with a free vector editor such as Inkscape, because you need precise control of points and curves. If you only have a phone, you can still do steps 1 to 4 fully: questions, research, paper sketches and refining. Then build a simple version from basic shapes and text in a phone design app, and finish the vector version on a laptop at a school lab, library or community centre. Be honest with clients: a logo made only in a phone app may not print sharply on a large signboard.

## A small example

Hawa designs a logo for a women's rice processing group in Nyankpala. After asking questions, she sketches twenty ideas, including rice grains, a pot and joined hands. She chooses a single rice grain shaped like a leaf beside the group's name. At a library computer she builds it in Inkscape, tests it at stamp size and in black only, and delivers six files. The group uses it on sacks, a banner and their WhatsApp profile, and it stays clear everywhere.`,
      practice_task_md: `**Goal:** Design a simple logo through the full process.

**Steps:**
1. Choose a real or made up local business, such as a tailor in Wa or a borehole drilling service.
2. Write answers to four questions: customers, feeling, competitors, where the logo will appear.
3. Sketch at least twenty rough ideas on paper in ten minutes. Take a photo of the page.
4. Choose your best two and build them in a design app on your phone using simple shapes and text, or in Inkscape on a laptop if you can reach one.
5. Test each at a very small size, in black only and on a dark background. Pick the winner.

**Done looks like:** A photo of your sketches, two digital versions, the three tests and a final logo with one sentence explaining your choice. This makes a strong portfolio piece.`,
      quiz: {
        questions: [
          {
            prompt: "Which kind of logo is a symbol with the business name beside or below it?",
            options: ["Wordmark", "Lettermark", "Combination", "Emblem"],
            answer_index: 2,
            explanation: "A combination logo uses a symbol and the name together.",
          },
          {
            prompt: "Why does the lesson suggest sketching twenty rough ideas on paper?",
            options: [
              "Quantity first helps you find the clear ideas, even though most will be bad",
              "Clients want to see all twenty",
              "Paper sketches are the final logo",
              "Printers need sketches before printing",
            ],
            answer_index: 0,
            explanation: "Many quick sketches help you explore, then you choose the clearest few.",
          },
          {
            prompt: "Which three tests does the lesson say a good logo should survive?",
            options: [
              "Being posted, liked and shared",
              "Being printed on gold, silver and bronze",
              "Being animated, filmed and edited",
              "Shrunk very small, printed in black only and placed on a dark background",
            ],
            answer_index: 3,
            explanation: "The lesson tests small size, black only and a dark background.",
          },
          {
            prompt: "What should you deliver to the client when the logo is finished?",
            options: [
              "One small JPG sent on WhatsApp",
              "Full colour, one colour and white versions, in vector and in transparent PNG",
              "A screenshot of your phone screen",
              "Only your paper sketches",
            ],
            answer_index: 1,
            explanation: "The lesson lists colour, one colour and white versions as SVG or PDF and transparent PNG.",
          },
          {
            prompt: "What does the lesson advise if you only have a phone?",
            options: [
              "Do not design logos at all",
              "Tell clients phone logos always print perfectly on big signboards",
              "Do the questions, research and sketches on the phone or paper, then finish the vector on a shared laptop and be honest with clients",
              "Copy a logo from the internet",
            ],
            answer_index: 2,
            explanation: "Steps 1 to 4 work without a laptop; the precise vector build is best done on a laptop at a lab, library or community centre.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "brand-identity": {
      explanation_md: `When a company hires a designer, one of the first things it hands over is its brand guidelines, and adverts often say the designer must keep work consistent with them. Learning to write a simple brand guide, and to follow someone else's, shows employers you can work professionally inside a team.

## What a brand guide contains

A brand guide, also called brand guidelines, is a short document that explains how to use a brand's visual identity. For a small business, one to four pages is enough.

* **Logo versions:** the main logo, a one colour version and a white version, and when to use each.
* **Logo rules:** clear space, which is the empty area around the logo that nothing should enter, and a minimum size below which the logo should not be used.
* **Logo don'ts:** examples of what not to do, such as stretching it, changing its colours, adding shadows or placing it on a busy photo.
* **Colours:** each brand colour with its codes. Include a hex code for screens and, if the client prints often, the CMYK values the printer should use.
* **Fonts:** the heading font and the body font, with where to get them.
* **Image style:** what photos should feel like, such as bright, natural daylight with real customers.
* **Examples:** one or two finished designs, such as a social media post and a flyer, showing the rules in use.

## Why it helps everyone

For the client, a guide means any printer or future designer can produce consistent work. For you, it saves time: you no longer guess colours or hunt for the right logo file. It also makes you look professional and can be offered as an extra paid item when you deliver a logo.

## Following someone else's guide

When you join an agency or in house team, you will often work on an existing brand. Read the guide fully before you start. Use the exact colour codes, the approved fonts and the correct logo files. If something you need is missing, ask rather than invent. Reviewers notice quickly when a designer drifts from the brand.

## Templates

Brands that post often benefit from templates: ready made layouts for a price post, an announcement and a quote, using the brand colours and fonts. You or the client change only the words and photo. Templates keep the brand consistent even on busy days.

## A small example

Issahaku delivered a logo to a computer training centre in Tamale. He adds a two page brand guide: page one shows the logo versions, clear space, minimum size and three logo don'ts; page two shows the blue and yellow with hex and CMYK codes, the two fonts, and an example flyer and Status post. Three months later the centre asks a printer in Accra for banners. The printer follows the guide, and the banners match everything else perfectly. The centre comes back to Issahaku for more work because his files made life easy.`,
      practice_task_md: `**Goal:** Create a one page brand guide.

**Steps:**
1. Use the logo you designed in the logo lesson, or design a simple wordmark for a made up business.
2. In a free design app, create one A4 page.
3. Add: logo versions, a clear space note, a minimum size, three logo don'ts, your colour palette with hex codes, two fonts, and one sentence about image style.
4. Add one small example design, such as a social media post, that follows the rules.
5. Export it as a PDF and check that it is readable on your phone.

**Done looks like:** A one page PDF brand guide that someone else could follow to make a matching design.`,
      quiz: {
        questions: [
          {
            prompt: "What is clear space in a brand guide?",
            options: [
              "The empty area around a logo that nothing else should enter",
              "A blank page at the end of the guide",
              "The white background of every design",
              "Space left for the printer's name",
            ],
            answer_index: 0,
            explanation: "Clear space is the protected empty area around the logo.",
          },
          {
            prompt: "Which colour information should a guide include if the client prints often?",
            options: [
              "Only the colour names, such as \"blue\"",
              "Nothing; printers choose colours",
              "Hex codes for screens and CMYK values for the printer",
              "A photo of the colour on a phone",
            ],
            answer_index: 2,
            explanation: "The lesson recommends hex codes for screens and CMYK values for print.",
          },
          {
            prompt: "What should you do if a company's brand guide is missing something you need?",
            options: [
              "Invent your own rule",
              "Use any colour you like",
              "Ignore the guide completely",
              "Ask rather than invent",
            ],
            answer_index: 3,
            explanation: "When working on an existing brand, ask if something is missing.",
          },
          {
            prompt: "Why did the computer training centre's Accra banners match everything else?",
            options: [
              "The printer guessed the colours well",
              "The printer followed Issahaku's brand guide",
              "The centre used a different logo",
              "The banners were printed in black only",
            ],
            answer_index: 1,
            explanation: "The guide gave the printer exact logo files, colours and fonts.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "client-designs": {
      explanation_md: `Ask designers in any Ghanaian town what they spend their days making, and the answers are similar: social media posts and Status graphics, event flyers, church and funeral programmes, posters, banners, business cards and stickers. These everyday jobs are where most designers earn their first money, and they appear again and again in job adverts from print shops, schools, NGOs and companies.

## Two destinations: screen and paper

Every design you make will end up either on a screen or on paper, and sometimes both.

* **Screen designs** are seen on phones: WhatsApp, Facebook, Instagram, TikTok. They need the right size and shape for the platform, small file sizes for people on prepaid data, and text large enough to read on a small screen.
* **Print designs** go to a printing machine. They need the right physical size, extra space at the edges called bleed, sharp images and colours that print well. Mistakes cost the client money because paper and ink are wasted.

Many jobs need both. A church harvest might want a WhatsApp flyer, a printed A4 poster and a large banner, all matching. Knowing how to adapt one design for different sizes is a skill employers value.

## What this section covers

* **Social media graphics.** Sizes for posts and Status, one clear message per graphic, small files and templates for businesses that post often.
* **Flyers, posters and banners.** Designing for quick reading, from a phone flyer to a banner read across the road, plus programmes and multi page documents.
* **Print basics for Ghanaian printers.** How to prepare files that a local print shop can print without surprises, and what to ask the printer.
* **Simple motion graphics.** An optional lesson on adding movement for Status videos and social posts, which agency and multimedia adverts often request.

## Speed and quality together

Local clients often need designs quickly: a funeral poster by tomorrow, a flyer for Sunday. Templates, a tidy file system and a checklist for spelling, dates and phone numbers let you be fast without making careless mistakes. One wrong phone number on five hundred printed flyers is a costly lesson.

## A small example

Mahama runs a small design table beside a print shop in Wa. On one Friday he designs a funeral poster, a WhatsApp flyer for a youth programme, a banner for a school's anniversary and business cards for a mechanic. For the WhatsApp flyer he exports a small portrait JPG. For the banner he asks the printer for the size and bleed and exports a PDF. Before printing anything he reads every name, date and number aloud with the client. By evening every job is out with no reprints, and two of those clients send friends to him the next week.`,
      practice_task_md: `**Goal:** Adapt one design for screen and for paper.

**Steps:**
1. Choose a made up event, such as a community health walk in Yendi.
2. Design a portrait flyer for WhatsApp in a free design app, keeping text large and the file small.
3. Resize or rebuild the same design as an A4 poster for print, keeping the same colours and fonts.
4. Write a short checklist you will use before any print job: spelling, names, dates, times, phone numbers, size, bleed.
5. Check both designs against your checklist.

**Done looks like:** A matching WhatsApp flyer and A4 poster, plus your own pre print checklist.`,
      quiz: {
        questions: [
          {
            prompt: "Why do screen designs for WhatsApp need small file sizes?",
            options: [
              "Because printers cannot read large files",
              "Because many people use prepaid data",
              "Because WhatsApp only shows black and white",
              "Because small files have better colours",
            ],
            answer_index: 1,
            explanation: "Small files load quickly and cost less data for people on prepaid bundles.",
          },
          {
            prompt: "What is the extra space at the edges of a print design called?",
            options: ["Bleed", "Padding", "Kerning", "Hierarchy"],
            answer_index: 0,
            explanation: "Print designs need extra space at the edges called bleed.",
          },
          {
            prompt: "According to the lesson, how can you be fast without making careless mistakes?",
            options: [
              "Skip checking because clients will notice errors",
              "Use as many fonts as possible",
              "Use templates, a tidy file system and a checklist for spelling, dates and phone numbers",
              "Print first and check afterwards",
            ],
            answer_index: 2,
            explanation: "Templates, tidy files and a checklist make speed possible without careless errors.",
          },
          {
            prompt: "What did Mahama do before printing any job?",
            options: [
              "Sent it to the client's competitor",
              "Changed all the colours",
              "Made the text smaller",
              "Read every name, date and number aloud with the client",
            ],
            answer_index: 3,
            explanation: "Checking details with the client prevented costly reprints.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "social-media-graphics": {
      explanation_md: `Almost every business in Ghana now sells or announces something on WhatsApp, Facebook, Instagram or TikTok, and they need graphics every week. Adverts from companies, NGOs and agencies regularly list social media graphics as a core task, and it is also the easiest design service to offer a local shop as a freelancer.

## Get the size right

Each platform shows images in certain shapes. Common sizes in pixels are:

* **Square post:** 1080 by 1080.
* **Portrait post:** 1080 by 1350, which takes up more of the screen in a feed.
* **Status and Stories:** 1080 by 1920, a tall shape that fills a phone screen.

Platforms change their layouts from time to time, so check the current guidance when a client needs something specific. On Status and Stories, keep important text away from the very top and bottom, where names, buttons and reply boxes cover the image.

## One message per graphic

A social graphic is seen for about as long as a thumb takes to scroll past. Give each graphic one job: announce the sale, show the new product, share the event date. Use a short headline, a strong image and a clear next step, such as "Order on WhatsApp" with the number. Put longer details in the caption, not in the graphic.

## Keep files light

Many of your client's customers are on prepaid data and older phones. Export social graphics as JPG for photos or PNG for designs with sharp text, at the size the platform needs, not bigger. A huge file wastes data and may be compressed anyway.

## Carousels and series

A carousel is a set of slides people swipe through, useful for a menu, a list of tips or several products. Keep the same layout, colours and fonts on every slide so it feels like one piece, and make the first slide interesting enough to swipe.

## Templates save time

A business that posts every day needs consistency more than creativity. Build templates for its common posts, such as a product with price, an announcement, a customer review and a holiday greeting, in its brand colours and fonts. Each new post then takes minutes, and the feed looks professional.

## Real content only

Do not invent customer reviews, fake "sold out" claims or prices the client did not approve. Use real photos of the real products. Honest content protects the client's reputation and yours.

## A small example

Amina manages graphics for a fabric shop in Tamale. She sets up four templates in the shop's colours: "New arrival", "Price list", "Customer photo" with permission, and "Closed for holiday". Each morning she drops in a fresh daylight photo of the new fabric, types the price in cedis and exports a small Status image and a portrait post. The shop owner says customers now recognise the shop's posts before reading the name.`,
      practice_task_md: `**Goal:** Build a small social media template set for a local business.

**Steps:**
1. Choose a business near you, such as a phone accessories shop or a chop bar.
2. In a free design app, create three templates in the same colours and fonts: a 1080 by 1350 product post, a 1080 by 1920 Status announcement and a 1080 by 1080 greeting.
3. Fill each template with real content: a photo you took, a real price you confirmed and a clear next step.
4. Export each and check the file size. Aim to keep each file small enough to send quickly on WhatsApp.
5. View the Status design on your phone and check nothing important is hidden at the top or bottom.

**Done looks like:** Three matching templates, filled with real content, with file sizes noted. Offer them to the business owner for feedback.`,
      quiz: {
        questions: [
          {
            prompt: "Which size in pixels does the lesson give for Status and Stories?",
            options: ["1080 by 1080", "500 by 500", "1080 by 1920", "1920 by 1080"],
            answer_index: 2,
            explanation: "Status and Stories use a tall 1080 by 1920 shape that fills a phone screen.",
          },
          {
            prompt: "Why keep important text away from the very top and bottom of a Status design?",
            options: [
              "Names, buttons and reply boxes can cover those areas",
              "Text there prints badly",
              "The colours change at the edges",
              "WhatsApp deletes text at the edges",
            ],
            answer_index: 0,
            explanation: "Platform interface elements cover the top and bottom of Status and Stories.",
          },
          {
            prompt: "According to the lesson, how many messages should one social graphic carry?",
            options: [
              "As many as possible to save money",
              "Every detail of the business",
              "At least five",
              "One clear message, with longer details in the caption",
            ],
            answer_index: 3,
            explanation: "Each graphic should have one job, with details in the caption.",
          },
          {
            prompt: "Why are templates useful for a business that posts every day?",
            options: [
              "They make every post look completely different",
              "They keep posts consistent and make each new post quick",
              "They remove the need for photos",
              "They make files larger",
            ],
            answer_index: 1,
            explanation: "Templates in brand colours and fonts make posts fast and consistent.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "flyers-and-posters": {
      explanation_md: `Flyers and posters are the bread and butter of design work in Ghana. Churches announce crusades and harvests, families announce funerals and weddings, schools announce speech days, politicians and associations announce meetings, and shops announce sales. Print shop and in house adverts regularly name flyers, posters, banners and brochures among the main tasks.

## Know where it will be seen

* **WhatsApp flyer:** seen on a phone, often for a second or two. Portrait shape, large text, small file.
* **Handbill or A5 flyer:** held in the hand, read up close. Can carry a little more detail.
* **Poster:** pasted on a wall or noticeboard and seen while walking past. The main message must be readable from a few steps away.
* **Banner:** hung on a building or across a road and read from far away, often from a moving vehicle. Only a few words, very large, with strong contrast.

The further away people are, the fewer words you can use and the bigger they must be. A banner that copies every line from the flyer will be unreadable.

## A structure that works

Most event flyers follow a reliable order:

1. **The hook:** the event name or the offer, biggest and boldest.
2. **The key facts:** date, time and venue, grouped together.
3. **The supporting detail:** speakers, guest of honour, what to bring.
4. **The action:** a phone number, WhatsApp contact or "All are welcome".

Use the principles you have learned: strong hierarchy, alignment to a grid, related details grouped, and space around the most important parts.

## Programmes and booklets

Funeral, wedding and church programmes are often folded booklets. A sheet of A4 folded in half makes four A5 pages, so folded booklets work in multiples of four pages. Plan the page order with the printer before you design. For long documents such as reports and handbooks on a laptop, a free layout program such as Scribus is built for many pages, master pages and consistent margins, which single page design apps handle less easily.

## Respect and accuracy

Funeral posters and programmes carry deep meaning for families. Spell every name exactly as the family writes it, check dates of birth and death carefully, and use photos and colours the family approves. A respectful, accurate poster builds your name in the community.

## A small example

Abdulai designs for a youth association's health screening day in Salaga. For WhatsApp, he makes a portrait flyer with "Free Health Screening" in large letters, the date, time and venue grouped together, and the contact at the bottom. For the A3 poster he keeps the same design with slightly more detail. For the roadside banner he uses only "Free Health Screening", the date and the venue, very large. People driving past read the banner in a second, and the WhatsApp flyer is shared widely.`,
      practice_task_md: `**Goal:** Design one event in three formats.

**Steps:**
1. Choose a made up event, such as a church harvest in Bolgatanga or a school sports day.
2. Write the content: hook, key facts, supporting details and action.
3. Design a portrait WhatsApp flyer using the four part structure.
4. Adapt it into an A4 poster with the same colours and fonts.
5. Design a banner version using no more than ten words. View it on your phone at a tiny size to imagine reading it from far away.

**Done looks like:** Three matching designs, with the banner using far fewer words than the flyer.`,
      quiz: {
        questions: [
          {
            prompt: "What does the lesson say about banners read from far away?",
            options: [
              "They should copy every line from the flyer",
              "They need small, detailed text",
              "They should use only a few words, very large, with strong contrast",
              "They work best in script fonts",
            ],
            answer_index: 2,
            explanation: "The further away people are, the fewer and bigger the words must be.",
          },
          {
            prompt: "In the four part flyer structure, what comes first?",
            options: [
              "The phone number",
              "The hook, such as the event name or offer",
              "The list of sponsors",
              "The supporting detail",
            ],
            answer_index: 1,
            explanation: "The hook comes first and is the biggest and boldest item.",
          },
          {
            prompt: "Why do folded booklets usually work in multiples of four pages?",
            options: [
              "Because one A4 sheet folded in half makes four A5 pages",
              "Because printers only print four pages a day",
              "Because programmes must have four photos",
              "Because funeral programmes are always four pages long",
            ],
            answer_index: 0,
            explanation: "Folding an A4 sheet in half gives four A5 pages.",
          },
          {
            prompt: "What does the lesson advise for funeral posters and programmes?",
            options: [
              "Use bright colours without asking",
              "Guess the spelling of names to save time",
              "Use any photo found online",
              "Spell names exactly as the family writes them and check dates carefully",
            ],
            answer_index: 3,
            explanation: "Accuracy and respect matter greatly for funeral materials.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "print-production": {
      explanation_md: `A design that looks perfect on your phone can still fail at the print shop: text cut off at the edge, a blurry photo, colours that look muddy, a white line along one side. Print shops and branding companies in Ghana often say in their adverts that they want designers who understand print and can prepare files for production. This lesson teaches the basics so your files print right the first time.

## Talk to the printer first

Before you design anything for print, ask the printer:

* What size is the finished item, and in what units?
* How much bleed do you need?
* What file type do you prefer, usually PDF?
* Do you want colours in CMYK?
* How should fonts be handled? Many shops ask you to embed fonts in the PDF or convert text to outlines, sometimes called curves, so their computer does not swap your font.

Printers differ, and their answers matter more than any general rule.

## Three areas on every print design

* **Trim line:** where the paper will be cut to the finished size.
* **Bleed:** extra background that extends past the trim line, commonly about 3 mm on each side. Paper shifts slightly when cut, so bleed prevents thin white edges.
* **Safe area:** an inner margin, often a few millimetres inside the trim line, where all important text and logos must stay so nothing is cut off.

So an A5 flyer, finished at 148 by 210 mm, would be designed at 154 by 216 mm with 3 mm bleed on every side.

## Sharp images and the right colours

Use photos with about 300 pixels per inch at the printed size, and use vector logos wherever possible. Remember that screens use RGB light while printers use CMYK ink. Some bright screen colours print duller, so ask the printer to convert and show you a proof, and warn the client that colours on paper will not match their phone screen exactly.

## Paper and finishes

Paper is described by weight in grams per square metre, or gsm. Thin paper suits cheap handbills; thicker card suits business cards and certificates. Paper can be glossy or matt. You do not need to choose alone: ask the printer what they stock and show the client samples.

## Proofs and sign off

A proof is a final check copy before the full run. Read every word, name, date, time and phone number aloud with the client. Ask the client to approve the proof in writing, even by WhatsApp message. For large or costly jobs, ask for one printed sample before printing hundreds.

## Laptop or phone?

Setting exact bleed and exporting a print PDF with crop marks is easiest on a laptop with a free tool such as Inkscape or Scribus. Some phone design apps can export print PDFs too, but features change, so check before you promise. If in doubt, design on your phone, then finish and check the print file on a shared computer.

## A small example

Fuseini designs a calendar for a rural bank branch. He asks the printer for size, bleed and file type, adds 3 mm bleed, keeps text inside the safe area, uses a vector logo and exports a PDF with fonts converted to outlines. He sends the branch manager a proof and gets approval by WhatsApp. The printer prints a sample first, the colours look right, and five hundred calendars come out perfect.`,
      practice_task_md: `**Goal:** Prepare a print ready A5 flyer file.

**Steps:**
1. Set up a design at 154 by 216 mm (A5 plus 3 mm bleed on each side) in a design tool, on a laptop if possible.
2. Extend the background colour or photo to the very edge of the bleed.
3. Keep all text and logos at least 5 mm inside the trim line.
4. Use one photo that is about 300 pixels per inch at its printed size.
5. Export as a PDF. If your tool offers it, add crop marks.
6. Write down the five questions you would ask a printer, then, if you can, ask a print shop near you and record their answers.

**Done looks like:** A PDF flyer with bleed and a safe area, plus a note of a real printer's answers to your five questions.`,
      quiz: {
        questions: [
          {
            prompt: "What is bleed in a print design?",
            options: [
              "Extra background past the trim line so no white edges appear when paper is cut",
              "The space between lines of text",
              "A colour that runs when wet",
              "The empty area around a logo",
            ],
            answer_index: 0,
            explanation: "Bleed extends the background past the trim line, commonly about 3 mm.",
          },
          {
            prompt: "Where must important text and logos stay?",
            options: [
              "In the bleed area",
              "Exactly on the trim line",
              "Inside the safe area, a few millimetres inside the trim line",
              "Outside the page",
            ],
            answer_index: 2,
            explanation: "The safe area keeps important content from being cut off.",
          },
          {
            prompt: "With 3 mm bleed on each side, what size should an A5 flyer (148 by 210 mm) be designed at?",
            options: ["148 by 210 mm", "151 by 213 mm", "160 by 220 mm", "154 by 216 mm"],
            answer_index: 3,
            explanation: "Adding 3 mm on every side adds 6 mm to each dimension: 154 by 216 mm.",
          },
          {
            prompt: "Why do many print shops ask you to embed fonts or convert text to outlines?",
            options: [
              "To make the file look brighter",
              "So their computer does not replace your font with a different one",
              "To change the colours to RGB",
              "To make the paper thicker",
            ],
            answer_index: 1,
            explanation: "Embedding or outlining fonts stops the printer's computer swapping them.",
          },
          {
            prompt: "What should you do before printing a large job, according to the lesson?",
            options: [
              "Get written approval of a proof and ask for one printed sample",
              "Print everything first and check later",
              "Skip the client because they are busy",
              "Send the file as a small WhatsApp image",
            ],
            answer_index: 0,
            explanation: "Written proof approval and a sample print prevent costly mistakes.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "motion-basics": {
      explanation_md: `Moving graphics catch the eye on WhatsApp Status, Instagram, TikTok and Facebook far more than still images. Agencies and multimedia roles in Ghana often ask designers to create simple animation alongside static designs, and even local businesses like a short animated price announcement. This lesson is optional, but it is a useful extra skill once your static design is solid.

## What motion graphics are

Motion graphics are designs that move: a headline that slides in, a logo that fades up, a price that pops, icons that appear one by one. They are different from filming video. You are animating the same text, shapes and images you already design with.

## Key ideas

* **Keyframes.** You set how something looks at one moment, such as off screen, and how it looks at a later moment, such as in the centre. The software fills in the movement between them.
* **Timing.** Fast movement feels energetic; slow movement feels calm. Match the mood of the brand.
* **Easing.** Real objects speed up and slow down. Movement that eases in and out looks natural; constant speed looks mechanical.
* **Readability.** Text must stay on screen long enough to read comfortably. A good habit is to leave each line up long enough to read it twice.
* **Restraint.** Animate a few things with purpose. If everything moves, nothing stands out.

## Tools on a phone

Many free design apps can animate text and elements with one tap, and free video editing apps on phones let you place text and graphics on a timeline and export a short video. On a laptop, more advanced free tools exist, and adverts sometimes name paid motion software. The ideas above carry over to any tool.

## Formats and data

Export short animations as MP4 video, which plays almost everywhere. Keep them short, often under fifteen seconds for Status, and keep file sizes small for people on prepaid data. Many viewers watch with sound off, so the message must work without audio.

## A small example

Sumaila makes a weekly price announcement for a cement and building materials shop in Tamale. Instead of a still image, he creates a ten second Status video: the shop logo fades in, then three items slide in one by one with their prices in cedis, and finally the phone number appears and stays for three seconds. He uses the shop's colours, eases each movement and exports a small MP4. The owner reports that more customers reply to the animated Status than to the still ones he used before.`,
      practice_task_md: `**Goal:** Turn a static design into a short animated Status video.

**Steps:**
1. Take one of your earlier designs, such as a social media post or a price list.
2. In a free design or video editing app on your phone, add simple animations: the headline enters first, then details, then the contact.
3. Keep the whole video under fifteen seconds. Make sure each line stays up long enough to read twice.
4. Export as MP4 and check the file size and that it plays well with sound off.
5. Show it to two people and ask what message they remember.

**Done looks like:** A short MP4 under fifteen seconds with purposeful animation, a readable message without sound and feedback from two viewers.`,
      quiz: {
        questions: [
          {
            prompt: "What is a keyframe in animation?",
            options: [
              "A photo frame for a printed poster",
              "The first word of a caption",
              "A setting for how something looks at one moment, with the software filling in movement between keyframes",
              "The border around a video",
            ],
            answer_index: 2,
            explanation: "You set keyframes at different moments and the software fills in the movement.",
          },
          {
            prompt: "Why does the lesson recommend easing?",
            options: [
              "Movement that speeds up and slows down looks natural",
              "It makes videos longer",
              "It removes the need for colours",
              "It makes files larger",
            ],
            answer_index: 0,
            explanation: "Easing in and out mimics how real objects move.",
          },
          {
            prompt: "How long should text stay on screen, according to the lesson's habit?",
            options: [
              "Less than half a second",
              "Only while music plays",
              "Exactly one minute",
              "Long enough to read it twice",
            ],
            answer_index: 3,
            explanation: "A good habit is leaving each line up long enough to read it twice.",
          },
          {
            prompt: "Why should a Status animation work without sound?",
            options: [
              "Sound files are illegal",
              "Many viewers watch with sound off",
              "Phones cannot play sound",
              "MP4 files have no audio",
            ],
            answer_index: 1,
            explanation: "Many people watch with sound off, so the message must be visual.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "client-work": {
      explanation_md: `Many talented beginners struggle not because their designs are weak, but because the client relationship goes wrong. The client expected three logo ideas and got one. The designer did seven rounds of changes for free. A flyer used a photo that belonged to someone else. The final payment never came. Job adverts for designers in Ghana mention briefs, revisions, deadlines and client communication again and again, because these skills decide whether projects succeed.

## What this section covers

* **Briefs, feedback and revisions.** How to ask the right questions before you start, agree what is included, receive feedback calmly and stop endless changes.
* **Copyright, fonts, images and AI tools.** What you may use from the internet, how licences for fonts and images work, who owns the finished design and how to use AI image tools honestly.
* **Pricing, quotes and invoices in cedis.** How to work out a fair price, write a clear quote, take a deposit, send an invoice and keep records of mobile money payments.

## Treat every job as a small project

Even a simple flyer has a start, a middle and an end. At the start you agree what will be made, by when and for how much. In the middle you design, share drafts and collect feedback. At the end you deliver the right files, get final approval and get paid. Writing these steps down, even in a short WhatsApp message, protects both you and the client.

## Communication habits that build trust

* **Reply promptly,** even if only to say "Received, I will send a draft by Thursday."
* **Confirm decisions in writing.** After a phone call, send a short summary message.
* **Explain your choices.** "I made the date bigger because people need it first" sounds professional and helps clients accept your ideas.
* **Warn early about problems.** If a photo is too small to print, say so before the deadline, not after.
* **Be polite even when you disagree.** You can offer your advice and then respect the client's decision on their own business.

## A small example

Mariama, a freelance designer in Tamale, receives a WhatsApp voice note asking for "a flyer for our programme". Instead of starting immediately, she replies with five short questions: what is the event, who should come, what are the date, time and venue, where will it be shared, and when is it needed. She then sends a short message confirming the price, the deposit, two rounds of changes and delivery as a WhatsApp image and an A4 print PDF.

The client agrees, pays the deposit by mobile money and sends clear details. Mariama delivers on time, the client asks for one small change, and the balance is paid the same day. Nothing about the design was unusual. What made the job smooth was clear communication from the first message, and that is exactly what this section teaches.`,
      practice_task_md: `**Goal:** Write the messages that start and finish a small design job.

**Steps:**
1. Imagine a client asks you on WhatsApp for "a poster for our church programme".
2. Write your first reply with five questions that will give you everything you need.
3. Write a confirmation message that states what you will deliver, by when, the price in cedis, the deposit and how many rounds of changes are included.
4. Write a delivery message that lists the files you are sending and asks for final approval and the balance.
5. Read all three messages aloud and remove anything unclear or rude.

**Done looks like:** Three short, polite, clear messages you can reuse as templates for real clients.`,
      quiz: {
        questions: [
          {
            prompt: "According to the lesson, why do many talented beginners struggle?",
            options: [
              "Their designs are always weak",
              "The client relationship goes wrong, such as unclear expectations or unpaid work",
              "They use too few colours",
              "They live too far from Accra",
            ],
            answer_index: 1,
            explanation: "The lesson says problems often come from the client relationship, not the design.",
          },
          {
            prompt: "What should you do after agreeing something with a client on a phone call?",
            options: [
              "Forget it until the deadline",
              "Post it on social media",
              "Ask the client to call again tomorrow",
              "Send a short written summary message",
            ],
            answer_index: 3,
            explanation: "Confirming decisions in writing protects both you and the client.",
          },
          {
            prompt: "When should you tell a client that their photo is too small to print?",
            options: [
              "Early, before the deadline",
              "After the job is printed",
              "Never, the printer will fix it",
              "Only if they ask",
            ],
            answer_index: 0,
            explanation: "Warning early about problems avoids last minute disappointments.",
          },
          {
            prompt: "What made Mariama's job go smoothly?",
            options: [
              "She used a very unusual design",
              "She did unlimited changes for free",
              "She asked clear questions and confirmed price, deposit, changes and files in writing",
              "She started designing before asking anything",
            ],
            answer_index: 2,
            explanation: "Clear communication from the first message made the project smooth.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "briefs-and-feedback": {
      explanation_md: `A brief is the set of instructions for a design job. Agencies write formal briefs; local clients usually send a voice note or a few lines on WhatsApp. Either way, adverts for designers ask for people who can understand and interpret briefs, because a design that answers the wrong brief is wasted, however beautiful it looks.

## Ask before you design

If the client does not give you a full brief, build one by asking:

* **What is it for?** The goal, such as getting people to an event or selling a product.
* **Who is it for?** The audience, such as parents, youth or traders.
* **What must it say?** The exact words, names, dates, prices and contacts. Ask the client to type them, so spelling comes from them.
* **Where will it be used?** WhatsApp, print, a banner, or all of these, with sizes.
* **What should it feel like?** Formal, joyful, calm, bold. Ask for examples they like and dislike.
* **When is it needed?** The real deadline, including printing time.
* **What is the budget?** So you can suggest what is realistic.

Write the answers back to the client as a short summary and ask them to confirm. That summary is your brief.

## Agree the scope

Scope means exactly what is included. Before you start, agree:

* how many first ideas, or concepts, you will show;
* how many rounds of changes, or revisions, are included, for example two;
* which files you will deliver;
* what counts as extra work, such as a new size or a completely new idea, and that extra work costs extra.

This is not about being difficult. It stops a one day flyer becoming a two week job.

## Receiving feedback well

Feedback is information, not an attack. When a client says "I don't like it", ask calm questions: "Is it the colours, the photo or the layout? What would you like people to notice first?" Vague feelings often hide a simple fix.

Collect all changes in one list before you start editing, and confirm the list back. Making changes one message at a time leads to confusion and endless rounds.

If a requested change will hurt the design, explain why in one or two sentences and offer an alternative. If the client still wants it, respect their choice; it is their business.

## A small example

A pastor in Bolgatanga asks Issahaku for a crusade poster. Issahaku asks the seven questions and sends back a summary, including two concepts and two rounds of changes. The pastor picks a concept, then sends four voice notes with changes over an evening. Issahaku collects them into one numbered list, confirms it and makes all the changes at once. When a third round arrives asking for a completely new background, he politely reminds the pastor that two rounds were included and quotes a small fee for more. The pastor agrees, and the relationship stays friendly.`,
      practice_task_md: `**Goal:** Turn a vague request into a clear brief and handle feedback.

**Steps:**
1. Ask a friend or family member to play a client who wants "something for my business". Let them answer naturally.
2. Ask them the seven brief questions from this lesson and write down their answers.
3. Write a brief summary with scope: number of concepts, rounds of revisions, files to deliver and deadline.
4. Make a quick first design. Ask for their feedback and collect all changes into one numbered list.
5. Make the changes and note anything you would charge extra for.

**Done looks like:** A written brief, a first design, a numbered change list and a revised design. Save the brief template for future clients.`,
      quiz: {
        questions: [
          {
            prompt: "Why should you ask the client to type the exact words, names and contacts?",
            options: [
              "So the spelling comes from them",
              "So they do the design for you",
              "Because typing is faster than designing",
              "So the file size is smaller",
            ],
            answer_index: 0,
            explanation: "Asking the client to type the text means names and numbers come from them, reducing errors.",
          },
          {
            prompt: "What does scope mean in a design job?",
            options: [
              "The colour of the brand",
              "The printer's machine size",
              "Exactly what is included, such as concepts, revisions and files",
              "The client's location",
            ],
            answer_index: 2,
            explanation: "Scope is what is included, agreed before you start.",
          },
          {
            prompt: "What should you do when a client says \"I don't like it\"?",
            options: [
              "Start a completely new design immediately",
              "Stop replying",
              "Argue that the design is perfect",
              "Ask calm questions about what exactly they want changed",
            ],
            answer_index: 3,
            explanation: "Calm questions turn vague feelings into specific fixes.",
          },
          {
            prompt: "How did Issahaku handle four voice notes of changes?",
            options: [
              "He ignored them",
              "He collected them into one numbered list, confirmed it and made all the changes at once",
              "He made each change separately as messages arrived",
              "He charged a fee for each voice note",
            ],
            answer_index: 1,
            explanation: "Collecting changes into one confirmed list avoids confusion.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "copyright-and-ethics": {
      explanation_md: `It is easy to find any image, font or logo online in seconds. That does not mean you are allowed to use it. Using other people's work without permission can embarrass your client and damage your reputation. Employers trust designers who know the basic rules.

## Copyright in simple terms

Copyright protects creative work such as photos, illustrations, designs and fonts. In Ghana, as in most countries, copyright usually exists as soon as an original work is created in a form people can see; it does not need to be registered. Registering with the Copyright Office is voluntary and gives you a record that can help prove ownership. So assume an image or design online belongs to someone unless its licence clearly says how you may use it.

## Images

Safer sources are your own photos, photos the client owns, free stock libraries with a clear licence, and Creative Commons images used according to their terms. Creative Commons licences have short codes: BY means you must give credit, NC means non commercial use only, and ND means no changes. An NC image is not suitable for a business advert.

## Fonts

Fonts are software and come with licences too. Fonts from libraries such as Google Fonts are released under open licences, such as the SIL Open Font License, that allow commercial use. Many fonts on free download sites are "personal use only" or demos. Check before using a font for a paying client.

## Logos and brands

Never copy another business's logo or make one that looks confusingly similar. Logos can be protected as trademarks, and in Ghana trademarks are registered with the Registrar General's Department. Companies register with a different office, the Office of the Registrar of Companies. A logo that copies a famous brand can force your client to rebrand, wasting their money.

## Who owns the final design?

Under Ghana's Copyright Act, when a client commissions a design, or an employer asks you to make it as part of your job, the right to copy and use it usually belongs to the client or employer, unless a written agreement says otherwise. You keep the right to be named as the designer. So agree in writing that the client gets full rights to the final design once paid in full, say whether editable source files are included, and ask if you may show the work in your portfolio.

## AI image tools

AI tools can generate images and ideas quickly, and some adverts mention them. Use them honestly:

* Read the tool's terms on commercial use.
* Do not ask a tool to copy a living artist's style or another brand's logo.
* Do not present AI images as real photos of a client's product, staff or premises.
* Check AI made logos carefully, because they may resemble existing marks, and the law on owning AI output is still unsettled in many countries.

## Your own work

Studying great designers is good. Presenting their work as your own is dishonest, and it is often discovered.

## A small example

Fatima is asked by a shop owner in Wa to "use the same logo as that big supermarket, just change the name". She explains, politely, that this could break trademark rules and force a costly change later, and offers three original ideas instead. She uses a Google font, the owner's own shop photos and a short written agreement giving the owner full rights once paid. The owner ends up proud of a logo that is truly theirs.`,
      practice_task_md: `**Goal:** Build a safe resource kit and a simple rights agreement.

**Steps:**
1. Find three fonts with open licences that allow commercial use. Note each font name and its licence.
2. Find three images under a clear free licence or Creative Commons licence. Note the licence and whether credit is required.
3. Write a short rights note you could send to a logo client: who owns the design after full payment, whether source files are included and whether you may show it in your portfolio.
4. Check one design you made earlier. List every font and image in it and confirm you were allowed to use each.

**Done looks like:** A list of six licensed resources, a three line rights note and a checked design.`,
      quiz: {
        questions: [
          {
            prompt: "When does copyright usually exist for a creative work in Ghana and most countries?",
            options: [
              "As soon as the work is created",
              "Only after it is registered",
              "Only if it has a watermark",
              "Only after it has been sold",
            ],
            answer_index: 0,
            explanation: "Copyright usually exists from creation without registration.",
          },
          {
            prompt: "What does NC mean in a Creative Commons licence?",
            options: [
              "No colours allowed",
              "New copyright",
              "Non commercial use only",
              "No credit needed",
            ],
            answer_index: 2,
            explanation: "NC means non commercial, so the image is not suitable for a business advert.",
          },
          {
            prompt: "What should you agree in writing about a client's logo?",
            options: [
              "That you can resell it to other clients",
              "Nothing; agreements are unnecessary",
              "That the client must never show it",
              "That the client gets full rights once paid in full, and whether source files are included",
            ],
            answer_index: 3,
            explanation: "A written agreement on rights, source files and portfolio use avoids disputes.",
          },
          {
            prompt: "Which use of AI image tools does the lesson warn against?",
            options: [
              "Reading the tool's terms on commercial use",
              "Presenting AI images as real photos of a client's product",
              "Checking AI logos for similarity to existing marks",
              "Using AI to explore early ideas",
            ],
            answer_index: 1,
            explanation: "AI images must not be passed off as real photos of a client's product, staff or premises.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "pricing-and-invoicing": {
      explanation_md: `Many new designers in Ghana undercharge, forget their costs or start work without any money upfront, then end up working for free. Pricing well, quoting clearly and keeping records are what turn design from a hobby into a living. Freelance and print shop designers handle money daily, and even employed designers benefit from understanding what their time is worth.

## Know your costs

Before you set a price, list what each job costs you: data, electricity or charging, transport to meet clients or printers, any paid tools, and printing samples. Then think about your time. A logo is not ten minutes of clicking; it includes questions, sketching, building, revisions and delivering files.

## Three ways to price

* **By time:** decide what an hour of your work is worth and estimate the hours.
* **By project:** a fixed price for a defined job, such as one flyer with two rounds of changes. Most local clients prefer this.
* **Packages:** a bundle, such as a logo plus a one page brand guide plus five social media templates.

To find a fair range, ask designers and print shops near you what they charge for common jobs, and compare. Prices differ a lot between towns, client types and experience, so there is no single right number.

## Example calculation

These numbers are made up for practice only and are not a guide to real prices. Say Wumpini estimates a flyer takes 3 hours including changes, and she decides her time is worth GH₵ 30 an hour while she is learning. Her data and transport for the job cost about GH₵ 15. So 3 times 30 is 90, plus 15 is 105. She quotes GH₵ 110 to keep things simple.

## Write a clear quote

A quote, sent before work starts, should state:

* what you will deliver, including sizes and file types;
* how many concepts and rounds of revisions are included;
* the deadline;
* the price in cedis and what extra work costs;
* the deposit required before you start, such as half.

The deposit protects you if the client disappears, and shows that they are serious.

## Send an invoice

When the work is done, send a simple invoice. Include your name or business name, the client's name, an invoice number such as INV 001, the date, each item with its price, the total, the deposit already paid, the balance due, the due date and how to pay, such as the name on your mobile money account. Send files in full quality after the balance is paid, or send a watermarked preview first if you are unsure about a client.

## Keep records

Write down every payment: the date, client, amount and the mobile money transaction ID. A simple spreadsheet or notebook is enough. Records help you see which work earns most, settle disagreements and, as your business grows, prepare for registering your business and understanding your tax obligations.

## A small example

Salifu designs business cards for a mechanic in Damongo. He sends a quote on WhatsApp: one design, two rounds of changes, a print PDF, delivery in two days, half paid upfront. The mechanic pays the deposit by mobile money, Salifu records the transaction ID, delivers, sends an invoice for the balance and receives it the same day. Clear steps meant no awkward arguments.`,
      practice_task_md: `**Goal:** Create a reusable quote and invoice for your design work.

**Steps:**
1. List your real costs for a typical job: data, power, transport and any tools.
2. Ask two designers or print shops near you what they charge for a flyer and a logo. Note the range.
3. Using a free document or spreadsheet app, make a quote template with deliverables, revisions, deadline, price in cedis, extra work rates and deposit.
4. Make an invoice template with your name, client, invoice number, date, items, total, deposit paid, balance and payment details. Use made up example details only.
5. Start a simple payment record with columns for date, client, amount and transaction ID.

**Done looks like:** A quote template, an invoice template and an empty payment record, ready for your first paying client.`,
      quiz: {
        questions: [
          {
            prompt: "Which pricing method does the lesson say most local clients prefer?",
            options: [
              "By the minute",
              "Free work in exchange for exposure",
              "Paying only after many months",
              "A fixed price for a defined project",
            ],
            answer_index: 3,
            explanation: "Most local clients prefer a fixed price for a defined job.",
          },
          {
            prompt: "In the example, why does Wumpini's quote include GH₵ 15 on top of her time?",
            options: [
              "To cover her data and transport costs for the job",
              "As a tip for herself",
              "Because the client asked for it",
              "To pay the printer for 500 copies",
            ],
            answer_index: 0,
            explanation: "She added her job costs for data and transport to the value of her time.",
          },
          {
            prompt: "Why ask for a deposit before starting work?",
            options: [
              "Because it is required by every app",
              "It protects you if the client disappears and shows they are serious",
              "So you can skip the invoice",
              "To make the design faster",
            ],
            answer_index: 1,
            explanation: "A deposit protects your time and confirms the client's commitment.",
          },
          {
            prompt: "Which detail should you record for every mobile money payment?",
            options: [
              "The client's favourite colour",
              "The weather that day",
              "The transaction ID, with the date, client and amount",
              "The font used in the design",
            ],
            answer_index: 2,
            explanation: "Records with date, client, amount and transaction ID settle disagreements and show what earns most.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "getting-hired": {
      explanation_md: `For most design jobs in Ghana, the first thing an employer or client asks for is not a certificate but your portfolio. Adverts from print shops, agencies, NGOs and companies regularly ask candidates to attach or link to samples of their work, and some say the portfolio is what decides who they hire. This section helps you turn what you have learned into work that pays.

## Three ways designers earn

* **Employment.** A full time role at a print shop, branding company, agency, NGO or in house marketing team. You get regular pay and learn from colleagues, but many advertised roles are in Accra and Tema.
* **Freelancing.** Working for your own clients: shops, churches, schools, event planners and, later, clients abroad. You choose your work and can start from anywhere, including the northern regions, but you must find clients and manage money yourself.
* **A mix.** Many designers work for a print shop or company and take freelance jobs on the side, or freelance while applying for roles.

There is no single right route. Start where you are and use each project to build evidence.

## What this section covers

* **Building a design portfolio.** Choosing your best work, showing your thinking and presenting it in a light format that opens easily on a phone.
* **Freelancing for local and remote clients.** Finding first clients nearby, growing through referrals, understanding remote work and avoiding scams.
* **Design jobs and applications.** Where to look, how to apply with a short message that points to your portfolio, and how to handle design tests and interviews.

## Honest evidence beats big claims

Employers and clients can see your work, so let it speak. Real projects for local businesses, churches or NGOs are excellent evidence, even if they were small or paid little. Personal practice projects are fine too, as long as you label them honestly as practice or concept work. Never claim a client you did not work for or present someone else's design as yours.

## Preparing for a programme

Several training programmes in Ghana run graphic design courses, many in classroom cohorts in big cities. If you plan to apply to one, working through this roadmap and arriving with a small portfolio can help you get more from it. If you cannot join one, this roadmap plus steady practice and real projects is a genuine route on its own.

## A small example

Ayishetu in Wa finished the earlier lessons and had ten practice designs. She offered to design a flyer for her church's youth week and a price list for a neighbour's provisions shop at a small fee. She asked both for permission to show the work. With those two real projects and her best practice pieces she built a phone friendly PDF portfolio. She used it to win two more local clients and to apply for a junior role she saw advertised.`,
      practice_task_md: `**Goal:** Plan your route into paid design work.

**Steps:**
1. Write down which route fits you best right now: employment, freelancing or a mix, and why.
2. List every design you have made so far in this roadmap. Mark the three you are most proud of.
3. Name two real people or organisations near you who could use a design, such as a church, school, shop or association.
4. Write a short, polite message offering to help one of them with a specific design, and ask whether you may show the result in your portfolio.

**Done looks like:** A chosen route, a shortlist of your three best pieces and a ready to send message to a real potential client.`,
      quiz: {
        questions: [
          {
            prompt: "What does the lesson say employers and clients usually ask for first?",
            options: [
              "Your phone model",
              "Your portfolio",
              "A list of every app you have installed",
              "Your home address",
            ],
            answer_index: 1,
            explanation: "For most design jobs, the portfolio is the first thing employers and clients ask for.",
          },
          {
            prompt: "What is one advantage of freelancing mentioned in the lesson?",
            options: [
              "You never need to find clients",
              "Money is managed for you",
              "You can start from anywhere, including the northern regions",
              "It always pays more than employment",
            ],
            answer_index: 2,
            explanation: "Freelancers can start from anywhere but must find clients and manage money.",
          },
          {
            prompt: "How should you present personal practice projects in a portfolio?",
            options: [
              "Label them honestly as practice or concept work",
              "Claim they were for famous clients",
              "Hide them completely",
              "Put another designer's name on them",
            ],
            answer_index: 0,
            explanation: "Practice projects are fine if they are honestly labelled.",
          },
          {
            prompt: "What did Ayishetu do before showing her church and shop designs in her portfolio?",
            options: [
              "She changed the clients' names",
              "She added fake reviews",
              "She removed her own name",
              "She asked both clients for permission",
            ],
            answer_index: 3,
            explanation: "Asking permission before showing client work is professional and honest.",
          },
        ],
        pass_threshold: 75,
      },
    },
    portfolio: {
      explanation_md: `Your portfolio is your most important job tool as a designer. Almost every design advert asks for one, and clients decide whether to trust you by looking at it. A small, well chosen portfolio beats a big messy one every time.

## Choose carefully

* **Pick eight to twelve pieces.** Fewer strong pieces are better than many average ones. One weak piece makes reviewers doubt the rest.
* **Show range that matches the jobs you want.** For example, a logo with its brand guide, social media templates, a flyer and banner set, a print piece and a photo edit. If you want print shop work, show print. If you want agency work, show campaigns and social content.
* **Put your best piece first and a strong piece last.** Many reviewers only look at the first few.

## Show your thinking

Employers want to know how you work, not just what the final image looks like. For your strongest two or three projects, add a short case study:

* **The brief:** who the client was and what they needed, in one or two lines.
* **Your process:** sketches, early ideas or the brand questions you asked.
* **The result:** the final design shown in use, such as the banner on a building or the post on a phone screen.
* **The outcome, honestly:** what the client said or what happened, without invented numbers.

Before and after pairs work well too, such as a crowded flyer you redesigned.

## Be honest

Label practice or concept projects clearly, such as "Concept project: logo for a made up juice brand." Only show client work with permission. Mock ups, which place your design onto a photo of a sign, shirt or phone, are useful to show work in context, but do not use them to suggest a client or a printed job that never existed.

## Make it light and phone friendly

Many clients and employers will open your portfolio on a phone, sometimes on limited data.

* A **PDF portfolio** of around ten pages, with images compressed so the file stays small, is easy to send on WhatsApp or email.
* A **free online portfolio** on a design sharing site or a simple page gives you one link to share. Check that it loads well on a phone.
* Keep your name, phone number, email and town on the first and last page.

Update your portfolio every few months, replacing weaker pieces as you improve.

## A small example

Alhassan's first portfolio had thirty designs, including some copied from tutorials. A mentor helped him cut it to ten: two real logo projects with brand guides, a church event set across WhatsApp, A4 and banner, a shop's social media templates, a redesigned chop bar menu shown before and after, and two clearly labelled concept projects. He added short case studies to the logos and compressed the PDF so it sent quickly on WhatsApp. Clients now understand his work in a minute, and he gets more replies.`,
      practice_task_md: `**Goal:** Build a first phone friendly portfolio.

**Steps:**
1. Gather every design you made in this roadmap and any real client work you have permission to show.
2. Choose eight to twelve pieces that match the jobs you want. Put your best first.
3. Write short case studies for your top two projects: brief, process, result and honest outcome.
4. Label all practice projects as concepts.
5. Build a PDF in a free design app with a cover page, your pieces and a contact page. Compress images so the file is small enough to send easily on WhatsApp.
6. Send it to one person you trust and ask what they remember after one minute.

**Done looks like:** A small PDF portfolio of eight to twelve honest, labelled pieces with two case studies and your contact details.`,
      quiz: {
        questions: [
          {
            prompt: "How many pieces does the lesson recommend for a portfolio?",
            options: ["Two or three", "Eight to twelve", "At least fifty", "Every design you have ever made"],
            answer_index: 1,
            explanation: "Eight to twelve strong pieces are better than many average ones.",
          },
          {
            prompt: "What should a short case study include?",
            options: [
              "Only the final image",
              "A list of every app you know",
              "Invented sales numbers",
              "The brief, your process, the result and an honest outcome",
            ],
            answer_index: 3,
            explanation: "Case studies show your thinking through brief, process, result and honest outcome.",
          },
          {
            prompt: "How should you use mock ups in a portfolio?",
            options: [
              "To show work in context, without suggesting a client or printed job that never existed",
              "To pretend you worked for a famous brand",
              "Instead of any real designs",
              "Only for photos of yourself",
            ],
            answer_index: 0,
            explanation: "Mock ups show context but must not imply fake clients or jobs.",
          },
          {
            prompt: "Why should a PDF portfolio be compressed to a small file size?",
            options: [
              "Small files look sharper",
              "Printers require small files",
              "Many people open it on a phone, sometimes on limited data",
              "WhatsApp only accepts portfolios in black and white",
            ],
            answer_index: 2,
            explanation: "A small file opens quickly on phones and limited data.",
          },
        ],
        pass_threshold: 75,
      },
    },
    freelancing: {
      explanation_md: `Freelancing is one of the most realistic ways to start earning from design, especially outside Accra. Shops, churches, mosques, schools, associations, event planners and NGOs in every town need flyers, logos and social media graphics, and many of them prefer to work with someone local they can meet.

## Start close to home

* **People you already know.** Your church or mosque, school, family businesses, a friend's event. Do one or two jobs at a fair price and ask for permission to show them.
* **Print shops.** Many print shops have more design requests than they can handle. Offering to design for their customers can bring steady work, either at their shop or remotely.
* **Event planners, photographers and decorators.** They often need flyers, programmes and social graphics for their clients.
* **Associations and NGOs.** Farmer groups, youth groups and local NGOs need reports, posters and certificates.

Show samples on your phone when you visit. A good printed business card and a WhatsApp Business profile with a catalogue of your work make it easy for people to remember and contact you.

## Grow through referrals

Most local freelance work comes from people recommending you. Deliver on time, communicate clearly, keep your prices and terms consistent and ask happy clients to tell others. A short, honest message from a real client, shared with their permission, is better than any advert.

## Remote work

Remote design work for clients abroad exists, through online freelance marketplaces, remote job boards and direct contacts. Be realistic:

* Many remote roles ask for some experience, a strong portfolio and good written English.
* Most need a laptop and a stable internet connection, which can be hard on prepaid data alone.
* Some platforms or employers only accept people from certain countries. Read the eligibility rules carefully.
* Check how payment will reach you in Ghana before you start.

Many designers build skills and a portfolio with local clients first, then add remote work.

## Avoid scams

* Never pay money to get a job or "unlock" a client.
* Be careful of strangers who send more money than agreed and ask you to send back the difference.
* Do not do large amounts of free "test" work. A short test is normal; a full campaign for free is not.
* Get a deposit before starting work for new clients.

## Look after yourself

Freelancing means irregular income. Keep a simple record of earnings and costs, save something from good months for slow ones and keep learning so you can offer more.

## A small example

Hawa in Tamale started by designing her church's harvest flyer and her aunt's shea butter labels. She asked a print shop near the market if she could design for their walk in customers, and they began sending her jobs by WhatsApp. After a year of local work and a stronger portfolio, she also started taking occasional remote social media design jobs, using a laptop at a community centre on busy weeks.`,
      practice_task_md: `**Goal:** Prepare to find your first freelance clients.

**Steps:**
1. List ten possible local clients: churches, mosques, schools, shops, print shops, event planners or associations.
2. Choose three and write one sentence each on a design they could use, such as a new price list or event flyer.
3. Set up a simple work profile on WhatsApp Business or a similar app, with a short description and three of your best designs.
4. Write a short, polite message or visit plan for the print shop nearest to you, offering your design help.
5. Write down three scam warning signs from this lesson to keep on your phone.

**Done looks like:** A list of ten prospects, three specific ideas, a work profile with samples, an outreach message and your scam checklist.`,
      quiz: {
        questions: [
          {
            prompt: "Why might print shops be a good source of freelance work?",
            options: [
              "Many have more design requests than they can handle",
              "They never need designers",
              "They only print photos",
              "They pay designers to stay away",
            ],
            answer_index: 0,
            explanation: "Print shops often have more design requests than they can handle.",
          },
          {
            prompt: "Where does the lesson say most local freelance work comes from?",
            options: [
              "Paid billboards",
              "Television adverts",
              "Referrals from people who recommend you",
              "Random cold calls abroad",
            ],
            answer_index: 2,
            explanation: "Most local freelance work comes from recommendations by satisfied clients.",
          },
          {
            prompt: "What does the lesson say most remote design roles need?",
            options: [
              "Nothing but a phone and no portfolio",
              "Payment of a joining fee",
              "A degree from abroad",
              "A laptop, a stable internet connection, a portfolio and good written English",
            ],
            answer_index: 3,
            explanation: "Remote roles usually need a laptop, stable internet, a strong portfolio and written English.",
          },
          {
            prompt: "Which of these is a scam warning sign?",
            options: [
              "A client who pays a deposit",
              "Someone who sends more money than agreed and asks you to send back the difference",
              "A client who gives a clear brief",
              "A short design test for a job",
            ],
            answer_index: 1,
            explanation: "Overpayment with a request to refund the difference is a common scam.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "job-search": {
      explanation_md: `If you want a design job with regular pay, it helps to know where roles appear and what employers look for. Ghanaian design adverts come from print shops, branding and souvenir companies, advertising agencies, in house marketing teams at companies such as real estate firms, car dealers and media businesses, and NGOs and schools.

## Where to look

* **Job sites.** Ghanaian job sites have Creative and Design categories. Search for titles such as Graphic Designer, Junior Graphic Designer, Visual Designer, Multimedia Designer and Creative Designer.
* **Company and NGO websites.** Organisations often post roles on their own careers pages.
* **Print shops and agencies directly.** Many smaller employers never advertise. Visiting with your portfolio on your phone, or sending a short message, can work.
* **Your network.** Tell teachers, church members, friends and former clients you are looking.

Many advertised design roles are based in Accra and Tema. In the northern regions, design work more often comes through print shops, churches, schools, NGOs and freelance clients, so a mix of local work and remote applications can make sense.

## Read the advert carefully

Note the tools, tasks and experience the advert asks for. Many adverts ask for a degree, diploma or a year or two of experience, but also say a strong portfolio matters. If you meet most requirements and your portfolio matches the work, apply. Adapt your portfolio to show the kind of work the employer does: print pieces for a print shop, social content for an agency.

## A short application

Keep it simple and specific:

* a few lines saying which role you want and why you fit, mentioning one or two relevant projects;
* a link to your portfolio or a small PDF attached;
* a one page CV with your skills, tools, projects and contact details.

Check spelling carefully. A designer's application with typos makes employers doubt their attention to detail.

## Design tests and interviews

Many employers give a short design test, such as a flyer or social post from a brief, sometimes with a time limit. Read the brief twice, ask questions if anything is unclear, apply the principles and deliver the correct file on time. In interviews, expect to walk through your portfolio. Explain the brief, your choices and what you would improve. Employers want to see how you think and how you take feedback.

## Stay safe

Genuine employers do not ask you to pay to apply, to attend an interview or to start a job. If anyone asks for money, stop and check with the job site or the organisation directly.

## A small example

Sumaila in Tamale saw a junior designer role at a print and branding company. The advert asked for flyers, banners and print file preparation. He chose six portfolio pieces showing print work, including a flyer with bleed, a banner and a brand guide, and wrote a five line message linking to his PDF. He was asked to do a one hour test: a church anniversary flyer. He asked about the print size first, used a clear hierarchy and delivered a print PDF with bleed. The interviewer said asking about the size showed he understood real print work.`,
      practice_task_md: `**Goal:** Prepare a complete application for one real or realistic design role.

**Steps:**
1. Search a Ghanaian job site's Creative and Design category and pick one design role. Note the tasks, tools and experience it lists, without copying the advert.
2. Choose five or six portfolio pieces that match those tasks.
3. Write a one page CV listing your design skills, free tools you use, two or three projects and your contact details.
4. Write an application message of no more than six lines that links to your portfolio.
5. Give yourself a one hour practice test: design a flyer for a made up event from a short brief, then review it against the principles.

**Done looks like:** A tailored portfolio selection, a one page CV, a short application message and a timed practice test design.`,
      quiz: {
        questions: [
          {
            prompt: "Which job titles does the lesson suggest searching for?",
            options: [
              "Accountant and Auditor",
              "Graphic Designer, Junior Graphic Designer, Visual Designer, Multimedia Designer and Creative Designer",
              "Driver and Dispatch Rider",
              "Nurse and Pharmacist",
            ],
            answer_index: 1,
            explanation: "These are common titles for design roles on job sites.",
          },
          {
            prompt: "According to the lesson, where does design work in the northern regions more often come from?",
            options: [
              "Print shops, churches, schools, NGOs and freelance clients",
              "Only large Accra agencies",
              "Government lotteries",
              "Overseas embassies only",
            ],
            answer_index: 0,
            explanation: "The lesson says northern design work often comes through local organisations and freelance clients.",
          },
          {
            prompt: "Why are typos in a designer's application especially harmful?",
            options: [
              "Job sites delete applications with typos",
              "Typos make files larger",
              "They make employers doubt your attention to detail",
              "Employers only read the first word",
            ],
            answer_index: 2,
            explanation: "Designers must catch errors in client work, so typos raise doubts.",
          },
          {
            prompt: "What should you do if someone asks you to pay money to get a design job?",
            options: [
              "Pay quickly before someone else does",
              "Pay half now and half later",
              "Ask a friend to pay for you",
              "Stop and check with the job site or organisation directly",
            ],
            answer_index: 3,
            explanation: "Genuine employers do not ask for payment to apply or start a job.",
          },
        ],
        pass_threshold: 75,
      },
    },
  },
};

export default content;
