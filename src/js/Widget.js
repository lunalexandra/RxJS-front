import { Letter } from "./Letter";
import { interval } from "rxjs";
import { switchMap } from "rxjs/operators";
import { ajax } from "rxjs/ajax";

export class Widget {
  constructor(parentEl) {
    this.parentEl = parentEl;
  }

  static get markup() {
    return `
    <div class="title">Incoming</div>
    <div class="emails-list"></div>
          `;
  }

  static get emailListSelector() {
    return ".emails-list";
  }

  bindToDOM() {
    this.parentEl.innerHTML = Widget.markup;
    this.element = this.parentEl.querySelector(Widget.emailListSelector);
    this.startFetchingMessages();
  }

  renderMessage(message) {
    const { from, subject, received } = message;
    const letter = new Letter(this.element, from, subject, received);
    letter.render();
  }

  startFetchingMessages() {
    const url = `http://localhost:3000/messages/unread`;
    const refreshInterval = 5000;

    interval(refreshInterval)
      .pipe(switchMap(() => ajax.getJSON(url)))
      .subscribe({
        next: (response) => {
          response.messages.forEach((message) => this.renderMessage(message));
        },
        error: (err) => console.error("Ошибка при получении обновлений:", err),
      });
  }
}
