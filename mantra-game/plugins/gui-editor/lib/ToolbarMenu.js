// TODO: refactor this out into a Plugin UI Component
export default class ToolbarMenu {
  constructor() {

    this.toggleStatus = 'closed';
     // Add an isTransitioning flag to track transition state
     this.isTransitioning = false;

    // Create the primary and secondary groups
    this.primaryGroup = document.createElement('div');
    this.secondaryGroup = document.createElement('div');
    this.middleGroup = document.createElement('div');

    // Set classes for primary and secondary groups
    this.primaryGroup.className = 'menu-group primary';
    this.secondaryGroup.className = 'menu-group secondary';
    this.middleGroup.className = 'menu-group middle';


    // Style the primary and secondary groups
    this.setStyle(this.primaryGroup, {
      display: 'flex',
      flexWrap: 'wrap'
    });
    this.setStyle(this.secondaryGroup, {
      display: 'flex',
      flexWrap: 'wrap'
    });
    this.setStyle(this.middleGroup, {
      display: 'flex',
      flexWrap: 'wrap'
    });

    // Create the toolbar and append the groups
    this.toolbar = document.createElement('div');
    this.toolbar.className = 'toolbar';
    this.toolbar.appendChild(this.primaryGroup);
    this.toolbar.appendChild(this.middleGroup);
    this.toolbar.appendChild(this.secondaryGroup);

    // Style the toolbar
    this.setStyle(this.toolbar, {
      position: 'fixed',
      top: '0',
      height: '50px',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      // padding: '10px',
      backgroundColor: '#f3f3f3',
      zIndex: 9001,
    });

    // Add the toolbar to the document
    document.body.appendChild(this.toolbar);

    // Responsive design for smaller screens
    window.addEventListener('resize', this.updateResponsiveStyles.bind(this));
    this.updateResponsiveStyles();

    this.slideInToolbar();
  }

  setTransitioningState(isTransitioning) {
    this.isTransitioning = isTransitioning;

    // Disable interaction during transition
    this.toolbar.style.pointerEvents = isTransitioning ? 'none' : 'auto';
  }

  slideOutToolbar() {
    if (this.isTransitioning || this.toggleStatus === 'closed') {
      return;
    }
    this.setTransitioningState(true);
    this.toggleStatus = 'closed';
    this.setStyle(this.toolbar, {
      transition: '0.5s',
      top: '-100px',
    });

    // Reset isTransitioning flag after transition ends
    setTimeout(() => this.setTransitioningState(false), 500);
  }

  slideInToolbar() {
    if (this.isTransitioning || this.toggleStatus === 'open') {
      return;
    }

    this.setTransitioningState(true);
    this.toggleStatus = 'open';
    this.setStyle(this.toolbar, {
      transition: '0.5s',
      top: '0',
    });

    // Reset isTransitioning flag after transition ends
    setTimeout(() => this.setTransitioningState(false), 500);
  }

  addElement(group, element, prepend = false) {

  
    if (prepend) {
      if (group === 'primary') {
        this.primaryGroup.insertBefore(element, this.primaryGroup.firstChild);
      } else if (group === 'secondary') {
        this.secondaryGroup.insertBefore(element, this.secondaryGroup.firstChild);
      } else if (group === 'middle') {
        this.middleGroup.insertBefore(element, this.middleGroup.firstChild);
      }

    } else {
      if (group === 'primary') {
        this.primaryGroup.appendChild(element);
      } else if (group === 'secondary') {
        this.secondaryGroup.appendChild(element);
      } else if (group === 'middle') {
        this.middleGroup.appendChild(element);
      }
    }

  }

  addItem(group, itemObj, prepend = false) {
    const item = document.createElement('div');
    item.className = 'menu-item';
    item.style.textAlign = 'center';

    if (itemObj.hint) {
      item.title = itemObj.hint;
    }
    let itemText = document.createElement('div');

    let textSpan = document.createElement('span');
    textSpan.textContent = itemObj.text;
    textSpan.style.position = 'relative';
    textSpan.style.bottom = '5px';
    textSpan.style.paddingLeft = '5px';


    if (typeof itemObj.icon === 'object') {
      if (prepend) {
        itemText.appendChild(itemObj.icon);
      } else {
        itemText.appendChild(itemObj.icon);
      }
    }

    itemText.className = 'menu-item-text';
    itemText.appendChild(textSpan);
    itemText.style.textAlign = 'center';
    //itemText.style.position = 'relative';
    //itemText.style.bottom = '10px';
    //itemText.style.left = '10px';

    if (prepend) {
      item.appendChild(itemText, item.firstChild);
    } else {
      item.appendChild(itemText);
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