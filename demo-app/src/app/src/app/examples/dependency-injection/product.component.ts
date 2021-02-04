import { Component, OnInit } from "@angular/core";
import { AppConfig } from "./AppConfig";
import { CartService } from "./cart.service";
import { NewCartService } from "./new-cart.service";

@Component({
  selector: "app-product",
  providers: [
    { provide: AppConfig, useValue: "THIS IS CONFIG" },
    {
      provide: CartService,
      useClass: NewCartService,
    },
    {
      provide: NewCartService,
      useFactory: () => {
        return { text: "NewCartService use Factory", key: 123 };
      },
    },
  ],
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"],
})
export class ProductComponent implements OnInit {
  config: AppConfig;
  cartCalculate = "";

  constructor(
    private _cartService: CartService,
    private _config: AppConfig,
    private _newCartService: NewCartService
  ) {
    this.config = _config;
    console.log(_newCartService);
  }
  ngOnInit() {
    this.cartCalculate = this._cartService.calculateTotal();
  }
}
