import React from 'react';

function extractNumericValue(str) {
    const matches = str.match(/\d+/);
    if (matches) {
        return parseFloat(matches[0]);
    }
    return null;
}

export function customSortFunction(a, b, orderByName) {
    const nameA = a[orderByName].toLowerCase();
    const nameB = b[orderByName].toLowerCase();

    // Extract numeric values from the strings
    const numberA = extractNumericValue(nameA);
    const numberB = extractNumericValue(nameB);

    if (numberA === numberB) {
        // If the numeric values are equal, compare the full string
        return nameA.localeCompare(nameB);
    } else {
        // Otherwise, compare the numeric values
        return numberA - numberB;
    }
}