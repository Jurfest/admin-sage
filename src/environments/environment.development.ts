export const environment = {
  production: false,
  useMockApi: true, // Toggle between mock and real API
  api: {
    baseUrl: 'http://localhost:3000',
    endpoints: {
      zipcode: '/api/v1/zipcode',
      occupations: '/api/v1/occupations'
    }
  }
};
