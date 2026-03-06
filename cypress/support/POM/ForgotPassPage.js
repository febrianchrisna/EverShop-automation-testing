class ForgotPassPage {
    // Element selector
    get emailField() {
        return cy.get('#field-email');
    }

    get resetButton() {
        return cy.contains('Reset Password');
    }

    get breadcrumbHomeLink(){
        return cy.contains('Home')
    }

    // ACTION METHODS
    visit() {
        cy.visit('/account/reset-password');
        cy.url().should('include', '/account/reset-password');
    }

    fillEmail(email) {
        if (email) this.emailField.clear().type(email);
    }

    clickResetButton() {
        this.resetButton.click();
    }

    resetPassword(email) {
        this.fillEmail(email);
        this.clickResetButton();
    }

    breadcrumbHome() {
        this.breadcrumbHomeLink.click();
    }

    // ASSERTION VALIDASI
    verifyResetPasswordSuccess() {
        cy.contains('If there is an account associated with').should('be.visible');
    }

    verifyInvalidEmailErrorMessage() {
        cy.contains('Please enter a valid email address').should('be.visible');
    }

    verifyEmailRequiredErrorMessage() {
        cy.contains('Email is required').should('be.visible');
    }

    verifyResetPasswordSpamErrorMessage() {
        cy.contains('Too many attemps, Please try again later').should('be.visible');
    }
}

export default ForgotPassPage;