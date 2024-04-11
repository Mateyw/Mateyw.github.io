const titles = ["Software Development Student", "Aspiring Full-Stack Developer"];
let index = 0;
let subIndex = 0;
let currentTitle = "";
let isBackspacing = false;
let caretVisible = true;

const titleElement = document.querySelector('#job-title');

const type = () => {
    const typingSpeed = 10000 / (titles[index].length * 2 + 20); // Adjust this value
    const backspacingSpeed = typingSpeed;

    if (isBackspacing && subIndex > 0) {
        subIndex--;
        currentTitle = currentTitle.substring(0, subIndex);
    } else if (!isBackspacing && subIndex < titles[index].length) {
        currentTitle += titles[index].charAt(subIndex);
        subIndex++;
    }

    titleElement.textContent = currentTitle + (caretVisible ? "|" : ""); // Add caret when typing

    if (!isBackspacing && subIndex === titles[index].length) {
        setTimeout(() => isBackspacing = true, 20 * typingSpeed); // Adjust this value
    } else if (isBackspacing && subIndex === 0) {
        isBackspacing = false;
        index = index < titles.length - 1 ? index + 1 : 0;
    }

    caretVisible = !caretVisible; // Toggle caret visibility
    setTimeout(type, isBackspacing ? backspacingSpeed : typingSpeed);
};

type();


const updateYear = () => {
    let year = document.querySelector("#year");
    let date = new Date();
    year.textContent = date.getFullYear();
}

updateYear();



// Initialize EmailJS with your Public Key
emailjs.init('hGN2zzF4PBDhKge5w');


// Function to send email
const sendEmail = (formData) => {
    // Send email using EmailJS
    emailjs.send('service_08dlxlh', 'template_5fqzhoh', formData)
        .then((response) => {
            console.log('Email sent successfully:', response);
        }, (error) => {
            console.error('Error sending email:', error);
        });
}

// Event listener for form submission
document.getElementById('send-btn').addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default form submission

    let emailEl = document.getElementById('email');
    let messageEl = document.getElementById('message');
    // Get form data
    const formData = {
        from_name: emailEl.value,
        message: messageEl.value
    };

    // Send email
    sendEmail(formData);

    emailEl.value = '';
    messageEl.value = '';

});
