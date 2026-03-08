import MyAccountPage from '../../support/POM/MyAccountPage';
import { uniqueName } from '../../support/utils';

describe('TC07 - My Account Page Tests', () => {
    const myAccountPage = new MyAccountPage();

    let addressData;
    let loginData;

    before(() => {
        cy.fixture('addressUser').then((data) => {
            addressData = data;
            addressData.validAddressData.fullName = uniqueName(addressData.validAddressData.fullName);
            addressData.defaultAddressData.fullName = uniqueName(addressData.defaultAddressData.fullName);
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

    context('TC07002 - Delete Address', () => {
        it('Berhasil melakukan penghapusan alamat', () => {
            myAccountPage.clickDeleteAddress();
            myAccountPage.verifyDeleteAddressSuccess();
        })
    })


    context('TC07003 - Logout Button', () => {
        it('User dapat logout dari My Account', () => {
            myAccountPage.clickLogout();
            cy.url().should('not.include', '/account');
        })
    })

    context('TC07004 - Add New Address with Empty Fields', () => {
        it('User tidak dapat menambahkan alamat baru dengan field kosong', () => {
            myAccountPage.clickAddNewAddress();
            myAccountPage.clickSaveAddress();
            myAccountPage.verifyEmptyAddressErrorMessage();
        })
    })

    context('TC07005 - Edit Address Duplikat', () => {
        it('Terjadi duplikasi data alamat setelah melakukan edit address', () => {
            const { fullName, telephone, address, address2, city, country, province, postalCode } = addressData.validAddressData;
            const { fullName: defFullName, telephone: defTelephone, address: defAddress, address2: defAddress2, city: defCity, country: defCountry, province: defProvince, postalCode: defPostalCode } = addressData.defaultAddressData;

            myAccountPage.clickAddNewAddress();
            myAccountPage.fillAddressForm(defFullName, defTelephone, defAddress, defAddress2, defCity, defCountry, defProvince, defPostalCode);
            myAccountPage.clickSetAsDefault();
            myAccountPage.verifySetAsDefaultChecked();
            myAccountPage.clickSaveAddress();
            myAccountPage.verifyAddAddressSuccess();
            myAccountPage.visit();

            myAccountPage.clickAddNewAddress();
            myAccountPage.fillAddressForm(fullName, telephone, address, address2, city, country, province, postalCode);
            myAccountPage.clickSaveAddress();
            myAccountPage.verifyAddAddressSuccess();
            myAccountPage.visit();

            myAccountPage.clickEditLastAddedAddress();
            myAccountPage.fillAddressForm(fullName, telephone, address, address2, city, country, province, postalCode);
            myAccountPage.clickSaveAddress();
            myAccountPage.verifyEditAddressSuccess();
            myAccountPage.visit();

            myAccountPage.verifyNoDuplicateAddress();
        })
    })

    context('TC07006 - Add New Address 250 Characters', () => {
        it('User tidak dapat menambahkan alamat baru dengan field lebih dari 250 karakter', () => {
            const { fullName, telephone, address, address2, city, country, province, postalCode } = addressData.manyCharactersAddressData;
            myAccountPage.clickAddNewAddress();
            myAccountPage.fillAddressForm(fullName, telephone, address, address2, city, country, province, postalCode);
            myAccountPage.clickSaveAddress();
            myAccountPage.verifyInvalidAddressErrorMessage();
            
        })
    })
})