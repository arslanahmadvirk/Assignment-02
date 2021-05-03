window.onload=function(){
    document.getElementById("updating").disabled=true;
    var updatebtn=document.getElementById("updating");
updatebtn.onclick=function(){
    fetching(formData);
}
}

var activerow = null

function Submition() {
    if (validate()) {
        var formData = readFormData();
        if (activerow == null)
            insert_record(formData);
        else
            fetching(formData);    
    }
}

function readFormData() {
    var formData = {};
    formData["fullName"] = document.getElementById("fullName").value;
    formData["gender"] = document.querySelector('input[name="gender"]:checked').value;
    formData["age"] = document.getElementById("age").value;
    formData["city"] = document.getElementById("city").value;
    return formData;
}

function insert_record(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.fullName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.gender;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.age;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.city;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<a onClick="edit(this)">Update</a>
                       <a onClick="Deleting(this)">Remove</a>`;
}

function resetbtn() {
    document.getElementById("updating").disabled=true;
    document.querySelector('input[type="submit"]').disabled=false;
    document.getElementById("fullName").value = "";
    document.getElementById("age").value = "";
    document.getElementById("city").value = "";
    activerow = null;
}

function edit(td) {
    document.getElementById("updating").disabled=false;
    document.querySelector('input[type="submit"]').disabled=true;
    activerow = td.parentElement.parentElement;
    document.getElementById("fullName").value = activerow.cells[0].innerHTML;
    document.getElementById('gender').value = activerow.cells[1].innerHTML;
    document.getElementById("age").value = activerow.cells[2].innerHTML;
    document.getElementById("city").value = activerow.cells[3].innerHTML;
}
function fetching(formData) {
    activerow.cells[0].innerHTML = formData.fullName;
    activerow.cells[1].innerHTML = formData.gender;
    activerow.cells[2].innerHTML = formData.age;
    activerow.cells[3].innerHTML = formData.city;
}

function Deleting(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetbtn();
    }
}
function validate() {
    isValid = true;
    if (document.getElementById("fullName").value == "") {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }
    return isValid;
}
