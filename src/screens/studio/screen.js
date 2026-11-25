import { ViewModel } from '../../runtime.js';

// AI Studio screen: state, data and every interaction on this page.
export default class StudioScreen extends ViewModel {
  destroy() { if (this._t) clearTimeout(this._t); }
  bindings() {
    const s = this.state;
    const SP = [
      { id:'n', icon:'TH', bg:'#FFE8E2', ink:'#9A2E16', title:'“Is the narrator already gone?” thread', meta:'412 replies · 60/40 split', n:412, cite:'@atlasreads' },
      { id:'q', icon:'QA', bg:'#EEECFF', ink:'#3B2DC9', title:'96 unanswered process questions', meta:'From 3 Q&A sessions', n:96, cite:'@kabirreads' },
      { id:'l', icon:'#3', bg:'#E3FBF4', ink:'#0B6B53', title:'Comments on field log #398', meta:'612 replies · 5.1k likes', n:612, cite:'@priyanair' },
      { id:'p', icon:'PL', bg:'#FFF4CF', ink:'#5C4300', title:'Poll: “Is Ada alive?”', meta:'2,140 votes', n:2140, cite:'Community poll' }
    ];
    const OUT = {
      'Thread': { kind:'THREAD', action:'started a thread', title:'Okay. Let’s talk about Ada.', body:['412 of you have argued about whether she’s alive. I read every reply. Here’s what I can tell you without ruining anything:','She is exactly as alive as the city lets her be. That’s the whole book.','Drop your theory below — I’m answering the top 10 on Saturday.'], bg:'#FFC93C', ink:'#2A2000', reach:'14–19k' },
      'Story': { kind:'DAILY STORY', action:'posted a story', title:'Lunch at the Bureau of Sound', body:['At noon the clerks unwrapped their sandwiches very quietly, which was rather the point.','Today’s special: other people’s small talk, lightly salted.'], bg:'#1FC8A0', ink:'#05332A', reach:'18–24k' },
      'Tutorial': { kind:'CAROUSEL · 4 SLIDES', action:'shared a how-to', title:'How a 40-word story becomes a chapter', body:['1 · Post one strange, true-feeling detail every morning.','2 · If readers ask “what next?” twice, it has a pulse.','3 · Stack five pulsing stories. Find who appears in all of them.','4 · Rewrite from scratch. Keep only the first line.'], bg:'#5B4BFF', ink:'#fff', reach:'9–13k' },
      'Update': { kind:'UPDATE', action:'posted an update', title:'The Lantern Census: cover reveal this Friday', body:['You’ve read 44 field logs from this book already. On Friday you’ll see what it looks like.','Waitlist readers get chapter one the same day.'], bg:'#FF7AC6', ink:'#3A0C2A', reach:'22–30k' }
    };
    const H = { 'Thread':'Start a conversation', 'Story':'Tomorrow’s daily post', 'Tutorial':'Swipeable how-to', 'Update':'News for followers' };
    const sel = s.sel || { n: true, p: true };
    const fmt = s.fmt || 'Thread', vibe = s.vibe || 'Your voice';
    const ph = s.ph || 'done';
    const chosen = SP.filter((o) => sel[o.id]);
    const total = chosen.reduce((a, o) => a + o.n, 0);
    const shown = s.shown || fmt;
    const on = 'background:#EEECFF;border:2px solid #5B4BFF', off = 'background:#fff;border:1px solid #E7E5EE';
    return {
      selCount: chosen.length,
      sparks: SP.map((o) => ({ ...o, on: sel[o.id] ? 'true' : 'false', pick: () => this.setState({ sel: { ...sel, [o.id]: !sel[o.id] } }), style: sel[o.id] ? on : off, box: sel[o.id] ? 'background:#5B4BFF;color:#fff' : 'border:2px solid #D3D0DE', check: sel[o.id] ? '✓' : '' })),
      formats: Object.keys(OUT).map((f) => ({ label: f, hint: H[f], pick: () => this.setState({ fmt: f }), style: f === fmt ? on : off })),
      vibes: ['Your voice', 'Playful', 'Mysterious'].map((v) => ({ label: v, pick: () => this.setState({ vibe: v }), style: v === vibe ? 'background:#14121F;color:#fff;border:1px solid #14121F' : 'background:#fff;color:#14121F;border:1px solid #E7E5EE' })),
      generate: () => { if (!chosen.length) { this.setState({ ph: 'idle' }); return; } this.setState({ ph: 'loading', pub: false }); if (this._t) clearTimeout(this._t); this._t = setTimeout(() => this.setState({ ph: 'done', shown: fmt }), 1700); },
      genLabel: ph === 'loading' ? 'Remixing…' : '✦ Remix ' + total.toLocaleString() + ' replies into a ' + fmt.toLowerCase(),
      isIdle: ph === 'idle', isLoading: ph === 'loading', isDone: ph === 'done',
      replyCount: total.toLocaleString(),
      status: ph === 'loading' ? 'WRITING' : ph === 'done' ? (s.pub ? 'POSTED' : 'READY') : 'WAITING',
      statusStyle: ph === 'done' ? (s.pub ? 'background:#FFC93C;color:#2A2000' : 'background:#1FC8A0;color:#05332A') : 'background:rgba(255,255,255,.14);color:#fff',
      fmt: shown, vibe,
      out: OUT[shown],
      cites: (chosen.length ? chosen : SP.slice(0, 1)).map((o) => o.cite),
      schedule: () => this.setState({ sched: !s.sched }), schedOn: s.sched ? 'true' : 'false',
      schedLabel: s.sched ? 'Scheduled · Fri 9:00 ✓' : 'Schedule', schedStyle: s.sched ? 'background:rgba(255,255,255,.16);border-color:#FFC93C' : '',
      publish: () => this.setState({ pub: true }), published: !!s.pub,
      pubLabel: s.pub ? 'Posted · +50 XP' : 'Post now',
      pubStyle: s.pub ? 'background:#FFC93C;color:#2A2000' : 'background:#fff;color:#14121F'
    };
  }
}
