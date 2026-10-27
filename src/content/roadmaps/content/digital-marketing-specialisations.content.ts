import type { TrackContent } from "./types";

/**
 * Original lesson content for the Digital Marketing Specialisations roadmap,
 * the companion that fully teaches DMP weeks 7 to 9 (issue #198).
 * Research and sources: src/content/research/digital-marketing-specialisations.md.
 */
const content: TrackContent = {
  roadmap: "digital-marketing-specialisations",
  nodes: {
    // SEO AND CONTENT MARKETING

    "seo-content": {
      explanation_md: `Search engine optimisation, or SEO, is the work of helping a business appear when people search for what it sells. A paid ad stops the moment the money stops. A well made page can keep bringing visitors for months or years. That is why small businesses, schools, hotels and NGOs in Ghana value someone who can make their website easier to find, and why SEO and content skills appear in many junior marketing job descriptions.

## What this specialisation covers

You already met the basics of search in the Digital Marketer roadmap. Here you go deeper over three weeks, with three lessons in each.

* **Week 7, keywords and pages.** Keyword research with free tools, search intent and keyword mapping, and on page SEO.
* **Week 8, links and local search.** Backlinks and trust, local SEO, and finding local listings with polite outreach.
* **Week 9, content strategy.** Content pillars and topic clusters, FAQs with images and video, and a content calendar with a one page strategy.

## How search engines decide

A search engine has three jobs. It **crawls** the web by following links to discover pages. It **indexes** those pages by storing what each one is about. When someone searches, it **ranks** the pages it thinks best answer that search. You cannot pay a search engine to rank higher in the normal results. You can only make pages that are easy to discover, easy to understand and genuinely useful.

Google says plainly that its systems try to reward helpful, reliable content written for people, not content made mainly to attract search visits. Keep that idea at the centre of everything in this specialisation. Every technique you learn is a way to make a useful page easier to find, never a trick to fool the system.

## A small example

Mariama runs a guesthouse in Tamale with a simple website. Visitors keep asking her on WhatsApp the same things: how far it is from the airport, whether rooms have air conditioning, and whether she accepts mobile money. Her site has a home page with a photo and a phone number, and little else.

Over three weeks, Mariama's nephew Issahaku researches what travellers search for, rewrites her home page around "guesthouse in Tamale", asks the local tourism association to list her, and writes a clear FAQ page answering the questions guests already ask. Nothing here costs money. Each step makes the site more useful to a traveller, which is exactly what search engines want to show.

## What you will be able to show

By the end you will have a keyword map, an improved page, a short list of local listing opportunities with outreach emails, and a one page SEO strategy. Together they make a strong portfolio piece and the core of your week 12 capstone if you choose this path.`,
      practice_task_md: `**Goal:** Choose the business you will work on for the whole specialisation.

**Steps:**
1. Pick a real small business, church, school or NGO you can talk to, or the mock business you used in week 4.
2. Search for it by name on any search engine. Note whether it has a website, a Google Business Profile, or neither.
3. Search for what it sells plus your town, for example "tailor in Bolgatanga". Note the first three results that appear.
4. In a notes app or Google Docs, write three sentences: what the business sells, who its customers are, and what you found when you searched.

**Done looks like:** A short note naming your business, its customers and its current search presence. You will build on it in every lesson that follows.`,
      quiz: {
        questions: [
          {
            prompt: "What are the three jobs a search engine does, in order?",
            options: ["Rank, crawl, index", "Crawl, index, rank", "Index, advertise, rank", "Crawl, advertise, index"],
            answer_index: 1,
            explanation: "A search engine crawls to discover pages, indexes them to store what they are about, then ranks them for each search.",
          },
          {
            prompt: "According to the lesson, how can a business rank higher in the normal search results?",
            options: [
              "By paying the search engine a monthly fee",
              "By making pages that are easy to discover, easy to understand and genuinely useful",
              "By repeating its keyword as many times as possible",
              "By posting more often on social media",
            ],
            answer_index: 1,
            explanation: "The lesson says you cannot pay to rank in normal results; you make useful pages that are easy to find and understand.",
          },
          {
            prompt: "Why does a well made page often keep bringing visitors after a paid ad has stopped?",
            options: [
              "Because search engines charge less over time",
              "Because a ranking page keeps appearing in results without a payment for each visit",
              "Because ads are not allowed in Ghana",
              "Because old pages are always ranked first",
            ],
            answer_index: 1,
            explanation: "The lesson contrasts ads, which stop when the money stops, with pages that can keep bringing visitors for months.",
          },
          {
            prompt: "In the example, what did Issahaku use as the basis for Mariama's FAQ page?",
            options: [
              "Questions copied from a competitor's site",
              "Questions guests already ask her on WhatsApp",
              "A list of popular words from a trend tool only",
              "Questions written by an AI tool without checking",
            ],
            answer_index: 1,
            explanation: "He answered the questions visitors were already asking Mariama on WhatsApp.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "keyword-research": {
      explanation_md: `Every search starts with words. If a business describes itself one way and customers search another way, the business stays invisible. A junior SEO or content marketer is often asked first to find out which words real customers use. You can do this well with free tools and a little patience.

## What a keyword is

A keyword is any word or phrase someone types or speaks into a search box. "Shea butter" is a short, broad keyword. "Where to buy pure shea butter in Tamale" is a longer, more specific one. Longer phrases are searched less often, but the people typing them usually know exactly what they want, and fewer businesses compete for them. For a small local business, these longer phrases are often the best place to start.

## Free ways to find keywords

* **Search suggestions.** Start typing a phrase into a search engine and read the suggestions that drop down. They come from what people actually search. Try adding letters after your phrase, such as "shea butter a", "shea butter b", to see more.
* **Related searches and questions.** At the bottom of a results page, and in boxes that list common questions, you will find more phrases people use.
* **Google Trends.** Compare two or three phrases to see which is searched more and how interest changes through the year, for example in the harmattan or before Christmas. You can set the country to Ghana.
* **Your customers.** Read WhatsApp chats, comments and reviews. The exact words customers use are often the best keywords of all.
* **Competitors.** Look at the page titles and headings of businesses that already appear for your phrases.

Keyword Planner inside Google Ads gives search volume estimates, but it needs a Google Ads account with billing details completed, so this lesson does not depend on it.

## Recording what you find

Keep a simple sheet with columns for the keyword, where you found it, how specific it is (broad or specific), and whether it shows someone ready to buy, still learning, or looking for a particular business. Do not chase exact numbers. Your aim is a shortlist of phrases that real customers use and that the business can honestly answer.

## A worked example

Fuseini helps a tailor in Wa called Amina. He types "tailor in Wa" and sees suggestions like "tailor in Wa for kaba" and "school uniform tailor Wa". Related searches show "smock sewing near me". He reads Amina's WhatsApp messages and finds customers often write "sew my kaba and slit" and "batakari for wedding".

His shortlist has eight phrases. Three show buying intent, such as "school uniform tailor Wa". Three are questions, such as "how much fabric for kaba and slit". Two are about the batakari, a strong local product. He now knows what Amina's pages should talk about.`,
      practice_task_md: `**Goal:** Build a keyword shortlist of 10 to 15 phrases for your chosen business.

**Steps:**
1. Write three seed phrases that describe what the business sells, with and without your town.
2. Collect suggestions for each seed phrase from a search box and from related searches. A few searches use very little data.
3. Add at least three phrases taken from real customer messages or reviews.
4. In Google Sheets or on paper, make columns: keyword, source, broad or specific, and buying, learning or looking for this business.
5. Optional: compare your top three phrases in Google Trends with the country set to Ghana.

**Done looks like:** A sheet of 10 to 15 keywords with every column filled, ready to map to pages in the next lesson.`,
      quiz: {
        questions: [
          {
            prompt: "Why are longer, specific keyword phrases often a good start for a small local business?",
            options: [
              "They are searched more often than short phrases",
              "The searcher usually knows exactly what they want and fewer businesses compete for them",
              "Search engines only show small businesses for long phrases",
              "They are free while short phrases cost money",
            ],
            answer_index: 1,
            explanation: "The lesson says longer phrases are searched less but show clear intent and face less competition.",
          },
          {
            prompt: "Where do search box suggestions come from?",
            options: [
              "Random words chosen by the search engine",
              "What people actually search",
              "Paid advertisers only",
              "The business's own website",
            ],
            answer_index: 1,
            explanation: "The lesson explains that suggestions come from what people actually search.",
          },
          {
            prompt: "Why does this lesson not depend on Keyword Planner?",
            options: [
              "It only works for businesses outside Ghana",
              "It needs a Google Ads account with billing details completed",
              "It shows no keyword ideas at all",
              "It has been closed down",
            ],
            answer_index: 1,
            explanation: "Keyword Planner sits inside Google Ads and needs an account with billing details completed.",
          },
          {
            prompt: "In the example, where did Fuseini find phrases like \"sew my kaba and slit\"?",
            options: ["In Google Trends", "In Amina's WhatsApp messages from customers", "In a paid keyword tool", "On a competitor's price list"],
            answer_index: 1,
            explanation: "He read Amina's customer messages, which the lesson says are often the best source of keywords.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "search-intent": {
      explanation_md: `Two people can type almost the same words and want very different things. Search engines try hard to work out what each searcher wants, and they show the kind of page that fits. If your page does not match that want, it will struggle no matter how many times it uses the keyword. Matching intent is a core skill employers look for in content and SEO roles.

## Four common kinds of intent

* **Learn.** The searcher wants information, such as "how to store shea butter". A helpful article or guide fits.
* **Find a particular place or site.** The searcher already knows the business, such as "Hawa shea butter Tamale". The home page or a Google Business Profile fits.
* **Compare.** The searcher is choosing, such as "best guesthouse near Tamale airport". A page with clear facts, photos and reviews fits.
* **Act or buy.** The searcher is ready, such as "order shea butter delivery Tamale". A product or service page with price and how to pay fits.

## Let the results teach you

The quickest way to check intent is to search the keyword and look at what already ranks. If the top results are all guides, searchers want to learn. If they are all shop pages or maps, searchers want to buy or visit. Search engines have already studied millions of searches, so the results page shows you what people expect.

## Keyword mapping

A keyword map is a simple table that gives every important keyword one home page on the site. Each page should have one main keyword plus a few close variations that share the same intent. Two problems disappear when you do this:

* **Pages competing with each other.** If three pages all try to rank for "school uniforms Wa", none of them is clearly the best answer.
* **Keywords with no home.** If nobody wants a page for "kaba and slit prices", you discover that the site needs a new page.

Your map has columns for the page (existing or new), the main keyword, supporting keywords, intent, and the one action you want the visitor to take.

## A worked example

Fuseini takes his shortlist for Amina the tailor. He searches "how much fabric for kaba and slit" and sees guides and videos, so intent is learn. He searches "school uniform tailor Wa" and sees maps and business listings, so intent is buy or visit.

His map gives the home page the main keyword "tailor in Wa" with "kaba and slit tailor Wa" as support. A new page, "School uniforms", takes "school uniform tailor Wa". A new guide, "How much fabric do I need for kaba and slit?", answers the learning question and links to the order page. Each page now has one clear job.`,
      practice_task_md: `**Goal:** Turn your keyword shortlist into a keyword map.

**Steps:**
1. For each keyword on your shortlist, search it and note what kind of pages rank: guides, shop pages, maps or business names.
2. Label each keyword with one intent: learn, find, compare or buy.
3. Group keywords that share the same intent and meaning.
4. In a sheet, give each group one page, existing or new, with columns: page, main keyword, supporting keywords, intent, and the action you want.
5. Mark any page that does not exist yet as "new".

**Done looks like:** A keyword map where every important keyword has exactly one home page and every page has one clear job.`,
      quiz: {
        questions: [
          {
            prompt: "Someone searches \"order shea butter delivery Tamale\". Which intent fits best?",
            options: ["Learn", "Find a particular site", "Compare", "Act or buy"],
            answer_index: 3,
            explanation: "Words like order and delivery show the person is ready to act or buy.",
          },
          {
            prompt: "What is the quickest way the lesson suggests to check a keyword's intent?",
            options: [
              "Ask the business owner",
              "Search the keyword and look at what kinds of pages already rank",
              "Count how many words the keyword has",
              "Check how many times competitors use the keyword",
            ],
            answer_index: 1,
            explanation: "The results page shows what searchers expect, so you look at what already ranks.",
          },
          {
            prompt: "What problem does a keyword map prevent when three pages all target \"school uniforms Wa\"?",
            options: [
              "The site loads too slowly",
              "The pages compete with each other so none is clearly the best answer",
              "The keyword becomes too expensive",
              "The pages stop appearing on phones",
            ],
            answer_index: 1,
            explanation: "Giving each keyword one home page stops pages competing with each other.",
          },
          {
            prompt: "In a keyword map, how many main keywords should each page usually have?",
            options: ["None", "One main keyword plus a few close variations", "As many as possible", "Exactly ten"],
            answer_index: 1,
            explanation: "The lesson says each page should have one main keyword plus a few close variations sharing the same intent.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "on-page-seo": {
      explanation_md: `On page SEO means improving the page itself so that people and search engines understand it quickly. It is the part of SEO you control completely, and it is the task in the week 7 assignment: optimising the homepage and blog post you drafted in week 4. Employers often test it by asking a candidate to review a page and suggest changes.

## The main parts of a page

* **Title.** The title element is usually what appears as the clickable headline in search results. Google's guidance is to give every page a unique, descriptive title, keep it concise, and avoid stuffing keywords or vague labels like "Home". There is no fixed character limit, but long titles get cut off, so put the important words first.
* **Meta description.** A short summary of the page. Search engines often build the snippet under the title from the page's own text and only sometimes use your description, so write it to summarise the page accurately rather than as a keyword list.
* **Main heading.** One clear heading at the top, usually the first heading on the page, that tells visitors they are in the right place.
* **Opening paragraph.** Answer the main question or say what the business offers within the first few sentences, using the main keyword naturally.
* **Subheadings.** Break long text into sections with honest subheadings. This helps readers on small screens and helps search engines see the structure.
* **Images.** Use descriptive file names and alt text that says what the image shows. Compress images so the page loads quickly on mobile data.
* **Internal links.** Link to related pages on the same site with clear words, such as "see our school uniform prices", not "click here".
* **Address in the page name.** A short, readable web address such as /school-uniforms is easier to understand than a string of numbers.

## Write for people first

Repeating a keyword again and again makes a page worse to read and can count against it. Use the main keyword in the title, heading and opening, then write naturally. Answer the questions a customer would ask, include prices or how to pay where you can, and make the next step obvious.

## A worked example

Hawa's shea butter site has a home page titled "Home" with the heading "Welcome!!!". Abdul-Rahman rewrites it using the keyword map.

* **Title:** "Pure Shea Butter in Tamale | Hawa's Women's Group"
* **Heading:** "Pure, handmade shea butter from Tamale"
* **Opening:** "We make unrefined shea butter by hand in Tamale and deliver across Ghana. Order on WhatsApp and pay with mobile money."
* **Image alt text:** "Hawa scooping fresh shea butter into a jar"

He adds a link to the new "How to store shea butter" guide and shrinks the photos. The page now tells a visitor and a search engine exactly what it offers.`,
      practice_task_md: `**Goal:** Optimise one page using your keyword map. This covers the week 7 assignment.

**Steps:**
1. Take the homepage you drafted in week 4, or a real page of your business. A copy in Google Docs or Slides is fine if there is no live site.
2. Write a before and after table for: title, meta description, main heading, opening paragraph, two subheadings, image alt text and one internal link.
3. Use the main keyword from your map in the title, heading and opening, written naturally.
4. Read the new opening aloud. If it sounds odd, rewrite it.
5. Repeat for one blog post or guide page.

**Done looks like:** Two before and after tables with every part filled in, ready to show your mentor.`,
      quiz: {
        questions: [
          {
            prompt: "What does Google's guidance say about page titles?",
            options: [
              "Use the same title on every page",
              "Give every page a unique, descriptive, concise title without keyword stuffing",
              "Titles must be exactly 60 characters",
              "Titles are not shown in search results",
            ],
            answer_index: 1,
            explanation: "The lesson summarises Google's guidance: unique, descriptive and concise titles, no stuffing, no vague labels.",
          },
          {
            prompt: "How do search engines usually build the snippet under a title?",
            options: [
              "Always from the meta description",
              "Mostly from the page's own text, sometimes from the meta description",
              "From the business's social media bio",
              "From the image alt text only",
            ],
            answer_index: 1,
            explanation: "The lesson explains snippets are often built from the page's text and only sometimes from the description.",
          },
          {
            prompt: "Which internal link text is better?",
            options: ["Click here", "Read more", "See our school uniform prices", "Link"],
            answer_index: 2,
            explanation: "Clear link words tell readers and search engines what the linked page is about.",
          },
          {
            prompt: "What should image alt text describe?",
            options: [
              "A list of all the site's keywords",
              "What the image shows",
              "The camera used to take the photo",
              "The file size",
            ],
            answer_index: 1,
            explanation: "The lesson says alt text should say what the image shows.",
          },
          {
            prompt: "Why is repeating a keyword many times a bad idea?",
            options: [
              "It makes the page worse to read and can count against it",
              "Search engines cannot read repeated words",
              "It makes the page load slower",
              "It is the only way to rank",
            ],
            answer_index: 0,
            explanation: "The lesson warns that stuffing a keyword makes a page worse for readers and can count against it.",
          },
        ],
        pass_threshold: 80,
      },
    },

    backlinks: {
      explanation_md: `When another website links to a page, it is a little like a person vouching for it. Search engines use links to discover pages and as one signal of how trusted a page is. Off page SEO, the work that happens away from your own site, is mostly about earning these mentions honestly. It is week 8 of the SEO specialisation and a common topic in SEO job interviews.

## What a backlink is

A backlink is a link on someone else's website that points to your site. A link from a regional tourism guide, a local news story, or a respected NGO partner tells search engines that real organisations know and trust the business. A link from a random site that lists thousands of unrelated businesses tells them very little.

## Quality beats quantity

* **Relevance.** A link from a farming association to an agro input shop makes sense. A link from a betting site does not.
* **Trust.** Links from established, real organisations count for more than links from new, empty sites.
* **Natural placement.** A link inside a genuine article or listing is better than one buried in a list of hundreds.

## Links that break the rules

Google's spam policies describe link spam as creating links mainly to manipulate rankings. Buying or selling links for ranking, swapping goods or services for links, or sending a free product in exchange for a write up with a link all count, unless the link is marked as paid. When a link is paid or sponsored, websites should add a label in the link code, rel="sponsored", or rel="nofollow". Comments and forum posts can use rel="ugc", for user generated content. If anyone offers to sell you "100 backlinks for 50 cedis", say no. It wastes money and can harm the site.

## Honest ways to earn links

* **Be listed where you belong.** Trade associations, chambers of commerce, tourism lists, alumni groups and church or mosque directories.
* **Partners and suppliers.** Ask businesses you already work with to link to you from their partner pages.
* **Local news and community stories.** Sponsoring a school sports day or running a free training can earn a genuine mention.
* **Useful content.** A clear guide, such as "How to choose a solar system for a shop in the north", is something others want to share.
* **Unlinked mentions.** If a site already names the business without a link, politely ask them to add one.

## A worked example

Sumaila manages marketing for an agro input shop in Damongo. He lists every organisation that already knows the shop: two farmer cooperatives, a seed supplier, an NGO that runs farmer training, and a radio station that once interviewed the owner. He finds that the NGO's website mentions the shop by name with no link. He writes a short, friendly email asking them to add the shop's address. That one link from a relevant, trusted partner is worth more than any paid list.`,
      practice_task_md: `**Goal:** Make a list of honest link opportunities for your chosen business.

**Steps:**
1. List every organisation that already knows the business: suppliers, customers that are organisations, associations, schools, churches, mosques, NGOs or media.
2. For each, search its name to see whether it has a website and whether that site already mentions your business.
3. In a sheet, record: organisation, website, already mentions us (yes or no), already links to us (yes or no), and the idea for asking.
4. Mark your three best opportunities and say why each is relevant and trusted.

**Done looks like:** A sheet of at least eight organisations with three clear best opportunities. You will use it in the outreach lesson.`,
      quiz: {
        questions: [
          {
            prompt: "What is a backlink?",
            options: [
              "A link on your own site pointing to another of your pages",
              "A link on someone else's website pointing to your site",
              "A paid ad on a search engine",
              "A broken link on your site",
            ],
            answer_index: 1,
            explanation: "A backlink is a link from another website to yours.",
          },
          {
            prompt: "According to Google's spam policies, which of these is link spam?",
            options: [
              "Being listed by a trade association you belong to",
              "A news story that mentions and links to a business",
              "Paying for links to raise rankings without marking them as paid",
              "A partner linking from its partner page",
            ],
            answer_index: 2,
            explanation: "Buying links for ranking without a sponsored or nofollow label is link spam.",
          },
          {
            prompt: "Which link attribute should a website use for a paid or sponsored link?",
            options: ['rel="ugc"', 'rel="sponsored"', 'rel="home"', "No attribute at all"],
            answer_index: 1,
            explanation: "Paid links should be marked rel=\"sponsored\" (or nofollow).",
          },
          {
            prompt: "What is an \"unlinked mention\" and what should you do about it?",
            options: [
              "A bad review; you should report it",
              "A site names the business without linking; politely ask them to add a link",
              "A link that no longer works; delete your page",
              "A paid listing; ask for a refund",
            ],
            answer_index: 1,
            explanation: "The lesson suggests politely asking sites that already name the business to add a link.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "local-seo": {
      explanation_md: `When someone searches "pharmacy near me" or "chop bar in Bolgatanga", search engines show a map with a few local businesses before the normal results. Local SEO is the work of earning a place there. For most small businesses in northern Ghana, local search brings more customers than any blog post, so it is a skill clients will pay for.

## How local ranking works

Google's Business Profile help explains that local results are based mainly on three things.

* **Relevance.** How well the business profile matches what someone searched. A complete profile with the right category and a clear description helps.
* **Distance.** How far the business is from the searcher, or from the place named in the search. You cannot change this, but an accurate map pin matters.
* **Prominence.** How well known the business is. This includes links from other sites, mentions across the web, and the number of reviews and ratings.

Google also states that there is no way to request or pay for a better local ranking. Good local SEO is about being accurate, complete and genuinely well regarded.

## Name, address and phone, everywhere the same

Customers and search engines check that a business's details match across the web. Pick one exact way to write the business name, address and phone number, often shortened to NAP, and use it everywhere: the website, the Google Business Profile, Facebook, WhatsApp Business, directories and association lists. If one site says "Hawa Shea Ltd" with an old phone number and another says "Hawa's Women's Group" with a new one, people and search engines get confused. Many Ghanaian addresses are informal, so add a landmark ("opposite the Central Mosque") and use the GhanaPost digital address if the business has one.

## Reviews and activity

* **Ask every happy customer for a review,** with a short link sent on WhatsApp after a sale. Never write fake reviews or pay for them.
* **Reply to every review,** thanking good ones and calmly offering to fix problems in bad ones.
* **Keep the profile fresh** with photos, opening hours that match reality, and updates about new stock or events.

## The website's part

Put the full NAP on the website, usually in the footer and on a contact page, with a map and opening hours. If the business serves several towns, a separate, genuinely useful page for each town is better than one page listing every town name.

## A worked example

Wumpini helps a pharmacy in Bolgatanga. She finds four versions of its name online and two phone numbers. She chooses one version, updates the profile, Facebook page and website footer, and asks two directories to correct their listings. She sets the right category, adds photos of the shopfront and a landmark, and starts sending a review link to customers after each visit. Within weeks the profile is complete, consistent and attracting genuine reviews.`,
      practice_task_md: `**Goal:** Run a simple local SEO check for your chosen business.

**Steps:**
1. Search the business name and note every place it appears: profile, social pages, directories, association lists.
2. In a sheet, record the name, address and phone number exactly as each place shows them.
3. Highlight every difference, and write the one correct version the business should use.
4. Check the Google Business Profile, if any, for category, hours, photos, description and how many reviews have replies.
5. Write a short WhatsApp message the owner can send customers asking for an honest review.

**Done looks like:** A NAP consistency sheet, a list of profile fixes, and a review request message.`,
      quiz: {
        questions: [
          {
            prompt: "Which three factors does Google say mainly decide local results?",
            options: [
              "Price, speed and colour",
              "Relevance, distance and prominence",
              "Ad budget, followers and posts",
              "Age of the business, logo and website design",
            ],
            answer_index: 1,
            explanation: "Google's Business Profile help names relevance, distance and prominence.",
          },
          {
            prompt: "Can a business pay Google for a better local ranking?",
            options: [
              "Yes, through a monthly fee",
              "Yes, by buying reviews",
              "No, Google states there is no way to request or pay for a better local ranking",
              "Only if it also runs ads",
            ],
            answer_index: 2,
            explanation: "The lesson quotes Google's statement that local ranking cannot be requested or bought.",
          },
          {
            prompt: "What does NAP consistency mean?",
            options: [
              "Posting at the same time every day",
              "Using the same name, address and phone number everywhere the business appears",
              "Having a nap in the afternoon to stay creative",
              "Using the same photo on every platform",
            ],
            answer_index: 1,
            explanation: "NAP stands for name, address and phone, which should match everywhere.",
          },
          {
            prompt: "Which review practice does the lesson recommend?",
            options: [
              "Write a few reviews yourself to get started",
              "Pay customers for five star reviews",
              "Ask happy customers for honest reviews and reply to every review",
              "Delete the profile if a bad review appears",
            ],
            answer_index: 2,
            explanation: "Ask genuine customers, never fake or pay, and reply to every review.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "listings-and-outreach": {
      explanation_md: `Knowing where a business should be mentioned is only half the job. Someone still has to ask. The week 8 assignment asks you to find three local directories or blogs where your business could be listed and to draft outreach emails. This lesson teaches both parts, and the outreach skill transfers to influencer work, partnerships and sales.

## Where to look for listings

* **Directories that real people use.** Local business directories, tourism lists, hotel and restaurant guides, and industry lists such as an agro dealers' association or a tailors' association.
* **Membership bodies.** Chambers of commerce, trade associations, professional bodies and business networks often list their members online.
* **Community and faith organisations.** Church, mosque, school and alumni websites sometimes list supporters or members' businesses.
* **Local blogs and news.** Sites that write about food, events, travel or business in your region.
* **Partners.** Suppliers, NGOs and customers that are organisations.

Before you add a site to your list, check three things. Is it real and active, with recent updates? Is it relevant to the business or the area? Does it look trustworthy, without pages full of unrelated links or adverts for dubious products? Skip any site that asks for payment just to add a link with no real audience.

## The shape of a good outreach email

People are busy, so keep it short and about them.

1. **A clear subject line,** such as "Listing request: Amina's Tailoring, Wa".
2. **Who you are,** in one sentence.
3. **Why this fits them,** showing you know their site or audience.
4. **The exact request,** with everything they need: business name, address, phone, website and a two line description.
5. **A thank you and an easy way to reply.**

Always use the same NAP you agreed in the local SEO lesson. Follow up once, politely, about a week later if there is no answer, and then stop.

## A worked example

Rahinatu helps a guesthouse in Nalerigu. She finds a regional tourism blog that lists places to stay near the Nalerigu Defence Wall, an NGO that hosts visiting researchers, and a church that publishes a list of places for wedding guests to stay.

Her email to the blog reads:

> Subject: Place to stay near the Nalerigu Defence Wall
>
> Hello Adisa, I enjoyed your guide to visiting the Nalerigu Defence Wall. I help Napari Guesthouse, a ten minute walk from the wall, with clean rooms and mobile money payment. Would you consider adding it to your list of places to stay? Details: Napari Guesthouse, opposite the district assembly, Nalerigu, 024 000 0000. Thank you for helping visitors find their way.
>
> Rahinatu

It is short, specific and easy to say yes to.`,
      practice_task_md: `**Goal:** Complete the week 8 assignment: three listing opportunities and three outreach emails.

**Steps:**
1. From your backlink sheet and fresh searches, choose three real, active and relevant sites: at least one directory or association and one local blog or news site.
2. For each, note why it fits and who to contact.
3. Draft one email per site using the five part shape in the lesson. Keep each under 120 words.
4. Use the exact NAP from your local SEO sheet.
5. Show the drafts to the business owner before anything is sent.

**Done looks like:** A short table of three sites with reasons, plus three ready to send emails approved by the owner.`,
      quiz: {
        questions: [
          {
            prompt: "Which site should you skip when looking for listings?",
            options: [
              "An active regional tourism blog",
              "A trade association that lists its members",
              "A site that charges just to add a link and has pages full of unrelated links",
              "A partner NGO's website",
            ],
            answer_index: 2,
            explanation: "The lesson says to skip sites that charge for a link with no real audience or are full of unrelated links.",
          },
          {
            prompt: "What should an outreach email include in its request?",
            options: [
              "Only a link to the business's Facebook page",
              "Everything the site needs: name, address, phone, website and a short description",
              "A long history of the business",
              "A demand for a reply within one day",
            ],
            answer_index: 1,
            explanation: "Make the request easy by giving all the details they need.",
          },
          {
            prompt: "How many follow ups does the lesson suggest if there is no reply?",
            options: ["None", "One polite follow up about a week later", "One every day until they reply", "Three in the first week"],
            answer_index: 1,
            explanation: "Follow up once, politely, about a week later, then stop.",
          },
          {
            prompt: "Why did Rahinatu's email work well?",
            options: [
              "It was long and detailed about the guesthouse's history",
              "It was short, specific, showed she knew the blog, and was easy to say yes to",
              "It offered money for the listing",
              "It was sent to many blogs at once with the same greeting",
            ],
            answer_index: 1,
            explanation: "The lesson highlights that the email was short, specific and easy to agree to.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "content-pillars": {
      explanation_md: `Publishing random posts whenever there is time rarely builds search traffic. Strong sites organise content around a few big topics they know deeply. This is week 9 of the SEO specialisation, advanced content strategy, and it is the thinking content marketers use to plan months of work.

## Pillars and clusters

A **content pillar** is a broad topic central to the business, covered on one main page. A **cluster** is a group of smaller pages that each answer one specific question within that topic, and link back to the pillar page. The pillar links out to each cluster page too.

For a solar installer in Tamale, one pillar might be "Solar power for homes in northern Ghana". Its cluster pages could include:

* How big a solar system do I need for a fan, fridge and lights?
* Battery types explained simply
* How to keep solar panels working through the harmattan dust
* Paying for solar in instalments with mobile money

This structure helps readers, who can move from the big picture to the detail they need. It also helps search engines see that the site covers the subject thoroughly, which supports the idea of a reliable source.

## Choosing pillars

Good pillars sit where three things meet:

* **What customers care about,** from your keyword research and their questions.
* **What the business genuinely knows,** from experience, not guesswork.
* **What leads to sales,** so the content eventually helps people buy.

Most small businesses need only two to four pillars. More than that and the work spreads too thin.

## Experience and trust

Google's guidance on helpful content mentions experience, expertise, authoritativeness and trustworthiness, with trust as the most important. In practice for a small Ghanaian business, that means showing real experience: photos of your own installations, the name of the person who wrote the guide and their background, honest prices, and accurate advice. It also means being clear when AI tools helped write something and checking every fact. Content about health, money or safety needs extra care.

## Refresh as well as create

Old content does not have to be thrown away. Update prices, add new questions customers ask and fix broken links. A refreshed page that is genuinely improved is often worth more than a new one. Never just change the date to look new.

## A worked example

Zakaria plans content for the Tamale solar installer. His keyword map shows many learning questions about system size, batteries and dust. He picks two pillars: "Solar for homes" and "Solar for shops". Under each he lists six cluster pages, each mapped to one keyword. He notes which installer will provide photos and checks each fact with the technician. The installer now has a clear list of what to publish and why.`,
      practice_task_md: `**Goal:** Design two content pillars with clusters for your business.

**Steps:**
1. From your keyword map, group the learning questions into broad topics.
2. Choose two pillars using the three tests: customers care, the business knows, it leads to sales.
3. For each pillar, list four to six cluster pages, each with one main keyword.
4. Draw the links as a simple diagram on paper or in Google Slides: pillar in the middle, clusters around it.
5. For each cluster page, note what real experience the business can show, such as photos or a named expert.

**Done looks like:** A one page pillar and cluster diagram with keywords and proof of experience for each page.`,
      quiz: {
        questions: [
          {
            prompt: "What is a content pillar?",
            options: [
              "A single social media post",
              "A broad topic central to the business, covered on one main page",
              "A paid advert",
              "A list of every keyword on the site",
            ],
            answer_index: 1,
            explanation: "A pillar is a broad topic on one main page, with cluster pages around it.",
          },
          {
            prompt: "How do pillar and cluster pages connect?",
            options: [
              "They do not link to each other",
              "Cluster pages link back to the pillar and the pillar links out to each cluster",
              "Only the home page links to them",
              "They link only to competitor sites",
            ],
            answer_index: 1,
            explanation: "The lesson describes links in both directions between pillar and clusters.",
          },
          {
            prompt: "Which three tests does the lesson give for choosing a pillar?",
            options: [
              "Cheapest, fastest, longest",
              "Customers care about it, the business genuinely knows it, and it leads to sales",
              "Trending, funny and short",
              "Competitors use it, it has many keywords, it is new",
            ],
            answer_index: 1,
            explanation: "Good pillars sit where customer interest, real knowledge and sales meet.",
          },
          {
            prompt: "Which of these is the lesson's advice on refreshing old content?",
            options: [
              "Change the date so it looks new",
              "Delete all old pages every year",
              "Genuinely improve it with updated prices, new questions and fixed links",
              "Copy a competitor's newer page",
            ],
            answer_index: 2,
            explanation: "Refresh by genuinely improving content, never by only changing the date.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "faqs-and-multimedia": {
      explanation_md: `Customers ask the same questions again and again: How much? Do you deliver? Can I pay with mobile money? Is it open on Sunday? Each repeated question is a ready made piece of content. Turning those questions into clear answers, supported by images and short videos, is one of the most useful things a content marketer can do for a small business.

## FAQ pages that work

* **Use real questions,** in the customer's own words, from WhatsApp chats, calls, comments and reviews.
* **Answer directly first,** in one or two sentences, then add detail. "Yes, we deliver within Tamale the same day for orders before noon."
* **Group questions** under simple headings such as Ordering, Payment and Delivery.
* **Keep answers current.** A wrong price or old opening time hurts trust.
* **Link onwards** to the full guide or the order page when an answer needs more.

If a question needs a long answer, give it its own page and link to it from the FAQ. That longer page can become part of a content cluster.

## Images for search

Search engines cannot see a picture the way people do, so they rely on clues. Google's image guidance points to things you can control:

* Place images near the text that relates to them.
* Use descriptive file names, such as "pure-shea-butter-jar.jpg" rather than "IMG_2041.jpg".
* Write alt text that describes the image for someone who cannot see it.
* Use good quality images, but compress them so they load fast on mobile data.

## Video for search

Short videos can appear in search results, especially for "how to" questions. Help them be found:

* **Give each video its own clear title and description** using the question it answers.
* **Add captions or a transcript,** which helps viewers watching without sound and gives search engines text to read.
* **Embed the video on a relevant page** of the website as well as posting it on a video platform, with text around it explaining what it shows.

## Multimedia without heavy data

Many of your customers pay for data by the bundle. Keep videos short, offer a text summary, and avoid pages that load several videos at once. A thirty second clip that answers one question is often more useful than a long one.

## A worked example

Ayishetu runs a small catering business in Wa. She collects ten questions from her WhatsApp chats about menu prices, minimum orders, delivery and payment. She writes an FAQ page with direct answers and a guide called "How to plan food for a naming ceremony", with a photo of a real event and a short video showing how dishes are packed for transport. Customers start sending her the FAQ link instead of asking, and she spends less time repeating herself.`,
      practice_task_md: `**Goal:** Create an FAQ and one multimedia item for your business.

**Steps:**
1. Collect at least eight real questions customers ask, in their own words.
2. Group them under two or three headings and write a direct one or two sentence answer to each.
3. Choose one question that deserves its own page and outline that page.
4. Take or choose one photo for that page. Write a descriptive file name and alt text.
5. Optional: record a video of 30 seconds or less answering one question, and write its title, description and caption text.

**Done looks like:** An FAQ draft of at least eight questions, an outline for one longer page, and one image with file name and alt text.`,
      quiz: {
        questions: [
          {
            prompt: "Where should FAQ questions come from?",
            options: [
              "Questions the marketer imagines",
              "Real questions customers ask, in their own words",
              "A competitor's FAQ copied word for word",
              "Only the business owner's favourite topics",
            ],
            answer_index: 1,
            explanation: "The lesson says to use real questions in the customer's own words.",
          },
          {
            prompt: "How should an FAQ answer start?",
            options: [
              "With a long story about the business",
              "With a direct answer in one or two sentences",
              "With a link to another site",
              "With a list of keywords",
            ],
            answer_index: 1,
            explanation: "Answer directly first, then add detail.",
          },
          {
            prompt: "Which image file name is better for search?",
            options: ["IMG_2041.jpg", "photo1.jpg", "pure-shea-butter-jar.jpg", "final-final-2.jpg"],
            answer_index: 2,
            explanation: "A descriptive file name gives search engines a clue about what the image shows.",
          },
          {
            prompt: "Why does the lesson recommend captions or a transcript for videos?",
            options: [
              "They make the video longer",
              "They help people watching without sound and give search engines text to read",
              "They are required by law in Ghana",
              "They stop people sharing the video",
            ],
            answer_index: 1,
            explanation: "Captions help viewers without sound and give search engines readable text.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "seo-strategy-plan": {
      explanation_md: `A strategy turns a pile of good ideas into a plan someone can approve and follow. The week 9 assignment asks for a one page SEO strategy presented in Google Slides, built on a content calendar that covers blogs, FAQs and multimedia. This is the kind of document a junior SEO or content marketer hands to a manager or client.

## The content calendar

Your calendar lists what will be published, when, by whom, and why. Use a sheet with these columns:

* **Date** for publishing.
* **Title** of the page or post.
* **Type:** guide, FAQ update, product page, photo set or short video.
* **Pillar** it belongs to.
* **Main keyword** from your map.
* **Owner:** who writes, photographs or films it.
* **Status:** idea, drafting, ready, published.
* **Promotion:** where it will be shared, such as WhatsApp Status, a Facebook post or an email.

Plan around real life. Shea butter guides make sense before the harmattan; school uniform pages before the new term; catering guides before the wedding and festival seasons. Be realistic: one excellent page a fortnight, kept up, beats ten planned pages that never appear.

## Measuring progress

You cannot control rankings directly, so measure several signals over time.

* **Google Search Console,** a free tool for site owners, shows which searches the site appeared for, how often, and how many people clicked. You need access to the website to set it up.
* **Analytics,** such as Google Analytics, shows visits and actions on the site.
* **Business signals:** WhatsApp enquiries that mention finding the business on search, calls from the profile, and direction requests.

Give SEO time. New pages can take weeks or months to settle, so report trends, not single days.

## The one page strategy

Fit your strategy on one slide or page with five parts:

1. **Goal.** One business result, such as more delivery orders in Tamale.
2. **Audience and keywords.** Who you are targeting and your main keywords.
3. **On site work.** The pages you will improve or create.
4. **Off site work.** Listings, links and reviews you will pursue.
5. **Content and measurement.** Your pillars, how often you will publish, and the signals you will track.

## A worked example

Issahaku's strategy for Mariama's Tamale guesthouse reads, in short: Goal, more direct bookings from travellers. Keywords, guesthouse in Tamale and related phrases. On site, a rewritten home page, a rooms page and an FAQ. Off site, three tourism and NGO listings and a review request after each stay. Content, one guide a fortnight on visiting the north, with photos. Measure, Search Console clicks, direct booking enquiries and new reviews, checked monthly.`,
      practice_task_md: `**Goal:** Complete the week 9 assignment: a content calendar and a one page SEO strategy.

**Steps:**
1. In Google Sheets, build a calendar for the next eight weeks using the columns in the lesson. Include at least one guide, one FAQ update and one multimedia item.
2. Link each calendar item to a pillar and a main keyword from your earlier work.
3. In Google Slides, create one slide with the five parts: goal, audience and keywords, on site work, off site work, content and measurement.
4. Rehearse presenting it in two minutes.

**Done looks like:** An eight week calendar and a one slide strategy you can present to your mentor. This is a strong portfolio piece.`,
      quiz: {
        questions: [
          {
            prompt: "Which column helps you check that each calendar item supports your SEO plan?",
            options: ["The colour of the post", "The main keyword from your map", "The number of likes", "The author's favourite day"],
            answer_index: 1,
            explanation: "Linking every item to a main keyword and a pillar keeps the calendar tied to the strategy.",
          },
          {
            prompt: "What does Google Search Console show?",
            options: [
              "Which searches the site appeared for, how often, and how many people clicked",
              "Your competitors' passwords",
              "How much a competitor spends on ads",
              "Only the number of social media followers",
            ],
            answer_index: 0,
            explanation: "Search Console is a free tool that shows search appearances and clicks for your site.",
          },
          {
            prompt: "Why should SEO progress be reported as trends rather than single days?",
            options: [
              "Because rankings never change",
              "Because new pages can take weeks or months to settle",
              "Because reports must be long",
              "Because search engines only update once a year",
            ],
            answer_index: 1,
            explanation: "The lesson says to give SEO time and report trends.",
          },
          {
            prompt: "What does the lesson say about publishing frequency?",
            options: [
              "Publish ten pages a week no matter what",
              "One excellent page a fortnight, kept up, beats many planned pages that never appear",
              "Publish only once a year",
              "Frequency does not matter at all",
            ],
            answer_index: 1,
            explanation: "Be realistic and consistent rather than planning more than you can deliver.",
          },
        ],
        pass_threshold: 75,
      },
    },
  },
};

export default content;
