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
