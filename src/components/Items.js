import Component from "../lib/Component.js";

class Items extends Component {
  // 초기 state에 넣을 값
  setup() {
    this.state = { items: [1, 2, 3] };
  }

  // 화면에 보여질 element 작성
  template() {
    const { items } = this.state;

    return `
        <ul>
            ${items
              .map((item, idx) => {
                return `<li>${item}</li><button type="button" class="remove" data-idx="${idx}">삭제</button>`;
              })
              .join("")}
        </ul>
        <button type="button" class="add">추가</button>
    `;
  }

  setEvent() {
    this.$target.addEventListener("click", ({ target }) => {
      const items = [...this.state.items];

      if (target.classList.contains("add")) {
        let num = this.state.items[this.state.items.length - 1]
          ? this.state.items[this.state.items.length - 1]
          : 0;
        num++;
        items.push(num);
      } else if (target.classList.contains("remove")) {
        items.splice(target.dataset.idx, 1);
      }

      this.setState({ items: items });
    });
  }
}

export default Items;