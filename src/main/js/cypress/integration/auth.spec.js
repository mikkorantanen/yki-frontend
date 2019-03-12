describe('Authorization', () => {
  it('init session endpoint should not be accessible in yki domain', () => {
    cy.request({
      url: 'https://yki.untuvaopintopolku.fi/yki/auth/initsession',
      failOnStatusCode: false,
    }).then(response => {
      expect(response.status).to.eq(404);
    });
  });
  it('init session endpoint should not be accessible in virkailija domain', () => {
    cy.request({
      url: 'https://virkailija.untuvaopintopolku.fi/yki/auth/initsession',
      failOnStatusCode: false,
    }).then(response => {
      expect(response.status).to.eq(404);
    });
  });
});
