// import Items from "./components/Items.js";

// function App($target) {
//   const items = new Items($target);
// }

// export default App;

import Component from "./lib/Component.js";
import Items from "./components/Items.js";
import ItemAppender from "./components/ItemAppender.js";
import ItemFilter from "./components/ItemFilter.js";

export default class App extends Component {
  // 초기 state에 넣을 값
  setup() {
    this.state = {
      filterType: 0,
      items: [
        { seq: 1, contents: "item1", active: true },
        { seq: 2, contents: "item2", active: true },
        { seq: 3, contents: "item3", active: true },
      ],
    };
  }

  // 화면에 보여질 element 작성
  template() {
    return `
      <div data-component="item-appender"></div>
      <div data-component="item-items"></div>
      <div data-component="item-filter"></div>
    `;
  }

  mounted() {
    const { filteredItems, addItem, deleteItem, toggleItem, filterItem } = this;
    const $itemAppender = this.$target.querySelector(
      '[data-component="item-appender"]'
    );
    const $items = this.$target.querySelector('[data-component="item-items"]');
    const $itemFilter = this.$target.querySelector(
      '[data-component="item-filter"]'
    );

    new ItemAppender($itemAppender, { addItem: addItem.bind(this) });
    new Items($items, {
      filteredItems,
      deleteItem: deleteItem.bind(this),
      toggleItem: toggleItem.bind(this),
    });
    new ItemFilter($itemFilter, { filterItem: filterItem.bind(this) });
  }

  addItem(contents) {
    const items = [...this.state.items];
    const seq = this.state.items[this.state.items.length - 1]
      ? this.state.items[this.state.items.length - 1].seq + 1
      : 1;
    items.push({ seq: seq, contents: `item${contents}`, active: true });
    this.setState({ items });
  }

  deleteItem(seq) {
    const items = [...this.state.items];
    items.splice(
      items.findIndex((item) => seq === item.seq),
      1
    );
    this.setState({ items });
  }

  toggleItem(seq) {
    const items = [...this.state.items];
    items.some((item) => {
      if (item.seq === seq) {
        item.active = !item.active;
        return true;
      }
    });

    this.setState({ items });
  }

  filterItem(filterType) {
    this.setState({ filterType: Number(filterType) });
  }

  get filteredItems() {
    const { filterType, items } = this.state;
    return items.filter(({ active }) => {
      return (
        filterType === 0 ||
        (filterType === 1 && active) ||
        (filterType === 2 && !active)
      );
    });
  }
}
