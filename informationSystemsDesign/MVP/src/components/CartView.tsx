import React, { useState } from "react";
import Product from "../types/product";
import { CartPresenter } from "./../presenters/CartPresenter";

import "./cartView.css";

const CartView: React.FC = () => {
   const [price, setPrice] = useState<number>(0);
   const [quantity, setQuantity] = useState<number>(0);
   const [discount, setDiscount] = useState<number>(0);

   const presenter = new CartPresenter(setDiscount);

   const handleCalculate = () => {
      const product: Product = { price, quantity };
      presenter.calculateDiscount(product);
   };

   return (
      <div className="cart-container">
         <h2>Розрахунок знижки MVP</h2>

         <label>
            Ціна товару:
            <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
         </label>
         <br />

         <label>
            Кількість:
            <input
               type="number"
               value={quantity}
               onChange={(e) => setQuantity(Number(e.target.value))}
            />
         </label>
         <br />

         <button onClick={handleCalculate}>Обчислити знижку</button>

         <h3>Знижка: {discount.toFixed(2)} грн</h3>
      </div>
   );
};

export default CartView;
