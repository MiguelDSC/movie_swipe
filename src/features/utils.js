// reading from localStorage
export const readFromStorage = (key) => {
    try {
        if (typeof window === 'undefined') return [];
        const raw = window.localStorage.getItem(key);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
        console.log(`Failed to read from localStorage : ${e}`);
        return [];
    }

    // setting to localStorage
};
export const writeToStorage = (key, value) => {

    try {
        if (typeof window === 'undefined') return;
        window.localStorage.setItem(key, JSON.stringify(value));


    } catch (e) {
        console.log(`Failed to write to localStorage : ${e}`);
        // ignore quota or serialization errors
    }
};
