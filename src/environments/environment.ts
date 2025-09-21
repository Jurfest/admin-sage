export const environment = {
  production: true,
  useMockApi: true, // Toggle between mock and real API
  api: {
    baseUrl: 'https://api.admin-sage.com',
    endpoints: {
      zipcode: '/api/v1/zipcode',
      occupations: '/api/v1/occupations',
    },
  },
};
