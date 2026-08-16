import ExcelJS from "exceljs";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import type { Prisma } from "@prisma/client";
import {
  ORDER_STATUS_LABEL,
  PAYMENT_METHOD_LABEL,
  PAYMENT_STATUS_LABEL,
  SOURCE_LABEL,
  type OrderStatus,
  type PaymentMethod,
  type PaymentStatus,
  type OrderSource,
} from "@/components/admin/order-status";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BRAND = "FF0F6A73";
const HEAD_TXT = "FFFFFFFF";
const STRIPE = "FFF1F5F5";
const BORDER = "FFDDE3E3";

function buildWhere(sp: URLSearchParams): Prisma.RepairOrderWhereInput {
  const where: Prisma.RepairOrderWhereInput = {};
  const status = sp.get("status");
  const source = sp.get("source");
  const payment = sp.get("payment");
  const paymentStatus = sp.get("paymentStatus");
  const q = sp.get("q")?.trim();
  const from = sp.get("from");
  const to = sp.get("to");
  if (status) where.status = status as OrderStatus;
  if (source) where.source = source as OrderSource;
  if (payment) where.preferredPayment = payment as PaymentMethod;
  if (paymentStatus) where.paymentStatus = paymentStatus as PaymentStatus;
  if (from || to) {
    where.createdAt = {};
    if (from) where.createdAt.gte = new Date(from);
    if (to) {
      const end = new Date(to);
      end.setHours(23, 59, 59, 999);
      where.createdAt.lte = end;
    }
  }
  if (q) {
    where.OR = [
      { labNo: { contains: q, mode: "insensitive" } },
      { customerName: { contains: q, mode: "insensitive" } },
      { companyName: { contains: q, mode: "insensitive" } },
      { brand: { contains: q, mode: "insensitive" } },
      { deviceModel: { contains: q, mode: "insensitive" } },
    ];
  }
  return where;
}

function fmtDate(d: Date) {
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(d);
}

