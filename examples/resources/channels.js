module.exports = [
  {
    name: 'Channel1',
    description: 'My channel1',
    type: 'Webhook',
    severity: ['low', 'critical'],
    endpoint: 'http://mywebhook.com',
    enabled: true,
    alert_source: [
      {
        provider_name: 'CERT',
        finding_types: ['ALL'],
      },
    ],
  },
];
