import { NgModule } from '@angular/core';
import { CoreAuthenticationModule } from '../core-authentication/core-authentication.module';
import { CoreHelperModule } from '../core-helper/core-helper.module';
import { CoreHttpModule } from '../core-http/core-http.module';
import { CoreInterceptorModule } from '../core-interceptor/core-interceptor.module';



@NgModule({
  declarations: [],
  imports: [
    CoreHelperModule,
    CoreHttpModule,
    CoreInterceptorModule,
    CoreAuthenticationModule
  ]
})
export class CoreModule { }
