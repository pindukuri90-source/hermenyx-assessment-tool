export type FieldType =
  | "multiselect"
  | "scale"
  | "textarea"
  | "text"
  | "radio"
  | "number"
  | "table";

export interface TableColumn {
  key: string;
  label: string;
  placeholder?: string;
}

export interface SectionField {
  name: string;
  label: string;
  description?: string;
  type: FieldType;
  options?: string[];
  columns?: TableColumn[];
  tableRows?: number;
  placeholder?: string;
  required?: boolean;
}

export interface SectionConfig {
  id: number;
  title: string;
  subtitle: string;
  fields: SectionField[];
}

export type CompanySize = "small" | "medium" | "enterprise";

// ─── SMALL (under 100 employees) ──────────────────────────────────────────────
// 6 sections — concise, high-signal questions tailored to smaller teams

export const SMALL_SECTIONS: SectionConfig[] = [
  {
    id: 1,
    title: "Executive Priorities",
    subtitle: "Help us understand your business goals and where data is holding you back.",
    fields: [
      {
        name: "topPriorities",
        label: "What are your top strategic priorities this year?",
        description: "Select all that apply.",
        type: "multiselect",
        options: [
          "Revenue growth and new customer acquisition",
          "Operational efficiency and cost reduction",
          "Customer experience improvement",
          "Digital transformation",
          "Regulatory compliance",
          "Product or service innovation",
        ],
        required: false,
      },
      {
        name: "dataConfidence",
        label: "How confident are you that your team has the data visibility needed to execute on these priorities?",
        description: "1 = No confidence at all   |   5 = Fully confident",
        type: "scale",
        options: ["1", "2", "3", "4", "5"],
        required: false,
      },
      {
        name: "dataVisionStatement",
        label: "What would better data visibility mean for your business?",
        description: "Describe the outcomes you expect.",
        type: "textarea",
        placeholder: "e.g., We would close the books in 2 days instead of 10 and know which products are actually profitable...",
        required: false,
      },
    ],
  },
  {
    id: 2,
    title: "Current Reporting Pain Points",
    subtitle: "Let's understand where your reporting is letting your team down.",
    fields: [
      {
        name: "reportingChallenges",
        label: "What are your biggest reporting challenges today?",
        description: "Select all that apply.",
        type: "multiselect",
        options: [
          "Reports take too long to produce",
          "Data is pulled manually from multiple systems",
          "Numbers don't match between reports",
          "Data is outdated by the time leadership sees it",
          "Too many one-off spreadsheet reports",
          "No single source of truth",
          "Reports exist but are not actionable",
        ],
        required: false,
      },
      {
        name: "adHocResponseTime",
        label: "How long does it typically take to answer an ad-hoc data question from leadership?",
        type: "radio",
        options: [
          "Same day or within hours",
          "1–3 business days",
          "1 week or more",
          "We often cannot answer it at all",
        ],
        required: false,
      },
      {
        name: "biggestReportingFrustration",
        label: "Describe your single biggest reporting frustration.",
        type: "textarea",
        placeholder: "e.g., Every Monday I manually compile a sales summary from three spreadsheets. It takes 3 hours and is always out of date...",
        required: false,
      },
    ],
  },
  {
    id: 3,
    title: "Insights & Decision Intelligence",
    subtitle: "Let's evaluate whether your team has what it needs to make fast, confident decisions.",
    fields: [
      {
        name: "decisionWithoutData",
        label: "How often are significant business decisions made without reliable or timely data?",
        type: "radio",
        options: [
          "Rarely — data is almost always available",
          "Sometimes — data is available but often delayed",
          "Frequently — leadership regularly relies on gut feel",
          "Almost always — we lack the infrastructure to support decisions",
        ],
        required: false,
      },
      {
        name: "realtimeKpiVisibility",
        label: "Do you have real-time or near-real-time visibility into your key business KPIs?",
        type: "radio",
        options: [
          "Yes — live dashboards are in place",
          "Partially — some KPIs are visible, others are not",
          "No — KPIs are reported weekly or monthly at best",
          "We do not have formally defined KPIs",
        ],
        required: false,
      },
      {
        name: "desiredKpis",
        label: "What KPIs does your leadership team wish they had better visibility into?",
        type: "textarea",
        placeholder: "e.g., Cash flow in real time, gross margin by product line, customer acquisition cost by channel...",
        required: false,
      },
    ],
  },
  {
    id: 4,
    title: "Systems, Tools & Data Environment",
    subtitle: "Understanding your current tools helps us build a modernization path that fits your environment.",
    fields: [
      {
        name: "primaryDataStore",
        label: "Where does your business data primarily live today?",
        type: "radio",
        options: [
          "Mostly spreadsheets (Excel or Google Sheets)",
          "QuickBooks, Xero, or similar accounting software",
          "A CRM or ERP system",
          "A mix of tools with no central location",
          "A cloud data warehouse (Snowflake, BigQuery, etc.)",
        ],
        required: false,
      },
      {
        name: "biTools",
        label: "Which reporting or BI tools does your team use?",
        type: "multiselect",
        options: [
          "Excel or Google Sheets",
          "Microsoft Power BI",
          "Tableau",
          "Looker or Looker Studio",
          "Custom-built reports",
          "No formal BI tool",
        ],
      },
      {
        name: "crmErpSystems",
        label: "What core business software are you currently using?",
        type: "textarea",
        placeholder: "e.g., HubSpot CRM, QuickBooks, Shopify, Gusto HR...",
        required: false,
      },
    ],
  },
  {
    id: 5,
    title: "Prioritization",
    subtitle: "Let's focus on where to start. The best modernization plans begin with quick wins that build confidence and momentum.",
    fields: [
      {
        name: "quickWins",
        label: "What should be improved first to generate quick wins within 30–60 days?",
        type: "textarea",
        placeholder: "e.g., Automate the weekly sales report. Replace the manual cash flow spreadsheet with a live dashboard...",
        required: false,
      },
      {
        name: "successIn90Days",
        label: "What does success look like for your business in 90 days?",
        type: "textarea",
        placeholder: "e.g., I have a live dashboard I check every morning. My team spends zero hours building manual reports...",
        required: false,
      },
      {
        name: "changeReadiness",
        label: "How ready is your team to adopt new tools and processes?",
        description: "1 = Significant resistance expected   |   5 = Fully ready and motivated",
        type: "scale",
        options: ["1", "2", "3", "4", "5"],
      },
    ],
  },
  {
    id: 6,
    title: "Executive Summary",
    subtitle: "A few final questions to help our team craft your personalized executive summary and 30-60-90 day roadmap.",
    fields: [
      {
        name: "biggestChallenge",
        label: "What is your single biggest data or analytics challenge today?",
        type: "textarea",
        placeholder: "e.g., I have no idea which customers or products are actually driving profit. Every report takes hours to build...",
        required: false,
      },
      {
        name: "leadershipOutcomes",
        label: "What outcomes matter most to you right now?",
        type: "multiselect",
        options: [
          "Faster and more confident decision-making",
          "Reduced time spent on manual reporting",
          "Improved data accuracy and trust",
          "Real-time visibility into business performance",
          "Understanding which customers and products drive profit",
          "Scalable analytics without hiring more staff",
        ],
        required: false,
      },
      {
        name: "fiftyTwoDays",
        label: "Imagine your organization had stronger data intelligence, automated reporting, and more reliable insight delivery — enough to give your team back one full day every week. What problems would that eliminate, and how would you reinvest those 52 days per year to accelerate decisions, improve operations, serve customers better, or grow the business?",
        type: "textarea",
        placeholder: "e.g., We would eliminate the weekly manual reporting cycle entirely. Those 52 days would go toward building better customer relationships, closing deals faster, and finally having time to analyze which products are actually profitable...",
        required: false,
      },
      {
        name: "contactPreference",
        label: "How would you prefer to receive your executive summary and roadmap?",
        type: "radio",
        options: [
          "Email PDF summary",
          "Live virtual walkthrough with the consulting team",
          "Online portal or dashboard",
        ],
      },
    ],
  },
];

