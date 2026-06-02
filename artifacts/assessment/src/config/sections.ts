export const ASSESSMENT_SECTIONS = [
  {
    id: 1,
    title: "Executive Priorities",
    fields: [
      {
        name: "topPriorities",
        label: "What are your top 3 strategic business priorities this year?",
        type: "textarea",
      },
      {
        name: "executionConfidence",
        label: "How confident are you in your team's ability to execute on these priorities with current data?",
        type: "rating",
        min: 1,
        max: 5,
      },
      {
        name: "painDepartments",
        label: "Which departments feel the most pain from data limitations?",
        type: "multiselect",
        options: ["Finance", "Sales", "Operations", "Marketing", "HR", "IT", "Supply Chain", "Customer Success"],
      },
      {
        name: "betterVisibilityMeaning",
        label: "What would achieving better data visibility mean for your business?",
        type: "textarea",
      }
    ]
  },
  {
    id: 2,
    title: "Current Reporting Pain Points",
    fields: [
      {
        name: "reportCount",
        label: "How many reports/dashboards does your team currently maintain?",
        type: "number",
      },
      {
        name: "reportBuilders",
        label: "Who builds your reports today?",
        type: "multiselect",
        options: ["IT/Analysts", "Business users", "External consultants", "Mixed"],
      },
      {
        name: "biggestChallenges",
        label: "What are your biggest reporting challenges?",
        type: "multiselect",
        options: ["Too slow", "Manual data pulls", "Inconsistent numbers", "No self-service", "Outdated data", "Too many tools"],
      },
      {
        name: "adHocTime",
        label: "How long does it take to get an ad-hoc data question answered?",
        type: "select",
        options: ["Same day", "1-3 days", "1 week+", "We can't easily"],
      },
      {
        name: "reportingInventory",
        label: "Reporting inventory table",
        type: "table",
        columns: ["Report Name", "Owner", "Frequency", "Tool", "Pain Point"],
        rows: 3,
      }
    ]
  },
  {
    id: 3,
    title: "Data Quality, Trust & Governance",
    fields: [
      {
        name: "dataTrust",
        label: "How much do you trust your current data?",
        type: "rating",
        min: 1,
        max: 5,
      },
      {
        name: "issueLocations",
        label: "Where do data quality issues most frequently occur?",
        type: "multiselect",
        options: ["Entry errors", "System silos", "No master data", "Manual processes", "Stale extracts"],
      },
      {
        name: "governancePolicies",
        label: "Do you have documented data governance policies?",
        type: "select",
        options: ["Yes", "No", "Partial"],
      },
      {
        name: "badDataImpact",
        label: "What is the business impact of bad data?",
        type: "textarea",
      }
    ]
  },
  {
    id: 4,
    title: "Manual Processes & Automation Opportunities",
    fields: [
      {
        name: "manualTimePercent",
        label: "Estimate: what % of your team's time is spent on manual data tasks?",
        type: "select",
        options: ["<10%", "10-25%", "25-50%", ">50%"],
      },
      {
        name: "painfulProcesses",
        label: "What are your most painful manual processes?",
        type: "multiselect",
        options: ["Excel reporting", "Email data sharing", "Manual reconciliation", "Copy-paste", "Double entry"],
      },
      {
        name: "processMapping",
        label: "Manual process mapping table",
        type: "table",
        columns: ["Process Name", "Team", "Hours/Week", "Impact if Automated"],
        rows: 3,
      },
      {
        name: "reclaimedTimeUse",
        label: "What would your team do with reclaimed time?",
        type: "textarea",
      }
    ]
  },
  {
    id: 5,
    title: "Insights & Decision Intelligence",
    fields: [
      {
        name: "decisionWithoutData",
        label: "How often do executives make decisions without reliable data?",
        type: "select",
        options: ["Rarely", "Sometimes", "Frequently", "Almost always"],
      },
      {
        name: "impactedDecisions",
        label: "What decisions are most impacted by lack of timely data?",
        type: "textarea",
      },
      {
        name: "realTimeVisibility",
        label: "Do you have real-time visibility into key business KPIs?",
        type: "select",
        options: ["Yes", "No", "Partially"],
      },
      {
        name: "desiredKPIs",
        label: "What KPIs do you wish you had better visibility into?",
        type: "textarea",
      }
    ]
  },
  {
    id: 6,
    title: "Systems, Tools & Data Environment",
    fields: [
      {
        name: "primaryStorage",
        label: "What is your primary data warehouse or storage?",
        type: "select",
        options: ["None", "Excel/Sheets", "SQL Server", "Snowflake", "BigQuery", "Redshift", "Other"],
      },
      {
        name: "biTools",
        label: "What BI tools do you use?",
        type: "multiselect",
        options: ["Power BI", "Tableau", "Looker", "Excel", "Google Sheets", "None", "Other"],
      },
      {
        name: "crmErp",
        label: "What CRM/ERP systems are you running?",
        type: "textarea",
      },
      {
        name: "techStackPainPoints",
        label: "What are the biggest pain points with your current tech stack?",
        type: "textarea",
      },
      {
        name: "systemsInventory",
        label: "Systems inventory table",
        type: "table",
        columns: ["System", "Department", "Integration Quality", "Pain Level 1-5"],
        rows: 3,
      }
    ]
  },
  {
    id: 7,
    title: "Business Verticals Requiring Modernization",
    fields: [
      {
        name: "modernizationAreas",
        label: "Which business areas need the most modernization?",
        type: "multiselect",
        options: ["Finance", "Sales", "Operations", "HR", "Marketing", "Supply Chain", "Customer Service", "IT"],
      },
      {
        name: "modernizationPriority",
        label: "Modernization priority table",
        type: "table",
        columns: ["Department", "Current State", "Desired Future State", "Priority 1-5"],
        rows: 3,
      },
      {
        name: "modernizationBlockers",
        label: "What is holding back modernization in these areas?",
        type: "textarea",
      }
    ]
  },
  {
    id: 8,
    title: "AI & Automation Readiness",
    fields: [
      {
        name: "aiMaturity",
        label: "How would you describe your organization's AI maturity?",
        type: "select",
        options: ["Not started", "Exploring", "Piloting", "Implementing", "Scaled"],
      },
      {
        name: "automationInterests",
        label: "What automation opportunities are most interesting?",
        type: "multiselect",
        options: ["Report automation", "Workflow automation", "AI forecasting", "Anomaly detection", "Natural language queries", "Document processing"],
      },
      {
        name: "aiConcerns",
        label: "What is your biggest concern about AI adoption?",
        type: "textarea",
      },
      {
        name: "aiResponsibility",
        label: "Do you have a team/person responsible for AI/automation strategy?",
        type: "select",
        options: ["Yes", "No", "Planning to"],
      }
    ]
  },
  {
    id: 9,
    title: "Business Impact & ROI",
    fields: [
      {
        name: "efficiencyValue",
        label: "What would a 10% improvement in operational efficiency be worth annually?",
        type: "select",
        options: ["<$100K", "$100K-$500K", "$500K-$2M", ">$2M"],
      },
      {
        name: "problemCost",
        label: "What is the cost of your current data/reporting problems?",
        type: "textarea",
      },
      {
        name: "roiImpact",
        label: "ROI impact table",
        type: "table",
        columns: ["Initiative", "Estimated Annual Value", "Timeline", "Confidence 1-5"],
        rows: 3,
      },
      {
        name: "budgetAppetite",
        label: "What is your budget appetite for modernization?",
        type: "select",
        options: ["<$50K", "$50K-$200K", "$200K-$500K", ">$500K"],
      }
    ]
  },
  {
    id: 10,
    title: "Prioritization",
    fields: [
      {
        name: "quickWins",
        label: "What should be modernized first (quick wins)?",
        type: "textarea",
      },
      {
        name: "prioritizationMatrix",
        label: "Prioritization matrix table",
        type: "table",
        columns: ["Initiative", "Effort (Low/Med/High)", "Impact (Low/Med/High)", "Timeline", "Owner"],
        rows: 3,
      },
      {
        name: "success90Days",
        label: "What does success look like in 90 days?",
        type: "textarea",
      }
    ]
  },
  {
    id: 11,
    title: "Executive Summary",
    fields: [
      {
        name: "biggestChallenge",
        label: "What is your single biggest data/analytics challenge?",
        type: "textarea",
      },
      {
        name: "accomplish30Days",
        label: "What would you like to accomplish in the next 30 days?",
        type: "textarea",
      },
      {
        name: "leadershipOutcomes",
        label: "What outcomes matter most to your leadership team?",
        type: "textarea",
      },
      {
        name: "additionalContext",
        label: "Any additional context for the consulting team?",
        type: "textarea",
      }
    ]
  }
];
