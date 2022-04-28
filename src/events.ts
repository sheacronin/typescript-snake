const events = {
    events: {},
    on: function (eventName: string, fn: () => void) {
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(fn);
    },
    off: function (eventName: string, fn: () => void) {
        if (this.events[eventName]) {
            for (let i = 0; i < this.events[eventName].length; i++) {
                if (this.events[eventName][i] === fn) {
                    this.events[eventName].splice(i, 1);
                    break;
                }
            }
        }
    },
    emit: function (eventName: string, data: object) {
        if (this.events[eventName]) {
            this.events[eventName].forEach((fn: (data: object) => void) =>
                fn(data)
            );
        }
    },
};

export default events;
