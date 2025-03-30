import { SellerDTO } from "./SellerDTO"

export type ProductDTO = {
  id: string
  title: string
  description: string
  priceInCents: number
  status: "available" | "sold" | "cancelled"
  owner: SellerDTO,
  category: {
    id: string,
    title: string,
    slug: string
  },
  attachments: [
    {
      id: string,
      url: string
    }
  ]
}
