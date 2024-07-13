type Listener = (...args: any[]) => void;

class EventEmitter {
  private static events: { [event: string]: Listener[] } = {};

  static on(event: string, listener: Listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  static off(event: string, listenerToRemove: Listener) {
    if (!this.events[event]) return;

    this.events[event] = this.events[event].filter(listener => listener !== listenerToRemove);
  }

  static emit(event: string, ...args: any[]) {
    if (!this.events[event]) return;

    this.events[event].forEach(listener => {
      listener(...args);
    });
  }
}

export default EventEmitter;
