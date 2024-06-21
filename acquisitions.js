import Chart from "chart.js/auto";

const actions = [
  {
    name: "Randomize",
    handler(chart) {
      chart.data.datasets.forEach((dataset) => {
        dataset.data = Utils.numbers({
          count: chart.data.labels.length,
          min: -100,
          max: 100,
        });
      });
      chart.update();
    },
  },
  {
    name: "Add Dataset",
    handler(chart) {
      const data = chart.data;
      const dsColor = Utils.namedColor(chart.data.datasets.length);
      const newDataset = {
        label: "Dataset " + (data.datasets.length + 1),
        backgroundColor: Utils.transparentize(dsColor, 0.5),
        borderColor: dsColor,
        data: Utils.numbers({ count: data.labels.length, min: -100, max: 100 }),
      };
      chart.data.datasets.push(newDataset);
      chart.update();
    },
  },
  {
    name: "Add Data",
    handler(chart) {
      const data = chart.data;
      if (data.datasets.length > 0) {
        data.labels = Utils.months({ count: data.labels.length + 1 });

        for (let index = 0; index < data.datasets.length; ++index) {
          data.datasets[index].data.push(Utils.rand(-100, 100));
        }

        chart.update();
      }
    },
  },
  {
    name: "Remove Dataset",
    handler(chart) {
      chart.data.datasets.pop();
      chart.update();
    },
  },
  {
    name: "Remove Data",
    handler(chart) {
      chart.data.labels.splice(-1, 1); // remove the label first

      chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
      });

      chart.update();
    },
  },
];

(async function () {
  const data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];

  new Chart(document.getElementById("acquisitions"), {
    type: "line",
    data: {
      labels: data.map((row) => row.year),
      datasets: [
        {
          label: "Acquisitions by year",
          data: data.map((row) => row.count),
        },
        {
          label: "Second Data Set",
          data: data.map((row) => -row.count),
        },
      ],
    },
  });
})();

function createButtons(actions) {
  items = "";

  for (let i = 0; i < actions.length; i++) {
    items += `<button value=${actions[i].name} onClick="console.log('Hello World')">${actions[i].name}</button>`;
  }

  return items;
}

const buttons = document.getElementById("buttons");
buttons.innerHTML = createButtons(actions);
