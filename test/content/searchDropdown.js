// The search logic and testing is done elsewhere, this just checks that the search input
// is displayed in the dropdown
describe('columnControl - searchDropdown', function () {
	dt.libs({
		js: ['jquery', 'datatables', 'columncontrol'],
		css: ['datatables', 'columncontrol']
	});

	describe('Functionality', function () {
		let table;

		dt.html('basic');

		it('Is present', () => {
			expect(DataTable.ColumnControl.content.searchDropdown).toBeDefined();
		});

		it('Create CC dropdown with searchDropdown', () => {
			table = new DataTable('#example', {
				columnControl: ['searchDropdown'],
				ordering: {
					handler: false
				}
			});

			expect($('.dtcc').length).toBe(6);
		});

		it('Six dropdowns were created', () => {
			expect($('.dtcc-button_dropdown').length).toBe(6);
		});

		it('No dropdown initially', () => {
			expect($('.dtcc-dropdown').length).toBe(0);
		});

		it('Shows dropdown when clicked', () => {
			$('.dtcc-button_dropdown')
				.eq(0)
				.trigger('click');

			expect($('.dtcc-dropdown').length).toBe(1);
		});

		it('Has a search input in it', () => {
			expect($('.dtcc-dropdown div.dtcc-search').length).toBe(1);
		});

		it('Has an input', () => {
			expect($('.dtcc-dropdown div.dtcc-search input').length).toBe(1);
		});

		it('Setting a value runs a search', () => {
			$('.dtcc-dropdown div.dtcc-search input')
				.val('br')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Bradley Greer');
		});

		it('Dropdown is still visible', () => {
			expect($('.dtcc-dropdown').length).toBe(1);
		});

		it('Hide dropdown', () => {
			$('body').trigger('click');

			expect($('.dtcc-dropdown').length).toBe(0);
		});
	});

	describe('Option - text', function () {
		dt.html('basic');

		it('Create CC with dropdown search', () => {
			table = new DataTable('#example', {
				columnControl: [['searchDropdown']]
			});

			expect($('.dtcc').length).toBe(6);
		});

		it('Show dropdown', () => {
			$('.dtcc-button_dropdown')
				.eq(0)
				.trigger('click');

			expect($('.dtcc-dropdown').length).toBe(1);
		});

		it('Got default button text', () => {
			expect($('.dtcc-dropdown .dtcc-button-text').text()).toBe('Search');
		});

		dt.html('basic');

		it('Setting with option', () => {
			table = new DataTable('#example', {
				columnControl: [
					[
						{
							extend: 'searchDropdown',
							text: 'TestC'
						}
					]
				]
			});

			$('.dtcc-button_dropdown')
				.eq(0)
				.trigger('click');

			expect($('.dtcc-dropdown .dtcc-button-text').text()).toBe('TestC');
		});

		dt.html('basic');

		it('Setting with language option', () => {
			table = new DataTable('#example', {
				columnControl: [['searchDropdown']],
				language: {
					columnControl: {
						searchDropdown: 'TestD'
					}
				}
			});

			$('.dtcc-button_dropdown')
				.eq(0)
				.trigger('click');

			expect($('.dtcc-dropdown .dtcc-button-text').text()).toBe('TestD');
		});
	});
});
