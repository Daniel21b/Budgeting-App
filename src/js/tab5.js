function displayChoices() {
    // Get selected budget type
    let budgetType = document.querySelector('input[name="budget"]:checked');
    let selectedBudget = budgetType ? budgetType.value : "No selection";

    // Get selected category
    let selectedCategory = document.getElementById("category").value;

    // Display selected options on separate lines
    let resultElement = document.getElementById("choices-result");
    resultElement.innerHTML = `Selected Budget Type: ${selectedBudget} <br> Expense Category: ${selectedCategory}`;

    // Make sure result is visible
    resultElement.style.display = "block";
}
