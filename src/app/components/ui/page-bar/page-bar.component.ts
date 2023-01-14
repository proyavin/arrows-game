import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'game-page-bar',
  templateUrl: './page-bar.component.html',
  styleUrls: ['./page-bar.component.scss'],
})
export class PageBarComponent {
  constructor(private readonly router: Router) {}

  back() {
    this.router.navigate(['/'], {replaceUrl: true});
  }
}
