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
      outcomes: [
        "Describe what the SEO and content specialisation covers",
        "Explain how search engines crawl, index and rank pages",
        "Name what Google Search Console shows a site owner",
        "Choose the business you will work on",
      ],
      explanation_md: `Search engine optimisation, or SEO, is the work of helping a business appear when people search for what it sells. A paid ad stops the moment the money stops. A well made page can keep bringing visitors for months or years. That is why small businesses, schools, hotels and NGOs in Ghana value someone who can make their website easier to find, and why SEO and content skills appear in many junior marketing job descriptions.

## What this specialisation covers

You already met the basics of search in the Digital Marketer roadmap. Here you go deeper over three weeks, with three or four lessons in each.

* **Week 7, keywords and pages.** Keyword research with free tools, search intent and keyword mapping, and on page SEO. The assignment is to optimise the homepage and blog post you drafted in week 4.
* **Week 8, links and local search.** Backlinks and trust, local SEO, and finding local listings with polite outreach emails.
* **Week 9, content strategy.** Content pillars and topic clusters, FAQs with images and video, and a content calendar with a one page strategy you present in Google Slides.

## How search engines decide

A search engine has three jobs. It **crawls** the web by following links to discover pages. It **indexes** those pages by storing what each one is about. When someone searches, it **ranks** the pages it thinks best answer that search. You cannot pay a search engine to rank higher in the normal results. You can only make pages that are easy to discover, easy to understand and genuinely useful.

Each job can fail in its own way, and part of your work is spotting which one. A page nobody links to, not even the site's own menu, may never be crawled. A page that is crawled can still be left out of the index if it is a near copy of another page, if it is blocked by a setting the developer added, or if it offers little of value. A page that is indexed can rank poorly because a better answer exists. When a client says "we are not on Google", ask which of the three is the problem before you change anything.

Two simple files help crawling. A **sitemap** lists the pages a site wants found, and most website builders create one automatically. A **robots.txt** file tells crawlers which parts of a site not to visit. You rarely need to edit either at this level, but you should know they exist so you can ask the developer the right questions.

## Helpful content first

Google says plainly that its systems try to reward helpful, reliable content written for people, not content made mainly to attract search visits. Keep that idea at the centre of everything in this specialisation. Every technique you learn is a way to make a useful page easier to find, never a trick to fool the system. Tricks that once worked, such as hiding keywords in white text or copying other sites, now break Google's spam policies and can push a site out of the results.

## Your measuring tool: Google Search Console

**Google Search Console** is a free tool from Google for people who own or manage a website. Once the owner proves the site is theirs, it shows:

* which searches the site appeared for, how often, and how many people clicked, in the Performance report;
* which pages are in Google's index and which were left out, with a reason;
* a URL Inspection tool that checks one page and lets you ask Google to crawl it again after you improve it.

You need the owner's permission to be added as a user. You will use Search Console data in week 9 to measure progress, so ask your business early whether they have it.

## How SEO is judged

SEO takes patience. New or improved pages can take weeks to be crawled again and longer to settle in the rankings. Promise a careful process and honest reports, never "first place on Google", which nobody can guarantee.

## What you will be able to show

By the end you will have a keyword map, two optimised pages, a short list of local listing opportunities with outreach emails, and a one page SEO strategy. Together they make a strong portfolio piece and the core of your week 12 capstone if you choose this path.`,
      workedExample_md: `Mariama runs a guesthouse in Tamale with a simple website. Visitors keep asking her on WhatsApp the same things: how far it is from the airport, whether rooms have air conditioning, and whether she accepts mobile money. Her nephew Issahaku is taking the SEO specialisation and offers to help.

1. **He searches her business name.** The site appears, so it is crawled and indexed. Her Google Business Profile has no photos.
2. **He searches "guesthouse in Tamale".** Her site is nowhere on the first page. The problem is ranking, not crawling.
3. **He reads her home page.** It has a photo, a phone number and the word "Welcome". Nothing tells a traveller or a search engine what she offers.
4. **He asks about Search Console.** Mariama has never set it up, so he notes it as a task for the person who built her site.
5. **He sketches a three week plan.** Week 7: research what travellers search and rewrite the home page around "guesthouse in Tamale". Week 8: ask the local tourism association to list her. Week 9: write an FAQ page answering the questions guests already ask her on WhatsApp.

Nothing here costs money. Each step makes the site more useful to a traveller, which is exactly what search engines want to show.`,
      keyTerms: [
        { term: "Crawling", definition: "A search engine following links to discover pages on the web." },
        { term: "Indexing", definition: "Storing what each discovered page is about so it can be shown for searches." },
        { term: "Ranking", definition: "Ordering indexed pages for a search by how well they seem to answer it." },
        { term: "Sitemap", definition: "A file that lists the pages a site wants search engines to find." },
        { term: "Google Search Console", definition: "Google's free tool that shows a site owner search appearances, clicks and indexing problems." },
      ],
      commonMistakes: [
        "Promising a client first place on Google, which nobody can guarantee",
        "Changing page text when the real problem is that the page is not indexed at all",
        "Choosing a business you cannot contact, so you cannot check facts or get approval",
        "Treating SEO as tricks instead of making pages genuinely useful",
      ],
      selfCheck: [
        "Can you explain the difference between a page that is not indexed and a page that ranks poorly?",
        "What three things does Search Console show a site owner?",
        "Why does SEO take longer to show results than a paid ad?",
      ],
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
            options: [
              "Rank, crawl, index",
              "Index, advertise, rank",
              "Crawl, index, rank",
              "Crawl, advertise, index",
            ],
            answer_index: 2,
            explanation: "A search engine crawls to discover pages, indexes them to store what they are about, then ranks them for each search.",
          },
          {
            prompt: "According to the lesson, how can a business rank higher in the normal search results?",
            options: [
              "By making pages that are easy to discover, easy to understand and genuinely useful",
              "By paying the search engine a monthly fee",
              "By repeating its main keyword as many times as possible in every heading and paragraph",
              "By posting more often on social media",
            ],
            answer_index: 0,
            explanation: "The lesson says you cannot pay to rank in normal results; you make useful pages that are easy to find and understand.",
          },
          {
            prompt: "Why does a well made page often keep bringing visitors after a paid ad has stopped?",
            options: [
              "Because search engines charge less for each visit as a page gets older and more popular",
              "Because ads are not allowed in Ghana",
              "Because old pages are always ranked first",
              "Because a ranking page keeps appearing in results without a payment for each visit",
            ],
            answer_index: 3,
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
          {
            prompt: "Which tool does the lesson name for checking which searches a site appeared for and which pages are indexed?",
            options: [
              "Google Trends",
              "Google Search Console",
              "Google Keyword Planner",
              "Google Analytics",
            ],
            answer_index: 1,
            explanation: "Search Console shows search appearances, clicks and index status for a site the owner has verified.",
          },
        ],
        pass_threshold: 80,
      },
    },

    "keyword-research": {
      outcomes: [
        "Explain head and long tail keywords and common modifiers",
        "Find keywords with free tools and customers' own words",
        "Prioritise keywords by relevance, intent and competition",
        "Record a keyword shortlist",
      ],
      explanation_md: `Every search starts with words. If a business describes itself one way and customers search another way, the business stays invisible. A junior SEO or content marketer is often asked first to find out which words real customers use. Week 7 asks you to do exactly this for your business, and you can do it well with free tools and a little patience.

## What a keyword is

A keyword is any word or phrase someone types or speaks into a search box. "Shea butter" is a short, broad keyword, often called a **head term**. "Where to buy pure shea butter in Tamale" is a longer, more specific one, often called a **long tail keyword**. Longer phrases are searched less often, but the people typing them usually know exactly what they want, and fewer businesses compete for them. For a small local business, these longer phrases are often the best place to start.

## Modifiers tell you a lot

The extra words around a product name show what the searcher wants.

* **Place words:** "in Tamale", "near me", "Bolga". The person wants something nearby.
* **Buying words:** price, order, buy, delivery, wholesale. The person is close to buying.
* **Question words:** how, what, why, can I. The person wants to learn first.
* **Comparison words:** best, cheap, versus, review. The person is choosing.
* **Language and spelling variety:** Ghanaians search "kenkey" and "dokon", "Bolga" and "Bolgatanga", "chop bar" and "local restaurant". Collect every version you hear.

## Free ways to find keywords

* **Search suggestions.** Start typing a phrase into a search engine and read the suggestions that drop down. They come from what people actually search. Try adding letters after your phrase, such as "shea butter a", "shea butter b", to see more.
* **Related searches and questions.** At the bottom of a results page, and in boxes that list common questions, you will find more phrases people use.
* **Google Trends.** Compare two or three phrases to see which is searched more and how interest changes through the year, for example in the harmattan or before Christmas. You can set the country to Ghana. Trends shows relative interest, not exact numbers, and very small local phrases may show no data at all.
* **Your customers.** Read WhatsApp chats, comments and reviews. The exact words customers use are often the best keywords of all.
* **Competitors.** Look at the page titles and headings of businesses that already appear for your phrases.
* **Search Console,** if the site already has it, lists the real searches the site appeared for. These are gold, because they are your own customers' words.

Keyword Planner inside Google Ads gives search volume estimates, but it needs a Google Ads account with billing details completed, so this lesson does not depend on it. Never add payment details just to practise.

## Prioritising without exact numbers

You will not have exact search volumes, and you do not need them. Score each keyword on four questions instead.

1. **Relevance.** Does the business truly offer this? If not, drop it.
2. **Intent.** Is the searcher ready to buy, still learning, or looking for one business?
3. **Competition.** Search it. If the first page is full of national sites and big brands, a small business will struggle. If it shows small local sites, you have a chance.
4. **Business value.** Would a visitor from this search be worth a lot to the business? A wholesale buyer of shea butter is worth more than one jar.

Give each a simple high, medium or low and start with keywords that score high on relevance and value and low on competition.

## Recording what you find

Keep a simple sheet with columns for the keyword, where you found it, head or long tail, intent, competition and value. Do not chase exact numbers. Your aim is a shortlist of phrases that real customers use and that the business can honestly answer.`,
      workedExample_md: `Fuseini helps a tailor in Wa called Amina. He wants a keyword shortlist for her week 7 pages.

1. **Seed phrases.** He writes "tailor in Wa", "kaba and slit" and "school uniform".
2. **Suggestions.** Typing "tailor in Wa" shows "tailor in Wa for kaba" and "school uniform tailor Wa". Related searches show "smock sewing near me".
3. **Customers' words.** Amina's WhatsApp messages say "sew my kaba and slit" and "batakari for wedding". He adds both.
4. **Competition check.** "School uniform tailor Wa" shows map listings and two small local pages, so a small business can compete. "Kaba styles" shows big national fashion sites, so he marks it high competition.
5. **Scoring.** He rates every phrase high, medium or low for relevance, intent, competition and value.
6. **Shortlist.** He keeps eight phrases. Three show buying intent, such as "school uniform tailor Wa". Three are questions, such as "how much fabric for kaba and slit". Two are about the batakari, a strong local product.

He now knows what Amina's pages should talk about, without paying for any tool.`,
      keyTerms: [
        { term: "Keyword", definition: "A word or phrase someone types or speaks into a search box." },
        { term: "Head term", definition: "A short, broad keyword such as \"shea butter\", searched often and highly competitive." },
        { term: "Long tail keyword", definition: "A longer, specific phrase searched less often but showing clearer intent." },
        { term: "Modifier", definition: "An extra word such as price, near me or how that shows what the searcher wants." },
        { term: "Seed phrase", definition: "A starting phrase that describes the business, used to find more keywords." },
        { term: "Google Trends", definition: "A free Google tool showing relative interest in searches over time and by place." },
      ],
      commonMistakes: [
        "Chasing the biggest head term when a small business cannot compete for it",
        "Ignoring the words customers actually use in messages and reviews",
        "Treating Google Trends figures as exact search numbers",
        "Adding payment details to an ads account just to see keyword volumes",
        "Keeping keywords for things the business does not offer",
      ],
      selfCheck: [
        "Name three modifiers and what each tells you about a searcher.",
        "How can you judge competition for a keyword without a paid tool?",
        "Which four questions help you prioritise keywords?",
      ],
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
              "Search engines only show small local businesses when someone types a long, specific phrase",
              "They are free while short phrases cost money",
            ],
            answer_index: 1,
            explanation: "The lesson says longer phrases are searched less but show clear intent and face less competition.",
          },
          {
            prompt: "Where do search box suggestions come from?",
            options: [
              "Random words chosen by the search engine",
              "Paid advertisers only",
              "The business's own website",
              "What people actually search",
            ],
            answer_index: 3,
            explanation: "The lesson explains that suggestions come from what people actually search.",
          },
          {
            prompt: "Why does this lesson not depend on Keyword Planner?",
            options: [
              "It needs a Google Ads account with billing details completed",
              "It only works for businesses outside Ghana that sell to customers abroad",
              "It shows no keyword ideas at all",
              "It has been closed down",
            ],
            answer_index: 0,
            explanation: "Keyword Planner sits inside Google Ads and needs an account with billing details completed.",
          },
          {
            prompt: "In the example, where did Fuseini find phrases like \"sew my kaba and slit\"?",
            options: [
              "In Google Trends",
              "In a paid keyword tool",
              "In Amina's WhatsApp messages from customers",
              "On a competitor's price list pinned at the market",
            ],
            answer_index: 2,
            explanation: "He read Amina's customer messages, which the lesson says are often the best source of keywords.",
          },
          {
            prompt: "You search a keyword and the first page shows only small local business sites. What does the lesson say this suggests?",
            options: [
              "The keyword has no searches at all",
              "A small business has a chance to compete for it",
              "Only big brands can rank for it, so you should drop it from your list",
              "The keyword must be paid for with ads",
            ],
            answer_index: 1,
            explanation: "The lesson's competition check says a first page of small local sites means a small business has a chance.",
          },
        ],
        pass_threshold: 80,
      },
    },

    "search-intent": {
      outcomes: [
        "Recognise four common kinds of search intent",
        "Read the results page to confirm intent",
        "Spot pages competing for the same keyword",
        "Turn a shortlist into a keyword map",
      ],
      explanation_md: `Two people can type almost the same words and want very different things. Search engines try hard to work out what each searcher wants, and they show the kind of page that fits. If your page does not match that want, it will struggle no matter how many times it uses the keyword. Matching intent is a core skill employers look for in content and SEO roles, and it decides which page you optimise in the week 7 assignment.

## Four common kinds of intent

* **Learn.** The searcher wants information, such as "how to store shea butter". A helpful article or guide fits.
* **Find a particular place or site.** The searcher already knows the business, such as "Hawa shea butter Tamale". The home page or a Google Business Profile fits.
* **Compare.** The searcher is choosing, such as "best guesthouse near Tamale airport". A page with clear facts, photos and reviews fits.
* **Act or buy.** The searcher is ready, such as "order shea butter delivery Tamale". A product or service page with price and how to pay fits.

## Let the results teach you

The quickest way to check intent is to search the keyword and look at what already ranks. If the top results are all guides, searchers want to learn. If they are all shop pages or maps, searchers want to buy or visit. Search engines have already studied millions of searches, so the results page shows you what people expect.

Look at more than the blue links. The results page often includes extra features, and each one is a clue:

* **A map with local businesses** means people want somewhere nearby. Local SEO and a Business Profile matter most.
* **A box of common questions** means people are still learning. A guide or FAQ can earn a place.
* **Videos near the top** mean people want to be shown, not told. A short video could help.
* **Shopping results with prices** mean people are ready to buy a product.

## Mixed intent

Some searches carry more than one intent. "Shea butter Tamale" might come from a tourist wanting to buy a jar, a trader looking for wholesale supply, or a student researching the shea industry. When the results page mixes guides, shops and maps, the search has mixed intent. Serve the intent that matters most to the business, usually the buying one, and make sure the page also links to a guide for the learners.

## Keyword mapping

A keyword map gives every important keyword one home page on the site. Each page should have one main keyword plus a few close variations that share the same intent. Two problems disappear when you do this:

* **Pages competing with each other.** If three pages all try to rank for "school uniforms Wa", none of them is clearly the best answer. SEO people call this cannibalisation. The fix is to choose the strongest page, make it the home for that keyword, and change or merge the others.
* **Keywords with no home.** If nobody wants a page for "kaba and slit prices", you discover that the site needs a new page.

Your map has columns for the page (existing or new), the main keyword, supporting keywords, intent, and the one action you want the visitor to take.

## Mapping an existing site

When a site already exists, start from what is there. List every page with its current title and what it is really about. Then place your keywords against those pages first, and only create new pages for keywords that fit nowhere. This saves the owner work and keeps any page that already ranks. If an old page already gets visits from search, improve it rather than replacing it, because a brand new page starts from nothing.

## Why this matters for the assignment

The week 7 assignment asks you to optimise a homepage and a blog post. Your map tells you which keyword each one should own. The homepage usually takes the main "find" or "buy" keyword, such as "tailor in Wa". A blog post usually takes a "learn" keyword, such as "how much fabric for kaba and slit", and links to the page where people can order.`,
      workedExample_md: `Fuseini takes his eight keyword shortlist for Amina the tailor in Wa and turns it into a map.

1. **He checks the results for each keyword.** "How much fabric for kaba and slit" shows guides and videos, so intent is learn. "School uniform tailor Wa" shows a map and business listings, so intent is buy or visit.
2. **He lists Amina's existing pages.** She has a home page and a contact page. Nothing else.
3. **He finds cannibalisation.** Both existing pages repeat "tailor in Wa" in their titles. He makes the home page the one home for that keyword and retitles the contact page "Visit or call Amina's Tailoring".
4. **He maps the home page.** Main keyword "tailor in Wa", supporting "kaba and slit tailor Wa". Action: message on WhatsApp.
5. **He adds two new pages.** "School uniforms" takes "school uniform tailor Wa". A guide, "How much fabric do I need for kaba and slit?", answers the learning question and links to the order page.

Each page now has one clear job, and Fuseini knows that the guide will be the blog post he optimises for the week 7 assignment.`,
      keyTerms: [
        { term: "Search intent", definition: "What a searcher actually wants: to learn, find a place, compare or act." },
        { term: "Results page", definition: "The page of results a search engine shows, including maps, questions and videos." },
        { term: "Mixed intent", definition: "A search that different people make for different reasons." },
        { term: "Keyword map", definition: "A plan that gives each important keyword one home page on the site." },
        { term: "Cannibalisation", definition: "Several pages on one site competing for the same keyword so none clearly wins." },
      ],
      commonMistakes: [
        "Writing a sales page for a keyword where the results show only guides",
        "Letting several pages target the same keyword",
        "Replacing an old page that already gets search visits instead of improving it",
        "Guessing intent instead of searching the keyword and reading the results",
      ],
      selfCheck: [
        "What does a map at the top of the results tell you about a keyword?",
        "How would you fix two pages that both target \"school uniforms Wa\"?",
        "Which keyword should a homepage usually own, and which should a blog post own?",
      ],
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
            options: [
              "Learn",
              "Find a particular site",
              "Compare",
              "Act or buy",
            ],
            answer_index: 3,
            explanation: "Words like order and delivery show the person is ready to act or buy.",
          },
          {
            prompt: "What is the quickest way the lesson suggests to check a keyword's intent?",
            options: [
              "Ask the business owner",
              "Count how many words the keyword has",
              "Search the keyword and look at what kinds of pages already rank",
              "Check how many times competitors use the keyword on their home pages",
            ],
            answer_index: 2,
            explanation: "The results page shows what searchers expect, so you look at what already ranks.",
          },
          {
            prompt: "What problem does a keyword map prevent when three pages all target \"school uniforms Wa\"?",
            options: [
              "The pages compete with each other so none is clearly the best answer",
              "The site loads too slowly",
              "The keyword becomes too expensive because each page bids against the others",
              "The pages stop appearing on phones",
            ],
            answer_index: 0,
            explanation: "Giving each keyword one home page stops pages competing with each other.",
          },
          {
            prompt: "In a keyword map, how many main keywords should each page usually have?",
            options: [
              "None",
              "One main keyword plus a few close variations",
              "As many as possible, so each page can rank for more searches",
              "Exactly ten",
            ],
            answer_index: 1,
            explanation: "The lesson says each page should have one main keyword plus a few close variations sharing the same intent.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "on-page-seo": {
      outcomes: [
        "Name the main parts of a page that affect search",
        "Write titles, headings and openings for people first",
        "Check a page for speed, mobile use and trust",
        "Optimise a homepage and a blog post from a keyword map",
      ],
      explanation_md: `On page SEO means improving the page itself so that people and search engines understand it quickly. It is the part of SEO you control completely, and it is the task in the week 7 assignment: optimising the homepage and blog post you drafted in week 4. Employers often test it by asking a candidate to review a page and suggest changes.

## The main parts of a page

* **Title.** The title element is usually what appears as the clickable headline in search results. Google's guidance is to give every page a unique, descriptive title, keep it concise, and avoid stuffing keywords or vague labels like "Home". There is no fixed character limit, but long titles get cut off, so put the important words first.
* **Meta description.** A short summary of the page. Search engines often build the snippet under the title from the page's own text and only sometimes use your description, so write it to summarise the page accurately rather than as a keyword list.
* **Main heading.** One clear heading at the top, usually the first heading on the page, that tells visitors they are in the right place.
* **Opening paragraph.** Answer the main question or say what the business offers within the first few sentences, using the main keyword naturally.
* **Subheadings.** Break long text into sections with honest subheadings. This helps readers on small screens and helps search engines see the structure.
* **Images.** Use descriptive file names and alt text that says what the image shows. Compress images so the page loads quickly on mobile data.
* **Internal links.** Link to related pages on the same site with clear words, such as "see our school uniform prices", not "click here".
* **Web address.** A short, readable web address such as /school-uniforms is easier to understand than a string of numbers.

## Write for people first

Repeating a keyword again and again makes a page worse to read and can count against it. Use the main keyword in the title, heading and opening, then write naturally, using the supporting keywords from your map where they fit. Answer the questions a customer would ask, include prices or how to pay where you can, and make the next step obvious.

## Depth that matches the intent

A homepage for a "find" or "buy" keyword should be short and clear: what, where, how to order. A blog post for a "learn" keyword should fully answer the question, often with steps, a photo and a link onwards. Compare your page with the pages that rank now. If they answer five questions and yours answers one, add the missing answers in your own words. Never copy their text.

## Pages that work on any device

Most of your visitors in Ghana will arrive on a phone, often on a slow or expensive connection, so check that:

* text is readable without zooming, and buttons are big enough to tap;
* the page loads quickly, with compressed images and no autoplaying video;
* nothing important hides behind a pop up;
* phone numbers and WhatsApp links work with one tap.

Then check it on a laptop too. A page should feel just as clear on a wide screen.

## Trust on the page

Google's guidance on helpful content stresses trust. On a small business page that means a real address or landmark, a working phone number, real photos rather than stock images, prices that are current, and the name of the person who wrote a guide. These help visitors decide, and they are signs of a genuine business.

## Your before and after table

The most useful way to present on page work, to a mentor or a client, is a before and after table for each page: title, meta description, main heading, opening, subheadings, alt text and links, with your reason for each change. It shows your thinking, not just your result, and it lets the owner approve each change before it goes live.`,
      workedExample_md: `Hawa's shea butter site has a home page titled "Home" with the heading "Welcome!!!". Abdul-Rahman rewrites it using the keyword map, where the home page owns "pure shea butter Tamale".

1. **Title.** Before: "Home". After: "Pure Shea Butter in Tamale | Hawa's Women's Group". The keyword comes first.
2. **Heading.** Before: "Welcome!!!". After: "Pure, handmade shea butter from Tamale".
3. **Opening.** After: "We make unrefined shea butter by hand in Tamale and deliver across Ghana. Order on WhatsApp and pay with mobile money."
4. **Image alt text.** Before: blank. After: "Hawa scooping fresh shea butter into a jar". He also shrinks the photo so it loads fast.
5. **Internal link.** He adds "Read how to store shea butter in the harmattan", pointing to the guide.
6. **Trust.** He adds the group's landmark address and a real photo of the members at work.
7. **Approval.** He puts every change in a before and after table and asks Hawa to approve it.

The page now tells a visitor and a search engine exactly what it offers.`,
      keyTerms: [
        { term: "Title element", definition: "The page title in the code, usually shown as the clickable headline in results." },
        { term: "Meta description", definition: "A short summary of a page that may be used as the snippet in results." },
        { term: "Alt text", definition: "A written description of an image for people and tools that cannot see it." },
        { term: "Internal link", definition: "A link from one page to another page on the same website." },
        { term: "Keyword stuffing", definition: "Repeating a keyword unnaturally, which harms readers and can count against a page." },
        { term: "Snippet", definition: "The short text shown under the title in search results." },
      ],
      commonMistakes: [
        "Using the same title on every page, or vague titles such as \"Home\"",
        "Writing \"click here\" instead of link words that describe the destination",
        "Uploading huge photos that make the page slow on mobile data",
        "Copying text from a competitor's page instead of answering in your own words",
        "Changing a live page without the owner's approval",
      ],
      selfCheck: [
        "Which three places should the main keyword appear, naturally?",
        "What would you check to make sure a page works well on a phone?",
        "Why is a before and after table useful when presenting on page work?",
      ],
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
              "Titles must be exactly 60 characters and repeat the main keyword at least three times",
              "Give every page a unique, descriptive, concise title without keyword stuffing",
              "Titles are not shown in search results",
            ],
            answer_index: 2,
            explanation: "The lesson summarises Google's guidance: unique, descriptive and concise titles, no stuffing, no vague labels.",
          },
          {
            prompt: "How do search engines usually build the snippet under a title?",
            options: [
              "Mostly from the page's own text, sometimes from the meta description",
              "Always from the meta description, which the search engine copies word for word",
              "From the business's social media bio",
              "From the image alt text only",
            ],
            answer_index: 0,
            explanation: "The lesson explains snippets are often built from the page's text and only sometimes from the description.",
          },
          {
            prompt: "Which internal link text is better?",
            options: [
              "Click here",
              "Read more",
              "Link",
              "See our school uniform prices",
            ],
            answer_index: 3,
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
              "Search engines cannot read a word that appears more than once on a page",
              "It makes the page worse to read and can count against it",
              "It makes the page load slower",
              "It is the only way to rank",
            ],
            answer_index: 1,
            explanation: "The lesson warns that stuffing a keyword makes a page worse for readers and can count against it.",
          },
        ],
        pass_threshold: 80,
      },
    },

    backlinks: {
      outcomes: [
        "Explain what a backlink is and why quality beats quantity",
        "Judge whether a linking site is relevant and trusted",
        "Recognise links that break Google's spam policies",
        "Find honest ways to earn links",
      ],
      explanation_md: `When another website links to a page, it is a little like a person vouching for it. Search engines use links to discover pages and as one signal of how trusted a page is. Off page SEO, the work that happens away from your own site, is mostly about earning these mentions honestly. It is week 8 of the SEO specialisation and a common topic in SEO job interviews.

## What a backlink is

A backlink is a link on someone else's website that points to your site. A link from a regional tourism guide, a local news story, or a respected NGO partner tells search engines that real organisations know and trust the business. A link from a random site that lists thousands of unrelated businesses tells them very little.

## Quality beats quantity

* **Relevance.** A link from a farming association to an agro input shop makes sense. A link from a betting site does not.
* **Trust.** Links from established, real organisations count for more than links from new, empty sites.
* **Natural placement.** A link inside a genuine article or listing is better than one buried in a list of hundreds.

One relevant link from the regional farmers' association can do more than fifty links from directories nobody visits.

## Judging a linking site in five minutes

Before you chase a link, look at the site the way a careful visitor would.

1. **Is it real?** Does it have an about page, a contact address and named people?
2. **Is it active?** Are there recent posts or updates, or was it last touched years ago?
3. **Is it relevant?** Does it cover the same area, industry or customers as the business?
4. **Do people use it?** Are there comments, shares or signs that real readers visit?
5. **Is it clean?** Pages crammed with unrelated links, or adverts for dubious products, are a warning.

If a site fails two or more of these, skip it.

## Anchor text

The clickable words of a link are its **anchor text**. "Hawa's pure shea butter" tells readers and search engines what they will find. "Click here" tells them nothing. When you ask for a link, you can suggest the business name or a plain description, but do not demand exact keywords every time. Many links using the same keyword phrase look unnatural, and Google's spam policies list links with keyword rich anchor text spread across other sites among their examples of link spam.

## Links that break the rules

Google's spam policies describe link spam as creating links mainly to manipulate rankings. Buying or selling links for ranking, swapping goods or services for links, or sending a free product in exchange for a write up with a link all count, unless the link is marked as paid. When a link is paid or sponsored, websites should add a label in the link code, rel="sponsored", or rel="nofollow". Comments and forum posts can use rel="ugc", for user generated content. If anyone offers to sell you "100 backlinks for 50 cedis", say no. It wastes money and can harm the site.

The same policies warn against large scale link swaps ("link to me and I will link to you") and links hidden in website footers or templates across many sites. A partner linking to a real supplier is normal. A network of sites all linking to each other to look popular is not.

## Honest ways to earn links

* **Be listed where you belong.** Trade associations, chambers of commerce, tourism lists, alumni groups and church or mosque directories.
* **Partners and suppliers.** Ask businesses you already work with to link to you from their partner pages.
* **Local news and community stories.** Sponsoring a school sports day or running a free training can earn a genuine mention.
* **Useful content.** A clear guide, such as "How to choose a solar system for a shop in the north", is something others want to share.
* **Unlinked mentions.** If a site already names the business without a link, politely ask them to add one.

## Measuring links

You do not need a paid tool to start. Google Search Console has a Links report that shows which sites link to the business. Check it each month, along with a simple search of the business name, to see new mentions and whether your outreach worked.`,
      workedExample_md: `Sumaila manages marketing for an agro input shop in Damongo. He wants links that a farmer, and a search engine, would trust.

1. **He lists who already knows the shop.** Two farmer cooperatives, a seed supplier, an NGO that runs farmer training, and a radio station that once interviewed the owner.
2. **He checks each site.** The cooperatives share one active Facebook page but no website. The seed supplier has a partner page. The NGO site is active, with recent training reports.
3. **He finds an unlinked mention.** The NGO's report names the shop as a training venue but has no link.
4. **He skips a bad offer.** A stranger on WhatsApp offers "200 backlinks for a small fee". Sumaila checks one of the sites: it lists hundreds of unrelated businesses and has no readers. He says no.
5. **He writes two short requests.** One to the NGO asking them to add a link with the shop's name as the anchor text, and one to the seed supplier asking to be added to its partner page.
6. **He checks results.** A month later the Search Console Links report shows the NGO link.

One link from a relevant, trusted partner is worth more than any paid list.`,
      keyTerms: [
        { term: "Backlink", definition: "A link on another website that points to your site." },
        { term: "Off page SEO", definition: "Work done away from your own site, mostly earning links and mentions." },
        { term: "Anchor text", definition: "The clickable words of a link." },
        { term: "Link spam", definition: "Links created mainly to manipulate rankings, such as bought or swapped links." },
        { term: "rel=\"sponsored\"", definition: "A label in a link's code that marks it as paid or sponsored." },
        { term: "Unlinked mention", definition: "A web page that names the business without linking to it." },
      ],
      commonMistakes: [
        "Buying a bundle of backlinks from sites nobody visits",
        "Asking every site to use the same exact keyword as anchor text",
        "Chasing links from sites that have nothing to do with the business",
        "Forgetting to check whether partners already mention the business without a link",
      ],
      selfCheck: [
        "What five questions help you judge a linking site?",
        "Why is a link from the regional farmers' association better than fifty directory links?",
        "How should a paid link be marked in its code?",
      ],
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
              "A paid ad on a search engine",
              "A broken link on your site",
              "A link on someone else's website pointing to your site",
            ],
            answer_index: 3,
            explanation: "A backlink is a link from another website to yours.",
          },
          {
            prompt: "According to Google's spam policies, which of these is link spam?",
            options: [
              "Paying for links to raise rankings without marking them as paid",
              "Being listed in the member directory of a trade association you belong to",
              "A news story that mentions and links to a business",
              "A partner linking from its partner page",
            ],
            answer_index: 0,
            explanation: "Buying links for ranking without a sponsored or nofollow label is link spam.",
          },
          {
            prompt: "Which link attribute should a website use for a paid or sponsored link?",
            options: [
              'rel="ugc"',
              'rel="home"',
              'rel="sponsored"',
              "No attribute at all",
            ],
            answer_index: 2,
            explanation: "Paid links should be marked rel=\"sponsored\" (or nofollow).",
          },
          {
            prompt: "What is an \"unlinked mention\" and what should you do about it?",
            options: [
              "A bad review; you should report it",
              "A link that no longer works; delete your own page so visitors never land on an error",
              "A paid listing; ask for a refund",
              "A site names the business without linking; politely ask them to add a link",
            ],
            answer_index: 3,
            explanation: "The lesson suggests politely asking sites that already name the business to add a link.",
          },
          {
            prompt: "What is anchor text?",
            options: [
              "The clickable words of a link",
              "The address of the page a link points to",
              "A label that marks a link as paid",
              "The first sentence on a page",
            ],
            answer_index: 0,
            explanation: "The lesson defines anchor text as the clickable words of a link, such as the business name.",
          },
        ],
        pass_threshold: 80,
      },
    },

    "local-seo": {
      outcomes: [
        "Explain the three main local ranking factors",
        "Complete a Google Business Profile well",
        "Keep name, address and phone the same everywhere",
        "Ask for reviews within Google's rules",
      ],
      explanation_md: `When someone searches "pharmacy near me" or "chop bar in Bolgatanga", search engines show a map with a few local businesses before the normal results. Local SEO is the work of earning a place there. For a pharmacy, chop bar or shop that serves people nearby, appearing there can matter more than any blog post, which makes local SEO a practical skill to offer clients and a core part of week 8.

## How local ranking works

Google's Business Profile help explains that local results are based mainly on three things.

* **Relevance.** How well the business profile matches what someone searched. A complete profile with the right category and a clear description helps.
* **Distance.** How far the business is from the searcher, or from the place named in the search. You cannot change this, but an accurate map pin matters.
* **Prominence.** How well known the business is. This includes links from other sites, mentions across the web, and the number of reviews and ratings.

Google also states that there is no way to request or pay for a better local ranking. Good local SEO is about being accurate, complete and genuinely well regarded.

## A Business Profile done properly

You met Google Business Profile in the Digital Marketer roadmap. Going deeper means filling every part with care.

* **Verification.** Google asks owners to verify a profile and chooses the method itself. Verified profiles are more likely to appear.
* **Categories.** Choose one primary category that describes the core business as exactly as possible, such as "Pharmacy" rather than "Store". Add a few extra categories only if they are true.
* **Address or service area.** A shop customers visit shows its address. A business that travels to customers, such as a plumber or a mobile hairdresser, can show the areas it serves instead.
* **Hours.** Regular hours, plus special hours for public holidays, Eid and Christmas. Wrong hours lose customers and trust fast.
* **Attributes and description.** Facts such as wheelchair access or parking, and a plain description of what the business offers.
* **Photos and videos.** The shopfront from the street, the inside, the products and the team.
* **Updates.** Posts about new stock, offers and events keep the profile fresh.

## Name, address and phone, everywhere the same

Customers and search engines check that a business's details match across the web. Pick one exact way to write the business name, address and phone number, often shortened to NAP, and use it everywhere: the website, the Business Profile, Facebook, WhatsApp Business, directories and association lists. If one site says "Hawa Shea Ltd" with an old phone number and another says "Hawa's Women's Group" with a new one, people and search engines get confused. Many Ghanaian addresses are informal, so add a landmark ("opposite the Central Mosque") and use the GhanaPostGPS digital address if the business has one.

## Reviews within the rules

Reviews feed prominence and help customers decide. Google's help on getting more reviews suggests sharing a review link or QR code with customers, and notes that people need a Google Account to leave one.

* **Ask every happy customer,** with the short link sent on WhatsApp after a sale or a QR code at the counter.
* **Never offer anything in return.** Google's policies prohibit giving free or discounted goods or services for reviews, for changing a review, or for removing a bad one.
* **Never write fake reviews** or ask staff and family to pose as customers.
* **Reply to every review,** thanking good ones and calmly offering to fix problems in bad ones. A mix of reviews with thoughtful replies looks more trustworthy than a wall of perfect ones.

## The website's part

Put the full NAP on the website, usually in the footer and on a contact page, with a map and opening hours. If the business serves several towns, a separate, genuinely useful page for each town is better than one page listing every town name.`,
      workedExample_md: `Wumpini helps a pharmacy in Bolgatanga that rarely appears in the map results.

1. **She searches the pharmacy's name.** She finds four versions of its name online and two phone numbers.
2. **She agrees one NAP with the owner.** One name, the current phone number, the street address with the landmark "near the Bolga central market", and the GhanaPostGPS address.
3. **She updates every place she controls.** The Business Profile, the Facebook page, WhatsApp Business and the website footer.
4. **She asks two directories to correct their listings,** using the agreed NAP.
5. **She fixes the profile.** Primary category "Pharmacy", special hours for the Eid holiday, and new photos of the shopfront and counter.
6. **She sets up honest review requests.** A QR code at the counter and a short WhatsApp message with the review link. No discounts are offered in return.
7. **She replies to every review,** including one complaint about waiting time, offering a phone number to talk it through.

Within weeks the profile is complete, consistent and attracting genuine reviews.`,
      keyTerms: [
        { term: "Local SEO", definition: "Work that helps a business appear when people nearby search for it." },
        { term: "Relevance, distance, prominence", definition: "The three main factors Google says decide local results." },
        { term: "Primary category", definition: "The one Business Profile category that best describes the core business." },
        { term: "NAP", definition: "Name, address and phone number, which should match everywhere online." },
        { term: "Service area business", definition: "A business that serves customers at their location and can show its areas instead of an address." },
      ],
      commonMistakes: [
        "Offering a discount or gift in exchange for reviews, which Google's policies prohibit",
        "Choosing a vague primary category such as \"Store\" instead of an exact one",
        "Forgetting special hours for public holidays and festivals",
        "Leaving old phone numbers on directories and social pages",
        "Ignoring bad reviews instead of replying calmly",
      ],
      selfCheck: [
        "Which of the three local ranking factors can you not change, and what can you still do about it?",
        "How would you ask for reviews without breaking Google's rules?",
        "Why does an informal address need a landmark or digital address?",
      ],
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
              "Ad budget, followers and posts",
              "Relevance, distance and prominence",
              "Age of the business, logo and website design",
            ],
            answer_index: 2,
            explanation: "Google's Business Profile help names relevance, distance and prominence.",
          },
          {
            prompt: "Can a business pay Google for a better local ranking?",
            options: [
              "No, Google states there is no way to request or pay for a better local ranking",
              "Yes, through a monthly fee",
              "Yes, by buying reviews",
              "Only if it also runs Google Ads, which moves it up the local map results",
            ],
            answer_index: 0,
            explanation: "The lesson quotes Google's statement that local ranking cannot be requested or bought.",
          },
          {
            prompt: "What does NAP consistency mean?",
            options: [
              "Posting at the same time every day",
              "Using the same name, address and phone number everywhere the business appears",
              "Having a nap in the afternoon to stay creative",
              "Using the same photo and the same opening hours on every platform where you post",
            ],
            answer_index: 1,
            explanation: "NAP stands for name, address and phone, which should match everywhere.",
          },
          {
            prompt: "Which review practice does the lesson recommend?",
            options: [
              "Write a few good reviews yourself to get started, then ask friends to add more",
              "Pay customers for five star reviews",
              "Ask happy customers for honest reviews and reply to every review",
              "Delete the profile if a bad review appears",
            ],
            answer_index: 2,
            explanation: "Ask genuine customers, never fake or pay, and reply to every review.",
          },
          {
            prompt: "What does Google's help say about offering a discount in exchange for a review?",
            options: [
              "It is allowed if the discount is small",
              "It is allowed only for new businesses",
              "It is prohibited by Google's policies",
              "It is required to get the first ten reviews",
            ],
            answer_index: 2,
            explanation: "Google prohibits giving free or discounted goods or services for reviews.",
          },
        ],
        pass_threshold: 80,
      },
    },

    "listings-and-outreach": {
      outcomes: [
        "Find and check local listing opportunities",
        "Write a short outreach email people want to answer",
        "Track outreach and follow up politely",
        "Handle contact details with care under Ghana's Data Protection Act",
      ],
      explanation_md: `Knowing where a business should be mentioned is only half the job. Someone still has to ask. The week 8 assignment asks you to find three local directories or blogs where your business could be listed and to draft outreach emails. This lesson teaches both parts, and the outreach skill transfers to influencer work, partnerships and sales.

## Where to look for listings

* **Directories that real people use.** Local business directories, tourism lists, hotel and restaurant guides, and industry lists such as an agro dealers' association or a tailors' association.
* **Membership bodies.** Chambers of commerce, trade associations, professional bodies and business networks often list their members online.
* **Community and faith organisations.** Church, mosque, school and alumni websites sometimes list supporters or members' businesses.
* **Local blogs and news.** Sites that write about food, events, travel or business in your region.
* **Partners.** Suppliers, NGOs and customers that are organisations.

Useful searches combine the business type or town with words like "directory", "association", "members", "where to stay" or "guide", for example "Tamale hotels guide" or "Upper East association members".

Before you add a site to your list, check three things. Is it real and active, with recent updates? Is it relevant to the business or the area? Does it look trustworthy, without pages full of unrelated links or adverts for dubious products? Skip any site that asks for payment just to add a link with no real audience.

## Find the right person

An email to a named person gets more replies than one to a general address. Look for an editor, a membership officer or the person who writes the blog, on the site's about or contact page. Use the contact details the organisation has published for enquiries. Do not guess personal addresses or hunt for private numbers.

## The shape of a good outreach email

People are busy, so keep it short and about them.

1. **A clear subject line,** such as "Listing request: Amina's Tailoring, Wa".
2. **Who you are,** in one sentence.
3. **Why this fits them,** showing you know their site or audience. Mention one specific page or post.
4. **The exact request,** with everything they need: business name, address, phone, website and a two line description.
5. **A thank you and an easy way to reply.**

Always use the same NAP you agreed in the local SEO lesson. Aim for under 120 words. Read it aloud before sending: if it sounds like a template, rewrite the middle so it could only have been sent to this one site.

## What not to do

* Do not send the same email to fifty sites with only the name changed. People can tell.
* Do not offer money for a link that is not marked as paid. That breaks the spam policies from the last lesson.
* Do not exaggerate. If the guesthouse has eight rooms, do not call it a hotel.
* Do not send anything before the business owner has approved it. You speak in their name.

## Following up and tracking

Follow up once, politely, about a week later if there is no answer, and then stop. Keep a simple tracking sheet with the site, the contact, the date sent, the date of the follow up, the reply and the result. When a listing goes live, check that the details are correct and note the link. This sheet becomes evidence of your work for your mentor and portfolio.

## Contact details and the law

Ghana's Data Protection Act, 2012 (Act 843) protects personal data. Section 40 says a person's details must not be used for direct marketing without their prior written consent, and defines direct marketing as advertising or marketing material directed to particular individuals. Section 20 lets a person object to the processing of their data, and then it must stop. In practice for outreach:

* send one relevant, personal request to a contact address the organisation published for enquiries;
* never add the people you contact to a newsletter, broadcast list or group;
* if anyone asks you not to contact them again, stop at once and mark it in your sheet;
* keep your tracking sheet private.

This is careful practice, not legal advice. If a business plans regular marketing messages, it should take proper advice.`,
      workedExample_md: `Rahinatu helps a guesthouse in Nalerigu complete the week 8 assignment.

1. **She searches** "Nalerigu places to stay", "Northern Region tourism guide" and "Nalerigu church guests".
2. **She checks each site.** She keeps a regional tourism blog that lists places to stay near the Nalerigu Defence Wall, an NGO that hosts visiting researchers, and a church that publishes a list of places for wedding guests. She skips a directory that charges a fee and has no recent updates.
3. **She finds named contacts.** The blog's about page names its writer, Adisa.
4. **She drafts three emails and the owner approves them.** Her email to the blog reads:

> Subject: Place to stay near the Nalerigu Defence Wall
>
> Hello Adisa, I enjoyed your guide to visiting the Nalerigu Defence Wall. I help Napari Guesthouse, a ten minute walk from the wall, with clean rooms and mobile money payment. Would you consider adding it to your list of places to stay? Details: Napari Guesthouse, opposite the district assembly, Nalerigu, 024 000 0000. Thank you for helping visitors find their way.
>
> Rahinatu

5. **She tracks replies.** The church replies in two days. She follows up with the NGO once, a week later.

It is short, specific and easy to say yes to.`,
      keyTerms: [
        { term: "Outreach", definition: "Contacting other sites or people to ask for a listing, mention or partnership." },
        { term: "Directory", definition: "A website that lists businesses, often by type or place." },
        { term: "Follow up", definition: "One polite reminder sent when there is no reply after about a week." },
        { term: "Tracking sheet", definition: "A record of who you contacted, when, and what happened." },
        { term: "Act 843", definition: "Ghana's Data Protection Act, 2012, which protects personal data." },
      ],
      commonMistakes: [
        "Sending the same template to many sites with only the name changed",
        "Following up again and again after one polite reminder",
        "Adding outreach contacts to a newsletter or broadcast list",
        "Sending emails before the business owner approves them",
        "Listing the business on paid directories that nobody visits",
      ],
      selfCheck: [
        "What five parts make up a good outreach email?",
        "What should you do if someone asks you not to contact them again?",
        "Which three checks decide whether a listing site is worth adding?",
      ],
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
              "A site that charges just to add a link and has pages full of unrelated links",
              "An active regional tourism blog",
              "A trade association that lists its members along with their phone numbers and addresses",
              "A partner NGO's website",
            ],
            answer_index: 0,
            explanation: "The lesson says to skip sites that charge for a link with no real audience or are full of unrelated links.",
          },
          {
            prompt: "What should an outreach email include in its request?",
            options: [
              "Only a link to the business's Facebook page",
              "A long history of the business and its owner so the site understands who you are",
              "A demand for a reply within one day",
              "Everything the site needs: name, address, phone, website and a short description",
            ],
            answer_index: 3,
            explanation: "Make the request easy by giving all the details they need.",
          },
          {
            prompt: "How many follow ups does the lesson suggest if there is no reply?",
            options: [
              "None",
              "One polite follow up about a week later",
              "One every day until they reply",
              "Three follow ups in the first week so they do not forget",
            ],
            answer_index: 1,
            explanation: "Follow up once, politely, about a week later, then stop.",
          },
          {
            prompt: "Why did Rahinatu's email work well?",
            options: [
              "It was long and detailed about the guesthouse's history",
              "It was short, specific, showed she knew the blog, and was easy to say yes to",
              "It offered money for the listing",
              "It was sent to many blogs at once with the same greeting, so it reached more people quickly",
            ],
            answer_index: 1,
            explanation: "The lesson highlights that the email was short, specific and easy to agree to.",
          },
          {
            prompt: "Someone you emailed for a listing replies asking you not to contact them again. What does the lesson say to do?",
            options: [
              "Send one more email explaining why the listing would help them",
              "Ask the business owner to call them instead",
              "Add them to the business newsletter instead",
              "Stop at once and mark it in your tracking sheet",
            ],
            answer_index: 3,
            explanation: "The lesson says to stop at once and record it, in line with the right to object under Act 843.",
          },
        ],
        pass_threshold: 80,
      },
    },

    "content-pillars": {
      outcomes: [
        "Explain pillars and topic clusters",
        "Choose content pillars that show experience and trust",
        "Plan internal links between pillar and cluster pages",
        "Audit existing content and decide what to keep, refresh or merge",
      ],
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

## Linking the cluster together

Internal links are what turn separate pages into a cluster.

* The pillar page gives a short summary of each cluster topic and links to the full page.
* Each cluster page links back to the pillar near the top or bottom, with clear words such as "our full guide to solar for homes".
* Cluster pages link to each other where it genuinely helps, such as from the battery page to the instalment page.
* Every page in the cluster links to the page where people can buy, book or ask a question.

Use your keyword map to choose the link words, so each link describes the page it points to.

## Experience and trust

Google's guidance on helpful content mentions experience, expertise, authoritativeness and trustworthiness, with trust as the most important. In practice for a small Ghanaian business, that means showing real experience: photos of your own installations, the name of the person who wrote the guide and their background, honest prices, and accurate advice. It also means being clear when AI tools helped write something and checking every fact. Content about health, money or safety needs extra care. A shea butter seller can explain how the butter is made, but must not claim it cures illnesses.

## Audit before you create

Before planning new pages, look at what the site already has. A simple content audit lists every page with its main topic, the pillar it belongs to, whether it is still accurate, and, if Search Console is set up, how many clicks it got from search. Then decide for each page:

* **Keep** pages that are accurate and useful.
* **Refresh** pages with old prices, missing questions or broken links.
* **Merge** two thin pages on the same topic into one stronger page, and point the old address to the new one so visitors are not lost.
* **Remove** pages that are wrong and cannot be fixed, such as a promotion that ended years ago.

## Refresh as well as create

Old content does not have to be thrown away. Update prices, add new questions customers ask and fix broken links. A refreshed page that is genuinely improved is often worth more than a new one. Never just change the date to look new.

## Formats beyond the blog

A cluster page does not have to be a long article. It can be an FAQ answer, a short how to video embedded on a page with a written summary, a photo guide, or a price list with explanations. The next lesson shows how to make FAQs, images and video work for search, and the lesson after that puts every format into your calendar.`,
      workedExample_md: `Zakaria plans content for a solar installer in Tamale.

1. **He audits the site.** It has a home page, a contact page and six blog posts. Two posts both cover batteries in a thin way, and one advertises a Christmas promotion from three years ago.
2. **He decides for each page.** He merges the two battery posts, removes the old promotion, and refreshes a post on panel cleaning with current prices.
3. **He reads his keyword map.** It shows many learning questions about system size, batteries and dust, and some about paying in instalments.
4. **He picks two pillars:** "Solar for homes" and "Solar for shops". Both pass the three tests: customers ask about them, the installer has years of experience, and both lead to sales.
5. **He lists six cluster pages under each pillar,** each mapped to one keyword, including the merged battery page.
6. **He plans the links.** Every cluster page links to its pillar and to the "Get a quote" page.
7. **He arranges proof.** The technician, Kwame, will supply photos of real installations and check every fact.

The installer now has a clear list of what to publish and why.`,
      keyTerms: [
        { term: "Content pillar", definition: "A broad topic central to the business, covered on one main page." },
        { term: "Topic cluster", definition: "Smaller pages that each answer one question within a pillar and link to it." },
        { term: "Content audit", definition: "A review of every existing page to decide whether to keep, refresh, merge or remove it." },
        { term: "Refresh", definition: "Genuinely improving an existing page with current facts, new questions and fixed links." },
        { term: "Trustworthiness", definition: "The most important quality in Google's helpful content guidance: accurate, honest and safe content." },
      ],
      commonMistakes: [
        "Choosing more pillars than the business has time to write for",
        "Publishing cluster pages that never link back to the pillar",
        "Changing only the date on an old page to make it look new",
        "Making health or money claims the business cannot prove",
      ],
      selfCheck: [
        "What three tests help you choose a content pillar?",
        "When would you merge two pages instead of refreshing each one?",
        "How should a cluster page link to the rest of the cluster?",
      ],
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
              "A paid advert",
              "A list of every keyword on the site, kept in a sheet and updated each month",
              "A broad topic central to the business, covered on one main page",
            ],
            answer_index: 3,
            explanation: "A pillar is a broad topic on one main page, with cluster pages around it.",
          },
          {
            prompt: "How do pillar and cluster pages connect?",
            options: [
              "Cluster pages link back to the pillar and the pillar links out to each cluster",
              "They do not link to each other",
              "Only the home page links to them",
              "They link only to competitor sites, which shows search engines the topic is well covered",
            ],
            answer_index: 0,
            explanation: "The lesson describes links in both directions between pillar and clusters.",
          },
          {
            prompt: "Which three tests does the lesson give for choosing a pillar?",
            options: [
              "Cheapest, fastest, longest",
              "Trending, funny and short",
              "Customers care about it, the business genuinely knows it, and it leads to sales",
              "Competitors already use it, it has many keywords, and it is new enough to be trending",
            ],
            answer_index: 2,
            explanation: "Good pillars sit where customer interest, real knowledge and sales meet.",
          },
          {
            prompt: "Which of these is the lesson's advice on refreshing old content?",
            options: [
              "Change the date at the top so search engines think the page was just written and rank it again",
              "Delete all old pages every year",
              "Copy a competitor's newer page",
              "Genuinely improve it with updated prices, new questions and fixed links",
            ],
            answer_index: 3,
            explanation: "Refresh by genuinely improving content, never by only changing the date.",
          },
          {
            prompt: "A site has two thin pages that both cover the same topic. What does the lesson's content audit suggest?",
            options: [
              "Keep both, because more pages always bring more visits",
              "Merge them into one stronger page and point the old address to it",
              "Change the date on both so they look new",
              "Delete both and start again with a new topic",
            ],
            answer_index: 1,
            explanation: "The audit advice is to merge thin pages on one topic and redirect the old address so visitors are not lost.",
          },
        ],
        pass_threshold: 80,
      },
    },

    "faqs-and-multimedia": {
      outcomes: [
        "Write FAQ pages from real customer questions",
        "Prepare images for search with file names and alt text",
        "Give videos a page, a title, a description and captions",
        "Use multimedia without heavy data",
      ],
      explanation_md: `Customers ask the same questions again and again: How much? Do you deliver? Can I pay with mobile money? Is it open on Sunday? Each repeated question is a ready made piece of content. Turning those questions into clear answers, supported by images and short videos, is one of the most useful things a content marketer can do for a small business, and the week 9 calendar must cover FAQs and multimedia as well as blogs.

## FAQ pages that work

* **Use real questions,** in the customer's own words, from WhatsApp chats, calls, comments and reviews.
* **Answer directly first,** in one or two sentences, then add detail. "Yes, we deliver within Tamale the same day for orders before noon."
* **Group questions** under simple headings such as Ordering, Payment and Delivery.
* **Keep answers current.** A wrong price or old opening time hurts trust.
* **Link onwards** to the full guide or the order page when an answer needs more.

If a question needs a long answer, give it its own page and link to it from the FAQ. That longer page can become part of a content cluster.

Write FAQs for customers, not for a special search display. Google used to show some FAQ pages with expandable questions in its results, but it has retired that feature. A clear FAQ page still helps visitors, saves the owner time on WhatsApp, and can rank for the questions it answers.

## Images for search

Search engines cannot see a picture the way people do, so they rely on clues. Google's image guidance points to things you can control:

* Place images near the text that relates to them.
* Use descriptive file names, such as "pure-shea-butter-jar.jpg" rather than "IMG_2041.jpg".
* Write alt text that describes the image for someone who cannot see it.
* Use good quality images, but compress them so they load fast on mobile data.

Use your own photos where you can. Real photos of the product, the team and the place build trust in a way stock images cannot, and they support the experience signals from the last lesson.

## Video for search

Short videos can appear in search results, especially for "how to" questions. Google's video guidance gives clear steps you can follow:

* **Give each video a page of its own** on the website, where the video is the main thing, with text around it explaining what it shows.
* **Give it a clear title and description** using the question it answers.
* **Choose a clear thumbnail,** the still image people see before they press play.
* **Add captions or a transcript,** which helps viewers watching without sound and gives search engines text to read.
* **Post it on a video platform as well,** such as YouTube, where people also search, using the same title and description.

## Multimedia without heavy data

Many of your customers pay for data by the bundle. Keep videos short, offer a text summary, and avoid pages that load several videos at once. A thirty second clip that answers one question is often more useful than a long one. Let visitors choose to press play rather than starting a video automatically.

## Turning one question into several pieces

One good customer question can feed your calendar for weeks. "How do I store shea butter in the harmattan?" can become an FAQ answer, a full guide on the website, a 30 second video embedded on that guide, a photo with a caption on social media, and a WhatsApp Status. Each format reaches different people, and each one links back to the guide. Plan these together so you create once and publish many times.

## Accessibility helps everyone

Alt text, captions and clear headings were designed for people with disabilities, including people who use screen readers. They also help people on slow connections where images fail to load, people in noisy places, and search engines. Doing them well is good marketing and good manners.`,
      workedExample_md: `Ayishetu runs a small catering business in Wa. Her phone buzzes all day with the same questions.

1. **She collects ten real questions** from her WhatsApp chats, such as "What is the minimum order?" and "Do you deliver to Kperisi?"
2. **She groups them** under Menu and prices, Ordering and Delivery, and writes a direct one or two sentence answer to each.
3. **She spots a long answer.** "How much food do I need for a naming ceremony?" deserves its own guide, so the FAQ links to it.
4. **She adds a real photo** to the guide, named "naming-ceremony-food-packs-wa.jpg", with the alt text "Rows of packed jollof and chicken ready for a naming ceremony in Wa".
5. **She films a 25 second video** showing how dishes are packed for transport, gives it a page with a short written summary, and adds checked captions.
6. **She reuses the question.** The same video goes on her WhatsApp Status and Facebook page with a link to the guide.

Customers start sending her the FAQ link instead of asking, and she spends less time repeating herself.`,
      keyTerms: [
        { term: "FAQ page", definition: "A page of frequently asked questions answered directly and kept current." },
        { term: "Alt text", definition: "A written description of an image for people and tools that cannot see it." },
        { term: "Thumbnail", definition: "The still image people see before they press play on a video." },
        { term: "Transcript", definition: "The full text of what is said in a video or audio clip." },
        { term: "Repurposing", definition: "Turning one piece of content into several formats for different channels." },
      ],
      commonMistakes: [
        "Writing FAQ questions the business imagines instead of ones customers really ask",
        "Uploading images named IMG_2041.jpg with no alt text",
        "Posting a video only on social media with no page or text on the website",
        "Adding FAQ code hoping for a special search display that Google has retired",
      ],
      selfCheck: [
        "Where would you find the real questions for an FAQ page?",
        "What four things help a video be found in search?",
        "How could one customer question become three pieces of content?",
      ],
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
              "A competitor's FAQ copied word for word, since they already know what customers ask",
              "Real questions customers ask, in their own words",
              "Only the business owner's favourite topics",
            ],
            answer_index: 2,
            explanation: "The lesson says to use real questions in the customer's own words.",
          },
          {
            prompt: "How should an FAQ answer start?",
            options: [
              "With a direct answer in one or two sentences",
              "With a long story about how the business started",
              "With a link to another site",
              "With a list of keywords",
            ],
            answer_index: 0,
            explanation: "Answer directly first, then add detail.",
          },
          {
            prompt: "Which image file name is better for search?",
            options: [
              "IMG_2041.jpg",
              "pure-shea-butter-jar.jpg",
              "photo1.jpg",
              "final-final-2.jpg",
            ],
            answer_index: 1,
            explanation: "A descriptive file name gives search engines a clue about what the image shows.",
          },
          {
            prompt: "Why does the lesson recommend captions or a transcript for videos?",
            options: [
              "They make the video longer",
              "They are required by law for every business video posted in Ghana and can be fined if missing",
              "They help people watching without sound and give search engines text to read",
              "They stop people sharing the video",
            ],
            answer_index: 2,
            explanation: "Captions help viewers without sound and give search engines readable text.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "seo-strategy-plan": {
      outcomes: [
        "Build an SEO content calendar covering blogs, FAQs and multimedia",
        "Read the Search Console Performance report",
        "Choose realistic measures of SEO progress",
        "Write and present a one page SEO strategy",
      ],
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

Balance the formats. A good eight week calendar for a small business might include two or three guides, an FAQ update each month, one or two short videos, and a photo set, all tied to the same pillars. Put off site work in the calendar too: listing requests, follow ups and review requests are tasks with dates and owners.

## Measuring progress

You cannot control rankings directly, so measure several signals over time.

* **Google Search Console,** a free tool for site owners, shows which searches the site appeared for, how often, and how many people clicked. You need access to the website to set it up.
* **Analytics,** such as Google Analytics, shows visits and actions on the site.
* **Business signals:** WhatsApp enquiries that mention finding the business on search, calls from the profile, and direction requests.

## Reading the Performance report

Search Console's Performance report gives four main numbers:

* **Clicks:** how often people clicked through to the site from Google Search.
* **Impressions:** how often the site appeared in results.
* **CTR:** clicks divided by impressions.
* **Average position:** the average ranking of the site's top result.

You can group them by query, page, country, device, search appearance and date. Three patterns are worth looking for:

1. **Queries with many impressions but few clicks.** The page appears but does not tempt people. Improve its title and opening.
2. **Pages with no impressions at all.** Check whether they are indexed and whether they match any real search.
3. **New queries you never planned for.** These are ideas for new cluster pages.

Compare the same length of time, such as this month with last month, and report trends rather than single days.

## Choosing your measures

Pick three to five measures that connect to the business goal. For a guesthouse, they might be clicks from Search Console, the number of queries containing "guesthouse", direct booking enquiries, and new reviews. Write a starting figure for each before work begins, so you can show change later. Never promise a number you cannot control, such as a ranking position.

Give SEO time. New pages can take weeks or months to settle, so report trends, not single days.

## The one page strategy

Fit your strategy on one slide or page with five parts:

1. **Goal.** One business result, such as more delivery orders in Tamale.
2. **Audience and keywords.** Who you are targeting and your main keywords.
3. **On site work.** The pages you will improve or create.
4. **Off site work.** Listings, links and reviews you will pursue.
5. **Content and measurement.** Your pillars, how often you will publish, and the signals you will track.

## Presenting it

Practise a two minute talk: the goal, the three most important actions, and how you will measure them. Keep the slide readable, with large text and few words, and keep the calendar and keyword map ready as backup if someone asks for detail.`,
      workedExample_md: `Issahaku presents his strategy for Mariama's Tamale guesthouse.

1. **Goal.** More direct bookings from travellers, so Mariama relies less on booking sites.
2. **Audience and keywords.** Business travellers and NGO visitors. Main keywords: "guesthouse in Tamale", "guesthouse near Tamale airport" and related phrases.
3. **On site work.** A rewritten home page, a new rooms page with prices, and an FAQ.
4. **Off site work.** Three tourism and NGO listings from his outreach, and a review request sent after each stay.
5. **Content.** One guide a fortnight on visiting the north, a monthly FAQ update, and one short room tour video, all in an eight week calendar.
6. **Measurement.** Search Console clicks and impressions, booking enquiries that mention Google, and new reviews, checked monthly. He records the starting figures before any work begins.
7. **Presentation.** He practises a two minute talk and keeps the calendar open as backup.

Mariama approves the plan, and Issahaku has a portfolio piece that shows his whole three weeks of work.`,
      keyTerms: [
        { term: "Content calendar", definition: "A schedule of what will be published, when, by whom and why." },
        { term: "Impressions", definition: "How often a site appeared in search results." },
        { term: "CTR", definition: "Clickthrough rate: clicks divided by impressions." },
        { term: "Average position", definition: "The average ranking of a site's top result for the searches shown." },
        { term: "Starting figure", definition: "The value of a measure before work begins, used to show change later." },
      ],
      commonMistakes: [
        "Planning far more content than the business can produce",
        "Promising a ranking position instead of measures you can influence",
        "Comparing a week of results with a month and calling it a trend",
        "Forgetting to record starting figures before the work begins",
        "Filling the strategy slide with small text nobody can read",
      ],
      selfCheck: [
        "What does a query with many impressions but few clicks tell you?",
        "What five parts make up the one page strategy?",
        "Which three to five measures would you choose for your business, and why?",
      ],
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
            options: [
              "The main keyword from your map",
              "The colour of the post",
              "The number of likes",
              "The author's favourite day",
            ],
            answer_index: 0,
            explanation: "Linking every item to a main keyword and a pillar keeps the calendar tied to the strategy.",
          },
          {
            prompt: "What does Google Search Console show?",
            options: [
              "Your competitors' passwords",
              "How much each competitor spends on ads and which keywords they bid on, by month",
              "Only the number of social media followers",
              "Which searches the site appeared for, how often, and how many people clicked",
            ],
            answer_index: 3,
            explanation: "Search Console is a free tool that shows search appearances and clicks for your site.",
          },
          {
            prompt: "Why should SEO progress be reported as trends rather than single days?",
            options: [
              "Because rankings never change",
              "Because new pages can take weeks or months to settle",
              "Because reports must be long",
              "Because search engines only update their rankings once a year, in January",
            ],
            answer_index: 1,
            explanation: "The lesson says to give SEO time and report trends.",
          },
          {
            prompt: "What does the lesson say about publishing frequency?",
            options: [
              "Publish ten new pages a week no matter what, since more pages always means more visitors",
              "One excellent page a fortnight, kept up, beats many planned pages that never appear",
              "Publish only once a year",
              "Frequency does not matter at all",
            ],
            answer_index: 1,
            explanation: "Be realistic and consistent rather than planning more than you can deliver.",
          },
          {
            prompt: "In Search Console, a query shows many impressions but very few clicks. What does the lesson suggest?",
            options: [
              "Improve the page's title and opening so it tempts more people",
              "Delete the page because nobody wants it",
              "Ask Google to remove the query from the report",
              "Ignore it, because only clicks matter",
            ],
            answer_index: 0,
            explanation: "Many impressions with few clicks means the page appears but does not tempt people, so improve its title and opening.",
          },
        ],
        pass_threshold: 80,
      },
    },

    // SOCIAL MEDIA MARKETING

    "social-media-marketing": {
      outcomes: [
        "Describe what the social media specialisation covers",
        "Explain how organic and paid social work together",
        "Name the accounts a business needs before it can advertise on Meta",
        "Practise in an ads manager without spending money",
      ],
      explanation_md: `Many Ghanaian businesses already post on Facebook, Instagram, TikTok and WhatsApp. Far fewer know how to run a paid campaign that reaches the right people, make a video that people watch to the end, or turn followers into a community that buys again and tells friends. Those three skills are what this specialisation teaches, and they appear again and again in social media and digital marketing job descriptions.

## What this specialisation covers

You already met social platforms, short video, social ads and community management in the Digital Marketer roadmap. Here you go deeper over three weeks.

* **Week 7, advanced ad targeting.** How campaigns are built, how to choose and refine audiences, and how to set budgets and test ads. The assignment is a mock Facebook and Instagram campaign with a defined audience and budget.
* **Week 8, video and storytelling.** Story structure for social media, scripting and shooting a short promo, and editing with captions. The assignment is a 30 second promo video.
* **Week 9, community and influencers.** Building a community, finding micro influencers, and pitching and running a collaboration. The assignment is two collaboration proposals.

## Organic and paid working together

**Organic** content is what a business posts for free. It reaches mostly people who already follow or share it. **Paid** content is an advert: the business pays the platform to show a post to people it chooses. Paid reach is predictable and fast but stops when the money stops. Organic reach grows slowly but builds trust and loyalty.

The best social marketers use both. They post consistently, notice which organic posts people love, and then put money behind those proven posts to reach new people. A community then keeps those new customers close.

## The accounts behind an advert

Before a business can run ads on Facebook and Instagram, several accounts have to be connected. Meta's names for them change from time to time, but the jobs stay the same.

* **A Facebook Page** for the business, which ads run from.
* **An Instagram professional account,** linked to the Page if ads will run on Instagram.
* **A business account** in Meta's business tools that holds the Page, the ad accounts and the people who work on them. Meta currently calls this a business portfolio.
* **An ad account,** where campaigns are built, the currency and time zone are set, and the payment method lives.
* **A WhatsApp Business number,** if ads will start WhatsApp conversations.

As a freelancer or junior marketer, ask the owner to add you to their business account with the access you need. Never ask for their password, and never run a client's ads from your own ad account. The business should own its accounts, its data and its history.

## Practising without spending

In Ads Manager, a campaign you build stays as a draft until you publish it. That means you can learn the real screens: choose an objective, build an audience, set a budget and write an ad. For practice, never press Publish and never add a payment method. If a screen asks for payment details before you can continue, stop and finish the plan in a document instead. The free Meta Blueprint courses named in your week 7 resources show the same screens with no spending at all.

## Responsibility comes with the role

When you run a business's social accounts, you handle its reputation, its money and sometimes its customers' personal details. Follow each platform's advertising rules, never make claims the business cannot prove, label paid partnerships honestly, and keep customers' phone numbers and chats private. In Ghana, the Data Protection Act, 2012 (Act 843) applies to personal data, and some products, such as food, medicines and cosmetics, have advertising rules from the Food and Drugs Authority.

## What you will be able to show

By the end you will have a mock campaign plan with a defined audience and budget, a 30 second promo video, and two collaboration proposals for local micro influencers. Together they show an employer that you can plan, create and partner, not just post.`,
      workedExample_md: `Hawa sells shea butter in Tamale and posts photos most days. Her niece Rahinatu, who is learning social media marketing, looks at what is working.

1. **She finds the best organic post.** One video of Hawa's women's group at work got far more shares than anything else.
2. **She checks the accounts.** Hawa has a Facebook Page and an Instagram account, but they are not linked, and nobody has set up a business account or an ad account.
3. **She asks to be added properly.** Hawa adds Rahinatu to the new business account with permission to build ads, instead of sharing her password.
4. **She suggests three ideas.** First, put a small budget behind the popular video to reach women in Tamale and Accra interested in natural skincare. Second, film a short story about one member of the group and how the work supports her family. Third, start a WhatsApp Channel with weekly tips and new stock alerts.
5. **She practises first.** She builds the first idea as a draft in Ads Manager, adds no payment details, and shows Hawa the plan before anything is published.

Each idea uses a skill from this specialisation.`,
      keyTerms: [
        { term: "Organic content", definition: "Posts a business shares for free, seen mostly by followers." },
        { term: "Paid content", definition: "Adverts the business pays a platform to show to people it chooses." },
        { term: "Ad account", definition: "The account where campaigns are built and the currency and payment method are set." },
        { term: "Business portfolio", definition: "Meta's current name for the business account that holds Pages, ad accounts and people." },
        { term: "Draft", definition: "A campaign built in Ads Manager that does not run or spend until it is published." },
      ],
      commonMistakes: [
        "Asking a client for their Facebook password instead of being added with proper access",
        "Running a client's ads from your own ad account",
        "Adding a payment method to practise, then forgetting a campaign is live",
        "Boosting posts at random instead of putting money behind posts that already work",
      ],
      selfCheck: [
        "Which accounts must be connected before a business can advertise on Facebook and Instagram?",
        "How can you practise in Ads Manager without spending any money?",
        "Why should the business, not the marketer, own the ad account?",
      ],
      practice_task_md: `**Goal:** Choose your business and audit its social presence.

**Steps:**
1. Pick a real small business, church, school or NGO you can talk to, or your mock business from earlier weeks.
2. List every social platform it uses and how often it posts on each.
3. Scroll back through its recent posts and find the three that got the most reactions, comments or shares.
4. For each of the three, write one sentence on why you think people responded.
5. Write one sentence on what the business could do with paid ads, one on video and one on community.

**Done looks like:** A one page audit naming the platforms, the three best posts with reasons, and three ideas. You will build on it across this specialisation.`,
      quiz: {
        questions: [
          {
            prompt: "What is the difference between organic and paid social content?",
            options: [
              "Organic content is about farming; paid content is about money",
              "Organic content is always video; paid content is always photos",
              "There is no difference",
              "Organic content is posted for free; paid content is an advert the business pays to show to chosen people",
            ],
            answer_index: 3,
            explanation: "The lesson defines organic as free posts and paid as adverts shown to people the business chooses.",
          },
          {
            prompt: "How does the lesson suggest using organic and paid together?",
            options: [
              "Notice which organic posts people love, then put money behind those proven posts",
              "Only ever use paid ads",
              "Stop posting once ads start",
              "Use paid ads only for the posts nobody liked, so that every post eventually gets seen by people",
            ],
            answer_index: 0,
            explanation: "Good marketers boost posts that have already proved popular organically.",
          },
          {
            prompt: "Which of these is a responsibility the lesson mentions?",
            options: [
              "Sharing customers' phone numbers with other businesses",
              "Making any claim that gets attention",
              "Labelling paid partnerships honestly and keeping customers' details private",
              "Ignoring the platform's advertising rules, since they only apply to large budgets over a set amount",
            ],
            answer_index: 2,
            explanation: "The lesson lists honest labelling, privacy and following advertising rules.",
          },
          {
            prompt: "In the example, which of Hawa's posts did Rahinatu suggest putting money behind?",
            options: [
              "A new post nobody had seen yet, so the ad would feel fresh to everyone who saw it",
              "A text post about prices",
              "A competitor's post",
              "The video of the women's group that got far more shares than anything else",
            ],
            answer_index: 3,
            explanation: "She suggested boosting the post that had already proved popular.",
          },
          {
            prompt: "You want to practise building a campaign in Ads Manager. What does the lesson say?",
            options: [
              "Add a payment method so the screens unlock",
              "Build it as a draft, never press Publish, and add no payment details",
              "Publish it with a very small budget",
              "Use the business owner's password to log in",
            ],
            answer_index: 1,
            explanation: "A campaign stays a draft until published, so you can practise there without payment details.",
          },
        ],
        pass_threshold: 80,
      },
    },

    "social-campaign-structure": {
      outcomes: [
        "Explain the campaign, ad set and ad layers",
        "Choose an objective that matches the business goal",
        "Name the main settings at each layer",
        "Plan and name a campaign structure clearly",
      ],
      explanation_md: `Pressing "Boost" on a post is the quickest way to advertise, but it hides most of the choices that make ads work. Employers want marketers who can build a full campaign in an ads manager, because that is where you control the goal, audience, budget and creative. This lesson explains the structure that Meta's Ads Manager uses for Facebook and Instagram. Other platforms such as TikTok use a very similar shape.

## Three layers

A campaign is organised in three layers, from the big decision down to the detail.

* **Campaign.** You choose the objective, the one result you want. Everything else is optimised for it.
* **Ad set.** You choose the audience, the placements where ads appear, the budget and the schedule. Meta also lets you set one budget for the whole campaign instead, which it shares across the ad sets. One campaign can have several ad sets, for example one for Tamale and one for Accra.
* **Ad.** The creative people actually see: the image or video, the text, the headline and the button, such as Send message or Learn more. One ad set can have several ads to compare.

## Choosing an objective

At the time of writing, Meta's business help pages list six objectives. Platforms change their labels from time to time, so always check the current list on screen.

* **Awareness:** show the ad to as many relevant people as possible and help them remember it.
* **Traffic:** send people to a destination such as a website, an app or a Facebook Page.
* **Engagement:** get more messages, video views, post reactions or page likes. This is the objective Meta suggests when you want people to start a conversation with the business.
* **Leads:** collect details from people interested in the business, such as with an instant form or through messages.
* **App promotion:** get people to install or use an app.
* **Sales:** find people likely to buy, usually measured on a website or in a catalogue.

The platform's system shows ads to the people it predicts are most likely to take the action your objective asks for. If you choose Engagement for post reactions when you really want WhatsApp orders, you will get likes, not orders. Pick the objective that matches the business goal, not the one that produces the biggest numbers.

For many Ghanaian small businesses without a website, a campaign that starts conversations in WhatsApp is a practical choice, because that is where customers already ask questions and pay with mobile money.

## Settings at each layer

Going deeper means knowing what lives where, so you can find it quickly and explain it to a client.

* **Campaign settings:** the objective; whether the ads fall into a special category, such as credit, jobs, housing or politics, which Meta requires you to declare and which limits targeting; and whether the budget is set here for the whole campaign.
* **Ad set settings:** where the result should happen, such as a website, an app or a messaging app like WhatsApp; the performance goal, such as more conversations; the audience; the placements; the budget, if not set at campaign level; and the start and end dates.
* **Ad settings:** the identity the ad runs from, meaning the Facebook Page and Instagram account; the format, such as a single image, a video or a carousel of several cards; the primary text, headline and button; and the destination.

## Placements

Placements are the places an ad can appear: Facebook Feed, Instagram Feed, Stories, Reels, Messenger and more. Meta can choose placements automatically, spreading the budget where results look best, or you can pick them yourself. Automatic placements are usually a good start. Choose manually only with a reason, such as a vertical video made only for Stories and Reels. Whichever you choose, preview the ad in each placement, because text and buttons can cover the edges of a vertical frame.

## Naming and organising

Name every layer clearly so anyone can understand it later, for example "Shea Oct Messages", "Tamale Women 25 to 45", "Video Group At Work". Clear names make reports readable and help you compare results. A simple pattern is business, month and objective for campaigns; place and audience for ad sets; and format and idea for ads.

## How many of each?

With a small budget, keep the structure small: one campaign, one or two ad sets, and two or three ads in each. Every extra ad set splits the money further, and each one needs enough results for the system to learn.`,
      workedExample_md: `Salifu runs ads for a phone accessories shop in Bolgatanga. The owner, Mr Asante, wants more WhatsApp orders for power banks before the Christmas season.

1. **Objective.** Salifu chooses an objective that drives messages, with WhatsApp as the place conversations happen. He checks the label on screen, because names change.
2. **Special category.** Power banks are not credit, jobs, housing or politics, so no special category applies.
3. **Ad sets.** He creates two ad sets, "Bolga All 18 Plus" and "Tamale All 18 Plus", each with its own small daily budget agreed with the owner.
4. **Placements.** He leaves automatic placements on, then previews each ad in Feed, Stories and Reels.
5. **Ads.** In each ad set he places two ads: "Photo Price" shows the power bank with its price, and "Video Power Cut" shows it charging a phone during a power cut.
6. **Names.** The campaign is "Accessories Dec Messages", so the report is easy to read later.
7. **Draft only.** He saves the whole structure as a draft and sends Mr Asante screenshots to approve before anything is published.

Now he can see which town and which ad brings more conversations.`,
      keyTerms: [
        { term: "Campaign", definition: "The top layer, where you choose the objective." },
        { term: "Ad set", definition: "The middle layer, holding the audience, placements, schedule and usually the budget." },
        { term: "Ad", definition: "The creative people see: image or video, text, headline and button." },
        { term: "Objective", definition: "The one result a campaign asks the platform to find." },
        { term: "Placement", definition: "A place an ad can appear, such as Feed, Stories or Reels." },
        { term: "Special ad category", definition: "Ads about credit, jobs, housing or politics, which must be declared and have limited targeting." },
      ],
      commonMistakes: [
        "Choosing the objective that gives the biggest numbers instead of the one that matches the goal",
        "Splitting a small budget across many ad sets so none can learn",
        "Leaving names such as \"New campaign\" that make reports unreadable",
        "Not previewing a vertical ad in every placement before approval",
      ],
      selfCheck: [
        "Which settings belong at the campaign, ad set and ad layers?",
        "Which objective would you choose for a business that wants WhatsApp orders, and why?",
        "When would you choose placements manually instead of automatically?",
      ],
      practice_task_md: `**Goal:** Plan the structure of a mock campaign on paper or in a sheet. No money is spent.

**Steps:**
1. Write the business goal in one sentence, such as more WhatsApp orders for a product.
2. Choose the objective from the six in the lesson and explain your choice in one sentence.
3. Plan two ad sets, each with a different audience or location.
4. Plan two ads for each ad set, describing the image or video, the main text, the headline and the button.
5. Give every campaign, ad set and ad a clear name.

**Done looks like:** A one page campaign structure with an objective, two ad sets and four ads, all clearly named.`,
      quiz: {
        questions: [
          {
            prompt: "At which layer do you choose the campaign objective?",
            options: [
              "Ad",
              "Ad set",
              "Campaign",
              "Page",
            ],
            answer_index: 2,
            explanation: "The objective is chosen at the campaign layer.",
          },
          {
            prompt: "Where do you choose the audience, placements and schedule?",
            options: [
              "Ad set",
              "Campaign",
              "Ad",
              "Profile settings",
            ],
            answer_index: 0,
            explanation: "The ad set layer holds the audience, placements and schedule, and usually the budget too.",
          },
          {
            prompt: "A business wants WhatsApp orders but chooses an objective to get post reactions. What is the likely result?",
            options: [
              "More orders than expected",
              "More likes and reactions, not orders",
              "The ad will not run",
              "The platform will change the objective automatically",
            ],
            answer_index: 1,
            explanation: "The system optimises for the objective you choose, so you get reactions rather than orders.",
          },
          {
            prompt: "Why does the lesson say to check the objective list on screen?",
            options: [
              "Because the objectives shown are different for every user, even in the same country",
              "Because the list is secret",
              "Because platforms change their labels from time to time",
              "Because there is only one objective",
            ],
            answer_index: 2,
            explanation: "Platforms update labels, so always check the current list.",
          },
          {
            prompt: "According to the lesson, at which layer do you choose the format, such as a single image, a video or a carousel?",
            options: [
              "Campaign",
              "Ad set",
              "Business portfolio",
              "Ad",
            ],
            answer_index: 3,
            explanation: "Format, text, headline, button and destination are all ad level settings.",
          },
        ],
        pass_threshold: 80,
      },
    },

    "audience-targeting": {
      outcomes: [
        "Describe location, interest, custom and lookalike audiences",
        "Decide when to keep an audience broad and when to narrow it",
        "Use exclusions to avoid wasted spend",
        "Use customer data within Act 843 and the platform's rules",
      ],
      explanation_md: `The same advert can succeed or fail depending on who sees it. A good social media marketer knows how to describe the right people to the platform, and when to let the platform's system find them instead. This is the heart of the week 7 theme, advanced ad targeting.

## Kinds of audience

Ad platforms such as Meta and TikTok offer similar building blocks.

* **Location.** Countries, regions, cities, or an area around a point on the map. You can usually choose people who live there, or people recently there. A chop bar in Tamale only needs people nearby; an online shea butter shop that delivers nationwide can go wider.
* **Age and language.** Useful when the product truly suits an age group or a language, but avoid narrowing for no reason.
* **Interests and behaviours.** The platform groups people by the pages, topics and activities they engage with, such as natural skincare, football or small business.
* **Custom audiences.** People who already know the business: those who engaged with the page or Instagram account, watched a video, messaged the business, or visited the website. Some platforms also let you upload a customer list.
* **Lookalike audiences.** The platform finds new people who resemble a custom audience, such as people similar to past buyers. You choose the country and a size: smaller lookalikes match the source more closely, larger ones reach more people.

## Cold, warm and hot

A useful way to plan is by how well people know the business.

* **Cold** audiences have never heard of it. Reach them with broad or lookalike audiences and a strong video or story.
* **Warm** audiences have engaged, for example by watching most of a video or following the page. Reach them with custom audiences and a clearer offer.
* **Hot** audiences have messaged, visited the price page or bought before. Reach them with a direct offer and an easy next step.

Each stage gets its own ad set and its own message. Showing a "buy now" ad to people who have never heard of the business rarely works; showing a long brand story to someone who asked for the price yesterday wastes their time.

## Broad or narrow?

Modern ad systems are good at finding likely buyers when you give them room. Meta, for example, offers an automated audience option where your choices act as suggestions and the system can look beyond them. Its name has changed over time, so check the current screen. Very narrow audiences can make ads expensive and slow to learn.

Ads Manager shows an estimated audience size as you build. Treat it as a rough guide, not a count of real people. If it looks tiny, you have probably stacked too many conditions.

A sensible approach for small budgets:

* Start with the right location and broad settings, and let a clear creative and objective do the work.
* Use custom audiences to reach people again who already showed interest, because they are often the most likely to buy.
* Narrow only when there is a real reason, such as the product only being sold in one town.

## Exclusions and overlap

You can exclude people too. For example, exclude people who already messaged the business this week from an ad asking them to message, so you do not pay to reach them again. Exclusions also stop two of your own ad sets competing for the same people: if one ad set targets warm video viewers, exclude them from the cold ad set.

## Customer lists and the law

Uploading a customer list means using people's phone numbers or emails to show them adverts. Ghana's Data Protection Act, 2012 (Act 843), section 40, says a person's details must not be used for direct marketing without their prior written consent, and it defines direct marketing as advertising or marketing material directed to particular individuals. Section 40 also lets a person tell the business in writing, at any time, to stop. So only upload contacts who agreed in writing to receive marketing, keep a record of that agreement, and remove anyone who asks to stop. If in doubt, use engagement based custom audiences instead, which do not need a list. This is careful practice, not legal advice.

## Targeting fairly

Platforms restrict targeting for sensitive areas such as housing, jobs and credit in some countries, and do not allow ads that discriminate. Always target by genuine relevance to the product.`,
      workedExample_md: `Mariama runs ads for her guesthouse in Tamale and plans audiences by stage.

1. **Cold ad set.** People in Accra and Kumasi, broad interests, with the automated audience option turned on. The ad is a short video tour of a room.
2. **Warm ad set.** A custom audience of people who watched most of that video in the last month. The ad is a photo with the price per night and a Send message button.
3. **Hot ad set.** People who messaged the guesthouse but did not book, shown a reminder about weekday rates.
4. **Exclusions.** She excludes warm video viewers from the cold ad set, so the two ad sets do not compete.
5. **Customer list.** Mariama has 200 past guests' numbers in her phone, but she never asked them about marketing. She decides not to upload them. Instead, she starts asking new guests at checkout whether they would like offers by WhatsApp, and keeps their written replies.
6. **Size check.** The estimated audience size for the hot ad set is small, so she gives it only a small share of the budget.

The cold ad set finds new interest; the warm and hot ones turn interest into bookings.`,
      keyTerms: [
        { term: "Custom audience", definition: "People who already interacted with the business, or a list it uploads with consent." },
        { term: "Lookalike audience", definition: "New people the platform finds who resemble a chosen source audience." },
        { term: "Cold, warm, hot", definition: "Stages of how well an audience knows the business, from strangers to near buyers." },
        { term: "Exclusion", definition: "A group of people you choose not to show an ad to." },
        { term: "Estimated audience size", definition: "A rough guide in Ads Manager to how many people an audience could reach." },
        { term: "Direct marketing", definition: "Under Act 843, advertising or marketing material directed to particular individuals." },
      ],
      commonMistakes: [
        "Stacking so many conditions that the audience is tiny and expensive",
        "Uploading phone numbers of customers who never agreed in writing to marketing",
        "Showing a hard sell to people who have never heard of the business",
        "Letting cold and warm ad sets compete for the same people",
      ],
      selfCheck: [
        "What message would you show a cold, a warm and a hot audience?",
        "What does section 40 of Act 843 require before using a person's details for direct marketing?",
        "How do exclusions save money?",
      ],
      practice_task_md: `**Goal:** Define the audiences for your mock campaign.

**Steps:**
1. Write the location settings your business really needs and why.
2. Describe one broad prospecting audience: location, age if relevant, language, and two or three interests as suggestions.
3. Describe one custom audience of people who already know the business, and how they showed interest.
4. Describe one lookalike audience and which source audience it is based on.
5. List one exclusion and explain how it saves money.

**Done looks like:** An audience plan with a broad, a custom and a lookalike audience, plus one exclusion, each with a one sentence reason.`,
      quiz: {
        questions: [
          {
            prompt: "What is a custom audience?",
            options: [
              "People who already know the business, such as those who engaged with its page or messaged it",
              "Any random group of people",
              "People who live outside Ghana",
              "People the platform has banned",
            ],
            answer_index: 0,
            explanation: "Custom audiences are made of people who already interacted with the business.",
          },
          {
            prompt: "What does a lookalike audience do?",
            options: [
              "Shows the ad only to the business owner",
              "Copies a competitor's audience so your ad reaches the people who follow their page",
              "Targets people with the same name",
              "Finds new people who resemble a source audience such as past buyers",
            ],
            answer_index: 3,
            explanation: "A lookalike finds new people similar to a source audience.",
          },
          {
            prompt: "Why can very narrow audiences be a problem with small budgets?",
            options: [
              "They are not allowed",
              "They can make ads expensive and slow to learn",
              "They always reach too many people and spend the budget in a day",
              "They only work for big brands",
            ],
            answer_index: 1,
            explanation: "The lesson says very narrow audiences can raise costs and slow learning.",
          },
          {
            prompt: "When uploading a customer list, what rule does the lesson stress?",
            options: [
              "Use any numbers you can find online",
              "Only use contact details people agreed to share for this purpose, and follow the Data Protection Act",
              "Buy lists from other businesses",
              "Upload every number in your phone",
            ],
            answer_index: 1,
            explanation: "Customer lists must use details shared with consent, following Ghana's Data Protection Act.",
          },
          {
            prompt: "According to section 40 of Act 843 as described in the lesson, what is needed before using a person's details for direct marketing?",
            options: [
              "Their prior written consent",
              "A follow on the business's Facebook Page",
              "Payment of a registration fee by the customer",
              "Nothing, if the number is already in the owner's phone",
            ],
            answer_index: 0,
            explanation: "Section 40 says a person's details must not be used for direct marketing without their prior written consent.",
          },
        ],
        pass_threshold: 80,
      },
    },

    "social-budgets-and-testing": {
      outcomes: [
        "Choose between daily and lifetime budgets",
        "Plan a budget and schedule in cedis with the owner",
        "Design a fair test that changes one thing",
        "Judge results by the objective and real sales",
      ],
      explanation_md: `The week 7 assignment asks you to set up a mock campaign with a defined audience and budget. This lesson completes that picture: how to set a budget and schedule in cedis, and how to test ads so each cedi teaches you something.

## Daily or lifetime budget

* **Daily budget:** an average amount to spend each day. Platforms may spend a little more on some days and less on others while keeping close to the average over time. Check the platform's current rules in its help pages.
* **Lifetime budget:** a total for the whole campaign, spread across set dates. Useful for a short promotion with a clear end, such as a Ramadan or Christmas offer. A lifetime budget needs an end date.

## Campaign or ad set budget

You met this choice in the campaign structure lesson. With a **campaign budget**, you set one amount and Meta moves money between ad sets towards the ones getting better results. With **ad set budgets**, each ad set gets its own fixed amount. Ad set budgets give you more control and make a fair comparison easier; a campaign budget lets the system shift money quickly. For a test, fixed ad set budgets are usually clearer.

## Who pays, and how

Ads are usually paid to the platform by card. Some businesses use a virtual card linked to mobile money or a bank account. The payment method belongs to the business, in its own ad account. Agree the maximum spend in writing with the owner before anything runs. You are spending someone else's money, so treat it with care.

## How much is enough?

There is no fixed right number. Begin with an amount the owner can afford to lose while learning. Run it for several days before judging, because one day of results is too little to trust. Platforms also need time to learn who responds. Meta calls the early period the learning phase: results can jump around, and big edits, such as a new audience or a large budget change, can start the learning again. So plan your changes and make them together, rather than adjusting every day.

## Scheduling

Think about when customers are ready. A lunchtime chop bar offer works in the morning. An offer for church outfits makes sense in the week before a big service. If you run messaging ads, make sure someone can answer WhatsApp quickly during the hours the ads run. A conversation started at 9 pm that nobody answers until morning is often a lost sale.

## Testing one thing at a time

A test compares two versions that differ in one thing only, so you know what caused the difference.

* **Creative:** photo versus video.
* **Message:** price first versus benefit first.
* **Audience:** Tamale versus Accra.
* **Button:** Send message versus Learn more.

Change one thing per test, keep the budget the same for both versions, and run them at the same time. Ads Manager has a built in A/B test feature that splits the audience into groups that do not overlap, so each person sees only one version. That makes the comparison fairer than running two ads side by side and hoping.

## How long and how sure?

Decide before you start how long the test runs and which number picks the winner. Stopping a test the moment one version looks ahead is a common mistake: early leads often disappear. A test with very few results, such as three conversations against two, tells you almost nothing. If the numbers are that small, run it longer or call it a draw and test something bolder.

## Reading the results

Judge by the objective. For a messaging campaign, look at the cost per conversation started, then ask the owner how many conversations became sales. Cheap clicks that never buy are not a win. Write down what you learned in one sentence, such as "Video brought conversations more cheaply than photo for this audience", so the next campaign starts smarter.

## Your mock campaign

Put everything in one document: objective, ad sets, audiences, ads, budget type and amount, dates, hours, who answers messages, and one test with its winning measure. That document, plus draft screenshots if you built it in Ads Manager without publishing, completes the week 7 assignment.`,
      workedExample_md: `Issahaku plans a mock campaign for a tailor in Wa, Madam Akosua, ahead of the new school term.

1. **Budget type.** A lifetime budget over ten days, because the offer ends when term starts. The amount is one Madam Akosua approved in writing.
2. **Budget level.** Two ad sets with equal ad set budgets, so the test is fair.
3. **Schedule.** All day, because her daughter answers WhatsApp in the evening.
4. **Test.** He uses Ads Manager's A/B test feature in draft. The same audience is split into two groups: one sees a photo of finished uniforms with the price, the other a short video of the tailor measuring a child.
5. **Winning measure.** Decided in advance: lowest cost per conversation, checked only after the full ten days.
6. **Reading results.** In his mock data, the video wins clearly. He also notes how many conversations became orders, using Madam Akosua's order book.
7. **Lesson learned.** He writes one sentence for next time: "For parents in Wa, a video of the tailor at work started conversations more cheaply than a price photo."

Nothing was published and no money was spent.`,
      keyTerms: [
        { term: "Daily budget", definition: "An average amount to spend each day, which can vary a little from day to day." },
        { term: "Lifetime budget", definition: "A total amount spread across a campaign's set dates." },
        { term: "Campaign budget", definition: "One budget that the platform shares across ad sets towards better results." },
        { term: "Learning phase", definition: "Meta's early period when delivery is still settling and results jump around." },
        { term: "A/B test", definition: "A comparison of two versions that differ in one thing, shown to separate groups." },
      ],
      commonMistakes: [
        "Stopping a test the moment one version looks ahead",
        "Changing the audience, creative and budget all at once",
        "Running messaging ads when nobody can reply",
        "Judging a messaging campaign by cheap clicks instead of conversations and sales",
        "Starting a campaign before the owner has agreed the maximum spend in writing",
      ],
      selfCheck: [
        "When is a lifetime budget a better choice than a daily budget?",
        "Why can big edits during the learning phase hurt results?",
        "What should you decide before a test starts?",
      ],
      practice_task_md: `**Goal:** Complete the week 7 assignment: a full mock campaign plan.

**Steps:**
1. Combine your campaign structure and audience plan into one document.
2. Choose daily or lifetime budget and write an amount the owner could afford to learn with. Explain your choice.
3. Set the dates and hours, and who will answer messages during them.
4. Design one test that changes only one thing, and say how you will judge the winner.
5. Optional: explore the free Meta Blueprint courses to see the ads manager screens, without spending money.

**Done looks like:** A one or two page mock campaign with objective, ad sets, audiences, ads, budget, schedule and one clear test.`,
      quiz: {
        questions: [
          {
            prompt: "When is a lifetime budget especially useful?",
            options: [
              "For a campaign that will run forever",
              "When you do not yet know how much you can spend, since it adjusts to your balance",
              "Only for awareness campaigns",
              "For a short promotion with clear start and end dates",
            ],
            answer_index: 3,
            explanation: "A lifetime budget is spread across set dates, which suits a short promotion.",
          },
          {
            prompt: "What should you agree with the owner before an ad runs?",
            options: [
              "The maximum spend, in writing",
              "Nothing; marketers decide alone",
              "Only the colour of the ad",
              "The owner's mobile money PIN",
            ],
            answer_index: 0,
            explanation: "The lesson says to agree the maximum spend in writing because it is the owner's money.",
          },
          {
            prompt: "What makes a fair test between two ads?",
            options: [
              "Changing several things at once to save time",
              "Running one ad this month and the other next month, then comparing which got more sales",
              "Changing one thing only, with the same budget, at the same time",
              "Giving the favourite ad more budget",
            ],
            answer_index: 2,
            explanation: "Change one thing at a time with equal budget and timing so you know what caused the difference.",
          },
          {
            prompt: "For a messaging campaign, which result matters most?",
            options: [
              "The number of cheap clicks, since a low cost per click means the campaign is working well",
              "How many likes the ad got",
              "How long the ad text is",
              "Cost per conversation started, and how many conversations became sales",
            ],
            answer_index: 3,
            explanation: "Judge by the objective and real sales, not cheap clicks.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "social-storytelling": {
      outcomes: [
        "Use a four beat story shape for short social posts",
        "Make a real person the hero of a business story",
        "Write hooks that earn the first seconds",
        "Tell stories honestly and with consent",
      ],
      explanation_md: `People scroll past adverts but stop for stories. A story gives them someone to care about, a problem they recognise and a moment of change. Week 8 of the social media specialisation is about content creation through video and storytelling, and this lesson gives you the story shape that every good short video uses.

## A simple story shape

You can tell a story in thirty seconds if you keep to four beats.

1. **Hook.** The first second or two must make people stop. Show the most interesting moment, ask a question, or show a surprising result.
2. **Problem.** What is difficult, frustrating or wanted? Keep it real and specific.
3. **Change.** What the product, service or person does about it.
4. **Result and next step.** Show the outcome and tell people exactly what to do, such as "Send us a message to order".

## Hooks that work

The hook decides whether anyone sees the rest, so spend real effort on it. Some patterns that work well:

* **Start at the end.** Show the finished wedding outfit first, then go back to the plain fabric.
* **Ask a question your audience is already asking.** "Why does your shea butter go hard in the harmattan?"
* **Show movement or a surprise.** A basket being lifted from a dye pot, colour dripping.
* **Name the viewer.** "Traders in Tamale, this one is for you."
* **Use a strong line of on screen text.** Many people watch with the sound off, so the words on screen are often the hook.

Avoid starting with a logo, a slow greeting or "Hello everyone, welcome to my page". Write three different hooks for every story and pick the strongest.

## Who is the hero?

Make the customer or a real person the hero, not the business. A tailor's story is stronger when it is about a nervous bride who now looks magnificent at her wedding, than about the tailor's new sewing machine. The business is the helper that makes the change possible.

## Story sources close to home

* **Customers:** before and after, a first time buyer, a regular who has come for years. Always ask permission before featuring anyone.
* **The people behind the business:** how Hawa learned to make shea butter from her mother, a day in the life of a chop bar cook.
* **The product's journey:** from shea nuts collected in the bush to a jar on a shelf in Accra.
* **Community moments:** a school sports day the business supported, a festival, Eid or Christmas preparations.

## Story formats for social

The same four beats fit several formats:

* **Before and after:** the problem, then the result, with the change in between.
* **Behind the scenes:** a process people rarely see, such as weaving a Bolga basket from straw to finished piece.
* **Customer voice:** a customer telling their own story in a few sentences, filmed with consent.
* **A day in the life:** one person's day, ending with the product's role in it.
* **Series:** one story told across several short posts, such as "From nut to jar, part 1, 2 and 3", which brings people back.

Choose the format that suits the story and the platform. Reels, TikTok and Shorts reward quick movement; a Facebook post can carry a longer written story with photos.

## Telling the truth

Stories persuade, which is why they must be honest. Do not invent customers, results or testimonials. If you dramatise a scene with actors, make that clear. Do not make health or money claims the business cannot prove. A true small story beats a false big one, and Ghanaian audiences spot fakes quickly.

Consent matters beyond honesty. Explain to anyone you feature where the video will appear and for how long the business will use it. Keep their agreement in writing, even a WhatsApp message. Never film children without a parent's permission.

## Language and culture

Use the language your audience uses. A story in Dagbani, Frafra, Twi, Ewe or Pidgin with English captions can reach people that an English only video misses. Respect cultural and religious sensitivities, and avoid humour that mocks any group.

## From story to script

Your story outline becomes the script in the next lesson. Keep each beat to one sentence now, so you can see the whole story at a glance and test it on a friend: if they can retell it in their own words, it works.`,
      workedExample_md: `Amina wants to promote her catering business in Wa. Instead of a list of dishes, she builds a story.

1. **Finds the hero.** Salifu, a father who was worried about feeding guests at his daughter's naming ceremony. He agrees to appear, and she keeps his WhatsApp reply as a record.
2. **Writes three hooks.** "Two hundred guests and one day's notice", a close up of steaming jollof being scooped into a hundred packs, and the question "Planning a naming ceremony?" She picks the jollof shot with the first line as on screen text.
3. **Problem.** Salifu explains, in Waali with English captions, that he had little time and many guests.
4. **Change.** Amina's team plans the menu with him and delivers on time.
5. **Result and next step.** Guests eating happily, Salifu smiling, and the words "Planning an event? Message us on WhatsApp."
6. **Tests it.** She tells the outline to her cousin, who retells it correctly in one breath.

The story is true, short and focused on Salifu, not on Amina's kitchen.`,
      keyTerms: [
        { term: "Hook", definition: "The first one or two seconds that make people stop scrolling." },
        { term: "Four beat story", definition: "Hook, problem, change, then result and next step." },
        { term: "Hero", definition: "The person the story is about, usually a customer, not the business." },
        { term: "Call to action", definition: "The clear next step you ask viewers to take." },
        { term: "Consent", definition: "A person's agreement to appear, ideally kept in writing." },
      ],
      commonMistakes: [
        "Starting with a logo or a slow greeting instead of a hook",
        "Making the business the hero instead of a real person",
        "Featuring customers without asking permission",
        "Inventing testimonials or results to make a story stronger",
      ],
      selfCheck: [
        "Can you name three hook patterns and give an example of each for your business?",
        "Who is the hero in your strongest story idea?",
        "What should you tell someone before filming them for a business video?",
      ],
      practice_task_md: `**Goal:** Write two short story outlines for your business.

**Steps:**
1. List three possible stories from the sources in the lesson: a customer, a person behind the business, the product's journey or a community moment.
2. Choose the two strongest.
3. For each, write the four beats in one sentence each: hook, problem, change, result and next step.
4. Check that the hero is a person, not the business, and that every detail is true.
5. Note who would need to give permission to appear.

**Done looks like:** Two four beat story outlines, each with a clear hook and next step, ready to turn into a script in the next lesson.`,
      quiz: {
        questions: [
          {
            prompt: "What are the four beats of the story shape in this lesson?",
            options: [
              "Logo, price, address, phone",
              "Introduction, history, staff and awards won",
              "Hook, problem, change, result and next step",
              "Music, dance, filter, hashtag",
            ],
            answer_index: 2,
            explanation: "The lesson uses hook, problem, change, then result and next step.",
          },
          {
            prompt: "Who should usually be the hero of a business's story?",
            options: [
              "The customer or a real person, with the business as the helper",
              "The business itself, since it is the one paying for the story to be told",
              "A famous celebrity",
              "The marketer",
            ],
            answer_index: 0,
            explanation: "The lesson says to make the customer or a real person the hero.",
          },
          {
            prompt: "What must you do before featuring a customer in a story?",
            options: [
              "Nothing",
              "Ask their permission",
              "Change their name without telling them",
              "Pay them in secret",
            ],
            answer_index: 1,
            explanation: "Always ask permission before featuring anyone.",
          },
          {
            prompt: "Which of these breaks the lesson's honesty rule?",
            options: [
              "Telling a small true story about a real customer",
              "Using English captions on a Dagbani video",
              "Inventing a customer and a testimonial",
              "Showing the product's journey from shea nuts to jar",
            ],
            answer_index: 2,
            explanation: "Inventing customers or testimonials is dishonest and not allowed.",
          },
          {
            prompt: "Which opening does the lesson say to avoid?",
            options: [
              "Showing the finished result first",
              "Asking a question the audience already asks",
              "A strong line of on screen text",
              "A logo or a slow greeting",
            ],
            answer_index: 3,
            explanation: "The lesson warns against starting with a logo, a slow greeting or a long welcome.",
          },
        ],
        pass_threshold: 80,
      },
    },

    "video-scripting-and-shooting": {
      outcomes: [
        "Turn a story outline into a timed 30 second script",
        "Make a shot list with b roll",
        "Shoot with good light, steady framing and clear sound",
        "Get the permissions a shoot needs",
      ],
      explanation_md: `The week 8 assignment asks for a 30 second promo video for a small business. Good short videos are planned before anyone presses record. This lesson shows you how to script and shoot one with the camera you already have, whether on a phone, a tablet or a simple camera.

## From story to script

Start from your four beat story outline. A 30 second script has room for roughly six to eight short shots. Write it in three columns:

* **Time:** for example 0 to 3 seconds.
* **What we see:** the shot, such as a close up of hands shaping shea butter.
* **What we hear or read:** voice, music or on screen text.

Put the hook in the first two or three seconds. Many people decide almost immediately whether to keep watching, so do not start with a logo or a slow greeting. End with a clear next step on screen and spoken.

## Counting words

People speak roughly two to three words a second in a relaxed voice. A 30 second promo with a hook, a closing call to action and some silent shots leaves room for only about 50 to 70 spoken words. Read your script aloud with a timer. If it runs long, cut words, not pace; rushed speech is hard to follow, especially in a second language.

## A shot list

From the script, make a list of every shot you need, grouped by location so you can film efficiently. Include a few extra shots, called b roll, such as hands, close ups of the product and the shop sign. They make editing easier and cover any moment where the main shot is weak.

## Shot types

Mix shot sizes to keep the eye interested.

* **Wide shot:** shows the whole place, such as the market stall or the workshop.
* **Medium shot:** a person from the waist up, good for someone talking.
* **Close up:** a face, hands or the product, full of detail and emotion.

A simple sequence of wide, medium, close up tells a viewer where they are, who is there and what matters. Keep the camera at eye level for people, and place the subject a little off centre, with space in the direction they look.

## Shooting well with simple gear

* **Light.** Film near a window or outside in shade. Avoid harsh midday sun on faces and avoid standing with a bright window behind the person.
* **Steady.** Hold the device with both hands and elbows tucked in, lean on a wall, or use a simple stand. Move slowly if you move at all.
* **Sound.** Find a quiet spot away from generators, traffic and fans. Get close to the speaker. A cheap clip on microphone helps a lot if you have one.
* **Framing.** Shoot vertical for Reels, TikTok and Shorts. Keep important things in the centre, because buttons and captions cover the edges.
* **Clean lens.** Wipe it before every session.
* **Several takes.** Record each shot at least twice, and hold each shot for a few seconds longer than you need.

## Before you go

Check that the device is charged and has storage space, that you have a power bank if the shoot is long, and that the settings record in good quality. Plan the shoot for the best light, often early morning or late afternoon, and around power cuts if you need the shop lights.

## Length and platforms

Short vertical videos are common on Instagram Reels, TikTok, Facebook and YouTube Shorts. Each platform sets its own maximum length and changes it from time to time; at the time of writing, YouTube Help says Shorts can be up to three minutes. A 30 second promo fits everywhere, and short videos use less of your audience's data.

## Permissions and safety

Get permission from everyone who appears, and from the owner of any private place you film. Do not film children without a parent's consent. In a busy market, film your subject, not strangers' faces, and stop if someone objects. Avoid copyrighted music unless the platform provides it for that use.`,
      workedExample_md: `Fuseini scripts and shoots a 30 second promo for a basket weaver in Bolgatanga, Sumaila.

1. **Hook, 0 to 3 seconds.** A finished basket swinging from a hand, with the text "Handwoven in Bolgatanga".
2. **Problem and change, 3 to 18 seconds.** Close ups of straw being woven, then Sumaila in a medium shot saying "Every basket takes me two days. I learned from my father."
3. **Result and next step, 18 to 30 seconds.** A customer, Esi, choosing a basket at the stall and smiling, then the basket on a table with the text and voice "Order on WhatsApp" and the number.
4. **Word count.** About 25 spoken words, well inside the limit. He reads it aloud with a timer.
5. **Shot list by place.** Workshop: weaving close ups, Sumaila talking, the dye pots as b roll. Stall: Esi, the basket display, the shop sign.
6. **Permissions.** Sumaila and Esi agree by WhatsApp message.
7. **The shoot.** Early morning in the shade outside the workshop, device charged, lens wiped, two takes of each shot, all vertical.

He ends the day with a folder of clips and his best takes marked.`,
      keyTerms: [
        { term: "Script", definition: "A timed plan of what viewers see and hear in each shot." },
        { term: "Shot list", definition: "Every shot you need, grouped by location for efficient filming." },
        { term: "B roll", definition: "Extra supporting shots, such as hands and product close ups, used in editing." },
        { term: "Close up", definition: "A tight shot of a face, hands or product that shows detail." },
        { term: "Vertical video", definition: "Video shot taller than it is wide, used for Reels, TikTok and Shorts." },
      ],
      commonMistakes: [
        "Writing more words than fit in 30 seconds and then speaking too fast",
        "Filming with a bright window behind the person",
        "Recording each shot only once, with no spare takes or b roll",
        "Filming strangers' faces in a market without permission",
        "Placing text or faces at the edges where platform buttons cover them",
      ],
      selfCheck: [
        "About how many spoken words fit in a 30 second promo?",
        "What does a wide, medium, close up sequence tell the viewer?",
        "What would you check before leaving for a shoot?",
      ],
      practice_task_md: `**Goal:** Script and film the raw clips for a 30 second promo.

**Steps:**
1. Turn your strongest story outline into a three column script of six to eight shots, with the hook in the first three seconds.
2. Make a shot list grouped by location, plus at least three b roll shots.
3. Get permission from everyone who will appear.
4. Film every shot at least twice, vertical, in good light, with the device steady and the lens clean.
5. Watch the clips back and mark your best take of each.

**Done looks like:** A written script, a shot list and a folder of raw clips with your best takes marked, ready for editing.`,
      quiz: {
        questions: [
          {
            prompt: "Where should the hook go in a 30 second script?",
            options: [
              "In the first two or three seconds",
              "At the very end",
              "In the middle",
              "After the logo",
            ],
            answer_index: 0,
            explanation: "People decide almost immediately, so the hook comes first.",
          },
          {
            prompt: "What is b roll?",
            options: [
              "The second half of the video, where the price and contact details are shown",
              "A type of microphone",
              "A paid video ad",
              "Extra shots such as close ups and hands that make editing easier",
            ],
            answer_index: 3,
            explanation: "B roll means extra supporting shots that help in editing.",
          },
          {
            prompt: "Which lighting advice does the lesson give?",
            options: [
              "Film with a bright window behind the person so their face looks soft and even",
              "Film near a window or outside in shade, avoiding harsh midday sun on faces",
              "Always film at night",
              "Use the flash for every shot",
            ],
            answer_index: 1,
            explanation: "Soft light from a window or shade works best.",
          },
          {
            prompt: "Why should you keep important things in the centre of a vertical frame?",
            options: [
              "Because the edges are always blurry",
              "Because buttons and captions cover the edges",
              "Because platforms crop the centre of every vertical video",
              "Because it uses less data",
            ],
            answer_index: 1,
            explanation: "Platform buttons and captions sit at the edges of vertical videos.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "video-editing-and-captions": {
      outcomes: [
        "Edit raw clips into a tight 30 second video",
        "Add and correct captions and on screen text",
        "Export and publish in the right shape for each platform",
        "Use music and sound within the platform's rules",
      ],
      explanation_md: `Raw clips become a promo in the edit. Editing is where you cut out everything slow, put the best moments in order, and add the text and captions that make the video work for people scrolling with the sound off. This lesson finishes the week 8 assignment.

## Free editing tools

Free editors exist for every device. Examples include CapCut and InShot on phones, Canva's video editor in a browser or app, and the editors built into some phones and computers. Each has the same basic tools: trim, split, arrange clips, add text, add music and export. Pick one and learn it well. Check each tool's terms, because some free plans add a watermark or limit features. Canva is named in your week 8 resources and works on any device, which helps if you start on a phone and finish on a computer.

## Editing steps

1. **Import your best takes** in script order.
2. **Trim hard.** Cut the start and end of every clip so each shows only the important moment. Most shots in a 30 second promo last two to five seconds.
3. **Check the hook.** Watch the first three seconds alone. Would you stop scrolling? If not, move your strongest shot to the start.
4. **Add text** for the key message and the call to action. Keep words short and in large, readable type, inside the safe centre area.
5. **Add captions** for every spoken word.
6. **Add music or sound** at a low level under the voice. Use music the platform or editor provides for that use.
7. **Export** in vertical format at a good quality that is not too large for data.

## Pace and rhythm

Short video feels fast because each shot earns its place. Cut on movement, such as a hand reaching or a basket turning, so one shot flows into the next. Change the shot every few seconds unless someone is speaking. Use simple cuts; flashy transitions between every clip look dated and distract from the story. If music has a clear beat, try placing cuts on the beat.

## Why captions matter

Many people watch videos with the sound off, in a busy trotro, at work or late at night. Captions also help people with hearing loss and people who read a language more easily than they hear it. Many editors and platforms can create automatic captions. Always check them, because automatic captions often get Ghanaian names, places and local language words wrong. Fix "Bolga" if it has become "bulger".

Make captions easy to read: two short lines at most, high contrast, and placed where they do not cover faces or the platform's buttons. If the speaker uses a local language, add English captions so more people can follow, and check the translation with a fluent speaker.

## The safe zone

Each platform places buttons, the account name and the caption over the edges of a vertical video, especially the right side and the bottom. Keep text, faces and the product in the middle of the frame. Most editors show guides; if yours does not, preview the export on a real post screen before publishing.

## Export settings

Vertical video is usually exported at a 9:16 shape, and 1080 by 1920 pixels is a common, sharp size. Higher settings make larger files that take longer to upload and use more of viewers' data without looking much better on a phone. Export once, watch the whole file, and fix any mistake before posting.

## Music and sound rules

Using a popular song without permission can get a video muted, blocked or removed. Use the music library inside the platform or your editor, and check that it is allowed for business use; some platforms offer a separate library for business accounts. Natural sound, such as the loom or the market, can be just as effective.

## Publishing well

* **Write a short caption** with the key message and next step, such as "Order your basket on WhatsApp".
* **Choose a clear cover image** so the video looks good in a grid.
* **Upload natively** to each platform rather than sharing a link from another, so it plays smoothly.
* **Add a few relevant hashtags** and the location where it helps.
* **Reply to comments quickly** in the first hours after posting.`,
      workedExample_md: `Fuseini edits his basket promo in a free editor and finishes it in Canva on a library computer.

1. **First cut.** He imports his best takes in script order. The first cut is 48 seconds.
2. **Trim.** He trims every clip and removes a slow shot of the workshop door. The video is now 33 seconds.
3. **Hook check.** He watches the first three seconds alone and moves the swinging basket to the very start.
4. **Pace.** He cuts from the weaving close up to Sumaila's face as Sumaila looks up, so the shots flow.
5. **Text and captions.** He adds "Handwoven in Bolgatanga" in the safe centre area, captions Sumaila's words, and corrects "Sumaila", which the automatic captions spelled wrongly.
6. **Sound.** He uses a track from the editor's library that is allowed for business use, placed low under Sumaila's voice. The final video is 30 seconds.
7. **Export and publish.** Vertical, 1080 by 1920. After the owner approves, he posts it to Reels and TikTok with a caption ending "Order on WhatsApp", then answers every comment that evening.

The video is now ready for his portfolio.`,
      keyTerms: [
        { term: "Trim", definition: "Cutting the start and end of a clip so only the important moment remains." },
        { term: "Captions", definition: "On screen text of the words spoken in a video." },
        { term: "Safe zone", definition: "The centre of a vertical frame that platform buttons and text do not cover." },
        { term: "Aspect ratio", definition: "The shape of a video, such as 9:16 for vertical." },
        { term: "Native upload", definition: "Uploading a video directly to each platform instead of sharing a link." },
      ],
      commonMistakes: [
        "Publishing automatic captions without checking names and local words",
        "Using a popular song without permission, so the video is muted or removed",
        "Placing text at the edges where buttons cover it",
        "Adding a flashy transition between every clip",
        "Exporting a huge file that is slow to upload and heavy on viewers' data",
      ],
      selfCheck: [
        "What do you check in the first three seconds of your rough edit?",
        "Where should text and faces sit in a vertical frame, and why?",
        "How can you add music without breaking the platform's rules?",
      ],
      practice_task_md: `**Goal:** Complete the week 8 assignment: a finished 30 second promo video.

**Steps:**
1. Import your best takes into a free editor in script order.
2. Trim every clip, then check that the first three seconds would stop you scrolling.
3. Add short on screen text and a clear call to action.
4. Add captions and correct every name and local word.
5. Export in vertical format, then write a post caption and choose a cover image.
6. Share it with the business owner for approval before posting.

**Done looks like:** A finished vertical video of about 30 seconds with captions and a call to action, plus its post caption. It belongs in your portfolio.`,
      quiz: {
        questions: [
          {
            prompt: "What is the first thing to check after your rough edit?",
            options: [
              "Whether the music is loud enough",
              "Whether the video is longer than a minute, since longer videos are always shown to fewer people",
              "Whether the logo appears first",
              "Whether the first three seconds would make you stop scrolling",
            ],
            answer_index: 3,
            explanation: "The lesson says to check the hook by watching the first three seconds alone.",
          },
          {
            prompt: "Why should you always check automatic captions?",
            options: [
              "They often get Ghanaian names, places and local words wrong",
              "They are always perfect",
              "They make the video longer",
              "They are not allowed on social media adverts and can get the post removed",
            ],
            answer_index: 0,
            explanation: "Automatic captions often misspell local names and words.",
          },
          {
            prompt: "Who do captions help, according to the lesson?",
            options: [
              "Only the business owner",
              "Only search engines",
              "People watching without sound, people with hearing loss, and people who read more easily than they hear",
              "Nobody; they are decoration",
            ],
            answer_index: 2,
            explanation: "The lesson lists all three groups.",
          },
          {
            prompt: "What does the lesson recommend about free editing tools?",
            options: [
              "Pay for the most expensive editor",
              "Use a different editor for every video so you learn which one gives the best result over time",
              "Never edit, post raw clips",
              "Pick one, learn it well, and check its terms for watermarks or limits",
            ],
            answer_index: 3,
            explanation: "Choose one free tool, learn it, and check its terms.",
          },
          {
            prompt: "Why does the lesson warn against using a popular song in a business video without permission?",
            options: [
              "It always makes the file too large to upload",
              "Platforms can mute, block or remove the video",
              "Songs cannot be added in free editors",
              "Captions stop working when music plays",
            ],
            answer_index: 1,
            explanation: "Music used without permission can get a video muted, blocked or removed, so use the platform's library.",
          },
        ],
        pass_threshold: 80,
      },
    },

    "community-building": {
      outcomes: [
        "Tell an audience from a community",
        "Set purpose, rules and rituals and get people talking",
        "Moderate, protect privacy and measure a community",
      ],
      explanation_md: `Followers watch. A community talks, helps each other and comes back. Businesses with real communities rely less on paid ads because their customers bring friends and stay loyal. Week 9 of the social media specialisation is community building and influencer outreach, and this lesson covers the first half.

## Audience versus community

An audience is a crowd listening to one voice. A community is a group where members also talk to each other. Signs you have a community: members answer each other's questions, share their own photos of the product, and defend the business kindly when someone complains unfairly.

## Where communities live

* **WhatsApp groups** suit small, active groups where everyone can post, such as regular customers or a church choir.
* **WhatsApp Channels** suit one to many updates, like a noticeboard. Followers can react but not chat in the channel.
* **Facebook Groups** suit larger communities with topics, files and events.
* **Comments on Instagram and TikTok** can build community too, when the business replies and starts conversations.

Choose one main home first. Running five half empty spaces is worse than one lively one.

## Purpose, rules and rituals

* **Purpose.** Say clearly why the group exists and who it is for. "Mothers in Tamale sharing natural skincare tips" is clearer than "Hawa's customers".
* **Rules.** A few short rules: be respectful, no spam or unrelated adverts, no sharing other members' numbers, stay on topic. Pin them and enforce them fairly.
* **Rituals.** Regular moments people look forward to: a Monday tip, a Friday question, a monthly live session, a member of the month.

## Getting people talking

* Ask questions people can answer easily, such as "Which do you prefer, plain or scented shea butter?"
* Invite members to share photos or stories, and thank them by name.
* Answer every question quickly, and let members answer each other too.
* Share behind the scenes moments, not only adverts. A useful rule of thumb is to give far more than you sell.

## Moderation and privacy

Remove spam and scams fast, especially fake investment and "send money to win" messages. Handle complaints calmly and move personal details to a private chat. In WhatsApp groups, members can usually see each other's phone numbers, so tell people that before they join, and consider a Channel or Facebook Group where this matters.

## Measuring a community

Count what shows health, not just size: how many members post or reply each week, how many questions members answer for each other, repeat purchases, and referrals. A group of fifty active members is worth more than five thousand silent ones.

## A worked example

Wumpini manages a Facebook Group for a farm inputs shop in Damongo. Its purpose is "Farmers in the Savannah Region sharing advice for better harvests". Every Monday she posts a planting tip, every Thursday she asks members to share a photo of their farm, and once a month an extension officer answers questions live. Farmers now answer each other's questions about pests, and many mention the shop when they buy seed.`,
      practice_task_md: `**Goal:** Design a community plan for your business.

**Steps:**
1. Choose one main home for the community and explain why it fits.
2. Write a one sentence purpose that says who it is for and why it exists.
3. Write four or five short, fair rules.
4. Plan three weekly or monthly rituals.
5. Write three easy questions to get members talking.
6. List three signs of health you will measure each month.

**Done looks like:** A one page community plan with home, purpose, rules, rituals, starter questions and health measures.`,
      quiz: {
        questions: [
          {
            prompt: "What is the key difference between an audience and a community?",
            options: [
              "A community is always bigger",
              "An audience pays to join and a community is free for everyone",
              "In a community, members also talk to each other",
              "There is no difference",
            ],
            answer_index: 2,
            explanation: "The lesson says a community is a group where members also talk to each other.",
          },
          {
            prompt: "Which space suits one to many updates where followers react but do not chat?",
            options: [
              "A WhatsApp Channel",
              "A WhatsApp group",
              "A phone call",
              "A Facebook Group",
            ],
            answer_index: 0,
            explanation: "WhatsApp Channels work like a noticeboard for one to many updates.",
          },
          {
            prompt: "What privacy point does the lesson make about WhatsApp groups?",
            options: [
              "Nobody can see anyone's number, because WhatsApp hides them from every member except the admin",
              "Members can usually see each other's phone numbers, so tell people before they join",
              "Groups are always anonymous",
              "Only admins can post",
            ],
            answer_index: 1,
            explanation: "Group members can see each other's numbers, so people should know before joining.",
          },
          {
            prompt: "Which measure best shows a healthy community?",
            options: [
              "Total member count only",
              "How many adverts the business posts in the group each week, and how many people see them",
              "How many members post, reply and answer each other each week",
              "How long the rules are",
            ],
            answer_index: 2,
            explanation: "The lesson says to measure activity and helpfulness, not just size.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "micro-influencers": {
      outcomes: [
        "Describe what makes a good influencer partner",
        "Spot fake followers",
        "Find and assess local micro influencers",
      ],
      explanation_md: `An influencer is a person whose recommendations their followers trust. Big celebrities are expensive and their audiences are spread across the country. **Micro influencers** have smaller, closer audiences, often in one town, language or interest, and their followers tend to listen to them more personally. For a small business in northern Ghana, a well known local creator in Tamale or Wa can be a better partner than a national star. The week 9 assignment asks you to identify two of them.

## What makes a good partner

Follower numbers are the least important factor. Check these instead:

* **Audience fit.** Do their followers look like the business's customers, in location, age, language and interests?
* **Real engagement.** Do people comment with genuine words, ask questions and tag friends? Do they reply?
* **Values fit.** Is their content respectful and consistent with the business's values? Look back several months, not just this week.
* **Content quality.** Are their videos and photos clear, and do they tell stories well?
* **Reliability.** Do they post consistently, and have past brand partners looked happy?

## Spotting fake followers

Some accounts buy followers or likes. Warning signs include:

* A big follower count but very few comments, or comments that are only emojis or "nice post" repeated.
* Sudden large jumps in followers with no viral post to explain them.
* Most followers from countries that make no sense for a local creator.
* Many followers with no profile photo and no posts.

You cannot always prove it, but if several signs appear, move on.

## Where to find them

* Search hashtags and locations, such as Tamale food, Wa fashion or Bolga markets.
* Look at who already tags the business or its competitors.
* Ask customers which local creators they follow.
* Check local events, campus pages and radio presenters with active social accounts.

## Recording your research

Keep a sheet with: name and handle, platforms, location, language, typical content, approximate audience size, signs of real engagement, values fit notes, and a score out of five for overall fit. Record only what they share publicly, and keep the sheet private.

## A worked example

Rahinatu is searching for partners for Hawa's shea butter. She finds three creators. One has a very large following, but comments are mostly the same short phrase repeated and her audience is mostly outside Ghana. One is a Tamale beauty creator with a modest following, who answers every comment in Dagbani and English and whose followers ask where to buy the products she uses. One is a campus student who reviews local food. Rahinatu shortlists the Tamale beauty creator as the strongest fit, with the student as a possible second for a different product line.`,
      practice_task_md: `**Goal:** Identify and assess two local micro influencers for your business. This is the first half of the week 9 assignment.

**Steps:**
1. Search hashtags and locations relevant to your business and town, and ask at least one customer which local creators they follow.
2. List five possible creators in a sheet using the columns from the lesson.
3. For each, read recent comments and look for the fake follower warning signs.
4. Score each out of five for overall fit and write one sentence explaining the score.
5. Choose your top two.

**Done looks like:** A research sheet of five creators with scores, and two clear choices with reasons.`,
      quiz: {
        questions: [
          {
            prompt: "Why can a micro influencer suit a small local business better than a national celebrity?",
            options: [
              "Their smaller, closer audiences often trust them more personally and may match local customers",
              "They always charge nothing",
              "They have more followers than most celebrities, so a post reaches far more people for less money",
              "They never post adverts",
            ],
            answer_index: 0,
            explanation: "Micro influencers have closer, often local audiences who listen to them personally.",
          },
          {
            prompt: "According to the lesson, which factor matters least?",
            options: [
              "Audience fit",
              "Real engagement",
              "Values fit",
              "Follower numbers",
            ],
            answer_index: 3,
            explanation: "The lesson says follower numbers are the least important factor.",
          },
          {
            prompt: "Which is a warning sign of fake followers?",
            options: [
              "Followers asking where to buy products",
              "A large follower count with very few, repetitive comments",
              "The creator replying in two languages",
              "Steady growth in followers after one of their videos became popular",
            ],
            answer_index: 1,
            explanation: "Big numbers with few or repetitive comments suggest bought followers.",
          },
          {
            prompt: "Why did Rahinatu choose the Tamale beauty creator?",
            options: [
              "She had the most followers of any creator in the Northern Region",
              "Her audience was local, engaged and asked where to buy products",
              "She was the cheapest",
              "She posted only in English",
            ],
            answer_index: 1,
            explanation: "Audience fit and real engagement made her the strongest choice.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "influencer-collaborations": {
      outcomes: [
        "Compare kinds of collaboration",
        "Write a collaboration proposal and agree the details",
        "Disclose honestly and measure results",
      ],
      explanation_md: `Finding the right creator is only the start. Next you have to pitch a collaboration they want to accept, agree clearly what happens, make sure the audience knows it is paid, and measure what it brought in. This lesson completes the week 9 assignment.

## Kinds of collaboration

* **Product for content:** the business gives a product, the creator shares an honest review. This still counts as a commercial relationship.
* **Paid post or video:** an agreed fee for agreed content.
* **Affiliate or commission:** the creator earns a share of sales from a special code or link.
* **Ongoing ambassador:** a longer partnership over months.
* **Event or takeover:** the creator hosts a live session or runs the business's account for a day.

## Writing the proposal

Keep it short and about the creator.

1. **Personal opening:** why you chose them, mentioning specific content you liked.
2. **The business in two sentences:** what it sells and who for.
3. **The idea:** what you would like them to create, with room for their own style. Creators know their audience best.
4. **What they get:** product, fee, commission or a mix. Be clear and fair.
5. **Next step:** a simple question, such as "Would you be open to a short call this week?"

## Agreeing the details

Before anything is made, agree in writing, even a clear WhatsApp message or email is better than nothing:

* What content, on which platforms, and how many posts.
* Key dates and whether the business sees the content before it goes live.
* Payment amount, method such as mobile money, and when it is paid.
* Any claims that must not be made, such as health promises.
* Who can reuse the content afterwards and for how long.

## Honest disclosure

Followers deserve to know when a post is paid or sponsored. Platforms provide tools for this. At the time of writing, Instagram's Help Centre says its Branded Content Policies require creators to use the paid partnership label to tag the brand they work with. TikTok's help says that when you promote a brand, product or service you must turn on the content disclosure setting, and a post made on behalf of another business is then labelled Paid partnership. Labels can change, so check the current screen. Use these tools, and also say it plainly in the caption. Hidden adverts damage trust and can break platform rules.

## Measuring results

Give each creator a unique discount code or a WhatsApp message they ask followers to send, such as "I saw Hawa's video". Then count messages, codes used and sales. Also note new followers and comments. Share the results with the creator, which builds a good relationship for next time.

## A worked example

Rahinatu writes to the Tamale beauty creator: "Hello Ayishetu, your harmattan skincare video was so practical, and your followers clearly trust you. I work with Hawa's women's group, who make pure shea butter by hand in Tamale. Would you try our butter for two weeks and share an honest video if you like it? We would send products and pay a fee by mobile money. Could we talk this week?" They agree the details by email, Ayishetu uses the paid partnership label, and followers send "Ayishetu sent me" on WhatsApp so Hawa can count orders.`,
      practice_task_md: `**Goal:** Complete the week 9 assignment: two collaboration proposals.

**Steps:**
1. For each of your two chosen creators, decide the type of collaboration that fits.
2. Write a proposal of under 150 words using the five parts in the lesson.
3. Write a short list of details to agree: content, platforms, dates, payment, claims to avoid, reuse.
4. Choose a tracking method: a unique code or a phrase for WhatsApp messages.
5. Note how the creator will disclose the partnership.

**Done looks like:** Two personalised proposals, each with an agreement checklist, a tracking method and a disclosure plan. Show them to the owner before sending anything.`,
      quiz: {
        questions: [
          {
            prompt: "What should the opening of an influencer proposal do?",
            options: [
              "List the business's full history",
              "State the lowest fee you will pay so they know straight away whether to reply",
              "Ask for their follower numbers",
              "Say why you chose them, mentioning specific content you liked",
            ],
            answer_index: 3,
            explanation: "A personal opening shows you know and value their work.",
          },
          {
            prompt: "What does Instagram's help say its branded content policies require?",
            options: [
              "Creators must use the paid partnership label to tag the business they work with",
              "Nothing; disclosure is optional",
              "Only celebrities must disclose",
              "Disclosure is needed only in private messages between the creator and the business",
            ],
            answer_index: 0,
            explanation: "The lesson cites Instagram's requirement to use the paid partnership label.",
          },
          {
            prompt: "Is a product given in exchange for content a commercial relationship?",
            options: [
              "No, gifts never count",
              "Only if the product is expensive, such as a phone or a laptop",
              "Yes, it still counts as a commercial relationship",
              "Only on TikTok",
            ],
            answer_index: 2,
            explanation: "The lesson says product for content still counts.",
          },
          {
            prompt: "How can a business measure sales from a creator's post?",
            options: [
              "Guess from the number of likes",
              "Ask the creator to estimate how many of their followers bought, based on comments and likes",
              "It cannot be measured",
              "Give the creator a unique code or a phrase followers send on WhatsApp, then count them",
            ],
            answer_index: 3,
            explanation: "Unique codes or phrases let the business count results.",
          },
        ],
        pass_threshold: 75,
      },
    },

    // GOOGLE ADS AND SEARCH MARKETING

    "google-ads": {
      outcomes: [
        "Describe what the Google Ads specialisation covers",
        "Explain how search ads and SEO work together",
        "Use free training and handle money responsibly",
      ],
      explanation_md: `Search marketing puts a business in front of people at the exact moment they look for what it sells. Someone typing "car rental Tamale airport" is not idly scrolling; they need a car. That is what makes search ads powerful, and why businesses look for people who can run them carefully. This specialisation uses Google Ads, a widely used search ads platform, as the example. Microsoft Advertising and others work on similar ideas.

## What this specialisation covers

You met search ads briefly in the Digital Marketer roadmap. Here you go deeper over three weeks.

* **Week 7, fundamentals.** How the auction works, campaign types and goals, and account structure.
* **Week 8, keywords and ad copy.** Keywords and match types, writing responsive search ads, and assets with landing pages.
* **Week 9, optimisation and budgeting.** Budgets and bid strategies, reading campaign data, and optimising a campaign.

## Search ads and SEO

Search ads and SEO both aim at search results, but they work differently.

* **Ads** appear quickly once a campaign is approved, and you pay when someone clicks (for most search campaigns). They stop when the budget stops.
* **SEO** costs time rather than a fee per click, takes longer to work, and keeps working once pages rank.

Many businesses use both: ads for quick results and to test which keywords bring customers, SEO for lasting visibility.

## Free training and certification

Google offers free online training on Skillshop, including the "Get Search Ad Campaign Ready" material mentioned in the DMP curriculum, and Google Ads certifications. Some employers ask for them, but they are not a substitute for being able to explain your decisions. This specialisation gives you that understanding in plain language.

## Handling money responsibly

A Google Ads account spends the client's money, often charged to a card. Some important habits:

* **Agree the budget in writing** before anything runs.
* **Use the client's own account and payment method,** or give them full access, so they always own their data and history.
* **Check daily for the first week** of any new campaign.
* **Never promise rankings or sales numbers.** Promise a careful process and honest reports.

You do not need to spend money to learn. Every lesson's practice can be done as a plan in a sheet. If a practice step asks you to open an account and the setup asks for payment details, stop there and continue the plan in a sheet.

## A small example

Abdul-Rahman manages a car rental business in Tamale. Most customers arrive by air and search on their phones as they land. He creates a small search campaign around keywords such as "car hire Tamale airport" and "rent a car Tamale", with ads mentioning airport pickup and mobile money payment. Calls begin to come in from travellers who had never heard of the business. He checks the campaign each day for the first week, removes searches that waste money, and reports honestly to the owner each month.`,
      practice_task_md: `**Goal:** Choose your business and test what appears for its searches.

**Steps:**
1. Pick a real business you can talk to, or your mock business from earlier weeks.
2. Write five phrases a customer ready to buy might search, such as "car hire Tamale airport".
3. Search each phrase and note whether ads appear, which businesses advertise, and what their ads promise.
4. Write two sentences on whether search ads suit this business, and why.
5. Optional: open Google Skillshop and browse the free Google Ads training topics.

**Done looks like:** A short note with five buyer phrases, what ads appeared, and your judgement on whether search ads fit the business.`,
      quiz: {
        questions: [
          {
            prompt: "Why are search ads powerful for many businesses?",
            options: [
              "They are always free",
              "They guarantee the first position on the page for as long as the campaign runs",
              "They reach people at the moment they search for what the business sells",
              "They replace the need for a phone number",
            ],
            answer_index: 2,
            explanation: "The lesson says search ads reach people at the exact moment of need.",
          },
          {
            prompt: "How do search ads differ from SEO?",
            options: [
              "Ads appear quickly and are paid per click; SEO takes longer but keeps working without a fee per click",
              "Ads take years to work; SEO is instant",
              "There is no difference",
              "SEO costs money per click; ads are free",
            ],
            answer_index: 0,
            explanation: "The lesson contrasts quick paid ads with slower, lasting SEO.",
          },
          {
            prompt: "Whose account and payment method should a campaign usually use?",
            options: [
              "The marketer's personal account and card, so the client never has to see the ad settings",
              "The client's own account and payment method, or with full client access",
              "A friend's account",
              "No account is needed",
            ],
            answer_index: 1,
            explanation: "The client should own their account, data and history.",
          },
          {
            prompt: "What should you do if setting up an account for practice asks for payment details?",
            options: [
              "Enter any card you can find",
              "Borrow a friend's card",
              "Stop there and continue the plan in a sheet",
              "Give up the specialisation",
            ],
            answer_index: 2,
            explanation: "The lesson says you can learn everything as a plan without spending money.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "google-ads-auction": {
      outcomes: [
        "Describe what happens in a search auction",
        "Explain Ad Rank and Quality Score",
        "Explain how paying per click works",
      ],
      explanation_md: `Every time someone searches, Google Ads runs an auction in a fraction of a second to decide which ads appear, in what order, and whether any appear at all. Understanding this auction is the foundation of week 7 and the reason a well run small campaign can beat a bigger budget.

## What happens in a search

1. Someone searches "laptop repair Tamale".
2. The system finds every ad whose keywords match the search.
3. For each, it works out the **Ad Rank**, a set of values that decides whether the ad can show and where.
4. Ads that meet the minimum standards show, highest Ad Rank first.

## What goes into Ad Rank

Google Ads Help lists several factors:

* **Your bid,** the most you are willing to pay for a click.
* **The quality of your ads and landing page,** how relevant and useful they are.
* **Ad Rank thresholds,** minimum standards an ad must meet to show at all.
* **How competitive the auction is.**
* **The context of the search,** such as location, device, time and the words used.
* **The expected impact of assets,** such as a phone number or extra links.

Google notes that relevance can make up for a lower bid. An advertiser with highly relevant keywords and ads can win a higher position at a lower price than a competitor bidding more.

## Quality Score

Google Ads gives each keyword a **Quality Score** from 1 to 10. It is based on three parts, each rated above average, average or below average:

* **Expected clickthrough rate:** how likely people are to click your ad.
* **Ad relevance:** how closely the ad matches the intent of the search.
* **Landing page experience:** how useful and relevant the page is after the click.

Google says Quality Score is a diagnostic tool and is not itself an input in the auction. It is a helpful summary of whether your ads and pages are relevant, and improving those things helps your Ad Rank.

## Paying per click

On most search campaigns you pay only when someone clicks. You set a maximum, but you often pay less than your maximum, depending on the auction. You never pay just because your ad was shown on a search campaign charged per click.

## A worked example

Two shops in Tamale advertise for "laptop repair Tamale". Shop A bids more but its ad says only "Electronics and More" and sends people to a general home page. Shop B, run by Wumpini, bids less, but its ad says "Laptop Repair in Tamale, Same Day Screen Fix" and lands on a page about laptop repairs with prices and a WhatsApp button. Because Wumpini's ad and page are far more relevant to the search, her ad can appear above Shop A while she pays less per click.`,
      practice_task_md: `**Goal:** Analyse real ads through the lens of Ad Rank.

**Steps:**
1. Search two buyer phrases for your business type and town.
2. For each ad that appears, note the headline and where it leads.
3. For each, rate on a scale of low, medium or high: how relevant the ad is to the search, and how relevant the landing page is.
4. Write a short paragraph explaining which ad you think would have the best quality and why.
5. Write one headline that would be more relevant than the ones you saw.

**Done looks like:** A small table of ads with relevance ratings, a paragraph of analysis, and one improved headline.`,
      quiz: {
        questions: [
          {
            prompt: "What does Ad Rank decide?",
            options: [
              "Whether an ad can show and where it appears",
              "How many followers a business has",
              "The price of the product",
              "How fast the website loads",
            ],
            answer_index: 0,
            explanation: "Ad Rank decides eligibility and position.",
          },
          {
            prompt: "What are the three parts of Quality Score?",
            options: [
              "Bid, budget and schedule",
              "Followers, likes and shares",
              "Headline length, the colour of the ad and the font used on the landing page",
              "Expected clickthrough rate, ad relevance and landing page experience",
            ],
            answer_index: 3,
            explanation: "Quality Score is based on expected CTR, ad relevance and landing page experience.",
          },
          {
            prompt: "What does Google say about Quality Score and the auction?",
            options: [
              "It is the only input in the auction",
              "It is a diagnostic tool and not itself an input in the auction",
              "It decides the exact price of every click, and nothing else is used in the auction",
              "It is hidden from advertisers",
            ],
            answer_index: 1,
            explanation: "Google describes Quality Score as diagnostic, not an auction input.",
          },
          {
            prompt: "In the example, how could Wumpini's ad appear above a higher bidder?",
            options: [
              "She paid a secret fee",
              "Her ad and landing page were far more relevant to the search",
              "She used more keywords than the other bidder in her ad group",
              "Her shop is older",
            ],
            answer_index: 1,
            explanation: "Relevance can make up for a lower bid in the auction.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "campaign-types-and-goals": {
      outcomes: [
        "Start a campaign from its goal",
        "Compare the main campaign types",
        "Choose a type and define success",
      ],
      explanation_md: `Google Ads offers several kinds of campaign, each built for a different goal and showing ads in different places. Choosing the right type is one of the first questions in the "Get Search Ad Campaign Ready" training and in junior job interviews.

## Start with the goal

Before choosing a type, write the business goal in one sentence. Typical goals are:

* **Sales:** people buy online, in the shop or by phone.
* **Leads:** people call, send a message or fill a form.
* **Website traffic:** people visit and read.
* **Awareness:** more people know the brand.
* **App installs:** people download an app.

## The main campaign types

Google Ads Help describes these main types. Names and options change over time, so check the current list when you build.

* **Search:** text ads on search results for people searching what you offer. Best for capturing existing demand.
* **Performance Max:** one goal based campaign that runs across Google's channels, using Google's automation to decide where ads show.
* **Display:** image ads on websites, apps and Google properties. Good for awareness and reminding past visitors.
* **Video:** video ads on YouTube and other sites.
* **Demand Gen:** visual ads in places such as YouTube and Gmail, aimed at creating interest.
* **Shopping:** product listings with images and prices. You need an online shop and a product feed in Google Merchant Center.
* **App:** promotes an app across Google's services.

## Why beginners start with Search

Search campaigns are the clearest place to learn. You choose the keywords, write the ads, and can see exactly which searches led to clicks. The person is already looking for the product, so even a small budget can find real customers. Automated campaign types such as Performance Max can work well, but they make decisions you cannot fully see, and they usually work best with conversion tracking and enough data. Learn the basics in Search first.

## Matching type to business

* A plumber in Tamale who wants calls: **Search**, with a call asset.
* A new restaurant in Wa that wants people to know it exists: **Video** or **Display** in a small area, alongside its Business Profile.
* An online shop with a catalogue: **Shopping** or **Performance Max**, once tracking is set up.
* A fintech app: **App** campaigns.

## Measuring the goal

Whatever the type, decide what counts as success. Google Ads calls important actions **conversions**: a purchase, a form, a call from an ad, or a click on a WhatsApp button. Without conversions set up, you can only measure clicks, which tells you little about sales. For a business without a website, calls from ads and a simple question to every new customer, "How did you hear about us?", still give useful evidence.

## A worked example

Mariama's guesthouse in Tamale wants direct bookings. She has a simple website with a phone number and a booking form. Issahaku recommends a Search campaign targeting travellers searching for places to stay in Tamale, with a call asset, and sets the booking form and calls as conversions. Later, once there is enough booking data, they can test other campaign types.`,
      practice_task_md: `**Goal:** Choose the right campaign type for your business and define success.

**Steps:**
1. Write the business goal in one sentence.
2. From the list in the lesson, choose the campaign type that fits best and explain why in two sentences.
3. Name one other type you considered and why you did not choose it now.
4. Write down what will count as a conversion, and how you will measure it if the business has no website.

**Done looks like:** A short campaign brief with goal, chosen type, reasons, and a clear definition of a conversion.`,
      quiz: {
        questions: [
          {
            prompt: "Which campaign type shows text ads on search results to people looking for what you offer?",
            options: [
              "Display",
              "App",
              "Video",
              "Search",
            ],
            answer_index: 3,
            explanation: "Search campaigns show text ads on search results.",
          },
          {
            prompt: "Why does the lesson recommend that beginners start with Search?",
            options: [
              "You choose keywords and ads and can see which searches led to clicks",
              "It is the only campaign type that businesses in Ghana are allowed to run",
              "It never costs money",
              "It shows only video ads",
            ],
            answer_index: 0,
            explanation: "Search is the clearest type to learn because you see and control what happens.",
          },
          {
            prompt: "What does Google Ads call important actions such as a purchase, a form or a call?",
            options: [
              "Impressions",
              "Placements",
              "Conversions",
              "Assets",
            ],
            answer_index: 2,
            explanation: "Important actions are called conversions.",
          },
          {
            prompt: "Which campaign type needs a product feed and an online shop?",
            options: [
              "Search",
              "Video",
              "Display",
              "Shopping",
            ],
            answer_index: 3,
            explanation: "Shopping campaigns show product listings, which need a feed and online shop.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "account-structure": {
      outcomes: [
        "Explain the layers of an ads account",
        "Organise campaigns into tight ad groups",
        "Check campaign settings and name things clearly",
      ],
      explanation_md: `A messy Google Ads account wastes money and makes reports confusing. A tidy one makes every decision easier. Employers often hand a junior an existing account and ask, "What would you change?" Understanding structure is how you answer.

## The layers

* **Account:** the business's home in Google Ads, with its billing, users and overall settings such as currency and time zone. Currency usually cannot be changed later, so choose cedis if the business pays in cedis.
* **Campaign:** sets the budget, the campaign type, the locations and languages, the networks, the bid strategy and the schedule.
* **Ad group:** a set of closely related keywords and the ads written for them.
* **Keywords:** the words and phrases that decide which searches can show your ads.
* **Ads and assets:** what people see, plus extras such as phone numbers and extra links.

## Organising campaigns

Create separate campaigns when you need different budgets, locations or goals. For example, a hotel might have one campaign for rooms and another for its conference hall, because they have different budgets and customers. A business serving Tamale and Accra might split by location if it wants to control spending in each.

## Tight ad groups

Each ad group should cover one theme, so the ad can speak directly to every keyword in it. If an ad group mixes "laptop repair", "phone screen repair" and "printer ink", no single ad can be relevant to all three. Split them into three ad groups, each with its own ads.

A simple test: could you write one headline that perfectly answers every keyword in the group? If not, split the group.

## Campaign settings worth checking

* **Locations:** target where customers actually are. Check whether the setting includes people located in, or merely interested in, a place, and choose what fits.
* **Languages:** usually English for Ghana, plus any other language your ads use.
* **Networks:** Search campaigns can include partner sites and the Display Network. Many beginners turn off the Display Network in a Search campaign so they can see search results clearly.
* **Ad schedule:** limit hours if nobody answers the phone at night.

## Naming

Use clear, consistent names, for example "Search Repairs Tamale" for a campaign and "Laptop Screen" for an ad group. Anyone reading a report should understand it without asking you.

## A worked example

Sumaila inherits an account for an electronics shop in Wa. It has one campaign called "Campaign 1" and one ad group with forty keywords covering phones, laptops, TVs and solar lights. He rebuilds it as one Search campaign called "Search Repairs Wa", with four ad groups: Phone Repair, Laptop Repair, TV Repair and Solar Lights. Each has five to ten closely related keywords and ads written for that theme. He limits locations to Wa and nearby towns, turns off the Display Network, and sets the schedule to shop hours.`,
      practice_task_md: `**Goal:** Design the account structure for your business on paper or in a sheet.

**Steps:**
1. Decide how many campaigns you need and why, based on budgets, locations or goals.
2. For each campaign, list its settings: type, locations, language, networks, schedule.
3. Plan two to four ad groups per campaign, each with one clear theme.
4. Apply the one headline test to each ad group.
5. Give everything a clear name.

**Done looks like:** A structure diagram or sheet showing campaigns, settings and themed ad groups, all clearly named.`,
      quiz: {
        questions: [
          {
            prompt: "At which level are budget, locations and bid strategy usually set?",
            options: [
              "Account",
              "Ad group",
              "Campaign",
              "Keyword",
            ],
            answer_index: 2,
            explanation: "These settings belong to the campaign.",
          },
          {
            prompt: "What should each ad group contain?",
            options: [
              "One theme of closely related keywords and ads written for them",
              "Every keyword the business could ever want, so the ads can show on any search",
              "Only one ad and no keywords",
              "Keywords for different businesses",
            ],
            answer_index: 0,
            explanation: "Tight, single theme ad groups let ads speak directly to every keyword.",
          },
          {
            prompt: "What is the one headline test?",
            options: [
              "Writing only one headline for the whole account",
              "Checking whether one headline could perfectly answer every keyword in the group; if not, split it",
              "Using the business name as the only headline",
              "Testing a headline for one day only",
            ],
            answer_index: 1,
            explanation: "If no single headline fits every keyword, the group should be split.",
          },
          {
            prompt: "Why might you create separate campaigns for rooms and a conference hall?",
            options: [
              "Because Google requires a separate campaign for each product a business sells",
              "Because it makes reports longer",
              "Because they have different budgets and customers",
              "Because ad groups cannot hold keywords",
            ],
            answer_index: 2,
            explanation: "Separate campaigns are useful when budgets, locations or goals differ.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "keywords-and-match-types": {
      outcomes: [
        "Choose keywords with buying intent",
        "Use match types",
        "Add negative keywords",
      ],
      explanation_md: `Keywords decide which searches can trigger your ads. Choose them well and your budget reaches people ready to buy. Choose badly and you pay for clicks from people who will never become customers. This is the first half of week 8, campaign setup with keywords and ad copy.

## Choosing keywords with buying intent

For search ads, focus on phrases that show someone is ready to act:

* **Service plus place:** "plumber in Tamale", "car hire Wa".
* **Action words:** buy, order, book, hire, repair, delivery, price.
* **Specific products:** "solar fridge for shop", "Samsung screen replacement".

Learning phrases, such as "how does a solar panel work", are better served by SEO content than paid clicks. You can find ideas the same way as in SEO: search suggestions, related searches, and customers' own words. Keyword Planner inside Google Ads adds estimates once the account setup, including billing details, is complete.

## Match types

Each keyword has a match type that controls how closely a search must match it. Google Ads Help describes three.

* **Broad match:** the default, written with no symbols, such as car hire Tamale. Ads can show on searches related to the keyword, even ones that do not contain its words. It reaches the most searches. Google recommends using it with Smart Bidding, which uses conversion data to set bids.
* **Phrase match:** written in quotation marks, such as "car hire Tamale". Ads can show on searches that include the meaning of the keyword. It reaches fewer searches than broad and more than exact.
* **Exact match:** written in square brackets, such as [car hire Tamale]. Ads can show on searches with the same meaning or intent as the keyword. It gives the most control and reaches the fewest searches.

For a small budget without much conversion data, many advertisers start with phrase and exact match to keep control, then test broad match once conversion tracking is working.

## Negative keywords

A negative keyword stops your ad showing on searches that include it. They are one of the best ways to save money.

* A car hire business that does not offer jobs adds "jobs", "salary" and "driver vacancy".
* A new phone shop that does not repair phones adds "repair".
* A business wanting customers, not learners, may add "free", "course" or "how to".

Negative keywords can be added to a campaign or an ad group, and they behave a little differently from normal match types, so check Google's help when you build.

## A worked example

Abdul-Rahman builds keywords for the car rental business. In the "Airport Car Hire" ad group he uses "car hire Tamale airport", [rent a car Tamale airport] and "airport taxi Tamale". He adds negatives: jobs, driver vacancy, bus, cheap flights and Kumasi, because the business only operates in Tamale. He expects most clicks to come from travellers ready to book.`,
      practice_task_md: `**Goal:** Build the keyword list for one ad group. This is the first half of the week 8 assignment.

**Steps:**
1. Choose one ad group from your account structure.
2. List eight to fifteen keywords with buying intent, using search suggestions and customers' own words.
3. Assign each keyword a match type and write it with the correct symbols: none, quotation marks or square brackets.
4. Write at least eight negative keywords and say why each one wastes money.
5. Remove any learning keyword that would suit SEO content better.

**Done looks like:** A sheet with keywords, match types written correctly, and a list of negative keywords with reasons.`,
      quiz: {
        questions: [
          {
            prompt: "How is a phrase match keyword written?",
            options: [
              "In quotation marks",
              "With no symbols",
              "In square brackets",
              "With a plus sign",
            ],
            answer_index: 0,
            explanation: "Phrase match uses quotation marks.",
          },
          {
            prompt: "Which match type gives the most control and reaches the fewest searches?",
            options: [
              "Broad match",
              "Phrase match",
              "Negative match",
              "Exact match",
            ],
            answer_index: 3,
            explanation: "Exact match, in square brackets, gives the most control and the narrowest reach.",
          },
          {
            prompt: "What does a negative keyword do?",
            options: [
              "Lowers the price of every click on that keyword",
              "Stops your ad showing on searches that include it",
              "Writes bad reviews of competitors",
              "Hides the business from maps",
            ],
            answer_index: 1,
            explanation: "Negative keywords exclude searches containing them.",
          },
          {
            prompt: "Which keyword shows the strongest buying intent for a plumber in Tamale?",
            options: [
              "how do pipes work",
              "plumber in Tamale",
              "plumbing history",
              "free plumbing course",
            ],
            answer_index: 1,
            explanation: "Service plus place shows someone ready to hire.",
          },
          {
            prompt: "What does Google recommend using with broad match?",
            options: [
              "No budget",
              "Only one keyword",
              "Display Network only",
              "Smart Bidding",
            ],
            answer_index: 3,
            explanation: "Google recommends broad match with Smart Bidding, which uses conversion data.",
          },
        ],
        pass_threshold: 80,
      },
    },

    "responsive-search-ads": {
      outcomes: [
        "Explain the responsive search ad format",
        "Write headlines and descriptions that follow the rules",
        "Use pinning carefully",
      ],
      explanation_md: `The ad text is what persuades someone to click. On Google search, the standard format is the **responsive search ad**. You write several headlines and descriptions, and Google combines them into different versions, learning which work best. The week 8 assignment asks for a sample search campaign with three ad copies, and this lesson shows you how to write them.

## The format

According to Google Ads Help:

* You can enter up to 15 headlines and 4 descriptions per ad, with a minimum of 3 headlines and 2 descriptions.
* Each headline can have up to 30 characters, and each description up to 90 characters.
* The display path has two optional fields of up to 15 characters each, shown after the website address.
* Google shows a combination: usually Headline 1 and Description 1, with others added when space and predicted performance allow.

Because headlines can appear in any order, each one must make sense on its own and next to any other.

## What to write

Aim for variety, so the system has real choices.

* **Keyword headlines:** include the main keyword or close to it, such as "Car Hire at Tamale Airport".
* **Benefit headlines:** "Clean, Air Conditioned Cars", "Airport Pickup Included".
* **Proof headlines:** facts the business can back up, such as "Open 7 Days" or "Drivers Available".
* **Offer or price headlines:** only if true and current.
* **Action headlines:** "Book Your Car Today", "Call or WhatsApp Now".
* **Descriptions** expand on benefits and end with a clear next step, such as how to book and pay.

## Pinning

You can pin a headline or description to a position so it always appears there, for example a required legal line or the business name. Pinning reduces the combinations Google can test, so pin only when you must.

## Writing rules

* Be accurate. Never promise what the business cannot deliver.
* Follow Google Ads policies: no excessive capital letters, no repeated punctuation like "!!!", no misleading claims, and restrictions on certain products such as health and financial services.
* Match the landing page. If the ad says "Same Day Screen Fix", the page must say so too.
* Use plain words customers use, not company jargon.

## A worked example

Hawa's niece Rahinatu writes a responsive search ad for shea butter delivery.

Headlines include: "Pure Shea Butter from Tamale", "Handmade by Women in Tamale", "Delivery Across Ghana", "Pay with Mobile Money", "Order on WhatsApp Today", "Unrefined Shea Butter", "Natural Skin and Hair Care".

Descriptions include: "Pure, unrefined shea butter made by hand by our women's group in Tamale. Order today." and "Delivery across Ghana. Pay easily with mobile money. Message us on WhatsApp to order."

Each headline is under 30 characters and makes sense in any combination.`,
      practice_task_md: `**Goal:** Write three complete responsive search ads. This completes the week 8 assignment.

**Steps:**
1. Choose three ad groups from your structure, or three angles for one ad group.
2. For each ad, write at least 8 headlines of 30 characters or fewer, covering keyword, benefit, proof and action.
3. Write at least 2 descriptions of 90 characters or fewer, each ending with a clear next step.
4. Count characters with a sheet formula such as LEN, or a word counter.
5. Read random pairs of headlines together to check they always make sense.
6. Note any headline you would pin and why.

**Done looks like:** A sheet with three ads, every line within its character limit, plus your keyword list from the last lesson: together, a sample search campaign.`,
      quiz: {
        questions: [
          {
            prompt: "What is the character limit for a responsive search ad headline?",
            options: [
              "30 characters",
              "15 characters",
              "90 characters",
              "No limit",
            ],
            answer_index: 0,
            explanation: "Google Ads Help gives a 30 character limit for headlines.",
          },
          {
            prompt: "Up to how many headlines can you enter in one responsive search ad?",
            options: [
              "3",
              "5",
              "15",
              "50",
            ],
            answer_index: 2,
            explanation: "You can enter up to 15 headlines and 4 descriptions.",
          },
          {
            prompt: "Why must every headline make sense on its own?",
            options: [
              "Because only one headline is ever shown at a time, and Google picks it at random each day",
              "Because headlines are read aloud",
              "Because descriptions are not allowed",
              "Because Google can show headlines in different combinations and orders",
            ],
            answer_index: 3,
            explanation: "Google combines headlines in different orders, so each must stand alone.",
          },
          {
            prompt: "What is the downside of pinning many headlines?",
            options: [
              "It makes the ad more expensive",
              "It deletes the other headlines",
              "It reduces the combinations Google can test",
              "It is against the rules",
            ],
            answer_index: 2,
            explanation: "Pinning limits combinations, so pin only when you must.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "assets-and-landing-pages": {
      outcomes: [
        "Add useful ad assets",
        "Describe what a good landing page does",
        "Track the action when there is no website",
      ],
      explanation_md: `An ad is only the first step. Assets make the ad bigger and more useful, and the landing page decides whether a click becomes a customer. Landing page experience is also one of the three parts of Quality Score, so this lesson directly affects how well your campaign performs.

## Assets

Assets, once called extensions, add extra information to search ads. Common ones include:

* **Sitelinks:** extra links to specific pages, such as Prices, Delivery and Contact.
* **Callouts:** short phrases such as "Open 7 Days" or "Mobile Money Accepted".
* **Structured snippets:** a list under a heading, such as Services: Phone Repair, Laptop Repair, TV Repair.
* **Call asset:** a phone number people can use to call straight from the ad.
* **Location asset:** the address from a linked Business Profile.
* **Image asset:** a picture shown with the ad in some placements.

Google decides when to show assets, and adding them does not cost extra in itself; you pay for clicks as usual. Add the ones that genuinely help customers. A call asset is often valuable for local businesses, because many customers prefer to call or message.

## What a good landing page does

The landing page is where people arrive after clicking. It should:

* **Match the ad.** If the ad says "Laptop Repair in Tamale", the page should be about laptop repair in Tamale, not the home page of a general shop.
* **Answer the key questions fast:** what, where, how much, how to buy.
* **Make the next step obvious:** a call button, a WhatsApp button or a short form, near the top of the page.
* **Load quickly on mobile data:** small images, little clutter, no autoplaying video.
* **Build trust:** real photos, address, genuine reviews, clear contact details.
* **Be honest:** prices and offers must match the ad.

## When there is no website

Many small businesses do not have a website yet. Options include a simple free site builder page, a Google Business Profile, or a one page site built with a free tool. Some campaigns can use call assets so people can call straight from the ad. Whatever you use, follow Google's policies: the destination must work, be relevant to the ad and be useful.

## Tracking the action

Link the landing page actions to conversions: a call from the ad, a form, or a click on the WhatsApp button. This lets you see which keywords and ads bring real enquiries, which you need for week 9.

## A worked example

Wumpini's laptop repair ad in Tamale used to send people to the shop's home page, which showed TVs and phone cases first. She builds a simple page titled "Laptop Repair in Tamale" with a short list of repairs and starting prices, a photo of the technician at work, opening hours, the address with a landmark, and large Call and WhatsApp buttons at the top. She adds sitelinks for Prices and Location, callouts for "Same Day Screen Fix" and "Mobile Money Accepted", and a call asset. Enquiries become easier to track and more people who click actually get in touch.`,
      practice_task_md: `**Goal:** Plan assets and a landing page for one ad group.

**Steps:**
1. Write four sitelinks with short link text and where each leads.
2. Write four callouts of a few words each, all true for the business.
3. Write one structured snippet with a heading and at least three values.
4. Sketch the landing page on paper or in Google Slides: headline matching the ad, key facts, trust signals and a clear call to action at the top.
5. Write the one action you will count as a conversion.

**Done looks like:** A list of assets and a one page landing page sketch that matches your ad and makes the next step obvious.`,
      quiz: {
        questions: [
          {
            prompt: "What are sitelinks?",
            options: [
              "Extra links in an ad to specific pages such as Prices or Contact",
              "Links from other websites to yours, which Google counts in the ad",
              "Links in a social media bio",
              "Broken links on your site",
            ],
            answer_index: 0,
            explanation: "Sitelinks are assets that add extra links to specific pages.",
          },
          {
            prompt: "What is the most important rule for a landing page?",
            options: [
              "It must be the home page",
              "It must match the ad's promise and make the next step obvious",
              "It must have autoplaying video",
              "It must be as long as possible so that every question is answered on one page",
            ],
            answer_index: 1,
            explanation: "A landing page should match the ad and make it easy to act.",
          },
          {
            prompt: "Landing page experience is part of which score?",
            options: [
              "Ad Strength",
              "Credit score",
              "Quality Score",
              "Engagement rate",
            ],
            answer_index: 2,
            explanation: "It is one of the three parts of Quality Score.",
          },
          {
            prompt: "Why does the lesson suggest a call asset is often valuable for local businesses?",
            options: [
              "Because many customers prefer to call or message",
              "Because calls are free",
              "Because websites are not allowed",
              "Because it replaces keywords",
            ],
            answer_index: 0,
            explanation: "Many customers prefer calling or messaging, so a way to call straight from the ad helps.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "budgets-and-bidding": {
      outcomes: [
        "Set an average daily budget",
        "Compare bid strategies",
        "Plan budget and bidding for a campaign",
      ],
      explanation_md: `Week 9 of the Google Ads specialisation is optimisation and budgeting. Before you can optimise, you need to understand how money moves through a campaign: the budget limits spending, and the bid strategy decides how each auction is approached.

## Average daily budget

In Google Ads, each campaign has an **average daily budget**. Google Ads Help explains two important rules:

* On any single day, a campaign can spend up to twice its average daily budget, to take advantage of days with more searches.
* Over a month, it will not charge more than 30.4 times the average daily budget. That number is roughly the average days in a month.

So if a client can afford a certain amount per month, divide it by 30.4 to find the daily budget. Explain to the client that some days will be higher and some lower, and that the monthly limit protects them.

## Setting a budget

* **Start with what the client can afford to learn with.** A campaign needs enough clicks to give useful data, but no amount is "correct" for every business.
* **Agree it in writing,** including who pays the platform and how.
* **Avoid spreading a small budget across many campaigns.** One focused campaign learns faster than five starved ones.
* **Watch whether the budget limits the campaign.** Google Ads shows when a campaign is "limited by budget", which means it could show more often with more money.

## Bid strategies

Google Ads offers several bid strategies. Google Ads Help describes these among others:

* **Manual CPC:** you set the maximum cost per click yourself. Full control, more work.
* **Maximise clicks:** Google sets bids to get as many clicks as possible within the budget. Useful for new campaigns without conversion data.
* **Maximise conversions:** Google sets bids to get as many conversions as possible while spending the budget.
* **Target CPA:** Google aims for as many conversions as possible at a cost per action you set.
* **Target ROAS:** Google aims for conversion value at a return on ad spend you set. Useful when sales have different values.

Strategies that use conversions are called **Smart Bidding**. They need conversion tracking that works and enough conversions to learn from.

## Choosing a strategy

A simple path for a small business:

1. Set up conversion tracking first.
2. Start with Maximise clicks or Manual CPC while you learn which keywords work.
3. Once the campaign records conversions regularly, test Maximise conversions.
4. When results are steady, consider a target such as Target CPA.

Change strategy rarely, and give each change time, because automated strategies need a learning period.

## A worked example

The car rental business in Tamale can afford a certain amount per month for ads. Abdul-Rahman divides it by 30.4 to set the daily budget, and writes to the owner explaining that daily spend can vary up to twice that amount, but the monthly total will not go over the limit. He starts with Maximise clicks, sets up calls and WhatsApp clicks as conversions, and plans to test Maximise conversions after several weeks of data.`,
      practice_task_md: `**Goal:** Plan the budget and bidding for your sample campaign.

**Steps:**
1. Ask the owner, or decide for a mock business, a monthly amount they could afford to learn with.
2. Divide it by 30.4 to find the average daily budget, and write the calculation.
3. Write a two sentence explanation for the owner of how daily and monthly limits work.
4. Choose a starting bid strategy and explain why in two sentences.
5. Write the conditions under which you would switch to a Smart Bidding strategy.

**Done looks like:** A short budget and bidding plan with the calculation, the client explanation and your strategy path.`,
      quiz: {
        questions: [
          {
            prompt: "How much can a Google Ads campaign spend on a single day?",
            options: [
              "Exactly its daily budget, never more",
              "Ten times its daily budget",
              "Any amount without limit",
              "Up to twice its average daily budget",
            ],
            answer_index: 3,
            explanation: "Google Ads Help says daily spend can reach up to twice the average daily budget.",
          },
          {
            prompt: "What is the monthly charging limit?",
            options: [
              "Twice the daily budget",
              "30.4 times the average daily budget",
              "There is no monthly limit",
              "The daily budget times 7",
            ],
            answer_index: 1,
            explanation: "Over a month, charges will not exceed 30.4 times the average daily budget.",
          },
          {
            prompt: "Which bid strategy lets you set the maximum cost per click yourself?",
            options: [
              "Maximise conversions",
              "Manual CPC",
              "Target ROAS",
              "Target CPA",
            ],
            answer_index: 1,
            explanation: "Manual CPC means you set the maximum bids yourself.",
          },
          {
            prompt: "What do Smart Bidding strategies need to work well?",
            options: [
              "A very small budget",
              "No keywords",
              "Daily strategy changes",
              "Working conversion tracking and enough conversions to learn from",
            ],
            answer_index: 3,
            explanation: "Smart Bidding uses conversion data, so it needs tracking and enough conversions.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "reading-campaign-data": {
      outcomes: [
        "Name and calculate the key campaign numbers",
        "Read the search terms report",
        "Read results by segment and avoid mistakes",
      ],
      explanation_md: `The week 9 objective is to analyse campaign data and suggest bid adjustments. Before you can suggest anything, you need to read a report confidently and know what each number tells you.

## The key numbers

* **Impressions:** how many times ads were shown.
* **Clicks:** how many times people clicked.
* **CTR (clickthrough rate):** clicks divided by impressions. It shows how appealing and relevant the ad is to the searches it appears on.
* **Average CPC (cost per click):** total cost divided by clicks.
* **Cost:** total spent.
* **Conversions:** the important actions you defined, such as calls, forms or WhatsApp clicks.
* **Conversion rate:** conversions divided by clicks. It shows how well the landing page and offer turn visitors into enquiries.
* **Cost per conversion:** cost divided by conversions. Often the most important number for a small business.
* **Impression share:** the share of possible impressions your ads received. It shows if you are missing searches because of budget or rank.

## Calculating them yourself

Practise on small numbers. Suppose an ad group had 2,000 impressions, 80 clicks, cost 400 cedis and 8 conversions.

* CTR = 80 ÷ 2,000 = 4 percent.
* Average CPC = 400 ÷ 80 = 5 cedis.
* Conversion rate = 8 ÷ 80 = 10 percent.
* Cost per conversion = 400 ÷ 8 = 50 cedis.

These are invented numbers for practice, not benchmarks. What counts as good depends on the business, its prices and its margins.

## The search terms report

Your keywords are not the same as what people actually typed. The **search terms report** shows the real searches that triggered your ads. It is where you find waste, such as "car hire jobs Tamale" for a rental business, and new ideas, such as "car hire with driver Tamale", which might deserve its own keyword.

## Reading by segment

Break results down to find patterns.

* **By device:** do calls come mostly from phones?
* **By location:** is one town much cheaper per conversion?
* **By time of day and day of week:** do enquiries come at hours when nobody answers?
* **By keyword and ad:** which bring conversions at a reasonable cost?

## Avoiding mistakes

* **Small numbers mislead.** Five clicks are not enough to judge a keyword. Wait for more data before big decisions.
* **Compare like with like:** same period length, same season.
* **Link to real sales.** Ask the owner how many enquiries became paying customers.

## A worked example

Fuseini reviews a month of a mock campaign for a solar shop in Bolgatanga. "Solar panel price Bolgatanga" has a good conversion rate and a reasonable cost per conversion. "Solar energy" has many clicks but no conversions. The search terms report shows "solar energy course" and "solar jobs" triggering ads. Calls come mostly from phones on weekday mornings. He now has clear evidence for his recommendations in the next lesson.`,
      practice_task_md: `**Goal:** Analyse a small set of mock campaign data.

**Steps:**
1. In Google Sheets, create a table for four keywords with invented impressions, clicks, cost and conversions. Make them different: one strong, one weak, one with no conversions, one with too little data.
2. Add formulas for CTR, average CPC, conversion rate and cost per conversion.
3. Write a list of six imaginary search terms, including two that waste money.
4. Write three sentences on what the data tells you, naming the strongest and weakest keyword.

**Done looks like:** A sheet with working formulas, a search terms list, and a short written analysis.`,
      quiz: {
        questions: [
          {
            prompt: "How is clickthrough rate (CTR) calculated?",
            options: [
              "Clicks divided by impressions",
              "Cost divided by clicks",
              "Conversions divided by clicks",
              "Impressions divided by cost",
            ],
            answer_index: 0,
            explanation: "CTR is clicks divided by impressions.",
          },
          {
            prompt: "A campaign spends 400 cedis and gets 8 conversions. What is the cost per conversion?",
            options: [
              "8 cedis",
              "40 cedis",
              "50 cedis",
              "400 cedis",
            ],
            answer_index: 2,
            explanation: "400 divided by 8 is 50 cedis.",
          },
          {
            prompt: "What does the search terms report show?",
            options: [
              "The keywords your competitors use and how much they pay for each click",
              "Your website's speed",
              "Your social media followers",
              "The actual searches people typed that triggered your ads",
            ],
            answer_index: 3,
            explanation: "It shows the real searches behind your ad impressions and clicks.",
          },
          {
            prompt: "Why should you not judge a keyword on five clicks?",
            options: [
              "Because clicks do not matter",
              "Because Google hides the data",
              "Because five clicks are too few to be reliable",
              "Because keywords cannot be changed",
            ],
            answer_index: 2,
            explanation: "Small numbers mislead; wait for more data.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "optimising-campaigns": {
      outcomes: [
        "Follow the optimisation loop",
        "Make common improvements and bid adjustments",
        "Write clear recommendations",
      ],
      explanation_md: `Optimisation is the steady work of using data to spend money better. It is what clients pay for month after month, and it completes the week 9 assignment: analysing campaign data, suggesting bid adjustments, and setting up a demo campaign to show your settings.

## The optimisation loop

1. **Review** the data at a regular rhythm, daily at first, then weekly.
2. **Decide** on a small number of changes based on evidence.
3. **Change one main thing at a time,** and write it in a change log with the date and reason.
4. **Wait** long enough to see the effect, then review again.

## Common improvements

* **Add negative keywords** from the search terms report. This is often the quickest saving.
* **Pause or fix weak keywords** that spend money with no conversions after enough clicks.
* **Add strong search terms** as new keywords, maybe in their own ad group with their own ads.
* **Improve ads:** replace headlines with weak performance, add new benefits, and keep at least one good ad running while you test.
* **Improve the landing page** if clicks are good but conversions are poor.
* **Adjust budget:** move money towards campaigns with good cost per conversion, if they are limited by budget.

## Bid adjustments

With Manual CPC, you set bids for keywords and can add **bid adjustments**: percentage changes for certain conditions, such as:

* **Device:** raise bids on phones if most calls come from phones.
* **Location:** raise bids in a town with cheaper conversions, lower them where results are poor.
* **Ad schedule:** lower bids, or stop ads, at hours when nobody answers the phone.

With Smart Bidding, Google sets bids for each auction using many signals, and most manual adjustments are not used. In that case, you optimise through targets, budgets, keywords, ads and landing pages instead. Check Google Ads Help for which adjustments apply to your strategy.

## Writing recommendations

Owners approve changes they understand. For each recommendation, write:

* **What:** "Add 'jobs', 'course' and 'free' as negative keywords."
* **Why:** "These searches cost money last month and brought no enquiries."
* **Expected effect:** "Less wasted spend; the same or more enquiries."

Keep it to three to five recommendations at a time.

## A safe demo campaign

The week 9 assignment asks you to create a Google Ads account, set up a demo campaign and submit screenshots of the settings. You can build the campaign structure and settings to practise, but make sure nothing goes live and no money is spent: do not add payment details for practice, keep the campaign paused, and stop at the billing step if asked. If the setup will not continue without payment, document your settings in a sheet and screenshots of each screen you completed. Never use someone else's card.

## A worked example

From his analysis of the Bolgatanga solar shop campaign, Fuseini recommends: add "course", "jobs" and "free" as negatives; pause "solar energy", which spent money with no conversions; raise bids on phones, where most calls come from; lower bids after 6 pm, when the shop is closed; and test a new headline mentioning instalment payments. He logs each change with a date, and plans to review again in two weeks.`,
      practice_task_md: `**Goal:** Complete the week 9 assignment: recommendations and a demo campaign.

**Steps:**
1. Using your mock data from the last lesson, write three to five recommendations, each with what, why and expected effect. Include at least one bid adjustment for device, location or schedule.
2. Start a change log in a sheet with columns for date, change, reason and result.
3. Optional and only if no payment is needed: open a Google Ads account, build your campaign structure as a paused campaign, and screenshot each settings screen. Stop at any billing step.
4. If you cannot continue without payment, record your settings in a sheet instead.

**Done looks like:** A recommendation list with bid adjustments, a change log, and screenshots or a settings sheet for your demo campaign. No money spent.`,
      quiz: {
        questions: [
          {
            prompt: "What is often the quickest saving in a search campaign?",
            options: [
              "Adding negative keywords from the search terms report",
              "Doubling the budget",
              "Deleting all ads",
              "Changing the account currency",
            ],
            answer_index: 0,
            explanation: "Negative keywords stop spending on searches that will never buy.",
          },
          {
            prompt: "Why should you change one main thing at a time?",
            options: [
              "Because Google allows only one change per month",
              "So you can tell which change caused the effect",
              "Because changes are expensive",
              "Because owners dislike changes",
            ],
            answer_index: 1,
            explanation: "One change at a time shows what caused any difference.",
          },
          {
            prompt: "Which is an example of a bid adjustment?",
            options: [
              "Rewriting a headline",
              "Adding a sitelink",
              "Lowering bids at hours when nobody answers the phone",
              "Changing the landing page photo to one that better matches the ad",
            ],
            answer_index: 2,
            explanation: "Ad schedule adjustments change bids for certain hours.",
          },
          {
            prompt: "What should each recommendation to the owner include?",
            options: [
              "What, why and the expected effect",
              "Only the change, with no reason",
              "A promise of a set number of sales",
              "Technical words only",
            ],
            answer_index: 0,
            explanation: "Clear what, why and expected effect help owners approve changes.",
          },
          {
            prompt: "What should you do if a demo account asks for payment details?",
            options: [
              "Use someone else's card",
              "Launch the campaign anyway",
              "Enter fake details",
              "Stop at the billing step and document your settings instead",
            ],
            answer_index: 3,
            explanation: "Practice must spend no money; stop and document settings.",
          },
        ],
        pass_threshold: 80,
      },
    },
  },
};

export default content;
