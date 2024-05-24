# Text Analysis Tool

## Overview

The **Text Analysis Tool** is a custom web component that provides various text analysis functionalities. It allows users to input text and instantly see metrics such as word count, character count, sentence count, paragraph count, average word length, and estimated reading time. Additionally, it can detect the language of the input text and check the frequency of specific words.

## Features

- **Word Count**: Counts the number of words in the input text.
- **Character Count**: Counts the number of characters in the input text.
- **Sentence Count**: Counts the number of sentences in the input text.
- **Paragraph Count**: Counts the number of paragraphs in the input text.
- **Average Word Length**: Calculates the average length of words in the input text.
- **Reading Time Estimation**: Estimates the reading time based on an average reading speed.
- **Language Detection**: Detects the language of the input text using the `franc` library.
- **Word Frequency**: Checks the frequency of a specified word in the input text.

## Installation

To use the Text Analysis Tool, include the following files in your project:

1. **text-analysis-tool.js**: The main JavaScript file containing the custom element definition.
2. **text-analysis-tool.html**: An HTML file demonstrating how to use the custom element.

Ensure you have an internet connection to load the `franc` library from the CDN.

## Usage

### HTML

Include the custom element in your HTML file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Text Analysis Tool</title>
</head>
<body>
    <text-analysis-tool></text-analysis-tool>
    <script src="text-analysis-tool.js" type="module"></script>
</body>
</html>
```

### JavaScript

The `text-analysis-tool.js` file defines the custom element `<text-analysis-tool>`. It should be included in your project as a module.

```javascript
import { franc } from 'https://cdn.jsdelivr.net/npm/franc@6.2.0/+esm';

const languageNames = {
    "eng": "English",
    "spa": "Spanish",
    "fra": "French",
    "deu": "German",
    "ita": "Italian",
    "por": "Portuguese",
    "rus": "Russian",
    "zho": "Chinese",
    "ron": "Romanian"
};

class TextAnalysisTool extends HTMLElement {
    constructor() {
        super();

// The rest of the code as provided above...
```

### Custom Element

Add the `<text-analysis-tool>` tag to your HTML where you want the tool to appear. The component will render a text area for input and display various text analysis metrics dynamically as the user types.
