import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Forms from "./components/Forms";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Overview</h2>
          <Dashboard />
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Manage</h2>
          <Forms />
        </section>
      </main>
    </div>
  )
}

export default App
