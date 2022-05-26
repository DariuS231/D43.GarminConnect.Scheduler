
const camelize = (str) => str.replace(/\W+(.)/g, (_match, chr) => chr.toUpperCase());

export const capitalize = (str) => {
    const lower = camelize(str);
    return str.charAt(0).toUpperCase() + lower.slice(1);
}

export const lowerize = (str) => {
    const lower = camelize(str);
    return str.charAt(0).toLowerCase() + lower.slice(1);
}