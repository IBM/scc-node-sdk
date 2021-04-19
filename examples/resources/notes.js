module.exports = [
  {
    kind: 'CARD',
    id: 'mycard',
    shortDescription: 'card short description',
    longDescription: 'card long description',
    reportedBy: {
      id: 'myprovider',
      title: 'My provider',
      url: 'https://example.com',
    },
    card: {
      section: 'Business Partner Tools',
      title: 'SampleCard',
      subtitle: 'Sample Card',
      finding_note_names: [`${process.env.account_id}/providers/security-advisor/notes/mynote`],
      elements: [
        {
          kind: 'NUMERIC',
          text: 'My sample KPI',
          value_type: {
            kind: 'KPI',
            kpi_note_name: `${process.env.account_id}/providers/security-advisor/notes/sample-kpi`,
          },
        },
      ],
      badge_text: 'Badge text',
      badge_image:
        'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTAwMCIgaGVpZ2h0PSI0MDAiPjxjbGlwUGF0aCBpZD0iYiI+PHBhdGggZD0iTTAtMXY4M2g1NS45Mzd2MjM2SDEuNTIzdjgyaDE5NC42NXYtODJoLTU1LjkzOFY4Mmg1NC40MTRWLTF6bTU1NC4wMiAxdjgyaDU1LjkzOHYyMzZoLTU0LjQxNHY4MmgxMzguNzFWMTcxLjg0bDgyLjY1NiAyMjguMDggMS42OC4wNCA4MS4xNzItMjI4LjEyVjQwMGgxNDAuMjN2LTgyaC01NS45MzhWODJoNTQuNDE1VjBoLTE1Ni4zM2wtNjQuNzI2IDE4Mi44OUw3MTEuODY2IDB6Ii8+PHBhdGggaWQ9ImEiIGQ9Ik0yMjIuMjMgMHY4Mmg1NS45Mzd2MTMwaDIxNS4zMXYtMjQuOTI4czE4LjAxMS0xNC4wNDIgMjMuNzUtMjcuMzY3bDExLjUyMy0yNS44NTVzNS4zNTItMTQuNDcyIDUuMzUyLTI3LjQwNWwtMi4zMDUtMjUuODU1cy0zLjYxNi0yMS4wNjMtOS45MjItMjcuMzI4bC0yMi4yNjYtMjUuODk1UzQ3MS4yNzYgMCA0MzMuNzUgMHptMTQwLjIzIDgyaDgxLjk5MnY3NkgzNjIuNDZ6Ii8+PHVzZSB0cmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAtMSAwIDQwMCkiIHhsaW5rOmhyZWY9IiNhIi8+PC9jbGlwUGF0aD48cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMxZjcwYzEiIHN0cm9rZS13aWR0aD0iMjcuMzciIGQ9Ik0wIDEzLjY4M2gxMDMwdjUzLjIzMkgwbTAgNTMuMjMyaDk3NXY1My4yNDJIMHY1My4yMjJoOTc1djUzLjIyMkgwbTAgNTMuMjQyaDEwMzB2NTMuMjQySDAiIGNsaXAtcGF0aD0idXJsKCNiKSIvPjwvc3ZnPgo=',
    },
  },

  {
    kind: 'FINDING',
    id: 'mynote',
    shortDescription: 'Notes short description',
    longDescription: 'Notes long description',
    reportedBy: {
      id: 'My provider',
      title: 'My provider',
      url: 'https://www.example.com',
    },
    finding: {
      severity: 'CRITICAL',
      next_steps: [
        {
          title: 'Fix this.',
        },
        {
          title: 'Fix that.',
        },
      ],
    },
  },
  {
    kind: 'KPI',
    id: 'sample-kpi',
    shortDescription: 'kpi short description',
    longDescription: 'kpi long description',
    reportedBy: {
      id: 'My provider',
      title: 'My provider',
      url: 'https://www.example.com',
    },
    kpi: {
      aggregation_type: 'SUM',
      severity: 'HIGH',
    },
  },
];
