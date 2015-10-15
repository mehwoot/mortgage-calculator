$(document).ready(function(){

  // Introductory loan fields
  $("#loanType").change(function() {
    if ($(this).val() == "Introductory") {
      $("#intro-loan").collapse('show');
    } else {
      $("#intro-loan").collapse('hide');
    }
  });

  // Calculate
  $('#results-button').click(function(){
    $('#your-results').collapse('show');

    $('html, body').animate({
      scrollTop: $('#your-results').offset().top
    }, {easing: "swing", duration: 1000}
    );

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
            y: 10
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

  // Colours
  $('.btn-red').click(function(){
    $('head style').last().remove();
    $('head').append('<style type="text/css">.btn-primary{background-color:#E11B3F;border-color:#E11B3F;}.btn-primary:hover,.btn-primary:focus,.btn-primary:active,.btn-primary:active:focus,.btn-primary:active:hover{background-color:#c61837;border-color:#c61837;a}a{color:#E11B3F;}a:hover{color:#c61837;}</style>');
  });
  $('.btn-purple').click(function(){
    $('head style').last().remove();
    $('head').append('<style type="text/css">.btn-primary{background-color:#693492;border-color:#693492;}.btn-primary:hover,.btn-primary:focus,.btn-primary:active,.btn-primary:active:focus,.btn-primary:active:hover{background-color:#592c7b;border-color:#592c7b;a}a{color:#693492;}a:hover{color:#592c7b;}</style>');
  });
  $('.btn-blue').click(function(){
    $('head style').last().remove();
    $('head').append('<style type="text/css">.btn-primary{background-color:#20ACE4;border-color:#20ACE4;}.btn-primary:hover,.btn-primary:focus,.btn-primary:active,.btn-primary:active:focus,.btn-primary:active:hover{background-color:#1999cd;border-color:#1999cd;a}a{color:#20ACE4;}a:hover{color:#1999cd;}</style>');
  });
});
