// reading from localStorage
export const readFromStorage = (key) => {
    try {
        if (typeof window === 'undefined') return [];
        const raw = window.localStorage.getItem(key);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch (_) {
        return [];
    }

    // setting to localStorage
};
export const writeToStorage = (key, value) => {
    console.log('Writing to localStorage:', key, value);

    try {
        if (typeof window === 'undefined') return;
        window.localStorage.setItem
            (key, JSON.stringify(value));


    } catch (_) {
        console.log('Failed to write to localStorage');
        // ignore quota or serialization errors
    }
};
