import FilterPage from '../../support/POM/FilterPage';

describe('TC06 - Filter Accessories Page Tests', () => {
    const filterPage = new FilterPage();

    beforeEach(() => {
        filterPage.visit();
    });

    context('TC06001 - Geser Slider Harga Minimum', () => {
        it('User dapat menggeser slider harga minimum ke nilai yang lebih tinggi', () => {
            // Default min = 12, geser 5 langkah ke kanan → 17
            filterPage.moveSlider(0, 5, 'right');
            filterPage.verifyMinSliderValue(17);
        });
    });

    context('TC06002 - Geser Slider Harga Maksimum', () => {
        it('User dapat menggeser slider harga maksimum ke nilai yang lebih rendah', () => {
            // Default max = 35, geser 7 langkah ke kiri → 28
            filterPage.moveSlider(1, 7, 'left');
            filterPage.verifyMaxSliderValue(28);
        });
    });

    context('TC06003 - Geser Kedua Slider Bersamaan', () => {
        it('User dapat mensetting rentang harga kustom dengan menggeser kedua slider', () => {
            // Min: 12 → 15 (3 langkah kanan)
            filterPage.moveSlider(0, 3, 'right');
            filterPage.verifyMinSliderValue(15);

            // Max: 35 → 30 (5 langkah kiri)
            filterPage.moveSlider(1, 5, 'left');
            filterPage.verifyMaxSliderValue(30);
        });
    });

    context('TC06004 - Centang Filter Warna Tunggal', () => {
        it('User dapat memfilter produk berdasarkan satu warna (White)', () => {
            filterPage.clickColorFilter('White');
            filterPage.verifyColorChecked('White');
        });
    });

    context('TC06005 - Centang Filter Beberapa Warna', () => {
        it('User dapat memfilter produk dengan mencentang beberapa warna sekaligus', () => {
            filterPage.clickColorFilter('Black');
            filterPage.clickColorFilter('Yellow');

            filterPage.verifyColorChecked('Black');
            filterPage.verifyColorChecked('Yellow');
        });
    });

    context('TC06006 - Hapus Filter Warna', () => {
        it('User dapat menghapus filter warna dengan mencentang ulang checkbox yang sama', () => {
            // Centang dulu
            filterPage.clickColorFilter('White');
            filterPage.verifyColorChecked('White');

            // Centang ulang untuk uncheck
            filterPage.clickColorFilter('White');
            filterPage.verifyColorUnchecked('White');
        });
    });

    context('TC06007 - Kombinasi Filter Harga dan Warna', () => {
        it('User dapat menggabungkan filter slider harga dan checkbox warna secara bersamaan', () => {
            // Set rentang harga: 15 – 30
            filterPage.moveSlider(0, 3, 'right'); // 12 → 15
            filterPage.moveSlider(1, 5, 'left');  // 35 → 30
            filterPage.verifyMinSliderValue(15);
            filterPage.verifyMaxSliderValue(30);

            // Filter warna: Black
            filterPage.clickColorFilter('Black');
            filterPage.verifyColorChecked('Black');
        });
    });
});
