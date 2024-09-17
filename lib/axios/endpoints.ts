import http from './http';
import {
  CreateInvoiceModel,
  DataResponse,
  ImageModel,
  InvoiceModel,
  ProductModel,
  SigninModel,
  UserModel,
  UserRegisterOrUpdateModel,
} from './model';

class ApiService {
  signup(data: UserRegisterOrUpdateModel) {
    return http.post<UserModel>('/v1/signup', data);
  }

  signin(data: SigninModel) {
    return http.post<DataResponse<{ token: string; user: UserModel }>>(
      '/api/Auth/login',
      data
    );
  }

  updateUser(data: UserRegisterOrUpdateModel) {
    return http.post<UserModel>('/v1/user/update', data);
  }

  getUsers() {
    return http.get<DataResponse<UserModel[]>>('/api/User');
  }

  deleteUser(id?: number) {
    return http.delete<DataResponse<UserModel>>(`/api/User/${id}`);
  }

  postUser(data: UserModel) {
    return http.post<DataResponse<UserModel>>('/api/User', data);
  }

  patchUser(data: UserModel) {
    return http.patch<DataResponse<UserModel>>(
      `/api/User/${data.userId}`,
      data
    );
  }

  getUserById(id?: number) {
    return http.get<DataResponse<UserModel[]>>(`/api/User/${id}`);
  }

  postImage(formData: FormData) {
    return http.post<DataResponse<ImageModel>>('/api/Image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      transformRequest: (data, headers) => {
        return formData; // this is doing the trick
      },
    });
  }

  getImageById(id: any) {
    return http.get<DataResponse<any>>(`/api/Image/${id}`);
  }

  getProduct() {
    return http.get<DataResponse<ProductModel[]>>(`/api/Product`);
  }

  postProduct(data: ProductModel) {
    return http.post<DataResponse<ProductModel>>('/api/Product', data);
  }

  patchProduct(data: ProductModel) {
    return http.patch<DataResponse<ProductModel>>(
      `/api/Product/${data.productId}`,
      data
    );
  }

  deleteProduct(id?: number) {
    return http.delete<DataResponse<ProductModel>>(`/api/Product/${id}`);
  }

  createOrder(data: CreateInvoiceModel) {
    return http.post<DataResponse<CreateInvoiceModel>>('/api/Order', data);
  }

  getOrder() {
    return http.get<DataResponse<InvoiceModel[]>>('/api/Order');
  }

  deleteOrder(id: number) {
    return http.delete<DataResponse<InvoiceModel>>(`/api/Order/${id}`);
  }
}

export default new ApiService();
