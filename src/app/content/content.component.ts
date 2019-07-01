import {Component, OnInit} from '@angular/core';
import {HttpService} from "../service/http.service";
import {forEach} from "@angular/router/src/utils/collection";
import {toNumber} from "ngx-bootstrap/timepicker/timepicker.utils";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  isloading = false;
  // 扇形图数据
  chartOption = {
    title: {
      text: '商品分类',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['休闲裤', '雪纺衫', '牛仔裤', '小背心', '半身裙', '衬衫', 'T恤', '连衣裙']
    },
    series: [
      {
        name: '占比',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  // 条形图数据
  option = {
    title: {
      text: '近七天新增用户数',
      x: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [],
      type: 'line'
    }]
  };

  constructor(private http: HttpService) {
    this.init();
  }

  ngOnInit() {
  }

  init() {
    this.chartOption.series[0].data = [];
    this.chartOption.legend.data = [];
    this.http.httpGet('/getClothChart', null, val => {
      this.chartOption.legend.data = val.titles;
      let array = [];
      for (let i = 0; i < val.data.length; i++) {
        let v = val.data[i];
        let param = {
          value: 0,
          name: ''
        }
        param.value = v.total;
        param.name = v.title;
        array.push(param);
      }
      this.chartOption.series[0].data = array;
    })
    this.http.httpGet('/getUserChart', null, val => {
      let array = [];
      let total = [];
      for (let i = 0; i < val.data.length; i++) {
        let v = val.data[i];
        let param = {
          value: 0,
          name: ''
        }
        v.registdate = v.registdate.substr(5, 5);
        param.name = v.registdate;
        param.value = v.total;
        array.push(param.name);
        total.push(param.value);
      }
      this.option.xAxis.data = array;
      this.option.series[0].data = total;
    })
  }
}
