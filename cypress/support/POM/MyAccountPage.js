class MyAccount{
    // ELEMENT SELECTOR
    get logout(){
        return cy.contains('Logout');
    }

    get addNewAddress(){
        return cy.contains('Add new address');
    }

    get fullNameField(){
        return cy.get('#field-full_name');
    }

    get telephoneField(){
        return cy.get('#field-telephone');
    }

    get addressField(){
        return cy.get('#field-address_1');
    }

    get address2Field(){
        return cy.get('#field-address_2');
    }

    get cityField(){
        return cy.get('#field-city');
    }

    get countryField(){
        return cy.get('#field-country');
    }

    get provinceField(){
        return cy.get('#field-province');
    }

    get postCodeField(){
        return cy.get('#field-postcode');
    }

    get setAsDefaultCheckbox(){
        return cy.contains('label', 'Set as default')
            .parent()
            .find('span[role="checkbox"]');
    }

    get saveAddress (){
        return cy.contains('Save');
    }

    get editAddress(){
        return cy.contains('Edit');
    }

    get deleteAddress(){
        return cy.contains('Delete');
    }

    // ACTION METHODS
    visit(){
        cy.visit('/account');
        cy.url().should('include', '/account');
    }

    clickLogout(){
        this.logout.click();
    }

    clickAddNewAddress(){
        this.addNewAddress.click();
    }


    fillAddressForm(fullName, telephone, address, address2, city, country, province, postCode){
        if (fullName) this.fullNameField.clear().type(fullName);
        if (telephone) this.telephoneField.clear().type(telephone);
        if (address) this.addressField.clear().type(address);
        if (address2) this.address2Field.clear().type(address2);
        if (city) this.cityField.clear().type(city);
        if (country) {
            this.countryField.click();
            cy.wait(1000)
            cy.contains('[role="option"]:visible', country).click({ force: true });
            cy.wait(1000)
        }
        if (province) {
            this.provinceField.should('not.be.disabled').click();
            cy.wait(1000)
            cy.contains('[role="option"]:visible', province).click({ force: true });
            cy.wait(1000)
        }
        if (postCode) this.postCodeField.clear().type(postCode);
    }

    clickSetAsDefault(){
        return cy.contains('label', 'Set as default').click();
    }

    clickSaveAddress(){
        this.saveAddress.click();
        cy.wait(5000);
    }

    clickEditAddress(){
        // .first() = klik tombol Edit milik address pertama (yang bukan default)
        cy.contains('Edit').first().click();
    }

    clickDeleteAddress(){
        this.deleteAddress.click();
    }

    verifyDefaultAddressIs(fullName){
        cy.get('[data-slot="item"].border-primary')
            .find('.full-name')
            .should('contain', fullName);
    }

    // ASSERTION VALIDASI
    verifySetAsDefaultChecked(){
        this.setAsDefaultCheckbox
            .should('have.attr', 'aria-checked', 'true');
    }

    verifyAddAddressSuccess(){
        cy.contains('Address has been saved successfully').should('be.visible');
    }

    verifyEditAddressSuccess(){
        cy.contains('Address has been updated successfully').should('be.visible');
    }

    verifyDeleteAddressSuccess(){
        cy.contains('Address has been deleted successfully').should('be.visible');
    }

    verifyEmptyAddressErrorMessage(){
        cy.contains('Full name is required').should('be.visible');
        cy.contains('Address is required').should('be.visible');
        cy.contains('Province is required').should('be.visible');
        cy.contains('Country is required').should('be.visible');
        cy.contains('Postcode is required').should('be.visible');
    }

    verifyInvalidAddressErrorMessage(){
        cy.contains('Full name must be less than 250 characters').should('be.visible');
        cy.contains('Address must be less than 250 characters').should('be.visible');
        cy.contains('Address 2 must be less than 250 characters').should('be.visible');
        cy.contains('City must be less than 250 characters').should('be.visible');
    }
}

export default MyAccount;