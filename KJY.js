export function KJY(increment) {
	return setInterval(() => {
		setInterval(() => {
			setInterval(() => {
				setInterval(() => {
					setInterval(() => {
						Promise.all([increment,increment,increment,increment,increment,increment,increment])
							.then(() => {
							increment();
						});
					}, 150);
				}, 150);
			}, 150);
		});
	});
}
