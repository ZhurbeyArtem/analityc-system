"use client"
import { useAuthUser, useInitializeAuthUser } from '@/hooks/setAuth';
import s from './page.module.css'
import Sidebar from '@/components/sidebar/Sidebar';
import Portfolio from '@/components/portfolio/Portfolio';


export default function Home() {
  useInitializeAuthUser();
  const { isAuth } = useAuthUser()

  return (
    <>
      {isAuth ? 
        <div className={s.portfolio}>
          <Sidebar />
          <Portfolio />
        </div>
        : <div className={s.content}>
          Привіт, для того що б користуватись данним сайтом тобі слід спочатку авторизуватись
        </div>
      }
    </>

  );
}
