export interface simplifieProduct {
    _id: string,
      name: string,
      price: number
      slug: string,
      categoryName: string,
      imageUrl: string
}


export interface fullProduct {
  _id: string,
  name: string,
  images: any,
  price: number
  slug: string,
  categoryName: string,
  description: string
}

