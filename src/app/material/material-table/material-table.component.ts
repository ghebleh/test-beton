import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Company {
  companyName: string;
}

interface BatchInfo {
  orderId: string;
  batchNo: number;
  dateTime: string;
  values: number[];
}

interface Order {
  id: string;
  name: string;
  tarhId: string;
  tarh: {
    metraj: number;
    ingredients: any[]; 
    orders: any[]; 
    id: string;
    syncStatus: number;
    lastStatusDateTime: string;
  };
  batchInfo: BatchInfo[]; 
  recieved: string;
  sentToPlc: string;
  started: string;
  finished: string;
  syncStatus: number;
  lastStatusDateTime: string;
}


@Component({
  selector: 'app-material-table',
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.scss']
})
export class MaterialTableComponent implements OnInit {
  companies: Company[] = [];
  selectedCompany: string = '';
  orders: Order[] = [];
  
  displayedColumns: string[] = [ 'name', 
    
    'metraj',
    'ingredients',
    'orders', 
    'recieved', 
    'sentToPlc', 
    'started', 
    'finished',
    'batchInfo'];
  
  selectedBatchInfo?: BatchInfo[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchCompanies();
  }

  fetchCompanies() {
    this.http.get<Company[]>('https://beton.parsicgroup.ir/api/Batching/Companies')
      .subscribe(data => {
        this.companies = data;
        
      });
  }

  onCompanyChange() {
    if (this.selectedCompany) {
      this.http.get<Order[]>(`https://beton.parsicgroup.ir/api/Batching/Orders?CompanyName=${encodeURIComponent(this.selectedCompany)}`)
        .subscribe(data => {
          this.orders = data;
        });
    }
  }

  openBatchInfo(orderId: string) {
    this.http.get<BatchInfo[]>(`https://beton.parsicgroup.ir/api/Batching/BatchingInfo?OrderId=${orderId}`)
      .subscribe(data => {
        this.selectedBatchInfo = data; 
      });
  }

  closeModal() {
    this.selectedBatchInfo = undefined;
  }

}
