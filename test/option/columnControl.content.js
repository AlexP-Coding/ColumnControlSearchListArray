describe('columnControl.content', function () {
	dt.libs({
		js: ['jquery', 'datatables', 'columncontrol'],
		css: ['datatables', 'columncontrol']
	});

	describe('Functional tests', function () {
		dt.html('basic');

		it('Enabled with an empty array', () => {
			new DataTable('#example', {
				columnControl: {
					target: 0,
					content: []
				}
			});

			expect($('.dtcc').length).toBe(6);
		});

		it('Is empty by default', () => {
			expect(
				$('.dtcc')
					.eq(0)
					.children().length
			).toBe(0);
		});
	});

	describe('Specifying content', function () {
		dt.html('basic');

		it('Single string content type', () => {
			new DataTable('#example', {
				columnControl: {
					target: 0,
					content: ['order']
				}
			});

			expect($('.dtcc').length).toBe(6);
		});

		it('Buttons are added', () => {
			expect($('.dtcc-button').length).toBe(6);
			expect($('.dtcc-button_order').length).toBe(6);
		});

		dt.html('basic');

		it('Multiple string buttons', () => {
			new DataTable('#example', {
				columnControl: {
					target: 0,
					content: ['orderAsc', 'orderDesc']
				}
			});

			expect($('.dtcc').length).toBe(6);
		});

		it('Buttons are added', () => {
			expect($('.dtcc-button').length).toBe(12);
			expect($('.dtcc-button_orderAsc').length).toBe(6);
			expect($('.dtcc-button_orderDesc').length).toBe(6);
		});

		it('Ordered per the init array', () => {
			expect($('.dtcc-button_orderAsc + .dtcc-button_orderDesc').length).toBe(6);
		});

		dt.html('basic');

		it('Single object based', () => {
			new DataTable('#example', {
				columnControl: {
					content: [
						{
							extend: 'order'
						}
					],
					target: 0
				}
			});

			expect($('.dtcc').length).toBe(6);
		});

		it('Buttons are added', () => {
			expect($('.dtcc-button').length).toBe(6);
			expect($('.dtcc-button_order').length).toBe(6);
		});

		dt.html('basic');

		it('Two object based buttons', () => {
			new DataTable('#example', {
				columnControl: {
					target: 0,
					content: [
						{
							extend: 'orderDesc'
						},
						{
							extend: 'orderAsc'
						}
					]
				}
			});

			expect($('.dtcc').length).toBe(6);
		});

		it('Buttons are added', () => {
			expect($('.dtcc-button').length).toBe(12);
			expect($('.dtcc-button_orderAsc').length).toBe(6);
			expect($('.dtcc-button_orderDesc').length).toBe(6);
		});

		it('Ordered per the init array', () => {
			expect($('.dtcc-button_orderAsc + .dtcc-button_orderDesc').length).toBe(0);
			expect($('.dtcc-button_orderDesc + .dtcc-button_orderAsc').length).toBe(6);
		});

		dt.html('basic');

		it('Mixed string and object', () => {
			new DataTable('#example', {
				columnControl: {
					target: 0,
					content: [
						'orderAsc',
						{
							extend: 'orderDesc'
						}
					]
				}
			});

			expect($('.dtcc').length).toBe(6);
		});

		it('Buttons are added', () => {
			expect($('.dtcc-button').length).toBe(12);
			expect($('.dtcc-button_orderAsc').length).toBe(6);
			expect($('.dtcc-button_orderDesc').length).toBe(6);
		});

		dt.html('basic');

		it('Dropdown button array', () => {
			new DataTable('#example', {
				columnControl: {
					target: 0,
					content: ['order', ['orderAsc', 'orderDesc']]
				}
			});

			expect($('.dtcc').length).toBe(6);
		});

		it('Buttons are added', () => {
			expect($('.dtcc-button').length).toBe(12);
			expect($('.dtcc-button_order').length).toBe(6);
			expect($('.dtcc-button_dropdown').length).toBe(6);
		});
	});

	describe('Multiple targets', function () {
		dt.html('basic');

		it('Multiple targets, create a target', () => {
			new DataTable('#example', {
				columnControl: [
					{
						target: 0,
						content: ['orderAsc']
					},
					{
						target: 1,
						content: ['orderDesc']
					}
				]
			});

			expect($('.dtcc').length).toBe(12);
		});

		it('Created second header row', () => {
			expect($('thead tr').length).toBe(2);
		});

		it('Still single footer', () => {
			expect($('tfoot tr').length).toBe(1);
		});

		it('First row has correct buttons', () => {
			expect(
				$('thead tr')
					.eq(0)
					.find('.dtcc').length
			).toBe(6);
			expect(
				$('thead tr')
					.eq(0)
					.find('.dtcc-button_orderAsc').length
			).toBe(6);
		});

		it('Second row has correct buttons', () => {
			expect(
				$('thead tr')
					.eq(1)
					.find('.dtcc').length
			).toBe(6);
			expect(
				$('thead tr')
					.eq(1)
					.find('.dtcc-button_orderDesc').length
			).toBe(6);
		});
	});
});
