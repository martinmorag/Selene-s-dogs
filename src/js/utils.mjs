const URL = 'https://api.thedogapi.com/v1/breeds';
const API_KEY = 'live_TQl1cIlZjyOt9odKKBOtqozEMEYfEQWUvLFtuZl5TTz9yBqK7ZQYD5FKG9fmcFIh'; 

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
    console.log(responseData);
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
    const headerTemplate = await loadTemplate(baseUrl + "/public/partials/header.html");
    const headerElement = document.querySelector("#main-header");
    const footerTemplate = await loadTemplate(baseUrl + "/public/partials/footer.html");
    const footerElement = document.querySelector("#main-footer");

    renderWithTemplate(headerTemplate, headerElement);
    renderWithTemplate(footerTemplate, footerElement);
}