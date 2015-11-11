/* offerData = [{
  name: "SocietyOne",
  repayment: 1650,
  imgURL: "http://cdn.ratecity.com.au/companies/logo/sban/small_sban_logo.jpg",
  URL: "#",
  comparison_rate: '4',
  advertised_rate: '3.99'
}, {
  name: "HSBC",
  repayment: 1689,
  imgURL: "http://cdn.ratecity.com.au/companies/logo/lcom/small_lcom_logo.png",
  URL: "#",
  comparison_rate: '4',
  advertised_rate: '3.99'
}, {
  name: "RACV",
  repayment: 1733,
  imgURL: "http://cdn.ratecity.com.au/companies/logo/moa/small_moa_logo.png",
  URL: "#",
  comparison_rate: '4',
  advertised_rate: '3.99'
  }, {
  name: "You",
  repayment: 1756,
  imgURL: "https://raw.githubusercontent.com/ratecity/mortgage-calculator/gh-pages/img/youman.png",
  URL: "#",
  comparison_rate: '4',
  advertised_rate: '3.99'
}, {
  name: "Bank of Melbourne",
  repayment: 1797,
  imgURL: "http://cdn.ratecity.com.au/companies/logo/cua/small_cua_logo.jpg",
  URL: "#",
  comparison_rate: '4',
  advertised_rate: '3.99'
}] */

offerData = [];
plotLines = [];
offerDataFormatted = [];
//var monthlyRepayment;

function allOfferFunctions(){
  for (var i = 0; i < offerData.length; i++) {
    offerDataFormatted.push({
      name: offerData[i].name,
      y: offerData[i].repayment,
      URL: offerData[i].URL,
      imgURL: offerData[i].imgURL,
      compRate: offerData[i].comparison_rate,
      adRate: offerData[i].advertised_rate
    });
  }

  // Sort data into ascending order
  offerDataFormatted.sort(function(a, b) {
    return parseFloat(a.y) - parseFloat(b.y);
  });

  // Generate min and max values for rate graph
  ymin = Math.min.apply(Math, offerDataFormatted.map(function(o) {
    return o.y;
  }));
  ymax = Math.max.apply(Math, offerDataFormatted.map(function(o) {
    return o.y;
  }));

  // Generate and style plotlines

  for (var i = 0; i < offerDataFormatted.length; i++) {
    if (offerDataFormatted[i] == offerDataFormatted[0]) {
      plotLines.push({
        value: offerDataFormatted[i].y,
        color: '#F98F40',
        bgColor: '#F98F40',
        textColor: '#fff',
        textWeight: 'bold',
        paddingLeft: '3px',
        paddingRight: '3px',
        paddingBottom: '1px',
        borderRadius: '3px'
      })
    } else if (offerDataFormatted[i].name == "You") {
      plotLines.push({
        value: offerDataFormatted[i].y,
        color: '#60C1DC',
        bgColor: '#60C1DC',
        textColor: '#fff',
        textWeight: 'bold',
        paddingLeft: '3px',
        paddingRight: '3px',
        paddingBottom: '1px',
        borderRadius: '3px'
      })
    } else {
      plotLines.push({
        value: offerDataFormatted[i].y,
        color: '#aaa',
        bgColor: 'transparent',
        textColor: '#777',
        textWeight: 'normal',
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingBottom: '0px',
        borderRadius: '0px'
      })
    }
  }
}


  // Check collision
  function collision($div1, $div2) {
    var x1 = $div1.offset().left;
    var y1 = $div1.offset().top;
    var h1 = $div1.outerHeight(true);
    var w1 = $div1.outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = $div2.offset().left;
    var y2 = $div2.offset().top;
    var h2 = $div2.outerHeight(true);
    var w2 = $div2.outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2 + w2;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    return true;
  }

  // Remove collision
  function removeCollision() {
    for ( i = 1; i < 5; i++ ) {
      var next = i + 1;
      el = $('#rate-chart span:nth-of-type('+i+')');
      next = $('#rate-chart span:nth-of-type('+next+')');
      if (collision(el, next) == true) {
        next.remove();
        return true;
      }
    }
  }

  // Run for each plotline
  function runCollision(){
    for (var i = 0; i < offerDataFormatted.length; i++) {
      removeCollision();
    }
  }

  // Add plot lines to the top of each column
  function drawPlotLines() {
    $.each(plotLines, function(index, value) {
      $('#rate-chart').highcharts().yAxis[0].addPlotLine({
        value: plotLines[index].value - 2,
        color: plotLines[index].color,
        width: 1,
        label: {
          text: "$" + Number(plotLines[index].value).toFixed(0),
          align: "left",
          y: 4,
          x: -50,
          useHTML: true,
          style: {
            backgroundColor: plotLines[index].bgColor,
            paddingLeft: plotLines[index].paddingLeft,
            paddingRight: plotLines[index].paddingRight,
            paddingBottom: plotLines[index].paddingBottom,
            borderRadius: plotLines[index].borderRadius,
            color: plotLines[index].textColor,
            fontWeight: plotLines[index].textWeight,
            fontSize: "13px"
          }
        }
      });
    });
  }

  function getMonthlyRepayment() {
    for (var i = 0; i < offerDataFormatted.length; i++) {
      if (offerDataFormatted[i].name == "You") {
        return monthlyRepayment = offerDataFormatted[i].y;
      }
    }
  }

  // Offer badges
  function addOfferBadge(name, img, imgWidth, index) {
    if ( name == "You" ) {
      findYouIndex = offerDataFormatted.findIndex(function (element) {
          return element.name === "You";
      });
      index = findYouIndex + 1;
    }
    var column = $('#rate-chart g.highcharts-series rect:nth-of-type('+index+')');
    var colPosition = column.position();
    var colSize = column.attr('width');
    var heightOffset = checkNegativeValue(colPosition.top - 37);

    return $('#rate-chart').highcharts().renderer.image(img, colPosition.left + Math.round((colSize / 2)) - Math.round((imgWidth / 2) + 3), heightOffset, 54, 35).attr({zIndex: 1}).add();
  }

  // Column icons
  function addBarIcon(index, img) {
    index = index + 1;
    var imgWidth = 31;
    var column = $('#rate-chart g.highcharts-series rect:nth-of-type('+index+')');
    var colPosition = column.position();
    var colWidth = column.attr('width');
    var colHeight = column.attr('height');

    return $('#rate-chart').highcharts().renderer
    .image(img, colPosition.left + Math.round((colWidth / 2)) - Math.floor((imgWidth / 2)) + Number(colImgOffset), Number(colPosition.top) + Number(colHeight), 88, colImgSize)
    .attr({zIndex: 10, rotation: -90, preserveAspectRatio: 'xMinYMin'})
    .on('mouseover', function(){
      // TODO: Add mouseover stuff

    })
    .add();
  }

  // Create the offer buttons
  function createOfferButtons(){
    for (var i = 0; i < offerDataFormatted.length; i++) {
      $('*[data-offer="'+i+'"]').empty().prepend('<a href="' + offerDataFormatted[i].URL + '" class="btn btn-primary btn-sm btn-rate-graph">View<br/>Offer</a>');
      if ( offerDataFormatted[i].name == "You") {
        $('*[data-offer="'+i+'"]').empty().append('<strong class="text-center btn-rate-graph" style="color: #777;font-size: 13px;font-family:Proxima N W01 At Bold;">YOU</strong>');
      }
    }
  }

