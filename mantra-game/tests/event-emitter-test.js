import tap from 'tape';
import eventEmitter from '../lib/eventEmitter.js';
import test from 'tape';

tap.test('eventEmitter - on and emit', (t) => {
  let testValue = 0;
  function testHandler(data) {
    testValue = data;
  }

  eventEmitter.on('testEvent', testHandler);
  eventEmitter.emit('testEvent', 1);

  t.equal(testValue, 1, 'Handler should set testValue to 1');
  t.end();
});

tap.test('eventEmitter - off', (t) => {
  let testValue = 0;
  function testHandler(data) {
    testValue = data;
  }

  eventEmitter.on('testEvent', testHandler);
  eventEmitter.off('testEvent', testHandler);
  eventEmitter.emit('testEvent', 2);

  t.equal(testValue, 0, 'testValue should remain 0 after handler is removed');
  t.end();
});

tap.test('eventEmitter - listenerCount', (t) => {
  // Reset the eventEmitter's listeners for a clean start
  eventEmitter.listeners = {};

  function dummyHandler1() {}
  function dummyHandler2() {}

  // No listeners added yet
  t.equal(eventEmitter.listenerCount('testEvent'), 0, 'Should return 0 when no listeners are added');

  // Add a listener
  eventEmitter.on('testEvent', dummyHandler1);
  t.equal(eventEmitter.listenerCount('testEvent'), 1, 'Should return 1 after adding one listener');

  // Add another listener
  eventEmitter.on('testEvent', dummyHandler2);
  t.equal(eventEmitter.listenerCount('testEvent'), 2, 'Should return 2 after adding two listeners');

  // Remove a listener
  eventEmitter.off('testEvent', dummyHandler1);
  t.equal(eventEmitter.listenerCount('testEvent'), 1, 'Should return 1 after removing one listener');

  t.end();
});

tap.test('eventEmitter - once handler', (t) => {
  let testValue = 0;
  function testHandler() {
    testValue += 1;
  }

  // Reset the eventEmitter's listeners for a clean start
  eventEmitter.listeners = {};

  // Add the handler with 'once'
  eventEmitter.once('testEvent', testHandler);

  // Emit 'testEvent' twice
  eventEmitter.emit('testEvent');
  eventEmitter.emit('testEvent');

  // testValue should only have been incremented once
  t.equal(testValue, 1, 'Handler should have been called only once');
  t.end();
});

tap.test('eventEmitter - multiple handlers', (t) => {
  let accumulator = 0;
  function handlerOne() { accumulator += 1; }
  function handlerTwo() { accumulator += 2; }

  eventEmitter.on('testEvent', handlerOne);
  eventEmitter.on('testEvent', handlerTwo);
  eventEmitter.emit('testEvent');

  t.equal(accumulator, 3, 'accumulator should sum up values from both handlers');
  t.end();
});

// TODO: fix this test, EE.bindClass() needs refactor in EE to support this  API without performance penalty
/*
tap.test('eventEmitter - bindClass and emit', (t) => {
  class TestClass {
    constructor() {
      this.value = 0;
    }

    increment(data) {
      this.value += data;
    }
  }

  const testInstance = new TestClass();
  eventEmitter.bindClass(testInstance, 'test');

  eventEmitter.emit('test::increment', 3);
  
  t.equal(testInstance.value, 3, 'TestClass instance value should be incremented to 3');
  t.end();
});
*/

tap.test('eventEmitter - unbindClass', (t) => {
  class TestClass {
    constructor() {
      this.value = 0;
    }

    increment(data) {
      this.value += data;
    }
  }

  const testInstance = new TestClass();
  eventEmitter.bindClass(testInstance, 'test');
  eventEmitter.unbindClass(testInstance, 'test');

  eventEmitter.emit('test.increment', 3);

  t.equal(testInstance.value, 0, 'TestClass instance value should remain 0 after unbinding');
  t.end();
});

