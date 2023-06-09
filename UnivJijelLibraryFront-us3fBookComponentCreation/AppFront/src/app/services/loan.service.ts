import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Loans } from '../models/loans.model';



@Injectable({
  providedIn: 'root'
})
export class LoanService {
  constructor(private http: HttpClient) {}

  getLoans(): Observable<Loans[]> {
    return this.http.get<any>('http://localhost:8060/api/loan/loans').pipe(
      map(response => {
        const loans: Loans[] = [];
        response.forEach(data => {
          const loan: Loans = {
            cp_id: data.copyDTO.cp_id,
            lct_id: data.lectorDTO.lct_id,
            loanBeginDate: new Date(data.loanBeginDate),
            loanEndDate: new Date(data.loanEndDate)
          };
          loans.push(loan);
        });
        return loans;
      })
    );
  }
  getAllPunishers(): Observable<Loans[]> {
    return this.http.get<any>('http://localhost:8060/api/loan/punishers').pipe(
      map(response => {
        const loans: Loans[] = [];
        response.forEach(data => {
          const loan: Loans = {
            cp_id: data.copyDTO.cp_id,
            lct_id: data.lectorDTO.lct_id,
            loanBeginDate: new Date(data.loanBeginDate),
            loanEndDate: new Date(data.loanEndDate)
          };
          loans.push(loan);
        });
        return loans;
      })
    );
  }
  
}