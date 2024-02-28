let exampleRoot = 'https://yantra.gg/mantra/examples';
//exampleRoot = 'http://192.168.1.80:8888';
//exampleRoot = 'http://192.168.1.80:7777/examples';

export default class Playground {
  static id = 'world-playground';
  // "world" type has special features in that it can be unloaded and reloaded.
  //  with special rules such as merge, replace, etc.
  //  this is currently used when switching between worlds in the GUI Editor
  //  the default behavior is to unload the world, then load the new world
  static type = 'world'; // type is optional for Plugins
  constructor() {
    this.id = Playground.id;
  }

  init(game) {
    this.game = game;
    game.config.defaultMouseMovement = false;


    // Movements with right click, switch default left-click-to-move behavior
    game.config.mouseMovementButton = 'RIGHT';
    // Actions with left click
    game.config.mouseActionButton = 'LEFT';
    // enables the default top-down mouse movements
    game.config.defaultMouseMovement = true;

    game.reset();

    game.data.camera.mode = 'none';

    // Remark: Not ideal for mapping Mouse buttons, 
    // as they should be conditionals in Sutra tree like Keyboard events are
    let mouse = game.systems.mouse;
    mouse.setButtonMapping('LEFT', 1);
    mouse.setButtonMapping('MIDDLE', 0);
    // enables mouse wheel zoom
    game.data.camera.mouseWheelZoomEnabled = true;
    this.createWorld();
  }

  async preload(game) {

    game.use('Player');
    game.use('Text');
    game.use('Platform');
    game.use('Teleporter');
    game.use('Editor');
    game.use('Code');
    game.use('Iframe');
    game.use('Select');
    game.use('Button')
    game.use('Hexapod')

  }

