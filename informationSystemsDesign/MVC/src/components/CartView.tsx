import React, { useState } from "react";
import Product from "../types/product";
import CartController from "../controllers/cartController";

import "./cartView.css";

const CartView: React.FC = () => {
   const [price, setPrice] = useState<number>(0);
   const [quantity, setQuantity] = useState<number>(0);
   const [discount, setDiscount] = useState<number>(0);

   const handleCalculate = () => {
      const product: Product = { price, quantity };
      CartController.setProduct(product);
      const result = CartController.getDiscount();
      setDiscount(result);
   };
   return (
      <div className="cart-container">
         <h2>Розрахунок знижки</h2>

         <label>
            Ціна товару:
            <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
         </label>

         <label>
            Кількість:
            <input
               type="number"
               value={quantity}
               onChange={(e) => setQuantity(Number(e.target.value))}
            />
         </label>

         <button onClick={handleCalculate}>Обчислити знижку</button>

         <h3>Знижка: {discount.toFixed(2)} грн</h3>
      </div>
   );
};

export default CartView;
