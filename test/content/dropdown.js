describe('columnControl - dropdown', function () {
	dt.libs({
		js: ['jquery', 'datatables', 'columncontrol'],
		css: ['datatables', 'columncontrol']
	});

	describe('Functionality', function () {
		let table;

		dt.html('basic');

		it('Is present', () => {
			expect(DataTable.ColumnControl.content.dropdown).toBeDefined();
		});

		it('Create CC dropdown with a single dropdown', () => {
			table = new DataTable('#example', {
				columnControl: [
					{
						extend: 'dropdown',
						content: ['orderAsc', 'orderDesc']
					}
				]
			});

			expect($('.dtcc').length).toBe(6);
		});

		it('Six dropdown buttons were created', () => {
			expect($('.dtcc-button_dropdown').length).toBe(6);
		});

		it('No dropdown initially', () => {
			expect($('.dtcc-dropdown').length).toBe(0);
		});

		it('Shows dropdown when clicked', () => {
			$('.dtcc-button_dropdown')
				.eq(1)
				.trigger('click');

			expect($('.dtcc-dropdown').length).toBe(1);
		});

		it('Two buttons in the dropdown for this config', () => {
			expect($('.dtcc-dropdown .dtcc-button').length).toBe(2);
		});

		it("Clicking a button doesn't hide the dropdown", () => {
			$('.dtcc-dropdown .dtcc-button')
				.eq(0)
				.trigger('click');

			expect($('.dtcc-dropdown').length).toBe(1);
		});

		it('Clicking on the body does though', () => {
			$('body').trigger('click');

			expect($('.dtcc-dropdown').length).toBe(0);
		});

		it('Destroying the DataTable while the dropdown is open removes the dropdown', () => {
			$('.dtcc-button_dropdown')
				.eq(1)
				.trigger('click');

			table.destroy();
		});

		dt.html('basic');

		it('Create CC dropdown with two dropdowns', () => {
			table = new DataTable('#example', {
				columnControl: [
					{
						extend: 'dropdown',
						content: ['orderAsc', 'orderDesc']
					},
					{
						extend: 'dropdown',
						content: ['search']
					}
				]
			});

			expect($('.dtcc').length).toBe(6);
			expect($('.dtcc-button').length).toBe(12);
		});

		it('First dropdown has two buttons', () => {
			$('.dtcc-button_dropdown')
				.eq(0)
				.trigger('click');

			expect($('.dtcc-dropdown .dtcc-button').length).toBe(2);
		});

		it('Only a single dropdown shown', () => {
			expect($('.dtcc-dropdown').length).toBe(1);
		});

		it('Second dropdown has a search input', () => {
			$('.dtcc-button_dropdown')
				.eq(1)
				.trigger('click');

			expect($('.dtcc-dropdown .dtcc-button').length).toBe(0);
			expect($('.dtcc-dropdown input').length).toBe(1);
		});

		it('Still only a single dropdown shown', () => {
			expect($('.dtcc-dropdown').length).toBe(1);
		});
	});

	describe('Option - text', function () {
		dt.html('basic');

		it('Create CC dropdown with a nested dropdown for title', () => {
			table = new DataTable('#example', {
				columnControl: [
					[
						{
							extend: 'dropdown',
							content: ['order']
						}
					]
				]
			});

			expect($('.dtcc').length).toBe(6);
		});

		it('Show dropdown', () => {
			$('.dtcc-button_dropdown')
				.eq(0)
				.trigger('click');

			expect($('.dtcc-dropdown').length).toBe(1);
		});

		it('Got default title', () => {
			expect($('.dtcc-dropdown .dtcc-button-text').text()).toBe('More...');
		});

		dt.html('basic');

		it('Setting with option', () => {
			table = new DataTable('#example', {
				columnControl: [
					[
						{
							extend: 'dropdown',
							content: ['order'],
							text: 'TestA'
						}
					]
				]
			});

			$('.dtcc-button_dropdown')
				.eq(0)
				.trigger('click');

			expect($('.dtcc-dropdown .dtcc-button-text').text()).toBe('TestA');
		});

		dt.html('basic');

		it('Setting with language option', () => {
			table = new DataTable('#example', {
				columnControl: [
					[
						{
							extend: 'dropdown',
							content: ['order']
						}
					]
				],
				language: {
					columnControl: {
						dropdown: 'TestB'
					}
				}
			});

			$('.dtcc-button_dropdown')
				.eq(0)
				.trigger('click');

			expect($('.dtcc-dropdown .dtcc-button-text').text()).toBe('TestB');
		});
	});
});
