describe('Organizer registry', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('front page loads', () => {
    cy.get('h1').contains('Järjestäjärekisteri');
  });

  it('add organizer button opens new page', () => {
    cy.get('button')
      .contains('Lisää uusi')
      .click();
    cy.get('h1').contains('Hae lisättävä järjestäjä');
  });
});
