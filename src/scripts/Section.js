export class Section {
  constructor({renderer}, containerSelector){
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderItems({items, user}) {
    const data = items.reverse()
    data.forEach(item => {
      this._renderer({element: item, user: user});
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
  
}


