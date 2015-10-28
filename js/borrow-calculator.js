var borrowChart, borrowAmountTotal;

calculateTotalBorrowAmount = function() {
  borrowAmountTotal = $('#propertyValue').val() - $('#initialSum').val() + stampDuty + random + lawyer - homeBuyer;
}

checkNegativeValue = function(num) {
  if ( num > 0 ) {
    return num;
  } else {
    return num = 0;
  }
}

$(document).ready(function(){

  // Image sizes in columns
  if ( $(window).width() < 436) {
    borrowMargin = 100
  } else {
    borrowMargin = 0
  }

  // Fixed variables
  stampDuty = 30000;
  random = 20000;
  lawyer = 2000;
  homeBuyer = 0;

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
            plotShadow: false,
            marginRight: -borrowMargin
        },
        title: {
            align: 'center',
            verticalAlign: 'middle',
            y: 0,
            x: (borrowMargin / 2) + 4,
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
                ['Property',  checkNegativeValue(Number($('#propertyValue').val() - $('#initialSum').val() - homeBuyer)) ],
                ['Stamp Duty',       stampDuty],
                ['Random', random],
                ['Lawyer',    lawyer]
            ]
        }]
    });
    borrowChart = $('#borrow-chart').highcharts();
    borrowChart.setTitle({
      text:
        '<strong>$' + currency(checkNegativeValue(borrowAmountTotal)) + '</strong>' + "<br /> borrowing"
    });
  }

  // Update the borrow amount display
  var updateBorrowDisplay = function() {
    $('#borrow-total').html(function(){
      return currency(checkNegativeValue(borrowAmountTotal));
    });
  }

  // Update all values and redraw chart
  var updateAll = function() {
    calculateTotalBorrowAmount();
    updateBorrowDisplay();
    drawBorrowChart();
    setTimeout(function(){
      $('#borrow-chart').highcharts().reflow();
    }, 1000);
  }

  // Add FHB text
  textAdder = function(){
    updateAll();
    borrowChart.renderer
    .text('Amount borrowed<br />reduced by $15,000<br />due to First Home<br />Buyer\'s Grant', 15, 20)
      .css({
          color: '#333',
          fontSize: '11px'
      })
      .add();
  }

  // Test if FHB is checked
  var checkTester = function() {
    if ($('#firstHomeBuyer').is(':checked') == true) {
      textAdder();
    } else {
      updateAll();
    };
  }

  // Redraw the chart when values are changed
  $('.chart-data input').keyup(function(){
    checkTester();
  });

  $('#firstHomeBuyer').change(function(){
    var checked = this.checked ? 15000 : 0;
    homeBuyer = checked;
    checkTester();
  });

});
