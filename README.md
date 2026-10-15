# Dev Stack

Dev Stack is a responsive technology explorer that helps developers compare popular tools and assemble a practical project stack. The interface follows a clean orange-to-pink-to-violet visual language inspired by the supplied design.

## Built with

- React and Vite
- CSS with responsive grid and flex layouts
- React Toastify for friendly interaction messages
- Lucide React icons
- JSON technology data loaded with `fetch`

## Highlights

- Explore 12 curated frontend, backend, database, language, styling, DevOps, and tool options.
- Add technologies to a personal stack, remove individual choices, or clear the stack in one action.
- Use the site comfortably on desktop, tablet, or mobile with a sticky responsive navigation bar.

## Getting started

```bash
npm install
npm run dev
```

Run `npm run build` to create a production build.

## React questions

### What is JSX, and why is it used in React?
JSX is a syntax that lets us describe UI with HTML-like code inside JavaScript. It makes component layouts easier to read and write.

### What is the difference between props and state?
Props are values passed into a component by its parent. State belongs to a component and can change during use.

### What does the `useState` hook do, and where did you use it in this project?
`useState` stores values that can update the screen. I used it for the selected stack, loaded technology data, loading status, and mobile menu.

### What does the `useEffect` hook do, and why did you need it to load the JSON data?
`useEffect` runs side effects after rendering. It fetches the JSON file once when the app loads, then saves the result to state.

### Why does every item in a `.map()` list need a unique `key` prop?
Keys let React identify each item correctly when the list changes, so it can update only what is needed.

### What is conditional rendering? Show one place you used it.
Conditional rendering shows different UI based on a condition. The stack panel shows an empty message when no technology has been selected and shows stack items otherwise.

### How do you pass data from a parent component to a child component, and how does a child send something back to the parent?
The parent passes data and functions through props. A child calls a function prop, such as `onAdd`, to notify the parent about an action.
