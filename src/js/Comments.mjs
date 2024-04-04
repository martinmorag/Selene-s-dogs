import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function formatDateTime(dateTime) {
    if (!dateTime) return ''; // Handle empty date
    const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateTime).toLocaleDateString(undefined, options);
}

function theComment(comment) {
    const item =   `<div class="comment">
                        <span class="comment-time">${formatDateTime(comment.timestamp)}</span>
                        <hr class="hr">
                        <span class="comment-content">${comment.content}</span>
                    </div>`
    return item;
}

export default class Comments {
    constructor(key) {
        this.key = key;
        this.comment = '';
    }
    async init() {
        this.getComment();
        this.displayComments()
    }
    getComment() {
        const form = document.getElementById('CommentForm');
        form.addEventListener('submit', (event) => {
            event.preventDefault(); 
            let selectedValue = document.querySelector('.comment_input').value;
            this.sendComment(selectedValue); // Pass the comment value to sendComment()
        });
    }
    sendComment(content) {
        const timestamp = new Date().toISOString(); // Get current date and time
        let existingItems = getLocalStorage(this.key) || [];
        existingItems.push({ content, timestamp }); // Store comment object with content and timestamp
        setLocalStorage(this.key, existingItems);
        this.displayComments();
    }
    displayComments() {
        let comments = getLocalStorage(this.key) || [];
        const div = document.querySelector('.posted-comments');
        div.innerHTML = '';

        comments.forEach(comment => {
            div.innerHTML += theComment(comment);
        });
    }
}