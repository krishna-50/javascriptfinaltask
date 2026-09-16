let users = [];
let showUsers = [];

function showDate() {

    let d = new Date();

    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();

    let hour = d.getHours();
    let min = d.getMinutes();

    document.getElementById("date").innerHTML =
        "Today: " + day + "/" + month + "/" + year +
        " | Time: " + hour + ":" + min;
}

showDate();

function fetchEmployees() {

    fetch("https://dummyjson.com/users")

        .then(function(response) {
            return response.json();
        })

        .then(function(data) {

            users = data.users;

            users.forEach(function(user) {

                user.name = user.firstName + " " + user.lastName;

                if (user.company.department == "Engineering") {
                    user.department = "IT";
                }
                else if (user.company.department == "Human Resources") {
                    user.department = "HR";
                }
                else if (user.company.department == "Finance") {
                    user.department = "Finance";
                }
                else if (user.company.department == "Marketing") {
                    user.department = "Marketing";
                }
                else {
                    user.department = "IT";
                }

                user.salary = 30000;
            });

            showUsers = [...users];

            document.getElementById("msg").innerHTML =
                "Employee data loaded successfully.";

            displayEmployees(showUsers);
        })

        .catch(function(error) {

            document.getElementById("msg").innerHTML =
                "Unable to load employee data. Please try again.";

            console.log(error);
        })

        .finally(function() {

            console.log("API process finished");
        });
}

function displayEmployees(arr) {

    let cards = document.getElementById("cards");

    cards.innerHTML = "";

    arr.forEach(function(user) {

        let card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <h3>${user.name}</h3>

            <p>Age: ${user.age}</p>
            <p>Email: ${user.email}</p>
            <p>Department: ${user.department}</p>
            <p>Phone: ${user.phone}</p>
            <p>Salary: ₹${user.salary}</p>

            <button onclick="deleteEmployee(${user.id})">
                Delete
            </button>
        `;

        cards.appendChild(card);
    });

    updateCount(arr);

    calculateSalary(arr);

    findHighSalary(arr);
}

document.getElementById("searchBtn").addEventListener("click", searchEmployee);

function searchEmployee() {

    let word = document.getElementById("search").value;

    showUsers = users.filter(function(user) {

        return user.name.toLowerCase().includes(word.toLowerCase());

    });

    displayEmployees(showUsers);
}

document.getElementById("search").addEventListener("input", searchEmployee);


function filterDepartment(dep) {

    if (dep == "All") {

        showUsers = [...users];

    }
    else {

        showUsers = users.filter(function(user) {

            return user.department == dep;

        });
    }

    displayEmployees(showUsers);
}

function updateCount(arr) {

    document.getElementById("count").innerHTML =
        "Total Employees: " + arr.length;
}



function addEmployee() {

    let name = document.getElementById("name").value;
    let age = Number(document.getElementById("age").value);
    let email = document.getElementById("email").value;
    let department = document.getElementById("department").value;
    let salary = Number(document.getElementById("salary").value);

    let error = document.getElementById("error");

    if (name == "") {

        error.innerHTML = " Please enter employee name";
        return;
    }

    if (age <= 18) {

        error.innerHTML = " Age must be greater than 18";
        return;
    }

    if (email == "") {

        error.innerHTML = "Please enter employee email";
        return;
    }

    if (department == "") {

        error.innerHTML = "Please select department";
        return;
    }

    if (salary <= 0) {

        error.innerHTML = " Please enter salary";
        return;
    }


    let employee = {

        id: Date.now(),
        name: name,
        age: age,
        email: email,
        department: department,
        salary: salary,
        phone: "Not Available",
        image: "https://dummyjson.com/icon/abc/150"
    };

    users = [...users, employee];

    showUsers = [...users];

    displayEmployees(showUsers);

    clearForm();

    error.innerHTML = "";

}


function clearForm() {

    document.getElementById("name").value = "";

    document.getElementById("age").value = "";

    document.getElementById("email").value = "";

    document.getElementById("department").value = "";

    document.getElementById("salary").value = "";
}

function deleteEmployee(id) {

    users = users.filter(function(user) {

        return user.id != id;

    });

    showUsers = [...users];

    displayEmployees(showUsers);
}

function calculateSalary(arr) {

    let total = arr.reduce(function(total, user) {

        return total + user.salary;

    }, 0);


    let average = 0;

    if (arr.length > 0) {

        average = total / arr.length;

    }


    document.getElementById("salaryDetails").innerHTML =

        "Total Employees: " + arr.length +
        "<br>Total Salary: ₹" + total +
        "<br>Average Salary: ₹" + Math.round(average);
}


function findHighSalary(arr) {

    if (arr.length == 0) {

        document.getElementById("high").innerHTML =
            "No employees";

        return;
    }


    let high = arr.reduce(function(a, b) {

        if (a.salary > b.salary) {
            return a;
        }
        else {
            return b;
        }

    });


    document.getElementById("high").innerHTML =

        "Name: " + high.name +
        "<br>Salary: ₹" + high.salary;
}


function sortName() {

    showUsers.sort(function(a, b) {

        return a.name.localeCompare(b.name);

    });

    displayEmployees(showUsers);
}


function sortAge() {

    showUsers.sort(function(a, b) {

        return a.age - b.age;

    });

    displayEmployees(showUsers);
}

function sortSalary() {

    showUsers.sort(function(a, b) {

        return b.salary - a.salary;

    });

    displayEmployees(showUsers);
}

setTimeout(function() {

    fetchEmployees();

}, 500);

