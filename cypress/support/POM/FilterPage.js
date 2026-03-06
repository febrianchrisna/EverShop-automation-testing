class FilterPage {
    // element selector
    get sliderMinThumb() {
        return cy.get('.price__slider [data-slot="slider-thumb"]').first();
    }

    get sliderMaxThumb() {
        return cy.get('.price__slider [data-slot="slider-thumb"]').last();
    }

    get sliderMinInput() {
        return cy.get('.price__slider input[type="range"]').first();
    }

    get sliderMaxInput() {
        return cy.get('.price__slider input[type="range"]').last();
    }

    // Action
    
    visit() {
        cy.visit('/accessories');
    }

    /**
     * Geser slider harga ke kanan (naik) atau kiri (turun).
     * @param {0|1} thumbIndex      - 0 = thumb min (kiri), 1 = thumb max (kanan)
     * @param {number} steps        - berapa langkah yang digeser (1 langkah = $1)
     * @param {'right'|'left'} direction
     */
    moveSlider(thumbIndex, steps, direction = 'right') {
        const key   = direction === 'right' ? 'ArrowRight' : 'ArrowLeft';
        const thumb = thumbIndex === 0 ? this.sliderMinThumb : this.sliderMaxThumb;

        thumb.realClick();
        cy.wait(500);

        for (let i = 0; i < steps; i++) {
            cy.realPress(key);
            cy.wait(300);
        }
    }

    clickColorFilter(colorName) {
        cy.contains('.attribute__options label', colorName).click();
    }

    // Assertion

    verifyMinSliderValue(expectedValue) {
        this.sliderMinInput.should('have.attr', 'aria-valuenow', String(expectedValue));
    }

    verifyMaxSliderValue(expectedValue) {
        this.sliderMaxInput.should('have.attr', 'aria-valuenow', String(expectedValue));
    }

    verifyColorChecked(colorName) {
        cy.contains('.attribute__options label', colorName)
            .parent()
            .find('span[role="checkbox"]')
            .should('have.attr', 'aria-checked', 'true');
    }

    verifyColorUnchecked(colorName) {
        cy.contains('.attribute__options label', colorName)
            .parent()
            .find('span[role="checkbox"]')
            .should('have.attr', 'aria-checked', 'false');
    }
}

export default FilterPage;
