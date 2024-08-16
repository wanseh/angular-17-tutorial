import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // need to import since we are using the routerlink property

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
