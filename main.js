/*
 * CFA Level 1 Scheduler Plugin for Obsidian
 * ==========================================
 * Features:
 *  - Dashboard with weekly goal meter
 *  - Day / Week / Month views
 *  - Check off modules (Reading, Kaplan Lecture, QB Kaplan)
 *  - Revision alerts for topics studied >2 weeks ago
 *  - Daily log ("what I did today")
 *  - Auto-generates linked Obsidian notes per Reading
 *  - Progress persisted in plugin data.json
 */

const { Plugin, PluginSettingTab, Setting, ItemView, WorkspaceLeaf, Modal, Notice, MarkdownView, TFile } = require('obsidian');

// ─── SYLLABUS DATA ────────────────────────────────────────────────────────────
const EXAM_DATE = "2026-11-11";

const SUBJECTS = [
  { id:"QA",  name:"Quantitative Methods",            totalModules:11, color:"#4F86C6" },
  { id:"EC",  name:"Economics",                        totalModules:8,  color:"#E07B54" },
  { id:"FSA", name:"Financial Statement Analysis",     totalModules:12, color:"#5BA87A" },
  { id:"CI",  name:"Corporate Issuers",                totalModules:7,  color:"#9B6B9B" },
  { id:"EI",  name:"Equity Investments",               totalModules:8,  color:"#D4A843" },
  { id:"FI",  name:"Fixed Income",                     totalModules:19, color:"#5B8FA8" },
  { id:"DV",  name:"Derivatives",                      totalModules:10, color:"#C96A4A" },
  { id:"AI",  name:"Alternative Investments",          totalModules:7,  color:"#7A9E7E" },
  { id:"PM",  name:"Portfolio Management",             totalModules:6,  color:"#A0748A" },
  { id:"EPS", name:"Ethical and Professional Standards",totalModules:5, color:"#B07D62" },
];

