// Functional tests are carried out in the individual test files. This just checks assignment
describe('columnControl - search', function () {
	dt.libs({
		js: ['jquery', 'datatables', 'columncontrol'],
		css: ['datatables', 'columncontrol']
	});

	describe('Functionality', function () {
		let table;

		dt.html('basic');

		it('Is present', () => {
			expect(DataTable.ColumnControl.content.search).toBeDefined();
		});

		it('Create CC with search', () => {
			table = new DataTable('#example', {
				columnControl: ['search'],
				ordering: {
					handler: false
				}
			});

			expect($('.dtcc-search').length).toBe(6);
		});

		it('Has the correct search types assigned', () => {
			expect($('thead th:eq(0) .dtcc-searchText').length).toBe(1);
			expect($('thead th:eq(1) .dtcc-searchText').length).toBe(1);
			expect($('thead th:eq(2) .dtcc-searchText').length).toBe(1);
			expect($('thead th:eq(3) .dtcc-searchNumber').length).toBe(1);
			expect($('thead th:eq(4) .dtcc-searchDate').length).toBe(1);
			expect($('thead th:eq(5) .dtcc-searchNumber').length).toBe(1);
		});
	});

	describe('Options - passed through', function () {
		dt.html('basic');

		it('Create CC with default (no) placeholder', () => {
			table = new DataTable('#example', {
				columnControl: [{
					extend: 'search'
				}],
				ordering: {
					handler: false
				}
			});

			expect($('.dtcc-search').length).toBe(6);
		});

		it('No placeholder by default', () => {
			expect($('thead th:eq(0) .dtcc-searchText input').attr('placeholder')).toBeUndefined();
			expect($('thead th:eq(1) .dtcc-searchText input').attr('placeholder')).toBeUndefined();
			expect($('thead th:eq(2) .dtcc-searchText input').attr('placeholder')).toBeUndefined();
			expect($('thead th:eq(3) .dtcc-searchNumber input').attr('placeholder')).toBeUndefined();
			expect($('thead th:eq(4) .dtcc-searchDate input').attr('placeholder')).toBeUndefined();
			expect($('thead th:eq(5) .dtcc-searchNumber input').attr('placeholder')).toBeUndefined();
		});

		dt.html('basic');

		it('Create CC with placerholder', () => {
			table = new DataTable('#example', {
				columnControl: [{
					extend: 'search',
					placeholder: 'TestA'
				}],
				ordering: {
					handler: false
				}
			});

			expect($('.dtcc-search').length).toBe(6);
		});

		it('Custom placeholder assigned', () => {
			expect($('thead th:eq(0) .dtcc-searchText input').attr('placeholder')).toBe('TestA');
			expect($('thead th:eq(1) .dtcc-searchText input').attr('placeholder')).toBe('TestA');
			expect($('thead th:eq(2) .dtcc-searchText input').attr('placeholder')).toBe('TestA');
			expect($('thead th:eq(3) .dtcc-searchNumber input').attr('placeholder')).toBe('TestA');
			expect($('thead th:eq(4) .dtcc-searchDate input').attr('placeholder')).toBe('TestA');
			expect($('thead th:eq(5) .dtcc-searchNumber input').attr('placeholder')).toBe('TestA');
		});
	});

	describe('Option - allowSearchList', function () {
		// Just check the lists are created (or not) - search logic is checked in searchList.js
		let table;

		dt.html('empty');

		it('Create Ajax table with CC search - default allowSearchList', (done) => {
			table = new DataTable('#example', {
				ajax: '/base/test/data/cc-options.txt',
				columnControl: ['search'],
				columns: [
					{ data: 'name' },
					{ data: 'position' },
					{ data: 'office' },
					{ data: 'extn' },
					{ data: 'start_date' },
					{ data: 'salary' }
				],
				ordering: {
					indicators: false,
					handler: false
				}
			});

			table.ready(() => {
				done();
			});
		});

		it('Does not show any lists', () => {
			expect($('.dtcc-search').length).toBe(6);
			expect($('.dtcc-list').length).toBe(0);
		});

		dt.html('empty');

		it('Create Ajax table with CC search - and enable allowSearchList', (done) => {
			table = new DataTable('#example', {
				ajax: '/base/test/data/cc-options.txt',
				columnControl: [{
					extend: 'search',
					allowSearchList: true
				}],
				columns: [
					{ data: 'name' },
					{ data: 'position' },
					{ data: 'office' },
					{ data: 'extn' },
					{ data: 'start_date' },
					{ data: 'salary' }
				],
				ordering: {
					indicators: false,
					handler: false
				}
			});

			table.ready(() => {
				done();
			});
		});

		it('Has two lists', () => {
			expect($('.dtcc-search').length).toBe(4);
			expect($('.dtcc-list').length).toBe(2);
		});

		dt.html('basic');

		it('Create DOM table with CC search - and enable allowSearchList', (done) => {
			table = new DataTable('#example', {
				columnControl: [{
					extend: 'search',
					allowSearchList: true
				}],
				ordering: {
					indicators: false,
					handler: false
				}
			});

			table.ready(() => {
				done();
			});
		});

		it('Has no lists - `search` only shows lists when provided by Ajax', () => {
			expect($('.dtcc-search').length).toBe(6);
			expect($('.dtcc-list').length).toBe(0);
		});
	});
});
