# Vite Product App

## Installation and Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate test coverage report
npm run test:coverage
```

Tests are written using Jest and React Testing Library. Each component has its own test file in a `__tests__` directory.

## Storybook

```bash
# Run Storybook development server
npm run storybook

# Build Storybook static files
npm run build-storybook
```

## Pages

### Login Page

-   Simple login form with username/password
-   Error handling for invalid credentials
-   Redirects to products page on success
-   Default credentials: username: `user`, password: `user123`

### Products Page

-   Displays grid of product cards
-   Each card shows:
    -   Auto-slide images on hover
    -   Product name
    -   Price
    -   Rating with stars
-   Click on any card navigates to product detail

### Product Detail Page

-   Navigation back to products
-   Image slider with hover navigation controls
-   Product information:
    -   Name, price, rating
    -   Arrival date
    -   Description
-   Tab system:
    -   Details tab with product information
    -   Comments tab with rating and comment functionality

## Routing

| Route           | Description     | Access    |
| --------------- | --------------- | --------- |
| `/login`        | Login page      | Public    |
| `/products`     | Product listing | Protected |
| `/products/:id` | Product detail  | Protected |

## Core Components

### Image Slider

Custom image slider component without external dependencies.

| Prop            | Type                                             | Default   | Description                                    |
| --------------- | ------------------------------------------------ | --------- | ---------------------------------------------- |
| images          | Image[]                                          | required  | Array of images to display                     |
| autoPlay        | boolean                                          | true      | Enable auto-sliding                            |
| circular        | boolean                                          | true      | Enable infinite scroll                         |
| navigationMode  | 'not-visible' \| 'visible' \| 'visible-on-hover' | 'visible' | Navigation controls display mode               |
| autoPlayOnHover | boolean                                          | false     | Enable auto-play only on hover                 |
| touchThreshold  | number                                           | 50        | Minimum swipe distance to trigger slide change |
| swipeSupported  | boolean                                          | true      | Enable touch/swipe support for mobile devices  |

Features:

-   Mouse navigation controls
-   Touch/swipe support for mobile devices
-   Auto-play with pause on hover
-   Circular navigation
-   Customizable navigation visibility
-   Supports mouse and touch events

### Rating

Star rating component with interactive capability.

| Prop        | Type                    | Default  | Description            |
| ----------- | ----------------------- | -------- | ---------------------- |
| value       | number                  | required | Current rating value   |
| max         | number                  | 5        | Maximum rating value   |
| interactive | boolean                 | false    | Allow user interaction |
| onChange    | (value: number) => void | -        | Rating change handler  |

### Star

Individual star component for rating display.

| Prop             | Type   | Description                                 |
| ---------------- | ------ | ------------------------------------------- |
| filledPercentage | number | Percentage of the star to be filled (0-100) |
| id               | string | Unique identifier for the star              |

### TabView

Tab interface component for organizing content.

| Prop              | Type                     | Description             |
| ----------------- | ------------------------ | ----------------------- |
| activeTabId       | string                   | Currently active tab ID |
| onActiveTabChange | (tabId: string) => void  | Tab change handler      |
| children          | ReactElement<TabProps>[] | Tab components          |

### Button

Versatile button component that supports various styles and layouts.

| Prop     | Type                                 | Default   | Description                      |
| -------- | ------------------------------------ | --------- | -------------------------------- |
| variant  | 'primary' \| 'secondary' \| 'danger' | 'primary' | Color variant                    |
| layout   | 'solid' \| 'outlined' \| 'plain'     | 'solid'   | Visual style                     |
| disabled | boolean                              | false     | Disable button                   |
| icon     | ReactNode                            | -         | Icon element                     |
| circle   | boolean                              | false     | Make button circular (icon-only) |

### TextInput

Basic text input component with consistent styling.

| Prop        | Type                                   | Default | Description      |
| ----------- | -------------------------------------- | ------- | ---------------- |
| type        | 'text' \| 'password' \| 'email' \| etc | 'text'  | Input type       |
| placeholder | string                                 | -       | Placeholder text |
| value       | string                                 | -       | Input value      |
| disabled    | boolean                                | false   | Disable input    |

### TextArea

Multi-line text input component.

| Prop        | Type    | Default | Description             |
| ----------- | ------- | ------- | ----------------------- |
| rows        | number  | -       | Number of visible lines |
| placeholder | string  | -       | Placeholder text        |
| value       | string  | -       | Textarea content        |
| disabled    | boolean | false   | Disable textarea        |

## Styling

### CSS Variables

| Property            | CSS Variable                   | Description                            |
| ------------------- | ------------------------------ | -------------------------------------- |
| Colors - Base       | `--color-white`                | Base white color.                      |
|                     | `--color-bg`                   | Background color.                      |
|                     | `--color-card-bg`              | Card background color.                 |
| Colors - Gray Scale | `--color-gray-100`             | Lightest gray color.                   |
|                     | `--color-gray-200`             | Light gray color.                      |
|                     | `--color-gray-300`             | Medium gray color.                     |
|                     | `--color-gray-400`             | Darker gray color.                     |
|                     | `--color-gray-700`             | Dark gray color.                       |
|                     | `--color-gray-800`             | Darker gray color.                     |
|                     | `--color-gray-900`             | Darkest gray color.                    |
| Colors - Primary    | `--color-primary-100`          | Light primary color.                   |
|                     | `--color-primary-200`          | Lighter primary color.                 |
|                     | `--color-primary`              | Main primary color.                    |
|                     | `--color-primary-hover`        | Primary color for hover states.        |
|                     | `--color-primary-light-active` | Primary color for light active states. |
|                     | `--color-primary-active`       | Primary color for active states.       |
| Colors - Secondary  | `--color-secondary-100`        | Light secondary color.                 |
|                     | `--color-secondary-200`        | Lighter secondary color.               |
|                     | `--color-secondary`            | Main secondary color.                  |
|                     | `--color-secondary-hover`      | Secondary color for hover states.      |
|                     | `--color-secondary-active`     | Secondary color for active states.     |
| Colors - Danger     | `--color-danger-100`           | Light danger color.                    |
|                     | `--color-danger-200`           | Lighter danger color.                  |
|                     | `--color-danger`               | Main danger color.                     |
|                     | `--color-danger-hover`         | Danger color for hover states.         |
|                     | `--color-danger-active`        | Danger color for active states.        |
| Colors - States     | `--color-disabled-bg`          | Background color for disabled state.   |
|                     | `--color-disabled-text`        | Text color for disabled state.         |
|                     | `--color-border`               | Default border color.                  |
|                     | `--color-focus-ring`           | Color for focus ring.                  |
|                     | `--color-input-bg`             | Background color for input fields.     |
|                     | `--color-input-text`           | Text color for input fields.           |
|                     | `--color-gold`                 | Gold color, used for ratings.          |
| Spacing             | `--spacing-xs`                 | Extra small spacing.                   |
|                     | `--spacing-sm`                 | Small spacing.                         |
|                     | `--spacing-md`                 | Medium spacing.                        |
|                     | `--spacing-lg`                 | Large spacing.                         |
|                     | `--spacing-xl`                 | Extra large spacing.                   |
| Border Radius       | `--border-radius-md`           | Medium border radius for elements.     |
|                     | `--border-radius-lg`           | Large border radius for elements.      |
| Typography          | `--font-size-xs`               | Extra small font size.                 |
|                     | `--font-size-sm`               | Small font size.                       |
|                     | `--font-size-md`               | Medium font size.                      |
|                     | `--font-size-lg`               | Large font size.                       |
|                     | `--font-size-xl`               | Extra large font size.                 |
|                     | `--font-weight-normal`         | Normal font weight.                    |
|                     | `--font-weight-medium`         | Medium font weight.                    |
|                     | `--font-weight-bold`           | Bold font weight.                      |
|                     | `--font-family`                | Default font family.                   |
| Components          | `--star-filled-color`          | Color for filled stars in rating.      |
|                     | `--star-empty-color`           | Color for empty stars in rating.       |

## Project Structure

```
src/
├── components/
│   └── ComponentName/
│       ├── __tests__/     # Test files
│       ├── ComponentName.tsx
│       └── ComponentName.module.css
├── contexts/        # Context providers
├── hooks/          # Custom hooks
├── layouts/        # Layout components
├── pages/          # Page components
├── services/       # API services
├── types/          # TypeScript types
└── utils/          # Utility functions
```
