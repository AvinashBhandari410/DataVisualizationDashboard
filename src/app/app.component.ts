import { HttpClient } from '@angular/common/http';
import { SalesData } from './sales-data';
import { AppService } from './app.service';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash'; // lodash loaded here

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Admin Dashboard';
  salesData: SalesData[];
  filteredData: any;

  // fusion Charts Order Count: Graph 2
  id = 'chart1';
  width = 500;
  height = 400;
  type = 'bar2d';
  dataFormat = 'json';
  dataSource;

  // fusion Charts sum of all sales : Graph 3
  idSum = 'chart2';
  widthSum = 500;
  heightSum = 400;
  typeSum = 'bar2d';
  dataFormatSum = 'json';
  dataSourceSum;

  // fusion Charts Line Bar Graph sum of sales and count of orders: Graph 3
  idLineBar = 'chart3';
  widthLineBar = 1000;
  heightLineBar = 400;
  typeLineBar = 'mscombidy2d';
  dataFormatLineBar = 'json';
  dataSourceLineBar;


  // fusion Charts Line Bar Graph sum of sales and count of orders: Graph 4
  idLineAreaBar = 'chart4';
  widthLineAreaBar = 1000;
  heightLineAreBar = 400;
  typeLineAreaBar = 'mscombidy2d';
  dataFormatLineAreaBar = 'json';
  dataSourceLineAreaBar;

  constructor(private companyService: AppService, httpAmit: HttpClient) {
  }

  ngOnInit(): void {
    this.getData();
  }
  getData(): void {
    this.companyService.getSalesData().subscribe(data =>
    // tslint:disable-next-line:one-line
    {
      //Get the Count of all the Orders corresponding "STATUS" : Graph 2
      this.salesData = data;
      const tempCount = _(this.salesData).orderBy('STATUS').reverse()
        .groupBy('STATUS')
        .map((objs, key) => ({
          'label': key,
          'value': objs.length
        })) // objs is an interfaced data so length method used.
        .value();
      this.dataSource = 
      {
        'chart': {
          'caption': '',
          "formatnumberscale": "0",
          "placevaluesInside": "0",
          "showValues": "1",
          "decimals": "2",
          "valueFontColor": "#000000",
          'theme': 'fint'
        },
        'data': tempCount
      };

      //Get the sum of all the sales corresponding "STATUS" : Graph 2

      const tempSum = _(this.salesData).orderBy('STATUS').reverse()
        .groupBy('STATUS')
        .map((objs, key) => ({
          'label': key,
          'value': _.sumBy(objs, 'SALES')
        }))
        .value();
      this.dataSourceSum = 
      {
        'chart': {
          'caption': '',
          "formatnumberscale": "0",
          "placeValuesInside": "0",
          "valueFontColor": "#000000",
          'subCaption': '',
          "showValues": "1",
          'numberprefix': '$',
          "decimals": "2",
          'theme': 'fint'
        },
        'data': tempSum
      };

      //Get the Count of all the Orders corresponding "PRODUCTLINE" : Graph 3
      const lineOrderCount = _(this.salesData).orderBy('PRODUCTLINE')
        .groupBy('PRODUCTLINE')
        .map((objs, key) => ({
          'label': key,
          'value': objs.length
        })) // objs is an interfaced data so length method used.
        .value();

      //Get the sum of all the sales corresponding "PRODUCTLINE" : Graph 3
      const lineSumCount = _(this.salesData).orderBy('PRODUCTLINE')
        .groupBy('PRODUCTLINE')
        .map((objs, key) => ({
          'label': key,
          'value': _.sumBy(objs, 'SALES')
        }))
        .value();

      //Get the sum of all the sales corresponding "PRODUCTLINE" : Graph 3
      const lineProductLineCount = _(this.salesData).orderBy('PRODUCTLINE')
        .groupBy('PRODUCTLINE')
        .map((objs, key) => ({
          'label': key
        })) // objs is an interfaced data so length method used.
        .value();

      console.log(lineProductLineCount.map(a => a.label));
      var myJsonString = JSON.stringify(lineProductLineCount.map(a => a.label));
      console.log(myJsonString);
      this.dataSourceLineBar = 
      {
        "chart": 
        {
          "caption": "",
          "subCaption": "",
          "placevaluesInside": "1",
          "formatnumberscale": "0",
          "xAxisname": "Axis Title",
          "pYAxisName": "Axis Title",
          "sYAxisName": "Axis Title",
          "valueFontColor": "#000000",
          "numberPrefix": "$",
          "sNumberSuffix": "",
          "sYAxisMaxValue": "50",
          "decimals": "2",
          "theme": "fint"
        },
        "categories":
          [
            {
              "category":
                [
                  {
                    "label": "Classic Cars"
                  },
                  {
                    "label": "Motorcycles"
                  },
                  {
                    "label": "Planes"
                  },
                  {
                    "label": "Ships"
                  },
                  {
                    "label": "Trains"
                  },
                  {
                    "label": "Trucks and Buses"
                  },
                  {
                    "label": "Vintage Cars"
                  },
                  {
                    "label": "(blank)"
                  }
                ]
            }
          ],
        "dataset":
          [
            {
              "seriesName": "Sum of SALES",
              "data": lineSumCount
            },
            {
              "seriesName": "",
              "renderAs": "area",
              "showValues": "0",
              "data": []
            },
            {
              "seriesName": "Count of ORDERNUMBER",
              "parentYAxis": "S",
              "renderAs": "line",
              "showValues": "0",
              "data": lineOrderCount
            }
          ]
      };
      //Get the Count of all the Orders corresponding "QTR_ID" : Graph 1
      const lineAreaOrderCount = _(this.salesData)
        .groupBy('QTR_ID')
        .map((objs, key) => ({
          'label': key,
          'value': objs.length
        })) // objs is an interfaced data so length method used.
        .value();

      //Get the sum of all the sales corresponding "QTR_ID" : Graph 1
      const lineAreaSalesSum = _(this.salesData)
        .groupBy('QTR_ID')
        .map((objs, key) => ({
          'label': key,
          'value': _.sumBy(objs, 'SALES')
        }))
        .value();

      this.dataSourceLineAreaBar =
        {
          "chart":
            {
              "caption": "",
              "subcaption": "",
              "pYaxisname": "SUM OF SALES",
              "sYAxisName": "COUNT OF ORDERS",
              "numberprefix": "$",
              "formatnumberscale": "0",
              "decimals": "2",
              "theme": "fint",
              "areaOverColumns" :"0" ,
              "placevaluesInside": "0"
            },
            
          "categories":
            [
              {
                "category":
                  [
                    {
                      "label": ""
                    },
                    {
                      "label": ""
                    },
                    {
                      "label": ""
                    },
                    {
                      "label": ""
                    }
                  ]
              }
            ],
          "dataset":
            [
              {
                "seriesName": "SUM of SALES",
                "showValues": "1",
                "renderAs": "area",
                "data":lineAreaSalesSum
              
              },
              {
                "seriesName": "Count of ORDERNUMBER",
                "showValues": "1",
                "parentYAxis": "s",
                "renderAs": "column",
                "data": lineAreaOrderCount
              }
              
              
            ]
        };
    },
      err => {
        console.log('Something went wrong!');
      }
    );
  }
}
