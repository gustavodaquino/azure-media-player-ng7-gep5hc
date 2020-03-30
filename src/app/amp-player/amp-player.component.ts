import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'amp',
  templateUrl: './amp-player.component.html',
  styleUrls: ['./amp-player.component.css']
})
export class AmpPlayerComponent implements OnInit {
  @ViewChild('video') videoPlayer;
  @Input() id;
  @Input() src;
  @Input() autoplay;
  @Input() width;
  @Input() height;
  @Output() ended: EventEmitter<any> = new EventEmitter();
  @Output() seeking: EventEmitter<any> = new EventEmitter();
  public version: string = "2.2";

  constructor() { }

  ngOnInit() {
    console.log(this.videoPlayer);

    // Dynamically load the amp player control
    var myPlayer = amp(this.videoPlayer.nativeElement, {
      /* Options */
      "nativeControlsForTouch": false,
      autoplay: this.autoplay,
      controls: true,
      width: this.width,
      height: this.height,
      id: this.id,
      logo: { enabled: false },
      ampAds: {
        preRoll: {
          sourceUri: '//sr-test.azurewebsites.net/Plugins/AMP2/Preroll_amp/vast_test.xml', //be sure to include your own VAST compliant ad tag provided from your Ad Server. this is a hardcoded VAST for demo purposes 
          options:
          {
            skipAd:
            {
              enabled: true,
              offset: 3
            }
          }
        },
        midRoll: [
        {
          sourceUri: '//sr-test.azurewebsites.net/Plugins/AMP2/Preroll_amp/vast_test.xml',//be sure to include your own VAST compliant ad tag provided from your Ad Server. this is a hardcoded VAST for demo purposes 
          startTime: 50,
          options:
          {
            skipAd:
            {
              enabled: true,
              offset: 3
            }
          }
        }
        ],
        mainProgram: {
            source:  [{
                src: this.src
              }]
        }
      }
    }
    );

    myPlayer.ngComponent = this;

    // Add playback ended event listener
    myPlayer.addEventListener('ended', this.amp_ended);
    myPlayer.addEventListener('seeking', this.amp_seeking);

  }

  amp_ended() {
    console.log("AMP::Playback ended");
    console.log(this.ngComponent.version);
    console.log(this.ngComponent.ended);
    this.ngComponent.ended.emit(null);
  }

  amp_seeking() {
    console.log("AMP::Seek event");
    this.ngComponent.seeking.emit(this.currentTime());
  }

}