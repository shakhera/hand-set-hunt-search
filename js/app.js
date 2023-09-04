const loadPhones = async (searchText, dataLimit) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}
const displayPhones = (phones, dataLimit) => {
    // console.log(phnes.data);
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerText = '';
    //display only 10 phones
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 8) {
        phones = phones.slice(0, 8);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }
    //display no phones
    const noMesg = document.getElementById('no-phone-mesg');
    if (phones.length === 0) {
        noMesg.classList.remove('d-none')
    }
    else {
        noMesg.classList.add('d-none')
    }
    //display phones
    phones.forEach(phone => {
        // console.log(phone);
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add = 'col';
        phoneDiv.innerHTML = `
        <div class="card p-4 " >
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit longer.</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" id="" class="btn btn-primary ms-2" type="button" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Details</button>
                
                </div>
        </div>
        `;
        phoneContainer.appendChild(phoneDiv);
    });
    // stop loader
    toggleSpinner(false);
}

const searchProcess = (dataLimit) => {
    toggleSpinner(true);
    const phoneField = document.getElementById('phone-field');
    const searchText = phoneField.value;
    loadPhones(searchText, dataLimit);
}

//handle search buttion click
document.getElementById('btn-search').addEventListener('click', function () {
    //start loader
    searchProcess(8);
})

//search input enter keyhandler
document.getElementById('phone-field').addEventListener('keypress', function (event) {
    // console.log(event.key);
    if (event.key === 'Enter') {
        searchProcess(8);
    }
})

const toggleSpinner = isLoading => {
    const loaderSpinner = document.getElementById('loader');
    if (isLoading) {
        loaderSpinner.classList.remove('d-none');
    }
    else {
        loaderSpinner.classList.add('d-none');
    }
}

document.getElementById('btn-show-all').addEventListener('click', function () {
    searchProcess();
})
const loadPhoneDetails = async id => {
    // const url = `https://openapi.programming-hero.com/api/phone/apple_iphone_10_pro_max-110810`;
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone => {
    console.log(phone);
    const phoneTitle = document.getElementById('phoneDetailModalLabel');
    phoneTitle.innerText = phone.name;

    const phoneDetailModalBody = document.getElementById('phoneDetailModalBody');
    phoneDetailModalBody.innerHTML = `
        <p>Release Date: ${phone.releaseDate ? phone.releaseDate : "No release date found"}</p>
        <p>Brand: ${phone.brand}</p>
        <p>Others
            <ul>
                <li>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : "No storage found"}</li>
                <li>Memory: ${phone.mainFeatures ? phone.mainFeatures.memory : "No memory found"}</li>
                <li>Display Size: ${phone.mainFeatures ? phone.mainFeatures.displaySize : "No display found"}</li>
                <li>Bluetooth: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth'}</li>
                <li>GPS: ${phone.others ? phone.others.GPS : 'No GPS'}</li>
            </ul>
        </P>
        <img src="${phone.image}" class="card-img-top " alt="...">
    `;
}
loadPhones('ipad');
