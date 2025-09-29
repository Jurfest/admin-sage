export const environment = {
  production: true,
  useMockApi: true, // Toggle between mock and real API
  api: {
    baseUrl: 'https://api.admin-sage.com',
    endpoints: {
      zipcodes: '/api/v1/zipcodes',
      occupations: '/api/v1/occupations',
    },
  },
};
