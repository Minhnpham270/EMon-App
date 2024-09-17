export interface SigninModel {
  username: string;
  password: string;
}

export interface UserRegisterOrUpdateModel {
  password: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface DataResponse<T> {
  data: T;
  message: string;
  status: number;
  success: boolean;
}

export interface UserModel {
  userId?: number;
  image?: string;
  password?: string;
  username: string;
  imageUser?: string;
  phoneNumber?: number | string;
  fullName?: string;
  roleId?: number;
}

export interface Token {
  access_token: string;
  refresh_token: string;
}

export interface ProductModel {
  productId: number;
  productName: string;
  productPrice: number;
  productDescription: string;
  productImageId?: string;
  productImagePath?: string;
  productQuantity: number;
  quantityInOrder: number;
  productSKU: string;
  productCost: number;
  count: number;
  productQuantitySold?: number;
}

export interface ImageModel {
  imageId: number | string;
  imagePath: string;
  imageName: string;
}

export interface ProductModelTest {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
  code: string;
  count: number;
}

export interface InvoiceModel {
  orderId: number;
  orderName: string;
  products: ProductModel[];
  createdDate: string;
}

export interface CreateInvoiceModel {
  orderId?: number;
  orderName: string;
  products: {
    productId: number;
    quantityInOrder: number;
  }[];
}
