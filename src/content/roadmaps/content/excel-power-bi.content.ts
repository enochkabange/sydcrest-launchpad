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
    "working-with-data": {
      explanation_md: `## Why this matters

Once records are in a tidy table, the next question from any manager is a question about them. How much did each branch sell? How many beneficiaries are women? What is the price of item code R25? Which phone numbers in the survey are missing a digit? Answering those questions quickly and correctly is the daily work of accounts officers, MIS officers and M&E assistants across Ghana.

You do not need hundreds of functions for this. A small set, used well on clean data, answers most of what offices ask. This section teaches that set.

## What this section covers

* **Everyday functions:** SUM, AVERAGE, COUNT, COUNTIF, SUMIFS and IF. These answer "how much", "how many" and "which ones" questions.
* **Lookups with XLOOKUP:** pulling a matching detail from another table, such as a price from a price list. You will also learn to recognise VLOOKUP, which many offices still use.
* **Sorting, filtering and data validation:** finding what matters in a long list, and stopping bad data from being typed in the first place with dropdown lists and rules.
* **Cleaning text and dates:** fixing extra spaces, mixed capitals, phone numbers that lost their leading zero, and dates Excel cannot read.

## How functions work

A function is a ready made formula with a name. You write the name, open a bracket, give it the information it needs (called **arguments**), separated by commas, and close the bracket. For example:

* \`=SUM(D2:D50)\` adds every number from D2 down to D50. The colon means "from this cell to that cell", which is called a **range**.
* \`=COUNTIF(C2:C50,"Female")\` counts the cells in C2 to C50 that say "Female".

As you type a function name, Excel and Google Sheets show a small hint listing the arguments in order. Read it; it is one of the best teachers you have.

## Clean data first, then calculate

These topics depend on each other. A COUNTIF for "Tamale" will miss rows typed as "Tamale " with a hidden space. A lookup will fail if the code in one table is "R25" and in the other is "r 25". That is why this section ends with cleaning, and why you will keep coming back to it. In real jobs, analysts often spend more time checking and cleaning data than calculating.

## A small example

Abdul-Rahman is a volunteer for a youth football league in Savelugu. He has a registration sheet with each player's name, team, age and fees paid. With the functions in this section he can count how many players each team has, add up fees collected per team, flag players who have not paid with an IF formula, pull each team's coach name from a separate team list with XLOOKUP, and add a dropdown so team names are always typed the same way. That is a full working tool, built with a few functions.

## How to practise

Use one dataset through the whole section so you can see how the skills connect. A sales list, a survey export or a member register with 30 to 50 rows is enough. Keep a copy of the original before you change anything.`,
      practice_task_md: `**Goal:** prepare one practice dataset for this whole section.

1. Create a workbook called "Working with data practice".
2. Build a table with these columns: Date, Branch, Item code, Customer gender, Quantity, Amount (GHS). Use branches such as Tamale, Bolgatanga and Wa.
3. Enter at least 30 rows of made up sales. On purpose, include a few problems: two branch names with an extra space, one in capitals, and one empty Amount.
4. On a second sheet, list five item codes with an item name and unit price.
5. Duplicate the first sheet and name the copy "Raw" so you always have the original.

**Done looks like:** a workbook with a sales table of 30 or more rows, a price list sheet and a raw copy, ready for the next four lessons. Note the problems you planted so you can check you find them later.`,
      quiz: {
        questions: [
          {
            prompt: "In the formula =SUM(D2:D50), what does D2:D50 mean?",
            options: [
              "Cell D2 divided by cell D50",
              "Only cells D2 and D50",
              "Every cell from D2 down to D50",
              "Column D on sheet 2",
            ],
            answer_index: 2,
            explanation: "The colon creates a range from the first cell to the last.",
          },
          {
            prompt: "What are arguments in a function?",
            options: [
              "Error messages the function can show",
              "The pieces of information you give the function inside the brackets",
              "Other people who disagree with your formula",
              "The name of the function",
            ],
            answer_index: 1,
            explanation: "Arguments are the inputs inside the brackets, separated by commas.",
          },
          {
            prompt: "Why might =COUNTIF(B2:B50,\"Tamale\") miss some Tamale rows?",
            options: [
              "COUNTIF only counts numbers",
              "Some cells may contain \"Tamale \" with a hidden space",
              "COUNTIF cannot use text in quotes",
              "The range is too long",
            ],
            answer_index: 1,
            explanation: "Extra spaces make a value different, which is why cleaning comes before calculating.",
          },
          {
            prompt: "Why should you keep a copy of the original data before changing it?",
            options: [
              "Excel deletes data after a week",
              "Functions only work on copies",
              "So you can always go back and check what the raw data said",
              "Copies make the file load faster",
            ],
            answer_index: 2,
            explanation: "A raw copy lets you recover from mistakes and check your cleaning against the original.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "everyday-functions": {
      explanation_md: `## Why this matters

When a programme manager at an NGO in Tamale asks "how many women did we train this quarter, and in which districts?", they want an answer in minutes, not a day. The six functions in this lesson answer most questions like that. Functions of this kind are listed in Microsoft's Office Specialist Excel exam objectives and used in everyday reporting work, and they work the same in Excel and Google Sheets.

## The six functions

**SUM, AVERAGE and COUNT**

* \`=SUM(F2:F200)\` adds the numbers in a range.
* \`=AVERAGE(F2:F200)\` gives the mean of the numbers.
* \`=COUNT(F2:F200)\` counts cells that contain numbers. Its cousin \`=COUNTA(B2:B200)\` counts cells that are not empty, including text.

**COUNTIF: how many meet one condition**

\`=COUNTIF(D2:D200,"Female")\` counts cells in D2:D200 equal to "Female". Conditions can also compare numbers: \`=COUNTIF(E2:E200,">=10")\` counts rows where E is 10 or more. Capital letters do not matter to COUNTIF, but extra spaces do.

**SUMIFS: add up only the rows that match**

SUMIFS adds one column, but only for rows that meet one or more conditions. The column to add comes first, then pairs of range and condition:

\`\`\`
=SUMIFS(F2:F200, B2:B200,"Wa")
=SUMIFS(F2:F200, B2:B200,"Wa", D2:D200,"Female")
\`\`\`

The first adds Amount for the Wa branch. The second adds Amount for Wa sales to female customers. Instead of typing "Wa", you can point at a cell, such as \`H2\`, that holds the branch name. Then you can build a small summary table: branch names down column H, and one SUMIFS in column I filled down.

**IF: make a decision**

IF checks a condition and returns one value if it is true and another if it is false:

\`\`\`
=IF(F2>=500,"Large","Small")
=IF(G2="","Not paid","Paid")
\`\`\`

The second checks whether G2 is empty. You can put an IF inside another IF for three outcomes, but keep it simple: if you need many levels, a lookup table (next lesson) is usually clearer.

## A worked example

Amina is an M&E assistant. Her training register has columns District, Gender, Sessions attended and Transport refund (GHS). In a small summary area she writes:

* Total participants: \`=COUNTA(A2:A301)\`
* Women trained: \`=COUNTIF(B2:B301,"Female")\`
* Refunds paid in Tolon: \`=SUMIFS(D2:D301, A2:A301,"Tolon")\`
* In a new column E: \`=IF(C2>=4,"Completed","Did not complete")\`, filled down, then \`=COUNTIF(E2:E301,"Completed")\`

Her manager gets four clear numbers, each one checkable by clicking the cell.

## Tips

* Point ranges at whole table columns so new rows are included. In an Excel table, formulas like \`=SUM(Sales[Amount])\` grow with the table automatically.
* Check your answers once by filtering and looking at the status bar total. If both agree, you can trust the formula.`,
      practice_task_md: `**Goal:** build a small summary from your practice sales table.

1. Open your "Working with data practice" workbook.
2. Next to the table, list your three branch names in a column.
3. Beside each branch, use SUMIFS to total the Amount and COUNTIF to count the sales.
4. Add one more SUMIFS with two conditions, such as Amount for one branch and female customers.
5. Add a new column to the table with an IF formula that labels each sale "Large" if Amount is 500 or more, otherwise "Small".
6. Check one SUMIFS answer by filtering the table to that branch and reading the total.

**Done looks like:** a summary area with branch totals and counts, one two condition SUMIFS, and an IF column. Write one sentence on what the numbers tell a manager, then share a screenshot with a mentor.`,
      quiz: {
        questions: [
          {
            prompt: "Which formula counts how many cells in D2:D200 say \"Female\"?",
            options: [
              "=SUM(D2:D200,\"Female\")",
              "=COUNTIF(D2:D200,\"Female\")",
              "=COUNT(D2:D200)",
              "=IF(D2:D200,\"Female\")",
            ],
            answer_index: 1,
            explanation: "COUNTIF counts the cells in a range that meet one condition.",
          },
          {
            prompt: "In =SUMIFS(F2:F200, B2:B200,\"Wa\"), which range is added up?",
            options: [
              "F2:F200",
              "B2:B200",
              "Both ranges together",
              "Only the cells that say \"Wa\"",
            ],
            answer_index: 0,
            explanation: "In SUMIFS the column to add comes first, followed by the range and condition pairs.",
          },
          {
            prompt: "What does =IF(G2=\"\",\"Not paid\",\"Paid\") return when G2 is empty?",
            options: [
              "Paid",
              "Not paid",
              "An error",
              "Nothing",
            ],
            answer_index: 1,
            explanation: "The condition G2=\"\" is true when G2 is empty, so IF returns the first value, \"Not paid\".",
          },
          {
            prompt: "What is the difference between COUNT and COUNTA?",
            options: [
              "COUNT is for Google Sheets and COUNTA is for Excel",
              "COUNTA only counts numbers",
              "COUNT counts cells with numbers; COUNTA counts every cell that is not empty",
              "There is no difference",
            ],
            answer_index: 2,
            explanation: "COUNT only counts numbers, while COUNTA counts any non empty cell, including text.",
          },
          {
            prompt: "How can you check that a SUMIFS answer is right?",
            options: [
              "Retype the formula in a new cell",
              "Filter the table to the same condition and compare the total",
              "Make the column wider",
              "Save the file and reopen it",
            ],
            answer_index: 1,
            explanation: "Filtering to the same condition and reading the total is a quick independent check.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "lookups": {
      explanation_md: `## Why this matters

Lookups such as VLOOKUP and XLOOKUP are named in accounts and reporting job adverts in Ghana and across the region. Offices keep information in separate lists: a price list, a staff list, a list of districts and regions. A lookup joins them. Type a product code and the price appears; type a staff ID and the name and district appear. Without lookups, people copy and paste by hand, and mistakes creep in.

## XLOOKUP

XLOOKUP searches one column for a value and returns the matching item from another column:

\`\`\`
=XLOOKUP(what, where to look, what to return)
\`\`\`

Say your price list is on a sheet called Prices, with codes in column A and prices in column C. In your sales sheet, the item code is in C2. To get the price:

\`\`\`
=XLOOKUP(C2, Prices!A:A, Prices!C:C)
\`\`\`

Read it as: "find C2 in the codes, and give me the price on the same row". \`Prices!A:A\` means column A on the Prices sheet. Fill it down and every sale gets its price.

XLOOKUP looks for an exact match by default, which is what you want for codes and IDs. You can add a fourth argument for what to show when nothing is found:

\`\`\`
=XLOOKUP(C2, Prices!A:A, Prices!C:C, "Code not found")
\`\`\`

Without it, a missing code shows \`#N/A\`. That error is useful: it tells you a code is misspelled, has an extra space, or is missing from the list.

## Where XLOOKUP works

XLOOKUP is in Excel for Microsoft 365, Excel 2021 and 2024, Excel for the web, the Excel mobile apps, and Google Sheets. It is **not** in Excel 2019 or older, which some offices still use. So you also need to recognise the older function.

## VLOOKUP, the older way

\`\`\`
=VLOOKUP(C2, Prices!A:C, 3, FALSE)
\`\`\`

This means: find C2 in the **first** column of the range A:C, and return the value from the **3rd** column of that range. The \`FALSE\` at the end asks for an exact match; leaving it out can return a wrong nearby value without any warning, a common office mistake. VLOOKUP also cannot look to the left: the code column must be the first column of the range. You may also see \`INDEX\` and \`MATCH\` used together for the same job in older workbooks.

If you open a colleague's file and see VLOOKUP, you now know how to read it. For new work in a version that has it, XLOOKUP is simpler and safer.

## A worked example

Fuseini works at a pharmacy in Bolgatanga. The supplier sends a price list with Product code, Name and Price (GHS). Fuseini's daily sales sheet has Date, Product code and Quantity. He adds two columns:

* Name: \`=XLOOKUP(B2, Prices!A:A, Prices!B:B, "Check code")\`
* Price: \`=XLOOKUP(B2, Prices!A:A, Prices!C:C, 0)\`

Then Amount is \`=C2*E2\`. When the supplier changes a price, Fuseini updates the price list once and every lookup follows. Two rows show "Check code"; he finds one code typed with a letter O instead of a zero, and fixes it.`,
      practice_task_md: `**Goal:** connect your sales table to your price list with lookups.

1. Open your "Working with data practice" workbook, with the sales table and the price list sheet.
2. Add a column "Item name" to the sales table and fill it with XLOOKUP from the price list, with "Code not found" for missing codes.
3. Add a column "Unit price" the same way, then an "Expected amount" column that multiplies Quantity by Unit price.
4. Type one wrong code on purpose and check that "Code not found" appears.
5. In a spare cell, write the same price lookup using VLOOKUP with FALSE, and confirm it gives the same answer.

**Done looks like:** every sale shows an item name and unit price pulled from the price list, one deliberate error is caught, and you can explain to a mentor what each part of your XLOOKUP and VLOOKUP does.`,
      quiz: {
        questions: [
          {
            prompt: "What does =XLOOKUP(C2, Prices!A:A, Prices!C:C) return?",
            options: [
              "The value in cell C2",
              "The item in column C of Prices on the row where column A matches C2",
              "The total of column C on the Prices sheet",
              "The row number where C2 was found",
            ],
            answer_index: 1,
            explanation: "XLOOKUP finds C2 in the first range and returns the item on the same row of the second range.",
          },
          {
            prompt: "A lookup shows #N/A. What does that usually mean?",
            options: [
              "The formula is too long",
              "The price is zero",
              "The value was not found, for example because of a typo or an extra space",
              "The file is read only",
            ],
            answer_index: 2,
            explanation: "#N/A means no match was found, which often points to a data problem in the code.",
          },
          {
            prompt: "Why is FALSE important at the end of a VLOOKUP?",
            options: [
              "It makes the formula calculate faster",
              "It asks for an exact match, so VLOOKUP does not return a wrong nearby value",
              "It hides errors",
              "It lets VLOOKUP look to the left",
            ],
            answer_index: 1,
            explanation: "Without FALSE, VLOOKUP may return an approximate match without any warning.",
          },
          {
            prompt: "An office uses Excel 2019. Which lookup should you expect to use there?",
            options: [
              "XLOOKUP",
              "VLOOKUP, or INDEX with MATCH",
              "Neither, Excel 2019 has no lookups",
              "Only Google Sheets lookups",
            ],
            answer_index: 1,
            explanation: "XLOOKUP is not available in Excel 2019 or older, so those versions use VLOOKUP or INDEX and MATCH.",
          },
          {
            prompt: "What does the fourth argument in =XLOOKUP(C2, Prices!A:A, Prices!C:C, \"Code not found\") do?",
            options: [
              "Sets the column number to return",
              "Turns on approximate matching",
              "Shows \"Code not found\" instead of an error when there is no match",
              "Sorts the price list",
            ],
            answer_index: 2,
            explanation: "The optional fourth argument is what XLOOKUP shows when nothing is found.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "sort-filter-validate": {
      explanation_md: `## Why this matters

A list of 2,000 loan repayments is useless until you can find the late ones. And a beneficiary register is only as good as what people typed into it. Sorting and filtering help you find what matters; data validation stops bad data at the door. MIS and data officer adverts often ask for data quality and validation skills, because cleaning mistakes later costs far more time than preventing them.

## Sorting

Sorting reorders rows by one or more columns. Click a cell in your table, then use **Sort** on the Data tab (or the filter button in a header) and choose A to Z, Z to A, smallest to largest or largest to smallest.

You can sort by more than one level. For example, sort by Branch A to Z, then by Amount largest to smallest, to see each branch's biggest sales at the top of its group. In Excel use **Custom Sort** and add a level; in Google Sheets use **Data, then Sort range** with advanced options.

Always sort the **whole table**, not a single column, or the rows get scrambled. Using an Excel table avoids this, because sorting a table moves complete rows.

## Filtering

Filtering hides the rows you do not want to see without deleting them. Click the filter button on a header and tick the values to keep, or use number filters such as "greater than 1000" and date filters such as "this month". Filters on several columns combine: Branch is Wa **and** Status is Late. When you are done, clear the filter so nobody thinks rows are missing.

## Data validation

Data validation sets rules for what can be typed into a cell. Select the cells, then go to **Data, then Data Validation** in Excel, or **Data, then Data validation** in Google Sheets. Useful rules:

* **List:** a dropdown of allowed values, such as Tamale, Bolgatanga, Wa, Damongo. No more "Tamle" or "tamale ".
* **Whole number** between limits, such as age between 18 and 35 for a youth programme.
* **Date** within a range, such as dates in the current year.
* **Text length**, such as exactly 10 characters for a Ghanaian mobile number.

You can add an **input message** that tells people what to type, and an **error alert** that blocks or warns when the rule is broken. For a dropdown list, it is good practice to keep the allowed values on a separate sheet called Lists, so you can update them in one place.

## A worked example

Wumpini designs a field registration sheet for a farmers' cooperative in Karaga. Columns: Farmer name, Community, Gender, Age, Phone, Acres. She adds:

* a dropdown for Community from a Lists sheet,
* a dropdown for Gender,
* Age as a whole number between 15 and 100,
* Phone as text of exactly 10 characters,
* Acres as a decimal greater than 0.

When volunteers fill the sheet, typing errors are blocked as they happen. At the end of the week Wumpini sorts by Community and filters for Acres greater than 5 to plan visits, and she does not have to clean any spellings.`,
      practice_task_md: `**Goal:** build a data entry sheet that only accepts sensible values.

1. Create a sheet called Lists with a column of four community or branch names.
2. Create a sheet called Register with headers: Name, Community, Gender, Age, Phone.
3. Add a dropdown for Community using the Lists sheet, and a dropdown for Gender.
4. Add a whole number rule for Age (for example 15 to 100) and a text length rule of 10 for Phone, each with an input message.
5. Enter ten made up people, and try to type one wrong age to see the error alert.
6. Sort by Community, then by Age, and filter to show one community only.

**Done looks like:** a register where wrong entries are blocked, ten valid rows, and a screenshot of a sorted and filtered view. Ask a friend to try entering bad data and see if they can break it.`,
      quiz: {
        questions: [
          {
            prompt: "What is the main difference between filtering and deleting rows?",
            options: [
              "Filtering removes rows permanently",
              "Filtering only hides rows, which come back when you clear the filter",
              "Filtering works only on numbers",
              "There is no difference",
            ],
            answer_index: 1,
            explanation: "Filtering hides rows from view without removing them from the data.",
          },
          {
            prompt: "Why should you sort the whole table instead of a single column?",
            options: [
              "Sorting one column alone scrambles the rows so details no longer match",
              "Single columns cannot be sorted in Excel",
              "Sorting the whole table is faster on a phone",
              "Sorting one column deletes the header",
            ],
            answer_index: 0,
            explanation: "Sorting only one column moves its values away from the rest of each row.",
          },
          {
            prompt: "Which validation rule best stops people typing \"Tamle\" for Tamale?",
            options: [
              "A whole number rule",
              "A date rule",
              "A dropdown list of allowed community names",
              "A text length rule",
            ],
            answer_index: 2,
            explanation: "A list rule gives a dropdown, so only the correct spellings can be chosen.",
          },
          {
            prompt: "Why keep dropdown values on a separate Lists sheet?",
            options: [
              "Dropdowns only work across sheets",
              "So you can update the allowed values in one place",
              "It hides the values from everyone",
              "It makes the file smaller",
            ],
            answer_index: 1,
            explanation: "Keeping the list in one place makes it easy to add or correct allowed values later.",
          },
          {
            prompt: "You want each branch's biggest sales at the top of its group. How do you sort?",
            options: [
              "By Amount only, smallest to largest",
              "By Branch only, Z to A",
              "By Branch A to Z, then by Amount largest to smallest",
              "By Date, then by Branch",
            ],
            answer_index: 2,
            explanation: "A two level sort groups by branch first, then orders each group by amount from largest.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "cleaning-text-and-dates": {
      explanation_md: `## Why this matters

Data rarely arrives clean. A survey export from a phone form, a list copied from WhatsApp, a bank statement downloaded as CSV: each brings extra spaces, mixed capitals, phone numbers missing their first zero and dates Excel cannot read. Data cleaning appears in MEL and MIS job adverts because reports built on dirty data are wrong. This lesson gives you a small toolkit that fixes the most common problems.

## Work in helper columns

Never overwrite the original column straight away. Add a new column next to it, write a cleaning formula, fill it down, and check the results. When you are happy, copy the new column and use **Paste Special, then Values** to keep the clean text without the formula. Keep your raw copy as well.

## Text functions

* \`=TRIM(A2)\` removes spaces at the start and end and turns double spaces between words into single ones. " tamale  central " becomes "tamale central".
* \`=PROPER(A2)\` capitalises each word: "tamale central" becomes "Tamale Central". \`=UPPER(A2)\` and \`=LOWER(A2)\` change everything to capitals or small letters.
* You can combine them: \`=PROPER(TRIM(A2))\`.
* \`=LEFT(A2,3)\`, \`=RIGHT(A2,4)\` and \`=MID(A2,4,2)\` take characters from the start, the end or the middle. \`=LEN(A2)\` counts characters, which is handy for checking that every phone number has 10.

To split one column into several, such as "Abdul-Rahman Issah" into first and last name, desktop Excel has **Text to Columns** on the Data tab and Google Sheets has **Data, then Split text to columns**.

## Phone numbers that lost their zero

Ghanaian mobile numbers start with 0, such as 0244123456. If a column is formatted as a number, Excel drops the leading zero and stores 244123456. Two fixes:

* **Prevent it:** format the column as Text before typing or importing.
* **Repair it:** \`=TEXT(A2,"0000000000")\` pads the number back to 10 digits, giving "0244123456".

Phone numbers, staff IDs and account numbers are labels, not quantities. Keep them as text.

## Dates Excel cannot read

Excel stores a real date as a number, which is why you can subtract dates or group by month. Ghana writes dates day first, as in 25/03/2026. If a device or file expects month first, "25/03/2026" cannot be read and stays as text, while "05/03/2026" may be read as 3 May. Watch for these signs:

* Real dates line up on the right of the cell by default; text lines up on the left.
* \`=ISNUMBER(A2)\` returns TRUE for a real date and FALSE for text.

To rebuild a text date written as DD/MM/YYYY:

\`\`\`
=DATE(RIGHT(A2,4), MID(A2,4,2), LEFT(A2,2))
\`\`\`

DATE takes year, month and day, so this picks them out of the text in the right order. Then format the column as a date.

## Duplicates

**Data, then Remove Duplicates** deletes repeated rows. Use it on a copy, and choose carefully which columns define a duplicate: two farmers can share a name but not a phone number.

## A worked example

Mariama receives a survey export of 400 rows. She adds helper columns: \`=PROPER(TRIM(B2))\` for names, \`=TEXT(D2,"0000000000")\` for phones, and the DATE formula for interview dates. A LEN check finds six phones with 9 digits that were typed wrongly at source, which she flags for follow up instead of guessing.`,
      practice_task_md: `**Goal:** clean a messy list with helper columns.

1. Create a sheet with three columns: Name, Phone, Date. Enter ten rows with problems on purpose: extra spaces, names in capitals, phones typed as numbers so the zero disappears, and dates typed as text in DD/MM/YYYY form.
2. Add helper columns using \`PROPER(TRIM())\` for names, \`TEXT(...,"0000000000")\` for phones and the DATE formula for dates.
3. Add a LEN column to check every phone has 10 characters, and an ISNUMBER column to check every date is real.
4. Paste the clean columns as values into a new sheet called Clean.

**Done looks like:** a Clean sheet with tidy names, 10 digit phone numbers and real dates, plus a short note listing each problem you found and how you fixed it. Show the note to a mentor.`,
      quiz: {
        questions: [
          {
            prompt: "What does =TRIM(A2) do to \" tamale  central \"?",
            options: [
              "Changes it to \"TAMALE CENTRAL\"",
              "Removes the outer spaces and the double space, giving \"tamale central\"",
              "Deletes the text",
              "Splits it into two columns",
            ],
            answer_index: 1,
            explanation: "TRIM removes spaces at the start and end and reduces double spaces to single ones.",
          },
          {
            prompt: "A phone number shows as 244123456 instead of 0244123456. Why?",
            options: [
              "The number was typed with a letter O",
              "The column was formatted as a number, so Excel dropped the leading zero",
              "TRIM removed the zero",
              "The cell is too narrow",
            ],
            answer_index: 1,
            explanation: "Number formatting drops leading zeros, which is why phone numbers should be stored as text.",
          },
          {
            prompt: "Which sign suggests a date is stored as text, not as a real date?",
            options: [
              "It lines up on the right of the cell by default",
              "=ISNUMBER on the cell returns FALSE",
              "It can be subtracted from another date",
              "It groups by month in a summary",
            ],
            answer_index: 1,
            explanation: "A real date is a number, so ISNUMBER returns FALSE when the date is only text.",
          },
          {
            prompt: "Why should you clean in a helper column instead of overwriting the original?",
            options: [
              "Excel does not allow overwriting",
              "So you can check results against the original before replacing anything",
              "Helper columns calculate faster",
              "Formulas only work in new columns",
            ],
            answer_index: 1,
            explanation: "Helper columns keep the original visible so you can check the cleaning before committing to it.",
          },
          {
            prompt: "Text dates are written as DD/MM/YYYY. Which formula rebuilds a real date from A2?",
            options: [
              "=DATE(LEFT(A2,2), MID(A2,4,2), RIGHT(A2,4))",
              "=DATE(RIGHT(A2,4), MID(A2,4,2), LEFT(A2,2))",
              "=TRIM(A2)",
              "=TEXT(A2,\"0000000000\")",
            ],
            answer_index: 1,
            explanation: "DATE takes year, month, day, so the year comes from the right, the month from the middle and the day from the left.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "summaries-and-charts": {
      explanation_md: `## Why this matters

A manager at a microfinance office in Tamale does not want to scroll through 3,000 loan records. She wants to know: how much was repaid this month, which branch is behind, and is it getting better or worse? Your job is to turn the raw rows into that answer, quickly and in a form she can read at a glance. Job adverts for MIS, M&E and reporting roles keep asking for exactly this: summaries, charts, dashboards and KPI tracking.

This section teaches the three tools that do most of that work in Excel and Google Sheets.

## What this section covers

* **PivotTables:** summarise thousands of rows by any category in seconds, such as total sales by branch and month, without writing a single formula.
* **Charts that make a point:** choose the right chart for the question, then title and label it so nobody misreads it.
* **Conditional formatting:** colour rules that flag what needs attention, such as overdue payments or low stock, automatically.

## From rows to answers

Think of reporting as three steps:

1. **Summarise.** Reduce many rows to a few numbers that answer the question. A PivotTable or a set of SUMIFS formulas does this.
2. **Show.** Turn the summary into a picture when a picture is clearer than numbers, for example a trend over twelve months.
3. **Highlight.** Draw the eye to the few things that need action, such as the branch below target.

Every step depends on the tidy, clean table you built in the earlier sections. A PivotTable cannot group "Tamale" and "Tamale " together, and a chart of messy dates will be in the wrong order.

## Start from the question

Before you build anything, write the question in one sentence. "Which branch had the highest repayments in September?" leads to a sorted PivotTable or a bar chart. "Are repayments improving month by month?" leads to a line chart. "Which loans are overdue today?" leads to a highlighted list. If you cannot write the question, ask the person who requested the report. A beautiful chart that answers the wrong question wastes everyone's time.

## A small example

Issahaku volunteers with a savings group in Damongo. The treasurer keeps a sheet of every member's weekly contribution. Issahaku builds:

* a PivotTable of total contributions per member per month,
* a line chart of the group's total savings by month, titled "Group savings grew every month since June",
* a conditional formatting rule that turns a member's row light red if they missed two weeks in a row.

At the next meeting, the treasurer reads out three clear points instead of a page of numbers.

## Screens and devices

Charts and conditional formatting are fine on any device. Building PivotTables on large tables is easier on a bigger screen, in Excel for the web, desktop Excel or Google Sheets in a browser. Reading finished summaries works well on a phone, which is how many managers will see your work, so always check how it looks on a small screen.`,
      practice_task_md: `**Goal:** plan a report before you build it.

1. Choose a dataset: your practice sales table, or a register from a group you know.
2. Write three questions a manager might ask about it, each in one sentence.
3. For each question, decide whether the answer is best shown as a summary table, a chart or a highlight, and write why.
4. Sketch on paper what each part would look like, including a title that states the main message.

**Done looks like:** one page (photo of paper is fine) with three questions, the chosen format for each, and a sketch with message titles. Share it with a mentor before you build it in the next lessons.`,
      quiz: {
        questions: [
          {
            prompt: "What are the three steps of reporting described in this lesson?",
            options: [
              "Type, save, print",
              "Summarise, show, highlight",
              "Sort, filter, delete",
              "Collect, clean, store",
            ],
            answer_index: 1,
            explanation: "The lesson describes reporting as summarising the data, showing it visually and highlighting what needs action.",
          },
          {
            prompt: "What should you do before building any summary or chart?",
            options: [
              "Choose a colour scheme",
              "Download a template",
              "Write the question you are answering in one sentence",
              "Make a PivotTable of every column",
            ],
            answer_index: 2,
            explanation: "Starting from a clear question decides which summary or chart you need.",
          },
          {
            prompt: "Which question is best answered with a line chart?",
            options: [
              "Which loans are overdue today?",
              "Are repayments improving month by month?",
              "What is the phone number of each member?",
              "Which branch has the most staff?",
            ],
            answer_index: 1,
            explanation: "Line charts show change over time, such as month by month trends.",
          },
          {
            prompt: "Why does this section depend on clean data from earlier lessons?",
            options: [
              "Charts only work on sheets named Clean",
              "Summaries treat messy spellings as different values, giving wrong totals",
              "PivotTables delete messy rows automatically",
              "Conditional formatting cleans data first",
            ],
            answer_index: 1,
            explanation: "Values like \"Tamale\" and \"Tamale \" are grouped separately, so dirty data gives wrong summaries.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "pivottables": {
      explanation_md: `## Why this matters

PivotTables are named in Excel job adverts for roles from accounts officers to Excel specialists. They are the fastest way to answer "how much, by what?" questions. A table of 5,000 sales becomes "total sales by region and month" in under a minute, with no formulas, and you can rearrange it to answer the next question just as fast.

## What a PivotTable does

A PivotTable groups your rows by the values in one or more columns and then calculates something for each group: a sum, a count or an average. You decide the layout by placing fields (your column headers) into four areas:

* **Rows:** the categories down the left, such as Branch.
* **Columns:** categories across the top, such as Month.
* **Values:** what to calculate, such as Sum of Amount.
* **Filters:** narrow the whole PivotTable, such as only one product category.

## Building one

1. Click any cell in your tidy table (an Excel table is best, because new rows will be included).
2. Choose **Insert, then PivotTable**, and place it on a new sheet.
3. In the field list, drag or tick Branch into Rows and Amount into Values.

Excel shows each branch once with its total. Now drag Month into Columns and you have a grid of branch by month. Drag Branch out and Item in, and you have totals by item instead. That rearranging is the "pivot".

## Changing the calculation

Numbers placed in Values are summed by default. Open **Value Field Settings** (Excel) or the "Summarise by" option (Google Sheets) to switch to Count, Average, Max or Min. Count is useful for "how many": put Gender in Rows and Name in Values to count participants by gender. You can also show values as a percentage of the total.

## Keeping it up to date

In Excel, a PivotTable does **not** update by itself when the data changes. After adding or correcting rows, right click the PivotTable and choose **Refresh**, or use Refresh on the PivotTable tab. Forgetting this is a common reason reports show old numbers. Google Sheets pivot tables update automatically.

## Where to build them

Excel for the web, desktop Excel and Google Sheets in a browser can all create PivotTables. Dragging fields around a large table is much easier on a computer screen. On a phone you can open, read and refresh finished PivotTables in a shared file.

## A worked example

Hawa is a reporting assistant for an agro dealer with shops in Tamale, Yendi and Savelugu. Her sales table has Date, Shop, Product, Quantity and Amount (GHS). Her manager asks which shop sold the most fertiliser last quarter.

She inserts a PivotTable, puts Shop in Rows, Amount in Values and Product in Filters, then filters to fertiliser only. She sorts the totals largest to smallest. Answer: Yendi, then Tamale, then Savelugu. When her manager then asks "and by month?", Hawa drags Month into Columns (a column she added to the table with \`=TEXT(A2,"yyyy mm")\`, which works in every version), and has the next answer ready before the meeting ends.`,
      practice_task_md: `**Goal:** build and rearrange a PivotTable.

1. Open your practice sales table. Make sure it has at least 30 rows and clean branch names.
2. Insert a PivotTable on a new sheet with Branch in Rows and Amount in Values.
3. Add Customer gender to Columns to see totals by branch and gender.
4. Change the Values calculation from Sum to Count, then back to Sum.
5. Add one new sale to the original table, then refresh the PivotTable and check the total changes.
6. Sort the branches from largest to smallest total.

**Done looks like:** a PivotTable showing totals by branch and gender, sorted, and refreshed after a change. Write two sentences on what it shows and share a screenshot with a mentor.`,
      quiz: {
        questions: [
          {
            prompt: "Which PivotTable area holds the numbers you want calculated, such as Sum of Amount?",
            options: [
              "Rows",
              "Columns",
              "Values",
              "Filters",
            ],
            answer_index: 2,
            explanation: "The Values area holds the field that is summed, counted or averaged.",
          },
          {
            prompt: "You correct some rows in your data. What must you do in Excel so the PivotTable shows the new numbers?",
            options: [
              "Delete and rebuild the PivotTable",
              "Refresh the PivotTable",
              "Save and close the file",
              "Nothing, it always updates by itself",
            ],
            answer_index: 1,
            explanation: "Excel PivotTables do not update automatically; you must refresh them.",
          },
          {
            prompt: "How do you count participants by gender with a PivotTable?",
            options: [
              "Put Gender in Values and sum it",
              "Put Gender in Rows and set a name field in Values to Count",
              "Put Gender in Filters only",
              "You cannot count text in a PivotTable",
            ],
            answer_index: 1,
            explanation: "Grouping by gender in Rows and counting a field in Values gives the number of participants per gender.",
          },
          {
            prompt: "What does \"pivoting\" a PivotTable mean?",
            options: [
              "Printing it sideways",
              "Converting it to a chart",
              "Rearranging fields to look at the data a different way",
              "Deleting the original data",
            ],
            answer_index: 2,
            explanation: "Moving fields between areas lets you answer a new question from the same data.",
          },
          {
            prompt: "Why is an Excel table a good source for a PivotTable?",
            options: [
              "PivotTables only work with tables",
              "Tables make PivotTables update without refreshing",
              "The table grows to include new rows, so a refresh picks them up",
              "Tables remove duplicates automatically",
            ],
            answer_index: 2,
            explanation: "A table expands with new rows, so the PivotTable's source stays complete after a refresh.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "charts": {
      explanation_md: `## Why this matters

Many managers and donors read your report on a phone between meetings. A clear chart tells them the main point in seconds; a cluttered one confuses them or, worse, misleads them. Employers in monitoring, reporting and business roles ask for data visualisation because a good chart helps people make the right decision.

## Choose the chart from the question

* **Comparing categories** (which branch sold most?): a **bar or column chart**. Sort the bars from largest to smallest so the ranking is obvious. Use horizontal bars when the labels are long, such as community names.
* **Change over time** (are sales rising?): a **line chart**, with time running left to right in order.
* **Parts of a whole** (what share of participants are women?): a single bar split into parts, or a pie chart only when there are two or three parts. Pies with many slices are hard to read.
* **Exact values that people need to look up:** a **simple table**, not a chart.

If a chart does not make the answer clearer than the numbers, use the numbers.

## Make it honest and readable

* **Title with the message.** Instead of "Sales by branch", write "Wa sold the most in September". The reader knows what to look for.
* **Label axes and units**, such as "Amount (GHS)" or "Number of farmers".
* **Start bar and column charts at zero.** A bar axis that starts at 900 makes a small difference look huge.
* **Avoid 3D effects, shadows and heavy gridlines.** They make values harder to compare.
* **Use colour on purpose.** One neutral colour for everything, and one strong colour to highlight the bar that matters.
* **Keep it short.** Five to ten bars or one or two lines is easy to read on a small screen.

## Making a chart in Excel

1. Select a small summary, such as the branch totals from your PivotTable or SUMIFS table, including headers.
2. Choose **Insert**, then the chart type. Excel for the web, desktop Excel, the Excel app and Google Sheets all have this.
3. Click the chart title and type your message.
4. Add axis titles from the chart elements options, and remove anything that does not help, such as the legend when there is only one series.

Charts made from a PivotTable (called PivotCharts in Excel) update when you refresh the PivotTable.

## A worked example

Sumaila, a data assistant at an NGO, must show how many farmers attended training in each of six communities. His first attempt is a 3D pie with six slices in six bright colours, titled "Chart 1". Nobody can tell which community is largest.

He replaces it with a horizontal bar chart, sorted from most to fewest attendees. All bars are grey except Kpandai, the community that missed its target, which is orange. The title reads "Kpandai is the only community below target". The axis says "Farmers trained" and starts at zero. His manager understands it before Sumaila says a word.`,
      practice_task_md: `**Goal:** turn a summary into one clear, honest chart.

1. Use a summary you already built: branch totals from your PivotTable or SUMIFS table.
2. Insert a bar or column chart, sorted largest to smallest.
3. Write a title that states the main message in a short sentence.
4. Add axis titles with units, check the value axis starts at zero, and remove any 3D effect or unneeded legend.
5. Colour every bar the same, then highlight the one bar your message is about.
6. Open the file on a phone or in a narrow window and check the chart is still readable.

**Done looks like:** one chart with a message title, labelled axes, a zero baseline and one highlighted bar, plus a one line note on why you chose that chart type. Share it with a mentor and ask what they understood in five seconds.`,
      quiz: {
        questions: [
          {
            prompt: "Which chart best shows how monthly sales changed over a year?",
            options: [
              "A pie chart",
              "A line chart",
              "A 3D column chart",
              "A table of phone numbers",
            ],
            answer_index: 1,
            explanation: "Line charts show change over time, with months running left to right.",
          },
          {
            prompt: "Why should bar and column charts start at zero?",
            options: [
              "Excel requires it",
              "Starting higher makes small differences look much bigger than they are",
              "It makes the chart load faster",
              "It removes the need for a title",
            ],
            answer_index: 1,
            explanation: "Cutting the axis exaggerates differences, which misleads the reader.",
          },
          {
            prompt: "Which title is most helpful?",
            options: [
              "Chart 1",
              "Sales by branch",
              "Wa sold the most in September",
              "Data",
            ],
            answer_index: 2,
            explanation: "A message title tells the reader the main point before they study the chart.",
          },
          {
            prompt: "When is a pie chart a reasonable choice?",
            options: [
              "For comparing twelve communities",
              "For showing a trend over time",
              "For showing two or three parts of a whole",
              "For exact values people must look up",
            ],
            answer_index: 2,
            explanation: "The lesson advises pies only for a few parts of a whole, because many slices are hard to compare.",
          },
          {
            prompt: "How should you use colour in a chart?",
            options: [
              "A different bright colour for every bar",
              "One neutral colour, with one strong colour to highlight what matters",
              "Only red and green",
              "As many colours as the theme allows",
            ],
            answer_index: 1,
            explanation: "A single highlight colour draws attention to the point of the chart.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "conditional-formatting": {
      explanation_md: `## Why this matters

A credit officer in Bolgatanga opens the repayment sheet each morning. If overdue loans are already coloured, she sees them instantly instead of checking 400 dates by eye. Conditional formatting does that: it changes how a cell looks based on its value, and it keeps working as the data changes. It supports the KPI monitoring and data quality checks that MIS and reporting roles ask for.

## Where to find it

* **Excel** (web, desktop and app): **Home, then Conditional Formatting**.
* **Google Sheets:** **Format, then Conditional formatting**.

Select the cells first, then choose a rule.

## Built in rules

* **Highlight cell rules:** greater than, less than, between, equal to, text that contains, a date occurring (such as "last week"), and **duplicate values**, which is a fast way to spot a phone number entered twice.
* **Top and bottom rules:** top 10 items, bottom 10%, above average.
* **Data bars:** a small bar inside each cell, longer for bigger numbers. Good for a quick sense of size in a table.
* **Colour scales:** shades from low to high. Useful on a grid, such as sales by branch and month.
* **Icon sets:** arrows or symbols for up, level and down.

## Formula rules for whole rows

Sometimes you want the whole row coloured, not one cell. Choose **New Rule, then "Use a formula to determine which cells to format"** in Excel, or **Custom formula is** in Google Sheets. Select the whole table area (for example A2:F300) and write a formula for the first row:

\`\`\`
=$E2<TODAY()
\`\`\`

Column E holds the due date. The \`$\` locks the column so every cell in a row checks column E, while the row number stays relative so each row checks its own date. Add a second condition with AND:

\`\`\`
=AND($E2<TODAY(), $F2="Not paid")
\`\`\`

Now only unpaid loans past their due date are highlighted.

## Use it with restraint

A sheet where every cell is a different colour hides the message instead of showing it. Good practice:

* Highlight **only what needs action**, usually one or two rules per sheet.
* Pick soft fill colours so the text stays readable.
* **Do not rely on colour alone.** Some people cannot tell red from green, and colours may not survive printing in black and white. Add a Status column with words such as "Overdue", or use icons.
* Check your rules with **Manage Rules** in Excel or the rules panel in Sheets, and remove old ones you no longer need.

## A worked example

Wumpini manages stock for a pharmacy in Tamale. Her stock table has Item, Quantity, Reorder level and Expiry date. She adds two rules:

* the row turns light orange when \`=$B2<=$C2\`, meaning quantity has reached the reorder level;
* the Expiry cell turns light red when the date is within the next 60 days, using \`=$D2<=TODAY()+60\`.

She also adds a Status column with an IF formula that says "Reorder" or "OK", so the meaning is clear without colour. Every morning, the coloured rows are her to do list.`,
      practice_task_md: `**Goal:** highlight what needs attention, and nothing else.

1. Create a small stock or repayment table with at least 15 rows: Item or Borrower, Quantity or Amount, Reorder level or Due date, Status.
2. Add one built in rule, such as highlighting duplicate names or values below a number.
3. Add one formula rule that colours the whole row when action is needed, such as quantity at or below reorder level, or due date before today.
4. Add a Status column with an IF formula so the meaning does not depend on colour.
5. Change a few values and watch the formatting update.

**Done looks like:** a table with exactly two rules, a Status column in words, and a screenshot. Explain to a mentor what each colour means and why you chose only two.`,
      quiz: {
        questions: [
          {
            prompt: "What does conditional formatting do?",
            options: [
              "Sorts data by colour",
              "Changes how cells look based on their values, updating as data changes",
              "Converts numbers to text",
              "Deletes rows that break a rule",
            ],
            answer_index: 1,
            explanation: "Conditional formatting applies formats automatically according to rules about cell values.",
          },
          {
            prompt: "In the rule =$E2<TODAY() applied to A2:F300, why is there a $ before E?",
            options: [
              "To make the formula absolute in every direction",
              "So every cell in a row checks column E while each row checks its own date",
              "Because dates always need a dollar sign",
              "To format the cell as currency",
            ],
            answer_index: 1,
            explanation: "Locking the column but not the row makes every cell in a row test that row's due date.",
          },
          {
            prompt: "Which built in rule quickly finds a phone number entered twice?",
            options: [
              "Data bars",
              "Colour scales",
              "Duplicate values",
              "Top 10 items",
            ],
            answer_index: 2,
            explanation: "The duplicate values highlight rule colours any value that appears more than once.",
          },
          {
            prompt: "Why should you not rely on colour alone to show status?",
            options: [
              "Colours slow down Excel",
              "Some people cannot tell certain colours apart, and colour may be lost in printing",
              "Colours are not allowed in reports",
              "Conditional formatting only works in Google Sheets",
            ],
            answer_index: 1,
            explanation: "Adding words or icons keeps the meaning clear for everyone and in every format.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "excel-reports": {
      explanation_md: `## Why this matters

In most offices, Excel work comes back every week or every month. The district office sends a new attendance file each Monday. The bank exports a new statement every month. The donor wants the same activity report every quarter. The person who can produce that report quickly, correctly and in the same clear format each time becomes very valuable to a team. Job adverts for MIS officers and Excel specialists mention reporting automation and dashboards for this reason.

This section brings everything together into reports that are repeatable and readable.

## What this section covers

* **Power Query for repeat cleaning:** a tool that records your cleaning steps once and replays them on next month's file with one click. The editor is in desktop Excel, and the same tool is free inside Power BI Desktop.
* **A one page Excel report:** combining a few key numbers, a PivotTable, a chart and highlights into a single page that a manager can read on a phone or print.

## Repeatable beats heroic

Many people produce monthly reports by hand: copy the new data in, fix the spellings again, retype the totals, recolour the cells, and hope nothing was missed. It works, but it takes hours and the mistakes are different every month.

A repeatable report is built differently:

1. **Raw data goes in one place,** always in the same layout, never edited by hand.
2. **Cleaning happens by rules,** in Power Query or in helper columns with formulas, so it is the same every time.
3. **Summaries are calculated,** with PivotTables or SUMIFS pointing at the clean table.
4. **The report page only displays** results: key numbers, a chart, highlights.

Next month you replace the raw data, refresh, check, and send. What took a day now takes minutes, and the method is the same each time, so errors are easier to spot.

## Separate sheets for separate jobs

A simple structure that works for most small reports:

* **Raw:** the data exactly as received.
* **Clean:** the cleaned table (from Power Query or formulas).
* **Lists:** dropdown values and lookup tables, such as branch names and targets.
* **Calc:** PivotTables and summary formulas.
* **Report:** the one page that people read.

Name the sheets clearly and put them in that order. Someone else can then pick up your file and understand it, which matters when you are on leave or move to a new role.

## A small example

Amina compiles a monthly activity report for a girls' education project in the Northern Region. Each month, five field officers send her attendance sheets. Before, she spent two days merging and fixing them. Now she pastes the five sheets into the Raw area, refreshes a cleaning query, refreshes the PivotTables, and checks the Report sheet. The report is ready the same morning, and her manager notices that the numbers are consistent every month.

## Check before you send

Even a repeatable report needs a human check. Compare this month's totals with last month's: does any number look strange? Spot check one figure by filtering the raw data. A minute of checking protects your reputation.`,
      practice_task_md: `**Goal:** design the structure of a repeatable monthly report.

1. Pick a report that recurs: monthly shop sales, weekly church attendance or a quarterly savings group summary.
2. Create a workbook with five sheets named Raw, Clean, Lists, Calc and Report.
3. On the Report sheet, write the three to five numbers or charts the reader needs each month.
4. On a fourth sheet or in a note, list every cleaning step you currently do by hand, in order.
5. Mark which steps can be done with formulas you already know.

**Done looks like:** a workbook skeleton with five named sheets and a written list of cleaning steps. Share it with a mentor and ask which steps they would automate first.`,
      quiz: {
        questions: [
          {
            prompt: "What is the main advantage of a repeatable report?",
            options: [
              "It uses more colours",
              "Next month you replace the data and refresh instead of rebuilding by hand",
              "It never needs checking",
              "It only works in Google Sheets",
            ],
            answer_index: 1,
            explanation: "A repeatable report reuses the same rules, so producing the next one is quick and consistent.",
          },
          {
            prompt: "In the suggested structure, which sheet holds the data exactly as received?",
            options: [
              "Raw",
              "Clean",
              "Calc",
              "Report",
            ],
            answer_index: 0,
            explanation: "The Raw sheet keeps the original data untouched.",
          },
          {
            prompt: "What should the Report sheet do?",
            options: [
              "Hold the raw data",
              "Store the dropdown lists",
              "Only display results such as key numbers, charts and highlights",
              "Hold the cleaning formulas",
            ],
            answer_index: 2,
            explanation: "The Report sheet is for reading; data, cleaning and calculations live on other sheets.",
          },
          {
            prompt: "Why should you still check a repeatable report before sending it?",
            options: [
              "Refreshing deletes the data",
              "New data can contain surprises, so comparing with last month and spot checking catches errors",
              "Repeatable reports are always wrong",
              "Excel requires a manual check",
            ],
            answer_index: 1,
            explanation: "A quick comparison and spot check protects against unexpected problems in new data.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "power-query-in-excel": {
      explanation_md: `## Why this matters

If you clean the same kind of file every month, Power Query can do it for you. You show it the cleaning steps once; it records them; next month you click Refresh and every step runs again on the new data. Adverts for MIS officers and Excel specialists name Power Query and reporting automation. Learning it now also prepares you for Power BI, which uses the same engine.

## Which version you need

Be clear about this before you start:

* **Desktop Excel for Windows** has the full Power Query editor (Data tab, **Get Data**, or **From Table/Range**).
* **Excel for Microsoft 365 on Mac** has the editor too in recent versions (Data tab, **Get Data (Power Query)**).
* **Excel for the web** only lets you create and edit queries with a Microsoft 365 business or enterprise plan. With a free personal account you cannot open the editor there.
* **Power BI Desktop** is free and contains the same Power Query editor, but it runs only on Windows.

So you need a Windows or Mac computer with desktop Excel (at work, school or a hub), or any Windows computer where you can install Power BI Desktop. If you have neither yet, read on: the ideas still apply, and the practice task has a version you can do in any spreadsheet.

## How it works

1. Load your data: **Get Data** from a workbook, a CSV file or a table in the current file.
2. The **Power Query Editor** opens with a preview. Every change you make is recorded as a step in the **Applied Steps** list on the right.
3. Common steps:
   * **Use first row as headers.**
   * **Remove columns** you do not need.
   * **Transform, then Format, then Trim** and **Capitalize Each Word** for names.
   * **Replace values**, such as "Tml" with "Tamale".
   * **Filter rows** to remove blanks or test entries.
   * **Change type** to Date, Whole number or Text. For dates written day first, use **Change type, then Using Locale**, and choose English (Ghana) or English (United Kingdom), so 05/03/2026 is read as 5 March.
   * **Remove duplicates.**
4. Choose **Close and Load**. The clean data lands in a new sheet as a table.

Next month, save the new file over the old one in the same place, with the same name and layout, then use **Data, then Refresh All**. Every step replays. You can click any step to see the data at that point, and delete or edit steps if something changes.

Excel for Windows and Power BI Desktop can also combine every file in a folder into one table, which is perfect for five field officers each sending a sheet.

## A worked example

Abdul-Rahman receives a CSV of mobile money transactions from his employer's system every month. He uses Get Data, From Text/CSV, then records: remove four unused columns, trim the Customer column, replace "N/A" with blank, change Amount to Decimal number, change Date using the English (Ghana) locale, and filter out rows where Status is "Failed". Six steps, built once. Each month he replaces the CSV and refreshes, and his PivotTable of daily totals updates in seconds.

## Without the editor

If you only have free Excel for the web, a phone or Google Sheets, write your steps down as a recipe and apply them with the TRIM, PROPER, TEXT and DATE formulas from the cleaning lesson. It is slower, but the habit of writing repeatable steps is exactly what Power Query rewards later.`,
      practice_task_md: `**Goal:** record a cleaning process you can replay.

**If you have desktop Excel or Power BI Desktop:**

1. Make a messy CSV or sheet of 20 rows: extra spaces, mixed capitals, day first dates as text, a blank row and a duplicate.
2. Load it into Power Query and record steps to fix each problem, including Change type Using Locale for the dates.
3. Close and Load, then add five new messy rows to the source, save, and Refresh.

**If you only have Excel for the web, the Excel app or Google Sheets:**

1. Use the same messy data.
2. Write a numbered cleaning recipe, then apply it with helper column formulas.
3. Add five new rows and fill your formulas down to show the recipe works again.

**Done looks like:** either a refreshed query whose Applied Steps you can explain, or a written recipe plus a clean sheet. Show a mentor how the new rows were cleaned without extra manual work.`,
      quiz: {
        questions: [
          {
            prompt: "What does Power Query record as you clean data?",
            options: [
              "A video of your screen",
              "A list of applied steps that can be replayed",
              "A backup copy of every cell",
              "A macro written in VBA",
            ],
            answer_index: 1,
            explanation: "Each change is saved as a step in the Applied Steps list and replays on refresh.",
          },
          {
            prompt: "Which free option gives you the Power Query editor on a Windows computer even without paid Excel?",
            options: [
              "Google Sheets",
              "The Excel phone app",
              "Power BI Desktop",
              "Excel for the web with a personal account",
            ],
            answer_index: 2,
            explanation: "Power BI Desktop is free on Windows and includes the same Power Query editor.",
          },
          {
            prompt: "Dates in your file are written day first, like 05/03/2026. How should you set the type in Power Query?",
            options: [
              "Change type to Text",
              "Change type Using Locale, choosing English (Ghana) or English (United Kingdom)",
              "Remove the column",
              "Change type to Whole number",
            ],
            answer_index: 1,
            explanation: "Using Locale tells Power Query to read the date in day first order.",
          },
          {
            prompt: "Next month's file arrives with the same layout. What do you do?",
            options: [
              "Rebuild every step from scratch",
              "Save it in place of the old file and use Refresh All",
              "Copy the old results into the new file",
              "Email it to Microsoft",
            ],
            answer_index: 1,
            explanation: "Refreshing replays the recorded steps on the new data.",
          },
          {
            prompt: "With a free personal Microsoft account, what can you do with Power Query in Excel for the web?",
            options: [
              "Use the full editor with no limits",
              "You cannot open the editor; creating and editing queries there needs a business or enterprise plan",
              "Use it only on weekends",
              "Edit queries but not load them",
            ],
            answer_index: 1,
            explanation: "Microsoft limits query editing in Excel for the web to business and enterprise plans.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "one-page-excel-report": {
      explanation_md: `## Why this matters

A one page report is where your Excel skills become something an employer can see and use. Managers, donors and boards rarely have time for long sheets. They want one page that answers: how did we do, compared with what, and what needs attention? Being able to build that page, and to show examples of it, is a strong signal in applications for reporting, admin and M&E roles.

## What goes on the page

Work from top to bottom, most important first:

1. **Title, period and source.** For example: "Monthly activity report, September 2026. Source: field registers."
2. **Three to five key numbers**, large and labelled, each with a comparison: against target, or against last month. "Farmers trained: 412 (target 400)" means more than "412" alone.
3. **One chart** that shows the main story, with a message title.
4. **One small table**, such as results by district from a PivotTable, sorted.
5. **Highlights:** two or three short sentences in plain words. What went well, what is behind, what action is suggested.

Everything else stays on the Calc and Clean sheets.

## Building it in Excel

* Keep the report on its own sheet called Report. Link every number to your calculations with formulas such as \`=Calc!B4\`, so nothing is typed by hand.
* For a change against last month, use \`=(B4-C4)/C4\` and format it as a percentage. Show the direction in words too: "up" or "down".
* Use larger font and bold for the key numbers, with the label underneath in normal text.
* Use conditional formatting for one thing only, such as a number below target turning orange, with a word like "Behind" beside it.
* Keep the layout narrow, roughly columns A to H, so it reads on a phone without much side scrolling.
* Turn off gridlines on the report sheet (View tab in Excel) for a cleaner look.

## Sharing it

Many readers will open a PDF on a phone. Set the print area to your report, choose **fit to one page wide** in page setup, and check the preview. Excel for the web, desktop Excel and Google Sheets can all save or download the page as a PDF. Also share the workbook with view access for anyone who wants to look at the detail.

## A worked example

Hawa prepares a monthly report for a women's savings association with groups in Tolon, Kumbungu and Savelugu. Her page shows:

* **Title:** "Savings report, September 2026".
* **Key numbers:** total savings (GHS), new members, loans repaid on time, each with last month beside it.
* **Chart:** savings by month, titled "Savings rose for the fourth month in a row".
* **Table:** savings by group, sorted, with Kumbungu marked "Behind" because it missed its target.
* **Highlights:** "Savings are up in all three groups. Kumbungu is behind target because two meetings were cancelled. Suggest a catch up meeting in October."

The executive reads it in a minute and acts on the last line. Next month Hawa replaces the raw data, refreshes, rewrites the highlights, and sends it again.

## Use only real or clearly invented data

For portfolio pieces, use open data or data you invent and label as invented. Never share real customer, member or beneficiary records without permission.`,
      practice_task_md: `**Goal:** build a one page report from your practice data.

1. Use your practice workbook with a Clean table and a Calc sheet holding a PivotTable or SUMIFS summary.
2. Add a Report sheet with a title, period and source line.
3. Add three key numbers linked by formula to Calc, each with a comparison such as a target you set.
4. Add one sorted summary table and one chart with a message title.
5. Write two or three highlight sentences, including one suggested action.
6. Set the print area, fit it to one page wide, and save or download a PDF. Open the PDF on a phone to check it.

**Done looks like:** a PDF and a workbook of one clear page that a manager could read in a minute, clearly labelled as invented data. This is your first portfolio piece; share it with a mentor for feedback.`,
      quiz: {
        questions: [
          {
            prompt: "Which key number is most useful on a one page report?",
            options: [
              "412",
              "Farmers trained: 412 (target 400)",
              "A list of all 412 farmer names",
              "Row 412",
            ],
            answer_index: 1,
            explanation: "A labelled number with a comparison tells the reader whether the result is good or bad.",
          },
          {
            prompt: "How should numbers on the Report sheet be filled in?",
            options: [
              "Typed by hand each month",
              "Linked by formula to the calculation sheet, such as =Calc!B4",
              "Copied from last month's PDF",
              "Left blank for the reader to calculate",
            ],
            answer_index: 1,
            explanation: "Linking by formula keeps the report accurate and makes it refreshable.",
          },
          {
            prompt: "Which formula gives the change from last month when this month is in B4 and last month in C4?",
            options: [
              "=B4+C4",
              "=C4/B4",
              "=(B4-C4)/C4",
              "=B4*C4",
            ],
            answer_index: 2,
            explanation: "Subtract last month from this month, then divide by last month, and format as a percentage.",
          },
          {
            prompt: "Why keep the report layout narrow, around columns A to H?",
            options: [
              "Excel only prints eight columns",
              "So it reads on a phone and fits one page wide without much side scrolling",
              "Wide reports cannot hold charts",
              "Narrow sheets calculate faster",
            ],
            answer_index: 1,
            explanation: "Many readers open reports on phones, so a narrow page is easier to read.",
          },
          {
            prompt: "What belongs in the highlights section?",
            options: [
              "Every number from the raw data",
              "The formulas used",
              "Two or three plain sentences on what went well, what is behind and a suggested action",
              "The names of everyone in the dataset",
            ],
            answer_index: 2,
            explanation: "Highlights explain the result in words and suggest what to do next.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "power-bi": {
      explanation_md: `## Why this matters

Power BI appears in many Ghanaian adverts for MIS officers, M&E officers, data analysts and business intelligence roles, usually alongside Excel. Where Excel reports are pages, Power BI reports are interactive: a manager clicks "Wa" and every chart on the page shows Wa only. Organisations use it to bring data from several sources into one place and keep dashboards up to date.

## The three parts of Power BI

* **Power BI Desktop** is where reports are built. It is a free download and you can build and save reports without any account or licence. It runs **only on Windows** (Windows 10 or later).
* **The Power BI service** is the website where organisations publish, share and refresh reports. Signing up needs a **work or school email**; personal addresses such as Gmail cannot sign up directly. Sharing with colleagues usually needs a paid licence, which an employer would normally provide.
* **The Power BI mobile apps** let people view and interact with published reports on phones and tablets. They are for reading, not building.

## Do you need a Windows computer?

For this section, yes, to do the practice yourself. Some honest options:

* A computer lab at school, a university, a library, a tech hub or your workplace. Ask whether you can install Power BI Desktop; the Microsoft Store version does not need administrator rights.
* An internet café, if it allows installs. Save your files to a USB stick or OneDrive every session.
* A friend or relative's Windows laptop for a few hours each week.

Before you rely on a machine, check its screen. Microsoft says Power BI Desktop needs a display of at least 1440 by 900; some common laptops at 1366 by 768 are below that, and some dialogs fall off the screen. The setup lesson explains what to check.

**If you have only a phone or a Mac for now:** read these lessons fully, because the ideas are what interviewers ask about. Then practise the same skills with a free browser tool such as Google's Data Studio (called Looker Studio until 2026), which connects to Google Sheets and builds interactive dashboards with filters. It does not teach Power Query or DAX, but it does teach connecting data, calculated fields, filters and dashboard design. Your Excel skills from earlier sections carry straight over.

## The Power BI workflow

Every Power BI report follows the same path, and this section teaches it in order:

1. **Get data:** load Excel or CSV files and clean them in Power Query, the same tool you met in Excel.
2. **Model:** connect tables, such as sales to products and branches, with relationships.
3. **Measure:** write DAX formulas for totals and averages that respond to filters.
4. **Visualise:** build report pages (covered in the next section).
5. **Share:** publish to the service inside an organisation (also next section).

## A small example

Fuseini works for a solar lamp distributor with agents across the Upper East Region. Every Monday he used to email a 20 tab Excel file. Now he builds one Power BI report: a sales table linked to agent and product tables, a few measures, and a page with a map, a trend and a slicer for district. Managers open it on their phones and click their own district. Fuseini spends Monday mornings looking for problems in the numbers instead of copying them.`,
      practice_task_md: `**Goal:** plan your Power BI practice access.

1. List every Windows computer you could use for a few hours a week: school, library, hub, workplace, café, family.
2. For one of them, find out: Windows version, whether you may install software, and the screen resolution (Settings, then System, then Display).
3. If you have no Windows option yet, open Google's free Data Studio in a browser with a Google account, connect it to your practice Google Sheet, and add one chart and one filter control.
4. Write a short plan: where and when you will practise the next four lessons.

**Done looks like:** a written access plan naming a computer, or a first Data Studio chart linked to your sheet. Share the plan with a mentor so they can help you find a computer if needed.`,
      quiz: {
        questions: [
          {
            prompt: "Which part of Power BI is used to build reports?",
            options: [
              "Power BI Desktop",
              "The Power BI mobile app",
              "Excel for the web",
              "Google Sheets",
            ],
            answer_index: 0,
            explanation: "Reports are built in Power BI Desktop; the service shares them and the mobile apps view them.",
          },
          {
            prompt: "What do you need to sign up for the Power BI service?",
            options: [
              "Any Gmail address",
              "A work or school email account",
              "A Windows laptop only",
              "Nothing, it needs no sign up",
            ],
            answer_index: 1,
            explanation: "Microsoft requires a work or school email; personal addresses cannot sign up directly.",
          },
          {
            prompt: "Which operating system does Power BI Desktop run on?",
            options: [
              "Android",
              "macOS",
              "Windows",
              "Any system with a browser",
            ],
            answer_index: 2,
            explanation: "Power BI Desktop runs only on Windows 10 or later.",
          },
          {
            prompt: "You only have a phone and a Mac for now. What does the lesson suggest?",
            options: [
              "Skip the Power BI section completely",
              "Read the lessons and practise dashboards with a free browser tool such as Google's Data Studio",
              "Buy a new Windows laptop before continuing",
              "Build reports in the Power BI mobile app",
            ],
            answer_index: 1,
            explanation: "The ideas still matter, and a free browser tool lets you practise dashboards until you can use a Windows computer.",
          },
          {
            prompt: "What is the correct order of the Power BI workflow?",
            options: [
              "Share, model, get data, measure, visualise",
              "Get data, model, measure, visualise, share",
              "Visualise, get data, share, model, measure",
              "Measure, share, model, visualise, get data",
            ],
            answer_index: 1,
            explanation: "Reports start with getting and cleaning data, then modelling, measures, visuals and finally sharing.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "power-bi-desktop-setup": {
      explanation_md: `## Why this matters

Your first hour with Power BI Desktop should be spent learning, not fighting the installation. A little preparation saves wasted trips to a lab or café, and knowing your way around the three main views makes every later lesson easier. Employers expect you to be comfortable in Desktop from day one.

## Check the computer first

Power BI Desktop needs:

* **Windows 10 or later.** It does not run on macOS, ChromeOS, Android or iOS.
* **At least 2 GB of free memory (RAM),** with 4 GB or more recommended. More is better for large files.
* **A screen of at least 1440 by 900 pixels.** Microsoft says lower resolutions such as 1366 by 768 or 1280 by 800 are not supported, because some dialogs extend beyond the screen. Check in **Settings, then System, then Display**.
* **Display scaling at 100%.** If "Scale" is set higher, some dialogs may not show. Set it to 100% in the same Display settings.

## Two ways to install

* **Microsoft Store (recommended for shared computers):** search for Power BI Desktop in the Store and choose Install. It does not need administrator rights, updates itself automatically and downloads smaller updates.
* **Direct download** from Microsoft's Power BI Desktop page: a single 64 bit installer. You need administrator rights to install it.

Do not install both on the same computer. The download is large, so use Wi Fi rather than mobile data. Microsoft releases a new version every month, and only the latest version is supported, so update when asked.

## Do you need to sign in?

No. When Desktop opens it may invite you to sign in. You can close that and still build, save and reopen reports. Your work is saved as a **.pbix** file. Signing in is only needed to publish to the Power BI service, which needs a work or school account.

## A tour of the views

The icons down the left side switch between views:

* **Report view:** the canvas where you build pages of visuals. The **Visualizations** pane offers chart types, and the **Data** pane lists your tables and columns.
* **Table view:** shows the rows of each loaded table, so you can check the data and its types.
* **Model view:** shows your tables as boxes and the relationships between them as lines.

Along the top is a ribbon similar to Excel's, with **Get data**, **Transform data** (which opens Power Query) and **Refresh** on the Home tab.

## Open sample data

The start screen offers ways to begin. If it shows an option to use sample data, load it. If not, search Microsoft Learn for the free Financial Sample Excel workbook, download it once, and load it with **Get data, then Excel workbook**. Drag a field such as Country onto the canvas and a number such as Sales next to it, and Power BI draws a visual for you. Click a bar and see the rest of the page respond.

## A worked example

Mariama books two hours at her university's computer lab. Before going, she asks the lab assistant whether students can install from the Microsoft Store and what the screen resolution is. In the lab she installs Desktop, sets scaling to 100%, loads the sample data, builds two visuals and saves the .pbix file to OneDrive and a USB stick. Next week she opens it on a different lab computer and continues where she stopped.`,
      practice_task_md: `**Goal:** install Power BI Desktop and build your first visual.

You need a Windows computer for this task. If you do not have access yet, complete the Data Studio alternative from the section lesson and return here later.

1. Check the computer: Windows version, free memory, screen resolution and scaling at 100%.
2. Install Power BI Desktop from the Microsoft Store, or by direct download if you have administrator rights.
3. Load sample data, or download the Financial Sample workbook and load it with Get data.
4. Visit Report, Table and Model view and write one sentence about what each shows.
5. Build one bar chart and one card showing a total, then save the file as a .pbix to OneDrive or a USB stick.

**Done looks like:** a saved .pbix file with two visuals, plus your three sentences about the views. Show a mentor how clicking the chart changes the card.`,
      quiz: {
        questions: [
          {
            prompt: "What is the minimum screen resolution Microsoft states for Power BI Desktop?",
            options: [
              "1024 by 768",
              "1280 by 800",
              "1440 by 900",
              "800 by 600",
            ],
            answer_index: 2,
            explanation: "Microsoft says at least 1440 by 900 is required because some dialogs do not fit on smaller screens.",
          },
          {
            prompt: "Why is the Microsoft Store version good for shared computers?",
            options: [
              "It runs on a Mac",
              "It does not need administrator rights and updates automatically",
              "It includes a free Pro licence",
              "It works without Windows",
            ],
            answer_index: 1,
            explanation: "The Store version installs without administrator rights and keeps itself up to date.",
          },
          {
            prompt: "Do you need to sign in to build and save reports in Power BI Desktop?",
            options: [
              "Yes, with a Gmail account",
              "Yes, with a paid licence",
              "No, signing in is only needed to publish to the Power BI service",
              "No, but you cannot save files",
            ],
            answer_index: 2,
            explanation: "Desktop builds and saves .pbix files without signing in; publishing needs an account.",
          },
          {
            prompt: "Which view shows tables as boxes with relationship lines between them?",
            options: [
              "Report view",
              "Table view",
              "Model view",
              "Print preview",
            ],
            answer_index: 2,
            explanation: "Model view displays the tables and their relationships.",
          },
          {
            prompt: "Some dialogs are missing on screen. What setting should you check?",
            options: [
              "The keyboard language",
              "Display scaling, which should be set to 100%",
              "The Wi Fi connection",
              "The printer settings",
            ],
            answer_index: 1,
            explanation: "Scaling above 100% can hide dialogs that Power BI Desktop needs you to use.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "getting-data-into-power-bi": {
      explanation_md: `## Why this matters

Microsoft's Power BI Data Analyst certification lists preparing data as its first skill area, and in real jobs it takes much of the time. If the data comes in clean, with clear names and correct types, the model, measures and visuals that follow are simple. If it comes in messy, every later step fights you. The good news: you already know the tool, because Power BI uses the same Power Query you met in Excel.

## Loading a file

On the Home tab choose **Get data**, then the source:

* **Excel workbook:** pick the file, and the **Navigator** window lists every sheet and table inside. Tick the ones you want. Excel tables (with names like \`Sales\`) load more reliably than plain sheets.
* **Text/CSV:** for exports from mobile money systems, survey tools such as KoboToolbox or ODK, and accounting software.
* **Folder:** combines many files with the same layout, such as one file per field officer.

At the bottom of the Navigator you have two buttons. **Load** brings the data in as it is. **Transform Data** opens Power Query first. Choose Transform Data almost every time; a minute of checking now saves an hour later.

## Shaping in Power Query

The editor looks and works like the one in Excel. Each change is recorded in **Applied Steps**. The steps that matter most:

* **Remove columns** you will not use. Smaller models are faster and easier to understand.
* **Rename columns** in plain words: "Amount (GHS)" rather than "amt_ghs_v2". These names appear on your visuals.
* **Set data types.** Every column needs the right type: Whole number, Decimal number, Date or Text. A column of numbers stored as text cannot be summed. For day first dates, use **Change Type, then Using Locale**, and choose English (Ghana) or English (United Kingdom).
* **Trim and clean text** so "Tamale" and "Tamale " become one value.
* **Filter out** blank rows, totals rows and test entries.
* **Rename the query** itself, for example to \`Sales\`, because that becomes the table name in your model.

When you are done, choose **Close and Apply**. The data loads into the model and you can see it in Table view.

## Refreshing

The .pbix file remembers where the data came from. When the source file changes, click **Refresh** on the Home tab and every step runs again. Keep source files in the same folder with the same names and layout. If you move a file, update the path in **Transform data, then Data source settings**.

## Column quality and profile

In Power Query, the **View** tab has **Column quality** and **Column distribution**. They show, for each column, how many values are valid, empty or errors, and how many are distinct. It is a fast health check before you load.

## A worked example

Sumaila receives a KoboToolbox export of a household survey from Nanton. He uses Get data, Text/CSV, then Transform Data. He removes metadata columns he does not need, renames "q3_hh_size" to "Household size", sets it to Whole number, changes the interview date using the English (Ghana) locale, trims community names and filters out three test interviews. Column quality shows two errors in Household size, where someone typed "five"; he notes them for the field team. Then Close and Apply.`,
      practice_task_md: `**Goal:** load and shape a file in Power BI Desktop.

You need a Windows computer with Power BI Desktop. Without one, do the same shaping steps on your practice data with helper columns in a spreadsheet, and list each step.

1. Save your practice sales table as an Excel workbook with a named table, plus the price list on another sheet.
2. In Power BI Desktop, use Get data, Excel workbook, tick both tables and choose Transform Data.
3. Rename columns in plain words, set correct types, trim text, and remove any column you do not need.
4. Turn on Column quality and fix or note any errors.
5. Close and Apply, then change one value in the Excel file, save it and Refresh in Power BI.

**Done looks like:** a .pbix file with two clean, well named tables and a list of your Applied Steps. Explain to a mentor why you chose each step.`,
      quiz: {
        questions: [
          {
            prompt: "In the Navigator window, why choose Transform Data instead of Load?",
            options: [
              "Load deletes the source file",
              "Transform Data opens Power Query so you can check and clean the data first",
              "Transform Data makes the file smaller",
              "Load only works for CSV files",
            ],
            answer_index: 1,
            explanation: "Transform Data lets you shape and check the data before it enters the model.",
          },
          {
            prompt: "Why is setting the correct data type important?",
            options: [
              "It changes the colour of the column",
              "A column of numbers stored as text cannot be summed",
              "Power BI deletes columns without types",
              "It is only needed for dates",
            ],
            answer_index: 1,
            explanation: "Calculations need numeric types, so numbers stored as text will not total.",
          },
          {
            prompt: "Why rename columns in plain words such as \"Amount (GHS)\"?",
            options: [
              "Power BI requires short names",
              "Column names appear on visuals, so readers need to understand them",
              "Renaming speeds up refresh",
              "It is required before saving",
            ],
            answer_index: 1,
            explanation: "Clear names make the model and the visuals easier for everyone to read.",
          },
          {
            prompt: "The source Excel file has been updated. What do you do in Power BI Desktop?",
            options: [
              "Delete the table and load it again",
              "Click Refresh so the applied steps run on the new data",
              "Retype the new values in Table view",
              "Nothing, it updates every second",
            ],
            answer_index: 1,
            explanation: "Refresh reloads the source and replays every recorded step.",
          },
          {
            prompt: "Which Power Query feature gives a quick health check of valid, empty and error values?",
            options: [
              "Close and Apply",
              "Data source settings",
              "Column quality",
              "Rename query",
            ],
            answer_index: 2,
            explanation: "Column quality shows the share of valid, empty and error values in each column.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "relationships-and-models": {
      explanation_md: `## Why this matters

In Excel, you used XLOOKUP to bring a product name into every sales row. In Power BI you rarely do that. Instead you keep tables separate and connect them with **relationships**. That connected set of tables is called a **model**. A good model makes reports fast, measures simple and filters work everywhere. Modelling is the second skill area of Microsoft's Power BI Data Analyst certification, and interviewers often ask about it.

## Facts and dimensions

Most business data splits into two kinds of tables:

* **Fact tables** record events: each sale, each payment, each training attendance. They have many rows, with numbers (amounts, quantities) and codes that point to other tables.
* **Dimension tables** describe things: products, branches, staff, dates. They have one row per thing and the details you filter and group by, such as Product name, Category, Region.

For a shop network:

* \`Sales\` (fact): Date, Branch code, Product code, Quantity, Amount
* \`Products\` (dimension): Product code, Product name, Category
* \`Branches\` (dimension): Branch code, Branch name, Region
* \`Calendar\` (dimension): Date, Month, Year

## The star schema

Put the fact table in the middle and connect each dimension to it. Drawn out, it looks like a star, which is why it is called a **star schema**. Microsoft's own guidance recommends this shape for Power BI.

## Creating relationships

Open **Model view**. Power BI may detect some relationships automatically. To create one yourself, drag the key column from the dimension (Product code in Products) onto the matching column in the fact table (Product code in Sales). Check the line:

* **Cardinality:** one to many. Each product appears **once** in Products and **many** times in Sales. The "1" end must be the dimension, so its key column must have no duplicates.
* **Cross filter direction:** single, flowing from the dimension to the fact. This is the safe default.

If Power BI refuses or makes a many to many relationship, your dimension key probably has duplicates or blanks. Go back to Power Query and fix them.

## Why this works

Once Products is related to Sales, put Category on a chart with a sales total, and Power BI filters Sales through the relationship. Add a slicer for Region from Branches, and every visual based on Sales responds. One filter, many tables, no lookups.

## A date table

Reports almost always group by month or year, so add a Calendar table with one row per date, covering every date in your data, and columns for Month and Year. You can build it in Excel and load it. Relate Calendar[Date] to Sales[Date], then right click Calendar and choose **Mark as date table**.

## A worked example

Issahaku builds a model for a farm input supplier. His first try loaded one huge flat sheet with product and branch details repeated on every row. He rebuilds it as a star: Sales in the middle, Products, Branches and Calendar around it, each joined one to many. The file is smaller, and when his manager asks for "fertiliser sales in the Upper East, by month", it is one slicer and one chart.`,
      practice_task_md: `**Goal:** build a small star schema in Power BI Desktop.

You need a Windows computer with Power BI Desktop. Without one, sketch the star on paper, listing each table's columns and marking every key, then build the same tables as sheets in a spreadsheet.

1. Prepare four tables in Excel: Sales (at least 30 rows), Products, Branches and a Calendar with Date, Month and Year.
2. Make sure each dimension key (Product code, Branch code, Date) has no duplicates or blanks.
3. Load all four into Power BI Desktop and open Model view.
4. Create one to many relationships from each dimension to Sales, with single cross filter direction.
5. Mark Calendar as a date table.
6. In Report view, build a chart of Amount by Category and a slicer for Region, and check the slicer filters the chart.

**Done looks like:** a Model view screenshot showing a star with three relationships, and a working slicer. Explain to a mentor which tables are facts and which are dimensions.`,
      quiz: {
        questions: [
          {
            prompt: "Which table is a fact table?",
            options: [
              "Products, with one row per product",
              "Branches, with one row per branch",
              "Sales, with one row per sale",
              "Calendar, with one row per date",
            ],
            answer_index: 2,
            explanation: "Fact tables record events such as individual sales.",
          },
          {
            prompt: "What is a star schema?",
            options: [
              "A table with a star rating column",
              "A fact table in the middle connected to dimension tables around it",
              "One large flat table with every detail repeated",
              "A chart type in Power BI",
            ],
            answer_index: 1,
            explanation: "The star schema puts the fact table at the centre with dimensions around it.",
          },
          {
            prompt: "In a one to many relationship between Products and Sales, which side is \"one\"?",
            options: [
              "Products, because each product appears once there",
              "Sales, because it has more rows",
              "Either side, it does not matter",
              "Neither, Power BI decides at random",
            ],
            answer_index: 0,
            explanation: "The dimension holds each key once, so it is the \"one\" side.",
          },
          {
            prompt: "Power BI will not create a one to many relationship. What is a likely cause?",
            options: [
              "The fact table has too many rows",
              "The dimension key column has duplicates or blanks",
              "The file is not saved",
              "The report has no visuals",
            ],
            answer_index: 1,
            explanation: "The \"one\" side must have unique, non blank keys.",
          },
          {
            prompt: "Why add a Calendar table?",
            options: [
              "Power BI cannot show dates without one",
              "So reports can group and filter by month and year consistently across the model",
              "To store public holidays only",
              "To replace the Sales table",
            ],
            answer_index: 1,
            explanation: "A date table with one row per date gives reliable grouping by month and year.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "first-dax-measures": {
      explanation_md: `## Why this matters

DAX (Data Analysis Expressions) is Power BI's formula language, and Power BI adverts and the Data Analyst certification expect you to know the basics. You do not need advanced DAX for a first job. You need a few clear measures, named well, that give the right answer whatever the user clicks.

## What a measure is

A **measure** is a formula that calculates a single answer, such as total sales, based on whatever is currently filtered. Put Total Sales on a card and it shows the grand total. Put it in a chart by branch and it shows each branch's total. Click "Wa" in a slicer and it shows Wa's total. The same formula gives the right answer in every place, because it is calculated at the moment it is shown, using the current filters. Those filters are called the **filter context**.

## Writing your first measures

Select your Sales table, choose **New measure** on the Home tab, and type in the formula bar:

\`\`\`
Total Sales = SUM(Sales[Amount])
\`\`\`

The name comes first, then \`=\`, then the formula. \`Sales[Amount]\` means the Amount column in the Sales table. A few more:

\`\`\`
Number of Sales = COUNTROWS(Sales)
\`\`\`

\`\`\`
Average Sale = DIVIDE([Total Sales], [Number of Sales])
\`\`\`

Notice that the third measure reuses the first two by name in square brackets. Building small measures and combining them keeps things readable. \`DIVIDE\` is safer than the \`/\` sign because it returns a blank instead of an error when dividing by zero.

\`\`\`
Tamale Sales = CALCULATE([Total Sales], Branches[Branch name] = "Tamale")
\`\`\`

\`CALCULATE\` changes the filter context: here it always shows Tamale's total, whatever else is selected. It is the most important DAX function to learn next.

After creating a measure, set its format on the **Measure tools** tab, such as a currency or whole number with a thousands separator.

## Measures or calculated columns?

DAX can also add a **calculated column**, which works out a value for every row and stores it, such as a Size label for each sale. Use calculated columns for values you want to filter or group by. Use **measures** for totals, averages and ratios. If you create a total as a column, it is stored on every row, makes the file bigger and is easy to add up wrongly.

Power BI also sums a numeric column automatically when you drag it into a visual. That is fine for exploring, but writing explicit measures gives you clear names, one definition everyone uses, and the ability to reuse them in other measures.

## A worked example

Hawa's NGO report needs: total participants, women participants, and the share of women. She writes:

\`\`\`
Participants = COUNTROWS(Attendance)
\`\`\`

\`\`\`
Women = CALCULATE([Participants], Attendance[Gender] = "Female")
\`\`\`

\`\`\`
Women share = DIVIDE([Women], [Participants])
\`\`\`

She formats Women share as a percentage. On a page with a district slicer, all three update together. When the director asks "what is the share in Gushegu?", Hawa clicks Gushegu.`,
      practice_task_md: `**Goal:** write and use your first measures.

You need a Windows computer with Power BI Desktop and the model from the last lesson. Without one, write the measures on paper and calculate by hand what each would show for one branch of your practice data, using SUMIFS and COUNTIF in a spreadsheet to check.

1. Create Total Sales, Number of Sales and Average Sale measures, using DIVIDE for the average.
2. Create one CALCULATE measure for a single branch or category.
3. Format each measure (currency or whole number).
4. Add a card for each measure and a table of Total Sales by branch.
5. Add a slicer for Region and check how each measure changes when you click.

**Done looks like:** a report page with four measures on cards and a table, all responding to a slicer. Explain filter context to a mentor using your own page.`,
      quiz: {
        questions: [
          {
            prompt: "What is a DAX measure?",
            options: [
              "A column stored on every row",
              "A formula that calculates an answer using the current filters",
              "A type of chart",
              "A Power Query step",
            ],
            answer_index: 1,
            explanation: "Measures are calculated when shown, using the current filter context.",
          },
          {
            prompt: "Which measure correctly totals the Amount column in the Sales table?",
            options: [
              "Total Sales = Sales + Amount",
              "Total Sales = SUM(Sales[Amount])",
              "Total Sales = SUM(Amount, Sales)",
              "Total Sales = COUNTROWS(Amount)",
            ],
            answer_index: 1,
            explanation: "SUM takes a column, written as Table[Column].",
          },
          {
            prompt: "Why use DIVIDE instead of the / sign?",
            options: [
              "DIVIDE is faster to type",
              "DIVIDE returns a blank instead of an error when dividing by zero",
              "The / sign does not work in DAX",
              "DIVIDE rounds the answer",
            ],
            answer_index: 1,
            explanation: "DIVIDE handles division by zero safely.",
          },
          {
            prompt: "What does CALCULATE do in Tamale Sales = CALCULATE([Total Sales], Branches[Branch name] = \"Tamale\")?",
            options: [
              "Deletes all branches except Tamale",
              "Changes the filter context so the measure always shows Tamale's total",
              "Creates a new table called Tamale",
              "Sorts the branches",
            ],
            answer_index: 1,
            explanation: "CALCULATE evaluates the measure with a changed filter, here Branch name equal to Tamale.",
          },
          {
            prompt: "When should you use a measure rather than a calculated column?",
            options: [
              "For a label you want to group by",
              "For totals, averages and ratios",
              "For storing phone numbers",
              "For renaming tables",
            ],
            answer_index: 1,
            explanation: "Measures suit totals and ratios; calculated columns suit row values used for grouping or filtering.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "reports-people-use": {
      explanation_md: `## Why this matters

A dashboard can be technically perfect and still fail. If the regional manager cannot find the number she needs, does not trust it, or opens it to find last month's data, she goes back to asking for an Excel file by email. Your work only creates value when the right people read it, understand it and act on it. That is why job adverts for MIS and reporting roles talk about supporting report users, presenting findings and maintaining dashboards, not only building them.

## What this section covers

* **Designing a clear report page:** where to put the most important numbers, how many visuals to use, how to use colour, and how to make the page work on a phone and for people with colour blindness or who use screen readers.
* **Sharing reports and keeping them fresh:** how organisations publish and share Power BI reports, how scheduled refresh keeps data current, and why "publish to web" must never be used for private data.

## Three questions for every report

Before you design anything, find out:

1. **Who will read it?** A director wants three numbers and a trend. A field supervisor wants a list of communities to visit this week. They need different pages.
2. **What decision does it support?** If you cannot name a decision, the page is probably decoration.
3. **Where and how often will they read it?** On a phone in a vehicle on the Tamale to Bolgatanga road, or on a big screen in a monthly meeting? Daily, weekly or monthly?

The answers shape everything that follows: which visuals, how much detail, how often the data must refresh and who should have access.

## Trust is the real product

People act on reports they trust. You build trust by:

* showing **when the data was last updated** on the page,
* using the **same definitions** everywhere (if "active member" means "paid in the last 30 days", write that in a note and use one measure for it),
* **checking numbers** against a source the reader already knows, such as last month's Excel report,
* fixing errors openly and quickly when someone finds one.

One wrong number that nobody explains can make a team stop using a dashboard for months.

## A small example

Amina built a 12 page Power BI report for a health NGO, with every chart she could think of. Usage dropped after two weeks. She interviewed three users. The district nurses wanted one thing: which facilities had not reported this month. The programme manager wanted coverage against target by district.

She rebuilt it as two pages. Page one: three key numbers, coverage by district against target, and a "last refreshed" date. Page two: a table of facilities that have not reported, with phone numbers, filtered by district. Each nurse now opens it on a phone each Monday and makes the calls. Fewer visuals, more use.

## Privacy is part of design

Reports often contain personal data: names, phone numbers, health or financial details. Ghana's Data Protection Act protects personal data, and your employer will have its own rules. Show only what each reader needs, and share only with people who should see it. The sharing lesson explains how.`,
      practice_task_md: `**Goal:** design a report around its readers before building it.

1. Pick a report you have built in this track, in Excel or Power BI.
2. Name two different readers, real or realistic, such as a manager and a field officer.
3. For each, write: the decision they make, where they read it, how often, and the three things they most need to see.
4. List any personal data in the report and decide who should and should not see it.
5. Sketch the page or pages you would give each reader.

**Done looks like:** a one page reader plan with two readers, their needs, a privacy note and a sketch. Discuss it with a mentor, ideally someone who reads reports at work.`,
      quiz: {
        questions: [
          {
            prompt: "Which three questions should you answer before designing a report?",
            options: [
              "Which colours, which fonts, which logo",
              "Who will read it, what decision it supports, and where and how often they will read it",
              "How many pages, how many charts, how many tables",
              "Which software, which version, which computer",
            ],
            answer_index: 1,
            explanation: "Knowing the readers, the decision and the reading situation shapes every design choice.",
          },
          {
            prompt: "Which practice builds trust in a dashboard?",
            options: [
              "Adding as many charts as possible",
              "Showing when the data was last updated",
              "Changing definitions each month",
              "Hiding errors until someone asks",
            ],
            answer_index: 1,
            explanation: "A visible refresh date tells readers how current the numbers are.",
          },
          {
            prompt: "Why did Amina's 12 page report lose users?",
            options: [
              "The data was always wrong",
              "It was built in Excel",
              "It was not designed around what users actually needed",
              "Power BI stopped working",
            ],
            answer_index: 2,
            explanation: "When she asked users what they needed, two focused pages served them better than twelve.",
          },
          {
            prompt: "A report contains names and phone numbers of clients. What should you do?",
            options: [
              "Share it publicly so everyone can help",
              "Show only what each reader needs and share only with people who should see it",
              "Remove all numbers from the report",
              "Print it and leave copies in the office",
            ],
            answer_index: 1,
            explanation: "Personal data must be limited to those who need it, in line with data protection rules.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "report-design": {
      explanation_md: `## Why this matters

When a manager opens your report, you have a few seconds before they decide whether it is useful. A clear page guides their eyes to the answer. A crowded one makes them hunt, and they give up. Good design is not decoration; it is what turns your analysis into a decision. Microsoft's Data Analyst certification includes visualising data, and employers judge your portfolio on it.

## Layout: most important first

Most readers scan a page from the top left, across, then down. So:

* Put the **key numbers** (on cards) along the top, most important on the left.
* Put the **main chart** that explains those numbers below them.
* Put **detail**, such as a table, lower down or on a second page.
* Put **slicers** (filters) in one consistent place, such as a strip along the top or the left, on every page.

Give the page a **title** that says what it is for, and show the **last refreshed date** in a small text box or card.

## Fewer visuals, each with a job

Keep each page to a handful of visuals. For every visual, ask: "What question does this answer?" If you cannot say, remove it. Use the chart rules from the Excel section: bars for comparing, lines for trends, tables for exact lookups, message titles, zero baselines and no 3D.

Align visuals to a grid and leave space between them. Use the same size and style for cards across pages.

## Colour with purpose

* Choose one theme for the whole report (**View, then Themes**). Power BI includes themes designed to be accessible.
* Use a neutral colour for most data and **one accent colour** for what needs attention.
* Use the same colour for the same thing everywhere. If Tamale is blue on page one, it is blue on page three.
* **Never rely on colour alone.** Some readers cannot tell red from green. Add a label, an icon or a word such as "Below target".

## Accessible reports

Microsoft's guidance on accessible Power BI reports covers features you should use:

* **Alt text** on each visual (in the visual's format options) describing what it shows, for people using screen readers.
* **Good contrast** between text and background, and readable font sizes.
* A sensible **tab order** so people using a keyboard move through visuals in a logical order.

## Phone layout

Many people will view your report in the Power BI mobile app. In Power BI Desktop, **View, then Mobile layout** lets you arrange visuals specifically for a phone screen: usually cards at the top, then one or two visuals stacked, then slicers. If you do not create one, the app shows the full page, which is hard to read on a small screen.

## A worked example

Wumpini's first sales page for a distributor in Tamale had 14 visuals, five colours and slicers scattered around. She redesigned it:

* Top row: four cards (Total Sales, vs Target, Number of Agents, Average Sale), with "Last refreshed" beside them.
* Middle: a line chart, "Sales rose in the last three months", and a bar chart of sales by district, sorted, with districts below target in orange and labelled.
* Left strip: slicers for Month and Product.
* Alt text on each visual and a mobile layout with the cards and line chart.

Her manager now opens it in the mobile app each morning.`,
      practice_task_md: `**Goal:** redesign a report page for clarity and access.

You need Power BI Desktop for the full task. Without it, apply the same rules to your one page Excel report, or to a dashboard in Google's free Data Studio.

1. Open the report from your DAX lesson, or your Excel report.
2. Move key numbers to cards along the top, most important on the left, with a "last refreshed" note.
3. Remove any visual that does not answer a clear question, and give each remaining visual a message title.
4. Apply one theme, use one accent colour, and add a word or icon wherever colour carries meaning.
5. Add alt text to each visual.
6. In Power BI, create a mobile layout with the cards and one main chart.

**Done looks like:** before and after screenshots of your page, plus a short list of the changes you made and why. Ask a mentor to find the main message in five seconds.`,
      quiz: {
        questions: [
          {
            prompt: "Where should the most important numbers go on a report page?",
            options: [
              "Bottom right",
              "Top left, on cards",
              "On a hidden page",
              "In the middle of a large table",
            ],
            answer_index: 1,
            explanation: "Readers usually scan from the top left, so key numbers belong there.",
          },
          {
            prompt: "Why add alt text to visuals?",
            options: [
              "It makes visuals load faster",
              "So people using screen readers can understand what each visual shows",
              "It is required to publish",
              "It changes the chart colours",
            ],
            answer_index: 1,
            explanation: "Alt text describes a visual for people who cannot see it.",
          },
          {
            prompt: "What does Mobile layout in Power BI Desktop let you do?",
            options: [
              "Build reports on a phone",
              "Arrange visuals specifically for viewing in the mobile app on a phone",
              "Share reports by SMS",
              "Turn off the report on phones",
            ],
            answer_index: 1,
            explanation: "Mobile layout creates a phone friendly arrangement of the page's visuals.",
          },
          {
            prompt: "Which colour practice does the lesson recommend?",
            options: [
              "A different colour for every visual",
              "A neutral colour for most data and one accent colour for what needs attention",
              "Red and green only, with no labels",
              "Changing colours on each page to keep it interesting",
            ],
            answer_index: 1,
            explanation: "One accent colour draws attention, and consistency avoids confusion.",
          },
          {
            prompt: "How should you decide whether to keep a visual?",
            options: [
              "Keep it if it looks impressive",
              "Keep every visual Power BI suggests",
              "Keep it only if you can say what question it answers",
              "Keep it if it uses many colours",
            ],
            answer_index: 2,
            explanation: "Every visual should answer a clear question; otherwise it adds clutter.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "sharing-and-refresh": {
      explanation_md: `## Why this matters

A report on your computer helps nobody else. In organisations, Power BI reports are published to the Power BI service, shared with the right people, and refreshed automatically so nobody has to rebuild them. You may not do this yourself until you join an organisation, because the service needs a work or school account. But interviewers ask how sharing and refresh work, and knowing the risks, especially of "publish to web", protects you and your employer.

## Publishing

In Power BI Desktop, **Home, then Publish** sends the report and its data (called a **semantic model**) to the Power BI service. You must sign in with a work or school account. You choose a **workspace**:

* **My workspace** is your personal area. A free licence lets you publish here for yourself.
* **Shared workspaces** are for teams. Sharing reports with colleagues usually needs a paid licence for the people involved, which the organisation manages.

Finished reports are often bundled into an **app**, which users open on the web or in the Power BI mobile apps.

## Keeping data fresh

When you publish, the data is a snapshot from your last refresh. To keep it current, the organisation sets a **scheduled refresh** in the semantic model's settings, such as every morning at six. How it reaches the data depends on where the data lives:

* **Files in OneDrive or SharePoint** can usually be refreshed directly from the cloud.
* **Files or databases on an office computer or server** need an **on premises data gateway**, a small program that lets the service reach them securely.

If a refresh fails, the owner is notified, and a "last refreshed" date on the page lets readers notice too.

## Publish to web: public to everyone

The service has an option called **Publish to web**. It creates a link and embed code that **anyone on the internet can view without signing in**. Microsoft warns that people may reach the underlying data in the model even if the report does not display it.

Use it only for data that is already public, such as an open dataset you analysed for your portfolio. **Never** use it for bank, payroll, health, beneficiary or customer data. Ghana's Data Protection Act protects personal data, and many organisations switch the feature off entirely. For private reports, use the normal sharing and app features, which check who is signed in.

## Controlling who sees what

Inside an organisation:

* Give access to the **people who need it**, preferably through groups so access is easy to remove later.
* Give **view** access unless someone truly needs to edit.
* **Row level security** can show each user only their own rows, such as each district manager seeing only their district. You will meet it as you go further.

## Sharing without the service

Before you have a work account, you can still share your work safely: in Power BI Desktop, **File, then Export, then Export to PDF** creates a PDF of your pages, and screenshots work for a portfolio. Sharing the .pbix file itself shares all its data, so only do that with invented or public data.

## A worked example

Fuseini publishes his distributor report to a team workspace, sets refresh for 6 am daily from a SharePoint folder, and shares it as an app with the sales managers' group. A new staff member asks him to "just publish it to web so I can see it at home". Fuseini explains why not, and asks IT to add her to the group instead.`,
      practice_task_md: `**Goal:** write a sharing plan and share your work safely.

1. Take a report you built, in Power BI Desktop or Excel, using invented or public data only.
2. Export it to PDF (Power BI Desktop: File, then Export; Excel or Google Sheets: save or download as PDF).
3. Write a short sharing plan for a real organisation using it: who gets access, view or edit, how often data refreshes and from where, and whether any personal data needs row level security.
4. Add one sentence explaining why Publish to web would or would not be acceptable for this report.

**Done looks like:** a PDF of your report and a half page sharing plan. Review the plan with a mentor, ideally someone who manages data at work.`,
      quiz: {
        questions: [
          {
            prompt: "What do you need to publish a report to the Power BI service?",
            options: [
              "A Gmail account",
              "A work or school account",
              "Only Power BI Desktop, no account",
              "A Mac computer",
            ],
            answer_index: 1,
            explanation: "Publishing requires signing in to the service with a work or school account.",
          },
          {
            prompt: "Who can view a report shared with Publish to web?",
            options: [
              "Only people in your organisation",
              "Only people you email the link to, after they sign in",
              "Anyone on the internet, without signing in",
              "Only Power BI administrators",
            ],
            answer_index: 2,
            explanation: "Publish to web makes the report public, with no sign in needed.",
          },
          {
            prompt: "Data lives in an Excel file on an office server. What is needed for scheduled refresh?",
            options: [
              "Nothing, the service reads office computers directly",
              "An on premises data gateway",
              "Publish to web",
              "A Power BI mobile app",
            ],
            answer_index: 1,
            explanation: "A gateway lets the service reach data stored on local computers or servers securely.",
          },
          {
            prompt: "Which report is acceptable for Publish to web?",
            options: [
              "Monthly payroll by staff member",
              "Health records of clinic patients",
              "An analysis of an already public open dataset",
              "A bank's customer loan balances",
            ],
            answer_index: 2,
            explanation: "Only data that is already public should ever be published to the web.",
          },
          {
            prompt: "How can you share your Power BI work safely before you have a work account?",
            options: [
              "Publish it to web",
              "Export it to PDF or take screenshots, using invented or public data",
              "Email the .pbix file with real client data",
              "Post your login details so others can see it",
            ],
            answer_index: 1,
            explanation: "PDFs and screenshots of reports built on invented or public data are safe portfolio material.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "getting-hired-excel": {
      explanation_md: `## Why this matters

Almost every CV in Ghana says "proficient in Microsoft Office". Employers know that line means very little. What makes you stand out is evidence: a clean report they can open, a dashboard they can click, a short explanation of how you turned messy data into a decision. This final section helps you turn the work you have done in this track into that evidence, and choose where to go next.

## What this section covers

* **A portfolio of office reports:** two or three finished pieces, built on open or invented data, presented with screenshots and a short write up, so an employer can see your skills in a few minutes.
* **Jobs, certifications and next steps:** the kinds of roles these skills fit, optional certifications and when they are worth it, and how to grow into SQL and Python through the Data Analyst track.

## Show, do not just tell

Compare two applications for an M&E assistant post:

* One says: "Advanced Excel, Power BI, data analysis."
* The other says: "Built a monthly activity report for a youth programme (sample data): cleaned 400 survey rows with Power Query, summarised by district with PivotTables, and presented a one page report with key numbers against target. Link to PDF and screenshots."

The second gives the employer something to check and something to ask about in an interview. That is what this section aims for.

## Where your evidence can live

You do not need a website. Simple, free options:

* A **folder in OneDrive or Google Drive** shared as "view only", with clearly named files and a short read me document.
* **PDFs and screenshots** that open quickly on a phone, since many recruiters will look on one.
* A short **post on a professional network** describing one project, with a screenshot.
* A **SydCrest mentor**, who can review your folder before you share it widely.

Whatever you choose, check the link works when you are signed out, and that it is set to view only.

## Honesty matters

Use open data or data you invented and label it clearly as sample data. Never use real customer, member, patient or beneficiary records from a job or volunteer role without written permission, even if you remove the names. Employers in banking, health and development take data protection seriously, and showing that you do too is part of being hired. Describe your role accurately: if a mentor helped, say so.

## A small example

Mariama finished this track with three pieces: a cleaned and validated registration sheet with dropdowns, a one page Excel report for an invented savings group, and a two page Power BI report she built in her university lab. She put them in a shared Drive folder with a one paragraph explanation for each. At an interview for a data officer role, the panel asked her to walk them through the Power BI report on the interview room computer. She spent ten minutes showing what she had done and why, which was far more convincing than any CV line.

## Keep practising

Skills fade if you stop. Offer to help a church, a school or a small business with a spreadsheet problem, with their permission and with any personal data kept private. Real requests teach you things no course can, and they often lead to references and opportunities.`,
      practice_task_md: `**Goal:** plan your portfolio.

1. List every file you built in this track and pick the two or three strongest.
2. For each, write one sentence: the problem, what you did, and the result.
3. Check each file uses only invented or open data, and label it "sample data" on the first sheet or page.
4. Create a folder in OneDrive or Google Drive called "Excel and Power BI portfolio YourName" and set sharing to view only.
5. Open the link in a private browser window to check it works without signing in.

**Done looks like:** a shared, view only folder with two or three labelled pieces and a one sentence summary for each. Send the link to a mentor and ask which piece is strongest.`,
      quiz: {
        questions: [
          {
            prompt: "Why is a CV line such as \"proficient in Microsoft Office\" not enough?",
            options: [
              "Employers do not use Microsoft Office",
              "It gives no evidence the employer can check",
              "It is too long",
              "It should be written in capitals",
            ],
            answer_index: 1,
            explanation: "Employers trust what they can see, such as a finished report.",
          },
          {
            prompt: "Which data is safe to use in a public portfolio?",
            options: [
              "Real beneficiary records with names removed, without permission",
              "Your employer's customer list",
              "Open data or invented data labelled as sample data",
              "Bank statements from friends",
            ],
            answer_index: 2,
            explanation: "Only open or invented data, clearly labelled, is safe without written permission.",
          },
          {
            prompt: "What should you check before sending a portfolio link?",
            options: [
              "That it allows anyone to edit",
              "That it opens when signed out and is set to view only",
              "That it contains every file you ever made",
              "That it requires a password nobody has",
            ],
            answer_index: 1,
            explanation: "A view only link that works without signing in lets employers see your work safely.",
          },
          {
            prompt: "Why do PDFs and screenshots work well in a portfolio?",
            options: [
              "They cannot be read on phones",
              "They hide your work",
              "They open quickly, including on a phone, which many recruiters use",
              "They are required by law",
            ],
            answer_index: 2,
            explanation: "Quick to open files suit recruiters who often look on a phone.",
          },
        ],
        pass_threshold: 75,
      },
    },
    "office-report-portfolio": {
      explanation_md: `## Why this matters

A small set of finished, well explained reports does more for your job search than a long list of skills. Employers hiring for admin, accounts, MIS and M&E roles want to know three things: can you handle messy data, can you get the numbers right, and can you present them clearly? A good portfolio answers all three before the interview starts. Freelance clients looking for Excel and Power BI help also hire from portfolios.

## What to include

Aim for two or three pieces that show different skills:

1. **A data entry and cleaning piece.** A validated entry sheet with dropdowns and rules, plus a messy file you cleaned with formulas or Power Query, showing before and after.
2. **A one page Excel report.** Key numbers against target, a PivotTable summary, one clear chart and written highlights.
3. **A Power BI report**, if you have had access to a Windows computer: a small star schema, a few DAX measures and one or two well designed pages. If you have not yet, a Data Studio dashboard shows the same thinking, and you can add Power BI later.

## Choosing data

Use data that is **open** or **invented**, and say which on the first page.

* **Invented data:** make it realistic. A market trader's daily sales in cedis across a month, a youth programme's attendance across districts, a savings group's contributions. Include the problems real data has (spelling variations, missing values, text dates) so you can show your cleaning.
* **Open data:** the Ghana Statistical Service and international open data sites publish tables you can download, and Kaggle hosts many public datasets. Read the licence and credit the source.

Never use real customer, member or beneficiary data from work or volunteering without written permission. The rules on personal data apply to portfolios too.

## Writing it up

For each piece, write a short case study of four parts:

* **Problem:** who needed what. "A savings group treasurer needed to see monthly contributions and who was behind."
* **Data:** where it came from and what was wrong with it. "Invented data, 300 rows, with inconsistent names and text dates."
* **What you did:** the main steps and tools. "Cleaned with Power Query, summarised with PivotTables, built a one page report."
* **Result:** what the reader can now see or decide. "Treasurer can spot members two weeks behind at a glance."

Keep each write up short enough to read on a phone. Add two or three screenshots: the finished report, and one "behind the scenes" view such as Applied Steps or the model.

## A worked example

Sumaila builds his portfolio around a fictional agro dealer, "Northern Inputs", with shops in Tamale, Yendi and Walewale. Piece one: a sales entry sheet with dropdowns and a cleaned month of messy sales. Piece two: a one page Excel report of the month. Piece three: a Power BI report with sales, products, shops and calendar tables and a mobile layout. Every page says "Sample data, invented for practice". In interviews he opens the PDF on his phone and talks through each decision.

## Get feedback

Before you share widely, ask a mentor or someone who reads reports at work to review one piece. Ask them: "What is the main message? What would you change?" Then improve it.`,
      practice_task_md: `**Goal:** finish two or three portfolio pieces with write ups.

1. Choose the pieces from your track work, or build new ones on a realistic invented or open dataset.
2. Label every file "Sample data" with the source or "invented for practice".
3. Write a four part case study for each: problem, data, what you did, result.
4. Export each report as a PDF and take two or three screenshots.
5. Put everything in your view only portfolio folder with a short read me listing the pieces.
6. Ask a mentor to review one piece and make at least one improvement from their feedback.

**Done looks like:** a shared folder with two or three labelled pieces, each with a PDF, screenshots and a short case study, plus a note of the change you made after feedback.`,
      quiz: {
        questions: [
          {
            prompt: "Which set of pieces gives the best mix for an office data portfolio?",
            options: [
              "Three copies of the same chart in different colours",
              "A cleaning and validation piece, a one page Excel report and a Power BI or dashboard report",
              "A list of every Excel function you know",
              "Screenshots of certificates only",
            ],
            answer_index: 1,
            explanation: "Different pieces show handling messy data, getting numbers right and presenting clearly.",
          },
          {
            prompt: "What are the four parts of the case study write up?",
            options: [
              "Title, colours, fonts, logo",
              "Problem, data, what you did, result",
              "Introduction, theory, conclusion, references",
              "Name, age, school, hobbies",
            ],
            answer_index: 1,
            explanation: "The lesson recommends describing the problem, the data, your steps and the result.",
          },
          {
            prompt: "Why include problems like spelling variations in invented data?",
            options: [
              "To make the report look worse",
              "So you can show how you cleaned them",
              "Because invented data must contain errors by law",
              "To make files bigger",
            ],
            answer_index: 1,
            explanation: "Realistic problems let you demonstrate your cleaning skills.",
          },
          {
            prompt: "What must you do when using open data from a site such as the Ghana Statistical Service?",
            options: [
              "Remove the source so it looks original",
              "Read the licence and credit the source",
              "Pay a fee before downloading",
              "Change the numbers",
            ],
            answer_index: 1,
            explanation: "Open data comes with a licence, and you should credit where it came from.",
          },
          {
            prompt: "You have not had access to a Windows computer yet. What can stand in for the Power BI piece?",
            options: [
              "Nothing, the portfolio is incomplete without Power BI",
              "A Data Studio dashboard showing the same thinking, with Power BI added later",
              "A screenshot of someone else's Power BI report",
              "A description of Power BI copied from a website",
            ],
            answer_index: 1,
            explanation: "A free browser dashboard shows the same skills until you can build in Power BI.",
          },
        ],
        pass_threshold: 80,
      },
    },
    "jobs-and-next-steps": {
      explanation_md: `## Why this matters

Excel and Power BI skills are not a single job title. They are useful across many roles, which gives you options. Knowing where these skills fit, what employers expect alongside them, and what to learn next helps you aim your applications and keep growing.

## Roles that use these skills

When you read Ghanaian and remote job adverts, look for titles such as:

* **Data entry officer, data clerk or data capturer:** accurate entry, validation, basic summaries.
* **Administrative or office assistant:** registers, schedules, simple reports.
* **Accounts assistant or accounts officer:** reconciliations, budgets, PivotTables and lookups, alongside accounting knowledge.
* **MIS officer or assistant:** collecting data from branches or programmes, dashboards, KPI tracking.
* **Monitoring and evaluation (M&E or MEL) assistant or officer:** survey data from tools such as KoboToolbox or ODK, cleaning, indicators, donor reports.
* **Reporting analyst or junior business intelligence analyst:** Power BI dashboards, often with SQL.
* **Freelance reporting support** for small businesses and remote clients.

Read each advert for the tools it names and the sector knowledge it expects. Many ask for a degree or diploma and some experience; volunteering and portfolio projects are how you start building that experience.

## Optional certifications

Certifications are not required for most of these roles, and a strong portfolio often matters more. But if an employer asks for one, or you want a structured goal, two are relevant:

* **Microsoft Office Specialist: Excel Associate (Microsoft 365 Apps)** covers worksheets, ranges, tables, formulas and functions, and charts. It is a proctored, hands on exam, usually booked through Certiport.
* **Microsoft Certified: Power BI Data Analyst Associate (exam PL-300)** covers preparing data, modelling, visualising and analysing, and managing and securing Power BI. It expects you to be comfortable with Power Query and DAX. It must be renewed every year with a free online assessment.

Both exams are paid, and prices vary by country, so check the official Microsoft Learn page before planning. Microsoft Learn's training paths for Power BI are free to study.

## Next steps

* **Deepen Excel:** dynamic array functions such as \`FILTER\` and \`UNIQUE\`, and more Power Query.
* **Deepen Power BI:** \`CALCULATE\` and time intelligence measures (this month against last month), and row level security.
* **Learn SQL:** many MIS, BI and data analyst adverts ask for SQL alongside Power BI, because organisational data often lives in databases.
* **Consider Python** later for larger or automated analysis.

SydCrest's **Data Analyst track** continues from here into SQL, statistics and Python, building on everything you learned about clean tables, summaries and charts.

## A small example

Issahaku finished this track, built a portfolio and applied for an M&E assistant role with an NGO in Tamale. He did not get the first one, but the panel asked about his Power BI report. He kept volunteering on a cooperative's records, started the Data Analyst track to learn SQL, and applied again three months later, this time with a SQL query in his portfolio as well. Progress is usually step by step.`,
      practice_task_md: `**Goal:** match your skills to real adverts and plan your next step.

1. Find three current job adverts from Ghanaian job boards or employer career pages for roles listed in this lesson. Do not pay anyone for job access.
2. For each, list the tools and skills named, and mark the ones you can already show in your portfolio.
3. Pick one gap that appears more than once, such as SQL or a specific function.
4. Write a four week plan to close it: what you will learn, with which free resource, and what you will build to show it.

**Done looks like:** a table of three adverts with skills marked, and a four week plan. Share it with a mentor and agree a date to review your progress.`,
      quiz: {
        questions: [
          {
            prompt: "Which role mainly works with survey data from tools such as KoboToolbox and prepares donor reports?",
            options: [
              "Front desk receptionist",
              "Monitoring and evaluation officer",
              "Driver",
              "Security officer",
            ],
            answer_index: 1,
            explanation: "M&E roles collect and analyse programme data and prepare donor reports.",
          },
          {
            prompt: "What does the PL-300 exam lead to?",
            options: [
              "Microsoft Office Specialist: Word Associate",
              "Microsoft Certified: Power BI Data Analyst Associate",
              "A Google Sheets certificate",
              "A degree in accounting",
            ],
            answer_index: 1,
            explanation: "PL-300 is the exam for the Power BI Data Analyst Associate certification.",
          },
          {
            prompt: "Which skill is often requested alongside Power BI in MIS and BI adverts, and is a good next step?",
            options: [
              "Video editing",
              "SQL",
              "Typing speed only",
              "Graphic design",
            ],
            answer_index: 1,
            explanation: "Organisational data often lives in databases, so SQL commonly appears with Power BI.",
          },
          {
            prompt: "According to the lesson, which is true about certifications for these roles?",
            options: [
              "They are required for every job",
              "They are free to take",
              "They are optional, and a strong portfolio often matters more",
              "They replace the need for any practice",
            ],
            answer_index: 2,
            explanation: "Certifications can help but are optional and paid; evidence of real work often counts more.",
          },
        ],
        pass_threshold: 75,
      },
    },
  },
};

export default content;
