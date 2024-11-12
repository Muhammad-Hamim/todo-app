
import CodeBlock from '../components/CodeBlock';

const GuidelinePage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <header className="text-center mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">
          Redux Setup Guidelines
        </h1>
        <p className="text-gray-600">
          Complete guide to implement Redux in React + TypeScript + Vite project
        </p>
      </header>

      {/* Navigation */}
      <nav className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Navigation</h2>
        <ul className="space-y-2">
          {['Installation', 'Folder Structure', 'Store Setup', 'Creating Slices', 'Provider Setup', 'Usage in Components', 'Currying in JavaScript', 'Best Practices'].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <main className="space-y-12">
        {/* Installation */}
        <section id="installation" className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-gray-200">
            1. Installation
          </h2>
          <CodeBlock>
            {`npm install @reduxjs/toolkit react-redux
# or
yarn add @reduxjs/toolkit react-redux`}
          </CodeBlock>
        </section>

        {/* Folder Structure */}
        <section id="folder-structure" className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-gray-200">
            2. Folder Structure
          </h2>
          <CodeBlock>
            {`src/
├── redux/
│   ├── store.ts
│   └── features/
│       ├── counterSlice.ts
│       ├── userSlice.ts
│       └── ...
├── components/
└── ...`}
          </CodeBlock>
        </section>

        {/* Store Setup */}
        <section id="store-setup" className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-gray-200">
            3. Store Configuration
          </h2>
          <p className="text-gray-600 mb-4">Create store.ts in your redux folder:</p>
          <CodeBlock fileName="src/redux/store.ts">
            {`import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;`}
          </CodeBlock>
        </section>

        {/* Creating Slices */}
        <section id="creating-slices" className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-gray-200">
            4. Creating Slices
          </h2>
          <CodeBlock fileName="src/redux/features/counterSlice.ts">
            {`import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;`}
          </CodeBlock>
        </section>

        {/* Provider Setup */}
        <section id="provider-setup" className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-gray-200">
            5. Provider Setup
          </h2>
          <CodeBlock fileName="src/main.tsx">
            {`import { Provider } from 'react-redux';
import { store } from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);`}
          </CodeBlock>
        </section>

        {/* Usage in Components */}
        <section id="usage-in-components" className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-gray-200">
            6. Using in Components
          </h2>
          <CodeBlock>
            {`import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { increment, decrement } from '../redux/features/counterSlice';

function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(decrement())}>-</button>
      <span>{count}</span>
      <button onClick={() => dispatch(increment())}>+</button>
    </div>
  );
}`}
          </CodeBlock>
        </section>

        {/* Currying in JavaScript */}
        <section id="currying" className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-gray-200">
            Understanding Currying in JavaScript
          </h2>
          
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-4">
              Currying is a functional programming technique that transforms a function with multiple arguments into a sequence of functions, each taking a single argument. This is particularly useful in Redux for creating reusable action creators and middleware.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Why is Currying Important?</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
              <li>Enables partial application of function arguments</li>
              <li>Improves code reusability and modularity</li>
              <li>Makes code more flexible and composable</li>
              <li>Common in Redux middleware and higher-order functions</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Examples of Currying</h3>
          </div>

          <CodeBlock>
            {`// Regular function
const multiply = (a, b) => a * b;

// Curried version
const curriedMultiply = (a) => (b) => a * b;

// Usage
console.log(multiply(2, 3));        // Output: 6
console.log(curriedMultiply(2)(3)); // Output: 6

// Practical example with Redux middleware
const logger = (store) => (next) => (action) => {
  console.log('Dispatching:', action);
  const result = next(action);
  console.log('Next State:', store.getState());
  return result;
};

// Real-world example: Creating parameterized action creators
const updateEntity = (entityType) => (id) => (data) => ({
  type: \`UPDATE_\${entityType.toUpperCase()}\`,
  payload: {
    id,
    data
  }
});

// Usage
const updateUser = updateEntity('user');
const updateUserById = updateUser(123);
dispatch(updateUserById({ name: 'John' }));`}
          </CodeBlock>

          <div className="prose max-w-none mt-6">
            <h3 className="text-xl font-semibold mb-3">Benefits in Redux</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                <strong>Middleware Creation:</strong> Redux middleware is inherently curried, allowing for flexible composition of middleware functions
              </li>
              <li>
                <strong>Action Creators:</strong> Create families of related action creators with shared behavior
              </li>
              <li>
                <strong>Selector Functions:</strong> Build reusable, parameterized selectors for state access
              </li>
              <li>
                <strong>Higher-Order Reducers:</strong> Create configurable reducer factories
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mt-6">
            <h4 className="text-lg font-semibold text-blue-700 mb-2">Pro Tip</h4>
            <p className="text-gray-700">
              When using currying in Redux, consider using TypeScript to ensure type safety across your curried functions. This is especially important when creating reusable action creators or middleware.
            </p>
          </div>
        </section>

        {/* Best Practices */}
        <section id="best-practices" className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-gray-200">
            Best Practices
          </h2>
          <ul className="space-y-3">
            {[
              'Keep reducers pure and simple',
              'Use TypeScript for better type safety',
              'Split large state into multiple slices',
              'Use Redux DevTools for debugging',
              'Follow Redux Toolkit conventions'
            ].map((practice) => (
              <li key={practice} className="flex items-center space-x-2">
                <span className="text-blue-500">•</span>
                <span className="text-gray-700">{practice}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default GuidelinePage; 