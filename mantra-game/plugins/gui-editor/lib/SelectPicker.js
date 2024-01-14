export default class SelectPicker {
  constructor(selectElement, click, game) {
    this.selectElement = selectElement;
    this.game = game;
    this.click = click;
    this.modal = this.createModal();
    this.debounceTimer = null;
    this.addEventListeners();
  }

  createModal() {
    let game = this.game;
    const modal = document.createElement('div');
    this.applyModalStyles(modal);
    
    const picker = document.createElement('ul');
    this.applyPickerStyles(picker);
    this.addPickerScrollEvents(picker);

    Array.from(this.selectElement.options).forEach(option => {
      const listItem = document.createElement('li');
      this.applyListItemStyles(listItem);

      listItem.textContent = option.text;
      listItem.onclick = () => {
        this.selectElement.value = option.value;
        this.click(option.value)
        this.hideModal();
      };

      picker.appendChild(listItem);
    });

    modal.appendChild(picker);
    document.body.appendChild(modal);

    return modal;
  }

  addPickerScrollEvents(picker) {
    let isDragging = false;
    let startY;
    let scrollTop;

    picker.onmousedown = (e) => {
      isDragging = true;
      startY = e.pageY - picker.offsetTop;
      scrollTop = picker.scrollTop;
      e.preventDefault();
    };

    picker.onmousemove = (e) => {
      if (!isDragging) return;
      const y = e.pageY - picker.offsetTop;
      const scroll = y - startY;
      picker.scrollTop = scrollTop - scroll;
    };

    window.onmouseup = () => {
      isDragging = false;
    };

    picker.onwheel = (e) => {
      picker.scrollTop += e.deltaY;
      e.preventDefault();
    };
  }

  applyModalStyles(modal) {
    Object.assign(modal.style, {
      position: 'fixed',
      width: '100%',
      height: '100%',
      top: '0px',
      left: '0',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'none',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 22222,
    });
  }

  applyPickerStyles(picker) {
    Object.assign(picker.style, {
      position: 'relative',
      top: '0px',
      zIndex: 22222,
      listStyle: 'none',
      margin: '0',
      padding: '0',
      maxHeight: '80%',
      maxWidth: '1000px',
      overflowY: 'auto',
      width: '80%',
      backgroundColor: 'white',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
    });
  }

  applyListItemStyles(listItem) {
    Object.assign(listItem.style, {
      paddingTop: '20px',
      paddingBottom: '20px',
      paddingLeft: '5px',
      paddingRight: '5px',
      cursor: 'pointer',
      borderBottom: '1px solid #ddd',
      fontSize: '36px',
      textAlign: 'center',
      backgroundColor: '#f8f8f8',
      margin: '5px',
      borderRadius: '8px',
      transition: 'background-color 0.3s'
    });

    listItem.onmouseover = () => listItem.style.backgroundColor = '#e8e8e8';
    listItem.onmouseout = () => listItem.style.backgroundColor = '#f8f8f8';
  }

  addEventListeners() {
    this.selectElement.addEventListener('focus', () => this.showModal());
    this.selectElement.addEventListener('click', () => this.showModal());
    this.selectElement.addEventListener('click', (e) => e.stopPropagation());
    window.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.hideModal();
      }
    });
  }

  toggle() {
    this.debounce(() => {
      if (this.showingModal) {
        this.hideModal();
      } else {
        this.showModal();
      }
    }, 300); // 300ms debounce time
  }

  debounce(func, delay) {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(func, delay);
  }
  showModal() {
    this.showingModal = true;
    this.modal.style.display = 'flex';
  }

  hideModal() {
    this.showingModal = false;
    this.modal.style.display = 'none';
  }
}
