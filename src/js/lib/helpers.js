let inDebounce
export function debounce (func, delay) {
	return (...args) => {
		const context = this
		clearTimeout(inDebounce)
		inDebounce = setTimeout(() => func.apply(context, args), delay)
	}
}

export default { debounce }
