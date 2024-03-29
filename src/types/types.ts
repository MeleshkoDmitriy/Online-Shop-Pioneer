export type TFeatures = {
    isSale: boolean
    isNew: boolean
    isTop: boolean
  }
  
export type TProduct = {
    id: number
    category: string
    categoryId: number
    title: string
    price: number
    img: string
    description: string
    rating: number
    isFavorite: boolean
    isCart: boolean
    features: TFeatures
  }
  
export type TCategory = {
  id: number
  title: string
  image: string
}

export type TCartProduct = {
  quantity: number;
} & TProduct;