/**
 * Assignment 8 - OOPS with JS
 * Question 1: Student Result Processing (reduce + Classes)
 * Author: Abhay Pratap Singh
 */

class Student {
  constructor(name, marks) {
    this.name = name;
    this.marks = marks; // Array of numeric scores
  }

  // Calculates average marks using Array.prototype.reduce()
  calculateAverage() {
    if (!this.marks || this.marks.length === 0) {
      return 0;
    }
    const totalMarks = this.marks.reduce((accumulator, currentMark) => {
      return accumulator + currentMark;
    }, 0);

    return totalMarks / this.marks.length;
  }

  // Determines letter grade based on the calculated average score
  getGrade() {
    const avg = this.calculateAverage();

    if (avg >= 90) {
      return "A";
    } else if (avg >= 75) {
      return "B";
    } else if (avg >= 60) {
      return "C";
    } else {
      return "F";
    }
  }

  // Formats and displays student result details
  displayReport() {
    const avg = this.calculateAverage();
    const grade = this.getGrade();
    console.log(`Student Name  : ${this.name}`);
    console.log(`Marks         : [${this.marks.join(", ")}]`);
    console.log(`Average Marks : ${avg.toFixed(2)}`);
    console.log(`Final Grade   : ${grade}`);
    console.log("----------------------------------------");
  }
}

// Demonstrating with 3 distinct student objects
console.log("========================================");
console.log("  QUESTION 1: STUDENT RESULT PROCESSING");
console.log("========================================\n");

const student1 = new Student("Aarav Sharma", [95, 88, 92, 96, 91]);
const student2 = new Student("Priya Patel", [78, 82, 74, 80, 71]);
const student3 = new Student("Rohan Verma", [55, 62, 58, 45, 50]);

const classroom = [student1, student2, student3];

classroom.forEach((student) => {
  student.displayReport();
});

// Export for module testing if needed
if (typeof module !== "undefined" && module.exports) {
  module.exports = { Student };
}

