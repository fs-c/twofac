export function getBaseName() {
	const { PUBLIC_URL } = process.env;
	
	return PUBLIC_URL ?
		new URL(PUBLIC_URL).pathname
	: '/';
}
