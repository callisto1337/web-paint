import { MODE } from '../constants.js';
import { globalState } from './GlobalState.js';

export class Tools {
  constructor() {
    this.initButtonsHandlers();
  }

  initButtonsHandlers() {
    const buttonEls = document.getElementsByClassName('tools__item');

    [...buttonEls].forEach((buttonEl) => {
      buttonEl.addEventListener('click', ({ target }) => {
        if (target.classList.contains('tools__item_pencil')) {
          globalState.set({ mode: MODE.PENCIL });
        } else if (target.classList.contains('tools__item_eraser')) {
          globalState.set({ mode: MODE.ERASURE });
        }

        this.toggleActiveButton(target);
      });
    });
  }

  toggleActiveButton(target) {
    const prevActiveEl = document.querySelector('.tools__item_active');

    if (prevActiveEl) {
      prevActiveEl.classList.remove('tools__item_active');
    }

    target.classList.add('tools__item_active');
  }
}
