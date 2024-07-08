"use client";

import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Container from "./Container";
import { Fragment } from "react";

export function BreadCrumbItem() {
  const pathname = usePathname();
  const pathArray = pathname.split("/").filter(Boolean);

  // ["dash", "users"]
  const itemsExceptLast = pathArray.slice(0, pathArray.length - 1);
  const lastItem = pathArray[pathArray.length - 1];

  return (
    <Breadcrumb className="mt-3 rounded-md bg-white p-5 dark:bg-slate-800">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {itemsExceptLast.map((item) => (
          <Fragment key={item}>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/${item}`} className="capitalize">
                {item}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </Fragment>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold capitalize">
            {lastItem}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
