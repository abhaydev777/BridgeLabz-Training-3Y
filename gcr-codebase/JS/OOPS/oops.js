class Student { //class
    constructor (name, age) { //constructor
        this.name = name; //instance variable
        this.age = age; //instance variable
    }

    introduce() { //method
        console.log(`Hi, I am ${this.name}`);//instance variable access
    }
}

const s1 = new Student("Aman", 22); //object
const s2 = new Student("Riya", 21); //object

// s1.introduce(); //method call
// s2.introduce(); //method call


// Now Inheritance

class Teacher extends Student { //child class
    constructor (name, age, subject) { //child class constructor
        super(name, age); //parent class constructor call
        this.subject = subject; //instance variable
    }

    introduce() { //method
        console.log(`Hi, I am ${this.name} and I teach ${this.subject}`); //instance variable access
    }
}

const t1 = new Teacher("Mr. John", 30, "Math"); //object
const t2 = new Teacher("Mrs. Jane", 25, "Science"); //object

// t1.introduce(); //method call   
// t2.introduce(); //method call


// Now Polymorphism

class Vehicle {//parent class
    start() {//method
        console.log("Vehicle started");//method body
    }
}

class Car extends Vehicle {//child class
    start() {//method
        console.log("Car started");//method body
    }
}

class Bike extends Vehicle {//child class
    start() {//method
        console.log("Bike started");//method body
    }
}

const vehicle = new Vehicle();//object
const car = new Car();//object
const bike = new Bike();//object

vehicle.start();//method call
car.start();//method call
bike.start();//method call


// Now Encapsulation

class BankAccount {
    constructor (balance) {
        this.balance = balance;
    }

    getBalance() {
        return this.balance;
    }
}