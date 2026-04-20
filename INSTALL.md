# CFA Level 1 Scheduler — Obsidian Plugin

## What This Does

A fully integrated Obsidian plugin for tracking your CFA Level 1 study progress. Built specifically around your Kaplan/IFT action plan spreadsheets.

**Features:**
- 📊 **Dashboard** — Overall progress, weekly goal meter, subject breakdown, daily log
- 📅 **Week View** — See what you studied each day, color-coded by subject
- 🗓 **Month View** — Calendar overview of study activity
- ✅ **Module Checkboxes** — Tick off Reading / Kaplan Lecture / QB Kaplan per reading
- ⚠️ **Revision Alerts** — Any reading not revisited in 14+ days gets flagged automatically
- 📝 **Daily Log** — Log what you studied today, tagged to specific readings
- 📄 **Auto-generated Notes** — Creates linked `.md` files for all 93 readings, organized by subject

---

## Installation

### Step 1 — Copy the plugin folder

1. In your Obsidian vault, navigate to the hidden `.obsidian` folder
2. Open (or create) the `plugins` folder: `.obsidian/plugins/`
3. Copy the entire `cfa-scheduler` folder into `.obsidian/plugins/`

Your structure should look like:
```
YourVault/
└── .obsidian/
    └── plugins/
        └── cfa-scheduler/
            ├── main.js
            ├── manifest.json
            └── styles.css (optional)
```

### Step 2 — Enable the plugin

1. Open Obsidian → **Settings** (⚙️)
2. Go to **Community Plugins**
3. Turn off **Safe Mode** if prompted
4. Find **CFA Level 1 Scheduler** in your installed plugins list
5. Toggle it **ON**

### Step 3 — Open the Dashboard

- Click the **📖 book icon** in the left ribbon, OR
- Use `Ctrl+P` → search **"Open CFA Dashboard"**

---

## First-Time Setup

### Generate Your Reading Notes

1. In the Dashboard, click **⚡ Generate Notes** (top right of nav bar)
2. This creates `CFA Level 1/[Subject]/Reading XX - Title.md` for all 93 readings
3. Each note has: module checklist, resource checklist, key concepts section, formulas section, revision notes

### Set Your Weekly Goal

- On the Dashboard, find the **Weekly Goal** card
- Change the target number (default: 3 readings/week) to your preference

---

## How to Use Daily

### 1. Log what you studied today
- On the Dashboard, scroll down to **"Today's Log"**
- Tap the reading tags to mark which readings you worked on today
- Add any notes in the text box
- Hit **Save Log**

### 2. Check off modules
- Click any subject → click any reading → tick the module checkboxes
- Tick the resource chips (Reading / Kaplan Lecture / QB Kaplan)
- A reading auto-marks "Completed" when all modules are checked

### 3. Track revisions
- Any completed reading not revisited in **14 days** gets a ⚠️ alert on the Dashboard
- Click **"Mark Revised"** after you've done a revision session
- Revision count and date are tracked per reading

### 4. Open reading notes
- From any reading detail view, click **"📄 Open Note"**
- This opens the linked Obsidian markdown note where you can add full notes, formulas, practice Q mistakes

---

## Views Explained

| View | What it shows |
|------|--------------|
| Dashboard | Overall %, weekly goal meter, revision alerts, subject bars, daily log |
| Week | 7-day grid showing readings logged each day, colored by subject |
| Month | Calendar view with dots showing study activity |
| Subject | All readings for one subject with completion status |
| Reading | Module checklist, resource chips, notes, revision button |

---

## Data Storage

All progress is saved in `.obsidian/plugins/cfa-scheduler/data.json` — this is local to your vault and syncs with any Obsidian sync you use (iCloud, Obsidian Sync, etc).

---

## Subjects Covered

| Code | Subject | Readings |
|------|---------|---------|
| QA | Quantitative Methods | R1–R11 |
| EC | Economics | R12–R19 |
| FSA | Financial Statement Analysis | R27–R38 |
| CI | Corporate Issuers | R20–R26 |
| EI | Equity Investments | R39–R46 |
| FI | Fixed Income | R47–R65 |
| DV | Derivatives | R66–R75 |
| AI | Alternative Investments | R76–R82 |
| PM | Portfolio Management | R83–R88 |
| EPS | Ethical & Professional Standards | R89–R93 |

**Total: 93 readings across 10 subjects · Exam: 11 November 2026**
