// dummy data for mock up purpose
const categories = {
  work: 20,
  sleep: 10,
  hobby: 5,
  untracked: 65,
};

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const ctx1 = document.getElementById("pieChart");
const ctx2 = document.getElementById("lineChart");

// add doughnut chart
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

// Add line chart
const myLineChart = new Chart(ctx2, {
  type: "line",
  data: {
    labels: weekDays,
    datasets: [
      {
        labels: weekDays,
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
