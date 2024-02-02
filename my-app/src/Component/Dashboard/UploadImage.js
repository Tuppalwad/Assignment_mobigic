import React, { useState } from 'react'
import { handleUpload ,addimage} from '../../utils/imageservices'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function UploadImage() {
    const successNotify = () => toast.success("Upload Success");
    const errorNotify = () => toast.error("Upload Failed");
    const [image, setImage] = useState(null);
    const token = localStorage.getItem('section_token');
    const handlesubmit = async (e) => {
        e.preventDefault();
        if (!image) {
            console.error('No file selected for upload');
            return;
        }
        const response = await handleUpload(image);
        console.log(response)
        if (response) {
            const code = Math.floor(100000 + Math.random() * 900000);
            const images=[{ imageID: response.$id, imagecode:code }]
            addimage(token, images).then((res) => {
                console.log(res)
                if (res.status === 200) {
                    successNotify() 
                    setImage(null)
                }
                else if (res.status === 400) {
                    errorNotify()
                }
            })


        }
    }


   

    return (
        <div className='container  my-4'>
            <ToastContainer />
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <form>
                        <div className="form-group">
                            <label htmlFor="image" className='my-2 fs-3'>Choose Image</label>
                            <input type="file"
                                name="image"
                                id="productImage"
                                accept="image/*"
                                className="form-control" onChange={(e) => setImage(e.target.files[0])} />
                        </div>
                        <button type="submit" className="btn btn-success my-3"
                            onClick={handlesubmit}
                        >Upload</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UploadImage