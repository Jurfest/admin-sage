export const environment = {
  production: false,
  useMockApi: true, // Toggle between mock and real API
  api: {
    baseUrl: 'http://localhost:3000',
    endpoints: {
      zipcodes: '/api/v1/zipcodes',
      occupations: '/api/v1/occupations',
    },
  },
};
