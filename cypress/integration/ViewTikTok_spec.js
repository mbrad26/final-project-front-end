describe('Viewing Tik Tok', () => {
  it('displays tik tok', () => {
    cy.visit('http://localhost:3000');
    cy.get('.tik-tok-viewer').should('have.length', 1);
  });
});
