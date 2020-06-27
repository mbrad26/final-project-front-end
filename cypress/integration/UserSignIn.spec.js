describe('User sign in', () => {
  it('sign in', () => {
    cy.visit("http://localhost:3000");

    cy.get('form.signin-form');
    cy.get('input[name="username"]').type('username');
    cy.get('input[name="password"]').type('password');
    cy.get('.signin').click();

    cy.location('pathname').should('eq', '/account');
  });
});
