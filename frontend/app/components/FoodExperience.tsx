import KitchenCanvas from "./KitchenCanvas";
import PizzaCanvas from "./PizzaCanvas";
import BurgerKitchenCanvas from "./BurgerKitchenCanvas";
import BurgerCanvas from "./BurgerCanvas";
import JuiceKitchenCanvas from "./JuiceKitchenCanvas";
import JuiceCanvas from "./JuiceCanvas";
import FriesKitchenCanvas from "./FriesKitchenCanvas";
import FriesCanvas from "./FriesCanvas";
import LavaCakeKitchenCanvas from "./LavaCakeKitchenCanvas";
import LavaCakeCanvas from "./LavaCakeCanvas";

export default function FoodExperience() {
  // Cinematic scroll-driven experience:
  // 0. The Master Kitchen (Pan zoom transition into pizza chef)
  // 1. Pizza (canvas)                    — slug "pizza"
  // 1.5 Burger Kitchen Transition        — slug "burger-kitchen"
  // 2. Burger (canvas)                   — slug "burger"
  // 2.5 Juice Kitchen Transition         — slug "juice-kitchen"
  // 3. Mango Lassi (canvas)              — slug "mango-lassi"
  // 3.5 Fries Kitchen Transition         — slug "fries-kitchen"
  // 4. French Fries (canvas)             — slug "french-fries"
  // 4.5 Lava Cake Kitchen Transition     — slug "lava-cake-kitchen"
  // 5. Chocolate Lava Cake (canvas)      — slug "chocolate-lava-cake"

  return (
    <div id="food-sections">
      {/* 00 — Master Kitchen (Transition sequence into Pizza Chef station) */}
      <KitchenCanvas scrollHeight={4} />

      {/* 01 / 05 — Pizza */}
      <PizzaCanvas scrollHeight={5} />

      {/* Burger Kitchen Transition (Transition sequence into Burger station) */}
      <BurgerKitchenCanvas scrollHeight={4} />

      {/* 02 / 05 — Burger */}
      <BurgerCanvas scrollHeight={5} />

      {/* Juice Kitchen Transition (Transition sequence into Juice / Mango Lassi station) */}
      <JuiceKitchenCanvas scrollHeight={4} />

      {/* 03 / 05 — Mango Lassi / Juice */}
      <JuiceCanvas scrollHeight={5} />

      {/* Fries Kitchen Transition (Transition sequence into Fries station) */}
      <FriesKitchenCanvas scrollHeight={4} />

      {/* 04 / 05 — French Fries */}
      <FriesCanvas scrollHeight={5} />

      {/* Lava Cake Kitchen Transition (Transition sequence into Lava Cake dessert station) */}
      <LavaCakeKitchenCanvas scrollHeight={4} />

      {/* 05 / 05 — Chocolate Lava Cake */}
      <LavaCakeCanvas scrollHeight={5} />
    </div>
  );
}
