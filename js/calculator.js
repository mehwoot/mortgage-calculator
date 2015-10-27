// Currency formatter
function currency(number) {
  var number = number.toString(),
  dollars = number.split('.')[0],
  cents = (number.split('.')[1] || '') +'00';
  dollars = dollars.split('').reverse().join('')
      .replace(/(\d{3}(?!$))/g, '$1,')
      .split('').reverse().join('');
  return dollars;
}

var borrowChart, borrowAmountTotal;

$(document).ready(function(){

  Highcharts.setOptions({ lang: {thousandsSep: ',' } });

  // Popovers and tooltip init
  $('[data-toggle="popover"]').popover();
  $('[data-toggle="tooltip"]').tooltip();

  // Stop page jumping around when clicking links
  $('a[href="#"]').click(function(e){
    e.preventDefault();
  });

  // Expand borrow box after completing initial sum
  $('#initialSum').focusout(function(){
    $('.borrow-extra-col').collapse('show');
  });

  $('#results-button').click(function() {
    $('#your-results').collapse('show');
    drawRateChart();
    drawPlotLines();
    createOfferButtons();
    drawRepaymentChart('#graph-3 .repayment-chart', fullDataSet[3]);
  });

  $('[data-graph="0"]').click(function(e){
    drawRepaymentChart('#graph-0 .repayment-chart', fullDataSet[0]);
    setTimeout(function(){
      $('#graph-0 .repayment-chart').highcharts().reflow();
    }, 0);

  });
  $('[data-graph="1"]').click(function(e){
    drawRepaymentChart('#graph-1 .repayment-chart', fullDataSet[1]);
    setTimeout(function(){
      $('#graph-1 .repayment-chart').highcharts().reflow();
    }, 0);
  });
  $('[data-graph="2"]').click(function(e){
    drawRepaymentChart('#graph-2 .repayment-chart', fullDataSet[2]);
    setTimeout(function(){
      $('#graph-2 .repayment-chart').highcharts().reflow();
    }, 0);
  });
  $('[data-graph="3"]').click(function(e){
    drawRepaymentChart('#graph-3 .repayment-chart', fullDataSet[3]);
    setTimeout(function(){
      $('#graph-3 .repayment-chart').highcharts().reflow();
    }, 0);
  });
  $('[data-graph="4"]').click(function(e){
    drawRepaymentChart('#graph-4 .repayment-chart', fullDataSet[4]);
    setTimeout(function(){
      $('#graph-4 .repayment-chart').highcharts().reflow();
    }, 0);
  });

  // Make custom tab active class work
  $('[data-toggle="tab"]').click(function() {
    $('.graph-tabs li.graph-tab').removeClass('active');
  });

  // TODO: Add proper validation
  /* $('#interestRate').keyup(function(){
    if ( $('#interestRate').val() != "" ) {
      $('#results-button').removeClass('disabled');
    }
  });*/

});
