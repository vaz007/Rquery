import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import HomePage from './components/HomePage'
import RQsuperHero from './components/RQsuperHero'
import SuperHero from './components/SuperHero'

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/super-heroes'>Traditional Super Heroes</Link>
            </li>
            <li>
              <Link to='/rq-super-heroes'>RQ Super Heroes</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path='/super-heroes' element={<SuperHero />}></Route>
          <Route path='/rq-super-heroes' element={<RQsuperHero />}>

          </Route>
          <Route path='/' element={<HomePage />}>
          </Route>
        </Routes>
      </div>
    </Router>
    <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>
    </QueryClientProvider>
    
  )
}

export default App