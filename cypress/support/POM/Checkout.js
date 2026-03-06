class Checkout{
    // ELEMENT SELECTOR
    get addToCartButton(){
        return cy.contains('Add to Cart');
    }

    get checkoutButton(){
        return cy.contains('Checkout');
    }

    get itemName(){
        return cy.get('.product__list__link').first();
    }

    get itemColor(){
        return cy.get('.variant-option-list');
    }

    get itemQuantity(){
        return cy.get('#field-qty');
    }

    get itemDetailsAddToCartButton(){
        return cy.contains('ADD TO CART');
    }

    get fullNameField(){
        return cy.get('[id="field-shippingAddress.full_name"]');
    }

    get fullNameErrorMessage(){
        return cy.contains('Full name is required');
    }

    get telephoneField(){
        return cy.get('[id="field-shippingAddress.telephone"]');
    }

    get telephoneErrorMessage(){
        return cy.contains('Telephone is required');
    }

    get addressField(){
        return cy.get('[id="field-shippingAddress.address_1"]');
    }

    get addressErrorMessage(){
        return cy.contains('Address is required');
    }

    get address2Field(){
        return cy.get('[id="field-shippingAddress.address_2"]');
    }

    get cityField(){
        return cy.get('[id="field-shippingAddress.city"]');
    }

    get cityErrorMessage(){
        return cy.contains('City is required');
    }

    get countryDropdown(){
        return cy.get('[id="field-shippingAddress.country"]');
    }

    get countryErrorMessage(){
        return cy.contains('Country is required');
    }

    get provinceDropdown(){
        return cy.get('[id="field-shippingAddress.province"]');
    }

    get provinceErrorMessage(){
        return cy.contains('Province is required');
    }

    get postalCodeField(){
        return cy.get('[id="field-shippingAddress.postcode"]');
    }

    get postalCodeErrorMessage(){
        return cy.contains('Postcode is required');
    }

    get shippingMethodContainer(){
        return cy.get('div.checkout__shipment > div.checkout-shipment > div.ring-foreground\\/10');
    }

    get expressShippingMethodErrorMessage(){
        return cy.contains('Please select a shipping method');
    }

    get basicShippingMethodErrorMessage(){
        return cy.contains('Please select a shipping method');
    }

    get billingAddressContainer(){
        return cy.get('div > div.checkout__payment > div.ring-foreground\\/10');
    }

    get billingFullNameField(){
        return cy.get('[id="field-billingAddress.full_name"]');
    }

    get billingTelephoneField(){
        return cy.get('[id="field-billingAddress.telephone"]');
    }

    get billingAddressField(){
        return cy.get('[id="field-billingAddress.address_1"]');
    }

    get billingAddress2Field(){
        return cy.get('[id="field-billingAddress.address_2"]');
    }

    get billingCityField(){
        return cy.get('[id="field-billingAddress.city"]');
    }

    get billingCountryDropdown(){
        return cy.get('[id="field-billingAddress.country"]');
    }

    get billingProvinceDropdown(){
        return cy.get('[id="field-billingAddress.province"]');
    }

    get billingPostalCodeField(){
        return cy.get('[id="field-billingAddress.postcode"]');
    }

    get paymentMethodContainer(){
        return cy.get('div > div.checkout__payment > div.ring-foreground\\/10');
    }

    get stripeIframe(){
        return cy.get('iframe[src*="elements-inner-payment"]');
    }

    get logoutButton(){
        return cy.contains('Logout');
     }

    get chekoutLoginLink(){
        return cy.contains('Log in');
    }

    get checkoutLoginButton(){
        return cy.contains('Log in');
    }

    get checkoutEmailField(){
        return cy.get('[id="field-contact.email"]');
    }

    get checkoutPasswordField(){
        return cy.get('[id="field-contact.password"]');
    }
    
    get placeOrderButton(){
        return cy.get('button[data-slot="button"].w-full.bg-primary');
    }

    get placeOrderFailedErrorMessage(){
        return cy.contains('Failed To Place Order Try Again Later');
    }

    get itemColorErrorMessage(){
        return cy.contains('Please select variant options');
    }

    get itemQuantityErrorMessage(){
        return cy.contains('Value must be at least 1');
    }

    get itemQuantityEmptyErrorMessage(){
        return cy.contains('Quantity is required');
    }

    get itemQuantityInvalidStockErrorMessage(){
        return cy.contains('We do not have enough stock').should('be.visible');
    }

    get cardNumberInvalidErrorMessage(){
        return cy.contains('Your card number is invalid');
    }

    get cardExpirationPastErrorMessage(){
        return cy.contains("Your card's expiration year is in the past");
    }

    // ACTION METHODS
    visit(){
        cy.visit('/accessories');
        cy.url().should('include', '/accessories');
    }

    itemDetails(){
        this.itemName.click();
    }

    itemDetailsColor(color){
        cy.wait(3000);
        if (color) {
            cy.wait(3000);
            cy.contains('.variant-option-list li', color).should('be.visible').click();
            cy.wait(3000);
        }
        cy.wait(3000);
    }

    fillItemQuantity(quantity){
        this.itemQuantity.clear();
        if (quantity) {
            this.itemQuantity.type(quantity);
        }
    }

    itemDetailsAddToCart(){
        this.itemDetailsAddToCartButton.click();
    }

    addToCart(){
        cy.wait(500);
        this.addToCartButton.click({ force: true });
        cy.wait(1500);
    }

    checkout(){
        this.checkoutButton.should('be.visible').click({ force: true });
    }

    checkoutLogout(){
        this.logoutButton.click();
    }

    checkoutLoginLink(){
        this.chekoutLoginLink.click();
    }

    loginAtCheckout(email, password){
        cy.intercept('POST', '**/customer/login*').as('loginRequest');
        this.checkoutEmailField.clear().type(email);
        this.checkoutPasswordField.clear().type(password);
        this.checkoutLoginButton.click();
        cy.wait('@loginRequest', { timeout: 15000 });
        cy.wait(3000);
    }

    fillGuestEmail(email){
        this.checkoutEmailField.clear().type(email);
    }

    fillShippingAddressForm(fullName, telephone, address, address2, city, country, province, postalCode){
        if (fullName) this.fullNameField.clear().type(fullName);
        if (telephone) this.telephoneField.clear().type(telephone);
        if (address) this.addressField.clear().type(address);
        if (address2) this.address2Field.clear().type(address2);
        if (city) this.cityField.clear().type(city);
        if (country) {
            cy.wait(1000);
            this.countryDropdown.click();
            cy.wait(1000);
            cy.contains('[role="option"]:visible', country).click({ force: true });
            cy.wait(1000);
        }
        if (province) {
            cy.wait(1000);
            this.provinceDropdown.click();
            cy.wait(1000);
            cy.contains('[role="option"]:visible', province).click({ force: true });
            cy.wait(1000); 
        }
        if (postalCode) {
            this.postalCodeField.clear().type(postalCode);
        }
    }

    selectBillingOption(option){
        if (option) {
            cy.wait(2000);
            this.billingAddressContainer.contains(option).should('be.visible').click({ force: true });
            cy.wait(1000);
        }
    }

    fillBillingForm(fullName, telephone, address, address2, city, country, province, postalCode){
        if (fullName) this.billingFullNameField.clear().type(fullName);
        if (telephone) this.billingTelephoneField.clear().type(telephone);
        if (address) this.billingAddressField.clear().type(address);
        if (address2) this.billingAddress2Field.clear().type(address2);
        if (city) this.billingCityField.clear().type(city);
        if (country) {
            cy.wait(1000);
            this.billingCountryDropdown.click();
            cy.wait(1000);
            cy.contains('[role="option"]:visible', country).click({ force: true });
            cy.wait(1000);
        }
        if (province) {
            cy.wait(1000);
            this.billingProvinceDropdown.should('not.be.disabled').click();
            cy.wait(1500);
            cy.contains('[role="option"]:visible', province).click({ force: true });
            cy.wait(1000);
        }
        if (postalCode) {
            this.billingPostalCodeField.clear().type(postalCode);
        }
    }

    selectShippingMethod(method){
        if (method) {
            cy.wait(2000);
            this.shippingMethodContainer.contains(method).should('be.visible').click({ force: true });
        }
    }

    selectSameAsBilling(){
        cy.wait(2000);
        this.sameAsBilling.click({ force: true });
    }

    selectPaymentMethod(method){
        if (method) {
            cy.wait(2000);
            this.paymentMethodContainer.contains(method).should('be.visible').click({ force: true });
        }
    }

    fillCreditCardForm(cardTab, cardNumber, expiry, cvc, country){
        cy.wait(3000);
        this.stripeIframe.should('exist');
        cy.wait(2000);
        
        this.stripeIframe.then($iframe => {
            const $body = $iframe.contents().find('body');
            
            if (cardTab) {
                cy.wrap($body).find(`button[data-testid="${cardTab}"]`).should('be.visible').click();
                cy.wait(1000);
            }
            
            if (cardNumber) {
                cy.wrap($body).find('input[name="number"]').should('be.visible').type(cardNumber);
            }
            if (expiry) {
                cy.wrap($body).find('input[name="expiry"]').should('be.visible').type(expiry);
            }
            if (cvc) {
                cy.wrap($body).find('input[name="cvc"]').should('be.visible').type(cvc);
            }
            if (country) {
                cy.wrap($body).find('select[name="country"]').should('be.visible').select(country);
            }
        });
    }

    placeOrder(){
        this.placeOrderButton.click({ force: true });
    }

    // ASSERTION VALIDASI
    verifyOrderSuccess(){
        cy.contains('Checkout success').should('be.visible');
    }

    verifyOrderFailedError(){
        cy.contains('Payment failed').should('be.visible');
    }

    verifyItemColorErrorMessage(){
        this.itemColorErrorMessage.should('be.visible');
    }

    verifyItemQuantityErrorMessage(){
        this.itemQuantityErrorMessage.should('be.visible');
    }

    verifyItemQuantityEmptyErrorMessage(){
        this.itemQuantityEmptyErrorMessage.should('be.visible');
    }

    verifyItemQuantityInvalidStockErrorMessage(){
        this.itemQuantityInvalidStockErrorMessage.should('be.visible');
    }

    verifyAllAddressFieldsErrorMessage(){
        this.fullNameErrorMessage.should('be.visible');
        this.telephoneErrorMessage.should('be.visible');
        this.addressErrorMessage.should('be.visible');
        this.cityErrorMessage.should('be.visible');
        this.countryErrorMessage.should('be.visible');
        this.provinceErrorMessage.should('be.visible');
        this.postalCodeErrorMessage.should('be.visible');
    }

    verifyExpressShippingMethodErrorMessage(){
        this.expressShippingMethodErrorMessage.should('be.visible');
    }

    verifyCreditCardNumberInvalidError(){
        cy.get('iframe[src*="elements-inner-payment"]')
        .its('0.contentDocument.body')
        .should('not.be.empty')
        .then(cy.wrap)
        .should('contain', 'Your card number is invalid');
    }

    verifyCreditCardExpirationPastError(){
        cy.get('iframe[src*="elements-inner-payment"]')
        .its('0.contentDocument.body')
        .should('not.be.empty')
        .then(cy.wrap)
        .should('contain', "expiration year is in the past");
    }

    verifyLoginAtCheckoutSuccess() {
        cy.contains('Logout').should('be.visible');
    }
}

export default Checkout;