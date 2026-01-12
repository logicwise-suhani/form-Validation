//Default Data
const defaultData = [
    {
        newFirstName: "John Doe",
        newEmail: "john@example.com",
        newGrade: "Graduate",
        newCgpa: 8,
        gender: "Male",
        password: "As111444",
        phone_number: "9876543210"

    },
    {
        newFirstName: "Jane Smith",
        newEmail: "jane@example.com",
        newGrade: "Post Graduate",
        newCgpa: 9,
        gender: "Female",
        password: "As111111",
        phone_number: "4578961023"
    },
    {
        newFirstName: "Alex Brown",
        newEmail: "alex@example.com",
        newGrade: "Senior Secondary(12th)",
        newCgpa: 7,
        gender: "Others",
        password: "As000000",
        phone_number: "8941257630"
    }
];
let editIndex = null;
let storedData = [];
const newFirstName = document.getElementById("fname");
const newEmail = document.getElementById("email");
const newPass = document.getElementById("pwd");
const newConfirmPass = document.getElementById("con-pwd");
const newPhone = document.getElementById("phone");
const newGrade = document.getElementById("grade");
const newCgpa = document.getElementById("_cgpa");
const newMale = document.getElementById("male");
const newFemale = document.getElementById("female");
const newOthers = document.getElementById("others");
const newAgree = document.getElementById("yes");
let numb = document.getElementById("numb");


//span message
var message = document.getElementById("message");
var _message = document.getElementById("_message");
var _cgpaValue = document.getElementById("cgpaValue");
var myForm = document.getElementById("myForm");

//submit functions
var _submit = document.getElementById("submit-btn");

let isValidatedFormInputs = {
    fname: false,
    email: false,
    pwd: false,
    "con-pwd": false,
    phone: false,
    grade: false,
    _cgpa: false,
    gender: {
        male: false,
        female: false,
        others: false
    },
    yes: false
}

function allFilled(inputName, isValid, group) {
    if (group) {
        isValidatedFormInputs = {
            ...isValidatedFormInputs,
            [group]: {
                ...isValidatedFormInputs[group],
                [inputName]: isValid
            }
        };
    } else {
        isValidatedFormInputs = {
            ...isValidatedFormInputs,
            [inputName]: isValid
        };
    }

    checkFormValidity();
}

function checkFormValidity() {

    const isValid = Object.entries(isValidatedFormInputs).every(
        ([key, value]) => {
            // handle nested gender object
            if (key === "gender") {
                return Object.values(value).some(Boolean);
            }

            // all other fields must be true
            return value === true;
        }

    );
    console.log('isValid :>> ', isValid, isValidatedFormInputs);
    _submit.disabled = !isValid;


}

newFirstName.onchange = function () {
    nameFn()
}


newEmail.onchange = function () {
    emailFn()
}

newPass.onchange = function () {
    passFn()
}

newConfirmPass.onchange = function () {
    confirmPassFn()
}

newPhone.onchange = function () {
    phoneFn()
}

newGrade.onchange = function () {
    gradeFn()
}


newCgpa.onchange = function () {
    cgpaFn()
}

newMale.onchange = function () {
    maleFn()
}

newFemale.onchange = function () {
    femaleFn()
}

newOthers.onchange = function () {
    othersFn()
}

newAgree.onchange = function () {
    agreeFn()
}

//Regex
const nameFn = () => {
    const regex = /^[A-Za-z\s-]+$/;

    if (regex.test(newFirstName.value.trim())) {
        allFilled('fname', true)
        $name.textContent = "";
    } else {
        $name.textContent = "Enter correct format";
        allFilled('fname', false)
    }
}

const emailFn = () => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regex.test(newEmail.value)) {
        _email.textContent = "";
        allFilled('email', true)

    } else {
        allFilled('email', false)
        _email.textContent = "Please enter a valid email address (e.g., name@example.com).";

    }
}

const passFn = () => {
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (pattern.test(newPass.value)) {
        _pwd.textContent = "";
        allFilled('pwd', true)

    } else {
        allFilled('pwd', false)
        _pwd.textContent = "Enter correct format! Must contain at least one number, one uppercase and lowercase letter, and at least 8 characters";
    }
}

