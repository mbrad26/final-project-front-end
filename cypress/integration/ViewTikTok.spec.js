describe("Viewing Tik Tok", () => {
  it("displays tik tok", () => {
    cy.server();
    cy.route(
      "GET",
      "https://www.tiktok.com/oembed?url=https://vm.tiktok.com/JeJCFTp/",
      'fixture:tikTok'
    ).as("tikToks");

    cy.visit("http://localhost:3000");

    cy.wait("@tikToks").then((xhr) => {

      cy.get("[data-cy=tik-tok]").should(
          "contain",
          "Spooky season dance, try it, it’s so fun #fyp #duetthis #dance #halloween #foryou"
      );
    });
  });
});
