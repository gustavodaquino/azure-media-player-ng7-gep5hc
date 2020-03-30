import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AmpPlayerComponent } from './amp-player/amp-player.component';


@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent,  AmpPlayerComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { 

 
}