export async function GET(req: Request) {
  const { response } = await requireAdmin();
  if (response) return response;

  const { searchParams } = new URL(req.url);
  const where = buildWhere(searchParams);
  const orders = await prisma.repairOrder.findMany({ where, orderBy: { createdAt: "desc" }, take: 5000 });

  const wb = new ExcelJS.Workbook();
  wb.creator = "BTS Lab";
  const ws = wb.addWorksheet("Repair Orders", {
    views: [{ state: "frozen", ySplit: 4 }],
    pageSetup: { orientation: "landscape", fitToPage: true, fitToWidth: 1, fitToHeight: 0 },
  });

  const columns = [
    { header: "Lab No", key: "labNo", width: 10 },
    { header: "Date", key: "date", width: 14 },
    { header: "Customer", key: "customer", width: 22 },
    { header: "Company", key: "company", width: 20 },
    { header: "Type", key: "type", width: 15 },
    { header: "Brand", key: "brand", width: 12 },
    { header: "Model", key: "model", width: 18 },
    { header: "Fault", key: "fault", width: 22 },
    { header: "Status", key: "status", width: 13 },
    { header: "Payment", key: "payment", width: 11 },
    { header: "Settlement", key: "settlement", width: 12 },
    { header: "Cost", key: "cost", width: 12 },
    { header: "Paid", key: "paid", width: 12 },
    { header: "Outstanding", key: "outstanding", width: 13 },
  ];
  const lastCol = columns.length;
  const colLetter = (n: number) => String.fromCharCode(64 + n); // 1->A

  // ---- Title band (row 1) ----
  ws.mergeCells(1, 1, 1, lastCol);
  const title = ws.getCell(1, 1);
  title.value = "BTS Lab — Repair Orders Report";
  title.font = { name: "Calibri", size: 16, bold: true, color: { argb: BRAND } };
  title.alignment = { vertical: "middle" };
  ws.getRow(1).height = 26;

  // ---- Meta band (row 2): generated date + filters ----
  const activeFilters: string[] = [];
  for (const [k, v] of searchParams.entries()) if (v) activeFilters.push(`${k}: ${v}`);
  ws.mergeCells(2, 1, 2, lastCol);
  const meta = ws.getCell(2, 1);
  meta.value = `Generated ${fmtDate(new Date())} · ${orders.length} order(s)${
    activeFilters.length ? ` · Filters — ${activeFilters.join(", ")}` : " · No filters"
  }`;
  meta.font = { name: "Calibri", size: 10, italic: true, color: { argb: "FF6B7B7B" } };
  ws.getRow(3).height = 6; // spacer

  // ---- Header row (row 4) ----
  ws.columns = columns.map((c) => ({ key: c.key, width: c.width }));
  const headerRow = ws.getRow(4);
  columns.forEach((c, i) => {
    const cell = headerRow.getCell(i + 1);
    cell.value = c.header;
    cell.font = { name: "Calibri", size: 11, bold: true, color: { argb: HEAD_TXT } };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: BRAND } };
    cell.alignment = { vertical: "middle", horizontal: i >= 11 ? "right" : "left" };
    cell.border = { bottom: { style: "thin", color: { argb: BRAND } } };
  });
  headerRow.height = 20;

  // ---- Data rows ----
  let totalCost = 0, totalPaid = 0, totalOut = 0;
  orders.forEach((o, idx) => {
    const cost = o.cost ?? 0;
    const paid = o.amountPaid ?? 0;
    const out = cost - paid;
    totalCost += cost; totalPaid += paid; totalOut += out;

    const r = ws.getRow(5 + idx);
    r.getCell(1).value = o.labNo;
    r.getCell(2).value = fmtDate(o.createdAt);
    r.getCell(3).value = o.customerName;
    r.getCell(4).value = o.companyName ?? "";
    r.getCell(5).value = SOURCE_LABEL[o.source as OrderSource];
    r.getCell(6).value = o.brand;
    r.getCell(7).value = o.deviceModel;
    r.getCell(8).value = o.relatedFault ?? o.faultDescription ?? "";
    r.getCell(9).value = ORDER_STATUS_LABEL[o.status as OrderStatus];
    r.getCell(10).value = PAYMENT_METHOD_LABEL[o.preferredPayment as PaymentMethod];
    r.getCell(11).value = PAYMENT_STATUS_LABEL[o.paymentStatus as PaymentStatus];
    r.getCell(12).value = cost;
    r.getCell(13).value = paid;
    r.getCell(14).value = out;

    for (let c = 12; c <= 14; c++) {
      r.getCell(c).numFmt = '"Rs"#,##0';
      r.getCell(c).alignment = { horizontal: "right" };
    }
    r.getCell(1).font = { bold: true, color: { argb: BRAND } };
    if (out > 0) r.getCell(14).font = { color: { argb: "FFC0392B" }, bold: true };

    if (idx % 2 === 1) {
      for (let c = 1; c <= lastCol; c++) {
        r.getCell(c).fill = { type: "pattern", pattern: "solid", fgColor: { argb: STRIPE } };
      }
    }
    for (let c = 1; c <= lastCol; c++) {
      r.getCell(c).border = { bottom: { style: "hair", color: { argb: BORDER } } };
    }
  });

  // ---- Totals row ----
  const totalRowIdx = 5 + orders.length;
  const tr = ws.getRow(totalRowIdx);
  tr.getCell(11).value = "TOTAL";
  tr.getCell(11).alignment = { horizontal: "right" };
  tr.getCell(12).value = totalCost;
  tr.getCell(13).value = totalPaid;
  tr.getCell(14).value = totalOut;
  for (let c = 11; c <= 14; c++) {
    const cell = tr.getCell(c);
    cell.font = { bold: true, color: { argb: c === 14 && totalOut > 0 ? "FFC0392B" : BRAND } };
    if (c >= 12) cell.numFmt = '"Rs"#,##0';
    cell.border = { top: { style: "thin", color: { argb: BRAND } } };
  }

  // ---- Autofilter across the header ----
  ws.autoFilter = { from: `A4`, to: `${colLetter(lastCol)}${totalRowIdx - 1}` };

  const buffer = await wb.xlsx.writeBuffer();
  const stamp = fmtDate(new Date()).replace(/ /g, "-");
  return new Response(buffer, {
    status: 200,
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="bts-lab-report-${stamp}.xlsx"`,
      "Cache-Control": "no-store",
    },
  });
}
