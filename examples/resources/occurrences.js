module.exports = [
  {
    name: 'occurence1',
    resourceUrl: 'string',
    noteName: `${process.env.account_id}/providers/security-advisor/notes/mynote`,
    kind: 'FINDING',
    id: 'occurence1',
    context: {
      resource_name: 'myresource',
    },
    finding: {
      severity: 'LOW',
      certainty: 'LOW',
      next_steps: [
        {
          title: 'next_step_title',
          url: 'https://example.com',
        },
      ],
    },
  },
  {
    name: 'occurence2',
    resourceUrl: 'string',
    noteName: `${process.env.account_id}/providers/security-advisor/notes/sample-kpi`,
    kind: 'KPI',
    id: 'occurence2',
    context: {
      resource_name: 'myresource2',
    },
    kpi: {
      value: 10,
      total: 100,
    },
  },
];
