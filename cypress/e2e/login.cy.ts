/// <reference types="cypress" />

describe('Login Functionality', () => {
	beforeEach(() => {
		// Visiting the login page
		cy.visit('http://localhost:58888/login');
	});

	it('logs in with valid credentials', () => {
		// Fill in the login form with actual credentials
		cy.get('input[name="username"]').type('admin'); // Replace with an actual username
		cy.get('input[name="password"]').type('AdminPassword1234$'); // Replace with an actual password
		cy.get('button[type="submit"]').click();

		// Check for a successful login by verifying URL or presence of a post-login element
		cy.url().should('include', '/public-events'); // Adjust based on your application's actual redirect
	});

	it('shows error for incorrect username (404)', () => {
		// Trying to log in with a wrong username
		cy.get('input[name="username"]').type('wrongUser'); // Invalid username
		cy.get('input[name="password"]').type('anyPass'); // Any password
		cy.get('button[type="submit"]').click();

		// Check if the error message for non-existing user appears
		cy.get('.text-red-600').should('contain', 'There is no such user in the database.');
	});

	it('shows error for wrong password (401)', () => {
		// Trying to log in with a valid username but incorrect password
		cy.get('input[name="username"]').type('admin'); // Replace with an actual username
		cy.get('input[name="password"]').type('wrongPass'); // Wrong password
		cy.get('button[type="submit"]').click();

		// Check if the error message for wrong password appears
		cy.get('.text-red-600').should('contain', 'Invalid password.');
	});
});
