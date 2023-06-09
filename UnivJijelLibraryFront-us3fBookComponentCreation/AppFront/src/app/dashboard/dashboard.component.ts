import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
import { LoanService } from '../services/loan.service';
import { Loans } from '../models/loan.model';
import exporting from 'highcharts/modules/exporting';
import * as moment from 'moment';
import { LectorService } from '../services/lector.service';
import { Thesis } from '../models/thesis.model';

HighchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit  {
  totalStudents: number = 0;
  totalProfessors: number = 0;
  totalLibrarians: number = 0;
  totalPunishers: number = 0;
  

  constructor(private loanService : LoanService , private lectorService : LectorService
  ) { }
  ngOnInit(): void {
    this.getTotalStudents();
    this.getTotalProfessors();
    this.getTotalLibrarians();
    this.getAllPunishers();
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

  
  private getTotalStudents(): void {
    this.lectorService.getAllStudents().subscribe((students: any[]) => {
      this.totalStudents = students.length;
    });
  }

  private getTotalProfessors(): void {
    this.lectorService.getAllprofessors().subscribe((professors: any[]) => {
      this.totalProfessors = professors.length;
    });
  }

  private getTotalLibrarians(): void {
    this.lectorService.getAlllibrarians().subscribe((librarians: any[]) => {
      this.totalLibrarians = librarians.length;
    });
  }

  private getAllPunishers(): void {
    this.loanService.getAllPunishers().subscribe((Punishers: any[]) => {
      this.totalPunishers = Punishers.length;
    });
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
      const documentData: { [month: string]: { [title: string]: number } } = {};
  
      loans.forEach(loan => {
        const month = moment(loan.loanBeginDate).format('YYYY-MM');
        if (!documentData.hasOwnProperty(month)) {
          documentData[month] = {};
        }
        const title = loan.doc_title;
        if (documentData[month].hasOwnProperty(title)) {
          documentData[month][title]++;
        } else {
          documentData[month][title] = 1;
        }
      });
  
      const seriesData: { name: string, data: [string, number][] }[] = [];
  
      let mostFrequentTitleInYear = '';
      let maxCountInYear = 0;
  
      for (const [month, titles] of Object.entries(documentData)) {
        const sortedTitles = Object.entries(titles).sort((a, b) => b[1] - a[1]);
        const mostFrequentTitle = sortedTitles[0][0];
        const count = sortedTitles[0][1];
  
        if (count > maxCountInYear) {
          mostFrequentTitleInYear = mostFrequentTitle;
          maxCountInYear = count;
        }
  
        seriesData.push({
          name: month,
          data: sortedTitles.map(([title, count]) => [title, count])
        });
  
        console.log(`The most frequent document title for ${month} is "${mostFrequentTitle}".`);
      }
  
      const options: Highcharts.Options = {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Most Document Loans per Month'
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          title: {
            text: 'Loan Count'
          }
        },
        series: seriesData.map(data => ({
          type: 'column',
          name: data.name,
          data: data.data
        }))
      };
  
      Highcharts.chart('chart-column', options);
  
      const resultTextInYear = `The most frequent document title in the year is "${mostFrequentTitleInYear}".`;
      const resultTextPerMonth = Object.entries(documentData)
        .map(([month, titles]) => {
          const sortedTitles = Object.entries(titles).sort((a, b) => b[1] - a[1]);
          const mostFrequentTitle = sortedTitles[0][0];
          return `The most frequent document title for ${month} is "${mostFrequentTitle}".`;
        })
        .join('\n');
  
      const resultElement = document.getElementById('result');
      if (resultElement) {
        resultElement.textContent = resultTextInYear + '\n' + resultTextPerMonth;
      }
    });
  }
 /*
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
  } */
 /*
  private createChartLine(): void {
    const data: any[] = [];
    let mostFrequentMonth: number = 0;
    let mostFrequentMonthBorrower: string = '';
    let mostFrequentYear: number = 0;
    let mostFrequentYearBorrower: string = '';
  
    const getSelectedYear = (): number => {
      const selectedYearInput = document.querySelector('input[name="year"]:checked') as HTMLInputElement;
      return parseInt(selectedYearInput.value);
    };
  
   
  const updateChartData = (): void => {
  const selectedYear = getSelectedYear();

  this.loanService.getLoans().subscribe((loans: Loans[]) => {
    const loansByMonth = {};

    loans.forEach((loan: Loans) => {
      const loanYear = loan.loanBeginDate.getFullYear();
      if (loanYear === selectedYear) {
        const loanMonth = loan.loanBeginDate.getMonth() + 1;
        const loanKey = `${loanMonth}`;

        if (loansByMonth.hasOwnProperty(loanKey)) {
          loansByMonth[loanKey].count += 1;
          loansByMonth[loanKey].borrowers.add(`${loan.lct_firstName} ${loan.lct_lastName}`);
        } else {
          loansByMonth[loanKey] = {
            count: 1,
            borrowers: new Set([`${loan.lct_firstName} ${loan.lct_lastName}`])
          };
        }
      }
    });

    const months = Object.keys(loansByMonth).sort((a: string, b: string) => {
      const monthA = Number(a);
      const monthB = Number(b);

      return monthA - monthB;
    });

    data.length = 0;
    months.forEach((month: string) => {
      const borrowCount = loansByMonth[month].count;
      const borrowers = loansByMonth[month].borrowers;
      
      if (borrowCount > mostFrequentMonth) {
        mostFrequentMonth = borrowCount;
        mostFrequentMonthBorrower = Array.from(borrowers).join(', ');
      }

      if (borrowCount > mostFrequentYear) {
        mostFrequentYear = borrowCount;
        mostFrequentYearBorrower = Array.from(borrowers).join(', ');
      } 
     
      data.push({
        name: `Month ${month}`,
        y: borrowCount
      });
    }); 

    const chart = Highcharts.chart('chart-line', {
      chart: {
        type: 'line',
      },
      title: {
        text: `Most Lector Borrows per Month (${selectedYear}) `,
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

    let counter = months.length - 1;
    
    setInterval(() => {
      counter = (counter + 1) % months.length;
      const month = months[counter];

      chart.series[0].addPoint({
        name: `Month ${month}`,
        y: loansByMonth[month].count
      }, true, true);
    }, 1500); 
    

    const resultTextarea = document.getElementById('result-textarea') as HTMLTextAreaElement;
    resultTextarea.value = `Most Frequent Borrower in ${selectedYear}: ${mostFrequentYearBorrower} (${mostFrequentYear} borrows)\n\nMost Frequent Borrower per Month:\n`;

    months.forEach((month: string) => {
      const monthBorrowers = Array.from(loansByMonth[month].borrowers).join(', ');
      resultTextarea.value += `${selectedYear}-${month}: ${monthBorrowers} (${loansByMonth[month].count} borrows)\n`;
    });
  });
};
  
    const yearRadios = document.querySelectorAll('input[name="year"]');
    yearRadios.forEach(radio => {
      radio.addEventListener('change', updateChartData);
    });
    updateChartData();
  } */

  
