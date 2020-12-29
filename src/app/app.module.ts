import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { fuseConfig } from './fuse-config';
import { LayoutModule } from './layout/layout.module';
import { TranslateModule } from '@ngx-translate/core';
import { ApiService } from './services/api.service';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';
import { HttpService } from './services/http.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const DATE_FORMAT = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'MM/DD/YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    // Material
    MatButtonModule,
    MatIconModule,
    MatMomentDateModule,
    MatDialogModule,
    MatSnackBarModule,
    // Fuse modules
    FuseModule.forRoot(fuseConfig),
    FuseProgressBarModule,
    FuseSharedModule,
    FuseSidebarModule,
    FuseThemeOptionsModule,

    LayoutModule,
    AppRoutingModule
  ],
  providers: [ApiService, AuthService, DataService, HttpService, { provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT }],
  bootstrap: [AppComponent]
})
export class AppModule { }
