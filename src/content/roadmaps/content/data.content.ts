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

Mariama runs a provisions shop in Savelugu and keeps a notebook of daily sales. She asks you to "look at the numbers". You ask what worries her. She says she thinks she is running out of rice too often. Now the question is clear: "On how many days last month did the shop run out of rice, and on which days of the week?" You copy one month of notebook entries into a spreadsheet, count the stock out days and find most fall on Mondays, after the weekend rush. Mariama decides to restock on Saturdays. That is real analysis, done with a notebook, a phone and a clear question.

## What you need

You can do everything in this section with free tools: a notebook, Google Sheets in a phone browser or app, and curiosity. Keep a learning journal of the questions you practise. It becomes the start of your portfolio.`,
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
              "Ask questions until you can turn the concern into a specific, measurable question",
              "Start learning Python so you can analyse the sales",
              "Calculate the average sale for the whole year",
            ],
            answer_index: 1,
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
              "A different sheet for every day",
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

If two things rise together, one did not necessarily cause the other. Ice water sales and malaria cases may both rise in the rainy season, yet neither causes the other. Look for a third factor before claiming a cause.

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
            options: ["The mean, 256", "The median, 100", "The largest value, 900", "The total, 1,280"],
            answer_index: 1,
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
              "The sample is too large",
              "It leaves out remote communities that may face different conditions",
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
              "Running out of storage",
              "Spelling drift such as P, present and Present meaning the same thing",
              "Other people seeing the sheet",
              "Slow internet",
            ],
            answer_index: 1,
            explanation: "Choosing from a list keeps entries consistent.",
          },
        ],
        pass_threshold: 75,
      },
    },

    spreadsheets: {
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

## Working on a phone

The Google Sheets app works well for entering data and checking results. For longer formula work, the browser version in desktop mode gives you more room. Turn your phone sideways, freeze the first row, and zoom in when typing formulas. Sheets saves as you go, so a dropped connection rarely loses work, and you can turn on offline mode for files you use often.

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
              "The skills in this section work the same way, so your practice transfers",
              "You must buy Excel before applying",
              "Only databases matter for that job",
            ],
            answer_index: 1,
            explanation: "The lesson says Excel works the same way for these skills, so Google Sheets practice counts.",
          },
          {
            prompt: "What makes formulas useful in a spreadsheet?",
            options: [
              "They make the text bold",
              "They update automatically when the numbers they use change",
              "They stop other people editing",
              "They only work on phones",
            ],
            answer_index: 1,
            explanation: "Formulas recalculate when their inputs change, so totals stay correct.",
          },
          {
            prompt: "Which tool summarises thousands of rows into a small table in seconds?",
            options: ["A pivot table", "Bold formatting", "Freezing the header row", "A dropdown list"],
            answer_index: 0,
            explanation: "Pivot tables summarise large tables quickly.",
          },
          {
            prompt: "Which tip helps when working on a phone?",
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
              "Counts rows that meet a condition",
              "Finds the middle value",
              "Joins two tables",
            ],
            answer_index: 1,
            explanation: "COUNTIF counts the cells in a range that meet a condition.",
          },
          {
            prompt: "Why would you write $G$1 instead of G1 in a formula you copy down?",
            options: [
              "To make the number a currency",
              "To keep the reference fixed on G1 in every row",
              "To hide the cell",
              "To round the result",
            ],
            answer_index: 1,
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
3. In Sales, use XLOOKUP to bring in the item name and price, then calculate total_ghs.
4. Add a dropdown on the code column that only allows your four codes.
5. Build a pivot table with item in Rows, month in Columns and the sum of total_ghs in Values.

**Done looks like:** working lookups, a dropdown that rejects bad codes, and a pivot table you can screenshot and explain to a mentor in two sentences.`,
      quiz: {
        questions: [
          {
            prompt: "What does =XLOOKUP(B2, Prices!A:A, Prices!C:C) do?",
            options: [
              "Adds column C of Prices",
              "Finds B2 in column A of Prices and returns the matching value from column C",
              "Sorts the Prices sheet",
              "Counts how many codes match B2",
            ],
            answer_index: 1,
            explanation: "XLOOKUP searches one range and returns the matching value from another.",
          },
          {
            prompt: "Why should you include FALSE at the end of a VLOOKUP?",
            options: [
              "It makes the formula run faster",
              "It forces an exact match so you do not get wrong values silently",
              "It hides errors",
              "It turns the result into text",
            ],
            answer_index: 1,
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

A smartphone, a free KoboToolbox or ODK account, Google Sheets and a little data for uploading forms. You can practise every step with a friend or family member as a test respondent.`,
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
              "Offline data is more accurate by law",
              "Communities may have weak network, so forms upload later when there is signal",
              "Phones cannot run forms online",
              "It hides data from managers",
            ],
            answer_index: 1,
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
              "Shared the file on social media",
              "Replaced names with household IDs",
              "Deleted all the data",
              "Asked for phone numbers twice",
            ],
            answer_index: 1,
            explanation: "Replacing names with IDs reduces the risk of identifying people.",
          },
        ],
        pass_threshold: 75,
      },
    },

    "survey-design": {
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
              "Each subgroup, such as each community, is included",
              "Everyone in the country is surveyed",
              "No questions are translated",
            ],
            answer_index: 1,
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

    // NEXT
  },
};

export default content;
