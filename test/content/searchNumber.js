describe('columnControl - searchNumber', function () {
	dt.libs({
		js: ['jquery', 'datatables', 'columncontrol'],
		css: ['datatables', 'columncontrol']
	});

	describe('Basic functionality', function () {
		let table;

		dt.html('basic');

		it('Is present', () => {
			expect(DataTable.ColumnControl.content.title).toBeDefined();
		});

		it('Create CC with search', () => {
			table = new DataTable('#example', {
				columnControl: {
					target: 1,
					content: ['searchNumber']
				}
			});

			expect($('.dtcc-searchNumber').length).toBe(6);
		});

		it('There is an input element in each cell in the second header row', () => {
			expect($('thead tr:eq(1) input').length).toBe(6);
			expect($('thead tr:eq(1) td:eq(3) input').length).toBe(1);
		});

		it('There is no initial search value', () => {
			expect($('thead tr:eq(1) td:eq(3) input').val()).toBe('');
		});

		it('Is shown as not active', () => {
			expect(
				$('thead tr:eq(1) td:eq(3) div.dtcc-search').hasClass('dtcc-search_active')
			).toBe(false);
		});

		it('Can apply a search', () => {
			$('thead tr:eq(1) td:eq(3) input')
				.val('61')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Brielle Williamson');
		});

		it('Search input is shown as active when there is a filter', () => {
			expect(
				$('thead tr:eq(1) td:eq(3) div.dtcc-search').hasClass('dtcc-search_active')
			).toBe(true);
		});

		it('Cumulative search over two columns', () => {
			$('thead tr:eq(1) td:eq(5) input')
				.val('98540')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Thor Walton');
		});

		it('Remove search terms', () => {
			$('thead tr:eq(1) td:eq(3) input')
				.val('')
				.triggerNative('input');
			$('thead tr:eq(1) td:eq(5) input')
				.val('')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Airi Satou');
		});

		it('Back to not active', () => {
			expect(
				$('thead tr:eq(1) td:eq(3) div.dtcc-search').hasClass('dtcc-search_active')
			).toBe(false);
		});
	});

	describe('State saving', function () {
		dt.html('basic');

		it('Setup with state restore - no initial value', () => {
			table = new DataTable('#example', {
				columnControl: {
					target: 1,
					content: ['searchNumber']
				},
				stateSave: true
			});

			expect($('thead tr:eq(1) td:eq(3) input').val()).toBe('');
			expect($('thead tr:eq(1) td:eq(5) input').val()).toBe('');
		});

		it('Can apply a search', () => {
			$('thead tr:eq(1) td:eq(3) input')
				.val('61')
				.triggerNative('input');
			$('thead tr:eq(1) td:eq(5) input')
				.val('372000')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Brielle Williamson');
		});

		dt.html('basic');

		it('Restore with a saved state', () => {
			table = new DataTable('#example', {
				columnControl: {
					target: 1,
					content: ['searchNumber']
				},
				stateSave: true
			});

			expect($('thead tr:eq(1) td:eq(0) input').val()).toBe('');
			expect($('thead tr:eq(1) td:eq(3) input').val()).toBe('61');
			expect($('thead tr:eq(1) td:eq(5) input').val()).toBe('372000');
		});

		it('And filter was applied', () => {
			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Brielle Williamson');
		});

		it('Remove search terms', () => {
			$('thead tr:eq(1) td:eq(3) input')
				.val('')
				.triggerNative('input');
			$('thead tr:eq(1) td:eq(5) input')
				.val('')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Airi Satou');
		});

		it('Search logic set', () => {
			$('thead tr:eq(1) td:eq(3) select')
				.val('less')
				.triggerNative('input');
			$('thead tr:eq(1) td:eq(3) input')
				.val('25')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Caesar Vance');
		});

		dt.html('basic');

		it('Restore state', () => {
			table = new DataTable('#example', {
				columnControl: {
					target: 1,
					content: ['searchNumber']
				},
				stateSave: true
			});

			expect($('thead tr:eq(1) td:eq(3) select').val()).toBe('less');
			expect($('thead tr:eq(1) td:eq(3) input').val()).toBe('25');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Caesar Vance');
		});

		it('Remove search terms', () => {
			$('thead tr:eq(1) td:eq(3) select')
				.val('equals')
				.triggerNative('input');
			$('thead tr:eq(1) td:eq(3) input')
				.val('')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Airi Satou');
		});
	});

	describe('Search logic', function () {
		dt.html('basic');

		it('Setup', () => {
			table = new DataTable('#example', {
				columnControl: {
					target: 1,
					content: ['searchNumber']
				}
			});

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Airi Satou');
		});

		it('Has a logic selector', () => {
			expect($('thead tr:eq(1) td:eq(3) select').length).toBe(1);
			expect($('thead tr:eq(1) td select').length).toBe(6);
		});

		it('Default value is `equal`', () => {
			expect($('thead tr:eq(1) td:eq(3) select').val()).toBe('equal');
		});

		it('equal search - matches', () => {
			$('thead tr:eq(1) td:eq(3) input')
				.val('22')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Cedric Kelly');
		});

		it('equal search - part - no match', () => {
			$('thead tr:eq(1) td:eq(3) input')
				.val('4')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('No matching records found');
		});

		it('equal search - no part - no match', () => {
			$('thead tr:eq(1) td:eq(3) input')
				.val('482465')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('No matching records found');
		});

		it('notEqual search - matches', () => {
			$('thead tr:eq(1) td:eq(3) select')
				.val('notEqual')
				.triggerNative('input');
			$('thead tr:eq(1) td:eq(3) input')
				.val('33')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Angelica Ramos');
		});

		it('notEqual search - part - no match', () => {
			$('thead tr:eq(1) td:eq(3) input')
				.val('1')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Airi Satou');
		});

		it('notEqual search - no part - no match', () => {
			$('thead tr:eq(1) td:eq(3) input')
				.val('482165')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Airi Satou');
		});

		it('greater search - matches', () => {
			$('thead tr:eq(1) td:eq(3) select')
				.val('greater')
				.triggerNative('input');
			$('thead tr:eq(1) td:eq(3) input')
				.val('60')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Ashton Cox');
		});

		it('greater search - matches - doesn\'t include equal', () => {
			$('thead tr:eq(1) td:eq(3) input')
				.val('33')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Angelica Ramos');
		});

		it('greater search - no match', () => {
			$('thead tr:eq(1) td:eq(3) input')
				.val('100')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('No matching records found');
		});

		it('greaterOrEqual search - matches', () => {
			$('thead tr:eq(1) td:eq(3) select')
				.val('greaterOrEqual')
				.triggerNative('input');
			$('thead tr:eq(1) td:eq(3) input')
				.val('60')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Ashton Cox');
		});

		it('greaterOrEqual search - matches - does include equal', () => {
			$('thead tr:eq(1) td:eq(3) input')
				.val('33')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Airi Satou');
		});

		it('greaterOrEqual search - no match', () => {
			$('thead tr:eq(1) td:eq(3) input')
				.val('100')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('No matching records found');
		});

		it('less search - matches', () => {
			$('thead tr:eq(1) td:eq(3) select')
				.val('less')
				.triggerNative('input');
			$('thead tr:eq(1) td:eq(3) input')
				.val('20')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Tatyana Fitzpatrick');
		});

		it('less search - matches - doesn\'t include equal', () => {
			$('thead tr:eq(1) td:eq(3) input')
				.val('33')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Brenden Wagner');
		});

		it('less search - no match', () => {
			$('thead tr:eq(1) td:eq(3) input')
				.val('10')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('No matching records found');
		});

		it('lessOrEqual search - matches', () => {
			$('thead tr:eq(1) td:eq(3) select')
				.val('lessOrEqual')
				.triggerNative('input');
			$('thead tr:eq(1) td:eq(3) input')
				.val('30')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Brenden Wagner');
		});

		it('lessOrEqual search - matches - does include equal', () => {
			$('thead tr:eq(1) td:eq(3) input')
				.val('33')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Airi Satou');
		});

		it('lessOrEqual search - no match', () => {
			$('thead tr:eq(1) td:eq(3) input')
				.val('11')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('No matching records found');
		});

		it('clear values', () => {
			$('thead tr:eq(1) td:eq(3) span.dtcc-search-clear').trigger('click');

			expect($('thead tr:eq(1) td:eq(3) input').val()).toBe('');
			expect($('thead tr:eq(1) td:eq(3) select').val()).toBe('equal');
		});

		it('Is shown as not active', () => {
			expect(
				$('thead tr:eq(1) td:eq(0) div.dtcc-search').hasClass('dtcc-search_active')
			).toBe(false);
		});

		it('set an empty value', () => {
			table
				.cell(0, 3)
				.data('')
				.draw();

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Airi Satou');
			expect($('tbody tr:eq(0) td:eq(3)').text()).toBe('33');
		});

		it('empty search - matches', () => {
			$('thead tr:eq(1) td:eq(3) select')
				.val('empty')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Tiger Nixon');
			expect($('tbody tr:eq(0) td:eq(3)').text()).toBe('');
		});

		it('empty search - is active', () => {
			expect(
				$('thead tr:eq(1) td:eq(3) div.dtcc-search').hasClass('dtcc-search_active')
			).toBe(true);
		});

		it('notEmpty search - matches', () => {
			$('thead tr:eq(1) td:eq(3) select')
				.val('notEmpty')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Airi Satou');
		});

		it('notEmpty search - is active', () => {
			expect(
				$('thead tr:eq(1) td:eq(3) div.dtcc-search').hasClass('dtcc-search_active')
			).toBe(true);
		});
	});

	describe('Option - clear', function () {
		dt.html('basic');

		it('Clear button enabled (default)', () => {
			table = new DataTable('#example', {
				columnControl: {
					target: 1,
					content: ['searchNumber']
				}
			});

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Airi Satou');
		});

		it('Clear button is not visible with no value', () => {
			expect($('thead tr:eq(1) td:eq(3) span.dtcc-search-clear').is(':visible')).toBe(false);
		});

		it('Apply a search', () => {
			$('thead tr:eq(1) td:eq(3) input')
				.val('41')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Bradley Greer');
		});

		it('Clear button is now visible on this input', () => {
			expect($('thead tr:eq(1) td:eq(3) span.dtcc-search-clear').is(':visible')).toBe(true);
		});

		it('And only that one', () => {
			expect($('thead tr:eq(1) td:eq(0) span.dtcc-search-clear').is(':visible')).toBe(false);
		});

		it('Clearing makes it hidden again', () => {
			$('thead tr:eq(1) td:eq(3) input')
				.val('')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Airi Satou');
			expect($('thead tr:eq(1) td:eq(3) span.dtcc-search-clear').is(':visible')).toBe(false);
		});

		it('Apply a search', () => {
			$('thead tr:eq(1) td:eq(3) input')
				.val('40')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Yuri Berry');
		});

		it('Clicking the button will clear the input', () => {
			$('thead tr:eq(1) td:eq(3) span.dtcc-search-clear').trigger('click');

			expect($('thead tr:eq(1) td:eq(3) input').val()).toBe('');
			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Airi Satou');
		});

		it('And it was hidden', () => {
			expect($('thead tr:eq(1) td:eq(3) span.dtcc-search-clear').is(':visible')).toBe(false);
		});

		dt.html('basic');

		it('Clear button can be disabled', () => {
			table = new DataTable('#example', {
				columnControl: {
					target: 1,
					content: [
						{
							extend: 'searchNumber',
							clear: false
						}
					]
				}
			});

			expect($('thead tr:eq(1) td span.dtcc-search-clear').length).toBe(0);
		});
	});

	describe('Option - placeholder', function () {
		dt.html('basic');

		it('Placeholder (default)', () => {
			table = new DataTable('#example', {
				columnControl: {
					target: 1,
					content: ['searchNumber']
				}
			});

			expect($('thead tr:eq(1) td:eq(3) input').attr('placeholder')).toBeUndefined();
		});

		dt.html('basic');

		it('Set a placeholder', () => {
			table = new DataTable('#example', {
				columnControl: {
					target: 1,
					content: [
						{
							extend: 'searchNumber',
							placeholder: 'testA'
						}
					]
				}
			});

			expect($('thead tr:eq(1) td:eq(3) input').attr('placeholder')).toBe('testA');
		});

		dt.html('basic');

		it('Set a [title] placeholder', () => {
			table = new DataTable('#example', {
				columnControl: {
					target: 1,
					content: [
						{
							extend: 'searchNumber',
							placeholder: 'testB [title] testC'
						}
					]
				}
			});

			expect($('thead tr:eq(1) td:eq(3) input').attr('placeholder')).toBe('testB Age testC');
			expect($('thead tr:eq(1) td:eq(5) input').attr('placeholder')).toBe(
				'testB Salary testC'
			);
		});
	});

	describe('Option - title', function () {
		dt.html('basic');

		it('Title (default)', () => {
			table = new DataTable('#example', {
				columnControl: {
					target: 1,
					content: ['searchNumber']
				}
			});

			expect($('thead tr:eq(1) td:eq(3) div.dtcc-search-title').text()).toBe('');
		});

		dt.html('basic');

		it('Set a static title', () => {
			table = new DataTable('#example', {
				columnControl: {
					target: 1,
					content: [
						{
							extend: 'searchNumber',
							title: 'testD'
						}
					]
				}
			});

			expect($('thead tr:eq(1) td:eq(3) div.dtcc-search-title').text()).toBe('testD');
		});

		dt.html('basic');

		it('Set a [title] placeholder', () => {
			table = new DataTable('#example', {
				columnControl: {
					target: 1,
					content: [
						{
							extend: 'searchNumber',
							title: 'testE [title] testF'
						}
					]
				}
			});

			expect($('thead tr:eq(1) td:eq(3) div.dtcc-search-title').text()).toBe(
				'testE Age testF'
			);
			expect($('thead tr:eq(1) td:eq(5) div.dtcc-search-title').text()).toBe(
				'testE Salary testF'
			);
		});
	});

	describe('Option - titleAttr', function () {
		dt.html('basic');

		it('titleAttr (default)', () => {
			table = new DataTable('#example', {
				columnControl: {
					target: 1,
					content: ['searchNumber']
				}
			});

			expect($('thead tr:eq(1) td:eq(3) input').attr('title')).toBeUndefined();
		});

		dt.html('basic');

		it('Set a static title', () => {
			table = new DataTable('#example', {
				columnControl: {
					target: 1,
					content: [
						{
							extend: 'searchNumber',
							titleAttr: 'testG'
						}
					]
				}
			});

			expect($('thead tr:eq(1) td:eq(3) input').attr('title')).toBe('testG');
		});

		dt.html('basic');

		it('Set a [title] placeholder', () => {
			table = new DataTable('#example', {
				columnControl: {
					target: 1,
					content: [
						{
							extend: 'searchNumber',
							titleAttr: 'testH [title] testI'
						}
					]
				}
			});

			expect($('thead tr:eq(1) td:eq(3) input').attr('title')).toBe('testH Age testI');
			expect($('thead tr:eq(1) td:eq(5) input').attr('title')).toBe('testH Salary testI');
		});
	});
});