const confirmPassFn = () => {
    if (newConfirmPass.value === newPass.value) {
        message.innerHTML = "Good to go";
        allFilled('con-pwd', true)
    }
    else {
        allFilled('con-pwd', false)
        message.innerHTML = "Confirm again!";
    }
}

const phoneFn = () => {
    const pattern = /^[0-9]{5}[0-9]{5}$/;

    if (pattern.test(newPhone.value)) {
        allFilled('phone', true)
        numb.textContent = "";
    } else {
        numb.textContent = "Only digits in format 0123456789";
        allFilled('phone', false)
    }
}

const gradeFn = () => {
    if (newGrade.value === "") {
        allFilled('grade', false)
    } else {
        allFilled('grade', true)

    }
}

const cgpaFn = () => {
    allFilled('_cgpa', true)
    _cgpaValue.textContent = newCgpa.value;
}

const maleFn = () => {
    if (newMale.checked) {
        allFilled('male', true, "gender")
        allFilled("female", false, "gender",);
        allFilled("others", false, "gender",);
    }
}

const femaleFn = () => {
    if (newFemale.checked) {
        allFilled('male', false, "gender")
        allFilled("female", true, "gender",);
        allFilled("others", false, "gender",);
    }
}

const othersFn = () => {
    if (newOthers.checked) {
        allFilled('male', false, "gender")
        allFilled("female", false, "gender",);
        allFilled("others", true, "gender",);
    }
}

const agreeFn = () => {
    if (!newAgree.checked) {
        _message.innerHTML = "Check I Agree!";
        allFilled('yes', false)
        return false;

    } else {
        _message.innerHTML = "";
        allFilled('yes', true)

        return true;
    }
}


//clear functions
function clearFunction() {
    newFirstName.value = "";
    newEmail.value = "";
    newPhone.value = "";
    newPass.value = "";
    newConfirmPass.value = "";
    newGrade.value = "";
    newMale.checked = false;
    newFemale.checked = false;
    newOthers.checked = false;
    newAgree.checked = false;
    message.innerHTML = "";
    _message.innerHTML = ""
    default_cgpa();
}


function default_cgpa() {
    _cgpa.value = 0;
    _cgpaValue.textContent = 0;
}


//Button submit
myForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const currentName = newFirstName.value;
    const currentEmail = newEmail.value;
    const currentEducation = newGrade.value;
    const currentGender = newMale.checked ? "Male" : newFemale.checked ? "Female" : "Others";
    const currentpass = newPass.value;
    const currentphone = newPhone.value;
    const currentcgpa = newCgpa.value;

    const storedData = JSON.parse(localStorage.getItem("formData")) || [];

    if (editIndex !== null) {
        storedData[editIndex] = {
            newFirstName: newFirstName.value,
            newEmail: newEmail.value,
            newGrade: newGrade.value,
            gender: currentGender,
            password: currentpass,
            phone_number: currentphone,
            newCgpa: currentcgpa
        }

        const tableRow = document.getElementById("dataTable").rows[editIndex + 1];
        tableRow.cells[0].textContent = newFirstName.value;
        tableRow.cells[1].textContent = newEmail.value;
        tableRow.cells[2].textContent = newGrade.value;
        tableRow.cells[3].textContent = newCgpa.value;
        tableRow.cells[4].textContent = currentGender;
        tableRow.cells[5].textContent = hidden_password(newPass.value);
        tableRow.cells[5].dataset.realPassword = newPass.value;
        tableRow.cells[6].textContent = newPhone.value;


        editIndex = null;
        _submit.innerText = "Submit";
    }

    else {
        storedData.push({
            newFirstName: currentName,
            newEmail: currentEmail,
            newGrade: currentEducation,
            newCgpa: currentcgpa,
            gender: currentGender,
            password: currentpass,
            phone_number: currentphone

        });

        addRowToTable(currentName, currentEmail, currentEducation, currentcgpa, currentGender, currentpass, currentphone);

    }

    localStorage.setItem("formData", JSON.stringify(storedData)); //permanently stored
    renderTable(storedData);
    console.log("Data being saved:", storedData);

    myForm.reset();
    default_cgpa();

});

