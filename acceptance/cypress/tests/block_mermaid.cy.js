context('Mermaid Block Acceptance Tests', () => {
  describe('Mermaid Block Tests', () => {
    beforeEach(() => {
      // given a logged in editor and a page in edit mode
      cy.visit('/');
      cy.autologin();
      cy.createContent({
        contentType: 'Document',
        contentId: 'document',
        contentTitle: 'Test document',
      });
      cy.createContent({
        contentType: 'Document',
        contentId: 'my-page',
        contentTitle: 'My Page',
        path: '/document',
      });
      cy.visit('/document');
      cy.navigate('/document/edit');
    });

    it('As editor I can add a Mermaid Block', function () {
      cy.intercept('PATCH', '/**/document').as('edit');
      cy.intercept('GET', '/**/document').as('content');
      cy.intercept('GET', '/**/Document').as('schema');

      cy.getSlate().click();
      cy.get('.button .block-add-button').click({ force: true });
      cy.get('.blocks-chooser .text .button.mermaidBlock').click({ force: true });
      cy.get('pre.language-mermaid + textarea')
        .click()
        .type('sequenceDiagram\n    Alice->>John: Hello John, how are you?\nJohn-->>Alice: Great!\nAlice-)John: See you later!');
      cy.get('#toolbar-save').click();
      cy.wait(100);
      cy.get('.mermaidWrapper > div > svg')
        .should('be.visible')
    });
  });
});
