import Navbar from './navbar';
import Footer from './footer';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const router = useRouter();
  const hideNavBar = router.pathname.startsWith("/budgetplanner");

  if (hideNavBar) {
    return (
      <>
        <div>
          <Toaster 
            position="bottom-right"
            reverseOrder={false}
          />
        </div>
        <main>
          {children}
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <div>
        <Toaster 
          position="bottom-right"
          reverseOrder={false}
        />
      </div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}