import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateMenu(tag){
    if (tag === 'Home'){
      this.router.navigate(['/home']);
    }
    if (tag === 'Main'){
      this.router.navigate(['/main']);
    }
    if (tag === 'Page0'){
      this.router.navigate(['/page0']);
    }
    if (tag === 'Page1'){
      this.router.navigate(['/page1']);
    }
    if (tag === 'Auth'){
      this.router.navigate(['/auth']);
    }
  }

  onNavigate(){
    window.open('https://github.com/mchirico/ts-express', '_blank');

  }
}
