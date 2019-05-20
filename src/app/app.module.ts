import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule} from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LazyLoadModule } from './lazy-load/lazy-load.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    RouterModule,
    CoreModule,
    AuthModule,
    BrowserAnimationsModule,
    LazyLoadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
