"use client"

import { create } from 'zustand'
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

type PortfolioPage = {
  portfolioId: number;
  setPortfolio: (id: number) => void;
};


export const useSetPortfolio = create<PortfolioPage>((set) => ({
  portfolioId: 0,
  setPortfolio: (id: number) => set(() => ({ portfolioId: id })),
}));


export const useInitializePortfolio = () => {
  const setPortfolio = useSetPortfolio((state) => state.setPortfolio);
  const searchParams = useSearchParams()

  useEffect(() => {
    const id = searchParams.get('id')
    setPortfolio(Number(id));
  }, [setPortfolio, searchParams]);
};