  createWorld() {
    let game = this.game;
    // game.make().Platform({ x: 0, y: 0, width: 16000, height: 9000 }).createEntity();
    // game.make().size(100).color('blue').createEntity();
    console.log('ggg', game.systems)
    //game.systems.editor.init(game);
    // game.systems.editor.show();

    let text = game.make().Text().text('Mantra.js Playground').style({
      fontSize: '64px',
    });
    text.color('white');
    text.width(900);
    text.position(50, -480, 0);
    text.createEntity();

    let sideTextGroup = game.make().name('side-text-group').style({
      border: 'none',
      backgroundColor: 'rgba(0, 0, 0, 0)',
    }).position(-800, -400).createEntity();

    let introText = game.make().Text().text('Select from the drop downs');
    introText.color('white');
    introText.position(280, 10);
    introText.width(200);
    introText.style({
      fontSize: '64px',
      textAlign: 'right', // Not working? CSS style seems applied in DOM, Text() might be better as child span element
    })
    introText.container('side-text-group');
    introText.createEntity();

    /*
    let iframeControlText = game.make().Text().text('Examples load in a Mantra UI IFrame(). Click on the code to copy it.');
    iframeControlText.position(800, 490);
    iframeControlText.width(600);
    iframeControlText.color('white');
    iframeControlText.style({
      fontSize: '32px',
    })
    // iframeControlText.container('side-text-group');
    iframeControlText.createEntity();
    */

    function createMonacoEditor() {
      let codeEditor = game.getEntityByName('code-editor');
      // Creates a Monaco Editor on top of the <code> element
      // using the same source code and position / dimensions

      // monaco a second to get ready
      let monacoEditor = game.make()
        .Monaco({
          code: codeEditor.meta.code
        })
        .height(700)
        .width(660)
        .x(codeEditor.position.x)
        .y(codeEditor.position.y)
        .z(32)
        .createEntity();

      // restore cursor from wait to default
      document.body.style.cursor = 'default';

      game.updateEntity(evalRunButton.id, {
        style: {
          display: 'block'
        }
      });

      /*
      // hides the codeEditor
      game.updateEntity(codeEditor.id, {
        style: {
          display: 'none'
        }
      });
      */

    }

    function openMonaco() {
      // set the cursor to wait
      document.body.style.cursor = 'wait';

      // hide the open monaco button
      game.updateEntity(openMonacoButton.id, {
        style: {
          display: 'none'
        }
      });

      if (!game.systems.monaco) {
        alert("LAYZ LOAD")
        game.use('Monaco', {}, () => {
          createMonacoEditor(game);
        });
      } else {
        createMonacoEditor(game);
      }

    }


    //let entities = text2Entities(text);

    // TODO: remove createContainer, upgrade to Container() plugin instead
    let container = game.createContainer({
      name: 'container-a',
      layout: 'grid', // optional. can also be "flex" or "none"
      color: 0xff00ff,
      position: {
        x: 170,
        y: 450,
        z: -1
      },
      body: false,
      size: {
        width: 1960,
        height: 400
      },
      grid: {
        columns: 7,
        rows: 3
      },
      style: { // supports CSS property names
        //padding: 0,
        margin: 0,
        paddingLeft: 0,
        paddingTop: 0,
        // background: '#ff0000', // can also use Entity.color
        border: {
          color: '#000000',
          width: 0
        }
      },
    });

    let currentUrl = null;

    /*
    categories = categories.filter(function(cat) {
      let allowed = ['entity', 'items', 'terrain', 'ui', 'collision', 'camera', 'behaviors'];
      return allowed.includes(cat.name);
    })
    */

    let primaryGameEmbed = game.make()
      .Iframe({ src: 'https://yantra.gg/mantra/examples/demo?source=games/gravity-gardens' })
      .width(800)
      .height(600)
      .x(0)
      .y(-100)
      .createEntity();

    let evalEmbed = game.make()
      .Iframe({ src: 'https://yantra.gg/mantra/eval' })
      // .Iframe({ src: 'http://192.168.1.80:7777/eval.html' })
      .name('eval-embed')
      .width(800)
      .height(600)
      .x(primaryGameEmbed.position.x)
      .y(primaryGameEmbed.position.y)
      .style({
        display: 'none'
      })
      .createEntity();

    // Creates a <code> element with the given source
    // Allows for remote code sources
    let codeEditor = game.make()
      .Code({
        //  code: 'hello <h1>'
        // src: 'https://yantra.gg/mantra/examples/items/boomerang.js'
        src: 'http://192.168.1.80:8888/items/boomerang.js'
      })
      .name('code-editor')
      .pointerdown(async function (context, event) {
        // openMonaco();
      })
      .height(700)
      .width(660)
      .x(800)
      .y(-170)
      .z(33)
      .createEntity();


    // TODO: use EntityBuilder.origin() property ( WIP )
    let origin = {     // top-right origin
      x: codeEditor.position.x - codeEditor.size.width / 2,
      y: codeEditor.position.y + codeEditor.size.height / 2
    };

    origin.x += 100;
    origin.y += 22;

    game.on('iframeMessage', function (event) {
      console.log('iframeMessage', event)
      game.flashText(event.data.message)
    });

    /*
    let openMonacoButton = game.make()
      .Button({ text: 'Open Monaco Editor' })
      .width(200)
      .height(40)
      .position(origin.x, origin.y, 33)
      .pointerdown(function (context, event) {
        openMonaco();
      })
      .createEntity();
      */

    let evalRunButton = game.make()
      .Button({ text: 'Run Code' })
      .width(200)
      .height(40)
      .position(origin.x, origin.y, 32)
      .pointerdown(function (context, event) {

        // Get the <iframe> element reference
        let evalEmbed = game.getEntityByName('eval-embed');
        let graphic = evalEmbed.graphics['graphics-css'];
        let evalIframe = graphic.querySelectorAll('iframe')[0];


        // sets the evalRunButton to disabled
        /*
        game.updateEntity(evalRunButton.id, {
          style: {
            display: 'none'
          }
        });
        */

        // hides the primaryGameEmbed
        game.updateEntity(evalEmbed.id, {
          style: {
            display: 'block'
          }
        });

        // Get the <code> from the code editor
        let codeEditor = game.getEntityByName('code-editor');
        let graphic2 = codeEditor.graphics['graphics-css'];
        let textarea = graphic2.querySelectorAll('textarea')[0];
        let source;

        source = textarea.value;
        // Add a one-time event listener for the iframe's load event
        evalIframe.onload = function () {
          // Send the code to the iframe
          console.log('onload', source)
          // alert('post message')
          evalIframe.contentWindow.postMessage({
            code: source
          }, '*'); // Consider specifying the iframe's origin instead of '*'
        }

        // Reload the evalIframe from it's src to clear state
        evalIframe.src = evalIframe.src;

        // hides the primaryGameEmbed
        game.updateEntity(primaryGameEmbed.id, {
          meta: {
            src: null
          },
          style: {
            display: 'none'
          }
        });
        primaryGameEmbed.src = null;

      })
      .createEntity();


    let player = game.make().Player();
    player.position(evalRunButton.position.x + 85, evalRunButton.position.y + 22, 0).z(64);
    player.createEntity();

    let hexapods = game.make().Hexapod().position(-800, -800).repeat(6).createEntity();

    // Function to create a dropdown select with given options and append it to a specified container
    function createDropdown(primaryGameEmbed, options, containerId, dropdownTitle) {

      let optionsFormatted = options.map(item => ({
        label: item.title.replace('<br/>', ''), // <-- legacy examples API can remove soon
        value: exampleRoot + '/demo.html?source=' + item.url.replace('.html', '') // Concatenate the root path with the example URL
      }));

      // first options is the label
      optionsFormatted.unshift({
        label: dropdownTitle + '...',
        value: ''
      });
      // Create the select dropdown
      let dropdownSelect = game.make().Select({
        options: optionsFormatted,
        title: dropdownTitle // Optional: Use title for labeling or categorizing the dropdown
      }).container(containerId);

      // Function to handle after an option is selected and update the entity accordingly
      // TODO: add EntityBuilder.onchange event
      dropdownSelect.afterUpdateEntity(function (context, event) {

        if (!context || typeof context.value === 'undefined') {
          return;
        }

        if (currentUrl === context.value) return;
        console.log('afterUpdateEntity', primaryGameEmbed, context.value, event);

        if (typeof primaryGameEmbed === 'undefined') {
          return;
        }

        //
        // Set all the other dropdowns to the first option
        //

        //
        // Since the Playground is built using CSSGraphics, we can use the DOM to reset the dropdowns
        // This wouldn't be considered "best practice", however it will work fine for now until we have
        // implemented non-bubbling onchange event handling in the ECS with tests
        let currentSelect = context.graphics['graphics-css'].querySelectorAll('select')[0];
        let selectElements = document.querySelectorAll('select');
        selectElements.forEach(select => {
          if (select !== currentSelect) {
            select.value = '';
          }
        });

        // Remark: In order to do this through the ECS, we'd have to implement a non-bubbling update event,
        // tests would need to be written first, this type of update action is self-ref and cascade.
        // we also would be much better off using `onchange` event support instead of `afterUpdateEntity` for this
        /*
        let dropdowns = game.getEntitiesByType('SELECT');
        dropdowns.forEach(dropdown => {
          game.updateEntity(dropdown.id, {
            value: ''
          });
        });
        */


        //
        // Updates the IFrame src to the selected example
        //
        game.updateEntity(primaryGameEmbed.id, {
          meta: {
            src: context.value
          }
        });
        //
        // Updates the Code src to the selected example
        //
        let sourceLink = context.value.replace('demo.html?source=', '') + '.js';
        console.log('sourceLink', sourceLink)
        // alert(sourceLink)
        game.updateEntity(codeEditor.id, {
          meta: {
            src: sourceLink
          }
        });

        // hides the evalEmbed

        // hides the primaryGameEmbed
        game.updateEntity(evalEmbed.id, {
          style: {
            display: 'none'
          }
        });

        // show the primaryGameEmbed
        game.updateEntity(primaryGameEmbed.id, {
          style: {
            display: 'block'
          }
        });


      });

      // Set style and dimensions for the dropdown
      dropdownSelect.width(230).height(80).style({
        fontSize: '32px',
        backgroundColor: categories.find(cat => cat.title === dropdownTitle)?.color || '#e0e0e0' // Use category color if available
      }).createEntity();
    }
    categories.forEach(category => {
      // Filter examples based on whether 'example.category' is an array or a string
      let categoryExamples = examples.filter(example => {
        if (Array.isArray(example.category)) {
          // If 'example.category' is an array, check if it includes the current 'category.name'
          return example.category.includes(category.name);
        } else {
          // If 'example.category' is a string, perform direct comparison
          return example.category === category.name;
        }
      });

      // Create a dropdown for the current category with its examples
      createDropdown(primaryGameEmbed, categoryExamples, 'container-a', category.title); // Assume 'container-a' exists or is dynamically created for each category
    });


    // let addSceneButton = game.make().Button({ text: 'Load Example as Scene', disabled: true }).width(250).position(650, 500).createEntity();
    // let deployToYantraButton = game.make().Button({ text: 'Deploy to Yantra.gg' }).width(200).position(900, 500).createEntity();
    // let copyCodeButton = game.make().Button({ text: 'Copy Code' }).width(200).position(1000, 500).createEntity();
    /*

    let gravitySlider = game.make().Range().width(100).position(-540, -400, 0).createEntity();

    let docsEmbed = game.make().width(800 * 2).height(600 * 2);
    docsEmbed.Iframe({ src: 'https://yantra.gg/mantra/examples/entity' })
    docsEmbed.x(100).y(800);
    docsEmbed.createEntity();

    let codeEmbed = game.make().width(800 * 2).height(600 * 2);
    codeEmbed.Iframe({ src: 'https://yantra.gg/mantra/examples' })
    codeEmbed.x(1200).y(800);
    codeEmbed.createEntity();
    */

    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;

    // Width-based zoom calculation
    let zoomRatioWidth = 0.5 / game.width; // Derived ratio for width
    let baseWidth = game.width;
    let baseZoomWidth = 0.5;
    let zoomWidth = baseZoomWidth + (screenWidth - baseWidth) * zoomRatioWidth;

    // Height-based zoom calculation (assuming similar ratios and base values for height)
    let zoomRatioHeight = 0.5 / game.height; // You might need to adjust this based on your game's height scaling
    let baseHeight = game.height; // Adjust this base height as per your requirements
    let baseZoomHeight = 0.5;
    let zoomHeight = baseZoomHeight + (screenHeight - baseHeight) * zoomRatioHeight;

    // Choose the smaller zoom level to ensure content fits both width and height
    let zoom = Math.min(zoomWidth, zoomHeight);

    // Clamp the zoom level between 0.4 and 1
    zoom = Math.max(0.4, Math.min(zoom, 1));


    let text_dragToMoveMap = game.make().Text().text('Drag to move map');
    text_dragToMoveMap.x(200);
    text_dragToMoveMap.y(220);
    text_dragToMoveMap.width(600);
    text_dragToMoveMap.color('white');
    text_dragToMoveMap.style({
      fontSize: '24px',
    })
    text_dragToMoveMap.createEntity();

    let text_wheelToZoom = game.make().Text().text('Wheel to Zoom');
    text_wheelToZoom.x(0);
    text_wheelToZoom.y(220);
    text_wheelToZoom.width(600);
    text_wheelToZoom.color('white');
    text_wheelToZoom.style({
      fontSize: '24px',
    })
    text_wheelToZoom.createEntity();

    let text_clickToInteract = game.make().Text().text('Click to interact');
    text_clickToInteract.x(220);
    text_clickToInteract.y(220);
    text_clickToInteract.width(170);
    //text_clickToInteract.height(40);
    text_clickToInteract.color('white');
    text_clickToInteract.style({
      fontSize: '24px',
      cursor: 'pointer'
    })
    text_clickToInteract.pointerdown(function (context, event) {

      // game.rotate(context.id, 0.1);
      game.shakeCamera({});

    });
    text_clickToInteract.createEntity();

    game.setZoom(zoom);

    // TODO code responsive layout for mobile
    /*
    if (screenWidth < 400) {
      // move the code editor to same x as embed
      // move embed up
      game.updateEntity(codeEditor.id, {
        x: primaryGameEmbed.position.x,
        y: primaryGameEmbed.position.y - 800
      })
    }
    */


  }



}



function text2Entities(text) {
  let entities = [];
  let lines = text.split('');
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    let x = 0 + i * 32;
    let y = -200;
    let entity = game.make().Text({ text: line }).x(x).y(y).body(true).createEntity();
    entities.push(entity);
  }
  return entities;
}