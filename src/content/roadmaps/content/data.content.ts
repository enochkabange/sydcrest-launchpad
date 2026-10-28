import type { TrackContent } from "./types";

/**
 * Lesson content for the Data Analyst track (issue #84). Original SydCrest
 * writing; sources and the coverage table are in src/content/research/data.md.
 * Every dataset in these lessons is invented for teaching and is labelled as
 * an example; none of the numbers describe real places or people.
 */
const content: TrackContent = {
  roadmap: "data-analyst",
  nodes: {
    foundations: {
      outcomes: [
        "Turn a vague request into a clear analysis question",
        "Explain why tidy records matter",
        "Name what you need to start",
      ],
      explanation_md: `## Why this matters

Data jobs in Ghana come with many titles: data entry clerk, M&E assistant, research assistant, reporting officer, business intelligence analyst. They all share one core skill. Someone brings you a messy pile of records and a worried question, and you return a clear, honest answer they can act on. That skill starts long before any code.

## Start with the question

Most requests arrive vague. A shop owner in Tamale says "sales are bad". An NGO manager in Bolgatanga says "we need to know if the project is working". You cannot analyse "bad" or "working". Your first job is to turn the request into a question data can answer.

A good analysis question is:

* **Specific:** which product, which place, which months.
* **Measurable:** you can count or calculate something to answer it.
* **Useful:** the answer would change what someone does.

So "sales are bad" becomes "Which three products sold fewer units in March than in January, and by how much?" Now you know which records you need and what the answer will look like.

To get there, ask the person a few plain questions. What decision are you trying to make? What would you do differently if the answer was yes, or no? Which records do you already keep? When do you need the answer? Listen more than you talk. Write their answers down.

## Numbers and tidy records

Two more foundations sit under every task in this track. The first is everyday statistics: averages, medians, percentages and the idea that a small or unfair sample can fool you. The second is tidy records: data entered accurately, one row per record and one column per fact, so it can be sorted, counted and checked. The two topics in this section teach both.

## A small example

Mariama runs a provisions shop in Savelugu and keeps a notebook of daily sales. She asks you to "look at the numbers". You ask what worries her. She says she thinks she is running out of rice too often. Now the question is clear: "On how many days last month did the shop run out of rice, and on which days of the week?" You copy one month of notebook entries into a spreadsheet, count the stock out days and find most fall on Mondays, after the weekend rush. Mariama decides to restock on Saturdays. That is real analysis, done with a notebook, a spreadsheet and a clear question.

## What you need

You can do everything in this section with free tools: a notebook, Google Sheets on a phone or computer, and curiosity. Keep a learning journal of the questions you practise. It becomes the start of your portfolio.`,
      practice_task_md: `**Goal:** turn a vague request into a clear analysis question.

1. Find someone who keeps records: a trader, a church treasurer, a school teacher or a family member running a small business. If nobody is available, imagine Fuseini, who sells phone credit and accessories in Wa.
2. Ask them four questions: What decision are you trying to make? What records do you keep? What would you do differently depending on the answer? When do you need it?
3. Write their vague concern in one line, then rewrite it as one specific, measurable, useful question.
4. List the records (columns) you would need to answer it.

**Done looks like:** one short note with the original concern, your rewritten question, and a list of the data you would need. Share it with a mentor and ask whether the question is clear enough to answer.`,
      quiz: {
        questions: [
          {
            prompt: "A shop owner says \"sales are bad\". What should you do first?",
            options: [
              "Build a dashboard of every product",
              "Calculate the average sale for the whole year and compare it with last year",
              "Start learning Python so you can analyse the sales",
              "Ask questions until the concern becomes a specific, measurable question",
            ],
            answer_index: 3,
            explanation: "The lesson says your first job is to turn a vague request into a question data can answer.",
          },
          {
            prompt: "Which of these is the best analysis question?",
            options: [
              "Is the business doing well?",
              "Why are customers unhappy?",
              "Which three products sold fewer units in March than in January, and by how much?",
              "What does the data say?",
            ],
            answer_index: 2,
            explanation: "It is specific, measurable and useful, the three features of a good analysis question.",
          },
          {
            prompt: "What does a tidy record layout mean in this track?",
            options: [
              "One row per record and one column per fact",
              "All the data typed into a single cell",
              "A different sheet for every day, with totals at the bottom",
              "Colour coding every row by hand",
            ],
            answer_index: 0,
            explanation: "Tidy records put one record per row and one fact per column so they can be sorted, counted and checked.",
          },
          {
            prompt: "In the example, what did Mariama decide after the analysis?",
            options: [
              "To stop selling rice",
              "To buy a new phone",
              "To restock rice on Saturdays",
              "To open a second shop",
            ],
            answer_index: 2,
            explanation: "Most stock outs fell on Mondays after the weekend rush, so she chose to restock on Saturdays.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "statistics-basics": {
      outcomes: [
        "Calculate and explain the mean and the median",
        "Tell percentages from percentage points",
        "Explain why samples can mislead and correlation is not cause",
      ],
      explanation_md: `## Why this matters

Every report you write as an analyst or M&E officer will contain averages, percentages and comparisons. If you misread them, you can send a manager or donor in the wrong direction. A few simple ideas protect you from the most common mistakes.

## Mean and median

The **mean** is what most people call the average: add all the values and divide by how many there are. The **median** is the middle value when you sort them.

Imagine five traders in Tamale Central Market report their daily sales in cedis: 80, 90, 100, 110 and 900. The mean is 1,280 divided by 5, which is 256. The median is 100. One trader with a very big day pulls the mean far above what a typical trader earns. When a few values are extreme, the median usually describes the typical case better. Good analysts report both and say which one they used.

## Percentages and percentage points

A percentage compares a part to a whole. If 45 of 60 pupils attended school on Monday, attendance was 45 divided by 60, which is 75 percent.

Be careful with changes. If attendance rises from 60 percent to 75 percent, it went up by **15 percentage points**. In relative terms that is a 25 percent increase, because 15 is a quarter of 60. Both are correct, but they sound very different, so always say which one you mean.

## Spread

Two groups can share the same average and still be very different. Spread tells you how far values sit from the middle. The simplest measure is the **range**: the largest value minus the smallest. A standard deviation is a more careful measure of spread that you will meet in spreadsheet functions. For now, remember that an average without any sense of spread hides a lot.

## Samples can mislead

Usually you cannot ask everyone, so you ask a sample. A sample only represents the bigger group if it is chosen fairly. If you survey farmers only in villages beside the main road, you miss farmers in remote communities, who may face very different conditions. A small sample is also risky: three happy customers do not prove that a service is popular.

## Correlation is not cause

If two things rise together, one did not necessarily cause the other. Umbrella sales and malaria cases both rise in the rainy season, yet umbrellas do not cause malaria; the rain drives both. Look for a third factor before claiming a cause.

## In practice

When you see a number, ask four questions. Mean or median? Percentage or percentage points? How spread out are the values? Who was in the sample? Asking these out loud will already make you a careful analyst.`,
      practice_task_md: `**Goal:** calculate and explain basic statistics on a small example dataset.

1. Open Google Sheets on your phone or laptop.
2. Type this invented example of daily kenkey sales (in cedis) for Hawa's stall over ten days: 120, 135, 110, 140, 600, 125, 130, 115, 145, 128.
3. Use AVERAGE, MEDIAN, MIN and MAX to find the mean, median and range.
4. Write three sentences: which number best describes a typical day, why, and what might explain the 600 day.
5. Bonus: suppose the stall sold to 40 customers on day one and 50 on day two. Write the change as a percentage increase.

**Done looks like:** a sheet with the formulas and a short written explanation you could show a mentor.`,
      quiz: {
        questions: [
          {
            prompt: "Five traders report daily sales of 80, 90, 100, 110 and 900 cedis. Which number best describes a typical trader?",
            options: ["The mean, 256", "The largest value, 900", "The median, 100", "The total, 1,280"],
            answer_index: 2,
            explanation: "One extreme value pulls the mean up, so the median describes the typical case better.",
          },
          {
            prompt: "Attendance rises from 60 percent to 75 percent. How many percentage points is that?",
            options: ["25", "75", "15", "135"],
            answer_index: 2,
            explanation: "75 minus 60 is 15 percentage points; the 25 percent figure is the relative increase.",
          },
          {
            prompt: "Why might a survey of farmers only in villages beside the main road mislead you?",
            options: [
              "Roadside villages have no farmers",
              "The sample is too large, so the average comes out too high",
              "It misses remote communities whose conditions may differ",
              "Surveys can never be trusted",
            ],
            answer_index: 2,
            explanation: "A sample only represents the bigger group if it is chosen fairly.",
          },
          {
            prompt: "What is the range of a set of values?",
            options: [
              "The largest value minus the smallest value",
              "The middle value after sorting",
              "The sum divided by the count",
              "The most common value",
            ],
            answer_index: 0,
            explanation: "The range is the simplest measure of spread: maximum minus minimum.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "tidy-data": {
      outcomes: [
        "Explain what a tidy table is",
        "Avoid common data entry mistakes",
        "Turn a messy register into a tidy table",
      ],
      explanation_md: `## Why this matters

Many first data jobs in Ghana involve entering records: registers, survey forms, stock sheets, patient cards. Employers want people who type accurately and lay data out so it can be checked and analysed. Every later skill in this track, from pivot tables to SQL, works far better on tidy data.

## What tidy means

Tidy data follows three simple rules:

* **One row per record.** One pupil, one sale, one household visit.
* **One column per fact.** Name, date, community, amount. Never two facts in one cell.
* **One table per kind of thing.** Keep a list of pupils separate from a list of daily attendance.

## Common mistakes

Here is an invented attendance sheet a teacher in Walewale might start with:

| Pupil | Mon | Tue | Notes |
|---|---|---|---|
| Amina Y. | P | A | sick, came Wed |
| issahaku | present | P | |

Problems: the name is shortened in one row and lowercase in another, "P" and "present" mean the same thing, and the notes cell hides an extra attendance record. The total row at the bottom (not shown) would also get counted as a pupil by mistake.

A tidy version has columns **pupil_id, pupil_name, date, status**, with one row for each pupil on each day and status always written as Present or Absent. It looks longer, but now you can count absences per pupil or per day with one formula.

## Habits of accurate entry

* **Use consistent codes.** Decide once whether it is "Tamale" or "Tamale Metro" and stick to it.
* **Store dates as dates.** Type them in one format, such as 2026-03-14, so the spreadsheet recognises them.
* **Store numbers as numbers.** Write 250, not "250 cedis" or "GHS250". Put the unit in the column header instead.
* **Leave blanks blank.** Do not type "nil" or "0" when you mean "not known"; zero is a real value.
* **Give each record an ID.** A unique number per pupil or household helps you spot duplicates.
* **Check against the source.** After entering a page, compare a few rows with the paper form. Data entry staff often do a second pass on a sample.

## Stop mistakes at the door

Spreadsheets can refuse bad entries. In Google Sheets, a dropdown list (data validation) lets you choose Present or Absent instead of typing it, so spelling cannot drift. You will use this again in the lookups and pivot tables lesson.

## A habit worth building

Before you analyse anything, scan the sheet. Are there merged cells, totals inside the data, mixed spellings or numbers stored as text? Fix the layout first. Ten minutes of tidying saves hours of confusion later.`,
      practice_task_md: `**Goal:** turn a messy register into a tidy table.

1. In Google Sheets, type this invented messy record of a youth group's dues in Damongo: "Sumaila, paid 10 cedis Jan and Feb", "sumaila K, Mar 10", "Wumpini paid jan", "Wumpini, Feb, GHS 10".
2. Create a tidy table with columns: member_id, member_name, month, amount_ghs.
3. Enter one row per payment. Use the same spelling for each name and numbers only in amount_ghs. Leave amount blank where it is unknown.
4. Add a dropdown on the month column that only allows Jan to Dec.
5. Write one line on each problem you fixed.

**Done looks like:** a tidy table, a working dropdown, and a short list of fixes you can show a mentor.`,
      quiz: {
        questions: [
          {
            prompt: "Which layout follows the tidy data rules?",
            options: [
              "One row per record and one column per fact",
              "One sheet per day with totals inside the data",
              "Several facts typed into one notes cell",
              "Merged cells for each community name",
            ],
            answer_index: 0,
            explanation: "Tidy data has one row per record, one column per fact and one table per kind of thing.",
          },
          {
            prompt: "How should you record an amount of 250 cedis in a numeric column?",
            options: ["250 cedis", "GHS250", "250, with the unit in the column header", "Two hundred and fifty"],
            answer_index: 2,
            explanation: "Store numbers as numbers and put the unit in the header so formulas work.",
          },
          {
            prompt: "A household's income is not known. What should you enter?",
            options: ["0", "nil", "Leave the cell blank", "The average of other households"],
            answer_index: 2,
            explanation: "Zero is a real value, so unknown values should be left blank.",
          },
          {
            prompt: "What does a dropdown list (data validation) help prevent?",
            options: [
              "Formulas breaking whenever someone adds a new row at the bottom",
              "Slow internet",
              "Other people opening the sheet without permission",
              "Mixed spellings like P, present and Present for one value",
            ],
            answer_index: 3,
            explanation: "Choosing from a list keeps entries consistent.",
          },
        ],
        pass_threshold: 75,
      },
    },

    spreadsheets: {
      outcomes: [
        "Explain what a spreadsheet does well",
        "Set up a spreadsheet you will reuse",
        "Name the topics in this section",
      ],
      explanation_md: `## Why this matters

If you read data job adverts in Ghana, one tool appears again and again: the spreadsheet. NGO M&E teams track indicators in Excel. Banks and telcos send daily reports as spreadsheets. Data entry and reporting roles ask for strong Excel before anything else. A small business in Bolgatanga may never use a database, but it will happily pay someone who can turn its sales notebook into a sheet that answers questions.

The good news is that you can learn almost everything you need for free, on a phone or a basic laptop, with Google Sheets. Microsoft Excel works the same way for the skills in this section, so what you learn transfers directly. When an advert says Excel, your Google Sheets practice counts.

## What a spreadsheet does well

A spreadsheet is a grid of cells. Each cell holds a value, such as a name, a date or an amount, or a formula that calculates something from other cells. Because formulas update automatically, you can change one number and see every total change with it. That makes spreadsheets ideal for:

* **Keeping records** in a tidy table, one row per record.
* **Answering questions** with formulas: how much, how many, which is biggest.
* **Joining information** from two lists, such as prices and sales.
* **Summarising** large tables into small ones with pivot tables.
* **Charting** results for a report or dashboard.

## What this section covers

The section has two topics.

**Formulas, sorting and filtering.** You will learn the handful of functions that do most everyday work: SUM, AVERAGE, COUNT, COUNTIF, SUMIF and IF. You will sort and filter tables to explore them, and freeze the header row so it stays visible on a small screen.

**Lookups, validation and pivot tables.** You will join two tables with XLOOKUP or VLOOKUP, use dropdown validation to stop bad entries, and build pivot tables that summarise thousands of rows in seconds. Employers often test these three skills in a practical interview task.

## Phone and computer tips

On a computer, Google Sheets in a browser gives you the most room for long formulas. On a phone, the Sheets app works well for entering data and checking results; turn the phone sideways and zoom in when typing formulas. On any screen, freeze the first row so headers stay visible. Sheets saves as you go, so a dropped connection rarely loses work, and you can turn on offline mode for files you use often.

## A worked example

Abdul-Rahman sells phone accessories in Tamale and records each sale: date, item, quantity and price. With one SUMIF formula he sees total sales per item. With a filter he checks only last week. With a pivot table he compares months. None of this needs code. It needs tidy data and a few well chosen formulas, which is exactly what the next two topics teach.`,
      practice_task_md: `**Goal:** set up a working spreadsheet you will reuse in the next two topics.

1. Open Google Sheets (app or browser) and create a sheet called "Stall sales example".
2. Add the headers: date, item, quantity, unit_price_ghs, total_ghs.
3. Enter at least 15 invented sales for a small stall in your town, using three or four items such as rice, sugar, oil and soap.
4. In total_ghs, write a formula that multiplies quantity by unit_price_ghs, and copy it down.
5. Freeze the header row and turn on a filter.

**Done looks like:** a tidy table with a working formula column and a frozen, filterable header. Keep it; the next lessons build on it.`,
      quiz: {
        questions: [
          {
            prompt: "An advert asks for Excel, but you practise in Google Sheets. What does the lesson say?",
            options: [
              "Google Sheets practice does not count",
              "You must buy Excel and redo the practice before you apply",
              "These skills work the same way in Excel, so your practice transfers",
              "Sheets practice only counts if you also hold a paid Excel certificate",
            ],
            answer_index: 2,
            explanation: "The lesson says Excel works the same way for these skills, so Google Sheets practice counts.",
          },
          {
            prompt: "What makes formulas useful in a spreadsheet?",
            options: [
              "They make the text bold",
              "They only work on phones",
              "They lock the numbers so other people cannot change them by mistake",
              "They update automatically when the numbers they use change",
            ],
            answer_index: 3,
            explanation: "Formulas recalculate when their inputs change, so totals stay correct.",
          },
          {
            prompt: "Which tool summarises thousands of rows into a small table in seconds?",
            options: ["A pivot table", "Bold formatting", "Freezing the header row", "A dropdown list"],
            answer_index: 0,
            explanation: "Pivot tables summarise large tables quickly.",
          },
          {
            prompt: "Which tip helps on any screen, especially a small one?",
            options: [
              "Merge all header cells",
              "Freeze the first row so headers stay visible",
              "Type every number as text",
              "Avoid saving until you finish",
            ],
            answer_index: 1,
            explanation: "Freezing the header row keeps column names visible on a small screen.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "spreadsheet-formulas": {
      outcomes: [
        "Write formulas with the functions that do most of the work",
        "Use relative and fixed references",
        "Sort and filter data and check your work",
      ],
      explanation_md: `## Why this matters

A reporting officer is often asked quick questions: how much did we sell last month, how many households received inputs, which community has the most absences? With a few core formulas you can answer these in minutes and show your working, which is exactly what employers check in a practical test.

## How a formula works

Every formula starts with an equals sign. It can refer to cells by their address, like B2, or to a whole range, like B2:B200. When the values change, the answer updates.

Here is an invented example sheet for a chop bar in Tamale. Column A holds the date, column B the dish, column C the number of plates and column D the takings in cedis.

## The functions that do most of the work

* **SUM** adds numbers: \`=SUM(D2:D200)\` gives total takings.
* **AVERAGE** finds the mean: \`=AVERAGE(D2:D200)\`.
* **COUNT** counts cells that hold numbers; **COUNTA** counts cells that are not empty.
* **COUNTIF** counts rows that meet a condition: \`=COUNTIF(B2:B200, "Banku")\` tells you how many sales were banku.
* **SUMIF** adds values that meet a condition: \`=SUMIF(B2:B200, "Banku", D2:D200)\` gives the takings from banku only.
* **IF** makes a decision: \`=IF(D2>=100, "Good day", "Slow day")\` labels each day.

COUNTIFS and SUMIFS work the same way with more than one condition, such as banku sales in March only.

## Relative and fixed references

When you copy a formula down, its cell references move with it. That is usually what you want. Sometimes you need one cell to stay fixed, such as a tax rate in cell G1. Add dollar signs to lock it: \`=D2*$G$1\`. Now every copied row uses G1.

## Sorting and filtering

Sorting reorders rows, for example takings from largest to smallest, so the best and worst days jump out. Filtering hides rows you do not need, so you can look at one dish or one week. Always select the whole table before sorting, or the columns will come apart and your data will be ruined. If that happens, use undo straight away.

## A worked example

Hawa wants to know which dish earns the most. She types the three dish names in a small table to the side, then uses SUMIF next to each to total its takings. She sorts that small table from largest to smallest. In five minutes she can tell the owner that waakye brings in the most money, while jollof sells more plates but at a lower price.

## Checking your work

Formulas can be wrong without any error message. Check a result by hand on a few rows, look for numbers stored as text (they often sit on the left of the cell), and make sure your ranges cover every row.`,
      practice_task_md: `**Goal:** answer real questions with formulas on your stall sales sheet.

1. Open the "Stall sales example" sheet from the previous lesson, or create 15 invented sales rows with date, item, quantity and total_ghs.
2. In a separate area, list each item once. Next to each, use COUNTIF to count sales and SUMIF to total takings.
3. Add an IF column that labels each sale "Big" if total_ghs is 50 or more, otherwise "Small".
4. Sort your summary area from highest to lowest takings.
5. Write two sentences answering: which item earns the most, and which sells most often?

**Done looks like:** a summary table built with formulas, a labelled column, and two clear sentences you can show a mentor.`,
      quiz: {
        questions: [
          {
            prompt: "Which formula totals takings for banku only, with dishes in B2:B200 and takings in D2:D200?",
            options: [
              "=SUM(D2:D200)",
              "=COUNTIF(B2:B200, \"Banku\")",
              "=SUMIF(B2:B200, \"Banku\", D2:D200)",
              "=AVERAGE(B2:B200)",
            ],
            answer_index: 2,
            explanation: "SUMIF adds the values in D where the matching cell in B is Banku.",
          },
          {
            prompt: "What does COUNTIF do?",
            options: [
              "Adds numbers in a range",
              "Finds the middle value",
              "Counts rows that meet a condition",
              "Adds the numbers that meet a condition",
            ],
            answer_index: 2,
            explanation: "COUNTIF counts the cells in a range that meet a condition.",
          },
          {
            prompt: "Why would you write $G$1 instead of G1 in a formula you copy down?",
            options: [
              "To format the result as dollars in every row",
              "To round the result",
              "To hide the cell",
              "To keep the reference on G1 in every row",
            ],
            answer_index: 3,
            explanation: "Dollar signs lock a reference so it does not move when copied.",
          },
          {
            prompt: "What must you do before sorting a table?",
            options: [
              "Select the whole table so rows stay together",
              "Delete the header row",
              "Turn every number into text",
              "Colour the cells",
            ],
            answer_index: 0,
            explanation: "Sorting only part of a table splits columns apart and ruins the data.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "lookups-pivots": {
      outcomes: [
        "Join two tables with a lookup",
        "Stop bad entries with validation",
        "Summarise data fast with a pivot table",
      ],
      explanation_md: `## Why this matters

Three spreadsheet skills come up again and again in Ghanaian data and M&E adverts and in interview tests: looking up values from another table, stopping bad entries with validation, and summarising with pivot tables. Master these and you can handle most reporting tasks a junior role will give you.

## Lookups: joining two tables

Often the information you need sits in two places. Imagine an invented sheet of sales that lists only product codes, and a second sheet called Prices that lists each code with its name and price. A lookup brings the price across into the sales sheet.

In Google Sheets and newer Excel, use **XLOOKUP**:

\`=XLOOKUP(B2, Prices!A:A, Prices!C:C)\`

This says: find the code in B2 inside column A of Prices, and return the matching value from column C. If the code is missing, XLOOKUP shows an error, which is useful: it tells you something is wrong.

Many workplaces still use the older **VLOOKUP**:

\`=VLOOKUP(B2, Prices!A:C, 3, FALSE)\`

Here 3 means "the third column of the range", and FALSE means "exact match only". Forgetting FALSE is a classic mistake that returns wrong prices without any warning, so always include it.

## Validation: stopping bad entries

Data validation limits what can be typed in a cell. A dropdown list of community names means nobody can type "Tamal" or "tamale metro" by accident. You can also limit numbers, for example ages between 0 and 120. In Google Sheets, open Data, then Data validation, and choose a rule. Validation is cheaper than cleaning: every mistake it stops is one you never have to fix.

## Pivot tables: summarising fast

A pivot table turns a long table into a short summary. Suppose an NGO in Nalerigu has an invented sheet with one row per household visit: date, community, officer, and whether the household received seed. With a pivot table you can, in a few clicks:

* Put **community** in Rows and **count of visits** in Values to see visits per community.
* Add **month** in Columns to see how visits changed over time.
* Filter to one officer to check their workload.

In Google Sheets, select your data, then Insert and Pivot table. Drag fields into Rows, Columns, Values and Filters. Pivot tables do not change your original data, so experiment freely.

## Putting them together

Issahaku receives a monthly sheet of distributions with only community codes. He uses XLOOKUP to add the district name from a reference sheet, adds a dropdown so future entries use the right codes, and builds a pivot table of distributions by district and month. His manager gets a clean summary in minutes instead of a day of manual counting.`,
      practice_task_md: `**Goal:** use a lookup, a dropdown and a pivot table together.

1. In Google Sheets, create a sheet called Prices with columns code, item, price_ghs and four invented items.
2. Create a Sales sheet with columns date, code, quantity and at least 20 invented rows across two months.
3. In Sales, use XLOOKUP to bring in the item name and price, then calculate total_ghs. Add a month column too (type Jan or Feb, or use \`=TEXT(A2, "mmm")\` if column A holds the date).
4. Add a dropdown on the code column that only allows your four codes.
5. Build a pivot table with item in Rows, month in Columns and the sum of total_ghs in Values.

**Done looks like:** working lookups, a dropdown that rejects bad codes, and a pivot table you can screenshot and explain to a mentor in two sentences.`,
      quiz: {
        questions: [
          {
            prompt: "What does =XLOOKUP(B2, Prices!A:A, Prices!C:C) do?",
            options: [
              "Adds column C of Prices",
              "Finds B2 in column A of Prices and returns the value from column C",
              "Sorts the Prices sheet",
              "Finds B2 in column C of Prices and returns the value from column A",
            ],
            answer_index: 1,
            explanation: "XLOOKUP searches one range and returns the matching value from another.",
          },
          {
            prompt: "Why should you include FALSE at the end of a VLOOKUP?",
            options: [
              "It makes the formula run faster",
              "It tells VLOOKUP to find the closest match in a sorted list",
              "It hides errors",
              "It forces an exact match, so wrong values do not slip in",
            ],
            answer_index: 3,
            explanation: "Without FALSE, VLOOKUP can return a near match without warning.",
          },
          {
            prompt: "What is the main benefit of a dropdown list on a community column?",
            options: [
              "It stops misspelled community names being entered",
              "It makes the sheet print faster",
              "It calculates totals",
              "It hides the column",
            ],
            answer_index: 0,
            explanation: "Validation limits entries to the allowed values, so spelling cannot drift.",
          },
          {
            prompt: "In a pivot table showing visits per community, where does community go?",
            options: ["Values", "Rows", "Filters only", "It cannot be used"],
            answer_index: 1,
            explanation: "Put the grouping field, community, in Rows and the count in Values.",
          },
          {
            prompt: "Does building a pivot table change your original data?",
            options: [
              "Yes, it deletes duplicate rows",
              "Yes, it sorts the original sheet",
              "No, it creates a separate summary",
              "Only if you use Filters",
            ],
            answer_index: 2,
            explanation: "Pivot tables summarise without changing the source data.",
          },
        ],
        pass_threshold: 80,
      },
    },

    "field-data": {
      outcomes: [
        "Describe the life of a field survey",
        "Explain why the north is a good place to learn field data",
        "Map out a survey before you build it",
      ],
      explanation_md: `## Why this matters

Across the Northern, Savannah, North East, Upper East and Upper West regions, a great deal of data work happens in communities, not offices. NGOs, research organisations, health programmes and government schemes send teams to villages to ask households about farming, water, health, schooling and income. Someone has to design those surveys, run them on phones, clean the results and keep respondents' information safe. Those tasks appear in many M&E, research assistant and data officer adverts, and they are a realistic first door into data work for someone in the north.

## The life of a field survey

Every survey follows roughly the same path:

1. **Purpose.** What decision or report will this data feed? An NGO might need to know how many farmers adopted a new seed variety.
2. **Design.** Write the questions and decide who to ask, which is called sampling.
3. **Build.** Turn the questionnaire into a phone form with checks, using a tool such as KoboToolbox or ODK.
4. **Collect.** Enumerators visit households, ask questions in the local language and record answers, often offline.
5. **Clean.** Download the results and fix duplicates, impossible values and inconsistent spellings.
6. **Protect.** Store the data securely, remove names where they are not needed, and respect consent.
7. **Analyse and report.** Summarise the findings for managers and donors.

This section covers steps two to six. The monitoring and evaluation section then shows how the results feed indicators and reports.

## Why the north is a good place to learn

Field data work rewards skills many young people in northern Ghana already have. Speaking Dagbani, Mampruli, Gonja, Frafra, Dagaare or Sisaala helps you translate questions so they keep their meaning. Knowing how communities are organised helps you plan visits respectfully. Patience and good listening matter as much as technical skill. Many people start as enumerators or field data collectors and grow into data officer roles by learning the steps in this section.

## A worked example

A small invented project in the Savannah Region wants to know whether families have safe drinking water. Fuseini, the data assistant, writes a short questionnaire with the project officer, tests it with five households in Damongo, and fixes two confusing questions. He builds the form in KoboToolbox with a rule that household size must be between 1 and 30. Enumerators collect data offline and upload in the evening when they reach network. Fuseini downloads the results, removes three duplicate submissions, replaces names with household IDs and sends a clean file to the officer. Each step in that story is one topic in this section.

## What you need

A smartphone to test your forms the way enumerators will, a free KoboToolbox or ODK account, Google Sheets and a little data for uploading forms. You can practise every step with a friend or family member as a test respondent.`,
      practice_task_md: `**Goal:** map out a field survey before you build one.

1. Pick a simple question a community group might care about, such as how far households walk to collect water, or which days a market is busiest.
2. Write the seven steps from the lesson (purpose, design, build, collect, clean, protect, analyse) as headings in a note or document.
3. Under each heading, write one or two lines about how you would do that step for your survey. Use invented details and Northern Ghanaian place names.
4. Note one risk at each step, for example respondents misunderstanding a question.

**Done looks like:** a one page survey plan you can show a mentor and reuse in the next four topics.`,
      quiz: {
        questions: [
          {
            prompt: "What is sampling?",
            options: [
              "Deciding who to ask in a survey",
              "Uploading forms to a server",
              "Fixing duplicate records",
              "Drawing a chart of results",
            ],
            answer_index: 0,
            explanation: "The lesson describes sampling as deciding who to ask.",
          },
          {
            prompt: "Why do enumerators often collect data offline?",
            options: [
              "The law requires survey answers to stay off the internet until checked",
              "It hides data from managers",
              "Phones cannot run forms online",
              "Networks may be weak, so forms upload later when there is signal",
            ],
            answer_index: 3,
            explanation: "In the example, enumerators collected offline and uploaded in the evening when they reached network.",
          },
          {
            prompt: "Which local skill does the lesson say helps field data work?",
            options: [
              "Speaking local languages so questions keep their meaning",
              "Owning a car",
              "Knowing how to code in Python",
              "Having a large social media following",
            ],
            answer_index: 0,
            explanation: "Translating questions accurately into local languages keeps their meaning.",
          },
          {
            prompt: "In the example, what did Fuseini do to protect respondents?",
            options: [
              "Asked respondents to sign their full names",
              "Deleted all the data",
              "Replaced names with household IDs",
              "Asked for phone numbers twice",
            ],
            answer_index: 2,
            explanation: "Replacing names with IDs reduces the risk of identifying people.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "survey-design": {
      outcomes: [
        "Write clear questions and answer choices",
        "Keep a questionnaire short and choose who to ask",
        "Pilot a questionnaire before fieldwork",
      ],
      explanation_md: `## Why this matters

Bad questions produce bad data, and no amount of cleaning can fix it later. M&E and research adverts ask for survey design, sampling and baseline studies because a well designed questionnaire is the foundation of every report that follows. Even as a junior, you will often be asked to review or test a questionnaire before it goes to the field.

## Writing clear questions

Good survey questions are short, neutral and ask about one thing at a time.

* **One idea per question.** "Do you have a latrine and is it clean?" is two questions. Split it.
* **Neutral wording.** "Don't you agree the new borehole is better?" pushes people towards yes. Ask "How would you rate the new borehole?" instead.
* **Clear time frames.** "In the last 7 days, how many days did your child attend school?" is better than "Does your child attend school regularly?"
* **Plain words.** Avoid jargon such as "livelihood diversification". Ask what people actually do.
* **Translate carefully.** Agree a translation in Dagbani or the local language with the team and test it, so every enumerator asks the same question.

## Answer choices

Closed questions give fixed choices, which are quick to analyse. Make the choices cover every likely answer without overlap. Age groups like 15 to 24 and 24 to 34 overlap at 24, which causes confusion. Add "Other (specify)" and "Don't know" where it makes sense. Use open questions sparingly, because they take longer to analyse.

## Keep it short

Every extra question costs the respondent time and raises the chance of tired, careless answers. For each question ask: which indicator or decision does this feed? If the answer is none, cut it.

## Choosing who to ask

You rarely survey everyone, so you choose a sample. The aim is a sample that looks like the whole group.

* **Random sampling** gives everyone an equal chance, for example picking households from a list using random numbers.
* **Stratified sampling** makes sure each subgroup is included, for example a set number of households from each community.
* **Convenience sampling**, asking whoever is easiest to reach, is quick but often biased.

Bigger samples are usually more reliable, but a fair small sample beats a large biased one.

## Baselines

Projects often run a **baseline** survey before they start and an **endline** survey at the end, using the same questions. Comparing the two shows what changed. That only works if the questions stay identical, which is another reason to design carefully.

## Test before you go

Always pilot the questionnaire with a few people similar to your respondents. In an invented pilot in Yendi, Mariama found that "household" meant different things to different families, so the team added a definition. Piloting catches problems while they are cheap to fix.`,
      practice_task_md: `**Goal:** write and pilot a short questionnaire.

1. Choose a topic, such as how young people in your town use mobile money, or how far households walk for water.
2. Write 8 to 10 questions. Include at least five closed questions with clear, non overlapping answer choices and one open question.
3. Check each question against the rules: one idea, neutral, clear time frame, plain words.
4. Pilot it with two or three friends or family members. Note any question they found confusing.
5. Revise and write a short note on what you changed and why.

**Done looks like:** version one and version two of your questionnaire plus your pilot notes, ready to build as a phone form in the next lesson.`,
      quiz: {
        questions: [
          {
            prompt: "What is wrong with \"Do you have a latrine and is it clean?\"",
            options: [
              "It is too short",
              "It asks about two things at once",
              "It uses a time frame",
              "It is an open question",
            ],
            answer_index: 1,
            explanation: "Good questions ask about one idea at a time.",
          },
          {
            prompt: "Which answer choices for age are problematic?",
            options: [
              "15 to 24 and 25 to 34",
              "15 to 24 and 24 to 34",
              "Under 15 and 15 or older",
              "18 to 29 and 30 to 45",
            ],
            answer_index: 1,
            explanation: "They overlap at 24, so a 24 year old fits both groups.",
          },
          {
            prompt: "What does stratified sampling make sure of?",
            options: [
              "Only the easiest people to reach are included",
              "No questions are translated",
              "Everyone in every community is surveyed, so no one is missed",
              "Each subgroup, such as each community, is included",
            ],
            answer_index: 3,
            explanation: "Stratified sampling includes a set number from each subgroup.",
          },
          {
            prompt: "Why must baseline and endline surveys use the same questions?",
            options: [
              "So the results can be compared to show what changed",
              "To save printing costs",
              "Because donors forbid new questions",
              "So enumerators do not need training",
            ],
            answer_index: 0,
            explanation: "Comparison only works when the questions stay identical.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "mobile-surveys": {
      outcomes: [
        "Build a phone survey in KoboToolbox or ODK",
        "Add checks and skip logic",
        "Collect and download survey data",
      ],
      explanation_md: `## Why this matters

Paper questionnaires are slow to enter and easy to get wrong. Most NGOs and research teams now collect field data on phones with free tools such as KoboToolbox and ODK, and several M&E and research adverts name them directly. If you can build a working form, test it and download clean results, you have a practical skill that projects across northern Ghana need.

## The tools

**ODK** (Open Data Kit) is a free, open source set of tools for phone data collection. **KoboToolbox** is built on ODK technology and adds a friendly website where you can build forms, store submissions and download data. KoboToolbox has a free plan for individuals with usage limits you will not reach while learning, which makes it a good place to start. Forms work in the KoboCollect or ODK Collect Android apps and also in a web browser.

Both tools collect data **offline**. Enumerators fill forms in a village with no signal, and the phone sends the submissions when it next connects.

## Two ways to build a form

* **The Formbuilder** in KoboToolbox lets you add questions by tapping and typing. It is the easiest way to begin.
* **XLSForm** is a spreadsheet layout that both KoboToolbox and ODK understand. You write each question as a row in a sheet called survey, and list answer options in a sheet called choices. Larger projects use XLSForm because it is easy to review, copy and translate.

A tiny XLSForm survey sheet looks like this:

\`\`\`
type              name        label
integer           hh_size     How many people live here?
select_one yn     has_water   Do you have water at home?
\`\`\`

The choices sheet then lists the yn options: yes and no.

## Question types

Common types include text, integer, decimal, date, select_one (pick one answer), select_multiple (pick several) and geopoint (record a GPS location). Choosing the right type matters: an integer question will not accept "five", which stops one kind of error.

## Checks and skip logic

Two features make phone forms better than paper:

* **Constraints** reject impossible answers. A constraint like \`. >= 1 and . <= 30\` on household size refuses 0 or 300.
* **Relevance**, also called skip logic, shows a question only when it applies. A question about a child's school attendance can appear only if the household has children, using a rule such as \`\${has_children} = 'yes'\`.

Required questions make sure important answers are never skipped.

## Collecting and downloading

After deploying a form, test it yourself on a phone. Submit a few fake records, then check them in the data table. When real collection starts, download the results as Excel or CSV and open them in Google Sheets. Delete your test submissions before analysis, or they will be counted.

## A worked example

Wumpini builds an invented water access form for five communities near Savelugu: community (select_one), household size (integer with a constraint), main water source (select_one), minutes to walk there (integer), and a GPS point. She tests it with her sister, finds that "minutes" confused people, and changes the label to "How many minutes does it take to walk to the water source and back?" The final data downloads straight into a tidy table.`,
      practice_task_md: `**Goal:** build, test and download a small phone survey.

1. Create a free account on KoboToolbox (kobotoolbox.org) using your phone or laptop.
2. Using the Formbuilder, build the questionnaire you wrote in the survey design lesson, or a 6 question water access survey.
3. Include at least one select_one question, one integer question with a constraint, one required question and one question with skip logic.
4. Deploy the form and open it in the KoboCollect app or the web form link. Submit five test responses, including one that tries to break your constraint.
5. Download the data as Excel or CSV and open it in Google Sheets.

**Done looks like:** a deployed form, a downloaded spreadsheet of test data, and a screenshot of your constraint rejecting a bad answer.`,
      quiz: {
        questions: [
          {
            prompt: "How do KoboToolbox and ODK handle villages with no network?",
            options: [
              "They cannot be used without network",
              "Answers are sent by SMS only",
              "Forms are filled offline and sent when the phone next connects",
              "Enumerators fill paper forms first, then type them into the app later",
            ],
            answer_index: 2,
            explanation: "Both tools collect data offline and upload later.",
          },
          {
            prompt: "In XLSForm, where do you list the answer options for a select_one question?",
            options: ["The settings sheet", "The choices sheet", "A separate Word document", "The label column only"],
            answer_index: 1,
            explanation: "Questions go in the survey sheet and answer options in the choices sheet.",
          },
          {
            prompt: "What does a constraint do?",
            options: [
              "Shows a question only when an earlier answer makes it apply",
              "Records a GPS point",
              "Translates the form",
              "Rejects impossible answers, such as a household of 300",
            ],
            answer_index: 3,
            explanation: "Constraints stop answers outside the allowed range.",
          },
          {
            prompt: "What should you do with your test submissions before analysis?",
            options: [
              "Keep them to make the sample bigger",
              "Delete them so they are not counted",
              "Send them to the donor",
              "Copy them into the choices sheet",
            ],
            answer_index: 1,
            explanation: "Test records would distort the results if left in.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "data-cleaning": {
      outcomes: [
        "Clean data on a copy, never the original",
        "Fix common data problems",
        "Keep a cleaning log of every change",
      ],
      explanation_md: `## Why this matters

Real data is messy. Field forms have duplicates, registers have spelling differences, and exported files mix numbers with text. Several adverts list data cleaning and validation as core duties, and analysts often say cleaning takes more time than analysis itself. If your data is wrong, every chart and report built on it is wrong too.

## Work on a copy

Never clean the original file. Make a copy, name it clearly (for example survey_clean_v1) and keep the raw download untouched. If you make a mistake, you can start again.

## Common problems and fixes

**Duplicates.** The same household submitted twice, often because a phone uploaded twice. Look for repeated IDs or identical rows. In Google Sheets, Data cleanup then Remove duplicates helps, but check what it removes first.

**Inconsistent spellings.** "Tamale", "tamale", "Tamale Metro" and "TML" may all mean the same place. Use TRIM to remove extra spaces and PROPER or LOWER to fix capitals, then agree one standard name and replace the others with Find and replace. A filter on the column shows every distinct spelling at once.

**Missing values.** A blank can mean "not asked", "refused" or "forgot to enter". Find out which. Do not fill blanks with zero or a guess. Record how many are missing and decide with your supervisor whether to follow up, leave them blank or exclude that record from a particular calculation.

**Impossible or unlikely values.** A child aged 45, a farm of 9,000 acres, a date in the future. Sort each number column from smallest to largest to spot extremes quickly. Some extremes are real, so check with the field team before changing anything.

**Wrong data types.** Numbers stored as text will not add up. Amounts written as "200 cedis" need the text removed. Dates in mixed formats need converting to one format.

## Keep a cleaning log

For every change, write down what you changed, why and how many rows were affected. A simple log might read:

* Removed 3 duplicate submissions with the same household ID.
* Standardised 14 spellings of Tamale to "Tamale".
* Flagged 2 ages over 100 for the field supervisor to check.

The log lets your supervisor trust your work and lets someone else repeat it. Many M&E teams require one.

## A worked example

Amina downloads an invented school attendance survey from twelve schools around Bolgatanga. She makes a copy, finds two schools entered twice, fixes "Bolga" and "Bolgatanga" to one spelling, and flags a record showing 400 pupils in a class of 40. She calls the enumerator, who confirms a typing slip, and corrects it to 40. Her log has eight lines. Her manager can now report attendance with confidence.

## Cleaning in other tools

The same ideas apply in SQL and in Python's pandas library, which you will meet later. Learn them in a spreadsheet first, where you can see every change.`,
      practice_task_md: `**Goal:** clean a messy dataset and document every change.

1. In Google Sheets, create an invented survey table with 20 rows and the columns household_id, community, hh_size, monthly_spend_ghs.
2. Deliberately add problems: two duplicate rows, four different spellings of one community, one hh_size of 250, two blanks and one amount written as "150 cedis".
3. Make a copy of the sheet named clean_v1 and keep the original untouched.
4. Fix or flag each problem using TRIM, PROPER, sorting, filters and Remove duplicates.
5. Write a cleaning log on a separate tab with one line per change.

**Done looks like:** the raw sheet, the cleaned sheet and a clear cleaning log that a mentor could follow step by step.`,
      quiz: {
        questions: [
          {
            prompt: "What should you do before you start cleaning?",
            options: [
              "Delete the raw download",
              "Fill all blanks with zero",
              "Make a copy and keep the original untouched",
              "Sort every column so the errors are easy to see",
            ],
            answer_index: 2,
            explanation: "Working on a copy lets you start again if you make a mistake.",
          },
          {
            prompt: "A record shows 400 pupils in a class of 40. What is the best response?",
            options: [
              "Delete the whole survey",
              "Leave it, because all data is correct",
              "Flag it and check with the field team before changing it",
              "Replace it with the class average so the totals still work",
            ],
            answer_index: 2,
            explanation: "Some extremes are real, so check with the field team before changing anything.",
          },
          {
            prompt: "Which functions help fix extra spaces and inconsistent capitals?",
            options: ["SUM and AVERAGE", "TRIM and PROPER", "COUNTIF and SUMIF", "XLOOKUP and VLOOKUP"],
            answer_index: 1,
            explanation: "TRIM removes extra spaces and PROPER fixes capitals.",
          },
          {
            prompt: "Why keep a cleaning log?",
            options: [
              "So others can trust and repeat your work",
              "To make the file bigger",
              "Because spreadsheets require it to save",
              "To hide changes from your supervisor",
            ],
            answer_index: 0,
            explanation: "A log records what changed, why and how many rows were affected.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "data-privacy": {
      outcomes: [
        "Explain what counts as personal data",
        "Follow Ghana's data protection law and get consent",
        "Make a survey file safe to share",
      ],
      explanation_md: `## Why this matters

Field surveys collect names, phone numbers, locations, health details and income. That information belongs to the people who shared it. If it leaks, they can be embarrassed, cheated or put at risk. Employers, especially NGOs and government programmes, expect data staff to handle personal data carefully and to follow their confidentiality rules. Handling it well also protects the trust that lets field teams keep working in communities.

## What counts as personal data

Personal data is any information about a person who can be identified from it, either directly or when combined with other details. Names, phone numbers, Ghana Card numbers and photos identify people directly. A combination such as "female, aged 70, widowed, living in a small community near Nalerigu" can identify someone even without a name. The Act treats some data as special and more sensitive, such as health conditions, religious beliefs, and ethnic or tribal origin, and it needs extra care.

## Ghana's law

Ghana's Data Protection Act, 2012 (Act 843) sets rules for anyone who collects and uses personal data, and the Data Protection Commission oversees it. In broad terms the Act expects that you collect data for a clear, lawful purpose, collect only what you need, keep it accurate, keep it secure, and respect people's rights over their own information. Organisations that collect and use personal data must register with the Commission. You do not need to be a lawyer, but you should know the law exists, follow your organisation's policy, and ask when unsure. The Commission's website at dpc.gov.gh has more detail.

## Consent

Before an interview, respondents should be told who you are, why the data is being collected, how it will be used and that they can refuse or stop at any time. Then they choose. In KoboToolbox or ODK you can add a consent question at the start and end the form if the answer is no. Explain consent in the respondent's language, in words they understand.

## Practical habits

* **Collect less.** If you do not need a phone number for the analysis, do not ask for it.
* **Separate identities from answers.** Store names and contact details in one locked file, and answers in another linked only by an ID. This is called pseudonymisation.
* **Anonymise before sharing.** Remove names, phone numbers and exact GPS points from files you share for analysis or reports.
* **Watch small groups.** If a table shows only one person in a category, such as one teacher with a disability in a village, they can be identified. Combine small categories or do not show them.
* **Secure devices and accounts.** Use strong passwords and screen locks. Do not send respondent files over public WhatsApp groups or leave them on shared computers.

## A worked example

Sumaila receives an invented health survey from Walewale with names, phone numbers and illness details. Before sharing it with an analyst, he moves names and numbers into a protected file, keeps only household IDs in the analysis file, and rounds GPS points to the community level. The analyst gets what they need, and the respondents stay protected.`,
      practice_task_md: `**Goal:** make a survey file safe to share.

1. Take the cleaned dataset from the data cleaning lesson, or create an invented one with columns name, phone, community, age, health_condition and monthly_spend_ghs.
2. Create a separate "identity" tab with household_id, name and phone. Remove name and phone from the analysis tab, keeping household_id.
3. Look for any combination of details that could identify a single person, and group or remove it.
4. Write a three sentence consent statement in plain English that an enumerator could read aloud before an interview.

**Done looks like:** a pseudonymised analysis tab, a separate identity tab, and a consent statement you can show a mentor.`,
      quiz: {
        questions: [
          {
            prompt: "Which of these can identify someone even without a name?",
            options: [
              "The total number of surveys collected in each region per month",
              "The date the form was designed",
              "The name of the survey tool",
              "A mix like female, aged 70, widowed, in a small community",
            ],
            answer_index: 3,
            explanation: "Combined details can identify a person in a small community.",
          },
          {
            prompt: "Which law sets rules for personal data in Ghana?",
            options: [
              "The Data Protection Act, 2012 (Act 843)",
              "The Electronic Transactions Act only",
              "No law covers personal data in Ghana",
              "The Kobo Terms of Use",
            ],
            answer_index: 0,
            explanation: "The lesson names the Data Protection Act, 2012 (Act 843), overseen by the Data Protection Commission.",
          },
          {
            prompt: "What is pseudonymisation?",
            options: [
              "Publishing names in reports while hiding phone numbers",
              "Deleting all data after collection",
              "Keeping names apart and linking answers only by an ID",
              "Translating forms into local languages",
            ],
            answer_index: 2,
            explanation: "Identities and answers are kept apart, linked only by an ID.",
          },
          {
            prompt: "What should respondents be told before an interview?",
            options: [
              "Nothing, to save time",
              "Only the enumerator's name",
              "Who you are, how the data will be used, and that they can refuse",
              "That once they agree, they must answer every question to the end",
            ],
            answer_index: 2,
            explanation: "Informed consent means people know the purpose and can choose to refuse.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "monitoring-evaluation": {
      outcomes: [
        "Tell monitoring from evaluation",
        "Describe a project's results chain",
        "Explain where data skills fit in MEAL",
      ],
      explanation_md: `## Why this matters

Many data jobs in northern Ghana sit inside monitoring and evaluation teams. NGOs, development programmes and government projects working on farming, water, health, education and livelihoods all need to show what they are doing and whether it is working. M&E officers and assistants collect that evidence, check it and report it to managers and donors. If you understand the ideas in this section, M&E adverts will start to read like a description of skills you already have.

## Monitoring and evaluation are different

**Monitoring** is regular tracking while a project runs. Are activities happening on time? How many farmers were trained this month? How many boreholes were repaired? Monitoring answers "are we doing what we said we would do?"

**Evaluation** is a deeper look at specific points, often at the middle or end of a project. Did the training actually improve harvests? Did repaired boreholes reduce time spent fetching water? Evaluation answers "is it making a difference, and why?"

Monitoring happens all the time and is often done by junior staff. Evaluation happens less often and may involve outside specialists, but it relies on good monitoring data.

## The results chain

Most projects describe their logic as a chain:

* **Inputs:** money, staff, seeds, materials.
* **Activities:** what the project does, such as training sessions.
* **Outputs:** the direct products, such as 200 farmers trained (an invented example).
* **Outcomes:** the changes that follow, such as farmers using improved planting methods.
* **Impact:** the long term goal, such as better food security.

Outputs are easy to count. Outcomes and impact are harder to measure and matter more. A common mistake is to report only outputs and call them results.

## MEAL and accountability

You will often see MEAL: monitoring, evaluation, accountability and learning. Accountability means listening to the people the project serves, for example through feedback lines or community meetings. Learning means using evidence to improve the project rather than just filing reports.

## Where data skills fit

Everything you learned earlier feeds M&E. Survey design and mobile forms collect the data. Cleaning and privacy keep it trustworthy and safe. Spreadsheets and pivot tables summarise it. The two topics in this section add the M&E specific layer: indicators and logframes, then data quality checks and progress reports.

## A worked example

An invented project near Wa trains women's groups in shea butter processing. Monitoring tracks sessions held and women attending each month. A midline survey asks about income from shea. Hawa, the M&E assistant, enters attendance, cleans the survey data and prepares a monthly table for the project officer. When attendance drops in one community, the team learns that sessions clash with market day and moves them. That is monitoring leading to learning.`,
      practice_task_md: `**Goal:** describe a project's results chain.

1. Choose a real kind of project common in your area, such as school feeding, a borehole repair programme or a farmer training scheme. Use invented details.
2. Write the five links of the results chain: inputs, activities, outputs, outcomes and impact, with one or two examples for each.
3. Mark which links you would track through monitoring and which would need an evaluation.
4. Write one sentence on how the project could hear feedback from the people it serves.

**Done looks like:** a one page results chain with monitoring and evaluation marked, ready to turn into indicators in the next lesson.`,
      quiz: {
        questions: [
          {
            prompt: "Which question does monitoring mainly answer?",
            options: [
              "Are we doing what we said we would do?",
              "What is the country's population?",
              "Which software is cheapest?",
              "Who should the donor be?",
            ],
            answer_index: 0,
            explanation: "Monitoring is regular tracking of activities while a project runs.",
          },
          {
            prompt: "In a results chain, \"200 farmers trained\" is an example of what?",
            options: ["An input", "An output", "An impact", "An assumption"],
            answer_index: 1,
            explanation: "Outputs are the direct products of activities.",
          },
          {
            prompt: "What does the A in MEAL stand for?",
            options: ["Analysis", "Administration", "Attendance", "Accountability"],
            answer_index: 3,
            explanation: "MEAL is monitoring, evaluation, accountability and learning.",
          },
          {
            prompt: "What common mistake does the lesson warn about?",
            options: [
              "Reporting only outputs and calling them results",
              "Using spreadsheets for M&E",
              "Listening to communities",
              "Running a midline survey",
            ],
            answer_index: 0,
            explanation: "Outputs are easy to count, but outcomes and impact matter more.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "indicators-frameworks": {
      outcomes: [
        "Write an indicator with a baseline and a target",
        "Disaggregate results",
        "Build a mini logframe and a theory of change",
      ],
      explanation_md: `## Why this matters

Indicators, baselines, targets and logframes appear in almost every M&E advert. They are the language projects use to agree, with donors and communities, what success looks like. If you can read and help build a logframe and calculate indicators from data, you can contribute to an M&E team from your first week.

## What an indicator is

An indicator is a specific measure that shows whether a result is being achieved. "Safer drinking water" is a goal, not an indicator. "Percentage of surveyed households in the project communities that treat their drinking water" is an indicator: you can measure it. (This is an invented example; real projects take their indicator definitions from the project's own plan or the donor's guidance.)

Good indicators are often described as SMART:

* **Specific:** clear about who and what.
* **Measurable:** you can count or calculate it.
* **Achievable:** realistic for the project.
* **Relevant:** linked to the result it tracks.
* **Time bound:** with a clear period.

Each indicator needs a definition: exactly how to calculate it. For a percentage, write down the numerator (who counts as yes) and the denominator (who is included at all). Two officers using different denominators will report different numbers from the same data.

## Baselines and targets

A **baseline** is the value before the project starts. A **target** is the value the project aims to reach by a date. Progress is measured from baseline towards target. Without a baseline, you cannot show change.

In an invented example, a project in the Upper East Region finds at baseline that 30 percent of households treat their drinking water. Its target is 60 percent in two years. A year later a survey finds 45 percent. The project has covered half the distance from baseline to target.

## Disaggregation

Donors usually want indicators broken down by sex, age group, location and sometimes disability. This is called disaggregation. It shows whether women, young people or remote communities are being reached. Plan for it when designing your survey, because you cannot disaggregate by something you did not collect.

## The logframe

A logical framework, or logframe, is a table that sets out the project's results and how they will be measured. A common layout has four columns:

| Level | Indicators | Means of verification | Assumptions |
|---|---|---|---|

The rows follow the results chain: goal, outcomes, outputs and sometimes activities. **Means of verification** says where the data comes from, such as attendance registers or a household survey. **Assumptions** are conditions outside the project's control, such as normal rainfall.

## Theory of change

Many organisations also use a theory of change: a diagram or short story explaining how and why activities should lead to the desired change. The logframe is the measurement plan that sits underneath it.

## Calculating an indicator

Abdul-Rahman has invented survey data from 150 households. 63 report treating water. The indicator is 63 divided by 150, which is 42 percent. He uses a pivot table to split it by community and sex of household head, and notes the numerator and denominator in his report so others can check it.`,
      practice_task_md: `**Goal:** write indicators and a mini logframe.

1. Take the results chain you wrote in the previous lesson.
2. Write one SMART indicator for one outcome and two outputs. For each, write the numerator, the denominator and how it would be disaggregated.
3. Invent a baseline and a target for each indicator.
4. Build a small logframe table in Google Sheets or Docs with the columns: level, indicator, baseline, target, means of verification, assumptions.

**Done looks like:** a mini logframe with three clearly defined indicators that a mentor could check for clarity.`,
      quiz: {
        questions: [
          {
            prompt: "Which of these is an indicator rather than a goal?",
            options: [
              "Safer drinking water",
              "Stronger communities",
              "Percentage of households in project communities that treat their water",
              "Better health and safer water for every family living in the project area",
            ],
            answer_index: 2,
            explanation: "An indicator is specific and measurable.",
          },
          {
            prompt: "A project's baseline is 30 percent and its target is 60 percent. A survey finds 45 percent. How far has it come?",
            options: [
              "It has not moved",
              "Half the distance from baseline to target",
              "It has passed the target",
              "It has gone backwards",
            ],
            answer_index: 1,
            explanation: "45 is halfway between 30 and 60.",
          },
          {
            prompt: "What does the means of verification column in a logframe describe?",
            options: [
              "Where the data for the indicator comes from",
              "The project budget",
              "The donor's name",
              "Conditions outside the project's control",
            ],
            answer_index: 0,
            explanation: "Means of verification names the data source, such as registers or surveys.",
          },
          {
            prompt: "Why must you plan disaggregation when designing a survey?",
            options: [
              "Disaggregation makes the survey shorter",
              "It removes the need for a baseline, since groups are compared instead",
              "Donors never ask for it",
              "You cannot split results by a detail you did not collect",
            ],
            answer_index: 3,
            explanation: "If sex or age was not collected, you cannot split results by it later.",
          },
          {
            prompt: "Why write down the numerator and denominator of a percentage indicator?",
            options: [
              "So different people calculate it the same way",
              "To make the report longer",
              "Because spreadsheets require it",
              "To hide the method",
            ],
            answer_index: 0,
            explanation: "Different denominators give different numbers from the same data.",
          },
        ],
        pass_threshold: 80,
      },
    },

    "data-quality-reporting": {
      outcomes: [
        "Check data quality",
        "Explain routine reporting systems",
        "Draft a progress report",
      ],
      explanation_md: `## Why this matters

Donors and managers make decisions, and sometimes release funding, based on the numbers M&E teams report. If those numbers are wrong, the project loses credibility. That is why adverts ask for data quality assurance and donor reporting. As a junior, you may be the person who checks the numbers and drafts the monthly table.

## What good quality data looks like

M&E teams often check data against a few qualities:

* **Valid:** it measures what the indicator says it measures.
* **Reliable:** it is collected the same way every time, by every officer.
* **Precise:** detailed enough for the decision, such as broken down by community.
* **Timely:** available when it is needed, not three months late.
* **Complete:** no missing communities, months or records.
* **Integrity:** protected from mistakes and from being changed to look better.

## Data quality checks

A common check is to **recount from the source**. Take a reported number, such as 312 farmers trained in March (an invented figure), go back to the attendance sheets and count again. If the recount gives 298, find out why: double counting, a missing sheet, or a typing slip.

Other routine checks:

* Compare totals across months for sudden jumps or drops.
* Check that subgroups add up to the total, such as men plus women equals all participants.
* Look for the same person appearing twice under slightly different names.
* Confirm every community has reported.

Write down what you checked and what you found. A short data quality note builds trust.

## Routine reporting systems

Some sectors report through shared systems. Health programmes often use DHIS2, a free platform where facilities enter monthly figures. Education and agriculture projects may use spreadsheets or their own databases. Whatever the system, the same checks apply.

## Writing a progress report

A monthly or quarterly progress report usually includes a table like this, built from your indicators:

| Indicator | Baseline | Target | This period | Status |
|---|---|---|---|---|

Under the table, add short notes:

* **What went well**, with the numbers.
* **What fell behind** and the likely reason.
* **What the team will do next.**
* **Data issues**, such as a community that did not report.

Lead with the most important finding. Keep sentences short. Use charts only when they make a point clearer than the table.

## A worked example

Mariama prepares the invented quarterly report for a girls' education project near Yendi. Her recount finds one school's enrolment entered twice, so she corrects the total and notes it. Her table shows attendance on track, but the indicator for girls moving to junior high is behind target. Her note explains that two schools lost teachers mid term and that the team plans to work with the district education office. The manager forwards the report to the donor with confidence.`,
      practice_task_md: `**Goal:** check a reported figure and draft a progress table.

1. Create an invented attendance register in Google Sheets for a training project: 4 sessions, 25 to 35 participants each, with name, sex and community. Include one person entered twice.
2. Write a "reported" total that is slightly wrong. Recount from the register using COUNTA or a pivot table and find the difference.
3. Check that men plus women equals the total.
4. Build a progress table with indicator, baseline, target, this period and status for two indicators.
5. Write four short notes: what went well, what fell behind, next steps, data issues.

**Done looks like:** a register, a recount that explains the difference, and a one page progress summary you can show a mentor.`,
      quiz: {
        questions: [
          {
            prompt: "What is a recount from the source?",
            options: [
              "Asking field staff to add up the monthly summary sheet once more",
              "Copying last month's figures",
              "Checking a reported number against the original records",
              "Rounding all numbers",
            ],
            answer_index: 2,
            explanation: "A recount checks a reported figure against the original records.",
          },
          {
            prompt: "Which data quality means data is available when it is needed?",
            options: ["Valid", "Timely", "Precise", "Integrity"],
            answer_index: 1,
            explanation: "Timely data arrives in time for the decision.",
          },
          {
            prompt: "Which routine check does the lesson suggest?",
            options: [
              "Check that men plus women add up to the total",
              "Delete any month with low numbers",
              "Only check months where the numbers look unusually high",
              "Change figures so they reach the target",
            ],
            answer_index: 0,
            explanation: "Subgroups that do not add up point to an error.",
          },
          {
            prompt: "What should a progress report lead with?",
            options: [
              "A long history of the organisation",
              "The most important finding",
              "Every chart you can make",
              "The list of staff",
            ],
            answer_index: 1,
            explanation: "The lesson says to lead with the most important finding.",
          },
        ],
        pass_threshold: 75,
      },
    },

    sql: {
      outcomes: [
        "Explain what a database is and what SQL looks like",
        "Practise SQL in the browser without installing anything",
        "Run your first queries",
      ],
      explanation_md: `## Why this matters

Spreadsheets are great until the data grows too big or lives inside a company system. Banks, telcos, mobile money operators, government data units and many remote employers keep their records in databases, and the language for asking those databases questions is SQL (often said "sequel" or "S Q L"). It appears regularly in Ghanaian analyst and BI adverts and in remote junior analyst roles. Learning it opens doors that spreadsheets alone cannot.

## What a database is

A relational database stores data in **tables**, much like sheets in a spreadsheet. Each table has columns with fixed types, such as text, whole numbers or dates, and rows of records. Tables are linked by shared columns called **keys**. For example, an invented mobile money company might have a customers table and a transactions table, linked by customer_id.

The big differences from a spreadsheet:

* Databases can hold millions of rows without slowing down your phone or laptop.
* Many people can use the same data at once, safely.
* You do not edit cells by hand. You write a query that describes what you want, and the database returns the answer.

## What SQL looks like

SQL reads almost like an English sentence:

\`\`\`sql
SELECT district, amount
FROM transactions
WHERE amount > 500;
\`\`\`

This asks for the district and amount of every transaction above 500. You will learn to filter, sort, combine tables and summarise them with counts and totals.

## Analyst SQL is mostly reading

As an analyst you mostly read data with SELECT queries. You rarely create or delete tables; database administrators and engineers handle that. This makes SQL much less frightening: you cannot break anything by asking a question, and most employers give analysts read only access.

## Many databases, one language

PostgreSQL, MySQL, SQL Server, SQLite and BigQuery differ in small details, but the core SQL in this section works on all of them. If an advert names one you have not used, your skills still transfer.

## Practising without installing anything

You do not need a powerful computer. Interactive sites such as SQLBolt let you type queries in the browser and see results instantly, lesson by lesson. Online SQLite playgrounds let you create your own small tables. Both work in any browser, even on a phone, though a laptop with a keyboard is more comfortable for long queries.

## What this section covers

**Querying with SQL:** SELECT, WHERE, ORDER BY and LIMIT to pull and sort exactly the rows you need.

**Joins and aggregation:** combining tables with JOIN and summarising with GROUP BY, COUNT, SUM and AVG.

## A worked example

Issahaku joins a microfinance company in Tamale as a reporting assistant. Each morning his manager asks how many loans were repaid yesterday in each branch. In a spreadsheet, that meant downloading a large file and building a pivot table. With a short SQL query, he gets the answer in seconds straight from the database, and can rerun it every day.`,
      practice_task_md: `**Goal:** run your first SQL queries in the browser.

1. Open sqlbolt.com on your phone or laptop.
2. Complete lessons 1 to 3, typing each query yourself rather than copying.
3. For each lesson, write in a notebook what the query asked and what came back, in one plain sentence.
4. Then write, in plain English, three questions you would like to ask a database about a business you know, such as a pharmacy or a mobile money agent.

**Done looks like:** three completed SQLBolt lessons, your notes, and three plain English questions you will turn into SQL in the next lessons.`,
      quiz: {
        questions: [
          {
            prompt: "In a relational database, how are tables linked?",
            options: [
              "By colour",
              "By copying the same table into every database file",
              "By file name",
              "By shared columns called keys, such as customer_id",
            ],
            answer_index: 3,
            explanation: "Tables are linked by shared key columns.",
          },
          {
            prompt: "What does an analyst mostly do with SQL?",
            options: [
              "Delete tables",
              "Read data with SELECT queries",
              "Design computer hardware",
              "Send emails",
            ],
            answer_index: 1,
            explanation: "Analyst SQL is mostly reading data with SELECT queries.",
          },
          {
            prompt: "An advert names a database you have not used. What does the lesson say?",
            options: [
              "Your core SQL skills still transfer",
              "You must not apply",
              "SQL is different in every database, so start again",
              "Only spreadsheets matter",
            ],
            answer_index: 0,
            explanation: "The core SQL works across PostgreSQL, MySQL, SQL Server, SQLite and BigQuery.",
          },
          {
            prompt: "Which is an advantage of a database over a spreadsheet?",
            options: [
              "You can scroll and edit every cell by hand, just like a sheet",
              "It needs no structure",
              "It can hold millions of rows and serve many users at once",
              "It only works offline",
            ],
            answer_index: 2,
            explanation: "Databases handle large data and many users safely.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "sql-basics": {
      outcomes: [
        "Select columns and filter rows with WHERE",
        "Sort and limit results",
        "Write clauses in the right order",
      ],
      explanation_md: `## Why this matters

In SQL interview tests, the first questions are almost always about selecting, filtering and sorting rows. These few keywords do a large share of everyday analyst work, so practise them until they feel natural.

## The example table

Imagine an invented table called sales for a chain of provision shops in the north:

| sale_id | shop | town | item | qty | amount |
|---|---|---|---|---|---|
| 1 | Shop A | Tamale | Rice | 2 | 180 |
| 2 | Shop B | Wa | Oil | 1 | 95 |

## SELECT and FROM

SELECT names the columns you want; FROM names the table.

\`\`\`sql
SELECT town, item, amount
FROM sales;
\`\`\`

SELECT * returns every column. It is handy for a quick look, but naming columns keeps results small and clear.

## WHERE: filtering rows

WHERE keeps only rows that meet a condition.

\`\`\`sql
SELECT item, amount
FROM sales
WHERE town = 'Tamale' AND amount >= 100;
\`\`\`

Text values go inside single quotes. You can combine conditions with AND and OR, and use comparisons such as =, <>, <, >, <= and >=. Other useful filters:

* \`IN ('Tamale', 'Wa')\` matches any value in a list.
* \`BETWEEN 50 AND 200\` matches a range, including both ends.
* \`LIKE 'Ri%'\` matches text that starts with Ri.
* \`IS NULL\` finds missing values. Note that \`= NULL\` does not work.

## ORDER BY and LIMIT

ORDER BY sorts the results. Add DESC for largest first. LIMIT keeps only the first few rows.

\`\`\`sql
SELECT shop, amount
FROM sales
ORDER BY amount DESC
LIMIT 5;
\`\`\`

This returns the five biggest sales.

## DISTINCT and aliases

\`SELECT DISTINCT town FROM sales;\` lists each town once. An alias renames a column in the result: \`SELECT amount AS amount_ghs\`.

## The order of clauses

Clauses must appear in this order: SELECT, FROM, WHERE, ORDER BY, LIMIT. Writing them out of order is the most common beginner error, so check it first when a query fails. A semicolon ends the query.

## A worked example

Hawa's manager asks: "Which five oil sales in Wa were the largest?" Hawa writes a query that selects shop, amount and sale_id, filters where town is Wa and item is Oil, orders by amount descending and limits to five. She checks a couple of results against the raw table to be sure the filter worked, then sends the answer with the query attached so her manager can rerun it.

## Habits of a careful querier

Start small: run SELECT with LIMIT 10 to see the data before filtering. Add one condition at a time and check the row count each time. Format long queries on several lines so they read easily on a small screen.`,
      practice_task_md: `**Goal:** write filtering and sorting queries on your own table.

1. Open sqliteonline.com or continue on sqlbolt.com.
2. On SQLite Online, create a small sales table with columns sale_id, town, item, qty and amount, and insert about 12 invented rows using towns such as Tamale, Wa, Bolgatanga and Damongo.
3. Write queries to answer: all sales in Tamale; sales between 50 and 200 cedis; the three largest sales; each distinct item sold.
4. Save each query and its result in a document or notebook.

**Done looks like:** four working queries with results, which you can paste into your portfolio as an SQL practice page.`,
      quiz: {
        questions: [
          {
            prompt: "Which query returns only sales in Tamale?",
            options: [
              "SELECT * FROM sales ORDER BY town = 'Tamale';",
              "SELECT DISTINCT town FROM sales;",
              "SELECT town FROM sales LIMIT 1;",
              "SELECT * FROM sales WHERE town = 'Tamale';",
            ],
            answer_index: 3,
            explanation: "WHERE filters rows to those that meet the condition.",
          },
          {
            prompt: "How do you find rows where a value is missing?",
            options: ["WHERE amount = NULL", "WHERE amount IS NULL", "WHERE amount = ''", "WHERE amount = 0"],
            answer_index: 1,
            explanation: "Use IS NULL; = NULL does not work.",
          },
          {
            prompt: "What does ORDER BY amount DESC LIMIT 5 return?",
            options: [
              "The five smallest amounts",
              "The five largest amounts",
              "Five random rows",
              "Every row except five",
            ],
            answer_index: 1,
            explanation: "DESC sorts largest first and LIMIT 5 keeps the first five rows.",
          },
          {
            prompt: "Which is the correct order of clauses?",
            options: [
              "FROM, SELECT, LIMIT, WHERE",
              "SELECT, FROM, ORDER BY, WHERE, LIMIT",
              "SELECT, FROM, WHERE, ORDER BY, LIMIT",
              "WHERE, SELECT, FROM, LIMIT",
            ],
            answer_index: 2,
            explanation: "Clauses must appear as SELECT, FROM, WHERE, ORDER BY, LIMIT.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "sql-joins-aggregation": {
      outcomes: [
        "Summarise data with aggregation and GROUP BY",
        "Filter groups with HAVING",
        "Combine tables with JOIN and watch your row counts",
      ],
      explanation_md: `## Why this matters

Real questions usually need more than one table and a summary rather than a list. "Which district had the most mobile money transactions last month?" needs transactions joined to agents, grouped by district and counted. Joins and GROUP BY are what separate a beginner from someone ready for a junior analyst test.

## The example tables

Imagine two invented tables for a mobile money operator:

* **agents:** agent_id, agent_name, district
* **transactions:** txn_id, agent_id, txn_date, amount

The tables share agent_id.

## Aggregation

Aggregate functions summarise many rows into one value: COUNT, SUM, AVG, MIN and MAX.

\`\`\`sql
SELECT COUNT(*) AS txns, SUM(amount) AS total
FROM transactions;
\`\`\`

## GROUP BY

GROUP BY gives one summary row per group:

\`\`\`sql
SELECT agent_id, COUNT(*) AS txns
FROM transactions
GROUP BY agent_id;
\`\`\`

Safe rule: every column in SELECT must either be in GROUP BY or inside an aggregate function. Some databases, such as SQLite, are less strict, but following the rule keeps your results correct everywhere.

## HAVING

WHERE filters rows before grouping. HAVING filters groups after grouping. To list agents with more than 100 transactions, add \`HAVING COUNT(*) > 100\` after GROUP BY.

## JOIN: combining tables

An INNER JOIN keeps rows that match in both tables:

\`\`\`sql
SELECT a.district, COUNT(*) AS txns
FROM transactions t
JOIN agents a ON t.agent_id = a.agent_id
GROUP BY a.district
ORDER BY txns DESC;
\`\`\`

The letters t and a are short aliases for the table names. ON says which columns must match. This query answers the district question in one go.

A LEFT JOIN keeps every row from the first (left) table, even with no match, filling the missing columns with NULL. Use it to find gaps, such as agents with no transactions at all:

\`\`\`sql
SELECT a.agent_name
FROM agents a
LEFT JOIN transactions t ON a.agent_id = t.agent_id
WHERE t.txn_id IS NULL;
\`\`\`

## Watch your row counts

Joins can multiply rows if a key appears more than once in both tables, which inflates totals without any error. Before and after a join, check the number of rows and compare a total with what you expect. This simple habit catches many mistakes.

## A worked example

Abdul-Rahman is asked which districts had the highest total value of transactions in March. He filters transactions with WHERE txn_date BETWEEN '2026-03-01' AND '2026-03-31', joins to agents, groups by district and sums amount. He then runs a LEFT JOIN to list agents with no March transactions, so the operations team can follow up. Two short queries answer two business questions.

## In spreadsheets terms

A JOIN does what XLOOKUP does, and GROUP BY does what a pivot table does. If those spreadsheet skills feel familiar, you already understand the ideas.`,
      practice_task_md: `**Goal:** answer business questions with joins and GROUP BY.

1. Complete the SQLBolt lessons on joins and on queries with aggregates.
2. On sqliteonline.com, create two invented tables: agents (agent_id, agent_name, district) with 5 agents, and transactions (txn_id, agent_id, amount) with about 20 rows. Leave one agent with no transactions.
3. Write queries for: total transactions per agent; total amount per district using a JOIN; districts with total above a figure you choose using HAVING; agents with no transactions using a LEFT JOIN.
4. For each, note the row count you expected and the row count you got.

**Done looks like:** four working queries with results and row count notes, ready for your portfolio.`,
      quiz: {
        questions: [
          {
            prompt: "What does GROUP BY do?",
            options: [
              "Sorts rows alphabetically",
              "Gives one summary row per group",
              "Deletes duplicate rows",
              "Joins two tables",
            ],
            answer_index: 1,
            explanation: "GROUP BY produces one row per group, used with aggregates such as COUNT.",
          },
          {
            prompt: "What is the difference between WHERE and HAVING?",
            options: [
              "There is no difference",
              "HAVING filters rows before grouping; WHERE filters groups after",
              "HAVING only works on text",
              "WHERE filters rows before grouping; HAVING filters groups after",
            ],
            answer_index: 3,
            explanation: "HAVING is applied to grouped results.",
          },
          {
            prompt: "Which join would you use to find agents with no transactions?",
            options: [
              "INNER JOIN, then keep agents whose transaction count is zero",
              "LEFT JOIN from agents, keeping rows with a NULL transaction",
              "No join is possible",
              "GROUP BY only",
            ],
            answer_index: 1,
            explanation: "A LEFT JOIN keeps all agents and fills missing matches with NULL.",
          },
          {
            prompt: "Why check row counts before and after a join?",
            options: [
              "Joins can multiply rows and inflate totals without an error",
              "Databases charge per row",
              "Checking row counts makes the join run faster on large tables",
              "It is required by SQL syntax",
            ],
            answer_index: 0,
            explanation: "Duplicate keys can multiply rows silently.",
          },
        ],
        pass_threshold: 75,
      },
    },

    communicating: {
      outcomes: [
        "Know your audience and lead with the answer",
        "Present findings honestly in person",
        "Write a one page summary",
      ],
      explanation_md: `## Why this matters

An analysis only matters if someone understands it and acts on it. Managers, donors and business owners are busy and often have no data background. Adverts for analyst, M&E and reporting roles regularly ask for reports, dashboards and the ability to present findings to non technical people. The analyst who explains clearly is often trusted more than the one with the cleverest method.

## Know your audience

Before you make a chart or write a word, ask: who will read this, what decision do they face, and how much time do they have? A district officer reading on a phone between meetings needs one clear message. A donor's M&E advisor may want the full table and method. The same analysis can be told in different ways for different readers.

## Lead with the answer

Many beginners tell the story in the order they did the work: how they got the data, how they cleaned it, every chart, and finally the conclusion. Readers want the opposite. Put the answer first, then the evidence, then the recommendation.

A short summary might follow this pattern:

* **The answer:** one or two sentences.
* **The evidence:** two or three key numbers or one chart.
* **What it means:** the recommendation or decision.
* **Caveats:** honest limits, such as a small sample or missing data.

## An example

Here is a weak opening: "This report presents an analysis of sales data collected from January to June using Google Sheets."

Here is a strong one: "Sales of rice fell by about a third between March and June, mainly at the Savelugu branch. We recommend checking that branch's supplier before the harvest season."

The second tells the reader what matters in the first line. (Both are invented examples.)

## Presenting in person

When presenting, prepare a five minute version. Start with the answer, show one or two charts, explain what they mean in plain words, and leave time for questions. Practise with a friend who knows nothing about data. If they can repeat your main point back to you, you are ready. Translate technical words: say "the middle value" as well as "median" the first time.

## Be honest

Never hide inconvenient results or stretch a small finding into a big claim. If the data cannot answer the question, say so and suggest what data would. Honest analysts keep their credibility, and in a small professional community, credibility travels.

## What this section covers

**Charts that tell the truth:** choosing and labelling charts so they are clear on a small screen and do not mislead.

**Dashboards:** building a simple, regularly updated view of the few numbers a manager checks.

## A worked example

Wumpini finishes an invented analysis of school attendance in ten schools near Tamale. She writes a half page summary: attendance drops sharply on market days in three schools, here is the chart, and here is a suggestion to work with head teachers on those days. She presents it in four minutes to the district team and they agree a next step on the spot.`,
      practice_task_md: `**Goal:** write a one page summary that leads with the answer.

1. Take any analysis you have done in this track, such as the stall sales SUMIF summary or the water survey.
2. Write a summary with four short parts: the answer, the evidence (two or three numbers), what it means, and caveats.
3. Keep it under 200 words and readable on a phone.
4. Read it aloud to a friend or family member with no data background, then ask them to repeat the main point.
5. Revise anything they misunderstood.

**Done looks like:** a one page summary, plus a note on what changed after your test reader, ready to share with a mentor.`,
      quiz: {
        questions: [
          {
            prompt: "What should come first in a short summary?",
            options: [
              "How you cleaned the data",
              "The answer",
              "A list of every chart",
              "The software you used",
            ],
            answer_index: 1,
            explanation: "Lead with the answer, then the evidence, then the recommendation.",
          },
          {
            prompt: "Why ask a friend with no data background to repeat your main point?",
            options: [
              "To check that your message is clear to non technical readers",
              "To get help with formulas",
              "So they can check your formulas and catch calculation mistakes",
              "Because they will approve the budget",
            ],
            answer_index: 0,
            explanation: "If they can repeat the point, your message is clear.",
          },
          {
            prompt: "Which belongs in the caveats part of a summary?",
            options: [
              "Extra charts that make your main finding look stronger",
              "The organisation's history",
              "The recommendation",
              "Honest limits, such as a small sample or missing data",
            ],
            answer_index: 3,
            explanation: "Caveats state the honest limits of the analysis.",
          },
          {
            prompt: "What should you do if the data cannot answer the question?",
            options: [
              "Guess an answer",
              "Say so and suggest what data would help",
              "Hide the problem",
              "Quietly answer an easier question the data can answer",
            ],
            answer_index: 1,
            explanation: "Honesty keeps your credibility.",
          },
        ],
        pass_threshold: 75,
      },
    },

    charts: {
      outcomes: [
        "Match the chart to the question",
        "Make charts readable on a small screen",
        "Avoid charts that mislead",
      ],
      explanation_md: `## Why this matters

A good chart lets a busy reader see the answer in seconds. A bad chart confuses them or, worse, misleads them. Visualisation is named in many analyst and M&E adverts, and your charts will often be the only part of a report a manager actually looks at.

## Match the chart to the question

* **Comparing categories** (sales by item, enrolment by school): use a **bar chart**. Horizontal bars work well on phones when category names are long.
* **Change over time** (monthly attendance, weekly sales): use a **line chart**, with time running left to right.
* **Part of a whole** (share of households by water source): a **bar chart** usually works better than a pie chart, because people compare lengths more accurately than angles. If you use a pie, keep it to a few slices.
* **Relationship between two numbers** (farm size and harvest): use a **scatter plot**, one dot per record.
* **Exact values** that people need to look up: use a **table**, not a chart.

## Make it readable on a small screen

Many of your readers will open your report on a phone.

* Write a title that states the finding, such as "Attendance falls on market days", not just "Attendance".
* Label axes with units, such as "Sales (GHS)".
* Use few colours. Highlight the one bar or line that matters and make the rest grey.
* Sort bars from largest to smallest unless there is a natural order like months.
* Remove clutter: heavy gridlines, 3D effects, shadows and legends you could replace with direct labels.

## Do not mislead

Charts can deceive even when every number is correct.

* **Cut off axes.** A bar chart whose vertical axis starts at 90 instead of 0 makes a tiny difference look huge. Bar charts should start at zero. Line charts can start elsewhere if you say so clearly.
* **Uneven time gaps.** Leaving out months makes trends look smoother or steeper than they are.
* **Cherry picking.** Showing only the weeks that support your point hides the full picture.
* **Too few cases.** A percentage based on four respondents should say so.

## Charts in Google Sheets

Select your data, then Insert and Chart. Google Sheets suggests a chart type; change it in the chart editor if it is not the right one. Under Customise, edit the title, axis titles and colours. Charts update automatically when the data changes.

## A worked example

Fuseini has invented monthly enrolment figures for a literacy programme in five communities near Wa. His first chart is a 3D pie with five colours and a title of "Enrolment". It is hard to read. He switches to a horizontal bar chart sorted from largest to smallest, colours the one community below target in orange and the rest grey, and titles it "Kpongu is the only community below its enrolment target". His manager understands it at a glance.

## Check before you share

Ask yourself: what is the one thing this chart should say? Would a reader see it in five seconds? Is anything exaggerated? If the answer to any of these worries you, simplify.`,
      practice_task_md: `**Goal:** turn a poor chart into a clear one.

1. In Google Sheets, create an invented table of monthly attendance (January to June) for three schools.
2. First, make a deliberately poor chart: a pie chart or a bar chart with the axis starting well above zero.
3. Then make a good chart: a line chart of attendance over time with a title that states the finding, labelled axes and one highlighted school.
4. Screenshot both and write two sentences on what you changed and why.

**Done looks like:** a before and after pair with your explanation, which makes a strong portfolio piece.`,
      quiz: {
        questions: [
          {
            prompt: "Which chart is best for showing monthly attendance over six months?",
            options: ["Pie chart", "Line chart", "Scatter plot", "A single number"],
            answer_index: 1,
            explanation: "Line charts show change over time.",
          },
          {
            prompt: "Why can a bar chart with an axis starting at 90 mislead?",
            options: [
              "It makes small differences look huge",
              "It hides the title",
              "It uses too many colours",
              "Bar charts cannot have axes",
            ],
            answer_index: 0,
            explanation: "Bar charts should start at zero so lengths are honest.",
          },
          {
            prompt: "Which title is best?",
            options: [
              "Attendance",
              "Chart 1",
              "Attendance falls on market days",
              "Data from the survey",
            ],
            answer_index: 2,
            explanation: "A good title states the finding.",
          },
          {
            prompt: "Why does the lesson suggest bars rather than a pie for parts of a whole?",
            options: [
              "Pies cannot show more than three parts on a small screen",
              "Bars use less data",
              "People compare lengths more accurately than angles",
              "Pies only work in Excel",
            ],
            answer_index: 2,
            explanation: "Lengths are easier to compare than angles.",
          },
        ],
        pass_threshold: 75,
      },
    },

    dashboards: {
      outcomes: [
        "Explain what a dashboard is for",
        "Plan a dashboard before you build it",
        "Build a small dashboard in Looker Studio",
      ],
      explanation_md: `## Why this matters

Managers check the same few numbers every week: sales, stock, attendance, households reached. Instead of sending a new report each time, an analyst can build a dashboard that updates from the data automatically. Dashboards and business intelligence (BI) tools such as Power BI, Tableau and Looker Studio appear in many analyst and M&E adverts, especially at banks, telcos and larger NGOs.

## What a dashboard is

A dashboard is a single page that shows key numbers and charts, connected to a data source so it refreshes when the data changes. A good one answers the regular questions of one audience without them needing to ask you.

## Free tools you can use

* **Looker Studio** is a free Google tool that runs in the browser. It connects easily to Google Sheets, so a sheet you already maintain can feed a dashboard. It works on a low spec laptop and you can view dashboards on a phone.
* **Power BI Desktop** is free from Microsoft but runs only on Windows. Power BI is named in several Ghanaian analyst and M&E adverts, so it is worth learning if you have access to a reasonably recent Windows laptop. Sharing dashboards with other people generally needs a paid licence, so practise on your own computer.
* **Tableau Public** is a free version of Tableau. Everything you save to it is public, so use only public or invented data.

The ideas transfer between tools, so start with whichever you can run.

## Plan before you build

Talk to the person who will use the dashboard. Ask what decisions they make and what they check each week. Then sketch the page on paper:

* **Top row:** three to five headline numbers, called scorecards or KPIs, such as total sales this month or households reached.
* **Middle:** one or two charts that explain the headline, such as a trend line.
* **Bottom or side:** filters, such as date range, district or product.

Fewer elements beat more. If something is not used to make a decision, leave it out.

## Building in Looker Studio

1. Keep your data tidy in Google Sheets: one row per record, clear headers, dates as dates.
2. In Looker Studio, create a blank report and add your sheet as a data source.
3. Add scorecards for your headline numbers.
4. Add a time series chart and a bar chart.
5. Add a date range control and a dropdown filter.
6. Share it with a view only link.

When the sheet changes, the dashboard updates the next time it refreshes.

## Keep it honest and usable

The chart rules from the previous lesson still apply: clear titles, labelled axes, honest scales. Show the date the data was last updated so nobody mistakes old figures for new ones. Check that the dashboard reads on a phone, since many managers will open it there.

## A worked example

Amina keeps an invented sheet of weekly seed distributions for an NGO in the North East Region. She builds a Looker Studio dashboard with three scorecards (farmers reached, bags distributed, communities covered), a weekly trend chart and a district filter. Her manager stops asking for weekly emails because the answer is always one link away.`,
      practice_task_md: `**Goal:** build a small dashboard from a Google Sheet.

1. Use a tidy sheet from an earlier lesson, such as your stall sales with lookups, or create about 30 invented rows with date, district, item and amount.
2. Open lookerstudio.google.com and create a blank report with your sheet as the data source.
3. Add three scorecards, one time series chart, one bar chart and a date range control.
4. Give each chart a title that states what it shows, and add a text box with the data's last update date.
5. Share a view only link and open it on your phone to check it reads well.

**Done looks like:** a working dashboard link you can add to your portfolio and show a mentor.`,
      quiz: {
        questions: [
          {
            prompt: "What makes a dashboard different from a one off report?",
            options: [
              "It is a fixed report emailed to managers at the end of every month",
              "It is always longer",
              "It has no charts",
              "It is connected to a data source and refreshes when the data changes",
            ],
            answer_index: 3,
            explanation: "Dashboards update from their data source.",
          },
          {
            prompt: "Which free tool connects easily to Google Sheets and runs in the browser?",
            options: ["Looker Studio", "Power BI Desktop", "Microsoft Access", "Notepad"],
            answer_index: 0,
            explanation: "Looker Studio is a free browser tool that connects to Google Sheets.",
          },
          {
            prompt: "What should you do before building a dashboard?",
            options: [
              "Add every chart you can think of, then remove the unused ones",
              "Ask the user what decisions they make and sketch the page",
              "Buy a paid licence",
              "Delete the raw data",
            ],
            answer_index: 1,
            explanation: "Planning around the user's decisions keeps the dashboard focused.",
          },
          {
            prompt: "Why show the date the data was last updated?",
            options: [
              "So nobody mistakes old figures for new ones",
              "Because Looker Studio requires it",
              "To make the dashboard colourful",
              "To hide missing data",
            ],
            answer_index: 0,
            explanation: "The update date tells readers how current the figures are.",
          },
        ],
        pass_threshold: 75,
      },
    },

    python: {
      outcomes: [
        "Explain where Python fits in data work",
        "Compare Python with SPSS, Stata and R",
        "Set up a Python notebook without a powerful computer",
      ],
      explanation_md: `## Why this matters

Spreadsheets slow down or freeze with very large files, and repeating the same twenty cleaning steps every month by hand is tiring and error prone. Python solves both problems. You write the steps once as code, then rerun them on next month's file in seconds. Python appears in a number of analyst adverts, especially at banks and remote employers, and it is a strong addition once your spreadsheet and SQL skills are solid.

## Where Python fits

Think of your tools as a ladder:

* **Spreadsheets** for small and medium data you can see and edit directly.
* **SQL** for pulling and summarising data that lives in databases.
* **Python** for large files, repeated tasks, combining many files and more advanced analysis.

You do not replace the earlier tools. Most analysts use all three, picking whichever fits the task.

## What about SPSS, Stata and R?

Many M&E and research adverts mention SPSS or Stata. These are statistics packages that are popular in research and public health, but they are paid software. R is a free language in the same family and is common in research. Python is free, widely used across industries and has excellent beginner resources, which is why this track teaches it. The habits you build in Python, such as writing steps as code, keeping data tidy and checking results, transfer directly if a job later asks you to use R, SPSS or Stata.

## No powerful computer needed

You do not need to install anything. **Google Colab** runs Python notebooks in your browser on Google's computers, for free, with a Google account. A notebook mixes code, results and written notes on one page, so your analysis explains itself. You can share a notebook with a link, which makes it perfect for a portfolio.

A laptop is more comfortable than a phone for writing code, but you can read and run notebooks on a phone in desktop mode. To save data, write and test on small files first.

## What this section covers

**Python basics in a notebook:** variables, lists, loops and functions, written in Colab.

**Working with tables in pandas:** loading a CSV file, filtering, grouping and cleaning, the same tasks you did in spreadsheets.

## How to learn it

Short daily practice works better than long weekend sessions. Aim for twenty to thirty minutes a day. Type the examples yourself rather than copying and pasting, because typing builds memory. When you get an error, read the last line of the message first; it usually tells you what went wrong. Searching the exact error message often finds an answer.

## A worked example

Sumaila prepares a monthly report from twelve invented district spreadsheets for an NGO in the Upper West Region. In a spreadsheet, he copies and pastes all twelve, fixes spellings and builds a pivot table, which takes most of a day. After learning pandas, he writes a short notebook that reads all twelve files, combines them, applies the same cleaning steps and produces the summary table. Next month he uploads the new files and runs the notebook. The report is ready in minutes, and every step is written down for his supervisor to check.`,
      practice_task_md: `**Goal:** set up your Python workspace and run your first notebook.

1. Open colab.research.google.com and sign in with a Google account.
2. Create a new notebook and rename it "Python practice".
3. In the first cell, type \`print("Hello from Tamale")\` (or your own town) and run it.
4. Add a text cell above it with a heading and one sentence on what this notebook is for.
5. In a new code cell, calculate the total of three invented daily sales, such as 120 + 95 + 140, and run it.
6. Share the notebook with a view link.

**Done looks like:** a shared Colab notebook with a text cell and two working code cells, ready for the next lessons.`,
      quiz: {
        questions: [
          {
            prompt: "When does the lesson say Python is especially useful?",
            options: [
              "For typing a single small list faster than a spreadsheet",
              "For large files and repeated tasks you can rerun",
              "For drawing logos",
              "Only for building websites",
            ],
            answer_index: 1,
            explanation: "Python handles large files and lets you rerun the same steps quickly.",
          },
          {
            prompt: "Which statement about SPSS, Stata and R is correct according to the lesson?",
            options: [
              "All three are free",
              "Stata is free, while SPSS and R are paid",
              "R is paid and SPSS is free",
              "SPSS and Stata are paid, while R is free",
            ],
            answer_index: 3,
            explanation: "SPSS and Stata are paid software, while R is free.",
          },
          {
            prompt: "What is Google Colab?",
            options: [
              "A paid statistics package you install on your laptop",
              "A free browser tool for Python notebooks",
              "A database",
              "A survey app",
            ],
            answer_index: 1,
            explanation: "Colab runs Python notebooks in your browser on Google's computers.",
          },
          {
            prompt: "When you get an error, what should you read first?",
            options: [
              "The first line of the error message",
              "The notebook title",
              "The last line of the error message",
              "Nothing; restart the computer",
            ],
            answer_index: 2,
            explanation: "The last line usually says what went wrong.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "python-basics": {
      outcomes: [
        "Use variables, lists and dictionaries in a notebook",
        "Write loops, conditions and functions",
        "Build a daily practice habit",
      ],
      explanation_md: `## Why this matters

Before you can analyse tables with pandas, you need a few core Python ideas. They are the same ideas you used in spreadsheets, written as code: values, lists of values, repeating a step and reusing a calculation. Employers who test Python usually start here.

## Notebooks

In Google Colab, a notebook is made of cells. **Code cells** run Python and show the result underneath. **Text cells** hold notes and headings. Run a cell with the play button or Shift and Enter. Cells share memory, so a value created in one cell can be used in the next. If things get confusing, open the Runtime menu and choose Restart session and run all, which clears memory and runs every cell from the top.

## Variables and types

A variable is a name that stores a value:

\`\`\`python
town = "Bolgatanga"
pupils = 42
fee = 12.5
\`\`\`

Text is a **string** (in quotes), whole numbers are **integers** and decimals are **floats**. \`type(pupils)\` tells you the type. Mixing them causes errors: "42" in quotes is text and cannot be added to a number until you convert it with \`int("42")\`.

## Lists

A list holds several values in order:

\`\`\`python
sales = [120, 95, 140, 110]
sum(sales) / len(sales)
\`\`\`

This gives the average of the four sales. Lists start counting at zero, so \`sales[0]\` is 120.

## Dictionaries

A dictionary stores pairs of keys and values, like a small lookup table:

\`\`\`python
prices = {"rice": 90, "oil": 95}
prices["oil"]
\`\`\`

## Loops and conditions

A for loop repeats a step for each item. An if statement makes a decision:

\`\`\`python
for s in sales:
    if s >= 120:
        print(s, "good day")
\`\`\`

Indentation (the spaces at the start of a line) matters in Python. It shows which lines belong inside the loop or the if.

## Functions

A function packages a calculation so you can reuse it:

\`\`\`python
def to_pesewas(cedis):
    return round(cedis * 100)
\`\`\`

Now \`to_pesewas(12.5)\` returns 1250. Python also has many built in functions, such as \`len\`, \`sum\`, \`max\` and \`round\`.

## A worked example

Mariama has an invented list of daily attendance counts for a school in Nalerigu over two weeks. She stores them in a list, calculates the average with sum and len, uses a loop to print the days below 30, and writes a small function that turns a count into a percentage of the 40 enrolled pupils. Ten lines of code replace a page of manual sums, and she can reuse them next term.

## Practice habits

Write short code cells and run them often. Add a text cell explaining each step in plain English. When something breaks, check spelling, quotes, brackets and indentation first.`,
      practice_task_md: `**Goal:** use variables, lists, a loop and a function in a notebook.

1. Open your "Python practice" notebook in Colab.
2. Create a list of 10 invented daily sales for a stall in your town.
3. Calculate the total, the average and the largest value using sum, len and max.
4. Write a loop that prints each day's number and the word "high" if the sale is above the average.
5. Write a function \`with_levy(amount)\` that adds a 5 percent charge and test it on two values.
6. Add a text cell above each code cell explaining what it does.

**Done looks like:** a notebook with working, explained code you can share as a link with a mentor.`,
      quiz: {
        questions: [
          {
            prompt: "In sales = [120, 95, 140, 110], what is sales[0]?",
            options: ["95", "120", "110", "0"],
            answer_index: 1,
            explanation: "Python lists start counting at zero, so the first item is sales[0].",
          },
          {
            prompt: "Why does \"42\" + 8 cause an error in Python?",
            options: [
              "42 is too big",
              "Python needs a space between the plus sign and the numbers",
              "Python cannot add",
              "\"42\" in quotes is text, not a number",
            ],
            answer_index: 3,
            explanation: "A string must be converted with int() before adding it to a number.",
          },
          {
            prompt: "What does indentation do in a Python loop?",
            options: [
              "Nothing; it is only for looks",
              "Shows which lines belong inside the loop",
              "Makes the code run faster",
              "Turns code into a comment",
            ],
            answer_index: 1,
            explanation: "Indentation marks which lines are inside the loop or if.",
          },
          {
            prompt: "What is a function for?",
            options: [
              "Packaging a calculation so you can reuse it",
              "Storing a single number",
              "Deleting a notebook",
              "Connecting to the internet",
            ],
            answer_index: 0,
            explanation: "Functions let you reuse a calculation with different inputs.",
          },
        ],
        pass_threshold: 75,
      },
    },

    pandas: {
      outcomes: [
        "Load, select and filter tables in pandas",
        "Summarise and clean data",
        "Join tables and save results",
      ],
      explanation_md: `## Why this matters

pandas is the Python library analysts use for tables. It does what you already do in spreadsheets, such as filtering, sorting, cleaning, lookups and pivot tables, but on bigger files and as repeatable steps. If an advert mentions Python for data analysis, it almost always means pandas.

## Loading data

In Colab, upload a CSV file using the files panel on the left, then:

\`\`\`python
import pandas as pd
df = pd.read_csv("survey.csv")
df.head()
\`\`\`

A table in pandas is called a **DataFrame**, usually named df. \`df.head()\` shows the first five rows. \`df.shape\` gives rows and columns, and \`df.info()\` lists each column's type and how many values are missing. Always run these first, just as you would scan a sheet before analysing it.

## Selecting and filtering

\`\`\`python
df["community"]
df[df["hh_size"] > 10]
\`\`\`

The first line selects one column. The second keeps only households with more than ten members. Combine conditions with & (and) and | (or), each condition in brackets.

## Summarising

\`df["community"].value_counts()\` counts records per community. To total a column by group, like a pivot table:

\`\`\`python
df.groupby("community")["spend_ghs"].mean()
\`\`\`

This gives the average spend per community. Swap mean for sum, count, min or max as needed.

## Cleaning

The cleaning ideas from earlier carry over:

* \`df.isna().sum()\` counts missing values per column.
* \`df.drop_duplicates()\` removes repeated rows.
* \`df["community"].str.strip().str.title()\` removes extra spaces and fixes capitals.
* \`pd.to_numeric(df["spend_ghs"], errors="coerce")\` turns text into numbers, making unreadable values missing so you can inspect them.

Save the result to a new variable or file, keeping the raw data untouched, just as you kept the raw sheet.

## Joining and saving

\`pd.merge(sales, prices, on="code")\` joins two tables on a shared column, like XLOOKUP or SQL JOIN. When you finish, \`df.to_csv("clean.csv", index=False)\` saves a file you can open in Google Sheets or feed to a dashboard.

## A worked example

Issahaku downloads an invented KoboToolbox export from a water survey in five communities near Savelugu. In a notebook he loads it, checks shape and missing values, strips and fixes community spellings, drops two duplicates, converts minutes to numbers, and groups by community to get average walking time. He adds a text cell above each step. The notebook becomes both his analysis and his cleaning log, and he reruns it unchanged when the next round of data arrives.

## Spreadsheet first, then pandas

If any idea here feels strange, do it in Google Sheets first, then repeat it in pandas. Seeing the same result both ways is the fastest way to understand what the code does.`,
      practice_task_md: `**Goal:** redo a spreadsheet analysis in pandas.

1. Download your cleaned survey or stall sales sheet from Google Sheets as a CSV file (File, then Download, then CSV).
2. In Colab, upload it and load it with pd.read_csv.
3. Run head, shape and info, and write one sentence about what you see.
4. Count missing values, remove duplicates and fix one text column with str.strip and str.title.
5. Use groupby to reproduce one summary you previously built with SUMIF or a pivot table, and check the numbers match.
6. Save the result with to_csv.

**Done looks like:** a shared notebook with text cells explaining each step and a summary that matches your spreadsheet.`,
      quiz: {
        questions: [
          {
            prompt: "What is a DataFrame in pandas?",
            options: ["A chart", "A table of data", "A database server", "A survey form"],
            answer_index: 1,
            explanation: "pandas calls a table a DataFrame.",
          },
          {
            prompt: "Which code gives the average spend per community?",
            options: [
              "df.head()",
              "df.groupby(\"spend_ghs\")[\"community\"].mean()",
              "df.shape",
              "df.groupby(\"community\")[\"spend_ghs\"].mean()",
            ],
            answer_index: 3,
            explanation: "groupby with mean summarises by group, like a pivot table.",
          },
          {
            prompt: "What does df.isna().sum() show?",
            options: [
              "The number of rows that have no missing values",
              "The first five rows",
              "The number of missing values in each column",
              "Duplicate rows",
            ],
            answer_index: 2,
            explanation: "isna marks missing values and sum counts them per column.",
          },
          {
            prompt: "Which pandas function joins two tables on a shared column?",
            options: ["pd.merge", "pd.read_csv", "df.head", "df.to_csv"],
            answer_index: 0,
            explanation: "pd.merge joins tables, like XLOOKUP or SQL JOIN.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "getting-hired": {
      outcomes: [
        "Name the many doors into data work",
        "Build evidence and experience while you learn",
        "Map your route into data work",
      ],
      explanation_md: `## Why this matters

Skills only turn into income when someone can see them. Employers hiring junior data staff in Ghana, whether an NGO in Tamale, a bank in Accra or a remote company, want evidence that you can take real data and find a useful answer. Certificates help a little; a clear piece of work you can show and explain helps much more. This section helps you build that evidence and find the right first door.

## Many doors into data work

The title "data analyst" is only one way in. Look at adverts and you will see data skills asked for in:

* **Data entry and data clerk roles**, where accuracy and spreadsheets matter most.
* **Enumerator and field data collector roles** on surveys, often short contracts with NGOs and research organisations.
* **M&E assistant and M&E officer roles** at NGOs and development projects.
* **Research assistant roles** at research organisations and universities.
* **Reporting, MIS and business intelligence roles** at banks, telcos, microfinance companies and distributors.
* **Remote junior analyst roles**, which usually expect SQL and a BI tool.

Many senior M&E and analyst adverts ask for several years of experience. That is normal. The way in is often through an assistant role, national service posting, internship, volunteer placement or short field contract, which then becomes the experience the next advert asks for.

## What evidence looks like

* **A small portfolio** of two or three case studies that show a question, the data, your method and your answer.
* **Working links**: a Looker Studio dashboard, a shared Colab notebook, a Google Sheet with clear formulas.
* **References** from someone who has seen you work with data, such as a supervisor, a mentor or a small business you helped.
* **A short CV** that lists tools and what you did with them, not just course names.

## Build experience while you learn

You do not have to wait for a job to get real experience. Offer to tidy a church treasurer's records, build a stock sheet for a shop, or help a community group analyse a short survey. Agree what you will deliver, keep personal data safe, and ask permission before using any of it in your portfolio. Short paid projects for local businesses are possible too; agree the scope and price in cedis in writing first.

## Stay safe

Genuine employers do not ask you to pay for an interview, training or a job offer. Check that an organisation is real before sharing personal documents, and be careful with remote offers that seem too good to be true.

## What this section covers

**A portfolio of case studies:** building and sharing two or three strong pieces of work, ideally using Ghanaian public data.

**Job search and practical tests:** finding openings, tailoring applications and preparing for spreadsheet and SQL tests.

## A worked example

Hawa finishes this track while doing national service at a district office near Bolgatanga. She offers to clean the office's attendance records and builds a simple dashboard. With permission she writes it up, with names removed, as a portfolio case study. When an NGO advertises an M&E assistant role, she sends a link to that dashboard along with her CV.`,
      practice_task_md: `**Goal:** map your route into data work.

1. Search two Ghanaian job boards or NGO career pages for roles that mention Excel, data, M&E or reporting. Note five adverts (title, employer type, location).
2. For each, list the skills mentioned and mark which you already have evidence for.
3. Pick the two skills that appear most often where you lack evidence.
4. Write down one small real project you could do in the next month to build evidence for those skills, such as helping a local group with their records.

**Done looks like:** a short table of five adverts, your skills gaps and a one month evidence plan to discuss with a mentor.`,
      quiz: {
        questions: [
          {
            prompt: "According to the lesson, what helps most when applying for a junior data role?",
            options: [
              "A long list of online course certificates, even without projects",
              "A clear piece of work you can show and explain",
              "A large social media following",
              "Paying an agent",
            ],
            answer_index: 1,
            explanation: "Evidence of real work matters more than certificates alone.",
          },
          {
            prompt: "Many M&E adverts ask for several years of experience. What does the lesson suggest?",
            options: [
              "Give up on M&E",
              "Wait until you have several years of experience before applying",
              "Invent experience on your CV",
              "Enter through assistant roles, national service or internships",
            ],
            answer_index: 3,
            explanation: "These routes build the experience later adverts ask for.",
          },
          {
            prompt: "What should you do before using a local project in your portfolio?",
            options: [
              "Nothing, it is your work",
              "Ask permission and remove personal data",
              "Post the raw data online",
              "Change the numbers to look better",
            ],
            answer_index: 1,
            explanation: "Ask permission and keep personal data safe.",
          },
          {
            prompt: "An employer asks you to pay before an interview. What does the lesson say?",
            options: [
              "That is normal for jobs with NGOs and international donors",
              "Genuine employers do not ask you to pay for an interview",
              "Pay only half",
              "Pay if the job is remote",
            ],
            answer_index: 1,
            explanation: "Requests for payment are a warning sign.",
          },
        ],
        pass_threshold: 75,
      },
    },

    portfolio: {
      outcomes: [
        "Explain what a case study contains",
        "Find data for your projects",
        "Publish a balanced set of case studies",
      ],
      explanation_md: `## Why this matters

A portfolio shows an employer what you can do before they meet you. For data roles, two or three clear case studies are usually more convincing than a long list of courses. Using Ghanaian data makes your work instantly relevant to local employers, and shows you understand the context they work in.

## What a case study contains

Each case study should answer five things, in this order:

1. **The question.** One sentence, such as "Which regions saw the biggest change in school enrolment between two census years?"
2. **The data.** Where it came from, what it covers and its limits.
3. **The method.** What you cleaned, which tools you used, and how you calculated your results.
4. **The findings.** Two or three key results with one or two clear charts.
5. **What it means.** A short recommendation or next question, plus honest caveats.

Keep each one short enough to read on a phone in a few minutes.

## Finding data

* **Ghana Statistical Service** (statsghana.gov.gh) publishes census and survey reports and tables. Choose a table, copy it into Google Sheets, tidy it and analyse it.
* **Kaggle Datasets** host many public datasets, some about Ghana and West Africa. Check the source and licence before using one.
* **Your own survey.** A short KoboToolbox survey of friends or classmates, with consent and no personal data, makes a great case study because you control every step.
* **Invented data**, clearly labelled as invented, is fine for demonstrating a technique such as a dashboard. Never present invented numbers as real.

Always credit your source and say when you downloaded the data.

## A balanced set of three

Aim for variety so employers see a range of skills:

* **A spreadsheet case study:** cleaning, lookups and a pivot table on public data.
* **A field data case study:** a small survey you designed, built in KoboToolbox, cleaned and summarised, perhaps with indicators.
* **A SQL or Python case study:** the same kind of question answered with code, plus a Looker Studio dashboard.

If you are aiming at M&E roles, make one case study look like a short progress report with indicators, baselines and targets.

## Where to put it

You do not need a website. Options you can set up from a phone or a computer:

* A Google Doc or Google Site with links to your sheets, notebooks and dashboards.
* A GitHub repository with a README for each project, which also shows employers you can use a common tool.
* Shared Colab notebooks and Looker Studio links set to view only.

Test every link on a phone, logged out, to make sure it opens for a stranger.

## A worked example

Abdul-Rahman builds three case studies. The first uses a Ghana Statistical Service table on household access to drinking water to compare regions, with clear charts. The second is a ten question survey of young people in Tamale about mobile money use, built in KoboToolbox with consent. The third repeats the first analysis in pandas and adds a dashboard. He puts all three in one Google Doc and adds the link to his CV.`,
      practice_task_md: `**Goal:** publish your first complete case study.

1. Choose a question you can answer with a Ghana Statistical Service table, a Kaggle dataset or your own small survey.
2. Download or copy the data into Google Sheets and keep a raw copy.
3. Clean it, analyse it with formulas or a pivot table, and make one or two clear charts.
4. Write it up in a Google Doc using the five parts: question, data, method, findings, what it means.
5. Set sharing to "anyone with the link can view" and test the link on a phone while logged out.

**Done looks like:** one shareable case study link you can send to a mentor for feedback and add to your CV.`,
      quiz: {
        questions: [
          {
            prompt: "What should come first in a case study?",
            options: ["The charts", "The question", "Your CV", "The software list"],
            answer_index: 1,
            explanation: "A case study starts with a one sentence question.",
          },
          {
            prompt: "When is invented data acceptable in a portfolio?",
            options: [
              "Never",
              "When presented as real figures from the Ghana Statistical Service",
              "When it makes the results look better",
              "When labelled as invented and used to show a technique",
            ],
            answer_index: 3,
            explanation: "Invented data must be labelled and never presented as real.",
          },
          {
            prompt: "Why test portfolio links on a phone while logged out?",
            options: [
              "To make sure a stranger can open them",
              "To save data",
              "Because logged in links are faster",
              "To delete old versions",
            ],
            answer_index: 0,
            explanation: "Employers will open your links without your login.",
          },
          {
            prompt: "Which source does the lesson suggest for official Ghanaian census and survey tables?",
            options: [
              "Ghana Statistical Service",
              "A random social media post",
              "A friend's guess",
              "An unlabelled spreadsheet",
            ],
            answer_index: 0,
            explanation: "The Ghana Statistical Service publishes census and survey reports and tables.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "job-search": {
      outcomes: [
        "Read an advert like an analyst",
        "Tailor your application",
        "Prepare for practical tests and interviews",
      ],
      explanation_md: `## Why this matters

Good skills still need a good search. Data work in Ghana is spread across many job titles and many kinds of employer, and the best openings are not always on the biggest job boards. A focused search, tailored applications and preparation for practical tests make a real difference.

## Where to look

* **Job boards** such as Jobberman and GhanaJob list analyst, data entry, M&E and reporting roles. Set up alerts for words like data, M&E, MEAL, reporting and Excel, not just "data analyst".
* **NGO and research career pages.** Many international and local NGOs in Tamale, Bolgatanga and Wa post M&E and enumerator roles on their own websites and on NGO job sites.
* **Government programmes** sometimes recruit data assistants and enumerators for surveys and registries.
* **Remote job boards** list junior analyst roles open to applicants in Africa. Read the location rules carefully.
* **Your network.** Mentors, lecturers, former supervisors and WhatsApp groups often hear about short contracts first.

## Read the advert like an analyst

Before applying, list the skills the advert asks for and match each to evidence you have. Lead with the matches. If an advert asks for SPSS or Stata and you know Python or R, say so honestly and show that you can learn new tools. Many adverts list wishes, not strict rules; if you meet most of the core requirements, apply.

## Tailor your application

* **CV:** one or two pages. Put a short skills line near the top (Google Sheets, pivot tables, KoboToolbox, SQL, Looker Studio). Under each experience, write what you did and the result, such as "Cleaned and analysed survey data from 120 households for a community water project".
* **Cover letter or email:** three short paragraphs. Why this role, what evidence you bring, and a link to your portfolio.
* **Follow instructions exactly.** If the advert asks for a subject line or a PDF, do it. It is the first test of attention to detail.

## Practical tests

Many employers give a short test: clean a messy sheet, build a pivot table, write a few SQL queries or summarise survey results in a paragraph. Prepare by practising against the clock:

* Take a messy dataset and give yourself 45 minutes to clean it, summarise it and write three findings.
* Redo the SQLBolt exercises without looking at hints.
* Practise explaining your steps aloud, because interviewers often ask why you did something.

In the test itself, read all the questions first, check your results, and write down any assumptions you made.

## Interviews

Expect questions like: tell us about a time you found an error in data; how would you check the quality of field data; explain a chart to someone with no data background. Answer with real examples from your portfolio. Prepare one or two questions of your own about how the team uses data.

## A worked example

Fuseini sets alerts for M&E and data roles in the Northern Region. He tailors his CV for an enumerator role on an agricultural survey, highlighting his KoboToolbox case study and Dagbani skills. After the contract he applies for a data assistant role, now able to describe real field experience, and passes the spreadsheet test because he practised against the clock.`,
      practice_task_md: `**Goal:** prepare a tailored application and a timed test run.

1. Find one current advert for a data entry, M&E assistant, enumerator or junior analyst role.
2. List its required skills and match each to evidence in your portfolio.
3. Tailor a one page CV with a skills line and two achievement bullets that match the advert.
4. Write a three paragraph cover email with your portfolio link.
5. Do a 45 minute timed test on yourself: clean a messy sheet, build a pivot table and write three findings.

**Done looks like:** a tailored CV, a cover email and your timed test file, ready for a mentor to review.`,
      quiz: {
        questions: [
          {
            prompt: "Which job alert keywords does the lesson recommend?",
            options: [
              "Only \"data analyst\"",
              "Words like data, M&E, MEAL, reporting and Excel",
              "Only \"manager\"",
              "Only \"remote\"",
            ],
            answer_index: 1,
            explanation: "Data skills are asked for under many job titles.",
          },
          {
            prompt: "An advert asks for SPSS and you know Python. What should you do?",
            options: [
              "Claim you know SPSS",
              "Say Python and SPSS are the same, so you already know it",
              "Never apply",
              "Be honest about what you know and show you can learn",
            ],
            answer_index: 3,
            explanation: "Be honest and show transferable skills.",
          },
          {
            prompt: "How does the lesson suggest preparing for a practical test?",
            options: [
              "Practise cleaning and summarising data against the clock",
              "Memorise the employer's history and its latest annual report",
              "Avoid practising so you stay fresh",
              "Only read about SQL",
            ],
            answer_index: 0,
            explanation: "Timed practice builds speed and confidence.",
          },
          {
            prompt: "Why follow application instructions exactly, such as the subject line?",
            options: [
              "It is the first test of attention to detail",
              "It helps the email get past spam filters automatically",
              "Employers never read them",
              "It is required by law",
            ],
            answer_index: 0,
            explanation: "Following instructions shows the care data work needs.",
          },
        ],
        pass_threshold: 75,
      },
    },
  },
};

export default content;
