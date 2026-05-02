// Load users from localStorage
let users = JSON.parse(localStorage.getItem("user")) || [];

// Create default admin only once
if (users.length === 0) {
    users.push({
        id: 1,
        name: "Admin",
        gmail: "naveenkilarigmail.com",
        password: "vemu",
        role: "Admin"
    });
    localStorage.setItem("user", JSON.stringify(users));
}

// ADD USER
function addUser() {

    users = JSON.parse(localStorage.getItem("user")) || [];

    let name = document.getElementById("name").value;
    let gmail = document.getElementById("gmail").value;
    let password = document.getElementById("password").value;
    let role = document.getElementById("role").value;

    if (name === "" || gmail === "" || password === "") {
        alert("Fill all fields");
        return;
    }

    // Proper ID generation
    let id = users.length > 0 ? users[users.length - 1].id + 1 : 1;

    let newUser = { id, name, gmail, password, role };

    users.push(newUser);
    localStorage.setItem("user", JSON.stringify(users));

    alert("User Added");

    clearFields();
    render();
}

// DELETE USER
function deleteUser(index) {

    users = JSON.parse(localStorage.getItem("user")) || [];

    // Prevent deleting Admin
    if (users[index].role === "Admin") {
        alert("Cannot delete Admin");
        return;
    }

    if (confirm("Delete this user?")) {
        users.splice(index, 1);
        localStorage.setItem("user", JSON.stringify(users));
        render();
    }
}

// CLEAR INPUT FIELDS
function clearFields() {
    document.getElementById("name").value = "";
    document.getElementById("gmail").value = "";
    document.getElementById("password").value = "";
}

// RENDER USERS TABLE
function render() {

    users = JSON.parse(localStorage.getItem("user")) || [];

    let table = document.getElementById("table");

    table.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Action</th>
        </tr>
    `;

    users.forEach((u, index) => {
        table.innerHTML += `
            <tr>
                <td>${u.id}</td>
                <td>${u.name}</td>
                <td>${u.role}</td>
                <td>
                    <button onclick="deleteUser(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

// VIEW REPORTS
function viewReports() {

    let students = JSON.parse(localStorage.getItem("students")) || [];

    let branch = document.getElementById("filterBranch").value;
    let section = document.getElementById("filterSection").value;

    let box = document.getElementById("hodReport");

    let filtered = students.filter(s => {
        return (branch === "" || s.branch === branch) &&
               (section === "" || s.section === section);
    });

    if (filtered.length === 0) {
        box.innerHTML = "<h3>No students found</h3>";
        return;
    }

    let html = `<div style="display:flex;flex-wrap:wrap;gap:15px;">`;

    filtered.forEach(s => {

        let total = s.total || 0;
        let present = s.present || 0;
        let absent = total - present;

        let per = total === 0 ? 0 : ((present / total) * 100).toFixed(1);
        let color = per >= 75 ? "green" : "red";
        let status = per >= 75 ? "Good" : "Low";

        html += `
        <div style="
        width:250px;
        background:#fff;
        padding:15px;
        border-radius:12px;
        box-shadow:0 4px 10px rgba(0,0,0,0.1);
        ">

        <h3>${s.name}</h3>
        <p><b>Branch:</b> ${s.branch}</p>
        <p><b>Section:</b> ${s.section}</p>

        <p>Total: ${total}</p>
        <p style="color:green">Present: ${present}</p>
        <p style="color:red">Absent: ${absent}</p>

        <p>Attendance: ${per}%</p>

        <div style="background:#eee;height:12px;border-radius:10px;">
        <div style="width:${per}%;background:${color};height:100%;border-radius:10px;"></div>
        </div>

        <p style="color:${color};font-weight:bold;">${status}</p>

        </div>
        `;
    });

    html += `</div>`;

    box.innerHTML = html;
}

// LOAD TABLE ON PAGE LOAD
window.onload = render;
