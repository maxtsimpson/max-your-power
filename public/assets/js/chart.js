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

const ctx1 = document.getElementById("pieChart");

$.get("/api/category/timeSummaryPercentageOfDay")
.then((categories) => {
  const myDoughnutChart = new Chart(ctx1, {
    type: "doughnut",
    data: {
      labels: Object.keys(categories),
      datasets: [
        {
          label: "Todays Categories",
          data: Object.values(categories),
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
const ctx2 = document.getElementById("lineChart");

$.get("/api/sleepSummaryThisWeek")
.then((data) => {
  const myLineChart = new Chart(ctx2, {
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



