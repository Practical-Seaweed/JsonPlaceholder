"use strict";

window.onload = () => {
    console.log("it be working");
    let theButton = document.querySelector("#theButton");
    theButton.addEventListener("click", clickEventHandler);
}

async function clickEventHandler() {
    try {
        let todoId = document.getElementById("todoId").value;
        if (!todoId) {
            console.log("Please enter a todo ID");
            return;
        }

        let response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {});
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        let data = await response.json();
        
        // Check if the ID received matches the requested ID
        if (data.id == todoId) {
            displayData(data, todoId); // Pass the fetched data and the requested ID to displayData
        } else {
            console.log("No data found for the given ID");
        }

    } catch (error) {
        console.log(error);
    }
}

function displayData(data, requestedId) {
    let resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = ""; // Clear previous results

    // Check if the ID received matches the requested ID
    if (data.id == requestedId) {
        let newParagraph = document.createElement("p");
        newParagraph.textContent = `Todo ID: ${data.id}, Title: ${data.title}`;
        resultsDiv.appendChild(newParagraph);
    }
}
