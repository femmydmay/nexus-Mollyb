import axios,  {AxiosError} from "axios";

import { toast } from "react-hot-toast";
export const uploadMultipleFiles = async (files: File[], url: string) => {
 
  
  try {
    let urls = [];
      for (let i = 0; i < files.length; i++) {
          const formdata = new FormData();
        formdata.append("file", files[i]);
        formdata.append("upload_preset", 'nexus_preset');
      urls.push(axios.post(url, formdata));
    }


      const res: any = await axios.all(urls);
    
      
    let output: {url:string, upload_type:string}[] = [];
    for (let i = 0; i < res.length; i++) {
      let link = res[i].data
  
      
      output.push({url:link.secure_url,upload_type:link.resource_type});
    }
    return output;
  } catch (error) {


    const e = error as any

    
      toast.error('error uploading file')
      toast.error(e?.response?.data.message)

     
      
      
  }
};
