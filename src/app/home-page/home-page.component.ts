import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {
  
  // Data provided by the company
  dateArray:string[] = ['24-Apr-2024', '02-May-2024', '09-May-2024', '31-May-2024', '21-Jun-2024'];
  strategyArray:Strategy[] = [
    {
      'View': 'Bullish',
      'Value': {
        '24-Apr-2024': ['Bull Call Spread', 'Bull Put Spread', 'Bull Put Spread', 'Long Call', 'Bull Put Spread','Bull Call Spread','Strategy1','Bull Call Spread','Strategy1','Strategy1','Spread Strategy','Bull Call Spread'],
        '02-May-2024': ['Bull Call Spread', 'Bull Call Spread', 'Bull Put Spread', 'Long Call', 'Long Call','Long Call','Bull Put Spread','Bull Call Spread','Strategy1','Bull Call Spread','Strategy2','Strategy1','Strategy2','Bull Call Spread'],
        '09-May-2024': ['Strategy Put', 'Strategy Call', 'Strategy Call', 'Strategy Call', 'Strategy Put'],
      }
    },
    {
      'View': 'Bearish',
      'Value': {
        '24-Apr-2024': ['Bear Call Spread', 'Bear Call Spread', 'Bear Call Spread', 'Long Put', 'Long Put', 'Long Put', 'Bear Call Spread',],
        '31-May-2024': ['Long Put', 'Long Put', 'Long Put', 'Long Put', 'Long Put'],
        '21-Jun-2024': ['Strategy3', 'Strategy3', 'Bear Put Spread', 'Strategy3', 'Long Put', 'Long Put'],
      }
    },
    {
      'View': 'RangeBound',
      'Value': {
        '24-Apr-2024': ['Short Straddle', 'Short Strangle', 'Short Strangle', 'Iron Butterfly', 'Short Strangle','Short Straddle','Strategy1','Short Straddle','Strategy1','Strategy1','Spread Strategy','Short Straddle'],
        '02-May-2024': ['Short Straddle', 'Short Straddle', 'Short Strangle', 'Iron Butterfly', 'Iron Butterfly','Iron Butterfly','Short Strangle','Short Straddle','Strategy1','Short Straddle','Strategy2','Strategy1','Strategy2','Short Straddle'],
        '21-Jun-2024': ['Iron Condor', 'Iron Butterfly', 'Iron Butterfly', 'Iron Butterfly', 'Iron Condor'],
      }
    },
    {
      'View': 'Volatile',
      'Value': {
        '02-May-2024': ['Long Straddle', 'Long Strangle', 'Long Strangle', 'Long Strangle', 'Long Straddle','Strategy1','Long Straddle','Strategy1','Strategy1','Spread Strategy','Long Straddle'],
        '09-May-2024': ['Long Straddle', 'Long Straddle', 'Long Strangle', 'Long Strangle', 'Long Straddle','Strategy1','Long Straddle','Strategy2','Strategy1','Strategy2','Long Straddle'],
        '31-May-2024': ['Long Straddle', 'Long Strangle', 'Long Strangle', 'Long Strangle', 'Long Straddle'],
      }
    }
  ];

  // Required variable's
  selectedTab:string = this.strategyArray[0].View;
  selectedDateIndex:number | null = 0;
  formattedDataForSelectedDate:any[] = [];

  /**
   * Initialize the first view [i.e default selection i.e View and first date in that View det]
   */
  ngOnInit() {
    this.formatDataForView();
    
  };

  /**
   * Function to change the tab based on selection
   * @param switchTo selected view name
   */
  changeTab (switchTo:string) {
    this.selectedTab = switchTo;
    this.selectedDateIndex = 0;

    this.formatDataForView();
  };

  /**
   * Function to change the date card as per need
   * @param switchTo selected date index
   */
  changeDateCard (switchTo:number) {
    if (switchTo === this.selectedDateIndex) {
      this.selectedDateIndex = null
      
    } else {
      this.selectedDateIndex = switchTo;

      this.formatDataForView();
    };

  };

  /**
   * Function to format the data based on UI requirement
   */
  formatDataForView () {
    this.formattedDataForSelectedDate = [];

    // Get the data and generate it as per requirement
    const selectedView = this.strategyArray.find((stat:Strategy) => (stat && stat.View && this.selectedTab && (stat.View === this.selectedTab)));
    const dataForDate = (selectedView?.Value[this.dateArray[this.selectedDateIndex ?? 0]]);

    [...(new Set(dataForDate))].forEach((strategy:string) => {
      this.formattedDataForSelectedDate.push({
        strategyName: strategy,
        strategyCount: (dataForDate?.filter((data:string) => (data && strategy && (strategy === data)))?.length ?? 0)
      });

    });

  };
};

/**
 * Data type for provided array
 */
export interface Strategy {
  View:string,
  Value: {
    [key:string]: string[]
  }
};