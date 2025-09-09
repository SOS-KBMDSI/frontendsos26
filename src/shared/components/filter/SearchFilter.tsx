import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/Select";
import { Input } from "@/shared/components/ui/Input";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

export const SearchableSelect = ({
  options,
  value,
  onValueChange,
  placeholder,
  searchPlaceholder,
  allLabel,
}: {
  options: Array<{ value: string; label: string }>;
  value: string | null;
  onValueChange: (value: string | null) => void;
  placeholder: string;
  searchPlaceholder: string;
  allLabel: string;
}) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = useMemo(() => {
    if (!searchTerm) return options;
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [options, searchTerm]);

  const displayValue = value
    ? options.find((opt) => opt.value === value)?.label
    : allLabel;

  return (
    <Select
      value={value ?? "all"}
      onValueChange={(val) => {
        const newValue = val === "all" ? null : val;
        onValueChange(newValue);
        setOpen(false);
        setSearchTerm("");
      }}
      open={open}
      onOpenChange={setOpen}
    >
      <SelectTrigger className="w-full md:w-[200px]">
        <SelectValue placeholder={placeholder}>{displayValue}</SelectValue>
      </SelectTrigger>

      <SelectContent className="max-h-[300px] overflow-hidden p-0">
        <div className="flex items-center border-b px-3 py-2">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Input
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-8 border-0 p-0 placeholder:text-muted-foreground focus-visible:ring-0"
          />
        </div>

        <div className="max-h-[200px]  overflow-y-auto">
          <SelectItem value="all" className="font-medium">
            {allLabel}
          </SelectItem>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))
          ) : (
            <div className="py-6 text-center text-sm text-muted-foreground">
              Tidak ada data ditemukan
            </div>
          )}
        </div>
      </SelectContent>
    </Select>
  );
};
