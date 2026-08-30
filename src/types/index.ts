export type CategorySlug =
  | "mobl-rahati"
  | "mobl-tak"
  | "mobl-tak-rahati"
  | "mobl-l"
  | "miz-nahar-khori";

export interface Category {
  slug: CategorySlug;
  title: string;
  image: string;
  productCount: number;
}

export type ProductColor = {
  name: string;
  hex: string;
};

export interface Product {
  id: string;
  slug: string;
  title: string;
  category: CategorySlug;
  /** قیمت ثابت نمایشی — طبق سیاست فروشگاه، جنس چوب و رنگ روی این عدد اثر نمی‌گذارد. */
  price: number;
  inStock: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  images: string[];
  /** رنگ‌های نمونه صرفاً جهت الهام؛ رنگ نهایی به انتخاب مشتری است. برای محصولاتی مثل میز که رنگ‌پذیر نیستند خالی می‌ماند. */
  colors?: ProductColor[];
  /** گزینه‌های جنس چوب قابل انتخاب — تأثیری در قیمت نمایشی ندارد. */
  woodOptions: string[];
  description: string;
  specs: {
    dimensions: string;
    frameMaterial: string;
    fabricMaterial: string;
    leadTime: string;
  };
}

export interface CartItem {
  productId: string;
  colorName: string;
  woodMaterial: string;
  quantity: number;
}

export type OrderStatus = "pending_payment";

export interface CustomerInfo {
  fullName: string;
  phone: string;
  address: string;
  postalCode: string;
  notes?: string;
}

export interface Order {
  orderNumber: string;
  status: OrderStatus;
  customer: CustomerInfo;
  items: CartItem[];
  total: number;
  createdAt: string;
}
