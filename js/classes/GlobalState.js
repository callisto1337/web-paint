import { MODE } from '../constants.js';

class GlobalState {
  #listeners = [];
  #values = {
    mode: MODE.PENCIL,
    color: 'black',
  };

  set(newValues) {
    for (let name in newValues) {
      if (!this.#values[name]) {
        console.error(`Свойства "${this.#values[name]}" не существует`);

        continue;
      }

      if (this.#values[name] === newValues[name]) {
        continue;
      }

      this.#listeners.forEach((listener) => {
        if (name === listener.name) {
          listener.callback({
            oldValue: this.get(name),
            newValue: newValues[name],
          });
        }
      });
      this.#values[name] = newValues[name];
    }
  }

  get(name) {
    if (this.#values[name]) {
      return this.#values[name];
    }

    console.error(`Свойства "${this.#values[name]}" не существует`);

    return undefined;
  }

  listen(name, callback) {
    this.#listeners.push({
      callback,
      name,
    });
  }
}

export const globalState = new GlobalState();
