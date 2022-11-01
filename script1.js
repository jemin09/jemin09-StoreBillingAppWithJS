
    let billDataJson=[        
        {"code":"PEP221","prod":"Pepsi","price":12,"instock":"Yes","category":"Beverages"},
        {"code":"COK113","prod":"Coca Cola","price":18,"instock":"Yes","category":"Beverages"},
        {"code":"MIR646","prod":"Mirinda","price":15,"instock":"No","category":"Beverages"},
        {"code":"SLI874","prod":"Slice","price":22,"instock":"Yes","category":"Beverages"},
        {"code":"MIN654","prod":"Minute Maid","price":25,"instock":"Yes","category":"Beverages"},
        {"code":"APP652","prod":"Appy","price":10,"instock":"No","category":"Beverages"},
        {"code":"FRO085","prod":"Frooti","price":30,"instock":"Yes","category":"Beverages"},
        {"code":"REA546","prod":"Real","price":24,"instock":"No","category":"Beverages"},
        {"code":"DM5461","prod":"Dairy Milk","price":40,"instock":"Yes","category":"Chocolates"},
        {"code":"KK6546","prod":"Kitkat","price":15,"instock":"Yes","category":"Chocolates"},
        {"code":"PER5436","prod":"Perk","price":8,"instock":"No","category":"Chocolates"},
        {"code":"FST241","prod":"5 Star","price":25,"instock":"Yes","category":"Chocolates"},
        {"code":"NUT553","prod":"Nutties","price":18,"instock":"Yes","category":"Chocolates"},
        {"code":"GEM006","prod":"Gems","price":8,"instock":"No","category":"Chocolates"},
        {"code":"GD2991","prod":"Good Day","price":25,"instock":"Yes","category":"Biscuits"},
        {"code":"PAG542","prod":"Parle G","price":5,"instock":"Yes","category":"Biscuits"},
        {"code":"MON119","prod":"Monaco","price":7,"instock":"No","category":"Biscuits"},
        {"code":"BOU291","prod":"Bourbon","price":22,"instock":"Yes","category":"Biscuits"},
        {"code":"MAR951","prod":"MarieGold","price":15,"instock":"Yes","category":"Biscuits"},
        {"code":"ORE188","prod":"Oreo","price":30,"instock":"No","category":"Biscuits"}
    ];
    let billDataJsonCopy=[...billDataJson];
    let categoryopt=["Beverages","Chocolates","Biscuits",];
    let stockopt=["Yes","No"];
    let priceopt=['<10','10-20','>20'];
    let headX=-1;
    let currentBillJson=[];
    let totalCurVal=0;
    let totalCurQuantity=0;
    let selCat='';
    let selStock='';
    let selPrice='';

    // show();
    function show(active=0){
        let str=makeNavbar(active);
        active === 1 ?str+=showBillDataTable():str+='';
        document.getElementById('showDetails').innerHTML=str;
    }
    function makeNavbar(active=0){
        let str='<nav class="navbar navbar-expand-lg bg-secondary navbar-dark mb-5">';
        str+='<a class="navbar-brand" href="#">BillingSystem</a>';
        str+='<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">';
        str+='<span class="navbar-toggler-icon"></span>';
        str+='</button>';
        // console.log(str);
        str+='<div class="collapse navbar-collapse" id="collapsibleNavbar">';  
        str+='<ul class="navbar-nav">';
            
        let active1=active===1?'active':'';
        str+='<li class="nav-item '+active1+' ">';
        str+='<a class="nav-link" onclick="showBillData()">New Bill</a>';
        str+='</li>';
        str+='</ul>';
        str+='</div>';
        str+='</nav>'; 
        // console.log(str);
        return str;
    }
    function showBillData(){
        billDataJson=billDataJsonCopy;
        show(1);
    }
   
    function showBillDataTable(){
         let arr=billDataJson.map((st,index)=>{
        let {code,prod,price,instock,category}=st;
            let str='<div class="row border">';
            str+='<div class="col-2">'+code+'</div>';
            str+='<div class="col-2">'+prod+'</div>';
            str+='<div class="col-2">'+category+'</div>';
            str+='<div class="col-2">'+price+'</div>';
            str+='<div class="col-2">'+instock+'</div>';
            str+='<div class="col-2"><button type="button" class="btn btn-secondary" onclick=addtoBill("'+code+'")>Add to bill</button></div>';
            str+='</div>';
            return str;      
    });
    // console.log(arr);
    let CurHead='<h1>Details of Current Bill</h1>'; 
    let extra='';
    if(currentBillJson.length>0){
        console.log(currentBillJson);
        let arr1=currentBillJson.map(c=>{
            let {code,prod,price,quantity,value}=c;
            totalCurVal+=value;
            totalCurQuantity+=quantity;

            let str='<div class="row border">';
            str+='<div class="col-6">'+code+' '+prod+' '+'  Price : '+price;
            str+='  quantity : '+quantity+'  value : '+value+'</div>';
            str+='<div class="col-6">'
            str+='<button type="button" class="btn btn-success ml-1" onclick=addtoBill("'+code+'")>+</button>';
            str+='<button type="button" class="btn btn-warning ml-1" onclick=decreaseQuantity("'+code+'")>-</button>';
            str+='<button type="button" class="btn btn-danger ml-1" onclick=remove("'+code+'")>X</button></div>';
            str+='</div>';
            return str;      
        })
        extra+=arr1.join('');
        extra+='<button type="button" class="btn btn-primary ml-1" onclick=closeBill()>Close Bill</button>';
    }
        CurHead+='<div class="row font-weight-bold">';
        CurHead+='Item : '+currentBillJson.length+' Quantity :'+totalCurQuantity+' Amount : '+totalCurVal;
        CurHead+='</div>'; 
        totalCurVal=0;
        totalCurQuantity=0;
        
    let headData='<h1 class="text-center">Product List</h1>';
        headData+='<div class="row bg-light text-dark">';
        headData+='<div class="col-3"><b>Filter Product by : </b></div>';
        headData+='<div class="col-3">'+makedropdown('cat',categoryopt,selCat,'Select Category')+'</div>';
        headData+='<div class="col-3">'+makedropdown('stock',stockopt,selStock,'Select in Stock')+'</div>';
        headData+='<div class="col-3">'+makedropdown('prc',priceopt,selPrice,'Select Price Range','Select Price Range')+'</div>';
        headData+='</div>';
    let table='<div class="row bg-dark text-white">';
           let htitle0=headX==0?'Code(X)':'Code';
           let htitle1=headX==1?'Product(X)':'Product';
           let htitle2=headX==2?'Category(X)':'Category';
           let htitle3=headX==3?'Price(X)':'Price';
           let htitle4=headX==4?'instock(X)':'instock';
            
            table+='<div class="col-2" onclick="sort(0)">'+htitle0+'</div>';
            table+='<div class="col-2" onclick="sort(1)">'+htitle1+'</div>';
            table+='<div class="col-2" onclick="sort(2)">'+htitle2+'</div>';
            table+='<div class="col-2" onclick="sort(3)">'+htitle3+'</div>';
            table+='<div class="col-2" onclick="sort(4)">'+htitle4+'</div>';
            table+='<div class="col-2"></div>';
            table+='</div>';      
        table+=arr.join('');
        let html=CurHead+extra+headData+table;
        return html;

    }
    function sort(colNo){        
        switch(colNo){
            case 0:billDataJson.sort((p1,p2)=>p1.code.localeCompare(p2.code));headX=0;break;
            case 1:billDataJson.sort((p1,p2)=>p1.prod.localeCompare(p2.prod));headX=1;break;
            case 2:billDataJson.sort((p1,p2)=>p1.category.localeCompare(p2.category));headX=2;break;
            case 3:billDataJson.sort((p1,p2)=>(+p1.price)-(+p2.price));headX=3;break;
            case 4:billDataJson.sort((p1,p2)=>p1.instock.localeCompare(p2.instock));headX=4;break;
        }
        showBillData();
    }
    // let selVal='';
    function makedropdown(id,options,selval,head){
        console.log('selval=',selval);
        const arr1=options.map(opt=>{
            let selectstr=opt===selval ? 'selected' : '';
            return '<option '+selectstr+'>'+opt+'</option>';
        });
        let s1='<div class="form-group">';
        s1+='<select id="'+id+'" onchange="updateDataTable(this)" class="form-control">'; 
        let header='<option>'+head+'</option>';
        if(selval==''){
            header='<option value="">'+head+'</option>'; 
        }        
        s1+=header+arr1.join('');
        s1+="</select>";
        s1+='</div>';   
        // console.log(s1);
        return s1;   
    }

    function updateDataTable(val){
        // console.log(val);

        let categoryVal=document.getElementById('cat').value;
        let StockVal=document.getElementById('stock').value;
        let PriceVal=document.getElementById('prc').value;
        console.log('categoryVal=',categoryVal,'stock',StockVal,'price',PriceVal)
        categoryVal=categoryVal=='Select Category'?'':categoryVal;
        StockVal=StockVal=='Select in Stock'?"":StockVal;
        PriceVal=PriceVal=='Select Price Range'?'':PriceVal;
        if(categoryVal=='' && StockVal=='' && PriceVal==''){
            console.log('In all null')
            billDataJson=billDataJsonCopy;
            selCat=categoryVal;
            selStock=StockVal;  
            selPrice=PriceVal; 
            billDataJson.sort((p1,p2)=>p1.prod.localeCompare(p2.prod));headX=-1;
            show(1);
        }
        else{
            if(categoryVal!='' && StockVal=='' && PriceVal==''){
                billDataJson=billDataJsonCopy.filter(s=>{
                   return s.category==categoryVal;
               })
           }
           if(categoryVal=='' && StockVal!='' && PriceVal==''){
               billDataJson=billDataJsonCopy.filter(s=>{
                   return s.instock==StockVal;
               });
           }
   
           if(categoryVal=='' && StockVal=='' && PriceVal!=''){
               billDataJson=billDataJsonCopy.filter(s=>{
                   // let priceopt=['<10','10-20','>20'];
                   price=parseInt(s.price);
                   if(PriceVal=='<10')
                       return price<10;
                   else if(PriceVal=='10-20')
                       return price >=10 && price<=20;
                   else if(PriceVal=='>20'){
                       return price>20;
                   }
               });
           }
           if(categoryVal!='' && StockVal!='' && PriceVal==''){
               billDataJson=billDataJsonCopy.filter(s=>{
                   return s.category==categoryVal;
               })
               billDataJson=billDataJson.filter(s=>{
                   return s.instock==StockVal;
               })
               
           }
           if(categoryVal!='' && StockVal=='' && PriceVal!=''){
               billDataJson=billDataJsonCopy.filter(s=>{
                   return s.category==categoryVal;
               })
               billDataJson=billDataJson.filter(s=>{
                   // let priceopt=['<10','10-20','>20'];
                   price=parseInt(s.price);
                   if(PriceVal=='<10')
                       return price<10;
                   else if(PriceVal=='10-20')
                       return price >=10 && price<=20;
                   else if(PriceVal=='>20'){
                       return price>20;
                   }
               })
           }
           if(categoryVal=='' && StockVal!='' && PriceVal!=''){
               billDataJson=billDataJsonCopy.filter(s=>{
                   return s.instock==StockVal;
               })
               billDataJson=billDataJson.filter(s=>{
                   // let priceopt=['<10','10-20','>20'];
                   price=parseInt(s.price);
                   if(PriceVal=='<10')
                       return price<10;
                   else if(PriceVal=='10-20')
                       return price >=10 && price<=20;
                   else if(PriceVal=='>20'){
                       return price>20;
                   }
               })
           }
           if(categoryVal!='' && StockVal!='' && PriceVal!=''){
               billDataJson=billDataJsonCopy.filter(s=>{
                   return s.category==categoryVal;
               })
               billDataJson=billDataJson.filter(s=>{
                   return s.instock==StockVal;
               })
               billDataJson=billDataJson.filter(s=>{
                   price=parseInt(s.price);
                   if(PriceVal=='<10')
                       return price<10;
                   else if(PriceVal=='10-20')
                       return price >=10 && price<=20;
                   else if(PriceVal=='>20'){
                       return price>20;
                   }
               })
           }
           selCat=categoryVal;
           selStock=StockVal;  
           selPrice=PriceVal; 
           billDataJson.sort((p1,p2)=>p1.prod.localeCompare(p2.prod));headX=1;
           show(1);
        }
    }
    function addtoBill(code){
        // let {code,prod,price,quantity,value}=c;
        let st={};        
        let arr1=currentBillJson.find(c=>{
            return c.code==code;
        })       
        
        if(arr1){
            arr1.quantity++;
            arr1.value=arr1.price*arr1.quantity;

        }else{  
            let arr=billDataJson.find(b=>{
                return b.code==code;
            })          
            st.code=arr.code;
            st.prod=arr.prod;
            st.price=arr.price;
            st.quantity=1; 
            let qty=st.quantity*1;
            let prc=st.price*1;
            st.value=prc*qty;
            console.log(st);
            currentBillJson.push(st);
        }
       
        show(1);       
        
    }


    function remove(code){
        let index=currentBillJson.findIndex(c=>{
            return c.code==code;
        })
        currentBillJson.splice(index,1);
        show(1);
    }

    function decreaseQuantity(code){
        let r2=currentBillJson.find(function(ele){
            return ele.code==code;
        });
        let index=currentBillJson.findIndex(function(ele){
            return ele.code==code;
        });
        if(r2.quantity>0){
            r2.quantity--;
            r2.value=r2.value-r2.price;
        }
        else{
            if(index>=0){
                currentBillJson.splice(index,1);
            }
        }
        show(1);
    }

    function closeBill(){
        currentBillJson=[];
        alert('Closing The Current Bill');
        show(1);
    }
    