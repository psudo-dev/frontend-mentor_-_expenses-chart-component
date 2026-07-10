![Image](./preview.jpg)

# Frontend Mentor - Expenses chart component

[![Frontend Mentor](https://img.shields.io/badge/Frontend%20Mentor-Expenses%20Chart%20Component-2ec866?style=flat-square&logo=frontendmentor)](https://www.frontendmentor.io/challenges/expenses-chart-component-e7yJBUdjwt)

## Overview

I'm back to studying programming and I've started with the good old HTML and CSS, now I'm relearning JavaScript and TypeScript. After finishing the course I'm tackling some [Frontend Mentor](https://www.frontendmentor.io) challenges to put into practice everything I've learned as I continue my studies. It's also a great way to keep improving - while not forgetting everything I've learned - as I continue to learn new things.

### Live Demo

- [Live Demo](https://gasket-bamboo-flair.netlify.app)
- [Frontend Mentor Solution](https://www.frontendmentor.io/solutions/interactive-rating-component-ULxFOLNZtt)

## Frontend Mentor

[Frontend Mentor](https://www.frontendmentor.io) challenges help you improve your coding skills by building realistic projects.

The challenges are pretty straight forward, you have to replicate the page or element as closely as possible as the initial image or Figma layout - when provided.

### The Challenge

Your challenge is to build out this bar chart component and get it looking as close to the design as possible.

You can use any tools you like to help you complete the challenge. So if you've got something you'd like to practice, feel free to give it a go.

We provide the data for the chart in a local `data.json` file. So you can use that to dynamically add the bars if you choose.

Your users should be able to:

- View the bar chart and hover over the individual bars to see the correct amounts for each day
- See the current day's bar highlighted in a different colour to the other bars
- View the optimal layout for the content depending on their device's screen size
- See hover states for all interactive elements on the page
- **Bonus**: See dynamically generated bars based on the data provided in the local JSON file

## What I've Learned

### 3D Card Flip Animation

Since this is a pretty simple project, I've decided to add a bit of interactivity to it, so I can try new things and learn from it. The main feature is that when the user submits the form, the rating card will flip and show the thanks card, with the rating that the user selected.

I initially made the animation using a mix of `setTimeout` and `translateY` with precise timing so the animation would look smooth and natural. But with a bit of research and help from AI, I found out that there was a more complicated but more performant way to do this animation, so I gave it a try. To be honest, I don't completely understood all the inner workings, but it was an fun experiment and this is a modern way to do 3D animations, so I'm glad I learned it.

I also made in a way that when the user selects a rating, the numbers become filled with starts, which is a nice visual feedback for the user, and also makes it more clear which rating they have selected.

### Accessibility and Semantic HTML

To ensure proper validation, 100% of the visible content is wrapped inside appropriate HTML5 landmark elements, and the form structure uses proper semantic nodes for selection:

- Form Structure: Wrapped the rating options within a and for native screen reader support.
- Radio Inputs: Each rating option is implemented as a radio input, allowing users to select only one rating at a time, with clear labels for screen readers.

### Architecture and Tooling

- TypeScript: Adopted to enforce type safety, cleaner logic separation, and robust IDE autocompletion.
- BEM (Block Element Modifier): Applied to build predictable and modular stylesheets.

## Built With

- Markup: HTML5, Semantic Elements
- Styling: CSS3 (Grid, Flexbox, Fluid Spacing using clamp()), BEM Architecture
- Logic & Tooling: TypeScript, Vite, Bun

## Author

[@psudo-dev](https://github.com/psudo-dev)

## License

This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE.md) file for details
