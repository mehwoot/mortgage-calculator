calculateTotalBorrowAmount = function() {
  borrowAmountTotal = $('#propertyValue').val() - $('#initialSum').val() + stampDuty + random + lawyer;
}

$(document).ready(function(){

  /* Set values for testing
  $('#propertyValue').val('50000');
  $('#initialSum').val('0');
  $('#loanPeriod').val('10');*/

  // Fixed variables
  stampDuty = 30000;
  random = 20000;
  lawyer = 2000;

  calculateTotalBorrowAmount();

  // Draw the chart
  drawBorrowChart = function() {
    $('#borrow-chart').highcharts({
        colors: ['#1AAC41', '#FC903D', '#FED030', '#999', '#60C0DC'],
        // TODO: Check license
        credits: {
          enabled: false
        },
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

  // Expand after completing initial sum
  $('.chart-data input').keyup(function(){
    calculateTotalBorrowAmount();
    $('#borrow-total').html(function(){
      return currency(borrowAmountTotal);
    });
    drawBorrowChart();
  });
});
