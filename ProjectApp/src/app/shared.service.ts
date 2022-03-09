import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrl = "http://localhost:65487";
  constructor( private http:HttpClient) { }

  isUserPresent(val: any){
    return this.http.post(this.APIUrl+'/isUserPresent', val);
  }

  isAdminPresent(val: any){
    return this.http.post(this.APIUrl+'/isAdminPresent', val);
  }
  
  saveUser(val: any){
    return this.http.post(this.APIUrl+'/saveUser', val);
  }

  saveAdmin(val: any){
    return this.http.post(this.APIUrl+'/saveAdmin', val);
  }

  addUser(val: any){
    return this.http.post(this.APIUrl+'/addUser', val);
  }

  getUser(val: any): Observable<any>{
    return this.http.get<any>(this.APIUrl+'/getUser?userid='+val);
  }

  editUser(val1: any, val2: any){
    return this.http.put(this.APIUrl+'/editUser?userid='+val1, val2);
  }

  deleteUser(val: any){
    return this.http.delete(this.APIUrl+'/deleteUser?userid='+val);
  }

  addLoan(val: any){
    return this.http.post(this.APIUrl+'/addLoan', val);
  }

  addDocument(val: FormData){
    return this.http.post(this.APIUrl+'/addDocument', val, {reportProgress: true, observe: 'events'});
  }
  getDocument(id: any): any {
		return this.http.get(this.APIUrl+'/getDocument?id='+id, {responseType: 'blob'});
  }

  getLoan(val : any): Observable<any>{
    console.log(val)
    console.log(this.http.get<any>(this.APIUrl+"/getLoan?email="+val))
    return this.http.get<any>(this.APIUrl+"/getLoan?email="+val);
  }
}
