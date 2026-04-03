import { SearchBar } from "@/components/ui/search-bar";

export function AdminSearchBar({
  value,
  onChange,
  placeholder = "Search investors...",
  className = "",
}) {
  return (
    <SearchBar
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
    />
  );
}

