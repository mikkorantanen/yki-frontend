describe('Registration', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const assertFilters = () => {
    cy.get('[data-cy=exam-session-list-item]').should('have.length', 1);
    cy.get('[data-cy=exam-session-list-item]').first().contains('JYVÄSKYLÄ').should('exist');
    cy.get('[data-cy=exam-session-list-item]').first().contains('Saksa, ylin taso').should('exist');
  };

  it('Description page loads', () => {
    cy.contains('Yleiset kielitutkinnot');
  });

  it('Return button returns user back to description page', () => {
    cy.get('[data-cy=continue-button]').click();
    cy.contains('Suomi').click();
    cy.contains('Perustaso').click();
    cy.contains('Koko maa').click();
    cy.contains('Takaisin').click();
    cy.contains('Takaisin').click();
    cy.contains('Takaisin').click();
    cy.contains('Takaisin').click();
    cy.contains('Yleiset kielitutkinnot');
  });

  it('Navigation works using browser history', () => {
    cy.get('[data-cy=continue-button]').click();
    cy.contains('Suomi').click();
    cy.contains('Perustaso').click();
    cy.contains('Koko maa').click();
    cy.go('back');
    cy.go('back');
    cy.go('back');
    cy.go('back');
    cy.contains('Yleiset kielitutkinnot');
  });

  it('Filters persist through exam session selection', () => {
    cy.get('[data-cy=continue-button]').click();
    cy.contains('Suomi').click();
    cy.contains('Perustaso').click();
    cy.contains('Koko maa').click();
    cy.get('select').contains('Suomi');
    cy.get('select').contains('Perustaso');

    cy.log('Shows location only once regardless of case');
    cy.get('select')
      .contains('Jyväskylä')
      .should('exist');
    cy.get('select')
      .contains('JYVÄSKYLÄ')
      .should('not.exist');

    cy.get('select').contains('Koko maa');
  });

  it('Default filters get applied when directly visiting exam session list page', () => {
    cy.visit('/ilmoittautuminen/valitse-tutkintotilaisuus');
    cy.get('select').contains('Suomi');
    cy.get('select').contains('Kaikki tasot');
    cy.get('select').contains('Koko maa');
  });

  it('Filters can handle page refresh and direct links', () => {
    cy.visit('/ilmoittautuminen/valitse-tutkintotilaisuus');
    cy.get('[data-cy=exam-session-list-item]').should('have.length', 5);
    cy.get('[data-cy=language-filter]').select('Saksa');
    cy.get('[data-cy=level-filter]').select('Ylin taso');
    cy.get('[data-cy=location-filter]').select('Jyväskylä');
    assertFilters();

    cy.log('Refresh page')
    cy.reload();
    assertFilters();

    cy.log('Direct link')
    cy.visit('/ilmoittautuminen/valitse-tutkintotilaisuus?language=deu&level=YLIN&location=&lang=fi');
    assertFilters();
  });

  it('Filters are localized', () => {
    cy.visit('/ilmoittautuminen/valitse-tutkintotilaisuus');
    cy.get('[data-cy=language-filter]').contains('Suomi');
    cy.get('[data-cy=location-filter]').contains('Tampere');
    cy.contains('på svenska').click();
    cy.get('[data-cy=language-filter]').contains('Finska');
    cy.get('[data-cy=location-filter]').contains('Tammerfors');
  });

  it('Show exam session details page after selecting exam', () => {
    cy.visit('/ilmoittautuminen/valitse-tutkintotilaisuus');
    cy.contains('Ilmoittaudu').click();
    cy.contains('Olet ilmoittautumassa tutkintotilaisuuteen');
    cy.contains('Tunnistaudu Suomi.fi:n kautta');
  });

  it('Exam session details page return button returns to exam session listing', () => {
    cy.visit('/ilmoittautuminen/valitse-tutkintotilaisuus');
    cy.contains('Ilmoittaudu').click();
    cy.contains('Takaisin').click();
    cy.url().should('include', '/ilmoittautuminen/valitse-tutkintotilaisuus');
  });

  it('Exam session details page shows notification signup information', () => {
    cy.visit('/ilmoittautuminen/valitse-tutkintotilaisuus');
    cy.contains('Ilmoittaudu varasijalle').click();
    cy.contains('Tutkintotilaisuus on täynnä!');
  });

  it('Notification signup works', () => {
    cy.visit('/ilmoittautuminen/valitse-tutkintotilaisuus');
    cy.contains('Ilmoittaudu varasijalle').click();
    cy.get('input#email').type('test@test.com');
    cy.contains('Lähetä').click();
    cy.contains('test@test.com');
  });

  it('Login link expired page exists', () => {
    cy.visit('/ilmoittautuminen/vanhentunut');
    cy.get('[data-cy=link-expired-header]').should('exist');
  });

  it('Payment link expired page exists', () => {
    cy.visit('/maksu/vanhentunut');
    cy.get('[data-cy=link-expired-header]').should('exist');
  });

  it('Login link can be send from exam session details page', () => {
    cy.visit('/ilmoittautuminen/valitse-tutkintotilaisuus');
    cy.get('select').contains('Suomi');
    cy.get('select').contains('Kaikki tasot');
    cy.get('select').contains('Koko maa');
    cy.get('[data-cy=exam-session-list-item]')
      .get('button')
      .contains('Ilmoittaudu')
      .first()
      .click();

    cy.get('[data-cy=button-show-login-link]').click();
    cy.get('[data-cy=input-email]').type('test@test.com');
    cy.get('[data-cy=button-loginlink-form-submit]').click();
    cy.get('[data-cy=loginlink-success]').should('exist');
  });

  it('Exam session details page shows if registration is not open', () => {
    cy.server();
    cy.route('/yki/api/exam-session/10?lang=fi').as('getExamSession')
    cy.visit('/tutkintotilaisuus/10');
    cy.wait('@getExamSession');

    cy.get('[data-cy=exam-details-title]')
      .contains('Ilmoittautuminen ei ole avoinna tutkintotilaisuuteen:')
      .should('exist');
  });

  it('Exam session list shows when registration queue is full', () => {
    cy.server();
    cy.visit('/ilmoittautuminen/valitse-tutkintotilaisuus?language=fin&level=&location=&lang=fi');

    cy.get('[data-cy=exam-session-list-item]')
      .get('button')
      .contains('Jono täynnä')
      .should('exist');
  });

  it('Exam session details page shows if queue is full', () => {
    cy.server();
    cy.route('/yki/api/exam-session/15?lang=fi').as('getExamSession')
    cy.visit('/tutkintotilaisuus/15');
    cy.wait('@getExamSession');

    cy.get('[data-cy=exam-details-title]')
      .contains('Tutkintotilaisuus ja jono ovat täynnä!')
      .should('exist');
  });
});
