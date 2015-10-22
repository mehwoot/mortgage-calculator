$(document).ready(function(){

  var borrowChart, borrowAmountTotal;

  Highcharts.setOptions({ lang: {thousandsSep: ',' } });

  function currency(number) {
    var number = number.toString(),
    dollars = number.split('.')[0],
    cents = (number.split('.')[1] || '') +'00';
    dollars = dollars.split('').reverse().join('')
        .replace(/(\d{3}(?!$))/g, '$1,')
        .split('').reverse().join('');
    return dollars;
  }

  // Set values for testing
  $('#propertyValue').val('50000');
  $('#initialSum').val('0');
  $('#loanPeriod').val('10');

  // Pie chart

  // Fixed variables
  stampDuty = 30000;
  random = 20000;
  lawyer = 2000;

  drawBorrowChart = function() {
    $('#borrow-chart').highcharts({
        colors: ['#1AAC41', '#FC903D', '#FED030', '#999', '#60C0DC'],
        chart: {
            backgroundColor: '#f1f1f1',
            plotBackgroundColor: '#f1f1f1',
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            align: 'center',
            verticalAlign: 'middle',
            y: 0,
            style: {
              color: '#999',
              fontSize: '15px'
            }
        },
        legend: {
          floating: true,
          layout: "vertical",
          align: "left",
          useHTML: true,
          labelFormatter: function() {
              return this.name + ': <span style="font-weight:normal">$' + currency(this.y) + '</span>';
				}
        },
        tooltip: {
            pointFormat: '{series.name}: <b>${point.y:,.0f}</b>'
        },
        plotOptions: {
            pie: {
              size: '100%',
              showInLegend: true,
                dataLabels: {
                    enabled: false

                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Cost',
            innerSize: '65%',
            data: [
                ['Property',   Number($('#propertyValue').val())],
                ['Stamp Duty',       stampDuty],
                ['Random', random],
                ['Lawyer',    lawyer]
            ]
        }]
    });
    borrowChart = $('#borrow-chart').highcharts();
    borrowChart.setTitle({
      text:
        '<strong>$' + currency(borrowAmountTotal) + '</strong>' + "<br /> borrowing"
    });
  }

  $('#initialSum').focusout(function(){
    $('.borrow-extra-col').collapse('show');
  });

  borrowAmountTotal = $('#propertyValue').val() - $('#initialSum').val() + stampDuty + random + lawyer;

  $('.chart-data input').keyup(function(){
    $('#borrow-total').html(function(){
      return currency(borrowAmountTotal);
    });
    drawBorrowChart();
  });

  // Calculate
  $('#results-button').click(function(){
    $('#your-results').collapse('show');

    // Repayment amount
    $('.repayment-amount').text(function(){
      return currency(Math.round(borrowAmountTotal / $('#loanPeriod').val()));
    });

    // Chart
    $('#chart').highcharts({
          chart: {
              type: 'area'
          },
          title: {
              text: ''
          },
          xAxis: {
              categories: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027'],
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
              }
          },
          series: [{
              name: 'Interest',
              data: [200000, 180000, 155000, 120000, 100000, 85000, 70000, 60000, 50000, 48000, 42000, 20000, 0],
              color: '#D0F1D9'
          },
          {
              name: 'Principal',
              data: [95000, 90000, 85000, 80000, 75000, 70000, 65000, 55000, 50000, 45000, 40000, 20000, 0],
              color: '#3BA057'
          }]
      });
  });

  // Popovers and tooltip init
  $('[data-toggle="popover"]').popover();
  $('[data-toggle="tooltip"]').tooltip();

  // Stop page jumping around when clicking links
  $('a[href="#"]').click(function(e){
    e.preventDefault();
  })

  // Set values for testing
  $('#propertyValue').val('50000');
  $('#initialSum').val('0');
  $('#loanPeriod').val('10');

  drawBorrowChart();
});
