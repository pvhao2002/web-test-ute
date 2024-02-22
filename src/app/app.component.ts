import {
  Component,
  OnInit
} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {
  NzTabComponent,
  NzTabSetComponent
} from "ng-zorro-antd/tabs";
import {NzPageHeaderComponent} from "ng-zorro-antd/page-header";
import {
  HttpClient,
  HttpClientModule
} from "@angular/common/http";
import {forkJoin} from "rxjs";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzCarouselComponent} from "ng-zorro-antd/carousel";
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {
  NzImageDirective,
  NzImageModule,
  NzImageService
} from "ng-zorro-antd/image";
import {
  AsyncPipe,
  CurrencyPipe
} from "@angular/common";
import {NzIconModule} from "ng-zorro-antd/icon";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    NzTabSetComponent,
    NzTabComponent,
    NzPageHeaderComponent,
    HttpClientModule,
    NzTableModule,
    NzCarouselComponent,
    NzDividerComponent,
    NzImageDirective,
    AsyncPipe,
    CurrencyPipe,
    NzIconModule,
    NzImageModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  listProduct1: any = [];
  listProduct2: any = [];
  listUser: any = [];

  constructor(private http: HttpClient, private nzImageService: NzImageService) {
  }

  ngOnInit(): void {
    const lP1 = this.http.get('https://api.escuelajs.co/api/v1/products');
    const lP2 = this.http.get('https://fakestoreapi.com/products');
    const lU = this.http.get('https://fakestoreapi.com/users');

    forkJoin([lP1, lP2, lU])
      .subscribe({
        next: ([listProduct1, listProduct2, listUser]) => {
          this.listProduct1 = listProduct1;
          this.listProduct2 = listProduct2;
          this.listUser = listUser;
        },
        error: (error) => {
          alert('Error al cargar los datos');
        }
      });
  }

}
