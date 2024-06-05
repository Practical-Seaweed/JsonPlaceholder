"use strict";

window.onload = async () => {
    try {
        let userData = await getUserData();
        makeDaTable(userData);
    }catch (error){
        console.error(error);
    }
};

async function getUserData() {
    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/users', {});
        if (!response.ok) {
            throw new Error("Failed to fetch user data");
        }
        let data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Error fetching user data: ${error.message}`);
    }
}

function makeDaTable(users) {
    let tableBody = document.getElementById('userTableInfo');
    tableBody.innerHTML = ''; // Clear existing table rows
    users.forEach(user => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.address.zipcode}</td>
            <td>${user.phone}</td>
            <td>${user.website}</td>
        `;
        tableBody.appendChild(row);
    });
}

// [ eric solution ]
// HTML
/*
<table>
    <thead>
        <tr>
            <th>id</th>
            <th>name</th>
            <th>username</th>
            <th>email</th>
        </tr>
    </thead>
    <tbody id="userTbody">
    </tbody>
</table>
*/
// JavaScript
/*

window.onload = () => {
    getAndDisplayUsers()
}
function getAndDisplayUsers(){
    fetch(`https://jsonplaceholder.typicode.com/users`)
        .then((response) => response.json())
        .then((users) => {
            displayUsers(users)
        })
        .catch((error) => console.log("sh*t be broken. no users!"));
}

function displayUsers(users){
    let tbody = document.querySelector("#userTbody");

    for(let i = 0; i < users.length; i++){
        let row = tbody.insertRow();

        let cell1 = row.insertCell();
        cell1.innerHTML = users[i].id
        
        let cell2 = row.insertCell();
        cell2.innerHTML = users[i].name
        
        let cell3 = row.insertCell();
        cell3.innerHTML = users[i].username

        let cell4 = row.insertCell();
        cell4.innerHTML = users[i].email

        or

        [ this is bad practice, the one above is better for security reasons/issues ]

        tbody.innerHTML += `
            <tr>
                <td>${users[i].id}</td>
                <td>${users[i].name}</td>
                <td>${users[i].username}</td>
                <td>${users[i].email}</td>
            </tr>
        `

    }
}
*/