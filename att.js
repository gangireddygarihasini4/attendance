function login() {

    var email = document.getElementById("email").value.trim();
    var password = document.getElementById("password").value.trim();
let role = document.getElementById("role").value;
    
    if (email === "naveenkilari@gmail.com" && password === "vemu") {
        alert("Admin Login Success");
        window.location.href = "dashboard.html";
        return;
    }

if (role === "") {
    alert("Please select a role");
    return;
}
    let users = JSON.parse(localStorage.getItem("user")) || [];

    let found = users.find(u => 
        u.gmail === email && u.password === password
    );

    if (found) {
        alert("User Login Success");

        if (found.role === "HOD") {
            window.location.href = "hod.html";
        } 
        else if (found.role === "CLASS TEACHER") {
            window.location.href = "fac.html";
        } 
        else if (found.role === "STUDENT") {
            window.location.href = "std.html";
        }

    } else {
        alert("Invalid user");
    }
}
