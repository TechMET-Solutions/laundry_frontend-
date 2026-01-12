import {
  IoShirt,
} from "react-icons/io5";
import {
  GiHoodie,
  GiConverseShoe,
} from "react-icons/gi";
import { BiBlanket, BiCategory } from "react-icons/bi";

const categories = [
  { name: "Ghutra", icon: IoShirt },
  { name: "Under T-Shirt", icon: IoShirt },
  { name: "Designer Saree", icon: IoShirt },
  { name: "Hoodies", icon: GiHoodie },
  { name: "Blanket", icon: BiBlanket },
  { name: "Long Dress", icon: IoShirt },
  { name: "Underwear & Socks", icon: IoShirt },
  { name: "Sweater", icon: IoShirt },
  { name: "Scarf", icon: IoShirt },
  { name: "Bedsheet single", icon: BiBlanket },
  
];

 function Category() {
  return (
    <aside className="bg-slate-100">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;

          return (
            <div
              key={cat.name}
              className="bg-white rounded-xl p-4
                         flex flex-col items-center justify-center
                         cursor-pointer
                         hover:shadow-md
                         active:scale-95 transition"
            >
              <Icon className="text-4xl text-indigo-300 mb-2" />
              <span className="text-sm font-medium text-gray-600 text-center">
                {cat.name}
              </span>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
export default Category;