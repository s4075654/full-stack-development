describe('Public Events Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:58888/login');
        cy.get('input[name="username"]').type('admin'); // Replace with an actual username
        cy.get('input[name="password"]').type('AdminPassword1234$'); // Replace with an actual password
        cy.get('button[type="submit"]').click();
    });

    it('should display the "Public Events" heading', () => {
        cy.contains('h1', 'Public Events').should('be.visible');
    });

    it('should load and display public event cards', () => {
        cy.get('[data-testid="event-card"]')
            .should('exist')
            .and('have.length.greaterThan', 0);
    });

    it('each event card should have visible content', () => {
        cy.get('[data-testid="event-card"]').each(($el) => {
            cy.wrap($el).should('be.visible');
        });
    });
});
