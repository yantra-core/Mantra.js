import tap from 'tap';
import Component from '../Component/Component.js';  // Update the import path as necessary

// Test for creation of a Component instance
tap.test('Component creation', async t => {
  const component = new Component('testComponent');
  t.equal(component.name, 'testComponent', 'Component should be initialized with the correct name');
});

// Test setting and getting simple values
tap.test('Simple set and get', async t => {
  const component = new Component('testComponent');
  component.set('key1', 'value1');
  t.equal(component.get('key1'), 'value1', 'Should retrieve the correct value for a simple key');
});

// Test setting and getting nested values
tap.test('Nested set and get', async t => {
  const component = new Component('testComponent');
  component.set(['entity1', 'systemA'], { x: 100, y: 200 });
  t.same(component.get(['entity1', 'systemA']), { x: 100, y: 200 }, 'Should retrieve the correct value for nested keys');
});

// Test removing simple and nested values
tap.test('Remove values', async t => {
  const component = new Component('testComponent');

  // Test removing a simple key
  component.set('key1', 'value1');
  component.remove('key1');
  t.notOk(component.get('key1'), 'Should return null for removed simple key');

  // Test removing a nested key
  component.set(['entity1', 'systemA'], { x: 100, y: 200 });
  component.remove(['entity1', 'systemA']);
  t.notOk(component.get(['entity1', 'systemA']), 'Should return null for removed nested key');
});