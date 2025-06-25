import { BaseUrl } from '../components/Baseurl';
import { fetchData } from '../lib/methodes';
import { HomePageData, HomeDataState, ApiResponse } from './../lib/type';
import {create} from 'zustand';
export const HomeStore=create<HomeDataState>((set)=>({
    data: {
    sliders: [],
    hotDeals: [],
    topSelling: [],
    categoriesWithProducts: [],
    categories: []
  },
  loadingdata: true,
  fetchHomeData:async()=>{
      try{
  const response:ApiResponse<HomePageData> = await fetchData(`${BaseUrl}api/home`);
      set({ data: response.data });
      }
      catch(error){
        console.log(error);
        
      }
      finally{
            set({ loadingdata: false });
      }
  },
}))