
describe('Marketplace E2E (scaffold)', () => {
  it('visits home and products', () => {
    cy.visit('/');
    cy.contains('Products').click();
    cy.url().should('include','/products');
  });
});
