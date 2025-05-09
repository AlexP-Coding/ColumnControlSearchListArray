describe('language.columnControl', function () {
	dt.libs({
		js: ['jquery', 'datatables', 'columncontrol'],
		css: ['datatables', 'columncontrol']
	});

	describe('Functional tests', function () {
		dt.html('basic');

		it('Setup buttons', () => {
			new DataTable('#example', {
				columnControl: ['orderAsc', 'orderDesc', 'orderClear', {
					extend: 'dropdown',
					content: ['orderAddAsc', 'orderAddDesc']
				}]
			});

			expect($('.dtcc').length).toBe(6);
			expect($('.dtcc-button').length).toBe(6 * 4);
		});

		it('Default text', () => {
			let buttons = $('.dtcc').eq(0).find('.dtcc-button');

			expect(buttons.eq(0).find('.dtcc-button-text').text()).toBe('Sort Ascending');
			expect(buttons.eq(1).find('.dtcc-button-text').text()).toBe('Sort Descending');
			expect(buttons.eq(2).find('.dtcc-button-text').text()).toBe('Clear sort');
			expect(buttons.eq(3).find('.dtcc-button-text').text()).toBe('More...');
		});

		dt.html('basic');

		it('Initialise with a language string', () => {
			new DataTable('#example', {
				columnControl: ['orderAsc', 'orderDesc', 'orderClear', {
					extend: 'dropdown',
					content: ['orderAddAsc', 'orderAddDesc']
				}],
				language: {
					columnControl: {
						orderAsc: 'A',
						orderDesc: 'B',
						orderClear: 'C',
						dropdown: 'A tapestry'
					}
				}
			});

			expect($('.dtcc').length).toBe(6);
			expect($('.dtcc-button').length).toBe(6 * 4);
		});

		it('Default text', () => {
			let buttons = $('.dtcc').eq(0).find('.dtcc-button');

			expect(buttons.eq(0).find('.dtcc-button-text').text()).toBe('A');
			expect(buttons.eq(1).find('.dtcc-button-text').text()).toBe('B');
			expect(buttons.eq(2).find('.dtcc-button-text').text()).toBe('C');
			expect(buttons.eq(3).find('.dtcc-button-text').text()).toBe('A tapestry');
		});

		dt.html('basic');

		it('Customise only some', () => {
			new DataTable('#example', {
				columnControl: ['orderAsc', 'orderDesc', 'orderClear', {
					extend: 'dropdown',
					content: ['orderAddAsc', 'orderAddDesc']
				}],
				language: {
					columnControl: {
						orderAsc: 'X',
						orderDesc: 'Y'
					}
				}
			});

			expect($('.dtcc').length).toBe(6);
			expect($('.dtcc-button').length).toBe(6 * 4);
		});

		it('Default text', () => {
			let buttons = $('.dtcc').eq(0).find('.dtcc-button');

			expect(buttons.eq(0).find('.dtcc-button-text').text()).toBe('X');
			expect(buttons.eq(1).find('.dtcc-button-text').text()).toBe('Y');
			expect(buttons.eq(2).find('.dtcc-button-text').text()).toBe('Clear sort');
			expect(buttons.eq(3).find('.dtcc-button-text').text()).toBe('More...');
		});
	});
});