$(document).ready(function() {
  // Image sizes in columns
  if ( $(window).width() < 436) {
    colImgSize = 22;
    colImgOffset = 4;
  } else {
    colImgSize = 31;
    colImgOffset = 0;
  }

  generateBarIcons = function(){
    for (var i = 0; i < offerDataFormatted.length; i++ ) {
      addBarIcon(i, offerDataFormatted[i].imgURL);
    }
  }

  drawRateChart = function() {
    rateChart = $('#rate-chart').highcharts({
      colors: ['#fff'],
      // TODO: Check license
      credits: {
        enabled: false
      },
      chart: {
        type: 'column',
        plotBackgroundColor: '#666'
      },
      title: {
        text: ''
      },
      xAxis: {
        labels: {
          enabled: false
        },
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
        minorTickLength: 0,
        tickInterval: 1,
        tickLength: 0
      },
      yAxis: {
        title: {
          text: ''
        },
        offset: 40,
        labels: {
          enabled: false,
          zIndex: -5,
          style: {
            fontSize: '10px',
            color: '#fff'
          }
        },
        min: ymin - 150,
        max: ymax,
        startOnTick: false,
        gridLineColor: 'transparent',
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '{x.name}'
          }
        },
        threshold: 200
      },
      tooltip: {
        headerFormat: '',
        pointFormat: '{point.name}: <br/><strong>${point.y:,.0f}</strong>/month<br/>@ <strong>{point.compRate}%</strong> interest'
      },
      series: [{
        name: "Offer",
        data: offerDataFormatted
      }]
    });
  }
});
