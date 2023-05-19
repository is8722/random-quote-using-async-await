const submitButton = document.getElementById('button');
const nameInput = document.getElementById('nameInput');
const resultContainer = document.getElementById('results');
const countrySelect = document.getElementById('countrySelect');

button.addEventListener('click', () => {
    const name = nameInput.value;
    const country = countrySelect.value;

    let apiUrl = `https://api.agify.io/?name=${name}`;

    if (country) {
        apiUrl += `&country_id=${country}`;
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const requestContainer = document.createElement('div');
            requestContainer.classList.add('request-container');
            requestContainer.textContent = `${data.name} is estimated to be ${data.age} years old in ${country} and they are ${data.count} in number` ;
            resultContainer.appendChild(requestContainer);
        })
});