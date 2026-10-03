import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, ChevronRight, Fingerprint, LockKeyhole, Mail, ShieldCheck, Sparkles, UsersRound } from 'lucide-react'

async function api(path, body) {
  const response = await fetch(path, { method: body ? 'POST' : 'GET', headers: body ? { 'Content-Type': 'application/json' } : {}, credentials: 'include', body: body ? JSON.stringify(body) : undefined })
  if (response.status === 204) return null
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.detail || 'Something went wrong. Please try again.')
  return data
}

function App() {
  const [user, setUser] = useState(null)
  const [mode, setMode] = useState('login')
  const [values, setValues] = useState({ name: '', email: '', password: '' })
  const [attendanceId, setAttendanceId] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const resetForm = () => {
    setValues({ name: '', email: '', password: '' })
    setAttendanceId('')
    setError('')
  }

  useEffect(() => { api('/api/auth/me').then(setUser).catch(() => {}) }, [])
  const update = (key) => (event) => setValues((current) => ({ ...current, [key]: event.target.value }))
  const submit = async (event) => {
    event.preventDefault(); setError(''); setBusy(true)
    try {
      const next = await api(`/api/auth/${mode === 'login' ? 'login' : 'register'}`, values)
      setUser(next)
      resetForm()
    } catch (err) { setError(err.message) } finally { setBusy(false) }
  }
  const saveId = async (event) => {
    event.preventDefault(); setError(''); setBusy(true)
    try {
      const next = await api('/api/auth/attendance-id', { attendance_id: `RNXG-${attendanceId}` })
      setUser(next)
      setAttendanceId('')
    }
    catch (err) { setError(err.message) } finally { setBusy(false) }
  }
  const signOut = async () => { await api('/api/auth/logout', {}); setUser(null); setMode('login'); resetForm() }

  return <main className="shell">
    <aside className="story">
      <div className="brand"><div className="brand-mark"><span>R</span><i /></div><span>RNXG<span className="brand-light"> / MEET</span></span></div>
      <div className="story-copy">
        <p className="eyebrow"><span className="live-dot" /> THE CLUB, IN SYNC</p>
        <h1>Show up.<br /><em>Make it</em><br />count.</h1>
        <p className="story-description">One home for every gathering, every familiar face, every moment that moves us forward.</p>
        <div className="event-stamp"><div className="stamp-icon"><UsersRound size={17} /></div><div><strong>Made for RNXG</strong><span>Good things happen together.</span></div><ArrowRight size={17} className="stamp-arrow" /></div>
      </div>
      <div className="story-footer"><span>BUILDING BETTER, TOGETHER</span><span>EST. RNXG</span></div>
    </aside>

    <section className="content">
      <div className="topline"><span>MEMBERSHIP PORTAL</span><span className="secure-label"><ShieldCheck size={14} /> SECURE ACCESS</span></div>
      <div className="form-wrap">
        {user ? (
          user.attendance_id ? (
            <div className="welcome-panel animate-in">
              <div className="success-icon"><Check size={25} /></div><p className="eyebrow">YOU’RE ALL SET</p><h2>Welcome in,<br /><span>{user.name.split(' ')[0]}.</span></h2><p className="form-copy">Your account is ready. Your unique attendance identity is linked to your profile.</p>
              <div className="id-card"><div className="id-card-top"><span>RNXG ATTENDANCE ID</span><Fingerprint size={17} /></div><strong>{user.attendance_id}</strong><div className="id-card-bottom"><span>{user.name}</span><span>MEMBER</span></div></div>
              <button className="text-button" onClick={signOut}>Sign out <ArrowRight size={15} /></button>
            </div>
          ) : (
            <div className="animate-in">
              <button className="back-button" onClick={signOut}><ArrowLeft size={15} /> SIGN OUT</button>
              <div className="step-label"><span>02</span><div className="step-track"><i /></div><span>02</span></div>
              <p className="eyebrow">MAKE IT YOURS</p><h2>Your name<br />in the <span>roll call.</span></h2>
              <p className="form-copy">Choose your unique RNXG Attendance ID. Members will use this identifier across the attendance system.</p>
              <form onSubmit={saveId} className="auth-form">
                <label htmlFor="attendance-id">RNXG ATTENDANCE ID</label>
                <div className="input-wrap id-input"><Fingerprint size={17} /><span className="id-prefix">RNXG-</span><input id="attendance-id" required minLength="4" maxLength="16" autoComplete="off" placeholder="YOURID" value={attendanceId} onChange={(e) => setAttendanceId(e.target.value.replace(/^RNXG-/i, '').replace(/[^a-z0-9]/gi, '').slice(0, 16).toUpperCase())} /></div>
                <p className="hint">4–16 letters or numbers. It can’t be changed later.</p>
                {error && <p className="error-message" role="alert">{error}</p>}
                <button className="submit-button" disabled={busy}>{busy ? 'SAVING…' : 'CREATE MY ID'} <ArrowRight size={17} /></button>
              </form><p className="step-note"><LockKeyhole size={14} /> This ID is unique to your account.</p>
            </div>
          )
        ) : (
          <div className="animate-in">
            <div className="step-label"><span>01</span><div className="step-track"><i /></div><span>02</span></div>
            <p className="eyebrow">{mode === 'login' ? 'GOOD TO HAVE YOU BACK' : 'A NEW CHAPTER STARTS HERE'}</p>
            <h2>{mode === 'login' ? <>The room<br />is <span>better with you.</span></> : <>Find your<br /><span>place here.</span></>}</h2>
            <p className="form-copy">{mode === 'login' ? 'Sign in to stay in the loop and keep your attendance up to date.' : 'Create your member account. We’ll set up your unique attendance ID next.'}</p>
            <form onSubmit={submit} className="auth-form">
              {mode === 'register' && <><label htmlFor="name">YOUR NAME</label><div className="input-wrap"><UsersRound size={17} /><input id="name" type="text" autoComplete="name" placeholder="e.g. Priyanshu Satone" minLength="2" maxLength="100" required value={values.name} onChange={update('name')} /></div></>}
              <label htmlFor="email">EMAIL ADDRESS</label><div className="input-wrap"><Mail size={17} /><input id="email" type="email" autoComplete="email" placeholder="you@example.com" required value={values.email} onChange={update('email')} /></div>
              <div className="password-label"><label htmlFor="password">PASSWORD</label>{mode === 'login' && <span>Keep it private</span>}</div>
              <div className="input-wrap"><LockKeyhole size={17} /><input id="password" type="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} placeholder={mode === 'login' ? 'Enter your password' : 'At least 10 characters'} minLength={mode === 'register' ? 10 : 1} maxLength="128" required value={values.password} onChange={update('password')} /></div>
              {error && <p className="error-message" role="alert">{error}</p>}
              <button className="submit-button" disabled={busy}>{busy ? 'PLEASE WAIT…' : mode === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT'} <ArrowRight size={17} /></button>
            </form>
            <p className="switch-mode">{mode === 'login' ? 'New to RNXG?' : 'Already have an account?'} <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); resetForm() }}>{mode === 'login' ? 'Create account' : 'Sign in'} <ChevronRight size={14} /></button></p>
            <div className="privacy-note"><LockKeyhole size={14} /><span>Your details stay safe and only support your RNXG membership.</span></div>
          </div>
        )}
      </div>
      <div className="content-footer"><span>RNXG MEET <b>·</b> MEMBERS ONLY</span><span>MADE FOR THE MOMENTS THAT MATTER <Sparkles size={13} /></span></div>
    </section>
  </main>
}

export default App


