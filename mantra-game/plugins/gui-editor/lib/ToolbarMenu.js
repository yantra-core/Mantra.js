export default class ToolbarMenu {
  constructor() {
    // Create the primary and secondary groups
    this.primaryGroup = document.createElement('div');
    this.secondaryGroup = document.createElement('div');

    // Set classes for primary and secondary groups
    this.primaryGroup.className = 'menu-group primary';
    this.secondaryGroup.className = 'menu-group secondary';

    // Style the primary and secondary groups
    this.setStyle(this.primaryGroup, {
      display: 'flex',
      flexWrap: 'wrap'
    });
    this.setStyle(this.secondaryGroup, {
      display: 'flex',
      flexWrap: 'wrap'
    });

    // Create the toolbar and append the groups
    this.toolbar = document.createElement('div');
    this.toolbar.className = 'toolbar';
    this.toolbar.appendChild(this.primaryGroup);
    this.toolbar.appendChild(this.secondaryGroup);

    // Style the toolbar
    this.setStyle(this.toolbar, {
      position: 'fixed',
      top: '0',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      // padding: '10px',
      backgroundColor: '#f3f3f3',
      zIndex: 1,
    });

    // Add the toolbar to the document
    document.body.appendChild(this.toolbar);

    // Responsive design for smaller screens
    window.addEventListener('resize', this.updateResponsiveStyles.bind(this));
    this.updateResponsiveStyles();
  }

  addElement(group, element) {
    if (group === 'primary') {
      this.primaryGroup.appendChild(element);
    } else if (group === 'secondary') {
      this.secondaryGroup.appendChild(element);
    }
  }

  addItem(group, itemObj) {
    const item = document.createElement('div');
    item.className = 'menu-item';
    item.style.textAlign = 'center';

    if (itemObj.hint) {
      item.title = itemObj.hint;
    }
    let itemText = document.createElement('div');
    itemText.className = 'menu-item-text';
    itemText.textContent = itemObj.text;
    
    itemText.style.textAlign = 'center';

    item.appendChild(itemText);

    if (typeof itemObj.icon === 'object') {
      item.appendChild(itemObj.icon);
    }

    this.setStyle(item, {
      margin: '5px',
      fontSize: '20px',
      // padding: '5px 10px',
      paddingLeft: '10px',
      paddingRight: '10px',
      paddingTop: '5px',
      paddingBottom: '5px',
//      fontWeight: 'bold',
      minWidth: '60px',
      backgroundColor: '#ddd',
      borderRadius: '5px',
      cursor: 'pointer',
      position: 'relative', // For dropdown positioning
    });

    if (itemObj.onClick) {
      item.onclick = itemObj.onClick;
    }

    if (itemObj.subItems && itemObj.subItems.length > 0) {
      const dropdown = this.createDropdown(itemObj.subItems);
      item.appendChild(dropdown);
      item.onmouseenter = () => dropdown.style.display = 'block';
      item.onmouseleave = () => dropdown.style.display = 'none';
    }

    if (group === 'primary') {
      this.primaryGroup.appendChild(item);
    } else if (group === 'secondary') {
      this.secondaryGroup.appendChild(item);
    }
  }

  createDropdown(subItems) {
    const dropdown = document.createElement('div');
    dropdown.className = 'dropdown';
    this.setStyle(dropdown, {
      display: 'none',
      minWidth: '300px',
      fontSize: '24px',
      position: 'absolute',
      backgroundColor: '#f9f9f9',
      boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
      padding: '5px',
      zIndex: 1,
      textAlign: 'left',
      //top: '78px',
      // left: '-5px',
      left: 0,
      right: '0',
    });

    subItems.forEach(subItemObj => {
      const subItem = this.createSubItem(subItemObj);
      dropdown.appendChild(subItem);
    });

    return dropdown;
  }

  createSubItem(subItemObj) {
    const subItem = document.createElement('div');
    subItem.textContent = subItemObj.text;
    this.setStyle(subItem, {
      padding: '5px 10px',
      cursor: 'pointer',
      borderBottom: '1px solid #ddd',
    });
    subItem.onmouseenter = () => subItem.style.backgroundColor = '#ddd';
    subItem.onmouseleave = () => subItem.style.backgroundColor = 'transparent';

    if (subItemObj.onClick) {
      subItem.onclick = subItemObj.onClick;
    }

    return subItem;
  }



  setStyle(element, styles) {
    // Apply each style to the element
    Object.assign(element.style, styles);
  }


  updateResponsiveStyles() {
    // Apply responsive styles based on the window width
    if (window.innerWidth <= 600) {
      this.setStyle(this.toolbar, {
        flexDirection: 'column',
        alignItems: 'flex-start'
      });
    } else {
      this.setStyle(this.toolbar, {
        flexDirection: 'row'
      });
    }
  }
}
