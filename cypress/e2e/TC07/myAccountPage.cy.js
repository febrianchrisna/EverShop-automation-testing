import MyAccountPage from '../../support/POM/MyAccountPage';

describe('TC07 - My Account Page Tests', () => {
    const myAccountPage = new MyAccountPage();

    let addressData;
    let loginData;

    before(() => {
        cy.fixture('addressUser').then((data) => {
            addressData = data;
        });

        cy.fixture('loginUser').then((data) => {
            loginData = data;
        });
     })

    beforeEach(() => {
        const { email, password } = loginData.validLogin;
        cy.loginSession(email, password);
        myAccountPage.visit();
    })



    context('TC07001 - Add New Address', () => {
        it('User dapat menambahkan alamat baru di My Account', () => {
            const { fullName, telephone, address, address2, city, country, province, postalCode } = addressData.validAddressData;
            myAccountPage.addNewAddress.click();
            myAccountPage.fillAddressForm(fullName, telephone, address, address2, city, country, province, postalCode);
            myAccountPage.clickSetAsDefault();
            myAccountPage.verifySetAsDefaultChecked();
            myAccountPage.clickSaveAddress();
            myAccountPage.verifyAddAddressSuccess();
        })
    })


    context('TC07002 - Logout Button', () => {
        it('User dapat logout dari My Account', () => {
            myAccountPage.clickLogout();
            cy.url().should('not.include', '/account');
        })
    })

    context('TC07003 - Add New Address with Empty Fields', () => {
        it('User tidak dapat menambahkan alamat baru dengan field kosong', () => {
            myAccountPage.clickAddNewAddress();
            myAccountPage.clickSaveAddress();
            myAccountPage.verifyEmptyAddressErrorMessage();
        })
    })

    context('TC07004 - Add New Address 250 Characters', () => {
        it('User tidak dapat menambahkan alamat baru dengan field lebih dari 250 karakter', () => {
            const { fullName, telephone, address, address2, city, country, province, postalCode } = addressData.manyCharactersAddressData;
            myAccountPage.clickAddNewAddress();
            myAccountPage.fillAddressForm(fullName, telephone, address, address2, city, country, province, postalCode);
            myAccountPage.clickSaveAddress();
            myAccountPage.verifyInvalidAddressErrorMessage();
            
        })
    })

    context('TC07005 - Edit Address tidak menimpa Default Address', () => {
        it('Default address tidak tertimpa ketika user mengedit address lain tanpa set as default', () => {
            const { fullName, telephone, address, address2, city, country, province, postalCode } = addressData.validAddressData;
            const { fullName: defFullName, telephone: defTelephone, address: defAddress, address2: defAddress2, city: defCity, country: defCountry, province: defProvince, postalCode: defPostalCode } = addressData.defaultAddressData;

            myAccountPage.addNewAddress.click();
            myAccountPage.fillAddressForm(fullName, telephone, address, address2, city, country, province, postalCode);
            myAccountPage.clickSaveAddress();
            myAccountPage.verifyAddAddressSuccess();
            myAccountPage.visit();

            myAccountPage.addNewAddress.click();
            myAccountPage.fillAddressForm(defFullName, defTelephone, defAddress, defAddress2, defCity, defCountry, defProvince, defPostalCode);
            myAccountPage.clickSetAsDefault();
            myAccountPage.verifySetAsDefaultChecked();
            myAccountPage.clickSaveAddress();
            myAccountPage.verifyAddAddressSuccess();
            myAccountPage.visit();

            myAccountPage.clickEditAddress();
            myAccountPage.fillAddressForm(fullName, telephone, address, address2, city, country, province, postalCode);
            myAccountPage.clickSaveAddress();
            myAccountPage.verifyEditAddressSuccess();

            myAccountPage.verifyDefaultAddressIs(defFullName);
        })
    })

    context.only('TC07006 - Delete Address', () => {
        it('Berhasil melakukan penghapusan alamat', () => {
            myAccountPage.clickDeleteAddress();
            myAccountPage.verifyDeleteAddressSuccess();
        })
    })
})