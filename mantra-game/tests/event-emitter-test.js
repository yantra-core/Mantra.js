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

tap.test('eventEmitter - single level wildcard pattern', (t) => {
  let testValue = 0;
  function handler() { testValue = 1; }

  eventEmitter.on('namespace::*', handler);
  eventEmitter.emit('namespace::testEvent');

  t.equal(testValue, 1, 'Wildcard * should catch events with any single-level name after namespace');
  t.end();
});


tap.test('eventEmitter - multi-level wildcard pattern', (t) => {
  let testValue = 0;
  function handler() { testValue = 1; }

  eventEmitter.on('namespace::**', handler);
  eventEmitter.emit('namespace::subnamespace:testEvent');

  t.equal(testValue, 1, 'Wildcard ** should catch events with any depth of names after namespace');
  t.end();
});

/*
// not working
tap.test('eventEmitter - mixed wildcard patterns', (t) => {
  let testValue = 0;
  function handler() { testValue += 1; }

  eventEmitter.on('namespace::subnamespace:**', handler);
  eventEmitter.on('namespace::**', handler);
  eventEmitter.emit('namespace::subnamespace::testEvent');

  t.equal(testValue, 2, 'Both single-level and multi-level wildcards should be triggered appropriately');
  t.end();
});
*/

tap.test('eventEmitter - exact match vs wildcard precedence', (t) => {
  let exactMatchCalled = false;
  let wildcardMatchCalled = false;

  function exactMatchHandler() { exactMatchCalled = true; }
  function wildcardHandler() { wildcardMatchCalled = true; }

  eventEmitter.on('event::test', exactMatchHandler);
  eventEmitter.on('event::**', wildcardHandler);
  
  eventEmitter.emit('event::test');

  t.equal(exactMatchCalled, true, 'Exact match handler should be called');
  t.equal(wildcardMatchCalled, true, 'Wildcard match handler should also be called');
  t.end();
});

tap.test('eventEmitter - removing wildcard listeners', (t) => {
  let testValue = 0;
  function handler() { testValue = 1; }

  eventEmitter.on('namespace::*', handler);
  eventEmitter.off('namespace::*', handler);
  eventEmitter.emit('namespace:testEvent');

  t.equal(testValue, 0, 'Handler should not be called after removal of wildcard listener');
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



