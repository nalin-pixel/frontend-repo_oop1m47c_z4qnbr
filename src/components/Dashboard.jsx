import { useEffect, useState } from "react";

const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

function Card({ title, children, action }) {
  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-semibold">{title}</h3>
        {action}
      </div>
      <div className="text-slate-300 text-sm space-y-2">{children}</div>
    </div>
  );
}

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [menu, setMenu] = useState([]);
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetch(`${API}/students`).then(r=>r.json()).then(setStudents).catch(()=>{});
    fetch(`${API}/menu`).then(r=>r.json()).then(setMenu).catch(()=>{});
    fetch(`${API}/issues`).then(r=>r.json()).then(setIssues).catch(()=>{});
  }, []);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card title="Today's Menu">
        {menu.length === 0 ? (
          <p>No menu added yet.</p>
        ) : (
          menu.slice(0,3).map((m) => (
            <div key={m._id} className="rounded-lg bg-slate-900/40 p-3">
              <p className="text-xs text-slate-400">{new Date(m.date).toDateString()}</p>
              <p><span className="text-slate-400">Breakfast:</span> {m.breakfast}</p>
              <p><span className="text-slate-400">Lunch:</span> {m.lunch}</p>
              <p><span className="text-slate-400">Dinner:</span> {m.dinner}</p>
            </div>
          ))
        )}
      </Card>

      <Card title="Students">
        {students.length === 0 ? <p>No students yet.</p> : (
          <ul className="space-y-2">
            {students.slice(0,5).map(s => (
              <li key={s._id} className="flex items-center justify-between bg-slate-900/40 rounded-lg px-3 py-2">
                <span>{s.name} • {s.room}</span>
                <span className="text-xs text-slate-400">{s.roll}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card title="Recent Issues">
        {issues.length === 0 ? <p>No issues yet.</p> : (
          <ul className="space-y-2">
            {issues.slice(0,5).map(i => (
              <li key={i._id} className="bg-slate-900/40 rounded-lg px-3 py-2">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-white">{i.title}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-200">{i.status}</span>
                </div>
                <p className="text-slate-400 text-sm">{i.description}</p>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card title="Quick Actions">
        <p>Use the forms below to add data.</p>
      </Card>
    </div>
  );
}
