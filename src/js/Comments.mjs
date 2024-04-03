import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class Comments {
    constructor(key) {
        this.key = key;
        this.comment = '';
    }
    async init() {
        this.getComment();
    }
    getComment() {
        const form = document.getElementById('CommentForm');
        form.addEventListener('submit', (event) => {
            event.preventDefault(); 
            let selectedValue = document.querySelector('.comment_input').value;
            this.sendComment(selectedValue); // Pass the comment value to sendComment()
        });
    }
    sendComment(comment) {
        let existingItems = getLocalStorage(this.key) || [];
        existingItems.push(comment); // Use the passed comment value
        setLocalStorage(this.key, existingItems);
    }
}