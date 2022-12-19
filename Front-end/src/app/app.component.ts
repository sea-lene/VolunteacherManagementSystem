import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { env } from 'process';
import { environment } from 'src/environments/environment';
import { User } from './core/model/user';
import { authentication } from './home/shared-services/authentication.service';
import { UsersService } from './user/services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'argon-dashboard-angular';

  constructor(private authService: authentication, private userService: UsersService, private router: Router) { }

 
  ngOnInit():void
  {
    let countTab = localStorage.getItem(this.authService.TOTAL_TAB)
    
    if(countTab == null)
      localStorage.setItem(this.authService.TOTAL_TAB, (1).toString())
    // else
      // this.router.navigate(['/error-page'])
  }

  @HostListener('window:beforeunload')
  ngOnDestroy()
  {
    if(!(this.router.url == '/error-page'))
      localStorage.removeItem(this.authService.TOTAL_TAB)
  }
}
