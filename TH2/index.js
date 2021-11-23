// These arrays containt time series of exchange rates
const array_EUR = [];
const array_GBP = [];
const array_USD = [];
// Select element 
var show_Latest_USD = document.getElementById('id_display_latest_USD');
var show_Latest_GBP = document.getElementById('id_display_latest_GBP');
var show_Latest_EUR = document.getElementById('id_display_latest_EUR');

async function fetchExchangeRate(){
    // Fetch: Exchange Rate EUR
    await fetch('https://api.exchangerate.host/timeseries?start_date=2020-11-16&end_date=2020-11-23')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        for(property in data['rates']){
            for(sub_property in data['rates'][property]){
                if(sub_property == 'VND'){
                    array_EUR.push(parseFloat(data['rates'][property][sub_property]))
                }
            }
        }

        // Display Latest Rate USD
        let latestRate = String(data['rates'][data['end_date']]['VND']);
        show_Latest_EUR.textContent = latestRate.substring(0, latestRate.indexOf('.'));
    })

    // Fetch: Exchange Rate USD
    await fetch('https://api.exchangerate.host/timeseries?start_date=2020-11-16&end_date=2020-11-23&base=USD')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        for(property in data['rates']){
            for(sub_property in data['rates'][property]){
                if(sub_property == 'VND'){
                    array_USD.push(parseFloat(data['rates'][property][sub_property]))
                }
            }
        }
        // Display Latest Rate USD
        let latestRate = String(data['rates'][data['end_date']]['VND']);
        show_Latest_USD.textContent = latestRate.substring(0, latestRate.indexOf('.'));
    })

    // Fetch: Exchange Rate GBP
    await fetch('https://api.exchangerate.host/timeseries?start_date=2020-11-16&end_date=2020-11-23&base=GBP')
    .then(res => res.json())
    .then(data => {
        for(property in data['rates']){
            for(sub_property in data['rates'][property]){
                if(sub_property == 'VND'){
                    array_GBP.push(parseFloat(data['rates'][property][sub_property]))
                }
            }
        }
        // Display Latest Rate GBP
        let latestRate = String(data['rates'][data['end_date']]['VND']);
        show_Latest_GBP.textContent = latestRate.substring(0, latestRate.indexOf('.'));
    })
    
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['16/11', '17/11', '18/11', '19/11', '20/11', '21/11', '22/11', '23/11'],
            datasets: [{
                label: 'USD',
                data: array_USD,
                backgroundColor: [
                    'rgba(107, 128, 104, 0)',
                    
                ],
                borderColor: [
                    'rgba(107, 128, 104, 1)',
                ],
                borderWidth: 1
            },
            {
                label: 'GBP',
                data: array_GBP,
                backgroundColor: [
                    'rgba(220, 53, 69, 0)',
                    
                ],
                borderColor: [
                    'rgba(220, 53, 69, 1)'
                ],
                borderWidth: 1
            },
            {
                label: 'EUR',
                data: array_EUR,
                backgroundColor: [
                    'rgba(20, 203, 93, 0)',
                    
                ],
                borderColor: [
                    'rgba(20, 203, 93, 1)'
                ],
                borderWidth: 1
            }
        ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}