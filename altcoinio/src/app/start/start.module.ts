import {Injectable, NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {StartComponent} from "./start/start.component";
import {
  MatButtonModule, MatCardModule,
  MatDialogModule, MatExpansionModule, MatIconModule, MatInputModule, MatMenuModule, MatSidenavModule, MatTabsModule,
  MatToolbarModule
} from "@angular/material";
import {PreloadingStrategy, Route, Router, RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FlexLayoutModule} from "@angular/flex-layout";
import {Observable} from "rxjs/Observable";
import { LogoutDialogComponent } from './logout-dialog/logout-dialog.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@Injectable()
export class SelectivePreloadingStrategy implements PreloadingStrategy {
  preloadedModules: string[] = [];

  constructor(private router: Router) {

  }

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data["preload"]) {
      console.log(this.router.url);
      // add the route path to the preloaded module array
      this.preloadedModules.push(route.path);

      // log the route path to the console
      console.log("Preloaded: " + route.path, route);

      return load();
    } else {
      return Observable.of(null);
    }
  }
}

@NgModule({
  declarations: [
    StartComponent,
    LogoutDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatExpansionModule,
    MatCardModule,
    RouterModule.forRoot([
      {
        path: "", loadChildren: "app/app.module#AppModule", data: {preload: true}
      },
    ], {preloadingStrategy: SelectivePreloadingStrategy}),
    FlexLayoutModule,
  ],
  providers: [SelectivePreloadingStrategy],
  bootstrap: [StartComponent],
  entryComponents: [LogoutDialogComponent]
})
export class StartModule {
}

