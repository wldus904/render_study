import Component from "../lib/Component.js";

export default class ItemAppender extends Component {
  template() {
    return `<input type="text" class="appender" placeholder="아이템 추가" />`;
  }

  setEvent() {
    const { addItem } = this.$props;
    this.addEvent("keyup", ".appender", ({ key, target }) => {
      if (key != "Enter") return;
      addItem(target.value);
    });
  }
}
