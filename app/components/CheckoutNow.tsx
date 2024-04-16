"use client"

import { Button } from '@/components/ui/button';
import { useShoppingCart } from 'use-shopping-cart';
import { urlFor } from '../lib/sanity';
import { ProductCart } from "./AddToBug"

export default function CheckoutNow({name,price,currency,image,description,price_id}: ProductCart) {
    const {checkoutSingleItem} = useShoppingCart();

    function buyNow(price_id: string){
      checkoutSingleItem(price_id)
    }

    const product = {
        name: name,
        description: description,
        price: price,
        currency: currency,
        image: urlFor(image).url(),
        price_id: price_id
    } 

    console.log("product :", product) // work
  return (
    <Button
    className='ml-2' 
    variant={"secondary"} 
    onClick={() => {
      buyNow(product.price_id)
    }}>
        CheckoutNow
    </Button>
  )
}


