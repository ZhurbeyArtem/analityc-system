import Header from "@/components/header/Header";
import type { Metadata } from "next";

import './index.css'
import 'react-toastify/dist/ReactToastify.css';

import AuthForm from "@/components/modals/authForm/AuthForm";
import EmailForm from "@/components/modals/emailForm/EmailForm";
import ConfirmEmail from "@/components/modals/confirmEmail/ConfirmEmail";
import Provider from "@/util/Provider";
import { ToastContainer } from "react-toastify";
import BuySellDermacheForm from "@/components/modals/buySellDermacheForm/BuySellDermacheForm";
import { Suspense } from "react";
import AnalyzePortfolio from "@/components/modals/analyzePortfolio/AnalyzePortfolio";
import ConfirmDelete from "@/components/modals/confirmDelete/ConfirmDelete";


export const metadata: Metadata = {
  title: "Головна сторінка",
  description: "Система аналізу інвестиційного портфелю",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <Provider>
        <Suspense>
          <body>
            <Header />
            <div className="container">
              {children}
            </div>
            <ConfirmDelete />
            <AnalyzePortfolio />
            <AuthForm />
            <EmailForm />
            <ConfirmEmail />
            <ToastContainer />
            <BuySellDermacheForm />
          </body>
        </Suspense>
      </Provider>

    </html>
  );
}
