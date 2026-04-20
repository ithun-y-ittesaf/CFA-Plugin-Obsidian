// CFA Level 1 Complete Syllabus Data
// Exam: 11 November 2026

const CFA_SYLLABUS = {
  examDate: "2026-11-11",
  subjects: [
    {
      id: "QA",
      name: "Quantitative Methods",
      totalModules: 11,
      color: "#4F86C6",
      readings: [
        {
          id: "R1", number: 1, title: "Rates and Returns",
          modules: [
            { id: "R1M1", title: "Module 1.1: Interest Rates and Return Measurement" },
            { id: "R1M2", title: "Module 1.2: Time-Weighted and Money-Weighted Returns" },
            { id: "R1M3", title: "Module 1.3: Common Measures of Return" },
            { id: "R1QB", title: "Q/B Kaplan", type: "practice" },
            { id: "R1EOC", title: "Q/B EOC/IFT Quiz", type: "practice" }
          ],
          resources: ["IFT Lectures", "IFT Quizzes", "Kaplan Reading", "Kaplan Module Quizzes"]
        },
        {
          id: "R2", number: 2, title: "The Time Value of Money in Finance",
          modules: [
            { id: "R2M1", title: "Module 2.1: Discounted Cash Flow Valuation" },
            { id: "R2M2", title: "Module 2.2: Implied Returns and Cash Flow Additivity" },
            { id: "R2QB", title: "Q/B Kaplan", type: "practice" },
            { id: "R2EOC", title: "Q/B EOC/IFT Quiz", type: "practice" }
          ],
          resources: ["IFT Lectures", "IFT Quizzes", "Kaplan Reading", "Kaplan Module Quizzes"]
        },
        {
          id: "R3", number: 3, title: "Statistical Measures of Asset Returns",
          modules: [
            { id: "R3M1", title: "Module 3.1: Central Tendency and Dispersion" },
            { id: "R3M2", title: "Module 3.2: Skewness, Kurtosis, and Correlation" },
            { id: "R3QB", title: "Q/B Kaplan", type: "practice" },
            { id: "R3EOC", title: "Q/B EOC", type: "practice" }
          ],
          resources: ["IFT Lectures", "IFT Quizzes", "Kaplan Reading", "Kaplan Module Quizzes"]
        },
        {
          id: "R4", number: 4, title: "Probability Trees and Conditional Expectations",
          modules: [
            { id: "R4M1", title: "Module 4.1: Probability Models, Expected Values, and Bayes' Formula" },
            { id: "R4QB", title: "Q/B Kaplan", type: "practice" },
            { id: "R4EOC", title: "Q/B EOC", type: "practice" }
          ],
          resources: ["IFT Lectures", "IFT Quizzes", "Kaplan Reading", "Kaplan Module Quizzes"]
        },
        {
          id: "R5", number: 5, title: "Portfolio Mathematics",
          modules: [
            { id: "R5M1", title: "Module 5.1: Probability Models for Portfolio Return and Risk" },
            { id: "R5QB", title: "Q/B Kaplan", type: "practice" },
            { id: "R5EOC", title: "Q/B EOC", type: "practice" }
          ],
          resources: ["IFT Lectures", "IFT Quizzes", "Kaplan Reading", "Kaplan Module Quizzes"]
        },
        {
          id: "R6", number: 6, title: "Simulation Methods",
          modules: [
            { id: "R6M1", title: "Module 6.1: Lognormal Distributions and Simulation Techniques" },
            { id: "R6QB", title: "Q/B Kaplan", type: "practice" },
            { id: "R6EOC", title: "Q/B EOC", type: "practice" }
          ],
          resources: ["IFT Lectures", "IFT Quizzes", "Kaplan Reading", "Kaplan Module Quizzes"]
        },
        {
          id: "R7", number: 7, title: "Estimation and Inference",
          modules: [
            { id: "R7M1", title: "Module 7.1: Sampling Techniques and the Central Limit Theorem" },
            { id: "R7QB", title: "Q/B Kaplan", type: "practice" },
            { id: "R7EOC", title: "Q/B EOC", type: "practice" }
          ],
          resources: ["IFT Lectures", "IFT Quizzes", "Kaplan Reading", "Kaplan Module Quizzes"]
        },
        {
          id: "R8", number: 8, title: "Hypothesis Testing",
          modules: [
            { id: "R8M1", title: "Module 8.1: Hypothesis Testing Basics" },
            { id: "R8M2", title: "Module 8.2: Types of Hypothesis Tests" },
            { id: "R8QB", title: "Q/B Kaplan", type: "practice" },
            { id: "R8EOC", title: "Q/B EOC", type: "practice" }
          ],
          resources: ["IFT Lectures", "IFT Quizzes", "Kaplan Reading", "Kaplan Module Quizzes"]
        },
        {
          id: "R9", number: 9, title: "Parametric and Non-Parametric Tests of Independence",
          modules: [
            { id: "R9M1", title: "Module 9.1: Tests for Independence" },
            { id: "R9QB", title: "Q/B Kaplan", type: "practice" },
            { id: "R9EOC", title: "Q/B EOC", type: "practice" }
          ],
          resources: ["IFT Lectures", "IFT Quizzes", "Kaplan Reading", "Kaplan Module Quizzes"]
        },
        {
          id: "R10", number: 10, title: "Simple Linear Regression",
          modules: [
            { id: "R10M1", title: "Module 10.1: Linear Regression Basics" },
            { id: "R10M2", title: "Module 10.2: Analysis of Variance (ANOVA) and Goodness of Fit" },
            { id: "R10M3", title: "Module 10.3: Predicted Values and Functional Forms" },
            { id: "R10QB", title: "Q/B Kaplan", type: "practice" },
            { id: "R10EOC", title: "Q/B EOC", type: "practice" }
          ],
          resources: ["IFT Lectures", "IFT Quizzes", "Kaplan Reading", "Kaplan Module Quizzes"]
        },
        {
          id: "R11", number: 11, title: "Introduction to Big Data Techniques",
          modules: [
            { id: "R11M1", title: "Module 11.1: Introduction to Fintech" },
            { id: "R11QB", title: "Q/B Kaplan", type: "practice" },
            { id: "R11EOC", title: "Q/B EOC", type: "practice" }
          ],
          resources: ["Reading", "Kaplan Lecture", "QB Kaplan"]
        }
      ]
    },
    {
      id: "EC",
      name: "Economics",
      totalModules: 8,
      color: "#E07B54",
      readings: [
        {
          id: "R12", number: 12, title: "Firms and Market Structures",
          modules: [
            { id: "R12M1", title: "Module 12.1: Breakeven, Shutdown, and Scale" },
            { id: "R12M2", title: "Module 12.2: Characteristics of Market Structures" },
            { id: "R12M3", title: "Module 12.3: Identifying Market Structures" }
          ],
          resources: ["Reading", "Kaplan Lecture", "QB Kaplan"]
        },
        {
          id: "R13", number: 13, title: "Understanding Business Cycles",
          modules: [
            { id: "R13M1", title: "Module 13.1: Business Cycles" }
          ],
          resources: ["Reading", "Kaplan Lecture", "QB Kaplan"]
        },
        {
          id: "R14", number: 14, title: "Fiscal Policy",
          modules: [
            { id: "R14M1", title: "Module 14.1: Fiscal Policy Objectives" }
          ],
          resources: ["Reading", "Kaplan Lecture", "QB Kaplan"]
        },
        {
          id: "R15", number: 15, title: "Monetary Policy",
          modules: [
            { id: "R15M1", title: "Module 15.1: Monetary Policy" }
          ],
          resources: ["Reading", "Kaplan Lecture", "QB Kaplan"]
        },
        {
          id: "R16", number: 16, title: "Introduction to Geopolitics",
          modules: [
            { id: "R16M1", title: "Module 16.1: Geopolitics" }
          ],
          resources: ["Reading", "Kaplan Lecture", "QB Kaplan"]
        },
        {
          id: "R17", number: 17, title: "International Trade",
          modules: [
            { id: "R17M1", title: "Module 17.1: International Trade" }
          ],
          resources: ["Reading", "Kaplan Lecture", "QB Kaplan"]
        },
        {
          id: "R18", number: 18, title: "Capital Flows and the FX Market",
          modules: [
            { id: "R18M1", title: "Module 18.1: The Foreign Exchange Market" },
            { id: "R18M2", title: "Module 18.2: Managing Exchange Rates" }
          ],
          resources: ["Reading", "Kaplan Lecture", "QB Kaplan"]
        },
        {
          id: "R19", number: 19, title: "Exchange Rate Calculations",
          modules: [
            { id: "R19M1", title: "Module 19.1: Exchange Rate Calculations" }
          ],
          resources: ["Reading", "Kaplan Lecture", "QB Kaplan"]
        }
      ]
    },
    {
      id: "FSA",
      name: "Financial Statement Analysis",
      totalModules: 12,
      color: "#5BA87A",
      readings: [
        {
          id: "R27", number: 27, title: "Introduction to Financial Statement Analysis",
          modules: [
            { id: "R27M1", title: "Module 27.1: Financial Statement Roles" }
          ],
          resources: ["Reading", "Kaplan Lecture", "QB Kaplan"]
        },
        {
          id: "R28", number: 28, title: "Analyzing Income Statements",
          modules: [
            { id: "R28M1", title: "Module 28.1: Revenue Recognition" },
            { id: "R28M2", title: "Module 28.2: Expense Recognition" },
            { id: "R28M3", title: "Module 28.3: Nonrecurring Items" },
            { id: "R28M4", title: "Module 28.4: Earnings Per Share" },
            { id: "R28M5", title: "Module 28.5: Earnings Per Share (cont.)" }
          ],
          resources: ["Reading", "Kaplan Lecture", "QB Kaplan"]
        },
        {
          id: "R29", number: 29, title: "Analyzing Balance Sheets",
          modules: [
            { id: "R29M1", title: "Module 29.1: Assets and Liabilities" },
            { id: "R29M2", title: "Module 29.2: Equity" }
          ],
          resources: ["Reading", "Kaplan Lecture", "QB Kaplan"]
        },
        {
          id: "R30", number: 30, title: "Analyzing Statements of Cash Flows I",
          modules: [
            { id: "R30M1", title: "Module 30.1: Cash Flow Statement" }
          ],
          resources: ["Reading", "Kaplan Lecture", "QB Kaplan"]
        },
        {
          id: "R31", number: 31, title: "Analyzing Statements of Cash Flows II",
          modules: [
            { id: "R31M1", title: "Module 31.1: Free Cash Flow and Analysis" }
          ],
          resources: ["Reading", "Kaplan Lecture", "QB Kaplan"]
        },
        {
          id: "R32", number: 32, title: "Analysis of Inventories",
          modules: [
            { id: "R32M1", title: "Module 32.1: Inventory Measurement" },
            { id: "R32M2", title: "Module 32.2: Inflation Impact on FIFO and LIFO" },
            { id: "R32M3", title: "Module 32.3: Presentation and Disclosure" }
          ],
          resources: ["Reading", "Kaplan Lecture", "QB Kaplan"]
        },
        {
          id: "R33", number: 33, title: "Analysis of Long-Term Assets",
          modules: [
            { id: "R33M1", title: "Module 33.1: Intangible Long-Lived Assets" },
            { id: "R33M2", title: "Module 33.2: Impairment and Derecognition" },
            { id: "R33M3", title: "Module 33.3: Long-Term Asset Disclosures" }
          ],
          resources: ["Reading", "Kaplan Lecture", "QB Kaplan"]
        },
        {
          id: "R34", number: 34, title: "Topics in Long-Term Liabilities and Equity",
          modules: [
            { id: "R34M1", title: "Module 34.1: Long-Term Liabilities" },
            { id: "R34M2", title: "Module 34.2: Leases and Post-Employment Benefits" }
          ],
          resources: ["Reading", "Kaplan Lecture", "QB Kaplan"]
        },
        {
          id: "R35", number: 35, title: "Analysis of Income Taxes",
          modules: [
            { id: "R35M1", title: "Module 35.1: Income Tax Accounting" }
          ],
          resources: ["Reading", "Kaplan Lecture", "QB Kaplan"]
        },
        {
          id: "R36", number: 36, title: "Financial Reporting Quality",
          modules: [
            { id: "R36M1", title: "Module 36.1: Reporting Quality" },
            { id: "R36M2", title: "Module 36.2: Accounting Choices and Estimates" },
            { id: "R36M3", title: "Module 36.3: Warning Signs" }
          ],
          resources: ["Reading", "Kaplan Lecture", "QB Kaplan"]
        },
        {
          id: "R37", number: 37, title: "Financial Analysis Techniques",
          modules: [
            { id: "R37M1", title: "Module 37.1: Introduction to Financial Ratios" },
            { id: "R37M2", title: "Module 37.2: Financial Ratios, Part 1" },
            { id: "R37M3", title: "Module 37.3: Financial Ratios, Part 2" },
            { id: "R37M4", title: "Module 37.4: DuPont Analysis" },
            { id: "R37M5", title: "Module 37.5: Industry-Specific Financial Ratios" }
          ],
          resources: ["Reading", "Kaplan Lecture", "QB Kaplan"]
        },
        {
          id: "R38", number: 38, title: "Introduction to Financial Statement Modeling",
          modules: [
            { id: "R38M1", title: "Module 38.1: Financial Statement Modeling" }
          ],
          resources: ["Reading", "Kaplan Lecture", "QB Kaplan"]
        }
      ]
    },
    {
      id: "CI",
      name: "Corporate Issuers",
      totalModules: 7,
      color: "#9B6B9B",
      readings: [
        {
          id: "R20", number: 20, title: "Organizational Forms, Corporate Issuer Features, and Ownership",
          modules: [
            { id: "R20M1", title: "Module 20.1: Features of Corporate Issuers" }
          ],
          resources: ["Reading", "Kaplan Lecture", "QB Kaplan"]
        },
        {
          id: "R21", number: 21, title: "Investors and Other Stakeholders",
          modules: [
            { id: "R21M1", title: "Module 21.1: Stakeholders and ESG Factors" }
          ],
          resources: ["Reading", "Kaplan Lecture", "QB Kaplan"]
        },
        {
          id: "R22", number: 22, title: "Corporate Governance: Conflicts, Mechanisms, Risks, and Benefits",
          modules: [
            { id: "R22M1", title: "Module 22.1: Corporate Governance" }
          ],
          resources: ["Reading", "Kaplan Lecture", "QB Kaplan"]
        },
        {
          id: "R23", number: 23, title: "Working Capital and Liquidity",
          modules: [
            { id: "R23M1", title: "Module 23.1: Liquidity Measures and Management" }
          ],
          resources: ["Reading", "Kaplan Lecture", "QB Kaplan"]
        },
        {
          id: "R24", number: 24, title: "Capital Investments and Capital Allocation",
          modules: [
            { id: "R24M1", title: "Module 24.1: Capital Investments and Project Measures" },
            { id: "R24M2", title: "Module 24.2: Capital Allocation Principles and Real Options" }
          ],
          resources: ["Reading", "Kaplan Lecture", "QB Kaplan"]
        },
        {
          id: "R25", number: 25, title: "Capital Structure",
          modules: [
            { id: "R25M1", title: "Module 25.1: Weighted-Average Cost of Capital" },
            { id: "R25M2", title: "Module 25.2: Capital Structure Theories" }
          ],
          resources: ["Reading", "Kaplan Lecture", "QB Kaplan"]
        },
        {
          id: "R26", number: 26, title: "Business Models",
          modules: [
            { id: "R26M1", title: "Module 26.1: Business Model Features and Types" }
          ],
          resources: ["Reading", "Kaplan Lecture", "QB Kaplan"]
        }
      ]
    },
    {
      id: "EI",
      name: "Equity Investments",
      totalModules: 8,
      color: "#D4A843",
      readings: [
        {
          id: "R39", number: 39, title: "Market Organization and Structure",
          modules: [
            { id: "R39M1", title: "Module 39.1: Markets, Assets, and Intermediaries" },
            { id: "R39M2", title: "Module 39.2: Positions and Leverage" },
            { id: "R39M3", title: "Module 39.3: Order Execution and Validity" }
          ],
          resources: ["Reading", "Kaplan Lecture", "QB Kaplan"]
        },
        {
          id: "R40", number: 40, title: "Security Market Indexes",
          modules: [
            { id: "R40M1", title: "Module 40.1: Index Weighting Methods" },
            { id: "R40M2", title: "Module 40.2: Uses and Types of Indexes" }
          ],
          resources: ["Reading", "Kaplan Lecture", "QB Kaplan"]
        },
        {
          id: "R41", number: 41, title: "Market Efficiency",
          modules: [
            { id: "R41M1", title: "Module 41.1: Market Efficiency" }
          ],
          resources: ["Reading", "Kaplan Lecture", "QB Kaplan"]
        },
        {
          id: "R42", number: 42, title: "Overview of Equity Securities",
          modules: [
            { id: "R42M1", title: "Module 42.1: Equity Securities" }
          ],
          resources: ["Reading", "Kaplan Lecture", "QB Kaplan"]
        },
        {
          id: "R43", number: 43, title: "Introduction to Industry and Company Analysis",
          modules: [
            { id: "R43M1", title: "Module 43.1: Industry Analysis Introduction" }
          ],
          resources: ["Reading", "Kaplan Lecture", "QB Kaplan"]
        },
        {
          id: "R44", number: 44, title: "Industry and Competitive Analysis",
          modules: [
            { id: "R44M1", title: "Module 44.1: Industry Analysis" },
            { id: "R44M2", title: "Module 44.2: Industry Structure and Competitive Positioning" }
          ],
          resources: ["Reading", "Kaplan Lecture", "QB Kaplan"]
        },
        {
          id: "R45", number: 45, title: "Company Analysis: Forecasting",
          modules: [
            { id: "R45M1", title: "Module 45.1: Forecasting in Company Analysis" }
          ],
          resources: ["Reading", "Kaplan Lecture", "QB Kaplan"]
        },
        {
          id: "R46", number: 46, title: "Equity Valuation: Concepts and Basic Tools",
          modules: [
            { id: "R46M1", title: "Module 46.1: Dividends, Splits, and Repurchases" },
            { id: "R46M2", title: "Module 46.2: Dividend Discount Models" },
            { id: "R46M3", title: "Module 46.3: Multiplier Models and Asset-Based Valuation" }
          ],
          resources: ["Reading", "Kaplan Lecture", "QB Kaplan"]
        }
      ]
    },
    {
      id: "FI",
      name: "Fixed Income",
      totalModules: 19,
      color: "#5B8FA8",
      readings: [
        { id: "R47", number: 47, title: "Fixed-Income Instrument Features", modules: [{ id: "R47M1", title: "Module 47.1: Fixed-Income Instrument Features" }], resources: ["Reading", "Kaplan Lecture", "QB Kaplan"] },
        { id: "R48", number: 48, title: "Fixed-Income Cash Flows and Types", modules: [{ id: "R48M1", title: "Module 48.1: Fixed-Income Cash Flows and Types" }], resources: ["Reading", "Kaplan Lecture", "QB Kaplan"] },
        { id: "R49", number: 49, title: "Fixed-Income Issuance and Trading", modules: [{ id: "R49M1", title: "Module 49.1: Fixed-Income Issuance and Trading" }], resources: ["Reading", "Kaplan Lecture", "QB Kaplan"] },
        { id: "R50", number: 50, title: "Fixed-Income Markets for Corporate Issuers", modules: [{ id: "R50M1", title: "Module 50.1: Fixed-Income Markets for Corporate Issuers" }], resources: ["Reading", "Kaplan Lecture", "QB Kaplan"] },
        { id: "R51", number: 51, title: "Fixed-Income Markets for Government Issuers", modules: [{ id: "R51M1", title: "Module 51.1: Fixed-Income Markets for Government Issuers" }], resources: ["Reading", "Kaplan Lecture", "QB Kaplan"] },
        { id: "R52", number: 52, title: "Fixed-Income Bond Valuation: Prices and Yields", modules: [{ id: "R52M1", title: "Module 52.1: Fixed-Income Bond Valuation: Prices and Yields" }], resources: ["Reading", "Kaplan Lecture", "QB Kaplan"] },
        { id: "R53", number: 53, title: "Yield and Yield Spread Measures for Fixed-Rate Bonds", modules: [{ id: "R53M1", title: "Module 53.1: Yield and Yield Spread Measures for Fixed-Rate Bonds" }], resources: ["Reading", "Kaplan Lecture", "QB Kaplan"] },
        { id: "R54", number: 54, title: "Yield and Yield Spread Measures for Floating-Rate Instruments", modules: [{ id: "R54M1", title: "Module 54.1: Yield and Yield Spread Measures for Floating-Rate Instruments" }], resources: ["Reading", "Kaplan Lecture", "QB Kaplan"] },
        { id: "R55", number: 55, title: "The Term Structure of Interest Rates", modules: [{ id: "R55M1", title: "Module 55.1: The Term Structure of Interest Rates: Spot, Par, and Forward" }], resources: ["Reading", "Kaplan Lecture", "QB Kaplan"] },
        { id: "R56", number: 56, title: "Interest Rate Risk and Return", modules: [{ id: "R56M1", title: "Module 56.1: Interest Rate Risk and Return" }], resources: ["Reading", "Kaplan Lecture", "QB Kaplan"] },
        { id: "R57", number: 57, title: "Yield-Based Bond Duration Measures and Properties", modules: [{ id: "R57M1", title: "Module 57.1: Yield-Based Bond Duration Measures and Properties" }], resources: ["Reading", "Kaplan Lecture", "QB Kaplan"] },
        { id: "R58", number: 58, title: "Yield-Based Bond Convexity and Portfolio Properties", modules: [{ id: "R58M1", title: "Module 58.1: Yield-Based Bond Convexity and Portfolio Properties" }], resources: ["Reading", "Kaplan Lecture", "QB Kaplan"] },
        { id: "R59", number: 59, title: "Curve-Based and Empirical Fixed-Income Risk Measures", modules: [{ id: "R59M1", title: "Module 59.1: Curve-Based and Empirical Fixed-Income Risk Measures" }], resources: ["Reading", "Kaplan Lecture", "QB Kaplan"] },
        { id: "R60", number: 60, title: "Credit Risk", modules: [{ id: "R60M1", title: "Module 60.1: Credit Risk" }], resources: ["Reading", "Kaplan Lecture", "QB Kaplan"] },
        { id: "R61", number: 61, title: "Credit Analysis for Government Issuers", modules: [{ id: "R61M1", title: "Module 61.1: Credit Analysis for Government Issuers" }], resources: ["Reading", "Kaplan Lecture", "QB Kaplan"] },
        { id: "R62", number: 62, title: "Credit Analysis for Corporate Issuers", modules: [{ id: "R62M1", title: "Module 62.1: Credit Analysis for Corporate Issuers" }], resources: ["Reading", "Kaplan Lecture", "QB Kaplan"] },
        { id: "R63", number: 63, title: "Fixed-Income Securitization", modules: [{ id: "R63M1", title: "Module 63.1: Fixed-Income Securitization" }], resources: ["Reading", "Kaplan Lecture", "QB Kaplan"] },
        { id: "R64", number: 64, title: "Asset-Backed Security (ABS) Instrument and Market Features", modules: [{ id: "R64M1", title: "Module 64.1: Asset-Backed Security (ABS) Instrument and Market Features" }], resources: ["Reading", "Kaplan Lecture", "QB Kaplan"] },
        { id: "R65", number: 65, title: "Mortgage-Backed Security (MBS) Instrument and Market Features", modules: [{ id: "R65M1", title: "Module 65.1: Mortgage-Backed Security (MBS) Instrument and Market Features" }], resources: ["Reading", "Kaplan Lecture", "QB Kaplan"] }
      ]
    },
    {
      id: "DV",
      name: "Derivatives",
      totalModules: 10,
      color: "#C96A4A",
      readings: [
        { id: "R66", number: 66, title: "Derivative Instrument and Derivative Market Features", modules: [{ id: "R66M1", title: "Module 66.1: Derivative Instrument and Derivative Market Features" }], resources: ["Reading", "Kaplan Lecture", "QB Kaplan"] },
        { id: "R67", number: 67, title: "Forward Commitment and Contingent Claim Features and Instruments", modules: [{ id: "R67M1", title: "Module 67.1: Forward Commitment and Contingent Claim Features" }], resources: ["Reading", "Kaplan Lecture", "QB Kaplan"] },
        { id: "R68", number: 68, title: "Derivative Benefits, Risks, and Issuer and Investor Uses", modules: [{ id: "R68M1", title: "Module 68.1: Derivative Benefits, Risks, and Uses" }], resources: ["Reading", "Kaplan Lecture", "QB Kaplan"] },
        { id: "R69", number: 69, title: "Arbitrage, Replication, and the Cost of Carry in Pricing Derivatives", modules: [{ id: "R69M1", title: "Module 69.1: Arbitrage, Replication, and Cost of Carry" }], resources: ["Reading", "Kaplan Lecture", "QB Kaplan"] },
        { id: "R70", number: 70, title: "Pricing and Valuation of Forward Contracts and for an Underlying with Varying Maturities", modules: [{ id: "R70M1", title: "Module 70.1: Pricing and Valuation of Forward Contracts" }], resources: ["Reading", "Kaplan Lecture", "QB Kaplan"] },
        { id: "R71", number: 71, title: "Pricing and Valuation of Futures Contracts", modules: [{ id: "R71M1", title: "Module 71.1: Pricing and Valuation of Futures Contracts" }], resources: ["Reading", "Kaplan Lecture", "QB Kaplan"] },
        { id: "R72", number: 72, title: "Pricing and Valuation of Interest Rates and Other Swaps", modules: [{ id: "R72M1", title: "Module 72.1: Pricing and Valuation of Interest Rate Swaps" }], resources: ["Reading", "Kaplan Lecture", "QB Kaplan"] },
        { id: "R73", number: 73, title: "Pricing and Valuation of Options", modules: [{ id: "R73M1", title: "Module 73.1: Pricing and Valuation of Options" }], resources: ["Reading", "Kaplan Lecture", "QB Kaplan"] },
        { id: "R74", number: 74, title: "Option Replication Using Put-Call Parity", modules: [{ id: "R74M1", title: "Module 74.1: Option Replication Using Put-Call Parity" }], resources: ["Reading", "Kaplan Lecture", "QB Kaplan"] },
        { id: "R75", number: 75, title: "Valuing a Derivative Using a One-Period Binomial Model", modules: [{ id: "R75M1", title: "Module 75.1: Valuing a Derivative Using a One-Period Binomial Model" }], resources: ["Reading", "Kaplan Lecture", "QB Kaplan"] }
      ]
    },
    {
      id: "AI",
      name: "Alternative Investments",
      totalModules: 7,
      color: "#7A9E7E",
      readings: [
        { id: "R76", number: 76, title: "Alternative Investment Features, Methods, and Structures", modules: [{ id: "R76M1", title: "Module 76.1: Alternative Investment Features, Methods, and Structures" }], resources: ["Reading", "Kaplan Lecture", "QB Kaplan"] },
        { id: "R77", number: 77, title: "Alternative Investment Performance and Returns", modules: [{ id: "R77M1", title: "Module 77.1: Alternative Investment Performance and Returns" }], resources: ["Reading", "Kaplan Lecture", "QB Kaplan"] },
        { id: "R78", number: 78, title: "Investments in Private Capital: Equity and Debt", modules: [{ id: "R78M1", title: "Module 78.1: Investments in Private Capital" }], resources: ["Reading", "Kaplan Lecture", "QB Kaplan"] },
        { id: "R79", number: 79, title: "Real Estate and Infrastructure", modules: [{ id: "R79M1", title: "Module 79.1: Real Estate and Infrastructure" }], resources: ["Reading", "Kaplan Lecture", "QB Kaplan"] },
        { id: "R80", number: 80, title: "Natural Resources", modules: [{ id: "R80M1", title: "Module 80.1: Natural Resources" }], resources: ["Reading", "Kaplan Lecture", "QB Kaplan"] },
        { id: "R81", number: 81, title: "Hedge Funds", modules: [{ id: "R81M1", title: "Module 81.1: Hedge Funds" }], resources: ["Reading", "Kaplan Lecture", "QB Kaplan"] },
        { id: "R82", number: 82, title: "Introduction to Digital Assets", modules: [{ id: "R82M1", title: "Module 82.1: Introduction to Digital Assets" }], resources: ["Reading", "Kaplan Lecture", "QB Kaplan"] }
      ]
    },
    {
      id: "PM",
      name: "Portfolio Management",
      totalModules: 6,
      color: "#A0748A",
      readings: [
        { id: "R83", number: 83, title: "Portfolio Management: An Overview", modules: [{ id: "R83M1", title: "Module 83.1: Portfolio Management: An Overview" }], resources: ["Reading", "Kaplan Lecture", "QB Kaplan"] },
        { id: "R84", number: 84, title: "Portfolio Risk and Return: Part I", modules: [{ id: "R84M1", title: "Module 84.1: Portfolio Risk and Return: Part I" }], resources: ["Reading", "Kaplan Lecture", "QB Kaplan"] },
        { id: "R85", number: 85, title: "Portfolio Risk and Return: Part II", modules: [{ id: "R85M1", title: "Module 85.1: Portfolio Risk and Return: Part II" }], resources: ["Reading", "Kaplan Lecture", "QB Kaplan"] },
        { id: "R86", number: 86, title: "Basics of Portfolio Planning and Construction", modules: [{ id: "R86M1", title: "Module 86.1: Basics of Portfolio Planning and Construction" }], resources: ["Reading", "Kaplan Lecture", "QB Kaplan"] },
        { id: "R87", number: 87, title: "The Behavioral Biases of Individuals", modules: [{ id: "R87M1", title: "Module 87.1: The Behavioral Biases of Individuals" }], resources: ["Reading", "Kaplan Lecture", "QB Kaplan"] },
        { id: "R88", number: 88, title: "Introduction to Risk Management", modules: [{ id: "R88M1", title: "Module 88.1: Introduction to Risk Management" }], resources: ["Reading", "Kaplan Lecture", "QB Kaplan"] }
      ]
    },
    {
      id: "EPS",
      name: "Ethical and Professional Standards",
      totalModules: 5,
      color: "#B07D62",
      readings: [
        { id: "R89", number: 89, title: "Ethics and Trust in the Investment Profession", modules: [{ id: "R89M1", title: "Module 89.1: Ethics and Trust" }], resources: ["Reading", "Kaplan Lecture", "QB Kaplan"] },
        { id: "R90", number: 90, title: "Code of Ethics and Standards of Professional Conduct", modules: [{ id: "R90M1", title: "Module 90.1: Code and Standards Overview" }, { id: "R90M2", title: "Module 90.2: Standards I-III" }, { id: "R90M3", title: "Module 90.3: Standards IV-VII" }], resources: ["Reading", "Kaplan Lecture", "QB Kaplan"] },
        { id: "R91", number: 91, title: "Guidance for Standards I-VII", modules: [{ id: "R91M1", title: "Module 91.1: Guidance for Standards I-III" }, { id: "R91M2", title: "Module 91.2: Guidance for Standards IV-VII" }], resources: ["Reading", "Kaplan Lecture", "QB Kaplan"] },
        { id: "R92", number: 92, title: "Introduction to the Global Investment Performance Standards (GIPS)", modules: [{ id: "R92M1", title: "Module 92.1: GIPS Introduction" }], resources: ["Reading", "Kaplan Lecture", "QB Kaplan"] },
        { id: "R93", number: 93, title: "Ethics Application", modules: [{ id: "R93M1", title: "Module 93.1: Ethics Application Cases" }], resources: ["Reading", "Kaplan Lecture", "QB Kaplan"] }
      ]
    }
  ]
};
