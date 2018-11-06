describe('Authorization', () => {
  if (Cypress.config('baseUrl').includes('https')) {
    it('init session endpoint should not be accessible', () => {
      console.log('XXXXXXXXXXXXX');
      console.log(Cypress.config('baseUrl'));
      cy.request({
        url: '/yki/auth/initsession',
        failOnStatusCode: false,
      }).then(response => {
        expect(response.status).to.eq(404);
      });
    });
  }
});
