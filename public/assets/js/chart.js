var ctx = document.getElementById("myChart");

// Add a doughnut chart
var myDoughnutChart = new Chart(ctx, {
  type: "doughnut",
  data: data,
  options: options,
});

// Add line chart
var myLineChart = new Chart(ctx, {
  type: "line",
  data: data,
  options: options,
});