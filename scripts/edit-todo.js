"use strict"

window.onload = () => {

    console.log("mweheh im inside yoru edit-todo.js >:3")

    const getCommentForm = document.querySelector("#getCommentToEdit");

    getCommentForm.addEventListener("submit", populateUpdateForm);

    const updateCommentForm = document.querySelector("#updateCommentForm");

    updateCommentForm.addEventListener("submit", updateAComment);
}

const populateUpdateForm = async (event) => {
    event.preventDefault();

    let comment = await getSingleComment(event.target.commentId.value);

    document.querySelector("#userId").value = comment.userId;
    document.querySelector("#id").value = comment.id;
    document.querySelector("#title").value = comment.title;
    document.querySelector("#completed").value = comment.completed;
}

const getSingleComment = async (commentId) => {

    const response = await fetch("https://jsonplaceholder.typicode.com/todos/" + commentId);
    let comment = await response.json();

    return comment;

}

const updateAComment = async (event) => {
    event.preventDefault();

    try {

        let response = await fetch("https://jsonplaceholder.typicode.com/todos/" + event.target.id.value,
            {
                method: "PUT",
                headers: { "Content-type": "application/json; charset=UTF-8" },
                body: JSON.stringify({
                    userId: event.target.userId.value,
                    id: event.target.id.value,
                    title: event.target.title.value,
                    completed: event.target.completed.value

                })
            }
        );

        let updatedComment = await response.json();
        const theResultsDiv = document.getElementById("theResults");
        theResultsDiv.innerHTML = `<p>User ID: ${updatedComment.userId}</p>
                                <p>ID: ${updatedComment.id}</p>
                                <p>Title: ${updatedComment.title}</p>
                                <p>Completed: ${updatedComment.completed}</p>`;

        console.log(updatedComment);

    } catch (error) {
        console.log("something went wrong! fix me pls!", error)
    }
}