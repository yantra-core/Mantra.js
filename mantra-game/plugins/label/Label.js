// Label.js - Marak Squires 2024
export default class Label {
  static id = 'label';

  constructor(config = {}) {
    this.id = Label.id;
    this.offset = config.offset || { x: 0, y: -20 }; // Default offset above the entity
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem('label', this);
  }
  build(entityData = {}) {
    const { text, offset = this.offset, targetEntity } = entityData;
  
    return {
      type: 'TEXT',
      body: false, // Labels typically don't have a physical body
      text: text || 'Label', // Default text if none provided
      size: {
        width: 220,
        height: 20,
      },
      meta: {
        attachedEntityId: targetEntity, // Initially set if provided
        offset: offset,
      },
  
      // This hook is called after the label entity itself is created
      afterCreateEntity: (createdEntity) => {
        if (!createdEntity.meta.attachedEntityId) {
          // If the label wasn't attached to an entity at creation, handle attachment here
          // For example, the label could be attached based on some game event
          // Use game.updateEntity() to update the attachedEntityId in the label's meta data
          //  alert('needs to auto-attache')
        } else {
        //  alert(createdEntity.meta.attachedEntityId)
        }
      },
  
      update: (entity) => {
        if (entity.meta.attachedEntityId) {
          const attachedEntity = this.game.getEntity(entity.meta.attachedEntityId);
          if (attachedEntity) {
            // Update the label's position based on the attached entity's position and the offset
            const newPosition = {
              x: attachedEntity.position.x + entity.meta.offset.x,
              y: attachedEntity.position.y + entity.meta.offset.y,
            };
  
            // Use game.updateEntity() to ensure the position update is managed correctly
            this.game.updateEntity(entity.id, { position: newPosition });
          }
        }
      }
    };
  }
  

  // Function to create a label and attach it to an entity
  createLabelForEntity(attachedEntityId, text, offset) {
    const labelData = {
      attachedEntityId: attachedEntityId,
      text: text,
      offset: offset || this.offset
    };

    // Create the Label entity
    const label = this.game.createEntity(this.build(labelData));

    // Optionally return the label entity for further manipulation or reference
    return label;
  }
}