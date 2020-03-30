import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';

   onEnded(eventData){
    console.log ("APP: player ended!!");
    console.log(eventData);
  };

  onSeeking(eventData){
    console.log ("APP: player seeked to:");
    console.log(eventData);
  };

}
