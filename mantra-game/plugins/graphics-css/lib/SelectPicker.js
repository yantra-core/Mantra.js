export default class SelectPicker {
  constructor(selectElement) {
    this.selectElement = selectElement;
    this.modal = this.createModal();
    this.addEventListeners();
  }

  createModal() {
    const modal = document.createElement('div');
    this.applyModalStyles(modal);

    const picker = document.createElement('ul');
    this.applyPickerStyles(picker);

    Array.from(this.selectElement.options).forEach(option => {
      const listItem = document.createElement('li');
      this.applyListItemStyles(listItem);

      listItem.textContent = option.text;
      listItem.onclick = () => {
        this.selectElement.value = option.value;
        this.hideModal();
      };

      picker.appendChild(listItem);
    });

    modal.appendChild(picker);
    document.body.appendChild(modal);

    return modal;
  }

  applyModalStyles(modal) {
    Object.assign(modal.style, {
      position: 'fixed',
      width: '100%',
      height: '100%',
      top: '0',
      left: '0',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'none',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: '1000'
    });
  }

  applyPickerStyles(picker) {
    Object.assign(picker.style, {
      listStyle: 'none',
      margin: '0',
      padding: '0',
      maxHeight: '50%',
      overflowY: 'auto',
      width: '80%',
      backgroundColor: 'white',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
    });
  }

  applyListItemStyles(listItem) {
    Object.assign(listItem.style, {
      padding: '20px',
      cursor: 'pointer',
      borderBottom: '1px solid #ddd',
      fontSize: '20px',
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
    window.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.hideModal();
      }
    });
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
