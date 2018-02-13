import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AppComponent } from './app.component';
import { VideoBackgroundComponent } from './video-background/video-background.component';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from '../services/loader.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let el: HTMLElement;
  let debugEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      declarations: [
        AppComponent,
        VideoBackgroundComponent,
        LoaderComponent
      ],
      providers: [ LoaderService ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    el = fixture.debugElement.componentInstance;
    debugEl = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    expect(el).toBeTruthy();
  }));

  it(`should have <app-video-background>`, async(() => {
    const videoComponent = debugEl.query(By.directive(VideoBackgroundComponent));
    expect(videoComponent).not.toBeNull();
  }));

  it('should have a <router-outlet>', () => {
    const outlet = debugEl.query(By.directive(RouterOutlet));
    expect(outlet).not.toBeNull();
  });
});
