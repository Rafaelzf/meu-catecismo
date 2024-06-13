"use client";
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
import { useContext } from "react";
import AdminContext from "@/app/store/admin-context";

export default function PaginationComponent({
  filled,
  hasNextPage,
  hasPrevPage,
  totalPages,
  currentPage,
  skip = 0,
  take,
}: PaginationProps) {
  const { setPagination } = useContext(AdminContext);
  const handleClickNext = async (e: React.MouseEvent) => {
    setPagination({ take: take, skip: skip + 4 });
    e.preventDefault();
  };

  const handleClickPrev = async (e: React.MouseEvent) => {
    setPagination({ take: take, skip: skip - 4 });
    e.preventDefault();
  };

  const handleClickPage = async (e: React.MouseEvent, index: number) => {
    const pageNumber = index + 1;
    const skipPage = pageNumber * 4 - 4;

    setPagination({ take: take, skip: skipPage });
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
