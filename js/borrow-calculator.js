var borrowChart, borrowAmountTotal;

function calculateTotalBorrowAmount() {
  borrowAmountTotal = $('#propertyValue').val() - $('#initialSum').val() + stampDuty + random - homeBuyer;
}

function calculateLVR(){
  lvrValue = checkNegativeValue((($('#propertyValue').val() - $('#initialSum').val()) / $('#propertyValue').val() * 100).toFixed(2));
}

function addMortgageIns(){
  borrowAmountTotalMII = +borrowAmountTotal + +mortgageInsurance;
}

function calculateMortgageIns(){
  mortgageInsurance = 0;
  if (lvrValue > 81.01 && lvrValue < 86 ) {
    mortgageInsurance = (borrowAmountTotal * 0.85/100).toFixed(0);
  } else if (lvrValue > 86.01 && lvrValue < 92 ) {
    mortgageInsurance = (borrowAmountTotal * 1.94/100).toFixed(0);
  } else if (lvrValue > 92.01 && lvrValue <= 100 ) {
    mortgageInsurance = (borrowAmountTotal * 3.3/100).toFixed(0);
  } else {
    mortgageInsurance = 0;
  }
}

function checkNegativeValue(num) {
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
  homeBuyer = 0;
  mortgageInsurance = 0;

  calculateTotalBorrowAmount();

  // Draw the chart
  drawBorrowChart = function() {
    $('#borrow-chart').highcharts({
        colors: ['#1AAC41', '#FC903D', '#FED030', '#60C0DC', '#999'],
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
          y: 10,
          x: -2,
          itemMarginTop: 3,
          useHTML: true,
          labelFormatter: function() {
              return '<span style="font-weight:normal">' + this.name + ':</span><br/>$' + currency(this.y);
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

              },
              point: {
                events: {
                  legendItemClick: function () {
                    return false;
                  }
                }
              }
            }
        },
        series: [{
            type: 'pie',
            name: 'Cost',
            innerSize: '65%',
            data: [
                ['Property', checkNegativeValue(Number($('#propertyValue').val() - $('#initialSum').val() - homeBuyer)) ],
                ['Stamp Duty', stampDuty],
                ['Random', random],
                ['Mortgage Insurance', checkNegativeValue(+mortgageInsurance)]
            ]
        }]
    });
    borrowChart = $('#borrow-chart').highcharts();
    borrowChart.setTitle({
      text:
        '<strong>$' + currency(checkNegativeValue(borrowAmountTotalMII)) + '</strong>' + "<br /> borrowing"
    });
  }

  // Update the borrow amount display
  var updateBorrowDisplay = function() {
    $('#borrow-total').html(function(){
      return currency(checkNegativeValue(borrowAmountTotalMII));
    });
  }

  // Show LVR
  $('#propertyValue, #initialSum').keyup(function(){
    calculateLVR();
    // Maybe for 1.1
    /*if (lvrValue > 80) {
      $('.lvr-value').text(lvrValue);
      $('.lvr-display').collapse('show');
    } else {
      $('.lvr-display').collapse('hide');
    }*/
  });

  // Update all values and redraw chart
  var updateAll = function() {
    calculateTotalBorrowAmount();
    calculateMortgageIns();
    addMortgageIns();
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
