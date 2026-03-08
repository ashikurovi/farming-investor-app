import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}) {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className={`flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 shadow-sm ${className}`}
    >
      <Search className="h-4 w-4 text-zinc-400" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-8 w-40 border-0 bg-transparent px-0 text-xs focus-visible:ring-0 focus-visible:ring-offset-0 sm:w-56"
      />
    </form>
  );
}

