let buttons = document.querySelector(".buttons");
let btn = document.querySelectorAll("span");
let value = document.getElementById("value");
let toggleBtn = document.querySelector(".toggleBtn");
let body = document.querySelector("body");  

for (let i = 0; i < btn.length; i++) {
  btn[i].addEventListener("click", function () {
    let expression = value.innerHTML;

    if (this.innerHTML == "=") {
      try {
        // Handle percentage calculations
        if (expression.endsWith("%")) {
          // Single number percentage: convert to decimal directly
          expression = parseFloat(expression) / 100;
        } else if (expression.includes("%")) {
          // Two number percentage: split and calculate
          const parts = expression.split("%");
          const operand1 = parseFloat(parts[0]);
          const operand2 = parseFloat(parts[1]) / 100;
          expression = operand1 * operand2;
        } else {
          // Evaluate the expression as usual
          expression = eval(expression);
        }
        value.innerHTML = expression.toString(); // Ensure result is a string
      } catch (error) {
        value.innerHTML = "Error";
      }
    } else if (this.innerHTML == "C") {
      value.innerHTML = "";
    } else if (this.innerHTML == "%") {
      // Handle percentage input directly on the expression
      if (!expression.endsWith("%")) {
        // Append % only if not already present (for single number percentages)
        expression += this.innerHTML;
      }
      value.innerHTML = expression; // Update the expression
    } else {
      // Handle other buttons (numbers, operators, etc.)
      expression += this.innerHTML; // Append the button value to the expression
      value.innerHTML = expression; // Update the expression
    }
  });
}

toggleBtn.onclick = function () {
  body.classList.toggle("dark");
};