// ─── MEDIUM (under 500 employees) ─────────────────────────────────────────────
// 9 sections — moderate depth, growing organizations navigating complexity

export const MEDIUM_SECTIONS: SectionConfig[] = [
  {
    id: 1,
    title: "Executive Priorities",
    subtitle: "Help us understand your organization's strategic focus and where data limitations are holding you back.",
    fields: [
      {
        name: "topPriorities",
        label: "What are your top strategic business priorities for this year?",
        description: "Select all that apply.",
        type: "multiselect",
        options: [
          "Revenue growth and market expansion",
          "Operational efficiency and cost reduction",
          "Customer experience improvement",
          "Digital transformation",
          "Regulatory compliance and risk management",
          "Talent acquisition and workforce development",
          "Product or service innovation",
          "Supply chain optimization",
        ],
        required: false,
      },
      {
        name: "dataConfidence",
        label: "How confident are you that your team has the data visibility needed to execute on these priorities?",
        description: "1 = No confidence at all   |   5 = Fully confident",
        type: "scale",
        options: ["1", "2", "3", "4", "5"],
        required: false,
      },
      {
        name: "painfulDepartments",
        label: "Which departments feel the most pain from data and reporting limitations today?",
        type: "multiselect",
        options: [
          "Finance and Accounting",
          "Sales and Revenue",
          "Operations",
          "Marketing",
          "Human Resources",
          "Information Technology",
          "Customer Success and Service",
          "Executive Leadership",
        ],
      },
      {
        name: "dataVisionStatement",
        label: "What would achieving better data visibility and faster insights mean for your business?",
        type: "textarea",
        placeholder: "e.g., We would close the books in 2 days instead of 10 and identify margin leaks in real time...",
        required: false,
      },
    ],
  },
  {
    id: 2,
    title: "Current Reporting Pain Points",
    subtitle: "Let's assess the current state of your reporting and where it is failing your leadership team.",
    fields: [
      {
        name: "reportCount",
        label: "Approximately how many reports or dashboards does your organization maintain today?",
        type: "radio",
        options: ["Fewer than 10", "10–30", "31–75", "More than 75", "Unknown"],
        required: false,
      },
      {
        name: "reportingChallenges",
        label: "What are your biggest reporting and dashboard challenges today?",
        description: "Select all that apply.",
        type: "multiselect",
        options: [
          "Reports take too long to produce",
          "Data is pulled manually from multiple systems",
          "Numbers don't match between reports",
          "No self-service capability for business users",
          "Data is outdated by the time it reaches leadership",
          "Too many one-off spreadsheet reports",
          "No single source of truth",
          "Executive dashboards don't exist or are inadequate",
          "Reports exist but are not actionable",
        ],
        required: false,
      },
      {
        name: "adHocResponseTime",
        label: "How long does it typically take to answer an ad-hoc data question from leadership?",
        type: "radio",
        options: [
          "Same day or within hours",
          "1–3 business days",
          "1 week or more",
          "We often cannot answer it at all",
        ],
        required: false,
      },
    ],
  },
  {
    id: 3,
    title: "Data Quality, Trust & Governance",
    subtitle: "Data that is not trusted will never be used. Let's understand the current state of your data quality.",
    fields: [
      {
        name: "dataTrustLevel",
        label: "How much does your leadership team trust the data they receive?",
        description: "1 = We frequently question the numbers   |   5 = Full trust, decisions are made confidently",
        type: "scale",
        options: ["1", "2", "3", "4", "5"],
        required: false,
      },
      {
        name: "dataQualityIssues",
        label: "Where do data quality issues most frequently occur in your organization?",
        type: "multiselect",
        options: [
          "Manual data entry errors at the source",
          "Data siloed in disconnected systems",
          "Manual transformation in spreadsheets",
          "Stale data extracts that are out of date",
          "Inconsistent definitions across departments",
          "Missing or incomplete data records",
          "Duplicate records across systems",
        ],
        required: false,
      },
      {
        name: "governancePolicies",
        label: "Does your organization have documented data governance policies and data ownership standards?",
        type: "radio",
        options: [
          "Yes — formal policies exist and are enforced",
          "Partially — some policies exist but are inconsistent",
          "No — we rely on informal practices",
          "We are actively building governance now",
        ],
        required: false,
      },
      {
        name: "badDataImpact",
        label: "Describe the most significant impact your organization has experienced from poor data quality.",
        type: "textarea",
        placeholder: "e.g., Incorrect revenue forecasts led to a missed hiring plan. We discovered the error 6 weeks after the fact...",
        required: false,
      },
    ],
  },
  {
    id: 4,
    title: "Manual Processes & Automation Opportunities",
    subtitle: "Manual, repetitive work is one of the highest-cost areas in any organization. Let's identify where automation can help.",
    fields: [
      {
        name: "manualTimePercent",
        label: "Estimate the percentage of your team's productive time spent on manual, repetitive data tasks each week.",
        type: "radio",
        options: [
          "Less than 10%",
          "10–25%",
          "25–50%",
          "More than 50%",
          "We have not measured this",
        ],
        required: false,
      },
      {
        name: "painfulManualProcesses",
        label: "Which manual processes cause the most pain or risk today?",
        type: "multiselect",
        options: [
          "Manual Excel or spreadsheet-based reporting",
          "Copy-paste between systems",
          "Email-based data sharing and approvals",
          "Manual reconciliation of financial data",
          "Double data entry across multiple systems",
          "Monthly or quarterly data consolidation",
          "Manual compliance or audit reporting",
        ],
        required: false,
      },
      {
        name: "reclaimedTimeUse",
        label: "If your team reclaimed 20–30% of their time from manual work, what would they focus on instead?",
        type: "textarea",
        placeholder: "e.g., Focus on customer analysis, build better forecasting models, pursue new growth initiatives...",
        required: false,
      },
    ],
  },
  {
    id: 5,
    title: "Insights & Decision Intelligence",
    subtitle: "The purpose of data is to drive better decisions, faster. Let's evaluate whether your organization is achieving that.",
    fields: [
      {
        name: "decisionWithoutData",
        label: "How often are significant business decisions made without reliable or timely data?",
        type: "radio",
        options: [
          "Rarely — data is almost always available",
          "Sometimes — data is available but often delayed",
          "Frequently — leadership regularly relies on gut feel",
          "Almost always — we lack the data infrastructure to support decisions",
        ],
        required: false,
      },
      {
        name: "realtimeKpiVisibility",
        label: "Do you have real-time or near-real-time visibility into your key business KPIs?",
        type: "radio",
        options: [
          "Yes — live dashboards and alerts are in place",
          "Partially — some KPIs are visible, others are not",
          "No — KPIs are reported weekly or monthly at best",
          "We do not have formally defined KPIs",
        ],
        required: false,
      },
      {
        name: "desiredKpis",
        label: "What are the top KPIs your leadership team wishes they had better visibility into?",
        type: "textarea",
        placeholder: "e.g., Customer acquisition cost by channel, gross margin by product line, operational throughput...",
        required: false,
      },
      {
        name: "predictiveAnalytics",
        label: "Does your organization currently use predictive analytics or forecasting models?",
        type: "radio",
        options: [
          "Yes — actively used in production",
          "In development or piloting",
          "We use manual forecasting methods (Excel, gut feel)",
          "No predictive capability exists today",
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Systems, Tools & Data Environment",
    subtitle: "Understanding your technology landscape is essential to designing a modernization roadmap that builds on what you have.",
    fields: [
      {
        name: "primaryDataStore",
        label: "What is your primary data storage or warehouse environment today?",
        type: "radio",
        options: [
          "No formal data warehouse — we use flat files",
          "Excel or Google Sheets",
          "On-premise SQL Server or Oracle",
          "Snowflake",
          "Google BigQuery",
          "Amazon Redshift",
          "Other cloud or hybrid environment",
        ],
        required: false,
      },
      {
        name: "biTools",
        label: "Which Business Intelligence or reporting tools does your organization use?",
        type: "multiselect",
        options: [
          "Microsoft Power BI",
          "Tableau",
          "Looker or Looker Studio",
          "Excel or Google Sheets",
          "Qlik",
          "Domo",
          "Custom-built reports",
          "No formal BI tool",
        ],
      },
      {
        name: "crmErpSystems",
        label: "What CRM, ERP, or core business systems are currently in use?",
        type: "textarea",
        placeholder: "e.g., Salesforce CRM, NetSuite ERP, Workday HCM, HubSpot...",
        required: false,
      },
      {
        name: "integrationQuality",
        label: "How well-integrated are your core business systems with each other and your reporting tools?",
        type: "radio",
        options: [
          "Fully integrated — data flows automatically",
          "Partially integrated — some manual steps required",
          "Mostly manual — data is extracted and moved manually",
          "Not integrated — each system is completely siloed",
        ],
        required: false,
      },
    ],
  },
  {
    id: 7,
    title: "AI & Automation Readiness",
    subtitle: "AI and automation are creating real competitive advantages. Let's assess where your organization stands.",
    fields: [
      {
        name: "aiMaturity",
        label: "How would you describe your organization's current AI and automation maturity?",
        type: "radio",
        options: [
          "Not started — AI is not on our radar yet",
          "Exploring — we are researching and learning",
          "Piloting — we have one or two proof-of-concept projects",
          "Implementing — AI is being deployed in select areas",
          "Scaled — AI is embedded across multiple business functions",
        ],
        required: false,
      },
      {
        name: "automationOpportunities",
        label: "Which automation opportunities are most relevant to your organization?",
        type: "multiselect",
        options: [
          "Automated report generation and distribution",
          "Workflow and approval process automation",
          "AI-powered demand or revenue forecasting",
          "Anomaly detection and alerting",
          "Natural language querying of business data",
          "Document processing and data extraction",
          "AI-generated executive summaries and insights",
        ],
      },
      {
        name: "aiConcerns",
        label: "What is your biggest concern or hesitation about AI adoption?",
        type: "textarea",
        placeholder: "e.g., Data privacy risks, lack of explainability, cost, regulatory compliance, staff resistance...",
        required: false,
      },
    ],
  },
  {
    id: 8,
    title: "Prioritization",
    subtitle: "Let's focus on what to tackle first. The best modernization strategies begin with quick wins that build momentum.",
    fields: [
      {
        name: "quickWins",
        label: "What should be modernized first to generate quick wins within 30–60 days?",
        type: "textarea",
        placeholder: "e.g., Automate the weekly sales dashboard. Replace the manual finance close spreadsheet with a connected BI report...",
        required: false,
      },
      {
        name: "successIn90Days",
        label: "What does success look like for your organization in 90 days?",
        type: "textarea",
        placeholder: "e.g., Executive team has a live dashboard, month-end close is automated, sales pipeline is visible in real time...",
        required: false,
      },
      {
        name: "changeReadiness",
        label: "How ready is your organization for the change management required by modernization?",
        description: "1 = Not ready — significant resistance expected   |   5 = Fully ready — strong executive sponsorship",
        type: "scale",
        options: ["1", "2", "3", "4", "5"],
      },
    ],
  },
  {
    id: 9,
    title: "Executive Summary",
    subtitle: "To close the assessment, share your perspective on the big picture. This helps our team tailor your personalized executive summary and roadmap.",
    fields: [
      {
        name: "biggestChallenge",
        label: "What is your single biggest data or analytics challenge today?",
        type: "textarea",
        placeholder: "e.g., Our leadership team makes decisions based on reports that are 2 weeks old, built manually in Excel, and nobody agrees on the numbers...",
        required: false,
      },
      {
        name: "next30DaysGoal",
        label: "What would you like to accomplish in the next 30 days related to data and analytics?",
        type: "textarea",
        placeholder: "e.g., Get alignment on a single source of truth for revenue. Eliminate one major manual report...",
        required: false,
      },
      {
        name: "leadershipOutcomes",
        label: "What outcomes matter most to your leadership team?",
        type: "multiselect",
        options: [
          "Faster and more confident decision-making",
          "Reduced operational costs",
          "Improved data accuracy and trust",
          "Real-time visibility into business performance",
          "Elimination of manual reporting work",
          "Scalable analytics without growing headcount",
          "AI-enabled insights and forecasting",
          "Competitive advantage through data",
        ],
        required: false,
      },
      {
        name: "fiftyTwoDays",
        label: "Imagine your organization had stronger data intelligence, automated reporting, and more reliable insight delivery — enough to give your team back one full day every week. What problems would that eliminate, and how would you reinvest those 52 days per year to accelerate decisions, improve operations, serve customers better, or grow the business?",
        type: "textarea",
        placeholder: "e.g., We would eliminate the weekly manual reporting cycle entirely. Those 52 days would go toward building better customer relationships, closing deals faster, and finally having time to analyze which products are actually profitable...",
        required: false,
      },
      {
        name: "contactPreference",
        label: "What is your preferred way to receive and review the executive summary and roadmap?",
        type: "radio",
        options: [
          "Email PDF summary",
          "Live virtual walkthrough with the consulting team",
          "In-person presentation",
          "Online portal or dashboard",
        ],
      },
    ],
  },
];

// ─── ENTERPRISE (above 500 employees) ─────────────────────────────────────────
// 11 sections — comprehensive, full discovery for complex organizations

export const ENTERPRISE_SECTIONS: SectionConfig[] = [
  {
    id: 1,
    title: "Executive Priorities",
    subtitle: "Help us understand your organization's strategic focus and where data limitations are holding you back.",
    fields: [
      {
        name: "topPriorities",
        label: "What are your top strategic business priorities for this year?",
        description: "Select all that apply.",
        type: "multiselect",
        options: [
          "Revenue growth and market expansion",
          "Operational efficiency and cost reduction",
          "Customer experience improvement",
          "Digital transformation",
          "Regulatory compliance and risk management",
          "Talent acquisition and workforce development",
          "Product or service innovation",
          "Supply chain optimization",
          "Mergers, acquisitions, or integration",
          "Sustainability and ESG goals",
        ],
        required: false,
      },
      {
        name: "additionalPriorities",
        label: "Any additional strategic priorities not listed above?",
        type: "textarea",
        placeholder: "e.g., International expansion into LATAM markets by Q3...",
      },
      {
        name: "dataConfidence",
        label: "How confident are you that your team has the data visibility needed to execute on these priorities?",
        description: "1 = No confidence at all   |   5 = Fully confident",
        type: "scale",
        options: ["1", "2", "3", "4", "5"],
        required: false,
      },
      {
        name: "painfulDepartments",
        label: "Which departments feel the most pain from data and reporting limitations today?",
        type: "multiselect",
        options: [
          "Finance and Accounting",
          "Sales and Revenue",
          "Operations",
          "Marketing",
          "Human Resources",
          "Information Technology",
          "Supply Chain and Logistics",
          "Customer Success and Service",
          "Executive Leadership",
        ],
      },
      {
        name: "dataVisionStatement",
        label: "What would achieving better data visibility and faster insights mean for your business?",
        description: "Describe the business outcomes you expect.",
        type: "textarea",
        placeholder: "e.g., We would close the books in 2 days instead of 10, and identify margin leaks in real time...",
        required: false,
      },
    ],
  },
  {
    id: 2,
    title: "Current Reporting Pain Points",
    subtitle: "Let's assess the current state of your reporting infrastructure and where it is failing your leadership team.",
    fields: [
      {
        name: "reportCount",
        label: "Approximately how many reports or dashboards does your organization maintain today?",
        type: "radio",
        options: ["Fewer than 10", "10–30", "31–75", "76–150", "More than 150", "Unknown"],
        required: false,
      },
      {
        name: "reportBuilders",
        label: "Who is primarily responsible for building and maintaining your reports?",
        type: "multiselect",
        options: [
          "Central IT or data team",
          "Business analysts embedded in departments",
          "Business users (self-service)",
          "External consultants or agencies",
          "Mixed — no consistent ownership",
        ],
      },
      {
        name: "reportingChallenges",
        label: "What are your biggest reporting and dashboard challenges today?",
        description: "Select all that apply.",
        type: "multiselect",
        options: [
          "Reports take too long to produce",
          "Data is pulled manually from multiple systems",
          "Numbers don't match between reports",
          "No self-service capability for business users",
          "Data is outdated by the time it reaches leadership",
          "Too many one-off spreadsheet reports",
          "No single source of truth",
          "Executive dashboards don't exist or are inadequate",
          "Reports exist but are not actionable",
          "Too many tools with no integration",
        ],
        required: false,
      },
      {
        name: "adHocResponseTime",
        label: "How long does it typically take to answer an ad-hoc data question from leadership?",
        type: "radio",
        options: [
          "Same day or within hours",
          "1–3 business days",
          "1 week or more",
          "We often cannot answer it at all",
        ],
        required: false,
      },
      {
        name: "reportingInventory",
        label: "List your most critical reports or dashboards.",
        description: "Identify the report name, who owns it, how often it is produced, what tool it uses, and the biggest pain point.",
        type: "table",
        columns: [
          { key: "reportName", label: "Report / Dashboard Name", placeholder: "e.g., Weekly Sales Summary" },
          { key: "owner", label: "Owner / Department", placeholder: "e.g., Sales Ops" },
          { key: "frequency", label: "Frequency", placeholder: "e.g., Weekly" },
          { key: "tool", label: "Tool Used", placeholder: "e.g., Excel, Power BI" },
          { key: "painPoint", label: "Biggest Pain Point", placeholder: "e.g., Manual data pull takes 4 hours" },
        ],
        tableRows: 4,
      },
    ],
  },
  {
    id: 3,
    title: "Data Quality, Trust & Governance",
    subtitle: "Data that is not trusted will never be used. Let's understand the current state of your data quality and governance.",
    fields: [
      {
        name: "dataTrustLevel",
        label: "How much does your leadership team trust the data they receive?",
        description: "1 = We frequently question the numbers   |   5 = Full trust, decisions are made confidently",
        type: "scale",
        options: ["1", "2", "3", "4", "5"],
        required: false,
      },
      {
        name: "dataQualityIssues",
        label: "Where do data quality issues most frequently occur in your organization?",
        type: "multiselect",
        options: [
          "Manual data entry errors at the source",
          "Data siloed in disconnected systems",
          "No master data or reference data standards",
          "Manual transformation in spreadsheets",
          "Stale data extracts that are out of date",
          "Inconsistent definitions across departments",
          "Missing or incomplete data records",
          "Duplicate records across systems",
        ],
        required: false,
      },
      {
        name: "governancePolicies",
        label: "Does your organization have documented data governance policies and data ownership standards?",
        type: "radio",
        options: [
          "Yes — formal policies exist and are enforced",
          "Partially — some policies exist but are inconsistent",
          "No — we rely on informal practices",
          "We are actively building governance now",
        ],
        required: false,
      },
      {
        name: "dataOwnership",
        label: "Do you have designated data owners or stewards for critical business domains (e.g., customers, products, financials)?",
        type: "radio",
        options: [
          "Yes — clearly defined and active",
          "Partially — for some domains only",
          "No — ownership is unclear",
        ],
      },
      {
        name: "badDataImpact",
        label: "Describe the most significant business impact you have experienced as a result of poor data quality.",
        type: "textarea",
        placeholder: "e.g., Incorrect revenue forecasts led to a missed hiring plan. We discovered the error 6 weeks after the fact...",
        required: false,
      },
    ],
  },
  {
    id: 4,
    title: "Manual Processes & Automation Opportunities",
    subtitle: "Manual, repetitive work is one of the highest-cost and highest-risk areas in any organization. Let's identify where automation can have the greatest impact.",
    fields: [
      {
        name: "manualTimePercent",
        label: "Estimate the percentage of your team's productive time spent on manual, repetitive data tasks each week.",
        type: "radio",
        options: [
          "Less than 10%",
          "10–25%",
          "25–50%",
          "More than 50%",
          "We have not measured this",
        ],
        required: false,
      },
      {
        name: "painfulManualProcesses",
        label: "Which manual processes cause the most pain or risk today?",
        type: "multiselect",
        options: [
          "Manual Excel or spreadsheet-based reporting",
          "Copy-paste between systems",
          "Email-based data sharing and approvals",
          "Manual reconciliation of financial data",
          "Double data entry across multiple systems",
          "Manual generation of invoices or contracts",
          "Monthly or quarterly data consolidation",
          "Manual compliance or audit reporting",
          "Vendor or supplier data management",
        ],
        required: false,
      },
      {
        name: "processInventory",
        label: "Map your top manual processes.",
        description: "Identify the process, which team performs it, how many hours per week it takes, and the estimated impact if it were automated.",
        type: "table",
        columns: [
          { key: "processName", label: "Process Name", placeholder: "e.g., Month-end close reconciliation" },
          { key: "team", label: "Team / Department", placeholder: "e.g., Finance" },
          { key: "hoursPerWeek", label: "Hours / Week", placeholder: "e.g., 12" },
          { key: "automationImpact", label: "Impact if Automated", placeholder: "e.g., Save 48 hrs/month, reduce errors" },
        ],
        tableRows: 4,
      },
      {
        name: "reclaimedTimeUse",
        label: "If your team reclaimed 20–30% of their time from manual work, what would they focus on instead?",
        type: "textarea",
        placeholder: "e.g., Focus on customer analysis, build better forecasting models, pursue new growth initiatives...",
        required: false,
      },
    ],
  },
  {
    id: 5,
    title: "Insights & Decision Intelligence",
    subtitle: "The purpose of data is to drive better decisions, faster. Let's evaluate whether your organization is achieving that.",
    fields: [
      {
        name: "decisionWithoutData",
        label: "How often are significant business decisions made without reliable or timely data?",
        type: "radio",
        options: [
          "Rarely — data is almost always available",
          "Sometimes — data is available but often delayed",
          "Frequently — leadership regularly relies on gut feel",
          "Almost always — we lack the data infrastructure to support decisions",
        ],
        required: false,
      },
      {
        name: "decisionsCriticallyImpacted",
        label: "Which decisions are most negatively impacted by a lack of timely data or insights?",
        type: "textarea",
        placeholder: "e.g., Pricing decisions, headcount planning, inventory reordering, sales territory adjustments...",
        required: false,
      },
      {
        name: "realtimeKpiVisibility",
        label: "Do you have real-time or near-real-time visibility into your key business KPIs?",
        type: "radio",
        options: [
          "Yes — live dashboards and alerts are in place",
          "Partially — some KPIs are visible, others are not",
          "No — KPIs are reported weekly or monthly at best",
          "We do not have formally defined KPIs",
        ],
        required: false,
      },
      {
        name: "desiredKpis",
        label: "What are the top KPIs your leadership team wishes they had better visibility into?",
        type: "textarea",
        placeholder: "e.g., Customer acquisition cost by channel, gross margin by product line, operational throughput by shift...",
        required: false,
      },
      {
        name: "predictiveAnalytics",
        label: "Does your organization currently use predictive analytics or forecasting models to guide decisions?",
        type: "radio",
        options: [
          "Yes — actively used in production",
          "In development or piloting",
          "We use manual forecasting methods (Excel, gut feel)",
          "No predictive capability exists today",
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Systems, Tools & Data Environment",
    subtitle: "Understanding your current technology landscape is essential to designing a modernization roadmap that builds on what you have.",
    fields: [
      {
        name: "primaryDataStore",
        label: "What is your primary data storage or warehouse environment today?",
        type: "radio",
        options: [
          "No formal data warehouse — we use flat files",
          "Excel or Google Sheets",
          "On-premise SQL Server or Oracle",
          "Snowflake",
          "Google BigQuery",
          "Amazon Redshift",
          "Azure Synapse",
          "Databricks",
          "Other cloud or hybrid environment",
        ],
        required: false,
      },
      {
        name: "biTools",
        label: "Which Business Intelligence or reporting tools does your organization use?",
        type: "multiselect",
        options: [
          "Microsoft Power BI",
          "Tableau",
          "Looker or Looker Studio",
          "Excel or Google Sheets",
          "Qlik",
          "Sisense",
          "Domo",
          "Custom-built reports",
          "No formal BI tool",
        ],
      },
      {
        name: "crmErpSystems",
        label: "What CRM, ERP, or core business systems are currently in use?",
        type: "textarea",
        placeholder: "e.g., Salesforce CRM, SAP S/4HANA, NetSuite ERP, Workday HCM, HubSpot...",
        required: false,
      },
      {
        name: "integrationQuality",
        label: "How well-integrated are your core business systems with each other and your reporting tools?",
        type: "radio",
        options: [
          "Fully integrated — data flows automatically",
          "Partially integrated — some manual steps required",
          "Mostly manual — data is extracted and moved manually",
          "Not integrated — each system is completely siloed",
        ],
        required: false,
      },
      {
        name: "systemsInventory",
        label: "Document your key systems and their integration pain points.",
        type: "table",
        columns: [
          { key: "system", label: "System / Tool", placeholder: "e.g., Salesforce" },
          { key: "department", label: "Primary Department", placeholder: "e.g., Sales" },
          { key: "integrationQuality", label: "Integration Quality", placeholder: "e.g., Poor / Manual" },
          { key: "painLevel", label: "Pain Level (1–5)", placeholder: "e.g., 4" },
          { key: "painDescription", label: "Describe the Pain", placeholder: "e.g., No API to data warehouse" },
        ],
        tableRows: 4,
      },
    ],
  },
  {
    id: 7,
    title: "Business Verticals Requiring Modernization",
    subtitle: "Let's identify which areas of the business are most in need of a data and analytics upgrade.",
    fields: [
      {
        name: "modernizationAreas",
        label: "Which business areas have the greatest need for data and analytics modernization?",
        type: "multiselect",
        options: [
          "Finance and Accounting",
          "Sales and Revenue Operations",
          "Operations and Manufacturing",
          "Human Resources and Workforce",
          "Marketing and Customer Analytics",
          "Supply Chain and Procurement",
          "Customer Service and Support",
          "Information Technology",
          "Executive Reporting and Board Dashboards",
        ],
        required: false,
      },
      {
        name: "modernizationPriorities",
        label: "For each area, describe its current state, the desired future state, and your modernization priority.",
        type: "table",
        columns: [
          { key: "department", label: "Department / Vertical", placeholder: "e.g., Finance" },
          { key: "currentState", label: "Current State", placeholder: "e.g., Manual Excel close process" },
          { key: "futureState", label: "Desired Future State", placeholder: "e.g., Automated close with live P&L dashboard" },
          { key: "priority", label: "Priority (1–5)", placeholder: "e.g., 5" },
        ],
        tableRows: 4,
      },
      {
        name: "modernizationBlockers",
        label: "What are the biggest barriers to modernization in these areas?",
        type: "multiselect",
        options: [
          "Budget constraints",
          "Lack of internal technical expertise",
          "Resistance to change from leadership or staff",
          "Poor data quality at the source",
          "Legacy systems that are hard to integrate",
          "Lack of executive sponsorship",
          "Unclear ownership or accountability",
          "Prior failed modernization attempts",
        ],
      },
    ],
  },
  {
    id: 8,
    title: "AI & Automation Readiness",
    subtitle: "AI and automation are no longer optional — but readiness varies significantly. Let's assess where your organization stands.",
    fields: [
      {
        name: "aiMaturity",
        label: "How would you describe your organization's current AI and automation maturity?",
        type: "radio",
        options: [
          "Not started — AI is not on our radar yet",
          "Exploring — we are researching and learning",
          "Piloting — we have one or two proof-of-concept projects",
          "Implementing — AI is being deployed in select areas",
          "Scaled — AI is embedded across multiple business functions",
        ],
        required: false,
      },
      {
        name: "automationOpportunities",
        label: "Which automation opportunities are most interesting or relevant to your organization?",
        type: "multiselect",
        options: [
          "Automated report generation and distribution",
          "Workflow and approval process automation",
          "AI-powered demand or revenue forecasting",
          "Anomaly detection and alerting",
          "Natural language querying of business data",
          "Document processing and data extraction",
          "Customer behavior and churn prediction",
          "AI-generated executive summaries and insights",
          "Intelligent process automation (RPA)",
        ],
      },
      {
        name: "aiConcerns",
        label: "What is your biggest concern or hesitation about AI adoption in your organization?",
        type: "textarea",
        placeholder: "e.g., Data privacy risks, lack of explainability, cost, regulatory compliance, staff resistance...",
        required: false,
      },
      {
        name: "aiOwnership",
        label: "Do you have a team, role, or individual responsible for your AI and automation strategy?",
        type: "radio",
        options: [
          "Yes — a dedicated team or Center of Excellence",
          "Yes — a single designated leader",
          "Partially — IT handles it informally",
          "No — we are planning to create this role",
          "No — there is no ownership today",
        ],
      },
      {
        name: "dataReadiness",
        label: "How would you rate your data readiness for AI initiatives?",
        description: "Clean, structured, accessible data is the foundation of AI.   1 = Not AI-ready at all   |   5 = Data is clean, structured, and ready",
        type: "scale",
        options: ["1", "2", "3", "4", "5"],
      },
    ],
  },
  {
    id: 9,
    title: "Business Impact & ROI",
    subtitle: "Every modernization investment must be tied to clear business value. Let's quantify the opportunity.",
    fields: [
      {
        name: "efficiencyGainValue",
        label: "What would a 10% improvement in operational efficiency across your top departments be worth annually?",
        type: "radio",
        options: [
          "Less than $100,000",
          "$100,000 – $500,000",
          "$500,000 – $2,000,000",
          "More than $2,000,000",
          "We have not calculated this",
        ],
        required: false,
      },
      {
        name: "currentProblemCost",
        label: "Describe the cost or business impact of your current data and reporting problems.",
        type: "textarea",
        placeholder: "e.g., We spend approximately $300K/year on manual reporting labor. Finance closes the books 15 days late each quarter...",
        required: false,
      },
      {
        name: "roiOpportunities",
        label: "Estimate the return on investment for your top modernization initiatives.",
        type: "table",
        columns: [
          { key: "initiative", label: "Initiative", placeholder: "e.g., Automated reporting pipeline" },
          { key: "estimatedValue", label: "Est. Annual Value ($)", placeholder: "e.g., $250,000" },
          { key: "timeline", label: "Timeline to Value", placeholder: "e.g., 3–6 months" },
          { key: "confidence", label: "Confidence (1–5)", placeholder: "e.g., 4" },
        ],
        tableRows: 4,
      },
      {
        name: "budgetAppetite",
        label: "What is your organization's current budget appetite for data modernization initiatives?",
        type: "radio",
        options: [
          "Less than $50,000",
          "$50,000 – $200,000",
          "$200,000 – $500,000",
          "More than $500,000",
          "Budget is to be determined pending business case",
        ],
        required: false,
      },
      {
        name: "decisionTimeline",
        label: "What is your expected timeline for making a decision and beginning implementation?",
        type: "radio",
        options: [
          "Immediately — we are ready to start",
          "Within 30–60 days",
          "Within this quarter",
          "Next fiscal year or budget cycle",
          "Still in evaluation phase",
        ],
      },
    ],
  },
  {
    id: 10,
    title: "Prioritization",
    subtitle: "Now let's focus on what to tackle first. The best modernization strategies begin with quick wins that build momentum and demonstrate ROI.",
    fields: [
      {
        name: "quickWins",
        label: "In your view, what should be modernized first to generate quick wins within 30–60 days?",
        type: "textarea",
        placeholder: "e.g., Automate the weekly sales dashboard. Replace the manual finance close spreadsheet with a Power BI report connected to our ERP...",
        required: false,
      },
      {
        name: "prioritizationMatrix",
        label: "Rank your top modernization initiatives by effort, impact, timeline, and owner.",
        type: "table",
        columns: [
          { key: "initiative", label: "Initiative", placeholder: "e.g., Automated close report" },
          { key: "effort", label: "Effort", placeholder: "Low / Med / High" },
          { key: "impact", label: "Business Impact", placeholder: "Low / Med / High" },
          { key: "timeline", label: "Target Timeline", placeholder: "e.g., 45 days" },
          { key: "owner", label: "Proposed Owner", placeholder: "e.g., CFO / IT" },
        ],
        tableRows: 4,
      },
      {
        name: "successIn90Days",
        label: "What does success look like for your organization in 90 days?",
        type: "textarea",
        placeholder: "e.g., Executive team has a live dashboard, month-end close is automated, sales pipeline is visible in real time...",
        required: false,
      },
      {
        name: "changeReadiness",
        label: "How ready is your organization for the change management required by modernization?",
        description: "1 = Not ready — significant resistance expected   |   5 = Fully ready — strong executive sponsorship",
        type: "scale",
        options: ["1", "2", "3", "4", "5"],
      },
    ],
  },
  {
    id: 11,
    title: "Executive Summary",
    subtitle: "To close the assessment, share your perspective on the big picture. This helps our consulting team tailor your personalized executive summary and 30-60-90 day roadmap.",
    fields: [
      {
        name: "biggestChallenge",
        label: "What is your single biggest data or analytics challenge today?",
        type: "textarea",
        placeholder: "e.g., Our leadership team makes decisions based on reports that are 2 weeks old, built manually in Excel, and nobody agrees on the numbers...",
        required: false,
      },
      {
        name: "next30DaysGoal",
        label: "What would you like to accomplish in the next 30 days related to data and analytics?",
        type: "textarea",
        placeholder: "e.g., Get alignment on a single source of truth for revenue. Eliminate one major manual report...",
        required: false,
      },
      {
        name: "leadershipOutcomes",
        label: "What outcomes matter most to your senior leadership team?",
        type: "multiselect",
        options: [
          "Faster and more confident decision-making",
          "Reduced operational costs",
          "Improved data accuracy and trust",
          "Real-time visibility into business performance",
          "Elimination of manual reporting work",
          "Scalable analytics without growing headcount",
          "AI-enabled insights and forecasting",
          "Competitive advantage through data",
          "Regulatory compliance and auditability",
        ],
        required: false,
      },
      {
        name: "fiftyTwoDays",
        label: "Imagine your organization had stronger data intelligence, automated reporting, and more reliable insight delivery — enough to give your team back one full day every week. What problems would that eliminate, and how would you reinvest those 52 days per year to accelerate decisions, improve operations, serve customers better, or grow the business?",
        type: "textarea",
        placeholder: "e.g., We would eliminate the weekly manual reporting cycle entirely. Those 52 days would go toward building better customer relationships, closing deals faster, and finally having time to analyze which products are actually profitable...",
        required: false,
      },
      {
        name: "additionalContext",
        label: "Is there any additional context, constraints, or background our consulting team should know?",
        type: "textarea",
        placeholder: "e.g., We recently completed a Salesforce implementation. We have a strict data residency requirement due to GDPR. Our Board is pushing for a 2025 digital roadmap...",
      },
      {
        name: "contactPreference",
        label: "What is your preferred way to receive and review the executive summary and roadmap?",
        type: "radio",
        options: [
          "Email PDF summary",
          "Live virtual walkthrough with the consulting team",
          "In-person presentation",
          "Online portal or dashboard",
        ],
      },
    ],
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────

export function getSections(companySize?: string | null): SectionConfig[] {
  if (companySize === "small") return SMALL_SECTIONS;
  if (companySize === "medium") return MEDIUM_SECTIONS;
  return ENTERPRISE_SECTIONS;
}

export function getTotalSections(companySize?: string | null): number {
  return getSections(companySize).length;
}

export const ASSESSMENT_SECTIONS = ENTERPRISE_SECTIONS;
export const TOTAL_SECTIONS = ENTERPRISE_SECTIONS.length;
