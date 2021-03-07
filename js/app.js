// global variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector('.grid-container');
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const modalNext = document.querySelector(".modal-next");
const modalBack = document.querySelector(".modal-back");
let index;
let employeeNames; 

// fetch data from API
fetch(urlAPI)
.then(res => res.json())
.then(res => res.results)
.then(displayEmployees)
.catch(err => console.log(err))

function displayEmployees(employeeData) {
    employees = employeeData;
    // store the employee HTML as we create it
    let employeeHTML = '';
    // loop through each employee and create HTML markup
    employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;
    // template literals make this so much cleaner!

    employeeHTML += `
    <div class="card" data-index="${index}">
        <img class="avatar" src="${picture.large}" />
            <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            </div>
    </div>
    `
    });
    gridContainer.innerHTML = employeeHTML;
    }

function displayModal(index) {
    // use object destructuring make our template literal cleaner
    let { name, dob, phone, email, location: { city, street, state, postcode
    }, picture } = employees[index];
    let date = new Date(dob.date);
    const modalHTML = `
    <img class="avatar" src="${picture.large}" />
    <div class="text-container">
    <h2 class="name">${name.first} ${name.last}</h2>
    <p class="email">${email}</p>
    <p class="address">${city}</p>
    <hr />
    <p>${phone}</p>
    <p class="address">${street}, ${state} ${postcode}</p>
    <p>Birthday:
    ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
    `;
    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
    }

gridContainer.addEventListener('click', e => {
    // make sure the click is not on the gridContainer itself
    if (e.target !== gridContainer) {
    // select the card element based on its proximity to actual element
    //clicked
    const card = e.target.closest(".card");
    const index = card.getAttribute('data-index');
    displayModal(index);
    }
    });
    
        
modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
    });

modalNext.addEventListener('click', () => {
    if (index <= 12) {
        index++;
    } else {
        index = 0;
    }
    displayModal(index);
});

modalBack.addEventListener('click', () => {
    if (index >= 1) {
        index--;
    } else {
        index = 11;
    }
    displayModal(index);
});




const searchInput = document.querySelector('#searchBar');
const employeesCard = document.querySelectorAll('.card');
const employeesName = document.querySelector('.card h2');

searchInput.addEventListener('keyup', () => {
    const user = searchInput.value.toUpperCase();
    for (let i = 0; employeesCard.length; i++) {
      const name = employeesName.textContent;
    
        if(name.toUpperCase().indexOf(user) > -1) {
            employeesCard[i].style.display = "";
        } else {
            employeesCard[i].style.display = 'none';
        }
    }
});



// // Search Bar Func
// const searchInput = document.querySelector('#searchBar');
// const employeesName = document.querySelector('.card h2');

// searchInput.addEventListener('keyup', (e) => {
//     const employeesCard = document.querySelectorAll('.card');
//     const user = searchInput.value;
   
    
// employeesCard.forEach(employeeCard => {
//     let employeeName = document.querySelectorAll('.name');
//         if (employeeName.textContent.includes(user)) {
//             employeeCard.getElementsByClassName.display = '';
//         } else {
//             employeeCard.getElementsByClassName.display = 'none';
//         }
//     })
// })