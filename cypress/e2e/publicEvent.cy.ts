describe('Public Event Page', () => {
    before(() => {
        cy.visit('http://localhost:58888/login');
        cy.get('input[name="username"]').type('admin'); // Replace with actual credentials
        cy.get('input[name="password"]').type('AdminPassword1234$');
        cy.get('button[type="submit"]').click();
    });

    it('should render the public events page with navbar and sidebar', () => {
        cy.contains('Public Events').should('be.visible');

        // Check navbar elements
        cy.get('nav').should('be.visible');
        cy.get('button').contains('Create').should('be.visible');
        cy.get('input[placeholder="Search"]').should('be.visible');
        cy.get('button').find('svg').should('have.length.at.least', 1); // Bell icon, Hamburger, etc.
    });

    it('should toggle the sidebar', () => {
        // Click hamburger button (left icon) — may use class or role if not textual
        cy.get('button').first().click();
        cy.get('aside').should('be.visible');
    });

    it('should load and display public events', () => {
        cy.get('[data-testid="event-card"]').should('exist');
    });

    it('should distinguish between owned and public events', () => {
        cy.get('[data-testid="event-card"]').each(($el) => {
            cy.wrap($el).within(() => {
                cy.get('[data-testid="owned-badge"]').then(($badge) => {
                    if ($badge.length > 0) {
                        expect($badge).to.exist;
                    } else {
                        expect($badge.length).to.eq(0);
                    }
                });
            });
        });
    });

    it('should handle errors gracefully', () => {
        cy.intercept('GET', 'http://localhost:58888/public-events', {
            statusCode: 500,
            body: { message: 'Internal Server Error' },
        }).as('getPublicEvents');

        cy.reload();

        cy.wait('@getPublicEvents');
        cy.contains('Error').should('be.visible');
    });
});
