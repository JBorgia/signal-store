import { WritableSignal, signal } from '@angular/core';
import { signalStore } from './signal-store';

// Define your types
type Nested3 = {
  deeplyNested: boolean;
  deeplyNestedArray: number[];
  deeplyNestedUndefinedStringTyped: string;
  deeplyNestedStringOrUndefined: string | undefined | unknown;
  deeplyNestedUndefined: undefined;
};

type MyType = {
  prop1: number;
  prop2: {
    nested1: string;
    nested2: {
      deeplyNested: boolean;
      deeplyNestedArray: string[];
      nested3: Nested3 & { deeplyNested3: Nested3 };
      nestedSignal4: WritableSignal<{
        deeplyNested: boolean;
        deeplyNestedArray: number[];
        deeplyNestedUndefinedStringTyped: string;
        deeplyNestedUndefined?: string | undefined | unknown;
      }>;
      nestedSignal5: WritableSignal<number[]>;
    };
  };
};

// Initial state configuration
const storeConfigurationAndInititalizationObject: MyType = {
  prop1: 42,
  prop2: {
    nested1: 'hello',
    nested2: {
      deeplyNested: true,
      deeplyNestedArray: ['test'],
      nested3: {
        deeplyNested: true,
        deeplyNestedArray: [4, 5],
        deeplyNestedUndefinedStringTyped: undefined as unknown as string, // STRONG TYPE(string only): initial state is undefined, but it must be of type string afterward
        deeplyNestedStringOrUndefined: null as unknown | string, // WEAKER TYPE(unknown | string): initial state is undefined, but it can be undefined or string afterward
        deeplyNestedUndefined: undefined, // STRONG TYPE(undefined only): initial state is undefined, but it must be of type undefined afterward
        deeplyNested3: {
          deeplyNested: true,
          deeplyNestedArray: [7, 8],
          deeplyNestedUndefinedStringTyped: null as unknown as string, // STRONG TYPE(string only): initial state is undefined, but it must be of type string afterward
          deeplyNestedStringOrUndefined: undefined as unknown | string, // WEAKER TYPE(unknown | string): initial state is undefined, but it can be undefined or string afterward
          deeplyNestedUndefined: undefined // STRONG TYPE(undefined only): initial state is undefined, but it must be of type undefined afterward
        }
      },
      nestedSignal4: signal({
        deeplyNested: true,
        deeplyNestedArray: [4, 5],
        deeplyNestedUndefinedStringTyped: undefined as unknown as string, // STRONG TYPE(string only)
        deeplyNestedUndefined: undefined as unknown | string // WEAKER TYPE(unknown | string)
      }),
      nestedSignal5: signal([4, 5]) // Initial state as a signal
    }
  }
};

// Create the store
const store = signalStore(storeConfigurationAndInititalizationObject);

console.log('store', store);
store.prop2.nested2.nestedSignal4();

// Accessing values
const value1: number = store.prop1();
const value2: string = store.prop2.nested1();
const value3: boolean = store.prop2.nested2.deeplyNested();
const value4: string[] = store.prop2.nested2.deeplyNestedArray();
const value5: WritableSignal<number[] | undefined> | undefined =
  store.prop2.nested2.nested3.deeplyNestedArray;
const value6: {
  deeplyNested: boolean;
  deeplyNestedArray: number[];
  deeplyNestedUndefinedStringTyped: string;
  deeplyNestedUndefined?: string | unknown;
} = store.prop2.nested2.nestedSignal4();
const value7: number[] = store.prop2.nested2.nestedSignal5();

// Example 1: Updating a string value
store.prop2.nested1.update((val) => val + ' world'); // Updates 'hello' to 'hello world'

// Example 2: Updating a nested array value
store.prop2.nested2.deeplyNestedArray.update((arr) => [...arr, 'newItem']); // Adds 'newItem' to the deeplyNestedArray

// Example 3: Updating a WritableSignal directly
store.prop2.nested2.nestedSignal5.update((arr) => arr.map((x) => x * 2)); // Doubles each element in the array

// Example 4: Unwrapping part of the store
const unwrappedNested3: Partial<Nested3> =
  store.prop2.nested2.nested3.deeplyNested3.unwrap();
console.log(unwrappedNested3.deeplyNestedArray); // Output: [7, 8]

// Example 5: Handling undefined values in updates
store.prop2.nested2.nested3.deeplyNestedUndefinedStringTyped.update(
  () => 'New Value'
); // Updates with a new string value

// Example 6: Accessing nested signals
console.log(
  'store.prop2.nested2.nested3',
  store.prop2.nested2.nested3.unwrap()
);
store.prop2.nested2.nested3.update({
  deeplyNested: false,
  deeplyNestedArray: [1, 2, 3, 4],
  deeplyNestedUndefinedStringTyped: 'test1', // STRONG TYPE(string only): initial state is undefined, but it must be of type string afterward
  deeplyNestedStringOrUndefined: 'test2' // WEAKER TYPE(unknown | string): initial state is undefined, but it can be undefined or string afterward
});
console.log(
  'store.prop2.nested2.nested3',
  store.prop2.nested2.nested3.unwrap()
);

// Example 7: Accessing nested signals
const nestedSignalValue = store.prop2.nested2.nestedSignal4();
console.log(nestedSignalValue.deeplyNestedArray); // Output: [4, 5]

// Example 8: Using a terminal signal
const terminalSignal = signal({
  deeplyNested: false,
  deeplyNestedArray: [1, 2, 3]
});
const storeWithTerminal = signalStore({
  prop1: 0,
  prop2: {
    nested1: 'world',
    nested2: {
      deeplyNested: false,
      deeplyNestedArray: ['foo'],
      nested3: {},
      nestedSignal4: terminalSignal,
      nestedSignal5: signal([1, 2])
    }
  }
});
console.log(storeWithTerminal.prop2.nested2.nestedSignal4().deeplyNestedArray); // Output: [1, 2, 3]
