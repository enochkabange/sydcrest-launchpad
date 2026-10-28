import { RES } from "./resources";
import type { ResourceDraft, RoadmapDraft } from "./types";

/** Track specific links not in the shared pool; each checked to resolve (October 2026). */
const inkscapeLearn: ResourceDraft = { label: "Inkscape: Learn", url: "https://inkscape.org/learn/", kind: "article" };
const inkscapeTutorials: ResourceDraft = {
  label: "Inkscape tutorials",
  url: "https://inkscape.org/learn/tutorials/",
  kind: "practice",
};
const inkscapeGuide: ResourceDraft = {
  label: "Inkscape Beginners Guide",
  url: "https://inkscape-manuals.readthedocs.io/",
  kind: "article",
};
const photopeaLearn: ResourceDraft = { label: "Photopea: Learn", url: "https://www.photopea.com/learn/", kind: "article" };
const gimpTutorials: ResourceDraft = { label: "GIMP tutorials", url: "https://www.gimp.org/tutorials/", kind: "article" };
const googleFontsKnowledge: ResourceDraft = {
  label: "Google Fonts Knowledge",
  url: "https://fonts.google.com/knowledge",
  kind: "article",
};
const choosingType: ResourceDraft = {
  label: "Google Fonts Knowledge: Choosing type",
  url: "https://fonts.google.com/knowledge/choosing_type",
  kind: "article",
};
const colorWheel: ResourceDraft = {
  label: "Adobe Color wheel (free in the browser)",
  url: "https://color.adobe.com/create/color-wheel",
  kind: "practice",
};
const contrastChecker: ResourceDraft = {
  label: "WebAIM contrast checker",
  url: "https://webaim.org/resources/contrastchecker/",
  kind: "practice",
};
const ccLicences: ResourceDraft = {
  label: "Creative Commons: About the licences",
  url: "https://creativecommons.org/cc-licenses/",
  kind: "article",
};
const ofl: ResourceDraft = { label: "SIL Open Font License", url: "https://openfontlicense.org/", kind: "article" };
const wipoCopyright: ResourceDraft = { label: "WIPO: Copyright", url: "https://www.wipo.int/en/web/copyright/", kind: "article" };
const wipoTrademarks: ResourceDraft = {
  label: "WIPO: Trademarks",
  url: "https://www.wipo.int/en/web/trademarks/",
  kind: "article",
};
const scribusWiki: ResourceDraft = { label: "Scribus wiki and guides", url: "https://wiki.scribus.net/", kind: "article" };
const jobbermanCreative: ResourceDraft = {
  label: "Jobberman Ghana: Creative and Design jobs",
  url: "https://www.jobberman.com.gh/jobs/creative-design",
  kind: "practice",
};

