import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Bin2Dec } from './pages/Bin2Dec'
import { Calculator } from './pages/Calculator'
import { Notes } from './pages/Notes'
import { CarSales } from './pages/CarSales'

function App() {
  return (
    <BrowserRouter basename="/claude-code-samples">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Bin2Dec />} />
          <Route path="calculator" element={<Calculator />} />
          <Route path="notes" element={<Notes />} />
          <Route path="car-sales" element={<CarSales />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
