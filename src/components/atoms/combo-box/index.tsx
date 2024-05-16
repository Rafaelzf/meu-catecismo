"use client";

import { useState, useEffect } from "react";
import { ArrowUpDown, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface ComboboxProps {
  selects: IItens[];
  handleOnChange?: (id: number, section: string) => void;
}

export interface IItens {
  value: string;
  label: string;
}

export default function Combobox({ selects, handleOnChange }: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState({
    label: "",
    value: "",
  });

  useEffect(() => {
    handleOnChange &&
      value.value &&
      handleOnChange(Number(value.value), value.label);
  }, [value]);

  useEffect(() => {
    if (selects && selects.length && !value.value) {
      setValue({
        label: selects[0].label,
        value: selects[0].value,
      });
    }
  }, [selects]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selects && selects.length > 0 && value.value
            ? selects.find((select) => select.value === value.value)?.label
            : "Select a secao..."}
          <ArrowUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search secoes..." className="h-9" />
          <CommandEmpty>Não foram encontradas secoes.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {selects &&
                selects.length > 0 &&
                selects.map((select) => (
                  <CommandItem
                    key={select.value}
                    value={select.value}
                    onSelect={(currentValue) => {
                      setValue({
                        label: select.label,
                        value: currentValue === value.value ? "" : currentValue,
                      });
                      setOpen(false);
                    }}
                  >
                    {select.label}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        value.value === select.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
