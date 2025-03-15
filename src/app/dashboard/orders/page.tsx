import React from 'react';
import dayjs from 'dayjs';

import { Orders } from '@/components/dashboard/orders/orders';

const Page = () => {
  return (
    <div>
      <Orders
        orders={[
          {
            id: 'ORD-007',
            customer: { name: 'Ekaterina Tankova' },
            amount: 30.5,
            status: 'pending',
            createdAt: dayjs().subtract(10, 'minutes').toDate(),
          },
          {
            id: 'ORD-006',
            customer: { name: 'Cao Yu' },
            amount: 25.1,
            status: 'delivered',
            createdAt: dayjs().subtract(10, 'minutes').toDate(),
          },
          {
            id: 'ORD-004',
            customer: { name: 'Alexa Richardson' },
            amount: 10.99,
            status: 'refunded',
            createdAt: dayjs().subtract(10, 'minutes').toDate(),
          },
          {
            id: 'ORD-003',
            customer: { name: 'Anje Keizer' },
            amount: 96.43,
            status: 'pending',
            createdAt: dayjs().subtract(10, 'minutes').toDate(),
          },
          {
            id: 'ORD-002',
            customer: { name: 'Clarke Gillebert' },
            amount: 32.54,
            status: 'delivered',
            createdAt: dayjs().subtract(10, 'minutes').toDate(),
          },
          {
            id: 'ORD-001',
            customer: { name: 'Adam Denisov' },
            amount: 16.76,
            status: 'delivered',
            createdAt: dayjs().subtract(10, 'minutes').toDate(),
          },
          {
            id: 'ORD-001',
            customer: { name: 'Adam Denisov' },
            amount: 16.76,
            status: 'delivered',
            createdAt: dayjs().subtract(10, 'minutes').toDate(),
          },
          {
            id: 'ORD-001',
            customer: { name: 'Adam Denisov' },
            amount: 16.76,
            status: 'delivered',
            createdAt: dayjs().subtract(10, 'minutes').toDate(),
          },
        ]}
        autoset={{ height: '450px', overflow: 'auto' }}
        sx={{ height: '100%' }}
      />
    </div>
  );
};

export default Page;
