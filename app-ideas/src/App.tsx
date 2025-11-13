import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Bin2Dec } from './pages/Bin2Dec'
import { Calculator } from './pages/Calculator'
import { Notes } from './pages/Notes'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Bin2Dec />} />
          <Route path="calculator" element={<Calculator />} />
          <Route path="notes" element={<Notes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
