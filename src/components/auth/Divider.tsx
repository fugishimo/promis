
interface DividerProps {
  text: string;
}

export const Divider = ({ text }: DividerProps) => (
  <div className="relative">
    <div className="absolute inset-0 flex items-center">
      <span className="w-full border-t border-border" />
    </div>
    <div className="relative flex justify-center text-xs uppercase">
      <span className="bg-card px-2 text-muted-foreground">
        {text}
      </span>
    </div>
  </div>
);
