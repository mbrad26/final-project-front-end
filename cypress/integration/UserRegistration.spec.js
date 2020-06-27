describe('User registration', () => {
  it('register a new user account', () => {
    cy.visit("http://localhost:3000")

    cy.get('#register-account').click()
    cy.location('pathname').should('eq', '/signup')

    cy.get('form')
    cy.get('input[name="username"]').type('username')
    cy.get('input[name="email"]').type('email@example.com')
    cy.get('input[name="password"]').type('password')
    cy.get('input[name="password_confirmation"]').type('password')
    cy.server();
    cy.route(
      "POST",
      "https://postman-echo.com/post",
      'fixture:userRegistration'
    )
    cy.get('.signup').click()

    cy.location('pathname').should('eq', '/')
  });
});
