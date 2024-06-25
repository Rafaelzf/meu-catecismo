"use client";
import { usePathname, useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { PaginationProps } from "./types";

//http://localhost:3000/section/2?skip=1&take=6

export default function PaginationComponentPages({
  filled,
  hasNextPage,
  hasPrevPage,
  totalPages,
  currentPage,
  skip = 0,
  take,
}: PaginationProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleClickNext = async (e: React.MouseEvent) => {
    if (!hasNextPage) return;
    router.push(`${pathname}?skip=${skip + 6}&take=6`);
    e.preventDefault();
  };

  const handleClickPrev = async (e: React.MouseEvent) => {
    if (!hasPrevPage) return;
    router.push(`${pathname}?skip=${skip - 6}&take=6`);
    e.preventDefault();
  };

  const handleClickPage = async (e: React.MouseEvent, index: number) => {
    const pageNumber = index + 1;
    const skipPage = pageNumber * 6 - 6;
    router.push(`${pathname}?skip=${skipPage}&take=6`);
    e.preventDefault();
  };

  return (
    <Pagination
      className={
        filled
          ? `text-zinc-500 py-3 rounded-lg border border-zinc-200 bg-white shadow-sm`
          : `text-zinc-500 text-xs text-muted-foreground`
      }
    >
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            isActive={hasPrevPage}
            onClick={handleClickPrev}
          />
        </PaginationItem>
        <PaginationItem className="flex gap-2">
          {Array.from({ length: Number(totalPages) }, (_, index) => (
            <PaginationLink
              isActive={currentPage !== index + 1}
              isCurrentpage={currentPage === index + 1}
              key={index}
              onClick={(e) => handleClickPage(e, index)}
            >
              {currentPage === index + 1 ? currentPage : index + 1}
            </PaginationLink>
          ))}
        </PaginationItem>
        {/* <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem> */}
        <PaginationItem>
          <PaginationNext isActive={hasNextPage} onClick={handleClickNext} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
