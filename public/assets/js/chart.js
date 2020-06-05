//use a for loop and moment js to build this dynamicall based on today subtract index to Day format
const weekDays = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

const doughnutChartContext = document.getElementById("doughnutChart");

$.get("/api/category/timeSummaryPercentageOfDay")
  .then((categories) => {
    const labels = (Object.keys(categories))
    const data = Object.values(categories) 
    const myDoughnutChart = new Chart(doughnutChartContext, {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Todays Categories",
            // data: data,
            data: data,
            backgroundColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
    });
  })
  .catch((error) => console.error(`category ajax call failed ${error}`));

// Add line chart
const lineChartContext = document.getElementById("lineChart");

$.get("/api/sleepSummaryThisWeek")
  .then((data) => {
    const myLineChart = new Chart(lineChartContext, {
      type: "line",
      data: {
        labels: weekDays,
        datasets: [
          {
            label: "sleep",
            data: data,
            borderColor: ["rgba(255, 99, 132, 1)"],
            borderWidth: 3,
            fill: false,
          },
        ],
      },
    });
  })
  .catch((error) => console.error(`sleep ajax call failed ${error}`));



