import axios,  {AxiosError} from "axios";

import { toast } from "react-hot-toast";
export const uploadMultipleFiles = async (files: File[], url: string) => {
  try {
    let urls = [];
      for (let i = 0; i < files.length; i++) {
          const formdata = new FormData();
               formdata.append("file",files[i] );
      urls.push(axios.post(url, formdata));
    }


      const res: any = await axios.all(urls);
    
      
    let output: {id:string}[] = [];
    for (let i = 0; i < res.length; i++) {
        let link = res[i].data
      output.push(link);
    }
    return output;
  } catch (error) {

    const e = error as any

    
      toast.error('error uploading file')
      toast.error(e?.response?.data.message)

     
      
      
  }
};
