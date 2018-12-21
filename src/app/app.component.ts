import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiServiceService } from 'src/service/api-service.service';
import { Search } from 'src/model/search';
import { DatePipe } from '@angular/common';
import { ArrayType } from '@angular/compiler';
import { Mydata } from 'src/model/mydata';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CalclulService } from 'src/service/calclul.service';
import {Observable} from 'rxjs';
import { Data1 } from 'src/model/data1';
import { Data2 } from 'src/model/data2';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  search:Search=new Search();
   sommes=[];
   produit=[];
  title = 'polyFront';
  data1:any;
  data2:any;
  objs:any;
  datatotal:Mydata[]=new Array();
  index=1;
  index2=1;
  showedit:false;
  myspinner=true;

constructor(public apiSerive:ApiServiceService,
            private datePipe: DatePipe,
            public toastr :ToastrManager,
            public calculService:CalclulService
            ){
              this.allObj();

}


  onSubmit(f:NgForm){
    this.datatotal=[];

    this.myspinner=true;
    this.search.mdate=this.transformDate(f.value.mdate);
    this.search.posx=f.value.posx;
    this.search.posy=f.value.posy;
    console.log(this.search)

  this.apiSerive.search(this.search)
  .subscribe(
    (res:any)=>{
      this.data1=res['data1'];
      this.data2=res['data2'];
      this.data1.forEach((element,index) => {
        this.datatotal.push({...element,...this.data2[index]});

      });
    },
    (error)=>{},
    () =>{ 
      this.calculsommeAndProduit();
    this.myspinner=false;
  }

  );
  
  }
  transformDate(myDate) {
   return this.datePipe.transform(myDate, 'yyyy-MM-dd'); //whatever format you need. 
  }





  onSelect(data) {
    const {D1,D2,D3,...data2} = data ;
    const {D4,D5,D6,...data1} = data ;

    this.myspinner=true;

    
    console.log(data2);
    this.apiSerive.update1(data1,data1.id).subscribe(
      (res)=>{
        if(res=="200"){
          console.log(res)

        this.apiSerive.update2(data2,data2.id).subscribe(
         (res)=>{
          if(res=="200"){
            this.calculsommeAndProduit();
            this.showSuccess('the data update')
          }
          else{
            console.log(res)
            this.showError("error") 
          }
         },
         (err)=>{
           
          this.showError("error") 
        },
        ()=>{
          this.myspinner=false;

        }
        )
      }
        else
        this.showError("error") 

      },
      (err)=>{
        this.showError("error") 
      },
      ()=>{}

      
    )
    


}

onAddObjt(data){
  this.myspinner=true;
  const {D1,D2,D3,D4,D5,D6,id,...obj} = data ;
  console.log(obj,'cc');
this.apiSerive.addObj(obj).subscribe(
  res=>{
    this.showSuccess('Obj added with success')
    console.log(res)
  },
  err=>{
    console.log(err);
  },
  ()=>{
    this.allObj();
  }
)

}
allObj(){
  this.apiSerive.allObj().subscribe(
    (res)=>{
      this.objs=res;
    },
    err=>{
      this.showError("Error");
    },
    ()=>{
      this.myspinner=false;

    }
  )
}

showSuccess(msg) {
  this.toastr.successToastr(msg, 'Data updated with Success!');
}

showError(msg) {
  this.toastr.errorToastr(msg ,'Oops!');
}

calculsommeAndProduit(){
  this.datatotal.forEach((element,index)=> {
    console.log(element.D1,element.D2,element.D3,element.D4,element.D5,element.D6);

    let s=(Number(element.D1)+Number(element.D2)+Number(element.D3)+Number(element.D4)+Number(element.D5)+Number(element.D6));
    let p=(Number(element.D1)*Number(element.D2)*Number(element.D3)*Number(element.D4)*Number(element.D5)*Number(element.D6))/6;
    console.log(s,p);
    element.obj=s+p;
  });
}


}
