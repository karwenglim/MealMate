import React from 'react';
import { assets } from '../../../assets/images/assets';
import Image from 'next/image';
import { MdOutlineDashboardCustomize } from 'react-icons/md';

interface selectionPanelProp {
  handleClickPanel: (panelChoice: string) => void;
  selectedPanel: string;
}
const SelectionPanel = ({
  handleClickPanel,
  selectedPanel,
}: selectionPanelProp) => {
  return (
    <div className='flex flex-col gap-3 w-full text-[#36415F] text-xl'>
      <div
        onClick={() => handleClickPanel('analytics')}
        className={`flex flex-row gap-3 px-5 py-5 w-full cursor-pointer ${
          selectedPanel === 'analytics'
            ? 'bg-[#EDF8F3] border-r-[#5BBB9C] border-r-6'
            : ''
        }`}>
        {/* <Image
          src={assets.product_list_icon}
          alt='dashboardIcon'
        /> */}
        <div className='text-2xl'>
          <MdOutlineDashboardCustomize />
        </div>
        <div>Dashboard</div>
      </div>
      <div
        onClick={() => handleClickPanel('orders')}
        className={`flex flex-row gap-3 px-5 py-5 w-full cursor-pointer ${
          selectedPanel === 'orders'
            ? 'bg-[#EDF8F3] border-r-[#5BBB9C] border-r-6'
            : ''
        }`}>
        {' '}
        <Image
          src={assets.order_icon}
          alt='dashboardIcon'
        />
        <div>Orders</div>
      </div>{' '}
      <div
        onClick={() => handleClickPanel('product_list')}
        className={`flex flex-row gap-3 px-5 py-5 w-full cursor-pointer ${
          selectedPanel === 'product_list'
            ? 'bg-[#EDF8F3] border-r-[#5BBB9C] border-r-6'
            : ''
        }`}>
        {' '}
        <Image
          src={assets.product_list_icon}
          alt='dashboardIcon'
        />
        <div>Product List</div>
      </div>{' '}
      <div
        onClick={() => handleClickPanel('add_product')}
        className={`flex flex-row gap-3 px-5 py-5 w-full cursor-pointer ${
          selectedPanel === 'add_product'
            ? 'bg-[#EDF8F3] border-r-[#5BBB9C] border-r-6'
            : ''
        }`}>
        {' '}
        <Image
          src={assets.add_icon}
          alt='dashboardIcon'
        />
        <div>Add Product</div>
      </div>{' '}
    </div>
  );
};

export default SelectionPanel;
