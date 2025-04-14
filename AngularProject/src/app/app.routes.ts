import { Routes } from '@angular/router';
import { MasterComponent } from './components/master/master.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProductManagementComponent } from './components/product-management/product-management.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { OrderManagerComponent } from './components/order-manager/order-manager.component';
import { InventoryTrackingComponent } from './components/inventory-tracking/inventory-tracking.component';

export const routes: Routes = [{
    path:'',
    redirectTo:'master',
    pathMatch:'full'
},
{
    path:'master',
    component:MasterComponent
},
{
    path:'register',
    component:RegisterComponent
},
{
    path:'login',
    component:LoginComponent
},
{
    path:'product-management',
    component:ProductManagementComponent
},
{
    path:'product-details',
    component:ProductDetailsComponent
},
{
    path:'supplier',
    component:SupplierComponent
},
{
    path:'order-manager',
    component:OrderManagerComponent
},
{
    path:'inventory-tracking',
    component:InventoryTrackingComponent
}
];
