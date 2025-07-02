import { StaticImageData } from "next/image";
export interface ApiResponse<T>{
    statusCode: number;
    meta: string | null;
    succeeded: boolean;
    message: string;
    errors: string | null;
    data: T;
  }





////////// field form 

export interface FieldForm {
  name: string;
  label: string;
  type: "text" | "number" | "email" | "select"|"password";
  options?: string[];       
  fetchUrl?: string;
  placeholder?:string 
  requierd?:boolean       
}

////////// field form 


////login
export interface Login{
  email: string;
  password: string;

}
////login



//////card type
export interface Product {
  id: number;
  category_id: number;
  category: string;
  offer: number;
}


export interface main_screen_Product  {
  _id: string;
  title: string;
  traderId: Trader;
  description: string;
  price: number;
  category: string;
  stockQuantity: number;
  images: string[];
  createdAt: string;
  __v: number;
};

export interface  Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};
export interface gethome{
   products: main_screen_Product[];
    pagination: Pagination;
}
export interface CardProps {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  stockQuantity: number;
  images: string[];
  createdAt: string;
  traderId?: Trader;

  // خصائص إضافية لعرض البطاقة
  love?: boolean;
  soldOut?: boolean;
  reviews_avg?: number;
  originalPrice?: number;
  discount?: number;
  packet_price?: number;
  packet_price_after_offer?: number;
  packet_pieces?: number;
  piece_price_after_offer?: number;
  handellove?: () => void;
}


///card type 




///category type 

export interface CategoryProps {
  id: number,
  image: string | StaticImageData
  name: string
  products_count?: number
}
///category type 


///// slider type


export interface ProductSliderItem {
  id: number;
  title?: string;
  image: string;
  product_id?: number;
  product?: Product;
}

export interface SwiperSliderProps {
  items: ProductSliderItem[];
  height?: string;
  objectFit?: "cover" | "contain";
  showNavigation?: boolean;
  showPagination?: boolean;
  autoPlayDelay?: number;
}


///// slider type

///CategoryWithProducts type
export interface CategoryWithProducts {
  id: number;
  name: string;
  image: string;
  products_count: number;
  products: CardProps[];
}



///CategoryWithProducts type



// home type
export interface HomePageData{
sliders: ProductSliderItem[];
  hotDeals: CardProps[];
  topSelling: CardProps[];
  categoriesWithProducts: CategoryWithProducts[];
  categories: CategoryProps[];
}
// home type

export interface acesstoken{
  accessToken: string;
  expires: string;
  tokenType: string;
  scope: string;
  idToken: string;
  sessionState: string;
  user: {
    name: string;
    email: string;
    image?: string;
    sub?: string;
  };
}


/// state managment
export interface HomeDataState {
  data: HomePageData;
  loadingdata: boolean;
  fetchHomeData: () => Promise<void>;
}

//// pagination 
export interface ProductsState {
  products: CardProps[];
  page: number;
  lastPage: number;
  loading: boolean;
  hasMore: boolean;
  searchTerm:string;
  setSearchTerm: (term: string) => void;
  fetchProducts: (reset?: boolean, search?: string) => Promise<void>;
}
///// Add product 
export interface AddProductState {
  name: string;
  description: string;
  price: string;
  stock: number;
  image: string | StaticImageData
  

}

/// sign in 
export interface SignIn{
  phoneNumber:string,
  password: string
}

export interface User {
  name: string;
  email: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}



/// product id 
export interface Trader {
  _id: string;
  firstName: string;
  email: string;
  phoneNumber: string;
    lastName?: string;
}

export interface Product {
  _id: string;
  title: string;
  traderId: Trader;
  description: string;
  price: number;
  category: string;
  stockQuantity: number;
  images: string[];
  createdAt: string; 
  __v: number;
}

/////////////register
export interface signup_user {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string; 
}