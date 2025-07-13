// Selected all elemnts
let nameInput = document.querySelector('#nameInput');
let sidInput = document.querySelector('#sidInput');
let emailInput = document.querySelector('#emailInput');
let phInput = document.querySelector('#phInput');
let registerBtn = document.querySelector('.registerBtn');
let registerForm = document.querySelector('#registerForm');
let goHomeBtn = document.querySelector('#goHomeBtn');

let tableInsetBaseConatiner = document.querySelector('#tableInsetBaseConatiner');

// Created an empty array of objects
// Included test objects and are commented out
// Object looks something like {name:,sId:,email:,phone}
const Students = [
    // { name: 'Ashreek', sId: 'SID1', email: 'ashreek@example.com', phone: '9876543210' },
    // { name: 'Akash', sId: 'SID2', email: 'akash@example.com', phone: '9876543211' },
    // { name: 'Sagar', sId: 'SID3', email: 'sagar@example.com', phone: '9876543212' },
    // { name: 'Pranay', sId: 'SID4', email: 'pranay@example.com', phone: '9876543213' },
    // { name: 'Parikshith', sId: 'SID5', email: 'parikshith@example.com', phone: '9876543214' },
    // { name: 'Ruchith', sId: 'SID6', email: 'ruchith@example.com', phone: '9876543215' },
    // { name: 'Srujan', sId: 'SID7', email: 'srujan@example.com', phone: '9876543216' },
    // { name: 'Chinmay', sId: 'SID8', email: 'chinmay@example.com', phone: '9876543217' },
    // { name: 'Chinmay', sId: 'SID9', email: 'chinmay@example.com', phone: '9876543217' },
    // { name: 'Chinmay', sId: 'SID10', email: 'chinmay@example.com', phone: '9876543217' },
    // { name: 'Chinmay', sId: 'SID11', email: 'chinmay@example.com', phone: '9876543217' }
];

// Common fucntion to render the table after every add, update, delete action
const renderTable = (StudentsList) => {

    // This is important because without this same data will be rendered multiple times
    tableInsetBaseConatiner.innerHTML = '';

    // Sorting students by Student ID nuber before rendering
    StudentsList.sort(function (sid1, sid2) {
        return Number(sid1.sId.slice(3) - sid2.sId.slice(3));
    });

    StudentsList.map((student) => {
        let { name, sId, email, phone } = student;
        let newRow = document.createElement('tr');
        newRow.classList.add('bg-white', 'border-b', 'dark:bg-gray-800', 'dark:border-gray-700', 'border-gray-200', 'hover:bg-amber-100');
        newRow.innerHTML = `<th scope="row"
                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                                ${sId}
                            </th>
                            <td class="px-6 py-4">
                                ${name}
                            </td>
                            <td class="px-6 py-4  ">
                                ${email}
                            </td>
                            <td class="px-6 py-4 ">
                               ${phone}
                            </td>
                            <td class="px-6 py-4  ">
                                <img src="../components/refresh.png" alt="Update" class="h-[30px] w-[30px] rounded-2xl shadow-xl active:scale-75 cursor-pointer updateButton">
                            </td>
                            <td class="px-6 py-4 ">
                                <img src="../components/bin.png" alt="Delete" class="h-[30px] w-[30px] rounded-2xl shadow-xl active:scale-75 cursor-pointer deleteButton">
                            </td>`;

        // appendig the table to base container that is tbody
        tableInsetBaseConatiner.appendChild(newRow);
    })
}

// As this is the first render of table so it will se SID to 1 in value by default before rendering
sidInput.value = `SID${Students.length + 1}`;
// first time rendering
renderTable(Students);

// After either click on register or update the data will be available here.
const getStudentData = (event) => {
    // since we are not doing normal form action so this line is important to prevent deafult form behaviour
    event.preventDefault();

    //  Id match feature
    // After evry data addition if ID comes out ti be same as other student it will ask again to submit.
    let idMatch = false;
    Students.forEach((student) => {
        if (student.sId == sidInput.value) {
            alert(`Student ID should be unique. This SID is already in the data base. Any SID above ${Students[Students.length - 1].sId} will be accepted`)
            idMatch = true;
            return;
        }
    });

    if (idMatch == true) {
        return;
    }
    // ID match feature ends

    // creating a new object of student
    const student = {
        name: nameInput.value,
        sId: sidInput.value,
        email: emailInput.value,
        phone: phInput.value
    };

    // Making sure that every part is filled
    if (nameInput.value == '' || sidInput.value == '' || emailInput.value == '' || phInput.value == '') {
        alert('Please fill all fields before submittig');
        return;
    }

    // adding the student object to front of the Students array.
    Students.unshift(student);

    // Making sure form is cleared except SID
    nameInput.value = '';
    sidInput.value = `SID00${Students.length + 1}`;
    emailInput.value = '';
    phInput.value = '';

    // Alerting the user about updation or addition of data
    if (registerBtn.value == 'Update') {
        // goHomeBtn.class=['font-extrabold', 'text-[10px]', 'h-10', 'w-10', 'p-2', 'bg-amber-400', 'rounded-full', 'flex', 'items-center', 'justify-center', 'fixed', 'top-[90vh]', 'right-[5vw]', 'z-10', 'hover:scale-125', 'transition-all', 'ease-in-out'];
        alert(`${Students[0].name}'s data updated sucessfully.
Now you can scroll down to view changes at Student ID ${Students[0].sId}.`);
    }

    if (registerBtn.value == 'Register') {
        alert(`${Students[0].name}'s data added sucessfully.
Now you can scroll down to view changes at Student ID ${Students[0].sId}.`)
    }

    // Simple code to toggle between update and register in a single button done using below 2 if statements
    registerBtn.value = 'Register';

    // rendering table after every operation
    renderTable(Students);
}

// EventListener to register or update operatios
registerBtn.addEventListener('click', getStudentData);

// Function handles deletionor upadtion
const deleteOrUpdateDataFromTable = (event) => {
    // as event gives the button which is an img so img.parentElement is a td so div.parentElement is actually tr. tr is wheere whole ddata of single user is.
    let toDelete = event.target.parentElement.parentElement;

    // making sure we clicked on delete
    if (event.target.alt == 'Delete') {
        let deletedName;
        Students.forEach((student) => {
            if (student.sId == toDelete.firstChild.innerText) {
                deletedName = student.name;
                Students.splice(Students.indexOf(student), 1);
            }
        })
        renderTable(Students);
        // alert about deletion of student's data
        alert(`${deletedName}'s data deleted sucesfully`)
    }

    // making sure we clicked on update
    if (event.target.alt == 'Update') {
        Students.forEach((student) => {
            if (student.sId == toDelete.firstChild.innerText) {
                // making sure the data is available in the form again
                nameInput.value = student.name;
                sidInput.value = student.sId;
                emailInput.value = student.email;
                phInput.value = student.phone;
                registerBtn.value = 'Update';

                // home button will tell to go home to update
                // goHomeBtn.classList.add('animate-bounce');

                Students.splice(Students.indexOf(student), 1);
            }
        })
        renderTable(Students);
    }

}

// this event listner is added to tbody where we are only extracting particularly from update or delete button
tableInsetBaseConatiner.addEventListener('click', deleteOrUpdateDataFromTable); 