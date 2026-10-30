# Assignment 6: Asynchronous Programming in JavaScript

**Student Name:** Abhay Pratap Singh  
**Course:** Full Stack Web Development (BridgeLabz Training 3Y)  
**Topic:** JavaScript Event Loop, Callbacks, Promises, Async/Await, and Promise Combinators  

---

## Directory Structure

```text
assignment-6(Async JS)/
├── README.md       # Overview and execution instructions
├── q1.js           # Q1: The Startup Morning: Async Coffee Maker (Promise chaining)
├── q2.js           # Q2: Task Scheduler: Micro vs Macro Challenge (Event loop order)
├── q3.js           # Q3: Bug Tracker: Callback to Promise Migration (console.table & reject)
├── q4.js           # Q4: DevOps Delay: Async Timeout Race (Promise.race & Promise.all)
├── q5.js           # Q5: Frontend Rush: Avoiding Callback Hell (Callbacks vs Async/Await)
├── q6.js           # Q6: E-Commerce Dashboard: Product Card Fetcher (Fetch API + async/await)
├── q6.html         # Q6 Bonus: Dynamic HTML Product Cards
├── q6.css          # Q6 Bonus: Responsive CSS Grid styling
├── q7.js           # Q7: The Lazy Loader: Promise Combinator Practice (Promise.allSettled)
├── q8.js           # Q8: Order Processing Flow: Async Retry Mechanism (Loop retry with await)
├── q9.js           # Q9: Debugging the Event Loop (Prediction vs Reality analysis)
└── q10.js          # Q10: The Final Delivery: Async Pipeline Debugger (Error propagation)
```

---

## Running the Solutions

All scripts are written in standard modern JavaScript (ES6+) without any external npm dependencies and run out of the box using **Node.js (v18+)** or within the browser developer console:

```bash
# Execute any question directly:
node q1.js
node q2.js
node q3.js
node q4.js
node q5.js
node q6.js
node q7.js
node q8.js
node q9.js
node q10.js
```

### Viewing Question 6 Interactive Dashboard:
Open `q6.html` directly in any web browser (or serve with VS Code Live Server) to see the product cards dynamically created and populated from the Fake Store API.

---

## Summary of Questions

| File | Challenge | Key Concept Demonstrated |
| :--- | :--- | :--- |
| `q1.js` | Async Coffee Maker | 3-step Promise chaining with `.then()`, random failure & `.catch()` |
| `q2.js` | Micro vs Macro Challenge | Call stack, microtask queue priority over macrotask timers |
| `q3.js` | Callback to Promise Migration | Refactoring callbacks to Promises, simulated API rejection, `console.table()` |
| `q4.js` | DevOps Delay Race | `Promise.race()` for fastest responder + `Promise.all()` for completion |
| `q5.js` | Avoiding Callback Hell | Callback hell vs linear `async`/`await` with centralized `try/catch` |
| `q6.js` | Product Card Fetcher | Native `fetch()`, async/await, error fallback + dynamic DOM grid creation |
| `q7.js` | The Lazy Loader | `Promise.allSettled()` concurrency, fulfilled/rejected status tracking, `Date.now()` timer |
| `q8.js` | Async Retry Mechanism | 3-attempt retry loop with `await`, handling gateway failures gracefully |
| `q9.js` | Debugging Event Loop | Microtask queue draining before macrotasks, predicted vs actual order |
| `q10.js`| Async Pipeline Debugger | Sequential food delivery stages, `await` error propagation and exception handling |

