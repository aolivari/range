# Range Component Project

A custom, interactive range slider component built with Next.js, TypeScript, and Jest. This project features a dual-mode range selector (Normal and Fixed) with precise drag-and-drop mechanics and input validation.

## 🚀 Live Demo

The project is live at: [https://range-eta.vercel.app](https://range-eta.vercel.app)

## 🛠️ Features

- **Dual Mode**: 
  - `Normal`: Allows free numeric input within min/max boundaries.
  - `Fixed`: Restricts values to a predefined list of options.
- **Interactive UI**: Smooth drag-and-drop handles with collision detection.
- **Currency Support**: Built-in support for currency formatting and symbols.
- **Modular Architecture**: Clean separation between logic (hooks) and presentation (components).
- **Fully Documented**: JSDoc comments with examples for better IntelliSense support in VS Code.
- **Tested**: Comprehensive test suite for both units and integration.

## 🏗️ Architecture

The UI is divided into three main components:

1. **`Range`**: The main container that manages state and orchestration using the `useRange` hook.
2. **`Slider`**: A presentation component for the visual track and handles.
3. **`CurrencyInput`**: A specialized numeric input for entering precise values.

## 📦 Installation

First, clone the repository and install the dependencies:

```bash
npm install
```

## 💻 Usage

### Normal Mode
```tsx
import Range from "@/ui/Range";

<Range 
  type="normal" 
  min={0} 
  max={100} 
  onChange={(min, max) => console.log(min, max)} 
/>
```

### Fixed Mode
```tsx
<Range 
  type="fixed" 
  options={[1.99, 5.99, 10.99, 50.00]} 
  onChange={(min, max) => console.log(min, max)} 
/>
```

## 🧪 Testing

The project uses Jest and React Testing Library. We have separated tests into unit tests for presentation components and integration tests for logic.

To run the test suite:

```bash
npm test
```

## 🛠️ Development

To run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:8080`.

## 🏗️ Production

To build the application for production:

```bash
npm run build
```