private createChartLine(): void {
const data: any[] = [];
let mostFrequentMonth: number = 0;
let mostFrequentMonthBorrower: string = '';
let mostFrequentYear: number = 0;
let mostFrequentYearBorrower: string = '';

const getSelectedYear = (): number => {
const selectedYearInput = document.querySelector('input[name="year"]:checked') as HTMLInputElement;
return parseInt(selectedYearInput.value);
};


const updateChartData = (): void => {
const selectedYear = getSelectedYear();

this.loanService.getLoans().subscribe((loans: Loans[]) => {
  const loansByMonth = {};

  loans.forEach((loan: Loans) => {
    const loanYear = loan.loanBeginDate.getFullYear();
    if (loanYear === selectedYear) {
      const loanMonth = loan.loanBeginDate.getMonth() + 1;
      const loanKey = `${loanMonth}`;

      if (loansByMonth.hasOwnProperty(loanKey)) {
        loansByMonth[loanKey].count += 1;
        loansByMonth[loanKey].borrowers.push(`${loan.lct_firstName} ${loan.lct_lastName}`);
      } else {
        loansByMonth[loanKey] = {
          count: 1,
          borrowers: [`${loan.lct_firstName} ${loan.lct_lastName}`]
        };
      }
    }
  });

  const months = Object.keys(loansByMonth).sort((a: string, b: string) => {
    const monthA = Number(a);
    const monthB = Number(b);

    return monthA - monthB;
  });

  data.length = 0;
  months.forEach((month: string) => {
    const borrowCount = loansByMonth[month].count;
    const borrowers = loansByMonth[month].borrowers;

    if (borrowCount > mostFrequentMonth) {
      mostFrequentMonth = borrowCount;
      mostFrequentMonthBorrower = borrowers.join(', ');
    }

    if (borrowCount > mostFrequentYear) {
      mostFrequentYear = borrowCount;
      mostFrequentYearBorrower = borrowers.join(', ');
    }

    borrowers.forEach((borrower: string) => {
      data.push({
        name: borrower,
        y: borrowCount
      });
    });
  });

  const chart = Highcharts.chart('chart-line', {
    chart: {
      type: 'line',
    },
    title: {
      text: `Most Lector Borrows per Month (${selectedYear})`,
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

  let counter = months.length - 1;

  setInterval(() => {
    counter = (counter + 1) % months.length;
    const month = months[counter];

    loansByMonth[month].borrowers.forEach((borrower: string) => {
      chart.series[0].addPoint({
        name: borrower,
        y: loansByMonth[month].count
      }, true, true);
    });
  }, 1500);


  const resultTextarea = document.getElementById('result-textarea') as HTMLTextAreaElement;
  resultTextarea.value = `Most Frequent Borrower in ${selectedYear}: ${mostFrequentYearBorrower} (${mostFrequentYear} borrows)\n\nMost Frequent Borrower per Month:\n`;

  months.forEach((month: string) => {
    const monthBorrowers = loansByMonth[month].borrowers.join(', ');
    resultTextarea.value += `${selectedYear}-${month}: ${monthBorrowers} (${loansByMonth[month].count} borrows)\n`;
  });
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