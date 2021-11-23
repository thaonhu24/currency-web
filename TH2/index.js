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
    await fetch('https://api.exchangerate.host/timeseries?start_date=2020-11-19&end_date=2020-11-23')
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
    await fetch('https://api.exchangerate.host/timeseries?start_date=2020-11-19&end_date=2020-11-23&base=USD')
    .then(res => res.json())
    .then(data => {
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
    await fetch('https://api.exchangerate.host/timeseries?start_date=2020-11-19&end_date=2020-11-23&base=GBP')
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
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: array_USD,
                backgroundColor: [
                    'rgba(255, 99, 132, 0)',
                    
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1
            },
            {
                label: '# of Votes',
                data: array_GBP,
                backgroundColor: [
                    'rgba(255, 99, 132, 0)',
                    
                ],
                borderColor: [
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            },
            {
                label: '# of Votes',
                data: array_EUR,
                backgroundColor: [
                    'rgba(255, 99, 132, 0)',
                    
                ],
                borderColor: [
                    'rgba(153, 102, 255, 1)'
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
jQuery(document).ready(function($){
// Slide review người dùng The Wall
    $('#previous-rv').on('click', function(){
        // Change to the previous Review
            $('#rv-' + currentReview).hide();
            decreaseReview();
            $('#rv-' + currentReview).show();
            });
            $('#next-rv').on('click', function(){
            // Change to the next Review
            $('#rv-' + currentReview).hide();
            increaseReview();
            $('#rv-' + currentReview).show();
        });
        var currentReview = 1;
        var totalReviews = 3;
        function increaseReview() {
            ++currentReview;
            if(currentReview > totalReviews) {
                currentReview = 1;
            }
        }
        function decreaseReview() {

            --currentReview;
            if(currentReview < 1) {
                currentReview = totalReviews;
            }
        }
        window.setInterval(function() {
            $('#previous-rv').click();
        }, 5000);
    })