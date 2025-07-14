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
    // { name: 'Ashreek', sId: '1001', email: 'ashreek@example.com', phone: '9876543210' },
    // { name: 'Akash', sId: '1002', email: 'akash@example.com', phone: '9876543211' },
    // { name: 'Sagar', sId: '1003', email: 'sagar@example.com', phone: '9876543212' },
    // { name: 'Pranay', sId: '1004', email: 'pranay@example.com', phone: '9876543213' },
    // { name: 'Parikshith', sId: '1005', email: 'parikshith@example.com', phone: '9876543214' },
    // { name: 'Ruchith', sId: '1006', email: 'ruchith@example.com', phone: '9876543215' },
    // { name: 'Srujan', sId: '1007', email: 'srujan@example.com', phone: '9876543216' },
    // { name: 'Chinmay', sId: '1008', email: 'chinmay@example.com', phone: '9876543217' },
    // { name: 'Sweekruthi', sId: '1009', email: 'sweekruthi@example.com', phone: '9843217765' },
    // { name: 'Anushka', sId: '1010', email: 'anu@example.com', phone: '9651877432' },
    // { name: 'Soochana', sId: '1011', email: 'soochana@example.com', phone: '9321784765' },
    // { name: 'Suhani', sId: '1012', email: 'suhani@example.com', phone: '9543286177' },
    // { name: 'Sivani', sId: '1013', email: 'shivani@example.com', phone: '9547213867' }
];

// Common fucntion to render the table after every add, update, delete action
const renderTable = (StudentsList) => {

    // This is important because without this same data will be rendered multiple times
    tableInsetBaseConatiner.innerHTML = '';

    // Sorting students by Student ID nuber before rendering
    StudentsList.sort(function (sid1, sid2) {
        return Number(sid1.sId - sid2.sId);
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
    if (Students.length == 0) {
        tableInsetBaseConatiner.innerHTML = `<tr class='py-4 text-center text-gray-400'>
        <td class="px-6 py-20 " colspan="6">No data available as of now, please add students data through form.</td>
        </tr>`;
    }
}

// As this is the first render of table so it will se SID to 1 in value by default before rendering
sidInput.value = `${1000 + Students.length + 1}`;
// first time rendering
renderTable(Students);

// After either click on register or update the data will be available here.
const getStudentData = (event) => {
    // since we are not doing normal form action so this line is important to prevent deafult form behaviour
    event.preventDefault();

    //  Id match feature
    // After evry data addition if ID comes out ti be same as other student it will ask again to submit.
    let idMatch = false;


    // Validating input values thorugh regex.text
    if (sidInput.value < 1001) {
        alert('Invalid SID. SID starts from 1001');
        return;
    }

    // Phone number should have only 10 digits and are numbers
    if (!/^\d{10}$/.test(phInput.value)) {
        alert(`Phone number must be exactly 10 digits. Your phone number have ${phInput.value.length} numbers.
${phInput.value.length < 10 ? 'You might have forget some numbers as entered number is less than 10':'You added extra numbers as numbers is more than 10'}`);
        return;
    }

    // Email should have @ and . in proper space
    if (!/^\S+@\S+\.\S+$/.test(emailInput.value)) {
        alert(`Please enter a valid email id. Email id should look something like this raj123@mail.com`);
        return;
    }

    // name should be only have ABCDabcd charcters and white spaces
    if (!/^[A-Za-z\s]+$/.test(nameInput.value)) {
        alert(`Name is invalid.Name should have only letters and spaces.`);
        return;
    }

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
    sidInput.value = `${1000 + Students.length + 1}`;
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
        if (nameInput.value !== '' || emailInput.value !== '' || phInput.value !== '') {
            alert(`Please submit before performing another delete operation.`);
            return;
        }
        let deletedName;
        let deletedSid;
        Students.forEach((student) => {
            if (student.sId == toDelete.firstChild.innerText) {
                deletedName = student.name;
                deletedSid = student.sId;
                Students.splice(Students.indexOf(student), 1);
            }
        })
        sidInput.value = deletedSid;
        renderTable(Students);
        // alert about deletion of student's data
        alert(`${deletedName}'s data deleted sucesfully`)
    }

    // making sure we clicked on update
    if (event.target.alt == 'Update') {
        if (nameInput.value !== '' || emailInput.value !== '' || phInput.value !== '') {
            alert(`Please submit before performing another update operation.`);
            return;
        }
        Students.forEach((student) => {
            if (student.sId == toDelete.firstChild.innerText) {
                // making sure the data is available in the form again
                nameInput.value = student.name;
                sidInput.value = student.sId;
                emailInput.value = student.email;
                phInput.value = student.phone;
                alert(`Scroll up or click on home button to update these data 
name: ${student.name} SID: ${student.sId} Email: ${student.email}. Phone Number: ${student.phone}`);
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