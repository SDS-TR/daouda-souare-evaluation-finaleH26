describe("Mes emprunts", () => {
  beforeEach(() => {
    cy.fixture("emprunts").then((data) => {
      cy.intercept("GET", "**/api/livres/emprunts*", {
        statusCode: 200,
        body: data.emprunts,
      }).as("getEmprunts");
    });
  });

  it("affiche les emprunts après soumission du formulaire", () => {
    cy.fixture("emprunts").then((data) => {
      cy.visit("/emprunts");

      cy.get('input[type="email"]')
        .should("have.attr", "placeholder", "Entrer votre email")
        .type(data.email);

      cy.contains("button", "Voir mes emprunts").click();
      cy.wait("@getEmprunts");

      cy.contains("h1", "Mes emprunts").should("be.visible");

      data.emprunts.forEach((emprunt) => {
        cy.contains("h3", emprunt.titre).should("be.visible");
        cy.contains("p", `Auteur : ${emprunt.auteur}`).should("be.visible");
        cy.contains("p", `📅 Emprunt : ${emprunt.date_emprunt}`).should(
          "be.visible"
        );
        cy.contains("p", `📆 Retour prévu : ${emprunt.date_retour_prevue}`).should(
          "be.visible"
        );
      });
    });
  });
});