// Full reading list – each reading has modules & resource checkboxes
const READINGS = [
  // QA
  { id:"R1",  subject:"QA", number:1,  title:"Rates and Returns", modules:["Module 1.1: Interest Rates and Return Measurement","Module 1.2: Time-Weighted and Money-Weighted Returns","Module 1.3: Common Measures of Return","Q/B Kaplan","Q/B EOC/IFT Quiz"], resources:["IFT Lectures","IFT Quizzes","Kaplan Reading","Kaplan Module Quizzes"] },
  { id:"R2",  subject:"QA", number:2,  title:"The Time Value of Money in Finance", modules:["Module 2.1: Discounted Cash Flow Valuation","Module 2.2: Implied Returns and Cash Flow Additivity","Q/B Kaplan","Q/B EOC/IFT Quiz"], resources:["IFT Lectures","IFT Quizzes","Kaplan Reading","Kaplan Module Quizzes"] },
  { id:"R3",  subject:"QA", number:3,  title:"Statistical Measures of Asset Returns", modules:["Module 3.1: Central Tendency and Dispersion","Module 3.2: Skewness, Kurtosis, and Correlation","Q/B Kaplan","Q/B EOC"], resources:["IFT Lectures","IFT Quizzes","Kaplan Reading","Kaplan Module Quizzes"] },
  { id:"R4",  subject:"QA", number:4,  title:"Probability Trees and Conditional Expectations", modules:["Module 4.1: Probability Models, Expected Values, and Bayes' Formula","Q/B Kaplan","Q/B EOC"], resources:["IFT Lectures","IFT Quizzes","Kaplan Reading","Kaplan Module Quizzes"] },
  { id:"R5",  subject:"QA", number:5,  title:"Portfolio Mathematics", modules:["Module 5.1: Probability Models for Portfolio Return and Risk","Q/B Kaplan","Q/B EOC"], resources:["IFT Lectures","IFT Quizzes","Kaplan Reading","Kaplan Module Quizzes"] },
  { id:"R6",  subject:"QA", number:6,  title:"Simulation Methods", modules:["Module 6.1: Lognormal Distributions and Simulation Techniques","Q/B Kaplan","Q/B EOC"], resources:["IFT Lectures","IFT Quizzes","Kaplan Reading","Kaplan Module Quizzes"] },
  { id:"R7",  subject:"QA", number:7,  title:"Estimation and Inference", modules:["Module 7.1: Sampling Techniques and the Central Limit Theorem","Q/B Kaplan","Q/B EOC"], resources:["IFT Lectures","IFT Quizzes","Kaplan Reading","Kaplan Module Quizzes"] },
  { id:"R8",  subject:"QA", number:8,  title:"Hypothesis Testing", modules:["Module 8.1: Hypothesis Testing Basics","Module 8.2: Types of Hypothesis Tests","Q/B Kaplan","Q/B EOC"], resources:["IFT Lectures","IFT Quizzes","Kaplan Reading","Kaplan Module Quizzes"] },
  { id:"R9",  subject:"QA", number:9,  title:"Parametric and Non-Parametric Tests of Independence", modules:["Module 9.1: Tests for Independence","Q/B Kaplan","Q/B EOC"], resources:["IFT Lectures","IFT Quizzes","Kaplan Reading","Kaplan Module Quizzes"] },
  { id:"R10", subject:"QA", number:10, title:"Simple Linear Regression", modules:["Module 10.1: Linear Regression Basics","Module 10.2: Analysis of Variance (ANOVA) and Goodness of Fit","Module 10.3: Predicted Values and Functional Forms","Q/B Kaplan","Q/B EOC"], resources:["IFT Lectures","IFT Quizzes","Kaplan Reading","Kaplan Module Quizzes"] },
  { id:"R11", subject:"QA", number:11, title:"Introduction to Big Data Techniques", modules:["Module 11.1: Introduction to Fintech","Q/B Kaplan","Q/B EOC"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  // EC
  { id:"R12", subject:"EC", number:12, title:"Firms and Market Structures", modules:["Module 12.1: Breakeven, Shutdown, and Scale","Module 12.2: Characteristics of Market Structures","Module 12.3: Identifying Market Structures"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R13", subject:"EC", number:13, title:"Understanding Business Cycles", modules:["Module 13.1: Business Cycles"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R14", subject:"EC", number:14, title:"Fiscal Policy", modules:["Module 14.1: Fiscal Policy Objectives"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R15", subject:"EC", number:15, title:"Monetary Policy", modules:["Module 15.1: Monetary Policy"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R16", subject:"EC", number:16, title:"Introduction to Geopolitics", modules:["Module 16.1: Geopolitics"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R17", subject:"EC", number:17, title:"International Trade", modules:["Module 17.1: International Trade"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R18", subject:"EC", number:18, title:"Capital Flows and the FX Market", modules:["Module 18.1: The Foreign Exchange Market","Module 18.2: Managing Exchange Rates"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R19", subject:"EC", number:19, title:"Exchange Rate Calculations", modules:["Module 19.1: Exchange Rate Calculations"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  // FSA
  { id:"R27", subject:"FSA", number:27, title:"Introduction to Financial Statement Analysis", modules:["Module 27.1: Financial Statement Roles"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R28", subject:"FSA", number:28, title:"Analyzing Income Statements", modules:["Module 28.1: Revenue Recognition","Module 28.2: Expense Recognition","Module 28.3: Nonrecurring Items","Module 28.4: Earnings Per Share"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R29", subject:"FSA", number:29, title:"Analyzing Balance Sheets", modules:["Module 29.1: Assets and Liabilities","Module 29.2: Equity"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R30", subject:"FSA", number:30, title:"Analyzing Statements of Cash Flows I", modules:["Module 30.1: Cash Flow Statement"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R31", subject:"FSA", number:31, title:"Analyzing Statements of Cash Flows II", modules:["Module 31.1: Free Cash Flow and Analysis"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R32", subject:"FSA", number:32, title:"Analysis of Inventories", modules:["Module 32.1: Inventory Measurement","Module 32.2: Inflation Impact on FIFO and LIFO","Module 32.3: Presentation and Disclosure"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R33", subject:"FSA", number:33, title:"Analysis of Long-Term Assets", modules:["Module 33.1: Intangible Long-Lived Assets","Module 33.2: Impairment and Derecognition","Module 33.3: Long-Term Asset Disclosures"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R34", subject:"FSA", number:34, title:"Topics in Long-Term Liabilities and Equity", modules:["Module 34.1: Long-Term Liabilities","Module 34.2: Leases and Post-Employment Benefits"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R35", subject:"FSA", number:35, title:"Analysis of Income Taxes", modules:["Module 35.1: Income Tax Accounting"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R36", subject:"FSA", number:36, title:"Financial Reporting Quality", modules:["Module 36.1: Reporting Quality","Module 36.2: Accounting Choices and Estimates","Module 36.3: Warning Signs"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R37", subject:"FSA", number:37, title:"Financial Analysis Techniques", modules:["Module 37.1: Introduction to Financial Ratios","Module 37.2: Financial Ratios, Part 1","Module 37.3: Financial Ratios, Part 2","Module 37.4: DuPont Analysis","Module 37.5: Industry-Specific Financial Ratios"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R38", subject:"FSA", number:38, title:"Introduction to Financial Statement Modeling", modules:["Module 38.1: Financial Statement Modeling"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  // CI
  { id:"R20", subject:"CI", number:20, title:"Organizational Forms, Corporate Issuer Features, and Ownership", modules:["Module 20.1: Features of Corporate Issuers"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R21", subject:"CI", number:21, title:"Investors and Other Stakeholders", modules:["Module 21.1: Stakeholders and ESG Factors"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R22", subject:"CI", number:22, title:"Corporate Governance: Conflicts, Mechanisms, Risks, and Benefits", modules:["Module 22.1: Corporate Governance"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R23", subject:"CI", number:23, title:"Working Capital and Liquidity", modules:["Module 23.1: Liquidity Measures and Management"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R24", subject:"CI", number:24, title:"Capital Investments and Capital Allocation", modules:["Module 24.1: Capital Investments and Project Measures","Module 24.2: Capital Allocation Principles and Real Options"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R25", subject:"CI", number:25, title:"Capital Structure", modules:["Module 25.1: Weighted-Average Cost of Capital","Module 25.2: Capital Structure Theories"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R26", subject:"CI", number:26, title:"Business Models", modules:["Module 26.1: Business Model Features and Types"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  // EI
  { id:"R39", subject:"EI", number:39, title:"Market Organization and Structure", modules:["Module 39.1: Markets, Assets, and Intermediaries","Module 39.2: Positions and Leverage","Module 39.3: Order Execution and Validity"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R40", subject:"EI", number:40, title:"Security Market Indexes", modules:["Module 40.1: Index Weighting Methods","Module 40.2: Uses and Types of Indexes"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R41", subject:"EI", number:41, title:"Market Efficiency", modules:["Module 41.1: Market Efficiency"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R42", subject:"EI", number:42, title:"Overview of Equity Securities", modules:["Module 42.1: Equity Securities"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R43", subject:"EI", number:43, title:"Introduction to Industry and Company Analysis", modules:["Module 43.1: Industry Analysis Introduction"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R44", subject:"EI", number:44, title:"Industry and Competitive Analysis", modules:["Module 44.1: Industry Analysis","Module 44.2: Industry Structure and Competitive Positioning"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R45", subject:"EI", number:45, title:"Company Analysis: Forecasting", modules:["Module 45.1: Forecasting in Company Analysis"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R46", subject:"EI", number:46, title:"Equity Valuation: Concepts and Basic Tools", modules:["Module 46.1: Dividends, Splits, and Repurchases","Module 46.2: Dividend Discount Models","Module 46.3: Multiplier Models and Asset-Based Valuation"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  // FI
  { id:"R47", subject:"FI", number:47, title:"Fixed-Income Instrument Features", modules:["Module 47.1: Fixed-Income Instrument Features"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R48", subject:"FI", number:48, title:"Fixed-Income Cash Flows and Types", modules:["Module 48.1: Fixed-Income Cash Flows and Types"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R49", subject:"FI", number:49, title:"Fixed-Income Issuance and Trading", modules:["Module 49.1: Fixed-Income Issuance and Trading"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R50", subject:"FI", number:50, title:"Fixed-Income Markets for Corporate Issuers", modules:["Module 50.1: Fixed-Income Markets for Corporate Issuers"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R51", subject:"FI", number:51, title:"Fixed-Income Markets for Government Issuers", modules:["Module 51.1: Fixed-Income Markets for Government Issuers"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R52", subject:"FI", number:52, title:"Fixed-Income Bond Valuation: Prices and Yields", modules:["Module 52.1: Fixed-Income Bond Valuation: Prices and Yields"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R53", subject:"FI", number:53, title:"Yield and Yield Spread Measures for Fixed-Rate Bonds", modules:["Module 53.1: Yield and Yield Spread Measures for Fixed-Rate Bonds"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R54", subject:"FI", number:54, title:"Yield and Yield Spread Measures for Floating-Rate Instruments", modules:["Module 54.1: Yield and Yield Spread Measures for Floating-Rate Instruments"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R55", subject:"FI", number:55, title:"The Term Structure of Interest Rates", modules:["Module 55.1: The Term Structure of Interest Rates: Spot, Par, and Forward"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R56", subject:"FI", number:56, title:"Interest Rate Risk and Return", modules:["Module 56.1: Interest Rate Risk and Return"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R57", subject:"FI", number:57, title:"Yield-Based Bond Duration Measures and Properties", modules:["Module 57.1: Yield-Based Bond Duration Measures and Properties"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R58", subject:"FI", number:58, title:"Yield-Based Bond Convexity and Portfolio Properties", modules:["Module 58.1: Yield-Based Bond Convexity and Portfolio Properties"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R59", subject:"FI", number:59, title:"Curve-Based and Empirical Fixed-Income Risk Measures", modules:["Module 59.1: Curve-Based and Empirical Fixed-Income Risk Measures"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R60", subject:"FI", number:60, title:"Credit Risk", modules:["Module 60.1: Credit Risk"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R61", subject:"FI", number:61, title:"Credit Analysis for Government Issuers", modules:["Module 61.1: Credit Analysis for Government Issuers"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R62", subject:"FI", number:62, title:"Credit Analysis for Corporate Issuers", modules:["Module 62.1: Credit Analysis for Corporate Issuers"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R63", subject:"FI", number:63, title:"Fixed-Income Securitization", modules:["Module 63.1: Fixed-Income Securitization"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R64", subject:"FI", number:64, title:"Asset-Backed Security (ABS) Instrument and Market Features", modules:["Module 64.1: Asset-Backed Security (ABS) Instrument and Market Features"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R65", subject:"FI", number:65, title:"Mortgage-Backed Security (MBS) Instrument and Market Features", modules:["Module 65.1: Mortgage-Backed Security (MBS) Instrument and Market Features"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  // DV
  { id:"R66", subject:"DV", number:66, title:"Derivative Instrument and Derivative Market Features", modules:["Module 66.1: Derivative Instrument and Derivative Market Features"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R67", subject:"DV", number:67, title:"Forward Commitment and Contingent Claim Features and Instruments", modules:["Module 67.1: Forward Commitment and Contingent Claim Features"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R68", subject:"DV", number:68, title:"Derivative Benefits, Risks, and Issuer and Investor Uses", modules:["Module 68.1: Derivative Benefits, Risks, and Uses"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R69", subject:"DV", number:69, title:"Arbitrage, Replication, and the Cost of Carry in Pricing Derivatives", modules:["Module 69.1: Arbitrage, Replication, and Cost of Carry"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R70", subject:"DV", number:70, title:"Pricing and Valuation of Forward Contracts", modules:["Module 70.1: Pricing and Valuation of Forward Contracts"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R71", subject:"DV", number:71, title:"Pricing and Valuation of Futures Contracts", modules:["Module 71.1: Pricing and Valuation of Futures Contracts"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R72", subject:"DV", number:72, title:"Pricing and Valuation of Interest Rates and Other Swaps", modules:["Module 72.1: Pricing and Valuation of Interest Rate Swaps"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R73", subject:"DV", number:73, title:"Pricing and Valuation of Options", modules:["Module 73.1: Pricing and Valuation of Options"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R74", subject:"DV", number:74, title:"Option Replication Using Put-Call Parity", modules:["Module 74.1: Option Replication Using Put-Call Parity"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R75", subject:"DV", number:75, title:"Valuing a Derivative Using a One-Period Binomial Model", modules:["Module 75.1: Valuing a Derivative Using a One-Period Binomial Model"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  // AI
  { id:"R76", subject:"AI", number:76, title:"Alternative Investment Features, Methods, and Structures", modules:["Module 76.1: Alternative Investment Features, Methods, and Structures"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R77", subject:"AI", number:77, title:"Alternative Investment Performance and Returns", modules:["Module 77.1: Alternative Investment Performance and Returns"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R78", subject:"AI", number:78, title:"Investments in Private Capital: Equity and Debt", modules:["Module 78.1: Investments in Private Capital"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R79", subject:"AI", number:79, title:"Real Estate and Infrastructure", modules:["Module 79.1: Real Estate and Infrastructure"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R80", subject:"AI", number:80, title:"Natural Resources", modules:["Module 80.1: Natural Resources"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R81", subject:"AI", number:81, title:"Hedge Funds", modules:["Module 81.1: Hedge Funds"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R82", subject:"AI", number:82, title:"Introduction to Digital Assets", modules:["Module 82.1: Introduction to Digital Assets"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  // PM
  { id:"R83", subject:"PM", number:83, title:"Portfolio Management: An Overview", modules:["Module 83.1: Portfolio Management: An Overview"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R84", subject:"PM", number:84, title:"Portfolio Risk and Return: Part I", modules:["Module 84.1: Portfolio Risk and Return: Part I"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R85", subject:"PM", number:85, title:"Portfolio Risk and Return: Part II", modules:["Module 85.1: Portfolio Risk and Return: Part II"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R86", subject:"PM", number:86, title:"Basics of Portfolio Planning and Construction", modules:["Module 86.1: Basics of Portfolio Planning and Construction"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R87", subject:"PM", number:87, title:"The Behavioral Biases of Individuals", modules:["Module 87.1: The Behavioral Biases of Individuals"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R88", subject:"PM", number:88, title:"Introduction to Risk Management", modules:["Module 88.1: Introduction to Risk Management"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  // EPS
  { id:"R89", subject:"EPS", number:89, title:"Ethics and Trust in the Investment Profession", modules:["Module 89.1: Ethics and Trust"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R90", subject:"EPS", number:90, title:"Code of Ethics and Standards of Professional Conduct", modules:["Module 90.1: Code and Standards Overview","Module 90.2: Standards I-III","Module 90.3: Standards IV-VII"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R91", subject:"EPS", number:91, title:"Guidance for Standards I-VII", modules:["Module 91.1: Guidance for Standards I-III","Module 91.2: Guidance for Standards IV-VII"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R92", subject:"EPS", number:92, title:"Introduction to the Global Investment Performance Standards (GIPS)", modules:["Module 92.1: GIPS Introduction"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
  { id:"R93", subject:"EPS", number:93, title:"Ethics Application", modules:["Module 93.1: Ethics Application Cases"], resources:["Reading","Kaplan Lecture","QB Kaplan"] },
];

const VIEW_TYPE = "cfa-dashboard";
const REVISION_DAYS = 14; // trigger revision alert after 14 days

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function todayStr() { return new Date().toISOString().slice(0,10); }
function daysAgo(dateStr) { return Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000); }
function daysUntilExam() { return Math.ceil((new Date(EXAM_DATE).getTime() - Date.now()) / 86400000); }
function weekNumber(dateStr) {
  const d = new Date(dateStr);
  const startOfYear = new Date(d.getFullYear(), 0, 1);
  return Math.ceil(((d - startOfYear) / 86400000 + startOfYear.getDay() + 1) / 7);
}
function getWeekDates(offset = 0) {
  const now = new Date();
  const day = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - (day === 0 ? 6 : day - 1) + offset * 7);
  return Array.from({length:7}, (_,i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d.toISOString().slice(0,10);
  });
}
function getMonthDates(offset = 0) {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth() + offset;
  const first = new Date(y, m, 1);
  const last = new Date(y, m+1, 0);
  const dates = [];
  for (let d = new Date(first); d <= last; d.setDate(d.getDate()+1))
    dates.push(d.toISOString().slice(0,10));
  return dates;
}
function subjectColor(subjectId) {
  return SUBJECTS.find(s => s.id === subjectId)?.color ?? "#888";
}
function readingById(id) { return READINGS.find(r => r.id === id); }
function subjectById(id) { return SUBJECTS.find(s => s.id === id); }

// ─── DEFAULT DATA STRUCTURE ───────────────────────────────────────────────────
function defaultData() {
  const progress = {};
  READINGS.forEach(r => {
    progress[r.id] = {
      startedDate: null,
      completedDate: null,
      lastRevisedDate: null,
      resourcesDone: {},   // { "Reading": true, "Kaplan Lecture": false, ... }
      modulesDone: {},     // { "Module 1.1...": true, ... }
      notes: "",
      revisionCount: 0,
    };
    r.resources.forEach(res => progress[r.id].resourcesDone[res] = false);
    r.modules.forEach(mod => progress[r.id].modulesDone[mod] = false);
  });
  return {
    version: 1,
    progress,
    weeklyGoals: {},    // { "2025-W18": { readingIds: ["R1","R2"], targetModules: 4 } }
    dailyLogs: {},      // { "2025-04-19": { log: "...", readingsDone: ["R1"] } }
    weeklyGoalModules: 3, // default: complete 3 readings per week
  };
}

// ─── MAIN PLUGIN ──────────────────────────────────────────────────────────────
class CFASchedulerPlugin extends Plugin {
  async onload() {
    await this.loadData_();
    this.registerView(VIEW_TYPE, (leaf) => new CFADashboardView(leaf, this));
    this.addRibbonIcon("book-open", "CFA Dashboard", () => this.openDashboard());
    this.addCommand({ id:"open-cfa-dashboard", name:"Open CFA Dashboard", callback: () => this.openDashboard() });
    this.addCommand({ id:"generate-reading-notes", name:"Generate All Reading Notes", callback: () => this.generateAllNotes() });
    this.addSettingTab(new CFASettingTab(this.app, this));
    // Open on startup if setting enabled
    if (this.pluginData.openOnStartup) this.openDashboard();
  }

  async loadData_() {
    const saved = await this.loadData();
    if (!saved || !saved.progress) {
      this.pluginData = defaultData();
    } else {
      this.pluginData = saved;
      // Merge in any new readings that weren't in saved data
      const def = defaultData();
      READINGS.forEach(r => {
        if (!this.pluginData.progress[r.id]) {
          this.pluginData.progress[r.id] = def.progress[r.id];
        }
      });
    }
    if (!this.pluginData.weeklyGoalModules) this.pluginData.weeklyGoalModules = 3;
  }

  async saveData_() { await this.saveData(this.pluginData); }

  async openDashboard() {
    const existing = this.app.workspace.getLeavesOfType(VIEW_TYPE);
    if (existing.length) { this.app.workspace.revealLeaf(existing[0]); return; }
    const leaf = this.app.workspace.getLeaf('tab');
    await leaf.setViewState({ type: VIEW_TYPE, active: true });
    this.app.workspace.revealLeaf(leaf);
  }

  getRevisionDue() {
    return READINGS.filter(r => {
      const p = this.pluginData.progress[r.id];
      if (!p.completedDate) return false;
      const lastEvent = p.lastRevisedDate || p.completedDate;
      return daysAgo(lastEvent) >= REVISION_DAYS;
    });
  }

  getOverallProgress() {
    let total = 0, done = 0;
    READINGS.forEach(r => {
      const p = this.pluginData.progress[r.id];
      const mods = r.modules;
      total += mods.length;
      mods.forEach(m => { if (p.modulesDone[m]) done++; });
    });
    return { total, done, pct: total ? Math.round(done/total*100) : 0 };
  }

  getSubjectProgress(subjectId) {
    const readings = READINGS.filter(r => r.subject === subjectId);
    let total = 0, done = 0;
    readings.forEach(r => {
      const p = this.pluginData.progress[r.id];
      r.modules.forEach(m => { total++; if (p.modulesDone[m]) done++; });
    });
    return { total, done, pct: total ? Math.round(done/total*100) : 0 };
  }

  getWeekProgress(weekDates) {
    let done = 0;
    weekDates.forEach(date => {
      const log = this.pluginData.dailyLogs[date];
      if (log) done += (log.readingsDone || []).length;
    });
    return done;
  }

  markRevised(readingId) {
    this.pluginData.progress[readingId].lastRevisedDate = todayStr();
    this.pluginData.progress[readingId].revisionCount++;
    this.saveData_();
  }

  toggleModule(readingId, moduleName, value) {
    const p = this.pluginData.progress[readingId];
    p.modulesDone[moduleName] = value;
    if (!p.startedDate) p.startedDate = todayStr();
    // Auto-mark completed if all modules done
    const r = readingById(readingId);
    const allDone = r.modules.every(m => p.modulesDone[m]);
    if (allDone && !p.completedDate) p.completedDate = todayStr();
    if (!allDone) p.completedDate = null;
    this.saveData_();
  }

  toggleResource(readingId, resourceName, value) {
    this.pluginData.progress[readingId].resourcesDone[resourceName] = value;
    if (!this.pluginData.progress[readingId].startedDate) this.pluginData.progress[readingId].startedDate = todayStr();
    this.saveData_();
  }

  logToday(text, readingsDone) {
    const today = todayStr();
    this.pluginData.dailyLogs[today] = { log: text, readingsDone, timestamp: new Date().toISOString() };
    this.saveData_();
  }

  async generateAllNotes() {
    const folder = "CFA Level 1";
    if (!this.app.vault.getAbstractFileByPath(folder)) {
      await this.app.vault.createFolder(folder);
    }
    for (const subj of SUBJECTS) {
      const subjFolder = `${folder}/${subj.name}`;
      if (!this.app.vault.getAbstractFileByPath(subjFolder)) {
        await this.app.vault.createFolder(subjFolder);
      }
    }
    let count = 0;
    for (const r of READINGS) {
      const subj = subjectById(r.subject);
      const path = `${folder}/${subj.name}/Reading ${r.number} - ${r.title}.md`;
      if (!this.app.vault.getAbstractFileByPath(path)) {
        const content = this.generateReadingNote(r, subj);
        await this.app.vault.create(path, content);
        count++;
      }
    }
    new Notice(`✅ Generated ${count} reading notes in "CFA Level 1" folder.`);
  }

  generateReadingNote(r, subj) {
    const modules = r.modules.map(m => `- [ ] ${m}`).join('\n');
    const resources = r.resources.map(res => `- [ ] ${res}`).join('\n');
    return `---
tags: [cfa, ${r.subject.toLowerCase()}, reading-${r.number}]
subject: ${subj.name}
reading: ${r.number}
title: "${r.title}"
status: not-started
---

# Reading ${r.number}: ${r.title}

**Subject:** [[${subj.name}]]
**Exam:** CFA Level 1 — November 2026

---

## 📋 Modules Checklist
${modules}

## 📚 Resources Checklist
${resources}

---

## 📝 Key Concepts

> Add your notes here

## 🔑 Key Formulas

> Add formulas here

## ❓ Practice Questions

> Note tricky questions and mistakes here

## 🔄 Revision Notes

> Add revision notes here

---
*Last revised: —*
`;
  }
}

// ─── DASHBOARD VIEW ───────────────────────────────────────────────────────────
class CFADashboardView extends ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
    this.currentView = 'dashboard'; // dashboard | week | month | subject | reading
    this.viewOffset = 0;
    this.selectedSubject = null;
    this.selectedReading = null;
  }

  getViewType() { return VIEW_TYPE; }
  getDisplayText() { return "CFA Dashboard"; }
  getIcon() { return "book-open"; }

  async onOpen() { this.render(); }

  render() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("cfa-dashboard");
    contentEl.style.cssText = "font-family: 'Georgia', serif; overflow-y: auto; height: 100%; background: var(--background-primary);";

    this.renderStyles(contentEl);
    this.renderNav(contentEl);

    if (this.currentView === 'dashboard') this.renderDashboard(contentEl);
    else if (this.currentView === 'week') this.renderWeekView(contentEl);
    else if (this.currentView === 'month') this.renderMonthView(contentEl);
    else if (this.currentView === 'subject') this.renderSubjectView(contentEl);
    else if (this.currentView === 'reading') this.renderReadingView(contentEl);
  }

  renderStyles(el) {
    const style = el.createEl('style');
    style.textContent = `
      .cfa-dashboard { padding: 0 !important; }
      .cfa-nav { display:flex; gap:8px; padding:16px 20px 0; flex-wrap:wrap; border-bottom:1px solid var(--background-modifier-border); margin-bottom:0; }
      .cfa-nav-btn { padding:8px 18px; border-radius:6px 6px 0 0; border:1px solid var(--background-modifier-border); border-bottom:none; cursor:pointer; font-size:13px; background:var(--background-secondary); color:var(--text-muted); transition:all .2s; }
      .cfa-nav-btn.active { background:var(--background-primary); color:var(--text-normal); font-weight:600; }
      .cfa-nav-btn:hover { color:var(--text-normal); }
      .cfa-body { padding:24px; }
      .cfa-header { margin-bottom:24px; }
      .cfa-title { font-size:22px; font-weight:700; color:var(--text-normal); margin:0 0 4px; }
      .cfa-subtitle { font-size:13px; color:var(--text-muted); }
      .cfa-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:20px; }
      .cfa-grid-3 { display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px; margin-bottom:20px; }
      .cfa-card { background:var(--background-secondary); border-radius:10px; padding:18px; border:1px solid var(--background-modifier-border); }
      .cfa-card-title { font-size:11px; text-transform:uppercase; letter-spacing:.08em; color:var(--text-muted); margin:0 0 10px; font-weight:600; }
      .cfa-stat { font-size:32px; font-weight:700; color:var(--text-normal); line-height:1; }
      .cfa-stat-sub { font-size:12px; color:var(--text-muted); margin-top:4px; }
      .cfa-progress-bar { background:var(--background-modifier-border); border-radius:99px; height:8px; overflow:hidden; margin:8px 0; }
      .cfa-progress-fill { height:100%; border-radius:99px; transition:width .4s; }
      .cfa-subject-row { display:flex; align-items:center; gap:10px; padding:10px 0; border-bottom:1px solid var(--background-modifier-border); cursor:pointer; transition:background .15s; border-radius:6px; padding:10px; }
      .cfa-subject-row:hover { background:var(--background-modifier-hover); }
      .cfa-subject-dot { width:10px; height:10px; border-radius:50%; flex-shrink:0; }
      .cfa-subject-name { flex:1; font-size:14px; color:var(--text-normal); }
      .cfa-subject-pct { font-size:13px; font-weight:600; color:var(--text-muted); }
      .cfa-subject-bar { flex:0 0 80px; height:6px; background:var(--background-modifier-border); border-radius:99px; overflow:hidden; }
      .cfa-subject-bar-fill { height:100%; border-radius:99px; }
      .cfa-alert { background:#fff3cd; border:1px solid #ffc107; border-radius:8px; padding:12px 16px; margin-bottom:8px; display:flex; align-items:center; gap:10px; }
      .cfa-alert-icon { font-size:18px; }
      .cfa-alert-text { flex:1; font-size:13px; color:#856404; }
      .cfa-alert-btn { padding:4px 10px; background:#ffc107; border:none; border-radius:4px; cursor:pointer; font-size:12px; color:#000; font-weight:600; }
      .cfa-day-cell { background:var(--background-secondary); border-radius:8px; padding:14px; border:1px solid var(--background-modifier-border); min-height:80px; }
      .cfa-day-label { font-size:11px; color:var(--text-muted); font-weight:600; text-transform:uppercase; margin-bottom:6px; }
      .cfa-day-date { font-size:18px; font-weight:700; color:var(--text-normal); }
      .cfa-day-today { border:2px solid var(--interactive-accent); }
      .cfa-reading-chip { display:inline-block; font-size:11px; padding:2px 8px; border-radius:99px; margin:3px 2px; color:#fff; }
      .cfa-week-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:10px; }
      .cfa-month-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:6px; }
      .cfa-month-cell { background:var(--background-secondary); border-radius:6px; padding:8px; border:1px solid var(--background-modifier-border); min-height:60px; }
      .cfa-month-label { font-size:10px; color:var(--text-muted); font-weight:600; }
      .cfa-month-date { font-size:14px; font-weight:600; color:var(--text-normal); }
      .cfa-month-today { border:2px solid var(--interactive-accent); }
      .cfa-btn { padding:8px 16px; border-radius:6px; border:1px solid var(--background-modifier-border); cursor:pointer; font-size:13px; background:var(--interactive-normal); color:var(--text-normal); transition:all .15s; }
      .cfa-btn:hover { background:var(--interactive-hover); }
      .cfa-btn-primary { background:var(--interactive-accent); color:#fff; border-color:var(--interactive-accent); }
      .cfa-btn-primary:hover { opacity:.9; }
      .cfa-btn-sm { padding:4px 10px; font-size:12px; }
      .cfa-module-row { display:flex; align-items:center; gap:10px; padding:8px 10px; border-radius:6px; transition:background .1s; }
      .cfa-module-row:hover { background:var(--background-modifier-hover); }
      .cfa-module-check { width:16px; height:16px; cursor:pointer; }
      .cfa-module-label { font-size:13px; color:var(--text-normal); flex:1; }
      .cfa-module-label.done { text-decoration:line-through; color:var(--text-muted); }
      .cfa-resource-chips { display:flex; gap:8px; flex-wrap:wrap; margin-top:10px; }
      .cfa-resource-chip { padding:5px 12px; border-radius:99px; font-size:12px; cursor:pointer; border:1px solid; transition:all .15s; }
      .cfa-resource-chip.done { color:#fff; }
      .cfa-textarea { width:100%; min-height:80px; background:var(--background-primary); border:1px solid var(--background-modifier-border); border-radius:6px; padding:10px; font-size:13px; color:var(--text-normal); resize:vertical; }
      .cfa-section-header { font-size:13px; font-weight:700; color:var(--text-muted); text-transform:uppercase; letter-spacing:.06em; margin:20px 0 10px; }
      .cfa-badge { display:inline-block; padding:2px 8px; border-radius:99px; font-size:11px; font-weight:700; }
      .cfa-badge-green { background:#d4edda; color:#155724; }
      .cfa-badge-yellow { background:#fff3cd; color:#856404; }
      .cfa-badge-red { background:#f8d7da; color:#721c24; }
      .cfa-reading-row { display:flex; align-items:center; gap:10px; padding:10px; border-radius:8px; cursor:pointer; border:1px solid var(--background-modifier-border); margin-bottom:8px; transition:all .15s; }
      .cfa-reading-row:hover { background:var(--background-modifier-hover); border-color:var(--interactive-accent); }
      .cfa-nav-controls { display:flex; align-items:center; gap:10px; margin-left:auto; }
      .cfa-log-section { background:var(--background-secondary); border-radius:10px; padding:18px; border:1px solid var(--background-modifier-border); margin-top:16px; }
      .cfa-reading-selector { display:flex; flex-wrap:wrap; gap:6px; margin:10px 0; }
      .cfa-reading-tag { padding:4px 10px; border-radius:99px; font-size:12px; cursor:pointer; background:var(--background-modifier-border); color:var(--text-muted); border:1px solid transparent; }
      .cfa-reading-tag.selected { background:var(--interactive-accent); color:#fff; }
    `;
  }

  renderNav(el) {
    const nav = el.createEl('div', {cls:'cfa-nav'});
    const views = [
      {id:'dashboard', label:'📊 Dashboard'},
      {id:'week', label:'📅 Week'},
      {id:'month', label:'🗓 Month'},
    ];
    views.forEach(v => {
      const btn = nav.createEl('button', {cls:'cfa-nav-btn' + (this.currentView === v.id ? ' active' : ''), text: v.label});
      btn.onclick = () => { this.currentView = v.id; this.viewOffset = 0; this.render(); };
    });
    // Generate notes button
    const genBtn = nav.createEl('button', {cls:'cfa-nav-btn', text:'⚡ Generate Notes'});
    genBtn.style.marginLeft = 'auto';
    genBtn.onclick = () => this.plugin.generateAllNotes();
  }

  renderDashboard(el) {
    const body = el.createEl('div', {cls:'cfa-body'});

    // Header
    const hdr = body.createEl('div', {cls:'cfa-header'});
    const days = daysUntilExam();
    hdr.createEl('div', {cls:'cfa-title', text:'CFA Level 1 — Study Dashboard ☕'});
    hdr.createEl('div', {cls:'cfa-subtitle', text:`Exam: 11 November 2026  ·  ${days} days remaining  ·  Today: ${todayStr()}`});

    // Top stats
    const overall = this.plugin.getOverallProgress();
    const weekDates = getWeekDates(0);
    const weekDone = this.plugin.getWeekProgress(weekDates);
    const weekGoal = this.plugin.pluginData.weeklyGoalModules;
    const revisionDue = this.plugin.getRevisionDue();

    const grid = body.createEl('div', {cls:'cfa-grid-3'});

    // Overall progress
    const c1 = grid.createEl('div', {cls:'cfa-card'});
    c1.createEl('div', {cls:'cfa-card-title', text:'Overall Progress'});
    c1.createEl('div', {cls:'cfa-stat', text:`${overall.pct}%`});
    c1.createEl('div', {cls:'cfa-stat-sub', text:`${overall.done} / ${overall.total} modules complete`});
    const pb = c1.createEl('div', {cls:'cfa-progress-bar'});
    const pf = pb.createEl('div', {cls:'cfa-progress-fill'});
    pf.style.cssText = `width:${overall.pct}%; background:var(--interactive-accent);`;

    // Weekly goal
    const c2 = grid.createEl('div', {cls:'cfa-card'});
    c2.createEl('div', {cls:'cfa-card-title', text:'Weekly Goal'});
    const weekPct = Math.min(100, Math.round(weekDone/weekGoal*100));
    c2.createEl('div', {cls:'cfa-stat', text:`${weekDone}/${weekGoal}`});
    c2.createEl('div', {cls:'cfa-stat-sub', text:`readings logged this week`});
    const pb2 = c2.createEl('div', {cls:'cfa-progress-bar'});
    const pf2 = pb2.createEl('div', {cls:'cfa-progress-fill'});
    const goalColor = weekPct >= 100 ? '#28a745' : weekPct >= 50 ? '#ffc107' : '#dc3545';
    pf2.style.cssText = `width:${weekPct}%; background:${goalColor};`;
    // Edit goal
    const goalRow = c2.createEl('div', {style:'display:flex;align-items:center;gap:8px;margin-top:8px;'});
    goalRow.createEl('span', {text:'Target:', style:'font-size:12px;color:var(--text-muted);'});
    const goalInput = goalRow.createEl('input', {type:'number', value:String(weekGoal)});
    goalInput.style.cssText = 'width:50px;padding:2px 6px;font-size:12px;background:var(--background-primary);border:1px solid var(--background-modifier-border);border-radius:4px;color:var(--text-normal);';
    goalInput.onchange = () => { this.plugin.pluginData.weeklyGoalModules = parseInt(goalInput.value)||3; this.plugin.saveData_(); this.render(); };

    // Revision due
    const c3 = grid.createEl('div', {cls:'cfa-card'});
    c3.createEl('div', {cls:'cfa-card-title', text:'Revision Due'});
    c3.createEl('div', {cls:'cfa-stat', text:String(revisionDue.length)});
    c3.createEl('div', {cls:'cfa-stat-sub', text:`topics not revised in ${REVISION_DAYS}+ days`});
    if (revisionDue.length > 0) {
      const badge = c3.createEl('div', {cls:'cfa-badge cfa-badge-yellow', text:`⚠ ${revisionDue.length} due`});
      badge.style.marginTop = '8px';
    }

    // Revision alerts
    if (revisionDue.length > 0) {
      body.createEl('div', {cls:'cfa-section-header', text:'⚠️ Revision Due (14+ days since completion)'});
      revisionDue.slice(0,5).forEach(r => {
        const p = this.plugin.pluginData.progress[r.id];
        const lastEvent = p.lastRevisedDate || p.completedDate;
        const alert = body.createEl('div', {cls:'cfa-alert'});
        alert.createEl('span', {cls:'cfa-alert-icon', text:'📖'});
        const txt = alert.createEl('div', {cls:'cfa-alert-text'});
        txt.createEl('strong', {text:`Reading ${r.number}: ${r.title}`});
        txt.createEl('div', {text:`Last studied ${daysAgo(lastEvent)} days ago · ${r.subject}`});
        const btn = alert.createEl('button', {cls:'cfa-alert-btn', text:'Mark Revised'});
        btn.onclick = () => { this.plugin.markRevised(r.id); this.render(); };
        const openBtn = alert.createEl('button', {cls:'cfa-alert-btn', text:'Open', style:'margin-left:6px;background:#6c757d;color:#fff;'});
        openBtn.onclick = () => { this.selectedReading = r.id; this.currentView = 'reading'; this.render(); };
      });
      if (revisionDue.length > 5) {
        body.createEl('div', {style:'font-size:12px;color:var(--text-muted);margin-bottom:12px;', text:`... and ${revisionDue.length - 5} more`});
      }
    }

    // Subject breakdown
    body.createEl('div', {cls:'cfa-section-header', text:'📚 Subject Progress'});
    const subjCard = body.createEl('div', {cls:'cfa-card'});
    SUBJECTS.forEach(subj => {
      const prog = this.plugin.getSubjectProgress(subj.id);
      const row = subjCard.createEl('div', {cls:'cfa-subject-row'});
      const dot = row.createEl('div', {cls:'cfa-subject-dot'});
      dot.style.background = subj.color;
      row.createEl('span', {cls:'cfa-subject-name', text:subj.name});
      const barWrap = row.createEl('div', {cls:'cfa-subject-bar'});
      const barFill = barWrap.createEl('div', {cls:'cfa-subject-bar-fill'});
      barFill.style.cssText = `width:${prog.pct}%; background:${subj.color};`;
      row.createEl('span', {cls:'cfa-subject-pct', text:`${prog.pct}%`});
      const countBadge = row.createEl('span', {text:`${prog.done}/${prog.total}`, style:'font-size:11px;color:var(--text-faint);min-width:40px;text-align:right;'});
      row.onclick = () => { this.selectedSubject = subj.id; this.currentView = 'subject'; this.render(); };
    });

    // Daily Log section
    const today = todayStr();
    const todayLog = this.plugin.pluginData.dailyLogs[today] || {log:'', readingsDone:[]};
    const logSection = body.createEl('div', {cls:'cfa-log-section'});
    logSection.createEl('div', {cls:'cfa-card-title', text:"📝 Today's Log — " + today});

    // Reading selector
    logSection.createEl('div', {style:'font-size:12px;color:var(--text-muted);margin-bottom:6px;', text:'What did you study today? (tap to toggle):'});
    const tagContainer = logSection.createEl('div', {cls:'cfa-reading-selector'});
    let selectedReadings = new Set(todayLog.readingsDone || []);

    // Show readings not yet completed or recently worked on
    const activeReadings = READINGS.filter(r => {
      const p = this.plugin.pluginData.progress[r.id];
      return !p.completedDate || selectedReadings.has(r.id);
    }).slice(0, 30);

    activeReadings.forEach(r => {
      const subj = subjectById(r.subject);
      const tag = tagContainer.createEl('div', {cls:'cfa-reading-tag' + (selectedReadings.has(r.id) ? ' selected' : ''), text:`R${r.number}: ${r.title.split(':')[0]}`});
      if (selectedReadings.has(r.id)) tag.style.borderColor = subj.color;
      tag.onclick = () => {
        if (selectedReadings.has(r.id)) selectedReadings.delete(r.id);
        else selectedReadings.add(r.id);
        this.plugin.logToday(textarea.value, Array.from(selectedReadings));
        this.render();
      };
    });

    const textarea = logSection.createEl('textarea', {cls:'cfa-textarea', placeholder:"Add notes about what you studied today, any difficulties, insights..."});
    textarea.value = todayLog.log || '';
    textarea.style.marginTop = '10px';

    const saveBtn = logSection.createEl('button', {cls:'cfa-btn cfa-btn-primary', text:'Save Log'});
    saveBtn.style.marginTop = '8px';
    saveBtn.onclick = () => {
      this.plugin.logToday(textarea.value, Array.from(selectedReadings));
      new Notice('✅ Daily log saved!');
    };
  }

  renderWeekView(el) {
    const body = el.createEl('div', {cls:'cfa-body'});
    const weekDates = getWeekDates(this.viewOffset);
    const weekStart = weekDates[0];
    const weekEnd = weekDates[6];
    const weekDone = this.plugin.getWeekProgress(weekDates);
    const weekGoal = this.plugin.pluginData.weeklyGoalModules;
    const weekPct = Math.min(100, Math.round(weekDone/weekGoal*100));

    // Header
    const hdrRow = body.createEl('div', {style:'display:flex;align-items:center;gap:12px;margin-bottom:20px;'});
    hdrRow.createEl('div', {cls:'cfa-title', text:`Week of ${weekStart} – ${weekEnd}`});
    const controls = hdrRow.createEl('div', {cls:'cfa-nav-controls'});
    const prevBtn = controls.createEl('button', {cls:'cfa-btn cfa-btn-sm', text:'‹ Prev'});
    prevBtn.onclick = () => { this.viewOffset--; this.render(); };
    const todayBtn = controls.createEl('button', {cls:'cfa-btn cfa-btn-sm', text:'Today'});
    todayBtn.onclick = () => { this.viewOffset = 0; this.render(); };
    const nextBtn = controls.createEl('button', {cls:'cfa-btn cfa-btn-sm', text:'Next ›'});
    nextBtn.onclick = () => { this.viewOffset++; this.render(); };

    // Weekly goal meter
    const goalCard = body.createEl('div', {cls:'cfa-card', style:'margin-bottom:20px;'});
    goalCard.createEl('div', {cls:'cfa-card-title', text:'Weekly Goal Progress'});
    goalCard.createEl('div', {text:`${weekDone} of ${weekGoal} readings logged this week`, style:'font-size:14px;color:var(--text-normal);margin-bottom:8px;'});
    const pb = goalCard.createEl('div', {cls:'cfa-progress-bar'});
    const pf = pb.createEl('div', {cls:'cfa-progress-fill'});
    const goalColor = weekPct >= 100 ? '#28a745' : weekPct >= 50 ? '#ffc107' : '#dc3545';
    pf.style.cssText = `width:${weekPct}%; background:${goalColor};`;
    if (weekPct >= 100) goalCard.createEl('div', {text:'🎉 Weekly goal achieved!', style:'font-size:12px;color:#28a745;margin-top:6px;font-weight:600;'});

    // Day cells
    const DAY_NAMES = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    const weekGrid = body.createEl('div', {cls:'cfa-week-grid'});
    const today = todayStr();

    weekDates.forEach((date, i) => {
      const isToday = date === today;
      const log = this.plugin.pluginData.dailyLogs[date];
      const cell = weekGrid.createEl('div', {cls:'cfa-day-cell' + (isToday ? ' cfa-day-today' : '')});
      cell.createEl('div', {cls:'cfa-day-label', text:DAY_NAMES[i]});
      cell.createEl('div', {cls:'cfa-day-date', text:date.slice(8)});
      if (log) {
        (log.readingsDone || []).forEach(rid => {
          const r = readingById(rid);
          if (!r) return;
          const subj = subjectById(r.subject);
          const chip = cell.createEl('div', {cls:'cfa-reading-chip', text:`R${r.number}`});
          chip.style.background = subj?.color ?? '#888';
          chip.title = r.title;
          chip.onclick = () => { this.selectedReading = rid; this.currentView = 'reading'; this.render(); };
        });
        if (log.log) {
          cell.createEl('div', {text:'📝', style:'font-size:11px;color:var(--text-muted);margin-top:4px;'}).title = log.log;
        }
      }
    });
  }

  renderMonthView(el) {
    const body = el.createEl('div', {cls:'cfa-body'});
    const dates = getMonthDates(this.viewOffset);
    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth() + this.viewOffset;
    const monthName = new Date(y, m, 1).toLocaleString('default', {month:'long', year:'numeric'});

    const hdrRow = body.createEl('div', {style:'display:flex;align-items:center;gap:12px;margin-bottom:20px;'});
    hdrRow.createEl('div', {cls:'cfa-title', text:monthName});
    const controls = hdrRow.createEl('div', {cls:'cfa-nav-controls'});
    const prevBtn = controls.createEl('button', {cls:'cfa-btn cfa-btn-sm', text:'‹'});
    prevBtn.onclick = () => { this.viewOffset--; this.render(); };
    const todayBtn = controls.createEl('button', {cls:'cfa-btn cfa-btn-sm', text:'Today'});
    todayBtn.onclick = () => { this.viewOffset = 0; this.render(); };
    const nextBtn = controls.createEl('button', {cls:'cfa-btn cfa-btn-sm', text:'›'});
    nextBtn.onclick = () => { this.viewOffset++; this.render(); };

    // Day headers
    const DAY_NAMES = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    const headerGrid = body.createEl('div', {cls:'cfa-month-grid', style:'margin-bottom:4px;'});
    DAY_NAMES.forEach(d => headerGrid.createEl('div', {text:d, style:'font-size:11px;color:var(--text-muted);font-weight:600;text-align:center;padding:4px;'}));

    const grid = body.createEl('div', {cls:'cfa-month-grid'});
    const today = todayStr();

    // Pad start
    const firstDay = new Date(dates[0]).getDay();
    const startPad = firstDay === 0 ? 6 : firstDay - 1;
    for (let i = 0; i < startPad; i++) grid.createEl('div');

    dates.forEach(date => {
      const isToday = date === today;
      const log = this.plugin.pluginData.dailyLogs[date];
      const cell = grid.createEl('div', {cls:'cfa-month-cell' + (isToday ? ' cfa-month-today' : '')});
      cell.createEl('div', {cls:'cfa-month-date', text:date.slice(8)});
      if (log) {
        const count = (log.readingsDone||[]).length;
        if (count > 0) {
          const dot = cell.createEl('div', {style:`width:8px;height:8px;border-radius:50%;background:var(--interactive-accent);margin-top:4px;`});
          cell.createEl('div', {text:`${count}R`, style:'font-size:10px;color:var(--text-muted);'});
        }
        if (log.log) cell.createEl('div', {text:'📝', style:'font-size:10px;'});
      }
    });
  }

  renderSubjectView(el) {
    const body = el.createEl('div', {cls:'cfa-body'});
    const subj = subjectById(this.selectedSubject);
    if (!subj) return;
    const readings = READINGS.filter(r => r.subject === this.selectedSubject);
    const prog = this.plugin.getSubjectProgress(this.selectedSubject);

    const backBtn = body.createEl('button', {cls:'cfa-btn cfa-btn-sm', text:'← Back'});
    backBtn.onclick = () => { this.currentView = 'dashboard'; this.render(); };

    body.createEl('div', {cls:'cfa-title', text:subj.name, style:`margin-top:16px; color:${subj.color};`});
    body.createEl('div', {cls:'cfa-subtitle', text:`${prog.done}/${prog.total} modules complete · ${prog.pct}%`});
    const pb = body.createEl('div', {cls:'cfa-progress-bar', style:'margin:10px 0 20px;'});
    const pf = pb.createEl('div', {cls:'cfa-progress-fill'});
    pf.style.cssText = `width:${prog.pct}%; background:${subj.color};`;

    readings.forEach(r => {
      const p = this.plugin.pluginData.progress[r.id];
      const modsDone = r.modules.filter(m => p.modulesDone[m]).length;
      const allDone = modsDone === r.modules.length;
      const revisionDue = p.completedDate && daysAgo(p.lastRevisedDate||p.completedDate) >= REVISION_DAYS;

      const row = body.createEl('div', {cls:'cfa-reading-row'});
      const dot = row.createEl('div', {style:`width:12px;height:12px;border-radius:50%;background:${allDone ? subj.color : 'var(--background-modifier-border)'};flex-shrink:0;`});
      const info = row.createEl('div', {style:'flex:1;'});
      info.createEl('div', {text:`Reading ${r.number}: ${r.title}`, style:'font-size:13px;font-weight:600;color:var(--text-normal);'});
      info.createEl('div', {text:`${modsDone}/${r.modules.length} modules`, style:'font-size:11px;color:var(--text-muted);'});
      if (revisionDue) {
        const badge = row.createEl('div', {cls:'cfa-badge cfa-badge-yellow', text:'Revise!'});
        badge.style.flexShrink = '0';
      } else if (allDone) {
        const badge = row.createEl('div', {cls:'cfa-badge cfa-badge-green', text:'Done ✓'});
        badge.style.flexShrink = '0';
      }
      row.onclick = () => { this.selectedReading = r.id; this.currentView = 'reading'; this.render(); };
    });
  }

  renderReadingView(el) {
    const body = el.createEl('div', {cls:'cfa-body'});
    const r = readingById(this.selectedReading);
    if (!r) return;
    const subj = subjectById(r.subject);
    const p = this.plugin.pluginData.progress[r.id];

    const backBtn = body.createEl('button', {cls:'cfa-btn cfa-btn-sm', text:'← Back'});
    backBtn.onclick = () => { this.currentView = 'subject'; this.render(); };

    body.createEl('div', {text:subj.name, style:`font-size:12px;color:${subj.color};font-weight:600;margin-top:16px;text-transform:uppercase;letter-spacing:.06em;`});
    body.createEl('div', {cls:'cfa-title', text:`Reading ${r.number}: ${r.title}`, style:'margin-top:4px;'});

    // Status info
    const meta = body.createEl('div', {style:'display:flex;gap:12px;flex-wrap:wrap;margin:8px 0 20px;'});
    if (p.startedDate) meta.createEl('span', {text:`Started: ${p.startedDate}`, style:'font-size:12px;color:var(--text-muted);'});
    if (p.completedDate) meta.createEl('span', {text:`Completed: ${p.completedDate}`, cls:'cfa-badge cfa-badge-green'});
    if (p.lastRevisedDate) meta.createEl('span', {text:`Last revised: ${p.lastRevisedDate}`, style:'font-size:12px;color:var(--text-muted);'});
    if (p.revisionCount > 0) meta.createEl('span', {text:`Revisions: ${p.revisionCount}`, style:'font-size:12px;color:var(--text-muted);'});

    // Revision due?
    const revisionDue = p.completedDate && daysAgo(p.lastRevisedDate||p.completedDate) >= REVISION_DAYS;
    if (revisionDue) {
      const alert = body.createEl('div', {cls:'cfa-alert'});
      alert.createEl('span', {cls:'cfa-alert-icon', text:'⚠️'});
      alert.createEl('div', {cls:'cfa-alert-text', text:`This reading is due for revision! Last reviewed ${daysAgo(p.lastRevisedDate||p.completedDate)} days ago.`});
      const btn = alert.createEl('button', {cls:'cfa-alert-btn', text:'Mark Revised Now'});
      btn.onclick = () => { this.plugin.markRevised(r.id); this.render(); };
    }

    // Modules checklist
    body.createEl('div', {cls:'cfa-section-header', text:'📋 Modules'});
    const modulesCard = body.createEl('div', {cls:'cfa-card'});
    r.modules.forEach(mod => {
      const done = p.modulesDone[mod] || false;
      const row = modulesCard.createEl('div', {cls:'cfa-module-row'});
      const cb = row.createEl('input', {type:'checkbox', cls:'cfa-module-check'});
      cb.checked = done;
      const label = row.createEl('label', {cls:'cfa-module-label' + (done ? ' done' : ''), text:mod});
      cb.onchange = () => { this.plugin.toggleModule(r.id, mod, cb.checked); label.className = 'cfa-module-label' + (cb.checked ? ' done' : ''); };
    });

    // Resources checklist
    body.createEl('div', {cls:'cfa-section-header', text:'📚 Resources'});
    const resCard = body.createEl('div', {cls:'cfa-card'});
    const resChips = resCard.createEl('div', {cls:'cfa-resource-chips'});
    r.resources.forEach(res => {
      const done = p.resourcesDone[res] || false;
      const chip = resChips.createEl('div', {cls:'cfa-resource-chip' + (done ? ' done' : ''), text:(done ? '✓ ' : '') + res});
      chip.style.cssText = `border-color:${subj.color}; color:${done ? '#fff' : subj.color}; background:${done ? subj.color : 'transparent'};`;
      chip.onclick = () => { this.plugin.toggleResource(r.id, res, !done); this.render(); };
    });

    // Open in Obsidian link
    const noteName = `Reading ${r.number} - ${r.title}`;
    const openLinkRow = body.createEl('div', {style:'margin-top:16px;'});
    const openLink = openLinkRow.createEl('button', {cls:'cfa-btn cfa-btn-primary', text:`📄 Open Note: ${noteName}`});
    openLink.onclick = async () => {
      const path = `CFA Level 1/${subj.name}/${noteName}.md`;
      let file = this.app.vault.getAbstractFileByPath(path);
      if (!file) {
        await this.plugin.generateAllNotes();
        file = this.app.vault.getAbstractFileByPath(path);
      }
      if (file) {
        const leaf = this.app.workspace.getLeaf('tab');
        await leaf.openFile(file);
      }
    };

    // Notes textarea
    body.createEl('div', {cls:'cfa-section-header', text:'📝 Quick Notes (saved in plugin)'});
    const notesCard = body.createEl('div', {cls:'cfa-card'});
    const ta = notesCard.createEl('textarea', {cls:'cfa-textarea', placeholder:'Jot quick notes, formulas to remember, exam traps...'});
    ta.value = p.notes || '';
    const saveNotesBtn = notesCard.createEl('button', {cls:'cfa-btn cfa-btn-primary', text:'Save Notes'});
    saveNotesBtn.style.marginTop = '8px';
    saveNotesBtn.onclick = () => {
      this.plugin.pluginData.progress[r.id].notes = ta.value;
      this.plugin.saveData_();
      new Notice('Notes saved!');
    };

    // Mark revised
    if (p.completedDate) {
      body.createEl('div', {style:'margin-top:20px;'}).createEl('button', {cls:'cfa-btn', text:'🔄 Mark as Revised Today'}).onclick = () => {
        this.plugin.markRevised(r.id);
        new Notice('Marked as revised!');
        this.render();
      };
    }
  }
}

// ─── SETTINGS ─────────────────────────────────────────────────────────────────
class CFASettingTab extends PluginSettingTab {
  constructor(app, plugin) { super(app, plugin); this.plugin = plugin; }
  display() {
    const {containerEl} = this;
    containerEl.empty();
    containerEl.createEl('h2', {text:'CFA Scheduler Settings'});
    new Setting(containerEl)
      .setName('Weekly Goal (readings)')
      .setDesc('Target number of readings to log per week')
      .addText(t => t.setValue(String(this.plugin.pluginData.weeklyGoalModules))
        .onChange(async (v) => { this.plugin.pluginData.weeklyGoalModules = parseInt(v)||3; await this.plugin.saveData_(); }));
    new Setting(containerEl)
      .setName('Open Dashboard on Startup')
      .addToggle(t => t.setValue(this.plugin.pluginData.openOnStartup||false)
        .onChange(async (v) => { this.plugin.pluginData.openOnStartup = v; await this.plugin.saveData_(); }));
    new Setting(containerEl)
      .setName('Generate Reading Notes')
      .setDesc('Create linked .md notes for all 93 CFA readings in your vault')
      .addButton(b => b.setButtonText('Generate').onClick(() => this.plugin.generateAllNotes()));
    new Setting(containerEl)
      .setName('Reset All Progress')
      .setDesc('⚠️ This will wipe all check marks and logs — cannot be undone')
      .addButton(b => b.setButtonText('Reset').setWarning().onClick(async () => {
        if (confirm('Are you sure? This will delete all progress.')) {
          this.plugin.pluginData = defaultData();
          await this.plugin.saveData_();
          new Notice('Progress reset.');
        }
      }));
  }
}

module.exports = CFASchedulerPlugin;
