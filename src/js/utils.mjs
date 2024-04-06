const URL = import.meta.env.VITE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}
export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}


export async function displayBreeds() {
try {
    const response = await fetch(URL, {
    headers: {
        'x-api-key': API_KEY
    }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch breeds');
    }
    const responseData = await response.json();
    return responseData;
} catch(err) {
    console.log(err);
    }
}

async function loadTemplate(path) {
    const res = await fetch(path);
    const template = await res.text();
    return template;
}
export function renderWithTemplate(template, parentElement, data, callback) {
    parentElement.insertAdjacentHTML("afterbegin", template);
    //if there is a callback...call it and pass data
    if (callback) {
      callback(data);
    }
}
export async function loadHeaderFooter() {
    const baseUrl = window.location.origin;
    const headerTemplate = await loadTemplate(baseUrl + "/partials/header.html");
    const headerElement = document.querySelector("#main-header");
    const footerTemplate = await loadTemplate(baseUrl + "/partials/footer.html");
    const footerElement = document.querySelector("#main-footer");

    renderWithTemplate(headerTemplate, headerElement);
    renderWithTemplate(footerTemplate, footerElement);
}
