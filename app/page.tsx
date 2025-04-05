import { Button } from '~/components/ui/button'
import { Header } from '~/components/header/header'
import { Footer } from '~/components/footer/footer'
import HomePage from '~/components/home'

export default function Home() {
  return (
    <>
      <Header />
      <HomePage/>
      <Footer />
    </>
  )
}