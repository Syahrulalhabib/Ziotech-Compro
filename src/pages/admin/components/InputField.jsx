const InputField = ({ label, icon: Icon, type = "text", value, onChange, onBlur, placeholder, isTextarea, helperText, min, max, step }) => (
  <div className="space-y-1.5 w-full">
    <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-700">
      {Icon && <Icon className="w-4 h-4 text-slate-400" />}
      {label}
    </label>
    {isTextarea ? (
      <textarea
        value={value ?? ''}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        rows="3"
        className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none resize-y text-sm text-slate-800"
      />
    ) : (
      <input
        type={type}
        value={value ?? ''}
        onChange={onChange}
        onBlur={onBlur}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none text-sm text-slate-800"
      />
    )}
    {helperText && <p className="text-xs text-slate-500 mt-1">{helperText}</p>}
  </div>
);

export default InputField;
