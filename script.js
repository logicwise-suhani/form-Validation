var confirm_pass = document.getElementById("con-pwd");
var pass = document.getElementById("pwd");
var message = document.getElementById("message");
var _message = document.getElementById("_message");
var _cgpa = document.getElementById("_cgpa");
var _cgpaValue = document.getElementById("cgpaValue");
var myForm = document.getElementById("myForm");
var check_box = document.getElementById("check_box");

function check_Confirm() {
    if (pass.value === confirm_pass.value) {
        message.innerHTML = "Good to go";
    }
    else {
        message.innerHTML = "Confirm again!";
    }

};

confirm_pass.onkeyup = check_Confirm;


//submit functions
var _submit = document.getElementById("submit-btn");
var checkbox = document.getElementById("yes");
var _reset = document.getElementById("_reset");

function updateSubmitState() {
    if (allFilled() && checkbox.checked) {
        _submit.disabled = false;
        _message.innerHTML = "";

    } else {
        _submit.disabled = true;
    }

}





function agree() {
    if (!checkbox.checked) {
        _message.innerHTML = "Check I Agree!";
        _submit.disabled = true;
        clearFunction();
        return false;
    } else {
        _message.innerHTML = "";
        return true;
    }



}

function allFilled() {
    if (fname.value.trim() !== "" &&
        email.value.trim() !== "" &&
        phone.value.trim() !== "" &&
        pass.value.trim() !== "" &&
        confirm_pass.value.trim() !== "" &&
        grade.value.trim() !== "" &&
        (male.checked || female.checked || others.checked)) {
        _submit.disabled = false;
    }


    return fname.value.trim() !== "" &&
        email.value.trim() !== "" &&
        phone.value.trim() !== "" &&
        pass.value.trim() !== "" &&
        confirm_pass.value.trim() !== "" &&
        grade.value.trim() !== "" &&
        (male.checked || female.checked || others.checked);


}



var education = document.getElementById("grade");
var fname = document.getElementById("fname");
var email = document.getElementById("email");
var phone = document.getElementById("phone");
var male = document.getElementById("male");
var female = document.getElementById("female");
var others = document.getElementById("others");




//clear functions
function clearFunction() {
    fname.value = "";
    email.value = "";
    phone.value = "";
    pass.value = "";
    confirm_pass.value = "";
    education.value = "";
    male.checked = false;
    female.checked = false;
    others.checked = false;
    checkbox.checked = false;
    message.innerHTML = "";
    _message.innerHTML = ""
    default_cgpa();
    // _submit.disabled = true;
}


function default_cgpa() {
    _cgpa.value = 0;
    _cgpaValue.textContent = 0;
}



let numb = document.getElementById("numb");


function check_digit() {
    const pattern = /^[0-9]{5}[0-9]{5}$/;

    if (pattern.test(phone.value)) {
        numb.textContent = "";
    } else {
        numb.textContent = "Only digits in format 0123456789";
        _submit.disabled = true;

    }


}


let _pwd = document.getElementById("_pwd");

function check_pwd() {
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (pattern.test(pass.value)) {
        _pwd.textContent = "";
    } else {
        _pwd.textContent = "Enter correct format! Must contain at least one number, one uppercase and lowercase letter, and at least 8 characters";
        _submit.disabled = true;

    }
}


function check_name() {
    const regex = /^[A-Za-z\s-]+$/;

    if (regex.test(fname.value)) {
        $name.textContent = "";
    } else {
        $name.textContent = "Enter correct format";
        _submit.disabled = true;

    }
}

function check_email() {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (regex.test(email.value)) {
        _email.textContent = "";
    } else {
        _email.textContent = "Please enter a valid email address (e.g., name@example.com).";
        _submit.disabled = true;

    }
}


//Tables
var fname = document.getElementById("fname");
var email = document.getElementById("email");
var phone = document.getElementById("phone");
var male = document.getElementById("male");
var female = document.getElementById("female");
var others = document.getElementById("others");
var education = document.getElementById("grade");

let editIndex = null;


myForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const currentName = fname.value;
    const currentEmail = email.value;
    const currentEducation = grade.value;
    const currentGender = male.checked ? "Male" : female.checked ? "Female" : "Others";

    const storedData = JSON.parse(localStorage.getItem("formData")) || [];

    if (editIndex !== null) {
        storedData[editIndex] = {
            fname: fname.value,
            email: email.value,
            education: grade.value,
            gender: currentGender
        }

        const tableRow = document.getElementById("dataTable").rows[editIndex + 1];
        tableRow.cells[0].textContent = fname.value;
        tableRow.cells[1].textContent = email.value;
        tableRow.cells[2].textContent = grade.value;
        tableRow.cells[3].textContent = currentGender;

        editIndex = null;
        _submit.innerText = "Submit";
    }

    else {
        storedData.push({
            fname: currentName,
            email: currentEmail,
            education: currentEducation,
            gender: currentGender
        });

        addRowToTable(currentName, currentEmail, currentEducation, currentGender);

    }

    localStorage.setItem("formData", JSON.stringify(storedData)); //permanently stored
    console.log("Data being saved:", storedData);

    myForm.reset();

});

//only displays data, does not store anything
function addRowToTable(fnameValue, emailValue, educationValue, genderValue) {
    const tableBody = document.getElementById("dataTable").querySelector("tbody");
    const newRow = tableBody.insertRow();
    newRow.insertCell(0).textContent = fnameValue;
    newRow.insertCell(1).textContent = emailValue;
    newRow.insertCell(2).textContent = educationValue;
    newRow.insertCell(3).textContent = genderValue;

    //edit button
    const actionButtons = newRow.insertCell(4);
    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    actionButtons.append(editButton);

    editButton.onclick = function () {
        editbtn(this);
        updateButton();
    }

    //delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    actionButtons.append(deleteButton);

    deleteButton.onclick = function () {
        deletebtn(this);
    }



}

//update function

function updateButton() {

    if (allFilled() && checkbox.checked) {
        _submit.disabled = false;
        _submit.innerText = "Update";

    } else {
        _submit.disabled = true;
        _submit.innerText = "Submit";
    }



    checkbox.addEventListener("change", updateButton);

    fname.addEventListener("input", updateButton);
    email.addEventListener("input", updateButton);
    grade.addEventListener("input", updateButton);


}


//page refresh
window.addEventListener("beforeunload", function (e) {

    if (fname.value || email.value || grade.value || male.checked || female.checked || others.checked) {
        e.preventDefault();
    }
})



//edit function
function editbtn(button) {
    const row = button.parentElement.parentElement;
    editIndex = row.rowIndex - 1;

    fname.value = row.cells[0].textContent;
    email.value = row.cells[1].textContent;
    grade.value = row.cells[2].textContent;
    const _gender = row.cells[3].textContent;

    if (_gender === "Male") {
        male.checked = true;
    }
    else if (_gender === "Female") {
        female.checked = true;
    }
    else if (_gender === "Others") {
        others.checked = true;
    }


}


//delete function
function deletebtn(button) {
    const row = button.parentElement.parentElement;
    const rowIndex = row.rowIndex - 1;


    let confirmation = confirm("Are you sure want to delete?");
    if (confirmation) {
        let users = JSON.parse(localStorage.getItem("formData")) || [];
        users.splice(rowIndex, 1);
        localStorage.setItem("formData", JSON.stringify(users));
        document.getElementById("dataTable").deleteRow(row.rowIndex);
    }
    else {
        return;
    }


}


//Default Data

const defaultData = [
    {
        fname: "John Doe",
        email: "john@example.com",
        education: "Graduate",
        gender: "Male"

    },
    {
        fname: "Jane Smith",
        email: "jane@example.com",
        education: "Post Graduate",
        gender: "Female"
    },
    {
        fname: "Alex Brown",
        email: "alex@example.com",
        education: "Senior Secondary(12th)",
        gender: "Others"
    }
];


window.addEventListener("DOMContentLoaded", function () {

    // Check if data already exists
    let storedData = JSON.parse(localStorage.getItem("formData"));

    if (storedData === null) {
        localStorage.setItem("formData", JSON.stringify(defaultData));
        storedData = defaultData;
    }

    storedData.forEach((item) => {
        addRowToTable(item.fname, item.email, item.education, item.gender);
    });

});

//localStorage.clear();




