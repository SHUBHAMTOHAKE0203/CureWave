import React, { useState, useEffect } from "react";

import { Toaster } from "sonner"
import { Twitter, Instagram, Facebook, Linkedin, Heart } from 'lucide-react'



const PhotoUpload = () => {
  const [filePreview, setFilePreview] = useState(null);

  // Load the file from localStorage when the component mounts
  useEffect(() => {
    const savedFile = localStorage.getItem("uploadedFile");
    if (savedFile) {
      setFilePreview(savedFile); // Load preview from localStorage
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        setFilePreview(result); // Create a preview URL
        localStorage.setItem("uploadedFile", result); // Save to localStorage
      };
      reader.readAsDataURL(file); // Convert file to base64
    }
  };

  return (
    <div className="text-left space-y-6">
      <div className="flex items-center justify-center">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="photo-upload"
          onChange={handleFileChange}
        />
        <label
          htmlFor="photo-upload"
          className="cursor-pointer flex flex-col items-center space-y-6 text-gray-500 hover:text-gray-700 transition-colors"
        >
          {filePreview ? (
            <img
              src={filePreview}
              alt="Preview"
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <div className="w-40 h-40 bg-gray-50 rounded-full flex items-center justify-center">
              <span className="text-6xl">📸</span>
            </div>

          )}
          <div className="text-center">
            <p className="font-medium text-lg">Upload your smiling photo</p>
            <p className="text-sm mt-2">Drag and drop or click to select</p>
          </div>
        </label>
      </div>
    </div>
  );
};



const MacWindowFrame = ({ children }) => (
  <div className="w-full max-w-7xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-white">
    <div className="bg-gray-100 px-4 py-2 flex items-center space-x-2 border-b">
      <div className="w-3 h-3 rounded-full bg-red-400"></div>
      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
      <div className="w-3 h-3 rounded-full bg-green-400"></div>
    </div>
    {children}
  </div>
)

const SmilingPhoto = ({ src, caption, size = "normal", className = "" }) => {
  const sizeClasses = {
    small: "h-44",
    normal: "h-52",
    large: "h-60"
  }

  return (
    <div
      className={`relative transform transition-all duration-500 hover:scale-105 hover:-rotate-2 ${className}`}
    >
      <div className="absolute -top-2 -right-2 w-8 h-8 bg-pink-200 rounded-full flex items-center justify-center text-pink-500 text-base animate-bounce">
        ☺
      </div>
      <img
        src={src}
        alt="Smiling person" className={`w-full object-cover rounded-xl shadow-lg ${sizeClasses[size]}`}
      />
      {caption && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-xl">
          <p className="text-white text-sm text-center">{caption}</p>
        </div>
      )}
    </div>
  )
}

const StoryCard = ({ title, content }) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-7 shadow-lg hover:shadow-xl transition-all duration-300">
    <h3 className="text-gray-900 font-semibold text-xl mb-3">{title}</h3>
    <p className="text-gray-700 text-base leading-relaxed">{content}</p>
  </div>
)

const SocialShareButton = ({ icon: Icon, label, color, hashtags }) => (
  <button
    className={`flex items-center space-x-3 px-5 py-3 rounded-full text-white transition-transform hover:scale-105 ${color}`}
    onClick={() => window.open(`https://twitter.com/intent/tweet?text=Joined%20the%20smile%20movement!%20${hashtags}`, '_blank')}
  >
    <Icon size={20} />
    <span className="text-base">{label}</span>
  </button>
)

