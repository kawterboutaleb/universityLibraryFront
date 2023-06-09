import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
import { LoanService } from '../services/loan.service';
import { Loans } from '../models/loans.model';
import exporting from 'highcharts/modules/exporting';
import * as moment from 'moment';

HighchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit  {

  constructor(private loanService : LoanService) { }
  ngOnInit(): void {
  } 
  

  public ngAfterViewInit(): void {
    this.createChartPie2();
    //this.createChartGauge();
    //this.createChartPie();
    this.createChartColumn();
    this.createChartLine();
    exporting(Highcharts);
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  private createChartGauge(): void {
    const chart = Highcharts.chart('chart-gauge', {
      chart: {
        type: 'solidgauge',
      },
      title: {
        text: 'Gauge Chart',
      },
      credits: {
        enabled: false,
      },
      pane: {
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '85%'],
        size: '100%',
        background: {
            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc',
        },
      },
      yAxis: {
        min: 0,
        max: 100,
        stops: [
          [0.1, '#55BF3B'], // green
          [0.5, '#DDDF0D'], // yellow
          [0.9, '#DF5353'], // red
        ],
        minorTickInterval: null,
        tickAmount: 2,
        labels: {
          y: 16,
        },
      },
      plotOptions: {
        solidgauge: {
          dataLabels: {
            y: -25,
            borderWidth: 0,
            useHTML: true,
          },
        },
      },
      tooltip: {
        enabled: false,
      },
      series: [{
        name: null,
        data: [this.getRandomNumber(0, 100)],
        dataLabels: {
          format: '<div style="text-align: center"><span style="font-size: 1.25rem">{y}</span></div>',
        },
      }],
    } as any);

    setInterval(() => {
      chart.series[0].points[0].update(this.getRandomNumber(0, 100));
    }, 1000);
  }
  
  private createChartPie(): void {
    let date = new Date();
    const data: any[] = [];

    for (let i = 0; i < 5; i++) {
      date.setDate(new Date().getDate() + i);
      data.push({
        name: `${date.getDate()}/${date.getMonth() + 1}`,
        y: this.getRandomNumber(0, 1000),
      });
    }

    const chart = Highcharts.chart('chart-pie', {
      chart: {
        type: 'pie',
      },
      title: {
        text: 'loans per month',
      },
      credits: {
        enabled: false,
      },
      tooltip: {
        headerFormat: `<span class="mb-2">Date: {point.key}</span><br>`,
        pointFormat: '<span>Amount: {point.y}</span>',
        useHTML: true,
      },
      series: [{
        name: null,
        innerSize: '50%',
        data,
      }],
    } as any);

    setInterval(() => {
      date.setDate(date.getDate() + 1);
      chart.series[0].addPoint({
        name: `${date.getDate()}/${date.getMonth() + 1}`,
        y: this.getRandomNumber(0, 1000),
      }, true, true);
    }, 2500);
  }

  createChartColumn(): void {
    this.loanService.getLoans().subscribe((loans: Loans[]) => {
      const loanData: { [month: string]: number } = {};
  
      loans.forEach(loan => {
        const month = moment(loan.loanBeginDate).format('YYYY-MM');
        if (loanData.hasOwnProperty(month)) {
          loanData[month]++;
        } else {
          loanData[month] = 1;
        }
      });
  
      const seriesData = Object.entries(loanData).map(([month, loanCount]) => ({
        name: month,
        y: loanCount as number
      }));
  
      seriesData.sort((a, b) => b.y - a.y);
  
      const options: Highcharts.Options = {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Most Copy Loans per Month'
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          title: {
            text: 'Loan Count'
          }
        },
        series: [{
          type: 'column', // Specify the series type as 'column'
          name: 'Month',
          data: seriesData
        }]
      };
  
      Highcharts.chart('chart-column', options);
    });
  }

  /*
  private createChartColumn(): void {
    let date = new Date();
    const data: any[] = [];

    for (let i = 0; i < 10; i++) {
      date.setDate(new Date().getDate() + i);
      data.push({
        name: `${date.getDate()}/${date.getMonth() + 1}`,
        y: this.getRandomNumber(0, 1000),
      });
    }

    const chart = Highcharts.chart('chart-column' as any, {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Column Chart',
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
      yAxis: {
        min: 0,
        title: undefined,
      },
      xAxis: {
        type: 'category',
      },
      tooltip: {
        headerFormat: `<div>Date: {point.key}</div>`,
        pointFormat: `<div>{series.name}: {point.y}</div>`,
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
          },
        },
      },
      series: [{
        name: 'Amount',
        data,
      }],
    } as any);

    setInterval(() => {
      date.setDate(date.getDate() + 1);
      chart.series[0].addPoint({
        name: `${date.getDate()}/${date.getMonth() + 1}`,
        y: this.getRandomNumber(0, 1000),
      }, true, true);
    }, 1500);
  } */
  private createChartLine(): void {
    const data: any[] = [];
  
    const getSelectedYear = (): number => {
      const selectedYearInput = document.querySelector('input[name="year"]:checked') as HTMLInputElement;
      return parseInt(selectedYearInput.value);
    };
  
    const updateChartData = (): void => {
      const selectedYear = getSelectedYear();
  
      this.loanService.getLoans().subscribe((loans: Loans[]) => {
        const loansByDate = {};
  
        loans.forEach((loan: Loans) => {
          const loanYear = loan.loanBeginDate.getFullYear();
          if (loanYear === selectedYear) {
            const loanDate = loan.loanBeginDate.getDate();
            const loanMonth = loan.loanBeginDate.getMonth() + 1;
            const loanKey = `${loanDate}/${loanMonth}`;
  
            if (loansByDate.hasOwnProperty(loanKey)) {
              loansByDate[loanKey] += 1;
            } else {
              loansByDate[loanKey] = 1;
            }
          }
        });
  
        const dates = Object.keys(loansByDate).sort((a: string, b: string) => {
          const [dayA, monthA] = a.split('/').map(Number);
          const [dayB, monthB] = b.split('/').map(Number);
    
          if (monthA === monthB) {
            return dayA - dayB;
          } else {
            return monthA - monthB;
          }
        });
  
        data.length = 0;
        dates.forEach((date: string) => {
          data.push({
            name: date,
            y: loansByDate[date]
          });
        });
  
        const chart = Highcharts.chart('chart-line', {
          chart: {
            type: 'line',
          },
          title: {
            text: `Loans per Date (${selectedYear})`,
          },
          credits: {
            enabled: false,
          },
          legend: {
            enabled: false,
          },
          yAxis: {
            title: {
              text: 'Number of Loans',
            },
          },
          xAxis: {
            type: 'category',
          },
          tooltip: {
            headerFormat: `<div>Date: {point.key}</div>`,
            pointFormat: `<div>{series.name}: {point.y}</div>`,
            shared: true,
            useHTML: true,
          },
          series: [{
            name: 'Loans',
            data,
          }],
        } as any);
  
        let counter = dates.length - 1;
  
        setInterval(() => {
          counter = (counter + 1) % dates.length;
          const date = dates[counter];
  
          chart.series[0].addPoint({
            name: date,
            y: loansByDate[date]
          }, true, true);
        }, 1500);
      });
    };
  
    const yearRadios = document.querySelectorAll('input[name="year"]');
    yearRadios.forEach(radio => {
    radio.addEventListener('change', updateChartData);
    });
    updateChartData();
  }

