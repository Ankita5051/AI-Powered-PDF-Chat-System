'use client';
import * as React from "react";
import {Upload} from 'lucide-react';

const FileUploadComponent: React.FC = () => {
const handleFlieUploadButtonClick = () => {
  // Handle file upload logic here

  const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'application/pdf');
    input.addEventListener('change',async (event) => {
          const target = event.target as HTMLInputElement;
        if (target.files && target.files.length>0) {
            const file = target.files[0];
            if(file){
            const formData = new FormData();
            formData.append('pdf', file);
          await  fetch('http://localhost:8000/upload/pdf', {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);})
            }
        
        }
     
    });
    input.click();
};
return(
    <div className="bg-slate-900 text-white shadow-2xl flex justify-center items-center p-4 rounded-2xl border-2 border-dashed border-white/20 hover:border-white/40 cursor-pointer transition-all duration-200">
       <div onClick={handleFlieUploadButtonClick} className="flex justify-center items-center flex-col">
         <h3>Upload PDF file</h3>
             <Upload/>
       </div>
       


    </div>
)
}
export default FileUploadComponent