import Component from "../lib/Component.js";

class Items extends Component {
  // 화면에 보여질 element 작성
  template() {
    const { filteredItems } = this.$props;
    return `
        ${filteredItems
          .map(({ contents, seq, active }) => {
            return `<li data-seq="${seq}">
                      ${contents}
                      <button class="toggleBtn" style="color: ${
                        active ? "#09F" : "#F09"
                      }">
                        ${active ? "활성" : "비활성"}
                      </button>
                      <button type="button" class="remove"">
                        삭제
                      </button>
                    </li>`;
          })
          .join("")}
    `;
  }

  setEvent() {
    const { deleteItem, toggleItem } = this.$props;

    this.addEvent("click", ".remove", ({ target }) => {
      const seq = Number(target.closest("[data-seq]").dataset.seq);
      deleteItem(seq);
    });

    this.addEvent("click", ".toggleBtn", ({ target }) => {
      const seq = Number(target.closest("[data-seq]").dataset.seq);
      toggleItem(seq);
    });
  }
}

export default Items;