export const graphicDesign: RoadmapDraft = {
  slug: "graphic-designer",
  title: "Graphic Designer",
  description:
    "Design flyers, social media graphics, logos and brand materials that shops, churches, schools, NGOs and agencies pay for. Start with free design apps on your phone or computer, then learn the principles, print know how, client skills and portfolio that turn design into paid work.",
  track: "graphic-design",
  field_category: "design",
  level: "beginner",
  leads_to: ["ui-ux", "content-creation", "social-media-management"],
  locale: "en-GH",
  status: "draft",
  nodes: [
    {
      slug: "foundations",
      title: "Foundations",
      summary:
        "Find out what graphic designers in Ghana actually do, which free tools you can start with today and the few principles behind every good design. You can do everything in this section on a phone or a computer.",
      parent: null,
      optional: false,
      resources: [RES.lfDesign],
    },
    {
      slug: "what-designers-do",
      title: "What graphic designers do",
      summary:
        "See where designers work, from print shops and agencies to in house teams, NGOs and freelance clients. Learn the kinds of jobs they are given and what employers look for first.",
      parent: "foundations",
      optional: false,
      resources: [jobbermanCreative, RES.lfDesign],
    },
    {
      slug: "design-tools",
      title: "Free design tools on a phone or laptop",
      summary:
        "Meet the main kinds of design tool and the difference between pixel images and vector shapes. Choose free tools that run on your phone or a basic laptop and learn which file types to save.",
      parent: "foundations",
      optional: false,
      resources: [RES.lfCanva, photopeaLearn, inkscapeLearn],
    },
    {
      slug: "design-principles",
      title: "Design principles",
      summary:
        "Hierarchy, contrast, alignment, proximity, repetition and space decide whether a design is clear or confusing. Learn to see them in the flyers around you and use them on purpose.",
      parent: "foundations",
      optional: false,
      resources: [RES.lfDesign],
    },
    {
      slug: "visual-basics",
      title: "Type, colour, layout and images",
      summary:
        "These four building blocks appear in every advert for a designer. This section teaches each one with examples from Ghanaian shops, churches and events.",
      parent: null,
      optional: false,
      resources: [RES.lfDesign, googleFontsKnowledge],
    },
    {
      slug: "typography",
      title: "Typography",
      summary:
        "Choose and pair fonts, set sizes and spacing, and make text easy to read on a small screen or a poster across the road. Learn why two fonts are usually enough.",
      parent: "visual-basics",
      optional: false,
      resources: [choosingType, googleFontsKnowledge],
    },
    {
      slug: "colour",
      title: "Colour",
      summary:
        "Build small colour palettes, use contrast so text stays readable and understand what colours suggest to people. Learn why colours on screen can look different once printed.",
      parent: "visual-basics",
      optional: false,
      resources: [colorWheel, contrastChecker],
    },
    {
      slug: "layout-and-grids",
      title: "Layout and grids",
      summary:
        "Arrange text and images on a page using margins, columns and alignment so the eye knows where to go. Practise turning a crowded flyer into a calm, clear one.",
      parent: "visual-basics",
      optional: false,
      resources: [RES.lfDesign],
    },
    {
      slug: "images-and-photos",
      title: "Images and photo editing",
      summary:
        "Crop, straighten, brighten and cut out photos, and understand resolution so pictures stay sharp. Learn where to find images you are allowed to use.",
      parent: "visual-basics",
      optional: false,
      resources: [photopeaLearn, gimpTutorials, ccLicences],
    },
    {
      slug: "branding",
      title: "Branding and logos",
      summary:
        "A brand is how people recognise and remember a business, and the logo is only one part of it. This section covers designing logos and keeping a brand consistent.",
      parent: null,
      optional: false,
      resources: [RES.lfDesign],
    },
    {
      slug: "logo-design",
      title: "Logo design",
      summary:
        "Go from questions and sketches to a simple vector logo that works small, large, in colour and in black. Learn why a laptop helps here and what to do if you only have a phone.",
      parent: "branding",
      optional: false,
      resources: [inkscapeTutorials, inkscapeGuide],
    },
    {
      slug: "brand-identity",
      title: "Brand identity and guidelines",
      summary:
        "Put a logo, colours, fonts and photo style together into a short brand guide that anyone can follow. Employers often ask designers to work within brand guidelines like these.",
      parent: "branding",
      optional: false,
      resources: [RES.lfDesign],
    },
    {
      slug: "client-designs",
      title: "Designs clients ask for",
      summary:
        "Most paid design work in Ghana is social media graphics, flyers, banners and other printed materials. This section teaches how to make each one well and get it printed properly.",
      parent: null,
      optional: false,
      resources: [RES.lfCanva],
    },
    {
      slug: "social-media-graphics",
      title: "Social media graphics",
      summary:
        "Design posts, Status images and simple carousels in the right sizes, with one clear message and small file sizes. Learn to build reusable templates for a business that posts often.",
      parent: "client-designs",
      optional: false,
      resources: [RES.lfCanva],
    },
    {
      slug: "flyers-and-posters",
      title: "Flyers, posters and banners",
      summary:
        "Design event flyers, church programmes, posters and banners that people can read quickly from a distance. Learn how a flyer for WhatsApp differs from one for print.",
      parent: "client-designs",
      optional: false,
      resources: [RES.lfDesign, scribusWiki],
    },
    {
      slug: "print-production",
      title: "Print basics for Ghanaian printers",
      summary:
        "Prepare files that a local print shop can print without surprises, with the right size, bleed, resolution and colour mode. Learn what to ask the printer and why you always check a proof.",
      parent: "client-designs",
      optional: false,
      resources: [inkscapeGuide, scribusWiki],
    },
    {
      slug: "motion-basics",
      title: "Simple motion graphics",
      summary:
        "Add simple movement to a design, such as text that appears or a logo that slides in, for Status and social video. This is optional but agency and multimedia adverts often ask for it.",
      parent: "client-designs",
      optional: true,
      resources: [RES.lfCanva],
    },
    {
      slug: "client-work",
      title: "Working with clients",
      summary:
        "Good design is wasted if the brief is unclear, the files break the rules or the price is wrong. This section covers briefs and feedback, using other people's work fairly and getting paid.",
      parent: null,
      optional: false,
      resources: [RES.lfBizWriting],
    },
    {
      slug: "briefs-and-feedback",
      title: "Briefs, feedback and revisions",
      summary:
        "Ask the right questions before you start, agree what is included and handle feedback calmly. Learn to limit revisions so one flyer does not take a whole week.",
      parent: "client-work",
      optional: false,
      resources: [RES.lfCommunication, RES.lfBizWriting],
    },
    {
      slug: "copyright-and-ethics",
      title: "Copyright, fonts, images and AI tools",
      summary:
        "Learn what you may and may not use from the internet, how font and image licences work and why copying another designer's work hurts you. Use AI image tools honestly and check their terms.",
      parent: "client-work",
      optional: false,
      resources: [wipoCopyright, ofl, wipoTrademarks],
    },
    {
      slug: "pricing-and-invoicing",
      title: "Pricing, quotes and invoices in cedis",
      summary:
        "Work out a fair price from your time and costs, write a clear quote and ask for a deposit before you start. Send simple invoices and keep records of every mobile money payment.",
      parent: "client-work",
      optional: false,
      resources: [RES.lfMoney, RES.lfFreelancing],
    },
    {
      slug: "getting-hired",
      title: "Getting hired and getting paid",
      summary:
        "A strong portfolio matters more than a certificate for most design jobs. This section covers building one, finding freelance clients and applying for design roles.",
      parent: null,
      optional: false,
      resources: [RES.lfJobsearch],
    },
    {
      slug: "portfolio",
      title: "Building a design portfolio",
      summary:
        "Choose your best eight to twelve pieces, show the problem and your thinking behind each one and present them in a light, phone friendly format. Real projects for local clients count.",
      parent: "getting-hired",
      optional: false,
      resources: [RES.lfDesign, jobbermanCreative],
    },
    {
      slug: "freelancing",
      title: "Freelancing for local and remote clients",
      summary:
        "Find first clients among shops, churches, schools and events near you, then grow through referrals. Learn how remote design work and online platforms fit in and how to avoid scams.",
      parent: "getting-hired",
      optional: false,
      resources: [RES.lfFreelancing],
    },
    {
      slug: "job-search",
      title: "Design jobs and applications",
      summary:
        "Look for roles at print shops, agencies, in house marketing teams and NGOs, and prepare for design tests. Write a short application that points straight to your portfolio.",
      parent: "getting-hired",
      optional: false,
      resources: [jobbermanCreative, RES.lfResume, RES.lfInterview],
    },
  ],
};
