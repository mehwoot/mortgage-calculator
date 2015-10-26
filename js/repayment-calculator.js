fullDataSet = [
  [{
    name: 'Interest',
    data: [100000, 180000, 155000, 120000, 100000, 85000, 70000, 60000, 50000, 48000, 42000, 20000, 0]
  }, {
    name: 'Principal',
    data: [95000, 90000, 85000, 80000, 75000, 70000, 65000, 55000, 50000, 45000, 40000, 20000, 0]
  }],
  [{
    name: 'Interest',
    data: [200000, 180000, 155000, 120000, 100000, 85000, 70000, 60000, 50000, 48000, 42000, 20000, 0]
  }, {
    name: 'Principal',
    data: [95000, 90000, 85000, 80000, 75000, 70000, 65000, 55000, 50000, 45000, 40000, 20000, 0],
  }],
  [{
    name: 'Interest',
    data: [300000, 180000, 155000, 120000, 100000, 85000, 70000, 60000, 50000, 48000, 42000, 20000, 0]
  }, {
    name: 'Principal',
    data: [95000, 90000, 85000, 80000, 75000, 70000, 65000, 55000, 50000, 45000, 40000, 20000, 0]
  }],
  [{
    name: 'Interest',
    data: [400000, 180000, 155000, 120000, 100000, 85000, 70000, 60000, 50000, 48000, 42000, 20000, 0]
  }, {
    name: 'Principal',
    data: [95000, 90000, 85000, 80000, 75000, 70000, 65000, 55000, 50000, 45000, 40000, 20000, 0]
  }],
  [{
    name: 'Interest',
    data: [500000, 180000, 155000, 120000, 100000, 85000, 70000, 60000, 50000, 48000, 42000, 20000, 0]
  }, {
    name: 'Principal',
    data: [95000, 90000, 85000, 80000, 75000, 70000, 65000, 55000, 50000, 45000, 40000, 20000, 0]
  }]
];

$(document).ready(function() {
  drawRepaymentChart = function(div, data) {
    $(div).highcharts({
      colors: ['#D0F1D9', '#3BA057'],
      credits: {
        enabled: false
      },
      chart: {
        type: 'area'
      },
      title: {
        text: 'Repayment Graph'
      },
      xAxis: {
        type: 'datetime',
        title: {
          text: 'Year'
        }
      },
      yAxis: {
        title: {
          text: 'Value ($)'
        }
      },
      legend: {
        align: 'left',
        floating: true,
        verticalAlign: 'bottom',
        layout: 'vertical',
        y: 14,
        itemStyle: {
          fontWeight: 'normal',
          fontSize: '11px'
        }
      },
      plotOptions: {
        area: {
          stacking: 'normal',
          lineColor: '#3BA057',
          lineWidth: 1,
          marker: {
            enabled: false,
            lineWidth: 1,
            lineColor: '#3BA057'
          },
          pointPlacement: "on"
        },
        series: {
          pointStart: Date.UTC(2015, 0, 1),
          pointInterval: 24 * 3600 * 1000 * 365
        }
      },
      series: data
    });
  }
});
