'use client';

import { useCallback, useState } from 'react';
import dayjs from 'dayjs';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { Button, Stack, Typography } from '@mui/material';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import { AllCommunityModule, ColDef, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

import AddCustomerForm from './add-customers';

ModuleRegistry.registerModules([AllCommunityModule]);
interface Customer {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  address: {
    city: string;
    country: string;
    state: string;
    street: string;
  };
  createdAt: Date;
}

const customers: Customer[] = [
  {
    id: 'USR-009',
    name: 'Alcides Antonio',
    avatar: '/assets/avatar-1.png',
    email: 'alcides.antonio@devias.io',
    phone: '908-691-3242',
    address: {
      city: 'Madrid',
      country: 'Spain',
      state: 'Comunidad de Madrid',
      street: '4158 Hedge Street',
    },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-010',
    name: 'Marcus Finn',
    avatar: '/assets/avatar-2.png',
    email: 'marcus.finn@devias.io',
    phone: '415-907-2647',
    address: {
      city: 'Carson City',
      country: 'USA',
      state: 'Nevada',
      street: '2188 Armbrester Drive',
    },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-011',
    name: 'Marcus Finn',
    avatar: '/assets/avatar-3.png',
    email: 'marcus.finn@devias.io',
    phone: '415-907-2647',
    address: {
      city: 'Carson City',
      country: 'USA',
      state: 'Nevada',
      street: '2188 Armbrester Drive',
    },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-012',
    name: 'Marcus Finn',
    avatar: '/assets/avatar-4.png',
    email: 'marcus.finn@devias.io',
    phone: '415-907-2647',
    address: {
      city: 'Carson City',
      country: 'USA',
      state: 'Nevada',
      street: '2188 Armbrester Drive',
    },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-013',
    name: 'Marcus Finn',
    avatar: '/assets/avatar-5.png',
    email: 'marcus.finn@devias.io',
    phone: '415-907-2647',
    address: {
      city: 'Carson City',
      country: 'USA',
      state: 'Nevada',
      street: '2188 Armbrester Drive',
    },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-013',
    name: 'Marcus Finn',
    avatar: '/assets/avatar-6.png',
    email: 'marcus.finn@devias.io',
    phone: '415-907-2647',
    address: {
      city: 'Carson City',
      country: 'USA',
      state: 'Nevada',
      street: '2188 Armbrester Drive',
    },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
];

const CustomerTable = () => {
  const [rowData, setRowData] = useState<Customer[]>(customers);

  const columnDefs: ColDef<Customer>[] = [
    {
      headerName: 'ID',
      field: 'id',
      sortable: true,
      headerClass: 'smoke-white-header',
    },
    {
      headerName: 'Name',
      field: 'name',
      sortable: true,
      headerClass: 'smoke-white-header',

      cellRenderer: (params: any) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src={params.data.avatar} alt="Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
            <span>{params.value}</span>
          </div>
        );
      },
    },
    {
      headerName: 'Email',
      field: 'email',
      sortable: true,
      headerClass: 'smoke-white-header',
    },
    {
      headerName: 'Phone',
      field: 'phone',
      sortable: true,
      headerClass: 'smoke-white-header',

      filter: 'agNumberColumnFilter',
    },
    {
      headerName: 'Location',
      field: 'address',
      sortable: true,
      headerClass: 'smoke-white-header',

      valueGetter: (params) =>
        `${params.data?.address.city}, ${params.data?.address.state}, ${params.data?.address.country}`,
    },
    {
      headerName: 'Joined',
      field: 'createdAt',
      sortable: true,
      headerClass: 'smoke-white-header',

      valueFormatter: (params) => dayjs(params.value).format('MMM D, YYYY'),
    },
  ];

  const getRowHeight = useCallback((params: any) => {
    return params.data?.rowHeight || 70;
  }, []);
  return (
    <>
      <Stack direction="row" spacing={3} sx={{ marginBottom: 4 }}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Customers</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
              Import
            </Button>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Export
            </Button>
          </Stack>
        </Stack>
        <div>
          <AddCustomerForm />
        </div>
      </Stack>

      <div className="p-6 bg-gray-900 text-white rounded-lg shadow-xl">
        <div className="ag-theme-alpine-dark rounded-lg shadow-lg">
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={{
              flex: 1,
              filter: true,
              sortable: true,
            }}
            getRowHeight={getRowHeight}
            pagination={true}
            paginationPageSize={5}
            paginationPageSizeSelector={[100, 200, 400]}
            rowSelection="multiple"
          />
        </div>
      </div>
    </>
  );
};

export default CustomerTable;
