// Importing required packages
const inquirer = require("inquirer");
const fs = require("fs");

const { Triangle, Square, Circle } = require("./lib/shapes");

// Writes the SVG file based on user input
function writeF(fileName, answers) {
  let svgs = '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">';

  // Use a group tag for layering and organization within the SVG
  svgs += "<g>";

  // Adding shapes to SVG based on user choice
  let shapeOption;
  if (answers.shape === "Triangle") {
    shapeOption = new Triangle();
    svgs += `<polygon points="150, 18 244, 182 56, 182" fill="${answers.shapeBackgroundColor}"/>`;
  } else if (answers.shape === "Square") {
    shapeOption = new Square();
    svgs += `<rect x="73" y="40" width="160" height="160" fill="${answers.shapeBackgroundColor}"/>`;
  } else {
    shapeOption = new Circle();
    svgs += `<circle cx="150" cy="115" r="80" fill="${answers.shapeBackgroundColor}"/>`;
  }

  // Add text to SVG based on user input
  svgs += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textColor}">${answers.text}</text>`;

  // Closing tags for SVG
  svgs += "</g>";
  svgs += "</svg>";

  // Write to file
  fs.writeFile(fileName, svgs, (err) => {
    err ? console.log(err) : console.log("Generated logo.svg");
  });
}

// Prompt user for inputs for generating the SVG
function promptUser() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter text for your logo (up to three characters):",
        name: "text",
      },
      {
        type: "input",
        message: "Choose a text color (keyword or hex):",
        name: "textColor",
      },
      {
        type: "list",
        message: "Select a shape for the logo:",
        choices: ["Triangle", "Square", "Circle"],
        name: "shape",
      },
      {
        type: "input",
        message: "Choose a color for the shape (keyword or hex):",
        name: "shapeBackgroundColor",
      },
    ])
    .then((answers) => {
      if (answers.text.length > 3) {
        console.log("Text must be 3 characters or less.");
        promptUser();
      } else {
        writeF("logo.svg", answers);
      }
    });
}

// Initiate user prompts
promptUser();

