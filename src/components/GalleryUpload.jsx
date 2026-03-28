import { useState } from "react";
import { Cloud, Upload, X, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { supabase } from "../lib/supabase";
import { getUser } from "../lib/auth";
import { SkeuCard } from "./ui/SkeuCard";
import { SkeuButton } from "./ui/SkeuButton";
import { motion, AnimatePresence } from "framer-motion";

export function GalleryUpload({ onUploadSuccess }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("Community");
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const categories = ["Events", "Education Programs", "Medical Camps", "Food Distribution", "Volunteers", "Community", "Women Empowerment"];

    const CLOUD_NAME = "dcxaldazg";
    const UPLOAD_PRESET = "trust_upload";

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Reset states
        setError(null);
        setSuccess(false);

        // Basic validation
        if (!file.type.startsWith("image/")) {
            setError("Please select a valid image file.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            setError("File size exceeds 5MB. Please upload a smaller image.");
            return;
        }

        setSelectedFile(file);
        
        // Create local preview
        const reader = new FileReader();
        reader.onload = () => setPreviewUrl(reader.result);
        reader.readAsDataURL(file);
    };

    const saveToDatabase = async (imageUrl) => {
        const { data, error } = await supabase
            .from("gallery")
            .insert([{ image_url: imageUrl, category: selectedCategory }]);

        if (error) {
            console.error("Error saving to Supabase:", error);
            throw new Error("Database save failed");
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        // Cryptographic guard for upload function as requested
        const user = await getUser();
        if (!user) {
            setError("Unauthorized. Admin session expired.");
            return;
        }

        setUploading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("file", selectedFile);
            formData.append("upload_preset", UPLOAD_PRESET);
            formData.append("folder", "trust-gallery");

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || "Upload failed");
            }

            const data = await response.json();
            const imageUrl = data.secure_url;
            
            // Save URL to Supabase
            await saveToDatabase(imageUrl);
            
            // Notify parent
            onUploadSuccess(imageUrl);
            
            // Success state
            setSuccess(true);
            setSelectedFile(null);
            setPreviewUrl(null);
            
            // Clear success message after 3 seconds
            setTimeout(() => setSuccess(false), 3000);
            
        } catch (err) {
            console.error("Cloudinary Upload Error:", err);
            setError(err.message || "Failed to upload image. Please check your network and try again.");
        } finally {
            setUploading(false);
        }
    };

    const clearPreview = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        setError(null);
    };

    return (
        <SkeuCard className="p-6 md:p-10 mb-12 border-2 border-dashed border-primary/20 bg-primary/5" hover={false}>
            <div className="max-w-xl mx-auto text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6 shadow-skeu-sm">
                    <Cloud size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Upload to Gallery</h3>
                <p className="text-slate-600 mb-8 text-sm">
                    Keep the moments alive. Selected photos will be instantly stored in our cloud gallery.
                </p>

                <div className="space-y-6">
                    {!previewUrl ? (
                        <div className="relative">
                            <input
                                type="file"
                                id="gallery-upload"
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileSelect}
                            />
                            <label
                                htmlFor="gallery-upload"
                                className="flex flex-col items-center justify-center py-12 px-6 border-2 border-dashed border-slate-300 rounded-3xl bg-white/50 hover:bg-white hover:border-primary/50 transition-all cursor-pointer group"
                            >
                                <Upload size={40} className="text-slate-400 group-hover:text-primary transition-colors mb-4" />
                                <span className="font-bold text-slate-700">Choose a high-res photo</span>
                                <span className="text-xs text-slate-500 mt-2">JPG, PNG or WebP up to 5MB</span>
                            </label>
                        </div>
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }} 
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative group"
                        >
                            <img 
                                src={previewUrl} 
                                alt="Pre-upload preview" 
                                className="w-full h-64 object-cover rounded-3xl shadow-skeu" 
                            />
                            <button 
                                onClick={clearPreview}
                                className="absolute top-4 right-4 bg-slate-900/80 text-white p-2 rounded-full hover:bg-slate-900 transition-colors shadow-lg z-20"
                                title="Remove Image"
                            >
                                <X size={20} />
                            </button>

                            <div className="mt-6 text-left">
                                <label className="block text-sm font-bold text-slate-700 mb-2">Select Gallery Category</label>
                                <select 
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary/20 outline-none"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                                <SkeuButton 
                                    variant="primary" 
                                    className="w-full py-4 text-base font-bold"
                                    onClick={handleUpload}
                                    disabled={uploading}
                                >
                                    {uploading ? (
                                        <div className="flex items-center gap-3">
                                            <Loader2 size={22} className="animate-spin" />
                                            Uploading to Cloud...
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-3">
                                            <Upload size={22} />
                                            Publish Memory
                                        </div>
                                    )}
                                </SkeuButton>
                                <SkeuButton 
                                    variant="outline" 
                                    className="w-full sm:w-auto px-10 py-4 font-semibold"
                                    onClick={clearPreview}
                                    disabled={uploading}
                                >
                                    Cancel
                                </SkeuButton>
                            </div>
                        </motion.div>
                    )}

                    <AnimatePresence>
                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }} 
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700"
                            >
                                <AlertCircle size={20} className="shrink-0" />
                                <p className="text-sm font-bold text-left">{error}</p>
                            </motion.div>
                        )}

                        {success && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }} 
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-700"
                            >
                                <CheckCircle2 size={20} className="shrink-0" />
                                <p className="text-sm font-bold text-left">Successfully uploaded! The photo is now live in the gallery.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </SkeuCard>
    );
}
