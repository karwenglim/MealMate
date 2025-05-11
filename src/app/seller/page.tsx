'use client';
import React, { useState } from 'react';
import SelectionPanel from '@/components/seller/selectionPanel';
import Analytics from '@/components/seller/analytics';
import Orders from '@/components/seller/orders';
import ProductList from '@/components/seller/productList';
function SellerPage() {
  const [selectedPanel, setSelectedPanel] = useState('analytics');
  const handleClickPanel = (panelChoice: string) => {
    setSelectedPanel(panelChoice);
  };
  return (
    <div className='flex flex-row h-full w-full  '>
      <div className='flex basis-[20%] border-r border-slate-300 min-h-screen '>
        <SelectionPanel
          handleClickPanel={handleClickPanel}
          selectedPanel={selectedPanel}
        />
      </div>
      <div className='flex flex-1 px-30 py-10  max-h-full'>
        {selectedPanel === 'analytics' ? (
          <Analytics />
        ) : selectedPanel === 'orders' ? (
          <Orders />
        ) : selectedPanel === 'product_list' ? (
          <ProductList />
        ) : null}
      </div>
    </div>
  );
}

export default SellerPage;
