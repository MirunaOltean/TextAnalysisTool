import {franc} from 'https://cdn.jsdelivr.net/npm/franc@6.2.0/+esm';

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

        const template = document.createElement('template');
        template.innerHTML = `
        <style>
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: burlywood;
                }

                h1 {
                    text-align: center;
                    color: #333;
                    font-family: cursive;
                }

                textarea {
                    width: 100%;
                    margin-bottom: 10px;
                }

                .counter {
                    margin-bottom: 5px;
                    font-size: x-large;
                }

                .counter span {
                    font-weight: bold;
                    font-size: x-large;
                }

                #wordFreqInput {
                    margin-top: 10px;
                    width: 250px;
                }

                #wordFreqButton{
                    display: inline-block;
                    padding: 6px 7px;
                    font-size: 14px;
                    font-weight: bold;
                    color: #fff;
                    background-color: #007BFF;
                    border: none;
                    border-radius: 9px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    text-decoration: none;
                    transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
                    cursor: pointer;
                }

                #wordFreqResult {
                    margin-top: 5px;
                }

                #langDetectionResult {
                    margin-top: 10px;
                    font-style: italic;
                    font-size: x-large;
                }
            </style>
            <div class="container">
                <h1>Text Analysis Tool</h1>
                <textarea id="textInput" rows="10" placeholder="Enter text here..."></textarea>
                <div id="counters">
                    <div class="counter">Words: <span id="wordCount">0</span></div>
                    <div class="counter">Characters: <span id="charCount">0</span></div>
                    <div class="counter">Sentences: <span id="sentenceCount">0</span></div>
                    <div class="counter">Paragraphs: <span id="paragraphCount">0</span></div>
                    <div class="counter">Average Word Length: <span id="avgWordLength">0</span></div>
                    <div class="counter">Reading Time (mins): <span id="readingTime">0</span></div>
                </div>
                <input type="text" id="wordFreqInput" placeholder="Enter a word...">
                <button id="wordFreqButton">Check Frequency</button>
                <div id="wordFreqResult"></div>
                <div id="langDetectionResult"></div>
            </div>
        `;
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        const textInput = this.shadowRoot.getElementById('textInput');
        const wordFreqButton = this.shadowRoot.getElementById('wordFreqButton');

        textInput.addEventListener('input', this.updateTextAnalysis.bind(this));
        wordFreqButton.addEventListener('click', this.checkWordFrequency.bind(this));

        this.updateTextAnalysis();
    }

    updateTextAnalysis() {
        const textInput = this.shadowRoot.getElementById('textInput').value;

        // Word Count
        const words = textInput.trim().split(/\s+/);
        this.shadowRoot.getElementById('wordCount').textContent = words.length;

        // Character Count
        this.shadowRoot.getElementById('charCount').textContent = textInput.length;

        // Sentence Count
        const sentences = textInput.split(/[.!?]+/).filter(sentence => sentence.trim() !== '');
        this.shadowRoot.getElementById('sentenceCount').textContent = sentences.length;

        // Paragraph Count
        const paragraphs = textInput.split(/\n\s*\n/).filter(paragraph => paragraph.trim() !== '');
        this.shadowRoot.getElementById('paragraphCount').textContent = paragraphs.length;

        // Average Word Length
        const totalWordLength = words.reduce((acc, word) => acc + word.length, 0);
        this.shadowRoot.getElementById('avgWordLength').textContent = (totalWordLength / words.length).toFixed(2);

        // Reading Time Estimation
        // WPM is words per minute which is typically around 200-250 for adults.
        const averageWPM = 200;
        const totalWords = words.length;
        const estimatedTime = totalWords / averageWPM;
        this.shadowRoot.getElementById('readingTime').textContent = estimatedTime.toFixed(1);

        // Language Detection
        if(textInput){
        const languageCode = franc(textInput);
        
        const languageName = languageNames[languageCode] || languageCode;
        this.shadowRoot.getElementById('langDetectionResult').textContent = `Detected Language: ${languageName}`;
        }
    }

    checkWordFrequency() {
        const textInput = this.shadowRoot.getElementById('textInput').value.toLowerCase();
        const wordFreqInput = this.shadowRoot.getElementById('wordFreqInput').value.toLowerCase();
        const wordFreqResult = this.shadowRoot.getElementById('wordFreqResult');

        const words = textInput.match(/\b\w+\b/g) || [];
        const wordFrequency = words.reduce((acc, word) => {
            acc[word] = (acc[word] || 0) + 1;
            return acc;
        }, {});

        const frequency = wordFrequency[wordFreqInput] || 0;
        wordFreqResult.textContent = `"${wordFreqInput}" appears ${frequency} time(s) in the text.`;
    }
}

customElements.define('text-analysis-tool', TextAnalysisTool);
