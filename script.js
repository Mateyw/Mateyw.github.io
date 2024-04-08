const addBookBtn = document.querySelector('#add-book-btn');
const librarySection = document.querySelector('.library');
const cardBoxEl = document.querySelector('.card-box');
const cardXEl = document.querySelector('.card-x');

//object array
// const myLibrary = [];


const createDialogForm = () => {


    const existingDialog = document.querySelector('.dialog');

    if (!existingDialog) {

        const dialogEl = document.createElement('dialog');
        dialogEl.classList.add('dialog');
        dialogEl.setAttribute('open', '');

        const formEl = document.createElement('form');
        formEl.classList.add('form');
        formEl.setAttribute('action', '#');

        const fieldsetEl = document.createElement('fieldset');
        fieldsetEl.classList.add('fieldset');

        const legendRowEl = document.createElement('div');
        legendRowEl.classList.add('legend-row');

        const legendEl = document.createElement('legend');
        legendEl.textContent = 'Add New Book';

        const buttonXEl = document.createElement('button');
        buttonXEl.classList.add('X');
        buttonXEl.textContent = 'X';

        const formRowTitleEl = document.createElement('div');
        formRowTitleEl.classList.add('form-row');

        const labelTitleEl = document.createElement('label');
        labelTitleEl.setAttribute('for', 'title');
        labelTitleEl.textContent = 'Title?';

        const inputTitleEl = document.createElement('input');
        inputTitleEl.setAttribute('type', 'text');
        inputTitleEl.setAttribute('name', 'title');
        inputTitleEl.setAttribute('id', 'title');

        const formRowAuthorEl = document.createElement('div');
        formRowAuthorEl.classList.add('form-row');

        const labelAuthorEl = document.createElement('label');
        labelAuthorEl.setAttribute('for', 'author');
        labelAuthorEl.textContent = 'Author?';

        const inputAuthorEl = document.createElement('input');
        inputAuthorEl.setAttribute('type', 'text');
        inputAuthorEl.setAttribute('name', 'author');
        inputAuthorEl.setAttribute('id', 'author');

        const formRowPagesEl = document.createElement('div');
        formRowPagesEl.classList.add('form-row');

        const labelPagesEl = document.createElement('label');
        labelPagesEl.setAttribute('for', 'pages');
        labelPagesEl.textContent = 'Pages?';

        const inputPagesEl = document.createElement('input');
        inputPagesEl.setAttribute('type', 'number');
        inputPagesEl.setAttribute('name', 'pages');
        inputPagesEl.setAttribute('id', 'pages');

        const formRowStatusEl = document.createElement('div');
        formRowStatusEl.classList.add('form-row', 'status');

        const labelReadStatusEl = document.createElement('label');
        labelReadStatusEl.setAttribute('for', 'read-status');
        labelReadStatusEl.textContent = 'Already Read?';

        const inputReadStatusEl = document.createElement('input');
        inputReadStatusEl.setAttribute('type', 'checkbox');
        inputReadStatusEl.setAttribute('name', 'read-status');
        inputReadStatusEl.setAttribute('id', 'read-status');

        const addButtonEl = document.createElement('button');
        addButtonEl.setAttribute('id', 'add');
        addButtonEl.textContent = 'Add';


        // Append elements to their respective parents
        dialogEl.appendChild(formEl);
        formEl.appendChild(fieldsetEl);

        fieldsetEl.appendChild(legendRowEl);
        legendRowEl.appendChild(legendEl);
        legendRowEl.appendChild(buttonXEl);

        fieldsetEl.appendChild(formRowTitleEl);
        formRowTitleEl.appendChild(labelTitleEl);
        formRowTitleEl.appendChild(inputTitleEl);

        fieldsetEl.appendChild(formRowAuthorEl);
        formRowAuthorEl.appendChild(labelAuthorEl);
        formRowAuthorEl.appendChild(inputAuthorEl);

        fieldsetEl.appendChild(formRowPagesEl);
        formRowPagesEl.appendChild(labelPagesEl);
        formRowPagesEl.appendChild(inputPagesEl);

        fieldsetEl.appendChild(formRowStatusEl);
        formRowStatusEl.appendChild(labelReadStatusEl);
        formRowStatusEl.appendChild(inputReadStatusEl);

        fieldsetEl.appendChild(addButtonEl);

        // append the dialog to the library section
        librarySection.appendChild(dialogEl);

        // Add event listener to the "Add" button to prevent default form submission
        addButtonEl.addEventListener('click', event => {
            event.preventDefault();
            createBookCard();
            dialogEl.remove();
        });

        
    }

}


