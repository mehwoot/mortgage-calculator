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

$(document).ready(function(){

  Highcharts.setOptions({ lang: {thousandsSep: ',' } });

  // Popovers and tooltip init
  $('[data-toggle="popover"]').popover();
  $('[data-toggle="tooltip"]').tooltip();

  // Stop page jumping around when clicking links
  $('a[href="#"]').click(function(e){
    e.preventDefault();
  });

  // Make custom tab active class work
  $('[data-toggle="tab"]').click(function() {
    $('.graph-tabs li.graph-tab').removeClass('active');
  });

  // Open fields depending on mortgage reason
  $("#mortgageReason").change(function() {
    if ($(this).val() == "Buying a property") {
      $(".refinancing-holder").collapse('hide');
      $(".homebuyer-holder").collapse('show');
    } else if ($(this).val() == "Refinancing") {
      $(".homebuyer-holder").collapse('hide');
      $(".refinancing-holder").collapse('show');
    }
  });

  // Expand borrow box after completing initial sum
  $('#propertyValue').focusout(function(){
    $('.borrow-extra-col').collapse('show');
  });

  $('.borrow-extra-trigger').click(function(){
    setTimeout(function () {
        $(window).trigger('resize');
    }, 1);
  });

  // Form validation
  $('form .refinancing-holder').isHappy({
    fields: {
      '#interestRateRF': {
        required: true
      },
      '#loanPeriodRF': {
        required: true
      },
      '#borrowAmountRF': {
        required: true
      }
    },
    submitButton: $('#refinancing-results-button'),
    happy: function(){
      $('.rf-form-errors-rf').empty();
      runResults();
    },
    unHappy: function() {
      $('.rf-form-errors-rf').html('<div class="alert alert-danger">Enter all information.</div>');
    }
  });

  $('form .homebuyer-holder').isHappy({
    fields: {
      '#interestRate': {
        required: true
      },
      '#loanPeriod': {
        required: true
      },
      '#initialSum': {
        required: true
      },
      '#propertyValue': {
        required: true
      }
    },
    submitButton: $('#homebuyer-results-button'),
    happy: function(){
      $('.rf-form-errors-hb').empty();
      runResults();
    },
    unHappy: function() {
      $('.rf-form-errors-hb').html('<div class="alert alert-danger">Enter all information.</div>');
    }
  });

  // Generate results
  function runResults() {
    $('#your-results').collapse('show');
    $("html, body").animate({ scrollTop: $('#your-results').offset().top - 65 }, 1500);
    drawRateChart();
    drawPlotLines();
    createOfferButtons();
    drawRepaymentChart('#graph-3 .repayment-chart', fullDataSet[3]);
    generateGraphs();
    setTimeout(function(){
      generateBarIcons();
      addOfferBadge("First", 'https://raw.githubusercontent.com/ratecity/mortgage-calculator/gh-pages/img/bestoffer.png', 45, 1);
      addOfferBadge("You", 'https://raw.githubusercontent.com/ratecity/mortgage-calculator/gh-pages/img/youroffer.png', 45);
      runCollision();
    }, 1000);
  }

  // Fill out interest rate percentage
  $('#interestRate').keyup(function(){
    $('#interest-rateRF').text('');
    $('#interest-rate').text($('#interestRate').val());
  });
  $('#interestRateRF').keyup(function(){
    $('#interest-rate').text('');
    $('#interest-rateRF').text($('#interestRateRF').val());
  });

  // Generate line graphs
  function generateLineGraph(target) {
    $('[data-graph="'+target+'"]').click(function(e){
      drawRepaymentChart('#graph-'+target+' .repayment-chart', fullDataSet[target]);
      setTimeout(function(){
        $('#graph-'+target+' .repayment-chart').highcharts().reflow();
      }, 0);
    });
  }

  function generateGraphs() {
    for (var i = 0; i < offerData.length; i++ ) {
      generateLineGraph(i);
    };
  }
});
