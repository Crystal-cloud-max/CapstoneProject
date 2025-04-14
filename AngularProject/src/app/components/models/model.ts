
/** Authorization*/
export class UserCredential{
    id:number;
    name:string;
    email:string;
    password:string;
    role:string;

    constructor(){
        this.id=0;
        this.name='';
        this.email='';
        this.password='';
        this.role='';
    }
}//class to register new user

export class AuthRequest{
    username:string;
    password:string;
    role:string;

    constructor(){
        this.username='';
        this.password='';
        this.role='ADMIN';
    }
}//class to authenticate login user request


/**Product Management */
export class ProductDao{
    id:number;
    sku:number;
    name:string;
    description:string;
    initial_stock:number;

    constructor(){
        this.id=0;
        this.sku=0;
        this.name='';
        this.description='';
        this.initial_stock=0;
    }
}//class for product management

export class AlertsDTO{
    productSku:number;
    quantity:number;

    constructor(){
        this.productSku=0;
        this.quantity=0;
    }
}//class alerts coming from InventoryStockDao

/*Order Management*/  
export class OrderRequestDTO{
    supplier_id:number;
    //totalPrice:number;
    //productSkusAndQuantities:Map<number,number>;
   productSkusAndQuantities: { [key: number]: number };

    constructor(){
        this.supplier_id=0;
       // this.totalPrice=0;
        //this.productSkusAndQuantities = new Map<number,number>;
        this.productSkusAndQuantities = {};
    }
}

export class OrderDTO{
    orderId:number;
    productList:ProductDTO[];
    totalPrice:number;
    supplier:SupplierDTO;

    constructor(){
        this.orderId=0;
        this.productList=[];
        this.totalPrice=0.0;
        this.supplier=new SupplierDTO();
    }
}//class for the order to place

export class ProductDTO{
    productId:number;
    productName:string;
    productQuantity:number;

    constructor(){
        this.productId=0;
        this.productName='';
        this.productQuantity=0;
    }
}//class for the order products

export class SupplierDTO{
    id:number;
    name:string;
    contactInfo:string;
    rating:string;

    constructor(){
        this.id=0;
        this.name='';
        this.contactInfo='';
        this.rating='';
    }
}//class for the order supplier

/*Inventory Management for alerts*/ 
export class InventoryStockDao{
    id:number;
    sku:number;
    quantity:number;

    constructor(){
        this.id=0;
        this.sku=0;
        this.quantity=0;
    }
}//class for inventory stock also for alerts to the Product Management







