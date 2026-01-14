# CSC402 Module 5: Arrays | Mastery Assessment

![Project Status](https://img.shields.io/badge/Status-Active-success)
![Tech Stack](https://img.shields.io/badge/Stack-HTML%20%7C%20Tailwind%20%7C%20Alpine.js-blue)

A modern, interactive, and mobile-responsive quiz engine designed to assess student mastery of **C++ Arrays**. This project uses a lightweight tech stack (Alpine.js & Tailwind CSS) to deliver a smooth, single-page application experience without the need for complex build tools.

---

## ⚡️ Features

### Core Functionality

* **Randomized Questions:** Utilizing the Fisher–Yates shuffle algorithm, questions are randomized every time the quiz starts.
* **Countdown Timer:** Integrated 5-minute timer (300 seconds). The timer turns red and pulses when 60 seconds remain and auto-submits when time expires.
* **Question Map:** A visual grid allows users to jump between questions and see which ones have been answered or skipped.
* **Input & MCQ Support:** Supports both Multiple Choice Questions and Text Input (fill-in-the-blank) questions.

### User Experience (UX)

* **Review Mode:** After submission, users can review their performance via a card-based carousel showing their answer versus the correct answer with feedback.
* **Mobile Responsive:** Fully optimized for mobile devices with stacked layouts and centered components.
* **Visual Feedback:** Interactive button states, progress indicators, and hover effects using Tailwind CSS.
* **Sanitized Rendering:** HTML entity handling ensures C++ code such as `i < N` renders correctly without breaking the browser parser.

---

## 🛠 Tech Stack

* **Structure:** HTML5
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) (via CDN)
* **Logic / State:** [Alpine.js](https://alpinejs.dev/) (via CDN)
* **Fonts:** Google Fonts (Inter & JetBrains Mono)

---

## 🚀 Getting Started

This project relies entirely on CDN-hosted libraries, so **no installation is required**.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/csc402-arrays-quiz.git
```

### 2. Run the Application

Open `index.html` in any modern web browser:

* Chrome
* Firefox
* Edge
* Safari

---

## 📂 Project Structure

```text
├── index.html       # Main application file containing structure and quiz logic
├── style.css        # Custom overrides (animations, font tweaks)
├── script.js        # External scripts (dynamic header/footer logic)
└── README.md        # Project documentation
```

---

## ⚙️ Configuration & Customization

Most configuration is handled inside the `script` section at the bottom of `index.html`.

### 1. Changing the Time Limit

Locate the `quizEngine()` function and update the `totalTime` value (in seconds).

```javascript
// Example: 600 = 10 minutes
totalTime: 300
```

---

### 2. Adding or Editing Questions

Locate the `masterQuestions` array.

#### Multiple Choice Question Format

```javascript
{
    category: 'Topic Name',
    type: 'mcq',
    text: 'Your question here?',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correct: 1
}
```

#### Text Input Question Format

```javascript
{
    category: 'Topic Name',
    type: 'input',
    text: 'Fill in the blank: int arr[___];',
    correct: ['10', 'ten']
}
```

---

## ⚠️ Important Note on C++ Syntax

When writing questions that include less-than symbols, avoid browser parsing issues by following these rules:

* **Bad:** `i<10`
* **Better:** `i < 10`
* **Best:** `i &lt; 10`

Using HTML entities is the safest approach.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

Distributed under the MIT License. See the `LICENSE` file for details.

---

*Built for CSC402 Module 5.*
