import getFormattedTime from "./gerFormattedTime";

export class Letter {
  constructor(parentEl, name, text, time) {
    this.parentEl = parentEl;
    this.name = name;
    this.text = this.trimText(text);
    this.time = getFormattedTime(time);
  }

  get markup() {
    return `
    <div class="new-email">
        <div class="name">${this.name}</div>
        <div class="text">${this.text}</div>
        <div class="time">${this.time}</div>
    </div>
          `;
  }

  render() {
    this.parentEl.insertAdjacentHTML("afterbegin", this.markup);
  }

  trimText(text) {
    if (text.trim().length < 16) {
      return text;
    }
    return text.substring(0, 14) + "...";
  }
}
