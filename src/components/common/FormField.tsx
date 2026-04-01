const FormField = ({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) => (
  <div className="flex flex-col gap-1 min-h-[64px]">
    <label className="text-xs text-gray-500">{label}</label>
    {children}
    <span className="text-red-500 text-xs h-[16px] leading-tight">
      {error || ""}
    </span>
  </div>
)

export default FormField