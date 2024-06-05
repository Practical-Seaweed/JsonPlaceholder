"use strict";

let theDropdown = document.querySelector("#userNamesDP");
let userTableInfo = document.querySelector("#userTableInfo");

async function getUserData() {
    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/users', {});
        if (!response.ok) {
            throw new Error("Failed to fetch user data");
        }
        let data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function buildDropdown() {
    let users = await getUserData();
    users.forEach((user) => {
        let newOption = document.createElement("option");
        newOption.textContent = user.name;
        newOption.value = user.id;
        theDropdown.appendChild(newOption);
    });
}

async function buildTable(userId) {
    let users = await getUserData();
    userTableInfo.innerHTML = ""; // Clear previous table data
    let selectedUser = users.find(user => user.id == userId);
    if(selectedUser) {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${selectedUser.name}</td>
            <td>${selectedUser.username}</td>
            <td>${selectedUser.email}</td>
            <td>${selectedUser.address.zipcode}</td>
            <td>${selectedUser.phone}</td>
            <td>${selectedUser.website}</td>
        `;
        userTableInfo.appendChild(row);
    }
}

buildDropdown();

theDropdown.addEventListener('change', function() {
    let selectedUserId = this.value;
    buildTable(selectedUserId);
});
