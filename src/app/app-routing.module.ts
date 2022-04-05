import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayListComponent } from './pages/play-list/play-list.component';
import {HomeComponent} from './pages/home/home.component';
import {SignComponent} from './pages/sign/sign.component';
import {WatchVideoComponent} from './pages/watch-video/watch-video.component';
const routes: Routes = [
  { path: '', redirectTo: '/sign', pathMatch: 'full' },
  { path: 'sign', component: SignComponent },
  { path: 'playList', component: PlayListComponent },
  { path: 'home', component: HomeComponent },
  { path: 'watchVideo', component: WatchVideoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
