/**
 * Modular Text Engine - Core text management and display system
 * Handles text formatting, tags, and rendering for the game
 */

class TextEngine {
  constructor(options = {}) {
    this.buffer = [];
    this.history = [];
    this.maxHistory = options.maxHistory || 1000;
    this.textFormatters = new Map();
    this.textTags = new Map();
    this.registerDefaultFormatters();
  }

  registerDefaultFormatters() {
    // Color formatting
    this.registerFormatter('color', (text, colorName) => {
      return { text, type: 'color', color: colorName };
    });

    // Emphasis
    this.registerFormatter('bold', (text) => {
      return { text, type: 'bold' };
    });

    this.registerFormatter('italic', (text) => {
      return { text, type: 'italic' };
    });

    // Special styling
    this.registerFormatter('success', (text) => {
      return { text, type: 'success' };
    });

    this.registerFormatter('error', (text) => {
      return { text, type: 'error' };
    });

    this.registerFormatter('warning', (text) => {
      return { text, type: 'warning' };
    });

    this.registerFormatter('info', (text) => {
      return { text, type: 'info' };
    });
  }

  registerFormatter(name, formatter) {
    this.textFormatters.set(name, formatter);
  }

  registerTag(name, handler) {
    this.textTags.set(name, handler);
  }

  // Add text to buffer
  addText(text, formatting = {}) {
    const entry = {
      text,
      timestamp: Date.now(),
      ...formatting
    };
    this.buffer.push(entry);
    this.history.push(entry);

    if (this.history.length > this.maxHistory) {
      this.history.shift();
    }

    return entry;
  }

  // Add multiple lines
  addLines(lines, formatting = {}) {
    lines.forEach(line => this.addText(line, formatting));
  }

  // Clear current buffer
  clearBuffer() {
    this.buffer = [];
  }

  // Get formatted output
  getBuffer() {
    return [...this.buffer];
  }

  // Get full history
  getHistory() {
    return [...this.history];
  }

  // Apply a formatter to text
  format(text, formatterName, ...args) {
    const formatter = this.textFormatters.get(formatterName);
    if (!formatter) {
      console.warn(`Formatter '${formatterName}' not found`);
      return { text };
    }
    return formatter(text, ...args);
  }

  // Clear everything
  reset() {
    this.buffer = [];
    this.history = [];
  }
}

export default TextEngine;