export default function Smile() {
  return (
    <div className="min-h-screen p-20 bg-white">
      <MacWindowFrame>
        <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 p-10 min-h-[800px] relative">
          <div className="absolute bottom-10 left-10 flex items-end space-x-6">
            <div className="w-16 h-20 bg-pink-200 rounded-t-full"></div>
            <div className="w-12 h-16 bg-blue-200 rounded-t-full"></div>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="flex gap-12">
              {/* Left Content Section */}
              <div className="w-[900px] space-y-8">
                <div className="space-y-8">
                  <div className="inline-flex items-center space-x-3 bg-gradient-to-br from-white to-blue-50/30 backdrop-blur px-6 py-3 rounded-full text-gray-600">
                    <span className="animate-pulse text-xl">♥</span>
                    <span className="font-medium text-lg">Keep Smiling, Keep Fighting</span>
                  </div>

                  <h1 className="text-6xl text-left font-bold bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent leading-tight tracking-tight">
                    Your Smile Is Stronger Than Your Struggles
                  </h1>

                  <div className="prose prose-blue text-left text-gray-600 max-w-2xl">
                    <p className="text-xl leading-relaxed">
                      In a world where many of us are silently battling depression, anxiety, or serious illnesses,
                      a smile becomes our symbol of resilience. It's not about hiding our pain, but about showing
                      that we're stronger than our struggles.
                    </p>

                    <blockquote className="border-l-4 border-gray-200 pl-6 italic my-8">
                      <p className="text-xl">"Sometimes your joy is the source of your smile, but sometimes your smile can be the source of your joy."</p>
                      <footer className="text-base text-gray-600 mt-3">- Sherin</footer>
                    </blockquote>

                    <p className="font-medium text-gray-800 text-lg mt-8">
                      To everyone fighting their battles:
                    </p>
                    <ul className="space-y-3 text-lg">
                      <li>Your smile is a testament to your strength</li>
                      <li>Every day you choose to smile is a victory</li>
                      <li>You inspire others more than you know</li>
                      <li>You're never alone in this journey</li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mt-10">
                    <StoryCard
                      title="Shubham's Story"
                      content="'During my chemo sessions, I made it a point to smile at everyone I met. It wasn't just about staying positive - it was about creating light in the darkness.'"
                    />
                    <StoryCard
                      title="Aarya's Journey"
                      content="'Depression tried to steal my smile, but every morning I choose to smile back at life. It's my way of saying: I'm still here, still fighting.'"
                    />
                  </div>
                </div>

                {/* Upload Section */}
                <div className="bg-gradient-to-br from-white to-blue-50/10 rounded-2xl p-10 shadow-lg space-y-8 w-full border border-blue-100">
                  <div className="space-y-6">
                    <h2 className="text-4xl font-bold text-gray-900 flex items-center space-x-3">
                      <span>Share Your Story of Strength</span>
                      <Heart className="text-pink-500 animate-pulse" size={32} />
                    </h2>
                    <p className="text-gray-700 text-xl leading-relaxed">
                      Your smile is proof that hope exists even in the toughest times.
                      Share it to inspire others who might be fighting similar battles.
                      Remember, you're not just sharing a photo - you're sharing hope.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-white to-gray-50/80 backdrop-blur-sm rounded-xl p-8 border-2 border-dashed border-gray-200/50 hover:border-gray-300/50 transition-colors">
                    <PhotoUpload />
                  </div>

                  <div className="space-y-6">
                    <p className="font-medium text-gray-700 text-lg">Share your story with the world:</p>
                    <div className="flex flex-wrap gap-4">
                      <SocialShareButton
                        icon={Twitter}
                        label="Twitter"
                        color="bg-[#1DA1F2]"
                        hashtags="#KeepSmiling #StayStrong #SmileMovement"
                      />
                      <SocialShareButton
                        icon={Instagram}
                        label="Instagram"
                        color="bg-[#E4405F]"
                        hashtags="#KeepSmiling #StayStrong #SmileMovement"
                      />
                      <SocialShareButton
                        icon={Facebook}
                        label="Facebook"
                        color="bg-[#1877F2]"
                        hashtags="#KeepSmiling #StayStrong #SmileMovement"
                      />
                      <SocialShareButton
                        icon={Linkedin}
                        label="LinkedIn"
                        color="bg-[#0A66C2]"
                        hashtags="#KeepSmiling #StayStrong #SmileMovement"
                      />
                    </div>
                  </div>

                  <p className="text-base text-gray-500 italic">
                    * Every smile shared here is a beacon of hope for someone else
                  </p>
                </div>
              </div>

              {/* Right Photos Section */}
              <div className="w-[320px] relative">
                <div className="sticky top-8 grid grid-cols-2 gap-5 auto-rows-min">
                  <SmilingPhoto
                    src="https://images.unsplash.com/photo-1706943262459-3ef6ce03305c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    caption="Suhani, beating cancer with a smile"
                    size="large"
                    className="col-span-2"
                  />
                  <SmilingPhoto
                    src="https://plus.unsplash.com/premium_photo-1682089869602-2ec199cc501a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    caption="Suresh, 2 years after recovery"
                    size="small"
                  />
                  <SmilingPhoto
                    src="https://images.unsplash.com/photo-1734937404197-bdaa7ea0fb0c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    
                    caption="Sunidhi, finding strength in community"
                    size="small"
                  />
                  <SmilingPhoto
                    src="https://images.unsplash.com/photo-1534339480783-6816b68be29c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    caption="Ram, spreading joy every day"
                    size="large"
                    className="col-span-2"
                  />
                  <SmilingPhoto
                    src="https://images.unsplash.com/photo-1734764627105-b5ff03f02b2d?q=80&w=1909&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    caption="Radhika, embracing each moment"
                    size="normal"
                  />
                  <SmilingPhoto
                    src="https://plus.unsplash.com/premium_photo-1723568666044-1b066e26b1fb?q=80&w=1921&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    caption="Sharmila, finding peace"
                    size="normal"
                  />

                  {/* Decorative Elements */}
                  <div className="absolute -top-6 -right-6 text-pink-400 text-4xl animate-float">♥</div>
                  <div className="absolute top-1/2 -right-10 text-blue-400 text-4xl animate-float animate-delay-1000">♥</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MacWindowFrame>
      <Toaster position="top-center" richColors />
    </div>
  )
}
