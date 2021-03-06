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

// Calculate the totals for legend
calculateTotals = function(array, index) {
  if ( index == 0 ) {
    // Interest: index = 0;
    var arr = array;
    function add(a, b) {
      return a + b;
    }
    var sum = arr.reduce(add, 0);
    return sum;
  } else {
    // Principal: index = 1;
    return array[0];
  }
}

$(document).ready(function() {
  drawRepaymentChart = function(div, data) {
    $(div).highcharts({
      colors: ['#D0F1D9', '#3BA057'],
      credits: {
        enabled: false
      },
      chart: {
        type: 'area'
        //animation: false
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
      tooltip: {
        xDateFormat: '%Y'
      },
      legend: {
        align: 'right',
        floating: true,
        verticalAlign: 'top',
        layout: 'vertical',
        y: 45,
        useHTML: true,
        labelFormatter: function() {
            return this.name + ': <span style="font-weight:normal">$' + currency(calculateTotals(this.options.data, this.index)) + '</span>';
        },
        itemStyle: {
          fontWeight: 'bold',
          fontSize: '14px'
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
          pointInterval: 24 * 3600 * 1000 * 365,
          //animation: false
        }
      },
      series: data
    });
  }
});
