const messages = {
    element: document.getElementById('messages'),

    clear() {
        this.element.textContent = '';
    },

    die() {
        this.element.textContent = 'you died';
    },
};

export default messages;
