import Checkout from '../../support/POM/Checkout';

describe('TC04 Checkout Registered User Tests', () => {
    const checkoutRegistered = new Checkout();
    let checkoutData;
    let loginData;

    before(() => {
        cy.fixture('checkoutUser').then((data) => {
            checkoutData = data;
        });
        cy.fixture('loginUser').then((data) => {
            loginData = data;
        });
    })

    beforeEach(() => {
        const { email, password } = loginData.validLogin;
        cy.loginSession(email, password);
        checkoutRegistered.visit();
    })

    context('TC04001 - Checkout with Registered User', () => {
        it('User berhasil melakukan checkout dengan data valid dan diarahkan ke halaman konfirmasi', () => {
            const { fullName, telephone, address, address2, city, country, province, postalCode, shippingMethod, billingOption, paymentMethod } = checkoutData.validShippingAddressData;
            checkoutRegistered.addToCart();
            checkoutRegistered.checkout();
            checkoutRegistered.fillShippingAddressForm(fullName, telephone, address, address2, city, country, province, postalCode);
            checkoutRegistered.selectShippingMethod(shippingMethod);
            checkoutRegistered.selectBillingOption(billingOption);
            checkoutRegistered.selectPaymentMethod(paymentMethod);
            checkoutRegistered.placeOrder();
            checkoutRegistered.verifyOrderSuccess();
        });
    })

    context('TC04002 - Checkout with Different Billing Address', () => {
        it('User berhasil melakukan checkout dengan billing address berbeda dari shipping address', () => {
            const { 
                fullName, telephone, address, address2, city, country, province, postalCode, 
                shippingMethod, billingOption, 
                billingFullName, billingTelephone, billingAddress, billingAddress2, billingCity, billingCountry, billingProvince, billingPostalCode,
                paymentMethod 
            } = checkoutData.differentBillingData;
            
            checkoutRegistered.addToCart();
            checkoutRegistered.checkout();
            checkoutRegistered.fillShippingAddressForm(fullName, telephone, address, address2, city, country, province, postalCode);
            checkoutRegistered.selectShippingMethod(shippingMethod);
            checkoutRegistered.selectBillingOption(billingOption);
            checkoutRegistered.fillBillingForm(billingFullName, billingTelephone, billingAddress, billingAddress2, billingCity, billingCountry, billingProvince, billingPostalCode);
            checkoutRegistered.selectPaymentMethod(paymentMethod);
            checkoutRegistered.placeOrder();
            checkoutRegistered.verifyOrderSuccess();
        });
    })

    context('TC04003 - Checkout with overstock Quantity', () => {
        it('User gagal melakukan checkout dengan quantity melebihi stok yang tersedia dan menampilkan pesan error', () => {
            const { color, quantity } = checkoutData.overStockQuantity;
            checkoutRegistered.itemDetails();
            checkoutRegistered.itemDetailsColor(color);
            checkoutRegistered.fillItemQuantity(quantity);
            checkoutRegistered.itemDetailsAddToCart();
            checkoutRegistered.verifyItemQuantityInvalidStockErrorMessage();
        });
    })

    context('TC04004 - Checkout with Empty Color and Quantity Field', () => {
        it('User gagal melakukan checkout dengan mengkosongkan field Color dan Quantity dan menampilkan pesan error', () => {
            const { color, quantity } = checkoutData.emptyData;
            checkoutRegistered.itemDetails();
            checkoutRegistered.itemDetailsColor(color);
            checkoutRegistered.fillItemQuantity(quantity);
            checkoutRegistered.itemDetailsAddToCart();
            checkoutRegistered.verifyItemColorErrorMessage();
            checkoutRegistered.verifyItemQuantityEmptyErrorMessage();
        });
    })

    context('TC04005 - Checkout with Empty Shipping Address', () => {
        it('User gagal melakukan checkout dengan mengkosongkan field Shipping Address dan menampilkan pesan error', () => {
            const { fullName, telephone, address, address2, city, country, province, postalCode, paymentMethod } = checkoutData.emptyCheckoutData;
            checkoutRegistered.addToCart();
            checkoutRegistered.checkout();
            checkoutRegistered.fillShippingAddressForm(fullName, telephone, address, address2, city, country, province, postalCode);
            checkoutRegistered.selectPaymentMethod(paymentMethod);
            checkoutRegistered.placeOrder();
            checkoutRegistered.verifyAllAddressFieldsErrorMessage();
            checkoutRegistered.verifyExpressShippingMethodErrorMessage()
        });
    })

    context('TC04006 - Checkout with Re-Login at Checkout Form', () => {
        it('User berhasil melakukan checkout dengan login di checkout form', () => {
            const { fullName, telephone, address, address2, city, country, province, postalCode, shippingMethod, billingOption, paymentMethod } = checkoutData.validShippingAddressData;
            
            checkoutRegistered.addToCart();
            checkoutRegistered.checkout();
            checkoutRegistered.checkoutLogout();
            checkoutRegistered.checkoutLoginLink();
            checkoutRegistered.loginAtCheckout(loginData.validLogin.email, loginData.validLogin.password);
            checkoutRegistered.verifyLoginAtCheckoutSuccess();
            checkoutRegistered.fillShippingAddressForm(fullName, telephone, address, address2, city, country, province, postalCode);
            checkoutRegistered.selectShippingMethod(shippingMethod);
            checkoutRegistered.selectBillingOption(billingOption);
            checkoutRegistered.selectPaymentMethod(paymentMethod);
            checkoutRegistered.placeOrder();
            checkoutRegistered.verifyOrderSuccess();
        });
    })

    context('TC04007 - Checkout with 250 Characters in All Mandatory Fields', () => {
        it('User gagal melakukan checkout dengan mengisi semua mandatory field 250 karakter dan menampilkan pesan error', () => {
            const { fullName, telephone, address, address2, city, country, province, postalCode, shippingMethod, billingOption, paymentMethod } = checkoutData.manyCharactersCheckoutData;
            
            checkoutRegistered.addToCart();
            checkoutRegistered.checkout();
            checkoutRegistered.fillShippingAddressForm(fullName, telephone, address, address2, city, country, province, postalCode);
            checkoutRegistered.selectShippingMethod(shippingMethod);
            checkoutRegistered.selectBillingOption(billingOption);
            checkoutRegistered.selectPaymentMethod(paymentMethod);
            checkoutRegistered.placeOrder();
            checkoutRegistered.verifyOrderFailedError();
        });
    })

    context('TC04008 - Checkout with Valid VISA Credit Card Payment', () => {
        it('User berhasil melakukan checkout dengan payment method VISA credit card dan data valid', () => {
            const { fullName, telephone, address, address2, city, country, province, postalCode, shippingMethod, billingOption, paymentMethod, cardTab, cardNumber, cardExpiry, cardCvc, cardCountry } = checkoutData.visaCheckoutData;
            
            checkoutRegistered.addToCart();
            checkoutRegistered.checkout();
            checkoutRegistered.fillShippingAddressForm(fullName, telephone, address, address2, city, country, province, postalCode);
            checkoutRegistered.selectShippingMethod(shippingMethod);
            checkoutRegistered.selectBillingOption(billingOption);
            checkoutRegistered.selectPaymentMethod(paymentMethod);
            checkoutRegistered.fillCreditCardForm(cardTab, cardNumber, cardExpiry, cardCvc, cardCountry);
            checkoutRegistered.placeOrder();
        });
    })


    context('TC04009 - Checkout with Insufficient Funds Credit Card', () => {
        it('User gagal melakukan checkout dengan credit card saldo tidak cukup dan menampilkan pesan error', () => {
            const { fullName, telephone, address, address2, city, country, province, postalCode, shippingMethod, billingOption, paymentMethod, cardTab, cardNumber, cardExpiry, cardCvc, cardCountry } = checkoutData.insufficientFundsCardData;
            
            checkoutRegistered.addToCart();
            checkoutRegistered.checkout();
            checkoutRegistered.fillShippingAddressForm(fullName, telephone, address, address2, city, country, province, postalCode);
            checkoutRegistered.selectShippingMethod(shippingMethod);
            checkoutRegistered.selectBillingOption(billingOption);
            checkoutRegistered.selectPaymentMethod(paymentMethod);
            checkoutRegistered.fillCreditCardForm(cardTab, cardNumber, cardExpiry, cardCvc, cardCountry);
            checkoutRegistered.placeOrder();
            
            checkoutRegistered.verifyOrderFailedError();
        });
    })

    context('TC04010 - Checkout with Invalid Credit Card Format', () => {
        it('User gagal melakukan checkout dengan format credit card tidak valid dan menampilkan pesan error', () => {
            const { fullName, telephone, address, address2, city, country, province, postalCode, shippingMethod, billingOption, paymentMethod, cardTab, cardNumber, cardExpiry, cardCvc, cardCountry } = checkoutData.invalidCreditCardData;
            
            checkoutRegistered.addToCart();
            checkoutRegistered.checkout();
            checkoutRegistered.fillShippingAddressForm(fullName, telephone, address, address2, city, country, province, postalCode);
            checkoutRegistered.selectShippingMethod(shippingMethod);
            checkoutRegistered.selectBillingOption(billingOption);
            checkoutRegistered.selectPaymentMethod(paymentMethod);
            checkoutRegistered.fillCreditCardForm(cardTab, cardNumber, cardExpiry, cardCvc, cardCountry);
            checkoutRegistered.verifyCreditCardNumberInvalidError();
            checkoutRegistered.verifyCreditCardExpirationPastError();
        });
    })

    context('TC04011 - Checkout with another Credit card method (amazon pay)', () => {
        it('User berhasil melakukan checkout', () => {
            const { fullName, telephone, address, address2, city, country, province, postalCode, shippingMethod, billingOption, paymentMethod, cardTab } = checkoutData.webhookFailedSimulationData;

            checkoutRegistered.addToCart();
            checkoutRegistered.checkout();
            checkoutRegistered.fillShippingAddressForm(fullName, telephone, address, address2, city, country, province, postalCode);
            checkoutRegistered.selectShippingMethod(shippingMethod);
            checkoutRegistered.selectBillingOption(billingOption);
            checkoutRegistered.selectPaymentMethod(paymentMethod);
            checkoutRegistered.fillCreditCardForm(cardTab)
            checkoutRegistered.placeOrder();
            
        });
    })
    
})