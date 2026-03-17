import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "../utils";

export function ModelViewer({ models }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [modelUrl, setModelUrl] = useState("");
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    const model = models.find(m => m.id === id);
    if (model) {
      setModelUrl(model.path);
    } else if (models.length > 0) {
      navigate('/models');
    } else {
      setModelUrl(`/models/${id}/index.html`);
    }
  }, [id, models, navigate]);

  return (
    <motion.div 
      layoutId={`card-${id}`}
      className={cn(
        "fixed inset-0 z-40 bg-white dark:bg-[#0f2027]",
        "flex flex-col overflow-hidden"
      )}
      initial={{ opacity: 0, x: -40, scale: 0.95, borderRadius: "24px" }}
      animate={{ opacity: 1, x: 0, scale: 1, borderRadius: "0px" }}
      exit={{ borderRadius: "24px", opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <button 
        onClick={() => navigate('/models')}
        title="关闭模型"
        className="absolute top-6 right-6 z-50 p-3 bg-white/20 dark:bg-black/20 backdrop-blur-md rounded-full border border-black/10 dark:border-white/10 shadow-lg hover:scale-110 hover:bg-white/30 dark:hover:bg-white/10 transition-all text-gray-800 dark:text-gray-200"
      >
        <X className="w-6 h-6" />
      </button>

      {!iframeLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-black/50 backdrop-blur-md z-30">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {modelUrl && (
        <motion.iframe
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          src={modelUrl}
          className="w-full h-full border-0"
          title={`Model ${id}`}
          onLoad={() => setIframeLoaded(true)}
        />
      )}
    </motion.div>
  );
}
