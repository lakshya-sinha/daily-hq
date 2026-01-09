'use client';

import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import {Sheet} from 'lucide-react'

interface Order {
  product: {
    name: string;
    cp: number;
    sp: number;
    mv: number;
  };
  worker: {
    fullName: string;
    shopName: string;
    mobileNo: number;
    email: string;
  };
  name: string;
  status: string;
  createdAt: string;
}

export default function ExportExcelButton({ data }: { data: Order[] }) {
  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Orders');

    sheet.columns = [
      { header: 'Customer Name', key: 'customer', width: 20 },
      { header: 'Product', key: 'product', width: 20 },
      { header: 'CP', key: 'cp', width: 10 },
      { header: 'SP', key: 'sp', width: 10 },
      { header: 'MV', key: 'mv', width: 10 },
      { header: 'Worker', key: 'worker', width: 20 },
      { header: 'Shop Name', key: 'shop', width: 30 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Created At', key: 'date', width: 22 },
    ];

    data.forEach((item) => {
      sheet.addRow({
        customer: item.name || 'N/A',
        product: item.product.name,
        cp: item.product.cp,
        sp: item.product.sp,
        mv: item.product.mv,
        worker: item.worker.fullName,
        shop: item.worker.shopName,
        status: item.status,
        date: new Date(item.createdAt).toLocaleString(),
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    saveAs(blob, `orders-${Date.now()}.xlsx`);
  };

  return (
    <button
      onClick={exportToExcel}
      className="px-4 py-2 bg-black text-white rounded cursor-pointer flex gap-2"
    >
      <Sheet />
      Export to Excel
    </button>
  );
}
