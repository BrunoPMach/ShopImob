import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  titulo = 'ShopImob';

  constructor(private tituloo: Title
    ) {
      this.tituloo.setTitle('ShopImob'); }

  ngOnInit() {
  }

}
