describe('columnControl - searchDateTime', function () {
	dt.libs({
		js: ['jquery', 'datatables', 'columncontrol', 'datetime'],
		css: ['datatables', 'columncontrol', 'datetime']
	});

	describe('Basic functionality', function () {
		let table;

		dt.html('basic');

		it('Is present', () => {
			expect(DataTable.ColumnControl.content.searchDateTime).toBeDefined();
		});

		it('Create CC with search', () => {
			table = new DataTable('#example', {
				columnControl: {
					target: 1,
					content: ['searchDateTime']
				}
			});

			expect($('.dtcc-searchDateTime').length).toBe(6);
		});

		it('There is an input element in each cell in the second header row', () => {
			expect($('thead tr:eq(1) input').length).toBe(6);
			expect($('thead tr:eq(1) td:eq(4) input').length).toBe(1);
		});

		it('There is no initial search value', () => {
			expect($('thead tr:eq(1) td:eq(4) input').val()).toBe('');
		});

		it('Is shown as not active', () => {
			expect(
				$('thead tr:eq(1) td:eq(4) div.dtcc-search').hasClass('dtcc-search_active')
			).toBe(false);
		});

		it('Can apply a search', () => {
			$('thead tr:eq(1) td:eq(4) input')
				.val('2012-10-13')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Bradley Greer');
		});

		it('Search input is shown as active when there is a filter', () => {
			expect(
				$('thead tr:eq(1) td:eq(4) div.dtcc-search').hasClass('dtcc-search_active')
			).toBe(true);
		});

		it('Remove search terms', () => {
			$('thead tr:eq(1) td:eq(4) input')
				.val('')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Airi Satou');
		});

		it('Back to not active', () => {
			expect(
				$('thead tr:eq(1) td:eq(4) div.dtcc-search').hasClass('dtcc-search_active')
			).toBe(false);
		});

		it('Date picker is shown when clicking on the input', () => {
			$('thead tr:eq(1) td:eq(4) input').trigger('click');

			expect($('div.dt-datetime').length).toBe(1);
		});

		// it('And clicking out hides it', () => {
		// 	$('div:eq(0)').trigger('click');

		// 	expect($('div.dt-datetime').length).toBe(0);
		// });
	});

	describe('State saving', function () {
		dt.html('basic');

		it('Setup with state restore - no initial value', () => {
			table = new DataTable('#example', {
				columnControl: {
					target: 1,
					content: ['searchDateTime']
				},
				stateSave: true
			});

			expect($('thead tr:eq(1) td:eq(4) input').val()).toBe('');
		});

		it('Can apply a search', () => {
			$('thead tr:eq(1) td:eq(4) input')
				.val('2012-03-29')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Cedric Kelly');
		});

		dt.html('basic');

		it('Restore with a saved state', () => {
			table = new DataTable('#example', {
				columnControl: {
					target: 1,
					content: ['searchDateTime']
				},
				stateSave: true
			});

			expect($('thead tr:eq(1) td:eq(0) input').val()).toBe('');
			expect($('thead tr:eq(1) td:eq(4) input').val()).toBe('2012-03-29');
		});

		it('And filter was applied', () => {
			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Cedric Kelly');
		});

		it('Remove search terms', () => {
			$('thead tr:eq(1) td:eq(4) input')
				.val('')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Airi Satou');
		});

		it('Search logic set', () => {
			$('thead tr:eq(1) td:eq(4) select')
				.val('less')
				.triggerNative('input');
			$('thead tr:eq(1) td:eq(4) input')
				.val('2008-10-16')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Jackson Bradshaw');
		});

		dt.html('basic');

		it('Restore state', () => {
			table = new DataTable('#example', {
				columnControl: {
					target: 1,
					content: ['searchDateTime']
				},
				stateSave: true
			});

			expect($('thead tr:eq(1) td:eq(4) select').val()).toBe('less');
			expect($('thead tr:eq(1) td:eq(4) input').val()).toBe('2008-10-16');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Jackson Bradshaw');
		});

		it('Remove search terms', () => {
			$('thead tr:eq(1) td:eq(4) select')
				.val('equals')
				.triggerNative('input');
			$('thead tr:eq(1) td:eq(4) input')
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
					content: ['searchDateTime']
				}
			});

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Airi Satou');
		});

		it('Has a logic selector', () => {
			expect($('thead tr:eq(1) td:eq(4) select').length).toBe(1);
			expect($('thead tr:eq(1) td select').length).toBe(6);
		});

		it('Default value is `equal`', () => {
			expect($('thead tr:eq(1) td:eq(4) select').val()).toBe('equal');
		});

		it('equal search - matches', () => {
			$('thead tr:eq(1) td:eq(4) input')
				.val('2012-12-02')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Brielle Williamson');
		});

		it('equal search - no match', () => {
			$('thead tr:eq(1) td:eq(4) input')
				.val('2025-12-02')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('No matching records found');
		});

		it('notEqual search - matches', () => {
			$('thead tr:eq(1) td:eq(4) select')
				.val('notEqual')
				.triggerNative('input');
			$('thead tr:eq(1) td:eq(4) input')
				.val('2008-11-28')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Angelica Ramos');
		});

		it('notEqual search - no match', () => {
			$('thead tr:eq(1) td:eq(4) input')
				.val('2025-01-01')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Airi Satou');
		});

		it('greater (after) search - matches', () => {
			$('thead tr:eq(1) td:eq(4) select')
				.val('greater')
				.triggerNative('input');
			$('thead tr:eq(1) td:eq(4) input')
				.val('2011-12-12')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Bradley Greer');
		});

		it("greater search - matches - doesn't include equal A", () => {
			$('thead tr:eq(1) td:eq(4) input')
				.val('2013-08-11')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('No matching records found');
		});

		it("greater search - matches - doesn't include equal B", () => {
			$('thead tr:eq(1) td:eq(4) input')
				.val('2013-08-10')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Thor Walton');
		});

		it('greater search - no match', () => {
			$('thead tr:eq(1) td:eq(4) input')
				.val('20215-01-01')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('No matching records found');
		});

		it('less search - matches', () => {
			$('thead tr:eq(1) td:eq(4) select')
				.val('less')
				.triggerNative('input');
			$('thead tr:eq(1) td:eq(4) input')
				.val('2008-11-28')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Charde Marshall');
		});

		it("less search - matches - doesn't include equal - A", () => {
			$('thead tr:eq(1) td:eq(4) input')
				.val('2008-11-28')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Charde Marshall');
		});

		it("less search - matches - doesn't include equal - A", () => {
			$('thead tr:eq(1) td:eq(4) input')
				.val('2008-11-29')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Airi Satou');
		});

		it('less search - no match', () => {
			$('thead tr:eq(1) td:eq(4) input')
				.val('2001-01-01')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('No matching records found');
		});

		it('clear values', () => {
			$('thead tr:eq(1) td:eq(4) span.dtcc-search-clear').trigger('click');

			expect($('thead tr:eq(1) td:eq(4) input').val()).toBe('');
			expect($('thead tr:eq(1) td:eq(4) select').val()).toBe('equal');
		});

		it('Is shown as not active', () => {
			expect(
				$('thead tr:eq(1) td:eq(0) div.dtcc-search').hasClass('dtcc-search_active')
			).toBe(false);
		});

		it('set an empty value', () => {
			table
				.cell(0, 4)
				.data('')
				.draw();

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Airi Satou');
		});

		it('empty search - matches', () => {
			$('thead tr:eq(1) td:eq(4) select')
				.val('empty')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Tiger Nixon');
			expect($('tbody tr:eq(0) td:eq(4)').text()).toBe('');
		});

		it('empty search - is active', () => {
			expect(
				$('thead tr:eq(1) td:eq(4) div.dtcc-search').hasClass('dtcc-search_active')
			).toBe(true);
		});

		it('notEmpty search - matches', () => {
			$('thead tr:eq(1) td:eq(4) select')
				.val('notEmpty')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Airi Satou');
		});

		it('notEmpty search - is active', () => {
			expect(
				$('thead tr:eq(1) td:eq(4) div.dtcc-search').hasClass('dtcc-search_active')
			).toBe(true);
		});
	});

	describe('Option - clear', function () {
		dt.html('basic');

		it('Clear button enabled (default)', () => {
			table = new DataTable('#example', {
				columnControl: {
					target: 1,
					content: ['searchDateTime']
				}
			});

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Airi Satou');
		});

		it('Clear button is not visible with no value', () => {
			expect($('thead tr:eq(1) td:eq(4) span.dtcc-search-clear').is(':visible')).toBe(false);
		});

		it('Apply a search', () => {
			$('thead tr:eq(1) td:eq(4) input')
				.val('2011-06-07')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Brenden Wagner');
		});

		it('Clear button is now visible on this input', () => {
			expect($('thead tr:eq(1) td:eq(4) span.dtcc-search-clear').is(':visible')).toBe(true);
		});

		it('And only that one', () => {
			expect($('thead tr:eq(1) td:eq(0) span.dtcc-search-clear').is(':visible')).toBe(false);
		});

		it('Clearing makes it hidden again', () => {
			$('thead tr:eq(1) td:eq(4) input')
				.val('')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Airi Satou');
			expect($('thead tr:eq(1) td:eq(4) span.dtcc-search-clear').is(':visible')).toBe(false);
		});

		it('Apply a search', () => {
			$('thead tr:eq(1) td:eq(4) input')
				.val('2011-05-03')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Bruno Nash');
		});

		it('Clicking the button will clear the input', () => {
			$('thead tr:eq(1) td:eq(4) span.dtcc-search-clear').trigger('click');

			expect($('thead tr:eq(1) td:eq(4) input').val()).toBe('');
			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Airi Satou');
		});

		it('And it was hidden', () => {
			expect($('thead tr:eq(1) td:eq(4) span.dtcc-search-clear').is(':visible')).toBe(false);
		});

		dt.html('basic');

		it('Clear button can be disabled', () => {
			table = new DataTable('#example', {
				columnControl: {
					target: 1,
					content: [
						{
							extend: 'searchDateTime',
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
					content: ['searchDateTime']
				}
			});

			expect($('thead tr:eq(1) td:eq(4) input').attr('placeholder')).toBeUndefined();
		});

		dt.html('basic');

		it('Set a placeholder', () => {
			table = new DataTable('#example', {
				columnControl: {
					target: 1,
					content: [
						{
							extend: 'searchDateTime',
							placeholder: 'testA'
						}
					]
				}
			});

			expect($('thead tr:eq(1) td:eq(4) input').attr('placeholder')).toBe('testA');
		});

		dt.html('basic');

		it('Set a [title] placeholder', () => {
			table = new DataTable('#example', {
				columnControl: {
					target: 1,
					content: [
						{
							extend: 'searchDateTime',
							placeholder: 'testB [title] testC'
						}
					]
				}
			});

			expect($('thead tr:eq(1) td:eq(4) input').attr('placeholder')).toBe(
				'testB Start date testC'
			);
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
					content: ['searchDateTime']
				}
			});

			expect($('thead tr:eq(1) td:eq(4) div.dtcc-search-title').text()).toBe('');
		});

		dt.html('basic');

		it('Set a static title', () => {
			table = new DataTable('#example', {
				columnControl: {
					target: 1,
					content: [
						{
							extend: 'searchDateTime',
							title: 'testD'
						}
					]
				}
			});

			expect($('thead tr:eq(1) td:eq(4) div.dtcc-search-title').text()).toBe('testD');
		});

		dt.html('basic');

		it('Set a [title] placeholder', () => {
			table = new DataTable('#example', {
				columnControl: {
					target: 1,
					content: [
						{
							extend: 'searchDateTime',
							title: 'testE [title] testF'
						}
					]
				}
			});

			expect($('thead tr:eq(1) td:eq(4) div.dtcc-search-title').text()).toBe(
				'testE Start date testF'
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
					content: ['searchDateTime']
				}
			});

			expect($('thead tr:eq(1) td:eq(4) input').attr('title')).toBeUndefined();
		});

		dt.html('basic');

		it('Set a static title', () => {
			table = new DataTable('#example', {
				columnControl: {
					target: 1,
					content: [
						{
							extend: 'searchDateTime',
							titleAttr: 'testG'
						}
					]
				}
			});

			expect($('thead tr:eq(1) td:eq(4) input').attr('title')).toBe('testG');
		});

		dt.html('basic');

		it('Set a [title] placeholder', () => {
			table = new DataTable('#example', {
				columnControl: {
					target: 1,
					content: [
						{
							extend: 'searchDateTime',
							titleAttr: 'testH [title] testI'
						}
					]
				}
			});

			expect($('thead tr:eq(1) td:eq(4) input').attr('title')).toBe('testH Start date testI');
			expect($('thead tr:eq(1) td:eq(5) input').attr('title')).toBe('testH Salary testI');
		});
	});
});
