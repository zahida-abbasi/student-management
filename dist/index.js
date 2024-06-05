import inquirer from 'inquirer';
class StudentManager {
    students = [];
    currentId = 1;
    addStudent(name, age, grade) {
        const newStudent = {
            id: this.currentId++,
            name,
            age: Number(age),
            grade,
        };
        this.students.push(newStudent);
        return newStudent;
    }
    getStudents() {
        return this.students;
    }
    findStudentById(id) {
        return this.students.find(student => student.id === id);
    }
    removeStudent(id) {
        const index = this.students.findIndex(student => student.id === id);
        if (index !== -1) {
            this.students.splice(index, 1);
            return true;
        }
        return false;
    }
}
const studentManager = new StudentManager();
async function mainMenu() {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What do you want to do?',
            choices: ['Add Student', 'View Students', 'Find Student', 'Remove Student', 'Exit'],
        },
    ]);
    switch (answers.action) {
        case 'Add Student':
            await addStudent();
            break;
        case 'View Students':
            viewStudents();
            break;
        case 'Find Student':
            await findStudent();
            break;
        case 'Remove Student':
            await removeStudent();
            break;
        case 'Exit':
            process.exit();
    }
    mainMenu(); // Show the menu again after an action
}
async function addStudent() {
    const answers = await inquirer.prompt([
        { type: 'input', name: 'name', message: 'Enter student name:' },
        { type: 'input', name: 'age', message: 'Enter student age:' },
        { type: 'input', name: 'grade', message: 'Enter student grade:' },
    ]);
    const newStudent = studentManager.addStudent(answers.name, answers.age, answers.grade);
    console.log('Added student:', newStudent);
}
function viewStudents() {
    const students = studentManager.getStudents();
    console.log('Students:', students);
}
async function findStudent() {
    const answers = await inquirer.prompt([
        { type: 'input', name: 'id', message: 'Enter student ID to find:' },
    ]);
    const student = studentManager.findStudentById(Number(answers.id));
    if (student) {
        console.log('Found student:', student);
    }
    else {
        console.log('Student not found');
    }
}
async function removeStudent() {
    const answers = await inquirer.prompt([
        { type: 'input', name: 'id', message: 'Enter student ID to remove:' },
    ]);
    const success = studentManager.removeStudent(Number(answers.id));
    if (success) {
        console.log('Student removed');
    }
    else {
        console.log('Student not found');
    }
}
mainMenu();