//only displays data, does not store anything
function addRowToTable(fnameValue, emailValue, educationValue, CgpaValue, genderValue, passValue, phoneValue) {
    const tableBody = document.getElementById("dataTable").querySelector("tbody");
    const newRow = tableBody.insertRow();
    newRow.insertCell(0).textContent = fnameValue;
    newRow.insertCell(1).textContent = emailValue;
    newRow.insertCell(2).textContent = educationValue;
    newRow.insertCell(3).textContent = CgpaValue;
    newRow.insertCell(4).textContent = genderValue;
    const passwordCell = newRow.insertCell(5);
    passwordCell.textContent = hidden_password(passValue);
    passwordCell.dataset.realPassword = passValue;
    newRow.insertCell(6).textContent = phoneValue;


    //edit button
    const actionButtons = newRow.insertCell(7);
    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    actionButtons.append(editButton);

    editButton.onclick = function () {
        editbtn(this);

    }

    //delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    actionButtons.append(deleteButton);

    deleteButton.onclick = function () {
        deletebtn(this);
    }



}


//edit function
function editbtn(button) {
    const row = button.parentElement.parentElement;
    editIndex = row.rowIndex - 1;

    newFirstName.value = row.cells[0].textContent;

    newEmail.value = row.cells[1].textContent;
    newGrade.value = row.cells[2].textContent;
    newCgpa.value = row.cells[3].textContent;
    _cgpaValue.textContent = row.cells[3].textContent;
    const _gender = row.cells[4].textContent;
    newPass.value = row.cells[5].dataset.realPassword;
    newPhone.value = row.cells[6].textContent;

    if (_gender === "Male") {
        newMale.checked = true;
    }
    else if (_gender === "Female") {
        newFemale.checked = true;
    }
    else if (_gender === "Others") {
        newOthers.checked = true;
    }
    _submit.innerText = "Update";
    nameFn()
    emailFn()
    passFn()
    confirmPassFn()
    phoneFn()
    gradeFn()
    cgpaFn()
    maleFn()
    femaleFn()
    othersFn()
    agreeFn()

    //page refresh
    window.addEventListener("beforeunload", function (e) {
        e.preventDefault();
    })
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

//hidden password in default data

const hidden_password = (password) => {
    return "*".repeat(password.toString().length);
};

//debounce
function debounce(fn, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

//Search Filter
let searchInput = document.getElementById("searchInput");


const debouncedSearch = debounce(function () {
    const searchValue = this.value.toLowerCase();
    filterData(searchValue);
},);

searchInput.addEventListener("input", debouncedSearch);

function filterData(keyword) {
    if (keyword === "") {
        renderTable(storedData);
        return;
    }

    let filteredUsers = storedData.filter(user => {
        return (
            user.newFirstName.toLowerCase().includes(keyword) ||
            user.newEmail.toLowerCase().includes(keyword) ||
            user.newGrade.toLowerCase().includes(keyword) ||
            user.gender.toLowerCase().includes(keyword) ||
            user.phone_number.includes(keyword)
        );
    });

    renderTable(filteredUsers);
}

function renderTable(dataArray) {
    const tableBody = document
        .getElementById("dataTable")
        .querySelector("tbody");
    tableBody.innerHTML = "";

    dataArray.forEach(item => {
        addRowToTable(
            item.newFirstName,
            item.newEmail,
            item.newGrade,
            item.newCgpa,
            item.gender,
            item.password,
            item.phone_number
        );

    });

}

window.addEventListener("DOMContentLoaded", function () {

    //chek if data alrady exists
    storedData = JSON.parse(localStorage.getItem("formData"));

    if (!storedData || storedData.length === 0) {
        storedData = defaultData;
        localStorage.setItem("formData", JSON.stringify(storedData));
    }

    renderTable(storedData);
});


//localStorage.clear();


