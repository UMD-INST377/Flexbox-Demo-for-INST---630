function generateChart(target, labels, data) {
    const chart = new Chart(target, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
        label: '# of Votes',
        data: data,
        borderWidth: 1
        }]
    },
    options: {
        scales: {
        y: {
            beginAtZero: true
        }
        }
    }
    });
    return chart;
}

async function mainEvent(evt1) {
    const chartTarget = document.querySelector('#myChart'); // HAS to be a Canvas element

    const reply = await fetch("https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json");
    const data = await reply.json()
    console.table(data);

    const chartDataObj = data.reduce((col, item, index) => {
        if (!col[item.category]){
            col[item.category] = 1
        } else {
            col[item.category] += 1
        }
        return col
    }, {})
    
    const chartData = Object.values(chartDataObj)
    const chartLabels = Object.keys(chartDataObj)
    const chartRef = generateChart(chartTarget, chartLabels, chartData);
}

document.addEventListener("DOMContentLoaded", async (event) => mainEvent(event))

// const config = {
//     type: 'bar',
//     data: data,
//     options: {
//       responsive: true,
//       plugins: {
//         legend: {
//           position: 'top',
//         },
//         title: {
//           display: true,
//           text: 'Chart.js Bar Chart'
//         }
//       }
//     },
//   };

//   const DATA_COUNT = 7;
//   const NUMBER_CFG = {count: DATA_COUNT, min: -100, max: 100};
  
//   const labels = Utils.months({count: 7});
//   const data = {
//     labels: labels,
//     datasets: [
//       {
//         label: 'Fully Rounded',
//         data: Utils.numbers(NUMBER_CFG),
//         borderColor: Utils.CHART_COLORS.red,
//         backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
//         borderWidth: 2,
//         borderRadius: Number.MAX_VALUE,
//         borderSkipped: false,
//       },
//       {
//         label: 'Small Radius',
//         data: Utils.numbers(NUMBER_CFG),
//         borderColor: Utils.CHART_COLORS.blue,
//         backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
//         borderWidth: 2,
//         borderRadius: 5,
//         borderSkipped: false,
//       }
//     ]
//   };

//   const actions = [
//     {
//       name: 'Randomize',
//       handler(chart) {
//         chart.data.datasets.forEach(dataset => {
//           dataset.data = Utils.numbers({count: chart.data.labels.length, min: -100, max: 100});
//         });
//         chart.update();
//       }
//     },
//   ];