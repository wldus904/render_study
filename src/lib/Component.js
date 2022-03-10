class Component {
  $target;
  state;
  constructor($target) {
    this.$target = $target;
    this.setup();
    this.setEvent();
    this.render();
  }

  setup() {}
  template() {
    return "";
  }

  render() {
    this.$target.innerHTML = this.template();
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  setEvent () {}

  addEvent(eventType, selector, callback) {
    const chidren = [...this.$target.querySelectorAll(selector)];
    const isTarget = (target) => {return chidren.includes(target) || target.closest(selector)};

    this.$target.addEventListener(eventType, event => {
      if (!isTarget(event.target)) return false;
      callback(event);
    });
  }
}

export default Component;