// Call the createDialogForm function when the Add Book button is clicked
addBookBtn.addEventListener('click', createDialogForm);


librarySection.addEventListener('click', (event) => {
    if (event.target.classList.contains('X')) {
        const dialogEl = event.target.closest('.dialog');
        if (dialogEl) {
            dialogEl.remove();
        }
    }
});


librarySection.addEventListener('click', (event) => {
    if (event.target.classList.contains('card-x')) {
        const cardEl = event.target.closest('.card');
        if (cardEl) {
            cardEl.remove();
        }
    }
});


const createBookCard = () => {

    // Retrieve form data
    const inputTitleEl = document.querySelector('#title');
    const inputAuthorEl = document.querySelector('#author');
    const inputPagesEl = document.querySelector('#pages');
    const inputReadStatusEl = document.querySelector('#read-status');



    const cardEl = document.createElement('div');
    cardEl.classList.add('card');

    const buttonCardXEl = document.createElement('button');
    buttonCardXEl.classList.add('card-x');
    buttonCardXEl.textContent = 'x';

    const pTitleEl = document.createElement('p');
    pTitleEl.classList.add('title');
    pTitleEl.textContent = 'Title: ';

    const spanTitleNameEl = document.createElement('span');
    spanTitleNameEl.classList.add('title-name');
    spanTitleNameEl.textContent = inputTitleEl.value;

    const pAuthorEl = document.createElement('p');
    pAuthorEl.classList.add('author');
    pAuthorEl.innerHTML = `Author: ${inputAuthorEl.value}`;
    

    const pPagesEl = document.createElement('p');
    pPagesEl.classList.add('pages');
    pPagesEl.innerHTML = `Pages: ${inputPagesEl.value}`;

    const statusRowEl = document.createElement('div');
    statusRowEl.classList.add('status-row');

    const pReadStatusEl = document.createElement('p');
    pReadStatusEl.classList.add('read-status');
    pReadStatusEl.innerHTML = `Status: ${inputReadStatusEl.checked ? 'Read' : 'Unread'}`;

    const toggleBtnEl = document.createElement('button');
    toggleBtnEl.classList.add('toggle-btn');
    toggleBtnEl.textContent = 'Toggle';

    toggleBtnEl.addEventListener('click', () => {
        // Toggle the checked state of the checkbox
        inputReadStatusEl.checked = !inputReadStatusEl.checked;
    
        // Update the text content of pReadStatusEl based on the state of the checkbox
        pReadStatusEl.textContent = inputReadStatusEl.checked ? 'Status: Read' : 'Status: Unread';
    });
    


    // Append elements to their respective parents
    cardEl.appendChild(buttonCardXEl);
    cardEl.appendChild(pTitleEl);
    pTitleEl.appendChild(spanTitleNameEl);
    cardEl.appendChild(pAuthorEl);
    cardEl.appendChild(pPagesEl);
    cardEl.appendChild(statusRowEl);
    statusRowEl.appendChild(pReadStatusEl);
    statusRowEl.appendChild(toggleBtnEl);

    // append the card to the card-box parent element
    cardBoxEl.appendChild(cardEl);




}


cardXEl.addEventListener('click', (event) => 
{
    event.target.closest('.card').remove(); 
});


const toggleButton = document.querySelector('.toggle-btn');



// Attach the click event listener to the library section
librarySection.addEventListener('click', (event) => {
    // Check if the clicked element or its ancestor has the class 'toggle-btn'
    if (event.target.classList.contains('toggle-btn') || event.target.closest('.toggle-btn')) {
        // Find the closest '.card' element from the clicked button
        const card = event.target.closest('.card');
        // Find the '.read-status' element within the same card
        const pReadStatus = card.querySelector('.read-status');

        // Toggle the text content of 'pReadStatus' based on its current value
        if (pReadStatus.textContent === 'Status: Read') {
            pReadStatus.textContent = 'Status: Unread';
        } else {
            pReadStatus.textContent = 'Status: Read';
        }
    }
});





