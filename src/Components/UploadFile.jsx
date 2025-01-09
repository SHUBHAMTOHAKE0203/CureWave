import React, { useEffect, useState } from "react";
import axios from "axios";
import { Upload, File, Loader2 } from "lucide-react";
import { toast, Toaster } from "sonner";

const UploadFile = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [allImage, setAllImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    getPdf();
  }, []);

  const getPdf = async () => {
    try {
      const result = await axios.get("http://localhost:3000/get-files");
      setAllImage(result.data.data);
    } catch (error) {
      toast.error("Failed to fetch documents");
    }
  };

  const submitImage = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      const result = await axios.post("http://localhost:3000/upload-files", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (result.data.status === "ok") {
        toast.success("File uploaded successfully!");
        setTitle("");
        setFile(null);
        getPdf();
      }
    } catch (error) {
      toast.error("Upload failed. Please try again.");
    }
    setIsUploading(false);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type === "application/pdf") {
      setFile(droppedFile);
    } else {
      toast.error("Please upload a PDF file");
    }
  };

  const showPdf = (pdf) => {
    window.open(`http://localhost:3000/files/${pdf}`, "_blank", "noreferrer");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Toaster position="top-center" />
      
      <div className="bg-white rounded-lg shadow-lg mb-8 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800">Upload Document</h2>
        </div>
        <div className="p-6">
          <form onSubmit={submitImage} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Document Title</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Enter document title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="application/pdf"
                required
                className="hidden"
                id="file-upload"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer"
              >
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-sm text-gray-600 mb-2">
                  Drag & drop your PDF here or click to browse
                </p>
                {file && (
                  <p className="text-sm text-blue-600 font-medium">
                    Selected: {file.name}
                  </p>
                )}
              </label>
            </div>

            <button
              type="submit"
              disabled={isUploading}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Upload Document
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800">Uploaded Documents</h2>
        </div>
        <div className="p-6">
          {allImage?.length === 0 && (
            <p className="text-center text-gray-500 py-8">No documents uploaded yet</p>
          )}
          <div className="grid gap-4">
            {allImage?.map((data, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <File className="w-6 h-6 text-blue-600" />
                  <span className="font-medium text-gray-700">{data.title}</span>
                </div>
                <button
                  onClick={() => showPdf(data.pdf)}
                  className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  View PDF
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadFile;