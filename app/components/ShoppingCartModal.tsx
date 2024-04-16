"use client"

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart"


export default function ShoppingCartModal() {

  const {
    cartCount,
    shouldDisplayCart,
    cartDetails,
    totalPrice,
    redirectToCheckout,
    handleCartClick,
    removeItem,
  } = useShoppingCart();

  // console.log("cart :" , cartDetails) // its work 

  async function handleCheckout(e: any) {
    e.preventDefault();
    try {
      const result = await redirectToCheckout();

      if(result?.error){
        console.log('result error')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Sheet open={shouldDisplayCart} onOpenChange={() => handleCartClick()} >
      <SheetContent className="sm:max-w-lg w-[90vw]">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>

        <div className="h-full flex flex-col justify-between">
          <div className="mt-8 flex-1 overflow-y-auto">
            <ul className="-my-6 divide-y divide-gray-200">
              {
                
                Object.values(cartDetails ?? {}).map((val) => {
                  return <li key={val._id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <Image
                          src={val.image as string}
                          alt="Product image"
                          width={100}
                          height={100}
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>{val.name}</h3>
                              <p className="ml-4">${val.price}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                              {val.description}
                            </p>
                          </div>

                          <div className="flex flex-1 items-center justify-between text-sm">
                            <p className="text-gray-500">QTY: {val.quantity}</p>

                            <div className="flex">
                              <button 
                              onClick={() => removeItem(val.id)}
                              type="button" className="font-medium text-primary hover:text-primary/80">
                                remove
                              </button>
                            </div>
                          </div>
                      </div>
                  </li>
                })
                
              }
              
            </ul>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal :</p>
              <p>${totalPrice}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes are calculated at checkout .
            </p>

            <div className="mt-6">
              <Button 
                onClick={handleCheckout}
                className="w-full"
              >Checkout Now</Button>
            </div>

            <div className="mt-6 justify-center text-center text-sm text-gray-500">
              <p>
                OR <button 
                onClick={() => handleCartClick()}
                className="text-primary font-medium hover:text-primary/80"> Continue Shopping </button>
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>

  )
}

