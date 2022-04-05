import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayListComponent } from './pages/play-list/play-list.component';
import { HeaderComponent } from './pages/shared/header/header.component';
import { FooterComponent } from './pages/shared/footer/footer.component';

import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { SignComponent } from './pages/sign/sign.component';
import { WatchVideoComponent } from './pages/watch-video/watch-video.component';

import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    PlayListComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SignComponent,
    WatchVideoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