private createChartPie2(): void {
  const data: any[] = [];

   this.loanService.getLoans().subscribe((loans: Loans[]) => {
    const loansByMonth = {};

    loans.forEach((loan: Loans) => {
      const month = loan.loanBeginDate.getMonth() + 1;

      if (loansByMonth.hasOwnProperty(month)) {
        loansByMonth[month] += 1;
      } else {
        loansByMonth[month] = 1;
      }
    });

    Object.keys(loansByMonth).forEach((month: string) => {
      data.push({
        name: parseInt(month),
        y: loansByMonth[month]
      });
    });

    const chart = Highcharts.chart('chart-pie2', {
      chart: {
        type: 'pie',
      },
      title: {
        text: 'Loans per Month',
      },
      credits: {
        enabled: false,
      },
      tooltip: {
        headerFormat: `<span class="mb-2">Month: {point.key}</span><br>`,
        pointFormat: '<span>Number of Loans: {point.y}</span>',
        useHTML: true,
      },
      series: [{
        name: null,
        innerSize: '50%',
        data,
      }],
    } as any);

    const months = Object.keys(loansByMonth);
    let counter = months.length - 1;

    setInterval(() => {
      counter = (counter + 1) % months.length;
      const month = months[counter];
      
      chart.series[0].addPoint({
        name: parseInt(month),
        y: loansByMonth[month]
      }, true, true);
    }, 2500);
  });
}

}