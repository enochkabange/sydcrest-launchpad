import type { TrackContent } from "./types";

/**
 * Lesson content for the Excel and Power BI track (issue #198). Original SydCrest
 * writing; sources, adverts and the coverage table are in
 * src/content/research/excel-power-bi.md. Every dataset, shop and person in these
 * lessons is invented for teaching; none of the numbers describe real places or people.
 */
const content: TrackContent = {
  roadmap: "excel-power-bi",
  nodes: {
    "spreadsheet-basics": {
      explanation_md: `## Why spreadsheets matter for work in Ghana

Walk into almost any office in Tamale, Wa or Accra and you will find a spreadsheet doing important work. A rural bank tracks loan repayments in one. An NGO in Bolgatanga counts how many farmers attended each training. A pharmacy keeps its stock list in one, and the accounts officer builds the monthly report from it. Job adverts for accounts officers, MIS officers, monitoring and evaluation (M&E) staff and administrators keep asking for the same thing: confident Excel skills.

The good news is that you do not need an expensive computer or a paid licence to start. Everything in this first section works in free Excel for the web, the free Excel app, or Google Sheets.

## What a spreadsheet is

A spreadsheet is a grid. Columns are named with letters (A, B, C) and rows with numbers (1, 2, 3). Where a column and a row meet is a **cell**, and every cell has an address such as \`B4\`, which means column B, row 4. A file is called a **workbook**, and one workbook can hold several **sheets**, shown as tabs along the bottom.

A cell can hold three kinds of things:

* **Text**, such as a name or a district.
* **Numbers**, such as a price in cedis or a date (Excel stores dates as numbers behind the scenes).
* **Formulas**, which always start with \`=\` and calculate an answer from other cells.

The power of a spreadsheet is that formulas update by themselves. Change one price and every total that depends on it changes too.

## What this section covers

* **Getting Excel for free:** setting up Excel for the web, the Excel app or Google Sheets, saving to the cloud, and knowing which jobs are easier on a bigger screen.
* **Tidy tables:** entering data so that it can be sorted, counted and summarised later. This habit matters more than any clever formula.
* **Formulas and references:** making the spreadsheet do the arithmetic, and copying formulas without breaking them.

## A small example

Hawa sells shea butter in Tamale Central Market. She writes each sale in a notebook: date, customer, tubs sold, price per tub. At the end of the month she adds everything up by hand and often gets a different total each time.

In a spreadsheet, Hawa types the same four details into four columns, one sale per row. In a fifth column she writes a formula that multiplies tubs by price for each row. At the bottom, one more formula adds up the whole column. Now the total is right every time, and when she corrects a mistake the total fixes itself. That is the whole idea of a spreadsheet, and the rest of this track builds on it.

## How to study this section

Work with real or realistic records from people around you: a trader, a church treasurer, a school bursar. Keep every file you make. By the end of the track they become the start of your portfolio.`,
      practice_task_md: `**Goal:** get comfortable moving around a spreadsheet.

1. Open Excel for the web, the Excel app or Google Sheets on your device. If you do not have an account yet, Google Sheets with a Google account is the quickest start; the next lesson covers Excel accounts.
2. Create a new blank file and name it "Hawa sales practice".
3. In row 1 type these headings in A1 to D1: Date, Customer, Tubs, Price per tub.
4. Type five made up sales in rows 2 to 6. Use names such as Amina, Fuseini and Mariama.
5. Click cell C4 and check that the address shown near the top matches.
6. Add a second sheet tab and rename it "Notes". Write one line about what each column means.

**Done looks like:** a saved workbook with two sheets, four headings and five rows of sales. Take a screenshot and share it with a mentor.`,
      quiz: {
        questions: [
          {
            prompt: "What does the cell address B4 refer to?",
            options: [
              "Row B, column 4",
              "Column B, row 4",
              "The fourth sheet in the workbook",
              "The fourth formula in column B",
            ],
            answer_index: 1,
            explanation: "Columns are named with letters and rows with numbers, so B4 is column B, row 4.",
          },
          {
            prompt: "What does every formula in a spreadsheet start with?",
            options: [
              "A plus sign",
              "The word SUM",
              "An equals sign",
              "A cell address",
            ],
            answer_index: 2,
            explanation: "Formulas always start with = so the spreadsheet knows to calculate rather than store text.",
          },
          {
            prompt: "Hawa corrects the number of tubs in one sale. What happens to a total that is calculated with a formula?",
            options: [
              "It stays the same until she retypes it",
              "It updates by itself",
              "It shows an error",
              "It is deleted",
            ],
            answer_index: 1,
            explanation: "Formulas recalculate automatically when the cells they depend on change.",
          },
          {
            prompt: "What is a workbook?",
            options: [
              "One row of data",
              "A printed report",
              "A single cell that holds a formula",
              "A spreadsheet file that can hold several sheets",
            ],
            answer_index: 3,
            explanation: "A workbook is the file, and it can contain several sheets shown as tabs.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "excel-on-a-phone": {
      explanation_md: `## Why this matters

Employers ask for Excel by name, so it pays to practise in Excel itself. You do not need to buy it to learn. Microsoft offers free versions, and Google Sheets is a free spreadsheet that works in almost the same way. Knowing your options means you can practise today on whatever device you have.

## Your three free options

**1. Excel for the web.** Open a browser, go to the Microsoft 365 website and sign in with a free Microsoft account. If you have an Outlook or Hotmail address you already have one; otherwise you can create one with any email address. Your files are saved in OneDrive, Microsoft's online storage, which comes with some free space. Excel for the web has formulas, tables, charts, PivotTables, sorting, filtering and conditional formatting. It cannot run macros, and some advanced tools are missing or need a paid plan.

**2. The Excel app.** On a phone or a small tablet, the free Excel app from your app store lets you create, view and do basic editing with a free Microsoft account. Microsoft limits free editing to screens of 10.1 inches or smaller; on bigger tablets you can view files but need a subscription to edit. Some premium features show a message asking you to subscribe. Everything in the early lessons of this track works without one.

**3. Google Sheets.** Free with a Google account, in a browser or as an app. Most formulas you learn here work the same in Sheets, including XLOOKUP, and you can download any sheet as an Excel file (.xlsx) to send to an employer.

## Saving and sharing

Save your work in the cloud (OneDrive or Google Drive) so it is safe if your device is lost and you can open it on any other device. Give files clear names such as "Stock list Tamale shop Oct 2026" rather than "Book1". To share, send a link and choose whether the other person can view or edit.

## Saving data

Opening a spreadsheet uses little data, but uploading large files and watching video tutorials uses more. Download practice files once on Wi Fi when you can. Google Sheets lets you make files available offline, and the Excel app can open files stored on your device without a connection.

## When a bigger screen helps

You can learn a lot on a small screen. A few jobs are easier on a laptop or desktop: building PivotTables on large tables, reading very wide sheets and, later, Power Query and Power BI Desktop. When a lesson truly needs a computer, it will say so and suggest options such as a school lab, a library or an internet café.

## A small example

Issahaku has an Android phone and no laptop. He signs in to the Excel app with a new Microsoft account, creates a workbook called "Church dues 2026" and saves it to OneDrive. On Saturday he opens the same file in Excel for the web on a computer at the community library, adds a chart, and the change is already there when he checks his phone at home.`,
      practice_task_md: `**Goal:** set up a free spreadsheet tool and save a file in the cloud.

1. Choose one option: Excel for the web, the Excel app, or Google Sheets.
2. Sign in, or create a free Microsoft or Google account if you need one.
3. Create a new workbook called "Practice workbook YourName".
4. Type three headings (Item, Quantity, Price in cedis) and three made up rows, such as rice, sugar and oil.
5. Confirm the file is saved in OneDrive or Google Drive, then open it from a second device or browser if you can.
6. Share it with a friend or mentor as "view only" and ask them to confirm they can open it.

**Done looks like:** a cloud saved workbook with a clear name, three rows of data and a view only link you can send to a mentor.`,
      quiz: {
        questions: [
          {
            prompt: "Where are files you create in free Excel for the web saved?",
            options: [
              "Only on the device you used",
              "In OneDrive, Microsoft's online storage",
              "In Google Drive",
              "On a USB stick you must plug in",
            ],
            answer_index: 1,
            explanation: "Excel for the web saves files in OneDrive so you can open them on any device.",
          },
          {
            prompt: "What limit does Microsoft set on free editing in the Excel app without a subscription?",
            options: [
              "You can only open files, never create them",
              "Only five files can be edited per month",
              "Free editing is limited to screens of 10.1 inches or smaller",
              "Editing works only when you are offline",
            ],
            answer_index: 2,
            explanation: "With a free account you can create and do basic editing on screens up to 10.1 inches; larger screens need a subscription to edit.",
          },
          {
            prompt: "Which of these can Excel for the web NOT do?",
            options: [
              "Create PivotTables",
              "Sort and filter data",
              "Add charts",
              "Run macros",
            ],
            answer_index: 3,
            explanation: "Excel for the web supports PivotTables, sorting and charts, but macros do not run in a browser.",
          },
          {
            prompt: "An employer asks for your work as an Excel file, but you built it in Google Sheets. What can you do?",
            options: [
              "Rebuild it from scratch in Excel",
              "Download the sheet as an .xlsx Excel file",
              "Send a screenshot only",
              "Tell the employer Google Sheets files cannot be shared",
            ],
            answer_index: 1,
            explanation: "Google Sheets can download any sheet as an Excel .xlsx file.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "tidy-tables": {
      explanation_md: `## Why this matters

Most spreadsheet problems in offices are not formula problems. They are layout problems. A manager asks "how many bags of rice did we sell in March?" and nobody can answer quickly because the sheet has merged cells, totals typed in the middle and three different spellings of "rice". If you enter data tidily from the start, every later skill in this track (functions, PivotTables, charts, Power BI) becomes easy.

## The rules of a tidy table

* **One row per record.** Each sale, each beneficiary, each stock item gets its own row.
* **One column per detail.** Date in one column, item in another, quantity in another.
* **One header row** at the top, with short, clear column names.
* **One kind of value per column.** A Quantity column holds only numbers. Write \`5\` in Quantity and "bags" in a separate Unit column, not "5 bags" in one cell, because Excel cannot add up text.
* **No merged cells, no blank rows, no totals in the middle.** Put totals in a separate summary area or sheet.
* **Consistent spellings.** "Rice", "Rice " (with a hidden space at the end) and "Ryce" look alike to you but are three different values to Excel. Excel ignores capital letters when it counts and groups, but it does not ignore extra spaces or typos.

## Turning a range into an Excel table

Once your data is tidy, click any cell in it and choose **Insert, then Table** (on a computer you can also press Ctrl and T). Tick "My table has headers". Excel then:

* adds filter buttons to every header,
* shades alternate rows so they are easier to read,
* grows the table automatically when you add a new row underneath,
* lets you give the table a name, such as \`Stock\`, which later formulas and PivotTables can use.

Google Sheets has a similar feature called "Convert to table" on the Format menu.

## A worked example

Sumaila manages a provisions shop in Tamale. His old stock sheet looks like this: a big merged title across the top, item names in bold with sizes underneath in the same column, quantities written as "12 cartons", and a subtotal row after every category.

He rebuilds it. Row 1 holds the headers: Item, Size, Category, Quantity, Unit, Unit price (GHS). Each row below is one product. "Milo 400g" becomes Item "Milo", Size "400g". The quantity becomes \`12\` and the unit "carton". He deletes the subtotal rows and the merged title, then turns the range into a table named \`Stock\`.

Now he can filter to show only "Beverages", sort by quantity to see what is running low, and later build a PivotTable of stock value by category in seconds.

## A habit to keep

Before you type a single row, write your column headers and ask: "Could I sort, filter and count by each of these?" If the answer is yes, your table is tidy.`,
      practice_task_md: `**Goal:** turn a messy list into a tidy Excel table.

1. Write down a messy stock list as a shop might keep it, or copy this one into a sheet: "Rice 25kg x 10 bags", "Sugar 1kg x 40", "oil 5L 6 gallons", "RICE 5kg 12 bags".
2. Design columns: Item, Size, Quantity, Unit, Unit price (GHS). Invent sensible prices.
3. Re-enter each line as one tidy row, with one value per cell and consistent spellings.
4. Select the data and insert a table (or "Convert to table" in Google Sheets). Name it \`Stock\` if your app allows.
5. Use the filter button to show only rice.

**Done looks like:** a table with one header row, at least six tidy rows, no merged cells, and a screenshot of the rice filter working. Share it with a mentor and explain one change you made and why.`,
      quiz: {
        questions: [
          {
            prompt: "Which entry follows the tidy table rules for a Quantity column?",
            options: [
              "\"12 cartons\"",
              "12, with \"carton\" in a separate Unit column",
              "\"twelve\"",
              "12 cartons, with the cell merged across two columns",
            ],
            answer_index: 1,
            explanation: "A column should hold one kind of value, so the number goes in Quantity and the unit in its own column.",
          },
          {
            prompt: "Why should you avoid typing subtotal rows in the middle of your data?",
            options: [
              "They make the file too large to save",
              "Excel does not allow numbers in the middle of a table",
              "They break sorting, filtering and summaries because they are not real records",
              "They change the colour of the table",
            ],
            answer_index: 2,
            explanation: "Every row should be one record; subtotals mixed in get counted, sorted and filtered as if they were records.",
          },
          {
            prompt: "What does Excel do when you turn a tidy range into a table?",
            options: [
              "It deletes the header row",
              "It adds filter buttons and grows automatically when you add rows",
              "It converts all numbers to text",
              "It merges the header cells",
            ],
            answer_index: 1,
            explanation: "Tables add filter buttons, banded rows and expand automatically when new rows are added.",
          },
          {
            prompt: "When Excel counts and groups text, which difference does it ignore?",
            options: [
              "Capital letters, such as \"Rice\" and \"RICE\"",
              "A hidden space at the end, such as \"Rice \"",
              "A typo, such as \"Ryce\"",
              "Different words, such as \"Rice\" and \"Maize\"",
            ],
            answer_index: 0,
            explanation: "Excel ignores capital letters when it counts and groups, but extra spaces and typos create separate values.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "formulas-and-references": {
      explanation_md: `## Why this matters

An accounts assistant who types totals by hand will eventually make a mistake, and nobody will know where. A formula shows its working: anyone can click the cell and see how the answer was calculated. Employers want reports they can trust, and formulas are how you earn that trust.

## Writing a formula

A formula starts with \`=\`, then uses cell addresses and operators:

* \`+\` add, \`-\` subtract, \`*\` multiply, \`/\` divide, \`^\` power
* Brackets work as in school maths: \`=(B2+C2)*D2\` adds first, then multiplies.

Use cell addresses instead of typing numbers. \`=B2*C2\` is better than \`=5*120\`, because when B2 changes, the answer changes too.

## Copying formulas: relative references

Here is the clever part. If you write \`=B2*C2\` in D2 and copy it down to D3, Excel changes it to \`=B3*C3\` automatically. The references are **relative**: they mean "the cell two to the left times the cell one to the left", whatever row you are on. That is why you can fill a formula down a thousand rows in one move by dragging the fill handle (the small square at the corner of the selected cell) or double clicking it on a computer.

## Fixing a reference: absolute references

Sometimes you want one cell to stay fixed. Say the VAT rate sits in cell \`G1\`. In D2 you write \`=C2*G1\`. Copy it down and row 3 becomes \`=C3*G2\`, which points at an empty cell, so every answer below row 2 is wrong.

The fix is a dollar sign: \`=C2*$G$1\`. The \`$\` locks the column and the row, so every copy still points at G1. This is an **absolute reference**. On a computer, pressing F4 while your cursor is on the reference adds the dollar signs for you; on a phone, type them.

You will also meet **mixed** references such as \`$G1\` (column locked) or \`G$1\` (row locked). They are useful in grids, but most everyday work needs only relative and fully locked references.

## A worked example

Mariama runs a chop bar in Wa and wants to price her menu with a 10% increase. She puts the increase in cell \`F1\` as \`10%\`. Column B holds the current prices in cedis.

In C2 she writes \`=B2*(1+$F$1)\` and fills it down. Every new price uses the same F1. Next month, if she decides on 15%, she changes F1 once and the whole menu updates.

## Common errors

* \`#DIV/0!\` means you divided by zero or an empty cell.
* \`#VALUE!\` usually means a cell you are calculating with holds text, such as "12 bags".
* \`#REF!\` means a formula points at a cell that was deleted.
* A formula showing as text usually means you forgot the \`=\`.

Reading these messages calmly, and clicking the cell to check its references, solves most problems.`,
      practice_task_md: `**Goal:** use relative and absolute references correctly.

1. In a new sheet, type headings in A1 to C1: Item, Price (GHS), New price. Add five chop bar items with prices, such as waakye, rice balls and tuo zaafi with soup.
2. Type \`Increase\` in E1 and \`10%\` in F1.
3. In C2 write a formula that applies the increase using an absolute reference to F1, then fill it down to C6.
4. Change F1 to 15% and check every new price updates.
5. In C8, deliberately write the formula without dollar signs and fill it down two rows. Note what goes wrong, then delete it.

**Done looks like:** a price list where changing one cell updates every new price, plus one sentence explaining why the dollar signs were needed. Show a mentor by changing F1 in front of them.`,
      quiz: {
        questions: [
          {
            prompt: "You write =B2*C2 in D2 and copy it to D3. What formula appears in D3?",
            options: [
              "=B2*C2",
              "=B3*C3",
              "=B3*C2",
              "=D2*D3",
            ],
            answer_index: 1,
            explanation: "Relative references move with the formula, so both row numbers increase by one.",
          },
          {
            prompt: "The VAT rate is in G1 and every row must use it. Which formula in D2 can be safely copied down?",
            options: [
              "=C2*G1",
              "=C2*G$2",
              "=C2*$G$1",
              "=$C$2*G1",
            ],
            answer_index: 2,
            explanation: "The dollar signs in $G$1 lock both column and row so every copy still points at G1.",
          },
          {
            prompt: "A cell shows #VALUE!. What is a likely cause?",
            options: [
              "The formula is calculating with a cell that contains text, such as \"12 bags\"",
              "The column is too narrow",
              "The formula divided by zero",
              "The file has not been saved",
            ],
            answer_index: 0,
            explanation: "The lesson explains that #VALUE! usually means text is being used in a calculation.",
          },
          {
            prompt: "Why is =B2*C2 better than typing =5*120?",
            options: [
              "It calculates faster",
              "Excel cannot multiply typed numbers",
              "The answer updates when B2 or C2 changes",
              "It uses less storage",
            ],
            answer_index: 2,
            explanation: "Using cell addresses means the result changes automatically when the data changes.",
          },
          {
            prompt: "What does #REF! tell you?",
            options: [
              "The cell contains a date",
              "The formula has too many brackets",
              "You forgot the equals sign",
              "The formula points at a cell that was deleted",
            ],
            answer_index: 3,
            explanation: "#REF! appears when a referenced cell no longer exists.",
          },
        ],
        pass_threshold: 80,
      },
    },
  },
};

export default content;
