let table = {
    price: "Updating ",
    fiat: ".. ",
}

function updatePrice() {
    const UPDATE_IN_MS = 2000;
    const getAPIdata = function() {
        fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(response => {
            return response.json()
        })
        .then(data => {
            table.price = data.bpi.USD.rate;
            table.fiat = data.bpi.USD.code;
            //console.log(data);
        })
        .catch(error => console.log("ERROR"));
        
        const displayPrice = document.querySelector('#price');
        displayPrice.textContent = `${table.price} ${table.fiat}`;
        const title = document.querySelector('#title');
        title.textContent = `${table.price} ${table.fiat}`;
    };

    document.querySelector('#loader').style.visibility = 'visible';
    resolveTimer(getAPIdata, UPDATE_IN_MS);
}

function resolveTimer(func, ms) {
    return new Promise(() => {
        setInterval(func, ms);
    });
}

const inputElement = document.querySelector('#button');
inputElement.addEventListener('click', updatePrice);