import AIEnhanceButton from "./AIEnhanceButton";

// Inside your professional summary form/section component:
// (assumes you already have `summary` state + a setter, e.g. from useState or a parent form object)

const ProfessionalSummaryForm = ({ data: summary, onChange: setSummary }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-gray-700">
          Professional Summary
        </label>

        <AIEnhanceButton
          text={summary}
          endpoint="/api/ai/enhance-pro-sum"
          onEnhanced={(enhancedText) => setSummary(enhancedText)}
        />
      </div>

      <textarea
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        rows={4}
        placeholder="Write a short professional summary..."
        className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-purple-400"
      />
    </div>
  );
};

export default ProfessionalSummaryForm;
