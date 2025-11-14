import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Bin2Dec } from './pages/Bin2Dec'
import { Calculator } from './pages/Calculator'
import { Notes } from './pages/Notes'
import { CarSales } from './pages/CarSales'
import { theme } from './theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter basename="/claude-code-samples">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="bin2dec" element={<Bin2Dec />} />
            <Route path="calculator" element={<Calculator />} />
            <Route path="notes" element={<Notes />} />
            <Route path="car-sales" element={<CarSales />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
