class Main {
    constructor() {
        this._message = 'Em desenvolvimento';
    }

    showAlert(event) {
        event = event || window.event;
        event.preventDefault();
        alert(this._message);
    }
}