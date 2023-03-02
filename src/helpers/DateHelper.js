export const DATETIME = {
    valueFormatter: value => !value ? null : (typeof value.getTime === 'function' ? value : new Date(value)).toLocaleString(document.documentElement.lang).replace(/\. /g, '.').replace(/:\d\d$/g, '').replace(/:\d\d /g, ' '),
}