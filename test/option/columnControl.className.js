describe('columnControl.className', function () {
	dt.libs({
		js: ['jquery', 'datatables', 'columncontrol'],
		css: ['datatables', 'columncontrol']
	});

	describe('Functional tests', function () {
		dt.html('basic');

		it('No extra class is added to the default target', () => {
			new DataTable('#example', {
				columnControl: ['order']
			});

			expect($('thead tr')[0].className).toBe('');
		});

		dt.html('basic');

		it('Can specify a class name for the default target', () => {
			new DataTable('#example', {
				columnControl: {
					target: 0,
					className: 'test',
					content: ['order']
				}
			});

			expect($('thead tr')[0].className).toBe('test');
		});

		dt.html('basic');

		it('Can specify a class for a newly created row', () => {
			new DataTable('#example', {
				columnControl: {
					target: 1,
					className: 'testA',
					content: ['order']
				}
			});

			expect($('thead tr')[1].className).toBe('testA');
		});

		it('Did not add a class to the first row', () => {
			expect($('thead tr')[0].className).toBe('');
		});

		dt.html('basic');

		it('Can specify a class for a newly created row', () => {
			new DataTable('#example', {
				columnControl: {
					target: 'tfoot',
					className: 'testFooter',
					content: ['order']
				}
			});

			expect($('tfoot tr')[0].className).toBe('testFooter');
		});

		it('Did not add a class to the header row', () => {
			expect($('thead tr')[0].className).toBe('');
		});

		dt.html('basic');

		it('Can specify classes for multiple targets', () => {
			new DataTable('#example', {
				columnControl: [
					{
						target: 0,
						className: 'testH',
						content: ['order']
					},
					{
						target: 'tfoot',
						className: 'testF',
						content: ['order']
					}
				]
			});

			expect($('thead tr')[0].className).toBe('testH');
			expect($('tfoot tr')[0].className).toBe('testF');
		});

		dt.html('basic');

		it('Do not need to specify any content', () => {
			new DataTable('#example', {
				columnControl: {
					target: 0,
					className: 'testC'
				}
			});

			expect($('thead tr')[0].className).toBe('testC');
		});

		dt.html('basic');

		it('Mixed, content and not', () => {
			new DataTable('#example', {
				columnControl: [
					{
						target: 0,
						className: 'testD'
					},
					{
						target: 1,
						className: 'testE',
						content: ['order']
					}
				]
			});

			expect($('thead tr')[0].className).toBe('testD');
			expect($('thead tr')[1].className).toBe('testE');
		});
	});
});
