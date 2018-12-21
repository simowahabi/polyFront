import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Search } from 'src/model/search';
import { Data1 } from 'src/model/data1';
import { Data2 } from 'src/model/data2';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http:HttpClient) { }
  APIdata1="http://localhost:8000/api/mydata/"
  APIdata2="http://localhost:8000/api/mydata2/"
  APIobj="http://localhost:8000/api/obj/"

  
  search(search:Search){
    return this.http.post(this.APIdata1+'search',search);
    
  }
  update1(data:Data1,id){
    return this.http.put(this.APIdata1+id,data);
  }
  update2(data:Data2,id){
    return this.http.put(this.APIdata2+id,data);

  }
  addObj(data){
    return this.http.post(this.APIobj,data);
  }
  allObj(){
    return this.http.get(this.APIobj);
  }
}
