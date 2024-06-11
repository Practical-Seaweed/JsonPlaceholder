"use strict"

window.onload = () => {

    console.log("heh im in your new-todo.js >:D")

    const createCommentForm = document.querySelector("#createCommentForm");
    createCommentForm.addEventListener("submit", createAComment);

}

const createAComment = async (event) => {

    event.preventDefault();

    let formData = new FormData(event.target);

    let formDataAsObject = Object.fromEntries(formData);

    try {

        let response = await fetch("https://jsonplaceholder.typicode.com/todos/", 
            {
                method: "POST",
                headers: { "Content-type": "application/json; charset=UTF-8" },
                body: JSON.stringify(formDataAsObject)
            }

        );

        let newComment = await response.json();

        const theResultsDiv = document.getElementById("theResults");
        theResultsDiv.innerHTML = `
            <p>User ID: ${newComment.userId}</p>
            <p>ID: ${newComment.id}</p>
            <p>Title: ${newComment.title}</p>
            <p>Completed?: ${newComment.completed}</p>
            <p>You successfully added a new message!</p>
        `

        console.log(newComment);
    } catch (error) {
        console.log("something went wrong! fix it please!")
    }

}