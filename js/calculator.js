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
      $("#iam-results-button").hide();
      $('.iam-form-errors').remove();
    } else if ($(this).val() == "Refinancing") {
      $(".homebuyer-holder").collapse('hide');
      $(".refinancing-holder").collapse('show');
      $("#iam-results-button").hide();
      $('.iam-form-errors').remove();
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

  // Show error to prompt user to select a reason
  $('#iam-results-button').click(function(e){
    $('.iam-form-errors').html('<div class="alert alert-danger">Please select a mortgage reason.</div>');
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
      $('.rf-form-errors').empty();

      $.ajax({
        method: "POST",
        url: "http://www.ratecity.com.au/api/v1/home_loans_calculator_feed",
        data: {
          amount: borrowAmountTotal,
          term: $('#loanPeriodRF').val(),
          rate: $('#interestRateRF').val(),
          purpose: $('#goingToRF option:selected').data('value')
        }
      }).done(function(results){
        plotLines.length = 0;
        offerDataFormatted.length = 0;
        offerData = results.offerData;
        allOfferFunctions();
        runResults();
      });
    },
    unHappy: function() {
      $('.rf-form-errors').html('<div class="alert alert-danger">Enter all information.</div>');
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
      $('.hb-form-errors').empty();

      $.ajax({
        method: "POST",
        url: "http://www.ratecity.com.au/api/v1/home_loans_calculator_feed",
        data: {
          amount: borrowAmountTotal,
          term: $('#loanPeriod').val(),
          rate: $('#interestRate').val(),
          purpose: $('#goingTo option:selected').data('value')
        }
      }).done(function(results){
        plotLines.length = 0;
        offerDataFormatted.length = 0;
        offerData = results.offerData;
        allOfferFunctions();
        runResults();
      });
    },
    unHappy: function() {
      $('.hb-form-errors').html('<div class="alert alert-danger">Enter all information.</div>');
    }
  });

  // Spinner
  var $loading = $('.spinner').hide();
  //Attach the event handler to any element
  $(document)
    .ajaxStart(function() {
      //ajax request went so show the loading image
      $('#refinancing-results-button, #homebuyer-results-button').addClass('disabled');
      $loading.show();
    })
    .ajaxStop(function() {
      //got response so hide the loading image
      $('#refinancing-results-button, #homebuyer-results-button').removeClass('disabled');
      $loading.hide();
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
      addOfferBadge("First", $('#lowerOffer').data('url'), 45, 1);
      addOfferBadge("You", $('#yourOffer').data('url'), 45);
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
