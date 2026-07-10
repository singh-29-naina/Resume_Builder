import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import api from "../configs/api";

/**
 * Reusable AI Enhance button.
 *
 * Props:
 * - text: string            -> current text to enhance (e.g. summary or job description)
 * - onEnhanced: (newText) => void  -> called with the enhanced text so the parent can update its state
 * - endpoint: "/api/ai/enhance-pro-sum" | "/api/ai/enhance-job-desc"
 * - disabled: boolean       -> optional extra disable condition from parent
 */
const AIEnhanceButton = ({ text, onEnhanced, endpoint, disabled }) => {
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const handleEnhance = async () => {
    if (!text || !text.trim()) {
      toast.error("Please write something first, then enhance it.");
      return;
    }

    try {
      setLoading(true);

      const { data } = await api.post(
        endpoint,
        { userContent: text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onEnhanced(data.enhancedContent);
      toast.success("Enhanced with AI");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to enhance text");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleEnhance}
      disabled={loading || disabled}
      className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Sparkles className="size-4" />
      )}
      {loading ? "Enhancing..." : "AI Enhance"}
    </button>
  );
};

export default AIEnhanceButton;
