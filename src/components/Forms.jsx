import { useState } from "react";

const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

function Section({ title, children }) {
  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
      <h3 className="text-white font-semibold mb-3">{title}</h3>
      <div className="text-slate-300 text-sm space-y-3">{children}</div>
    </div>
  );
}

export default function Forms() {
  // Student
  const [student, setStudent] = useState({ name: "", email: "", roll: "", room: "", course: "", year: 1 });
  const saveStudent = async (e) => {
    e.preventDefault();
    await fetch(`${API}/students`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...student, year: Number(student.year) })});
    alert('Student saved');
  }

  // Menu
  const [menu, setMenu] = useState({ date: "", breakfast: "", lunch: "", dinner: "" });
  const saveMenu = async (e) => {
    e.preventDefault();
    await fetch(`${API}/menu`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(menu)});
    alert('Menu added');
  }

  // Issue
  const [issue, setIssue] = useState({ student_id: "", title: "", description: "" });
  const saveIssue = async (e) => {
    e.preventDefault();
    await fetch(`${API}/issues`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...issue, status: 'open' })});
    alert('Issue created');
  }

  // Laundry
  const [laundry, setLaundry] = useState({ student_id: "", items: "", preferred_date: "" });
  const saveLaundry = async (e) => {
    e.preventDefault();
    const payload = { student_id: laundry.student_id, items: laundry.items.split(',').map(s=>s.trim()).filter(Boolean), preferred_date: laundry.preferred_date, status: 'pending' };
    await fetch(`${API}/laundry`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)});
    alert('Laundry request submitted');
  }

  // Attendance
  const [att, setAtt] = useState({ student_id: "", date: "", present: true });
  const saveAtt = async (e) => {
    e.preventDefault();
    await fetch(`${API}/attendance`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...att, present: Boolean(att.present) })});
    alert('Attendance marked');
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Section title="Add Student">
        <form onSubmit={saveStudent} className="grid grid-cols-2 gap-3">
          <input className="bg-slate-900/50 border border-slate-700 rounded px-3 py-2 text-white col-span-2" placeholder="Name" value={student.name} onChange={e=>setStudent({...student, name:e.target.value})} />
          <input className="bg-slate-900/50 border border-slate-700 rounded px-3 py-2 text-white col-span-2" placeholder="Email" value={student.email} onChange={e=>setStudent({...student, email:e.target.value})} />
          <input className="bg-slate-900/50 border border-slate-700 rounded px-3 py-2 text-white" placeholder="Roll" value={student.roll} onChange={e=>setStudent({...student, roll:e.target.value})} />
          <input className="bg-slate-900/50 border border-slate-700 rounded px-3 py-2 text-white" placeholder="Room" value={student.room} onChange={e=>setStudent({...student, room:e.target.value})} />
          <input className="bg-slate-900/50 border border-slate-700 rounded px-3 py-2 text-white" placeholder="Course" value={student.course} onChange={e=>setStudent({...student, course:e.target.value})} />
          <input type="number" className="bg-slate-900/50 border border-slate-700 rounded px-3 py-2 text-white" placeholder="Year" value={student.year} onChange={e=>setStudent({...student, year:e.target.value})} />
          <button className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2">Save Student</button>
        </form>
      </Section>

      <Section title="Post Menu">
        <form onSubmit={saveMenu} className="grid grid-cols-2 gap-3">
          <input type="date" className="bg-slate-900/50 border border-slate-700 rounded px-3 py-2 text-white col-span-2" value={menu.date} onChange={e=>setMenu({...menu, date:e.target.value})} />
          <input className="bg-slate-900/50 border border-slate-700 rounded px-3 py-2 text-white col-span-2" placeholder="Breakfast" value={menu.breakfast} onChange={e=>setMenu({...menu, breakfast:e.target.value})} />
          <input className="bg-slate-900/50 border border-slate-700 rounded px-3 py-2 text-white col-span-2" placeholder="Lunch" value={menu.lunch} onChange={e=>setMenu({...menu, lunch:e.target.value})} />
          <input className="bg-slate-900/50 border border-slate-700 rounded px-3 py-2 text-white col-span-2" placeholder="Dinner" value={menu.dinner} onChange={e=>setMenu({...menu, dinner:e.target.value})} />
          <button className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2">Add Menu</button>
        </form>
      </Section>

      <Section title="Raise Issue">
        <form onSubmit={saveIssue} className="grid grid-cols-2 gap-3">
          <input className="bg-slate-900/50 border border-slate-700 rounded px-3 py-2 text-white col-span-2" placeholder="Student ID" value={issue.student_id} onChange={e=>setIssue({...issue, student_id:e.target.value})} />
          <input className="bg-slate-900/50 border border-slate-700 rounded px-3 py-2 text-white col-span-2" placeholder="Title" value={issue.title} onChange={e=>setIssue({...issue, title:e.target.value})} />
          <textarea className="bg-slate-900/50 border border-slate-700 rounded px-3 py-2 text-white col-span-2" placeholder="Description" value={issue.description} onChange={e=>setIssue({...issue, description:e.target.value})} />
          <button className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2">Submit Issue</button>
        </form>
      </Section>

      <Section title="Laundry Request">
        <form onSubmit={saveLaundry} className="grid grid-cols-2 gap-3">
          <input className="bg-slate-900/50 border border-slate-700 rounded px-3 py-2 text-white col-span-2" placeholder="Student ID" value={laundry.student_id} onChange={e=>setLaundry({...laundry, student_id:e.target.value})} />
          <input className="bg-slate-900/50 border border-slate-700 rounded px-3 py-2 text-white col-span-2" placeholder="Items (comma separated)" value={laundry.items} onChange={e=>setLaundry({...laundry, items:e.target.value})} />
          <input type="date" className="bg-slate-900/50 border border-slate-700 rounded px-3 py-2 text-white" value={laundry.preferred_date} onChange={e=>setLaundry({...laundry, preferred_date:e.target.value})} />
          <button className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2">Submit Request</button>
        </form>
      </Section>

      <Section title="Mark Attendance">
        <form onSubmit={saveAtt} className="grid grid-cols-2 gap-3">
          <input className="bg-slate-900/50 border border-slate-700 rounded px-3 py-2 text-white col-span-2" placeholder="Student ID" value={att.student_id} onChange={e=>setAtt({...att, student_id:e.target.value})} />
          <input type="date" className="bg-slate-900/50 border border-slate-700 rounded px-3 py-2 text-white" value={att.date} onChange={e=>setAtt({...att, date:e.target.value})} />
          <select className="bg-slate-900/50 border border-slate-700 rounded px-3 py-2 text-white" value={att.present ? 'present' : 'absent'} onChange={e=>setAtt({...att, present: e.target.value === 'present'})}>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
          </select>
          <button className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2">Save Attendance</button>
        </form>
      </Section>
    </div>
  );
}
