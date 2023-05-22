import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { GiFoodTruck } from "react-icons/gi";
import "./cart.scss";
import OrderModal from "../modals/OrderModal";

const Cart = ({
  setShowCart,
  count,
  List,
  updateQuantity,
  remove,
  clearOrders,
}) => {
  const increase = (id) => {
    updateQuantity(id, true);
  };

  const decrease = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.id, false);
    }
  };

  let calculateTotal = ()=>{

    let temp = 0;

  for(const element of List){
    temp += element.price * element.quantity;
  }
  

  return temp;

}

  return (
    <div
      className="w-full bg-black/40 fixed top-0 right-0 z-20 transition delay-150 duration-300 ease-in-out"
     
    >
      <div className="h-screen w-[600px] bg-white float-right p-12 relative">
        <button
          type="button"
          className="flex items-center text-lg font-semibold cursor-pointer gap-[2px] ml-[10px] border-none bg-transparent"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="ml-[10px]">Your Cart</span>
          <span className="ml-[10px] text-red-500"> ({count} Item)</span>
        </button>
        {count < 1 && (
          <div className="m-[40px] justify-center items-center flex flex-col">
            <GiFoodTruck className="" size={100} />
            <h3 className="font-semibold text-xl">No food has been selected</h3>
          </div>
        )}
        <div className="product-container h-screen">
          {count >= 1 &&
            List.map((item) => (
              <div className="product" key={item?.id}>
                <img src="food.jpg" className="cart-product-image" alt="" />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item?.name}</h5>
                    <h4>Ghc{item?.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span className="minus" onClick={() => decrease(item)}>
                          <AiOutlineMinus />
                        </span>
                        <span className="num" onClick="">
                          {item?.quantity}
                        </span>
                        <span
                          className="plus"
                          onClick={() => increase(item.id)}
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={(event) => remove(item.id)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {count >= 1 && (
          <div className="cart-bottom">
            <div className="total font-bold">
              <h3>Subtotal: </h3>
              <h3>Ghc {calculateTotal()}</h3>
            </div>
            <div className="cart-container">
                <OrderModal
                  orders={List}
                  clearOrders={clearOrders}  
                  total={calculateTotal()}
                />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