tap.test('eventEmitter - emit with no listeners', (t) => {
  t.doesNotThrow(() => {
    eventEmitter.emit('nonExistentEvent', {});
  }, 'Emitting an event with no listeners should not throw');
  
  t.end();
});

tap.test('eventEmitter - namespace-like event patterns', (t) => {
  let testValue = 0;
  function handler() { testValue = 1; }

  eventEmitter.on('namespace::event', handler);
  eventEmitter.emit('namespace::event');

  t.equal(testValue, 1, 'Handler should be called for namespace-like event patterns');
  t.end();
});


tap.test('eventEmitter - edge cases', (t) => {
  t.doesNotThrow(() => {
    eventEmitter.on('', () => {});
    eventEmitter.emit('');
  }, 'Empty event names should be handled without throwing');

  t.doesNotThrow(() => {
    eventEmitter.on('**', () => {});
    eventEmitter.emit('anything');
  }, 'Wildcard-only patterns should be handled without throwing');

  t.end();
});

tap.test('eventEmitter - bindClass method should emit events with JSON data', (t) => {
  class TestClass {
    constructor() {
      this.data = {};
    }

    update(data) {
      this.data = { ...this.data, ...data };
    }
  }

  const testInstance = new TestClass();
  eventEmitter.bindClass(testInstance, 'test');

  // The JSON object to be used as test data
  const testData = { amount: 5, description: 'test increment' };

  // Set up a listener for the event that should be emitted by the update method
  let listenerCalled = false;
  let receivedData = null;
  eventEmitter.on('test::update', (data) => {
    listenerCalled = true;
    receivedData = data;
  });

  // Call the class method which should trigger an event emission
  testInstance.update(testData);

  // Check if the listener was called
  t.ok(listenerCalled, 'listener should be called when class method is invoked');

  // Check if the listener was called with the correct data
  t.deepEqual(receivedData, testData, 'listener should be called with correct data');

  // Assert one of the properties of the JSON object
  t.equal(receivedData.description, testData.description, 'listener data should have correct description property');

  // Clean up the listener
  eventEmitter.off('test::update', receivedData);

  t.end();
});

tap.test('eventEmitter - error handling in event handlers', (t) => {
  let testValue = 0;
  function handlerOne() {
    throw new Error('IGNORE THIS ERROR IS TEST');
  }
  function handlerTwo() {
    testValue = 1;
  }

  eventEmitter.on('testErrorEvent', handlerOne);
  eventEmitter.on('testErrorEvent', handlerTwo);

  t.doesNotThrow(() => {
    eventEmitter.emit('testErrorEvent');
  }, 'Emitting an event with an error-throwing handler should not throw');

  t.equal(testValue, 1, 'The second handler should still execute even if the first one throws an error');
  eventEmitter.off('testErrorEvent', handlerOne);
  eventEmitter.off('testErrorEvent', handlerTwo);
  t.end();
});

tap.test('eventEmitter - order of multiple handlers for the same event', (t) => {
  let accumulator = '';
  function handlerOne() { accumulator += 'A'; }
  function handlerTwo() { accumulator += 'B'; }

  eventEmitter.on('testOrderEvent', handlerOne);
  eventEmitter.on('testOrderEvent', handlerTwo);

  eventEmitter.emit('testOrderEvent');

  t.equal(accumulator, 'AB', 'Handlers should be called in the order they were added');
  eventEmitter.off('testOrderEvent', handlerOne);
  eventEmitter.off('testOrderEvent', handlerTwo);
  t.end();
});


tap.test('eventEmitter - context binding in event handlers', (t) => {
  const contextObject = {
    value: 10,
    handler() {
      this.value += 5;
    }
  };

  eventEmitter.on('testContextEvent', contextObject.handler.bind(contextObject));

  eventEmitter.emit('testContextEvent');

  t.equal(contextObject.value, 15, 'The handler should be bound to the correct context and modify the contextObject value');
  eventEmitter.off('testContextEvent', contextObject.handler);
  t.end();
});
