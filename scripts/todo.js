"use strict"

window.onload = () => {

    console.log("it be working")

    let theButton = document.querySelector("#theButton");
    theButton.addEventListener("click", clickEventHandler)

}

async function clickEventHandler() {
    try {
        let response = await fetch("https://jsonplaceholder.typicode.com/todos/1", {});
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        let data = await response.json();
        if (data) {
            displayData(data); 
        } else {
            throw new Error("Data is undefined");
        }
    } catch (error) {
        console.log(error);
    }
}
function displayData(data) { 

    let resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    let newParagraph = document.createElement("p");
    newParagraph.textContent = `Todo ID: ${data.id}, Title: ${data.title}`;
    resultsDiv.appendChild(newParagraph);
}