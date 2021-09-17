import { createContext, useContext, useState} from 'react'

export const CartContext= createContext();

export const useCartContext = () => useContext(CartContext)

export const CartContextProvider = ({children}) => {

  const [cart, setCart] = useState([]);
  console.log(cart);
  const isInCart = (id) => cart.some((item)=> item.id === id);
  
  const addToCart = (item, quantity) =>{
    if(isInCart(item.id)){
      const newCart=cart.map((cartElement)=>{
        if(cartElement.id === item.id){
          return{...cartElement,quantity: cartElement.quantity+quantity}
        }else return cartElement;
      });
      setCart(newCart);
    }else{
      setCart((prev)=> [...prev, {...item,quantity}]);
    }
  }

  const removeItem = (itemId) =>{
    setCart(cart.filter((elem)=> elem.item.id !==itemId))
  }

  const clear=()=> setCart([]);

  return(
    <CartContext.Provider value={{cart, addToCart, removeItem, clear}}>
      {children}
    </CartContext.Provider>
  )
}