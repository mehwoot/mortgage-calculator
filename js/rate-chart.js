offerData = [{
  name: "SocietyOne",
  y: 1500,
  imgURL: "http://cdn.ratecity.com.au/companies/logo/sban/small_sban_logo.jpg",
  URL: "http://google.com"
}, {
  name: "HSBC",
  y: 1700,
  imgURL: "http://cdn.ratecity.com.au/companies/logo/lcom/small_lcom_logo.png",
  URL: "http://google1.com"
}, {
  name: "RACV",
  y: 1800,
  imgURL: "http://cdn.ratecity.com.au/companies/logo/moa/small_moa_logo.png",
  URL: "http://google2.com"
}, {
  name: "You",
  y: 1850,
  imgURL: "http://i.imgur.com/1HMpTLT.png",
  URL: "http://google3.com"
}, {
  name: "Bank of Melbourne",
  y: 1950,
  imgURL: "http://cdn.ratecity.com.au/companies/logo/cua/small_cua_logo.jpg",
  URL: "http://google4.com"
}]

// Sort data into ascending order
offerData.sort(function(a, b) {
  return parseFloat(a.y) - parseFloat(b.y);
});

// Data for plotlines
var plotLines = [];
for (var i = 0; i < offerData.length; i++) {
  plotLines.push({
    value: offerData[i].y,
    color: "red",
    width: 1
  });
}

// Data for names
var offerNames = [];
for (var i = 0; i < offerData.length; i++) {
  offerNames.push(
    {name: offerData[i].name,
    imgURL: offerData[i].imgURL});
}

// Generate min and max values for rate graph
ymin = Math.min.apply(Math, offerData.map(function(o) {
  return o.y;
}));
ymax = Math.max.apply(Math, offerData.map(function(o) {
  return o.y;
}));

// Add lines at the top of each column
drawPlotLines = function() {
  $.each(plotLines, function(index, value) {
    $('#rate-chart').highcharts().yAxis[0].addPlotLine({
      value: plotLines[index].value - 2,
      color: '#aaa',
      width: 1,
      label: {
        text: "$" + plotLines[index].value,
        align: "left",
        y: -3,
        style: {
          color: "white",
          fontSize: "11px"
        }
      }
    });
  });
}

// Create the offer buttons
createOfferButtons = function(){
  for (var i = 0; i < offerData.length; i++) {
    $('*[data-offer="'+i+'"]').empty().prepend('<a href="' + offerData[i].URL + '" class="btn btn-primary btn-sm btn-rate-graph">View<br/>Offer</a>');
    if ( offerData[i].name == "You") {
      $('*[data-offer="'+i+'"]').empty().append('<span class="text-center btn-rate-graph" style="color: #999;">You</span>');
    }
  }
}

$(document).ready(function() {
  drawRateChart = function() {
    $('#rate-chart').highcharts({
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
        text: 'Monthly Repayment'
      },
      xAxis: {
        categories: offerNames.name,
        labels: {
          rotation: -90,
          x: -36,
          y: -43,
          useHTML: true,
          formatter: function() {
            return '<img src="' + offerData[this.value].imgURL + '" height="24"/>';
          },
          style: {
            color: '#000',
            font: '10px arial',
            marginTop: "200px"
          }
        },
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
        minorTickLength: 0,
        tickLength: 0
      },
      yAxis: {
        title: {
          text: ''
        },
        labels: {
          enabled: false
        },
        min: ymin - 400,
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
        pointFormat: '{point.name}: <strong>${point.y:,.0f}</strong>/month<br/>'
      },

      series: [{
        name: "Offer",
        data: offerData
      }]
    });
  }
});
