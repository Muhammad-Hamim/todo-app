# React + TypeScript + Vite + Redux

This template provides a setup for React with Vite, TypeScript, and Redux integration.

## Official Vite Plugins

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Redux Setup Guide

### Step 1: Installation

Install the required dependencies:

```bash
npm install @reduxjs/toolkit react-redux
# or
yarn add @reduxjs/toolkit react-redux
```

### Step 2: Folder Structure

```
src/
├── redux/
│   ├── store.ts
│   └── features/
│       ├── counterSlice.ts
│       ├── userSlice.ts
│       └── ...
├── components/
└── ...
```

### Step 3: Store Configuration

Create `src/redux/store.ts`:

```typescript
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### Step 4: Creating Slices

Example slice in `src/redux/features/counterSlice.ts`:

```typescript
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
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
export default counterSlice.reducer;
```

### Step 5: Provider Setup

In `src/main.tsx`:

```typescript
import { Provider } from "react-redux";
import { store } from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

### Step 6: Using Redux in Components

```typescript
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { increment, decrement } from "../redux/features/counterSlice";

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
}
```

## ESLint Configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

```js
export default tseslint.config({
  languageOptions: {
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

For React ESLint configuration:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  settings: { react: { version: "18.3" } },
  plugins: {
    react,
  },
  rules: {
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

## Redux Best Practices

1. Keep reducers pure and simple
2. Use TypeScript for better type safety
3. Split large state into multiple slices
4. Use Redux DevTools for debugging
5. Follow Redux Toolkit conventions

## Additional Tips

- Use Redux only for global state
- Local component state can still use useState
- Consider using RTK Query for API calls
- Implement proper error handling
- Test your reducers and selectors

## How Redux Flow Works

1. Store holds the global state
2. Components access state using `useSelector`
3. Components dispatch actions using `useDispatch`
4. Reducers process actions and update state
5. Components re-render when their selected state changes

Example Flow:

1. User clicks "+" button
2. Component dispatches `increment()` action
3. Counter reducer processes the action
4. State is updated (count increases)
5. Component re-renders with new count
