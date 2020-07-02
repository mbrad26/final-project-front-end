describe('User Sign In', () => {
  it('a user can sign in', () => {
    cy.visit("http://localhost:3001/sessions");

    cy.get('form.signin-form');
    cy.get('input[name="username"]').type('username');
    cy.get('input[name="password"]').type('password');
    cy.get('#signin').click();

    cy.location('pathname').should('eq', '/account');
  });
});
