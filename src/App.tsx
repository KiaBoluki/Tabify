import './App.css'
import Card from './components/Card'
import { PersianShortDate } from './components/DateTime'

function App() {
  return (
    <div className="wrapper text-white bg-slate-300 min-h-screen flex justify-center items-center">
      <Card>
         <PersianShortDate/>
      </Card>
    </div>
  )
}

export default App
