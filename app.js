const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./lib/htmlRenderer");
const { createInflate } = require("zlib");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// DATA
// ===========================================================
const teamMembers = [];

// MANAGER
// ===========================================================
createTeam();
function createTeam() {
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the manager's name?"
    },
    {
      type: "input",
      name: "id",
      message: "What is the manager's ID number?"
    },
    {
      type: "input",
      name: "email",
      message: "What is the manager's email?"
    },
    {
      type: "input",
      name: "officeNumber",
      message: "What is the manager's office number?"
    },
  ]).then( answers => {
    const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
    teamMembers.push(manager);
    createEmployee();
  })
}

// EMPLOYEE MENU
// ===========================================================
function createEmployee() {
  inquirer.prompt([
    {
      type: "list",
      name: "role",
      message: "Add a new employee by selecting their role: ",
      choices: ["Engineer", "Intern", "Exit"]
    }
  ]).then((userChoice) => {
    switch (userChoice.role) {
      case "Engineer":
        createEngineer();
        break;
      case "Intern":
        createIntern();
        break;
      case "Exit":
        createFile()
        break;
    }
  })
}

// ENGINEER
// ===========================================================
function createEngineer() {
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the engineer's name?"
    },
    {
      type: "input",
      name: "id",
      message: "What is the engineer's ID number?"
    },
    {
      type: "input",
      name: "email",
      message: "What is the engineer's email?"
    },
    {
      type: "input",
      name: "github",
      message: "What is the engineer's GitHub username?"
    },
  ]).then( answers => {
    const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
    teamMembers.push(engineer);
    createEmployee();
  })
}

// INTERN
// ===========================================================
function createIntern() {
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the intern's name?"
    },
    {
      type: "input",
      name: "id",
      message: "What is the intern's ID number?"
    },
    {
      type: "input",
      name: "email",
      message: "What is the intern's email?"
    },
    {
      type: "input",
      name: "school",
      message: "What is the name of the intern's school?"
    },
  ]).then( answers => {
    const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
    teamMembers.push(intern);
    createEmployee();
  })
}

// RENDER TEAM HTML
// ===========================================================
function createFile() {
  const renderedHTML = render(teamMembers);
  fs.writeFileSync(outputPath, renderedHTML);
}