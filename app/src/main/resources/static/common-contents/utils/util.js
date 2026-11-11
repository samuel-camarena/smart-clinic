// util.js

export function capitalize(text) {
    return text ? String(text).charAt(0).toUpperCase() + String(text).substring(1) : "";
}